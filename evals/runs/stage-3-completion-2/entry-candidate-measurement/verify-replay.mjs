// Read-only closure verification. Integrity is not completion or visual acceptance.
import assert from "node:assert/strict";
import { join } from "node:path";
import { loadOriginal, loadSetup, artifactInventory, regularBytes, readJson, output, hash, json } from "./bindings.mjs";
assert.equal(process.argv.length, 2);
const binding = await loadOriginal(), restored = await loadSetup(binding), review = join(output, "review");
const files = await artifactInventory(join(output, "artifacts")), manifest = await readJson(join(output, "artifacts/manifest.json"));
assert.deepEqual(manifest.sourceBefore, restored.current); assert.deepEqual(manifest.sourceAfter, restored.current);
assert.deepEqual(await readJson(join(review, "source-before.json")), restored.current); assert.deepEqual(await readJson(join(review, "source-after.json")), restored.current);
assert.deepEqual(files, await readJson(join(review, "artifact-inventory.json")));
assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
const processRecord = await readJson(join(review, "process.json"));
for (const stream of ["stdout", "stderr", "lifecycle"]) assert.equal(hash(await regularBytes(review, stream === "lifecycle" ? "lifecycle.jsonl" : `${stream}.log`)), processRecord[`${stream}Sha256`]);
assert.deepEqual({ timeoutMs: processRecord.timeoutMs, graceMs: processRecord.graceMs, totalCapMs: processRecord.totalCapMs }, { timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 });
const closure = await readJson(join(review, "closure.json")); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true); assert.equal(closure.captureComplete, manifest.complete === true);
console.log(json({ integrityVerified: true, captureComplete: manifest.complete, processCode: processRecord.code, processSignal: processRecord.signal, timedOut: processRecord.timedOut, externalSignal: processRecord.externalSignal,
  actorComplete: binding.actor.complete, actorTimedOut: binding.actor.timedOut ?? false, actorInterruptedBy: binding.actor.interruptedBy ?? null, actorResultSha256: binding.actorResultSha256,
  sourceFiles: restored.current.files.length, originalSourceFiles: binding.originalSource.files.length, originalExactSetEquality: binding.extras.length === 0, omittedMetadataFiles: binding.extras.length,
  sourceDigest: restored.current.digest, artifactFiles: files.length, originalImages: files.filter(file => /\.(?:png|jpe?g)$/i.test(file.path)).length, manifestSha256: hash(await regularBytes(join(output, "artifacts"), "manifest.json")),
  visualAcceptance: "unobserved: every actual original requires separate review", modelCalls: 0, writes: false }));
