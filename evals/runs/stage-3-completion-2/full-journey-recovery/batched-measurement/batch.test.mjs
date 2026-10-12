// Pure mocked report/command fixtures. No browser, process, model or fixture I/O.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { join } from "node:path";
import test from "node:test";
import { assertBatchCoverage } from "./verify.mjs";
import { commandFor, root, study } from "./binding-lib.mjs";
import { assessGateReport, observationProblems } from "../../full-journey-measurement/measurement-lib.mjs";

const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const file = (path, text = path) => ({ path, sha256: sha(text), bytes: Buffer.byteLength(text) });

function fixture(batch = 1) {
  const policy = { conceptCount: 3, viewports: { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844 } } };
  const targets = { schemaVersion: 1, measurement: "full-journey", stage: 2,
    alternatives: Array.from({ length: 12 }, (_, index) => ({
      id: `alternative-${index + 1}`, route: `/alternative/${index + 1}`, advertised: index < 3,
      meaning: `Actual alternative or alias ${index + 1}`,
      beats: { opening: "opening.object", middle: "middle.observe", ending: "close.answer" },
      control: { selector: `a[data-alternative="${index + 1}"]`, name: `Alternative ${index + 1}`, fromRoute: "/" },
    })) };
  const alternative = targets.alternatives[batch - 1], stem = String(batch).padStart(2, "0");
  const reports = ["desktop", "phone"].map(mode => {
    const image = name => file(`${stem}-${mode}/${name}.png`, `Synthetic pixels ${batch}/${mode}/${name}`);
    const entryImage = image("entry");
    const rests = ["opening", "middle", "ending"].map(role => ({ role, id: alternative.beats[role], image: image(role), observation: { overflowX: false } }));
    const controls = ["pointer", "keyboard"].map(method => ({ method, activated: true, identityChanged: true, beforeImage: image(`${method}-before`), afterImage: image(`${method}-after`) }));
    const report = { alternative: structuredClone(alternative), mode, viewport: policy.viewports[mode], complete: true, errors: [], entryImage, rests, controls,
      images: [entryImage, ...rests.map(rest => rest.image), ...controls.flatMap(trial => [trial.beforeImage, trial.afterImage])] };
    report.problems = assessGateReport(report);
    return report;
  });
  const manifest = { schemaVersion: 1, measurement: "full-journey", stage: 2, unit: "concepts", batch, complete: true, sourceUnchanged: true, interrupted: null,
    selectedAlternative: structuredClone(alternative), targets: structuredClone(targets), expected: structuredClone(policy), problems: observationProblems(targets, policy), passed: true };
  const state = { batch, manifest, reports, targets, policy, files: [] };
  refresh(state);
  return state;
}

// Rebuild genuine saved-report identities after a deliberate semantic mutation.
// This does not decide manifest.passed, so a forged saved pass is independently tested.
function refresh(state) {
  const stem = String(state.batch).padStart(2, "0");
  state.manifest.results = state.reports.map(report => ({ directory: `${stem}-${report.mode}`, complete: report.complete, error: report.error ?? null, problems: [...report.problems] }));
  state.files = [file("manifest.json", "Synthetic manifest identity outside its own artifact map"),
    ...state.reports.flatMap(report => [...report.images.map(image => ({ ...image })), file(`${stem}-${report.mode}/report.json`, JSON.stringify(report))])];
  state.manifest.artifacts = Object.fromEntries(state.files.filter(row => row.path !== "manifest.json").map(row => [row.path, row.sha256]));
}

test("each fixed alternative has both modes and all eight original images per mode", () => {
  for (let batch = 1; batch <= 12; batch++) {
    const state = fixture(batch), result = assertBatchCoverage(state);
    assert.equal(result.batch, batch); assert.equal(result.alternativeId, `alternative-${batch}`);
    assert.equal(result.passed, true); assert.deepEqual(result.problems, []);
    assert.equal(result.originals.length, 16);
    assert.deepEqual(state.reports.map(report => report.images.length), [8, 8]);
  }
});

test("missing, duplicated or reordered modes and shifted batch identities fail", () => {
  for (const mutate of [
    state => { state.reports.pop(); refresh(state); },
    state => { state.reports.reverse(); refresh(state); },
    state => { state.reports[1].mode = "desktop"; refresh(state); },
    state => { state.manifest.batch = 2; },
    state => { state.manifest.selectedAlternative = state.targets.alternatives[1]; },
    state => { state.reports[0].alternative = state.targets.alternatives[1]; refresh(state); },
    state => { state.manifest.results[0].directory = "02-desktop"; },
    state => { state.reports[1].viewport = { width: 1440, height: 900 }; refresh(state); },
  ]) {
    const state = fixture(); mutate(state); assert.throws(() => assertBatchCoverage(state));
  }
});

test("a batch cannot substitute filtered full targets or change the frozen policy", () => {
  for (const mutate of [
    state => { state.targets.alternatives = [state.targets.alternatives[0]]; },
    state => { state.manifest.targets.alternatives = [state.manifest.targets.alternatives[0]]; },
    state => { state.manifest.targets.alternatives.reverse(); },
    state => { state.manifest.expected.conceptCount = 1; },
  ]) {
    const state = fixture(); mutate(state); assert.throws(() => assertBatchCoverage(state));
  }
});

test("missing rests, chooser trials or their referenced images are not complete coverage", () => {
  for (const mutate of [
    state => { state.reports[0].rests.splice(1, 1); },
    state => { state.reports[0].rests[1].id = "unapproved-middle"; },
    state => { state.reports[1].controls.pop(); },
    state => { state.reports[1].controls[1].method = "pointer"; },
    state => { delete state.reports[0].entryImage; },
    state => { delete state.reports[0].rests[0].image; },
    state => { delete state.reports[1].controls[0].afterImage; },
    state => { state.reports[0].images.pop(); },
    state => { state.reports[0].complete = false; },
  ]) {
    const state = fixture(); mutate(state); assert.throws(() => assertBatchCoverage(state));
  }
});

test("missing, altered, duplicated or extra original files cannot hide behind an artifact map", () => {
  for (const mutate of [
    state => { state.files = state.files.filter(row => row.path !== "01-phone/ending.png"); delete state.manifest.artifacts["01-phone/ending.png"]; },
    state => { const row = state.files.find(row => row.path === "01-desktop/opening.png"); row.sha256 = sha("Changed pixels"); state.manifest.artifacts[row.path] = row.sha256; },
    state => { state.files.find(row => row.path === "01-desktop/opening.png").bytes++; },
    state => { state.files.push({ ...state.files.find(row => row.path.endsWith("entry.png")) }); },
    state => { const row = file("01-phone/unreferenced.jpg"); state.files.push(row); state.manifest.artifacts[row.path] = row.sha256; },
    state => { state.reports[0].entryImage.path = "02-desktop/entry.png"; },
    state => { state.manifest.artifacts["01-phone/keyboard-after.png"] = sha("Different hash"); },
  ]) {
    const state = fixture(); mutate(state); assert.throws(() => assertBatchCoverage(state));
  }
});

test("raw observations recompute the saved technical pass without erasing genuine failures", () => {
  const state = fixture();
  state.reports[1].rests[1].observation.overflowX = true;
  state.reports[1].problems = assessGateReport(state.reports[1]); refresh(state);
  assert.throws(() => assertBatchCoverage(state), /Saved technical result/);
  state.manifest.passed = false;
  const result = assertBatchCoverage(state);
  assert.equal(result.passed, false); assert.ok(result.problems.some(problem => problem.includes("horizontal overflow")));
  const falseProblems = fixture(); falseProblems.reports[0].rests[0].observation.overflowX = true;
  // Neither the stale empty report problems nor its stored pass may conceal this.
  refresh(falseProblems); assert.throws(() => assertBatchCoverage(falseProblems));
  const inventedFailure = fixture(); inventedFailure.manifest.passed = false;
  assert.throws(() => assertBatchCoverage(inventedFailure), /Saved technical result/);
});

test("incomplete, interrupted or source-changed manifests cannot receive coverage success", () => {
  for (const change of [{ complete: false }, { sourceUnchanged: false }, { interrupted: { signal: "SIGTERM" } }, { unit: "looks" }, { stage: 4 }]) {
    const state = fixture(); Object.assign(state.manifest, change); assert.throws(() => assertBatchCoverage(state));
  }
});

test("setup command and all twelve batch commands retain full targets and exact app cwd", () => {
  const binding = { replacementPath: "/coordinator/replacement.json", installContract: { environment: { PATH: "/native/bin", NEXT_TELEMETRY_DISABLED: null } },
    applicationRoot: "site", meta: { inputs: "/coordinator/original-inputs" }, output: "/coordinator/output", policy: { trustedDependencies: { root: "/trusted-dependencies" } },
    environment: { PATH: "/native/bin", NEXT_TELEMETRY_DISABLED: "1" } };
  const prepared = { work: "/reconstructed/whole", application: "/reconstructed/whole/site", setup: "/coordinator/output/setup" };
  assert.deepEqual(commandFor(binding, 0), { executable: process.execPath, args: [join(study, "setup-worker.mjs"), "--replacement", binding.replacementPath], cwd: root, environment: binding.installContract.environment });
  for (let id = 1; id <= 12; id++) {
    const command = commandFor(binding, id, prepared);
    assert.equal(command.executable, process.execPath); assert.equal(command.cwd, prepared.application); assert.deepEqual(command.environment, binding.environment);
    assert.deepEqual(command.args, [join(study, "gate-worker.mjs"), `--workspace=${prepared.work}`, "--application-root=site", `--targets=${join(prepared.setup, "targets.json")}`,
      `--expectations=${join(binding.meta.inputs, "expectations.json")}`, `--out=${join(binding.output, "batches", String(id).padStart(2, "0"), "artifacts")}`, "--dependencies=/trusted-dependencies", `--batch=${id}`]);
  }
  for (const id of [-1, 13, 1.5, "1", NaN, undefined]) assert.throws(() => commandFor(binding, id, prepared));
});
