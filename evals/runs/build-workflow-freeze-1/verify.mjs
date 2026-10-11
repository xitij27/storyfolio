// Retained-evidence verification only, no subprocesses, network or writes.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, inspectBuildInputs, json, verifyInputs } from "../../lib/build.mjs";

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const cohort = join(root, "evals/runs/codex-bench-depth-baseline-1");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const audit = await readJson(join(study, "final-audit.json"));
const readiness = await readJson(join(study, "readiness.json"));
assert.equal(audit.verified, true);
assert.equal(audit.phase, "prepared-and-capability-proved");
assert.equal(audit.launchEnvironment.enforced, true);
assert.equal(audit.capabilityProof.passed, true);
assert.equal(readiness.passed, true);
assert.equal(readiness.inputDigest, audit.inputDigest);
const manifest = await verifyInputs(join(cohort, "inputs"));
assert.equal(manifest.digest, audit.inputDigest);
const capabilities = await readJson(join(cohort, "inputs/capabilities.json"));
assert.equal((await inspectBuildInputs({ root, casePath: manifest.casePath, capabilities })).digest, manifest.digest);
const baseline = join(cohort, "bench-depth-1/baseline-1");
assert.deepEqual((await readdir(baseline)).sort(), ["meta.json", "setup"]);
for (const [path, expected] of Object.entries(audit.capabilityProof.evidence)) {
  const bytes = await readFile(join(baseline, "setup", path));
  assert.equal(hash(bytes), expected.sha256, path);
  assert.equal(bytes.length, expected.bytes, path);
}
const tests = await readFile(join(study, "repository-tests.tap"), "utf8");
assert.match(tests, /# tests 305\n# suites 31\n# pass 305\n# fail 0\n/);
assert.doesNotMatch(tests, /not ok|truncated output/);
const images = {};
const imageDirectory = "setup/capability/browser/light-wide";
for (const name of (await readdir(join(baseline, imageDirectory))).filter(name => name.endsWith(".png")).sort()) {
  const bytes = await readFile(join(baseline, imageDirectory, name));
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.readUInt32BE(16), 1440);
  assert.equal(bytes.readUInt32BE(20), 900);
  images[name] = { sha256: hash(bytes), bytes: bytes.length, width: 1440, height: 900 };
}
assert.equal(Object.keys(images).length, 9);
async function inventory(directory, prefix = "", exclusions = []) {
  const files = {};
  for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (exclusions.includes(path)) continue;
    assert(!entry.isSymbolicLink(), path);
    if (entry.isDirectory()) Object.assign(files, await inventory(directory, path, exclusions));
    else { assert(entry.isFile(), path); const bytes = await readFile(join(directory, path)); files[path] = { sha256: hash(bytes), bytes: bytes.length }; }
  }
  return files;
}
const cohortFiles = await inventory(cohort), studyFiles = await inventory(study, "", ["verification.json"]);
console.log(json({ schemaVersion: 1, verified: true, inputDigest: manifest.digest,
  frozenFiles: Object.keys(manifest.hashes).length, sourceMatches: true, noPaidArtifacts: true,
  tests: { total: 305, suites: 31, passed: 305, failed: 0 }, images,
  cohort: { files: Object.keys(cohortFiles).length, inventorySha256: hash(json(cohortFiles)), inventory: cohortFiles },
  study: { files: Object.keys(studyFiles).length, inventorySha256: hash(json(studyFiles)), inventory: studyFiles },
  modelCalls: 0, subprocesses: 0, writes: false, paidExecutionAuthorized: false,
  limits: "Retained local evidence only. Live readiness must be rechecked before any separately authorized paid turn. No model session or output-quality claim." }));
