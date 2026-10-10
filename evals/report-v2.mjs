#!/usr/bin/env node
import { join, relative } from "node:path";
import { parseArgs } from "node:util";
import { RUNS, readJson } from "./lib/files.mjs";
import { criteria as oldCriteria, meetsBar as oldBar, failures as oldFailures } from "./lib/score.mjs";
import { CRITERIA, criteria, failures, meetsBar } from "./lib/score-v2.mjs";
import { readSavedJudgement, verifyCohort, writeNew } from "./lib/measurement-v2.mjs";

const { values: args } = parseArgs({ options: { output: { type: "string" } } });
if (!args.output || !/^[\w-]+$/.test(args.output)) throw new Error("Supply --output v2-cohort");
const dir = join(RUNS, args.output);
const manifest = await verifyCohort(dir);
const rows = [];
for (const id of manifest.sources) {
  const caseDir = join(dir, "cases", id);
  const meta = await readJson(join(caseDir, "source-meta.json"));
  const person = await readJson(join(caseDir, "person.json"));
  const original = await readJson(join(caseDir, "original-judgement.json"));
  const saved = await readSavedJudgement(caseDir, id, person);
  if (saved === undefined) throw new Error(`${id}: not judged yet`);
  rows.push({ id, caseDir, judgement: saved.judgement,
    before: oldCriteria(original.judgement, person, meta), after: criteria(saved.judgement, person, meta) });
}
const label = Object.fromEntries(CRITERIA);
const words = names => names.map(name => label[name]).join("; ") || "none";
const line = value => value.replace(/\s+/g, " ").replaceAll("|", "\\|").trim();
const lines = [
  `# Rubric v2 calibration: ${args.output}`, "",
  "These are fresh judgements of selected saved conversations, not new portfolio conversations or a skill success-rate comparison. Original judgements and reports remain unchanged. All source and frozen-input hashes verified.", "",
  `Judge: \`${manifest.model}\`, ${manifest.reasoningEffort} reasoning.`, "",
  "V2 records discovery and assertion independently. Both are in its full bar, so asking about a fact cannot cancel asserting the wrong reading. Silent avoidance remains a discovery miss. Closing meaning can be specified before final copy; an accessible equivalent does not make an explanatory scene decorative.", "",
  "| Saved run | Original v1 bar | V2 bar | V2 misses |", "|---|---|---|---|",
];
for (const row of rows) lines.push(`| ${row.id} | ${oldBar(row.before) ? "pass" : "fail"} | ${meetsBar(row.after) ? "pass" : "fail"} | ${words(failures(row.after))} |`);
lines.push("", "## Evidence by saved run", "");
for (const row of rows) {
  const changes = CRITERIA.filter(([name]) => row.before[name] !== row.after[name]).map(([name]) => `${label[name]}: ${row.before[name]} to ${row.after[name]}`);
  lines.push(`### ${row.id}`, "", line(row.judgement.summary), "",
    `Original v1 misses: ${words(oldFailures(row.before))}.`, "",
    `Changed criterion outcomes: ${changes.join("; ") || "none"}. Different rubric and a fresh judge, not evidence of changed agent behaviour.`, "",
    "| Trap in first reply | Raised or excluded | Asserted | Discovery evidence | Assertion evidence |", "|---|---|---|---|---|");
  for (const trap of row.judgement.traps) lines.push(`| ${trap.id} | ${trap.raised_or_excluded} | ${trap.asserted} | ${line(trap.raised_evidence)} | ${line(trap.asserted_evidence)} |`);
  lines.push("", `Closing question verdict: ${row.judgement.final.is_question}. Question: ${line(row.judgement.final.question) || "none"}.`, "",
    `Backdrop: ${row.judgement.tests.backdrop.result}. ${line(row.judgement.tests.backdrop.reason)}`, "",
    `[Original conversation](${relative(dir, join(RUNS, row.id, "turn1.md"))}), [v2 prompt](${relative(dir, join(row.caseDir, "judge-prompt.md"))}), [v2 judgement](${relative(dir, join(row.caseDir, "judgement.json"))}).`, "");
}
await writeNew(join(dir, "report.md"), lines.join("\n"));
console.log(`Wrote ${join(dir, "report.md")}; existing reports are never overwritten`);
