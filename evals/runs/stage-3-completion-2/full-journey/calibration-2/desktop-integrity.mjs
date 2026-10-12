// Prepared while calibration-2 is live. Run only after root confirms closure.
// Read-only: no subprocess, model, browser, signals, tests or file writes.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: { terminal: { type: "string" }, "root-confirmed-closed": { type: "boolean", default: false } } });
assert.equal(values["root-confirmed-closed"], true, "Root must confirm terminal closure before this audit");
assert.match(values.terminal ?? "", /^desktop-tool-(?:poll-\d+|finish)\.json$/, "Name the actual saved terminal tool record");
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const prior = join(directory, "../calibration-1"), implementation = join(directory, "implementation");
const measurementPrefix = "evals/runs/stage-3-completion-2/full-journey-measurement/";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const safe = path => typeof path === "string" && path && !path.startsWith("/") && !/[\\\0]/.test(path) && path.split("/").every(part => part && part !== "." && part !== "..");
async function bytes(base, path) {
  assert.ok(safe(path), "Unsafe evidence path: " + path); let current = base;
  for (const part of path.split("/")) { current = join(current, part); assert.ok(!(await lstat(current)).isSymbolicLink(), "Evidence symlink: " + path); }
  assert.ok((await lstat(current)).isFile(), "Evidence is not a regular file: " + path);
  return readFile(current);
}
const read = async (base, path) => JSON.parse(await bytes(base, path));
const shaFile = async (base, path) => hash(await bytes(base, path));
async function files(base, prefix = "") {
  const result = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name; assert.ok(!entry.isSymbolicLink(), "Artifact symlink");
    if (entry.isDirectory()) result.push(...await files(base, path));
    else { assert.ok(entry.isFile()); result.push(path); }
  }
  return result.sort();
}
async function artifactSet(base, manifest) {
  const expected = Object.keys(manifest.artifacts).sort();
  assert.deepEqual((await files(base)).filter(path => path !== "manifest.json"), expected, "Missing or unlisted artifact");
  for (const path of expected) assert.equal(await shaFile(base, path), manifest.artifacts[path], "Artifact bytes changed: " + path);
  return expected;
}
const terminal = await read(directory, values.terminal);
assert.equal(terminal.session_id, undefined, "The tool session is still live");
assert.ok(Number.isInteger(terminal.exit_code), "Terminal exit is missing");
const preparation = await read(directory, "preparation.json");
assert.equal(preparation.schemaVersion, 1); assert.equal(preparation.implementation.length, 23);
for (const row of preparation.references) { const data = await bytes(root, row.path); assert.equal(data.length, row.bytes); assert.equal(hash(data), row.sha256); }
for (const row of preparation.implementation) {
  const saved = await bytes(implementation, row.path), current = await bytes(root, row.path);
  assert.equal(saved.length, row.bytes); assert.equal(hash(saved), row.sha256); assert.equal(hash(current), row.sha256, "Implementation changed after preparation: " + row.path);
}
assert.deepEqual(await files(implementation), preparation.implementation.map(row => row.path).sort());
// Import only preserved, already-hash-verified read-only helpers.
const { captureSource } = await import(pathToFileURL(join(implementation, "evals/lib/build-capture.mjs")));
const { assertUnitCoverage, assessMode, buildInventory, modeCases } = await import(pathToFileURL(join(implementation, measurementPrefix + "measurement-lib.mjs")));
const { compareBuildIdentity } = await import(pathToFileURL(join(implementation, measurementPrefix + "cache-identity.mjs")));
const { settlementMatches } = await import(pathToFileURL(join(implementation, measurementPrefix + "controls-lib.mjs")));
const manifest = await read(directory, "desktop/artifacts/manifest.json");
const result = await read(directory, "desktop/review/result.json"), command = await read(directory, "desktop/review/command.json");
const outer = await read(directory, "desktop-command/result.json"), outerCommand = await read(directory, "desktop-command/command.json");
const targets = await read(prior, "final-targets.json"), build = await read(prior, "build/artifacts/manifest.json");
const policy = await read(implementation, measurementPrefix + "policy.json");
assert.equal(manifest.unit, "desktop"); assert.equal(manifest.workspace, preparation.work); assert.deepEqual(manifest.policy, policy); assert.deepEqual(manifest.expected, targets);
const artifactPaths = await artifactSet(join(directory, "desktop/artifacts"), manifest);
assert.equal(await shaFile(directory, "desktop-command/stdout.log"), outer.stdoutSha256);
assert.equal(await shaFile(directory, "desktop-command/stderr.log"), outer.stderrSha256);
const { output, ...returned } = JSON.parse(terminal.output);
assert.equal(output, join(directory, "desktop-command")); assert.deepEqual(returned, outer);
const outerStatusAgrees = terminal.exit_code === outer.code;
assert.equal((await bytes(directory, "desktop/review/stdout.log")).toString(), result.stdout);
assert.equal((await bytes(directory, "desktop/review/stderr.log")).toString(), result.stderr);
const wrapperSummary = JSON.parse((await bytes(directory, "desktop-command/stdout.log")).toString());
assert.deepEqual(wrapperSummary, { output: join(directory, "desktop"), code: result.code, sourceUnchanged: result.sourceUnchanged, scope: result.scope });
assert.equal(outer.code, result.code === 0 && result.sourceUnchanged && !result.timedOut && !result.externalSignal ? 0 : 1);
assert.equal(command.cwd, preparation.work); assert.equal(outerCommand.cwd, root);
assert.deepEqual(command.environment, outerCommand.environment);
assert.equal(outerCommand.wrapperSha256, preparation.implementation.find(row => row.path.endsWith("/record-command.mjs")).sha256);
assert.deepEqual({ timeoutMs: command.timeoutMs, graceMs: command.graceMs, totalCapMs: command.totalCapMs }, { timeoutMs: 475000, graceMs: 5000, totalCapMs: 480000 });
for (const key of ["timeoutMs", "graceMs", "totalCapMs"]) assert.equal(result[key], command[key]);
const events = (await bytes(directory, "desktop/review/lifecycle.jsonl")).toString().trim().split("\n").map(JSON.parse);
assert.equal(events[0].type, "spawn-request"); assert.equal(events.at(-1).type, "closed");
assert.deepEqual(events[0].args, command.args); assert.equal(events[0].executable, command.executable);
for (const event of events) { assert.equal(event.wrapperPid, result.wrapperPid); if (event.childPid !== null) assert.equal(event.childPid, result.childPid); }
assert.equal(events.at(-1).code, result.code); assert.equal(events.at(-1).signal, result.signal);
assert.equal(events.at(-1).timedOut, result.timedOut); assert.equal(events.at(-1).externalSignal, result.externalSignal);
const source = preparation.source; assert.equal(source.files.length, 86);
for (const current of [manifest.sourceBefore, manifest.sourceAfter, command.sourceBefore, result.sourceAfter, build.sourceBefore, build.sourceAfter, await captureSource(preparation.work)]) assert.deepEqual(current, source);
assert.equal(await shaFile(prior, "snapshot.json"), command.snapshotSha256); assert.equal(await shaFile(prior, "final-targets.json"), command.targetsSha256);
await artifactSet(join(prior, "build/artifacts"), build);
assert.equal(build.complete, true); assert.equal(build.passed, true);
assert.deepEqual(preparation.originalBuild, build.buildIdentity);
assert.deepEqual(manifest.buildIdentity, preparation.currentBuild);
assert.deepEqual(manifest.buildProof, { path: join(prior, "build/artifacts/manifest.json"), sha256: await shaFile(prior, "build/artifacts/manifest.json") });
assert.deepEqual(await buildInventory(preparation.work, policy), manifest.buildAfter);
const proofComparison = await compareBuildIdentity(preparation.work, build.buildIdentity, manifest.buildIdentity);
const afterComparison = await compareBuildIdentity(preparation.work, manifest.buildIdentity, manifest.buildAfter);
assert.deepEqual(proofComparison, preparation.comparison); assert.deepEqual(proofComparison, manifest.buildProofComparison);
assert.deepEqual(afterComparison, manifest.buildComparison); assert.equal(manifest.buildUnchanged, afterComparison.fullIdentityUnchanged); assert.equal(manifest.immutableBuildUnchanged, afterComparison.immutableBuildUnchanged);
for (const [path, digest] of Object.entries(manifest.frozen)) assert.equal(hash(await readFile(path)), digest, "Worker recorded implementation/dependency changed: " + path);
const oldManifestHash = "283b8153e10f6b4de2d09c5bbd12338b773ebf0226dfbe80f70aab90c6f7bb54";
assert.equal(await shaFile(prior, "desktop/artifacts/manifest.json"), oldManifestHash);
const oldManifest = await read(prior, "desktop/artifacts/manifest.json"); await artifactSet(join(prior, "desktop/artifacts"), oldManifest);
assert.equal(oldManifest.passed, false); assert.equal(oldManifest.buildUnchanged, false);
let report = null, coverageVerified = false, coverageError = null, reassessedProblems = null;
try {
  report = await read(directory, "desktop/artifacts/desktop/report.json");
  assertUnitCoverage("desktop", targets, manifest, [report]);
  const images = artifactPaths.filter(path => /\.(png|jpg)$/.test(path));
  assert.deepEqual(images, report.screenshots.map(path => "desktop/" + path).sort());
  assert.equal(new Set(images).size, images.length);
  reassessedProblems = assessMode(targets, modeCases(policy).find(row => row.id === "desktop"), report);
  assert.deepEqual(reassessedProblems, report.problems); assert.deepEqual(manifest.results[0].problems, report.problems);
  coverageVerified = true;
} catch (error) { coverageError = String(error); }
const trials = report?.controls?.flatMap(control => control.trials.map(trial => ({ key: control.key, ...trial }))) ?? [];
const checks = trials.filter(trial => trial.applicability !== "not-applicable").map(trial => ({ key: trial.key, method: trial.method,
  activated: trial.activated, changed: trial.changed, error: trial.error ?? null,
  beforeSettled: settlementMatches(trial.preActivationSettlement, [trial.before, trial.beforeImageObservation]),
  afterSettled: settlementMatches(trial.postActivationSettlement, [trial.after, trial.afterImageObservation]),
  peerPrepared: !!trial.peerPreparation, peerVerified: trial.peerPreparation?.verified ?? null }));
const images = artifactPaths.filter(path => /\.(png|jpg)$/.test(path));
console.log(JSON.stringify({ integrityVerified: true, at: new Date().toISOString(), modelCalls: 0, writes: false,
  outcomePreserved: { complete: manifest.complete, passed: manifest.passed, code: result.code, timedOut: result.timedOut, externalSignal: result.externalSignal, sourceUnchanged: manifest.sourceUnchanged, buildUnchanged: manifest.buildUnchanged, immutableBuildUnchanged: manifest.immutableBuildUnchanged, observationProblems: manifest.observationProblems, reportProblems: report?.problems ?? null, error: manifest.error ?? null },
  lifecycle: { started: result.started, finished: result.finished, durationMs: result.durationMs, events, outer, terminalExit: terminal.exit_code, outerStatusAgrees, wrapperPid: result.wrapperPid, workerPid: result.childPid },
  preparationSha256: await shaFile(directory, "preparation.json"), implementationFiles: preparation.implementation.length,
  source: { files: source.files.length, digest: source.digest }, artifactCount: artifactPaths.length,
  coverage: { verified: coverageVerified, error: coverageError, originals: images.length, samples: report?.samples?.length ?? 0, rests: report?.rests?.length ?? 0, transitions: report?.motion?.length ?? 0, travelFrames: report?.motion?.reduce((n, row) => n + row.frames.length, 0) ?? 0, controls: report?.controls?.length ?? 0, trials: trials.length, notApplicable: trials.filter(trial => trial.applicability === "not-applicable").length, controlOriginals: images.filter(path => path.startsWith("desktop/control-")).length, reassessedProblems },
  controlSettlement: checks, build: { originalFiles: build.buildIdentity.files.length, beforeFiles: manifest.buildIdentity.files.length, afterFiles: manifest.buildAfter.files.length, proofComparison, afterComparison },
  priorFailurePreserved: { manifestSha256: oldManifestHash, artifactCount: Object.keys(oldManifest.artifacts).length, passed: oldManifest.passed, buildUnchanged: oldManifest.buildUnchanged, problems: oldManifest.results[0].problems },
  hashes: Object.fromEntries(await Promise.all(["desktop/artifacts/manifest.json", "desktop/review/result.json", "desktop/review/lifecycle.jsonl", "desktop-command/result.json", values.terminal].map(async path => [path, await shaFile(directory, path)]))),
  limitations: "Coverage/integrity and scroll settlement do not prove visual/object quality, full-site scope, author acceptance or process absence. Root owns original-image review and confirms closure; a separate metadata-only process scan is still required."
}, null, 2));
