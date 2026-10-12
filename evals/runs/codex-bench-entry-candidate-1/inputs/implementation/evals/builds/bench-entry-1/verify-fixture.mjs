// Read-only fixture proof. No model, browser, network, source edits or writes.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { hash, inspectBuildInputs, validateCase } from "../../lib/build.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const relative = "evals/builds/bench-entry-1";
const base = "evals/builds/bench-depth-2";
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const source = validateCase(await readJson(join(directory, "case.json")));
const manifest = await readJson(join(directory, "source-manifest.json"));
const inventory = await readJson(join(directory, "workspace-inventory.json"));
assert.equal(source.schemaVersion, 1);
assert.equal(source.id, "bench-entry-1");
assert.equal(source.taskKind, undefined);
assert.deepEqual(source.requestedStops, [4]);
assert.deepEqual(source.refusalTurns, []);
assert.equal(source.bounds.maxTurns, 1);
assert.equal(source.bounds.turnTimeoutMs, 900000);
assert.equal(source.bounds.maxWallMs, 900000);
assert.deepEqual(source.prompts, [`${relative}/turn1.md`]);
assert.deepEqual(source.files, inventory.files.map(entry => entry.path));
assert.equal(inventory.count, 11);
const walk = async (directory, prefix = "") => {
  const paths = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) paths.push(...await walk(directory, path));
    else { assert(entry.isFile(), path); paths.push(path); }
  }
  return paths.sort();
};
assert.deepEqual(await walk(join(directory, "workspace")), source.files);
assert.deepEqual(manifest.files.map(entry => entry.path), source.files);
for (const entry of manifest.files) {
  const bytes = await readFile(join(directory, "workspace", entry.path));
  assert.equal(hash(bytes), entry.sha256, entry.path);
  assert.equal(bytes.length, entry.bytes, entry.path);
  assert.deepEqual(inventory.files.find(file => file.path === entry.path), { path: entry.path, bytes: entry.bytes, sha256: entry.sha256 });
  if (entry.origin) {
    const original = await readFile(join(root, entry.origin));
    assert.equal(hash(original), entry.originSha256, entry.origin);
    assert.equal(bytes.equals(original), entry.unchanged, entry.path);
  } else assert.equal(entry.unchanged, null);
}
assert.deepEqual(manifest.files.filter(file => file.unchanged === true).map(file => file.path), ["docs/story/assets.md", "docs/story/evaluation-environment.md", "docs/story/facts.md", "public/assets/bring-up-fixture.svg", "public/assets/power-states.svg", "scripts/review-sheets.mjs"]);
assert.deepEqual((await walk(join(root, base))).map(path => `${base}/${path}`), manifest.preservedBaseFiles.map(entry => entry.path).sort());
for (const entry of manifest.preservedBaseFiles) {
  const bytes = await readFile(join(root, entry.path));
  assert.equal(bytes.length, entry.bytes, entry.path);
  assert.equal(hash(bytes), entry.sha256, entry.path);
}
const oldStory = await readFile(join(root, base, "workspace/docs/story/storyboard.md"), "utf8");
const newStory = await readFile(join(directory, "workspace/docs/story/storyboard.md"), "utf8");
const meanings = text => text.slice(text.indexOf("## 1. `question`"), text.indexOf("## Across the"));
assert.equal(meanings(newStory), meanings(oldStory), "All five approved meaning bodies must be unchanged");
const prompt = await readFile(join(directory, "turn1.md"));
assert.equal(prompt.toString(), "Yes to the storyboard in docs/story/storyboard.md. Please build it.\n");
assert.equal(hash(prompt), manifest.promptSha256);
let exactDiff = "";
for (const path of ["docs/story/confirmations.md", "docs/story/handover.md", "docs/story/storyboard.md"]) {
  const result = spawnSync("diff", ["-u", "--label", `bench-depth-2/workspace/${path}`, "--label", `bench-entry-1/workspace/${path}`, join(root, base, "workspace", path), join(directory, "workspace", path)], { encoding: "utf8" });
  assert.equal(result.error, undefined);
  assert.ok([0, 1].includes(result.status), result.stderr);
  exactDiff += result.stdout;
}
for (const path of ["docs/story/concepts.md", "docs/story/decided-for-you.md"]) {
  const text = await readFile(join(directory, "workspace", path), "utf8");
  const lines = text.trimEnd().split("\n");
  exactDiff += `--- /dev/null\n+++ bench-entry-1/workspace/${path}\n@@ -0,0 +1,${lines.length} @@\n${lines.map(line => `+${line}`).join("\n")}\n`;
}
const derivative = await readFile(join(directory, "derivative.patch"));
assert.equal(derivative.toString(), exactDiff);
assert.equal(hash(derivative), manifest.derivativePatchSha256);
const actorText = (await Promise.all(source.files.filter(path => path.endsWith(".md")).map(path => readFile(join(directory, "workspace", path), "utf8")))).join("\n");
assert.doesNotMatch(actorText, /\b(?:two or three|two|three|2 or 3|2|3)[ -](?:look|appearance)s?\b|\bspine\b|\bstop[ -]?[456]\b|one appearance|diagnostic only/i);
assert.match(actorText, /No visual look has been chosen/);
assert.match(actorText, /Implementation has not started/);
const input = await inspectBuildInputs({ root, casePath: `${relative}/case.json`, capabilities: { schemaVersion: 1, mode: "read-only fixture proof, not a live capability check" } });
assert.equal(input.files["prompts/turn1.md"].toString(), prompt.toString());
for (const path of source.files) assert.ok(input.files[`fixture/${path}`]);
for (const path of source.implementationFiles) assert.ok(input.files[`implementation/${path}`], path);
assert.equal(Object.keys(input.files).filter(path => path.startsWith("fixture/")).length, 11);
console.log(JSON.stringify({ passed: true, writes: false, modelCalls: 0, browserCalls: 0, fixtureFiles: 11, unchangedInheritedFiles: 6, modifiedInheritedFiles: 3, newStateRecords: 2, fiveMeaningBodiesUnchanged: true, exactDerivativePatch: true, preservedBaseFiles: manifest.preservedBaseFiles.length, ordinaryPrompt: true, requestedStops: source.requestedStops, refusalTurns: source.refusalTurns, maxTurns: 1, turnTimeoutMs: 900000, noActorVisibleStopOrLookCountHints: true, actualBehavior: "unobserved, this verifier is not a model run" }, null, 2));
