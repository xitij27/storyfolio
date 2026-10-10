#!/usr/bin/env node
/*
  Has another fresh agent judge every run of an iteration that has not been
  judged yet. The judge is given what the person handed over, what is true
  of them, the conversation, and what the agent wrote. It is not told
  whether the agent had the skill, and the skill's name is taken out of what
  it reads.

    node evals/judge.mjs --iteration 1
    node evals/judge.mjs --iteration 1 --dry     prints the first brief and judges nothing

  The judge has no tools. Its answer comes back in the shape of
  JUDGEMENT_SCHEMA, in lib/score.mjs.
*/
import { spawn } from "node:child_process";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";

import { JUDGEMENT_SCHEMA } from "./lib/score.mjs";
import { PEOPLE, PROMPTS, ROOT, RUNS, SKILL, WORK, loadPerson, read, readJson, walk } from "./lib/files.mjs";

const AT_ONCE = 3;
const LIMIT_MS = 15 * 60 * 1000;
const ORDINALS = ["first", "second", "third"];

const { values: args } = parseArgs({
  options: {
    iteration: { type: "string", default: "1" },
    model: { type: "string", default: "opus" },
    dry: { type: "boolean", default: false },
  },
});

/** A block of text set off so that nothing in it can be taken for the brief's own words. */
const fenced = (text) => `~~~~\n${text.trim()}\n~~~~`;

/** The skill's name, taken out: the judge is not to know which runs had it. */
const scrub = (text) => text.replace(new RegExp(SKILL, "gi"), "the method");

/** The brief for one run. */
async function brief(runDir, meta, person) {
  const materialDir = join(PEOPLE, person.material, "material");
  const material = [];
  for (const path of await walk(materialDir)) {
    const shown = `material/${path}`;
    material.push(
      person.privateFiles.includes(shown)
        ? `## ${shown}\n\n(A private file. The agent was not meant to read it, and it is not shown to you.)`
        : `## ${shown}\n\n${fenced(await read(join(materialDir, path)))}`,
    );
  }
  const traps = person.traps
    .map((trap) => `- \`${trap.id}\`\n  - The wrong reading: ${trap.wrong}\n  - What is true: ${trap.truth}`)
    .join("\n");
  const conversation = [];
  for (let i = 0; i < meta.said.length; i++) {
    conversation.push(
      `## The person's ${ORDINALS[i]} message\n\n${fenced(meta.said[i])}`,
      `## The agent's ${ORDINALS[i]} reply\n\n${fenced(scrub(await read(join(runDir, `turn${i + 1}.md`))))}`,
    );
  }
  const files = [];
  for (const path of meta.written) {
    files.push(`## ${path}\n\n${fenced(scrub(await read(join(runDir, "files", path))))}`);
  }
  const example = person.exampleConcept
    ? `True if the concept the agent settled on is this one with little changed, and false otherwise: ${person.exampleConcept}`
    : "No example applies to this person. Answer false.";
  const parts = {
    material: material.join("\n\n"),
    truth: person.truthText,
    traps,
    expect: person.expect ?? "Nothing beyond what follows from the above.",
    conversation: conversation.join("\n\n"),
    files: files.length ? files.join("\n\n") : "The agent wrote no files.",
    example,
  };
  let text = await read(join(PROMPTS, "judge.md"));
  for (const [name, value] of Object.entries(parts)) {
    // A function, so that a "$" in what the agent wrote is not read as a pattern.
    text = text.replace(`{{${name}}}`, () => value);
  }
  return text;
}

/** Puts a brief to the judge and gives back its answer, or null with why not. */
function ask(text, cwd) {
  const flags = [
    "-p",
    "--setting-sources",
    "project",
    "--strict-mcp-config",
    "--tools",
    "",
    "--model",
    args.model,
    "--output-format",
    "json",
    "--json-schema",
    JSON.stringify(JUDGEMENT_SCHEMA),
  ];
  return new Promise((resolve) => {
    const child = spawn("claude", flags, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill("SIGTERM"), LIMIT_MS);
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (error) => resolve({ judgement: null, why: String(error) }));
    child.on("close", (code) => {
      clearTimeout(timer);
      try {
        const answer = JSON.parse(stdout);
        if (answer.is_error || !answer.structured_output) throw new Error("no structured answer");
        resolve({ judgement: answer.structured_output, why: "" });
      } catch (error) {
        resolve({ judgement: null, why: `exit ${code}: ${error.message}\n${stderr}\n${stdout.slice(0, 2000)}` });
      }
    });
    child.stdin.end(text);
  });
}

// Every complete run of the iteration that has no judgement yet.
const waiting = [];
const iterationDir = join(RUNS, args.iteration);
for (const personId of (await readdir(iterationDir, { withFileTypes: true }).catch(() => []))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()) {
  for (const run of (await readdir(join(iterationDir, personId))).sort()) {
    const runDir = join(iterationDir, personId, run);
    const meta = await readJson(join(runDir, "meta.json")).catch(() => null);
    if (!meta?.complete) continue;
    const judged = await readJson(join(runDir, "judgement.json")).then(
      () => true,
      () => false,
    );
    if (!judged) waiting.push({ runDir, meta });
  }
}

if (args.dry) {
  if (waiting.length === 0) {
    console.error("nothing to judge");
    process.exit(1);
  }
  const { runDir, meta } = waiting[0];
  process.stdout.write(await brief(runDir, meta, await loadPerson(meta.person)));
  process.exit(0);
}

console.error(`${waiting.length} to judge`);
const judgeDir = join(WORK, "judge");
await mkdir(judgeDir, { recursive: true });
let failed = 0;
async function worker() {
  for (let job = waiting.shift(); job; job = waiting.shift()) {
    const { runDir, meta } = job;
    const person = await loadPerson(meta.person);
    const { judgement, why } = await ask(await brief(runDir, meta, person), judgeDir);
    const where = relative(ROOT, runDir);
    if (judgement === null) {
      failed += 1;
      await writeFile(join(runDir, "judgement.err"), why);
      console.error(`${where}: NOT JUDGED`);
      continue;
    }
    await writeFile(
      join(runDir, "judgement.json"),
      JSON.stringify({ judge: args.model, judgement }, null, 2) + "\n",
    );
    console.error(`${where}: judged`);
  }
}
await Promise.all(Array.from({ length: AT_ONCE }, worker));
console.error(failed ? `${failed} not judged` : "all judged");
process.exit(failed ? 1 : 0);
