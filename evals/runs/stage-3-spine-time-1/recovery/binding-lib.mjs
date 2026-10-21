// Stop-2 and stop-4 bindings of post-closure archives. The failed turn-2 and turn-4 results stay failed; nothing here promotes them.
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
// Each recovered turn: its failed result, where it lives, the runner that launched it and its archive.
const recoveries = {
  "recovered-concepts-measurement": { turn: 2, resultSha256: turn2ResultSha256, turnPath: `${run}/turns/02`, runner: "evals/codex-build-run.mjs", archive: `${study}/source-recovery-1` },
  "recovered-looks-measurement": { turn: 4, resultSha256: turn4ResultSha256, turnPath: `${study}/recovery/continuation/turns/04`, runner: `${study}/recovery/continue.mjs`, archive: `${study}/recovery/source-recovery-4` },
};
export const isRecovered = kind => Object.hasOwn(recoveries, kind);
export const excluded = "site/.next-concepts";
const captureError = "Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst";
const sourceBasis = "post-closure archive of the live actor workspace, not the missing closure-time snapshot";
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
  // The recovered turn completed natively; only its source capture failed.
  const turn = join(root, spec.turnPath), actorBytes = await regularBytes(turn, "result.json"), actor = JSON.parse(actorBytes);
  assert.equal(hash(actorBytes), spec.resultSha256); assert.equal(actor.turn, spec.turn); assert.equal(actor.requestedStop, spec.turn); assert.equal(actor.taskKind, "full-journey");
  assert.equal(actor.complete, false); assert.equal(actor.captureError, captureError); assert.equal(actor.snapshot, undefined);
  assert.equal(actor.timedOut, false); assert.equal(actor.interruptedBy, null); assert.deepEqual(actor.errors, []); assert.equal(actor.sessionId, first.sessionId);
  const artifacts = (await inventory(turn)).filter(file => file.path !== "result.json");
  assert.deepEqual(Object.fromEntries(artifacts.map(file => [file.path, file.sha256])), actor.artifacts, `Original turn-${spec.turn} artifact set changed`);
  if (spec.turn === 4) {
    // Turn 3 is the complete continuation turn this one resumed.
    const previousBytes = await regularBytes(join(root, study, "recovery/continuation/turns/03"), "result.json"), previous = JSON.parse(previousBytes);
    assert.equal(previous.complete, true); assert.equal(previous.turn, 3); assert.equal(hash(previousBytes), actor.previousTurnDigest); assert.equal(previous.sessionId, first.sessionId);
  }
  const stream = (await regularBytes(turn, "stream.jsonl")).toString().trim().split("\n"), last = JSON.parse(stream.at(-1));
  assert.equal(last.type, "turn.completed"); assert.deepEqual(last.usage, actor.usage);
  // The outer recorder closed normally with the runner's capture failure, not a signal or timeout.
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
    assert.equal(actorFlags["--continuation"], `${study}/recovery/continuation.json`); assert.equal(actorFlags["--continuation-sha256"], actor.continuationSha256);
    assert.equal(actorFlags["--gate"], `${study}/recovery/gate-after-3.json`); assert.equal(actorFlags["--gate-sha256"], actor.gateSha256);
    assert.equal(hash(await regularBytes(root, actorFlags["--gate"])), actor.gateSha256);
  }
  // The archive: complete authored source, verified byte for byte.
  const archive = join(root, spec.archive), recovery = JSON.parse(await regularBytes(archive, "result.json")), originalSource = JSON.parse(await regularBytes(archive, "source.json"));
  assert.equal(recovery.kind, "post-closure-source-archive"); assert.equal(recovery.turn ?? 2, spec.turn); assert.equal(recovery.originalResultSha256, spec.resultSha256); assert.equal(recovery.originalInputDigest, frozen.digest);
  assert.equal(recovery.exactAdditionalExclusion, excluded); assert.equal(recovery.modelCalls, 0); assert.equal(recovery.originalFilesModified, false); assert.equal(recovery.sourceUnchangedDuringArchive, true);
  assert.equal(originalSource.digest, hash(JSON.stringify(originalSource.files))); assert.equal(recovery.sourceDigest, originalSource.digest);
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
  return { record, workPrefix: `journey-recovery-time-${spec.turn}-`, bindingPath: absolute, bindingSha256: hash(bytes), run: runPath, turn, meta, frozen, helperHashes, policy, actor, originalSource, restored, recoveryFilesRoot, sourceBasis, targets, capabilities, runtime, installContract, output,
    environment: { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" }, units: units(spec.turn) };
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
