#!/usr/bin/env node
import { cp, lstat, mkdir, readdir } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ENGINE = fileURLToPath(new URL("../engine/", import.meta.url));
const OMIT = new Set(["node_modules", ".next", "checks", ".git"]);

async function entries(root, prefix = "") {
  const result = [];
  for (const item of await readdir(join(root, prefix), { withFileTypes: true })) {
    if (OMIT.has(item.name)) continue;
    const name = join(prefix, item.name);
    if (item.isSymbolicLink()) throw new Error(`Engine contains a symbolic link: ${name}`);
    if (item.isDirectory()) result.push(...await entries(root, name));
    else if (item.isFile()) result.push(name);
    else throw new Error(`Engine contains an unsupported file: ${name}`);
  }
  return result.sort();
}

async function stat(path) {
  try { return await lstat(path); }
  catch (error) { if (["ENOENT", "ENOTDIR"].includes(error.code)) return null; throw error; }
}

function within(parent, child) {
  const rel = relative(parent, child);
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

/** Preflight every destination before writing any file. Existing story notes are kept. */
export async function scaffold(folder, { source = ENGINE } = {}) {
  const destination = resolve(folder);
  const engine = resolve(source);
  if (within(engine, destination) || within(destination, engine)) {
    throw new Error("The destination and engine source must be separate directories");
  }
  const files = await entries(engine);
  const conflicts = new Set();
  for (const file of files) {
    const target = join(destination, file);
    if (await stat(target)) conflicts.add(file);
    let parent = dirname(target);
    while (true) {
      const info = await stat(parent);
      if (info && (!info.isDirectory() || info.isSymbolicLink())) {
        conflicts.add(relative(destination, parent) || ".");
      }
      const next = dirname(parent);
      if (next === parent) break;
      parent = next;
    }
  }
  if (conflicts.size) return { copied: [], conflicts: [...conflicts].sort() };
  for (const file of files) {
    await mkdir(dirname(join(destination, file)), { recursive: true });
    await cp(join(engine, file), join(destination, file), { force: false, errorOnExist: true });
  }
  return { copied: files, conflicts: [] };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const usage = "Usage: node scaffold.mjs <folder>\n       node scaffold.mjs --help\n\nCopies the engine without overwriting existing files.\nUse ./ before a folder name that begins with a dash.";
  const folder = args[0];
  if (args.length === 1 && ["--help", "-h"].includes(folder)) {
    console.log(usage);
  } else if (!folder || args.length !== 1 || folder.startsWith("-")) {
    if (folder?.startsWith("-") && !["--help", "-h"].includes(folder)) console.error(`Unknown option: ${folder}`);
    console.error(usage);
    process.exitCode = 2;
  } else {
    try {
      const result = await scaffold(folder);
      if (result.conflicts.length) {
        console.error(`Nothing written. These paths already exist or cannot be written safely:\n${result.conflicts.join("\n")}`);
        process.exitCode = 1;
      } else console.log(`Copied ${result.copied.length} engine files to ${resolve(folder)}`);
    } catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
