// Read-only common gates after root-confirmed turn-1 terminal closure.
// Uses frozen helpers. No semantic approval gate, subprocess or actor write.
import assert from "node:assert/strict";
import { lstat, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-closed"]);
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../.."), started = new Date().toISOString();
const cohort = "codex-full-journey-candidate-2", inputs = join(root, "evals/runs", cohort, "inputs"), run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1"), turn = join(run, "turns/01");
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
const history = await build.readTurnHistory(run); assert.equal(history.length, 1);
const result = history[0], processResult = await load(join(turn, "process.json")), rawResult = await readFile(join(turn, "result.json"));
assert.equal(result.digest, hash(rawResult)); assert.equal(result.complete, true); assert.equal(result.turn, 1);
assert.equal(result.taskKind, "full-journey"); assert.equal(result.requestedStop, 1);
assert.equal(result.timedOut, false); assert.equal(result.interruptedBy, null); assert.ok(!result.error && !result.captureError); assert.deepEqual(result.errors, []);
assert.equal(processResult.code, 0); assert.equal(processResult.timedOut, false);
for (const key of ["interruptedBy", "spawnError", "logError"]) assert.equal(processResult[key], null);
assert.equal(processResult.durationMs, result.durationMs);
assert.deepEqual(processResult.args, build.buildCodexArgs({ model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId: null }));
assert.deepEqual(await readFile(join(turn, "prompt.md")), await readFile(join(inputs, "prompts/turn1.md")));
const startedRecord = await load(join(turn, "started.json")); assert.equal(startedRecord.inputDigest, manifest.digest); assert.equal(startedRecord.requestedStop, 1);
const stream = (await readFile(join(turn, "stream.jsonl"))).toString(), summary = codex.summariseCodex(stream, processResult.code), terminal = codex.finalCodexMessage(stream, processResult.code);
const events = stream.trim().split("\n").map(line => JSON.parse(line));
assert.equal(summary.failed, false); assert.equal(summary.sessionId, result.sessionId); assert.deepEqual(summary.usage, result.usage); assert.deepEqual(summary.commands, result.commands);
assert.equal((await readFile(join(turn, "reply.md"))).toString(), summary.reply + "\n");
const snapshot = await load(join(turn, "snapshot/manifest.json")), before = await load(join(turn, "before/manifest.json")), initial = await load(join(run, "setup/snapshot/manifest.json"));
assert.deepEqual(snapshot, result.snapshot); assert.deepEqual(before.files, initial.files);
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
assert.deepEqual(await pathsAt(meta.work), Object.keys(snapshot.files).sort());
assert.deepEqual(await pathsAt(turn), [...Object.keys(result.artifacts), "result.json"].sort());
for (const [path, row] of Object.entries(snapshot.files)) {
  const saved = await build.regularBytes(join(turn, "snapshot/files"), path), live = await build.regularBytes(meta.work, path);
  assert.equal(hash(saved), row.hash); assert.equal(saved.length, row.size); assert.deepEqual(saved, live);
}
for (const [path, row] of Object.entries(before.files)) { const bytes = await build.regularBytes(join(turn, "before/files"), path); assert.equal(hash(bytes), row.hash); assert.equal(bytes.length, row.size); }
const outerDirectory = join(directory, "candidate-2-turn-1"), outer = await load(join(outerDirectory, "result.json")), command = await load(join(outerDirectory, "command.json"));
const toolPath = join(directory, "candidate-2-turn-1-tool-poll-5.json"), tool = (await load(toolPath)).result;
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
const usage = result.usage;
for (const value of [result.durationMs, usage.input_tokens, usage.cached_input_tokens, usage.output_tokens]) assert.ok(Number.isSafeInteger(value) && value >= 0);
assert.ok(usage.cached_input_tokens <= usage.input_tokens);
const tokens = usage.input_tokens + usage.output_tokens, uncached = usage.input_tokens - usage.cached_input_tokens + usage.output_tokens;
assert.ok(Number.isSafeInteger(tokens) && Number.isSafeInteger(uncached));
assert.ok(result.durationMs < source.bounds.maxWallMs && tokens < source.bounds.maxTokens && uncached < source.bounds.maxUncachedTokens);
assert.ok(result.durationMs <= startedRecord.timeoutMs);
console.log(json({ schemaVersion: 1, verified: true, started, finished: new Date().toISOString(), cohort, inputDigest: manifest.digest,
  frozenInputs: Object.keys(manifest.hashes).length, turn: 1, complete: true, requestedStop: 1, sessionId: result.sessionId,
  sourceFiles: Object.keys(snapshot.files).length, beforeSourceFiles: Object.keys(before.files).length, liveEqualsSnapshot: true, artifactHashes: Object.keys(result.artifacts).length,
  exclusions: snapshot.excluded, unexpected: snapshot.unexpected, resultSha256: result.digest, usage, actorDurationMs: result.durationMs,
  budget: { reportedInputPlusOutput: tokens, uncachedInputPlusOutput: uncached, bounds: source.bounds, nextTimeoutMs: Math.min(source.bounds.turnTimeoutMs, source.bounds.maxWallMs - result.durationMs) },
  closure: { process: processResult.code, outerCode: outer.code, outerFinished: outer.finished, outerDurationMs: outer.durationMs, interruptedBy: outer.interruptedBy, timedOut: processResult.timedOut },
  terminal: { eventId: events.at(-2).item.id, text: terminal, sha256: hash(terminal), streamEvents: events.length },
  changedSource: snapshot.changes, commands: result.commands.map(command => ({ command: command.command, exitCode: command.exitCode })),
  hashes: { self: hash(await readFile(fileURLToPath(import.meta.url))), tool: hash(await readFile(toolPath)), outerResult: hash(await readFile(join(outerDirectory, "result.json"))), snapshot: hash(await readFile(join(turn, "snapshot/manifest.json"))), stream: result.artifacts["stream.jsonl"] },
  limits: "Common integrity/lifecycle/session/usage gates only. No advance:true gate is created, and no semantic stop, actor preflight, recommendation, technical/visual acceptance or process absence is inferred. Root owns the actual behavior review and decision. No subprocess/model/browser was launched." }));
