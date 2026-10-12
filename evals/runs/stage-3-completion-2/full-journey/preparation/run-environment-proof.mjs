// Root-only one-shot environment proof. No paid actor, scaffold or application install.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { hash, inspectBuildInputs, inspectWorkspace, regularBytes, validateCase, verifyInputs, writeNew } from "../../../../lib/build.mjs";
import { PROOF, assertContract, assertInitialSnapshot, assertSource, json } from "./probe-environment.mjs";

const { values } = parseArgs({ options: { cohort: { type: "string" } } });
assert.ok(PROOF.cohorts.includes(values.cohort), "Choose the declared fresh full-journey cohort");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../..");
const inputs = join(root, "evals/runs", values.cohort, "inputs");
const out = join(root, "evals/runs", values.cohort, "full-journey-1/baseline-1"), setup = join(out, "setup");
const manifest = await verifyInputs(inputs), meta = JSON.parse(await regularBytes(out, "meta.json"));
const source = validateCase(JSON.parse(await regularBytes(inputs, "case.json"))), capabilities = JSON.parse(await regularBytes(inputs, "capabilities.json"));
assertContract({ cohort: values.cohort, source, meta, manifest, capabilities });
assert.equal(meta.inputs, inputs); assert.equal(await realpath(meta.work), meta.work);
assert.deepEqual((await readdir(out)).sort(), ["meta.json", "setup"], "Actor already started");
assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
assert.equal(process.env.TMPDIR, PROOF.temporaryRoot); assert.equal(process.env.NEXT_TELEMETRY_DISABLED, undefined);
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(process.env[key] ?? null, value, key);
assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256);
const currentInputs = await inspectBuildInputs({ root, casePath: manifest.casePath, capabilities });
assert.equal(currentInputs.digest, manifest.digest, "Current inputs differ from the committed freeze");
for (const name of ["probe-environment.mjs", "run-environment-proof.mjs", "finalize-readiness.mjs"]) {
  const path = "evals/runs/stage-3-completion-2/full-journey/preparation/" + name;
  assert.equal(hash(await regularBytes(root, path)), manifest.hashes["implementation/" + path], "Missing frozen proof helper: " + name);
}
const prepared = JSON.parse(await regularBytes(setup, "result.json"));
assert.equal(prepared.complete, true); assert.equal(prepared.scaffold.scaffolded, false);
assert.deepEqual(prepared.scaffold.copied, []); assert.deepEqual(prepared.scaffold.conflicts, []);
const snapshot = JSON.parse(await regularBytes(setup, "snapshot/manifest.json"));
assertInitialSnapshot(snapshot, manifest);
const sourceRecord = async () => { const value = await inspectWorkspace(meta.work, source.snapshot); return { entries: Object.fromEntries(Object.entries(value.entries).map(([path, { bytes, ...entry }]) => [path, entry])), excluded: value.excluded, unexpected: value.unexpected }; };
const before = await sourceRecord(); assertSource(before, snapshot);
const proof = join(setup, "environment-proof"); await mkdir(proof);
await writeNew(join(proof, "source-before.json"), json(before));
const allocated = await mkdtemp(join(PROOF.temporaryRoot, "storyfolio-environment-proof-")), runtimeOut = join(allocated, "proof");
assert.equal(await realpath(allocated), allocated);
assert.ok(!allocated.startsWith(meta.work + "/"));
const args = ["sandbox"];
for (let index = 0; index < capabilities.argv.length; index++) if (capabilities.argv[index] === "-c") args.push("-c", capabilities.argv[++index]);
args.push("--", process.execPath, join(inputs, "implementation/evals/runs/stage-3-completion-2/full-journey/preparation/probe-environment.mjs"), "--out", runtimeOut, "--capabilities", join(inputs, "capabilities.json"), "--workspace", meta.work);
const command = { schemaVersion: 1, started: new Date().toISOString(), executable: capabilities.cliExecutable, args, cwd: meta.work,
  environment: { ...capabilities.environment, TMPDIR: process.env.TMPDIR, NEXT_TELEMETRY_DISABLED: null },
  environmentScope: "observed-outer-launcher; selected actual sandbox environment is retained separately in capability/probe.json",
  inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"], runtimeDirectory: allocated, runtimeOut,
  bounds: { timeoutMs: PROOF.timeoutMs, graceMs: PROOF.graceMs, totalCapMs: PROOF.timeoutMs + PROOF.graceMs },
  scope: "unscaffolded-environment", modelCalls: 0, actorPreflight: false,
  limits: ["Only owned process-group signals; no automatic retry or runtime-directory cleanup.", "Sandbox inherits user configuration. Same frozen -c values, not a filesystem read jail.", "Proof output is outside actor work. No root application, dependency install or actor input is added."] };
await writeNew(join(proof, "command.json"), json(command));
const stdoutFile = createWriteStream(join(proof, "stdout.log"), { flags: "wx" }), stderrFile = createWriteStream(join(proof, "stderr.log"), { flags: "wx" });
const events = [], started = Date.now();
const result = await new Promise(done => {
  const child = spawn(command.executable, args, { cwd: meta.work, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let timedOut = false, externalSignal = null, spawnError = null, logError = null, stopping = false, escalation;
  const event = (type, fields = {}) => events.push({ at: new Date().toISOString(), elapsedMs: Date.now() - started, type, childPid: child.pid ?? null, ...fields });
  const kill = signal => { if (child.pid) try { process.kill(-child.pid, signal); } catch (error) { if (error.code !== "ESRCH") event("signal-error", { error: String(error) }); } };
  const stop = (signal, reason) => {
    if (stopping) return;
    stopping = true; event("stop-request", { signal, reason }); kill(signal);
    escalation = setTimeout(() => { event("shutdown-escalation"); kill("SIGKILL"); }, Math.min(PROOF.graceMs, Math.max(0, started + PROOF.timeoutMs + PROOF.graceMs - Date.now())));
  };
  const handlers = new Map(["SIGTERM", "SIGINT"].map(signal => [signal, () => { externalSignal ??= signal; event("external-signal", { signal, sender: "unknown" }); stop(signal, "external signal"); }]));
  for (const [signal, handler] of handlers) process.on(signal, handler);
  for (const log of [stdoutFile, stderrFile]) log.on("error", error => { logError ??= String(error); stop("SIGTERM", "log error"); });
  const timer = setTimeout(() => { timedOut = true; event("deadline"); stop("SIGTERM", "proof deadline"); }, PROOF.timeoutMs);
  event("spawn-request");
  child.stdout.on("data", bytes => stdoutFile.write(bytes)); child.stderr.on("data", bytes => stderrFile.write(bytes));
  child.on("error", error => { spawnError = String(error); event("spawn-error", { error: spawnError }); });
  child.on("close", async (code, signal) => {
    clearTimeout(timer); clearTimeout(escalation);
    if (stopping) kill("SIGKILL");
    for (const [name, handler] of handlers) process.removeListener(name, handler);
    await Promise.all([stdoutFile, stderrFile].map(stream => stream.destroyed ? Promise.resolve() : new Promise(resolve => stream.end(resolve))));
    event("closed", { code, signal });
    done({ code, signal, timedOut, externalSignal, spawnError, logError, childPid: child.pid ?? null, durationMs: Date.now() - started,
      finished: new Date().toISOString(), modelCalls: 0, actorPreflight: false, events });
  });
});
await writeNew(join(proof, "process.json"), json(result));
let copied = false, sourceUnchanged = false;
try { await cp(runtimeOut, join(proof, "capability"), { recursive: true, force: false, errorOnExist: true }); copied = true; }
catch (error) { await writeNew(join(proof, "copy-error.json"), json({ error: String(error) })); }
try { const after = await sourceRecord(); await writeNew(join(proof, "source-after.json"), json(after)); assertSource(after, snapshot); sourceUnchanged = true; }
catch (error) { await writeNew(join(proof, "source-error.json"), json({ error: String(error) })); }
await verifyInputs(inputs);
const closed = { schemaVersion: 1, copied, sourceUnchanged, actorPreflight: false, modelCalls: 0, runtimeOut, retained: true,
  processSucceeded: result.code === 0 && !result.signal && !result.timedOut && !result.externalSignal && !result.spawnError && !result.logError,
  limits: "Process and source closure only. Root original-image review and final attestation are still required." };
await writeNew(join(proof, "closure.json"), json(closed)); console.log(json(closed));
process.exitCode = closed.processSucceeded && copied && sourceUnchanged ? 0 : 1;
