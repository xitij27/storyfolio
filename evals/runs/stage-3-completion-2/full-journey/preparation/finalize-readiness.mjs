// Root-only attestation after actual neutral-original review. No subprocesses or actor writes.
import assert from "node:assert/strict";
import { lstat, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { hash, inspectBuildInputs, inspectWorkspace, regularBytes, validateCase, verifyInputs, writeNew } from "../../../../lib/build.mjs";
import { PROOF, assertContract, assertMeasured, assertSource, json } from "./probe-environment.mjs";

const { values } = parseArgs({ options: { cohort: { type: "string" } } });
assert.ok(PROOF.cohorts.includes(values.cohort));
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../..");
const inputs = join(root, "evals/runs", values.cohort, "inputs"), out = join(root, "evals/runs", values.cohort, "full-journey-1/baseline-1"), setup = join(out, "setup");
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const manifest = await verifyInputs(inputs), meta = await readJson(out, "meta.json"), capabilities = await readJson(inputs, "capabilities.json");
const source = validateCase(await readJson(inputs, "case.json"));
assertContract({ cohort: values.cohort, source, meta, manifest, capabilities });
assert.equal(meta.inputs, inputs); assert.equal(await realpath(meta.work), meta.work);
assert.deepEqual((await readdir(out)).sort(), ["meta.json", "setup"]);
assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
assert.equal(process.env.TMPDIR, PROOF.temporaryRoot); assert.equal(process.env.NEXT_TELEMETRY_DISABLED, undefined);
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(process.env[key] ?? null, value);
assert.equal((await inspectBuildInputs({ root, casePath: manifest.casePath, capabilities })).digest, manifest.digest);
const prepared = await readJson(setup, "result.json"), inventory = await readJson(setup, "pre-scaffold-inventory.json"), snapshot = await readJson(setup, "snapshot/manifest.json");
assert.equal(prepared.complete, true); assert.equal(prepared.setupMode, "unscaffolded");
assert.equal(prepared.scaffold.scaffolded, false); assert.deepEqual(prepared.scaffold.copied, []); assert.deepEqual(prepared.scaffold.conflicts, []);
assert.equal(inventory.setupMode, "unscaffolded"); assert.deepEqual(inventory.initialEntries, []);
assert.deepEqual(snapshot.excluded, []); assert.deepEqual(snapshot.unexpected, []);
const expected = {};
for (const [path, digest] of Object.entries(manifest.hashes)) {
  const target = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? ".agents/skills/storyfolio/" + path.slice(6) : null;
  if (!target) continue;
  const bytes = await regularBytes(inputs, path);
  expected[target] = { type: "file", hash: digest, size: bytes.length };
  assert.deepEqual(bytes, await regularBytes(join(setup, "snapshot/files"), target));
}
assert.deepEqual(snapshot.files, expected);
assert.deepEqual([...inventory.files].sort(), Object.keys(expected).sort());
assert.deepEqual(prepared.snapshot, snapshot);
const current = await inspectWorkspace(meta.work, source.snapshot);
assertSource({ entries: Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...entry }]) => [path, entry])), excluded: current.excluded, unexpected: current.unexpected }, snapshot);
for (const name of ["source-before.json", "source-after.json"]) assertSource(await readJson(setup, "environment-proof/" + name), snapshot);
const command = await readJson(setup, "environment-proof/command.json"), processResult = await readJson(setup, "environment-proof/process.json"), closure = await readJson(setup, "environment-proof/closure.json"), report = await readJson(setup, "environment-proof/capability/probe.json");
assert.equal(command.cwd, meta.work); assert.equal(command.executable, capabilities.cliExecutable);
assert.equal(hash(await regularBytes(dirname(capabilities.cliExecutable), capabilities.cliExecutable.split("/").at(-1))), capabilities.cliSha256);
assert.equal(command.inputDigest, manifest.digest); assert.equal(command.capabilitySha256, manifest.hashes["capabilities.json"]);
assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: PROOF.temporaryRoot, NEXT_TELEMETRY_DISABLED: null });
assert.deepEqual(command.bounds, { timeoutMs: PROOF.timeoutMs, graceMs: PROOF.graceMs, totalCapMs: PROOF.timeoutMs + PROOF.graceMs });
assert.equal(command.actorPreflight, false); assert.equal(command.modelCalls, 0);
assert.ok(command.runtimeDirectory.startsWith(PROOF.temporaryRoot + "/storyfolio-environment-proof-"));
assert.equal(command.runtimeOut, join(command.runtimeDirectory, "proof"));
assert.equal(await realpath(command.runtimeOut), command.runtimeOut);
assert.ok(!command.runtimeOut.startsWith(meta.work + "/"));
const expectedArgs = ["sandbox"];
for (let index = 0; index < capabilities.argv.length; index++) if (capabilities.argv[index] === "-c") expectedArgs.push("-c", capabilities.argv[++index]);
expectedArgs.push("--", capabilities.node.executable, join(inputs, "implementation/evals/runs/stage-3-completion-2/full-journey/preparation/probe-environment.mjs"), "--out", command.runtimeOut, "--capabilities", join(inputs, "capabilities.json"), "--workspace", meta.work);
assert.deepEqual(command.args, expectedArgs);
assertMeasured(report, processResult, capabilities);
assert.deepEqual(report.environment.expectedOuter, command.environment);
assert.equal(report.workspace, meta.work); assert.equal(report.out, command.runtimeOut);
assert.equal(closure.processSucceeded, true); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.copied, true);
assert.equal(closure.runtimeOut, command.runtimeOut);
const node = report.observations.find(row => row.name === "node");
assert.equal(node.version, capabilities.node.version); assert.equal(node.executable, capabilities.node.executable);
const pathsAt = async (directory, prefix = "") => {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name;
    assert.ok(!entry.isSymbolicLink(), "Evidence symlink: " + path);
    if (entry.isDirectory()) paths.push(...await pathsAt(join(directory, entry.name), path));
    else { assert.ok(entry.isFile(), "Non-file evidence: " + path); paths.push(path); }
  }
  return paths.sort();
};
const copied = join(setup, "environment-proof/capability"), runtimePaths = await pathsAt(command.runtimeOut);
assert.deepEqual(await pathsAt(copied), runtimePaths);
assert.deepEqual(runtimePaths, ["git.log", "neutral.png", "npm.log", "probe.json"]);
for (const path of runtimePaths) assert.deepEqual(await regularBytes(copied, path), await regularBytes(command.runtimeOut, path));
for (const name of ["npm", "git"]) {
  const row = report.observations.find(value => value.name === name);
  assert.deepEqual(row.args, ["--version"]);
  assert.equal((await regularBytes(copied, name + ".log")).toString(), row.stdout + row.stderr);
}
const originals = await readJson(setup, "original-images.json");
assert.equal(originals.schemaVersion, 1); assert.equal(originals.images.length, 1);
const image = originals.images[0], imagePath = "environment-proof/capability/neutral.png";
assert.equal(image.path, imagePath); assert.equal(image.viewMethod, "view_image original");
const bytes = await regularBytes(setup, imagePath);
assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(bytes.readUInt32BE(16), PROOF.width); assert.equal(bytes.readUInt32BE(20), PROOF.height);
assert.equal(hash(bytes), image.sha256); assert.equal(bytes.length, image.bytes);
const browser = report.observations.find(row => row.name === "browser");
assert.equal(browser.imageSha256, image.sha256); assert.equal(browser.imageBytes, image.bytes);
assert.ok((await regularBytes(setup, "environment-visual-review.md")).toString().trim());
const dryCommand = await readJson(setup, "readiness-dry/command.json"), dryResult = await readJson(setup, "readiness-dry/result.json");
assert.equal(dryResult.code, 0); assert.equal(dryResult.signal, null);
assert.equal(dryCommand.cwd, root); assert.equal(dryCommand.executable, capabilities.node.executable);
assert.deepEqual(dryCommand.args, ["evals/codex-build-run.mjs", "--case", manifest.casePath, "--cohort", values.cohort, "--capabilities", "evals/builds/local-capabilities.json", "--dry"]);
for (const [key, value] of Object.entries(command.environment)) assert.equal(dryCommand.environment[key], value);
for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(setup, "readiness-dry/" + channel + ".log")), dryResult[channel + "Sha256"]);
const dry = await readJson(setup, "readiness-dry/stdout.log");
assert.equal(dry.digest, manifest.digest); assert.deepEqual(dry.capabilities, capabilities);
assert.equal(dry.modelCalls, false); assert.equal(dry.writes, false); assert.equal(dry.setupMode, "unscaffolded");
const coordinatorHelpers = {};
for (const name of ["probe-environment.mjs", "run-environment-proof.mjs", "finalize-readiness.mjs"]) {
  const path = "evals/runs/stage-3-completion-2/full-journey/preparation/" + name, digest = hash(await regularBytes(root, path));
  assert.equal(digest, manifest.hashes["implementation/" + path]); coordinatorHelpers[path] = digest;
}
const evidence = ["snapshot/manifest.json", "original-images.json", "environment-visual-review.md",
  ...await pathsAt(join(setup, "environment-proof")).then(paths => paths.map(path => "environment-proof/" + path)),
  ...["command.json", "result.json", "stdout.log", "stderr.log"].map(path => "readiness-dry/" + path)].sort();
const evidenceHashes = {};
for (const path of evidence) { const bytes = await regularBytes(setup, path); evidenceHashes[path] = { sha256: hash(bytes), bytes: bytes.length }; }
await writeNew(join(setup, "probe.json"), json({ schemaVersion: 1, passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0,
  inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"], work: meta.work, evidence, evidenceHashes, coordinatorHelpers,
  environment: { outer: command.environment, sandbox: report.environment.sandbox, launcher: report.environment.launcher },
  limits: ["One neutral desktop page, no application build, root install, actor preflight or site acceptance.", "The coordinator attests actual original-image review; software only verifies the saved attestation and bytes.", "No actor-visible file is written. Supplied material facts remain separately frozen.", "Command-only sandbox inherits user configuration; configuration isolation is not a filesystem read jail."] }));
console.log(json({ passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, sourceFiles: Object.keys(expected).length, fixtureFiles: source.files.length,
  reviewedOriginals: 1, inputDigest: manifest.digest, proof: join(setup, "probe.json"), actorWorkspaceWrites: 0 }));
