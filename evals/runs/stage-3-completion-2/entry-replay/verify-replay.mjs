// Read-only final source/artifact verification; does not assert visual acceptance.
import assert from "node:assert/strict";
import { join } from "node:path";
import { loadOriginal, loadSetup, artifactInventory, readJson, output, json } from "./bindings.mjs";
assert.equal(process.argv.length, 2);
const binding = await loadOriginal(), restored = await loadSetup(binding);
const files = await artifactInventory(join(output, "artifacts")), manifest = await readJson(join(output, "artifacts/manifest.json"));
assert.deepEqual(manifest.sourceBefore, restored.current); assert.deepEqual(manifest.sourceAfter, restored.current);
assert.deepEqual(files, await readJson(join(output, "review/artifact-inventory.json")));
assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
const closure = await readJson(join(output, "review/closure.json")); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true);
console.log(json({ integrityVerified: true, captureComplete: manifest.complete, actorComplete: false, actorTimedOut: true, sourceFiles: restored.current.files.length, sourceDigest: restored.current.digest, artifactFiles: files.length, originalImages: files.filter(file => /\.(?:png|jpe?g)$/i.test(file.path)).length, visualAcceptance: "unobserved: original review is separate", originalExactSetGateRemainsBlocked: true }));
