// Root launches one predeclared unit. No automatic next unit, retry or model.
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { runBounded } from "../../stage-3-candidate-verification-1/bounded-process.mjs";
import { bounds, openCaptureLogs } from "../../stage-3-completion-2/full-journey-measurement/measurement-lib.mjs";
import * as original from "../../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
import * as recovered from "../recovery/binding-lib.mjs";
const { captureSource, regularBytes, inventory, hash, json, writeNew } = original;
import { resolveApplication } from "../../stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs";
const { values } = parseArgs({ options: { binding: { type: "string" }, unit: { type: "string" } } }); assert.ok(values.binding && values.unit);
// A post-closure recovery binding uses its additive loader; every other binding the original one.
const { loadBinding, loadPrepared } = JSON.parse(await readFile(values.binding)).kind === "recovered-concepts-measurement" ? recovered : original;
const binding = await loadBinding(values.binding), prepared = await loadPrepared(binding), unit = values.unit;
assert.ok(binding.units.includes(unit), "Unit not in this stage's predeclared schedule");
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
assert.ok([2, 4, 6].includes(binding.record.turn)); if (binding.record.turn !== 6) assert.equal(unit, binding.record.turn === 2 ? "concepts" : "looks");
assert.equal(binding.meta.cohort, "codex-full-journey-timing-1");
const adapterReference = binding.record.adapter;
assert.ok(adapterReference && adapterReference.path.startsWith("evals/runs/stage-3-spine-time-1/"));
const adapterBytes = await regularBytes(process.cwd(), adapterReference.path);
assert.equal(hash(adapterBytes), adapterReference.sha256);
const adapter = JSON.parse(adapterBytes);
assert.equal(adapter.stage, binding.record.turn); assert.ok(["site", "."].includes(adapter.applicationRoot)); assert.equal(adapter.modelCalls, 0);
const expectedHelpers = [
  "evals/runs/stage-3-spine-time-1/measurement/gate-worker.mjs",
  "evals/runs/stage-3-spine-time-1/measurement/final-worker.mjs",
  "evals/runs/stage-3-spine-time-1/measurement/supplemental-verify.mjs",
  "evals/runs/stage-3-spine-time-1/measurement/README.md",
  "evals/runs/stage-3-spine-time-1/measurement/run-unit.mjs",
  "evals/runs/stage-3-storyboard-length-1/measurement-2/hit-target.mjs",
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs",
  "evals/runs/stage-3-completion-2/full-journey-recovery/measurement/choice-activation.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/binding-lib.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/prepare-source.mjs",
  "evals/runs/stage-3-spine-time-1/recovery/verify.mjs"
].sort();
assert.deepEqual(Object.keys(adapter.helperHashes).sort(), expectedHelpers);
for (const [path, digest] of Object.entries(adapter.helperHashes)) assert.equal(hash(await regularBytes(process.cwd(), path)), digest);
const application = await resolveApplication(prepared.work, adapter.applicationRoot, binding.restored);
const install = await readJson(prepared.setup, "dependency-install/command.json"), installed = await readJson(prepared.setup, "dependency-install/result.json");
assert.equal(install.cwd, application); assert.equal(install.executable, binding.installContract.executable); assert.deepEqual(install.args, binding.installContract.args); assert.deepEqual(install.environment, binding.installContract.environment);
assert.equal(install.wrapperSha256, binding.helperHashes["evals/runs/stage-3-comparison-1/record-command.mjs"]);
assert.equal(installed.code, 0); assert.equal(installed.signal, null); assert.ok(!installed.error && !installed.timedOut);
for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(prepared.setup, `dependency-install/${channel}.log`)), installed[`${channel}Sha256`]);
// Sequential distinct modes are permitted only after prior process/source closure.
for (const prior of binding.units.slice(0, binding.units.indexOf(unit))) {
  const priorBase = join(binding.output, "units", prior), closure = await readJson(priorBase, "review/closure.json"), execution = await readJson(priorBase, "review/process.json"), manifest = await readJson(priorBase, "artifacts/manifest.json");
  assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true); assert.equal(manifest.complete, true);
  assert.ok(!execution.timedOut && !execution.externalSignal && !execution.spawnError && !execution.signal && !execution.logError, "Interrupted or unrecorded unit blocks subsequent units");
  assert.equal(hash(await regularBytes(join(priorBase, "artifacts"), "manifest.json")), closure.manifestSha256);
  const priorFiles = await inventory(join(priorBase, "artifacts")); assert.deepEqual(priorFiles, await readJson(priorBase, "review/artifact-inventory.json"));
  if (prior === "build") assert.ok(manifest.commands.some(command => command.name === "build" && command.code === 0), "Failed build prevents browser work");
}
await mkdir(join(binding.output, "units"), { recursive: true });
const directory = join(binding.output, "units", unit); await mkdir(directory); const review = join(directory, "review"), artifacts = join(directory, "artifacts"); await mkdir(review);
const worker = `evals/runs/stage-3-spine-time-1/measurement/${binding.record.turn === 6 ? "final-worker.mjs" : "gate-worker.mjs"}`;
const args = [join(process.cwd(), worker), `--workspace=${prepared.work}`, `--application-root=${adapter.applicationRoot}`, `--targets=${join(prepared.setup, "targets.json")}`, `--expectations=${join(binding.meta.inputs, "expectations.json")}`, `--out=${artifacts}`, `--dependencies=${binding.policy.trustedDependencies.root}`];
if (binding.record.turn === 6) { args.push(`--unit=${unit}`); if (unit !== "build") args.push(`--build-proof=${join(binding.output, "units/build/artifacts/manifest.json")}`); }
const limits = bounds(unit, binding.policy);
await writeNew(join(review, "attempt.json"), json({ started: new Date().toISOString(), unit, stage: binding.record.turn, bindingSha256: binding.bindingSha256, actorResultSha256: binding.record.actorResultSha256, actorComplete: true, retries: 0, modelCalls: 0 }));
await writeNew(join(review, "source-before.json"), json(binding.restored));
await writeNew(join(review, "command.json"), json({ executable: process.execPath, args, cwd: prepared.work, environment: binding.environment, ...limits, helperHashes: binding.helperHashes, inputDigest: binding.frozen.digest, workerSha256: hash(await readFile(args[0])), adapterSha256: adapterReference.sha256, adapterHelperHashes: adapter.helperHashes, installResultSha256: hash(await regularBytes(prepared.setup, "dependency-install/result.json")), limit: "Total child lifetime includes shutdown grace, subject to scheduling jitter; hard worker exit does not prove all detached descendants exited" }));
const logs = openCaptureLogs(review);
const logErrors = []; let ownedPid = null, logStop = false, logKillTimer;
function stopForLogError() {
  if (logStop || !ownedPid) return; logStop = true;
  const signal = name => { try { process.kill(ownedPid, name); } catch (error) { if (error.code !== "ESRCH") logErrors.push(`Owned worker shutdown: ${error}`); } };
  signal("SIGTERM"); logKillTimer = setTimeout(() => signal("SIGKILL"), limits.graceMs);
}
const append = (name, bytes) => { try { logs.write(name, bytes); } catch (error) { logErrors.push(`${name}: ${error}`); stopForLogError(); } };
let execution;
try {
  execution = await runBounded({ executable: process.execPath, args, cwd: prepared.work, env: { ...process.env, ...binding.environment }, ...limits,
    onEvent: event => { if (["exit", "closed"].includes(event.type)) { ownedPid = null; clearTimeout(logKillTimer); } else if (["spawn-request", "spawned"].includes(event.type)) ownedPid = event.childPid; if (logErrors.length) stopForLogError(); append("lifecycle", JSON.stringify(event) + "\n"); },
    onStdout: bytes => append("stdout", bytes), onStderr: bytes => append("stderr", bytes) });
} finally { clearTimeout(logKillTimer); ownedPid = null; logErrors.push(...logs.close()); }
execution.logError = logErrors.length ? { errors: logErrors, shutdown: "coordinator log failure, signalled only the owned worker PID; not an external-signal attribution" } : null;
const logHash = async path => { try { return hash(await regularBytes(review, path)); } catch { return null; } };
await writeNew(join(review, "process.json"), json({ ...execution, stdoutSha256: await logHash("stdout.log"), stderrSha256: await logHash("stderr.log"), lifecycleSha256: await logHash("lifecycle.jsonl") }));
const closure = { unit, bindingSha256: binding.bindingSha256, closed: new Date().toISOString(), sourceUnchanged: false, originalPreserved: false, artifactBinding: false, captureComplete: false, errors: [] };
try { const after = await captureSource(prepared.work); await writeNew(join(review, "source-after.json"), json(after)); assert.deepEqual(after, binding.restored); closure.sourceUnchanged = true; } catch (error) { closure.errors.push(String(error)); }
try { const after = await loadBinding(values.binding); await loadPrepared(after); assert.equal(hash(await regularBytes(process.cwd(), adapterReference.path)), adapterReference.sha256); for (const [path, digest] of Object.entries(adapter.helperHashes)) assert.equal(hash(await regularBytes(process.cwd(), path)), digest); closure.originalPreserved = true; } catch (error) { closure.errors.push(String(error)); }
try {
  const files = await inventory(artifacts); await writeNew(join(review, "artifact-inventory.json"), json(files));
  const manifest = await readJson(artifacts, "manifest.json"); assert.deepEqual(manifest.sourceBefore, binding.restored); assert.deepEqual(manifest.sourceAfter, binding.restored);
  assert.deepEqual(Object.fromEntries(files.filter(file => file.path !== "manifest.json").map(file => [file.path, file.sha256])), manifest.artifacts);
  closure.artifactBinding = true; closure.captureComplete = manifest.complete === true; closure.manifestSha256 = hash(await regularBytes(artifacts, "manifest.json"));
} catch (error) { closure.errors.push(String(error)); }
await writeNew(join(review, "closure.json"), json(closure));
console.log(json({ ...closure, code: execution.code, timedOut: execution.timedOut, externalSignal: execution.externalSignal, next: "Root reviews closure; no next unit is automatically launched" }));
process.exitCode = execution.code === 0 && !execution.timedOut && !execution.externalSignal && !execution.logError && closure.sourceUnchanged && closure.originalPreserved && closure.artifactBinding && closure.captureComplete ? 0 : 1;
