/*
  Where things are, and reading them. Shared by the commands in this folder.
*/
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/** The repository's own folder. */
export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const PEOPLE = join(ROOT, "evals", "people");
export const RUNS = join(ROOT, "evals", "runs");
export const WORK = join(ROOT, "evals", "work");
export const PROMPTS = join(ROOT, "evals", "prompts");

/** The skill under test, and where it lives. */
export const SKILL = "storyfolio";
export const SKILL_DIR = join(ROOT, "skills", SKILL);

export const read = (path) => readFile(path, "utf8");
export const readJson = async (path) => JSON.parse(await read(path));

/** Every file under a folder, as sorted paths from that folder. None if it is not there. */
export async function walk(dir, base = dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const found = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path, base)));
    else found.push(relative(base, path));
  }
  return found.sort();
}

/** The ids of the made-up people, which are the names of their folders. None if there is no such folder. */
export async function peopleIds() {
  const entries = await readdir(PEOPLE, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/** A made-up person: what is in their person.json, and what is true of them. */
export async function loadPerson(id) {
  const person = await readJson(join(PEOPLE, id, "person.json"));
  const truth = await read(join(PEOPLE, person.truth, "truth.md"));
  return { ...person, truthText: truth.trim() };
}
