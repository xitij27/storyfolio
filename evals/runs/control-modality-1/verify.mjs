// Read-only evidence verification. No browser launch, actor run, model call or writes.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assessControl, digest } from "../../lib/build-capture.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const prefix = relative(root, directory) + "/";
const json = async path => JSON.parse(await readFile(path, "utf8"));
const hash = async path => digest(await readFile(path));
const unique = (items, label) => assert.equal(new Set(items).size, items.length, `${label}: duplicate paths`);
const result = { schemaVersion: 1, verified: false, modelCalls: 0, browserLaunches: 0, campaigns: [], source: [], images: [], replays: [] };
const allReports = [];
for (const [label, expectedCases, expectedImages] of [["before-1", 1, 3], ["after-1", 20, 69], ["after-2", 10, 40]]) {
  const folder = join(directory, label);
  const manifest = await json(join(folder, "manifest.json"));
  assert.equal(manifest.complete, true);
  assert.equal(manifest.modelCalls, 0);
  assert.equal(manifest.reports.length, expectedCases);
  unique(manifest.reports.map(item => item.name), `${label} reports`);
  let imageCount = 0;
  for (const record of manifest.reports) {
    const reportPath = join(folder, record.name, "report.json");
    assert.equal(await hash(reportPath), record.sha256, reportPath);
    const report = await json(reportPath);
    assert.equal(record.regressionPassed, true);
    assert.equal(report.regressionPassed, true);
    assert.equal(report.errors.length, 0);
    assert.equal(report.expectFailure, record.expectedFailure);
    assert.equal(report.problems.length > 0, record.expectedFailure);
    assert.deepEqual(report.problems, record.problems);
    assert.equal(report.images.length, record.images);
    unique(report.images.map(item => item.file), `${label}/${record.name} images`);
    const actualImages = (await readdir(dirname(reportPath))).filter(file => file.endsWith(".png")).sort();
    assert.deepEqual(actualImages, report.images.map(item => item.file).sort(), reportPath);
    for (const original of report.images) {
      const path = join(dirname(reportPath), original.file);
      const bytes = await readFile(path);
      assert.equal(bytes.length, original.bytes, path);
      assert.equal(digest(bytes), original.sha256, path);
      result.images.push({ path: relative(root, path), bytes: bytes.length, sha256: original.sha256 });
    }
    for (const control of report.controls) for (const trial of control.trials) {
      for (const key of ["beforeImage", "afterImage", "unfocusedImage"]) {
        if (trial[key]) assert.ok(report.images.some(item => item.sha256 === trial[key]), `${reportPath}: ${key}`);
      }
    }
    if (report.entry.loseContext) {
      assert.equal(report.contextLoss.supported, true);
      assert.equal(report.scene, "off");
    }
    imageCount += report.images.length;
    allReports.push({ label, report, sha256: record.sha256, path: relative(root, reportPath) });
  }
  assert.equal(imageCount, expectedImages);
  result.campaigns.push({ label, cases: manifest.reports.length, images: imageCount, sha256: await hash(join(folder, "manifest.json")), allExpectedOutcomes: true });
  for (const [path, sha256] of Object.entries(manifest.source)) {
    const frozenPath = label === "before-1" && path === manifest.modulePath ? join(root, path) : join(directory, label === "after-2" ? "after-2/source" : "after-1-source", basename(path));
    assert.equal(await hash(frozenPath), sha256, `${label} recorded source: ${path}`);
    if (label === "after-2") assert.equal(await hash(join(root, path)), sha256, `current source changed after final browser study: ${path}`);
    result.source.push({ campaign: label, path, retained: relative(root, frozenPath), sha256, matchesRecorded: true, currentRequired: label === "after-2" });
  }
}

const main = await json(join(directory, "main-viewed-originals.json"));
const independent = await json(join(directory, "independent-negative-review.json"));
const mainPaths = main.paths.map(path => prefix + path);
const independentPaths = independent.images.map(item => item.path);
unique(mainPaths, "main reviewed originals");
unique(independentPaths, "independent reviewed originals");
assert.equal(mainPaths.length, 76);
assert.equal(independentPaths.length, 36);
assert.deepEqual([...mainPaths, ...independentPaths].sort(), result.images.map(item => item.path).sort(), "exact original review coverage");
assert.equal(independent.sourceReview.sha256, await hash(join(root, independent.sourceReview.path)));
for (const original of independent.images) {
  const captured = result.images.find(item => item.path === original.path);
  assert.deepEqual(captured, original);
}
for (const report of independent.reports) {
  assert.equal(await hash(join(root, report.path)), report.sha256);
}
for (const original of result.images) original.reviewer = mainPaths.includes(original.path) ? "acceptance" : "audit_actor";
result.review = { originals: 112, main: 76, independent: 36, exactCoverage: true, duplicatePaths: false, inventorySha256: { main: await hash(join(directory, "main-viewed-originals.json")), independent: await hash(join(directory, "independent-negative-review.json")) } };

// Replay the final seven positive conditions and all fifteen negative variants.
// Intermediate positives are historical evidence, not upgraded final passes.
for (const item of allReports.filter(item => item.label === "after-2" || (item.label === "after-1" && item.report.variant !== "good"))) {
  const problems = item.report.controls.flatMap(control => assessControl(control, item.report.declarations));
  for (const declared of item.report.declarations) if (item.report.controlInventory.filter(control => control.tag === "a" && control.selector === declared.selector && control.name.trim() === declared.name && control.href === declared.href).length !== 1) problems.push("declaration does not match inventory");
  assert.equal(problems.length > 0, item.report.expectFailure, `current assessment: ${item.path}`);
  result.replays.push({ path: item.path, expectedFailure: item.report.expectFailure, problems, expectedOutcome: true });
}
assert.equal(result.replays.length, 23);
const before = allReports.find(item => item.label === "before-1").report;
assert.equal(before.problems.length, 4);
assert.ok(before.problems.every(problem => problem.includes("/pointer:")));
assert.equal(before.controls[0].trials.find(trial => trial.method === "keyboard").activated, true);
const mutation = await json(join(directory, "target-visibility-before.json"));
assert.deepEqual(mutation.problems, []);
assert.equal(mutation.checkerSha256, await hash(join(directory, "after-1-source/build-capture.mjs")));
const declaration = allReports.find(item => item.label === "after-2" && item.report.variant === "good").report.declarations;
const mutationProblems = assessControl(mutation.control, declaration);
assert.ok(mutationProblems.some(problem => problem.includes("missing actual declared skip target response")));
result.targetVisibilityRegression = { beforeProblems: mutation.problems, currentProblems: mutationProblems, rejectedNow: true, beforeArtifactSha256: await hash(join(directory, "target-visibility-before.json")) };
result.summary = { caseExecutions: 31, originalImages: 112, finalPositiveConditions: 7, ordinaryPositive: 1, negativeVariants: 15, expectedFailuresPreserved: true, finalSourceMatches: true, baselineReclassified: false, fullPrototypeAcceptance: false };
result.verified = true;
console.log(JSON.stringify(result, null, 2));
