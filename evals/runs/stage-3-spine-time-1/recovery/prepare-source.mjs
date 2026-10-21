// One exclusive reconstruction from the post-closure archive. No install, build or browser.
import assert from "node:assert/strict";
import { mkdir, mkdtemp, realpath } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";
import { loadBinding, regularBytes, captureSource, writeNew, json } from "./binding-lib.mjs";
const { values } = parseArgs({ options: { binding: { type: "string" } } }); assert.ok(values.binding);
const binding = await loadBinding(values.binding), parent = join(binding.runtime.TMPDIR, "storyfolio-evals"); assert.equal(await realpath(parent), parent);
await mkdir(binding.output); await mkdir(join(binding.output, "setup"));
await writeNew(join(binding.output, "setup/attempt.json"), json({ started: new Date().toISOString(), bindingSha256: binding.bindingSha256, helperHashes: binding.helperHashes, stage: 2, sourceBasis: binding.sourceBasis, retries: 0, modelCalls: 0 }));
try {
  const work = await mkdtemp(join(parent, "journey-recovery-time-2-"));
  await writeNew(join(binding.output, "setup/allocation.json"), json({ work, original: binding.meta.work }));
  for (const file of binding.restored.files) { await mkdir(dirname(join(work, file.path)), { recursive: true }); await writeNew(join(work, file.path), await regularBytes(binding.recoveryFilesRoot, file.path)); }
  assert.deepEqual(await captureSource(work), binding.restored);
  await writeNew(join(binding.output, "setup/targets.json"), json(binding.targets));
  await writeNew(join(binding.output, "setup/reconstruction.json"), json({ schemaVersion: 1, kind: "post-closure archive reconstruction", completed: new Date().toISOString(),
    bindingSha256: binding.bindingSha256, helperHashes: binding.helperHashes, stage: 2, work, originalWork: binding.meta.work, source: binding.restored, sourceBasis: binding.sourceBasis, environment: binding.environment, modelCalls: 0 }));
  console.log(json({ work, sourceFiles: binding.restored.files.length, output: binding.output, next: "Root records one offline install in work/site; no command is launched automatically" }));
} catch (error) { await writeNew(join(binding.output, "setup/error.json"), json({ error: String(error), retries: 0 })); throw error; }
