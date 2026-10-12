// Root-only evidence recovery. Never manufacture missing actor closure records.
import assert from 'node:assert/strict';
import { readdir, readFile, readlink, lstat, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { captureBuildWorkspace, validateCase, hash, json, writeNew } from '../../codex-bench-entry-candidate-1/inputs/implementation/evals/lib/build.mjs';
import { captureSource, artifactInventory, regularBytes } from '../entry-replay/bindings.mjs';
const root = resolve('.');
const cohort = join(root, 'evals/runs/codex-bench-entry-candidate-1');
const run = join(cohort, 'bench-entry-1/baseline-1');
const study = join(root, 'evals/runs/stage-3-completion-2/entry-candidate-preparation');
const out = join(study, 'interruption-recovery');
const meta = JSON.parse(await readFile(join(run, 'meta.json')));
assert.equal(meta.work, '/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-Ivff90');
async function owned() {
  const matches = [];
  for (const pid of (await readdir('/proc')).filter(value => /^\d+$/.test(value))) {
    try {
      const cwd = await readlink(`/proc/${pid}/cwd`);
      const argv = (await readFile(`/proc/${pid}/cmdline`, 'utf8')).split('\0');
      if (cwd === meta.work || cwd.startsWith(meta.work + '/') || argv.includes('codex-bench-entry-candidate-1')) matches.push({ pid, cwd, executable: argv[0] });
    } catch (error) { if (!['ENOENT', 'ESRCH', 'EACCES'].includes(error.code)) throw error; }
  }
  return matches;
}
const beforeProcesses = await owned(); assert.deepEqual(beforeProcesses, []);
const terminal = JSON.parse(await readFile(join(study, 'actor-tool-poll-2.json')));
assert.equal(terminal.exit_code, 143); assert.equal(terminal.session_id, undefined);
for (const path of [join(run, 'turns/01/result.json'), join(study, 'actor-command/result.json')]) assert.equal(await lstat(path).catch(error => error.code === 'ENOENT' ? null : Promise.reject(error)), null);
await mkdir(out);
const before = await captureSource(meta.work);
await writeNew(join(out, 'original-source.json'), json(before));
const source = validateCase(JSON.parse(await readFile(join(cohort, 'inputs/case.json'))));
const initial = JSON.parse(await readFile(join(run, 'turns/01/before/manifest.json')));
const snapshot = await captureBuildWorkspace(meta.work, join(out, 'snapshot'), source.snapshot, initial.files);
const checks = await artifactInventory(join(meta.work, 'checks'));
assert(checks.reduce((sum, file) => sum + file.bytes, 0) < 100 * 1024 * 1024);
for (const file of checks) await writeNew(join(out, 'actor-checks', file.path), await regularBytes(join(meta.work, 'checks'), file.path));
await writeNew(join(out, 'actor-checks-inventory.json'), json(checks));
const after = await captureSource(meta.work); assert.deepEqual(after, before);
const afterProcesses = await owned(); assert.deepEqual(afterProcesses, []);
const rawPaths = ['turns/01/started.json', 'turns/01/prompt.md', 'turns/01/stream.jsonl', 'turns/01/stderr.log'];
const artifacts = {};
for (const path of rawPaths) artifacts[path] = hash(await readFile(join(run, path)));
const stream = (await readFile(join(run, 'turns/01/stream.jsonl'), 'utf8')).trim().split('\n').map(line => JSON.parse(line));
const record = { schemaVersion: 1, recorded: new Date().toISOString(), kind: 'coordinator-recovery-after-missing-closure', work: meta.work, inputDigest: meta.inputDigest, terminalExit: terminal.exit_code, actorComplete: false, actorResultMissing: true, recorderResultMissing: true, usage: null, signalSender: 'unknown', timeoutObserved: false, sourceFiles: Object.keys(snapshot.files).length, fullSourceFiles: before.files.length, sourceDigest: before.digest, unexpected: snapshot.unexpected, sourceUnchangedDuringCopy: true, ownedProcessesBefore: beforeProcesses, ownedProcessesAfter: afterProcesses, actorCheckFiles: checks.length, rawArtifacts: artifacts, streamEvents: stream.length, terminalModelEvents: stream.filter(event => ['turn.completed', 'turn.failed'].includes(event.type)), modelCalls: 0, sourceChanges: 0, limits: 'Exit143 is consistent with termination but does not identify the sender, exact stop time or killed process tree. No final reply, usage, actor result, timeout claim or normal process result is reconstructed. This is later coordinator evidence, not an actor snapshot or accepted choice gate.' };
await writeNew(join(out, 'recovery.json'), json(record));
console.log(json(record));
