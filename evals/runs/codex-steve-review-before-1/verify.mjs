#!/usr/bin/env node
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existingRun, hash, verifyInputs } from "../../lib/review.mjs";

const cohort = dirname(fileURLToPath(import.meta.url));
const root = resolve(cohort, "../../..");
const inputs = join(cohort, "inputs");
const manifest = await verifyInputs(inputs);
assert.equal(manifest.recorded.skillUncommitted, false);
const gitBytes = path => execFileSync("git", ["-C", root, "show", `${manifest.recorded.commit}:${path}`]);
const source = JSON.parse(await readFile(join(inputs, "case.json"), "utf8"));
assert.equal(hash(gitBytes(manifest.casePath)), manifest.hashes["case.json"]);
assert.equal(hash(gitBytes(source.criteria)), manifest.hashes["criteria.md"]);
for (const [path, digest] of Object.entries(manifest.hashes)) {
  let committed;
  if (path.startsWith("skill/")) committed = `skills/storyfolio/${path.slice(6)}`;
  if (path.startsWith("implementation/")) committed = path.slice(15);
  if (path.startsWith("material/")) committed = `${source.materialRoot}/${path.slice(9)}`;
  if (committed) assert.equal(hash(gitBytes(committed)), digest, committed);
}
for (const file of source.provenance.reviewedFiles) {
  assert.equal(manifest.hashes[`material/${file.path}`], file.sha256, file.path);
}
const meta = await existingRun(join(cohort, source.id, "natural-1"), {
  runner: "codex-review", caseId: source.id, cohort: "codex-steve-review-before-1",
  invocation: "natural", rep: 1, inputDigest: manifest.digest, model: "gpt-6.1-sol",
});
assert.equal(meta.complete, true);
assert.equal(meta.materialChanges.length, 0);
assert.deepEqual(meta.workspaceChanges.map(change => change.path), ["docs/story/review.md"]);
console.log(`Verified committed inputs and preserved output; skill read: ${meta.skillUsed}; no material changes.`);
