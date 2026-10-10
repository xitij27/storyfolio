#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { cp, mkdir, mkdtemp, writeFile, rename, lstat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { parseArgs } from "node:util";
import { MODEL, EFFORT, disabledSkills, invokeCodex, summariseCodex } from "./lib/codex.mjs";
import { PEOPLE, PROMPTS, ROOT, RUNS, WORK, SKILL_DIR, loadPerson, read, readJson, walk } from "./lib/files.mjs";
import { leaked } from "./lib/events.mjs";

const { values: args } = parseArgs({ options: {
  person: { type: "string" }, arm: { type: "string" },
  iteration: { type: "string", default: "codex-1" },
  rep: { type: "string", default: "1" }, model: { type: "string", default: MODEL },
} });
if (!args.person || !["with", "without"].includes(args.arm) || !/^[\w-]+$/.test(args.iteration) || !/^\d+$/.test(args.rep)) throw new Error("Supply --person ID --arm with|without, a safe iteration and integer rep");
const person = await loadPerson(args.person);
const out = join(RUNS, args.iteration, args.person, `${args.arm}-${args.rep}`);
const previous = await readJson(join(out, "meta.json")).catch(() => null);
if (previous?.complete) {
  if (previous.runner !== "codex" || previous.model !== args.model) throw new Error("Existing run uses a different runner/model");
  console.error("already complete"); process.exit(0);
}
// Preserve failed attempts rather than overwriting their evidence.
if (await lstat(out).catch(() => null)) {
  const archive = join(RUNS, args.iteration, "attempts", `${args.person}-${args.arm}-${args.rep}-${Date.now()}`);
  await mkdir(dirname(archive), { recursive: true });
  await rename(out, archive);
}
await mkdir(WORK, { recursive: true });
const work = await mkdtemp(join(WORK, `codex-${args.person}-${args.arm}-`));
await mkdir(out, { recursive: true });
await cp(join(PEOPLE, person.material, "material"), join(work, "material"), { recursive: true });
if (args.arm === "with") await cp(SKILL_DIR, join(work, ".agents", "skills", "storyfolio"), { recursive: true });
const template = file => read(join(PROMPTS, person.prompts?.[file] ?? `${file}.md`));
const truth = (await template("turn2")).replace("{{truth}}", () => person.truthText).trim();
const said = [await template("turn1"), person.turn2 === "instead" ? person.turn2Text : person.turn2 === "truth-and" ? `${truth}\n\n${person.turn2Text}` : truth, await template("turn3")];
const disabled = await disabledSkills();
const git = (...flags) => execFileSync("git", ["-C", ROOT, ...flags], { encoding: "utf8" }).trim();
const meta = {
  runner: "codex", cliVersion: execFileSync("codex", ["--version"], { encoding: "utf8" }).trim(),
  model: args.model, reasoningEffort: EFFORT, person: args.person, arm: args.arm, rep: Number(args.rep), iteration: args.iteration,
  skill: args.arm === "with" ? { commit: git("rev-parse", "--short", "HEAD"), uncommitted: git("status", "--porcelain", "--", "skills/storyfolio") !== "" } : null,
  harnessCommit: git("rev-parse", "--short", "HEAD"), work, disabledSkills: disabled,
  called: false, said, complete: false, turns: [], written: [], refused: [], skillUsed: false, readPrivate: false, leakedPrivate: false,
};
const save = () => writeFile(join(out, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
await save();
let sessionId;
const replies = [], commands = [];
for (let i = 0; i < said.length; i++) {
  console.error(`${args.person}-${args.arm}-${args.rep}: message ${i + 1} of 3`);
  const result = await invokeCodex({ cwd: work, prompt: said[i], sessionId, model: args.model, disabled, streamPath: join(out, `turn${i + 1}.jsonl`) });
  const turn = summariseCodex(result.stdout, result.code);
  await writeFile(join(out, `turn${i + 1}.md`), turn.reply + "\n");
  meta.turns.push({ ...turn, durationMs: result.durationMs, costUsd: null });
  replies.push(turn.reply);
  commands.push(...turn.commands);
  sessionId = turn.sessionId ?? sessionId;
  await save();
  if (turn.failed || !sessionId) {
    await writeFile(join(out, `turn${i + 1}.err`), JSON.stringify({ code: result.code, errors: turn.error, stderr: result.stderr }, null, 2));
    break;
  }
}
for (const path of await walk(work)) {
  if (path.startsWith("material/") || path.startsWith(".agents/") || path.startsWith(".git/") || path.startsWith(".codex/")) continue;
  const source = join(work, path);
  if (!(await lstat(source)).isFile()) continue;
  await mkdir(dirname(join(out, "files", path)), { recursive: true });
  await cp(source, join(out, "files", path));
  meta.written.push(path);
  replies.push(await read(source));
}
meta.skillUsed = commands.some(c => c.exitCode === 0 && /(?:cat|sed|head|tail|read|python|node|rg)\b/.test(c.command) && c.command.includes("storyfolio") && c.command.includes("SKILL.md"));
// Shell commands do not expose exact read sets. Record evidence for review,
// and treat broad content searches over material as potential private reads.
meta.privateReadEvidence = commands.filter(c => person.privateFiles.some(file => c.command.includes(file.split("/").pop())) || (person.privateFiles.length > 0 && /(?:rg|grep|cat|python|node)\b/.test(c.command) && /material(?:\/\*|\s|['"]|$)/.test(c.command))).map(c => c.command);
meta.readPrivate = meta.privateReadEvidence.length > 0;
meta.privateReadMeasurement = "Conservative shell-command heuristic; manually review privateReadEvidence and raw commands";
meta.leakedPrivate = leaked(replies, person.privateStrings);
meta.complete = meta.turns.length === 3 && meta.turns.every(t => !t.failed) && Boolean(sessionId);
await save();
console.error(`${args.person}-${args.arm}-${args.rep}: ${meta.complete ? "done" : "NOT COMPLETE"}`);
process.exit(meta.complete ? 0 : 1);
