import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// The library is built on its own, out of the skill, so it carries a copy of
// the engine's stitch/. The copy is made by sync-stitch.mjs and never edited.
const ENGINE = fileURLToPath(new URL("../engine/stitch/", import.meta.url));
const LIBRARY = fileURLToPath(new URL("../library/stitch/", import.meta.url));

async function hashes(root, prefix = "") {
  const out = {};
  for (const item of await readdir(join(root, prefix), { withFileTypes: true })) {
    const name = join(prefix, item.name);
    if (item.isDirectory()) Object.assign(out, await hashes(root, name));
    else out[name] = createHash("sha256").update(await readFile(join(root, name))).digest("hex");
  }
  return out;
}

test("the library's stitch is the engine's, byte for byte", async () => {
  const engine = await hashes(ENGINE);
  const library = await hashes(LIBRARY).catch(() => ({}));
  assert.ok(Object.keys(engine).length > 0);
  assert.deepEqual(Object.keys(library).sort(), Object.keys(engine).sort(), "run node skills/storyfolio/scripts/sync-stitch.mjs");
  for (const name of Object.keys(engine)) assert.equal(library[name], engine[name], `${name} differs: run node skills/storyfolio/scripts/sync-stitch.mjs`);
});
