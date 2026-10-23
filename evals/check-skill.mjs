#!/usr/bin/env node
/*
  Checks the form of the skill: what an installer and an agent rely on
  before a word of it is read. It says nothing of whether the skill is any
  good. The runs say that.

    node evals/check-skill.mjs
*/
import { join } from "node:path";
import { lstat } from "node:fs/promises";

import { SKILL, SKILL_DIR, read, walk } from "./lib/files.mjs";

/** The most words SKILL.md may have under its frontmatter, and a reference may have. */
const SKILL_WORDS = 800;
const REFERENCE_WORDS = 1500;
/** The most characters the frontmatter may have, by the Agent Skills specification. */
const FRONTMATTER_CHARS = 1024;

const problems = [];
const words = (text) => text.split(/\s+/).filter(Boolean).length;

// Check before walking: an accidental install must not traverse dependencies.
for (const directory of ["engine/node_modules", "engine/.next", "engine/checks", "library/node_modules", "library/.next", "library/out"]) {
  const target = join(SKILL_DIR, directory);
  if (await lstat(target).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  })) {
    console.error(`${directory} exists: install and check in a copy, never in the skill`);
    process.exit(1);
  }
}

const files = await walk(SKILL_DIR);
if (!files.includes("SKILL.md")) {
  console.error(`no skills/${SKILL}/SKILL.md`);
  process.exit(1);
}
const skill = await read(join(SKILL_DIR, "SKILL.md"));
const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(skill);
if (!match) {
  console.error("SKILL.md does not open with frontmatter between two lines of ---");
  process.exit(1);
}
const [, frontmatter, body] = match;
const field = (name) => new RegExp(`^${name}:\\s*(.+)$`, "m").exec(frontmatter)?.[1]?.trim() ?? "";

if (field("name") !== SKILL) problems.push(`name is "${field("name")}", and the folder is "${SKILL}"`);
const description = field("description").replace(/^["']|["']$/g, "");
if (!description.startsWith("Use when")) problems.push('description does not start with "Use when"');
if (frontmatter.length > FRONTMATTER_CHARS) {
  problems.push(`frontmatter is ${frontmatter.length} characters, and may be ${FRONTMATTER_CHARS}`);
}
if (words(body) > SKILL_WORDS) problems.push(`SKILL.md is ${words(body)} words, and may be ${SKILL_WORDS}`);

const references = files.filter((path) => path.startsWith("references/") && path.endsWith(".md"));
for (const path of references) {
  if (!body.includes(path)) problems.push(`${path} is not named in SKILL.md, so no agent will open it`);
  const count = words(await read(join(SKILL_DIR, path)));
  if (count > REFERENCE_WORDS) problems.push(`${path} is ${count} words, and may be ${REFERENCE_WORDS}`);
}
for (const [, path] of body.matchAll(/(references\/[a-z0-9-]+\.md)/g)) {
  if (!files.includes(path)) problems.push(`SKILL.md names ${path}, which is not there`);
}

for (const path of files.filter((file) => file.endsWith(".md"))) {
  const text = await read(join(SKILL_DIR, path));
  if (text.includes("\u2014")) problems.push(`${path}: has an em dash`);
  // An @ before a path makes an agent load the file at once, whether or not it is needed.
  if (path !== "engine/CLAUDE.md" && /(^|\s)@[\w./-]+\.md\b/.test(text)) problems.push(`${path}: names a file with @ in front`);
}

if (problems.length > 0) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`ok: SKILL.md is ${words(body)} words, with ${references.length} references`);
