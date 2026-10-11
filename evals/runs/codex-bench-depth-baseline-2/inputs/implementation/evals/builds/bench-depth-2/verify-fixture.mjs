// Read-only fixture proof. No CLI, model, browser, network or writes.
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, inspectBuildInputs, validateCase } from "../../lib/build.mjs";
import { validateExpectations } from "../../lib/build-check.mjs";
import { JUDGE_IMPLEMENTATION_FILES } from "../../codex-build-judge.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const source = validateCase(await readJson(join(directory, "case.json")));
const manifest = await readJson(join(directory, "source-manifest.json"));
const inventory = await readJson(join(directory, "workspace-inventory.json"));
const expected = await readJson(join(directory, "expectations.json"));
assert.deepEqual(validateExpectations(expected), []);
assert.equal(source.id, "bench-depth-2");
assert.equal(source.taskKind, "prototype-depth");
assert.equal(source.bounds.maxTurns, 1);
assert.deepEqual(source.files, inventory.files.map(entry => entry.path));
assert.equal(inventory.count, 9);
assert.deepEqual(expected.beats.map(beat => beat.id), ["question", "scheduling", "bench", "evidence", "scope"]);
const found = [];
async function walk(prefix = "") {
  for (const entry of await readdir(join(directory, "workspace", prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) await walk(path);
    else { assert(entry.isFile(), path); found.push(path); }
  }
}
await walk();
assert.deepEqual(found.sort(), source.files);
for (const entry of manifest.files) {
  const bytes = await readFile(join(directory, "workspace", entry.path));
  assert.equal(hash(bytes), entry.sha256, entry.path);
  assert.equal(bytes.length, entry.bytes);
  assert.deepEqual(inventory.files.find(file => file.path === entry.path), { path: entry.path, bytes: entry.bytes, sha256: entry.sha256 });
  if (entry.origin) {
    const original = await readFile(join(root, entry.origin));
    assert.equal(hash(original), entry.originSha256);
    assert.equal(bytes.equals(original), entry.unchanged);
    if (!entry.unchanged) { assert.equal(entry.path, "docs/story/handover.md"); assert(bytes.subarray(0, original.length).equals(original)); }
  }
}
assert.equal(manifest.files.filter(file => file.unchanged === true).length, 6);
const capabilities = { schemaVersion: 1, mode: "read-only fixture verification, not a live capability proof" };
const input = await inspectBuildInputs({ root, casePath: "evals/builds/bench-depth-2/case.json", capabilities });
assert.equal(hash(input.files["prompts/turn1.md"]), hash(await readFile(join(root, "evals/builds/bench-depth-1/turn1.md"))));
assert.equal(source.rubric, "evals/builds/bench-depth-1/criteria.md");
assert.equal(hash(input.files["rubric.md"]), hash(await readFile(join(root, "evals/builds/bench-depth-1/criteria.md"))));
assert.ok(input.files["implementation/evals/lib/source-scope.mjs"]);
assert.ok(input.files["fixture/scripts/review-sheets.mjs"]);
for (const path of JUDGE_IMPLEMENTATION_FILES.map(path => path === "evals/prompts/build-criteria.md" ? source.rubric : path)) {
  assert.ok(input.files[`implementation/${path}`], `Missing frozen judge dependency: ${path}`);
  assert.equal(hash(input.files[`implementation/${path}`]), hash(await readFile(join(root, path))), path);
}
console.log(JSON.stringify({ passed: true, modelCalls: 0, writes: false, fixtureFiles: source.files.length, unchangedInheritedFiles: 6, appendedHandover: true, promptAndRubricInherited: true, sourceScopeFrozen: true, enabledSkillFactsSupplied: true, strictReadIsolation: false, paidAuthorization: "not established by this verifier" }, null, 2));
