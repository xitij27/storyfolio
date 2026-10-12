// Read-only readiness integrity check. Writes only a new derivative in this study.
import assert from 'node:assert/strict';
import { constants } from 'node:fs';
import { access, lstat, readFile, readdir, readlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hash, json, inspectWorkspace, validateCase, verifyInputs } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/lib/build.mjs';
import { captureSource } from '../codex-bench-depth-candidate-1/inputs/implementation/evals/lib/build-capture.mjs';

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, '../../..');
const cohort = resolve(study, '../codex-bench-depth-candidate-1');
const run = join(cohort, 'bench-depth-2/baseline-1');
const inputs = join(cohort, 'inputs'), oldCapture = join(run, 'acceptance');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
async function filesAt(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.equal(entry.isSymbolicLink(), false, path);
    if (entry.isDirectory()) files.push(...await filesAt(directory, path));
    else { assert.equal(entry.isFile(), true, path); files.push(path); }
  }
  return files.sort();
}
const frozen = await verifyInputs(inputs);
assert.equal(frozen.digest, 'a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353');
assert.equal(Object.keys(frozen.hashes).length, 124);
const meta = await readJson(join(run, 'meta.json'));
const actorBytes = await readFile(join(run, 'turns/01/result.json')), actor = JSON.parse(actorBytes);
assert.equal(hash(actorBytes), '8dd3a7ae4b61df512ae02ae2817aa84fb5fc78a89d229208701fa59a8fe08d50');
assert.equal(actor.complete, false);
assert.equal(actor.timedOut, true);
assert.equal(actor.usage, null);
for (const [path, digest] of Object.entries(actor.artifacts)) assert.equal(hash(await readFile(join(run, 'turns/01', path))), digest, path);
const snapshot = await readJson(join(run, 'turns/01/snapshot/manifest.json'));
assert.deepEqual(snapshot, actor.snapshot);
assert.equal(Object.keys(snapshot.files).length, 184);
assert.deepEqual(await filesAt(join(run, 'turns/01/snapshot/files')), Object.keys(snapshot.files).sort());
for (const [path, record] of Object.entries(snapshot.files)) {
  const bytes = await readFile(join(run, 'turns/01/snapshot/files', path));
  assert.equal(bytes.length, record.size, path);
  assert.equal(hash(bytes), record.hash, path);
}
const sourceCase = validateCase(await readJson(join(inputs, 'case.json')));
const currentActor = await inspectWorkspace(meta.work, sourceCase.snapshot);
assert.deepEqual(Object.fromEntries(Object.entries(currentActor.entries).map(([path, { bytes, ...record }]) => [path, record])), snapshot.files);
const current = await captureSource(meta.work);
assert.equal(current.files.length, 184);
assert.equal(current.digest, '830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7');
assert.deepEqual(Object.fromEntries(current.files.map(file => [file.path, { type: 'file', hash: file.sha256, size: file.bytes }])), snapshot.files);
const shippedSkill = Object.entries(frozen.hashes).filter(([path]) => path.startsWith('skill/'));
assert.equal(shippedSkill.length, 86);
assert.deepEqual(await filesAt(join(root, 'skills/storyfolio')), shippedSkill.map(([path]) => path.slice(6)).sort());
for (const [path, digest] of shippedSkill) assert.equal(hash(await readFile(join(root, 'skills/storyfolio', path.slice(6)))), digest, path);
const originalBytes = await readFile(join(oldCapture, 'manifest.json'));
assert.equal(hash(originalBytes), 'b21f8baa6e9568c71e7d0cde2957c4e2405eff4018c09594de76f2fa23296572');
const original = JSON.parse(originalBytes);
assert.equal(original.complete, false);
assert.equal(original.passed, false);
assert.equal(original.sourceUnchanged, true);
assert.equal(Object.keys(original.artifacts).length, 134);
assert.deepEqual((await filesAt(oldCapture)).filter(path => path !== 'manifest.json'), Object.keys(original.artifacts).sort());
for (const [path, digest] of Object.entries(original.artifacts)) assert.equal(hash(await readFile(join(oldCapture, path))), digest, path);
for (const [path, digest] of Object.entries(original.frozen)) assert.equal(hash(await readFile(path)), digest, path);
assert.deepEqual(current, original.sourceBefore);
assert.deepEqual(current, original.sourceAfter);
const oldProcess = await readJson(join(run, 'acceptance-review/process.json'));
assert.equal(oldProcess.code, 1);
assert.equal(oldProcess.signal, null);
const oldTerminal = await readJson(join(run, 'acceptance-review/tool-poll-07.json'));
assert.equal(oldTerminal.exit_code, 1);
assert.equal(oldTerminal.session_id, undefined);
const emptyDirectories = [];
for (const name of ['.aws', '.codex', '.git']) {
  const path = join(meta.work, name), stat = await lstat(path);
  assert.ok(stat.isDirectory() && !stat.isSymbolicLink());
  assert.deepEqual(await readdir(path), []);
  emptyDirectories.push({ name, symlink: false, entries: 0, contentsRead: false });
}
assert.ok((await lstat(meta.work)).isDirectory());
assert.equal((await lstat(meta.work)).isSymbolicLink(), false);
await access(meta.work, constants.R_OK | constants.W_OK | constants.X_OK);
const capabilities = await readJson(join(inputs, 'capabilities.json'));
await access(capabilities.node.executable, constants.R_OK | constants.X_OK);
const processScan = { method: 'Same-UID /proc cwd links and process comm names only; no command lines, environments, signals or process mutation', sameUidInspected: 0, unavailable: [], workspaceCwdProcesses: [], oldCapturePids: [] };
for (const pid of (await readdir('/proc')).filter(name => /^\d+$/.test(name))) {
  try {
    if ((await lstat(`/proc/${pid}`)).uid !== process.getuid()) continue;
    processScan.sameUidInspected++;
    const cwd = await readlink(`/proc/${pid}/cwd`);
    if (cwd === meta.work || cwd.startsWith(`${meta.work}/`)) processScan.workspaceCwdProcesses.push({ pid: Number(pid), cwd, comm: (await readFile(`/proc/${pid}/comm`, 'utf8')).trim() });
  } catch (error) {
    assert.ok(['ENOENT', 'EACCES', 'ESRCH'].includes(error.code), String(error));
    processScan.unavailable.push({ pid: Number(pid), code: error.code });
  }
}
for (const pid of [4145954, 4145966]) {
  const exists = await lstat(`/proc/${pid}`).then(() => true).catch(error => { if (error.code === 'ENOENT') return false; throw error; });
  processScan.oldCapturePids.push({ pid, exists });
}
assert.deepEqual(processScan.workspaceCwdProcesses, [], 'A process still has its cwd in the candidate workspace; investigate before capture');
assert.ok(processScan.oldCapturePids.every(item => !item.exists), 'Old capture PID currently exists; do not assume its identity or kill it');
const result = {
  schemaVersion: 1, checkedAt: new Date().toISOString(), verified: true, modelCalls: 0, browserCalls: 0, builds: 0, processMutations: 0,
  scope: 'Readiness source/input/historical evidence integrity only, not a new capture, complete actor delivery or Stage 3 acceptance',
  inputDigest: frozen.digest, frozenInputCount: 124, shippedSkillFiles: 86, shippedEngineFiles: shippedSkill.filter(([path]) => path.startsWith('skill/engine/')).length,
  shippedSkillAndEngineEqualFrozenCandidate: true, mainSkillSha256: frozen.hashes['skill/SKILL.md'],
  actor: { resultSha256: hash(actorBytes), artifactHashesVerified: Object.keys(actor.artifacts).length, complete: false, timedOut: true, usage: null },
  source: { files: 184, digest: current.digest, savedSnapshotEqualsCurrent: true, actorAndCaptureScopesEqual: true, originalCaptureBeforeAfterEqual: true, workspace: meta.work, workspaceAccessible: true, emptyDirectories },
  oldCapture: { manifestSha256: hash(originalBytes), complete: false, passed: false, artifactsVerified: 134, frozenEntryPointsVerified: Object.keys(original.frozen).length, closedToolExitCode: 1, processFinished: oldProcess.finished },
  processScan,
  qualifications: ['Candidate application includes the five actor-local core adaptations already present in its saved partial snapshot; unchanged means no post-turn edit, not an unmodified copied engine.', 'Process observation is instantaneous and same-user cwd scoped, not proof of absence of every possible reader/process.', 'No new dependency installation or historical dependency-tree reconstruction was attempted.', 'This source audit alone does not approve a capture wrapper or authorize launch. Root controls the separately approved one-capture launch.'],
};
if (process.argv.includes('--save')) await writeFile(join(study, 'readiness-source-audit.json'), json(result), { flag: 'wx' });
console.log(json(result));
