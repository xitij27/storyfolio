#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateCase } from "../../lib/build.mjs";
import { validateExpectations } from "../../lib/build-check.mjs";

// A read-only integrity check. Manifest changes need an explicit reviewed
// patch; no refresh option can bless changed source or overwrite evidence.
assert.equal(process.argv.length, 2, "Usage: node evals/builds/bench-depth-1/verify-fixture.mjs");
const fixture = dirname(fileURLToPath(import.meta.url));
const repository = resolve(fixture, "../../..");
const workspace = join(fixture, "workspace");
const json = async path => JSON.parse(await readFile(path, "utf8"));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const record = async (root, path) => {
  const bytes = await readFile(join(root, path));
  return { path, bytes: bytes.byteLength, sha256: hash(bytes) };
};
async function files(root, prefix = "") {
  const found = [];
  for (const entry of (await readdir(join(root, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert(!entry.isSymbolicLink(), `Symlink in fixture: ${path}`);
    if (entry.isDirectory()) found.push(...await files(root, path));
    else if (entry.isFile()) found.push(path);
    else assert.fail(`Unsupported fixture entry: ${path}`);
  }
  return found.sort();
}

const config = validateCase(await json(join(fixture, "case.json")));
assert.equal(config.schemaVersion, 2);
assert.equal(config.taskKind, "prototype-depth");
assert.equal(config.id, "bench-depth-1");
assert(!Object.hasOwn(config, "requestedStops"), "Diagnostic must not pretend to request a journey stop");
assert.equal(config.bounds.maxTurns, 1);
assert.equal(config.prompts.length, 1);
assert.deepEqual(config.refusalTurns, [1]);
const workspaceFiles = await files(workspace);
assert.deepEqual(workspaceFiles, [...config.files].sort(), "Actor allowlist must exactly match workspace files");
assert.equal(workspaceFiles.length, 7);
assert(!workspaceFiles.includes("package.json"), "Fixture must start without an application");
assert(!workspaceFiles.some(path => /(^|\/)(node_modules|\.next|\.git)(\/|$)/.test(path)));
const inventory = await json(join(fixture, "workspace-inventory.json"));
assert.equal(inventory.existingSite, false);
assert.equal(inventory.packageManifestPresent, false);
assert.deepEqual(inventory.files, await Promise.all(workspaceFiles.map(path => record(workspace, path))), "Fixture inventory drifted");

const expected = await json(join(fixture, "expectations.json"));
assert.deepEqual(validateExpectations(expected), []);
assert.equal(expected.schemaVersion, 2);
assert.equal(expected.taskKind, "prototype-depth");
const ids = ["question", "scheduling", "bench", "evidence", "scope"];
assert.deepEqual(expected.beats.map(beat => beat.id), ids);
assert.deepEqual(expected.beats.map(beat => beat.headingLevel), [1, 2, 2, 2, 2]);
assert(expected.beats.every(beat => !Object.hasOwn(beat, "heading")), "Do not freeze accepted headings");
assert.deepEqual(expected.requiredText, [], "Do not replace semantic review with frozen sentences");
assert.deepEqual(expected.contentConstraints.beatMeanings.map(beat => beat.id), ids);
assert.equal(expected.contentConstraints.semanticReviewRequired, true);
for (const key of ["pieceCount", "looks", "desktopScreens", "mobileStaticMaxWidth"]) assert(!Object.hasOwn(expected.contentConstraints, key), `Old visual constraint inherited: ${key}`);
for (const key of ["desktop", "mobile", "short"]) assert.equal(expected.modes[key], "animated");
for (const path of [...expected.assets, ...expected.requiredFiles]) assert(workspaceFiles.includes(path), `Required fixture file absent: ${path}`);
const storyboard = await readFile(join(workspace, "docs/story/storyboard.md"), "utf8");
for (const id of ids) assert(storyboard.includes(`\`${id}\``), `Approved beat missing: ${id}`);
const provenance = await readFile(join(workspace, "docs/story/assets.md"), "utf8");
for (const path of expected.assets) assert(provenance.includes(path.replace(/^public/, "")), `Missing asset provenance: ${path}`);

const source = await json(join(fixture, "source-manifest.json"));
assert.equal(source.id, config.id);
assert.equal(source.sourceRevision, "75d1f35288b951ca2f301aec1a4b3e90bf6af7ab");
assert.equal(source.inputs.length, 4);
for (const input of source.inputs) {
  const { disposition, ...frozen } = input;
  assert.deepEqual(await record(repository, input.path), frozen, `Historical source drifted: ${input.path}`);
  assert(["facts-only-derivative", "unchanged-asset-copy"].includes(disposition));
  if (disposition === "unchanged-asset-copy") {
    const target = input.path.replace("evals/builds/embedded-1/workspace/", "");
    assert.equal((await record(workspace, target)).sha256, input.sha256, `Supplied SVG is not an unchanged copy: ${target}`);
  }
}
const plan = await readFile(join(repository, "docs/superpowers/plans/2026-10-11-build-workflow-reproduction.md"), "utf8");
const approvedPrompt = plan.match(/^> Use Storyfolio[\s\S]*?^> cannot complete it\. Do not continue into another turn on your own\./m)?.[0];
assert(approvedPrompt, "Verbatim proposed actor request not found in the source plan");
assert.equal(await readFile(join(fixture, "turn1.md"), "utf8"), `${approvedPrompt.replace(/^> /gm, "")}\n`, "Actor prompt differs from the approved plan");
for (const path of await files(fixture)) {
  const content = await readFile(join(fixture, path), "utf8");
  assert(!content.includes("\u2014"), `Em dash in fixture: ${path}`);
  if (path.startsWith("workspace/")) {
    assert(!/prototypes\/fixture-study|visual-recovery-(?:prototype|depth)-1|codex-build-(?:completion-)?1/.test(content), `Held-out source reference exposed: ${path}`);
  }
  if (path.endsWith(".svg")) {
    assert(!/<script\b|\son\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:)?\/\//i.test(content), `Active/external SVG content: ${path}`);
    assert(!content.includes("data:"), `Unexpected embedded SVG resource: ${path}`);
  }
}
console.log("Fixture verified: schema-2 prototype-depth; 7 allowlisted starting files; 4 retained source hashes; 2 unchanged illustrative SVGs; 5 neutral beat IDs; verbatim actor prompt. Draft inputs only, no application, paid run or launch readiness verified.");
