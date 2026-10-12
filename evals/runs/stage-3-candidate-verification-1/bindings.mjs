import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { hash, json, verifyInputs } from "../../lib/build.mjs";

export const study = dirname(fileURLToPath(import.meta.url));
export const review = join(study, "acceptance-review"), output = join(study, "acceptance");
export const run = resolve(study, "../codex-bench-depth-candidate-1/bench-depth-2/baseline-1");
export const inputs = resolve(run, "../../inputs");
export const sourceDigest = "830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7";
export const inputDigest = "a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353";
export const previousManifestSha256 = "b21f8baa6e9568c71e7d0cde2957c4e2405eff4018c09594de76f2fa23296572";
export const readJson = async path => JSON.parse(await readFile(path, "utf8"));
export async function filesAt(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await filesAt(directory, path));
    else { assert.ok(entry.isFile(), `Non-file evidence: ${path}`); files.push(path); }
  }
  return files.sort();
}
export async function verifyPrevious() {
  const directory = join(run, "acceptance"), bytes = await readFile(join(directory, "manifest.json")), manifest = JSON.parse(bytes);
  assert.equal(hash(bytes), previousManifestSha256, "Earlier interrupted manifest changed");
  assert.equal(manifest.complete, false); assert.equal(manifest.passed, false);
  assert.deepEqual((await filesAt(directory)).filter(path => path !== "manifest.json"), Object.keys(manifest.artifacts).sort());
  for (const [path, sha256] of Object.entries(manifest.artifacts)) assert.equal(hash(await readFile(join(directory, path))), sha256, `Earlier evidence changed: ${path}`);
  assert.equal(manifest.sourceBefore.digest, sourceDigest); assert.deepEqual(manifest.sourceAfter, manifest.sourceBefore);
  return { manifestSha256: hash(bytes), artifacts: Object.keys(manifest.artifacts).length, complete: manifest.complete, passed: manifest.passed };
}
export async function loadBindings() {
  const frozen = await verifyInputs(inputs); assert.equal(frozen.digest, inputDigest);
  const meta = await readJson(join(run, "meta.json")); assert.equal(meta.inputDigest, frozen.digest);
  const actorBytes = await readFile(join(run, "turns/01/result.json")), actor = JSON.parse(actorBytes);
  assert.equal(actor.complete, false); assert.equal(actor.timedOut, true); assert.equal(Object.keys(actor.snapshot.files).length, 184);
  const oldComparison = await readJson(join(run, "acceptance-review/saved-source-comparison.json"));
  assert.equal(hash(actorBytes), oldComparison.actorResultSha256);
  for (const [path, record] of Object.entries(actor.snapshot.files)) {
    const bytes = await readFile(join(run, "turns/01/snapshot/files", path));
    assert.equal(hash(bytes), record.hash, `Retained actor bytes changed: ${path}`); assert.equal(bytes.length, record.size);
  }
  const recorder = await readJson(resolve(study, "../stage-3-comparison-1/candidate-actor-command/result.json"));
  const terminal = await readJson(resolve(study, "../stage-3-comparison-1/candidate-actor-tool-poll-07.json"));
  assert.equal(recorder.code, 1); assert.equal(recorder.signal, null); assert.equal(terminal.exit_code, 1); assert.equal(terminal.session_id, undefined);
  assert.equal(JSON.parse(terminal.output).finished, recorder.finished);
  for (const stream of ["stdout", "stderr"]) assert.equal(hash(await readFile(resolve(study, "../stage-3-comparison-1/candidate-actor-command", stream + ".log"))), recorder[stream + "Sha256"]);
  const capabilities = await readJson(join(inputs, "capabilities.json"));
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  const environment = { ...capabilities.environment, TMPDIR: "/var/tmp/storyfolio-comparison-runtime-20261012", NEXT_TELEMETRY_DISABLED: "1" };
  const { captureSource } = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build-capture.mjs")));
  async function source() {
    const captured = await captureSource(meta.work);
    assert.equal(captured.digest, sourceDigest);
    assert.deepEqual(Object.fromEntries(captured.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), actor.snapshot.files);
    return captured;
  }
  const previous = await verifyPrevious();
  return { meta, actor, actorResultSha256: hash(actorBytes), environment, frozen, previous, source, captureSource: () => captureSource(meta.work) };
}
