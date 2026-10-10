#!/usr/bin/env node
/*
  Checks that every made-up person is whole before an agent is run on one:
  the files a run and a judge will read are there, and a private string is
  found in a private file and nowhere a judge or an agent is meant to read.

    node evals/check-people.mjs
*/
import { stat } from "node:fs/promises";
import { join } from "node:path";

import { CRITERIA } from "./lib/score.mjs";
import { PEOPLE, PROMPTS, peopleIds, read, readJson, walk } from "./lib/files.mjs";

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const TURN2 = [undefined, "truth", "instead", "truth-and"];
const problems = [];
const exists = (path) => stat(path).then(() => true, () => false);

const ids = await peopleIds();
if (ids.length === 0) problems.push("no people in evals/people");

for (const id of ids) {
  const say = (what) => problems.push(`${id}: ${what}`);
  const person = await readJson(join(PEOPLE, id, "person.json")).catch(() => null);
  if (!person) {
    say("person.json is missing or is not JSON");
    continue;
  }
  if (person.id !== id) say(`its id is "${person.id}", and its folder is "${id}"`);
  if (typeof person.name !== "string" || !person.name) say("it has no name");

  const materialDir = join(PEOPLE, String(person.material), "material");
  const material = await walk(materialDir);
  if (material.length === 0) say(`no material in evals/people/${person.material}/material`);
  const truthPath = join(PEOPLE, String(person.truth), "truth.md");
  if (!(await exists(truthPath))) say(`no evals/people/${person.truth}/truth.md`);

  if (!Array.isArray(person.traps) || person.traps.length === 0) say("it has no traps");
  const seen = new Set();
  for (const trap of person.traps ?? []) {
    if (!KEBAB.test(trap.id ?? "")) say(`a trap's id is not lower-case words joined by hyphens: "${trap.id}"`);
    if (seen.has(trap.id)) say(`two traps are called "${trap.id}"`);
    seen.add(trap.id);
    if (!trap.wrong || !trap.truth) say(`trap "${trap.id}" lacks its wrong reading or its truth`);
  }

  // A case may have messages of its own, in place of the three every other case is sent.
  for (const [turn, file] of Object.entries(person.prompts ?? {})) {
    if (!["turn1", "turn2", "turn3"].includes(turn)) say(`prompts names "${turn}", which is no message`);
    const text = await read(join(PROMPTS, String(file))).catch(() => null);
    if (text === null) say(`its ${turn} is evals/prompts/${file}, which is not there`);
    else if (turn === "turn2" && !text.includes("{{truth}}")) say(`evals/prompts/${file} has no place for what is true`);
  }
  if (!TURN2.includes(person.turn2)) say(`turn2 is "${person.turn2}"`);
  if (person.turn2 && person.turn2 !== "truth" && !person.turn2Text) say("turn2 needs turn2Text");
  if (person.exampleConcept !== null && typeof person.exampleConcept !== "string") {
    say("exampleConcept is neither a sentence nor null");
  }
  const known = CRITERIA.map(([name]) => name);
  for (const name of person.skip ?? []) {
    if (!known.includes(name)) say(`it skips "${name}", which is no criterion`);
  }

  if (!Array.isArray(person.privateFiles) || !Array.isArray(person.privateStrings)) {
    say("privateFiles and privateStrings must both be lists");
    continue;
  }
  for (const file of person.privateFiles) {
    if (!file.startsWith("material/") || !material.includes(file.slice("material/".length))) {
      say(`private file "${file}" is not in its material`);
    }
  }
  // Where each private string may be, and where it must not be.
  const texts = { private: "", open: "" };
  for (const path of material) {
    const kind = person.privateFiles.includes(`material/${path}`) ? "private" : "open";
    texts[kind] += (await read(join(materialDir, path))).toLowerCase() + "\n";
  }
  if (await exists(truthPath)) texts.open += (await read(truthPath)).toLowerCase() + "\n";
  texts.open += [person.turn2Text ?? "", person.expect ?? ""].join("\n").toLowerCase();
  for (const string of person.privateStrings) {
    const needle = string.toLowerCase();
    if (!texts.private.includes(needle)) say(`private string "${string}" is in no private file`);
    if (texts.open.includes(needle)) say(`private string "${string}" is also in something that is not private`);
  }
}

// An em dash in copy reads as machine-written, and none is wanted in these files.
for (const path of await walk(PEOPLE)) {
  if ((await read(join(PEOPLE, path))).includes("\u2014")) problems.push(`${path}: has an em dash`);
}

if (problems.length > 0) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`ok: ${ids.length} people`);
