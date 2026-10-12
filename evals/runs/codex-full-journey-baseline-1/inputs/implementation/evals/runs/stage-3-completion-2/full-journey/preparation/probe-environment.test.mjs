// Pure contracts only. No subprocess, runtime directory, browser, build or model.
import assert from "node:assert/strict";
import test from "node:test";
import { PROOF, assertContract, assertInitialSnapshot, assertMeasured, assertSource } from "./probe-environment.mjs";

const contract = () => ({
  cohort: "codex-full-journey-baseline-1",
  source: { id: "full-journey-1", schemaVersion: 3, taskKind: "full-journey", setupMode: "unscaffolded", requestedStops: [1, 2, 3, 4, 5, 6], files: Array(7).fill("material/example") },
  meta: { cohort: "codex-full-journey-baseline-1", caseId: "full-journey-1", taskKind: "full-journey", setupMode: "unscaffolded", inputDigest: "frozen", work: PROOF.temporaryRoot + "/storyfolio-evals/build-full-journey-1-fresh" },
  manifest: { digest: "frozen" },
  capabilities: { node: { executable: "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node" }, environment: { PATH: "frozen", LANG: "C.UTF-8", LD_LIBRARY_PATH: "frozen", PLAYWRIGHT_BROWSERS_PATH: "frozen" } },
});
const measurement = () => ({
  processResult: { code: 0, signal: null, timedOut: false, externalSignal: null, spawnError: null, logError: null, modelCalls: 0, actorPreflight: false, durationMs: 1000 },
  report: { schemaVersion: 1, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, passed: true, interruptedBy: null,
    observations: [
      { name: "node", passed: true }, { name: "npm", passed: true, code: 0, signal: null, timedOut: false, error: null },
      { name: "git", passed: true, code: 0, signal: null, timedOut: false, error: null }, { name: "resources", passed: true }, { name: "local-http", passed: true },
      { name: "external-request", blocked: true, cause: "Proxy response (403)" },
      { name: "browser", passed: true, playwrightEntrypointSha256: PROOF.playwrightSha256, image: "neutral.png", viewport: { width: 1440, height: 900 } },
    ] },
});
test("only declared unscaffolded full-journey cohorts and frozen identities are accepted", () => {
  assert.doesNotThrow(() => assertContract(contract()));
  const candidate = contract(); candidate.cohort = candidate.meta.cohort = "codex-full-journey-candidate-1"; assertContract(candidate);
  for (const update of [{ cohort: "extra-retry" }, { schemaVersion: 1 }, { taskKind: "prototype-depth" }, { setupMode: "existing-site" }, { requestedStops: [4] }, { files: [] }]) {
    const value = contract();
    if ("cohort" in update) value.cohort = update.cohort; else Object.assign(value.source, update);
    assert.throws(() => assertContract(value));
  }
  for (const update of [{ inputDigest: "changed" }, { caseId: "other" }, { work: "/tmp/unrecorded" }, { setupMode: "scaffold" }]) { const value = contract(); Object.assign(value.meta, update); assert.throws(() => assertContract(value)); }
});
test("source guards reject changed bytes, unrecognized source and generated trees before actor preflight", () => {
  const frozen = { hashes: { "fixture/material/person.md": "initial", "skill/SKILL.md": "skill" } };
  const initial = { schemaVersion: 1, excluded: [], unexpected: [], files: { "material/person.md": { type: "file", hash: "initial", size: 7 }, ".agents/skills/storyfolio/SKILL.md": { type: "file", hash: "skill", size: 4 } } };
  assertInitialSnapshot(initial, frozen);
  const corrupted = structuredClone(initial); corrupted.files["material/person.md"].hash = "changed";
  assert.throws(() => assertInitialSnapshot(corrupted, frozen));
  const seeded = structuredClone(initial); seeded.files["app/page.tsx"] = { type: "file", hash: "seeded", size: 3 };
  assert.throws(() => assertInitialSnapshot(seeded, frozen));
  const snapshot = { files: { "material/person.md": { type: "file", hash: "initial", size: 7 } } };
  const good = { entries: structuredClone(snapshot.files), unexpected: [], excluded: [] };
  assertSource(good, snapshot);
  for (const change of [
    value => { value.entries["material/person.md"].hash = "changed"; },
    value => { delete value.entries["material/person.md"]; },
    value => { value.entries["app/page.tsx"] = { type: "file", hash: "seeded", size: 3 }; },
    value => { value.unexpected.push({ path: ".git-local", type: "directory" }); },
    value => { value.excluded.push("node_modules"); },
  ]) { const value = structuredClone(good); change(value); assert.throws(() => assertSource(value, snapshot)); }
});
test("actual environment evidence has distinct scope and all seven observations", () => {
  const { report, processResult } = measurement(); assertMeasured(report, processResult);
  for (const update of [{ actorPreflight: true }, { scope: "site-acceptance" }, { passed: false }, { modelCalls: 1 }, { interruptedBy: "SIGTERM" }]) assert.throws(() => assertMeasured({ ...report, ...update }, processResult));
  const missing = structuredClone(report); missing.observations.pop(); assert.throws(() => assertMeasured(missing, processResult));
  const duplicate = structuredClone(report); duplicate.observations.push(duplicate.observations[0]); assert.throws(() => assertMeasured(duplicate, processResult));
});
test("failures, external signals and expired process budgets never become passing readiness", () => {
  const { report, processResult } = measurement();
  for (const update of [{ code: 1 }, { signal: "SIGTERM" }, { timedOut: true }, { externalSignal: "SIGINT" }, { spawnError: "failed" }, { logError: "failed" }, { modelCalls: 1 }, { actorPreflight: true }, { durationMs: 125001 }, { durationMs: -1 }, { durationMs: null }]) assert.throws(() => assertMeasured(report, { ...processResult, ...update }));
});
test("an arbitrary network failure is not proxy-denial evidence", () => {
  const { report, processResult } = measurement();
  for (const update of [{ blocked: false }, { cause: "Connection timed out" }, { cause: "ECONNREFUSED" }]) {
    const changed = structuredClone(report); Object.assign(changed.observations.find(row => row.name === "external-request"), update); assert.throws(() => assertMeasured(changed, processResult));
  }
});
test("trusted browser identity, viewport and version-command success remain required", () => {
  const { report, processResult } = measurement();
  for (const [name, update] of [["browser", { playwrightEntrypointSha256: "other" }], ["browser", { viewport: { width: 390, height: 844 } }], ["browser", { image: "old.png" }], ["browser", { passed: false }], ["npm", { code: 1 }], ["git", { timedOut: true }], ["local-http", { passed: false }]]) {
    const changed = structuredClone(report); Object.assign(changed.observations.find(row => row.name === name), update); assert.throws(() => assertMeasured(changed, processResult));
  }
});
