import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { CAPTURE_POLICY } from "../../stage-3-completion-2/full-journey-recovery/runner/execution-core.mjs";
import { captureBuildWorkspaceExact, inspectCompleteSourceExact } from "./exact-capture.mjs";

test("capture skips exactly site/.next-concepts, even past the byte bound, and nothing broader", async () => {
  const work = await mkdtemp(join(tmpdir(), "exact-capture-")), out = await mkdtemp(join(tmpdir(), "exact-capture-out-"));
  try {
    for (const path of ["site/.next-concepts-notes/keep.md", "site/app/page.tsx", "docs/story/handover.md"]) { await mkdir(join(work, path, ".."), { recursive: true }); await writeFile(join(work, path), path); }
    await mkdir(join(work, "site/.next-concepts/cache"), { recursive: true });
    await writeFile(join(work, "site/.next-concepts/cache/00000001.sst"), Buffer.alloc(CAPTURE_POLICY.maxFileBytes + 1));
    const expected = ["docs/story/handover.md", "site/.next-concepts-notes/keep.md", "site/app/page.tsx"];
    assert.deepEqual((await inspectCompleteSourceExact(work, CAPTURE_POLICY)).files.map(file => file.path), expected);
    const manifest = await captureBuildWorkspaceExact(work, join(out, "snapshot"), CAPTURE_POLICY);
    assert.deepEqual(Object.keys(manifest.files), expected); assert.ok(manifest.excluded.includes("site/.next-concepts"));
  } finally { await rm(work, { recursive: true, force: true }); await rm(out, { recursive: true, force: true }); }
});
