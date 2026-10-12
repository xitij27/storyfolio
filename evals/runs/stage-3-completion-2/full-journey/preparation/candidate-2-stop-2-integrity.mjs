// Read-only common gates after root-confirmed turn-2 terminal closure.
// Uses frozen helpers. No semantic approval or measurement gate, subprocess or actor write.
// Root must replace the terminal-tool placeholder only after actual terminal closure.
import assert from "node:assert/strict";
import { lstat, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-closed"]);
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../.."), started = new Date().toISOString();
const cohort = "codex-full-journey-candidate-2", inputs = join(root, "evals/runs", cohort, "inputs"), run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1"), turn = join(run, "turns/02");
const hash = bytes => createHash("sha256").update(bytes).digest("hex"), json = value => JSON.stringify(value, null, 2) + "\n";
const load = async path => JSON.parse(await readFile(path));
const manifest = await load(join(inputs, "manifest.json")); assert.equal(manifest.digest, hash(json(manifest.hashes)));
for (const [path, digest] of Object.entries(manifest.hashes)) assert.equal(hash(await readFile(join(inputs, path))), digest, path);
const build = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build.mjs")));
const codex = await import(pathToFileURL(join(inputs, "implementation/evals/lib/codex.mjs")));
assert.deepEqual(await build.verifyInputs(inputs), manifest);
const meta = await load(join(run, "meta.json")), source = build.validateCase(await load(join(inputs, "case.json"))), capabilities = await load(join(inputs, "capabilities.json"));
assert.equal(meta.inputDigest, manifest.digest); assert.equal(meta.inputs, inputs);
assert.equal((await build.inspectBuildInputs({ root, casePath: manifest.casePath, capabilities })).digest, manifest.digest);
await build.verifyBuildSetupProbe({ source, manifest, setup: join(run, "setup"), work: meta.work });
const history = await build.readTurnHistory(run); assert.equal(history.length, 2);
// Bind every prior artifact to the independently audited turn-1 result, not a newly accepted manifest.
assert.equal(history[0].digest, "d740dc624fb943648adf2de629f63243ee8da2b3d5966a04b2bfae7fdc967645");
const result = history[1], processResult = await load(join(turn, "process.json")), rawResult = await readFile(join(turn, "result.json"));
assert.equal(result.digest, hash(rawResult)); assert.equal(result.complete, true); assert.equal(result.turn, 2);
assert.equal(result.taskKind, "full-journey"); assert.equal(result.requestedStop, 2);
assert.equal(result.timedOut, false); assert.equal(result.interruptedBy, null); assert.ok(!result.error && !result.captureError); assert.deepEqual(result.errors, []);
assert.equal(processResult.code, 0); assert.equal(processResult.timedOut, false);
for (const key of ["interruptedBy", "spawnError", "logError"]) assert.equal(processResult[key], null);
assert.equal(processResult.durationMs, result.durationMs);
assert.deepEqual(processResult.args, build.buildCodexArgs({ model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId: history[0].sessionId }));
assert.deepEqual(await readFile(join(turn, "prompt.md")), await readFile(join(inputs, "prompts/turn2.md")));
const startedRecord = await load(join(turn, "started.json")); assert.equal(startedRecord.inputDigest, manifest.digest); assert.equal(startedRecord.requestedStop, 2);
const stream = (await readFile(join(turn, "stream.jsonl"))).toString(), summary = codex.summariseCodex(stream, processResult.code), terminal = codex.finalCodexMessage(stream, processResult.code);
const events = stream.trim().split("\n").map(line => JSON.parse(line));
assert.equal(summary.failed, false); assert.equal(summary.sessionId, result.sessionId); assert.deepEqual(summary.usage, result.usage); assert.deepEqual(summary.commands, result.commands);
assert.equal((await readFile(join(turn, "reply.md"))).toString(), summary.reply + "\n");
const snapshot = await load(join(turn, "snapshot/manifest.json")), before = await load(join(turn, "before/manifest.json")), previous = await load(join(run, "turns/01/snapshot/manifest.json"));
assert.deepEqual(snapshot, result.snapshot); assert.deepEqual(before.files, previous.files); assert.deepEqual(previous, history[0].snapshot); assert.equal(result.sessionId, history[0].sessionId);
const observed = await build.inspectWorkspace(meta.work, source.snapshot);
assert.deepEqual(Object.fromEntries(Object.entries(observed.entries).map(([path, { bytes, ...entry }]) => [path, entry])), snapshot.files);
assert.deepEqual(observed.excluded, snapshot.excluded); assert.deepEqual(observed.unexpected, snapshot.unexpected);
async function pathsAt(base, prefix = "") {
  const paths = [];
  for (const name of await readdir(join(base, prefix))) {
    const path = prefix ? prefix + "/" + name : name, stat = await lstat(join(base, path));
    assert.ok(!stat.isSymbolicLink(), "Unexpected symlink: " + path);
    if (stat.isDirectory()) paths.push(...await pathsAt(base, path)); else { assert.ok(stat.isFile(), path); paths.push(path); }
  }
  return paths.sort();
}
// Live source equality above uses frozen inspectWorkspace and retains every
// excluded/unexpected entry. Full-tree measurement eligibility is a separate gate.
assert.deepEqual(await pathsAt(join(run, "turns/01")), [...Object.keys(history[0].artifacts), "result.json"].sort());
assert.deepEqual(await pathsAt(turn), [...Object.keys(result.artifacts), "result.json"].sort());
for (const [path, row] of Object.entries(snapshot.files)) {
  const saved = await build.regularBytes(join(turn, "snapshot/files"), path), live = await build.regularBytes(meta.work, path);
  assert.equal(hash(saved), row.hash); assert.equal(saved.length, row.size); assert.deepEqual(saved, live);
}
for (const [path, row] of Object.entries(before.files)) { const bytes = await build.regularBytes(join(turn, "before/files"), path); assert.equal(hash(bytes), row.hash); assert.equal(bytes.length, row.size); }
const outerDirectory = join(directory, "candidate-2-turn-2"), outer = await load(join(outerDirectory, "result.json")), command = await load(join(outerDirectory, "command.json"));
const terminalToolFile = "candidate-2-turn-2-tool-poll-14.json";
assert.match(terminalToolFile, /^candidate-2-turn-2-tool-poll-[1-9]\d*\.json$/);
const toolPath = join(directory, terminalToolFile), tool = (await load(toolPath)).result;
assert.equal(tool.exit_code, 0); assert.equal(tool.session_id, undefined);
const printed = JSON.parse(tool.output); assert.equal(printed.output, outerDirectory); delete printed.output; assert.deepEqual(printed, outer);
assert.equal(outer.code, 0); assert.equal(outer.signal, null); assert.equal(outer.complete, true);
for (const key of ["childSpawned", "childExited", "childClosed"]) assert.equal(outer[key], true);
for (const key of ["interruptedBy", "signalSender", "childError"]) assert.equal(outer[key], null);
assert.equal(outer.signalForwarded, false); assert.equal(outer.forceAttempted, false);
assert.equal(command.cwd, root); assert.equal(command.executable, capabilities.node.executable);
assert.equal(command.recorderSha256, manifest.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: "/var/tmp/storyfolio-entry-runtime-20261012", NEXT_TELEMETRY_DISABLED: null });
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await readFile(join(outerDirectory, path))), digest);
const lifecycle = (await readFile(join(outerDirectory, "lifecycle.jsonl"))).toString().trim().split("\n").map(line => JSON.parse(line));
assert.deepEqual(lifecycle.map(row => row.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
assert.equal(lifecycle[0].recorderPid, outer.recorderPid); assert.equal(command.recorderPid, outer.recorderPid);
for (const row of lifecycle.slice(1)) assert.equal(row.childPid, outer.childPid);
const recordedGate = await load(join(turn, "gate.json"));
const recordedPlan = build.planTurn({ turn: 2, source, history: history.slice(0, 1), gate: recordedGate });
assert.equal(startedRecord.timeoutMs, recordedPlan.timeoutMs); assert.equal(startedRecord.sessionId, history[0].sessionId);
const usage = result.usage;
for (const item of history) {
  for (const value of [item.durationMs, item.usage.input_tokens, item.usage.cached_input_tokens, item.usage.output_tokens]) assert.ok(Number.isSafeInteger(value) && value >= 0);
  assert.ok(item.usage.cached_input_tokens <= item.usage.input_tokens);
}
const cumulativeDurationMs = history.reduce((sum, item) => sum + item.durationMs, 0);
const tokens = history.reduce((sum, item) => sum + item.usage.input_tokens + item.usage.output_tokens, 0);
const uncached = history.reduce((sum, item) => sum + item.usage.input_tokens - item.usage.cached_input_tokens + item.usage.output_tokens, 0);
assert.ok([tokens, uncached, cumulativeDurationMs].every(Number.isSafeInteger));
assert.ok(cumulativeDurationMs < source.bounds.maxWallMs && tokens < source.bounds.maxTokens && uncached < source.bounds.maxUncachedTokens);
assert.ok(result.durationMs <= startedRecord.timeoutMs);
const initial = await load(join(run, "setup/snapshot/manifest.json"));
for (const [path, row] of Object.entries(initial.files)) assert.deepEqual(snapshot.files[path], row, "Initial input altered: " + path);
console.log(json({ schemaVersion: 1, verified: true, started, finished: new Date().toISOString(), cohort, inputDigest: manifest.digest,
  frozenInputs: Object.keys(manifest.hashes).length, turn: 2, complete: true, requestedStop: 2, sessionId: result.sessionId,
  sourceFiles: Object.keys(snapshot.files).length, beforeSourceFiles: Object.keys(before.files).length, liveEqualsSnapshot: true, artifactHashes: Object.keys(result.artifacts).length,
  exclusions: snapshot.excluded, unexpected: snapshot.unexpected, resultSha256: result.digest, usage, actorDurationMs: result.durationMs, cumulativeDurationMs, priorTurn: { resultSha256: history[0].digest, artifacts: Object.keys(history[0].artifacts).length, sourceFiles: Object.keys(history[0].snapshot.files).length },
  budget: { reportedInputPlusOutput: tokens, uncachedInputPlusOutput: uncached, bounds: source.bounds, nextTimeoutMs: Math.min(source.bounds.turnTimeoutMs, source.bounds.maxWallMs - cumulativeDurationMs) },
  closure: { process: processResult.code, outerCode: outer.code, outerFinished: outer.finished, outerDurationMs: outer.durationMs, interruptedBy: outer.interruptedBy, timedOut: processResult.timedOut },
  terminal: { eventId: events.at(-2).item.id, text: terminal, sha256: hash(terminal), streamEvents: events.length },
  changedSource: snapshot.changes, commands: result.commands.map(command => ({ command: command.command, exitCode: command.exitCode })),
  hashes: { self: hash(await readFile(fileURLToPath(import.meta.url))), tool: hash(await readFile(toolPath)), outerResult: hash(await readFile(join(outerDirectory, "result.json"))), snapshot: hash(await readFile(join(turn, "snapshot/manifest.json"))), stream: result.artifacts["stream.jsonl"] },
  limits: "Common integrity/lifecycle/session/usage checks only. No authored-application assessment, measurement eligibility, advance:true gate or turn3 authorization is created. No actor preflight, recommendation, technical/visual acceptance or process absence is inferred. Root owns the actual saved-source behavior review and separate measurement-gate decision. The frozen generated-tree source policy remains unchanged; excluded and unexpected entries are retained, not silently accepted as measurement eligibility. Counters are sums of reported turns and may overlap on resume. No subprocess/model/browser was launched." }));
