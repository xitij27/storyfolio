#!/usr/bin/env node
import { mkdir, mkdtemp, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { MODEL, EFFORT, disabledSkills, invokeCodex, summariseCodex } from "./lib/codex.mjs";
import { JUDGEMENT_SCHEMA } from "./lib/score.mjs";
import { PEOPLE, PROMPTS, RUNS, WORK, loadPerson, read, readJson, walk } from "./lib/files.mjs";

const { values: args } = parseArgs({ options: {
  iteration: { type: "string", default: "codex-1" }, model: { type: "string", default: MODEL },
} });
if (!/^[\w-]+$/.test(args.iteration)) throw new Error("Invalid iteration");
const fenced = value => `~~~~\n${value.trim()}\n~~~~`;
const scrub = value => value.replace(/storyfolio/gi, "the method");
async function brief(dir, meta, person) {
  const material = [];
  for (const path of await walk(join(PEOPLE, person.material, "material"))) {
    const name = `material/${path}`;
    material.push(`## ${name}\n\n` + (person.privateFiles.includes(name) ? "(A private file. The agent was not meant to read it, and it is not shown to you.)" : fenced(await read(join(PEOPLE, person.material, name)))));
  }
  const conversation = [];
  for (let i = 0; i < meta.said.length; i++) {
    const ordinal = ["first", "second", "third"][i];
    conversation.push(`## The person's ${ordinal} message\n\n${fenced(meta.said[i])}`, `## The agent's ${ordinal} reply\n\n${fenced(scrub(await read(join(dir, `turn${i + 1}.md`))))}`);
  }
  const files = [];
  for (const path of meta.written) files.push(`## ${path}\n\n${fenced(scrub(await read(join(dir, "files", path))))}`);
  const parts = {
    material: material.join("\n\n"), truth: person.truthText,
    traps: person.traps.map(t => `- \`${t.id}\`\n  - The wrong reading: ${t.wrong}\n  - What is true: ${t.truth}`).join("\n"),
    expect: person.expect ?? "Nothing beyond what follows from the above.",
    conversation: conversation.join("\n\n"), files: files.join("\n\n") || "The agent wrote no files.",
    example: person.exampleConcept ? `True if the concept the agent settled on is this one with little changed, and false otherwise: ${person.exampleConcept}` : "No example applies to this person. Answer false.",
  };
  let text = await read(join(PROMPTS, "judge.md"));
  for (const [key, value] of Object.entries(parts)) text = text.replace(`{{${key}}}`, () => value);
  return text;
}

const waiting = [];
const base = join(RUNS, args.iteration);
for (const entry of await readdir(base, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "attempts") continue;
  for (const run of await readdir(join(base, entry.name))) {
    const dir = join(base, entry.name, run);
    const meta = await readJson(join(dir, "meta.json")).catch(() => null);
    if (!meta?.complete) continue;
    if (meta.runner !== "codex") throw new Error("Refusing to mix runners");
    if (!(await readJson(join(dir, "judgement.json")).catch(() => null))) waiting.push({ dir, meta });
  }
}
console.error(`${waiting.length} to judge`);
await mkdir(WORK, { recursive: true });
const disabled = await disabledSkills();
let failed = false;
async function worker() {
  while (!failed && waiting.length) {
    const { dir, meta } = waiting.shift();
    const cwd = await mkdtemp(join(WORK, "codex-judge-"));
    const schema = join(cwd, "schema.json");
    await writeFile(schema, JSON.stringify(JUDGEMENT_SCHEMA));
    const prompt = await brief(dir, meta, await loadPerson(meta.person));
    await writeFile(join(dir, "judge-prompt.md"), prompt);
    const result = await invokeCodex({ cwd, prompt, model: args.model, judge: true, schema, disabled });
    await writeFile(join(dir, "judge.jsonl"), result.stdout);
    const turn = summariseCodex(result.stdout, result.code);
    try {
      if (turn.failed) throw new Error(JSON.stringify(turn.error));
      const judgement = JSON.parse(turn.reply);
      for (const key of JUDGEMENT_SCHEMA.required) if (!(key in judgement)) throw new Error(`Missing judgement field: ${key}`);
      await writeFile(join(dir, "judgement.json"), JSON.stringify({ judge: args.model, runner: "codex", reasoningEffort: EFFORT, costUsd: null, usage: turn.usage, judgement }, null, 2) + "\n");
      console.error(`${meta.person}-${meta.arm}-${meta.rep}: judged`);
    } catch (error) {
      await writeFile(join(dir, "judgement.err"), `${error}\n${result.stderr}`);
      failed = true;
      console.error(`${meta.person}-${meta.arm}-${meta.rep}: NOT JUDGED`);
    }
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
console.error(failed ? "stopped after a judging failure" : "all judged");
process.exit(failed ? 1 : 0);
