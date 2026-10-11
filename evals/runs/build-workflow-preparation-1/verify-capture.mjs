#!/usr/bin/env node
// Read-only verification of the final tiny-fixture browser smoke artifacts.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const directory = dirname(fileURLToPath(import.meta.url));
const output = join(directory, "capture-smoke-2");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const manifestBytes = await readFile(join(output, "manifest.json"));
const manifest = JSON.parse(manifestBytes);
assert.equal(manifest.complete, true);
assert.equal(manifest.modelInvocations, 0);
assert.equal(manifest.reports.length, 12);
const expectedSources = ["capture-smoke.mjs", "capture-fixture.html", "../../lib/build-capture.mjs", "../../lib/build-check.mjs"];
assert.deepEqual(Object.keys(manifest.source), expectedSources);
for (const path of expectedSources) {
  assert.equal(sha(await readFile(resolve(directory, path))), manifest.source[path], `live source: ${path}`);
  assert.equal(sha(await readFile(join(output, "source", path.split("/").at(-1)))), manifest.source[path], `saved source: ${path}`);
}
let images = 0;
let intervals = 0;
let controlTrials = 0;
let stillPairs = 0;
for (const entry of manifest.reports) {
  const bytes = await readFile(join(output, entry.name, "report.json"));
  assert.equal(sha(bytes), entry.reportSha256, entry.name);
  const report = JSON.parse(bytes);
  assert.deepEqual(report.problems, entry.problems);
  if (entry.name.endsWith("-good")) assert.equal(report.problems.length, 0, entry.name);
  else assert.ok(report.problems.length, entry.name);
  for (const image of report.images) {
    const bytes = await readFile(join(output, entry.name, image.file));
    assert.equal(bytes.length, image.bytes, image.file);
    assert.equal(sha(bytes), image.sha256, image.file);
    images++;
  }
  intervals += report.motion.length;
  controlTrials += report.controls.reduce((sum, control) => sum + control.trials.length, 0);
  stillPairs += report.stationary.length;
}
console.log(JSON.stringify({ verified: true, manifestSha256: sha(manifestBytes), sourceOriginals: expectedSources.length, reports: manifest.reports.length, goodModes: 7, detectedNegativeVariants: 5, images, intervals, controlTrials, stillPairs, modelInvocations: 0 }, null, 2));
