// One read-only CLI --dry invocation for the timed-out candidate plus complete frozen packet verification. No paid launch.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareBuildJudge } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/codex-build-judge.mjs';
import { hash, json } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/lib/build.mjs';
import { assembleBuildJudgePrompt } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/lib/build-score.mjs';
import { createPageReader, verifyPagedEvidence, MAX_JUDGE_EVIDENCE_BYTES, MAX_JUDGE_EVIDENCE_PAGES, PAGE_TEXT_BYTES, MAX_PAGE_RESPONSE_BYTES, MAX_PAGE_RESULT_BYTES } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/lib/judge-transport.mjs';

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, '../../..');
const run = 'evals/runs/codex-bench-depth-candidate-1/bench-depth-2/baseline-1';
const acceptance = 'acceptance/manifest.json';
const output = join(study, 'candidate-judge-preflight');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const out = join(root, run);
const meta = await readJson(join(out, 'meta.json'));
const capabilities = await readJson(join(meta.inputs, 'capabilities.json'));
assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256, 'Frozen CLI binary changed');
const report = await readJson(join(out, acceptance));
assert.equal(report.complete, true, 'Wait for the completed independent capture');
assert.equal(report.sourceUnchanged, true);
assert.equal(report.sourceBefore.digest, report.sourceAfter.digest);
assert.equal(report.sourceAfter.files.length, 184);
const actor = await readJson(join(out, 'turns/01/result.json'));
assert.equal(actor.complete, false);
assert.equal(actor.timedOut, true);
assert.equal(actor.usage, null);
assert.equal(report.sourceAfter.digest, '830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7');
assert.equal(await lstat(join(out, 'judge')).catch(error => { if (error.code === 'ENOENT') return null; throw error; }), null, 'An existing judge attempt cannot be retried');
const args = ['evals/codex-build-judge.mjs', '--run', run, '--acceptance', acceptance, '--dry'];
const environment = { ...capabilities.environment, TMPDIR: '/var/tmp/storyfolio-comparison-runtime-20261012' };
const command = { schemaVersion: 1, modelCalls: 0, browserCalls: 0, executable: capabilities.node.executable, args, cwd: root, environment,
  invocation: [capabilities.node.executable, ...args].join(' '),
  launchMeaning: 'Only --dry; root alone may authorize and launch the one paid judge. No retries or evidence trimming.',
  inputDigest: meta.inputDigest, acceptanceSha256: hash(await readFile(join(out, acceptance))),
  started: new Date().toISOString() };
await mkdir(output); // Existing output is an error, never replace a preflight.
const save = async (path, bytes) => writeFile(join(output, path), bytes, { flag: 'wx' });
await save('command.json', json(command));
const child = spawnSync(command.executable, args, { cwd: root, env: { ...process.env, ...environment }, encoding: 'utf8', timeout: 60000, maxBuffer: 8 * 1024 * 1024 });
await save('stdout.log', child.stdout ?? '');
await save('stderr.log', child.stderr ?? '');
await save('process.json', json({ code: child.status, signal: child.signal, error: child.error ? String(child.error) : null,
  finished: new Date().toISOString(), stdoutSha256: hash(child.stdout ?? ''), stderrSha256: hash(child.stderr ?? ''), modelCalls: 0 }));
try {
  assert.equal(child.error, undefined, String(child.error));
  assert.equal(child.status, 0, child.stdout + child.stderr);
  const dry = JSON.parse(child.stdout);
  assert.equal(dry.modelCalls, 0);
  assert.equal(dry.writes, false);
  const prepared = await prepareBuildJudge({ root, run, acceptance });
  assert.equal(prepared.transport, 'paged-v1');
  assert.equal(prepared.frozen.digest, meta.inputDigest);
  assert.equal(prepared.packet.automaticAcceptance.supplied, true);
  assert.equal(prepared.packet.automaticAcceptance.path, `run/${acceptance}`);
  assert.deepEqual(prepared.packet.automaticAcceptance.results, report.results);
  for (const [key, value] of Object.entries({ inputDigest: prepared.frozen.digest, transport: prepared.transport, promptSha256: prepared.promptSha256, promptBytes: prepared.promptBytes, pages: prepared.bundle.pages.length, bundleSha256: prepared.bundleSha256, turns: prepared.packet.turnCount, automaticAcceptanceSupplied: true })) assert.deepEqual(dry[key], value, key);
  assert.deepEqual(dry.logicalPrompt, prepared.bundle.prompt);
  const verified = verifyPagedEvidence(prepared.bundle);
  assert.equal(verified.prompt, prepared.fullPrompt);
  const template = await readFile(join(meta.inputs, 'implementation/evals/prompts/judge-build.md'), 'utf8');
  const rubric = await readFile(join(meta.inputs, 'rubric.md'), 'utf8');
  assert.equal(assembleBuildJudgePrompt(template, rubric, prepared.packet), prepared.fullPrompt);
  const reader = createPageReader(prepared.bundle);
  const pages = prepared.bundle.pages.map(page => {
    const response = reader.get(page.id), textBytes = Buffer.byteLength(page.text), responseBytes = Buffer.byteLength(JSON.stringify(response));
    const worstCaseWireBytes = Buffer.byteLength(JSON.stringify({ jsonrpc: '2.0', id: '\u0000'.repeat(128), result: response }) + '\n');
    assert.ok(textBytes <= PAGE_TEXT_BYTES);
    assert.ok(responseBytes <= MAX_PAGE_RESULT_BYTES);
    assert.ok(worstCaseWireBytes <= MAX_PAGE_RESPONSE_BYTES);
    return { id: page.id, startByte: page.startByte, endByte: page.endByte, sha256: page.sha256, textBytes, responseBytes, worstCaseWireBytes };
  });
  const documents = prepared.packet.documents;
  assert.equal(new Set(documents.map(document => document.path)).size, documents.length);
  const document = path => documents.find(entry => entry.path === path);
  const omitted = path => prepared.packet.omitted.find(entry => entry.path === path);
  const decode = bytes => { try { const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); return text.includes('\0') ? null : text; } catch { return null; } };
  const checkedBodies = [];
  async function verifyBody(path, diskPath) {
    const bytes = await readFile(diskPath), text = decode(bytes);
    if (text !== null) { assert.equal(document(path)?.text, text, path); assert.equal(omitted(path), undefined, path); }
    else { assert.equal(document(path), undefined, path); assert.equal(omitted(path)?.reason, 'Binary content, no image pixels supplied', path); }
    const retained = prepared.artifacts[path];
    assert.equal(retained?.sha256, hash(bytes), path);
    assert.equal(retained?.bytes, bytes.length, path);
    checkedBodies.push({ path, bytes: bytes.length, sha256: hash(bytes), suppliedAs: text === null ? 'binary omission with hash' : 'complete text body' });
  }
  for (const path of Object.keys(prepared.frozen.hashes).filter(path => path.startsWith('fixture/'))) await verifyBody(`inputs/${path}`, join(meta.inputs, path));
  for (const turn of prepared.packet.turns) for (const change of turn.changes) {
    assert.equal(change.after?.type, 'file');
    const path = `turns/${String(turn.turn).padStart(2, '0')}/snapshot/files/${change.path}`;
    await verifyBody(`run/${path}`, join(out, path));
  }
  await verifyBody(`run/${acceptance}`, join(out, acceptance));
  for (const path of Object.keys(report.artifacts)) await verifyBody(`run/acceptance/${path}`, join(out, 'acceptance', path));
  const streamPath = 'turns/01/stream.jsonl';
  const rawStream = await readFile(join(out, streamPath), 'utf8');
  const selected = rawStream.split('\n').filter(line => {
    if (!line.trim()) return false;
    try { const event = JSON.parse(line); return !['agent_message', 'reasoning'].includes(event.item?.type); } catch { return true; }
  }).join('\n');
  assert.equal(document(`run/${streamPath}`).text, selected);
  assert.equal(document('run/turns/01/reply.md').text, await readFile(join(out, 'turns/01/reply.md'), 'utf8'));
  assert.ok(prepared.packet.omitted.every(entry => entry.reason === 'Binary content, no image pixels supplied'));
  assert.equal(prepared.packet.taskKind, 'prototype-depth');
  assert.equal(prepared.packet.sourcePacketAvailable, false);
  assert.equal(prepared.packet.fullJourney, false);
  assert.equal(await lstat(join(out, 'judge')).catch(error => { if (error.code === 'ENOENT') return null; throw error; }), null);
  const audit = { schemaVersion: 1, valid: true, modelCalls: 0, browserCalls: 0, command: 'command.json', dryOutput: 'stdout.log',
    inputDigest: prepared.frozen.digest, acceptanceSha256: command.acceptanceSha256,
    frozenCliBinary: { executable: capabilities.cliExecutable, sha256: capabilities.cliSha256, verified: true },
    actorComplete: actor.complete, actorTimedOut: actor.timedOut, actorUsage: actor.usage,
    acceptanceComplete: report.complete, acceptancePassed: report.passed, sourceDigest: report.sourceAfter.digest, sourceFiles: report.sourceAfter.files.length,
    transport: prepared.transport, logicalPrompt: prepared.bundle.prompt, bootstrapPrompt: { bytes: prepared.promptBytes, sha256: prepared.promptSha256 },
    bundleSha256: prepared.bundleSha256, bundleDigest: prepared.bundle.digest, pageCount: pages.length,
    bounds: { MAX_JUDGE_EVIDENCE_BYTES, MAX_JUDGE_EVIDENCE_PAGES, PAGE_TEXT_BYTES, MAX_PAGE_RESPONSE_BYTES, MAX_PAGE_RESULT_BYTES },
    exactLogicalPromptReconstruction: true, noAdditionalTrimmingOrDeduplication: true,
    completeFixtureBodiesChecked: Object.keys(prepared.frozen.hashes).filter(path => path.startsWith('fixture/')).length,
    completeChangedSourceChecked: prepared.packet.turns.reduce((total, turn) => total + turn.changes.length, 0),
    completeAcceptanceArtifactsChecked: Object.keys(report.artifacts).length,
    originalArtifactCount: Object.keys(prepared.artifacts).length, documentCount: documents.length, omittedCount: prepared.packet.omitted.length,
    criterionEligibility: prepared.packet.criterionEligibility, observationScope: prepared.packet.observationScope, limitations: prepared.packet.limitations,
    qualification: 'Lossless transport of the frozen selected text packet, not all physical bytes. Binary pixels, unchanged non-fixture source bodies and raw reasoning are intentionally not provided. Complete actor messages are in reply.md, tool/lifecycle events in the selected stream. No coordinator actor audit or visual-review narrative was injected. Page preparation is not actual delivery, comprehension or visual acceptance.',
    pages, documents: documents.map(({ path, sha256, bytes, selection, text }) => ({ path, sha256, bytes, ...(selection === undefined ? {} : { selection }), selectedTextBytes: Buffer.byteLength(text), selectedTextSha256: hash(text) })),
    omitted: prepared.packet.omitted, checkedBodies };
  await save('packet-audit.json', json(audit));
  await save('result.json', json({ valid: true, modelCalls: 0, browserCalls: 0, exitCode: child.status, inputDigest: prepared.frozen.digest, sourceFiles: report.sourceAfter.files.length,
    actorComplete: actor.complete, actorTimedOut: actor.timedOut, actorUsage: actor.usage,
    acceptancePassed: report.passed, logicalPromptBytes: prepared.bundle.prompt.bytes, logicalPromptSha256: prepared.bundle.prompt.sha256,
    pageCount: pages.length, packetAuditSha256: hash(json(audit)), paidJudgeLaunched: false }));
  process.stdout.write(json({ valid: true, output, logicalPromptBytes: prepared.bundle.prompt.bytes, pageCount: pages.length, documentCount: documents.length, omittedCount: prepared.packet.omitted.length, paidJudgeLaunched: false }));
} catch (error) {
  await save('error.json', json({ error: String(error), modelCalls: 0, retry: 'No automatic retry, evidence omission or relaxation.' }));
  throw error;
}
