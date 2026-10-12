// Read-only verification of settled, timed-out actor evidence. Optional new derivative only.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectWorkspace, validateCase, verifyInputs } from './inputs/implementation/evals/lib/build.mjs';
import { captureSource } from './inputs/implementation/evals/lib/build-capture.mjs';

const cohort = dirname(fileURLToPath(import.meta.url));
const run = join(cohort, 'bench-depth-2/baseline-1'), turn = join(run, 'turns/01');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const inputs = await verifyInputs(join(cohort, 'inputs'));
assert.equal(inputs.digest, 'a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353');
const meta = await readJson(join(run, 'meta.json'));
assert.equal(meta.inputDigest, inputs.digest);
const result = await readJson(join(turn, 'result.json'));
const processRecord = await readJson(join(turn, 'process.json'));
const rawStream = await readFile(join(turn, 'stream.jsonl'));
assert.equal(sha(rawStream), '557925f03775b30d13a10cf3bed4cda208cd1c5252a81f5742c191fca1b03e5d');
assert.equal(sha(await readFile(join(turn, 'result.json'))), '8dd3a7ae4b61df512ae02ae2817aa84fb5fc78a89d229208701fa59a8fe08d50');
assert.equal(result.complete, false);
assert.equal(result.timedOut, true);
assert.equal(result.interruptedBy, null);
assert.equal(result.usage, null);
assert.equal(result.captureError, undefined);
assert.equal(processRecord.code, -1);
assert.equal(processRecord.timedOut, true);
assert.equal(processRecord.spawnError, null);
assert.equal(processRecord.logError, null);
const events = rawStream.toString('utf8').trimEnd().split('\n').map((line, index) => ({ line: index + 1, event: JSON.parse(line) }));
assert.equal(events.length, 145);
assert.equal(events.some(({ event }) => event.type === 'turn.completed'), false);
const commands = events.filter(({ event }) => event.type === 'item.completed' && event.item?.type === 'command_execution').map(({ line, event }) => ({ line, ...event.item }));
const starts = events.filter(({ event }) => event.type === 'item.started' && event.item?.type === 'command_execution').map(({ line, event }) => ({ line, ...event.item }));
for (const command of commands) assert.equal(starts.filter(start => start.id === command.id && start.command === command.command).length, 1);
const pending = starts.filter(start => !commands.some(command => command.id === start.id));
assert.deepEqual(pending.map(item => item.id), ['item_30', 'item_74', 'item_75', 'item_76']);
assert.deepEqual(result.commands, commands.map(item => ({ command: item.command, output: item.aggregated_output, exitCode: item.exit_code })));
const messages = events.filter(({ event }) => event.type === 'item.completed' && event.item?.type === 'agent_message');
const savedReply = await readFile(join(turn, 'reply.md'), 'utf8');
for (const { event } of messages) assert.ok(savedReply.includes(event.item.text));
async function paths(root, prefix = '') {
  const found = [];
  for (const entry of await readdir(join(root, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.equal(entry.isSymbolicLink(), false, path);
    if (entry.isDirectory()) found.push(...await paths(root, path));
    else { assert.equal(entry.isFile(), true, path); found.push(path); }
  }
  return found.sort();
}
assert.deepEqual((await paths(turn)).filter(path => path !== 'result.json'), Object.keys(result.artifacts).sort());
for (const [path, hash] of Object.entries(result.artifacts)) assert.equal(sha(await readFile(join(turn, path))), hash, path);
const before = await readJson(join(turn, 'before/manifest.json'));
const after = await readJson(join(turn, 'snapshot/manifest.json'));
assert.deepEqual(result.snapshot, after);
for (const [name, manifest] of [['before', before], ['snapshot', after]]) {
  assert.deepEqual(await paths(join(turn, name, 'files')), Object.keys(manifest.files).sort());
  for (const [path, entry] of Object.entries(manifest.files)) {
    assert.equal(entry.type, 'file', path);
    const bytes = await readFile(join(turn, name, 'files', path));
    assert.equal(sha(bytes), entry.hash, path);
    assert.equal(bytes.length, entry.size, path);
  }
}
const sourceCase = validateCase(await readJson(join(cohort, 'inputs/case.json')));
const current = await inspectWorkspace(meta.work, sourceCase.snapshot);
assert.deepEqual(Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...record }]) => [path, record])), after.files);
const captured = await captureSource(meta.work);
assert.deepEqual(captured.files.map(({ path }) => path).sort(), Object.keys(after.files).sort());
for (const file of captured.files) {
  assert.equal(file.sha256, after.files[file.path].hash, file.path);
  assert.equal(file.bytes, after.files[file.path].size, file.path);
}
const emptyUnexpectedDirectories = [];
for (const name of ['.aws', '.codex', '.git']) {
  const stat = await lstat(join(meta.work, name));
  assert.equal(stat.isSymbolicLink(), false);
  assert.equal(stat.isDirectory(), true);
  const names = await readdir(join(meta.work, name));
  assert.equal(names.length, 0);
  emptyUnexpectedDirectories.push({ path: name, type: 'directory', symlink: false, entryCount: 0, contentsOpened: false });
}
const changes = [...new Set([...Object.keys(before.files), ...Object.keys(after.files)])].sort().filter(path => JSON.stringify(before.files[path]) !== JSON.stringify(after.files[path])).map(path => ({ path, change: !before.files[path] ? 'added' : !after.files[path] ? 'deleted' : 'modified' }));
const coreAdapters = ['components/story/conductor.tsx', 'components/story/face-material.ts', 'components/story/faces.ts', 'components/story/scene.tsx', 'components/story/types.ts'];
const protectedPaths = Object.keys(before.files).filter(path => path.startsWith('.agents/') || (path.startsWith('components/') && !coreAdapters.includes(path)) || path.startsWith('lib/') || ['package.json', 'package-lock.json', 'scripts/review-sheets.mjs', 'scripts/check-lib.mjs', 'scripts/check-lib.test.mjs', 'scripts/shoot.mjs', 'docs/story/facts.md', 'docs/story/confirmations.md', 'docs/story/storyboard.md', 'docs/story/evaluation-environment.md', 'docs/story/environment-setup.json', 'public/assets/power-states.svg', 'public/assets/bring-up-fixture.svg'].includes(path));
for (const path of protectedPaths) assert.deepEqual(after.files[path], before.files[path], path);
assert.deepEqual(changes.filter(change => change.path.startsWith('components/')).map(change => change.path), coreAdapters);
const finalScene = await readFile(join(turn, 'snapshot/files/components/story/scene.tsx'), 'utf8');
assert.ok(finalScene.includes('gl={{ preserveDrawingBuffer: still }}'));
assert.ok(pending.find(command => command.id === 'item_74').command.includes('preserveDrawingBuffer: still'));
const fullReads = [
  ['item_2', ['.agents/skills/storyfolio/SKILL.md']],
  ['item_3', ['docs/story/handover.md']],
  ['item_4', [...['facts', 'confirmations', 'storyboard', 'assets', 'evaluation-environment'].map(name => `docs/story/${name}.md`), 'README.md']],
];
const verifiedFullReads = [];
for (const [id, paths] of fullReads) {
  const command = commands.find(command => command.id === id);
  const expected = Buffer.concat(await Promise.all(paths.map(path => readFile(join(turn, 'before/files', path)))));
  assert.equal(command.aggregated_output, expected.toString('utf8'), id);
  verifiedFullReads.push({ event: id, line: command.line, paths, bytes: expected.length, sha256: sha(expected) });
}
const archive = await readJson(join(cohort, 'actor-checks/manifest.json'));
assert.equal(archive.sourceStreamSha256, sha(rawStream));
for (const file of archive.files) {
  const bytes = await readFile(join(cohort, 'actor-checks', file.path));
  assert.equal(bytes.length, file.bytes, file.path);
  assert.equal(sha(bytes), file.sha256, file.path);
}
assert.deepEqual((await paths(join(cohort, 'actor-checks'))).filter(path => path !== 'manifest.json'), archive.files.map(file => file.path).sort());
const copies = [
  ['2026-10-11T23-44-04-802Z/manifest.json', 'docs/story/review/production-manifest.json'],
  ['prototype-review-synchronized/report.json', 'docs/story/review/supplemental-report.json'],
];
for (const [source, copy] of copies) assert.equal(archive.files.find(file => file.path === source)?.sha256, after.files[copy].hash);
const lastCheck = await readJson(join(cohort, 'actor-checks/2026-10-11T23-49-17-223Z/manifest.json'));
assert.equal(lastCheck.complete, false);
assert.deepEqual(lastCheck.results, []);
const output = {
  schemaVersion: 1, date: '2026-10-12', modelCalls: 0, browserCalls: 0, validSavedPartialEvidence: true,
  inputDigest: inputs.digest, frozenInputCount: Object.keys(inputs.hashes).length,
  streamSha256: sha(rawStream), resultSha256: sha(await readFile(join(turn, 'result.json'))),
  eventLines: events.length, completedCommands: commands.length, startedCommands: starts.length,
  agentMessages: events.filter(({ event }) => event.type === 'item.completed' && event.item?.type === 'agent_message').length,
  terminalTurnCompleted: false, resultComplete: false, timedOut: true, processExitCode: processRecord.code, durationMs: result.durationMs, usage: null,
  usageMeaning: 'No terminal usage record. Actual tokens and dollar cost are unknown, not zero.',
  savedArtifactCount: Object.keys(result.artifacts).length, savedArtifactHashesAndSetValid: true,
  beforeFileCount: Object.keys(before.files).length, afterFileCount: Object.keys(after.files).length,
  actualBeforeChanges: changes, changeCounts: Object.fromEntries(['added', 'modified', 'deleted'].map(kind => [kind, changes.filter(change => change.change === kind).length])),
  snapshotManifestChangeBasis: 'Runner changes compare 174-file setup; this audit compares actual 175-file before-turn source. environment-setup.json is inherited and unchanged.',
  unchangedProtectedPaths: protectedPaths, currentWorkspaceEqualsFinalSnapshot: true,
  frozenCaptureSourceEqualsFinalSnapshot: true, sourceDigest: captured.digest, exclusions: captured.exclusions,
  actorExcluded: after.excluded, actorUnexpected: after.unexpected, emptyUnexpectedDirectories,
  coreAdapters, finalRevisionActorValidationComplete: false, pendingCommands: pending,
  verifiedFullReads, suppliedReviewHelperSha256: after.files['scripts/review-sheets.mjs'].hash,
  archive: { fileCount: archive.fileCount, bytes: archive.bytes, sourceCopiesVerified: copies, archivedHashesAndSetValid: true, emptyDirectories: archive.emptyDirectories },
  telemetryLimit: 'All saved command bodies and outputs reviewed. The stream has no image-open telemetry; original-image review claims are not independently established by that absence or by saved screenshots alone.',
  commands: commands.map(({ id, line, command, aggregated_output, exit_code, status }) => ({ id, line, command, exitCode: exit_code, status, outputBytes: Buffer.byteLength(aggregated_output), outputSha256: sha(aggregated_output) })),
};
if (process.argv.includes('--save')) await writeFile(join(cohort, 'actor-audit-verification.json'), JSON.stringify(output, null, 2) + '\n', { flag: 'wx' });
process.stdout.write(JSON.stringify(Object.fromEntries(Object.entries(output).filter(([key]) => !['commands', 'actualBeforeChanges', 'unchangedProtectedPaths', 'exclusions', 'actorExcluded', 'verifiedFullReads', 'pendingCommands'].includes(key))), null, 2) + '\n');
