// Read-only prospective readiness gate. Its only subprocess is runner --dry.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, readdir, realpath } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { hash, inspectBuildInputs, inspectWorkspace, json, regularBytes, safePath, verifyInputs } from "../../lib/build.mjs";

const { values } = parseArgs({ options: { cohort: { type: "string", default: "codex-bench-depth-baseline-2" } } });
assert.ok(["codex-bench-depth-baseline-2", "codex-bench-depth-candidate-1"].includes(values.cohort), "Only the two prospectively authorized cohorts are supported");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const cohort = join(root, "evals/runs", values.cohort), inputs = join(cohort, "inputs"), out = join(cohort, "bench-depth-2/baseline-1"), setup = join(out, "setup");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const sorted = items => [...items].sort();
const record = bytes => ({ type: "file", hash: hash(bytes), size: bytes.length });
async function filesAt(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.ok(!entry.isSymbolicLink(), `Unexpected source symlink: ${path}`);
    if (entry.isDirectory()) files.push(...await filesAt(directory, path));
    else { assert.ok(entry.isFile()); files.push(path); }
  }
  return sorted(files);
}
async function check() {
  const manifest = await verifyInputs(inputs), capabilities = await readJson(join(inputs, "capabilities.json"));
  const inspected = await inspectBuildInputs({ root, casePath: manifest.casePath, capabilities });
  assert.equal(inspected.digest, manifest.digest, "Current inputs differ from frozen inputs");
  assert.deepEqual(inspected.hashes, manifest.hashes);
  const source = inspected.source;
  assert.equal(source.id, "bench-depth-2");
  assert.equal(source.schemaVersion, 2);
  assert.equal(source.taskKind, "prototype-depth");
  assert.equal(source.setupMode, "scaffold");
  assert.equal(source.judgeTransport, "paged-v1");
  assert.equal(source.files.length, 9);
  assert.equal(source.prompts.length, 1);
  assert.equal(source.bounds.maxTurns, 1);
  assert.equal(source.bounds.turnTimeoutMs, 900000);
  assert.equal(source.bounds.maxWallMs, 900000);
  assert.deepEqual(source.refusalTurns, [1]);
  assert.equal(manifest.recorded.sourceStatus, "", "Declared actor inputs were dirty at freeze");
  assert.deepEqual(sorted(await readdir(cohort)), ["bench-depth-2", "inputs"]);
  assert.deepEqual(await readdir(join(cohort, "bench-depth-2")), ["baseline-1"]);
  assert.deepEqual(sorted(await readdir(out)), ["meta.json", "setup"], "An actor/judge artifact already exists");
  const meta = await readJson(join(out, "meta.json"));
  for (const [key, value] of Object.entries({ cohort: values.cohort, caseId: source.id, inputDigest: manifest.digest, inputs, rep: 1, model: capabilities.model, reasoningEffort: capabilities.reasoningEffort, taskKind: source.taskKind, setupMode: source.setupMode })) assert.equal(meta[key], value, `Identity: ${key}`);
  assert.deepEqual(meta.bounds, source.bounds);
  assert.equal(await realpath(meta.work), meta.work);
  assert.ok(meta.work.startsWith("/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-"));
  const prepared = await readJson(join(setup, "result.json")), started = await readJson(join(setup, "started.json"));
  assert.equal(prepared.complete, true);
  assert.equal(prepared.modelCalls, 0);
  assert.equal(prepared.networkCalls, 0);
  assert.equal(prepared.scaffold.scaffolded, true);
  assert.deepEqual(prepared.scaffold.conflicts, []);
  assert.equal(started.work, meta.work);
  assert.equal(started.inputDigest, manifest.digest);
  assert.equal(started.paid, false);
  const initial = {}, expected = {};
  for (const [path, bytes] of Object.entries(inspected.files)) {
    const target = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
    if (target) { initial[target] = record(bytes); expected[target] = record(bytes); }
    if (path.startsWith("skill/engine/")) { const target = path.slice(13); assert.ok(!expected[target], `Fixture/scaffold collision: ${target}`); expected[target] = record(bytes); }
  }
  const inventory = await readJson(join(setup, "pre-scaffold-inventory.json")), snapshot = await readJson(join(setup, "snapshot/manifest.json"));
  assert.deepEqual(inventory.initialEntries, []);
  assert.deepEqual(sorted(inventory.files), sorted(Object.keys(initial)));
  assert.deepEqual(sorted(inventory.fixtureFiles), sorted(source.files));
  assert.deepEqual(prepared.scaffold.inventory, inventory);
  assert.deepEqual(prepared.snapshot, snapshot);
  assert.deepEqual(snapshot.files, expected);
  assert.deepEqual(snapshot.excluded, []);
  assert.deepEqual(snapshot.unexpected, []);
  assert.deepEqual(await filesAt(join(setup, "snapshot/files")), sorted(Object.keys(expected)));
  for (const [path, value] of Object.entries(expected)) assert.deepEqual(record(await regularBytes(join(setup, "snapshot/files"), path)), value, path);

  const runtime = await readJson(join(setup, "runtime-environment.json"));
  assert.equal(runtime.TMPDIR, "/var/tmp/storyfolio-comparison-runtime-20261012");
  assert.deepEqual(sorted(Object.keys(capabilities.environment)), ["LANG", "LD_LIBRARY_PATH", "PATH", "PLAYWRIGHT_BROWSERS_PATH"]);
  assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256);
  const env = { ...process.env, ...capabilities.environment, TMPDIR: runtime.TMPDIR };
  const dryArgs = [join(root, "evals/codex-build-run.mjs"), "--case", manifest.casePath, "--cohort", values.cohort, "--capabilities", "evals/builds/local-capabilities.json", "--dry"];
  const dry = spawnSync(capabilities.node.executable, dryArgs, { cwd: root, env, encoding: "utf8", timeout: 30000, maxBuffer: 8 * 1024 * 1024 });
  assert.equal(dry.error, undefined, String(dry.error));
  assert.equal(dry.status, 0, dry.stdout + dry.stderr);
  const observed = JSON.parse(dry.stdout);
  assert.equal(observed.digest, manifest.digest);
  assert.deepEqual(observed.capabilities, capabilities, "Current Node, CLI, environment or skill isolation changed");

  const current = await inspectWorkspace(meta.work, source.snapshot);
  assert.deepEqual(current.unexpected, []);
  const observedFiles = Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
  const actorSetupPath = "docs/story/environment-setup.json";
  const actorSetupBytes = await regularBytes(setup, "environment-setup.json");
  assert.deepEqual(current.entries[actorSetupPath]?.bytes, actorSetupBytes);
  const actorSetup = JSON.parse(actorSetupBytes);
  assert.equal(actorSetup.inputDigest, manifest.digest);
  assert.equal(actorSetup.coordinatorSetup, true);
  assert.equal(actorSetup.actorPreflight, false);
  assert.deepEqual(actorSetup.node, capabilities.node);
  assert.deepEqual(actorSetup.capabilities, { localHttp: true, externalHttps: "proxy-403", productionBuild: true, starterBrowser: "light-wide" });
  assert.equal(actorSetup.dependencyInstall.exitCode, 0);
  assert.equal(actorSetup.dependencyInstall.offline, true);
  assert.match(actorSetup.dependencyInstall.command, /^npm ci --offline --cache=\/tmp\/storyfolio-npm-cache$/);
  assert.ok(!actorSetupBytes.toString().includes(root), "Factual actor setup must not reveal repository path");
  assert.ok(!/(?:evals\/|prototypes\/|docs\/(?:history|superpowers)\/|portfolio-website|fixture-study|visual-recovery|codex-build-completion)/.test(actorSetupBytes.toString()), "Factual setup exposes held-out material");
  expected[actorSetupPath] = record(actorSetupBytes);
  assert.deepEqual(observedFiles, expected, "Non-generated actor source changed during setup");
  // Shared source scope excludes Next-generated declarations prospectively.
  assert.ok(current.excluded.every(path => ["node_modules", ".next", "checks", "next-env.d.ts"].includes(path) || path.endsWith(".tsbuildinfo")), "Unexpected generated/metadata exclusion before actor launch");

  const gate = await readJson(join(setup, "probe.json"));
  assert.equal(gate.schemaVersion, 1);
  assert.equal(gate.passed, true);
  assert.equal(gate.inputDigest, manifest.digest);
  assert.equal(gate.capabilitySha256, manifest.hashes["capabilities.json"]);
  assert.equal(gate.work, meta.work);
  assert.ok(Array.isArray(gate.evidence) && gate.evidence.length > 0);
  assert.equal(new Set(gate.evidence).size, gate.evidence.length);
  const evidence = {};
  for (const path of gate.evidence) { safePath(path); const bytes = await regularBytes(setup, path); evidence[path] = { sha256: hash(bytes), bytes: bytes.length }; }
  assert.deepEqual(evidence, gate.evidenceHashes, "Retained setup proof bytes changed");
  for (const path of ["dependency-install/command.json", "dependency-install/result.json", "dependency-install/stdout.log", "dependency-install/stderr.log", "runtime-environment.json", "capability-command.json", "capability-process.json", "capability/probe.json", "capability/build.log", "capability/browser.log", "capability/browser/manifest.json", "capability/browser/light-wide/report.json", "capability-visual-review.md", "original-images.json", "environment-setup.json", "source-before-capability.json", "source-after-capability.json"]) assert.ok(evidence[path], `Missing required proof: ${path}`);
  const helpers = ["evals/runs/stage-3-comparison-1/check-ready.mjs", "evals/runs/stage-3-comparison-1/run-capability-probe.mjs"];
  assert.deepEqual(sorted(Object.keys(gate.coordinatorHelpers)), helpers);
  for (const path of helpers) assert.equal(hash(await regularBytes(root, path)), gate.coordinatorHelpers[path], `Coordinator helper changed: ${path}`);
  const command = await readJson(join(setup, "capability-command.json"));
  assert.equal(command.executable, capabilities.cliExecutable);
  assert.equal(command.cwd, meta.work);
  assert.equal(command.inputDigest, manifest.digest);
  assert.equal(command.capabilitySha256, manifest.hashes["capabilities.json"]);
  assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: runtime.TMPDIR });
  const expectedArgs = ["sandbox"];
  for (let index = 0; index < capabilities.argv.length; index++) if (capabilities.argv[index] === "-c") expectedArgs.push("-c", capabilities.argv[++index]);
  expectedArgs.push("--", capabilities.node.executable, join(inputs, "implementation/evals/probe-build-environment.mjs"), `--workspace=${meta.work}`, `--out=${join(meta.work, "checks/setup-capability")}`);
  assert.deepEqual(command.args, expectedArgs);
  const processResult = await readJson(join(setup, "capability-process.json"));
  assert.equal(processResult.code, 0);
  assert.equal(processResult.timedOut, false);
  const raw = await readJson(join(setup, "capability/probe.json"));
  assert.equal(raw.workspace, meta.work);
  assert.equal(raw.modelCalls, 0);
  assert.equal(raw.passed, true);
  const observation = name => { const matches = raw.observations.filter(item => item.name === name); assert.equal(matches.length, 1); return matches[0]; };
  assert.equal(observation("local-http").passed, true);
  assert.equal(observation("external-request").blocked, true);
  assert.match(observation("external-request").cause, /Proxy response \(403\)/);
  for (const name of ["build", "browser"]) { assert.equal(observation(name).code, 0); assert.equal(observation(name).timeout, false); assert.equal(observation(name).error, undefined); }
  const install = await readJson(join(setup, "dependency-install/command.json")), installed = await readJson(join(setup, "dependency-install/result.json"));
  assert.equal(install.cwd, meta.work);
  assert.equal(install.executable, "npm");
  assert.deepEqual(install.args, ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"]);
  assert.equal(installed.code, 0);
  assert.equal(installed.signal, null);
  assert.equal(installed.stdoutSha256, evidence["dependency-install/stdout.log"].sha256);
  assert.equal(installed.stderrSha256, evidence["dependency-install/stderr.log"].sha256);
  for (const [key, value] of Object.entries(capabilities.environment)) assert.equal(install.environment[key], value);
  assert.equal(install.environment.TMPDIR, runtime.TMPDIR);
  const before = await readJson(join(setup, "source-before-capability.json")), after = await readJson(join(setup, "source-after-capability.json"));
  assert.deepEqual(before.unexpected, []);
  assert.deepEqual(after.unexpected, []);
  assert.deepEqual(before.entries, snapshot.files);
  assert.deepEqual(after.entries, snapshot.files, "Capability probe changed retained source");
  const browserManifest = await readJson(join(setup, "capability/browser/manifest.json")), browserReport = await readJson(join(setup, "capability/browser/light-wide/report.json"));
  assert.equal(browserManifest.complete, true);
  assert.deepEqual(browserManifest.results.map(item => ({ name: item.name, code: item.code, problems: item.problems })), [{ name: "light-wide", code: 0, problems: [] }]);
  assert.deepEqual(browserReport.problems, []);
  assert.equal(browserReport.shots.length, 9);
  const originals = await readJson(join(setup, "original-images.json"));
  assert.equal(originals.images.length, 9);
  assert.equal(new Set(originals.images.map(item => item.path)).size, 9);
  const expectedImages = browserReport.shots.map(path => {
    assert.ok(path.startsWith(join(meta.work, "checks/setup-capability/browser/light-wide") + "/"));
    return `capability/browser/light-wide/${basename(path)}`;
  });
  assert.deepEqual(sorted(originals.images.map(item => item.path)), sorted(expectedImages));
  assert.deepEqual(sorted((await readdir(join(setup, "capability/browser/light-wide"))).filter(path => path.endsWith(".png"))), sorted(expectedImages.map(path => basename(path))));
  for (const original of originals.images) {
    assert.equal(original.viewMethod, "view_image original");
    const bytes = await regularBytes(setup, original.path);
    assert.equal(bytes.length, original.bytes);
    assert.equal(hash(bytes), original.sha256);
    assert.deepEqual(evidence[original.path], { bytes: original.bytes, sha256: original.sha256 });
    assert.equal(bytes.readUInt32BE(16), 1440);
    assert.equal(bytes.readUInt32BE(20), 900);
    assert.deepEqual(bytes, await readFile(join(meta.work, "checks/setup-capability/browser/light-wide", basename(original.path))), "Copied original differs from runtime original");
  }
  return { schemaVersion: 1, verified: true, cohort: values.cohort, caseId: source.id, inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"], work: meta.work,
    frozenFiles: Object.keys(manifest.hashes).length, initialFixtureFiles: source.files.length, initialSkillFiles: Object.keys(initial).length - source.files.length, initialScaffoldFiles: Object.keys(snapshot.files).length,
    sourceUnchanged: true, factualSetupSha256: hash(actorSetupBytes), excludedGeneratedPaths: current.excluded, sourceScope: "Shared prospective source policy; next-env.d.ts is generated, not retained actor source", evidence, coordinatorHelpers: gate.coordinatorHelpers, originalsReviewed: originals.images.length,
    dry: { executable: capabilities.node.executable, args: dryArgs, exitCode: dry.status, stderr: dry.stderr }, TMPDIR: runtime.TMPDIR,
    noActorOrJudgeArtifacts: true, modelCalls: 0, writes: false, limits: ["Coordinator capability proof, not actor preflight or visual acceptance", "Configuration isolation is not a filesystem read jail", "Human paid approval is recorded separately; this script cannot launch a paid turn"] };
}
try { console.log(json(await check())); }
catch (error) { console.log(json({ verified: false, error: error.stack, modelCalls: 0, writes: false })); process.exitCode = 1; }
