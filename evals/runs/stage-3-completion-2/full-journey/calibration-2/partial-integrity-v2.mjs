// Post-interruption, read-only preservation audit, second version.
// Original strict current-code attempt and failure are preserved separately.
// Verify archived launch implementation; report current prospective-code drift.
// No subprocess, browser, model, test, signal or workspace write.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const prior = join(directory, "../calibration-1"), implementation = join(directory, "implementation");
const prefix = "evals/runs/stage-3-completion-2/full-journey-measurement/";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const safe = path => typeof path === "string" && path && !path.startsWith("/") && !/[\\\0]/.test(path) && path.split("/").every(part => part && part !== "." && part !== "..");
async function bytes(base, path) {
  assert.ok(safe(path)); let current = base;
  for (const part of path.split("/")) { current = join(current, part); assert.ok(!(await lstat(current)).isSymbolicLink(), "Evidence symlink: " + path); }
  assert.ok((await lstat(current)).isFile()); return readFile(current);
}
const read = async (base, path) => JSON.parse(await bytes(base, path));
const sha = async (base, path) => hash(await bytes(base, path));
async function files(base, prefix = "") {
  const result = [];
  for (const entry of await readdir(join(base, prefix), { withFileTypes: true })) {
    const path = prefix ? prefix + "/" + entry.name : entry.name;
    assert.ok(!entry.isSymbolicLink(), "Evidence symlink: " + path);
    if (entry.isDirectory()) result.push(...await files(base, path));
    else { assert.ok(entry.isFile()); result.push(path); }
  }
  return result.sort();
}
async function inventory(base) {
  return Promise.all((await files(base)).map(async path => {
    const data = await bytes(base, path), stat = await lstat(join(base, path));
    return { path, bytes: data.length, sha256: hash(data), modifiedAt: stat.mtime.toISOString() };
  }));
}
async function absent(path) {
  try { await lstat(join(directory, path)); return false; }
  catch (error) { if (error.code === "ENOENT") return true; throw error; }
}
async function oldArtifacts(base, manifest) {
  assert.deepEqual((await files(base)).filter(path => path !== "manifest.json"), Object.keys(manifest.artifacts).sort());
  for (const [path, digest] of Object.entries(manifest.artifacts)) assert.equal(await sha(base, path), digest, "Old artifact changed: " + path);
  return Object.keys(manifest.artifacts).length;
}
const observedFrom = new Date().toISOString();
const preparation = await read(directory, "preparation.json");
assert.equal(preparation.implementation.length, 23);
for (const row of preparation.references) { const data = await bytes(root, row.path); assert.equal(data.length, row.bytes); assert.equal(hash(data), row.sha256); }
const implementationObservation = [];
for (const row of preparation.implementation) {
  const saved = await bytes(implementation, row.path), current = await bytes(root, row.path);
  assert.equal(saved.length, row.bytes); assert.equal(hash(saved), row.sha256);
  implementationObservation.push({ path: row.path, expectedSha256: row.sha256, observedSha256: hash(current), currentMatchesLaunch: hash(current) === row.sha256 });
}
assert.deepEqual(await files(implementation), preparation.implementation.map(row => row.path).sort());
const { captureSource } = await import(pathToFileURL(join(implementation, "evals/lib/build-capture.mjs")));
const { buildInventory } = await import(pathToFileURL(join(implementation, prefix + "measurement-lib.mjs")));
const { compareBuildIdentity } = await import(pathToFileURL(join(implementation, prefix + "cache-identity.mjs")));
const manifest = await read(directory, "desktop/artifacts/manifest.json");
const command = await read(directory, "desktop/review/command.json"), outer = await read(directory, "desktop-command/command.json");
const terminal = await read(directory, "desktop-tool-poll-4.json");
const policy = await read(implementation, prefix + "policy.json"), targets = await read(prior, "final-targets.json");
assert.equal(terminal.exit_code, 143); assert.equal(terminal.output, ""); assert.equal(terminal.session_id, undefined);
assert.equal(manifest.complete, false); assert.equal(manifest.unit, "desktop"); assert.equal(manifest.workspace, preparation.work);
assert.deepEqual(manifest.results, []); assert.deepEqual(manifest.policy, policy); assert.deepEqual(manifest.expected, targets);
const missing = ["desktop-command/result.json", "desktop/review/result.json", "desktop/review/lifecycle.jsonl", "desktop/review/stdout.log", "desktop/review/stderr.log", "desktop/artifacts/desktop/report.json"];
for (const path of missing) assert.equal(await absent(path), true, "Unexpected newly present terminal evidence: " + path);
for (const key of ["artifacts", "sourceAfter", "buildIdentity", "buildAfter", "buildProofComparison", "buildComparison", "passed", "finished"]) assert.equal(Object.hasOwn(manifest, key), false, "Unexpected terminal manifest field: " + key);
const liveSource = await captureSource(preparation.work);
assert.equal(preparation.source.files.length, 86);
for (const source of [liveSource, manifest.sourceBefore, command.sourceBefore]) assert.deepEqual(source, preparation.source);
assert.equal(await sha(prior, "snapshot.json"), command.snapshotSha256); assert.equal(await sha(prior, "final-targets.json"), command.targetsSha256);
assert.equal(command.cwd, preparation.work); assert.equal(outer.cwd, root); assert.deepEqual(command.environment, outer.environment);
assert.deepEqual({ timeoutMs: command.timeoutMs, graceMs: command.graceMs, totalCapMs: command.totalCapMs }, { timeoutMs: 475000, graceMs: 5000, totalCapMs: 480000 });
assert.equal(outer.wrapperSha256, preparation.implementation.find(row => row.path.endsWith("/record-command.mjs")).sha256);
const frozenObservation = [];
for (const [path, digest] of Object.entries(manifest.frozen)) {
  const observed = hash(await readFile(path)), relative = path.startsWith(root + "/") ? path.slice(root.length + 1) : null;
  const archived = preparation.implementation.find(row => row.path === relative);
  if (archived) { assert.equal(archived.sha256, digest); assert.equal(await sha(implementation, relative), digest); }
  else assert.equal(observed, digest, "Recorded dependency or immutable target changed: " + path);
  frozenObservation.push({ path, expectedSha256: digest, observedSha256: observed, currentMatchesLaunch: observed === digest, archivedLaunchBytesVerified: !!archived });
}
const originalBuild = await read(prior, "build/artifacts/manifest.json");
assert.equal(originalBuild.complete, true); assert.equal(originalBuild.passed, true);
assert.deepEqual(originalBuild.buildIdentity, preparation.originalBuild);
const buildArtifacts = await oldArtifacts(join(prior, "build/artifacts"), originalBuild);
const observedBuild = await buildInventory(preparation.work, policy);
assert.deepEqual(observedBuild, preparation.currentBuild);
const proofComparison = await compareBuildIdentity(preparation.work, originalBuild.buildIdentity, observedBuild);
assert.deepEqual(proofComparison, preparation.comparison);
const oldHash = "283b8153e10f6b4de2d09c5bbd12338b773ebf0226dfbe80f70aab90c6f7bb54";
assert.equal(await sha(prior, "desktop/artifacts/manifest.json"), oldHash);
const old = await read(prior, "desktop/artifacts/manifest.json"), oldCount = await oldArtifacts(join(prior, "desktop/artifacts"), old);
assert.equal(old.passed, false); assert.equal(old.buildUnchanged, false);
const artifactInventory = await inventory(join(directory, "desktop/artifacts"));
const rawInventory = [...(await inventory(join(directory, "desktop/review"))).map(row => ({ ...row, path: "desktop/review/" + row.path })), ...(await inventory(join(directory, "desktop-command"))).map(row => ({ ...row, path: "desktop-command/" + row.path }))];
const images = artifactInventory.filter(row => /\.(png|jpg)$/.test(row.path));
const review = await read(directory, "desktop-originals-review.json"), reviewPrefix = "evals/runs/stage-3-completion-2/full-journey/calibration-2/desktop/artifacts/";
assert.equal(review.captureComplete, false); assert.equal(review.allAvailableOriginalsReviewed, true);
assert.deepEqual(review.images.map(row => row.path).sort(), images.map(row => reviewPrefix + row.path).sort());
for (const row of review.images) { const data = await bytes(root, row.path); assert.equal(data.length, row.bytes); assert.equal(hash(data), row.sha256); }
const earlierReview = await read(directory, "desktop-originals-review-partial.json");
for (const row of earlierReview.images) { const data = await bytes(root, row.path); assert.equal(data.length, row.bytes); assert.equal(hash(data), row.sha256); }
const controlRows = images.filter(row => row.path.startsWith("desktop/control-"));
const groups = new Map();
for (const row of controlRows) {
  const match = /^desktop\/control-([a-f0-9]+)-(pointer|keyboard)-(before|after)\.png$/.exec(row.path); assert.ok(match, row.path);
  const key = match[1]; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(match[2] + "-" + match[3]);
}
const controlImageGroups = [...groups].map(([key, files]) => ({ key, files: files.sort(), absentImages: ["keyboard-after", "keyboard-before", "pointer-after", "pointer-before"].filter(name => !files.includes(name)) }));
assert.equal(images.length, 75); assert.equal(controlRows.length, 60);
assert.equal(images.filter(row => /travel/.test(row.path)).length, 0);
assert.deepEqual(await inventory(join(directory, "desktop/artifacts")), artifactInventory, "Partial files changed during observation");
assert.deepEqual(await captureSource(preparation.work), liveSource);
assert.deepEqual(await buildInventory(preparation.work, policy), observedBuild);
console.log(JSON.stringify({ schemaVersion: 1, partialIntegrityVerified: true, captureComplete: false, technicalPass: false,
  observedFrom, observedUntil: new Date().toISOString(), writes: false, modelCalls: 0,
  interpretation: "Separate post-interruption observations, not recovered worker closure or a completed capture. Missing evidence remains absent.",
  terminal, missingEvidence: missing, partialManifest: { sha256: await sha(directory, "desktop/artifacts/manifest.json"), started: manifest.started, complete: manifest.complete, results: manifest.results, observationProblems: manifest.observationProblems, terminalFieldsAbsent: ["artifacts", "sourceAfter", "buildIdentity", "buildAfter", "buildProofComparison", "buildComparison", "passed", "finished"] },
  preparation: { sha256: await sha(directory, "preparation.json"), implementationFiles: 23, referenceFiles: preparation.references.length, recordedDependencyAndHelperHashes: Object.keys(manifest.frozen).length },
  implementationObservation, frozenObservation,
  sourceObservation: liveSource, buildObservation: observedBuild, originalBuildComparison: proofComparison,
  artifactInventory, rawInventory, stableDuringObservation: true,
  coverage: { originals: images.length, storyOriginals: images.length - controlRows.length, controlOriginals: controlRows.length, travelOriginals: 0, distinctControlKeys: groups.size, controlImageGroups, completeControlReportAvailable: false, geometryAndResponseAssessmentAvailable: false },
  rootReview: { path: "desktop-originals-review.json", sha256: await sha(directory, "desktop-originals-review.json"), exactImageSetAndHashes: true, originalCount: review.images.length, earlierPartialCount: earlierReview.images.length, claim: review.scope, noIndependentImageViewingByThisAuditor: true },
  priorEvidencePreserved: { buildArtifacts, failedDesktopManifestSha256: oldHash, failedDesktopArtifacts: oldCount, passed: old.passed, buildUnchanged: old.buildUnchanged },
  evidenceHashes: Object.fromEntries(await Promise.all(["desktop-tool-launch.json", "desktop-tool-poll-4.json", "interruption-proc-01.json", "interruption-proc-02.json", "stop-owned-server.mjs", "stop-owned-server-result.json", "partial-integrity.mjs", "partial-integrity-v2.mjs", "partial-integrity-attempt-1-tool.json"].map(async path => [path, await sha(directory, path)]))),
  limitations: "No complete mode report, travel coverage or original worker source/build-after record. This verifies current source/build and retained bytes after authorized server cleanup only. It does not identify signal origin, prove universal process absence, assess pixels or grant Stage 3 acceptance."
}, null, 2));
