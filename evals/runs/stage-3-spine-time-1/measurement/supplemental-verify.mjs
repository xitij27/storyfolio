// Read-only additive audit of supplemental helper and normal outer bindings.
import assert from "node:assert/strict";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import * as original from "../../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
import * as recovered from "../recovery/binding-lib.mjs";
const { root, regularBytes, hash, json, safePath, assertSupervisor } = original;
const { values } = parseArgs({ options: Object.fromEntries(["binding", "unit", "command", "terminal"].map(key => [key, { type: "string" }])) });
for (const key of ["binding", "unit", "command", "terminal"]) assert.ok(values[key], key);
// A post-closure recovery binding uses its additive loader; every other binding the original one.
const { loadBinding, loadPrepared } = JSON.parse(await readFile(values.binding)).kind === "recovered-concepts-measurement" ? recovered : original;
for (const key of ["command", "terminal"]) { safePath(values[key]); assert.ok(values[key].startsWith("evals/runs/stage-3-spine-time-1/")); }
const binding = await loadBinding(values.binding), prepared = await loadPrepared(binding);
assert.equal(binding.meta.cohort, "codex-full-journey-timing-1"); assert.ok(binding.units.includes(values.unit));
const read = async (base, path) => JSON.parse(await regularBytes(base, path));
const adapterBytes = await regularBytes(root, binding.record.adapter.path); assert.equal(hash(adapterBytes), binding.record.adapter.sha256);
const adapter = JSON.parse(adapterBytes); assert.equal(adapter.stage, binding.record.turn); assert.ok(["site", "."].includes(adapter.applicationRoot));
const names = ["gate-worker.mjs", "final-worker.mjs", "run-unit.mjs", "supplemental-verify.mjs", "README.md"];
const expected = names.map(name => "evals/runs/stage-3-spine-time-1/measurement/" + name).concat([
  "evals/runs/stage-3-storyboard-length-1/measurement-2/hit-target.mjs",
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs",
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/choice-activation.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/binding-lib.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/prepare-source.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/verify.mjs"
]).sort();
assert.deepEqual(Object.keys(adapter.helperHashes).sort(), expected);
for (const [path, digest] of Object.entries(adapter.helperHashes)) assert.equal(hash(await regularBytes(root, path)), digest, path);
const outerDirectory = join(root, values.command), outer = await read(outerDirectory, "result.json"), terminal = await read(root, values.terminal), raw = {};
for (const name of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) { raw[name] = await regularBytes(outerDirectory, name); assert.equal(hash(raw[name]), outer.rawArtifacts[name]); }
const command = JSON.parse(raw["command.json"]), events = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
assert.equal(assertSupervisor(outer, terminal, command, events), outerDirectory);
assert.equal(command.cwd, root); assert.equal(command.executable, binding.capabilities.node.executable);
assert.equal(command.recorderSha256, binding.helperHashes["evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
assert.deepEqual(command.environment, binding.installContract.environment);
assert.deepEqual(command.args, ["evals/runs/stage-3-spine-time-1/measurement/run-unit.mjs", "--binding", values.binding, "--unit", values.unit]);
const review = join(binding.output, "units", values.unit, "review"), saved = await read(review, "command.json"), processRecord = await read(review, "process.json"), closure = await read(review, "closure.json");
assert.equal(saved.adapterSha256, binding.record.adapter.sha256); assert.deepEqual(saved.adapterHelperHashes, adapter.helperHashes);
assert.equal(saved.executable, binding.capabilities.node.executable); assert.equal(saved.cwd, prepared.work); assert.deepEqual(saved.environment, binding.environment);
const worker = "evals/runs/stage-3-spine-time-1/measurement/" + (binding.record.turn === 6 ? "final-worker.mjs" : "gate-worker.mjs");
const args = [join(root, worker), `--workspace=${prepared.work}`, `--application-root=${adapter.applicationRoot}`, `--targets=${join(prepared.setup, "targets.json")}`, `--expectations=${join(binding.meta.inputs, "expectations.json")}`, `--out=${join(binding.output, "units", values.unit, "artifacts")}`, `--dependencies=${binding.policy.trustedDependencies.root}`];
if (binding.record.turn === 6) { args.push(`--unit=${values.unit}`); if (values.unit !== "build") args.push(`--build-proof=${join(binding.output, "units/build/artifacts/manifest.json")}`); }
assert.deepEqual(saved.args, args); assert.equal(saved.workerSha256, adapter.helperHashes[worker]);
assert.equal(closure.bindingSha256, binding.bindingSha256); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true); assert.equal(closure.captureComplete, true);
assert.equal(processRecord.code, 0); assert.ok(!processRecord.timedOut && !processRecord.externalSignal && !processRecord.logError);
console.log(json({ supplementalIntegrityVerified: true, normalOuterClosure: true, unit: values.unit, stage: binding.record.turn,
  bindingSha256: binding.bindingSha256, adapterSha256: binding.record.adapter.sha256, supplementalHelpers: expected.length,
  originalVerifierStillRequired: true, semanticVisualAndAuthorAcceptance: "not assessed", modelCalls: 0, writes: false }));
