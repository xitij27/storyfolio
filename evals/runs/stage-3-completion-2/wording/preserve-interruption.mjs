// Root-only evidence copy after the genuine interrupted result has closed.
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { captureSource, artifactInventory, regularBytes, hash, json, writeNew, assertSnapshot } from '../entry-replay/bindings.mjs';
const root = resolve('.'), study = join(root, 'evals/runs/stage-3-completion-2/wording');
const run = join(root, 'evals/runs/codex-build-wording-candidate-1/embedded-completion-1/baseline-1');
const turn = join(run, 'turns/01'), out = join(study, 'interruption-preservation');
const read = async path => JSON.parse(await readFile(path));
const meta = await read(join(run, 'meta.json')), actor = await read(join(turn, 'result.json'));
assert.equal(meta.work, '/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-embedded-completion-1-kE257A');
assert.equal(actor.complete, false); assert.equal(actor.timedOut, false); assert.equal(actor.interruptedBy, 'SIGTERM'); assert.equal(actor.usage, null);
const recorder = await read(join(study, 'actor-turn-1/result.json'));
assert.equal(recorder.complete, false); assert.equal(recorder.status, 'externally-interrupted'); assert.equal(recorder.childClosed, true);
const terminal = await read(join(study, 'actor-turn-1-tool-poll-10.json'));
assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined); assert.equal(JSON.parse(terminal.output).finished, recorder.finished);
for (const [path, sha256] of Object.entries(actor.artifacts)) assert.equal(hash(await regularBytes(turn, path)), sha256, path);
for (const [path, sha256] of Object.entries(recorder.rawArtifacts)) assert.equal(hash(await regularBytes(join(study, 'actor-turn-1'), path)), sha256, path);
const before = await captureSource(meta.work); assertSnapshot(before, actor.snapshot.files);
await mkdir(out);
await writeNew(join(out, 'source.json'), json(before));
const checks = await artifactInventory(join(meta.work, 'checks'));
assert(checks.reduce((sum, file) => sum + file.bytes, 0) < 100 * 1024 * 1024);
for (const file of checks) await writeNew(join(out, 'workspace-checks', file.path), await regularBytes(join(meta.work, 'checks'), file.path));
await writeNew(join(out, 'workspace-checks-inventory.json'), json(checks));
// The actor wrote this helper outside its workspace. Preserve only its named file.
const temporaryHelper = '/tmp/storyfolio-contact-sheets.cjs', helper = await readFile(temporaryHelper);
await writeNew(join(out, 'actor-temporary-helper.cjs'), helper);
assert.deepEqual(await captureSource(meta.work), before);
const groups = {};
for (const file of checks) { const key = file.path.split('/')[0]; groups[key] ??= { files: 0, pngs: 0, bytes: 0 }; groups[key].files++; groups[key].pngs += Number(file.path.endsWith('.png')); groups[key].bytes += file.bytes; }
const stream = (await readFile(join(turn, 'stream.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
const started = stream.filter(e => e.type === 'item.started' && e.item?.type === 'command_execution');
const finished = new Set(stream.filter(e => e.type === 'item.completed' && e.item?.type === 'command_execution').map(e => e.item.id));
const record = { schemaVersion: 1, recorded: new Date().toISOString(), kind: 'preserve-genuine-interrupted-result', inputDigest: meta.inputDigest,
  actorResultSha256: hash(await readFile(join(turn, 'result.json'))), recorderResultSha256: hash(await readFile(join(study, 'actor-turn-1/result.json'))),
  actorComplete: false, timedOut: false, interruptedBy: 'SIGTERM', signalSender: 'unknown', usage: null, sourceUnchanged: true, sourceFiles: before.files.length, sourceDigest: before.digest,
  verifiedActorArtifacts: Object.keys(actor.artifacts).length, checkGroups: groups, workspaceChecksInventorySha256: hash(await readFile(join(out, 'workspace-checks-inventory.json'))),
  actorTemporaryHelper: { original: temporaryHelper, sha256: hash(helper), bytes: helper.length }, streamEvents: stream.length,
  terminalEvents: stream.filter(e => ['turn.completed', 'turn.failed'].includes(e.type)), unmatchedCommands: started.filter(e => !finished.has(e.item.id)).map(e => ({ id: e.item.id, command: e.item.command })),
  modelCalls: 0, sourceChanges: 0, browserCalls: 0, nextTurnAllowed: false,
  limitations: 'Setup-capability is coordinator evidence, the two timestamped groups are unfinished actor checks. Their images are archived, not independently reviewed. This copy does not repair closure, supply usage or create a final choice handoff. Scoped process checks are separate.' };
await writeNew(join(out, 'preservation.json'), json(record));
console.log(json({ sourceFiles: record.sourceFiles, sourceDigest: record.sourceDigest, verifiedActorArtifacts: record.verifiedActorArtifacts, checkGroups: groups, unmatchedCommands: record.unmatchedCommands.map(row => row.id), terminalEvents: record.terminalEvents, nextTurnAllowed: false }));
