import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { scaffold } from "./scaffold.mjs";
const CLI = fileURLToPath(new URL("./scaffold.mjs", import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-scaffold-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, "engine");
  await mkdir(join(source, "app"), { recursive: true });
  await writeFile(join(source, "package.json"), '{"private":true}\n');
  await writeFile(join(source, "app", "page.tsx"), "export default function Page() {}\n");
  return { root, source, destination: join(root, "site") };
}

test("scaffold copies an empty destination and excludes generated trees", async t => {
  const f = await fixture(t);
  for (const name of ["node_modules", ".next", "checks"]) {
    await mkdir(join(f.source, name));
    await writeFile(join(f.source, name, "generated"), "not shipped");
  }
  const result = await scaffold(f.destination, f);
  assert.deepEqual(result.conflicts, []);
  assert.deepEqual(result.copied, ["app/page.tsx", "package.json"]);
  assert.deepEqual((await readdir(f.destination)).sort(), ["app", "package.json"]);
});

test("scaffold preserves an existing docs/story directory", async t => {
  const f = await fixture(t);
  await mkdir(join(f.destination, "docs", "story"), { recursive: true });
  await writeFile(join(f.destination, "docs", "story", "facts.md"), "Confirmed facts\n");
  assert.equal((await scaffold(f.destination, f)).copied.length, 2);
  assert.equal(await readFile(join(f.destination, "docs", "story", "facts.md"), "utf8"), "Confirmed facts\n");
});

test("a file conflict prevents every write, including earlier alphabetic files", async t => {
  const f = await fixture(t);
  await mkdir(f.destination);
  await writeFile(join(f.destination, "package.json"), "keep me\n");
  assert.deepEqual(await scaffold(f.destination, f), { copied: [], conflicts: ["package.json"] });
  assert.deepEqual(await readdir(f.destination), ["package.json"]);
  assert.equal(await readFile(join(f.destination, "package.json"), "utf8"), "keep me\n");
});

test("scaffold refuses a symlink destination ancestor without following it", async t => {
  const f = await fixture(t);
  const elsewhere = join(f.root, "elsewhere");
  await mkdir(elsewhere);
  await mkdir(f.destination);
  await symlink(elsewhere, join(f.destination, "app"));
  const result = await scaffold(f.destination, f);
  assert.deepEqual(result, { copied: [], conflicts: ["app"] });
  assert.deepEqual(await readdir(elsewhere), []);
  assert.deepEqual(await readdir(f.destination), ["app"]);
});

test("CLI help succeeds without creating a directory or copying files", async t => {
  const f = await fixture(t);
  const before = await readdir(f.root);
  for (const option of ["--help", "-h"]) {
    const result = spawnSync(process.execPath, [CLI, option], { cwd: f.root, encoding: "utf8" });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Usage: node scaffold\.mjs <folder>/);
    assert.equal(result.stderr, "");
    assert.deepEqual(await readdir(f.root), before);
  }
});

test("CLI rejects unknown flags and invalid argument counts without writes", async t => {
  const f = await fixture(t);
  const before = await readdir(f.root);
  for (const args of [["--unknown"], ["-x"], ["--help", "site"], ["site", "extra"], []]) {
    const result = spawnSync(process.execPath, [CLI, ...args], { cwd: f.root, encoding: "utf8" });
    assert.ifError(result.error);
    assert.equal(result.status, 2, JSON.stringify(args));
    assert.match(result.stderr, /Usage:/);
    assert.equal(result.stdout, "");
    assert.deepEqual(await readdir(f.root), before);
  }
});
