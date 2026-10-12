// Independent read-only verification of already completed setup evidence.
// No subprocess, test, build, browser, install, model or write.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, inspectWorkspace, json, regularBytes, validateCase, verifyInputs } from "../../lib/build.mjs";
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const run = join(root, "evals/runs/codex-bench-entry-baseline-1/bench-entry-1/baseline-1"), setup = join(run, "setup");
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
const meta = await readJson(run, "meta.json"), manifest = await verifyInputs(meta.inputs);
assert.equal(manifest.digest, "504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a");
const source = validateCase(await readJson(meta.inputs, "case.json")), capabilities = await readJson(meta.inputs, "capabilities.json");
const gate = await readJson(setup, "probe.json"), readiness = await readJson(study, "readiness/stdout.log"), result = await readJson(study, "readiness/result.json");
assert.equal(gate.passed, true); assert.equal(gate.inputDigest, manifest.digest); assert.equal(gate.work, meta.work);
assert.equal(gate.capabilitySha256, manifest.hashes["capabilities.json"]);
assert.equal(result.code, 0); assert.equal(result.signal, null); assert.equal(readiness.verified, true);
assert.equal(readiness.inputDigest, manifest.digest); assert.equal(readiness.work, meta.work);
for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(study, `readiness/${channel}.log`)), result[`${channel}Sha256`]);
assert.equal(gate.evidence.length, 26); assert.equal(new Set(gate.evidence).size, 26);
const evidenceHashes = {};
for (const path of gate.evidence) { const bytes = await regularBytes(setup, path); evidenceHashes[path] = { sha256: hash(bytes), bytes: bytes.length }; }
assert.deepEqual(evidenceHashes, gate.evidenceHashes); assert.deepEqual(evidenceHashes, readiness.evidence);
assert.equal(Object.keys(gate.coordinatorHelpers).length, 3);
for (const [path, sha256] of Object.entries(gate.coordinatorHelpers)) { assert.equal(hash(await regularBytes(root, path)), sha256); assert.equal(manifest.hashes[`implementation/${path}`], sha256); }
assert.deepEqual(readiness.coordinatorHelpers, gate.coordinatorHelpers);
const snapshot = await readJson(setup, "snapshot/manifest.json"), before = await readJson(setup, "source-before-capability.json"), after = await readJson(setup, "source-after-capability.json");
assert.deepEqual(before.entries, snapshot.files); assert.deepEqual(after.entries, snapshot.files);
assert.deepEqual(before.unexpected, []); assert.deepEqual(after.unexpected, []);
const current = await inspectWorkspace(meta.work, source.snapshot); assert.deepEqual(current.unexpected, []);
const facts = await regularBytes(setup, "environment-setup.json"), factsPath = "docs/story/environment-setup.json";
assert.deepEqual(facts, current.entries[factsPath].bytes);
assert.equal(hash(facts), readiness.factualSetupSha256); assert.ok(!facts.toString().includes(root));
assert.ok(!/(?:evals\/|prototypes\/|docs\/(?:history|superpowers)\/|portfolio-website|fixture-study|visual-recovery|codex-build-completion)/.test(facts.toString()));
const expected = { ...snapshot.files, [factsPath]: { type: "file", hash: hash(facts), size: facts.length } };
assert.deepEqual(Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...record }]) => [path, record])), expected);
const install = await readJson(setup, "dependency-install/command.json"), installed = await readJson(setup, "dependency-install/result.json");
assert.deepEqual(install.args, ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"]); assert.equal(installed.code, 0); assert.equal(installed.signal, null);
assert.equal(install.environment.NEXT_TELEMETRY_DISABLED, null); assert.equal(install.environment.TMPDIR, "/var/tmp/storyfolio-entry-runtime-20261012");
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(install.environment[key], value);
for (const channel of ["stdout", "stderr"]) assert.equal(installed[`${channel}Sha256`], evidenceHashes[`dependency-install/${channel}.log`].sha256);
const probe = await readJson(setup, "capability/probe.json"), processResult = await readJson(setup, "capability-process.json");
assert.equal(processResult.code, 0); assert.equal(processResult.signal, null); assert.equal(processResult.timedOut, false); assert.equal(probe.passed, true);
const external = probe.observations.find(row => row.name === "external-request"); assert.equal(external.blocked, true); assert.match(external.cause, /Proxy response \(403\)/);
const originals = await readJson(setup, "original-images.json"), report = await readJson(setup, "capability/browser/light-wide/report.json");
assert.equal(originals.images.length, 9); assert.equal(new Set(originals.images.map(row => row.path)).size, 9); assert.equal(report.shots.length, 9);
assert.deepEqual(originals.images.map(row => row.path).sort(), report.shots.map(path => `capability/browser/light-wide/${basename(path)}`).sort());
for (const original of originals.images) {
  const bytes = await regularBytes(setup, original.path); assert.equal(bytes.length, original.bytes); assert.equal(hash(bytes), original.sha256);
  assert.equal(original.viewMethod, "view_image original"); assert.equal(bytes.readUInt32BE(16), 1440); assert.equal(bytes.readUInt32BE(20), 900);
  assert.deepEqual(bytes, await regularBytes(meta.work, `checks/setup-capability/browser/light-wide/${basename(original.path)}`));
}
console.log(json({ verified: true, observed: new Date().toISOString(), inputDigest: manifest.digest, frozenFiles: Object.keys(manifest.hashes).length,
  evidenceFiles: gate.evidence.length, frozenHelpers: Object.keys(gate.coordinatorHelpers).length, originalImages: originals.images.length,
  sourceFilesBeforeFacts: Object.keys(snapshot.files).length, sourceFilesAfterFacts: Object.keys(expected).length, sourceUnchangedExceptNeutralFacts: true,
  factsSha256: hash(facts), probeSha256: hash(await regularBytes(setup, "probe.json")), readinessResultSha256: hash(await regularBytes(study, "readiness/result.json")),
  readinessStdoutSha256: result.stdoutSha256, readinessFinished: result.finished, installFinished: installed.finished, capabilityFinished: processResult.finished,
  rawProbePathExposure: external.cause.includes(join(meta.inputs, "implementation/evals/probe-build-environment.mjs")),
  neutralFactsContainHeldOutPath: false, imagesReviewAttribution: "Root's saved individual-original review; this auditor rechecked bytes, not pixels",
  modelCalls: 0, browserCalls: 0, subprocesses: 0, writes: false }));
