// Read-only verification of settled actor evidence. Optional new derivative output only.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectWorkspace, validateCase, verifyInputs } from './inputs/implementation/evals/lib/build.mjs';
import { captureSource } from './inputs/implementation/evals/lib/build-capture.mjs';
import { isBareGitMetadata } from './inputs/implementation/evals/lib/source-scope.mjs';

const cohort = dirname(fileURLToPath(import.meta.url));
const run = join(cohort, 'bench-depth-2/baseline-1');
const turn = join(run, 'turns/01');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const inputs = await verifyInputs(join(cohort, 'inputs'));
assert.equal(inputs.digest, '40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a');
const meta = await readJson(join(run, 'meta.json'));
assert.equal(meta.inputDigest, inputs.digest);
const result = await readJson(join(turn, 'result.json'));
const processRecord = await readJson(join(turn, 'process.json'));
const rawStream = await readFile(join(turn, 'stream.jsonl'));
assert.equal(sha(rawStream), '80e8bba144092ac653bb10b4dc2ade0f6573880132f3ec0e76c023d7ab2e013c');
assert.equal(sha(await readFile(join(turn, 'result.json'))), '4a17ae79418f4d40a1055635921bd201dfa4defafb220a79a394a4d7da129107');
assert.equal(result.complete, true);
assert.equal(result.timedOut, false);
assert.equal(result.interruptedBy, null);
assert.equal(result.captureError, undefined);
assert.equal(processRecord.code, 0);
assert.equal(processRecord.spawnError, null);
assert.equal(processRecord.logError, null);
const events = rawStream.toString('utf8').trimEnd().split('\n').map((line, index) => ({ line: index + 1, event: JSON.parse(line) }));
assert.equal(events.at(-1).event.type, 'turn.completed');
assert.deepEqual(events.at(-1).event.usage, result.usage);
const commands = events.filter(({ event }) => event.type === 'item.completed' && event.item?.type === 'command_execution').map(({ line, event }) => ({ line, ...event.item }));
for (const { event } of events.filter(({ event }) => event.type === 'item.started' && event.item?.type === 'command_execution')) {
  assert.equal(commands.filter(command => command.id === event.item.id && command.command === event.item.command).length, 1);
}
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
const records = Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...record }]) => [path, record]));
assert.deepEqual(records, after.files);
const captured = await captureSource(meta.work);
assert.deepEqual(captured.files.map(({ path }) => path).sort(), Object.keys(after.files).sort());
for (const file of captured.files) {
  assert.equal(file.sha256, after.files[file.path].hash, file.path);
  assert.equal(file.bytes, after.files[file.path].size, file.path);
}
const emptyUnexpectedDirectories = [];
for (const name of ['.aws', '.codex']) {
  const stat = await lstat(join(meta.work, name));
  assert.equal(stat.isSymbolicLink(), false);
  assert.equal(stat.isDirectory(), true);
  const names = await readdir(join(meta.work, name));
  assert.equal(names.length, 0);
  emptyUnexpectedDirectories.push({ path: name, type: 'directory', symlink: false, entryCount: 0, contentsOpened: false });
}
const gitEntry = (await readdir(meta.work, { withFileTypes: true })).find(entry => entry.name === '.prototype-git');
assert.equal(await isBareGitMetadata(meta.work, '.prototype-git', gitEntry), true);
const changes = [...new Set([...Object.keys(before.files), ...Object.keys(after.files)])].sort().filter(path => JSON.stringify(before.files[path]) !== JSON.stringify(after.files[path])).map(path => ({ path, change: !before.files[path] ? 'added' : !after.files[path] ? 'deleted' : 'modified' }));
const protectedPaths = Object.keys(before.files).filter(path => path.startsWith('.agents/') || path.startsWith('components/') || path.startsWith('lib/') || ['package.json', 'package-lock.json', 'scripts/review-sheets.mjs', 'docs/story/facts.md', 'docs/story/confirmations.md', 'docs/story/evaluation-environment.md', 'docs/story/environment-setup.json', 'public/assets/power-states.svg', 'public/assets/bring-up-fixture.svg'].includes(path));
for (const path of protectedPaths) assert.deepEqual(after.files[path], before.files[path], path);
const fullReads = [
  ['item_2', ['.agents/skills/storyfolio/SKILL.md']],
  ['item_3', ['docs/story/handover.md']],
  ['item_4', ['README.md', ...['facts', 'confirmations', 'storyboard', 'assets', 'evaluation-environment'].map(name => `docs/story/${name}.md`)]],
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
const provenance = await readJson(join(turn, 'snapshot/files/docs/story/review/provenance.json'));
for (const file of provenance.files) {
  assert.equal(file.source.startsWith('checks/'), true);
  assert.equal(after.files[file.copy]?.hash, file.sha256, file.copy);
  const archived = archive.files.find(entry => entry.path === file.source.slice('checks/'.length));
  assert.equal(archived?.sha256, file.sha256, file.source);
}
const output = {
  schemaVersion: 1, date: '2026-10-12', modelCalls: 0, browserCalls: 0,
  inputDigest: inputs.digest, frozenInputCount: Object.keys(inputs.hashes).length,
  streamSha256: sha(rawStream), resultSha256: sha(await readFile(join(turn, 'result.json'))),
  terminalLine: events.at(-1).line, eventLines: events.length, completedCommands: commands.length,
  agentMessages: events.filter(({ event }) => event.type === 'item.completed' && event.item?.type === 'agent_message').length,
  resultComplete: result.complete, processExitCode: processRecord.code, durationMs: result.durationMs, usage: result.usage,
  savedArtifactCount: Object.keys(result.artifacts).length, savedArtifactHashesAndSetValid: true,
  beforeFileCount: Object.keys(before.files).length, afterFileCount: Object.keys(after.files).length,
  actualBeforeChanges: changes, changeCounts: Object.fromEntries(['added', 'modified', 'deleted'].map(kind => [kind, changes.filter(change => change.change === kind).length])),
  snapshotManifestChangeBasis: 'Runner snapshot.changes compares the 174-file setup snapshot. This audit compares the actual 175-file before-turn snapshot; environment-setup.json is inherited and unchanged.',
  protectedPathsUnchanged: protectedPaths, currentWorkspaceEqualsFinalSnapshot: true,
  frozenCaptureSourceEqualsFinalSnapshot: true, sourceDigest: captured.digest, exclusions: captured.exclusions,
  actorExcluded: after.excluded, actorUnexpected: after.unexpected, emptyUnexpectedDirectories,
  bareMetadata: { path: '.prototype-git', acceptedByFrozenWholeTreePredicate: true },
  verifiedFullReads, suppliedReviewHelperSha256: after.files['scripts/review-sheets.mjs'].hash,
  archive: { fileCount: archive.fileCount, bytes: archive.bytes, sourceCopiesVerified: provenance.files.length, archivedHashesAndSetValid: true },
  telemetryLimit: '48 saved shell commands and outputs reviewed; this format contains no image-open telemetry. Absence is not proof that image access was impossible or that claimed visual inspection occurred.',
  commands: commands.map(({ id, line, command, aggregated_output, exit_code, status }) => ({ id, line, command, exitCode: exit_code, status, outputBytes: Buffer.byteLength(aggregated_output), outputSha256: sha(aggregated_output) })),
};
if (process.argv.includes('--save')) await writeFile(join(cohort, 'actor-audit-verification.json'), JSON.stringify(output, null, 2) + '\n', { flag: 'wx' });
process.stdout.write(JSON.stringify({ valid: true, ...Object.fromEntries(Object.entries(output).filter(([key]) => !['commands', 'actualBeforeChanges', 'protectedPathsUnchanged', 'exclusions', 'actorExcluded', 'verifiedFullReads'].includes(key))) }, null, 2) + '\n');
