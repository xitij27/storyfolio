#!/usr/bin/env node
import { spawn } from "node:child_process";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { ROOT, RUNS, peopleIds, readJson } from "./lib/files.mjs";
import { MODEL } from "./lib/codex.mjs";
const { values: args } = parseArgs({ options: {
  iteration: { type: "string", default: "codex-sol-1" }, arm: { type: "string" },
  reps: { type: "string", default: "2" }, people: { type: "string" },
  model: { type: "string", default: MODEL }, jobs: { type: "string", default: "3" },
} });
if (!["with", "without"].includes(args.arm) || !/^[\w-]+$/.test(args.iteration) || !/^[1-9]\d*$/.test(args.reps) || !/^[1-3]$/.test(args.jobs)) throw new Error("Supply --arm with|without, positive reps and 1 to 3 jobs");
const ids = await peopleIds();
const people = args.people ? args.people.split(",") : ids;
if (people.some(id => !ids.includes(id))) throw new Error("Unknown person");
const waiting = [];
for (const person of people) for (let rep = 1; rep <= Number(args.reps); rep++) {
  const meta = await readJson(join(RUNS, args.iteration, person, `${args.arm}-${rep}`, "meta.json")).catch(() => null);
  if (meta?.complete && (meta.runner !== "codex" || meta.model !== args.model)) throw new Error("Existing run has different runner/model");
  if (!meta?.complete) waiting.push({ person, rep });
}
console.error(`${waiting.length} to run`);
let failed = false;
async function worker() {
  while (!failed && waiting.length) {
    const { person, rep } = waiting.shift();
    const code = await new Promise(resolve => {
      const child = spawn("node", [join(ROOT, "evals/codex-run.mjs"), "--iteration", args.iteration, "--arm", args.arm, "--rep", String(rep), "--person", person, "--model", args.model], { stdio: "inherit" });
      child.on("error", () => resolve(1)); child.on("close", resolve);
    });
    if (code !== 0) failed = true;
  }
}
await Promise.all(Array.from({ length: Number(args.jobs) }, worker));
console.error(failed ? "stopped after a failure; completed runs are preserved" : "all complete");
process.exit(failed ? 1 : 0);
