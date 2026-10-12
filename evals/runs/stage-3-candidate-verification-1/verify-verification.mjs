// Read-only audit. --integrity-only never claims original-image review completion.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { hash, json } from "../../lib/build.mjs";
import { study, review, output, inputs, loadBindings, filesAt, readJson } from "./bindings.mjs";

assert.ok(process.argv.length === 2 || (process.argv.length === 3 && process.argv[2] === "--integrity-only"));
const integrityOnly = process.argv[2] === "--integrity-only", root = resolve(study, "../../..");
const binding = await loadBindings();
const manifestBytes = await readFile(join(output, "manifest.json")), manifest = JSON.parse(manifestBytes);
const artifacts = (await filesAt(output)).filter(path => path !== "manifest.json");
assert.deepEqual(artifacts, Object.keys(manifest.artifacts).sort());
for (const path of artifacts) assert.equal(hash(await readFile(join(output, path))), manifest.artifacts[path], `Artifact changed: ${path}`);
for (const [path, sha256] of Object.entries(manifest.frozen)) assert.equal(hash(await readFile(path)), sha256, `Frozen identity changed: ${path}`);
assert.equal(manifest.workspace, binding.meta.work); assert.equal(manifest.sourceUnchanged, true);
const before = await readJson(join(review, "source-before.json")), after = await readJson(join(review, "source-after.json"));
assert.deepEqual(before, after); assert.deepEqual(before, manifest.sourceBefore); assert.deepEqual(after, manifest.sourceAfter); assert.deepEqual(await binding.source(), before);
const command = await readJson(join(review, "command.json")), attempt = await readJson(join(review, "single-attempt.json")), execution = await readJson(join(review, "process.json"));
assert.equal(command.executable, process.execPath); assert.equal(command.cwd, binding.meta.work); assert.deepEqual(command.environment, binding.environment);
assert.deepEqual(command.args, [join(inputs, "implementation/evals/check-build.mjs"), `--workspace=${binding.meta.work}`, `--expectations=${join(inputs, "expectations.json")}`, `--out=${output}`, "--dependencies=/tmp/storyfolio-build-capability-20261011"]);
assert.equal(command.checkerTimeoutMs, 895000); assert.equal(command.shutdownGraceMs, 5000); assert.equal(command.totalChildLifetimeCapMs, 900000); assert.equal(command.modelCalls, 0); assert.equal(command.noRetries, true);
for (const [path, sha256] of Object.entries(command.helperHashes)) assert.equal(hash(await readFile(join(study, path))), sha256, `Runner helper changed: ${path}`);
assert.equal(attempt.actorResultSha256, binding.actorResultSha256); assert.equal(attempt.actorComplete, false); assert.equal(attempt.actorTimedOut, true); assert.equal(attempt.retries, 0);
assert.deepEqual(attempt.previousCapture, binding.previous); assert.deepEqual(await readJson(join(review, "previous-evidence-after.json")), binding.previous);
const lifecycleBytes = await readFile(join(review, "lifecycle.jsonl")); assert.equal(hash(lifecycleBytes), execution.lifecycleSha256);
const lifecycle = lifecycleBytes.toString().trim().split("\n").filter(Boolean).map(line => JSON.parse(line));
assert.equal(lifecycle.filter(event => event.type === "spawn-request").length, 1); assert.equal(lifecycle.filter(event => event.type === "closed").length, 1);
assert.equal(lifecycle.at(-1).type, "closed"); assert.equal(execution.timeoutMs, 895000); assert.equal(execution.graceMs, 5000); assert.equal(execution.totalCapMs, 900000);
assert.equal(lifecycle.at(-1).code, execution.code); assert.equal(lifecycle.at(-1).signal, execution.signal);
assert.equal(lifecycle.at(-1).timedOut, execution.timedOut); assert.equal(lifecycle.at(-1).externalSignal, execution.externalSignal);
for (const event of lifecycle) { assert.equal(event.wrapperPid, execution.wrapperPid); assert.equal(event.childPid, execution.childPid); }
assert.equal(execution.code, manifest.passed ? 0 : 1, "Checker exit must agree with final manifest");
const expected = await readJson(join(inputs, "expectations.json")); assert.deepEqual(manifest.expected, expected);
const { assessObservation, buildCases } = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build-check.mjs")));
const expectedCases = buildCases(expected);
assert.deepEqual(manifest.results.map(entry => entry.id), expectedCases.slice(0, manifest.results.length).map(entry => entry.id));
if (manifest.complete) assert.equal(manifest.results.length, expectedCases.length);
const cases = [];
for (const [index, result] of manifest.results.entries()) {
  const report = await readJson(join(output, result.report));
  const problems = assessObservation(expected, expectedCases[index], report);
  assert.deepEqual(problems, report.problems); assert.deepEqual(problems, result.problems); assert.equal(result.passed, problems.length === 0); assert.equal(report.sourceDigest, before.digest);
  cases.push({ id: result.id, passed: result.passed, problems, reportSha256: manifest.artifacts[result.report], rests: report.rests.length, motionTrajectories: report.motion.length, stationary: report.stationary, contextLoss: report.contextLoss ?? null, controls: report.controls.map(control => ({ key: control.key, name: control.name, trials: control.trials.map(trial => ({ method: trial.method, applicability: trial.applicability, reached: trial.reached, hitTarget: trial.hitTarget, changed: trial.changed, error: trial.error ?? null })) })) });
}
const originalPaths = artifacts.filter(path => /\.(png|jpe?g)$/.test(path)), reviewed = [];
if (!integrityOnly) {
  for (const inventory of [{ reviewer: "next_plan", path: "animated-review/viewed-images.json", modes: ["desktop", "mobile", "short"] }, { reviewer: "acceptance", path: "fallback-review/viewed-images.json", modes: ["reduced-motion", "no-webgl", "no-javascript", "context-loss"] }]) {
    const record = await readJson(join(review, inventory.path)); assert.equal(record.complete, true);
    for (const image of record.images) {
      const path = relative(output, resolve(root, image.path));
      assert.ok(inventory.modes.includes(path.split("/")[0])); assert.equal(image.viewMethod, "view_image original");
      assert.equal(image.sha256, manifest.artifacts[path]); assert.equal((await readFile(join(output, path))).length, image.bytes);
      reviewed.push({ ...image, reviewer: inventory.reviewer, mode: path.split("/")[0] });
    }
  }
  assert.equal(new Set(reviewed.map(image => image.path)).size, reviewed.length, "Duplicate reviewed original path");
  assert.deepEqual(reviewed.map(image => image.path).sort(), originalPaths.map(path => relative(root, join(output, path))).sort(), "All available originals must be individually reviewed");
}
console.log(json({ schemaVersion: 1, verified: true, scope: integrityOnly ? "Artifact, source, process and frozen technical integrity only; no original-review assertion" : "Evidence integrity and exact available-original review, separate from visual judgment and completed actor delivery", modelCalls: 0, writes: false, actor: { complete: false, timedOut: true, durationMs: binding.actor.durationMs }, inputDigest: binding.frozen.digest, previousCapture: binding.previous, source: { files: before.files.length, digest: before.digest, strictActorSnapshotIdentity: true, beforeAfterAndCurrentUnchanged: true }, capture: { complete: manifest.complete, passed: manifest.passed, started: manifest.started, finished: manifest.finished, manifestSha256: hash(manifestBytes), artifacts: artifacts.length, processExitCode: execution.code, timedOut: execution.timedOut, externalSignal: execution.externalSignal, lifecycle }, cases, unobservedModes: expectedCases.filter(entry => !manifest.results.some(result => result.id === entry.id)).map(entry => entry.id), originalReview: { asserted: !integrityOnly, available: originalPaths.length, reviewed: reviewed.length, exactAvailableCoverage: !integrityOnly, byMode: Object.fromEntries(expectedCases.map(entry => [entry.id, originalPaths.filter(path => path.startsWith(entry.id + "/")).length])), images: reviewed }, limits: ["Verification does not erase the original actor timeout or complete Stage 3 by itself", "Technical results do not establish visual quality, physical-phone behavior or actual author approval", "Absent modes or interrupted coverage remain unobserved", "No new actor, judge or retry is authorized by this result"] }));
