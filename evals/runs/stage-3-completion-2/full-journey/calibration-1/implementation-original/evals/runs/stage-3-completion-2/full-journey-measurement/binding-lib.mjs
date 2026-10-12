// Coordinator-only settled-turn/source binding. No actor commands or retry.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, json, safePath, verifyInputs, writeNew } from "../../../lib/review.mjs";
import { captureSource } from "../../../lib/build-capture.mjs";
import { validateTargets, units } from "./measurement-lib.mjs";
export { hash, json, safePath, verifyInputs, writeNew, captureSource };
export const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../..");
export const implementationPaths = ["policy.json", "measurement-lib.mjs", "binding-lib.mjs", "gate-worker.mjs", "final-worker.mjs", "prepare-source.mjs", "run-unit.mjs", "verify.mjs", "calibrate.mjs", "measurement.test.mjs", "README.md"].map(name => `evals/runs/stage-3-completion-2/full-journey-measurement/${name}`);
export const transitivePaths = ["evals/lib/build-check.mjs", "evals/lib/build-capture.mjs", "evals/lib/source-scope.mjs", "evals/lib/review.mjs", "evals/lib/files.mjs", "evals/runs/stage-3-candidate-verification-1/bounded-process.mjs", "evals/runs/stage-3-completion-2/process-supervision/recorder.mjs", "evals/runs/stage-3-comparison-1/record-command.mjs"];
export function assertSupervisor(record, terminal, command, events) {
  assert.equal(record.schemaVersion, 1); assert.equal(record.complete, true); assert.equal(record.status, "child-exited-successfully");
  for (const field of ["childSpawned", "childExited", "childClosed"]) assert.equal(record[field], true);
  for (const field of ["interruptedBy", "childError", "signalSender", "signal"]) assert.equal(record[field], null);
  for (const field of ["signalForwarded", "forceAttempted"]) assert.equal(record[field], false);
  assert.equal(record.code, 0); assert.equal(terminal.exit_code, 0); assert.equal(terminal.session_id, undefined);
  const result = JSON.parse(terminal.output.trim().split("\n").at(-1)); const { output, ...saved } = result; assert.deepEqual(saved, record);
  assert.equal(command.schemaVersion, 1); assert.equal(command.recorderPid, record.recorderPid); assert.equal(command.shutdownGraceMs, record.shutdownGraceMs);
  assert.deepEqual(Object.keys(record.rawArtifacts).sort(), ["command.json", "lifecycle.jsonl", "stderr.log", "stdout.log"]);
  assert.deepEqual(events.map(event => event.sequence), events.map((_, index) => index + 1));
  assert.deepEqual(events.map(event => event.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
  for (const event of events.slice(1)) assert.equal(event.childPid, record.childPid);
  for (const event of events.slice(2)) { assert.equal(event.code, 0); assert.equal(event.signal, null); }
  return output;
}
export async function regularBytes(base, path) {
  safePath(path); assert.equal(await realpath(base), resolve(base)); let current = base;
  for (const part of path.split("/")) { current = join(current, part); assert.equal((await lstat(current)).isSymbolicLink(), false, `Symlink: ${path}`); }
  assert.ok((await lstat(current)).isFile()); return readFile(current);
}
export async function inventory(directory, prefix = "") {
  const files = [];
  for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name; assert.ok(!entry.isSymbolicLink());
    if (entry.isDirectory()) files.push(...await inventory(directory, path));
    else { assert.ok(entry.isFile()); const bytes = await regularBytes(directory, path); files.push({ path, sha256: hash(bytes), bytes: bytes.length }); }
  }
  return files;
}
export function assertSnapshot(source, files) {
  assert.equal(new Set(source.files.map(file => file.path)).size, source.files.length);
  assert.deepEqual(Object.fromEntries(source.files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), files);
  assert.equal(source.digest, hash(JSON.stringify(source.files)));
}
export function metadataPath(path) {
  safePath(path); const [directory, ...parts] = path.split("/"), relative = parts.join("/");
  if (!/^\.[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(directory)) return false;
  return ["HEAD", "config", "description", "index", "COMMIT_EDITMSG", "packed-refs", "shallow", "FETCH_HEAD", "ORIG_HEAD", "info/exclude", "info/refs", "objects/info/packs", "objects/info/commit-graph", "logs/HEAD"].includes(relative)
    || /^hooks\/(?:applypatch-msg|commit-msg|fsmonitor-watchman|post-update|pre-applypatch|pre-commit|pre-merge-commit|pre-push|pre-rebase|pre-receive|prepare-commit-msg|push-to-checkout|sendemail-validate|update)\.sample$/.test(relative)
    || /^objects\/[0-9a-f]{2}\/(?:[0-9a-f]{38}|[0-9a-f]{62})$/.test(relative)
    || /^objects\/pack\/pack-(?:[0-9a-f]{40}|[0-9a-f]{64})\.(?:pack|idx|rev|bitmap|keep)$/.test(relative)
    || (/^(?:logs\/)?refs\/(?:heads|tags|remotes)\/[A-Za-z0-9_-][A-Za-z0-9_./-]*$/.test(relative) && !relative.includes("..") && !relative.endsWith(".lock"));
}
export function assertExtras(extras, unexpected, disposition) {
  assert.equal(disposition.reviewedByRoot, true); assert.ok(disposition.rationale?.trim());
  assert.deepEqual(disposition.extraFiles.map(({ classification, rationale, ...file }) => file), extras);
  for (const file of disposition.extraFiles) { assert.equal(file.classification, "git-metadata"); assert.ok(file.rationale?.trim()); assert.ok(metadataPath(file.path), `Omitted application/unidentified extra: ${file.path}`); }
  assert.deepEqual(disposition.unexpected.map(({ classification, rationale, ...entry }) => entry), unexpected);
  for (const entry of disposition.unexpected) { safePath(entry.path); assert.equal(entry.type, "directory"); assert.ok(!entry.path.includes("/")); assert.ok(entry.rationale?.trim()); assert.ok(["identified-git-metadata", "empty-directory"].includes(entry.classification)); }
}
export async function loadBinding(path, { liveOriginal = true } = {}) {
  const absolute = resolve(path); assert.ok(absolute.startsWith(join(root, "evals/runs") + "/"));
  const bytes = await regularBytes(root, absolute.slice(root.length + 1)), record = JSON.parse(bytes);
  assert.equal(record.schemaVersion, 1); assert.ok([2, 4, 6].includes(record.turn));
  const bound = async reference => { safePath(reference.path); assert.ok(reference.path.startsWith("evals/runs/")); const data = await regularBytes(root, reference.path); assert.match(reference.sha256, /^[a-f0-9]{64}$/); assert.equal(hash(data), reference.sha256); return JSON.parse(data); };
  safePath(record.run); assert.ok(record.run.startsWith("evals/runs/"));
  const run = join(root, record.run), meta = JSON.parse(await regularBytes(run, "meta.json"));
  assert.equal(hash(await regularBytes(run, "meta.json")), record.metaSha256);
  const frozen = await verifyInputs(meta.inputs); assert.equal(frozen.digest, record.inputDigest); assert.equal(meta.inputDigest, frozen.digest);
  const frozenCase = JSON.parse(await regularBytes(meta.inputs, "case.json"));
  assert.equal(meta.caseId, "full-journey-1"); assert.equal(meta.taskKind, "full-journey"); assert.equal(meta.setupMode, "unscaffolded"); assert.deepEqual(meta.requestedStops, [1, 2, 3, 4, 5, 6]);
  assert.equal(frozenCase.id, meta.caseId); assert.equal(frozenCase.schemaVersion, 3); assert.equal(frozenCase.taskKind, meta.taskKind); assert.equal(frozenCase.setupMode, meta.setupMode); assert.deepEqual(frozenCase.requestedStops, meta.requestedStops);
  const helperHashes = {};
  for (const path of [...implementationPaths, ...transitivePaths]) { const digest = hash(await regularBytes(root, path)); assert.equal(digest, frozen.hashes[`implementation/${path}`], `Coordinator code not frozen: ${path}`); helperHashes[path] = digest; }
  const policy = JSON.parse(await regularBytes(study, "policy.json")); assert.equal(hash(await regularBytes(study, "policy.json")), frozen.hashes["expectations.json"]);
  const turn = join(run, "turns", String(record.turn).padStart(2, "0")), actorBytes = await regularBytes(turn, "result.json"), actor = JSON.parse(actorBytes);
  assert.equal(hash(actorBytes), record.actorResultSha256); assert.equal(actor.turn, record.turn); assert.equal(actor.requestedStop, record.turn); assert.equal(actor.complete, true); assert.ok(!actor.timedOut && !actor.interruptedBy);
  assert.deepEqual(actor.snapshot, JSON.parse(await regularBytes(turn, "snapshot/manifest.json")));
  for (const [path, sha256] of Object.entries(actor.artifacts)) assert.equal(hash(await regularBytes(turn, path)), sha256);
  const saved = await inventory(join(turn, "snapshot/files")); assert.deepEqual(saved.map(file => file.path).sort(), Object.keys(actor.snapshot.files).sort());
  for (const file of saved) assert.deepEqual({ type: "file", hash: file.sha256, size: file.bytes }, actor.snapshot.files[file.path]);
  const processRecord = await bound(record.processRecord), terminal = await bound(record.terminalTool);
  const processDirectory = dirname(record.processRecord.path), raw = {};
  for (const path of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) { raw[path] = await regularBytes(root, `${processDirectory}/${path}`); assert.equal(hash(raw[path]), processRecord.rawArtifacts?.[path]); }
  const actorCommand = JSON.parse(raw["command.json"]), events = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
  assert.equal(assertSupervisor(processRecord, terminal, actorCommand, events), join(root, processDirectory));
  assert.equal(actorCommand.recorderSha256, helperHashes["evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
  assert.equal(actorCommand.cwd, root); assert.equal(actorCommand.args[0], "evals/codex-build-run.mjs");
  const flags = actorCommand.args.slice(1); assert.equal(flags.length % 2, 0); const actorFlags = Object.fromEntries(Array.from({ length: flags.length / 2 }, (_, index) => [flags[index * 2], flags[index * 2 + 1]]));
  assert.equal(Object.keys(actorFlags).length, flags.length / 2); assert.ok(Object.keys(actorFlags).every(key => ["--case", "--cohort", "--capabilities", "--turn", "--gate", "--rep"].includes(key)));
  assert.equal(actorFlags["--cohort"], meta.cohort); assert.equal(Number(actorFlags["--turn"]), record.turn); assert.equal(Number(actorFlags["--rep"] ?? "1"), meta.rep);
  for (const name of ["--case", "--capabilities", "--gate"]) safePath(actorFlags[name]);
  assert.equal(hash(await regularBytes(root, actorFlags["--case"])), frozen.hashes["case.json"]);
  assert.deepEqual(JSON.parse(await regularBytes(root, actorFlags["--gate"])), JSON.parse(await regularBytes(turn, "gate.json")));
  const summary = JSON.parse(raw["stdout.log"]); assert.equal(summary.complete, true); assert.equal(summary.turn, record.turn); assert.equal(summary.requestedStop, record.turn); assert.equal(summary.taskKind, "full-journey"); assert.equal(summary.result, join(turn, "result.json")); assert.equal(summary.sessionId, actor.sessionId);
  const originalSource = await bound(record.originalSource), extrasDisposition = await bound(record.extrasDisposition), targets = await bound(record.targets);
  assert.equal(originalSource.digest, hash(JSON.stringify(originalSource.files)));
  const selected = originalSource.files.filter(file => Object.hasOwn(actor.snapshot.files, file.path)), extras = originalSource.files.filter(file => !Object.hasOwn(actor.snapshot.files, file.path));
  const restored = { ...originalSource, files: selected, digest: hash(JSON.stringify(selected)) }; assertSnapshot(restored, actor.snapshot.files);
  assertExtras(extras, actor.snapshot.unexpected, extrasDisposition);
  assert.deepEqual(validateTargets(targets), []); assert.equal(targets.stage, record.turn); assert.equal(targets.sourceDigest, originalSource.digest); assert.equal(targets.actorResultSha256, record.actorResultSha256);
  for (const source of targets.discovery.sources) assert.equal(actor.snapshot.files[source.path]?.hash, source.sha256);
  if (record.turn === 6) {
    const selection = await bound(targets.selectedWording.record);
    assert.equal(selection.schemaVersion, 1); assert.equal(selection.source, "coordinator-whole-version-selection"); assert.equal(selection.reviewedByRoot, true);
    assert.deepEqual(selection.selectedVersions, targets.selectedWording.versions);
    assert.ok(selection.provenance?.length, "Whole-version selection needs conversation/decision provenance");
    for (const reference of selection.provenance) { safePath(reference.path); assert.ok(reference.path.startsWith("evals/runs/")); assert.equal(hash(await regularBytes(root, reference.path)), reference.sha256); }
  }
  if (targets.focusOnlyControls?.length) assert.ok(targets.discovery.sources.some(source => source.path === targets.focusOnlyAttestation.sourcePath));
  if (liveOriginal) {
    assert.equal(await realpath(meta.work), meta.work); assert.deepEqual(await captureSource(meta.work), originalSource);
    for (const entry of extrasDisposition.unexpected) {
      const stat = await lstat(join(meta.work, entry.path)); assert.ok(stat.isDirectory() && !stat.isSymbolicLink());
      if (entry.classification === "empty-directory") assert.deepEqual(await readdir(join(meta.work, entry.path)), []);
      else {
        assert.ok(extras.some(file => file.path.startsWith(entry.path + "/")));
        assert.match((await regularBytes(meta.work, `${entry.path}/HEAD`)).toString("utf8").trim(), /^(?:ref: refs\/(?:heads|tags|remotes)\/[A-Za-z0-9_./-]+|[0-9a-f]{40}|[0-9a-f]{64})$/);
        assert.match((await regularBytes(meta.work, `${entry.path}/config`)).toString("utf8"), /^\s*\[core\]\s*$/m);
        for (const marker of ["objects", "refs"]) { const markerStat = await lstat(join(meta.work, entry.path, marker)); assert.ok(markerStat.isDirectory() && !markerStat.isSymbolicLink()); }
      }
    }
    for (const extra of extras) assert.ok(extrasDisposition.unexpected.some(entry => entry.classification === "identified-git-metadata" && extra.path.startsWith(entry.path + "/")));
  }
  const capabilities = JSON.parse(await regularBytes(meta.inputs, "capabilities.json")), runtime = await bound(record.runtime);
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version); assert.ok(typeof runtime.TMPDIR === "string" && runtime.TMPDIR.startsWith("/var/tmp/")); assert.equal(await realpath(runtime.TMPDIR), runtime.TMPDIR);
  assert.equal(actorCommand.executable, capabilities.node.executable); assert.deepEqual(actorCommand.environment, { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null });
  const installContract = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null } };
  safePath(record.output); assert.ok(record.output.startsWith("evals/runs/")); const output = join(root, record.output);
  assert.ok(!output.startsWith(meta.work + "/") && !output.startsWith(meta.inputs + "/"));
  return { record, bindingPath: absolute, bindingSha256: hash(bytes), run, turn, meta, frozen, helperHashes, policy, actor, originalSource, restored, extras, targets, capabilities, runtime, installContract, output, environment: { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" }, units: units(record.turn) };
}
export async function loadPrepared(binding, { currentSource = true } = {}) {
  const setup = join(binding.output, "setup"), preparation = JSON.parse(await regularBytes(setup, "reconstruction.json"));
  assert.equal(preparation.bindingSha256, binding.bindingSha256); assert.deepEqual(preparation.helperHashes, binding.helperHashes);
  assert.equal(dirname(preparation.work), join(binding.runtime.TMPDIR, "storyfolio-evals")); assert.match(preparation.work.split("/").at(-1), /^journey-measure-[246]-[A-Za-z0-9]+$/); assert.equal(await realpath(preparation.work), preparation.work); assert.notEqual(preparation.work, binding.meta.work);
  assert.deepEqual(preparation.source, binding.restored); assert.deepEqual(preparation.originalSource, binding.originalSource);
  const targets = JSON.parse(await regularBytes(setup, "targets.json")); assert.deepEqual(targets, { ...binding.targets, sourceDigest: binding.restored.digest });
  if (currentSource) assert.deepEqual(await captureSource(preparation.work), binding.restored);
  return { setup, preparation, work: preparation.work, targets };
}
