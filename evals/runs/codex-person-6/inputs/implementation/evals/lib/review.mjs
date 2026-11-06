import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, readlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export const json = value => JSON.stringify(value, null, 2) + "\n";
export const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const exists = path => lstat(path).catch(error => { if (error.code === "ENOENT") return null; throw error; });
export const IMPLEMENTATION_FILES = ["evals/review-run.mjs", "evals/lib/review.mjs", "evals/lib/codex.mjs", "evals/lib/events.mjs", "evals/lib/files.mjs"];

export function safePath(value) {
  if (typeof value !== "string" || !value || value.startsWith("/") || value.includes("\\") || value.includes("\0") || value.split("/").some(p => !p || [".", "..", ".git"].includes(p))) throw new Error(`Unsafe relative path: ${value}`);
  return value;
}

export function safeId(value) {
  if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) throw new Error(`Invalid ID: ${value}`);
  return value;
}

async function regularBytes(root, path) {
  safePath(path);
  let current = root;
  for (const part of path.split("/")) {
    current = join(current, part);
    if ((await lstat(current)).isSymbolicLink()) throw new Error(`Symlink input is not allowed: ${path}`);
  }
  if (!(await lstat(current)).isFile()) throw new Error(`Not a regular input file: ${path}`);
  return readFile(current);
}

async function tree(root, prefix = "") {
  const entries = {};
  for (const item of (await readdir(join(root, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    const location = join(root, path);
    if (item.isSymbolicLink()) entries[path] = { type: "symlink", target: await readlink(location) };
    else if (item.isDirectory()) Object.assign(entries, await tree(root, path));
    else if (item.isFile()) entries[path] = { type: "file", bytes: await readFile(location) };
    else entries[path] = { type: "special" };
  }
  return entries;
}

export async function writeNew(path, bytes) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, bytes, { flag: "wx" });
}

export async function inspectInputs({ root, casePath, capabilities, implementationFiles = IMPLEMENTATION_FILES }) {
  const rawCase = await regularBytes(root, casePath);
  const source = JSON.parse(rawCase.toString("utf8"));
  if (source.schemaVersion !== 1) throw new Error("Expected case schemaVersion 1");
  safeId(source.id);
  safePath(source.materialRoot);
  safePath(source.criteria);
  if (typeof source.request !== "string" || !source.request.trim()) throw new Error("Case request is missing");
  if (!Array.isArray(source.files) || !source.files.length || new Set(source.files).size !== source.files.length) throw new Error("Case needs a nonempty unique file allowlist");
  const files = {
    "case.json": rawCase,
    "request.txt": Buffer.from(source.request),
    "criteria.md": await regularBytes(root, source.criteria),
    "capabilities.json": Buffer.from(json(capabilities)),
  };
  for (const path of source.files) {
    safePath(path);
    files[`material/${path}`] = await regularBytes(root, `${source.materialRoot}/${path}`);
  }
  const skillRoot = join(root, "skills/storyfolio");
  for (const [path, entry] of Object.entries(await tree(skillRoot))) {
    if (entry.type !== "file") throw new Error(`Non-file skill input: ${path}`);
    files[`skill/${path}`] = await regularBytes(root, `skills/storyfolio/${path}`);
  }
  if (!files["skill/SKILL.md"]) throw new Error("Skill is missing SKILL.md");
  for (const path of implementationFiles) files[`implementation/${path}`] = await regularBytes(root, path);
  const hashes = Object.fromEntries(Object.keys(files).sort().map(path => [path, hash(files[path])]));
  return { source, files, hashes, digest: hash(json(hashes)) };
}

export async function verifyInputs(inputs) {
  const manifest = JSON.parse(await readFile(join(inputs, "manifest.json"), "utf8"));
  if (manifest.schemaVersion !== 1 || manifest.digest !== hash(json(manifest.hashes))) throw new Error("Invalid frozen input manifest");
  const actual = await tree(inputs);
  const paths = Object.keys(actual).filter(path => path !== "manifest.json").sort();
  if (json(paths) !== json(Object.keys(manifest.hashes).sort())) throw new Error("Frozen input file set changed");
  for (const path of paths) {
    if (actual[path].type !== "file" || hash(actual[path].bytes) !== manifest.hashes[path]) throw new Error(`Frozen input changed: ${path}`);
  }
  return manifest;
}

export async function prepareInputs(options) {
  const inspected = await inspectInputs(options);
  const inputs = join(options.runs, safeId(options.cohort), "inputs");
  if (await exists(inputs)) {
    const manifest = await verifyInputs(inputs);
    if (manifest.casePath !== options.casePath || manifest.digest !== inspected.digest) throw new Error("Current inputs differ from frozen cohort; use a new cohort");
    return { inputs, manifest, source: inspected.source };
  }
  await mkdir(dirname(inputs), { recursive: true });
  await mkdir(inputs);
  for (const [path, bytes] of Object.entries(inspected.files)) await writeNew(join(inputs, path), bytes);
  const manifest = { schemaVersion: 1, caseId: inspected.source.id, casePath: options.casePath,
    digest: inspected.digest, hashes: inspected.hashes, recorded: options.recorded ?? {} };
  await writeNew(join(inputs, "manifest.json"), json(manifest));
  await verifyInputs(inputs);
  return { inputs, manifest, source: inspected.source };
}

export function reviewPrompt(request, invocation) {
  if (!["natural", "explicit"].includes(invocation)) throw new Error("Invocation must be natural or explicit");
  return invocation === "natural" ? request : `${request}\n\nUse the $storyfolio skill for this review.`;
}

export async function populateWorkspace(inputs, work) {
  const manifest = await verifyInputs(inputs);
  const baseline = {};
  for (const [path, digest] of Object.entries(manifest.hashes)) {
    const destination = path.startsWith("material/") ? path : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
    if (!destination) continue;
    await writeNew(join(work, destination), await readFile(join(inputs, path)));
    baseline[destination] = digest;
  }
  return baseline;
}

export async function captureWorkspace(work, out, baseline) {
  const current = await tree(work);
  const changes = [];
  for (const path of [...new Set([...Object.keys(baseline), ...Object.keys(current)])].sort()) {
    const before = baseline[path] ?? null;
    const entry = current[path];
    if (!entry) { changes.push({ path, change: "deleted", before }); continue; }
    const after = entry.type === "file" ? hash(entry.bytes) : null;
    if (before && after === before) continue;
    const record = { path, change: before ? "modified" : "added", before, after, type: entry.type };
    if (entry.type === "file") await writeNew(join(out, "files", path), entry.bytes);
    if (entry.type === "symlink") record.target = entry.target;
    changes.push(record);
  }
  await writeNew(join(out, "workspace-changes.json"), json(changes));
  return changes;
}

export async function artifactHashes(out) {
  const hashes = {};
  for (const [path, entry] of Object.entries(await tree(out))) {
    if (path === "meta.json") continue;
    if (entry.type !== "file") throw new Error(`Non-file run artifact: ${path}`);
    hashes[path] = hash(entry.bytes);
  }
  return hashes;
}

export async function existingRun(out, identity) {
  if (!(await exists(out))) return null;
  const meta = JSON.parse(await readFile(join(out, "meta.json"), "utf8"));
  for (const [key, value] of Object.entries(identity)) if (meta[key] !== value) throw new Error(`Existing run identity differs: ${key}`);
  if (!meta.complete) throw new Error("Existing incomplete run is preserved; choose a new repetition for an explicit retry");
  if (!meta.outputHashes || !meta.outputHashes["turn1.jsonl"] || !meta.outputHashes["turn1.md"]) throw new Error("Completed run lacks preserved artifacts");
  for (const [path, digest] of Object.entries(meta.outputHashes)) {
    if (hash(await regularBytes(out, path)) !== digest) throw new Error(`Completed run artifact changed: ${path}`);
  }
  return meta;
}
