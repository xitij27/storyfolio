// Explicit post-closure recovery, never a replacement historical actor snapshot.
import assert from "node:assert/strict";
import { lstat, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SNAPSHOT } from "../../../../lib/build.mjs";
import { SOURCE_EXCLUSIONS } from "../../../../lib/build-capture.mjs";
import { root, hash, json, regularBytes, inventory, captureSource, safePath, verifyInputs, assertSupervisor } from "../../full-journey-measurement/binding-lib.mjs";
import { resolveApplication, packagePaths } from "./app-root.mjs";
export { root, hash, json, regularBytes, inventory, captureSource, safePath };
export const recoveryPrefix = "evals/runs/stage-3-completion-2/full-journey-recovery/";
const self = fileURLToPath(import.meta.url).slice(root.length + 1);
const hex = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
export async function boundJson(reference) {
  safePath(reference.path); assert.ok(reference.path.startsWith("evals/runs/")); assert.ok(hex(reference.sha256));
  const bytes = await regularBytes(root, reference.path); assert.equal(hash(bytes), reference.sha256, `Bound bytes changed: ${reference.path}`);
  return JSON.parse(bytes);
}
export function assertRecovery(source, recovery, official, identity, policy = DEFAULT_SNAPSHOT) {
  assert.ok(Array.isArray(source.files)); assert.equal(source.digest, hash(JSON.stringify(source.files)));
  assert.deepEqual(source.exclusions, SOURCE_EXCLUSIONS);
  assert.equal(new Set(source.files.map(file => file.path)).size, source.files.length);
  assert.ok(source.files.length <= policy.maxFiles); let total = 0;
  for (const file of source.files) { safePath(file.path); assert.ok(hex(file.sha256)); assert.ok(Number.isSafeInteger(file.bytes) && file.bytes >= 0 && file.bytes <= policy.maxFileBytes); total += file.bytes; }
  assert.ok(total <= policy.maxBytes);
  assert.equal(recovery.kind, "post-closure source recovery, not original actor snapshot");
  assert.equal(recovery.actorResultSha256, identity.actorResultSha256); assert.equal(recovery.originalWorkspace, identity.workspace);
  assert.equal(recovery.sourceDigest, source.digest); assert.equal(recovery.sourceFiles, source.files.length);
  assert.equal(recovery.officialSnapshotFiles, Object.keys(official.files).length); assert.equal(recovery.sourceUnchangedDuringCopy, true);
  assert.ok(Number.isFinite(Date.parse(recovery.observedAt)) && recovery.limits?.includes("does not retroactively"));
  const selected = source.files.filter(file => Object.hasOwn(official.files, file.path)), extra = source.files.filter(file => !Object.hasOwn(official.files, file.path));
  assert.deepEqual(Object.fromEntries(selected.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), official.files);
  assert.deepEqual(extra, recovery.additionalSource);
  assert.ok(extra.length > 0 && extra.every(file => file.path.startsWith(identity.applicationRoot + "/")), "Only the declared omitted application tree may be recovered");
  assert.equal(identity.applicationRoot, "site");
  assert.deepEqual(official.unexpected, [{ path: ".aws", type: "directory" }, { path: ".codex", type: "directory" }, { path: "site", type: "directory" }]);
  return extra;
}
export async function assertArchive(directory, source) {
  const files = await inventory(directory); assert.deepEqual(files, source.files, "Recovery archive differs from complete inventory");
}
export async function assertCurrent(workspace, source, emptyDirectories = []) {
  assert.equal(await realpath(workspace), workspace); assert.deepEqual(await captureSource(workspace), source, "Complete live source differs from recovery checkpoint");
  for (const path of emptyDirectories) { safePath(path); const stat = await lstat(join(workspace, path)); assert.ok(stat.isDirectory() && !stat.isSymbolicLink()); assert.deepEqual(await readdir(join(workspace, path)), [], `Unexpected nonempty directory: ${path}`); }
}
export async function loadAmendment(path, { liveOriginal = true } = {}) {
  const absolute = resolve(path); assert.ok(absolute.startsWith(join(root, recoveryPrefix)));
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), record = JSON.parse(bytes);
  assert.equal(record.schemaVersion, 1); assert.equal(record.kind, "full-journey-source-recovery"); assert.equal(record.reviewedByRoot, true);
  assert.equal(record.sourceBasis.label, "post-closure recovery, not original actor snapshot");
  assert.ok(record.sourceBasis.limitation?.includes("closure") && record.sourceBasis.limitation?.includes("not"));
  const original = record.original; safePath(original.run);
  assert.equal(original.run, "evals/runs/codex-full-journey-candidate-2/full-journey-1/baseline-1");
  const run = join(root, original.run), metaBytes = await regularBytes(run, "meta.json"), meta = JSON.parse(metaBytes);
  assert.equal(hash(metaBytes), original.metaSha256); assert.equal(meta.cohort, "codex-full-journey-candidate-2");
  assert.equal(meta.work, original.workspace); assert.equal(meta.caseId, "full-journey-1"); assert.equal(meta.taskKind, "full-journey");
  assert.equal(meta.setupMode, "unscaffolded"); assert.deepEqual(meta.requestedStops, [1, 2, 3, 4, 5, 6]);
  const frozen = await verifyInputs(meta.inputs); assert.equal(Object.keys(frozen.hashes).length, 149);
  assert.equal(frozen.digest, original.inputDigest); assert.equal(meta.inputDigest, frozen.digest);
  const frozenCase = JSON.parse(await regularBytes(meta.inputs, "case.json"));
  assert.equal(frozenCase.schemaVersion, 3); assert.equal(frozenCase.id, meta.caseId); assert.equal(frozenCase.taskKind, meta.taskKind);
  assert.equal(frozenCase.setupMode, meta.setupMode); assert.deepEqual(frozenCase.requestedStops, meta.requestedStops);
  const originalHelperHashes = {};
  for (const [name, digest] of Object.entries(frozen.hashes)) if (name.startsWith("implementation/")) {
    const relative = name.slice("implementation/".length); assert.equal(hash(await regularBytes(root, relative)), digest, `Original implementation changed: ${relative}`); originalHelperHashes[relative] = digest;
  }
  const capabilities = JSON.parse(await regularBytes(meta.inputs, "capabilities.json"));
  const runtime = await boundJson(record.runtime);
  assert.ok(typeof runtime.TMPDIR === "string" && runtime.TMPDIR.startsWith("/var/tmp/")); assert.equal(await realpath(runtime.TMPDIR), runtime.TMPDIR);
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  assert.deepEqual(original.turns.map(turn => turn.turn), [1, 2]); const officialActors = [];
  for (const item of original.turns) {
    const prefix = `${original.run}/turns/${String(item.turn).padStart(2, "0")}`;
    assert.equal(item.result.path, `${prefix}/result.json`); assert.equal(item.snapshot.path, `${prefix}/snapshot/manifest.json`);
    const actor = await boundJson(item.result), snapshot = await boundJson(item.snapshot);
    assert.equal(actor.turn, item.turn); assert.equal(actor.requestedStop, item.turn); assert.equal(actor.taskKind, "full-journey"); assert.equal(actor.complete, true);
    assert.ok(!actor.timedOut && !actor.interruptedBy); assert.equal(actor.sessionId, original.sessionId); assert.ok(original.sessionId);
    assert.deepEqual(actor.snapshot, snapshot);
    const actualArtifacts = (await inventory(join(root, prefix))).filter(file => file.path !== "result.json");
    assert.deepEqual(Object.fromEntries(actualArtifacts.map(file => [file.path, file.sha256])), actor.artifacts, "Original actor artifact set changed");
    assert.equal(Object.keys(actor.artifacts).length, item.turn === 1 ? 199 : 204);
    for (const [relative, digest] of Object.entries(actor.artifacts)) assert.equal(hash(await regularBytes(join(root, prefix), relative)), digest);
    const saved = await inventory(join(root, prefix, "snapshot/files"));
    assert.deepEqual(Object.fromEntries(saved.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), snapshot.files);
    const processRecord = await boundJson(item.processRecord), terminal = await boundJson(item.terminalTool), directory = dirname(item.processRecord.path), raw = {};
    for (const name of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) { raw[name] = await regularBytes(root, `${directory}/${name}`); assert.equal(hash(raw[name]), processRecord.rawArtifacts?.[name]); }
    const command = JSON.parse(raw["command.json"]), events = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
    assert.equal(assertSupervisor(processRecord, terminal, command, events), join(root, directory));
    assert.equal(command.recorderSha256, frozen.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
    assert.equal(command.cwd, root); assert.equal(command.executable, capabilities.node.executable); assert.equal(command.args[0], "evals/codex-build-run.mjs");
    assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null });
    const args = command.args.slice(1); assert.equal(args.length % 2, 0); const flags = Object.fromEntries(Array.from({ length: args.length / 2 }, (_, i) => [args[2 * i], args[2 * i + 1]]));
    assert.equal(Object.keys(flags).length, args.length / 2); assert.ok(Object.keys(flags).every(key => ["--case", "--cohort", "--capabilities", "--turn", "--gate", "--rep"].includes(key)));
    assert.equal(flags["--cohort"], meta.cohort); assert.equal(Number(flags["--turn"]), item.turn); assert.equal(Number(flags["--rep"] ?? "1"), meta.rep);
    for (const key of ["--case", "--capabilities"]) safePath(flags[key]);
    assert.equal(hash(await regularBytes(root, flags["--case"])), frozen.hashes["case.json"]);
    const requestedCapabilities = JSON.parse(await regularBytes(root, flags["--capabilities"]));
    assert.ok(Object.keys(requestedCapabilities).length > 0);
    for (const [key, value] of Object.entries(requestedCapabilities)) assert.deepEqual(value, capabilities[key], `Requested capability changed: ${key}`);
    if (item.turn === 2) { safePath(flags["--gate"]); assert.deepEqual(JSON.parse(await regularBytes(root, flags["--gate"])), JSON.parse(await regularBytes(root, `${prefix}/gate.json`))); }
    else assert.equal(flags["--gate"], undefined);
    const summary = JSON.parse(raw["stdout.log"]); assert.equal(summary.complete, true); assert.equal(summary.turn, item.turn); assert.equal(summary.requestedStop, item.turn); assert.equal(summary.taskKind, "full-journey"); assert.equal(summary.result, join(root, prefix, "result.json")); assert.equal(summary.sessionId, actor.sessionId);
    for (const key of ["input_tokens", "cached_input_tokens", "output_tokens"]) assert.ok(Number.isSafeInteger(actor.usage?.[key]) && actor.usage[key] >= 0);
    assert.ok(actor.usage.cached_input_tokens <= actor.usage.input_tokens); assert.ok(Number.isSafeInteger(actor.durationMs) && actor.durationMs >= 0);
    officialActors.push({ ...actor, digest: item.result.sha256, supervisor: { command, record: processRecord } });
  }
  const recovery = await boundJson(record.recovery.record), source = await boundJson(record.recovery.sourceManifest), applicationRoot = record.recovery.applicationRoot;
  assert.equal(record.sourceBasis.observedAt, recovery.observedAt); assert.equal(record.recovery.sourceDigest, source.digest);
  const extra = assertRecovery(source, recovery, officialActors[1].snapshot, { actorResultSha256: original.turns[1].result.sha256, workspace: meta.work, applicationRoot });
  assert.equal(source.files.length, 182); assert.equal(Object.keys(officialActors[1].snapshot.files).length, 98); assert.equal(extra.length, 84);
  assert.ok(Date.parse(recovery.observedAt) >= Date.parse(officialActors[1].supervisor.record.finished));
  safePath(record.recovery.filesRoot); assert.equal(record.recovery.filesRoot, `${dirname(record.recovery.sourceManifest.path)}/files`);
  const recoveryFilesRoot = join(root, record.recovery.filesRoot); await assertArchive(recoveryFilesRoot, source);
  const packages = packagePaths(applicationRoot);
  for (const [i, key] of ["packageJson", "lockfile"].entries()) { const entry = record.recovery[key]; assert.equal(entry.path, packages[i]); assert.equal(source.files.find(file => file.path === entry.path)?.sha256, entry.sha256); }
  assert.deepEqual(record.recovery.emptyUnexpectedDirectories, [{ path: ".aws", classification: "empty-directory" }, { path: ".codex", classification: "empty-directory" }]);
  if (liveOriginal) { await assertCurrent(meta.work, source, record.recovery.emptyUnexpectedDirectories.map(entry => entry.path)); await resolveApplication(meta.work, applicationRoot, source); }
  await resolveApplication(recoveryFilesRoot, applicationRoot, source);
  assert.deepEqual(record.continuation.allowedTurns, [3, 4, 5, 6]); assert.equal(record.continuation.recoveryAfterTurn, 2);
  assert.deepEqual(record.continuation.snapshotPolicy, { ...DEFAULT_SNAPSHOT, roots: [...DEFAULT_SNAPSHOT.roots, "site"] });
  safePath(record.continuation.output); assert.ok(record.continuation.output.startsWith(recoveryPrefix));
  for (const group of ["measurement", "runner"]) { assert.ok(record.helperHashes[group] && typeof record.helperHashes[group] === "object");
    for (const [relative, digest] of Object.entries(record.helperHashes[group])) { safePath(relative); assert.ok(hex(digest)); assert.equal(hash(await regularBytes(root, relative)), digest, `Amended helper changed: ${relative}`); }
  }
  for (const relative of [self, `${recoveryPrefix}measurement/app-root.mjs`]) assert.equal(record.helperHashes.measurement[relative], hash(await regularBytes(root, relative)));
  const totals = officialActors.reduce((sum, actor) => ({ time: sum.time + actor.durationMs, reported: sum.reported + actor.usage.input_tokens + actor.usage.output_tokens, uncached: sum.uncached + actor.usage.input_tokens - actor.usage.cached_input_tokens + actor.usage.output_tokens }), { time: 0, reported: 0, uncached: 0 });
  assert.ok(totals.time < frozenCase.bounds.maxWallMs && totals.reported < frozenCase.bounds.maxTokens && totals.uncached < frozenCase.bounds.maxUncachedTokens);
  return { record, amendmentPath: absolute, amendmentSha256: hash(bytes), root, run, meta, frozen, frozenCase, source, recovery, recoveryFilesRoot, applicationRoot, extra, officialActors, originalActors: officialActors, capabilities, runtime, originalHelperHashes, totals };
}
