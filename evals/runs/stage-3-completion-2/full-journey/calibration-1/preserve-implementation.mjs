// Preserve exact pre-correction apparatus bytes after the first calibration.
import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
const base = "evals/runs/stage-3-completion-2/full-journey/calibration-1";
const hashes = JSON.parse(await readFile(join(base, "implementation-before.json"), "utf8"));
const digest = bytes => createHash("sha256").update(bytes).digest("hex");
const files = [];
await mkdir(join(base, "implementation-original"));
for (const [path, sha256] of Object.entries(hashes)) {
  const bytes = await readFile(path);
  assert.equal(digest(bytes), sha256, path);
  const output = join(base, "implementation-original", path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, bytes, { flag: "wx" });
  files.push({ path, sha256, bytes: bytes.length });
}
const result = { recorded: new Date().toISOString(), exact: true, files, scope: "Apparatus preservation before correction; first calibration outcome is unchanged" };
await writeFile(join(base, "implementation-preservation.json"), JSON.stringify(result, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify({ exact: true, files: files.length, recorded: result.recorded }));
