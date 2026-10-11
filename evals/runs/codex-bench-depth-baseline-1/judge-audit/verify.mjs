// Read-only audit of one already completed model turn. Never invokes a model.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyInputs } from '../inputs/implementation/evals/lib/review.mjs';
import { summariseCodex } from '../inputs/implementation/evals/lib/codex.mjs';
import { assembleBuildJudgePrompt, buildJudgementSchema, buildCriterionEligibility, validateBuildJudgement, buildScoreCounts } from '../inputs/implementation/evals/lib/build-score.mjs';
import { verifyPagedEvidence, verifyPageCoverage } from '../inputs/implementation/evals/lib/judge-transport.mjs';

const directory = dirname(fileURLToPath(import.meta.url));
const cohort = resolve(directory, '..');
const run = join(cohort, 'bench-depth-1/baseline-1');
const judge = join(run, 'judge');
const inputs = join(cohort, 'inputs');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const text = path => readFile(path, 'utf8');
const json = async path => JSON.parse(await text(path));
const manifest = await json(join(judge, 'input-manifest.json'));
const rawResult = await json(join(judge, 'result.json'));
const frozen = await verifyInputs(inputs);
assert.equal(frozen.digest, manifest.inputDigest);
assert.equal(rawResult.complete, false, 'The original runner failure must remain');
assert.match(rawResult.error, /SyntaxError.*not valid JSON/);

for (const [path, expected] of Object.entries(rawResult.artifacts)) {
  assert.equal(sha256(await readFile(join(judge, path))), expected, `Judge artifact ${path}`);
}
for (const [path, entry] of Object.entries(manifest.artifacts)) {
  const [prefix, ...parts] = path.split('/');
  assert.ok(prefix === 'run' || prefix === 'inputs');
  const bytes = await readFile(join(prefix === 'run' ? run : inputs, ...parts));
  assert.equal(bytes.length, entry.bytes, path);
  assert.equal(sha256(bytes), entry.sha256, path);
}

const bundleBytes = await readFile(join(judge, 'evidence-bundle.json'));
assert.equal(sha256(bundleBytes), manifest.bundleSha256);
const bundle = JSON.parse(bundleBytes);
const verifiedBundle = verifyPagedEvidence(bundle);
const fullPrompt = await text(join(judge, 'full-prompt.md'));
assert.equal(verifiedBundle.prompt, fullPrompt);
assert.deepEqual(bundle.prompt, manifest.logicalPrompt);
const bootstrap = await readFile(join(judge, 'prompt.md'));
assert.equal(sha256(bootstrap), manifest.promptSha256);
assert.equal(bootstrap.length, manifest.promptBytes);
const ledger = await text(join(judge, 'page-delivery.jsonl'));
const coverage = verifyPageCoverage(bundle, ledger);
assert.deepEqual(rawResult.delivery, coverage);

const rubric = await text(join(inputs, 'rubric.md'));
const template = await text(join(inputs, 'implementation/evals/prompts/judge-build.md'));
const [prefix, suffix, excess] = template.replace('{{rubric}}', rubric).split('{{evidence}}');
assert.equal(excess, undefined);
assert.ok(fullPrompt.startsWith(prefix) && fullPrompt.endsWith(suffix));
const packet = JSON.parse(fullPrompt.slice(prefix.length, fullPrompt.length - suffix.length));
assert.equal(assembleBuildJudgePrompt(template, rubric, packet), fullPrompt);
assert.equal(packet.inputDigest, frozen.digest);
assert.equal(packet.taskKind, 'prototype-depth');
assert.equal(packet.turnCount, 1);
assert.deepEqual(packet.refusalTurns, [1]);
assert.equal(packet.sourcePacketAvailable, false);
assert.equal(packet.automaticAcceptance.supplied, false);
assert.equal(packet.documents.length, bundle.documents.length);
const evidence = {};
for (const [index, doc] of packet.documents.entries()) {
  assert.equal(Object.hasOwn(evidence, doc.path), false);
  const descriptor = bundle.documents[index];
  assert.equal(doc.path, descriptor.path);
  assert.equal(doc.sha256, descriptor.sha256);
  assert.equal(doc.bytes, descriptor.bytes);
  assert.equal(sha256(doc.text), descriptor.selectedTextSha256);
  assert.equal(Buffer.byteLength(doc.text), descriptor.selectedTextBytes);
  assert.deepEqual(doc.selection, descriptor.selection);
  assert.deepEqual(manifest.artifacts[doc.path], { sha256: doc.sha256, bytes: doc.bytes });
  evidence[doc.path] = doc.text;
}
const options = { turnCount: packet.turnCount, taskKind: packet.taskKind,
  requestedStops: packet.requestedStops, refusalTurns: packet.refusalTurns,
  evidence, sourcePacketAvailable: false };
assert.deepEqual(buildCriterionEligibility(options), packet.criterionEligibility);
assert.deepEqual(buildJudgementSchema(packet.taskKind), await json(join(judge, 'schema.json')));

const stream = await text(join(judge, 'stream.jsonl'));
const events = stream.trimEnd().split('\n').map(line => JSON.parse(line));
assert.equal(events.at(-1).type, 'turn.completed');
assert.equal(events.filter(event => event.type === 'turn.completed').length, 1);
assert.equal(events.filter(event => event.type === 'thread.started').length, 1);
const processResult = await json(join(judge, 'process.json'));
assert.equal(processResult.code, 0);
assert.equal(processResult.timedOut, false);
const turn = summariseCodex(stream, processResult.code);
assert.equal(turn.failed, false);
assert.equal(turn.sessionId, rawResult.sessionId);
assert.deepEqual(turn.usage, rawResult.usage);
assert.equal(await text(join(judge, 'reply.md')), turn.reply + '\n');
assert.throws(() => JSON.parse(turn.reply), SyntaxError);
const messages = events.flatMap((event, index) => event.type === 'item.completed' && event.item?.type === 'agent_message'
  ? [{ line: index + 1, ...event.item }] : []);
const final = messages.at(-1);
assert.equal(final.id, 'item_26');
assert.equal(final.line, 53);
const judgement = JSON.parse(final.text);
const problems = validateBuildJudgement(judgement, options);
assert.deepEqual(problems, []);
const retainedDerivative = await readFile(join(directory, 'final-message.json')).catch(error => {
  if (error.code === 'ENOENT') return null;
  throw error;
});
if (retainedDerivative) assert.equal(retainedDerivative.toString('utf8'), final.text + '\n');
const calls = events.filter(event => event.type === 'item.completed' && event.item?.type === 'mcp_tool_call');
assert.deepEqual(calls.slice(0, 23).map(event => event.item.arguments.page_id), bundle.pages.map(page => page.id));
assert.equal(calls.length, 24);
assert.equal(calls.at(-1).item.arguments.page_id, 'page-0001');

const report = {
  schemaVersion: 1, modelCalls: 0, writes: false, date: '2026-10-11',
  meaning: 'Coordinator derivative validates the existing final message against frozen helpers. Original runner result remains incomplete; this is not a rerun or official replacement judgement.',
  frozenInputDigest: frozen.digest, judgeSessionId: turn.sessionId,
  finalMessage: { eventId: final.id, streamLine: final.line, characters: final.text.length,
    sha256: sha256(final.text), derivativeBytesSha256: sha256(final.text + '\n') },
  messageCount: messages.length, originalRunnerComplete: rawResult.complete,
  originalRunnerError: rawResult.error, processExit: processResult.code,
  durationMs: processResult.durationMs, usage: turn.usage,
  inputArtifactCount: Object.keys(manifest.artifacts).length,
  judgeArtifactCount: Object.keys(rawResult.artifacts).length,
  documents: packet.documents.length, delivery: coverage,
  fullPrompt: bundle.prompt, schemaEligibilityCitationProblems: problems,
  automaticAcceptanceSupplied: packet.automaticAcceptance.supplied,
  derivativeCounts: buildScoreCounts(judgement),
  failedCriteria: Object.entries(judgement.criteria).filter(([, value]) => value.status === 'fail').map(([id]) => id),
  hashes: Object.fromEntries(await Promise.all(['stream.jsonl', 'result.json', 'input-manifest.json', 'evidence-bundle.json', 'full-prompt.md', 'schema.json', 'reply.md', 'page-delivery.jsonl'].map(async path => [path, sha256(await readFile(join(judge, path)))]))),
  limitations: [
    'Exact schema, eligible statuses and whitespace-normalized citation matching do not establish correctness of each judgement.',
    'The judge received actor checks but no coordinator acceptance manifest, screenshot pixels, physical-phone evidence or author approval.',
    'Page receipt and ordered calls do not establish model comprehension or history retention.',
    'The prior-run contact-sheet helper exposure remains a reproduction caveat; no held-out visual solution read was established.',
  ],
};
if (process.argv.includes('--print-judgement')) process.stdout.write(final.text + '\n');
else process.stdout.write(JSON.stringify(report, null, 2) + '\n');
