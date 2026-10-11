// Read-only comparison of frozen and prospective source inventories. No model or runtime.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { captureSource } from "../../lib/build-capture.mjs";
import { inspectWorkspace, hash, verifyInputs } from "../../lib/build.mjs";
import { captureSource as legacyCapture, sourcePathExcluded as legacyExcluded } from "../codex-bench-depth-baseline-1/inputs/implementation/evals/lib/build-capture.mjs";
import { inspectWorkspace as legacyInspect } from "../codex-bench-depth-baseline-1/inputs/implementation/evals/lib/build.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../..");
const cohort = resolve(here, "../codex-bench-depth-baseline-1");
const run = join(cohort, "bench-depth-1/baseline-1");
const actor = JSON.parse(await readFile(join(run, "turns/01/result.json"), "utf8"));
const recorded = JSON.parse(await readFile(join(run, "acceptance-2/manifest.json"), "utf8"));
const frozen = await verifyInputs(join(cohort, "inputs"));
const workspace = recorded.workspace;
const actorMap = inspected => Object.fromEntries(Object.entries(inspected.entries).map(([path, file]) => [path, { bytes: file.size, sha256: file.hash }]));
const captureMap = capture => Object.fromEntries(capture.files.map(({ path, bytes, sha256 }) => [path, { bytes, sha256 }]));
const differences = (left, right) => [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().filter(path => JSON.stringify(left[path]) !== JSON.stringify(right[path]));
const oldActor = await legacyInspect(workspace), oldCapture = await legacyCapture(workspace);
const retainedActor = Object.fromEntries(Object.entries(actor.snapshot.files).map(([path, file]) => [path, { bytes: file.size, sha256: file.hash }]));
assert.deepEqual(actorMap(oldActor), retainedActor);
assert.deepEqual(oldCapture, recorded.sourceBefore);
const comparableOldActor = Object.fromEntries(Object.entries(retainedActor).filter(([path]) => !legacyExcluded(path)));
const legacyDifferences = differences(comparableOldActor, captureMap(oldCapture));
assert.equal(legacyDifferences.length, 189);
assert.ok(legacyDifferences.every(path => path.startsWith(".prototype-history/")));

const newActor = await inspectWorkspace(workspace), newCapture = await captureSource(workspace);
assert.deepEqual(actorMap(newActor), captureMap(newCapture));
assert.equal(Object.keys(newActor.entries).length, 201);
assert.deepEqual(actorMap(newActor), comparableOldActor);
assert.ok(newActor.excluded.includes(".prototype-history"));
assert.ok(newActor.excluded.includes("next-env.d.ts"));
// The historical records must remain different; this is not repaired acceptance.
assert.notDeepEqual(comparableOldActor, captureMap(recorded.sourceBefore));
const sourcePaths = ["evals/lib/source-scope.mjs", "evals/lib/source-scope.test.mjs", "evals/lib/build.mjs", "evals/lib/build-capture.mjs"];
const result = {
  schemaVersion: 1, date: "2026-10-12", modelCalls: 0, writes: false, workspace,
  meaning: "Prospective source-boundary calibration only. Historical manifests, their failed equality, browser verdicts and model outputs are unchanged.",
  frozenInputDigest: frozen.digest,
  originalEvidence: {
    actorResult: { path: "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/turns/01/result.json", sha256: hash(await readFile(join(run, "turns/01/result.json"))) },
    acceptanceManifest: { path: "evals/runs/codex-bench-depth-baseline-1/bench-depth-1/baseline-1/acceptance-2/manifest.json", sha256: hash(await readFile(join(run, "acceptance-2/manifest.json"))) },
  },
  baseline: { actorFiles: Object.keys(oldActor.entries).length, checkerFiles: oldCapture.files.length,
    actorFilesAfterExistingGeneratedFilter: Object.keys(comparableOldActor).length,
    sameSourceSet: false, differingPaths: legacyDifferences, actorMatchesRetainedSnapshot: true,
    checkerMatchesRetainedSourceInventory: true },
  prospective: { actorFiles: Object.keys(newActor.entries).length, checkerFiles: newCapture.files.length,
    sameSourceSet: true, sourceDigest: newCapture.digest, exclusions: newCapture.exclusions,
    recognizedMetadata: ".prototype-history", actorUnexpected: newActor.unexpected,
    unchangedApplicationSource: true },
  implementation: Object.fromEntries(await Promise.all(sourcePaths.map(async path => [path, hash(await readFile(join(root, path)))]))),
};
process.stdout.write(JSON.stringify(result, null, 2) + "\n");
