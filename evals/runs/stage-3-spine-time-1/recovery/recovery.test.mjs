import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { liveFiles } from "./binding-lib.mjs";
test("live comparison skips exactly site/.next-concepts, nothing broader", async () => {
  const work = await mkdtemp(join(tmpdir(), "recovery-live-"));
  try {
    for (const path of ["site/.next-concepts/cache/a.sst", "site/.next-concepts-notes/keep.md", "site/app/page.tsx", "docs/story/handover.md"]) {
      await mkdir(join(work, path, ".."), { recursive: true }); await writeFile(join(work, path), path);
    }
    assert.deepEqual((await liveFiles(work)).map(file => file.path), ["docs/story/handover.md", "site/.next-concepts-notes/keep.md", "site/app/page.tsx"]);
  } finally { await rm(work, { recursive: true, force: true }); }
});
