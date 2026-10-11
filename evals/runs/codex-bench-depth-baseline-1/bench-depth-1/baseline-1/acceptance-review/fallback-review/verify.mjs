import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Read-only verification. No browser, model call or writes.
const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../../../../../..");
const run = "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1";
const inputs = "evals/runs/codex-bench-depth-baseline-1/inputs";
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const read = path => readFile(join(root, path));
const { sourcePathExcluded, SOURCE_EXCLUSIONS } = await import(pathToFileURL(join(root, inputs, "implementation/evals/lib/build-capture.mjs")));
const manifestBytes = await read(`${run}/acceptance-2/manifest.json`);
const manifest = JSON.parse(manifestBytes);
assert.equal(manifest.complete, true);
assert.equal(manifest.sourceUnchanged, true);
assert.equal(manifest.sourceBefore.digest, sha256(JSON.stringify(manifest.sourceBefore.files)));
assert.deepEqual(manifest.sourceBefore.exclusions, SOURCE_EXCLUSIONS);
assert.deepEqual(manifest.sourceAfter, manifest.sourceBefore);
const actorBytes = await read(`${run}/turns/01/result.json`);
const actor = JSON.parse(actorBytes);
const expectedSource = Object.entries(actor.snapshot.files).filter(([path]) => !sourcePathExcluded(path));
const expectedPaths = new Set(expectedSource.map(([path]) => path));
const extraSource = manifest.sourceBefore.files.filter(file => !expectedPaths.has(file.path));
// The actor snapshot omits its alternative Git directory; the frozen browser
// capture includes it. Preserve that difference rather than changing exclusions.
assert.ok(extraSource.every(file => file.path.startsWith(".prototype-history/")));
assert.deepEqual(manifest.sourceBefore.files.filter(file => expectedPaths.has(file.path)).map(file => file.path).sort(), [...expectedPaths].sort());
for (const file of extraSource) {
  const bytes = await readFile(join(manifest.workspace, file.path));
  assert.equal(sha256(bytes), file.sha256, file.path);
  assert.equal(bytes.length, file.bytes, file.path);
}
for (const [path, file] of expectedSource) {
  assert.equal(file.type, "file");
  const bytes = await read(`${run}/turns/01/snapshot/files/${path}`);
  assert.equal(sha256(bytes), file.hash, path);
  assert.equal(bytes.length, file.size, path);
  const bound = manifest.sourceBefore.files.find(entry => entry.path === path);
  assert.equal(bound.sha256, file.hash, path);
  assert.equal(bound.bytes, file.size, path);
}
const inventoryBytes = await readFile(join(directory, "viewed-images.json"));
const inventory = JSON.parse(inventoryBytes);
assert.equal(inventory.sourceDigest, manifest.sourceBefore.digest);
assert.equal(new Set(inventory.images.map(image => image.path)).size, inventory.images.length);
const modes = [];
for (const mode of inventory.scope) {
  const prefix = `${run}/acceptance-2/${mode}`;
  const bytes = await read(`${prefix}/report.json`), report = JSON.parse(bytes);
  assert.equal(sha256(bytes), manifest.artifacts[`${mode}/report.json`]);
  assert.equal(report.sourceDigest, inventory.sourceDigest);
  const actual = (await readdir(join(root, prefix))).filter(path => /\.(png|jpg)$/.test(path)).sort();
  assert.deepEqual(actual, [...report.screenshots].sort());
  const viewed = inventory.images.filter(image => image.path.startsWith(prefix + "/"));
  assert.deepEqual(viewed.map(image => image.path).sort(), actual.map(path => `${prefix}/${path}`).sort());
  for (const image of viewed) {
    const imageBytes = await read(image.path);
    assert.equal(sha256(imageBytes), image.sha256, image.path);
    assert.equal(imageBytes.length, image.bytes, image.path);
    assert.equal(manifest.artifacts[image.path.slice(`${run}/acceptance-2/`.length)], image.sha256, image.path);
  }
  assert.deepEqual(report.rests.map(rest => rest.beat), ["question", "scheduling", "bench", "evidence", "scope"]);
  for (const rest of report.rests) {
    assert.equal(rest.scene, "off");
    assert.equal(viewed.find(image => image.path === `${prefix}/${rest.file}`).sha256, rest.sha256);
    assert.ok(Math.abs(rest.requestedScroll - rest.actualScroll) <= 2);
  }
  if (mode === "context-loss") {
    assert.equal(report.contextLoss.supported, true);
    assert.ok(report.rests.every(rest => rest.afterContextLoss));
  }
  modes.push({ mode, reportSha256: sha256(bytes), originalsViewed: viewed.length, viewport: report.entry.viewport, sourceDigest: report.sourceDigest, sceneOffAtAllFiveRests: true, contextLoss: report.contextLoss ?? null, frozenPassed: manifest.results.find(result => result.id === mode).passed, problemCount: report.problems.length });
}
console.log(JSON.stringify({ schemaVersion: 1, passed: true, meaning: "Retained actor source and review inventory integrity only. The exact source sets differ as disclosed; this is not a replacement acceptance result or a visual score.", modelCalls: 0, writes: false, actorResultSha256: sha256(actorBytes), acceptanceManifestSha256: sha256(manifestBytes), reviewedInventorySha256: sha256(inventoryBytes), sourceDigest: manifest.sourceBefore.digest, boundSourceFiles: expectedSource.length, exactSnapshotFileSet: extraSource.length === 0, additionalSource: { count: extraSource.length, prefix: ".prototype-history/", meaning: "Actor-created alternative Git directory omitted by the actor snapshot. Acceptance before/after includes identical hashes; current runtime bytes also match. These additional bytes are not preserved in the source snapshot.", files: extraSource }, originalsViewed: inventory.images.length, modes }, null, 2));
