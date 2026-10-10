#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { MODEL, EFFORT, codexArgs, disabledSkills, invokeCodex, summariseCodex } from "./lib/codex.mjs";
import { ROOT, RUNS, WORK } from "./lib/files.mjs";
import { artifactHashes, captureWorkspace, existingRun, inspectInputs, json, populateWorkspace, prepareInputs, reviewPrompt, safeId, safePath, verifyInputs, writeNew } from "./lib/review.mjs";

const { values: args } = parseArgs({ options: {
  case: { type: "string" }, cohort: { type: "string" },
  invocation: { type: "string", default: "natural" }, rep: { type: "string", default: "1" },
  prepare: { type: "boolean", default: false }, dry: { type: "boolean", default: false },
} });
safePath(args.case); safeId(args.cohort); reviewPrompt("", args.invocation);
if (!/^[1-9]\d*$/.test(args.rep) || !Number.isSafeInteger(Number(args.rep))) throw new Error("--rep must be a positive safe integer");
if (args.prepare && args.dry) throw new Error("Choose --prepare or --dry, not both");
const disabled = await disabledSkills();
const cliVersion = execFileSync("codex", ["--version"], { encoding: "utf8" }).trim();
const capabilities = { runner: "codex-review", model: MODEL, reasoningEffort: EFFORT, cliVersion,
  argv: codexArgs({ model: MODEL, disabled }), disabledSkills: disabled,
  scope: "Single-turn source/content review; network, web and browser tools disabled. Shell read measurement is heuristic, not an enforced file allowlist." };
const options = { root: ROOT, runs: RUNS, casePath: args.case, cohort: args.cohort, capabilities };
if (args.dry) {
  const inspected = await inspectInputs(options);
  console.log(`${inspected.source.id}: ${inspected.source.files.length} public files; ${Object.keys(inspected.hashes).length} frozen files; ${MODEL} ${EFFORT}`);
  console.log(`Output: evals/runs/${args.cohort}; invocation: ${args.invocation}; no writes or model calls`);
  process.exit(0);
}
const git = (...flags) => execFileSync("git", ["-C", ROOT, ...flags], { encoding: "utf8" }).trim();
options.recorded = { commit: git("rev-parse", "HEAD"),
  skillUncommitted: git("status", "--porcelain", "--", "skills/storyfolio") !== "" };
const { inputs, manifest, source } = await prepareInputs(options);
if (args.prepare) {
  console.log(`Prepared ${source.id} at ${inputs}; digest ${manifest.digest}; no model calls`);
  process.exit(0);
}
const out = join(RUNS, args.cohort, source.id, `${args.invocation}-${args.rep}`);
const identity = { runner: "codex-review", caseId: source.id, cohort: args.cohort,
  invocation: args.invocation, rep: Number(args.rep), inputDigest: manifest.digest, model: MODEL };
if (await existingRun(out, identity)) { console.log(`Already complete and verified: ${out}`); process.exit(0); }
await mkdir(join(RUNS, args.cohort, source.id), { recursive: true });
await mkdir(out);
await mkdir(WORK, { recursive: true });
const work = await mkdtemp(join(WORK, `review-${source.id}-`));
const prompt = reviewPrompt(source.request, args.invocation);
const meta = { ...identity, complete: false, called: false, work, reasoningEffort: EFFORT,
  cliVersion, inputs, prompt, costUsd: null, materialChanges: [], skillUsed: false };
const save = () => writeFile(join(out, "meta.json"), json(meta));
await save();
await writeNew(join(out, "request.md"), prompt);
const baseline = await populateWorkspace(inputs, work);
try {
  await verifyInputs(inputs);
  meta.called = true;
  await save();
  console.error(`${source.id}: one ${args.invocation} review on ${MODEL} ${EFFORT}`);
  const result = await invokeCodex({ cwd: work, prompt, model: MODEL, disabled, streamPath: join(out, "turn1.jsonl") });
  await writeNew(join(out, "process.json"), json({ code: result.code, stderr: result.stderr, durationMs: result.durationMs, args: result.args }));
  const turn = summariseCodex(result.stdout, result.code);
  await writeNew(join(out, "turn1.md"), turn.reply + "\n");
  meta.turn = { ...turn, durationMs: result.durationMs };
  meta.skillReadEvidence = turn.commands.filter(command => command.exitCode === 0 && /(?:cat|sed|head|tail|read|python|node|rg)\b/.test(command.command) && command.command.includes("storyfolio") && command.command.includes("SKILL.md"));
  meta.skillUsed = meta.skillReadEvidence.length > 0;
  meta.skillReadMeasurement = "Shell-command heuristic; inspect raw commands before assessing discovery.";
  meta.complete = !turn.failed && Boolean(turn.sessionId);
} catch (error) {
  meta.complete = false;
  meta.error = String(error);
} finally {
  try {
    const changes = await captureWorkspace(work, out, baseline);
    meta.materialChanges = changes.filter(change => change.path.startsWith("material/"));
    meta.workspaceChanges = changes;
    await verifyInputs(inputs);
    meta.outputHashes = await artifactHashes(out);
  } catch (error) { meta.complete = false; meta.captureError = String(error); }
  await save();
}
console.error(`${source.id}: ${meta.complete ? "complete" : "FAILED, preserved"}; ${meta.materialChanges.length} material changes; ${out}`);
process.exit(meta.complete ? 0 : 1);
