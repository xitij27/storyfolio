// Additive read-only continuation audit. No launch or actor gate.
// Derived from unchanged measurement-2/verify.mjs. Only outer operation 02 is reconciled.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { loadReplacement, loadPrepared, checkInstall, readHistory, regularBytes, inventory, hash, json, root } from "./binding-lib.mjs";
import { BUDGET, inspectHistory } from "../measurement/budget.mjs";
import { assertCoverage, observationProblems } from "../../stage-3-completion-2/full-journey-measurement/measurement-lib.mjs";

import { assertBatchCoverage } from "../measurement-2/verify.mjs";
export { assertBatchCoverage, assertControlTrials } from "../measurement-2/verify.mjs";

export async function verifyReplacement({ replacement, review: reviewPath }) {
  const binding = await loadReplacement(replacement, { liveOriginal: false });
  const prepared = await loadPrepared(binding); await checkInstall(binding, prepared);
  const batches = binding.replacement.schedule.length;
  const history = await readHistory(binding, prepared), budget = inspectHistory({ history, bindingSha256: binding.replacementSha256, batches });
  assert.equal(budget.complete, true); assert.equal(budget.operations, batches + 1); assert.equal(budget.batchesCompleted, batches);
  assert.ok(budget.elapsedMs <= BUDGET.totalMs);
  assert.equal(history[2].id, 2); assert.equal(history[2].outerNormal, false);
  assert.equal(history[2].reconciliation?.evidenceAccepted, true);
  assert.equal(history[2].reconciliation?.reconciled, true);
  assert.equal(history[2].reconciliation?.outerNormal, false);
  assert.equal(history[2].reconciliation?.chargedMs, history[2].outerDurationMs);
  assert.deepEqual(history.filter(row => row.reconciliation !== null).map(row => row.id), [2]);
  for (const row of history.filter(row => row.id !== 2)) {
    assert.equal(row.outerNormal, true); assert.equal(row.reconciliation, null);
  }
  const outerExecutionMs = history.reduce((sum, row) => sum + row.outerDurationMs, 0);
  assert.ok(Number.isSafeInteger(outerExecutionMs) && budget.elapsedMs === outerExecutionMs && outerExecutionMs <= BUDGET.totalMs);
  assert.deepEqual((await readdir(join(binding.output, "batches"))).sort(), Array.from({ length: batches }, (_, index) => String(index + 1).padStart(2, "0")));
  const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
  const setupPaths = [join(prepared.setup, "reconstruction.json"), join(prepared.setup, "targets.json"), join(prepared.setup, "dependency-install/result.json")];
  const originals = [], allReports = [], technical = [], manifestHashes = {}, operationHashes = {};
  let previousFinished = null;
  for (const row of history) {
    const stem = String(row.id).padStart(2, "0"), directory = join(binding.control, "operations", stem);
    const command = await readJson(directory, "command.json"), processRecord = await readJson(directory, "process.json"), closure = await readJson(directory, "closure.json");
    assert.equal(command.id, row.id); assert.equal(command.originalBindingSha256, binding.bindingSha256);
    assert.deepEqual(command.helperHashes, binding.replacementHashes); assert.deepEqual(command.originalHelperHashes, binding.helperHashes);
    if (row.id >= 3) {
      assert.equal(command.continuationSha256, binding.continuationSha256);
      assert.deepEqual(command.continuationHashes, binding.continuationHashes);
    }
    assert.deepEqual(await readJson(directory, "source-before.json"), binding.restored); assert.deepEqual(await readJson(directory, "source-after.json"), binding.restored);
    const events = (await regularBytes(directory, "lifecycle.jsonl")).toString().trim().split("\n").map(line => JSON.parse(line));
    assert.deepEqual(events.map(event => event.type), ["spawn-request", "spawned", "exit", "closed"]);
    assert.ok(Number.isSafeInteger(processRecord.childPid) && processRecord.childPid > 0);
    assert.ok(Number.isSafeInteger(processRecord.wrapperPid) && processRecord.wrapperPid > 0);
    const started = Date.parse(processRecord.started), finished = Date.parse(processRecord.finished);
    assert.ok(Number.isFinite(started) && Number.isFinite(finished) && finished >= started);
    if (previousFinished !== null) assert.ok(started >= previousFinished, "Operations must be sequential, not overlapping");
    previousFinished = finished;
    assert.ok(processRecord.durationMs >= finished - started);
    for (const [index, event] of events.entries()) {
      assert.equal(event.childPid, processRecord.childPid); assert.equal(event.wrapperPid, processRecord.wrapperPid);
      assert.ok(Number.isSafeInteger(event.elapsedMs) && event.elapsedMs >= 0 && event.elapsedMs <= processRecord.durationMs);
      assert.ok(Date.parse(event.at) >= started && Date.parse(event.at) <= finished);
      if (index) assert.ok(event.elapsedMs >= events[index - 1].elapsedMs);
    }
    for (const key of ["executable", "args"]) assert.deepEqual(events[0][key], command[key]);
    for (const key of ["timeoutMs", "graceMs", "totalCapMs"]) assert.equal(events[0][key], processRecord[key]);
    assert.equal(events[0].deadline, new Date(started + processRecord.timeoutMs).toISOString());
    assert.equal(events[0].hardEscalationAt, new Date(started + processRecord.totalCapMs).toISOString());
    for (const event of events.slice(2)) { assert.equal(event.code, 0); assert.equal(event.signal, null); }
    assert.equal(events[3].timedOut, false); assert.equal(events[3].externalSignal, null);
    const evidencePaths = [...setupPaths, join(directory, "source-before.json"), join(directory, "source-after.json")];
    if (row.id > 0) evidencePaths.push(join(directory, "artifact-inventory.json"), join(binding.output, "batches", stem, "artifacts/manifest.json"));
    assert.deepEqual(Object.keys(closure.evidence).sort(), evidencePaths.map(path => path.slice(root.length + 1)).sort(), "Missing or extra closure evidence binding");
    operationHashes[stem] = Object.fromEntries(await Promise.all(["attempt.json", "command.json", "process.json", "closure.json", "supervision.json", "source-before.json", "source-after.json"].map(async path => [path, hash(await regularBytes(directory, path))])));
    const supervision = await readJson(directory, "supervision.json");
    operationHashes[stem].outerResult = supervision.result; operationHashes[stem].terminalTool = supervision.terminal;
    if (row.id === 0) continue;
    const artifacts = join(binding.output, "batches", stem, "artifacts"), files = await inventory(artifacts), manifest = await readJson(artifacts, "manifest.json");
    assert.deepEqual(files, await readJson(directory, "artifact-inventory.json"));
    assert.equal(manifest.workspace, prepared.work); assert.equal(manifest.application, prepared.application); assert.equal(manifest.applicationRoot, binding.applicationRoot);
    assert.deepEqual(manifest.sourceBefore, binding.restored); assert.deepEqual(manifest.sourceAfter, binding.restored);
    assert.equal(manifest.measurementBaseline, "genuine saved candidate-3 turn-2 source");
    const runtime = manifest.nextRuntime;
    assert.equal(runtime.passed, true); assert.deepEqual(runtime.problems, []);
    assert.equal(runtime.local.name, "next"); assert.equal(runtime.trusted.name, "next");
    for (const identity of [runtime.local, runtime.trusted]) { assert.equal(identity.version, binding.policy.trustedDependencies.nextVersion); assert.equal(identity.sha256, binding.policy.trustedDependencies.nextCliSha256); }
    assert.equal(runtime.entrypoint, runtime.local.entrypoint);
    assert.equal(manifest.playwrightEntrypointSha256, binding.policy.trustedDependencies.playwrightEntrypointSha256);
    assert.equal(manifest.commands.length, 2);
    const [build, server] = manifest.commands;
    assert.equal(build.executable, binding.capabilities.node.executable); assert.deepEqual(build.args, [runtime.entrypoint, "build"]); assert.equal(build.code, 0); assert.equal(build.signal, null); assert.ok(!build.error);
    assert.equal(server.executable, binding.capabilities.node.executable); assert.deepEqual(server.args.slice(0, 5), [runtime.entrypoint, "start", "--hostname", "127.0.0.1", "--port"]); assert.equal(server.args.length, 6); assert.match(server.args[5], /^\d+$/); assert.ok(!server.error);
    const reports = await Promise.all(["desktop", "phone"].map(mode => readJson(artifacts, `${stem}-${mode}/report.json`)));
    const assessment = assertBatchCoverage({ batch: row.id, manifest, reports, targets: binding.targets, policy: binding.policy, files });
    allReports.push(...reports); technical.push({ batch: row.id, alternativeId: assessment.alternativeId, exitCode: processRecord.code, passed: processRecord.code === 0 && assessment.passed, problems: assessment.problems });
    manifestHashes[stem] = hash(await regularBytes(artifacts, "manifest.json"));
    originals.push(...assessment.originals.map(file => ({ ...file, path: `${binding.record.output}/batches/${stem}/artifacts/${file.path}` })));
  }
  assert.deepEqual(allReports.map(report => [report.alternative.id, report.mode]), binding.targets.alternatives.flatMap(alternative => [[alternative.id, "desktop"], [alternative.id, "phone"]]));
  assert.equal(allReports.length, batches * 2);
  const expectedOriginals = binding.targets.alternatives.reduce((sum, alternative) => sum + 2 * (4 + (alternative.control ? 4 : 0)), 0);
  assert.equal(originals.length, expectedOriginals);
  const reviewBytes = await regularBytes(root, reviewPath), viewed = JSON.parse(reviewBytes);
  assert.equal(viewed.schemaVersion, 1); assert.equal(viewed.complete, true);
  assertCoverage(2, [{ unit: "concepts", complete: true, sourceUnchanged: true }], originals, viewed.images);
  // The ordinary frozen loader binds the genuine snapshot and original actor
  // evidence. The supplemental loader also preserves both prior capture records,
  // including the exact externally interrupted outer operation 02.
  await loadReplacement(replacement, { liveOriginal: false });
  const problems = observationProblems(binding.targets, binding.policy);
  return { integrityVerified: true, measurementBaseline: "genuine saved candidate-3 turn-2 source; approved wrapped-link replacement and seven-batch continuation with only outer operation 02 explicitly reconciled, not an unmodified frozen checker",
    continuationSha256: binding.continuationSha256, continuationHashes: binding.continuationHashes,
    reconciledOperations: [{ id: 2, ...history[2].reconciliation }], allOuterNormal: false, otherOperationsNormal: true,
    measurementRecordSha256: binding.replacementSha256, bindingSha256: binding.bindingSha256, sourceBasis: `${binding.record.run}/turns/02/snapshot/files`,
    inputDigest: binding.frozen.digest, actorResultSha256: binding.record.actorResultSha256, sourceDigest: binding.restored.digest, sourceFiles: binding.restored.files.length,
    complete: true, stage: 2, batches, reports: allReports.length, originalsReviewed: originals.length, originalsReviewSha256: hash(reviewBytes),
    budget, outerExecutionMs, remainingOuterExecutionMs: BUDGET.totalMs - outerExecutionMs,
    budgetScope: `Sum of all ${batches + 1} recorded outer coordinator lifetimes, containing every setup/build/browser/shutdown child; inter-invocation manual review and final read-only audit excluded`,
    manifestHashes, operationHashes, originalActorEvidencePreserved: true, technical, observedScopeProblems: problems,
    technicalPassed: !problems.length && technical.every(result => result.passed),
    semanticVisualAndWorkflowAcceptance: "unobserved by this verifier; independent original/source/conversation assessment and real gates remain required",
    physicalPhoneAndAuthorAcceptance: "unobserved", modelCalls: 0, retries: 0, writes: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({ options: { replacement: { type: "string" }, review: { type: "string" } } });
  assert.ok(values.replacement && values.review);
  console.log(json(await verifyReplacement({ replacement: values.replacement, review: values.review })));
}

