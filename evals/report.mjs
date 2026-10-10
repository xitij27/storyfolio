#!/usr/bin/env node
/*
  Writes evals/runs/<iteration>/report.md: how the runs of an iteration did
  against every criterion, without the skill and with it, and then each
  person's runs one after another, for someone to read.

    node evals/report.mjs --iteration 1
    node evals/report.mjs --iteration 2 --baseline 1

  --baseline names the iteration whose runs without the skill are set beside
  this one's, for an iteration that only made runs with it.
*/
import { readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";

import { CRITERIA, REPORTED_ONLY, criteria, failures, meetsBar, tally } from "./lib/score.mjs";
import { RUNS, loadPerson, readJson } from "./lib/files.mjs";

const { values: args } = parseArgs({
  options: {
    iteration: { type: "string", default: "1" },
    baseline: { type: "string" },
  },
});

const ARMS = { without: "Without the skill", with: "With the skill" };
const here = join(RUNS, args.iteration);

/** The judged runs of an iteration, of one arm or of both. */
async function gather(iteration, arms) {
  const rows = [];
  const dir = join(RUNS, iteration);
  const people = (await readdir(dir, { withFileTypes: true }).catch(() => []))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  for (const personId of people) {
    for (const run of (await readdir(join(dir, personId))).sort()) {
      const runDir = join(dir, personId, run);
      const meta = await readJson(join(runDir, "meta.json")).catch(() => null);
      const file = await readJson(join(runDir, "judgement.json")).catch(() => null);
      if (!meta?.complete || !file || !arms.includes(meta.arm)) continue;
      const person = await loadPerson(personId);
      rows.push({
        runDir,
        meta,
        person,
        arm: meta.arm,
        judge: file.judge,
        judgement: file.judgement,
        criteria: criteria(file.judgement, person, meta),
      });
    }
  }
  return rows;
}

const rows = args.baseline
  ? [...(await gather(args.baseline, ["without"])), ...(await gather(args.iteration, ["with"]))]
  : await gather(args.iteration, ["without", "with"]);
if (rows.length === 0) {
  console.error("no judged runs");
  process.exit(1);
}

const table = tally(rows);
const count = (arm, name) => {
  if (!table[arm]) return "none run";
  const [passed, applied] = table[arm][name];
  return applied === 0 ? "none apply" : `${passed} of ${applied}`;
};
const bar = (arm) => {
  const ofArm = rows.filter((row) => row.arm === arm);
  return ofArm.length === 0
    ? "none run"
    : `${ofArm.filter((row) => meetsBar(row.criteria)).length} of ${ofArm.length}`;
};
const label = Object.fromEntries(CRITERIA);
const link = (row, file) => relative(here, join(row.runDir, file));
const oneLine = (text) => text.replace(/\s+/g, " ").trim();

const lines = [];
lines.push(`# Run ${args.iteration}: what an agent planned, without the skill and with it`, "");
lines.push("Written by `node evals/report.mjs`. Do not edit it: run that again.", "");
lines.push(
  `The agents ran on \`${[...new Set(rows.map((row) => row.meta.model))].join("`, `")}\`,` +
    ` and were judged by \`${[...new Set(rows.map((row) => row.judge))].join("`, `")}\`.`,
  "",
);

lines.push("## Against every criterion", "");
lines.push("| | Without the skill | With the skill |", "|---|---|---|");
for (const [name, words] of CRITERIA) {
  const star = REPORTED_ONLY.includes(name) ? " *" : "";
  lines.push(`| ${words}${star} | ${count("without", name)} | ${count("with", name)} |`);
}
lines.push(`| **Runs that meet the bar** | **${bar("without")}** | **${bar("with")}** |`, "");
lines.push("\\* Reported, and not part of the bar.", "");

const withSkill = rows.filter((row) => row.arm === "with");
if (withSkill.length > 0) {
  lines.push("## Runs made with the skill that miss the bar", "");
  const missing = withSkill.filter((row) => !meetsBar(row.criteria));
  if (missing.length === 0) lines.push("None.", "");
  else {
    lines.push("| Run | Misses |", "|---|---|");
    for (const row of missing) {
      lines.push(
        `| ${row.meta.person}, run ${row.meta.rep} | ${failures(row.criteria)
          .map((name) => label[name])
          .join(". ")} |`,
      );
    }
    lines.push("");
  }
  // A run whose first message named the skill says nothing of whether an
  // agent would have reached for it.
  const unprompted = withSkill.filter((row) => !row.meta.called);
  const reached = unprompted.filter((row) => row.meta.skillUsed);
  const notReached = unprompted.filter((row) => !row.meta.skillUsed);
  lines.push("## Whether the agent reached for the skill", "");
  if (unprompted.length === 0) lines.push("Every run named the skill in its first message.");
  else lines.push(`By itself, in ${reached.length} of ${unprompted.length} runs.`);
  if (notReached.length > 0) {
    lines.push(
      `Not in: ${notReached.map((row) => `${row.meta.person} run ${row.meta.rep}`).join(", ")}.`,
    );
  }
  if (unprompted.length < withSkill.length) {
    lines.push(`${withSkill.length - unprompted.length} more runs named it in their first message.`);
  }
  lines.push("");
}

lines.push("## Person by person", "");
const byPerson = new Map();
for (const row of rows) {
  if (!byPerson.has(row.meta.person)) byPerson.set(row.meta.person, []);
  byPerson.get(row.meta.person).push(row);
}
for (const [personId, runs] of byPerson) {
  lines.push(`### ${runs[0].person.name} (\`${personId}\`)`, "");
  for (const arm of Object.keys(ARMS)) {
    for (const row of runs.filter((run) => run.arm === arm)) {
      const j = row.judgement;
      const traps = j.traps.map((trap) => `${trap.id} ${trap.handled}`).join(", ");
      const invented = j.invented.map((item) => oneLine(item.claim)).join("; ");
      const missed = failures(row.criteria).map((name) => label[name]);
      lines.push(`#### ${ARMS[arm]}, run ${row.meta.rep}`, "");
      lines.push(`> ${oneLine(j.summary)}`, "");
      lines.push(`- **Question:** ${oneLine(j.final.question) || "none"}`);
      lines.push(`- **Form:** ${oneLine(j.final.form) || "none"}`);
      lines.push(
        `- **Object:** ${oneLine(j.final.object) || "none"}` +
          (j.final.object ? ` (in pieces: ${j.final.object_in_pieces ? "yes" : "no"})` : ""),
      );
      lines.push(`- **Concepts offered:** ${j.concepts_offered}`);
      lines.push(`- **Traps, at first:** ${traps || "none listed"}`);
      lines.push(`- **Still wrong at the end:** ${j.final_asserts.join(", ") || "nothing"}`);
      lines.push(`- **Invented:** ${invented || "nothing"}`);
      lines.push(`- **Misses the bar on:** ${missed.join(". ") || "nothing"}`);
      lines.push(
        `- Read it: [first reply](${link(row, "turn1.md")}), ` +
          `[second](${link(row, "turn2.md")}), [last](${link(row, "turn3.md")})`,
        "",
      );
    }
  }
}

await writeFile(join(here, "report.md"), lines.join("\n"));
console.error(`wrote ${relative(process.cwd(), join(here, "report.md"))}`);
