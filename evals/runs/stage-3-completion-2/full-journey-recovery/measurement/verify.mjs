// Read-only recovered concept-stage audit. This does not authorize actor continuation.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { loadBinding, regularBytes, inventory, hash, json } from "./binding-lib.mjs";
import { assertCoverage, assertUnitCoverage, bounds, observationProblems } from "../../full-journey-measurement/measurement-lib.mjs";
import { assertInstall } from "./app-root.mjs";
const { values } = parseArgs({ options: { binding: { type: "string" }, review: { type: "string" } } }); assert.ok(values.binding && values.review);
const binding = await loadBinding(values.binding, { liveOriginal: false });
assert.deepEqual((await readdir(join(binding.output, "units"))).sort(), [...binding.units].sort());
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
const originals = [], reports = [], technical = [], manifestHashes = {};
for (const unit of binding.units) {
  const directory = join(binding.output, "units", unit), review = join(directory, "review"), artifacts = join(directory, "artifacts");
  const manifest = await readJson(artifacts, "manifest.json"), closure = await readJson(review, "closure.json"), processRecord = await readJson(review, "process.json"), files = await inventory(artifacts);
  const command = await readJson(review, "command.json"), preparation = await readJson(join(binding.output, "setup"), "reconstruction.json");
  assert.equal(preparation.bindingSha256, binding.bindingSha256); assert.equal(preparation.amendmentSha256, binding.amendmentSha256); assert.deepEqual(preparation.helperHashes, binding.helperHashes);
  assert.equal(manifest.workspace, preparation.work); assert.equal(manifest.application, preparation.application); assert.equal(manifest.applicationRoot, binding.applicationRoot);
  assert.equal(preparation.application, join(preparation.work, binding.applicationRoot)); assert.deepEqual(preparation.source, binding.restored);
  assert.equal(command.cwd, preparation.application); assert.equal(command.wholeWorkspace, preparation.work); assert.equal(command.applicationRoot, binding.applicationRoot);
  assert.equal(command.amendmentSha256, binding.amendmentSha256); assert.deepEqual(command.helperHashes, binding.helperHashes); assert.deepEqual(command.environment, binding.environment);
  assert.equal(command.executable, binding.capabilities.node.executable);
  const worker = "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/gate-worker.mjs";
  assert.equal(command.args[0], join(binding.root, worker)); assert.equal(command.workerSha256, binding.helperHashes[worker]);
  assert.deepEqual(command.args.slice(1), [`--workspace=${preparation.work}`, `--application-root=${binding.applicationRoot}`, `--targets=${join(binding.output, "setup/targets.json")}`, `--expectations=${join(binding.meta.inputs, "expectations.json")}`, `--out=${artifacts}`, `--dependencies=${binding.policy.trustedDependencies.root}`]);
  const install = await readJson(join(binding.output, "setup/dependency-install"), "command.json"), installed = await readJson(join(binding.output, "setup/dependency-install"), "result.json");
  assertInstall(install, preparation.application, binding.installContract); assert.equal(install.wrapperSha256, binding.helperHashes["evals/runs/stage-3-comparison-1/record-command.mjs"]);
  assert.equal(installed.code, 0); assert.equal(installed.signal, null); assert.ok(!installed.error && !installed.timedOut);
  assert.equal(command.installResultSha256, hash(await regularBytes(join(binding.output, "setup/dependency-install"), "result.json")));
  for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(join(binding.output, "setup/dependency-install"), channel + ".log")), installed[`${channel}Sha256`]);
  assert.equal(manifest.unit, unit); assert.equal(closure.bindingSha256, binding.bindingSha256); assert.equal(closure.amendmentSha256, binding.amendmentSha256); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true);
  assert.deepEqual(manifest.sourceBefore, binding.restored); assert.deepEqual(manifest.sourceAfter, binding.restored);
  assert.deepEqual(await readJson(review, "source-before.json"), binding.restored); assert.deepEqual(await readJson(review, "source-after.json"), binding.restored);
  assert.deepEqual(files, await readJson(review, "artifact-inventory.json"));
  assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
  manifestHashes[unit] = hash(await regularBytes(artifacts, "manifest.json")); assert.equal(closure.manifestSha256, manifestHashes[unit]);
  for (const channel of ["stdout", "stderr", "lifecycle"]) assert.equal(hash(await regularBytes(review, channel === "lifecycle" ? "lifecycle.jsonl" : channel + ".log")), processRecord[`${channel}Sha256`]);
  assert.deepEqual({ timeoutMs: processRecord.timeoutMs, graceMs: processRecord.graceMs, totalCapMs: processRecord.totalCapMs }, bounds(unit, binding.policy));
  assert.ok(!processRecord.timedOut && !processRecord.externalSignal && !processRecord.spawnError && !processRecord.signal && !processRecord.logError, "Interrupted or unrecorded stage is incomplete");
  const modeReports = [];
  for (const result of manifest.results) modeReports.push(await readJson(artifacts, result.report ?? `${result.directory}/report.json`));
  assertUnitCoverage(unit, binding.targets, manifest, modeReports);
  reports.push({ unit, complete: manifest.complete, sourceUnchanged: manifest.sourceUnchanged });
  technical.push({ unit, exitCode: processRecord.code, passed: processRecord.code === 0 && manifest.passed === true, problems: manifest.problems ?? manifest.observationProblems ?? [], errors: manifest.error ?? null });
  for (const file of files.filter(file => /\.(?:png|jpe?g)$/i.test(file.path))) originals.push({ ...file, path: `${binding.record.output}/units/${unit}/artifacts/${file.path}` });
}
const reviewBytes = await regularBytes(process.cwd(), values.review), viewed = JSON.parse(reviewBytes); assert.equal(viewed.schemaVersion, 1); assert.equal(viewed.complete, true);
assertCoverage(binding.record.turn, reports, originals, viewed.images);
const problems = observationProblems(binding.targets, binding.policy);
console.log(json({ integrityVerified: true, amendmentSha256: binding.amendmentSha256, sourceBasis: binding.amendment.record.sourceBasis, measurementBaseline: "post-closure recovered source, not an unmodified frozen comparison", stage: binding.record.turn, complete: true, sourceDigest: binding.restored.digest, inputDigest: binding.frozen.digest, actorResultSha256: binding.record.actorResultSha256,
  originalsReviewed: originals.length, originalsReviewSha256: hash(reviewBytes), manifestHashes, technical, observedScopeProblems: problems, technicalPassed: !problems.length && technical.every(result => result.passed),
  semanticVisualAndWorkflowAcceptance: "unobserved by this verifier; independent original/source/conversation assessment and real gates remain required", physicalPhoneAndAuthorAcceptance: "unobserved", modelCalls: 0, writes: false }));
