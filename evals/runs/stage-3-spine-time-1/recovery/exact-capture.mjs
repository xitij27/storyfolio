// Turn 5 and 6 capture: the original exclusions plus exactly site/.next-concepts, the actor's own build directory.
// Copies of lib/build.mjs inspectWorkspace/captureBuildWorkspace and execution-core inspectCompleteSource/assertLiveSource,
// each with that one added path check; the shared lib stays frozen. No broader .next* or hidden-directory exclusion.
import assert from "node:assert/strict";
import { lstat, readdir, readlink, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import { hash, json, regularBytes, writeNew } from "../../../lib/build.mjs";
import { SOURCE_EXCLUSIONS, sourceEntryExcluded } from "../../../lib/source-scope.mjs";
import { assertSourceRecord } from "../../stage-3-completion-2/full-journey-recovery/runner/execution-core.mjs";
import { excluded, liveFiles } from "./binding-lib.mjs";

export const EXACT_EXCLUSIONS = Object.freeze([...SOURCE_EXCLUSIONS, `exact ${excluded}`]);
const records = source => Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));

export async function captureSourceExact(work) {
  const files = await liveFiles(work);
  return { files, digest: hash(JSON.stringify(files)), exclusions: EXACT_EXCLUSIONS };
}

export async function inspectWorkspaceExact(work, policy) {
  const entries = {}, skipped = [], unexpected = [];
  let bytes = 0;
  const allowed = path => policy.files.includes(path) || policy.roots.some(root => path === root || path.startsWith(`${root}/`));
  const ancestor = path => policy.roots.some(root => root.startsWith(`${path}/`)) || policy.files.some(file => file.startsWith(`${path}/`));
  async function visit(prefix = "") {
    for (const entry of (await readdir(join(work, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (path === excluded || await sourceEntryExcluded(work, path, entry)) { skipped.push(path); continue; }
      if (!allowed(path) && !ancestor(path)) { unexpected.push({ path, type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : "file" }); continue; }
      if (entry.isDirectory()) { await visit(path); continue; }
      if (Object.keys(entries).length >= policy.maxFiles) throw new Error(`Snapshot file bound exceeded: ${policy.maxFiles}`);
      if (entry.isSymbolicLink()) { entries[path] = { type: "symlink", target: await readlink(join(work, path)) }; continue; }
      if (!entry.isFile()) { entries[path] = { type: "special" }; continue; }
      const size = (await lstat(join(work, path))).size;
      if (size > policy.maxFileBytes || bytes + size > policy.maxBytes) throw new Error(`Snapshot byte bound exceeded: ${path}`);
      const content = await regularBytes(work, path);
      bytes += content.length;
      if (content.length > policy.maxFileBytes || bytes > policy.maxBytes) throw new Error(`Snapshot byte bound exceeded: ${path}`);
      entries[path] = { type: "file", hash: hash(content), size: content.length, bytes: content };
    }
  }
  await visit();
  return { entries, excluded: skipped, unexpected, totalBytes: bytes };
}

export async function captureBuildWorkspaceExact(work, out, policy, before = {}) {
  const inspected = await inspectWorkspaceExact(work, policy);
  const manifest = { schemaVersion: 1, files: {}, excluded: inspected.excluded, unexpected: inspected.unexpected, totalBytes: inspected.totalBytes, changes: [] };
  for (const [path, entry] of Object.entries(inspected.entries)) {
    const { bytes, ...record } = entry;
    manifest.files[path] = record;
    if (bytes) await writeNew(join(out, "files", path), bytes);
  }
  for (const path of [...new Set([...Object.keys(before), ...Object.keys(manifest.files)])].sort()) {
    if (json(before[path]) === json(manifest.files[path])) continue;
    manifest.changes.push({ path, change: !before[path] ? "added" : !manifest.files[path] ? "deleted" : "modified", before: before[path] ?? null, after: manifest.files[path] ?? null });
  }
  await writeNew(join(out, "manifest.json"), json(manifest));
  return manifest;
}

export async function inspectCompleteSourceExact(work, policy) {
  assert.equal(await realpath(work), resolve(work), "Workspace root is not canonical");
  assert.ok((await lstat(work)).isDirectory() && !(await lstat(work)).isSymbolicLink());
  const inspected = await inspectWorkspaceExact(work, policy);
  for (const item of inspected.unexpected) {
    assert.equal(item.type, "directory", `Unrecognized source: ${item.path}`);
    assert.deepEqual(await readdir(join(work, item.path)), [], `Unrecognized nonempty source: ${item.path}`);
  }
  const current = await captureSourceExact(work); assertSourceRecord(current);
  const retained = Object.fromEntries(Object.entries(inspected.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
  assert.deepEqual(retained, records(current), "Capture policy does not cover the complete source tree");
  return current;
}

export async function assertLiveSourceExact(work, expected, policy) {
  assertSourceRecord(expected);
  const current = await inspectCompleteSourceExact(work, policy);
  assert.deepEqual(current, expected, "Live source differs from approved complete checkpoint");
  return current;
}
