// Prepared during the capture. Run only after root confirms terminal closure
// and finishes its original-image review. Read-only, no subprocess or signals.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: { terminal: { type: "string" }, review: { type: "string" }, "root-confirmed-closed": { type: "boolean", default: false }, "root-confirmed-review": { type: "boolean", default: false } } });
assert.equal(values["root-confirmed-closed"], true); assert.equal(values["root-confirmed-review"], true);
assert.match(values.terminal ?? "", /^desktop-tool-(?:poll-\d+|finish)\.json$/);
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const first = join(directory, "../calibration-1"), second = join(directory, "../calibration-2"), implementation = join(directory, "implementation");
const prefix = "evals/runs/stage-3-completion-2/full-journey-measurement/";
const ownPrefix = "evals/runs/stage-3-completion-2/full-journey/calibration-3/";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const safe = path => typeof path === "string" && path && !path.startsWith("/") && !/[\\\0]/.test(path) && path.split("/").every(part => part && part !== "." && part !== "..");
async function bytes(base, path) {
  assert.ok(safe(path), "Unsafe evidence path: " + path); let current = base;
  for (const part of path.split("/")) { current = join(current, part); assert.ok(!(await lstat(current)).isSymbolicLink(), "Evidence symlink: " + path); }
  assert.ok((await lstat(current)).isFile()); return readFile(current);
}
const read = async (base, path) => JSON.parse(await bytes(base, path));
const sha = async (base, path) => hash(await bytes(base, path));
async function files(base, prefix = "") {
  const result = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name; assert.ok(!entry.isSymbolicLink(), "Artifact symlink: " + path);
    if (entry.isDirectory()) result.push(...await files(base, path)); else { assert.ok(entry.isFile()); result.push(path); }
  }
  return result.sort();
}
async function inventory(base) {
  return Promise.all((await files(base)).map(async path => { const data = await bytes(base, path); return { path, bytes: data.length, sha256: hash(data) }; }));
}
async function artifactSet(base, manifest) {
  const rows = await inventory(base), actual = rows.filter(row => row.path !== "manifest.json");
  assert.deepEqual(actual.map(row => row.path), Object.keys(manifest.artifacts).sort());
  for (const row of actual) assert.equal(row.sha256, manifest.artifacts[row.path], "Artifact changed: " + row.path);
  return actual;
}
async function absent(base, path) {
  try { await lstat(join(base, path)); assert.fail("Missing historical evidence was reconstructed: " + path); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
}
const narrow = rows => rows.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 })).sort((a, b) => a.path.localeCompare(b.path));
const observedFrom = new Date().toISOString();
const terminalRecord = await read(directory, values.terminal), terminal = terminalRecord.result ?? terminalRecord;
assert.equal(terminal.session_id, undefined); assert.ok(Number.isInteger(terminal.exit_code));
const preparation = await read(directory, "preparation.json"), launch = await read(directory, "launch.json");
assert.equal(preparation.implementation.length, 23); assert.equal(new Set(preparation.implementation.map(row => row.path)).size, 23);
assert.equal(preparation.launch.path, ownPrefix + "launch.json"); assert.equal(await sha(directory, "launch.json"), preparation.launch.sha256);
for (const row of preparation.references) { const data = await bytes(root, row.path); assert.equal(data.length, row.bytes); assert.equal(hash(data), row.sha256); }
assert.deepEqual(await files(implementation), preparation.implementation.map(row => row.path).sort());
for (const row of preparation.implementation) {
  const saved = await bytes(implementation, row.path), current = await bytes(root, row.path);
  assert.equal(saved.length, row.bytes); assert.equal(hash(saved), row.sha256); assert.equal(hash(current), row.sha256, "Current launch implementation drift: " + row.path);
}
// Use only already-verified preserved pure/read-only helpers.
const { captureSource } = await import(pathToFileURL(join(implementation, "evals/lib/build-capture.mjs")));
const { assertUnitCoverage, assessMode, buildInventory, modeCases, observationProblems } = await import(pathToFileURL(join(implementation, prefix + "measurement-lib.mjs")));
const { compareBuildIdentity } = await import(pathToFileURL(join(implementation, prefix + "cache-identity.mjs")));
const { settlementMatches } = await import(pathToFileURL(join(implementation, prefix + "controls-lib.mjs")));
const manifest = await read(directory, "desktop/artifacts/manifest.json"), report = await read(directory, "desktop/artifacts/desktop/report.json");
const result = await read(directory, "desktop/review/result.json"), command = await read(directory, "desktop/review/command.json");
const outer = await read(directory, "desktop-command/result.json"), outerCommand = await read(directory, "desktop-command/command.json");
const parseEvents = data => data.toString().trim().split("\n").map(JSON.parse);
const events = parseEvents(await bytes(directory, "desktop/review/lifecycle.jsonl"));
const outerEvents = parseEvents(await bytes(directory, "desktop-command/lifecycle.jsonl"));
assert.equal(outer.schemaVersion, 1); assert.deepEqual(Object.keys(outer.rawArtifacts).sort(), ["command.json", "lifecycle.jsonl", "stderr.log", "stdout.log"]);
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(await sha(directory, "desktop-command/" + path), digest);
assert.equal(outerCommand.recorderSha256, launch.outerRecorderSha256); assert.equal(outerCommand.cwd, launch.cwd); assert.equal(outerCommand.executable, launch.executable);
assert.deepEqual(outerCommand.args, launch.args.slice(4)); assert.deepEqual(outerCommand.environment, launch.environment);
assert.equal(outer.recorderPid, outerCommand.recorderPid); assert.equal(outer.recorderParentPid, outerCommand.recorderParentPid); assert.equal(outer.shutdownGraceMs, outerCommand.shutdownGraceMs);
for (const field of ["childSpawned", "childExited", "childClosed"]) assert.equal(outer[field], true);
for (const field of ["interruptedBy", "signalSender", "childError", "signal"]) assert.equal(outer[field], null);
for (const field of ["signalForwarded", "forceAttempted"]) assert.equal(outer[field], false);
assert.equal(outer.complete, outer.code === 0); assert.equal(outer.status, outer.code === 0 ? "child-exited-successfully" : "child-exited-unsuccessfully");
assert.deepEqual(outerEvents.map(row => row.sequence), [1, 2, 3, 4]);
assert.deepEqual(outerEvents.map(row => row.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
assert.equal(outerEvents[0].recorderPid, outer.recorderPid);
for (const event of outerEvents.slice(1)) assert.equal(event.childPid, outer.childPid);
for (const event of outerEvents.slice(2)) { assert.equal(event.code, outer.code); assert.equal(event.signal, null); }
const lastOutputLine = terminal.output.trim().split(/\r?\n/).at(-1), returned = JSON.parse(lastOutputLine), { output: outerOutput, ...returnedResult } = returned;
assert.equal(outerOutput, join(directory, "desktop-command")); assert.deepEqual(returnedResult, outer); assert.equal(terminal.exit_code, outer.complete ? 0 : 1);
assert.deepEqual(JSON.parse((await bytes(directory, "desktop-command/stdout.log")).toString()), { output: join(directory, "desktop"), code: result.code, sourceUnchanged: result.sourceUnchanged, logError: result.logError, scope: result.scope });
assert.equal((await bytes(directory, "desktop/review/stdout.log")).toString(), result.stdout);
assert.equal((await bytes(directory, "desktop/review/stderr.log")).toString(), result.stderr);
assert.equal(result.wrapperPid, outer.childPid); assert.equal(command.cwd, preparation.work); assert.equal(command.executable, launch.executable); assert.deepEqual(command.environment, launch.environment);
assert.deepEqual(events.map(row => row.type), ["spawn-request", "spawned", "exit", "closed"]);
assert.deepEqual(events[0].args, command.args); assert.equal(events[0].executable, command.executable);
for (const event of events) { assert.equal(event.wrapperPid, result.wrapperPid); assert.equal(event.childPid, result.childPid); }
for (const event of events.slice(2)) { assert.equal(event.code, result.code); assert.equal(event.signal, null); }
assert.equal(result.timedOut, false); assert.equal(result.externalSignal, null); assert.equal(result.spawnError, null); assert.equal(result.signal, null); assert.equal(result.logError, null);
assert.equal(events.at(-1).timedOut, false); assert.equal(events.at(-1).externalSignal, null);
for (const key of ["timeoutMs", "graceMs", "totalCapMs"]) { assert.equal(command[key], launch.limits[key]); assert.equal(result[key], launch.limits[key]); }
assert.deepEqual(launch.limits, { timeoutMs: 1495000, graceMs: 5000, totalCapMs: 1500000 });
assert.equal(outer.code, result.code === 0 && result.sourceUnchanged && !result.timedOut && !result.externalSignal && !result.logError ? 0 : 1);
const targets = await read(first, "final-targets.json"), build = await read(first, "build/artifacts/manifest.json"), policy = await read(implementation, prefix + "policy.json");
assert.equal(manifest.complete, true, "Use a separate partial audit for interrupted/incomplete output"); assert.equal(manifest.unit, "desktop"); assert.equal(manifest.workspace, preparation.work);
assert.deepEqual(manifest.expected, targets); assert.deepEqual(manifest.policy, policy); assert.equal(report.sourceDigest, preparation.source.digest);
const artifactRows = await artifactSet(join(directory, "desktop/artifacts"), manifest);
assert.equal(preparation.source.files.length, 86);
for (const source of [manifest.sourceBefore, manifest.sourceAfter, command.sourceBefore, result.sourceAfter, build.sourceBefore, build.sourceAfter, await captureSource(preparation.work)]) assert.deepEqual(source, preparation.source);
assert.equal(manifest.sourceUnchanged, true); assert.equal(result.sourceUnchanged, true);
assert.equal(await sha(first, "snapshot.json"), command.snapshotSha256); assert.equal(await sha(first, "final-targets.json"), command.targetsSha256);
assert.deepEqual(manifest.buildProof, { path: join(first, "build/artifacts/manifest.json"), sha256: await sha(first, "build/artifacts/manifest.json") });
assert.deepEqual(build.buildIdentity, preparation.originalBuild); assert.deepEqual(manifest.buildIdentity, preparation.currentBuild);
const currentBuild = await buildInventory(preparation.work, policy); assert.deepEqual(currentBuild, manifest.buildAfter);
const proofComparison = await compareBuildIdentity(preparation.work, build.buildIdentity, manifest.buildIdentity);
const afterComparison = await compareBuildIdentity(preparation.work, manifest.buildIdentity, manifest.buildAfter);
assert.deepEqual(proofComparison, preparation.comparison); assert.deepEqual(proofComparison, manifest.buildProofComparison); assert.deepEqual(afterComparison, manifest.buildComparison);
assert.equal(manifest.buildUnchanged, afterComparison.fullIdentityUnchanged); assert.equal(manifest.immutableBuildUnchanged, afterComparison.immutableBuildUnchanged); assert.equal(manifest.immutableBuildUnchanged, true);
for (const [path, digest] of Object.entries(manifest.frozen)) assert.equal(hash(await readFile(path)), digest);
const originals = artifactRows.filter(row => /\.(png|jpe?g)$/i.test(row.path));
assert.deepEqual(originals.map(row => row.path), report.screenshots.map(path => "desktop/" + path).sort()); assert.equal(new Set(report.screenshots).size, report.screenshots.length);
const reviewed = await read(directory, values.review); assert.equal(reviewed.schemaVersion, 1); assert.equal(reviewed.allAvailableOriginalsReviewed, true); assert.equal(reviewed.captureComplete, manifest.complete);
assert.equal(new Set(reviewed.images.map(row => row.path)).size, reviewed.images.length);
for (const row of reviewed.images) assert.equal(row.viewMethod, "view_image original");
assert.deepEqual(narrow(reviewed.images), narrow(originals.map(row => ({ ...row, path: ownPrefix + "desktop/artifacts/" + row.path }))));
let coverageVerified = false, coverageError = null;
try {
  assertUnitCoverage("desktop", targets, manifest, [report]);
  assert.deepEqual(report.samples.map(row => [row.beat, row.position]), [[null, "top"], ...targets.beats.flatMap(beat => ["start", "mid", "end", "rest"].map(position => [beat.id, position]))]);
  for (const [index, beat] of targets.beats.entries()) for (const position of ["mid", "end"]) assert.ok(report.screenshots.includes(`${String(index).padStart(2, "0")}-${beat.id.replace(/[^\w.-]/g, "_")}-${position}.png`));
  coverageVerified = true;
} catch (error) { coverageError = String(error); }
const mode = modeCases(policy).find(row => row.id === "desktop"), assessedProblems = assessMode(targets, mode, report);
assert.deepEqual(report.entry, mode); assert.deepEqual(report.problems, assessedProblems);
assert.equal(manifest.results.length, 1); assert.equal(manifest.results[0].id, "desktop"); assert.equal(manifest.results[0].report, "desktop/report.json");
assert.deepEqual(manifest.results[0].problems, report.problems); assert.equal(manifest.results[0].passed, report.problems.length === 0);
const scopeProblems = observationProblems(targets, policy); assert.deepEqual(manifest.observationProblems, scopeProblems); assert.deepEqual(scopeProblems, ["final beat count 5, normal scope 12 to 22"]);
const actualModePass = manifest.complete && !manifest.error && !manifest.files.some(file => !file.exists) && !manifest.commands.some(command => command.name !== "server" && command.code !== 0) && manifest.results.every(row => row.passed) && !manifest.artifactError;
assert.equal(manifest.passed, Boolean(actualModePass)); assert.equal(result.code, manifest.passed ? 0 : 1);
const buildArtifacts = await artifactSet(join(first, "build/artifacts"), build);
const oldFailed = await read(first, "desktop/artifacts/manifest.json"); assert.equal(await sha(first, "desktop/artifacts/manifest.json"), "283b8153e10f6b4de2d09c5bbd12338b773ebf0226dfbe80f70aab90c6f7bb54");
const oldArtifacts = await artifactSet(join(first, "desktop/artifacts"), oldFailed); assert.equal(oldFailed.passed, false);
const partial = await read(second, "partial-integrity-result.json"), oldPreparation = await read(second, "preparation.json");
assert.equal(partial.captureComplete, false); assert.equal(partial.technicalPass, false);
assert.deepEqual(narrow(await inventory(join(second, "desktop/artifacts"))), narrow(partial.artifactInventory));
const oldRaw = [];
for (const base of ["desktop/review", "desktop-command"]) oldRaw.push(...(await inventory(join(second, base))).map(row => ({ ...row, path: base + "/" + row.path })));
assert.deepEqual(narrow(oldRaw), narrow(partial.rawInventory));
for (const path of partial.missingEvidence) await absent(second, path);
assert.deepEqual(narrow(await inventory(join(second, "implementation"))), narrow(oldPreparation.implementation));
const trials = report.controls.flatMap(control => control.trials.map(trial => ({ key: control.key, name: control.name, ...trial })));
const trialObservations = trials.map(trial => ({ key: trial.key, name: trial.name, method: trial.method, applicability: trial.applicability, reached: trial.reached, activated: trial.activated, changed: trial.changed ?? null, error: trial.error ?? null,
  responseStatus: trial.responseStatus ?? null, pixelsChanged: trial.pixelsChanged ?? null, beforeGeometry: trial.before?.geometry ?? null, afterGeometry: trial.after?.geometry ?? null,
  beforeFocused: trial.before?.focused ?? null, beforeVisible: trial.before?.visible ?? null, beforeInView: trial.before?.inView ?? null, beforeHitTarget: trial.before?.hitTarget ?? null,
  preActivationSettled: settlementMatches(trial.preActivationSettlement, [trial.before, trial.beforeImageObservation]), postActivationSettled: settlementMatches(trial.postActivationSettlement, [trial.after, trial.afterImageObservation]),
  peerPreparationVerified: trial.peerPreparation?.verified ?? null, declaredTargets: trial.targets ?? [] }));
assert.deepEqual(await inventory(join(directory, "desktop/artifacts")), [...artifactRows, { path: "manifest.json", bytes: (await bytes(directory, "desktop/artifacts/manifest.json")).length, sha256: await sha(directory, "desktop/artifacts/manifest.json") }].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
console.log(JSON.stringify({ schemaVersion: 1, integrityVerified: true, observedFrom, observedUntil: new Date().toISOString(), writes: false, modelCalls: 0,
  outcomePreserved: { complete: manifest.complete, rawModePassed: manifest.passed, workerCode: result.code, outerCode: outer.code, outerComplete: outer.complete, timedOut: result.timedOut, externalSignal: result.externalSignal, sourceUnchanged: manifest.sourceUnchanged, buildUnchanged: manifest.buildUnchanged, immutableBuildUnchanged: manifest.immutableBuildUnchanged, scopeProblems, reportProblems: report.problems, error: manifest.error ?? null, artifactError: manifest.artifactError ?? null, entireScopePassed: manifest.passed && scopeProblems.length === 0 },
  preparation: { sha256: await sha(directory, "preparation.json"), implementationFiles: preparation.implementation.length, references: preparation.references.length, launchSha256: await sha(directory, "launch.json") },
  lifecycle: { inner: result, events, outer, outerEvents, terminalExit: terminal.exit_code, knownPids: [outer.recorderPid, outer.childPid, result.childPid] },
  source: { files: preparation.source.files.length, digest: preparation.source.digest }, artifactInventory: artifactRows,
  build: { originalFiles: build.buildIdentity.files.length, beforeFiles: manifest.buildIdentity.files.length, afterFiles: manifest.buildAfter.files.length, proofComparison, afterComparison },
  coverage: { verified: coverageVerified, error: coverageError, originals: originals.length, midEndOriginals: originals.filter(row => /^desktop\/\d+-/.test(row.path)).length, rests: report.rests.length, transitions: report.motion.length, travelFrames: report.motion.reduce((sum, row) => sum + row.frames.length, 0), controls: report.controls.length, trials: trials.length, notApplicable: trials.filter(trial => trial.applicability === "not-applicable").length, controlOriginals: originals.filter(row => row.path.startsWith("desktop/control-")).length, samples: report.samples.length, wording: report.wording.length, rawControlCensuses: report.rawControlCensus.length },
  originalReview: { path: values.review, sha256: await sha(directory, values.review), exactImageSetAndHashes: true, count: reviewed.images.length, pixelsIndependentlyViewedByThisAuditor: false },
  controls: trialObservations,
  priorEvidencePreserved: { originalBuildArtifacts: buildArtifacts.length, failedDesktopArtifacts: oldArtifacts.length, partialArtifacts: partial.artifactInventory.length, partialRawFiles: oldRaw.length, partialComplete: false, partialTechnicalPass: false },
  hashes: Object.fromEntries(await Promise.all(["desktop/artifacts/manifest.json", "desktop/artifacts/desktop/report.json", "desktop/review/command.json", "desktop/review/result.json", "desktop/review/lifecycle.jsonl", "desktop-command/result.json", "desktop-command/lifecycle.jsonl", values.terminal, "desktop-integrity.mjs"].map(async path => [path, await sha(directory, path)]))),
  limitations: "Read-only source/artifact/lifecycle/coverage audit. Root owns pixel review. Completed worker/normal outer closure with a failed mode is not successful visual acceptance. Scope count remains separate from raw mode pass. A separate exact-ownership process scan is still required; this audit does not signal processes or claim descendant absence."
}, null, 2));
