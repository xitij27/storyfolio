// One-shot, before turn 3: move the actor's generated site/.next-concepts out of the workspace, preserved byte for byte. No other file is touched.
import assert from "node:assert/strict";
import { lstat, rename } from "node:fs/promises";
import { join } from "node:path";
import { hash, inventory, json, regularBytes, root, writeNew } from "./binding-lib.mjs";
const meta = JSON.parse(await regularBytes(join(root, "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1"), "meta.json"));
const from = join(meta.work, "site/.next-concepts"), to = join(meta.work, "..", "preserved-timing-1-next-concepts");
assert.ok((await lstat(from)).isDirectory()); await assert.rejects(lstat(to), { code: "ENOENT" });
// Positive identification, as in the archive: Next's own generated marker names this exact directory.
assert.equal(JSON.parse(await regularBytes(from, "required-server-files.json")).config.distDir, ".next-concepts");
const before = await inventory(from);
await rename(from, to);
const after = await inventory(to); assert.deepEqual(after, before, "Preserved cache differs after the move");
await assert.rejects(lstat(from), { code: "ENOENT" });
const record = { schemaVersion: 1, kind: "generated-cache-relocation", moved: new Date().toISOString(), from, to, files: before.length, bytes: before.reduce((n, f) => n + f.bytes, 0), inventorySha256: hash(json(before)), modelCalls: 0 };
await writeNew(join(root, "evals/runs/stage-3-spine-time-1/recovery/cache-relocation.json"), json(record));
console.log(json(record));
