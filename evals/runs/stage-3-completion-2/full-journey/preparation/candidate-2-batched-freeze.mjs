// Root-only source preparation. Prints an apply_patch document; launches nothing.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { replacementPaths, prefix } from "../../full-journey-recovery/batched-measurement/binding-lib.mjs";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const base = prefix + "candidate-2/";
const old = JSON.parse(await readFile(base + "binding.json"));
const binding = { ...old, output: base + "concepts-2" };
const bindingText = json(binding);
const reference = async path => ({ path, sha256: sha(await readFile(path)) });
const targets = JSON.parse(await readFile(old.targets.path));
assert.equal(targets.alternatives.length, 12);
const record = {
  schemaVersion: 1, kind: "concepts-batched-replacement", reviewedByRoot: true,
  binding: { path: base + "batched-binding.json", sha256: sha(bindingText) },
  approval: await reference("docs/history/2026-10-12-stage-3-browser-replacement-approval.md"),
  previousCapture: { manifest: await reference(base + "concepts-1/units/concepts/artifacts/manifest.json"), result: await reference(base + "concepts-command/result.json") },
  control: base + "batched-control", totalCapMs: 900000, operationCapMs: 90000, graceMs: 5000, retries: 0, modelCalls: 0,
  schedule: targets.alternatives.map((alternative, index) => ({ id: index + 1, alternativeId: alternative.id, modes: ["desktop", "phone"] })),
  helperHashes: Object.fromEntries(await Promise.all(replacementPaths.map(async path => [path, sha(await readFile(path))]))),
};
let patch = "*** Begin Patch\n";
for (const [path, text] of [[base + "batched-binding.json", bindingText], [base + "replacement.json", json(record)]]) patch += `*** Add File: ${path}\n` + text.trimEnd().split("\n").map(line => "+" + line).join("\n") + "\n";
console.log(patch + "*** End Patch");
