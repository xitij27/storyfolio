// Additive continuation. Only exact historical operation 02 is reconciled.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { loadReplacement as loadPrior, loadPrepared, commandFor, checkInstall, root, prefix, hash, json, regularBytes, inventory, captureSource, safePath, writeNew, boundBytes, boundJson, measurementRecordPath } from "../measurement-2/binding-lib.mjs";
import { assertSupervisor } from "../../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
import { planOperation } from "../measurement/budget.mjs";
import { assertReconciledOuter } from "./reconcile.mjs";
export { loadPrepared, commandFor, checkInstall, root, prefix, hash, json, regularBytes, inventory, captureSource, safePath, writeNew };
export const continuationPaths = ["binding-lib.mjs", "binding.test.mjs", "run-operation.mjs", "verify.mjs", "reconcile.mjs", "reconcile.test.mjs", "README.md"].map(name => prefix + "measurement-continuation/" + name).sort();
export const preservedTrees = ["concepts-2/setup", "concepts-2/batches/01", "concepts-2/batches/02", ...["00", "01", "02"].flatMap(id => ["control-2/operations/" + id, "commands-2/operation-" + id])].sort();
export function assertContinuationRecord(record) {
  assert.equal(record.schemaVersion, 1); assert.equal(record.kind, "concepts-seven-batch-continuation"); assert.equal(record.reviewedByRoot, true);
  assert.equal(record.previous.path, prefix + "concept-measurement-2.json");
  assert.equal(record.previous.sha256, "148b837d090f105d3e06804e7318dc03249ccdfb267b2ec0b1c87182290e5577");
  assert.equal(record.approval.path, "docs/history/2026-10-13-stage-3-browser-continuation-approval.md");
  assert.equal(record.inventory.path, prefix + "concept-continuation-inventory.json");
  assert.deepEqual(record.allowedIds, [3, 4, 5, 6, 7, 8, 9]);
  assert.equal(record.reconciledId, 2); assert.equal(record.spentMs, 133866);
  assert.equal(record.remainingMs, 766134); assert.equal(record.totalCapMs, 900000);
  assert.equal(record.retries, 0); assert.equal(record.modelCalls, 0); assert.equal(record.setupRuns, 0);
  assert.deepEqual(Object.keys(record.helperHashes).sort(), continuationPaths);
}
export function assertContinuationId(id) { assert.ok(Number.isSafeInteger(id) && id >= 3 && id <= 9, "Only unstarted batches 03 through 09 are approved"); }
export async function loadReplacement(path, options = {}) {
  const absolute = measurementRecordPath(path), bytes = await regularBytes(root, absolute.slice(root.length + 1)), continuation = JSON.parse(bytes);
  assertContinuationRecord(continuation);
  await boundBytes(continuation.approval); await boundBytes(continuation.previous);
  const saved = await boundJson(continuation.inventory);
  assert.deepEqual(Object.keys(saved.trees).sort(), preservedTrees);
  for (const [directory, files] of Object.entries(saved.trees)) assert.deepEqual(await inventory(join(root, prefix, directory)), files, "Preserved completed tree changed: " + directory);
  assert.ok(Object.keys(saved.files).length >= 10);
  for (const [file, digest] of Object.entries(saved.files)) { safePath(file); assert.equal(hash(await regularBytes(root, prefix + file)), digest); }
  for (const [file, digest] of Object.entries(continuation.helperHashes)) assert.equal(hash(await regularBytes(root, file)), digest, "Continuation helper changed: " + file);
  const binding = await loadPrior(join(root, continuation.previous.path), options);
  // Keep original replacement identity and existing prepared work/worker commands.
  return { ...binding, continuation, continuationPath: absolute, continuationSha256: hash(bytes), continuationHashes: continuation.helperHashes };
}
export async function readHistory(binding, prepared) {
  const base = join(binding.control, "operations"); let names;
  try { names = (await readdir(base)).sort(); } catch (error) { if (error.code === "ENOENT") return []; throw error; }
  assert.deepEqual(names, Array.from({ length: names.length }, (_, id) => String(id).padStart(2, "0")), "Missing, duplicate or unexpected operation"); assert.ok(names.length >= 3 && names.length <= binding.replacement.schedule.length + 1);
  const history = []; let outerExecutionMs = 0, previousOuterFinished = null;
  for (const name of names) {
    const id = Number(name), directory = join(base, name), read = async path => JSON.parse(await regularBytes(directory, path));
    const attempt = await read("attempt.json"), command = await read("command.json"), result = await read("process.json"), closure = await read("closure.json");
    const limits = planOperation({ history, nextId: id, bindingSha256: binding.replacementSha256, batches: binding.replacement.schedule.length });
    assert.equal(attempt.id, id); assert.equal(attempt.replacementSha256, binding.replacementSha256);
    assert.deepEqual(attempt.helperHashes, binding.replacementHashes); assert.deepEqual(attempt.limits, limits);
    if (id >= 3) for (const record of [attempt, command, closure]) {
      assert.equal(record.continuationSha256, binding.continuationSha256);
      assert.deepEqual(record.continuationHashes, binding.continuationHashes);
    }
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
    const reconciliation = id === 2
      ? assertReconciledOuter({ outer, terminal: terminal.toolResult, command: outerCommand, events: outerEvents, processRecord: result, closure })
      : null;
    if (!reconciliation) assert.equal(assertSupervisor(outer, terminal.toolResult, outerCommand, outerEvents), join(root, outerDirectory));
    assert.equal(outerCommand.recorderSha256, binding.helperHashes["evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
    assert.equal(outerCommand.cwd, root); assert.equal(outerCommand.executable, binding.capabilities.node.executable);
    assert.deepEqual(outerCommand.args, [`${prefix}${id < 3 ? "measurement-2" : "measurement-continuation"}/run-operation.mjs`, "--replacement", (id < 3 ? binding.replacementPath : binding.continuationPath).slice(root.length + 1), "--id", String(id)]);
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
    history.push({ id, outerNormal: reconciliation ? false : true, reconciliation, outerCode: outer.code, outerSignal: outer.signal, outerStatus: outer.status, bindingSha256: binding.replacementSha256, durationMs: outer.durationMs, workerDurationMs: result.durationMs, outerDurationMs: outer.durationMs, timeoutMs: result.timeoutMs, graceMs: result.graceMs, totalCapMs: result.totalCapMs, complete: closure.complete, code: result.code, timedOut: result.timedOut, externalSignal: result.externalSignal, signal: result.signal, spawnError: result.spawnError, logError: result.logError });
  }
  assert.equal(history.slice(0, 3).reduce((sum, row) => sum + row.durationMs, 0), binding.continuation.spentMs);
  return history;
}

