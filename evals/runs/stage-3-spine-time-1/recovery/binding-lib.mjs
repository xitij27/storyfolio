// Stop-2, stop-4 and stop-6 bindings of recovered turns. The failed turn-2, turn-4 and turn-6 results stay failed; nothing here promotes them.
import assert from "node:assert/strict";
import { readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { SOURCE_EXCLUSIONS } from "../../../lib/build-capture.mjs";
import { sourceEntryExcluded } from "../../../lib/source-scope.mjs";
import { validateTargets, units } from "../../stage-3-completion-2/full-journey-measurement/measurement-lib.mjs";
import { root, hash, json, safePath, verifyInputs, writeNew, captureSource, regularBytes, inventory, assertSupervisor, implementationPaths, transitivePaths } from "../../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";
export { root, hash, json, safePath, writeNew, captureSource, regularBytes, inventory, assertSupervisor };
export const study = "evals/runs/stage-3-spine-time-1";
export const run = "evals/runs/codex-full-journey-timing-1/full-journey-1/baseline-1";
export const turn2ResultSha256 = "7a7cbf72ccf7963cc665961a486af11b8c49b44f7ea755db217a6ec3f5ac63b6";
export const turn4ResultSha256 = "434c0cdf7bdda2bdcbe42589fbb57ebc0d26deda0a0afc821cf1bba8976987b7";
export const turn6ResultSha256 = "57bf4dac9a0505f99886041aab9d55e9688c70206cbd4479294677d04c3926b9";
const captureError = "Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst";
const transportError = "AssertionError [ERR_ASSERTION]: Transport fallback after the agent's first action is not covered";
const reconnect = /^Reconnecting\.\.\. \d+\/\d+ \(stream disconnected before completion: .+\)$/;
// Each recovered turn: its failed result, how it failed, the turn it resumed, how it was launched and where its source is.
// Turns 2 and 4 failed capture and are measured from post-closure archives; turn 6 failed only the transport rule as first
// written and has its own closure-time snapshot. Turn 6 builds into .next through the agent's own STORYFOLIO_DIST_DIR (author, 21 October).
const capturedLater = actor => { assert.equal(actor.captureError, captureError); assert.equal(actor.snapshot, undefined); assert.deepEqual(actor.errors, []); };
const recoveries = {
  "recovered-concepts-measurement": { turn: 2, resultSha256: turn2ResultSha256, turnPath: `${run}/turns/02`, runner: "evals/codex-build-run.mjs", archive: `${study}/source-recovery-1`, failure: capturedLater },
  "recovered-looks-measurement": { turn: 4, resultSha256: turn4ResultSha256, turnPath: `${study}/recovery/continuation/turns/04`, runner: `${study}/recovery/continue.mjs`, archive: `${study}/recovery/source-recovery-4`, failure: capturedLater,
    previous: { path: `${study}/recovery/continuation/turns/03`, complete: true }, launch: { continuation: `${study}/recovery/continuation.json`, gate: `${study}/recovery/gate-after-3.json` } },
  "recovered-final-measurement": { turn: 6, resultSha256: turn6ResultSha256, turnPath: `${study}/recovery/continuation-3/turns/06`, runner: `${study}/recovery/continue-3.mjs`, environment: { STORYFOLIO_DIST_DIR: ".next" },
    failure: actor => { assert.equal(actor.error, transportError); assert.equal(actor.captureError, undefined); assert.ok(actor.snapshot); assert.ok(actor.errors.length && actor.errors.every(error => error.type === "error" && reconnect.test(error.message))); },
    previous: { path: `${study}/recovery/continuation-2/turns/05`, complete: false }, launch: { continuation: `${study}/recovery/continuation-3.json`, gate: `${study}/recovery/gate-after-5.json` } },
};
export const isRecovered = kind => Object.hasOwn(recoveries, kind);
export const excluded = "site/.next-concepts";
const archiveBasis = "post-closure archive of the live actor workspace, not the missing closure-time snapshot";
const snapshotBasis = "closure-time snapshot of the actor workspace, taken by the continuation runner's exact capture";
async function bound(reference) {
  safePath(reference.path); assert.ok(reference.path.startsWith("evals/runs/")); assert.match(reference.sha256, /^[a-f0-9]{64}$/);
  const bytes = await regularBytes(root, reference.path); assert.equal(hash(bytes), reference.sha256, `Bound bytes changed: ${reference.path}`); return JSON.parse(bytes);
}
// Same walk and record order as recover-source.mjs: original exclusions plus exactly site/.next-concepts.
export async function liveFiles(work, prefix = "") {
  const files = [];
  for (const entry of (await readdir(join(work, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Source symlink: ${path}`);
    if (path === excluded || await sourceEntryExcluded(work, path, entry)) continue;
    if (entry.isDirectory()) files.push(...await liveFiles(work, path));
    else { assert.ok(entry.isFile(), `Unsupported source entry: ${path}`); const bytes = await regularBytes(work, path); files.push({ path, bytes: bytes.length, sha256: hash(bytes) }); }
  }
  return files;
}
export async function loadBinding(path, { liveOriginal = true } = {}) {
  const absolute = resolve(path); assert.ok(absolute.startsWith(join(root, study, "recovery") + "/"));
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), record = JSON.parse(bytes);
  assert.equal(record.schemaVersion, 1); assert.ok(isRecovered(record.kind)); const spec = recoveries[record.kind]; assert.equal(record.turn, spec.turn);
  assert.equal(record.actorResultSha256, spec.resultSha256);
  const runPath = join(root, run), metaBytes = await regularBytes(runPath, "meta.json"), meta = JSON.parse(metaBytes);
  assert.equal(hash(metaBytes), record.metaSha256); assert.equal(meta.cohort, "codex-full-journey-timing-1"); assert.equal(meta.caseId, "full-journey-1");
  assert.equal(meta.taskKind, "full-journey"); assert.deepEqual(meta.requestedStops, [1, 2, 3, 4, 5, 6]);
  const frozen = await verifyInputs(meta.inputs); assert.equal(Object.keys(frozen.hashes).length, 149);
  assert.equal(frozen.digest, record.inputDigest); assert.equal(meta.inputDigest, frozen.digest);
  const helperHashes = {};
  for (const relative of [...implementationPaths, ...transitivePaths]) { const digest = hash(await regularBytes(root, relative)); assert.equal(digest, frozen.hashes[`implementation/${relative}`], `Coordinator code not frozen: ${relative}`); helperHashes[relative] = digest; }
  const policyPath = "evals/runs/stage-3-completion-2/full-journey-measurement/policy.json", policyBytes = await regularBytes(root, policyPath);
  assert.equal(hash(policyBytes), frozen.hashes["expectations.json"]); const policy = JSON.parse(policyBytes);
  // Turn 1 is an ordinary complete turn of the same session.
  const first = JSON.parse(await regularBytes(join(runPath, "turns/01"), "result.json"));
  assert.equal(first.complete, true); assert.equal(first.turn, 1); assert.ok(first.sessionId);
  // The recovered turn completed natively; only the runner's own check after it failed.
  const turn = join(root, spec.turnPath), actorBytes = await regularBytes(turn, "result.json"), actor = JSON.parse(actorBytes);
  assert.equal(hash(actorBytes), spec.resultSha256); assert.equal(actor.turn, spec.turn); assert.equal(actor.requestedStop, spec.turn); assert.equal(actor.taskKind, "full-journey");
  assert.equal(actor.complete, false); spec.failure(actor);
  assert.equal(actor.timedOut, false); assert.equal(actor.interruptedBy, null); assert.equal(actor.sessionId, first.sessionId);
  const artifacts = (await inventory(turn)).filter(file => file.path !== "result.json");
  assert.deepEqual(Object.fromEntries(artifacts.map(file => [file.path, file.sha256])), actor.artifacts, `Original turn-${spec.turn} artifact set changed`);
  if (spec.previous) {
    // The continuation turn this one resumed: turn 3 complete, turn 5 counted under the transport rule.
    const previousBytes = await regularBytes(join(root, spec.previous.path), "result.json"), previous = JSON.parse(previousBytes);
    assert.equal(previous.complete, spec.previous.complete); assert.equal(previous.turn, spec.turn - 1); assert.equal(hash(previousBytes), actor.previousTurnDigest); assert.equal(previous.sessionId, first.sessionId);
  }
  const stream = (await regularBytes(turn, "stream.jsonl")).toString().trim().split("\n"), last = JSON.parse(stream.at(-1)), terminal = JSON.parse(stream.at(-2));
  assert.equal(last.type, "turn.completed"); assert.deepEqual(last.usage, actor.usage);
  if (spec.turn === 6) { assert.equal(terminal.item?.type, "agent_message"); assert.ok((await regularBytes(turn, "reply.md")).toString().endsWith(terminal.item.text + "\n")); }
  // The outer recorder closed normally with the runner's failure, not a signal or timeout.
  const processRecord = await bound(record.processRecord), processDirectory = dirname(record.processRecord.path), raw = {};
  for (const name of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) { raw[name] = await regularBytes(root, `${processDirectory}/${name}`); assert.equal(hash(raw[name]), processRecord.rawArtifacts?.[name]); }
  assert.equal(processRecord.code, 1); assert.equal(processRecord.status, "child-exited-unsuccessfully"); assert.equal(processRecord.childClosed, true);
  for (const field of ["signal", "interruptedBy", "signalSender", "childError"]) assert.equal(processRecord[field], null);
  const actorCommand = JSON.parse(raw["command.json"]), flags = actorCommand.args.slice(1);
  assert.equal(actorCommand.cwd, root); assert.equal(actorCommand.args[0], spec.runner);
  assert.equal(actorCommand.recorderSha256, helperHashes["evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
  const actorFlags = Object.fromEntries(Array.from({ length: flags.length / 2 }, (_, index) => [flags[index * 2], flags[index * 2 + 1]]));
  assert.equal(actorFlags["--turn"], String(spec.turn));
  if (spec.turn === 2) { assert.equal(actorFlags["--cohort"], meta.cohort); assert.equal(hash(await regularBytes(root, actorFlags["--case"])), frozen.hashes["case.json"]); }
  else {
    assert.equal(actorFlags["--continuation"], spec.launch.continuation); assert.equal(actorFlags["--continuation-sha256"], actor.continuationSha256);
    assert.equal(actorFlags["--gate"], spec.launch.gate); assert.equal(actorFlags["--gate-sha256"], actor.gateSha256);
    assert.equal(hash(await regularBytes(root, actorFlags["--gate"])), actor.gateSha256);
  }
  // The source: a post-closure archive or the turn's own snapshot, complete authored source verified byte for byte.
  const archive = join(root, spec.archive ?? `${spec.turnPath}/snapshot`), originalSource = JSON.parse(await regularBytes(archive, "source.json"));
  if (spec.archive) {
    const recovery = JSON.parse(await regularBytes(archive, "result.json"));
    assert.equal(recovery.kind, "post-closure-source-archive"); assert.equal(recovery.turn ?? 2, spec.turn); assert.equal(recovery.originalResultSha256, spec.resultSha256); assert.equal(recovery.originalInputDigest, frozen.digest);
    assert.equal(recovery.exactAdditionalExclusion, excluded); assert.equal(recovery.modelCalls, 0); assert.equal(recovery.originalFilesModified, false); assert.equal(recovery.sourceUnchangedDuringArchive, true);
    assert.equal(recovery.sourceDigest, originalSource.digest);
  } else assert.equal(actor.sourceDigest, originalSource.digest);
  assert.equal(originalSource.digest, hash(JSON.stringify(originalSource.files)));
  const recoveryFilesRoot = join(archive, "files"), archived = await inventory(recoveryFilesRoot);
  assert.deepEqual(archived.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 })), originalSource.files, "Archive differs from its manifest");
  // What captureSource yields on an exact reconstruction, which has no .next-concepts directory.
  const restored = { files: originalSource.files, digest: originalSource.digest, exclusions: SOURCE_EXCLUSIONS };
  const targets = await bound(record.targets);
  assert.deepEqual(validateTargets(targets), []); assert.equal(targets.stage, spec.turn); assert.equal(targets.draft, undefined, "Unapproved targets draft is not executable");
  assert.equal(targets.applicationRoot, "site"); assert.equal(targets.sourceDigest, originalSource.digest); assert.equal(targets.actorResultSha256, spec.resultSha256);
  for (const source of targets.discovery.sources) assert.equal(originalSource.files.find(file => file.path === source.path)?.sha256, source.sha256, `Target source not in archive: ${source.path}`);
  if (liveOriginal) { assert.equal(await realpath(meta.work), meta.work); assert.deepEqual(await liveFiles(meta.work), originalSource.files, "Live actor workspace differs from the archive"); }
  const capabilities = JSON.parse(await regularBytes(meta.inputs, "capabilities.json")), runtime = await bound(record.runtime);
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  assert.ok(typeof runtime.TMPDIR === "string" && runtime.TMPDIR.startsWith("/var/tmp/")); assert.equal(await realpath(runtime.TMPDIR), runtime.TMPDIR);
  assert.equal(actorCommand.executable, capabilities.node.executable); assert.deepEqual(actorCommand.environment, { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null });
  const installContract = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null } };
  safePath(record.output); assert.ok(record.output.startsWith(study + "/recovery/")); const output = join(root, record.output);
  for (const protectedRoot of [meta.work, meta.inputs, archive, runPath]) assert.ok(output !== protectedRoot && !output.startsWith(protectedRoot + "/"), "Measurement output overlaps protected evidence/source");
  return { record, workPrefix: `journey-recovery-time-${spec.turn}-`, bindingPath: absolute, bindingSha256: hash(bytes), run: runPath, turn, meta, frozen, helperHashes, policy, actor, originalSource, restored, recoveryFilesRoot, sourceBasis: spec.archive ? archiveBasis : snapshotBasis, targets, capabilities, runtime, installContract, output,
    environment: { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1", ...spec.environment }, units: units(spec.turn) };
}
export async function loadPrepared(binding, { currentSource = true } = {}) {
  const setup = join(binding.output, "setup"), preparation = JSON.parse(await regularBytes(setup, "reconstruction.json"));
  assert.equal(preparation.bindingSha256, binding.bindingSha256); assert.deepEqual(preparation.helperHashes, binding.helperHashes);
  assert.equal(dirname(preparation.work), join(binding.runtime.TMPDIR, "storyfolio-evals")); assert.match(preparation.work.split("/").at(-1), new RegExp(`^${binding.workPrefix}[A-Za-z0-9]+$`));
  assert.equal(await realpath(preparation.work), preparation.work); assert.notEqual(preparation.work, binding.meta.work); assert.deepEqual(preparation.source, binding.restored);
  assert.deepEqual(JSON.parse(await regularBytes(setup, "targets.json")), binding.targets);
  if (currentSource) assert.deepEqual(await captureSource(preparation.work), binding.restored);
  return { setup, preparation, work: preparation.work, targets: binding.targets };
}
