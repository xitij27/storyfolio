// Pure contracts only. No subprocess, runtime directory, browser, build or model.
import assert from "node:assert/strict";
import test from "node:test";
import { PROOF, LAUNCHER, sha, expectedOuterEnvironment, sandboxPathLayout, assertSandboxEnvironment, assertContract, assertInitialSnapshot, assertMeasured, assertSource } from "./probe-environment.mjs";

const launcherCapabilities = () => ({
  cliExecutable: "/example/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl/bin/codex",
  cliVersion: "codex-cli 0.162.1", cliSha256: "c".repeat(64),
  environment: { PATH: "/native/bin:/usr/bin", LANG: "C.UTF-8", PLAYWRIGHT_BROWSERS_PATH: "/browser", LD_LIBRARY_PATH: "/libraries" },
});
const sandboxEnvironment = (capabilities = launcherCapabilities()) => {
  const expectedOuter = expectedOuterEnvironment(capabilities), releaseRoot = "/example/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl";
  const sandbox = { ...expectedOuter, PATH: "/example/.codex/tmp/arg0/codex-arg0Ab123Z:" + releaseRoot + "/codex-path:" + expectedOuter.PATH };
  const layout = sandboxPathLayout(capabilities, { expectedOuter, sandbox });
  return { expectedOuter, sandbox, launcher: {
    layout,
    metadata: { path: layout.metadataPath, realpath: layout.metadataPath, type: "file", bytes: LAUNCHER.metadataBytes, sha256: LAUNCHER.metadataSha256, value: structuredClone(LAUNCHER.metadata) },
    cli: { path: capabilities.cliExecutable, realpath: capabilities.cliExecutable, type: "file", bytes: 123, sha256: capabilities.cliSha256 },
    directories: [layout.releaseRoot, layout.arg0Root, layout.arg0Directory, layout.pathDirectory].map(path => ({ path, realpath: path, type: "directory" })),
    pathEntries: structuredClone(LAUNCHER.pathFiles),
    arg0Entries: [{ name: ".lock", type: "file", bytes: 0, sha256: sha("") }, ...LAUNCHER.aliases.map(name => ({ name, type: "symlink", target: capabilities.cliExecutable, realpath: capabilities.cliExecutable }))],
  } };
};

const contract = () => ({
  cohort: "codex-full-journey-candidate-3",
  source: { id: "full-journey-1", schemaVersion: 3, taskKind: "full-journey", setupMode: "unscaffolded", requestedStops: [1, 2, 3, 4, 5, 6], files: Array(7).fill("material/example") },
  meta: { cohort: "codex-full-journey-candidate-3", caseId: "full-journey-1", taskKind: "full-journey", setupMode: "unscaffolded", inputDigest: "frozen", work: PROOF.temporaryRoot + "/storyfolio-evals/build-full-journey-1-fresh" },
  manifest: { digest: "frozen" },
  capabilities: { node: { executable: "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node" }, environment: { PATH: "frozen", LANG: "C.UTF-8", LD_LIBRARY_PATH: "frozen", PLAYWRIGHT_BROWSERS_PATH: "frozen" } },
});
const measurement = () => ({
  capabilities: launcherCapabilities(),
  processResult: { code: 0, signal: null, timedOut: false, externalSignal: null, spawnError: null, logError: null, modelCalls: 0, actorPreflight: false, durationMs: 1000 },
  report: { schemaVersion: 1, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, passed: true, interruptedBy: null,
    environment: sandboxEnvironment(),
    observations: [
      { name: "node", passed: true }, { name: "npm", passed: true, code: 0, signal: null, timedOut: false, error: null },
      { name: "git", passed: true, code: 0, signal: null, timedOut: false, error: null }, { name: "resources", passed: true }, { name: "local-http", passed: true },
      { name: "external-request", blocked: true, cause: "Proxy response (403)" },
      { name: "browser", passed: true, playwrightEntrypointSha256: PROOF.playwrightSha256, image: "neutral.png", viewport: { width: 1440, height: 900 } },
    ] },
});
test("only the authorized fresh candidate-3 identity and unchanged full-journey contract are accepted", () => {
  assert.doesNotThrow(() => assertContract(contract()));
  assert.deepEqual(PROOF.cohorts, ["codex-full-journey-candidate-3"]);
  for (const cohort of ["codex-full-journey-baseline-1", "codex-full-journey-baseline-2", "codex-full-journey-candidate-1", "codex-full-journey-candidate-2", "codex-full-journey-candidate-4"]) {
    const other = contract(); other.cohort = other.meta.cohort = cohort; assert.throws(() => assertContract(other));
  }
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
  const { report, processResult, capabilities } = measurement(); assertMeasured(report, processResult, capabilities);
  for (const update of [{ actorPreflight: true }, { scope: "site-acceptance" }, { passed: false }, { modelCalls: 1 }, { interruptedBy: "SIGTERM" }]) assert.throws(() => assertMeasured({ ...report, ...update }, processResult, capabilities));
  const missing = structuredClone(report); missing.observations.pop(); assert.throws(() => assertMeasured(missing, processResult, capabilities));
  const duplicate = structuredClone(report); duplicate.observations.push(duplicate.observations[0]); assert.throws(() => assertMeasured(duplicate, processResult, capabilities));
});
test("failures, external signals and expired process budgets never become passing readiness", () => {
  const { report, processResult, capabilities } = measurement();
  for (const update of [{ code: 1 }, { signal: "SIGTERM" }, { timedOut: true }, { externalSignal: "SIGINT" }, { spawnError: "failed" }, { logError: "failed" }, { modelCalls: 1 }, { actorPreflight: true }, { durationMs: 125001 }, { durationMs: -1 }, { durationMs: null }]) assert.throws(() => assertMeasured(report, { ...processResult, ...update }, capabilities));
});
test("an arbitrary network failure is not proxy-denial evidence", () => {
  const { report, processResult, capabilities } = measurement();
  for (const update of [{ blocked: false }, { cause: "Connection timed out" }, { cause: "ECONNREFUSED" }]) {
    const changed = structuredClone(report); Object.assign(changed.observations.find(row => row.name === "external-request"), update); assert.throws(() => assertMeasured(changed, processResult, capabilities));
  }
});
test("trusted browser identity, viewport and version-command success remain required", () => {
  const { report, processResult, capabilities } = measurement();
  for (const [name, update] of [["browser", { playwrightEntrypointSha256: "other" }], ["browser", { viewport: { width: 390, height: 844 } }], ["browser", { image: "old.png" }], ["browser", { passed: false }], ["npm", { code: 1 }], ["git", { timedOut: true }], ["local-http", { passed: false }]]) {
    const changed = structuredClone(report); Object.assign(changed.observations.find(row => row.name === name), update); assert.throws(() => assertMeasured(changed, processResult, capabilities));
  }
});
test("separate outer and actual sandbox records accept only the identified two-prefix launcher layout", () => {
  const capabilities = launcherCapabilities(), environment = sandboxEnvironment(capabilities), before = structuredClone(environment);
  assert.notEqual(environment.expectedOuter.PATH, environment.sandbox.PATH);
  assertSandboxEnvironment(environment, capabilities); assert.deepEqual(environment, before);
  assert.equal(environment.launcher.metadata.sha256, LAUNCHER.metadataSha256);
  assert.equal(environment.launcher.pathEntries[0].sha256, LAUNCHER.pathFiles[0].sha256);
});
test("an unchanged suffix alone never authorizes arbitrary, missing or reordered PATH prefixes", () => {
  const capabilities = launcherCapabilities(), original = sandboxEnvironment(capabilities);
  const [arg0, packaged] = original.sandbox.PATH.split(":");
  for (const PATH of [
    original.expectedOuter.PATH,
    "/untrusted/bin:" + original.sandbox.PATH,
    "/untrusted/codex-arg0Ab123Z:" + packaged + ":" + original.expectedOuter.PATH,
    packaged + ":" + arg0 + ":" + original.expectedOuter.PATH,
    arg0 + ":/untrusted/codex-path:" + original.expectedOuter.PATH,
    arg0.replace("Ab123Z", "arbitrary-long-name") + ":" + packaged + ":" + original.expectedOuter.PATH,
    original.sandbox.PATH.replace("/native/bin:/usr/bin", "/usr/bin:/native/bin"),
    original.sandbox.PATH + ":/extra", original.sandbox.PATH + ":", null,
  ]) { const environment = structuredClone(original); environment.sandbox.PATH = PATH; assert.throws(() => assertSandboxEnvironment(environment, capabilities)); }
});
test("all selected non-PATH variables and the frozen outer environment stay exact", () => {
  const capabilities = launcherCapabilities(), original = sandboxEnvironment(capabilities);
  for (const key of ["PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"]) {
    const environment = structuredClone(original); environment.sandbox[key] = "changed";
    assert.throws(() => assertSandboxEnvironment(environment, capabilities));
  }
  for (const change of [value => { value.expectedOuter.PATH += ":/extra"; }, value => { delete value.sandbox.LANG; }, value => { value.sandbox.EXTRA = "unknown"; }]) {
    const environment = structuredClone(original); change(environment); assert.throws(() => assertSandboxEnvironment(environment, capabilities));
  }
});
test("launcher package metadata, canonical directories and CLI identity are required", () => {
  const capabilities = launcherCapabilities();
  for (const change of [
    value => { value.metadata.sha256 = "0".repeat(64); },
    value => { value.metadata.value.pathDir = "other"; },
    value => { value.metadata.type = "symlink"; },
    value => { value.metadata.realpath = "/elsewhere/package.json"; },
    value => { value.cli.sha256 = "0".repeat(64); },
    value => { value.cli.realpath = "/elsewhere/codex"; },
    value => { value.directories[1].realpath = "/elsewhere/arg0"; },
    value => { value.directories[2].type = "symlink"; },
  ]) { const environment = sandboxEnvironment(capabilities); change(environment.launcher); assert.throws(() => assertSandboxEnvironment(environment, capabilities)); }
  for (const update of [{ cliVersion: "codex-cli unknown" }, { cliExecutable: "/elsewhere/bin/codex" }]) assert.throws(() => assertSandboxEnvironment(sandboxEnvironment(), { ...capabilities, ...update }));
});
test("PATH entries cannot shadow tools or substitute altered rg bytes and aliases", () => {
  const capabilities = launcherCapabilities();
  for (const change of [
    value => { value.pathEntries.push({ name: "node", type: "file", bytes: 1, sha256: "0".repeat(64) }); },
    value => { value.pathEntries[0].sha256 = "0".repeat(64); },
    value => { value.pathEntries[0].bytes++; },
    value => { value.pathEntries[0].type = "symlink"; },
    value => { value.arg0Entries.push({ name: "npm", type: "symlink", target: capabilities.cliExecutable, realpath: capabilities.cliExecutable }); },
    value => { value.arg0Entries[1].name = "node"; },
    value => { value.arg0Entries[1].target = "/untrusted/apply_patch"; },
    value => { value.arg0Entries[1].realpath = "/untrusted/codex"; },
    value => { value.arg0Entries[1].type = "file"; },
    value => { value.arg0Entries[0].bytes = 1; },
    value => { value.arg0Entries.pop(); },
  ]) { const environment = sandboxEnvironment(capabilities); change(environment.launcher); assert.throws(() => assertSandboxEnvironment(environment, capabilities)); }
});
test("final measured readiness rejects missing or altered sandbox provenance", () => {
  const { report, processResult, capabilities } = measurement();
  for (const change of [value => { delete value.environment; }, value => { value.environment.launcher = null; }, value => { value.environment.sandbox.PATH += ":/extra"; }]) {
    const changed = structuredClone(report); change(changed); assert.throws(() => assertMeasured(changed, processResult, capabilities));
  }
});
