import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { inspectWorkspace, writeNew } from "./build.mjs";
import { captureSource } from "./build-capture.mjs";

async function workspace(t) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-source-scope-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeNew(join(root, "app/page.tsx"), "export default function Page() { return 'fixture'; }\n");
  return root;
}
async function bare(root, name = ".prototype-history") {
  for (const [path, content] of Object.entries({
    HEAD: "ref: refs/heads/main\n", config: "[core]\n\trepositoryformatversion = 0\n\tfilemode = true\n\tbare = true\n",
    description: "Unnamed repository\n", COMMIT_EDITMSG: "Local history\n", index: "DIRC fixture",
    "hooks/pre-commit.sample": "#!/bin/sh\nexit 0\n", "info/exclude": "# Local excludes\n",
    "logs/HEAD": "fixture reflog\n", "logs/refs/heads/main": "fixture reflog\n",
    ["objects/ab/" + "c".repeat(38)]: "fixture object bytes",
    "refs/heads/main": "a".repeat(40) + "\n",
  })) await writeNew(join(root, name, path), content);
  return join(root, name);
}
const actorFiles = result => Object.fromEntries(Object.entries(result.entries).map(([path, file]) => [path, { bytes: file.size, sha256: file.hash }]));
const checkerFiles = result => Object.fromEntries(result.files.map(({ path, bytes, sha256 }) => [path, { bytes, sha256 }]));

test("actor and checker share generated exclusions including Next declarations", async t => {
  const root = await workspace(t);
  for (const path of ["next-env.d.ts", "lib/types.tsbuildinfo", ".npm/cache", ".turbo/cache", "test-results/result.json", "playwright-report/index.html", "browser-cache/package"])
    await writeNew(join(root, path), "generated\n");
  const actor = await inspectWorkspace(root), checker = await captureSource(root);
  assert.deepEqual(actorFiles(actor), checkerFiles(checker));
  assert.deepEqual(Object.keys(actor.entries), ["app/page.tsx"]);
});

test("recognized top-level bare Git metadata is excluded consistently without a name-only rule", async t => {
  const root = await workspace(t);
  await bare(root);
  await bare(root, ".local-history");
  const actor = await inspectWorkspace(root), checker = await captureSource(root);
  assert.deepEqual(actorFiles(actor), checkerFiles(checker));
  assert.deepEqual(actor.excluded, [".local-history", ".prototype-history"]);
  assert.deepEqual(actor.unexpected, []);
});

test("ordinary similarly named folders and newly added runtime paths stay observable", async t => {
  const root = await workspace(t);
  await writeNew(join(root, ".prototype-history/runtime.js"), "export const hidden = true;\n");
  await writeNew(join(root, "unexpected-runtime/server.ts"), "export const route = '/';\n");
  const actor = await inspectWorkspace(root), checker = await captureSource(root);
  assert.deepEqual(actor.unexpected.map(item => item.path), [".prototype-history", "unexpected-runtime"]);
  assert.ok(checker.files.some(file => file.path === ".prototype-history/runtime.js"));
  assert.ok(checker.files.some(file => file.path === "unexpected-runtime/server.ts"));
  assert.notDeepEqual(actorFiles(actor), checkerFiles(checker));
});

test("unknown files anywhere in candidate Git metadata defeat exclusion", async t => {
  for (const path of ["runtime.js", "objects/app.ts", "objects/ab/runtime.js", "hooks/client.js", "info/route.ts", "refs/heads/main.ts", "logs/client.js"])
    await t.test(path, async t => {
      const root = await workspace(t), git = await bare(root);
      await writeNew(join(git, path), "export const runtime = true;\n");
      const actor = await inspectWorkspace(root), checker = await captureSource(root);
      assert.ok(actor.unexpected.some(entry => entry.path === ".prototype-history"));
      assert.ok(checker.files.some(file => file.path === `.prototype-history/${path}`));
      assert.notDeepEqual(actorFiles(actor), checkerFiles(checker));
    });
});

test("malformed or incomplete Git markers cannot earn exclusion", async t => {
  for (const [name, change] of [
    ["invalid HEAD", git => writeFile(join(git, "HEAD"), "not a ref\n")],
    ["non-bare config", git => writeFile(join(git, "config"), "[core]\n bare = false\n")],
    ["bare outside core", git => writeFile(join(git, "config"), "[other]\n bare = true\n")],
    ["missing objects", git => rm(join(git, "objects"), { recursive: true })],
    ["missing refs", git => rm(join(git, "refs"), { recursive: true })],
  ]) await t.test(name, async t => {
    const root = await workspace(t), git = await bare(root); await change(git);
    const actor = await inspectWorkspace(root), checker = await captureSource(root);
    assert.ok(actor.unexpected.some(entry => entry.path === ".prototype-history"));
    assert.ok(checker.files.some(file => file.path.startsWith(".prototype-history/")));
  });
});

test("Git marker and descendant symlinks are never followed or exempted", async t => {
  for (const path of ["HEAD", "objects/ab/linked", "refs/heads/linked"]) await t.test(path, async t => {
    const root = await workspace(t), git = await bare(root);
    if (path === "HEAD") await rm(join(git, path));
    await mkdir(join(git, path.split("/").slice(0, -1).join("/")), { recursive: true });
    await symlink("/never/read/outside", join(git, path));
    const actor = await inspectWorkspace(root);
    assert.ok(actor.unexpected.some(entry => entry.path === ".prototype-history"));
    await assert.rejects(captureSource(root), /Unsupported source entry/);
  });
});

test("Git-shaped content inside public assets remains source rather than hidden metadata", async t => {
  const root = await workspace(t);
  await bare(root, "public/.history");
  const actor = await inspectWorkspace(root), checker = await captureSource(root);
  assert.deepEqual(actorFiles(actor), checkerFiles(checker));
  assert.ok(checker.files.some(file => file.path === "public/.history/HEAD"));
});
