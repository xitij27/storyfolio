// Root-only one-shot reconstruction. No dependency install, build or browser.
import assert from "node:assert/strict";
import { mkdir, mkdtemp, realpath } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";
import { loadBinding, regularBytes, captureSource, writeNew, json } from "./binding-lib.mjs";
const { values } = parseArgs({ options: { binding: { type: "string" } } }); assert.ok(values.binding);
const binding = await loadBinding(values.binding), parent = join(binding.runtime.TMPDIR, "storyfolio-evals"); assert.equal(await realpath(parent), parent);
await mkdir(binding.output); await mkdir(join(binding.output, "setup"));
await writeNew(join(binding.output, "setup/attempt.json"), json({ started: new Date().toISOString(), bindingSha256: binding.bindingSha256, helperHashes: binding.helperHashes, stage: binding.record.turn, retries: 0, modelCalls: 0 }));
try {
  const work = await mkdtemp(join(parent, `journey-measure-${binding.record.turn}-`));
  await writeNew(join(binding.output, "setup/allocation.json"), json({ work, original: binding.meta.work }));
  for (const path of Object.keys(binding.actor.snapshot.files)) { await mkdir(dirname(join(work, path)), { recursive: true }); await writeNew(join(work, path), await regularBytes(join(binding.turn, "snapshot/files"), path)); }
  assert.deepEqual(await captureSource(work), binding.restored); assert.deepEqual(await captureSource(binding.meta.work), binding.originalSource);
  await writeNew(join(binding.output, "setup/targets.json"), json({ ...binding.targets, sourceDigest: binding.restored.digest }));
  await writeNew(join(binding.output, "setup/reconstruction.json"), json({ schemaVersion: 1, completed: new Date().toISOString(), bindingSha256: binding.bindingSha256, helperHashes: binding.helperHashes, stage: binding.record.turn, work, originalWork: binding.meta.work, originalSource: binding.originalSource, source: binding.restored, omittedMetadata: binding.extras, environment: binding.environment, modelCalls: 0 }));
  console.log(json({ work, sourceFiles: binding.restored.files.length, output: binding.output, next: "Root records one matched offline install, then individual approved units" }));
} catch (error) { await writeNew(join(binding.output, "setup/error.json"), json({ error: String(error), retries: 0 })); throw error; }
