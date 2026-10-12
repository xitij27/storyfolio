// Read-only postclosure audit. New derivative output only; no capture or cleanup.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { lstat, mkdir, readFile, readdir, readlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { hash, json } from '../../lib/build.mjs';
import { study, review, output, run, loadBindings } from './bindings.mjs';

assert.equal(process.argv.length, 2);
const audit = join(study, 'postcapture-audit');
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const terminalPath = join(study, 'capture-tool-poll-12.json');
const terminalBytes = await readFile(terminalPath), terminal = JSON.parse(terminalBytes);
assert.equal(terminal.exit_code, 1);
assert.equal(terminal.session_id, undefined);
const processBytes = await readFile(join(review, 'process.json')), execution = JSON.parse(processBytes);
assert.equal(execution.code, 1);
assert.equal(execution.signal, null);
assert.equal(execution.timedOut, false);
assert.equal(execution.externalSignal, 'SIGTERM');
assert.equal(execution.spawnError, null);
assert.equal(execution.timeoutMs, 895000);
assert.equal(execution.graceMs, 5000);
assert.equal(execution.totalCapMs, 900000);
const lifecycleBytes = await readFile(join(review, 'lifecycle.jsonl'));
assert.equal(hash(lifecycleBytes), execution.lifecycleSha256);
const lifecycle = lifecycleBytes.toString().trim().split('\n').map(JSON.parse);
assert.deepEqual(lifecycle.map(event => event.type), ['spawn-request', 'spawned', 'external-signal', 'stop-request', 'exit', 'closed']);
const signal = lifecycle.find(event => event.type === 'external-signal');
assert.equal(signal.sender, 'unknown');
assert.equal(signal.signal, 'SIGTERM');
assert.equal(lifecycle.at(-1).code, execution.code);
assert.equal(lifecycle.at(-1).timedOut, false);
const binding = await loadBindings();
const root = resolve(study, '../../..');
const skillInputs = Object.entries(binding.frozen.hashes).filter(([path]) => path.startsWith('skill/'));
assert.equal(skillInputs.length, 86);
for (const [path, digest] of skillInputs) assert.equal(hash(await readFile(join(root, 'skills/storyfolio', path.slice(6)))), digest, path);
for (const [path, digest] of Object.entries(binding.actor.artifacts)) assert.equal(hash(await readFile(join(run, 'turns/01', path))), digest, path);
await mkdir(audit); // Refuse to overwrite a previous independent audit.
const save = (path, bytes) => writeFile(join(audit, path), bytes, { flag: 'wx' });
const args = [join(study, 'verify-verification.mjs'), '--integrity-only'];
await save('command.json', json({ executable: process.execPath, args, cwd: root, started: new Date().toISOString(), modelCalls: 0, browserCalls: 0, builds: 0, processMutations: 0, meaning: 'Existing read-only integrity verifier only, not the capture runner' }));
const checked = spawnSync(process.execPath, args, { cwd: root, env: process.env, encoding: 'utf8', timeout: 60000, maxBuffer: 16 * 1024 * 1024 });
await save('stdout.log', checked.stdout ?? '');
await save('stderr.log', checked.stderr ?? '');
await save('process.json', json({ code: checked.status, signal: checked.signal, error: checked.error ? String(checked.error) : null, finished: new Date().toISOString(), stdoutSha256: hash(checked.stdout ?? ''), stderrSha256: hash(checked.stderr ?? '') }));
assert.equal(checked.error, undefined);
assert.equal(checked.status, 0, checked.stderr);
const integrity = JSON.parse(checked.stdout);
assert.equal(integrity.verified, true);
assert.equal(integrity.capture.complete, false);
assert.equal(integrity.capture.passed, false);
assert.equal(integrity.capture.artifacts, 222);
assert.equal(integrity.source.files, 184);
assert.equal(integrity.source.digest, '830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7');
assert.equal(integrity.previousCapture.artifacts, 134);
assert.deepEqual(integrity.unobservedModes, ['no-webgl', 'no-javascript', 'context-loss']);
assert.equal(integrity.originalReview.asserted, false);
const scan = { checkedAt: new Date().toISOString(), method: 'Same-user /proc stat, comm and cwd metadata; /proc/net TCP listener metadata only', inspected: 0, unavailable: [], knownPids: [], workspaceCwdProcesses: [], ancestryMatches: [], listenerPort: 34395, listenerEntries: [] };
const pids = new Map();
for (const id of (await readdir('/proc')).filter(value => /^\d+$/.test(value))) {
  try {
    if ((await lstat(`/proc/${id}`)).uid !== process.getuid()) continue;
    const stat = await readFile(`/proc/${id}/stat`, 'utf8');
    const tail = stat.slice(stat.lastIndexOf(')') + 2).split(' ');
    const record = { pid: Number(id), ppid: Number(tail[1]), state: tail[0], comm: (await readFile(`/proc/${id}/comm`, 'utf8')).trim() };
    pids.set(record.pid, record);
    scan.inspected++;
    const cwd = await readlink(`/proc/${id}/cwd`);
    if (cwd === binding.meta.work || cwd.startsWith(binding.meta.work + '/')) scan.workspaceCwdProcesses.push({ ...record, cwd });
  } catch (error) {
    assert.ok(['ENOENT', 'EACCES', 'ESRCH'].includes(error.code), String(error));
    scan.unavailable.push({ pid: Number(id), code: error.code });
  }
}
for (const pid of [execution.wrapperPid, execution.childPid]) scan.knownPids.push({ pid, exists: await lstat(`/proc/${pid}`).then(() => true).catch(error => { if (error.code === 'ENOENT') return false; throw error; }) });
for (const record of pids.values()) {
  const visited = new Set();
  for (let pid = record.pid; pid && !visited.has(pid); pid = pids.get(pid)?.ppid ?? 0) {
    visited.add(pid);
    if ([execution.wrapperPid, execution.childPid].includes(pid)) { scan.ancestryMatches.push(record); break; }
  }
}
const portHex = scan.listenerPort.toString(16).toUpperCase().padStart(4, '0');
for (const table of ['tcp', 'tcp6']) {
  for (const line of (await readFile(`/proc/net/${table}`, 'utf8')).trim().split('\n').slice(1)) {
    const fields = line.trim().split(/\s+/);
    if (fields[1].split(':').at(-1) === portHex && fields[3] === '0A') scan.listenerEntries.push({ table, localAddress: fields[1], state: fields[3] });
  }
}
scan.noObservedOwnedOrWorkspaceProcess = scan.knownPids.every(record => !record.exists) && !scan.workspaceCwdProcesses.length && !scan.ancestryMatches.length && !scan.listenerEntries.length;
scan.limit = 'No observed surviving known PID, current ancestry, workspace-cwd process or listener is not proof that every detached/reparented descendant is absent. No historical descendant PID inventory or signal-sender record exists.';
await save('process-observation.json', json(scan));
const verdict = {
  schemaVersion: 1, verified: true, checkedAt: new Date().toISOString(), modelCalls: 0, browserCalls: 0, builds: 0, processMutations: 0,
  scope: 'Interrupted verification evidence integrity and limited postclosure process observation, not complete acceptance or original-image assessment',
  terminalTool: { path: 'capture-tool-poll-12.json', exitCode: terminal.exit_code, sessionClosed: true, sha256: hash(terminalBytes) },
  execution: { ...execution, stdout: undefined, stderr: undefined, processSha256: hash(processBytes) },
  interruption: { signal: signal.signal, sender: signal.sender, at: signal.at, elapsedMs: signal.elapsedMs, millisecondsBeforeWorkDeadline: execution.timeoutMs - signal.elapsedMs, millisecondsUntilCheckerClose: Date.parse(execution.finished) - Date.parse(signal.at), ownDeadlineFired: false, escalationFired: false, causalAttribution: 'Unknown; no inference from elapsed time or earlier interruptions' },
  source: integrity.source, inputDigest: integrity.inputDigest, frozenInputs: Object.keys(binding.frozen.hashes).length,
  shippedSkillFilesUnchanged: 86, shippedEngineFilesUnchanged: skillInputs.filter(([path]) => path.startsWith('skill/engine/')).length,
  actorArtifactsUnchanged: Object.keys(binding.actor.artifacts).length, actorComplete: false, actorTimedOut: true, actorUsage: null,
  oldCapture: integrity.previousCapture,
  capture: { complete: false, passed: false, manifestSha256: integrity.capture.manifestSha256, artifacts: integrity.capture.artifacts, availableOriginals: integrity.originalReview.available, originalsByMode: integrity.originalReview.byMode },
  cases: integrity.cases.map(({ id, passed, problems }) => ({ id, passed, problems })), unobservedModes: integrity.unobservedModes,
  processObservation: scan,
  resultMeaning: 'The source and all available artifacts remain assessable. Desktop/mobile/short technical passes are retained; interrupted reduced-motion fields do not establish those site defects, and three missing modes remain unobserved. No actor/judge/capture retry, cleanup or source change is authorized by this audit.',
};
await save('result.json', json(verdict));
console.log(json({ verified: true, output: audit, sourceFiles: verdict.source.files, artifacts: verdict.capture.artifacts, availableOriginals: verdict.capture.availableOriginals, oldArtifacts: verdict.oldCapture.artifacts, interruption: verdict.interruption, processObservation: scan }));
