// Candidate-only clean measurement scope. No original workspace or exclusion edit.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertSnapshot, reboundTargets, assertInstall, artifactInventory, regularBytes, captureSource, hash, json, safePath, verifyInputs, writeNew } from "../entry-replay/bindings.mjs";
import { validateTargets } from "../../codex-bench-entry-baseline-1/inputs/implementation/evals/builds/bench-entry-1/measurement-lib.mjs";
export { assertSnapshot, reboundTargets, assertInstall, artifactInventory, regularBytes, captureSource, hash, json, safePath, verifyInputs, writeNew };
export const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../..");
export const cohort = resolve(study, "../../codex-bench-entry-candidate-1"), run = join(cohort, "bench-entry-1/baseline-1");
export const candidateInputs = join(cohort, "inputs"), inputs = resolve(study, "../../codex-bench-entry-baseline-1/inputs");
export const setup = join(study, "setup"), output = join(study, "measurement");
export const identities = Object.freeze({ candidateInput: "5cb0491da31d429b09082c298f475546c1ec10ccc003cafa1bb037aea5e309e9", baselineInput: "504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a", candidateMeta: "72c78febf3d4ba4883c371fb2e179ea6950d24e05fbab8879096e112be3388d8", reusedBindings: "19134e5f5c48478104de13e03d03d5c675324e5cd975832fedc09a1209f73022" });
export const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const reference = /^refs\/(?:heads|tags|remotes)\/[A-Za-z0-9_-][A-Za-z0-9_./-]*$/;
const validReference = path => reference.test(path) && !path.includes("..") && !path.includes("//") && !path.endsWith("/");
export function metadataPath(path) {
  safePath(path);
  const [directory, ...parts] = path.split("/"), relative = parts.join("/");
  if (!/^\.[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(directory) || !relative) return false;
  return ["HEAD", "config", "description", "index", "COMMIT_EDITMSG", "packed-refs", "shallow", "FETCH_HEAD", "ORIG_HEAD", "info/exclude", "info/refs", "objects/info/packs", "objects/info/commit-graph", "logs/HEAD"].includes(relative)
    || /^hooks\/(?:applypatch-msg|commit-msg|fsmonitor-watchman|post-update|pre-applypatch|pre-commit|pre-merge-commit|pre-push|pre-rebase|pre-receive|prepare-commit-msg|push-to-checkout|sendemail-validate|update)\.sample$/.test(relative)
    || /^objects\/[0-9a-f]{2}\/(?:[0-9a-f]{38}|[0-9a-f]{62})$/.test(relative)
    || /^objects\/pack\/pack-(?:[0-9a-f]{40}|[0-9a-f]{64})\.(?:pack|idx|rev|bitmap|keep)$/.test(relative)
    || validReference(relative) || (relative.startsWith("logs/") && validReference(relative.slice(5)));
}
export function splitSource(source, snapshot) {
  assert.equal(source.digest, hash(JSON.stringify(source.files)));
  const files = source.files.filter(file => Object.hasOwn(snapshot, file.path));
  assertSnapshot({ files }, snapshot);
  return { restored: { ...source, files, digest: hash(JSON.stringify(files)) }, extras: source.files.filter(file => !Object.hasOwn(snapshot, file.path)) };
}
export function assertExtras(extras, unexpected, disposition) {
  assert.equal(disposition.schemaVersion, 1); assert.equal(disposition.reviewedByRoot, true);
  assert.ok(typeof disposition.rationale === "string" && disposition.rationale.trim());
  assert.deepEqual(disposition.extraFiles.map(({ classification, rationale, ...file }) => file), extras, "Every extra path/hash/size must be reviewed exactly");
  for (const file of disposition.extraFiles) { assert.equal(file.classification, "git-metadata"); assert.ok(file.rationale?.trim()); assert.ok(metadataPath(file.path), `Omitted application or unidentified metadata cannot be restored around: ${file.path}`); }
  assert.deepEqual(disposition.unexpected.map(({ classification, rationale, ...entry }) => entry), unexpected);
  for (const entry of disposition.unexpected) {
    safePath(entry.path); assert.equal(entry.type, "directory"); assert.ok(entry.rationale?.trim());
    assert.ok(["identified-git-metadata", "empty-directory"].includes(entry.classification));
    assert.ok(!entry.path.includes("/"));
  }
}
async function checkMetadata(work, extras, disposition) {
  const metadataRoots = new Set(extras.map(file => file.path.split("/")[0]));
  for (const entry of disposition.unexpected) {
    const path = join(work, entry.path), stat = await lstat(path); assert.ok(stat.isDirectory() && !stat.isSymbolicLink());
    if (entry.classification === "empty-directory") assert.deepEqual(await readdir(path), []);
    else { assert.ok(metadataRoots.has(entry.path), "Claimed metadata has no captured extras"); }
  }
  for (const directory of metadataRoots) {
    assert.ok(disposition.unexpected.some(entry => entry.path === directory && entry.classification === "identified-git-metadata"));
    const head = (await regularBytes(work, `${directory}/HEAD`)).toString("utf8").trim();
    assert.ok(/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/.test(head) || (head.startsWith("ref: ") && validReference(head.slice(5))), `Unidentified Git HEAD: ${directory}`);
    assert.match((await regularBytes(work, `${directory}/config`)).toString("utf8"), /^\s*\[core\]\s*$/m);
    for (const marker of ["objects", "refs"]) { const stat = await lstat(join(work, directory, marker)); assert.ok(stat.isDirectory() && !stat.isSymbolicLink()); }
  }
}
export async function helperHashes() {
  const result = {};
  for (const name of ["bindings.mjs", "reconstruct.mjs", "run-replay.mjs", "verify-replay.mjs", "bindings.test.mjs", "README.md"]) result[name] = hash(await regularBytes(study, name));
  result["../entry-replay/bindings.mjs"] = hash(await regularBytes(dirname(study), "entry-replay/bindings.mjs")); assert.equal(result["../entry-replay/bindings.mjs"], identities.reusedBindings);
  return result;
}
export async function loadOriginal() {
  const baseline = await verifyInputs(inputs), frozen = await verifyInputs(candidateInputs);
  assert.equal(baseline.digest, identities.baselineInput); assert.equal(frozen.digest, identities.candidateInput);
  for (const path of ["expectations.json", "implementation/evals/builds/bench-entry-1/measurement.mjs", "implementation/evals/builds/bench-entry-1/measurement-lib.mjs", "implementation/evals/lib/build-capture.mjs", "implementation/evals/lib/build-check.mjs", "implementation/evals/lib/source-scope.mjs", "implementation/evals/lib/review.mjs", "implementation/evals/lib/files.mjs", "implementation/evals/runs/stage-3-candidate-verification-1/bounded-process.mjs"]) assert.equal(frozen.hashes[path], baseline.hashes[path], `Measurement bytes differ: ${path}`);
  const controlBytes = await regularBytes(study, "measurement-input.json"), control = JSON.parse(controlBytes);
  assert.equal(control.schemaVersion, 1); assert.equal(control.cohort, "codex-bench-entry-candidate-1"); assert.equal(control.inputDigest, frozen.digest); assert.equal(control.actorSettled, true);
  const bound = async (path, sha256, base = study) => { assert.match(sha256, /^[a-f0-9]{64}$/); const bytes = await regularBytes(base, path); assert.equal(hash(bytes), sha256, `Binding changed: ${path}`); return JSON.parse(bytes); };
  const meta = await bound("meta.json", identities.candidateMeta, run); assert.equal(meta.inputs, candidateInputs); assert.equal(meta.inputDigest, frozen.digest); assert.equal(meta.cohort, control.cohort); assert.equal(meta.caseId, "bench-entry-1"); assert.equal(meta.rep, 1);
  assert.equal(await realpath(meta.work), meta.work); assert.ok(meta.work.startsWith("/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-"));
  const actor = await bound("turns/01/result.json", control.actorResultSha256, run);
  assert.equal(actor.turn, 1); assert.equal(actor.requestedStop, 4); assert.equal(typeof actor.complete, "boolean"); assert.ok(Object.keys(actor.snapshot.files).length > 0);
  if (actor.complete) { assert.ok(!actor.timedOut); assert.ok(!actor.interruptedBy); }
  assert.deepEqual(actor.snapshot, await readJson(join(run, "turns/01/snapshot/manifest.json")));
  for (const [path, sha256] of Object.entries(actor.artifacts)) assert.equal(hash(await regularBytes(join(run, "turns/01"), path)), sha256, `Actor artifact: ${path}`);
  const saved = await artifactInventory(join(run, "turns/01/snapshot/files"));
  assert.deepEqual(saved.map(file => file.path).sort(), Object.keys(actor.snapshot.files).sort());
  for (const [path, record] of Object.entries(actor.snapshot.files)) { assert.equal(record.type, "file"); const bytes = await regularBytes(join(run, "turns/01/snapshot/files"), path); assert.equal(hash(bytes), record.hash); assert.equal(bytes.length, record.size); }
  const originalSource = await bound("original-source.json", control.originalSourceSha256);
  assert.deepEqual(await captureSource(meta.work), originalSource, "Original workspace source changed");
  const { restored, extras } = splitSource(originalSource, actor.snapshot.files);
  const disposition = await bound("extras-disposition.json", control.extrasDispositionSha256);
  assertExtras(extras, actor.snapshot.unexpected, disposition); await checkMetadata(meta.work, extras, disposition);
  const targets = await bound("observed-targets.json", control.targetsSha256), expected = await readJson(join(inputs, "expectations.json"));
  assert.deepEqual(validateTargets(targets, expected), []); assert.equal(targets.sourceDigest, originalSource.digest); assert.equal(targets.actorResultSha256, control.actorResultSha256);
  assert.equal(targets.eligibility.disposition, "implemented-output"); assert.equal(targets.eligibility.authoredApplication, true);
  for (const source of targets.discovery.sources) assert.equal(actor.snapshot.files[source.path]?.hash, source.sha256, `Discovery source is not retained: ${source.path}`);
  assert.ok(control.terminalTool.path.startsWith("evals/runs/stage-3-completion-2/")); assert.ok(control.processRecord.path.startsWith("evals/runs/stage-3-completion-2/")); assert.equal(basename(control.processRecord.path), "result.json");
  const terminal = await bound(control.terminalTool.path, control.terminalTool.sha256, root), processRecord = await bound(control.processRecord.path, control.processRecord.sha256, root);
  assert.equal(terminal.session_id, undefined); assert.equal(terminal.exit_code, actor.complete ? 0 : 1); assert.equal(processRecord.code, terminal.exit_code); assert.equal(processRecord.signal, null); assert.ok(processRecord.finished);
  const final = JSON.parse(terminal.output.trim().split("\n").at(-1)); assert.equal(final.finished, processRecord.finished); assert.equal(final.code, processRecord.code); assert.equal(final.output, join(root, dirname(control.processRecord.path)));
  for (const stream of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(root, `${dirname(control.processRecord.path)}/${stream}.log`)), processRecord[`${stream}Sha256`]);
  const actorCommand = await bound(`${dirname(control.processRecord.path)}/command.json`, control.actorCommandSha256, root);
  const capabilities = await readJson(join(candidateInputs, "capabilities.json")), baselineCapabilities = await readJson(join(inputs, "capabilities.json"));
  assert.equal(actorCommand.cwd, root); assert.equal(actorCommand.executable, capabilities.node.executable);
  assert.deepEqual(actorCommand.args, ["evals/codex-build-run.mjs", "--case", frozen.casePath, "--cohort", control.cohort, "--capabilities", "evals/builds/local-capabilities.json", "--turn", "1"]);
  assert.deepEqual(capabilities.node, baselineCapabilities.node); assert.deepEqual(capabilities.environment, baselineCapabilities.environment); assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  const runtime = await readJson(join(run, "setup/runtime-environment.json")); assert.equal(runtime.TMPDIR, "/var/tmp/storyfolio-entry-runtime-20261012");
  const environment = { ...capabilities.environment, TMPDIR: runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: "1" }, parent = join(runtime.TMPDIR, "storyfolio-evals"); assert.equal(await realpath(parent), parent);
  const originalInstall = await readJson(join(run, "setup/dependency-install/command.json")), baselineInstall = await readJson(join(inputs, "../bench-entry-1/baseline-1/setup/dependency-install/command.json"));
  assert.equal(originalInstall.executable, baselineInstall.executable); assert.deepEqual(originalInstall.args, baselineInstall.args); assert.deepEqual(originalInstall.environment, baselineInstall.environment); assert.equal(originalInstall.cwd, meta.work); assert.deepEqual(actorCommand.environment, originalInstall.environment);
  return { frozen, baseline, meta, actor, originalSource, restored, extras, disposition, targets, expected, environment, parent, originalInstall, actorResultSha256: control.actorResultSha256,
    bindingHashes: { measurementInput: hash(controlBytes), originalSource: control.originalSourceSha256, targets: control.targetsSha256, extrasDisposition: control.extrasDispositionSha256, actorResult: control.actorResultSha256, processRecord: control.processRecord.sha256, terminalTool: control.terminalTool.sha256, actorCommand: control.actorCommandSha256 } };
}
export async function loadSetup(binding) {
  const record = await readJson(join(setup, "reconstruction.json")); assert.equal(record.schemaVersion, 1); assert.equal(record.inputDigest, identities.candidateInput); assert.deepEqual(record.bindingHashes, binding.bindingHashes);
  assert.equal(record.originalWork, binding.meta.work); assert.equal(record.actorResultSha256, binding.actorResultSha256); assert.equal(record.originalSourceDigest, binding.originalSource.digest); assert.equal(record.restoredSourceDigest, binding.restored.digest); assert.equal(record.sourceFiles, binding.restored.files.length); assert.deepEqual(record.omittedMetadata, binding.extras); assert.deepEqual(record.environment, binding.environment);
  assert.equal(dirname(record.work), binding.parent); assert.match(record.work.slice(binding.parent.length + 1), /^replay-bench-entry-candidate-1-[A-Za-z0-9]+$/); assert.equal(await realpath(record.work), record.work); assert.notEqual(record.work, binding.meta.work);
  assert.deepEqual(record.helperHashes, await helperHashes());
  assert.ok(record.authorization.path.startsWith(join(root, "docs/history") + "/")); assert.equal(await realpath(record.authorization.path), record.authorization.path); assert.equal(hash(await readFile(record.authorization.path)), record.authorization.sha256);
  const before = await readJson(join(setup, "source-restored.json")); assertSnapshot(before, binding.actor.snapshot.files); assert.deepEqual(before, binding.restored);
  const current = await captureSource(record.work); assert.deepEqual(current, before);
  const targets = await readJson(join(setup, "observed-targets.json")); assert.deepEqual(targets, reboundTargets(binding.targets, current.digest)); assert.deepEqual(validateTargets(targets, binding.expected), []);
  return { record, current, targets };
}
