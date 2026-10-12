// Read-only input/source audit. No subprocess, model, browser or file write.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const cohort = "codex-bench-entry-baseline-1", caseId = "bench-entry-1";
const run = join(root, "evals/runs", cohort, caseId, "baseline-1"), inputs = join(root, "evals/runs", cohort, "inputs");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const sorted = values => [...values].sort();
async function regular(base, path) {
  assert.ok(path && !path.startsWith("/") && !path.split("/").includes(".."));
  let cursor = base;
  for (const part of path.split("/")) { cursor = join(cursor, part); assert.equal((await lstat(cursor)).isSymbolicLink(), false, path); }
  assert.equal((await lstat(cursor)).isFile(), true, path);
  return readFile(cursor);
}
async function tree(base, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    assert.equal(entry.isSymbolicLink(), false, entry.name);
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await tree(base, path));
    else { assert.equal(entry.isFile(), true, path); files.push(path); }
  }
  return sorted(files);
}
const readJson = async (base, path) => JSON.parse(await regular(base, path));
const meta = await readJson(run, "meta.json"), manifest = await readJson(inputs, "manifest.json"), source = await readJson(inputs, "case.json");
assert.equal(meta.work, "/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-sa1yxh");
assert.equal(await realpath(meta.work), meta.work);
assert.equal(meta.cohort, cohort); assert.equal(meta.caseId, caseId); assert.equal(meta.inputs, inputs);
assert.equal(manifest.digest, "504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a");
assert.equal(meta.inputDigest, manifest.digest); assert.equal(hash(json(manifest.hashes)), manifest.digest);
assert.equal(manifest.recorded.commit, "bf72be966cf3a8fceeb19bad236eed5a3a29b4a1");
assert.equal(manifest.recorded.sourceStatus, "");
assert.deepEqual(await tree(inputs), sorted([...Object.keys(manifest.hashes), "manifest.json"]));
assert.equal(source.schemaVersion, 1); assert.equal(source.taskKind, undefined);
assert.deepEqual(source.requestedStops, [4]); assert.deepEqual(source.refusalTurns, []);
assert.equal(source.bounds.maxTurns, 1); assert.equal(source.bounds.turnTimeoutMs, 900000); assert.equal(source.bounds.maxWallMs, 900000);
assert.equal((await regular(inputs, "prompts/turn1.md")).toString(), "Yes to the storyboard in docs/story/storyboard.md. Please build it.\n");
const initial = {}, scaffold = {}, expected = {}, record = bytes => ({ type: "file", hash: hash(bytes), size: bytes.length });
for (const [path, digest] of Object.entries(manifest.hashes)) {
  const bytes = await regular(inputs, path); assert.equal(hash(bytes), digest, path);
  let currentPath;
  if (path === "case.json") currentPath = manifest.casePath;
  else if (path === "expectations.json") currentPath = source.expectations;
  else if (path === "rubric.md") currentPath = source.rubric;
  else if (path === "protocol.md") currentPath = source.protocol;
  else if (path === "prompts/turn1.md") currentPath = source.prompts[0];
  else if (path.startsWith("fixture/")) currentPath = `${source.workspaceRoot}/${path.slice(8)}`;
  else if (path.startsWith("skill/")) currentPath = `skills/storyfolio/${path.slice(6)}`;
  else if (path.startsWith("implementation/")) currentPath = path.slice(15);
  else assert.equal(path, "capabilities.json");
  if (currentPath) assert.deepEqual(await regular(root, currentPath), bytes, `Current source differs: ${currentPath}`);
  const target = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
  if (target) initial[target] = record(bytes);
  if (path.startsWith("skill/engine/")) scaffold[path.slice(13)] = record(bytes);
}
assert.deepEqual(await tree(join(root, "skills/storyfolio")), sorted(Object.keys(manifest.hashes).filter(path => path.startsWith("skill/")).map(path => path.slice(6))));
assert.deepEqual(await regular(inputs, "capabilities.json"), await regular(join(root, "evals/runs/codex-bench-depth-candidate-1/inputs"), "capabilities.json"));
for (const [path, entry] of Object.entries(initial)) expected[path] = entry;
for (const [path, entry] of Object.entries(scaffold)) { assert.equal(expected[path], undefined); expected[path] = entry; }
const prepared = await readJson(run, "setup/result.json"), inventory = await readJson(run, "setup/pre-scaffold-inventory.json"), snapshot = await readJson(run, "setup/snapshot/manifest.json");
assert.equal(prepared.complete, true); assert.equal(prepared.modelCalls, 0); assert.equal(prepared.networkCalls, 0);
assert.equal(prepared.scaffold.scaffolded, true); assert.deepEqual(prepared.scaffold.conflicts, []);
assert.deepEqual(sorted(prepared.scaffold.copied), sorted(Object.keys(scaffold)));
assert.deepEqual(inventory.initialEntries, []); assert.deepEqual(sorted(inventory.files), sorted(Object.keys(initial)));
assert.deepEqual(sorted(inventory.fixtureFiles), sorted(source.files)); assert.deepEqual(prepared.scaffold.inventory, inventory);
assert.deepEqual(snapshot.files, expected); assert.deepEqual(snapshot.excluded, []); assert.deepEqual(snapshot.unexpected, []);
assert.deepEqual(prepared.snapshot, snapshot);
assert.deepEqual(await tree(join(run, "setup/snapshot/files")), sorted(Object.keys(expected)));
for (const [path, entry] of Object.entries(expected)) assert.deepEqual(record(await regular(join(run, "setup/snapshot/files"), path)), entry, path);

// Imported only after the matching implementation bytes were independently verified.
const { inspectWorkspace, validateCase } = await import("../../lib/build.mjs");
const current = await inspectWorkspace(meta.work, validateCase(source).snapshot);
assert.deepEqual(current.unexpected, []);
const currentRecords = Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
const factsPath = "docs/story/environment-setup.json";
let factualSetup = null;
if (currentRecords[factsPath]) {
  const bytes = await regular(run, "setup/environment-setup.json");
  assert.deepEqual(bytes, current.entries[factsPath].bytes);
  const facts = JSON.parse(bytes);
  assert.equal(facts.inputDigest, manifest.digest); assert.equal(facts.coordinatorSetup, true); assert.equal(facts.actorPreflight, false);
  assert.ok(!bytes.toString().includes(root));
  expected[factsPath] = record(bytes); factualSetup = record(bytes);
}
assert.deepEqual(currentRecords, expected);
assert.ok(current.excluded.every(path => ["node_modules", ".next", "checks", "next-env.d.ts"].includes(path) || path.endsWith(".tsbuildinfo")));
assert.deepEqual(sorted(await readdir(run)), ["meta.json", "setup"], "Actor artifacts already exist");
assert.deepEqual(sorted(await readdir(join(root, "evals/runs", cohort))), [caseId, "inputs"]);
console.log(json({ verified: true, observed: new Date().toISOString(), cohort, caseId, inputDigest: manifest.digest,
  commit: manifest.recorded.commit, frozenFiles: Object.keys(manifest.hashes).length,
  fixtureFiles: source.files.length, skillFiles: Object.keys(initial).length - source.files.length,
  initialPreScaffoldFiles: Object.keys(initial).length, scaffoldFiles: Object.keys(scaffold).length,
  initialSnapshotFiles: Object.keys(snapshot.files).length, currentSourceFiles: Object.keys(currentRecords).length,
  initialSourceSha256: hash(json(snapshot.files)), currentSourceSha256: hash(json(currentRecords)), factualSetup,
  work: meta.work, generatedExclusions: current.excluded, unexpected: current.unexpected,
  capabilitiesByteIdenticalToCandidate1: true, exactOrdinaryPrompt: true, noActorArtifacts: true,
  retainedHashes: Object.fromEntries(await Promise.all(["meta.json", "setup/result.json", "setup/pre-scaffold-inventory.json", "setup/snapshot/manifest.json"].map(async path => [path, hash(await regular(run, path))]))),
  limits: ["No held-out files copied into retained actor source; not a filesystem read jail", "Generated dependencies/build/probe trees are excluded by the frozen policy", "Fresh capability proof and actual skill-read behavior remain separate gates"],
  modelCalls: 0, browserCalls: 0, subprocesses: 0, writes: false }));
