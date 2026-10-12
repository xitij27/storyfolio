// Additive replacement binding. The original recovery helpers stay immutable.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadBinding, loadPrepared, root, hash, json, regularBytes, inventory, captureSource, safePath, writeNew } from "../measurement/binding-lib.mjs";
import { boundJson } from "../measurement/amendment-lib.mjs";
import { assertInstall } from "../measurement/app-root.mjs";
import { assertSupervisor } from "../../full-journey-measurement/binding-lib.mjs";
import { planOperation } from "./budget.mjs";
export { loadPrepared, root, hash, json, regularBytes, inventory, captureSource, safePath, writeNew };
export const study = dirname(fileURLToPath(import.meta.url));
export const prefix = "evals/runs/stage-3-completion-2/full-journey-recovery/";
export const replacementPaths = ["binding-lib.mjs", "budget.mjs", "budget.test.mjs", "gate-worker.mjs", "setup-worker.mjs", "run-operation.mjs", "verify.mjs", "batch.test.mjs", "README.md"].map(name => `${prefix}batched-measurement/${name}`).sort();
export async function loadReplacement(path, options = {}) {
  const absolute = resolve(path); assert.ok(absolute.startsWith(join(root, prefix)));
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), replacement = JSON.parse(bytes);
  assert.equal(replacement.schemaVersion, 1); assert.equal(replacement.kind, "concepts-batched-replacement"); assert.equal(replacement.reviewedByRoot, true);
  await boundJson(replacement.binding); const binding = await loadBinding(join(root, replacement.binding.path), options);
  assert.equal(binding.bindingSha256, replacement.binding.sha256);
  assert.equal(binding.record.output, `${prefix}candidate-2/concepts-2`);
  assert.equal(replacement.control, `${prefix}candidate-2/batched-control`);
  assert.equal(replacement.totalCapMs, 900000); assert.equal(replacement.operationCapMs, 90000); assert.equal(replacement.graceMs, 5000); assert.equal(replacement.retries, 0); assert.equal(replacement.modelCalls, 0);
  assert.deepEqual(replacement.schedule, Array.from({ length: 12 }, (_, index) => ({ id: index + 1, alternativeId: binding.targets.alternatives[index].id, modes: ["desktop", "phone"] })));
  assert.equal(replacement.approval.path, "docs/history/2026-10-12-stage-3-browser-replacement-approval.md");
  assert.equal(hash(await regularBytes(root, replacement.approval.path)), replacement.approval.sha256);
  assert.equal(replacement.previousCapture.manifest.path, `${prefix}candidate-2/concepts-1/units/concepts/artifacts/manifest.json`);
  assert.equal(replacement.previousCapture.result.path, `${prefix}candidate-2/concepts-command/result.json`);
  const prior = await boundJson(replacement.previousCapture.manifest), priorResult = await boundJson(replacement.previousCapture.result);
  assert.equal(prior.complete, false); assert.equal(priorResult.complete, false); assert.equal(priorResult.interruptedBy, "SIGTERM");
  assert.deepEqual(prior.sourceBefore, binding.restored); assert.deepEqual(prior.targets, binding.targets);
  assert.deepEqual(Object.keys(replacement.helperHashes).sort(), replacementPaths);
  for (const [relative, digest] of Object.entries(replacement.helperHashes)) assert.equal(hash(await regularBytes(root, relative)), digest, `Replacement helper changed: ${relative}`);
  return { ...binding, replacement, replacementPath: absolute, replacementSha256: hash(bytes), replacementHashes: replacement.helperHashes, control: join(root, replacement.control) };
}
export function commandFor(binding, id, prepared) {
  if (id === 0) return { executable: process.execPath, args: [join(study, "setup-worker.mjs"), "--replacement", binding.replacementPath], cwd: root, environment: { ...binding.installContract.environment } };
  assert.ok(Number.isSafeInteger(id) && id >= 1 && id <= 12);
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
  assert.deepEqual(names, Array.from({ length: names.length }, (_, id) => String(id).padStart(2, "0")), "Missing, duplicate or unexpected operation"); assert.ok(names.length <= 13);
  const history = []; let outerExecutionMs = 0, previousOuterFinished = null;
  for (const name of names) {
    const id = Number(name), directory = join(base, name), read = async path => JSON.parse(await regularBytes(directory, path));
    const attempt = await read("attempt.json"), command = await read("command.json"), result = await read("process.json"), closure = await read("closure.json");
    const limits = planOperation({ history, nextId: id, bindingSha256: binding.replacementSha256 });
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
    const outerDirectory = `${prefix}candidate-2/batched-command-${name}`;
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
    assert.deepEqual(outerCommand.args, [`${prefix}batched-measurement/run-operation.mjs`, "--replacement", binding.replacementPath.slice(root.length + 1), "--id", String(id)]);
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
    history.push({ id, bindingSha256: binding.replacementSha256, durationMs: result.durationMs, outerDurationMs: outer.durationMs, timeoutMs: result.timeoutMs, graceMs: result.graceMs, totalCapMs: result.totalCapMs, complete: closure.complete, code: result.code, timedOut: result.timedOut, externalSignal: result.externalSignal, signal: result.signal, spawnError: result.spawnError, logError: result.logError });
  }
  return history;
}
