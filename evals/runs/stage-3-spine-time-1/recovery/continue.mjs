#!/usr/bin/env node
// Root-only continuation of timing-proof turns 3 to 6 after the turn-2 capture failure. One paid turn per call; no retry, model switch or automatic advance.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { lstat, mkdir, readFile, readdir, realpath } from "node:fs/promises";
import { delimiter, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { buildCodexArgs, buildTaskIdentity, captureBuildWorkspace, hash, inspectBuildInputs, invokeBuildCodex, json, planTurn, readTurnHistory, regularBytes, safePath, validateCase, verifyBuildSetupProbe, verifyInputs, writeNew } from "../../../lib/build.mjs";
import { disabledSkills, EFFORT, finalCodexMessage, MODEL, summariseCodex } from "../../../lib/codex.mjs";
import { CAPTURE_POLICY, assertLiveSource, assertSourceRecord, filePaths, inspectCompleteSource, invocationOptions } from "../../stage-3-completion-2/full-journey-recovery/runner/execution-core.mjs";
import { loadBinding, root, study, turn2ResultSha256 } from "./binding-lib.mjs";

const records = source => Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
const bound = async reference => { safePath(reference.path); const bytes = await regularBytes(root, reference.path); assert.equal(hash(bytes), reference.sha256, `Bound bytes changed: ${reference.path}`); return JSON.parse(bytes); };
const pad = turn => String(turn).padStart(2, "0");

export async function loadContinuation(path) {
  const relative = resolve(path).slice(root.length + 1); assert.ok(relative.startsWith(`${study}/recovery/`));
  const bytes = await regularBytes(root, relative), record = JSON.parse(bytes);
  assert.equal(record.schemaVersion, 1); assert.equal(record.kind, "timing-proof-continuation"); assert.deepEqual(record.allowedTurns, [3, 4, 5, 6]);
  const measurement = await bound(record.binding);
  const binding = await loadBinding(join(root, record.binding.path), { liveOriginal: false });
  assert.equal(binding.bindingSha256, record.binding.sha256); assert.equal(measurement.kind, "recovered-concepts-measurement");
  // The author's 21 October decision removes only the reported-token ceiling, prospectively.
  assert.equal(hash(await regularBytes(root, record.boundsVariance.decision.path)), record.boundsVariance.decision.sha256, "Decision record changed"); assert.equal(record.boundsVariance.maxTokens, "removed");
  const original = validateCase(await readJson(binding.meta.inputs, "case.json"));
  const caseSource = validateCase({ ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER } });
  assert.equal(caseSource.bounds.turnTimeoutMs, 1800000); assert.equal(caseSource.bounds.maxWallMs, 5400000); assert.equal(caseSource.bounds.maxUncachedTokens, 1500000);
  // The generated cache moved out of the live workspace before turn 3, preserved byte for byte.
  const relocation = await bound(record.cacheRelocation.manifest);
  assert.equal(relocation.from, join(binding.meta.work, "site/.next-concepts")); assert.ok(relocation.to.startsWith(binding.runtime.TMPDIR + "/") && !relocation.to.startsWith(binding.meta.work + "/"));
  for (const [name, digest] of Object.entries(record.helperHashes)) assert.equal(hash(await regularBytes(root, name)), digest, `Continuation helper changed: ${name}`);
  safePath(record.output); assert.ok(record.output.startsWith(`${study}/recovery/`));
  return { ...binding, continuation: record, continuationSha256: hash(bytes), caseSource, originalCase: original, output: join(root, record.output), sessionId: binding.actor.sessionId };
}

async function assertSnapshotCopy(location, snapshot, source) {
  assert.deepEqual(snapshot.files, records(source));
  assert.deepEqual((await filePaths(join(location, "snapshot/files"))).sort(), Object.keys(snapshot.files).sort());
  for (const [path, row] of Object.entries(snapshot.files)) { const bytes = await regularBytes(join(location, "snapshot/files"), path); assert.equal(hash(bytes), row.hash); assert.equal(bytes.length, row.size); }
}
async function captureComplete(work, location, beforeFiles) {
  const source = await inspectCompleteSource(work, CAPTURE_POLICY);
  const snapshot = await captureBuildWorkspace(work, location, CAPTURE_POLICY, beforeFiles);
  assert.deepEqual(snapshot.files, records(source), "Source changed while snapshotting");
  await assertLiveSource(work, source, CAPTURE_POLICY); await writeNew(join(location, "source.json"), json(source));
  return { snapshot, source };
}

// Turn 2 counts with its real duration and usage. Its failure was capture-only, verified by loadBinding; result.json on disk stays complete:false.
export async function readHistory(binding) {
  const original = await readTurnHistory(binding.run);
  assert.equal(original.length, 2); assert.equal(original[0].complete, true); assert.equal(original[1].digest, turn2ResultSha256); assert.equal(original[1].complete, false);
  const history = [original[0], { ...original[1], complete: true, nativeCompletionOnly: true }];
  const turns = join(binding.output, "turns"), names = (await readdir(turns).catch(error => { if (error.code === "ENOENT") return []; throw error; })).sort();
  for (const [index, name] of names.entries()) {
    const turn = index + 3, location = join(turns, name); assert.ok(turn <= 6 && name === pad(turn), "Unexpected or noncontiguous continuation turn");
    const raw = await regularBytes(location, "result.json").catch(error => { throw new Error(`Incomplete continuation turn is preserved: ${name}: ${error}`); });
    const result = JSON.parse(raw);
    assert.equal(result.turn, turn); assert.equal(result.continuationSha256, binding.continuationSha256); assert.equal(result.previousTurnDigest, history.at(-1).digest); assert.equal(result.sessionId, binding.sessionId);
    assert.deepEqual((await filePaths(location)).sort(), [...Object.keys(result.artifacts), "result.json"].sort());
    for (const [path, digest] of Object.entries(result.artifacts)) assert.equal(hash(await regularBytes(location, path)), digest, `Changed continuation artifact: ${path}`);
    assert.equal(result.complete, true, "Failed continuation turn is preserved; no retry");
    const source = await readJson(location, "snapshot/source.json"); assertSourceRecord(source); assert.equal(result.sourceDigest, source.digest);
    await assertSnapshotCopy(location, await readJson(location, "snapshot/manifest.json"), source);
    history.push({ ...result, digest: hash(raw) });
  }
  return history;
}

export async function planContinuation(binding, turn, gate, gateSha256) {
  assert.ok(binding.continuation.allowedTurns.includes(turn));
  assert.deepEqual(await verifyInputs(binding.meta.inputs), binding.frozen, "Original frozen inputs changed");
  const history = await readHistory(binding); assert.ok(history.every(item => item.sessionId === binding.sessionId), "Session changed");
  const limits = planTurn({ turn, source: binding.caseSource, history, gate });
  assert.equal(gate.continuationSha256, binding.continuationSha256); assert.match(gateSha256, /^[a-f0-9]{64}$/);
  const expectedSource = turn === 3 ? binding.restored : await readJson(join(binding.output, "turns", pad(turn - 1)), "snapshot/source.json");
  assert.equal(gate.sourceDigest, expectedSource.digest, "Gate source mismatch");
  await assertLiveSource(binding.meta.work, expectedSource, CAPTURE_POLICY);
  return { history, limits, expectedSource };
}

export async function executeContinuation({ binding, turn, gate, gateBytes, invoke = invokeBuildCodex, revalidate = async () => {} }) {
  const { history, limits, expectedSource } = await planContinuation(binding, turn, gate, hash(gateBytes));
  await revalidate();
  await mkdir(join(binding.output, "turns"), { recursive: true });
  const location = join(binding.output, "turns", pad(turn)); await mkdir(location);
  const prompt = await regularBytes(binding.meta.inputs, `prompts/turn${turn}.md`);
  await writeNew(join(location, "prompt.md"), prompt); await writeNew(join(location, "gate.json"), gateBytes);
  const identity = { inputDigest: binding.frozen.digest, continuationSha256: binding.continuationSha256, previousTurnDigest: history.at(-1).digest, gateSha256: hash(gateBytes),
    sourceBasis: { kind: turn === 3 ? "post-closure-archive" : "previous-continuation-snapshot", sourceDigest: expectedSource.digest } };
  await writeNew(join(location, "started.json"), json({ turn, started: new Date().toISOString(), ...limits, ...identity, capturePolicy: CAPTURE_POLICY, boundsVariance: "reported-token ceiling removed by the author on 21 October; time and uncached ceilings unchanged" }));
  const result = { turn, ...buildTaskIdentity(binding.caseSource, turn), ...identity, complete: false, durationMs: 0, sessionId: limits.sessionId, usage: null, artifacts: {},
    completionMeaning: "The actor turn completed under the declared timing-proof continuation. This is not a passed build, reached stop or author approval." };
  try {
    const before = await captureComplete(binding.meta.work, join(location, "before"), records(expectedSource)); assert.deepEqual(before.source, expectedSource);
    await revalidate(); await assertLiveSource(binding.meta.work, expectedSource, CAPTURE_POLICY);
    const processRecord = await invoke({ cwd: binding.meta.work, prompt: prompt.toString("utf8"), streamPath: join(location, "stream.jsonl"), stderrPath: join(location, "stderr.log"), timeoutMs: limits.timeoutMs, ...invocationOptions(binding.capabilities, limits.sessionId) });
    await writeNew(join(location, "process.json"), json({ ...processRecord, stdout: undefined, stderr: undefined }));
    const summary = summariseCodex(processRecord.stdout, processRecord.code);
    await writeNew(join(location, "reply.md"), summary.reply + "\n");
    Object.assign(result, { sessionId: summary.sessionId ?? limits.sessionId, usage: summary.usage, durationMs: processRecord.durationMs, commands: summary.commands, errors: summary.error, timedOut: processRecord.timedOut ?? false, interruptedBy: processRecord.interruptedBy ?? null });
    assert.equal(summary.failed, false); assert.equal(result.sessionId, binding.sessionId);
    assert.ok(!processRecord.timedOut && !processRecord.interruptedBy && !processRecord.spawnError && !processRecord.logError);
    await writeNew(join(location, "final.md"), finalCodexMessage(processRecord.stdout, processRecord.code) + "\n");
    for (const key of ["input_tokens", "output_tokens", "cached_input_tokens"]) assert.ok(Number.isSafeInteger(result.usage?.[key]) && result.usage[key] >= 0, "Missing reliable usage");
    assert.ok(result.usage.cached_input_tokens <= result.usage.input_tokens);
    result.complete = true;
  } catch (error) { result.error = String(error); }
  try {
    const captured = await captureComplete(binding.meta.work, join(location, "snapshot"), records(expectedSource));
    result.snapshot = captured.snapshot; result.sourceDigest = captured.source.digest;
    assert.deepEqual(await verifyInputs(binding.meta.inputs), binding.frozen); await revalidate();
  } catch (error) { result.complete = false; result.captureError = String(error); }
  for (const path of await filePaths(location)) result.artifacts[path] = hash(await regularBytes(location, path));
  await writeNew(join(location, "result.json"), json(result));
  return { ...result, location };
}

async function checkedBinding(path, sha256) {
  const binding = await loadContinuation(path); assert.equal(binding.continuationSha256, sha256);
  const caps = binding.capabilities;
  assert.equal(caps.model, MODEL); assert.equal(caps.reasoningEffort, EFFORT);
  assert.deepEqual(Object.fromEntries(Object.keys(caps.environment).map(key => [key, process.env[key] ?? null])), caps.environment);
  assert.equal(process.env.TMPDIR, binding.runtime.TMPDIR); assert.equal(process.env.NEXT_TELEMETRY_DISABLED ?? null, null);
  assert.deepEqual(await disabledSkills(), caps.disabledSkills);
  let cli; for (const entry of (process.env.PATH ?? "").split(delimiter)) { try { cli = await realpath(join(entry, "codex")); break; } catch {} }
  assert.equal(cli, caps.cliExecutable); assert.equal(hash(await readFile(cli)), caps.cliSha256);
  assert.equal(execFileSync(cli, ["--version"], { encoding: "utf8", timeout: 30000 }).trim(), caps.cliVersion);
  assert.deepEqual(buildCodexArgs({ model: caps.model, disabled: caps.disabledSkills, config: caps.config, profile: caps.profile, permissionProfile: caps.permissionProfile, removeConfig: caps.removeConfig }), caps.argv);
  assert.equal((await inspectBuildInputs({ root, casePath: binding.frozen.casePath, capabilities: caps })).digest, binding.frozen.digest, "Current inputs differ from the freeze");
  await verifyBuildSetupProbe({ source: binding.originalCase, manifest: binding.frozen, setup: join(binding.run, "setup"), work: binding.meta.work });
  return binding;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values: args } = parseArgs({ options: { continuation: { type: "string" }, "continuation-sha256": { type: "string" }, gate: { type: "string" }, "gate-sha256": { type: "string" }, turn: { type: "string" }, dry: { type: "boolean", default: false } } });
  assert.ok(["3", "4", "5", "6"].includes(args.turn), "Select exactly one remaining turn 3..6");
  for (const key of ["continuation", "gate"]) { safePath(args[key]); assert.ok(args[key].startsWith(`${study}/recovery/`)); }
  const gateBytes = await regularBytes(root, args.gate); assert.equal(hash(gateBytes), args["gate-sha256"]);
  const gate = JSON.parse(gateBytes); assert.equal(gate.reviewedByRoot, true);
  assert.ok(gate.evidence && Object.keys(gate.evidence).length > 0, "A real observed gate needs source-bound evidence");
  for (const [path, sha256] of Object.entries(gate.evidence)) { safePath(path); assert.equal(hash(await regularBytes(root, path)), sha256, `Gate evidence changed: ${path}`); }
  const revalidate = () => checkedBinding(args.continuation, args["continuation-sha256"]), binding = await revalidate();
  if (args.dry) {
    const planned = await planContinuation(binding, Number(args.turn), gate, hash(gateBytes));
    console.log(json({ mode: "dry", turn: Number(args.turn), modelCalls: 0, writes: false, limits: planned.limits, sourceDigest: planned.expectedSource.digest, sessionId: binding.sessionId }));
  } else {
    const result = await executeContinuation({ binding, turn: Number(args.turn), gate, gateBytes, revalidate });
    console.log(json({ complete: result.complete, turn: result.turn, sessionId: result.sessionId, durationMs: result.durationMs, usage: result.usage, result: join(result.location, "result.json"), error: result.error ?? result.captureError ?? null }));
    process.exitCode = result.complete ? 0 : 1;
  }
}
