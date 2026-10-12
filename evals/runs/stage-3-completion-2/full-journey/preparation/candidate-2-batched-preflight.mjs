// Actual-data, read-only binding check. No reconstruction, install or browser.
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { loadReplacement, json } from "../../full-journey-recovery/batched-measurement/binding-lib.mjs";
const binding = await loadReplacement("evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/replacement.json");
for (const path of [binding.output, binding.control]) await assert.rejects(access(path), { code: "ENOENT" });
console.log(json({ integrityVerified: true, replacementSha256: binding.replacementSha256, bindingSha256: binding.bindingSha256,
  amendmentSha256: binding.amendmentSha256, sourceDigest: binding.restored.digest, sourceFiles: binding.restored.files.length,
  inputDigest: binding.frozen.digest, originalHelperCount: Object.keys(binding.helperHashes).length,
  replacementHelperCount: Object.keys(binding.replacementHashes).length, alternatives: binding.targets.alternatives.length,
  output: binding.output, control: binding.control, outputsAbsent: true, writes: false, browsers: 0, modelCalls: 0 }));
