#!/usr/bin/env node
/*
  One conversation between a made-up person and a fresh agent: three messages
  from the person, and whatever the agent says and writes in answer.

    node evals/run.mjs --person chef --arm without
    node evals/run.mjs --person chef --arm with --rep 2 --iteration 1 --model sonnet
    node evals/run.mjs --person chef --arm with --call

  --call opens the person's first message with the skill's name, as someone
  who knows the skill would. It is for telling apart a skill that was not
  reached for from one that was followed badly.

  The agent is a new `claude -p` in a folder of its own, with none of this
  machine's settings, instructions, plugins or skills: --setting-sources
  project, in a folder that has no project settings and is in no git
  repository, this one least of all. --strict-mcp-config
  keeps out the connectors of the account it is signed in to, which would
  otherwise let it write a document somewhere online. With --arm with, the
  skill is put into that folder as its one project skill.

  It may read, search and write files, and call a skill. It has no shell and
  no web, so it cannot build or install anything.

  Nothing here judges the conversation. That is judge.mjs.
*/
import { execFileSync, spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { parseArgs } from "node:util";

import {
  filesWritten,
  keptAs,
  lastWrites,
  leaked,
  parseStream,
  summariseTurn,
  touched,
  usedSkill,
} from "./lib/events.mjs";
import { PEOPLE, PROMPTS, ROOT, RUNS, SKILL, SKILL_DIR, WORK, loadPerson, read } from "./lib/files.mjs";

const TOOLS = "Read,Write,Edit,Glob,Grep,Skill";
/** A turn that runs longer than this is stopped. */
const TURN_LIMIT_MS = 25 * 60 * 1000;
/** The most one turn may cost, in dollars as the command counts them. */
const TURN_BUDGET = "5";

const { values: args } = parseArgs({
  options: {
    person: { type: "string" },
    arm: { type: "string" },
    rep: { type: "string", default: "1" },
    iteration: { type: "string", default: "1" },
    model: { type: "string", default: "sonnet" },
    call: { type: "boolean", default: false },
  },
});
if (!args.person || !["with", "without"].includes(args.arm ?? "") || (args.call && args.arm !== "with")) {
  console.error(
    "usage: node evals/run.mjs --person <id> --arm with|without [--rep 1] [--iteration 1] [--model sonnet] [--call]",
  );
  process.exit(2);
}

const person = await loadPerson(args.person);
const name = `${args.person}-${args.arm}-${args.rep}`;
const work = join(WORK, args.iteration, name);
const out = join(RUNS, args.iteration, args.person, `${args.arm}-${args.rep}`);

/** The person's three messages. */
async function messages() {
  const template = (file) => read(join(PROMPTS, file));
  const second = (await template("turn2.md")).replace("{{truth}}", person.truthText).trim();
  const turn2 =
    person.turn2 === "instead"
      ? person.turn2Text
      : person.turn2 === "truth-and"
        ? `${second}\n\n${person.turn2Text}`
        : second;
  const first = (args.call ? `/${SKILL}\n\n` : "") + (await template("turn1.md"));
  return [first, turn2, await template("turn3.md")].map((message) => message.trim() + "\n");
}

/** Sends one message, and waits for the agent to finish its turn. */
function say(message, sessionId) {
  const flags = [
    "-p",
    "--setting-sources",
    "project",
    "--strict-mcp-config",
    "--model",
    args.model,
    "--tools",
    TOOLS,
    "--permission-mode",
    "acceptEdits",
    "--output-format",
    "stream-json",
    "--verbose",
    "--max-budget-usd",
    TURN_BUDGET,
  ];
  if (sessionId) flags.push("--resume", sessionId);
  return new Promise((resolve, reject) => {
    const child = spawn("claude", flags, { cwd: work, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill("SIGTERM"), TURN_LIMIT_MS);
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, code });
    });
    child.stdin.end(message);
  });
}

// A folder of the agent's own, holding what the person handed over.
await rm(work, { recursive: true, force: true });
await mkdir(work, { recursive: true });
await cp(join(PEOPLE, person.material, "material"), join(work, "material"), { recursive: true });
if (args.arm === "with") {
  await cp(SKILL_DIR, join(work, ".claude", "skills", SKILL), { recursive: true });
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const said = await messages();
const turns = [];
let sessionId = null;
for (let i = 0; i < said.length; i++) {
  process.stderr.write(`${name}: message ${i + 1} of ${said.length}\n`);
  const { stdout, stderr, code } = await say(said[i], sessionId);
  await writeFile(join(out, `turn${i + 1}.jsonl`), stdout);
  const turn = summariseTurn(parseStream(stdout));
  turns.push(turn);
  await writeFile(join(out, `turn${i + 1}.md`), turn.reply + "\n");
  if (turn.failed) {
    await writeFile(join(out, `turn${i + 1}.err`), `exit ${code}\n${stderr}`);
    process.stderr.write(`${name}: message ${i + 1} failed, see ${relative(ROOT, out)}\n`);
    break;
  }
  sessionId = turn.sessionId;
}

// What the agent wrote, as it stands at the end. A file in its own folder is
// kept under its path there. One written anywhere else, such as a scratch
// folder the agent was given, is kept under outside/ by its name. A file that
// is not there was refused: nobody was by to allow a write outside the
// agent's folder. The words it meant to write are kept from the call, since a
// person who had been there would have allowed it and read them.
const written = [];
const refused = [];
const texts = turns.map((turn) => turn.reply);
const meant = lastWrites(turns);
for (const given of filesWritten(turns)) {
  const place = keptAs(work, given, written);
  if (place === null) continue;
  let text = await read(place.from).catch(() => null);
  if (text === null) {
    if (!meant.has(given)) continue;
    text = meant.get(given);
    refused.push(place.kept);
  }
  await mkdir(dirname(join(out, "files", place.kept)), { recursive: true });
  await writeFile(join(out, "files", place.kept), text);
  written.push(place.kept);
  texts.push(text);
}

/** The commit the skill was at, and whether it had changes that are in no commit. */
function skillState() {
  const git = (...rest) => execFileSync("git", ["-C", ROOT, ...rest], { encoding: "utf8" }).trim();
  return {
    commit: git("rev-parse", "--short", "HEAD"),
    uncommitted: git("status", "--porcelain", "--", `skills/${SKILL}`) !== "",
  };
}

const complete = turns.length === said.length && turns.every((turn) => !turn.failed);
await writeFile(
  join(out, "meta.json"),
  JSON.stringify(
    {
      person: args.person,
      arm: args.arm,
      rep: Number(args.rep),
      iteration: args.iteration,
      model: args.model,
      skill: args.arm === "with" ? skillState() : null,
      called: args.call,
      complete,
      said,
      written,
      // Of those, the ones the agent was not allowed to write.
      refused,
      turns: turns.map((turn) => ({
        costUsd: turn.costUsd,
        durationMs: turn.durationMs,
        failed: turn.failed,
        tools: turn.tools.map((tool) => tool.name),
        skillUsed: usedSkill(turn, SKILL),
      })),
      // Whether the agent reached for the skill by itself.
      skillUsed: turns.some((turn) => usedSkill(turn, SKILL)),
      readPrivate: touched(turns, person.privateFiles),
      leakedPrivate: leaked(texts, person.privateStrings),
    },
    null,
    2,
  ) + "\n",
);
process.stderr.write(`${name}: ${complete ? "done" : "NOT COMPLETE"}\n`);
process.exit(complete ? 0 : 1);
