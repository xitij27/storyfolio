#!/usr/bin/env node
// Read-only verification of a prepared, still-unspent diagnostic workspace.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { delimiter, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { buildCodexArgs, hash, inspectBuildInputs, inspectWorkspace, json, regularBytes, safeId, safePath, verifyInputs } from "../../lib/build.mjs";
import { disabledSkills, EFFORT, MODEL } from "../../lib/codex.mjs";

const study = dirname(fileURLToPath(import.meta.url));
const root = resolve(study, "../../..");
const { values } = parseArgs({ options: {
  cohort: { type: "string", default: "codex-bench-depth-baseline-1" },
  "require-probe": { type: "boolean", default: false },
  help: { type: "boolean", default: false },
} });
if (values.help) {
  console.log("Usage: node evals/runs/build-workflow-freeze-1/audit.mjs [--cohort <id>] [--require-probe]\nRead-only: validates frozen inputs, initial and current source, configuration and saved setup proof. No subprocess, model, network or writes.");
  process.exit(0);
}
const exists = async path => {
  try { return await lstat(path); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
};
const sorted = values => [...values].sort();
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const record = bytes => ({ type: "file", hash: hash(bytes), size: bytes.length });
const exactKeys = (value, keys, label) => {
  assert(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  assert.deepEqual(sorted(Object.keys(value)), sorted(keys), `Unexpected ${label} fields`);
};

function validateEnvironmentSetup(value, { digest, node }) {
  exactKeys(value, ["schemaVersion", "role", "coordinatorSetup", "actorPreflight", "inputDigest", "node", "dependencyInstall", "capabilities", "limitations"], "environment setup");
  assert.equal(value.schemaVersion, 1);
  assert.equal(value.role, "coordinator-setup");
  assert.equal(value.coordinatorSetup, true);
  assert.equal(value.actorPreflight, false);
  assert.equal(value.inputDigest, digest);
  exactKeys(value.node, ["version", "executable"], "setup node");
  assert.deepEqual(value.node, node);
  exactKeys(value.dependencyInstall, ["command", "offline", "exitCode"], "dependency installation");
  assert.equal(typeof value.dependencyInstall.command, "string");
  assert.match(value.dependencyInstall.command, /^npm ci(?:\s|$)/);
  assert.match(value.dependencyInstall.command, /(?:^|\s)--offline(?:\s|$)/);
  assert(!/[\r\n;&|`<>]/.test(value.dependencyInstall.command), "Dependency command must describe only the offline installation");
  assert.equal(value.dependencyInstall.offline, true);
  assert.equal(value.dependencyInstall.exitCode, 0);
  exactKeys(value.capabilities, ["localHttp", "externalHttps", "productionBuild", "starterBrowser"], "setup capabilities");
  assert.deepEqual(value.capabilities, { localHttp: true, externalHttps: "proxy-403", productionBuild: true, starterBrowser: "light-wide" });
  assert(Array.isArray(value.limitations) && value.limitations.length > 0);
  assert(value.limitations.every(item => typeof item === "string" && item.trim().length > 0));
  const visit = item => {
    if (typeof item === "string") {
      assert(!item.includes(root), "Setup information must not disclose the repository path");
      assert(!/(?:^|[\s/\\])(?:\.\.\/|evals[\/\\]|prototypes[\/\\]|docs[\/\\](?:history|superpowers)[\/\\])/.test(item), "Setup information must not disclose held-out or repository-relative paths");
      assert(!/(?:portfolio-website|fixture-study|visual-recovery|codex-build-completion)/.test(item), "Setup information must not refer to held-out solution material");
    } else if (Array.isArray(item)) item.forEach(visit);
    else if (item && typeof item === "object") Object.values(item).forEach(visit);
  };
  visit(value);
}

async function fileList(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert(!entry.isSymbolicLink(), `Unexpected symlink: ${path}`);
    if (entry.isDirectory()) files.push(...await fileList(directory, path));
    else { assert(entry.isFile(), `Unexpected non-file: ${path}`); files.push(path); }
  }
  return sorted(files);
}

async function audit() {
  const cohort = safeId(values.cohort);
  const inputs = join(root, "evals/runs", cohort, "inputs");
  const manifest = await verifyInputs(inputs);
  const capabilities = await readJson(inputs, "capabilities.json");
  const inspected = await inspectBuildInputs({ root, casePath: manifest.casePath, capabilities });
  assert.equal(inspected.digest, manifest.digest, "Current source does not match the frozen inputs");
  assert.deepEqual(inspected.hashes, manifest.hashes);
  const source = inspected.source;
  assert.equal(source.id, "bench-depth-1");
  assert.equal(manifest.caseId, source.id);
  assert.equal(source.schemaVersion, 2);
  assert.equal(source.taskKind, "prototype-depth");
  assert.equal(source.judgeTransport, "paged-v1");
  assert.equal(source.setupMode, "scaffold");
  assert.equal(source.files.length, 7);
  assert.equal(source.prompts.length, 1);
  assert.equal(source.bounds.maxTurns, 1);
  assert.deepEqual(source.refusalTurns, [1]);
  assert.equal(manifest.recorded.sourceStatus, "", "Declared source inputs were dirty at preparation");
  assert.match(manifest.recorded.commit, /^[a-f0-9]{40}$/);

  const out = join(root, "evals/runs", cohort, source.id, "baseline-1");
  assert.deepEqual(sorted(await readdir(join(root, "evals/runs", cohort))), sorted(["inputs", source.id]), "Unexpected cohort artifacts");
  assert.deepEqual(await readdir(join(root, "evals/runs", cohort, source.id)), ["baseline-1"], "Unexpected repetition artifacts");
  const meta = await readJson(out, "meta.json");
  const identity = { runner: "codex-build", caseId: source.id, cohort, rep: 1, inputDigest: manifest.digest,
    inputs, model: MODEL, reasoningEffort: EFFORT, setupMode: source.setupMode, taskKind: source.taskKind };
  for (const [key, expected] of Object.entries(identity)) assert.equal(meta[key], expected, `Baseline identity: ${key}`);
  assert.deepEqual(meta.bounds, source.bounds);
  assert.deepEqual(meta.refusalTurns, source.refusalTurns);
  assert.equal(Object.hasOwn(meta, "requestedStops"), false);
  assert(isAbsolute(meta.work));
  const work = await realpath(meta.work);
  assert.equal(work, meta.work, "Workspace must be its recorded real path");
  const withinRoot = relative(root, work);
  assert(withinRoot.startsWith("../") || isAbsolute(withinRoot), "Actor workspace must be outside the repository");
  assert.deepEqual(sorted(await readdir(out)), ["meta.json", "setup"], "A turn, judge or other post-preparation artifact exists");
  const setup = await readJson(out, "setup/result.json");
  const started = await readJson(out, "setup/started.json");
  assert.equal(started.work, work);
  assert.equal(started.inputDigest, manifest.digest);
  assert.equal(started.paid, false);
  assert.equal(setup.complete, true);
  assert.equal(setup.modelCalls, 0);
  assert.equal(setup.networkCalls, 0);
  assert.equal(setup.setupMode, "scaffold");
  assert.equal(setup.scaffold.scaffolded, true);
  assert.deepEqual(setup.scaffold.conflicts, []);

  const inventory = await readJson(out, "setup/pre-scaffold-inventory.json");
  const expectedInitial = {};
  const expectedSnapshot = {};
  for (const [path, bytes] of Object.entries(inspected.files)) {
    const initialPath = path.startsWith("fixture/") ? path.slice(8)
      : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
    if (initialPath) {
      assert(!Object.hasOwn(expectedInitial, initialPath));
      expectedInitial[initialPath] = record(bytes);
      expectedSnapshot[initialPath] = record(bytes);
    }
    if (path.startsWith("skill/engine/")) {
      const enginePath = path.slice(13);
      assert(!Object.hasOwn(expectedSnapshot, enginePath), `Engine/fixture conflict: ${enginePath}`);
      expectedSnapshot[enginePath] = record(bytes);
    }
  }
  assert.equal(inventory.schemaVersion, 1);
  assert.equal(inventory.setupMode, "scaffold");
  assert.deepEqual(inventory.initialEntries, []);
  assert.deepEqual(sorted(inventory.fixtureFiles), sorted(source.files));
  assert.deepEqual(sorted(inventory.files), sorted(Object.keys(expectedInitial)));
  assert.deepEqual(setup.scaffold.inventory, inventory);
  assert.deepEqual(sorted(setup.scaffold.copied), sorted(Object.keys(inspected.files).filter(path => path.startsWith("skill/engine/")).map(path => path.slice(13))));

  const snapshot = await readJson(out, "setup/snapshot/manifest.json");
  assert.equal(snapshot.schemaVersion, 1);
  assert.deepEqual(snapshot, setup.snapshot, "Saved setup snapshot differs from result");
  assert.deepEqual(snapshot.excluded, []);
  assert.deepEqual(snapshot.unexpected, []);
  assert.deepEqual(snapshot.files, expectedSnapshot, "Initial scaffold contains source not bound to frozen inputs");
  assert.equal(snapshot.totalBytes, Object.values(expectedSnapshot).reduce((sum, entry) => sum + entry.size, 0));
  assert.deepEqual(sorted(await fileList(join(out, "setup/snapshot/files"))), sorted(Object.keys(expectedSnapshot)));
  for (const [path, expected] of Object.entries(expectedSnapshot)) {
    assert.deepEqual(record(await regularBytes(join(out, "setup/snapshot/files"), path)), expected, `Saved snapshot source: ${path}`);
  }
  assert.deepEqual(snapshot.changes, sorted(Object.keys(expectedSnapshot)).map(path => ({ path, change: "added", before: null, after: expectedSnapshot[path] })));

  const current = await inspectWorkspace(work, source.snapshot);
  assert.deepEqual(current.unexpected, [], "Unexpected actor-workspace files");
  const currentFiles = Object.fromEntries(Object.entries(current.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
  const changes = [];
  let environmentSetup = { present: false, boundToCoordinatorRecord: false };
  for (const path of sorted(new Set([...Object.keys(expectedSnapshot), ...Object.keys(currentFiles)]))) {
    const before = expectedSnapshot[path] ?? null, after = currentFiles[path] ?? null;
    if (json(before) === json(after)) continue;
    if (path === "docs/story/environment-setup.json") {
      assert.equal(before, null, "Factual setup data must be a new file");
      assert.equal(after?.type, "file");
      const coordinatorBytes = await regularBytes(out, "setup/environment-setup.json");
      assert.deepEqual(current.entries[path].bytes, coordinatorBytes, "Actor factual setup differs from the retained coordinator record");
      validateEnvironmentSetup(JSON.parse(coordinatorBytes), { digest: manifest.digest, node: capabilities.node });
      environmentSetup = { present: true, boundToCoordinatorRecord: true, path, sha256: hash(coordinatorBytes), bytes: coordinatorBytes.length };
      changes.push({ path, change: "added", before, after, classification: "Factual coordinator setup only; exact bytes bound to saved coordinator record, not actor preflight" });
      continue;
    }
    assert.equal(path, "next-env.d.ts", `Non-generated source changed during setup: ${path}`);
    assert.equal(before, null, "Only a newly generated Next declaration is allowed");
    assert.equal(after?.type, "file");
    const generated = current.entries[path].bytes.toString("utf8");
    const expectedGenerated = [
      '/// <reference types="next" />',
      '/// <reference types="next/image-types/global" />',
      'import "./.next/types/routes.d.ts";',
      'import "./.next/types/root-params.d.ts";',
      "", "// NOTE: This file should not be edited",
      "// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.", "",
    ].join("\n");
    assert.equal(generated, expectedGenerated, "Generated Next declaration differs from the observed pinned-engine form");
    changes.push({ path, change: "added", before, after, classification: "Next-generated type declaration; hash reported, not actor-authored source" });
  }

  assert.equal(capabilities.schemaVersion, 1);
  assert.equal(capabilities.runner, "codex-build");
  assert.equal(capabilities.model, MODEL);
  assert.equal(capabilities.reasoningEffort, EFFORT);
  assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256, "Installed CLI binary changed");
  assert.equal(await realpath(capabilities.cliExecutable), capabilities.cliExecutable);
  let currentCli;
  for (const path of (process.env.PATH ?? "").split(delimiter)) {
    try { currentCli = await realpath(join(path, "codex")); break; } catch {}
  }
  assert.equal(currentCli, capabilities.cliExecutable, "PATH resolves a different CLI");
  assert.deepEqual(sorted(await disabledSkills()), sorted(capabilities.disabledSkills), "Disabled-skill inventory changed");
  assert.deepEqual(capabilities.argv, buildCodexArgs({ model: capabilities.model, disabled: capabilities.disabledSkills,
    config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig }));
  const requested = await readJson(inputs, "implementation/evals/builds/local-capabilities.json");
  for (const [key, expected] of Object.entries(requested)) assert.deepEqual(capabilities[key], expected, `Frozen requested capability: ${key}`);
  assert.deepEqual(await readdir(join(work, ".agents/skills")), ["storyfolio"]);

  const environmentKeys = ["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG"];
  const observedEnvironment = Object.fromEntries(environmentKeys.map(key => [key, process.env[key] ?? null]));
  const observedNode = { version: process.version, executable: process.execPath };
  let runtimeEnvironment = null, runtimeEnvironmentSha256 = null;
  if (await exists(join(out, "setup/runtime-environment.json"))) {
    const bytes = await regularBytes(out, "setup/runtime-environment.json");
    runtimeEnvironment = JSON.parse(bytes);
    runtimeEnvironmentSha256 = hash(bytes);
  }
  const launchEnvironment = { node: observedNode, frozenNode: capabilities.node,
    environment: observedEnvironment, frozenEnvironment: capabilities.environment,
    TMPDIR: process.env.TMPDIR ?? null, runtimeRecord: runtimeEnvironment,
    runtimeRecordSha256: runtimeEnvironmentSha256, enforced: values["require-probe"] };

  let capabilityProof = { present: false, passed: false, evidence: {} };
  if (await exists(join(out, "setup/probe.json"))) {
    const probe = await readJson(out, "setup/probe.json");
    assert.equal(probe.schemaVersion, 1);
    assert.equal(probe.passed, true);
    assert.equal(probe.inputDigest, manifest.digest);
    assert.equal(probe.capabilitySha256, manifest.hashes["capabilities.json"]);
    assert.equal(probe.work, work);
    assert(Array.isArray(probe.evidence) && probe.evidence.length > 0);
    assert.equal(new Set(probe.evidence).size, probe.evidence.length);
    const evidence = {};
    const rawProofs = [];
    for (const path of probe.evidence) {
      safePath(path);
      const bytes = await regularBytes(join(out, "setup"), path);
      evidence[path] = { sha256: hash(bytes), bytes: bytes.length };
      if (path.endsWith("/probe.json")) {
        const raw = JSON.parse(bytes);
        if (raw.workspace === work && raw.modelCalls === 0 && raw.passed === true) rawProofs.push({ path, raw });
      }
    }
    assert.equal(rawProofs.length, 1, "Expected one passing no-model capability probe for this workspace");
    const { path: proofPath, raw } = rawProofs[0];
    assert.equal(raw.schemaVersion, 1);
    const observation = name => {
      const matches = raw.observations.filter(item => item.name === name);
      assert.equal(matches.length, 1, `Expected exactly one capability observation: ${name}`);
      return matches[0];
    };
    assert.equal(observation("local-http").passed, true);
    assert.equal(observation("external-request").blocked, true);
    assert.match(observation("external-request").cause, /Proxy response \(403\)/);
    for (const name of ["build", "browser"]) {
      const item = observation(name);
      assert.equal(item.code, 0, `${name} capability failed`);
      assert.equal(item.timeout, false);
      assert.equal(item.error, undefined);
    }
    capabilityProof = { present: true, passed: true, probeSha256: hash(await regularBytes(out, "setup/probe.json")), rawProof: proofPath, evidence };
  }
  if (values["require-probe"]) {
    assert.equal(capabilityProof.passed, true, "Passing saved capability proof is required");
    assert.equal(environmentSetup.boundToCoordinatorRecord, true, "Final audit requires source-bound factual setup information");
    assert.deepEqual(observedNode, capabilities.node, "Final audit must use the exact frozen Node version and executable");
    assert.equal(await realpath(process.execPath), capabilities.node.executable, "Node executable must resolve to the frozen executable");
    exactKeys(capabilities.environment, environmentKeys, "frozen environment");
    assert.deepEqual(observedEnvironment, capabilities.environment, "Final audit environment differs from the four frozen environment values");
    exactKeys(runtimeEnvironment, ["schemaVersion", "TMPDIR", "source"], "runtime environment");
    assert.equal(runtimeEnvironment.schemaVersion, 1);
    assert.equal(runtimeEnvironment.TMPDIR, "/var/tmp/storyfolio-freeze-runtime-20261011");
    assert.equal(runtimeEnvironment.source, "Explicit preparation environment; runner digest does not include TMPDIR");
    assert.equal(process.env.TMPDIR, runtimeEnvironment.TMPDIR, "Final audit must retain the separately recorded preparation TMPDIR");
  }

  return { schemaVersion: 1, verified: true, phase: capabilityProof.passed ? "prepared-and-capability-proved" : "prepared-only",
    cohort, caseId: source.id, inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"] ,
    recordedSourceCommit: manifest.recorded.commit, manifestSha256: hash(await regularBytes(inputs, "manifest.json")),
    frozenFiles: Object.keys(manifest.hashes).length, currentSourceMatches: true,
    baselineMetaSha256: hash(await regularBytes(out, "meta.json")), work,
    preScaffold: { initialEntries: 0, fixtureFiles: source.files.length, skillFiles: Object.keys(expectedInitial).length - source.files.length,
      onlyFixtureAndSkill: true, inventorySha256: hash(await regularBytes(out, "setup/pre-scaffold-inventory.json")) },
    scaffold: { sourceBound: true, files: Object.keys(expectedSnapshot).length, snapshotSha256: hash(await regularBytes(out, "setup/snapshot/manifest.json")) },
    currentWorkspace: { files: Object.keys(currentFiles).length, sourceChanges: changes, environmentSetup, excludedGeneratedPaths: current.excluded, unexpected: current.unexpected },
    cli: { executable: capabilities.cliExecutable, recordedVersion: capabilities.cliVersion, sha256: capabilities.cliSha256, matches: true,
      argvMatches: true, disabledSkillEntries: capabilities.disabledSkills.length, disabledSkillsMatch: true },
    launchEnvironment, capabilityProof, noActorOrJudgeArtifacts: true, paidExecutionAuthorized: false,
    modelInvocations: 0, subprocesses: 0, networkRequests: 0, writes: false,
    limits: ["Configuration isolation is not a filesystem read jail.",
      "Generated/excluded trees are listed, not recursively audited or treated as authored source.",
      "Saved capability evidence is coordinator setup, not actor preflight or a five-beat visual result.",
      "No model uptake, output quality, judge context fit or usage cost is established."] };
}

try { console.log(json(await audit())); }
catch (error) { console.log(json({ verified: false, error: error.stack, modelInvocations: 0, subprocesses: 0, networkRequests: 0, writes: false })); process.exitCode = 1; }
