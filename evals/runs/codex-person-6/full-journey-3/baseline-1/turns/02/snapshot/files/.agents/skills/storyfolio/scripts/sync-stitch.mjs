#!/usr/bin/env node
// Copies the engine's stitch/ over the library's, removing files no longer
// in the engine. stitch/ is edited only in the engine; the library is built
// on its own, out of the skill, so it carries this copy.
// Usage: node skills/storyfolio/scripts/sync-stitch.mjs
import { cp, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const SOURCE = fileURLToPath(new URL("../engine/stitch/", import.meta.url));
export const COPY = fileURLToPath(new URL("../library/stitch/", import.meta.url));

async function files(root, prefix = "") {
  const out = [];
  let items = [];
  try { items = await readdir(join(root, prefix), { withFileTypes: true }); }
  catch (error) { if (error.code === "ENOENT") return out; throw error; }
  for (const item of items) {
    const name = join(prefix, item.name);
    if (item.isDirectory()) out.push(...await files(root, name));
    else out.push(name);
  }
  return out;
}

export async function syncStitch({ source = SOURCE, copy = COPY } = {}) {
  const want = new Set(await files(source));
  const removed = [];
  for (const name of await files(copy)) {
    if (!want.has(name)) { await rm(join(copy, name)); removed.push(name); }
  }
  await cp(source, copy, { recursive: true, force: true });
  return { copied: [...want].sort(), removed };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { copied, removed } = await syncStitch();
  console.log(`stitch: ${copied.length} files copied to the library${removed.length ? `, removed ${removed.join(", ")}` : ""}`);
}
