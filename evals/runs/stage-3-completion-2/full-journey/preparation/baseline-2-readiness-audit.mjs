// Coordinator-only read audit, after root confirms setup/finalizer closure.
// No subprocess, browser, network, actor write or runtime-helper invocation.
// Writes one exclusive study-local result, including a failed audit if needed.
// Required flags name actual retained command directories and terminal tools:
// --root-confirmed-setup-closed --environment-command PATH --environment-tool PATH
// --finalizer-command PATH --finalizer-tool PATH
// Paths are absolute or relative to this preparation directory.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const cohort = "codex-full-journey-baseline-2", inputs = join(root, "evals/runs", cohort, "inputs");
const run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1"), setup = join(run, "setup");
const output = join(directory, "baseline-2-readiness-audit.json"), started = new Date().toISOString();
const json = value => JSON.stringify(value, null, 2) + "\n", hash = bytes => createHash("sha256").update(bytes).digest("hex");
const { values } = parseArgs({ options: { "root-confirmed-setup-closed": { type: "boolean" },
  "environment-command": { type: "string" }, "environment-tool": { type: "string" },
  "finalizer-command": { type: "string" }, "finalizer-tool": { type: "string" } } });
assert.equal(values["root-confirmed-setup-closed"], true, "Do not run while setup or finalization is live");
for (const key of ["environment-command", "environment-tool", "finalizer-command", "finalizer-tool"]) assert.ok(values[key], key);
await assert.rejects(lstat(output), { code: "ENOENT" });
const evidenceHashes = {};
async function regular(path) {
  assert.equal(await realpath(path), path, "No symlink evidence path: " + path);
  assert.ok((await lstat(path)).isFile(), path);
  const bytes = await readFile(path); evidenceHashes[path] = { sha256: hash(bytes), bytes: bytes.length }; return bytes;
}
const load = async path => JSON.parse(await regular(path));
async function tree(path, prefix = "") {
  const rows = {};
  for (const name of (await readdir(join(path, prefix))).sort()) {
    const relative = prefix ? prefix + "/" + name : name, full = join(path, relative), stat = await lstat(full);
    assert.ok(!stat.isSymbolicLink(), "Unexpected evidence/source symlink: " + full);
    if (stat.isDirectory()) Object.assign(rows, await tree(path, relative));
    else { assert.ok(stat.isFile(), full); const bytes = await regular(full); rows[relative] = { type: "file", hash: hash(bytes), size: bytes.length }; }
  }
  return rows;
}
const proofPrefix = "evals/runs/stage-3-completion-2/full-journey/preparation/";
async function audit() {
  const manifest = await load(join(inputs, "manifest.json"));
  assert.equal(manifest.schemaVersion, 1); assert.equal(manifest.digest, hash(json(manifest.hashes)));
  const frozenFiles = await tree(inputs);
  assert.deepEqual(Object.keys(frozenFiles).sort(), ["manifest.json", ...Object.keys(manifest.hashes)].sort());
  for (const [path, digest] of Object.entries(manifest.hashes)) assert.equal(frozenFiles[path].hash, digest, path);
  // Import only byte-verified frozen pure helpers. Neither module's CLI main runs.
  const build = await import(pathToFileURL(join(inputs, "implementation/evals/lib/build.mjs")));
  const proof = await import(pathToFileURL(join(inputs, "implementation", proofPrefix, "probe-environment.mjs")));
  const { PROOF, assertContract, assertMeasured, assertInitialSnapshot, assertSource } = proof;
  const meta = await load(join(run, "meta.json")), capabilities = await load(join(inputs, "capabilities.json"));
  const source = build.validateCase(await load(join(inputs, "case.json")));
  assertContract({ cohort, source, meta, manifest, capabilities });
  assert.equal(meta.inputs, inputs); assert.equal(await realpath(meta.work), meta.work);
  assert.deepEqual((await readdir(run)).sort(), ["meta.json", "setup"], "Actor has already started");
  assert.equal((await build.inspectBuildInputs({ root, casePath: manifest.casePath, capabilities })).digest, manifest.digest);
  const snapshot = await load(join(setup, "snapshot/manifest.json")), prepared = await load(join(setup, "result.json"));
  const inventory = await load(join(setup, "pre-scaffold-inventory.json"));
  assertInitialSnapshot(snapshot, manifest);
  const expected = {};
  for (const [path, row] of Object.entries(frozenFiles)) {
    const destination = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? ".agents/skills/storyfolio/" + path.slice(6) : null;
    if (destination) expected[destination] = row;
  }
  assert.equal(Object.keys(expected).length, 94); assert.deepEqual(snapshot.files, expected);
  assert.deepEqual(await tree(join(setup, "snapshot/files")), expected); assert.deepEqual(await tree(meta.work), expected);
  assert.equal(prepared.complete, true); assert.equal(prepared.setupMode, "unscaffolded"); assert.equal(prepared.scaffold.scaffolded, false);
  assert.deepEqual(prepared.scaffold.copied, []); assert.deepEqual(prepared.scaffold.conflicts, []); assert.deepEqual(prepared.snapshot, snapshot);
  assert.equal(inventory.setupMode, "unscaffolded"); assert.deepEqual(inventory.initialEntries, []); assert.deepEqual([...inventory.files].sort(), Object.keys(expected).sort());
  const inspected = await build.inspectWorkspace(meta.work, source.snapshot);
  assertSource({ entries: Object.fromEntries(Object.entries(inspected.entries).map(([path, { bytes, ...entry }]) => [path, entry])), excluded: inspected.excluded, unexpected: inspected.unexpected }, snapshot);
  for (const name of ["source-before.json", "source-after.json"]) assertSource(await load(join(setup, "environment-proof", name)), snapshot);
  const command = await load(join(setup, "environment-proof/command.json")), processResult = await load(join(setup, "environment-proof/process.json"));
  const closure = await load(join(setup, "environment-proof/closure.json")), report = await load(join(setup, "environment-proof/capability/probe.json"));
  assertMeasured(report, processResult, capabilities);
  assert.equal(command.cwd, meta.work); assert.equal(command.executable, capabilities.cliExecutable);
  assert.equal(hash(await regular(capabilities.cliExecutable)), capabilities.cliSha256);
  assert.equal(command.inputDigest, manifest.digest); assert.equal(command.capabilitySha256, manifest.hashes["capabilities.json"]);
  const environment = { ...capabilities.environment, TMPDIR: PROOF.temporaryRoot, NEXT_TELEMETRY_DISABLED: null };
  assert.deepEqual(command.environment, environment); assert.deepEqual(report.environment.expectedOuter, environment);
  assert.deepEqual(command.bounds, { timeoutMs: PROOF.timeoutMs, graceMs: PROOF.graceMs, totalCapMs: PROOF.timeoutMs + PROOF.graceMs });
  assert.equal(command.modelCalls, 0); assert.equal(command.actorPreflight, false);
  assert.ok(command.runtimeDirectory.startsWith(PROOF.temporaryRoot + "/storyfolio-environment-proof-"));
  assert.equal(command.runtimeOut, join(command.runtimeDirectory, "proof")); assert.ok(!command.runtimeOut.startsWith(meta.work + "/"));
  const args = ["sandbox"];
  for (let index = 0; index < capabilities.argv.length; index++) if (capabilities.argv[index] === "-c") args.push("-c", capabilities.argv[++index]);
  args.push("--", capabilities.node.executable, join(inputs, "implementation", proofPrefix, "probe-environment.mjs"), "--out", command.runtimeOut, "--capabilities", join(inputs, "capabilities.json"), "--workspace", meta.work);
  assert.deepEqual(command.args, args); assert.equal(report.workspace, meta.work); assert.equal(report.out, command.runtimeOut);
  assert.equal(closure.processSucceeded, true); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.copied, true); assert.equal(closure.runtimeOut, command.runtimeOut);
  const copied = await tree(join(setup, "environment-proof/capability")), runtime = await tree(command.runtimeOut);
  assert.deepEqual(copied, runtime); assert.deepEqual(Object.keys(copied).sort(), ["git.log", "neutral.png", "npm.log", "probe.json"]);
  assert.deepEqual(JSON.parse((await regular(join(setup, "environment-proof/stdout.log"))).toString()), report);
  for (const name of ["npm", "git"]) {
    const row = report.observations.find(row => row.name === name); assert.deepEqual(row.args, ["--version"]);
    assert.equal((await regular(join(setup, "environment-proof/capability", name + ".log"))).toString(), row.stdout + row.stderr);
  }
  const originals = await load(join(setup, "original-images.json")); assert.equal(originals.schemaVersion, 1); assert.equal(originals.images.length, 1);
  const image = originals.images[0], imagePath = "environment-proof/capability/neutral.png";
  assert.equal(image.path, imagePath); assert.equal(image.viewMethod, "view_image original");
  const imageBytes = await regular(join(setup, imagePath)); assert.equal(hash(imageBytes), image.sha256); assert.equal(imageBytes.length, image.bytes);
  assert.equal(imageBytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a"); assert.equal(imageBytes.readUInt32BE(16), PROOF.width); assert.equal(imageBytes.readUInt32BE(20), PROOF.height);
  const browser = report.observations.find(row => row.name === "browser"); assert.equal(browser.imageSha256, image.sha256); assert.equal(browser.imageBytes, image.bytes);
  assert.ok((await regular(join(setup, "environment-visual-review.md"))).toString().trim());
  async function recorder(path, expectedArgs, terminalPath = null) {
    const command = await load(join(path, "command.json")), result = await load(join(path, "result.json"));
    assert.equal(command.cwd, root); assert.equal(command.executable, capabilities.node.executable); assert.deepEqual(command.args, expectedArgs); assert.deepEqual(command.environment, environment);
    assert.equal(result.code, 0); assert.equal(result.signal, null); assert.ok(!result.error);
    if (command.recorderSha256) {
      assert.equal(command.recorderSha256, manifest.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
      for (const key of ["childSpawned", "childExited", "childClosed", "complete"]) assert.equal(result[key], true, key);
      for (const key of ["interruptedBy", "signalSender", "childError"]) assert.equal(result[key], null, key);
      assert.equal(result.signalForwarded, false); assert.equal(result.forceAttempted, false);
      assert.deepEqual(Object.keys(result.rawArtifacts).sort(), ["command.json", "lifecycle.jsonl", "stderr.log", "stdout.log"]);
      for (const [name, digest] of Object.entries(result.rawArtifacts)) assert.equal(hash(await regular(join(path, name))), digest);
      const events = (await regular(join(path, "lifecycle.jsonl"))).toString().trim().split("\n").map(row => JSON.parse(row));
      assert.deepEqual(events.map(row => row.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
      assert.equal(events[0].recorderPid, result.recorderPid); assert.equal(command.recorderPid, result.recorderPid);
      for (const event of events.slice(1)) assert.equal(event.childPid, result.childPid);
    } else {
      assert.equal(command.wrapperSha256, manifest.hashes["implementation/evals/runs/stage-3-comparison-1/record-command.mjs"]);
      for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regular(join(path, channel + ".log"))), result[channel + "Sha256"]);
    }
    if (terminalPath) {
      const raw = await load(terminalPath), terminal = raw.result ?? raw;
      assert.equal(terminal.exit_code, 0); assert.equal(terminal.session_id, undefined);
      const lines = terminal.output.trim().split("\n"), printed = JSON.parse(lines.at(-1));
      assert.equal(printed.output, path); delete printed.output; assert.deepEqual(printed, result);
    }
    return { command, result, stdout: JSON.parse((await regular(join(path, "stdout.log"))).toString()) };
  }
  const dry = await recorder(join(setup, "readiness-dry"), ["evals/codex-build-run.mjs", "--case", manifest.casePath, "--cohort", cohort, "--capabilities", "evals/builds/local-capabilities.json", "--dry"]);
  assert.equal(dry.stdout.digest, manifest.digest); assert.deepEqual(dry.stdout.capabilities, capabilities); assert.equal(dry.stdout.modelCalls, false); assert.equal(dry.stdout.writes, false); assert.equal(dry.stdout.setupMode, "unscaffolded");
  const environmentRecord = await recorder(resolve(directory, values["environment-command"]), [proofPrefix + "run-environment-proof.mjs", "--cohort", cohort], resolve(directory, values["environment-tool"]));
  assert.deepEqual(environmentRecord.stdout, closure);
  const finalized = await recorder(resolve(directory, values["finalizer-command"]), [proofPrefix + "finalize-readiness.mjs", "--cohort", cohort], resolve(directory, values["finalizer-tool"]));
  assert.deepEqual(finalized.stdout, { passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, sourceFiles: 94, fixtureFiles: 7, reviewedOriginals: 1, inputDigest: manifest.digest, proof: join(setup, "probe.json"), actorWorkspaceWrites: 0 });
  const attestation = await load(join(setup, "probe.json"));
  assert.equal(attestation.schemaVersion, 1); assert.equal(attestation.passed, true); assert.equal(attestation.scope, "unscaffolded-environment"); assert.equal(attestation.actorPreflight, false); assert.equal(attestation.modelCalls, 0);
  assert.equal(attestation.inputDigest, manifest.digest); assert.equal(attestation.capabilitySha256, manifest.hashes["capabilities.json"]); assert.equal(attestation.work, meta.work);
  const proofFiles = await tree(join(setup, "environment-proof"));
  const expectedEvidence = ["snapshot/manifest.json", "original-images.json", "environment-visual-review.md", ...Object.keys(proofFiles).map(path => "environment-proof/" + path), ...["command.json", "result.json", "stdout.log", "stderr.log"].map(path => "readiness-dry/" + path)].sort();
  assert.deepEqual(attestation.evidence, expectedEvidence); assert.deepEqual(Object.keys(attestation.evidenceHashes).sort(), expectedEvidence);
  for (const path of expectedEvidence) { const bytes = await regular(join(setup, path)); assert.deepEqual(attestation.evidenceHashes[path], { sha256: hash(bytes), bytes: bytes.length }); }
  const helpers = {};
  for (const name of ["probe-environment.mjs", "run-environment-proof.mjs", "finalize-readiness.mjs"]) { const path = proofPrefix + name; helpers[path] = hash(await regular(join(root, path))); assert.equal(helpers[path], manifest.hashes["implementation/" + path]); }
  assert.deepEqual(attestation.coordinatorHelpers, helpers);
  assert.deepEqual(attestation.environment, { outer: command.environment, sandbox: report.environment.sandbox, launcher: report.environment.launcher });
  assert.deepEqual((await readdir(run)).sort(), ["meta.json", "setup"]); assert.deepEqual(await tree(meta.work), expected);
  return { verified: true, cohort, inputDigest: manifest.digest, frozenInputs: Object.keys(manifest.hashes).length, sourceFiles: 94, fixtureFiles: 7, skillFiles: 87,
    sourceUnchanged: true, actorAbsent: true, scaffolded: false, paidModelCalls: 0, reviewedNeutralOriginals: 1, proofEvidenceFiles: expectedEvidence.length,
    work: meta.work, environment: attestation.environment, process: { proof: processResult, environmentRecorder: environmentRecord.result, dry: dry.result, finalizer: finalized.result },
    limits: ["Readiness for one unscaffolded environment only, not actor preflight, app/site acceptance or Stage 3 completion.", "Root's original-image viewing is an attestation whose bytes and image identity are checked, not independently repeated.", "Launcher evidence is checked against the frozen validator; no arbitrary PATH prefix or proof requirement is added.", "No process absence claim. Root owns terminal settlement and any separate scoped process observation."] };
}
let result;
try { result = await audit(); }
catch (error) { result = { verified: false, cohort, error: String(error), stack: error.stack }; process.exitCode = 1; }
result = { schemaVersion: 1, started, finished: new Date().toISOString(), ...result, invocation: process.argv, evidenceHashes,
  selfSha256: hash(await readFile(fileURLToPath(import.meta.url))), auditSubprocesses: 0, actorWrites: 0 };
await writeFile(output, json(result), { flag: "wx" });
console.log(json(result));
