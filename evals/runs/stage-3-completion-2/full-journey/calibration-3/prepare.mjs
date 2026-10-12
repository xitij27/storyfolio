// Prospective calibration-3 freeze only. No browser, model, install or rebuild.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { lstat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { root, implementationPaths, transitivePaths, regularBytes, captureSource, inventory, assertSnapshot, hash, json, writeNew } from "../../full-journey-measurement/binding-lib.mjs";
import { bounds, buildInventory, observationProblems, validateTargets } from "../../full-journey-measurement/measurement-lib.mjs";
import { compareBuildIdentity } from "../../full-journey-measurement/cache-identity.mjs";

const first = "evals/runs/stage-3-completion-2/full-journey/calibration-1";
const second = "evals/runs/stage-3-completion-2/full-journey/calibration-2";
const output = "evals/runs/stage-3-completion-2/full-journey/calibration-3";
const measurement = "evals/runs/stage-3-completion-2/full-journey-measurement/";
const longevity = "evals/runs/stage-3-completion-2/process-supervision/longevity-1/";
const recorder = "evals/runs/stage-3-completion-2/process-supervision/recorder.mjs";
const { values } = parseArgs({ options: { "longevity-disposition": { type: "string" } } });
const decisionPath = values["longevity-disposition"];
assert.ok(typeof decisionPath === "string" && decisionPath.startsWith(longevity) && decisionPath.endsWith(".md"), "Supply the actual committed root longevity disposition, not a launch decision");
assert.ok(!decisionPath.endsWith("/launch-decision.md"), "Prospective longevity launch is not its outcome disposition");
const decisionBytes = await regularBytes(root, decisionPath);
assert.ok(decisionBytes.toString("utf8").trim(), "Longevity disposition must not be empty");
const paths = [...implementationPaths, ...transitivePaths];
assert.equal(paths.length, 23); assert.equal(new Set(paths).size, 23);
assert.ok(paths.includes(recorder));
const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8", timeout: 30000 }).trim();
const selected = [...paths, output + "/prepare.mjs", output + "/protocol.md", decisionPath];
assert.equal(git("status", "--porcelain", "--", ...selected), "", "Commit final helper/protocol and longevity disposition before freezing");
for (const path of selected) git("ls-files", "--error-unmatch", "--", path);
const commit = git("rev-parse", "HEAD");

const references = new Map();
async function reference(path, expected) {
  const bytes = await regularBytes(root, path), sha256 = hash(bytes);
  if (expected) assert.equal(sha256, expected, "Historical reference changed: " + path);
  references.set(path, { path, sha256, bytes: bytes.length }); return bytes;
}
const read = async (path, expected) => JSON.parse(await reference(path, expected));
const absent = async path => {
  try { await lstat(join(root, path)); assert.fail("Refusing existing or reconstructed output: " + path); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
};
for (const path of ["implementation", "preparation.json", "launch.json", "desktop", "desktop-command"]) await absent(output + "/" + path);

const source = await read(first + "/source.json", "63b4672d073f498ac6fa1f2c020b8d13831bb6cb1dca40f25c8dee6af38fb43d");
const snapshot = await read(first + "/snapshot.json", "7f20e10b1955d50e0132c722d0bbf7b2d5a2c77e00f5c29830d815321c9a1d11");
const targets = await read(first + "/final-targets.json", "10446d35bd6576b0a14cb78536fecc217a6efffd0bacc0963b4514dc7b290347");
const allocation = await read(first + "/allocation.json");
const proofPath = first + "/build/artifacts/manifest.json";
const proof = await read(proofPath, "ef024afde05ac2d9d44709cc1771e6bd39e090fc93c0d35e3df5634e0defcea3");
const prior = await read(second + "/preparation.json", "b7b33cec9a7d0e56e2e6631331821a2c42475d80af02265e01cfa6e39f71350a");
const partial = await read(second + "/partial-integrity-result.json", "bebdce3db5e17dbcec068f97866b803b38f9a56ca1437442ca5e42547abde459");
assert.equal(source.files.length, 86); assertSnapshot(source, snapshot.files);
assert.equal(source.digest, "1c499ad1346aa437d5701993b7b71f1b60cc35670e9afe0b7c76d48a1c18a060");
assert.equal(allocation.work, prior.work); assert.equal(proof.workspace, prior.work);
assert.deepEqual(prior.source, source); assert.deepEqual(partial.sourceObservation, source);
assert.deepEqual(await captureSource(prior.work), source);
assert.equal(proof.unit, "build"); assert.equal(proof.complete, true); assert.equal(proof.passed, true); assert.equal(proof.sourceUnchanged, true);
assert.deepEqual(proof.sourceBefore, source); assert.deepEqual(proof.sourceAfter, source);
assert.deepEqual(proof.buildIdentity, prior.originalBuild); assert.equal(proof.buildIdentity.files.length, 167);
assert.equal(process.version, proof.node);
assert.deepEqual(validateTargets(targets), []); assert.equal(targets.stage, 6); assert.equal(targets.calibrationOnly, true);
assert.deepEqual(targets, proof.expected); assert.equal(targets.beats.length, 5); assert.equal(targets.sourceDigest, source.digest);

async function verifyArtifacts(base, manifest) {
  const rows = (await inventory(join(root, base))).filter(row => row.path !== "manifest.json");
  assert.deepEqual(rows.map(row => row.path).sort(), Object.keys(manifest.artifacts).sort(), "Historical artifact set changed: " + base);
  for (const row of rows) assert.equal(row.sha256, manifest.artifacts[row.path], "Historical artifact changed: " + base + "/" + row.path);
  return rows.length;
}
const originalBuildArtifacts = await verifyArtifacts(first + "/build/artifacts", proof);
assert.equal(originalBuildArtifacts, 8);
const oldFailed = await read(first + "/desktop/artifacts/manifest.json", "283b8153e10f6b4de2d09c5bbd12338b773ebf0226dfbe80f70aab90c6f7bb54");
assert.equal(oldFailed.complete, true); assert.equal(oldFailed.passed, false); assert.equal(oldFailed.buildUnchanged, false);
const originalFailedArtifacts = await verifyArtifacts(first + "/desktop/artifacts", oldFailed);
assert.equal(originalFailedArtifacts, 109);

// Verify the actual archived second implementation, not the now changed code.
assert.equal(prior.implementation.length, 23);
for (const row of prior.references) await reference(row.path, row.sha256);
const archived = await inventory(join(root, second, "implementation"));
assert.deepEqual(archived.map(row => row.path).sort(), prior.implementation.map(row => row.path).sort());
for (const row of archived) assert.deepEqual(row, prior.implementation.find(previous => previous.path === row.path));
assert.equal(partial.partialIntegrityVerified, true); assert.equal(partial.captureComplete, false); assert.equal(partial.technicalPass, false);
assert.equal(partial.preparation.sha256, references.get(second + "/preparation.json").sha256);
assert.deepEqual(partial.buildObservation, prior.currentBuild); assert.deepEqual(partial.originalBuildComparison, prior.comparison);
const partialManifest = await read(second + "/desktop/artifacts/manifest.json", partial.partialManifest.sha256);
assert.equal(partialManifest.complete, false); assert.equal(partialManifest.unit, "desktop"); assert.deepEqual(partialManifest.results, []);
assert.deepEqual(partialManifest.sourceBefore, source); assert.deepEqual(partialManifest.expected, targets);
for (const key of partial.partialManifest.terminalFieldsAbsent) assert.equal(Object.hasOwn(partialManifest, key), false);
for (const path of partial.missingEvidence) await absent(second + "/" + path);
const narrowRows = rows => rows.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 })).sort((a, b) => a.path.localeCompare(b.path));
const partialArtifacts = await inventory(join(root, second, "desktop/artifacts"));
assert.deepEqual(narrowRows(partialArtifacts), narrowRows(partial.artifactInventory));
assert.equal(partialArtifacts.length, 81);
const rawRows = [];
for (const directory of ["desktop/review", "desktop-command"]) for (const row of await inventory(join(root, second, directory))) rawRows.push({ ...row, path: directory + "/" + row.path });
assert.deepEqual(narrowRows(rawRows), narrowRows(partial.rawInventory));
for (const [path, digest] of Object.entries(partial.evidenceHashes)) await reference(second + "/" + path, digest);
await reference(second + "/" + partial.rootReview.path, partial.rootReview.sha256);
const oldOuter = await read(second + "/desktop-command/command.json");
assert.equal(process.execPath, oldOuter.executable);
const environment = Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, process.env[key] ?? null]));
assert.deepEqual(environment, oldOuter.environment, "Keep the recorded calibration environment");
for (const [absolute, digest] of Object.entries(partialManifest.frozen)) {
  const path = absolute.startsWith(root + "/") ? absolute.slice(root.length + 1) : null;
  const saved = prior.implementation.find(row => row.path === path);
  if (saved) assert.equal(saved.sha256, digest, "Archived helper does not match old launch");
  else assert.equal(hash(await readFile(absolute)), digest, "Historical target/dependency changed");
}
const policy = await read(measurement + "policy.json");
assert.deepEqual(bounds("desktop", policy), { timeoutMs: 1495000, graceMs: 5000, totalCapMs: 1500000 });
assert.deepEqual(observationProblems(targets, policy), ["final beat count 5, normal scope 12 to 22"]);
const currentBuild = await buildInventory(prior.work, policy);
assert.equal(currentBuild.files.length, 173); assert.deepEqual(currentBuild, prior.currentBuild);
assert.equal(currentBuild.digest, "35f65c100277899a70aa4b0be1a0921914bbc21c6f9227f93031e3b2149dc671");
const comparison = await compareBuildIdentity(prior.work, proof.buildIdentity, currentBuild);
assert.deepEqual(comparison, prior.comparison);

// All checks precede the exclusive freeze. These copies are actual current
// helper bytes, not a relabelled calibration-2 implementation.
const implementation = [];
const helperBytes = new Map();
for (const path of paths) {
  const bytes = await regularBytes(root, path); helperBytes.set(path, bytes);
  implementation.push({ path, sha256: hash(bytes), bytes: bytes.length });
}
for (const path of [output + "/protocol.md", output + "/prepare.mjs"]) await reference(path);
await reference(decisionPath, hash(decisionBytes));
await mkdir(join(root, output, "implementation"));
for (const [path, bytes] of helperBytes) await writeNew(join(root, output, "implementation", path), bytes);
for (const row of implementation) assert.equal(hash(await regularBytes(root, row.path)), row.sha256, "Helper changed while freezing");
assert.equal(hash(await regularBytes(root, decisionPath)), hash(decisionBytes), "Longevity disposition changed while freezing");
assert.deepEqual(await captureSource(prior.work), source); assert.deepEqual(await buildInventory(prior.work, policy), currentBuild);
const preparedAt = new Date().toISOString();
const launch = { schemaVersion: 1, scope: "One new-label unchanged-prototype desktop apparatus calibration only", output,
  outerRecorder: recorder, outerRecorderSha256: implementation.find(row => row.path === recorder).sha256,
  cwd: root, executable: process.execPath,
  args: [recorder, output + "/desktop-command", root, process.execPath, measurement + "calibrate.mjs",
    "--workspace=" + prior.work, "--snapshot=" + first + "/snapshot.json", "--targets=" + first + "/final-targets.json",
    "--out=" + output + "/desktop", "--unit=desktop", "--build-proof=" + join(root, proofPath)],
  environment, limits: bounds("desktop", policy), terminalTransport: "Selected by root in the committed longevity disposition; preparation does not launch",
  modelCalls: 0, installs: 0, rebuilds: 0, siteEdits: 0, additionalModes: 0, automaticRetries: 0 };
await writeNew(join(root, output, "launch.json"), json(launch));
const record = { schemaVersion: 1, preparedAt, commit, scope: launch.scope,
  prerequisite: { path: decisionPath, sha256: hash(decisionBytes), meaning: "Root's committed post-longevity disposition is required; its semantic decision and process closure remain root-reviewed, not inferred by this helper." },
  work: prior.work, source, references: [...references.values()], implementation,
  originalBuild: proof.buildIdentity, currentBuild, comparison,
  preserved: { originalBuildArtifacts, originalFailedArtifacts, secondCaptureComplete: false, secondTechnicalPass: false,
    secondPartialArtifacts: partialArtifacts.length, secondRawFiles: rawRows.length, secondOriginalImages: partial.coverage.originals, missingEvidence: partial.missingEvidence },
  launch: { path: output + "/launch.json", sha256: hash(await regularBytes(root, output + "/launch.json")) },
  limitations: "Preparation and byte identity only, not browser execution, process-absence proof, complete calibration, visual pass or Stage 3 acceptance." };
await writeNew(join(root, output, "preparation.json"), json(record));
console.log(json({ output, preparedAt, commit, implementationFiles: implementation.length, sourceFiles: source.files.length, buildFiles: currentBuild.files.length,
  sourceDigest: source.digest, limits: launch.limits, expectedScopeFailure: observationProblems(targets, policy), launched: false, modelCalls: 0 }));
