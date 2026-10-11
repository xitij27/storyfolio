import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { retainChecks } from "./retain-checks.mjs";

async function fixture(t, finished = true) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-retention-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const work = join(root, "work"), run = join(root, "run");
  await mkdir(work); await mkdir(join(run, "turns/01"), { recursive: true });
  await writeFile(join(run, "meta.json"), JSON.stringify({ work, inputDigest: "test-inputs" }));
  const result = Buffer.from(JSON.stringify({ turn: 1, requestedStop: 5, complete: true }));
  if (finished) await writeFile(join(run, "turns/01/result.json"), result);
  return { work, run, result };
}

test("retention preserves binary bytes, binds result hash and refuses overwrite", async t => {
  const { work, run, result } = await fixture(t);
  await mkdir(join(work, "checks/attempt"), { recursive: true });
  const bytes = Buffer.from([0, 255, 24, 128]);
  await writeFile(join(work, "checks/attempt/shot.png"), bytes);
  const retained = await retainChecks(run, 1);
  assert.equal(retained.manifest.complete, true);
  assert.equal(retained.manifest.turnResultSha256, createHash("sha256").update(result).digest("hex"));
  assert.deepEqual(retained.manifest.files["checks/attempt/shot.png"], { bytes: 4, sha256: createHash("sha256").update(bytes).digest("hex") });
  assert.deepEqual(await readFile(join(retained.output, "checks/attempt/shot.png")), bytes);
  await assert.rejects(retainChecks(run, 1), /EEXIST/);
});

test("unsupported links are reported without following; generated trees are skipped", async t => {
  const { work, run } = await fixture(t);
  await mkdir(join(work, "checks/node_modules/deep"), { recursive: true });
  await mkdir(join(work, "checks/.next"));
  await writeFile(join(work, "checks/node_modules/deep/ignored"), "not retained");
  await writeFile(join(work, "checks/.next/ignored"), "not retained");
  await symlink(join(run, "meta.json"), join(work, "checks/link.json"));
  const { output, manifest } = await retainChecks(run, 1);
  assert.equal(manifest.complete, false);
  assert.deepEqual(manifest.files, {});
  assert.equal(manifest.unsupported[0].type, "symlink");
  assert.equal(manifest.unsupported[0].path, "checks/link.json");
  assert.deepEqual(manifest.excluded.map(item => item.path), ["checks/.next", "checks/node_modules"]);
  await assert.rejects(readFile(join(output, "checks/link.json")), { code: "ENOENT" });
});

test("unfinished and superseded turns cannot capture current checks", async t => {
  const unfinished = await fixture(t, false);
  await assert.rejects(retainChecks(unfinished.run, 1), { code: "ENOENT" });
  await assert.rejects(readFile(join(unfinished.run, "actor-evidence/turn-1/retention-manifest.json")), { code: "ENOENT" });
  const later = await fixture(t);
  await mkdir(join(later.run, "turns/02"));
  await assert.rejects(retainChecks(later.run, 1), /later turn has begun/);
});

test("absent checks are recorded explicitly", async t => {
  const { run } = await fixture(t);
  const { manifest } = await retainChecks(run, 1);
  assert.equal(manifest.missingChecks, true);
  assert.equal(manifest.fileCount, 0);
  assert.equal(manifest.complete, true);
});
