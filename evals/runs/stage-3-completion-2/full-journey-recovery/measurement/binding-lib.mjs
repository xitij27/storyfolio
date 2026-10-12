// Stop-2-only recovered measurement binding; original full-journey binding is unchanged.
import assert from "node:assert/strict";
import { realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { implementationPaths, transitivePaths, writeNew } from "../../full-journey-measurement/binding-lib.mjs";
import { validateTargets } from "../../full-journey-measurement/measurement-lib.mjs";
import { loadAmendment, boundJson, root, hash, json, regularBytes, inventory, captureSource, safePath, recoveryPrefix } from "./amendment-lib.mjs";
import { resolveApplication } from "./app-root.mjs";
export { root, hash, json, regularBytes, inventory, captureSource, safePath, writeNew };
export const study = dirname(fileURLToPath(import.meta.url));
export const measurementPaths = ["app-root.mjs", "amendment-lib.mjs", "binding-lib.mjs", "prepare-source.mjs", "choice-activation.mjs", "gate-worker.mjs", "run-unit.mjs", "verify.mjs", "recovery.test.mjs", "README.md", "lineage.json"].map(name => `${recoveryPrefix}measurement/${name}`);
export const requiredMeasurementPaths = [...new Set([...measurementPaths, ...implementationPaths, ...transitivePaths, "evals/lib/build.mjs", "evals/lib/codex.mjs", "evals/lib/events.mjs", "skills/storyfolio/scripts/scaffold.mjs"])].sort();
export async function loadBinding(path, { liveOriginal = true } = {}) {
  const absolute = resolve(path); assert.ok(absolute.startsWith(join(root, recoveryPrefix)));
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), record = JSON.parse(bytes);
  assert.equal(record.schemaVersion, 1); assert.equal(record.kind, "recovered-concepts-measurement"); assert.equal(record.turn, 2);
  await boundJson(record.amendment); const amendment = await loadAmendment(join(root, record.amendment.path), { liveOriginal });
  assert.equal(amendment.amendmentSha256, record.amendment.sha256);
  const helperHashes = amendment.record.helperHashes.measurement;
  assert.deepEqual(Object.keys(helperHashes).sort(), requiredMeasurementPaths, "Measurement helper/import freeze is incomplete or has extra paths");
  for (const relative of [...implementationPaths, ...transitivePaths]) assert.equal(helperHashes[relative], amendment.frozen.hashes[`implementation/${relative}`]);
  const policy = JSON.parse(await regularBytes(amendment.meta.inputs, "expectations.json"));
  assert.equal(hash(await regularBytes(root, "evals/runs/stage-3-completion-2/full-journey-measurement/policy.json")), amendment.frozen.hashes["expectations.json"]);
  const targets = await boundJson(record.targets), actor = amendment.officialActors[1];
  assert.deepEqual(validateTargets(targets), []); assert.equal(targets.stage, 2); assert.equal(targets.draft, undefined, "Unapproved targets draft is not executable");
  assert.equal(targets.sourceDigest, amendment.source.digest); assert.equal(targets.actorResultSha256, actor.digest);
  for (const source of targets.discovery.sources) assert.equal(amendment.source.files.find(file => file.path === source.path)?.sha256, source.sha256);
  safePath(record.output); assert.ok(record.output.startsWith(recoveryPrefix)); const output = join(root, record.output);
  for (const protectedRoot of [amendment.meta.work, amendment.meta.inputs, amendment.recoveryFilesRoot, amendment.run, join(root, amendment.record.continuation.output)]) assert.ok(output !== protectedRoot && !output.startsWith(protectedRoot + "/"), "Measurement output overlaps protected evidence/source");
  const installContract = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { ...amendment.capabilities.environment, TMPDIR: amendment.runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null } };
  return { ...amendment, amendment, record: { ...record, actorResultSha256: actor.digest }, bindingPath: absolute, bindingSha256: hash(bytes), helperHashes, policy, actor,
    originalSource: amendment.source, restored: amendment.source, targets, installContract, output,
    environment: { ...amendment.capabilities.environment, TMPDIR: amendment.runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" }, units: ["concepts"] };
}
export async function loadPrepared(binding, { currentSource = true } = {}) {
  const setup = join(binding.output, "setup"), preparation = JSON.parse(await regularBytes(setup, "reconstruction.json"));
  assert.equal(preparation.bindingSha256, binding.bindingSha256); assert.equal(preparation.amendmentSha256, binding.amendmentSha256); assert.deepEqual(preparation.helperHashes, binding.helperHashes);
  assert.equal(dirname(preparation.work), join(binding.runtime.TMPDIR, "storyfolio-evals")); assert.match(preparation.work.split("/").at(-1), /^journey-recovery-2-[A-Za-z0-9]+$/);
  assert.equal(await realpath(preparation.work), preparation.work); assert.notEqual(preparation.work, binding.meta.work);
  assert.equal(preparation.applicationRoot, binding.applicationRoot); assert.deepEqual(preparation.source, binding.restored);
  const targets = JSON.parse(await regularBytes(setup, "targets.json")); assert.deepEqual(targets, binding.targets);
  if (currentSource) assert.deepEqual(await captureSource(preparation.work), binding.restored);
  const application = await resolveApplication(preparation.work, binding.applicationRoot, binding.restored); assert.equal(preparation.application, application);
  return { setup, preparation, work: preparation.work, application, targets };
}
