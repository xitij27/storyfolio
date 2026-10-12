// Read-only replacement audit. No model, browser, retry or actor gate.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { loadReplacement, loadPrepared, checkInstall, readHistory, regularBytes, inventory, hash, json, root, safePath } from "./binding-lib.mjs";
import { BUDGET, inspectHistory } from "./budget.mjs";
import { assertCoverage, assertUnitCoverage, assessGateReport, observationProblems } from "../../full-journey-measurement/measurement-lib.mjs";

/** Pure report/artifact checks, shared by the final verifier and fake fixtures.
 * A complete-but-problemful report stays a technical failure, not a new gate.
 */
export function assertBatchCoverage({ batch, manifest, reports, targets, policy, files }) {
  assert.ok(Number.isSafeInteger(batch) && batch >= 1 && batch <= 12);
  assert.equal(targets.alternatives.length, 12);
  const alternative = targets.alternatives[batch - 1], stem = String(batch).padStart(2, "0");
  assert.equal(manifest.schemaVersion, 1); assert.equal(manifest.measurement, "full-journey");
  assert.equal(manifest.stage, 2); assert.equal(manifest.unit, "concepts"); assert.equal(manifest.batch, batch);
  assert.equal(manifest.complete, true); assert.equal(manifest.sourceUnchanged, true); assert.equal(manifest.interrupted, null);
  assert.deepEqual(manifest.selectedAlternative, alternative); assert.deepEqual(manifest.targets, targets); assert.deepEqual(manifest.expected, policy);
  assert.deepEqual(manifest.results.map(result => result.directory), [`${stem}-desktop`, `${stem}-phone`]);
  assert.deepEqual(reports.map(report => [report.alternative.id, report.mode]), [[alternative.id, "desktop"], [alternative.id, "phone"]]);
  assert.equal(new Set(files.map(file => file.path)).size, files.length);
  assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
  // The original checker is applied without changing a target or assertion.
  // Global coverage below separately requires every original alternative.
  assertUnitCoverage("concepts", { ...targets, alternatives: [alternative] }, manifest, reports);
  const originals = files.filter(file => /\.(?:png|jpe?g)$/i.test(file.path));
  const referenced = [], problems = observationProblems(targets, policy);
  assert.deepEqual(manifest.problems, problems);
  for (const [index, report] of reports.entries()) {
    assert.deepEqual(report.alternative, alternative); assert.deepEqual(report.viewport, policy.viewports[report.mode]);
    const expectedProblems = assessGateReport(report), saved = manifest.results[index];
    assert.deepEqual(report.problems, expectedProblems); assert.deepEqual(saved.problems, expectedProblems);
    assert.equal(saved.complete, report.complete); assert.equal(saved.error, report.error ?? null);
    const records = [report.entryImage, ...report.rests.map(rest => rest.image), ...report.controls.flatMap(trial => [trial.beforeImage, trial.afterImage])];
    const names = ["entry", "opening", "middle", "ending", ...report.controls.flatMap(trial => [`${trial.method}-before`, `${trial.method}-after`])];
    assert.deepEqual(records.map(record => record.path), names.map(name => `${stem}-${report.mode}/${name}.png`));
    assert.deepEqual(report.images, records, "Original images differ from the actual entry/rest/control references");
    for (const record of records) {
      safePath(record.path); assert.ok(record.path.startsWith(`${stem}-${report.mode}/`));
      assert.deepEqual(files.find(file => file.path === record.path), record);
      referenced.push(record);
    }
    problems.push(...expectedProblems.map(problem => `${alternative.id}/${report.mode}: ${problem}`));
  }
  assert.equal(new Set(referenced.map(file => file.path)).size, referenced.length, "Duplicate original reference");
  assert.deepEqual([...referenced].sort((a, b) => a.path.localeCompare(b.path)), [...originals].sort((a, b) => a.path.localeCompare(b.path)), "Unreferenced or missing original image");
  const passed = !manifest.error && problems.length === 0;
  assert.equal(manifest.passed, passed, "Saved technical result differs from raw report assessment");
  return { batch, alternativeId: alternative.id, passed, problems, originals };
}

export async function verifyReplacement({ replacement, review: reviewPath }) {
  const binding = await loadReplacement(replacement, { liveOriginal: false });
  const prepared = await loadPrepared(binding); await checkInstall(binding, prepared);
  const history = await readHistory(binding, prepared), budget = inspectHistory({ history, bindingSha256: binding.replacementSha256 });
  assert.equal(budget.complete, true); assert.equal(budget.operations, 13); assert.equal(budget.batchesCompleted, 12);
  assert.ok(budget.elapsedMs <= BUDGET.totalMs);
  const outerExecutionMs = history.reduce((sum, row) => sum + row.outerDurationMs, 0);
  assert.ok(Number.isSafeInteger(outerExecutionMs) && budget.elapsedMs <= outerExecutionMs && outerExecutionMs <= BUDGET.totalMs);
  assert.deepEqual((await readdir(join(binding.output, "batches"))).sort(), Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")));
  const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
  const setupPaths = [join(prepared.setup, "reconstruction.json"), join(prepared.setup, "targets.json"), join(prepared.setup, "dependency-install/result.json")];
  const originals = [], allReports = [], technical = [], manifestHashes = {}, operationHashes = {};
  let previousFinished = null;
  for (const row of history) {
    const stem = String(row.id).padStart(2, "0"), directory = join(binding.control, "operations", stem);
    const command = await readJson(directory, "command.json"), processRecord = await readJson(directory, "process.json"), closure = await readJson(directory, "closure.json");
    assert.equal(command.id, row.id); assert.equal(command.originalBindingSha256, binding.bindingSha256); assert.equal(command.amendmentSha256, binding.amendmentSha256);
    assert.deepEqual(command.helperHashes, binding.replacementHashes); assert.deepEqual(command.originalHelperHashes, binding.helperHashes);
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
    assert.equal(manifest.measurementBaseline, "post-closure recovered source, not original closure-time identity");
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
  assert.equal(allReports.length, 24); assert.equal(originals.length, 192);
  const reviewBytes = await regularBytes(root, reviewPath), viewed = JSON.parse(reviewBytes);
  assert.equal(viewed.schemaVersion, 1); assert.equal(viewed.complete, true);
  assertCoverage(2, [{ unit: "concepts", complete: true, sourceUnchanged: true }], originals, viewed.images);
  // The old interrupted capture is independently preserved, never repaired by
  // this union. Its manifest hash was bound before replacement execution.
  const oldArtifacts = dirname(join(root, binding.replacement.previousCapture.manifest.path));
  const oldManifest = await readJson(oldArtifacts, "manifest.json"), oldFiles = await inventory(oldArtifacts);
  assert.equal(oldManifest.complete, false); assert.equal(oldManifest.passed, false);
  assert.deepEqual(oldManifest.sourceBefore, binding.restored); assert.deepEqual(oldManifest.sourceAfter, binding.restored);
  assert.deepEqual(Object.fromEntries(oldFiles.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), oldManifest.artifacts);
  const oldRecorder = dirname(join(root, binding.replacement.previousCapture.result.path)), oldResult = await readJson(oldRecorder, "result.json");
  for (const [path, digest] of Object.entries(oldResult.rawArtifacts)) assert.equal(hash(await regularBytes(oldRecorder, path)), digest);
  const problems = observationProblems(binding.targets, binding.policy);
  return { integrityVerified: true, measurementBaseline: "one browser-only batched replacement of post-closure recovered source; not original closure identity or an unmodified frozen comparison",
    replacementSha256: binding.replacementSha256, bindingSha256: binding.bindingSha256, amendmentSha256: binding.amendmentSha256, sourceBasis: binding.amendment.record.sourceBasis,
    inputDigest: binding.frozen.digest, actorResultSha256: binding.record.actorResultSha256, sourceDigest: binding.restored.digest, sourceFiles: binding.restored.files.length,
    complete: true, stage: 2, batches: 12, reports: allReports.length, originalsReviewed: originals.length, originalsReviewSha256: hash(reviewBytes),
    budget, outerExecutionMs, remainingOuterExecutionMs: BUDGET.totalMs - outerExecutionMs,
    budgetScope: "Sum of all thirteen recorded outer coordinator lifetimes, containing every setup/build/browser/shutdown child; inter-invocation manual review and final read-only audit excluded",
    manifestHashes, operationHashes, previousCapturePreserved: true, previousCaptureComplete: false, technical, observedScopeProblems: problems,
    technicalPassed: !problems.length && technical.every(result => result.passed),
    semanticVisualAndWorkflowAcceptance: "unobserved by this verifier; independent original/source/conversation assessment and real gates remain required",
    physicalPhoneAndAuthorAcceptance: "unobserved", modelCalls: 0, retries: 0, writes: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({ options: { replacement: { type: "string" }, review: { type: "string" } } });
  assert.ok(values.replacement && values.review);
  console.log(json(await verifyReplacement({ replacement: values.replacement, review: values.review })));
}
