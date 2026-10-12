// Read-only preservation audit after root-confirmed normal failed closure.
// No retry, successful continuation gate, subprocess, model or browser.
import assert from "node:assert/strict";
import { readFile, readdir, lstat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-closed"]);
const started = new Date().toISOString(), directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const cohort = "codex-full-journey-candidate-1", inputs = join(root, "evals/runs", cohort, "inputs"), run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1"), turn = join(run, "turns/01");
const hash = bytes => createHash("sha256").update(bytes).digest("hex"), json = value => JSON.stringify(value, null, 2) + "\n";
const read = async path => JSON.parse(await readFile(path));
const manifest = await read(join(inputs, "manifest.json")); assert.equal(manifest.digest, hash(json(manifest.hashes)));
for (const [path, digest] of Object.entries(manifest.hashes)) assert.equal(hash(await readFile(join(inputs, path))), digest, path);
const build = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build.mjs")));
const codex = await import(pathToFileURL(join(inputs, "implementation/evals/lib/codex.mjs")));
assert.deepEqual(await build.verifyInputs(inputs), manifest);
const meta = await read(join(run, "meta.json")), source = build.validateCase(await read(join(inputs, "case.json"))), capabilities = await read(join(inputs, "capabilities.json"));
assert.equal(meta.inputDigest, manifest.digest); assert.equal((await build.inspectBuildInputs({ root, casePath: manifest.casePath, capabilities })).digest, manifest.digest);
await build.verifyBuildSetupProbe({ source, manifest, setup: join(run, "setup"), work: meta.work });
const history = await build.readTurnHistory(run); assert.equal(history.length, 1); const result = history[0];
const processResult = await read(join(turn, "process.json")), raw = (await readFile(join(turn, "stream.jsonl"))).toString(), events = raw.trim().split("\n").map(line => JSON.parse(line));
assert.equal(result.complete, false); assert.equal(result.turn, 1); assert.equal(result.requestedStop, 1); assert.equal(result.taskKind, "full-journey");
assert.equal(result.usage, null); assert.deepEqual(result.commands, []); assert.equal(result.timedOut, false); assert.equal(result.interruptedBy, null); assert.ok(!result.error && !result.captureError);
assert.equal(processResult.code, 1); assert.equal(processResult.timedOut, false); assert.equal(processResult.durationMs, result.durationMs);
for (const key of ["interruptedBy", "spawnError", "logError"]) assert.equal(processResult[key], null);
assert.deepEqual(processResult.args, build.buildCodexArgs({ model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId: null }));
const message = "Selected model is at capacity. Please try a different model.";
assert.deepEqual(events, [{ type: "thread.started", thread_id: result.sessionId }, { type: "turn.started" }, { type: "error", message }, { type: "turn.failed", error: { message } }]);
const summary = codex.summariseCodex(raw, processResult.code); assert.equal(summary.failed, true); assert.equal(summary.reply, ""); assert.equal(summary.usage, null); assert.deepEqual(summary.error, result.errors);
assert.equal((await readFile(join(turn, "reply.md"))).toString(), "\n");
assert.deepEqual(await readFile(join(turn, "prompt.md")), await readFile(join(inputs, "prompts/turn1.md")));
const snapshot = await read(join(turn, "snapshot/manifest.json")), before = await read(join(turn, "before/manifest.json")), initial = await read(join(run, "setup/snapshot/manifest.json"));
assert.deepEqual(snapshot, result.snapshot); assert.deepEqual(snapshot.files, initial.files); assert.deepEqual(before.files, initial.files); assert.deepEqual(snapshot.changes, []);
for (const item of [snapshot, before, initial]) { assert.deepEqual(item.excluded, []); assert.deepEqual(item.unexpected, []); assert.equal(Object.keys(item.files).length, 94); }
const observed = await build.inspectWorkspace(meta.work, source.snapshot);
assert.deepEqual(Object.fromEntries(Object.entries(observed.entries).map(([path, { bytes, ...entry }]) => [path, entry])), initial.files); assert.deepEqual(observed.excluded, []); assert.deepEqual(observed.unexpected, []);
async function pathsAt(base, prefix = "") {
  const paths = [];
  for (const name of await readdir(join(base, prefix))) { const path = prefix ? prefix + "/" + name : name, stat = await lstat(join(base, path)); assert.ok(!stat.isSymbolicLink(), path); if (stat.isDirectory()) paths.push(...await pathsAt(base, path)); else { assert.ok(stat.isFile(), path); paths.push(path); } }
  return paths.sort();
}
assert.deepEqual(await pathsAt(meta.work), Object.keys(initial.files).sort());
assert.deepEqual(await pathsAt(turn), [...Object.keys(result.artifacts), "result.json"].sort());
for (const [path, row] of Object.entries(initial.files)) for (const base of [join(run, "setup/snapshot/files"), join(turn, "before/files"), join(turn, "snapshot/files"), meta.work]) { const bytes = await build.regularBytes(base, path); assert.equal(hash(bytes), row.hash); assert.equal(bytes.length, row.size); }
const outerDirectory = join(directory, "candidate-turn-1-command"), outer = await read(join(outerDirectory, "result.json")), command = await read(join(outerDirectory, "command.json"));
const toolPath = join(directory, "candidate-turn-1-tool-poll-1.json"), tool = (await read(toolPath)).result;
assert.equal(tool.exit_code, 1); assert.equal(tool.session_id, undefined); const printed = JSON.parse(tool.output); assert.equal(printed.output, outerDirectory); delete printed.output; assert.deepEqual(printed, outer);
assert.equal(outer.code, 1); assert.equal(outer.signal, null); assert.equal(outer.complete, false); assert.equal(outer.status, "child-exited-unsuccessfully");
for (const key of ["childSpawned", "childExited", "childClosed"]) assert.equal(outer[key], true);
for (const key of ["interruptedBy", "signalSender", "childError"]) assert.equal(outer[key], null);
assert.equal(outer.signalForwarded, false); assert.equal(outer.forceAttempted, false);
assert.equal(command.cwd, root); assert.equal(command.executable, capabilities.node.executable);
assert.equal(command.recorderSha256, manifest.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: "/var/tmp/storyfolio-entry-runtime-20261012", NEXT_TELEMETRY_DISABLED: null });
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await readFile(join(outerDirectory, path))), digest);
const lifecycle = (await readFile(join(outerDirectory, "lifecycle.jsonl"))).toString().trim().split("\n").map(line => JSON.parse(line));
assert.deepEqual(lifecycle.map(row => row.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
assert.equal(lifecycle[0].recorderPid, outer.recorderPid); assert.equal(command.recorderPid, outer.recorderPid); for (const row of lifecycle.slice(1)) assert.equal(row.childPid, outer.childPid);
console.log(json({ schemaVersion: 1, verifiedPreservation: true, started, finished: new Date().toISOString(), cohort, inputDigest: manifest.digest,
  frozenInputs: Object.keys(manifest.hashes).length, sourceFiles: Object.keys(initial.files).length, initialBeforeSnapshotLiveIdentical: true, artifactHashes: Object.keys(result.artifacts).length,
  actorComplete: false, sessionId: result.sessionId, events, actorMessages: 0, actorCommands: 0, usage: null, cost: "unknown, not zero; no terminal usage was reported",
  closure: { actorCode: processResult.code, actorDurationMs: result.durationMs, timedOut: result.timedOut, interruptedBy: result.interruptedBy, outerCode: outer.code, outerDurationMs: outer.durationMs, outerFinished: outer.finished, outerStatus: outer.status, childExited: outer.childExited, childClosed: outer.childClosed },
  hashes: { result: result.digest, stream: result.artifacts["stream.jsonl"], snapshot: result.artifacts["snapshot/manifest.json"], outerResult: hash(await readFile(join(outerDirectory, "result.json"))), terminalTool: hash(await readFile(toolPath)), self: hash(await readFile(fileURLToPath(import.meta.url))) },
  disposition: "Failed invocation preserved. No successful fact/concept handoff, behavioral result, continuation gate, retry or model substitution. No browser/model/runtime was launched by this audit; no process absence claim.",
  limits: "The raw static completionMeaning string does not override complete:false. Four saved events report capacity failure; underlying provider capacity or billing was not independently measured. Readiness was successful separately, but is not evidence the candidate behavior ran." }));
