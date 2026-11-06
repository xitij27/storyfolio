import assert from "node:assert/strict";
import { readFile, readdir, lstat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = fileURLToPath(new URL("../../../", import.meta.url));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const manifest = await readJson(join(here, "source-manifest.json"));
const inventory = await readJson(join(here, "workspace-inventory.json"));
const journey = await readJson(join(here, "journey.json"));
const contained = (base, path) => {
  assert.equal(typeof path, "string");
  assert(!path.startsWith("/") && !path.split("/").includes(".."));
  return resolve(base, path);
};
async function verify(base, record) {
  const path = contained(base, record.path);
  assert((await lstat(path)).isFile(), record.path);
  const bytes = await readFile(path);
  assert.equal(bytes.length, record.bytes, record.path);
  assert.equal(sha256(bytes), record.sha256, record.path);
  return bytes;
}
async function walk(dir, prefix = "") {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name;
    assert(!entry.isSymbolicLink(), "Fixture symlink: " + path);
    if (entry.isDirectory()) files.push(...await walk(join(dir, entry.name), path));
    else { assert(entry.isFile(), path); files.push(path); }
  }
  return files.sort();
}
assert.equal(manifest.fixture, "full-journey-1");
assert.equal(journey.id, "full-journey-1");
assert.deepEqual(journey.requestedStops, [1, 2, 3, 4, 5, 6]);
assert.deepEqual(journey.refusalTurns, [2, 3, 4, 5, 6]);
assert.equal(journey.bounds.maxTurns, 6);
assert.equal(journey.bounds.turnTimeoutMs, 900000);
assert.equal(journey.prompts.length, 6);
assert.equal(journey.launchable, false);
for (const record of manifest.originalSources) await verify(root, record);
await verify(root, manifest.coordinatorSourceReview);
for (const record of manifest.files) {
  const bytes = await verify(here, record);
  if (record.unchangedOrigin) assert.deepEqual(bytes, await readFile(contained(root, record.origin)), record.path);
}
for (const record of manifest.coordinatorRecords) await verify(here, record);
for (const record of inventory.files) await verify(join(here, "workspace"), record);
const actual = await walk(join(here, "workspace"));
assert.deepEqual(actual, inventory.files.map(file => file.path).sort());
assert.deepEqual(actual, journey.files.slice().sort());
assert.equal(actual.length, inventory.fileCount);
assert(actual.every(path => path.startsWith("material/") || path.startsWith("public/assets/")));
assert(!actual.some(path => path.startsWith("docs/story/") || path.startsWith("app/") || path === "package.json"));
const truth = await readFile(contained(root, manifest.truthBlock.origin));
const second = await readFile(contained(here, manifest.truthBlock.prompt));
assert.equal(truth.length, manifest.truthBlock.bytes);
assert.equal(sha256(truth), manifest.truthBlock.sha256);
assert.equal(second.indexOf(truth), manifest.truthBlock.byteOffset);
assert.equal(second.indexOf(truth, manifest.truthBlock.byteOffset + 1), -1);
assert.deepEqual(second.subarray(manifest.truthBlock.byteOffset, manifest.truthBlock.byteOffset + truth.length), truth);
const first = await readFile(join(here, "prompts/turn1.md"), "utf8");
assert(!/\b(?:three|two|spine|Node|git|browser|12|22)\b|stop\s+[1-6]/i.test(first));
assert(first.includes("build a working local site"));
assert(first.includes("not paper, sheets or a collection of cards"));
console.log(JSON.stringify({
  fixturePreservationPassed: true,
  unchangedCopiedFiles: manifest.files.filter(file => file.unchangedOrigin).length,
  preservedOriginFiles: manifest.originalSources.length,
  originalTruthEmbeddedExactly: true,
  initialWorkspaceFiles: actual.length,
  fixedPrompts: journey.prompts.length,
  requestedStops: journey.requestedStops,
  launchable: false,
  models: 0,
  builds: 0,
  browsers: 0,
  writes: false,
  limits: "Preservation only. Reviewed catalog bytes are bound, not installed. Actual runtime, supported adapter and actor behavior remain unverified."
}, null, 2));
