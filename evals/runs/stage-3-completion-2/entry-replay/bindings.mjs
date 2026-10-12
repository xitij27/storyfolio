// New restored-source scope only. Historical source policy and evidence stay intact.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { captureSource } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/lib/build-capture.mjs";
import { hash, json, safePath, verifyInputs, writeNew } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/lib/review.mjs";
import { validateTargets } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/builds/bench-entry-1/measurement-lib.mjs";
export { captureSource, hash, json, safePath, verifyInputs, writeNew };
export const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../..");
export const cohort = resolve(study, "../../codex-bench-entry-baseline-1"), originalStudy = resolve(study, "../../stage-3-natural-entry-1");
export const run = join(cohort, "bench-entry-1/baseline-1"), inputs = join(cohort, "inputs"), setup = join(study, "setup"), output = join(study, "measurement");
export const identities = Object.freeze({
  inputDigest: "504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a",
  actorResult: "d758c277d2af1700d5a3c62913501917bee457f4df9da3b13d32266f9de6a291",
  targets: "8b42f02d7183f7eafe4f4ca35409d8c0f36dfe81223f4ceb2ac2a2c431ed01c5",
  blocker: "6ec0961d0b0f3c9de681b244c043ceade3e9ce3555934f3b3cf53c6b05fbf4ad",
  originalSource: "92a06e202ec4267481e2a353ccbc85a92f316dec3f85fbf6bc467141a0ae33c9",
  restoredSource: "fea7a2ef704fa6c30e3d6d1477a39b911fa06961b54560f8f0bca90f3c1403c3",
});
export const readJson = async path => JSON.parse(await readFile(path, "utf8"));
export async function regularBytes(base, path) {
  safePath(path); let current = base; assert.equal(await realpath(base), resolve(base), "Symlink base is not allowed");
  for (const part of path.split("/")) { current = join(current, part); assert.equal((await lstat(current)).isSymbolicLink(), false, `Symlink: ${path}`); }
  assert.ok((await lstat(current)).isFile(), `Not a regular file: ${path}`); return readFile(current);
}
export function assertSnapshot(source, files) {
  const actual = Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));
  assert.equal(Object.keys(actual).length, source.files.length, "Duplicate source path");
  assert.deepEqual(actual, files, "Exact saved/restored source inventory differs");
}
export function reboundTargets(original, digest) {
  assert.match(digest, /^[a-f0-9]{64}$/); return { ...original, sourceDigest: digest };
}
export function assertInstall(command, result, work, originalCommand) {
  assert.equal(command.cwd, work); assert.equal(command.executable, originalCommand.executable);
  assert.deepEqual(command.args, originalCommand.args); assert.deepEqual(command.environment, originalCommand.environment);
  assert.equal(result.code, 0); assert.equal(result.signal, null); assert.ok(result.finished); assert.ok(!result.error && !result.timedOut);
}
export async function helperHashes() {
  const result = {}; for (const name of ["bindings.mjs", "reconstruct.mjs", "run-replay.mjs", "verify-replay.mjs", "bindings.test.mjs", "README.md"]) result[name] = hash(await regularBytes(study, name)); return result;
}
export async function loadOriginal() {
  const frozen = await verifyInputs(inputs); assert.equal(frozen.digest, identities.inputDigest);
  const meta = await readJson(join(run, "meta.json")); assert.equal(meta.inputs, inputs); assert.equal(meta.inputDigest, frozen.digest);
  const actorBytes = await readFile(join(run, "turns/01/result.json")); assert.equal(hash(actorBytes), identities.actorResult);
  const actor = JSON.parse(actorBytes); assert.equal(actor.complete, false); assert.equal(actor.timedOut, true); assert.equal(Object.keys(actor.snapshot.files).length, 180);
  for (const [path, value] of Object.entries(actor.artifacts)) assert.equal(hash(await regularBytes(join(run, "turns/01"), path)), value, `Historical artifact: ${path}`);
  for (const [path, record] of Object.entries(actor.snapshot.files)) { assert.equal(record.type, "file"); const bytes = await regularBytes(join(run, "turns/01/snapshot/files"), path); assert.equal(hash(bytes), record.hash); assert.equal(bytes.length, record.size); }
  const originalSource = await captureSource(meta.work); assert.equal(originalSource.digest, identities.originalSource); assert.equal(originalSource.files.length, 198);
  const targetsBytes = await regularBytes(originalStudy, "observed-targets.json"), blockerBytes = await regularBytes(originalStudy, "source-binding-blocker.json");
  assert.equal(hash(targetsBytes), identities.targets); assert.equal(hash(blockerBytes), identities.blocker);
  const targets = JSON.parse(targetsBytes), expected = await readJson(join(inputs, "expectations.json")); assert.deepEqual(validateTargets(targets, expected), []);
  const terminal = await readJson(join(originalStudy, "actor-tool-poll-13.json")), processRecord = await readJson(join(originalStudy, "actor-command/result.json"));
  assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined); assert.equal(processRecord.code, 1); assert.equal(processRecord.signal, null); assert.equal(JSON.parse(terminal.output).finished, processRecord.finished);
  for (const stream of ["stdout", "stderr"]) assert.equal(hash(await readFile(join(originalStudy, `actor-command/${stream}.log`))), processRecord[`${stream}Sha256`]);
  const capabilities = await readJson(join(inputs, "capabilities.json")), runtime = await readJson(join(run, "setup/runtime-environment.json"));
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  const environment = { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" };
  assert.equal(environment.TMPDIR, "/var/tmp/storyfolio-entry-runtime-20261012");
  const parent = join(environment.TMPDIR, "storyfolio-evals"); assert.equal(await realpath(parent), parent);
  const originalInstall = await readJson(join(run, "setup/dependency-install/command.json"));
  return { frozen, meta, actor, originalSource, targets, expected, environment, parent, originalInstall, actorResultSha256: hash(actorBytes) };
}
export async function loadSetup(binding) {
  const record = await readJson(join(setup, "reconstruction.json")); assert.equal(record.schemaVersion, 1); assert.equal(record.inputDigest, identities.inputDigest); assert.equal(record.actorResultSha256, identities.actorResult);
  assert.equal(dirname(record.work), binding.parent); assert.match(record.work.slice(binding.parent.length + 1), /^replay-bench-entry-1-[A-Za-z0-9]+$/); assert.equal(await realpath(record.work), record.work); assert.notEqual(record.work, binding.meta.work);
  assert.deepEqual(record.helperHashes, await helperHashes());
  assert.ok(record.authorization.path.startsWith(join(root, "docs/history") + "/")); assert.equal(await realpath(record.authorization.path), record.authorization.path); assert.equal(hash(await readFile(record.authorization.path)), record.authorization.sha256);
  const before = await readJson(join(setup, "source-restored.json")); assertSnapshot(before, binding.actor.snapshot.files); assert.equal(before.digest, identities.restoredSource);
  const current = await captureSource(record.work); assert.deepEqual(current, before);
  const targets = await readJson(join(setup, "observed-targets.json")); assert.deepEqual(targets, reboundTargets(binding.targets, current.digest)); assert.deepEqual(validateTargets(targets, binding.expected), []);
  return { record, current, targets };
}
export async function artifactInventory(directory, prefix = "") {
  const result = []; for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) { const path = prefix ? `${prefix}/${entry.name}` : entry.name; if (entry.isDirectory()) result.push(...await artifactInventory(directory, path)); else { assert.ok(entry.isFile(), `Non-file artifact: ${path}`); const bytes = await readFile(join(directory, path)); result.push({ path, bytes: bytes.length, sha256: hash(bytes) }); } } return result.sort((a, b) => a.path.localeCompare(b.path));
}
