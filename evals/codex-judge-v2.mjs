#!/usr/bin/env node
import { mkdir, mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { JUDGE_MODEL, EFFORT, disabledSkills, invokeCodex, summariseCodex } from "./lib/codex.mjs";
import { WORK, readJson } from "./lib/files.mjs";
import { RUBRIC_VERSION, validateJudgement } from "./lib/score-v2.mjs";
import { cohortPath, inspectSources, json, prepareCohort, readSavedJudgement, sourceIds, verifyCohort, writeNew } from "./lib/measurement-v2.mjs";

const { values: args } = parseArgs({ options: {
  runs: { type: "string" }, output: { type: "string" },
  dry: { type: "boolean", default: false }, prepare: { type: "boolean", default: false },
  jobs: { type: "string", default: "2" },
} });
const ids = sourceIds(args.runs);
const dir = cohortPath(args.output, ids);
if (!["1", "2"].includes(args.jobs)) throw new Error("--jobs must be 1 or 2");
if (args.dry) {
  for (const row of await inspectSources(ids)) console.log(`${row.id}: ${Buffer.byteLength(row.prompt)} prompt bytes; ${Object.keys(row.hashes).length} original files to preserve`);
  console.log(`Output: ${dir}; judge: ${JUDGE_MODEL} ${EFFORT}; no writes or model calls`);
  process.exit(0);
}
await prepareCohort(args.output, ids);
if (args.prepare) {
  console.log(`Prepared ${ids.length} saved conversations in ${dir}; no model calls`);
  process.exit(0);
}
const waiting = [];
for (const id of ids) {
  const caseDir = join(dir, "cases", id);
  const person = await readJson(join(caseDir, "person.json"));
  const saved = await readSavedJudgement(caseDir, id, person);
  if (saved === undefined) waiting.push({ id, caseDir, person });
}
console.error(`${waiting.length} saved conversations to judge under rubric v2`);
if (!waiting.length) process.exit(0);
await mkdir(WORK, { recursive: true });
const disabled = await disabledSkills();
let failed = false;
async function worker() {
  while (!failed && waiting.length) {
    const { id, caseDir, person } = waiting.shift();
    await mkdir(join(caseDir, "attempts"), { recursive: true });
    const attempt = await mkdtemp(join(caseDir, "attempts", "judge-"));
    const cwd = await mkdtemp(join(WORK, "codex-judge-v2-"));
    const prompt = await readFile(join(caseDir, "judge-prompt.md"), "utf8");
    const result = await invokeCodex({ cwd, prompt, model: JUDGE_MODEL, judge: true,
      schema: join(dir, "schema.json"), disabled, streamPath: join(attempt, "judge.jsonl") });
    await writeNew(join(attempt, "process.json"), json({ code: result.code, stderr: result.stderr, durationMs: result.durationMs }));
    const turn = summariseCodex(result.stdout, result.code);
    try {
      if (turn.failed) throw new Error(JSON.stringify(turn.error));
      const judgement = validateJudgement(JSON.parse(turn.reply), person);
      await writeNew(join(caseDir, "judgement.json"), json({
        rubricVersion: RUBRIC_VERSION, source: id, judge: JUDGE_MODEL, runner: "codex",
        reasoningEffort: EFFORT, costUsd: null, usage: turn.usage, judgement,
      }));
      console.error(`${id}: judged under v2`);
    } catch (error) {
      await writeNew(join(attempt, "judgement.err"), `${error}\n${result.stderr}`);
      failed = true;
      console.error(`${id}: NOT JUDGED; attempt retained`);
    }
  }
}
await Promise.all(Array.from({ length: Number(args.jobs) }, worker));
await verifyCohort(dir);
console.error(failed ? "Stopped after a judging failure" : "All v2 judgements complete; originals unchanged");
process.exit(failed ? 1 : 0);
