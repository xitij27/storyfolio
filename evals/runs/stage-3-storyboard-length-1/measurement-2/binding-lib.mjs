// Approved candidate-3 wrapped-link replacement. Earlier measurements remain immutable.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadBinding as loadOrdinaryBinding, loadPrepared as loadOrdinaryPrepared, root, hash, json, regularBytes, inventory, captureSource, safePath, writeNew, assertSupervisor } from "../../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
import { resolveApplication, assertInstall } from "../../stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs";
import { loadReplacement as loadPrior } from "../measurement/binding-lib.mjs";
import { planOperation } from "../measurement/budget.mjs";
export { root, hash, json, regularBytes, inventory, captureSource, safePath, writeNew };
export const study = dirname(fileURLToPath(import.meta.url));
export const prefix = "evals/runs/stage-3-storyboard-length-1/";
export const replacementPaths = ["binding-lib.mjs", "binding.test.mjs", "gate-worker.mjs", "setup-worker.mjs", "run-operation.mjs", "verify.mjs", "hit-target.mjs", "hit-target.test.mjs", "README.md"].map(name => `${prefix}measurement-2/${name}`).concat([
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs",
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/choice-activation.mjs",
  `${prefix}turn-audit.mjs`, `${prefix}measurement/budget.mjs`, `${prefix}measurement/verify.mjs`,
]).sort();

export async function boundBytes(reference) {
  safePath(reference.path); assert.match(reference.sha256, /^[a-f0-9]{64}$/);
  const bytes = await regularBytes(root, reference.path); assert.equal(hash(bytes), reference.sha256); return bytes;
}
export async function boundJson(reference) { return JSON.parse(await boundBytes(reference)); }
export function measurementRecordPath(path) {
  assert.equal(typeof path, "string");
  const absolute = resolve(path);
  assert.ok(absolute.startsWith(resolve(root, prefix) + "/"), "Measurement record must stay below this study");
  return absolute;
}
export function assertSchedule(schedule, targets) {
  assert.ok(Array.isArray(targets.alternatives) && targets.alternatives.length > 0);
  assert.equal(new Set(targets.alternatives.map(item => item.id)).size, targets.alternatives.length);
  assert.deepEqual(schedule, targets.alternatives.map((alternative, index) => ({ id: index + 1, alternativeId: alternative.id, modes: ["desktop", "phone"] })));
}
export function assertCandidateBinding(binding) {
  assert.equal(binding.meta.cohort, "codex-full-journey-candidate-3"); assert.equal(binding.meta.rep, 1);
  assert.equal(binding.record.turn, 2); assert.equal(binding.actor.turn, 2); assert.equal(binding.actor.complete, true);
  assert.equal(binding.frozen.digest, "68c2bfd15305eb9b9fcb8114dbe64dd511d9a227627c8865833aad281f95ebeb");
  assert.equal(Object.keys(binding.frozen.hashes).length, 149);
  assert.equal(binding.record.actorResultSha256, "290c39f7aca8ae6e8254e78a6423292f4bf34af233ca2c94f34d09189615fbfe");
  assert.equal(binding.restored.digest, "7104be428d5e26c867e8dbcc3f650a467931135346a54209ec8f3e137a45ceb9");
  assert.equal(binding.restored.files.length, 185);
  assert.equal(binding.restored.files.filter(file => file.path.startsWith("site/")).length, 87);
  assert.deepEqual(binding.originalSource, binding.restored); assert.deepEqual(binding.extras, []);
  assert.equal(binding.targets.stage, 2); assert.equal(binding.targets.draft, undefined);
}

export function assertBindingDelta(previous, current) {
  assert.equal(previous.output, prefix + "concepts-1");
  assert.equal(current.output, prefix + "concepts-2");
  assert.deepEqual({ ...current, output: previous.output }, previous);
}
export async function preservePrior(replacement, options) {
  assert.equal(replacement.previous.path, prefix + "concept-measurement.json");
  await boundJson(replacement.previous);
  const prior = await loadPrior(join(root, replacement.previous.path), options);
  const records = await boundJson(replacement.previousInventory);
  assert.deepEqual(Object.keys(records.trees).sort(), ["commands", "concepts-1", "control"]);
  for (const [directory, files] of Object.entries(records.trees))
    assert.deepEqual(await inventory(join(root, prefix, directory)), files, "Prior tree changed: " + directory);
  assert.deepEqual(Object.keys(records.files).sort(), [
    "concept-failure-audit-command/stdout.log", "concept-failure-disposition.md",
    "concept-image-review-01-02.json", "concept-operation-02-diagnosis.md",
    "operation-00-tool-launch.json", "operation-00-tool-start.json", "operation-00-tool-terminal.json",
    "operation-01-tool-launch.json", "operation-01-tool-poll-1.json", "operation-01-tool-terminal.json",
    "operation-02-tool-launch.json", "operation-02-tool-poll-1.json", "operation-02-tool-poll-2.json", "operation-02-tool-terminal.json"
  ].sort());
  for (const [file, digest] of Object.entries(records.files))
    assert.equal(hash(await regularBytes(root, prefix + file)), digest, "Prior record changed: " + file);
  const failed = JSON.parse(await regularBytes(root, prefix + "commands/operation-02/result.json"));
  assert.equal(failed.code, 1); assert.equal(failed.interruptedBy, null);
  const closure = JSON.parse(await regularBytes(root, prefix + "control/operations/02/closure.json"));
  assert.equal(closure.complete, false);
  return prior;
}

export async function loadReplacement(path, options = {}) {
  const absolute = measurementRecordPath(path);
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), replacement = JSON.parse(bytes);
  assert.equal(replacement.schemaVersion, 1); assert.equal(replacement.kind, "concepts-batched-replacement"); assert.equal(replacement.reviewedByRoot, true);
  await boundJson(replacement.binding); const binding = await loadOrdinaryBinding(join(root, replacement.binding.path), options);
  assert.equal(binding.bindingSha256, replacement.binding.sha256); assertCandidateBinding(binding);
  const prior = await preservePrior(replacement, options);
  assertBindingDelta(prior.record, binding.record);
  if (options.liveOriginal !== false) assert.deepEqual((await readdir(join(binding.run, "turns"))).sort(), ["01", "02"], "Live measurement requires turn 2 to remain the latest actual turn");
  assert.equal(binding.record.output, `${prefix}concepts-2`); assert.equal(replacement.control, `${prefix}control-2`);
  assert.equal(replacement.applicationRoot, "site");
  await resolveApplication(join(binding.turn, "snapshot/files"), replacement.applicationRoot, binding.restored);
  assert.equal(replacement.totalCapMs, 900000); assert.equal(replacement.operationCapMs, 90000); assert.equal(replacement.graceMs, 5000);
  assert.equal(replacement.retries, 0); assert.equal(replacement.modelCalls, 0); assertSchedule(replacement.schedule, binding.targets);
  assert.equal(replacement.approval.path, "docs/history/2026-10-12-stage-3-wrapped-link-verifier-approval.md"); await boundBytes(replacement.approval);
  assert.ok(replacement.disposition.path.startsWith(prefix)); await boundBytes(replacement.disposition);
  assert.ok(replacement.actorAudit.path.startsWith(prefix));
  const audit = await boundJson(replacement.actorAudit);
  assert.equal(audit.integrityVerified, true); assert.equal(audit.boundsExceeded, false); assert.equal(audit.cohort, binding.meta.cohort); assert.equal(audit.turn, 2);
  assert.equal(audit.inputDigest, binding.frozen.digest); assert.equal(audit.hashes.latestResult, binding.record.actorResultSha256);
  assert.equal(audit.fullLiveSourceEqualsSnapshot, true); assert.equal(audit.sourceDigest, binding.restored.digest); assert.equal(audit.sourceFiles, 185);
  assert.deepEqual(Object.keys(replacement.helperHashes).sort(), replacementPaths);
  for (const [relative, digest] of Object.entries(replacement.helperHashes)) assert.equal(hash(await regularBytes(root, relative)), digest, `Supplemental helper changed: ${relative}`);
  assert.equal(audit.hashes.audit, replacement.helperHashes[`${prefix}turn-audit.mjs`]);
  return { ...binding, applicationRoot: replacement.applicationRoot, replacement, replacementPath: absolute, replacementSha256: hash(bytes), replacementHashes: replacement.helperHashes, control: join(root, replacement.control) };
}
export async function loadPrepared(binding, options = {}) {
  const prepared = await loadOrdinaryPrepared(binding, options);
  const application = await resolveApplication(prepared.work, binding.applicationRoot, binding.restored);
  return { ...prepared, application };
}
export function commandFor(binding, id, prepared) {
  if (id === 0) return { executable: process.execPath, args: [join(study, "setup-worker.mjs"), "--replacement", binding.replacementPath], cwd: root, environment: { ...binding.installContract.environment } };
  assert.ok(Number.isSafeInteger(id) && id >= 1 && id <= binding.replacement.schedule.length);
  return { executable: process.execPath, args: [join(study, "gate-worker.mjs"), `--workspace=${prepared.work}`, `--application-root=${binding.applicationRoot}`, `--targets=${join(prepared.setup, "targets.json")}`, `--expectations=${join(binding.meta.inputs, "expectations.json")}`, `--out=${join(binding.output, "batches", String(id).padStart(2, "0"), "artifacts")}`, `--dependencies=${binding.policy.trustedDependencies.root}`, `--batch=${id}`], cwd: prepared.application, environment: binding.environment };
}
export async function checkInstall(binding, prepared) {
  const dir = join(prepared.setup, "dependency-install");
  const command = JSON.parse(await regularBytes(dir, "command.json")), result = JSON.parse(await regularBytes(dir, "result.json"));
  assertInstall(command, prepared.application, binding.installContract);
  assert.equal(command.wrapperSha256, binding.helperHashes["evals/runs/stage-3-comparison-1/record-command.mjs"]);
  assert.equal(result.code, 0); assert.equal(result.signal, null); assert.ok(!result.error && !result.timedOut);
  for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(dir, channel + ".log")), result[channel + "Sha256"]);
  return result;
}
export async function readHistory(binding, prepared) {
  const base = join(binding.control, "operations"); let names;
  try { names = (await readdir(base)).sort(); } catch (error) { if (error.code === "ENOENT") return []; throw error; }
  assert.deepEqual(names, Array.from({ length: names.length }, (_, id) => String(id).padStart(2, "0")), "Missing, duplicate or unexpected operation"); assert.ok(names.length <= binding.replacement.schedule.length + 1);
  const history = []; let outerExecutionMs = 0, previousOuterFinished = null;
  for (const name of names) {
    const id = Number(name), directory = join(base, name), read = async path => JSON.parse(await regularBytes(directory, path));
    const attempt = await read("attempt.json"), command = await read("command.json"), result = await read("process.json"), closure = await read("closure.json");
    const limits = planOperation({ history, nextId: id, bindingSha256: binding.replacementSha256, batches: binding.replacement.schedule.length });
    assert.equal(attempt.id, id); assert.equal(attempt.replacementSha256, binding.replacementSha256);
    assert.deepEqual(attempt.helperHashes, binding.replacementHashes); assert.deepEqual(attempt.limits, limits);
    const expected = commandFor(binding, id, prepared);
    for (const key of ["executable", "args", "cwd", "environment"]) assert.deepEqual(command[key], expected[key]);
    assert.equal(command.replacementSha256, binding.replacementSha256); assert.deepEqual(command.limits, limits);
    for (const key of ["timeoutMs", "graceMs", "totalCapMs"]) assert.equal(result[key], limits[key]);
    for (const [file, key] of [["stdout.log", "stdoutSha256"], ["stderr.log", "stderrSha256"], ["lifecycle.jsonl", "lifecycleSha256"]]) assert.equal(hash(await regularBytes(directory, file)), result[key]);
    assert.equal(result.stdout, (await regularBytes(directory, "stdout.log")).toString()); assert.equal(result.stderr, (await regularBytes(directory, "stderr.log")).toString());
    assert.equal(closure.id, id); assert.equal(closure.replacementSha256, binding.replacementSha256); assert.equal(closure.complete, true); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.deepEqual(closure.errors, []);
    assert.equal(closure.processSha256, hash(await regularBytes(directory, "process.json")));
    for (const [relative, digest] of Object.entries(closure.evidence)) { safePath(relative); assert.equal(hash(await regularBytes(root, relative)), digest); }
    // Root writes this only after actual outer recorder AND tool closure.
    // A child closure alone cannot authorize another operation.
    const supervision = await read("supervision.json");
    assert.deepEqual(Object.keys(supervision).sort(), ["result", "terminal"]);
    const outerDirectory = `${prefix}commands-2/operation-${name}`;
    assert.equal(supervision.result.path, `${outerDirectory}/result.json`);
    const outer = await boundJson(supervision.result), terminal = await boundJson(supervision.terminal), raw = {};
    for (const file of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) {
      raw[file] = await regularBytes(root, `${outerDirectory}/${file}`);
      assert.equal(hash(raw[file]), outer.rawArtifacts?.[file]);
    }
    const outerCommand = JSON.parse(raw["command.json"]), outerEvents = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
    assert.equal(assertSupervisor(outer, terminal.toolResult, outerCommand, outerEvents), join(root, outerDirectory));
    assert.equal(outerCommand.recorderSha256, binding.helperHashes["evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
    assert.equal(outerCommand.cwd, root); assert.equal(outerCommand.executable, binding.capabilities.node.executable);
    assert.deepEqual(outerCommand.args, [`${prefix}measurement-2/run-operation.mjs`, "--replacement", binding.replacementPath.slice(root.length + 1), "--id", String(id)]);
    assert.deepEqual(outerCommand.environment, binding.installContract.environment);
    assert.equal(outer.childPid, result.wrapperPid, "Outer recorder did not supervise the measured coordinator");
    const outerStarted = Date.parse(outerCommand.started), outerFinished = Date.parse(outer.finished), observedAt = Date.parse(terminal.observedAt);
    assert.ok(Number.isFinite(outerStarted) && Number.isFinite(outerFinished) && outerFinished >= outerStarted);
    assert.ok(Number.isFinite(observedAt) && observedAt >= outerFinished, "Terminal evidence must follow normal outer closure");
    if (previousOuterFinished !== null) assert.ok(outerStarted >= previousOuterFinished, "Outer operations overlap");
    previousOuterFinished = outerFinished;
    assert.ok(Number.isSafeInteger(outer.durationMs) && outer.durationMs >= 0);
    assert.ok(outer.durationMs >= outerFinished - outerStarted);
    assert.ok(Date.parse(result.started) >= outerStarted && Date.parse(result.finished) <= outerFinished);
    assert.ok(result.durationMs <= outer.durationMs && outer.durationMs <= limits.totalCapMs, "Complete coordinator execution exceeded the operation cap");
    assert.ok(outerExecutionMs + limits.totalCapMs <= binding.replacement.totalCapMs, "Full next-operation allocation was not available from the outer execution budget");
    outerExecutionMs += outer.durationMs; assert.ok(Number.isSafeInteger(outerExecutionMs) && outerExecutionMs <= binding.replacement.totalCapMs);
    history.push({ id, bindingSha256: binding.replacementSha256, durationMs: outer.durationMs, workerDurationMs: result.durationMs, outerDurationMs: outer.durationMs, timeoutMs: result.timeoutMs, graceMs: result.graceMs, totalCapMs: result.totalCapMs, complete: closure.complete, code: result.code, timedOut: result.timedOut, externalSignal: result.externalSignal, signal: result.signal, spawnError: result.spawnError, logError: result.logError });
  }
  return history;
}
