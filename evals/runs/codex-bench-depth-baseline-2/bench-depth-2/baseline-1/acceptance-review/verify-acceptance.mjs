// Read-only source, frozen assessment, artifact and complete original-review audit.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { hash, json, verifyInputs } from "../../../../../lib/build.mjs";

assert.equal(process.argv.length, 2, "No arguments accepted");
const review = dirname(fileURLToPath(import.meta.url)), run = resolve(review, ".."), inputs = resolve(run, "../../inputs"), output = join(run, "acceptance"), root = resolve(review, "../../../../../..");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
async function filesAt(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await filesAt(directory, path));
    else { assert.ok(entry.isFile(), `Non-file evidence: ${path}`); files.push(path); }
  }
  return files.sort();
}
const frozen = await verifyInputs(inputs);
const manifest = await readJson(join(output, "manifest.json"));
assert.equal(manifest.complete, true, "Incomplete capture remains unobserved");
assert.equal(manifest.sourceUnchanged, true);
const { captureSource } = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build-capture.mjs")));
const { assessObservation, buildCases } = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build-check.mjs")));
const expected = await readJson(join(inputs, "expectations.json"));
assert.deepEqual(manifest.expected, expected);
const artifactFiles = (await filesAt(output)).filter(path => path !== "manifest.json");
assert.deepEqual(artifactFiles, Object.keys(manifest.artifacts).sort(), "Acceptance artifact set changed");
for (const path of artifactFiles) assert.equal(hash(await readFile(join(output, path))), manifest.artifacts[path], `Artifact changed: ${path}`);
for (const [path, digest] of Object.entries(manifest.frozen)) assert.equal(hash(await readFile(path)), digest, `Frozen checker/dependency entry changed: ${path}`);
const before = await readJson(join(review, "source-before.json")), after = await readJson(join(review, "source-after.json"));
assert.deepEqual(before, after);
assert.deepEqual(before, manifest.sourceBefore);
assert.deepEqual(after, manifest.sourceAfter);
assert.deepEqual(await captureSource(manifest.workspace), before, "Runtime source changed after capture");
const actorBytes = await readFile(join(run, "turns/01/result.json")), actor = JSON.parse(actorBytes);
const sourceComparison = await readJson(join(review, "saved-source-comparison.json"));
assert.equal(sourceComparison.actorResultSha256, hash(actorBytes));
const capturedFiles = Object.fromEntries(before.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));
assert.deepEqual(capturedFiles, actor.snapshot.files, "Strict actor/capture source-set identity failed");
for (const [path, record] of Object.entries(actor.snapshot.files)) {
  const bytes = await readFile(join(run, "turns/01/snapshot/files", path));
  assert.equal(hash(bytes), record.hash, `Retained actor snapshot bytes changed: ${path}`);
  assert.equal(bytes.length, record.size);
}

const expectedCases = buildCases(expected);
assert.deepEqual(manifest.results.map(result => result.id), expectedCases.map(entry => entry.id));
const cases = [];
for (const [index, result] of manifest.results.entries()) {
  const report = await readJson(join(output, result.report));
  const problems = assessObservation(expected, expectedCases[index], report);
  assert.deepEqual(problems, report.problems);
  assert.deepEqual(problems, result.problems);
  assert.equal(result.passed, problems.length === 0);
  assert.equal(report.sourceDigest, before.digest);
  cases.push({ id: result.id, passed: result.passed, problems, reportSha256: manifest.artifacts[result.report], rests: report.rests.length, motionTrajectories: report.motion.length, stationary: report.stationary, contextLoss: report.contextLoss ?? null, controls: report.controls.map(control => ({ key: control.key, name: control.name, trials: control.trials.map(trial => ({ method: trial.method, applicability: trial.applicability, activated: trial.activated, reached: trial.reached, hitTarget: trial.hitTarget, changed: trial.changed, error: trial.error ?? null })) })) });
}
const inventories = [
  { reviewer: "next_plan", path: "animated-review/viewed-images.json", modes: ["desktop", "mobile", "short"] },
  { reviewer: "acceptance", path: "fallback-review/viewed-images.json", modes: ["reduced-motion", "no-webgl", "no-javascript", "context-loss"] },
];
const images = [];
for (const inventory of inventories) {
  const savedInventory = await readJson(join(review, inventory.path));
  assert.equal(savedInventory.complete, true, `Incomplete original review: ${inventory.path}`);
  const records = savedInventory.images;
  assert.equal(new Set(records.map(item => item.path)).size, records.length, `Duplicate reviewed paths: ${inventory.path}`);
  for (const record of records) {
    const path = relative(output, resolve(root, record.path));
    assert.ok(inventory.modes.includes(path.split("/")[0]), `Review scope mismatch: ${record.path}`);
    assert.equal(record.viewMethod, "view_image original");
    assert.equal(record.sha256, manifest.artifacts[path], `Reviewed image hash differs: ${record.path}`);
    const bytes = await readFile(join(output, path));
    assert.equal(record.bytes, bytes.length);
    images.push({ ...record, reviewer: inventory.reviewer, mode: path.split("/")[0] });
  }
}
const originalPaths = artifactFiles.filter(path => /\.(png|jpe?g)$/.test(path)).map(path => relative(root, join(output, path)));
assert.equal(new Set(images.map(image => image.path)).size, images.length, "Duplicate paths across reviewers");
assert.deepEqual(images.map(image => image.path).sort(), originalPaths.sort(), "Original review incomplete or over-counted");
images.sort((left, right) => left.path.localeCompare(right.path));
const execution = await readJson(join(review, "process.json"));
assert.equal(execution.code, manifest.passed ? 0 : 1);
assert.equal(execution.signalsSha256, hash(await readFile(join(review, "signals.jsonl"))));
const verdict = { schemaVersion: 1, verified: true, modelCalls: 0, writes: false, inputDigest: frozen.digest,
  source: { files: before.files.length, digest: before.digest, strictActorSnapshotIdentity: true, beforeAfterAndCurrentUnchanged: true },
  capture: { complete: manifest.complete, passed: manifest.passed, started: manifest.started, finished: manifest.finished, manifestSha256: hash(await readFile(join(output, "manifest.json"))), artifacts: artifactFiles.length, processExitCode: execution.code, signals: (await readFile(join(review, "signals.jsonl"), "utf8")).trim().split("\n").filter(Boolean).map(line => JSON.parse(line)) },
  cases, originalReview: { total: images.length, exactCoverage: true, byMode: Object.fromEntries(expectedCases.map(entry => [entry.id, images.filter(image => image.mode === entry.id).length])), inventoryDigest: hash(json(images)), images },
  limits: ["Artifact/source integrity and frozen technical assessment are separate from visual acceptance", "Recorded original review does not prove every animation frame, physical-phone behavior or actual author approval", "Entry-point dependency identity is not complete dependency integrity; access/dependency audit is separate"] };
console.log(json(verdict));
