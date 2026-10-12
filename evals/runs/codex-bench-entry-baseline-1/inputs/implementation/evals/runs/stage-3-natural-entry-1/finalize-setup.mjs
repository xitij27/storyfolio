// Coordinator-only setup attestation after actual original-image review.
// No subprocesses, model calls, installs, builds, browser calls or retries.
import assert from "node:assert/strict";
import { lstat, readdir, realpath } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, inspectWorkspace, json, regularBytes, safePath, validateCase, verifyInputs, writeNew } from "../../lib/build.mjs";

assert.equal(process.argv.length, 2, "No alternative cohort, workspace or output is supported");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const cohort = "codex-bench-entry-baseline-1", caseId = "bench-entry-1";
const inputs = join(root, "evals/runs", cohort, "inputs");
const out = join(root, "evals/runs", cohort, caseId, "baseline-1"), setup = join(out, "setup");
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const sorted = values => [...values].sort();
const manifest = await verifyInputs(inputs), meta = await readJson(out, "meta.json");
const source = validateCase(await readJson(inputs, "case.json"));
const capabilities = await readJson(inputs, "capabilities.json");
assert.equal(meta.cohort, cohort);
assert.equal(meta.caseId, caseId);
assert.equal(meta.inputs, inputs);
assert.equal(meta.inputDigest, manifest.digest);
assert.equal(source.id, caseId);
assert.equal(source.schemaVersion, 1);
assert.equal(source.taskKind, undefined);
assert.deepEqual(source.requestedStops, [4]);
assert.deepEqual(source.refusalTurns, []);
assert.equal(await realpath(meta.work), meta.work);
assert.ok(meta.work.startsWith("/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-"));
assert.deepEqual(sorted(await readdir(out)), ["meta.json", "setup"], "Actor workspace is already spent");
assert.equal(process.execPath, capabilities.node.executable);
assert.equal(process.version, capabilities.node.version);
assert.equal(process.env.NEXT_TELEMETRY_DISABLED, undefined);
assert.equal(process.env.TMPDIR, "/var/tmp/storyfolio-entry-runtime-20261012");
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(process.env[key] ?? null, value, key);

const snapshot = await readJson(setup, "snapshot/manifest.json");
const before = await readJson(setup, "source-before-capability.json"), after = await readJson(setup, "source-after-capability.json");
for (const observed of [before, after]) {
  assert.deepEqual(observed.unexpected, []);
  assert.deepEqual(observed.entries, snapshot.files, "Source changed during capability proof");
}
const current = await inspectWorkspace(meta.work, source.snapshot);
assert.deepEqual(current.unexpected, []);
assert.deepEqual(Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...record }]) => [path, record])), snapshot.files);
assert.ok(current.excluded.every(path => ["node_modules", ".next", "checks", "next-env.d.ts"].includes(path) || path.endsWith(".tsbuildinfo")));

const install = await readJson(setup, "dependency-install/command.json"), installed = await readJson(setup, "dependency-install/result.json");
assert.equal(install.cwd, meta.work);
assert.equal(install.executable, "npm");
assert.deepEqual(install.args, ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"]);
assert.equal(installed.code, 0);
assert.equal(installed.signal, null);
assert.equal(install.environment.TMPDIR, process.env.TMPDIR);
assert.equal(install.environment.NEXT_TELEMETRY_DISABLED, null);
for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(install.environment[key], value, key);
for (const channel of ["stdout", "stderr"]) assert.equal(hash(await regularBytes(setup, `dependency-install/${channel}.log`)), installed[`${channel}Sha256`]);
const command = await readJson(setup, "capability-command.json"), processResult = await readJson(setup, "capability-process.json");
assert.equal(command.cwd, meta.work);
assert.equal(command.inputDigest, manifest.digest);
assert.equal(command.capabilitySha256, manifest.hashes["capabilities.json"]);
assert.equal(command.modelCalls, 0);
assert.equal(processResult.code, 0);
assert.equal(processResult.signal, null);
assert.equal(processResult.timedOut, false);
assert.equal(processResult.modelCalls, 0);
const probe = await readJson(setup, "capability/probe.json");
assert.equal(probe.workspace, meta.work);
assert.equal(probe.passed, true);
assert.equal(probe.modelCalls, 0);
const observation = name => { const rows = probe.observations.filter(row => row.name === name); assert.equal(rows.length, 1); return rows[0]; };
assert.equal(observation("local-http").passed, true);
assert.equal(observation("external-request").blocked, true);
assert.match(observation("external-request").cause, /Proxy response \(403\)/);
for (const name of ["build", "browser"]) {
  assert.equal(observation(name).code, 0);
  assert.equal(observation(name).timeout, false);
  assert.equal(observation(name).error, undefined);
}
const browser = await readJson(setup, "capability/browser/manifest.json"), report = await readJson(setup, "capability/browser/light-wide/report.json");
assert.equal(browser.complete, true);
assert.deepEqual(browser.results.map(row => ({ name: row.name, code: row.code, problems: row.problems })), [{ name: "light-wide", code: 0, problems: [] }]);
assert.deepEqual(report.problems, []);
assert.equal(report.shots.length, 9);
const originals = await readJson(setup, "original-images.json");
assert.equal(originals.schemaVersion, 1);
assert.equal(originals.images.length, 9);
assert.equal(new Set(originals.images.map(row => row.path)).size, 9);
assert.ok((await regularBytes(setup, "capability-visual-review.md")).toString("utf8").trim().length > 0, "Actual image review must be saved first");
const originalPaths = report.shots.map(path => {
  assert.ok(path.startsWith(join(meta.work, "checks/setup-capability/browser/light-wide") + "/"));
  return `capability/browser/light-wide/${basename(path)}`;
});
assert.deepEqual(sorted(originals.images.map(row => row.path)), sorted(originalPaths));
assert.deepEqual(sorted((await readdir(join(setup, "capability/browser/light-wide"))).filter(path => path.endsWith(".png"))), sorted(originalPaths.map(path => basename(path))));
for (const original of originals.images) {
  safePath(original.path);
  assert.equal(original.viewMethod, "view_image original");
  const bytes = await regularBytes(setup, original.path);
  assert.equal(hash(bytes), original.sha256);
  assert.equal(bytes.length, original.bytes);
  assert.equal(bytes.readUInt32BE(16), 1440);
  assert.equal(bytes.readUInt32BE(20), 900);
  assert.deepEqual(bytes, await regularBytes(meta.work, `checks/setup-capability/browser/light-wide/${basename(original.path)}`));
}

const coordinatorHelpers = {};
for (const name of ["check-ready.mjs", "finalize-setup.mjs", "run-capability-probe.mjs"]) {
  const path = `evals/runs/stage-3-natural-entry-1/${name}`, digest = hash(await regularBytes(root, path));
  assert.equal(digest, manifest.hashes[`implementation/${path}`], `Unfrozen helper: ${path}`);
  coordinatorHelpers[path] = digest;
}
const facts = {
  schemaVersion: 1, role: "coordinator-setup", coordinatorSetup: true, actorPreflight: false,
  inputDigest: manifest.digest, node: capabilities.node,
  dependencyInstall: { command: "npm ci --offline --cache=/tmp/storyfolio-npm-cache", offline: true, exitCode: 0 },
  capabilities: { localHttp: true, externalHttps: "proxy-403", productionBuild: true, starterBrowser: "light-wide" },
  limitations: [
    "These are coordinator setup observations, not your own preflight or evidence of completing the requested site.",
    "The browser check covers only the supplied starter at 1440 by 900, not phone behavior or final visual acceptance.",
    "The configured proxy permits loopback destinations only. Configuration isolation is not a filesystem read jail.",
    "Use the recorded Node executable and existing browser resources. Dependencies were installed from the supplied lockfile without external downloads."
  ]
};
const factsBytes = Buffer.from(json(facts));
assert.ok(!factsBytes.toString().includes(root));
assert.ok(!/(?:evals\/|prototypes\/|docs\/(?:history|superpowers)\/|portfolio-website|fixture-study|visual-recovery|codex-build-completion)/.test(factsBytes.toString()));
const evidence = ["dependency-install/command.json", "dependency-install/result.json", "dependency-install/stdout.log", "dependency-install/stderr.log", "runtime-environment.json", "capability-command.json", "capability-process.json", "capability/probe.json", "capability/build.log", "capability/browser.log", "capability/browser/manifest.json", "capability/browser/light-wide/report.json", "capability-visual-review.md", "original-images.json", "environment-setup.json", "source-before-capability.json", "source-after-capability.json", ...originalPaths];
const evidenceHashes = {};
for (const path of evidence) {
  const bytes = path === "environment-setup.json" ? factsBytes : await regularBytes(setup, path);
  evidenceHashes[path] = { sha256: hash(bytes), bytes: bytes.length };
}
// Validate all evidence before creating any final attestation. Never overwrite.
const destinations = [join(setup, "environment-setup.json"), join(meta.work, "docs/story/environment-setup.json"), join(setup, "probe.json")];
for (const path of destinations) {
  const status = await lstat(path).catch(error => { if (error.code === "ENOENT") return null; throw error; });
  assert.equal(status, null, `Existing finalization is preserved: ${path}`);
}
await writeNew(destinations[0], factsBytes);
await writeNew(destinations[1], factsBytes);
await writeNew(destinations[2], json({ schemaVersion: 1, passed: true, inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"], work: meta.work,
  evidence, evidenceHashes, coordinatorHelpers, modelCalls: 0,
  limits: [
    "Coordinator setup, not actor preflight, ordinary build entry or visual acceptance.",
    "The saved reviewer attests individual viewing of all nine starter originals; hashes are checked here, human viewing is not inferred by software.",
    "Command-only sandbox inherits user configuration; actor exec separately ignores it. Configuration isolation is not a filesystem read jail.",
    "The retained external-request stack may disclose the frozen implementation repository path, not held-out source or images. Audit actual actor access separately.",
    "Paid allowance is recorded separately; this setup proof is not spending authorization."
  ] }));
console.log(json({ finalized: true, cohort, caseId, work: meta.work, sourceFilesBeforeFacts: Object.keys(snapshot.files).length,
  evidenceFiles: evidence.length, originalImages: originals.images.length, factualSetupSha256: hash(factsBytes), modelCalls: 0, subprocesses: 0,
  next: "Run the separate read-only check-ready.mjs gate before any actor launch." }));
