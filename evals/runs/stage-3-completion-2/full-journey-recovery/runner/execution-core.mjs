// One explicitly amended continuation unit. Original runner and history stay immutable.
import assert from "node:assert/strict";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import { buildCodexArgs, buildTaskIdentity, captureBuildWorkspace, DEFAULT_SNAPSHOT, hash, inspectWorkspace, invokeBuildCodex, json, planTurn, readTurnHistory, regularBytes, safePath, validateCase, verifyInputs, writeNew } from "../../../../lib/build.mjs";
import { finalCodexMessage, summariseCodex } from "../../../../lib/codex.mjs";
import { captureSource } from "../../../../lib/build-capture.mjs";

export const CAPTURE_POLICY = Object.freeze({ ...DEFAULT_SNAPSHOT, roots: [...DEFAULT_SNAPSHOT.roots, "site"] });
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
const absent = async path => lstat(path).catch(error => { if (error.code === "ENOENT") return null; throw error; });
const records = source => Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));

export async function filePaths(directory, prefix = "") {
  const paths = [];
  for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Symlink artifact: ${path}`);
    if (entry.isDirectory()) paths.push(...await filePaths(directory, path));
    else { assert.ok(entry.isFile(), `Non-file artifact: ${path}`); paths.push(path); }
  }
  return paths;
}

export function assertSourceRecord(source) {
  assert.ok(Array.isArray(source.files));
  assert.equal(new Set(source.files.map(file => file.path)).size, source.files.length);
  for (const file of source.files) {
    safePath(file.path); assert.match(file.sha256, /^[a-f0-9]{64}$/);
    assert.ok(Number.isSafeInteger(file.bytes) && file.bytes >= 0);
  }
  assert.equal(source.digest, hash(JSON.stringify(source.files)), "Source manifest digest changed");
}

// inspectWorkspace retains the old bounded allowlist behavior. Unknown payloads
// block before captureSource can hash them; empty directories carry no source bytes.
export async function inspectCompleteSource(work, policy = CAPTURE_POLICY) {
  assert.equal(await realpath(work), resolve(work), "Workspace root is not canonical");
  assert.ok((await lstat(work)).isDirectory() && !(await lstat(work)).isSymbolicLink());
  const inspected = await inspectWorkspace(work, policy);
  for (const item of inspected.unexpected) {
    assert.equal(item.type, "directory", `Unrecognized source: ${item.path}`);
    assert.deepEqual(await readdir(join(work, item.path)), [], `Unrecognized nonempty source: ${item.path}`);
  }
  const current = await captureSource(work); assertSourceRecord(current);
  const retained = Object.fromEntries(Object.entries(inspected.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
  assert.deepEqual(retained, records(current), "Capture policy does not cover the complete source tree");
  return current;
}

export async function assertLiveSource(work, expected, policy = CAPTURE_POLICY) {
  assertSourceRecord(expected);
  const current = await inspectCompleteSource(work, policy);
  assert.deepEqual(current, expected, "Live source differs from approved complete checkpoint");
  return current;
}

async function assertSnapshotCopy(location, snapshot, source) {
  assert.equal(snapshot.schemaVersion, 1); assert.deepEqual(snapshot.files, records(source));
  assert.deepEqual((await filePaths(join(location, "snapshot/files"))).sort(), Object.keys(snapshot.files).sort());
  for (const [path, row] of Object.entries(snapshot.files)) {
    const bytes = await regularBytes(join(location, "snapshot/files"), path);
    assert.equal(hash(bytes), row.hash); assert.equal(bytes.length, row.size);
  }
}

async function captureComplete(work, location, policy, beforeFiles) {
  const source = await inspectCompleteSource(work, policy);
  const snapshot = await captureBuildWorkspace(work, location, policy, beforeFiles);
  assert.deepEqual(snapshot.files, records(source), "Source changed while snapshotting");
  await assertLiveSource(work, source, policy);
  await writeNew(join(location, "source.json"), json(source));
  return { snapshot, source };
}

export async function readContinuationHistory(binding) {
  const { record, root, run, amendmentSha256, frozen } = binding;
  const original = await readTurnHistory(run);
  assert.equal(original.length, 2, "Original history must remain exactly the two completed turns");
  assert.deepEqual(original.map(item => item.digest), record.original.turns.map(item => item.result.sha256));
  const output = join(root, record.continuation.output), turns = join(output, "turns");
  if (await absent(output)) assert.equal(await realpath(output), resolve(output), "Continuation output is not canonical");
  if (await absent(turns)) assert.equal(await realpath(turns), resolve(turns), "Continuation turns directory is not canonical");
  const names = await readdir(turns).catch(error => { if (error.code === "ENOENT") return []; throw error; });
  names.sort(); const history = [...original];
  for (const [index, name] of names.entries()) {
    const turn = index + 3;
    assert.ok(turn <= 6 && name === String(turn).padStart(2, "0"), "Unexpected or noncontiguous amended turn directory");
    const location = join(turns, name);
    assert.equal(await realpath(location), resolve(location), "Amended turn directory is not canonical");
    const raw = await regularBytes(location, "result.json").catch(error => { throw new Error(`Incomplete amended turn is preserved: ${name}: ${error}`); });
    const result = JSON.parse(raw);
    assert.equal(result.turn, turn); assert.equal(result.requestedStop, turn); assert.equal(result.taskKind, "full-journey");
    assert.equal(result.inputDigest, frozen.digest); assert.equal(result.amendmentSha256, amendmentSha256);
    assert.equal(result.previousTurnDigest, history.at(-1).digest);
    assert.equal(result.sessionId, record.original.sessionId);
    assert.deepEqual((await filePaths(location)).sort(), [...Object.keys(result.artifacts), "result.json"].sort());
    for (const [path, digest] of Object.entries(result.artifacts)) assert.equal(hash(await regularBytes(location, path)), digest, `Changed amended artifact: ${path}`);
    for (const path of ["stream.jsonl", "reply.md", "final.md", "process.json", "gate.json", "started.json", "snapshot/source.json"]) assert.match(result.artifacts[path] ?? "", /^[a-f0-9]{64}$/, `Missing amended artifact: ${path}`);
    const snapshot = await readJson(location, "snapshot/manifest.json"), source = await readJson(location, "snapshot/source.json");
    assertSourceRecord(source); assert.deepEqual(snapshot, result.snapshot); assert.equal(result.sourceDigest, source.digest);
    await assertSnapshotCopy(location, snapshot, source);
    const started = await readJson(location, "started.json"), gate = await readJson(location, "gate.json");
    const expectedLimits = planTurn({ turn, source: binding.caseSource, history, gate });
    for (const [key, value] of Object.entries(expectedLimits)) assert.deepEqual(started[key], value);
    assert.equal(started.inputDigest, frozen.digest); assert.equal(started.amendmentSha256, amendmentSha256);
    assert.equal(started.gateSha256, hash(await regularBytes(location, "gate.json")));
    for (const key of ["inputDigest", "amendmentSha256", "previousTurnDigest", "gateSha256", "sourceBasis"]) assert.deepEqual(result[key], started[key]);
    assert.deepEqual(started.capturePolicy, CAPTURE_POLICY);
    const before = await readJson(location, "before/source.json");
    const expectedBefore = turn === 3 ? binding.source : await readJson(join(turns, String(turn - 1).padStart(2, "0")), "snapshot/source.json");
    assert.deepEqual(before, expectedBefore);
    assert.equal(started.sourceBasis.kind, turn === 3 ? "post-closure-recovery" : "previous-amended-snapshot");
    assert.equal(started.sourceBasis.sourceDigest, expectedBefore.digest);
    assert.equal(gate.amendmentSha256, amendmentSha256); assert.equal(gate.sourceDigest, expectedBefore.digest);
    assert.deepEqual(await regularBytes(location, "prompt.md"), await regularBytes(binding.meta.inputs, `prompts/turn${turn}.md`));
    const processRecord = await readJson(location, "process.json"), stream = (await regularBytes(location, "stream.jsonl")).toString("utf8");
    const summary = summariseCodex(stream, processRecord.code);
    assert.equal(result.complete, true, "Failed amended turn is preserved, no retry");
    assert.equal(summary.failed, false); assert.equal(summary.sessionId ?? record.original.sessionId, record.original.sessionId);
    assert.deepEqual(summary.usage, result.usage); assert.equal(processRecord.durationMs, result.durationMs);
    assert.deepEqual(processRecord.args, buildCodexArgs(invocationOptions(binding.capabilities, record.original.sessionId)));
    assert.equal((await regularBytes(location, "reply.md")).toString(), summary.reply + "\n");
    assert.equal((await regularBytes(location, "final.md")).toString(), finalCodexMessage(stream, processRecord.code) + "\n");
    assert.ok(!processRecord.timedOut && !processRecord.interruptedBy && !processRecord.spawnError && !processRecord.logError);
    history.push({ ...result, digest: hash(raw) });
  }
  return history;
}

export function invocationOptions(capabilities, sessionId) {
  return { model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId };
}

export async function planContinuation(binding, turn, gate, gateSha256) {
  assert.ok([3, 4, 5, 6].includes(turn), "Only remaining turns 3 to 6 are allowed");
  assert.deepEqual(binding.record.continuation.allowedTurns, [3, 4, 5, 6]);
  assert.equal(binding.record.continuation.recoveryAfterTurn, 2);
  assert.deepEqual(binding.record.continuation.snapshotPolicy, CAPTURE_POLICY);
  const frozen = await verifyInputs(binding.meta.inputs);
  assert.deepEqual(frozen, binding.frozen, "Original frozen inputs changed");
  const source = validateCase(await readJson(binding.meta.inputs, "case.json"));
  assert.deepEqual(source, binding.caseSource, "Original case changed");
  const history = await readContinuationHistory(binding);
  assert.ok(history.every(item => item.sessionId === binding.record.original.sessionId), "Session changed");
  const limits = planTurn({ turn, source, history, gate });
  assert.equal(gate.amendmentSha256, binding.amendmentSha256, "Gate amendment mismatch");
  assert.match(gateSha256, /^[a-f0-9]{64}$/);
  const output = join(binding.root, binding.record.continuation.output);
  const expectedSource = turn === 3 ? binding.source : await readJson(join(output, "turns", String(turn - 1).padStart(2, "0")), "snapshot/source.json");
  assert.equal(gate.sourceDigest, expectedSource.digest, "Gate source mismatch");
  await assertLiveSource(binding.meta.work, expectedSource);
  return { output, history, limits, expectedSource, source, gateSha256 };
}

export async function executeContinuation({ binding, turn, gate, gateBytes = Buffer.from(json(gate)), invoke = invokeBuildCodex, revalidate = async () => {} }) {
  assert.deepEqual(JSON.parse(gateBytes), gate);
  const state = await planContinuation(binding, turn, gate, hash(gateBytes));
  await revalidate();
  const { output, history, limits, expectedSource } = state;
  if (await absent(output)) assert.equal(await realpath(output), resolve(output));
  await mkdir(join(output, "turns"), { recursive: true });
  assert.equal(await realpath(join(output, "turns")), join(resolve(output), "turns"));
  const location = join(output, "turns", String(turn).padStart(2, "0")); await mkdir(location);
  const prompt = await regularBytes(binding.meta.inputs, `prompts/turn${turn}.md`);
  await writeNew(join(location, "prompt.md"), prompt); await writeNew(join(location, "gate.json"), gateBytes);
  const sourceBasis = { kind: turn === 3 ? "post-closure-recovery" : "previous-amended-snapshot", sourceDigest: expectedSource.digest,
    reference: turn === 3 ? binding.record.recovery.sourceManifest : { path: `${binding.record.continuation.output}/turns/${String(turn - 1).padStart(2, "0")}/snapshot/source.json`, sha256: hash(await regularBytes(join(output, "turns", String(turn - 1).padStart(2, "0")), "snapshot/source.json")) } };
  const identity = { inputDigest: binding.frozen.digest, amendmentSha256: binding.amendmentSha256, previousTurnDigest: history.at(-1).digest, gateSha256: hash(gateBytes), sourceBasis };
  await writeNew(join(location, "started.json"), json({ turn, started: new Date().toISOString(), ...limits, ...identity, capturePolicy: CAPTURE_POLICY }));
  const result = { turn, ...buildTaskIdentity(binding.caseSource, turn), ...identity, complete: false, durationMs: 0, sessionId: limits.sessionId, usage: null, artifacts: {},
    completionMeaning: "The actor turn completed under a labelled source-recovery amendment. This is not a passed build, reached stop, author approval or original closure-time source proof.",
    usageAggregation: "Original planTurn accounting includes both original turns and all amended turns. Resumed reported counters may overlap. No dollar estimate or hard in-flight token cap is inferred." };
  try {
    const before = await captureComplete(binding.meta.work, join(location, "before"), CAPTURE_POLICY, records(expectedSource));
    assert.deepEqual(before.source, expectedSource);
    await revalidate(); await assertLiveSource(binding.meta.work, expectedSource);
    const processRecord = await invoke({ cwd: binding.meta.work, prompt: prompt.toString("utf8"), streamPath: join(location, "stream.jsonl"), stderrPath: join(location, "stderr.log"), timeoutMs: limits.timeoutMs, ...invocationOptions(binding.capabilities, limits.sessionId) });
    await writeNew(join(location, "process.json"), json({ ...processRecord, stdout: undefined, stderr: undefined }));
    const summary = summariseCodex(processRecord.stdout, processRecord.code);
    await writeNew(join(location, "reply.md"), summary.reply + "\n");
    Object.assign(result, { sessionId: summary.sessionId ?? limits.sessionId, usage: summary.usage, durationMs: processRecord.durationMs, commands: summary.commands, errors: summary.error, timedOut: processRecord.timedOut ?? false, interruptedBy: processRecord.interruptedBy ?? null });
    assert.equal(summary.failed, false); assert.equal(result.sessionId, binding.record.original.sessionId);
    assert.ok(!processRecord.timedOut && !processRecord.interruptedBy && !processRecord.spawnError && !processRecord.logError);
    assert.deepEqual(processRecord.args, buildCodexArgs(invocationOptions(binding.capabilities, limits.sessionId)));
    await writeNew(join(location, "final.md"), finalCodexMessage(processRecord.stdout, processRecord.code) + "\n");
    // Validate this turn's accounting without increasing or resetting any bound.
    for (const key of ["input_tokens", "output_tokens", "cached_input_tokens"]) assert.ok(Number.isSafeInteger(result.usage?.[key]) && result.usage[key] >= 0, "Missing reliable usage");
    assert.ok(result.usage.cached_input_tokens <= result.usage.input_tokens);
    assert.ok(Number.isSafeInteger(result.durationMs) && result.durationMs >= 0);
    result.complete = true;
  } catch (error) { result.error = String(error); }
  try {
    const captured = await captureComplete(binding.meta.work, join(location, "snapshot"), CAPTURE_POLICY, records(expectedSource));
    result.snapshot = captured.snapshot; result.sourceDigest = captured.source.digest;
    assert.deepEqual(await verifyInputs(binding.meta.inputs), binding.frozen); await revalidate();
  } catch (error) { result.complete = false; result.captureError = String(error); }
  for (const path of await filePaths(location)) result.artifacts[path] = hash(await regularBytes(location, path));
  await writeNew(join(location, "result.json"), json(result));
  return { ...result, location };
}
