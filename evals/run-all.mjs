#!/usr/bin/env node
/*
  Every run of an iteration that is not there yet, three at a time.

    node evals/run-all.mjs --iteration 1 --arm without --reps 2
    node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people chef,student
    node evals/run-all.mjs --iteration called --arm with --reps 1 --call

  A run that is already complete is left alone, so this can be started again
  after a stop.
*/
import { spawn } from "node:child_process";
import { join } from "node:path";
import { parseArgs } from "node:util";

import { ROOT, RUNS, peopleIds, readJson } from "./lib/files.mjs";

const AT_ONCE = 3;

const { values: args } = parseArgs({
  options: {
    iteration: { type: "string", default: "1" },
    arm: { type: "string" },
    reps: { type: "string", default: "2" },
    people: { type: "string" },
    model: { type: "string", default: "sonnet" },
    call: { type: "boolean", default: false },
  },
});
if (!["with", "without"].includes(args.arm ?? "")) {
  console.error(
    "usage: node evals/run-all.mjs --arm with|without [--iteration 1] [--reps 2] [--people a,b] [--model sonnet] [--call]",
  );
  process.exit(2);
}

const people = args.people ? args.people.split(",") : await peopleIds();
const waiting = [];
for (const person of people) {
  for (let rep = 1; rep <= Number(args.reps); rep++) {
    const meta = join(RUNS, args.iteration, person, `${args.arm}-${rep}`, "meta.json");
    const done = await readJson(meta).then(
      (found) => found.complete === true,
      () => false,
    );
    if (!done) waiting.push({ person, rep });
  }
}
console.error(`${waiting.length} to run`);

let failed = 0;
async function worker() {
  for (let job = waiting.shift(); job; job = waiting.shift()) {
    const code = await new Promise((resolve) => {
      const child = spawn(
        "node",
        [
          join(ROOT, "evals", "run.mjs"),
          "--person",
          job.person,
          "--arm",
          args.arm,
          "--rep",
          String(job.rep),
          "--iteration",
          args.iteration,
          "--model",
          args.model,
          ...(args.call ? ["--call"] : []),
        ],
        { stdio: "inherit" },
      );
      child.on("close", resolve);
    });
    if (code !== 0) failed += 1;
  }
}
await Promise.all(Array.from({ length: AT_ONCE }, worker));
console.error(failed ? `${failed} did not complete` : "all complete");
process.exit(failed ? 1 : 0);
