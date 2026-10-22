#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, realpath } from "node:fs/promises";
import { delimiter, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { EFFORT, MODEL, disabledSkills } from "./lib/codex.mjs";
import { ROOT, RUNS, WORK } from "./lib/files.mjs";
import { buildCodexArgs, buildTaskIdentity, captureBuildWorkspace, executeBuildTurn, hash, inspectBuildInputs, json, populateBuildWorkspace, prepareBuildInputs, regularBytes, safeId, safePath, verifyBuildSetupProbe, verifyInputs, writeNew } from "./lib/build.mjs";

const usage = "Usage: node evals/codex-build-run.mjs --case <case.json> --cohort <id> --capabilities <json> --prepare\n       node evals/codex-build-run.mjs <same arguments> --turn <1..N> [--gate <json>] [--lift-reported-cap docs/history/<decision>.md]\n\nPreparation freezes inputs and copies the declared fixture. Default setupMode scaffolds; existing-site skips scaffolding. Schema-3 full-journey requires unscaffolded setup, copying only material, assets and installed skill. Save setup/probe.json before turn 1; full-journey needs neutral environment evidence, not a prebuilt site or completed actor preflight.\nOne invocation executes one actor turn: legacy requestedStops, the one-turn prototype-depth diagnostic, or a full-journey stop 1..6. Every later turn requires a coordinator gate; full-journey also requires exact live/prior-snapshot source equality. No automatic advancement or retry.";
const { values: args } = parseArgs({ options: {
  case: { type: "string" }, cohort: { type: "string" }, capabilities: { type: "string" },
  rep: { type: "string", default: "1" }, prepare: { type: "boolean", default: false },
  dry: { type: "boolean", default: false }, turn: { type: "string" }, gate: { type: "string" }, "lift-reported-cap": { type: "string" },
  help: { type: "boolean", default: false },
} });
if (args.help) { console.log(usage); process.exit(0); }
for (const key of ["case", "capabilities"]) safePath(args[key]);
safeId(args.cohort);
if (!/^[1-9]\d*$/.test(args.rep) || !Number.isSafeInteger(Number(args.rep))) throw new Error("--rep must be a positive safe integer");
if ([args.prepare, args.dry, Boolean(args.turn)].filter(Boolean).length !== 1) throw new Error("Choose exactly one of --prepare, --dry or --turn");
if (args.turn && (!/^[1-9]\d*$/.test(args.turn) || !Number.isSafeInteger(Number(args.turn)))) throw new Error("--turn must be a positive safe integer");
if (args.gate && !args.turn) throw new Error("--gate is only used with --turn");
if (args["lift-reported-cap"] && (!args.turn || !/^docs\/history\/[^/]+\.md$/.test(args["lift-reported-cap"]))) throw new Error("--lift-reported-cap names the author's decision record in docs/history/ and is only used with --turn");

const requested = JSON.parse(await regularBytes(ROOT, args.capabilities));
if (requested.schemaVersion !== 1) throw new Error("Expected capabilities schemaVersion 1");
const disabled = await disabledSkills();
let cliExecutable;
for (const path of (process.env.PATH ?? "").split(delimiter)) {
  try { cliExecutable = await realpath(join(path, "codex")); break; } catch {}
}
if (!cliExecutable) throw new Error("codex executable not found");
const cliVersion = execFileSync("codex", ["--version"], { encoding: "utf8" }).trim();
const capabilities = {
  ...requested, runner: "codex-build", model: requested.model ?? MODEL, reasoningEffort: EFFORT,
  cliVersion, cliExecutable, cliSha256: hash(await readFile(cliExecutable)),
  node: { version: process.version, executable: process.execPath },
  environment: Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG"].map(key => [key, process.env[key] ?? null])),
  disabledSkills: disabled,
  measurementLimits: "Configuration isolation is not a filesystem barrier. Source snapshots exclude generated trees. Total and optional uncached-input-plus-output token ceilings are checked between actor turns and cannot cap a single in-flight turn. Uncached accounting requires a reliable cached-input subset. Shell and skill-read attribution require inspection of raw events.",
};
capabilities.argv = buildCodexArgs({ model: capabilities.model, disabled, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig });
const options = { root: ROOT, runs: RUNS, casePath: args.case, cohort: args.cohort, capabilities };
if (args.dry) {
  const inspected = await inspectBuildInputs(options);
  console.log(json({ caseId: inspected.source.id, setupMode: inspected.source.setupMode, ...buildTaskIdentity(inspected.source), refusalTurns: inspected.source.refusalTurns, frozenFiles: Object.keys(inspected.hashes).length, digest: inspected.digest, bounds: inspected.source.bounds, capabilities, writes: false, modelCalls: false }));
  process.exit(0);
}
const git = (...flags) => execFileSync("git", ["-C", ROOT, ...flags], { encoding: "utf8" }).trim();
options.recorded = { commit: git("rev-parse", "HEAD"), sourceStatus: git("status", "--porcelain", "--", "skills/storyfolio", args.case, args.capabilities) };
const prepared = await prepareBuildInputs(options);
const { inputs, manifest, source } = prepared;
const out = join(RUNS, args.cohort, source.id, `baseline-${args.rep}`);
const identity = { runner: "codex-build", caseId: source.id, cohort: args.cohort, rep: Number(args.rep), inputDigest: manifest.digest, ...(source.taskKind ? { taskKind: source.taskKind } : {}) };

if (args.prepare) {
  await mkdir(join(RUNS, args.cohort, source.id), { recursive: true });
  try { await mkdir(out); }
  catch (error) {
    if (error.code !== "EEXIST") throw error;
    const meta = JSON.parse(await regularBytes(out, "meta.json"));
    for (const [key, value] of Object.entries(identity)) if (meta[key] !== value) throw new Error(`Prepared run identity differs: ${key}`);
    const setup = JSON.parse(await regularBytes(out, "setup/result.json"));
    if (!setup.complete) throw new Error("Failed preparation preserved; use a new repetition");
    console.log(`Already prepared: ${out}\nWorkspace: ${meta.work}\nNo writes or model calls.`);
    process.exit(0);
  }
  await mkdir(WORK, { recursive: true });
  const work = await mkdtemp(join(WORK, `build-${source.id}-`));
  await writeNew(join(out, "meta.json"), json({ ...identity, preparedAt: new Date().toISOString(), inputs, work, model: capabilities.model, reasoningEffort: EFFORT, setupMode: source.setupMode, ...buildTaskIdentity(source), refusalTurns: source.refusalTurns, bounds: source.bounds }));
  await writeNew(join(out, "setup/started.json"), json({ started: new Date().toISOString(), work, inputDigest: manifest.digest, paid: false }));
  const setup = { complete: false, setupMode: source.setupMode, modelCalls: 0, networkCalls: 0 };
  try {
    setup.scaffold = await populateBuildWorkspace(inputs, work, { beforeScaffold: inventory => writeNew(join(out, "setup/pre-scaffold-inventory.json"), json(inventory)) });
    setup.snapshot = await captureBuildWorkspace(work, join(out, "setup/snapshot"), source.snapshot);
    setup.complete = true;
  } catch (error) { setup.error = String(error); }
  await writeNew(join(out, "setup/result.json"), json(setup));
  const next = source.setupMode === "unscaffolded"
    ? `Workspace: ${work}\nOnly declared material, supplied assets and the installed skill are present. No root application has been scaffolded; actor preflight has not occurred.\nRecord neutral environment availability outside this workspace beneath ${out}/setup/. Do not install a root app, build a starter or add unlisted capability facts to the frozen actor inputs before turn 1.\nSave setup/probe.json with schemaVersion: 1, passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, inputDigest: ${manifest.digest}, capabilitySha256: ${manifest.hashes["capabilities.json"]}, work: ${work}, evidence: [relative proof paths including "snapshot/manifest.json"], and evidenceHashes: {path: {sha256, bytes}} for exactly that evidence.\nThe initial snapshot must bind only frozen material, assets and skill. First-turn source must still equal it; later turns must equal the preceding saved actor snapshot and have an observed coordinator gate.\nEnvironment readiness does not replace actor preflight, optional-skill choices or genuine author approval.\n`
    : `Workspace: ${work}\nRun dependency installation and capability probes explicitly, saving their commands, logs and results beneath ${out}/setup/.\nBefore turn 1 save setup/probe.json with schemaVersion: 1, passed: true, inputDigest: ${manifest.digest}, capabilitySha256: ${manifest.hashes["capabilities.json"]}, work: ${work}, and evidence: [relative log paths].\nSuggested commands in the workspace: npm ci; npm run typecheck; npm run lint; npm run build; npm run check.\nDo not claim a phone review from a simulated prompt.\n`;
  await writeNew(join(out, "setup/next-steps.txt"), next);
  console.log(`${setup.complete ? "Prepared" : "Preparation failed and preserved"}: ${out}\n${next}No model calls made.`);
  process.exit(setup.complete ? 0 : 1);
}

const meta = JSON.parse(await regularBytes(out, "meta.json"));
for (const [key, value] of Object.entries(identity)) if (meta[key] !== value) throw new Error(`Run identity differs: ${key}`);
const setup = JSON.parse(await regularBytes(out, "setup/result.json"));
if (!setup.complete) throw new Error("Preparation failed; use a new repetition");
await verifyBuildSetupProbe({ source, manifest, setup: join(out, "setup"), work: meta.work });
const gate = args.gate ? JSON.parse(await readFile(resolve(args.gate), "utf8")) : null;
await verifyInputs(inputs);
if (args["lift-reported-cap"]) await regularBytes(ROOT, args["lift-reported-cap"]);
const result = await executeBuildTurn({ out, work: meta.work, inputs, source, capabilities, turn: Number(args.turn), gate, liftReportedCap: Boolean(args["lift-reported-cap"]) });
console.log(json({ complete: result.complete, turn: result.turn, ...buildTaskIdentity(source, result.turn), sessionId: result.sessionId, durationMs: result.durationMs, usage: result.usage, result: join(result.location, "result.json"), error: result.error ?? result.captureError ?? null }));
process.exit(result.complete ? 0 : 1);
