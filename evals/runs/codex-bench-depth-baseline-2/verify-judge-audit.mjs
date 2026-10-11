// Run only after root confirms the single judge process has settled.
// Read-only evidence validation; optional exclusive derivative output, no model call.
import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareBuildJudge, buildJudgeArgs } from './inputs/implementation/evals/codex-build-judge.mjs';
import { hash, json } from './inputs/implementation/evals/lib/build.mjs';
import { finalCodexMessage, summariseCodex } from './inputs/implementation/evals/lib/codex.mjs';
import { buildJudgementSchema, validateBuildJudgement, buildScoreCounts } from './inputs/implementation/evals/lib/build-score.mjs';
import { verifyPagedEvidence, verifyPageCoverage } from './inputs/implementation/evals/lib/judge-transport.mjs';

const cohort = dirname(fileURLToPath(import.meta.url)), root = resolve(cohort, '../../..');
const run = 'evals/runs/codex-bench-depth-baseline-2/bench-depth-2/baseline-1';
const judge = join(root, run, 'judge');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const result = await readJson(join(judge, 'result.json'));
const processRecord = await readJson(join(judge, 'process.json'));
assert.equal(result.complete, true, 'This strict audit does not recover or reinterpret a failed runner outcome');
assert.equal(result.modelCalls, 1);
assert.equal(processRecord.code, 0);
assert.equal(processRecord.timedOut, false);
assert.equal(processRecord.interruptedBy, null);
assert.equal(processRecord.spawnError, null);
assert.equal(result.timedOut, false);
assert.equal(result.interruptedBy, null);
const prepared = await prepareBuildJudge({ root, run, acceptance: 'acceptance/manifest.json' });
const preflight = await readJson(join(root, 'evals/runs/stage-3-comparison-1/baseline-judge-preflight/packet-audit.json'));
assert.equal(prepared.bundleSha256, preflight.bundleSha256);
const input = await readJson(join(judge, 'input-manifest.json'));
assert.equal(input.inputDigest, prepared.frozen.digest);
assert.equal(input.model, 'gpt-6-astra');
assert.equal(input.reasoningEffort, 'medium');
assert.equal(input.timeoutMs, 600000);
assert.deepEqual(input.artifacts, prepared.artifacts);
assert.equal(input.promptSha256, prepared.promptSha256);
assert.equal(input.promptBytes, prepared.promptBytes);
assert.equal(input.bundleSha256, prepared.bundleSha256);
assert.deepEqual(input.logicalPrompt, prepared.bundle.prompt);
assert.equal(await readFile(join(judge, 'prompt.md'), 'utf8'), prepared.prompt);
assert.equal(await readFile(join(judge, 'full-prompt.md'), 'utf8'), prepared.fullPrompt);
assert.deepEqual(await readJson(join(judge, 'schema.json')), buildJudgementSchema('prototype-depth'));
const evidenceServer = { script: join(root, 'evals/judge-evidence-server.mjs'), bundle: join(judge, 'evidence-bundle.json'), ledger: join(judge, 'page-delivery.jsonl') };
assert.deepEqual(processRecord.args, buildJudgeArgs({ schema: join(judge, 'schema.json'), evidenceServer, disabled: input.disabledSkills }));
const bundleBytes = await readFile(evidenceServer.bundle), bundle = JSON.parse(bundleBytes);
assert.equal(hash(bundleBytes), input.bundleSha256);
assert.deepEqual(bundle, prepared.bundle);
const verified = verifyPagedEvidence(bundle);
assert.equal(verified.pageCount, 84);
const ledger = await readFile(evidenceServer.ledger, 'utf8');
const delivery = verifyPageCoverage(bundle, ledger);
assert.deepEqual(result.delivery, delivery);
const savedDelivery = await readJson(join(judge, 'delivery.json'));
for (const [key, value] of Object.entries(delivery)) assert.deepEqual(savedDelivery[key], value);
const receipts = ledger.trimEnd().split('\n').map(JSON.parse);
const firstDeliveryOrder = [...new Set(receipts.map(receipt => receipt.pageId))];
assert.deepEqual(firstDeliveryOrder, bundle.pages.map(page => page.id), 'Pages were not first delivered in required order');
const rawStream = await readFile(join(judge, 'stream.jsonl'), 'utf8');
const events = rawStream.split('\n').filter(line => line.trim()).map(JSON.parse);
const summary = summariseCodex(rawStream, processRecord.code);
assert.equal(summary.failed, false);
assert.equal(summary.sessionId, result.sessionId);
assert.deepEqual(summary.usage, result.usage);
assert.equal(await readFile(join(judge, 'reply.md'), 'utf8'), summary.reply + '\n');
const final = finalCodexMessage(rawStream, processRecord.code);
assert.equal(await readFile(join(judge, 'final-message.txt'), 'utf8'), final);
const judgement = JSON.parse(final);
const validationProblems = validateBuildJudgement(judgement, { turnCount: prepared.packet.turnCount, taskKind: prepared.packet.taskKind, requestedStops: prepared.packet.requestedStops,
  refusalTurns: prepared.packet.refusalTurns, evidence: prepared.evidence, sourcePacketAvailable: false });
assert.deepEqual(validationProblems, []);
const savedJudgement = await readJson(join(judge, 'judgement.json'));
assert.deepEqual(savedJudgement.judgement, judgement);
assert.deepEqual(savedJudgement.usage, result.usage);
assert.equal(savedJudgement.inputDigest, prepared.frozen.digest);
assert.deepEqual(buildScoreCounts(judgement), result.counts);
async function paths(directory, prefix = '') {
  const found = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.equal(entry.isSymbolicLink(), false, path);
    if (entry.isDirectory()) found.push(...await paths(directory, path));
    else { assert.equal(entry.isFile(), true, path); found.push(path); }
  }
  return found.sort();
}
assert.deepEqual((await paths(judge)).filter(path => path !== 'result.json'), Object.keys(result.artifacts).sort());
for (const [path, sha256] of Object.entries(result.artifacts)) assert.equal(hash(await readFile(join(judge, path))), sha256, path);
const completedItems = events.filter(event => event.type === 'item.completed').map(event => event.item);
const toolItems = completedItems.filter(item => item.type !== 'agent_message' && item.type !== 'reasoning');
const citations = Object.entries(judgement.criteria).flatMap(([criterion, verdict]) => verdict.evidence.map(citation => ({ criterion, status: verdict.status, ...citation, literalExcerpt: prepared.evidence[citation.path].includes(citation.excerpt) })));
const audit = {
  schemaVersion: 1, date: '2026-10-12', valid: true, modelCalls: 0, browserCalls: 0,
  meaning: 'Independent read-only validation of the actual successful runner outcome, not a recovered result, retry or official rejudgement. Root separately confirmed settled process before execution.',
  inputDigest: prepared.frozen.digest, actorSourceDigest: preflight.sourceDigest,
  judgeProcessExitCode: processRecord.code, judgeComplete: result.complete, judgeModelCalls: result.modelCalls,
  durationMs: result.durationMs, usage: result.usage, costUsd: result.costUsd, counts: result.counts,
  logicalPrompt: bundle.prompt, bundleSha256: input.bundleSha256, bundleDigest: bundle.digest,
  preflightPacketUnchanged: true, artifactCount: Object.keys(result.artifacts).length, exactArtifactSetAndHashesVerified: true,
  resultSha256: hash(await readFile(join(judge, 'result.json'))), streamSha256: hash(rawStream), finalMessageSha256: hash(final),
  pageDelivery: { ...delivery, inOrderFirstDelivery: true, duplicateReceipts: receipts.length - firstDeliveryOrder.length },
  streamEvents: events.length, terminalEvent: events.at(-1).type, terminalMessageId: events.at(-2).item.id,
  agentMessageCount: completedItems.filter(item => item.type === 'agent_message').length,
  aggregateReplyUsedForParsing: false, strictFrozenFinalExtraction: true, frozenSchemaEvidenceEligibilityProblems: validationProblems,
  criterionEligibility: prepared.packet.criterionEligibility, criteria: Object.fromEntries(Object.entries(judgement.criteria).map(([id, verdict]) => [id, { status: verdict.status, reason: verdict.reason }])),
  citations, summary: judgement.summary, unblinding: judgement.unblinding,
  toolItems: toolItems.map(item => ({ id: item.id, type: item.type, server: item.server, tool: item.tool, arguments: item.arguments, status: item.status })),
  limits: ['All pages emitted is not proof of comprehension or retention.', 'The text judge received no original pixels and cannot establish visual approval.', 'Frozen validators establish schema, observation eligibility and citation presence, not correctness of every semantic inference.', 'No real-author approval, physical-phone result, natural early-gate coverage or Stage 3 completion is inferred.'],
};
if (process.argv.includes('--save')) await writeFile(join(cohort, 'judge-audit-verification.json'), json(audit), { flag: 'wx' });
process.stdout.write(json({ valid: true, modelCalls: 0, judgeComplete: result.complete, durationMs: result.durationMs, usage: result.usage, counts: result.counts, artifactCount: audit.artifactCount,
  pageDelivery: audit.pageDelivery, terminalMessageId: audit.terminalMessageId, agentMessageCount: audit.agentMessageCount, citationCount: citations.length, literalCitationCount: citations.filter(citation => citation.literalExcerpt).length }));
