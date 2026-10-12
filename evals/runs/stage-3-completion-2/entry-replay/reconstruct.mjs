// Root runs once after review. Copies only saved source; no install/build/browser.
import assert from "node:assert/strict";
import { mkdir, mkdtemp, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { loadOriginal, helperHashes, regularBytes, root, run, study, setup, identities, captureSource, assertSnapshot, reboundTargets, hash, json, writeNew } from "./bindings.mjs";
const { values } = parseArgs({ options: { authorization: { type: "string" } } });
assert.ok(values.authorization, "Supply the new recorded author direction with --authorization=FILE");
const authorizationPath = resolve(values.authorization); assert.ok(authorizationPath.startsWith(join(root, "docs/history") + "/")); assert.equal(await realpath(authorizationPath), authorizationPath);
const authorization = { path: authorizationPath, sha256: hash(await regularBytes(root, authorizationPath.slice(root.length + 1))) };
const binding = await loadOriginal(), helpers = await helperHashes();
await mkdir(setup); // Exclusive attempt marker: never overwrite an earlier reconstruction.
await writeNew(join(setup, "reconstruction-attempt.json"), json({ started: new Date().toISOString(), authorization, helperHashes: helpers, modelCalls: 0, copiesSavedSourceOnly: true }));
try {
  const work = await mkdtemp(join(binding.parent, "replay-bench-entry-1-"));
  await writeNew(join(setup, "workspace-allocation.json"), json({ work, created: new Date().toISOString(), originalWork: binding.meta.work }));
  for (const path of Object.keys(binding.actor.snapshot.files)) { const bytes = await regularBytes(join(run, "turns/01/snapshot/files"), path); await mkdir(dirname(join(work, path)), { recursive: true }); await writeNew(join(work, path), bytes); }
  const source = await captureSource(work); assertSnapshot(source, binding.actor.snapshot.files); assert.equal(source.digest, identities.restoredSource);
  await writeNew(join(setup, "source-restored.json"), json(source)); await writeNew(join(setup, "observed-targets.json"), json(reboundTargets(binding.targets, source.digest)));
  assert.deepEqual(await captureSource(binding.meta.work), binding.originalSource);
  await writeNew(join(setup, "reconstruction.json"), json({ schemaVersion: 1, completed: new Date().toISOString(), work, originalWork: binding.meta.work, inputDigest: identities.inputDigest, actorResultSha256: identities.actorResult, originalSourceDigest: identities.originalSource, restoredSourceDigest: source.digest, sourceFiles: source.files.length, authorization, helperHashes: helpers, targetsChangedFields: ["sourceDigest"], originalExactSetGateRemainsBlocked: true, sourceScope: "Exact saved 180-file application, not original 198-file workspace or omitted Git metadata", environment: binding.environment, modelCalls: 0 }));
  console.log(json({ work, sourceFiles: source.files.length, digest: source.digest, setup, next: "Root records one pinned offline install; no browser or build was started" }));
} catch (error) { await writeNew(join(setup, "reconstruction-error.json"), json({ at: new Date().toISOString(), error: String(error), retry: false })); throw error; }
