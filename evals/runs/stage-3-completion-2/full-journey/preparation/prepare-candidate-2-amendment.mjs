// Root-owned, exclusive binding generation from already preserved evidence.
import assert from "node:assert/strict";
import { join } from "node:path";
import { DEFAULT_SNAPSHOT } from "../../../../lib/build.mjs";
import { root, hash, json, regularBytes, writeNew, requiredMeasurementPaths, loadBinding } from "../../full-journey-recovery/measurement/binding-lib.mjs";
const preparation = "evals/runs/stage-3-completion-2/full-journey/preparation";
const base = "evals/runs/stage-3-completion-2/full-journey-recovery";
const data = `${base}/candidate-2`, run = "evals/runs/codex-full-journey-candidate-2/full-journey-1/baseline-1";
const reference = async path => ({ path, sha256: hash(await regularBytes(root, path)) });
const read = async path => JSON.parse(await regularBytes(root, path));
const meta = await read(`${run}/meta.json`), recoveryPath = `${preparation}/candidate-2-stop-2-recovery`;
const recovered = await read(`${recoveryPath}/recovery.json`), source = await read(`${recoveryPath}/source/manifest.json`);
const turns = [];
for (const turn of [1, 2]) {
  const path = `${run}/turns/${String(turn).padStart(2, "0")}`;
  turns.push({ turn, result: await reference(`${path}/result.json`), snapshot: await reference(`${path}/snapshot/manifest.json`),
    processRecord: await reference(`${preparation}/candidate-2-turn-${turn}/result.json`), terminalTool: await reference(`${data}/terminal-turn${turn}.json`) });
}
const runnerPaths = ["execution-core.mjs", "cli.mjs", "execution-core.test.mjs", "README.md"].map(name => `${base}/runner/${name}`);
const hashMap = async paths => Object.fromEntries(await Promise.all(paths.map(async path => [path, (await reference(path)).sha256])));
const packageRecord = path => { const file = source.files.find(item => item.path === path); assert.ok(file); return { path, sha256: file.sha256 }; };
const amendment = {
  schemaVersion: 1, kind: "full-journey-source-recovery", reviewedByRoot: true,
  sourceBasis: { label: "post-closure recovery, not original actor snapshot", observedAt: recovered.observedAt,
    limitation: "The complete application identity at original turn-2 closure is not established. This separately preserved later checkpoint supports prospective measurement and conditional same-session continuation only." },
  original: { run, metaSha256: (await reference(`${run}/meta.json`)).sha256, workspace: meta.work, inputDigest: meta.inputDigest,
    sessionId: "01a130a7-a4ce-7eb2-bc48-2015a0dab0be", turns },
  runtime: await reference(`${data}/runtime.json`),
  recovery: { record: await reference(`${recoveryPath}/recovery.json`), sourceManifest: await reference(`${recoveryPath}/source/manifest.json`),
    filesRoot: `${recoveryPath}/source/files`, sourceDigest: source.digest, applicationRoot: "site",
    packageJson: packageRecord("site/package.json"), lockfile: packageRecord("site/package-lock.json"),
    emptyUnexpectedDirectories: [{ path: ".aws", classification: "empty-directory" }, { path: ".codex", classification: "empty-directory" }] },
  continuation: { output: `${data}/continuation`, allowedTurns: [3, 4, 5, 6], recoveryAfterTurn: 2,
    snapshotPolicy: { ...DEFAULT_SNAPSHOT, roots: [...DEFAULT_SNAPSHOT.roots, "site"] } },
  helperHashes: { measurement: await hashMap(requiredMeasurementPaths), runner: await hashMap(runnerPaths) },
  authority: { approval: await reference("docs/history/2026-10-12-stage-3-capacity-retry-approval.md"),
    recoveryDecision: await reference(`${preparation}/candidate-2-source-recovery-decision.md`),
    limit: "No new paid attempt, retry, judge, prompt change, budget reset or automatic continuation. Each remaining original turn needs its real predecessor gate." }
};
await writeNew(join(root, data, "amendment.json"), json(amendment));
const binding = { schemaVersion: 1, kind: "recovered-concepts-measurement", turn: 2,
  amendment: await reference(`${data}/amendment.json`), targets: await reference(`${data}/targets.json`), output: `${data}/concepts-1` };
await writeNew(join(root, data, "binding.json"), json(binding));
const checked = await loadBinding(join(root, data, "binding.json"));
console.log(json({ recordedAt: new Date().toISOString(), passed: true, binding: await reference(`${data}/binding.json`), amendment: binding.amendment,
  frozenInputs: Object.keys(checked.frozen.hashes).length, sourceFiles: checked.source.files.length, omittedApplicationFiles: checked.extra.length,
  originalArtifacts: checked.originalActors.map(actor => Object.keys(actor.artifacts).length), helpers: { measurement: requiredMeasurementPaths.length, runner: runnerPaths.length },
  originalSession: amendment.original.sessionId, carriedTotals: checked.totals, reconstruction: false, browserStarted: false, modelCalls: 0 }));
