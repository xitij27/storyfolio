// One exclusive whole-recovery reconstruction, no installation or browser work.
import assert from "node:assert/strict";
import { mkdir, mkdtemp, realpath } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";
import { loadBinding, regularBytes, captureSource, writeNew, json } from "./binding-lib.mjs";
import { resolveApplication } from "./app-root.mjs";
const { values } = parseArgs({ options: { binding: { type: "string" } } }); assert.ok(values.binding);
const binding = await loadBinding(values.binding), parent = join(binding.runtime.TMPDIR, "storyfolio-evals"); assert.equal(await realpath(parent), parent);
await mkdir(binding.output); await mkdir(join(binding.output, "setup"));
await writeNew(join(binding.output, "setup/attempt.json"), json({ started: new Date().toISOString(), bindingSha256: binding.bindingSha256, amendmentSha256: binding.amendmentSha256, helperHashes: binding.helperHashes, stage: 2, retries: 0, modelCalls: 0 }));
try {
  const work = await mkdtemp(join(parent, "journey-recovery-2-"));
  await writeNew(join(binding.output, "setup/allocation.json"), json({ work, original: binding.meta.work }));
  for (const file of binding.restored.files) { await mkdir(dirname(join(work, file.path)), { recursive: true }); await writeNew(join(work, file.path), await regularBytes(binding.recoveryFilesRoot, file.path)); }
  assert.deepEqual(await captureSource(work), binding.restored); assert.deepEqual(await captureSource(binding.meta.work), binding.originalSource);
  const application = await resolveApplication(work, binding.applicationRoot, binding.restored);
  await writeNew(join(binding.output, "setup/targets.json"), json(binding.targets));
  await writeNew(join(binding.output, "setup/reconstruction.json"), json({ schemaVersion: 1, kind: "post-closure recovered source measurement", completed: new Date().toISOString(),
    bindingSha256: binding.bindingSha256, amendmentSha256: binding.amendmentSha256, helperHashes: binding.helperHashes, stage: 2, work, applicationRoot: binding.applicationRoot, application,
    originalWork: binding.meta.work, source: binding.restored, originalSource: binding.originalSource, environment: binding.environment, sourceBasis: binding.amendment.record.sourceBasis, modelCalls: 0 }));
  console.log(json({ work, application, sourceFiles: binding.restored.files.length, output: binding.output, next: "Root records one offline install in application cwd; no command is automatically launched" }));
} catch (error) { await writeNew(join(binding.output, "setup/error.json"), json({ error: String(error), retries: 0 })); throw error; }
