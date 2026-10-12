// Preserve a newly labelled apparatus, never alter the first calibration.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { root, implementationPaths, transitivePaths, regularBytes, captureSource, hash, json, writeNew } from "../../full-journey-measurement/binding-lib.mjs";
import { buildInventory } from "../../full-journey-measurement/measurement-lib.mjs";
import { compareBuildIdentity } from "../../full-journey-measurement/cache-identity.mjs";
const prior = "evals/runs/stage-3-completion-2/full-journey/calibration-1";
const output = "evals/runs/stage-3-completion-2/full-journey/calibration-2";
const source = JSON.parse(await regularBytes(root, prior + "/source.json"));
const allocation = JSON.parse(await regularBytes(root, prior + "/allocation.json"));
assert.deepEqual(await captureSource(allocation.work), source);
const proofPath = prior + "/build/artifacts/manifest.json";
const proofBytes = await regularBytes(root, proofPath), proof = JSON.parse(proofBytes);
assert.equal(proof.unit, "build"); assert.equal(proof.complete, true); assert.equal(proof.passed, true); assert.equal(proof.sourceUnchanged, true);
assert.deepEqual(proof.sourceBefore, source); assert.deepEqual(proof.sourceAfter, source);
for (const [path, sha256] of Object.entries(proof.artifacts)) assert.equal(hash(await regularBytes(root, prior + "/build/artifacts/" + path)), sha256);
const policy = JSON.parse(await regularBytes(root, "evals/runs/stage-3-completion-2/full-journey-measurement/policy.json"));
const currentBuild = await buildInventory(allocation.work, policy);
const comparison = await compareBuildIdentity(allocation.work, proof.buildIdentity, currentBuild);
const implementation = [];
for (const path of [...implementationPaths, ...transitivePaths]) {
  const bytes = await regularBytes(root, path);
  await writeNew(join(root, output, "implementation", path), bytes);
  implementation.push({ path, sha256: hash(bytes), bytes: bytes.length });
}
const references = [];
for (const path of [prior + "/snapshot.json", prior + "/final-targets.json", proofPath, output + "/protocol.md", output + "/prepare.mjs"]) {
  const bytes = await readFile(join(root, path)); references.push({ path, sha256: hash(bytes), bytes: bytes.length });
}
const record = { schemaVersion: 1, preparedAt: new Date().toISOString(), scope: "One corrected no-model desktop calibration; no install, rebuild, source edit, paid run or retry", work: allocation.work, source, references, implementation, originalBuild: proof.buildIdentity, currentBuild, comparison };
await writeNew(join(root, output, "preparation.json"), json(record));
console.log(json({ output, preparedAt: record.preparedAt, implementationFiles: implementation.length, sourceDigest: source.digest, comparison: { fullIdentityUnchanged: comparison.fullIdentityUnchanged, immutableBuildUnchanged: comparison.immutableBuildUnchanged, cacheFiles: comparison.cacheInventory.length } }));
