import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { lstat, mkdir, readFile, readdir, readlink } from "node:fs/promises";
import { join } from "node:path";
import { scaffold } from "../../skills/storyfolio/scripts/scaffold.mjs";
import { codexArgs, summariseCodex } from "./codex.mjs";
import { hash, json, safeId, safePath, verifyInputs, writeNew } from "./review.mjs";

export { hash, json, safeId, safePath, verifyInputs, writeNew };
export const IMPLEMENTATION_FILES = ["evals/codex-build-run.mjs", "evals/lib/build.mjs", "evals/lib/codex.mjs", "evals/lib/events.mjs", "evals/lib/files.mjs", "evals/lib/review.mjs", "skills/storyfolio/scripts/scaffold.mjs"];
export const EXCLUDED = new Set(["node_modules", ".next", ".git", ".cache", ".npm", ".turbo", "checks", "test-results", "playwright-report", "browser-cache"]);
export const DEFAULT_SNAPSHOT = {
  roots: ["app", "components", "content", "docs", "lib", "public", "scripts", "styles", "types", "material", ".agents"],
  files: ["package.json", "package-lock.json", "next.config.ts", "next.config.mjs", "next-env.d.ts", "tsconfig.json", "eslint.config.mjs", "postcss.config.mjs", "README.md", "AGENTS.md", "CLAUDE.md", "LICENSE", ".gitignore"],
  maxFiles: 400, maxBytes: 20 * 1024 * 1024, maxFileBytes: 2 * 1024 * 1024,
};
const exists = path => lstat(path).catch(error => { if (error.code === "ENOENT") return null; throw error; });
const positive = (value, name) => { if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} must be a positive safe integer`); return value; };

export async function regularBytes(root, path) {
  safePath(path);
  let current = root;
  for (const part of path.split("/")) {
    current = join(current, part);
    if ((await lstat(current)).isSymbolicLink()) throw new Error(`Symlink input is not allowed: ${path}`);
  }
  if (!(await lstat(current)).isFile()) throw new Error(`Not a regular input: ${path}`);
  return readFile(current);
}

async function fileTree(root, prefix = "", excludeGenerated = true) {
  const result = [];
  for (const entry of (await readdir(join(root, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (excludeGenerated && (EXCLUDED.has(entry.name) || entry.name.endsWith(".tsbuildinfo"))) continue;
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) result.push(...await fileTree(root, path, excludeGenerated));
    else if (entry.isFile()) result.push(path);
    else throw new Error(`Unsupported source input: ${path}`);
  }
  return result;
}

export function validateCase(source) {
  if (source.schemaVersion !== 1) throw new Error("Expected build case schemaVersion 1");
  safeId(source.id);
  for (const key of ["workspaceRoot", "expectations", "rubric", "protocol"]) safePath(source[key]);
  if (!Array.isArray(source.files) || !source.files.length || new Set(source.files).size !== source.files.length) throw new Error("Case needs a nonempty unique fixture file allowlist");
  source.files.forEach(path => { safePath(path); if (path.split("/").some(part => EXCLUDED.has(part))) throw new Error(`Generated fixture path is not allowed: ${path}`); });
  if (!Array.isArray(source.prompts) || !source.prompts.length) throw new Error("Case needs fixed prompt paths");
  source.prompts.forEach(safePath);
  for (const key of ["maxTurns", "turnTimeoutMs", "maxWallMs", "maxTokens"]) positive(source.bounds?.[key], key);
  if (source.bounds.maxTurns > source.prompts.length) throw new Error("Every allowed turn needs a fixed prompt");
  if (source.bounds.turnTimeoutMs > source.bounds.maxWallMs) throw new Error("Per-turn timeout exceeds total wall budget");
  const snapshot = { ...DEFAULT_SNAPSHOT, ...source.snapshot };
  for (const key of ["roots", "files"]) {
    if (!Array.isArray(snapshot[key]) || new Set(snapshot[key]).size !== snapshot[key].length) throw new Error(`Invalid snapshot ${key}`);
    snapshot[key].forEach(path => { safePath(path); if (path.split("/").some(part => EXCLUDED.has(part))) throw new Error(`Excluded snapshot path: ${path}`); });
  }
  for (const key of ["maxFiles", "maxBytes", "maxFileBytes"]) positive(snapshot[key], key);
  return { ...source, snapshot };
}

export async function inspectBuildInputs({ root, casePath, capabilities, implementationFiles = IMPLEMENTATION_FILES }) {
  const raw = await regularBytes(root, casePath);
  const source = validateCase(JSON.parse(raw));
  const files = { "case.json": raw, "capabilities.json": Buffer.from(json(capabilities)) };
  for (const [key, path] of Object.entries({ "expectations.json": source.expectations, "rubric.md": source.rubric, "protocol.md": source.protocol })) files[key] = await regularBytes(root, path);
  for (const [index, path] of source.prompts.entries()) files[`prompts/turn${index + 1}.md`] = await regularBytes(root, path);
  for (const path of source.files) files[`fixture/${path}`] = await regularBytes(root, `${source.workspaceRoot}/${path}`);
  for (const path of await fileTree(join(root, "skills/storyfolio"))) files[`skill/${path}`] = await regularBytes(root, `skills/storyfolio/${path}`);
  for (const path of [...new Set([...implementationFiles, ...(source.implementationFiles ?? [])])]) files[`implementation/${safePath(path)}`] = await regularBytes(root, path);
  if (!files["skill/SKILL.md"] || !files["skill/engine/package-lock.json"]) throw new Error("Frozen skill and engine lockfile are required");
  const hashes = Object.fromEntries(Object.keys(files).sort().map(path => [path, hash(files[path])]));
  return { source, files, hashes, digest: hash(json(hashes)) };
}

export async function prepareBuildInputs(options) {
  const inspected = await inspectBuildInputs(options);
  const inputs = join(options.runs, safeId(options.cohort), "inputs");
  if (await exists(inputs)) {
    const manifest = await verifyInputs(inputs);
    if (manifest.casePath !== options.casePath || manifest.digest !== inspected.digest) throw new Error("Current inputs differ from frozen cohort; use a new cohort");
    return { inputs, manifest, source: inspected.source };
  }
  await mkdir(join(options.runs, options.cohort), { recursive: true });
  await mkdir(inputs);
  for (const [path, bytes] of Object.entries(inspected.files)) await writeNew(join(inputs, path), bytes);
  const manifest = { schemaVersion: 1, caseId: inspected.source.id, casePath: options.casePath, digest: inspected.digest, hashes: inspected.hashes, recorded: options.recorded ?? {} };
  await writeNew(join(inputs, "manifest.json"), json(manifest));
  await verifyInputs(inputs);
  return { inputs, manifest, source: inspected.source };
}

export async function populateBuildWorkspace(inputs, work, { beforeScaffold } = {}) {
  const manifest = await verifyInputs(inputs);
  const initialEntries = (await readdir(work, { withFileTypes: true }).catch(error => { if (error.code === "ENOENT") return []; throw error; }))
    .map(entry => ({ name: entry.name, type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : "file" })).sort((a, b) => a.name.localeCompare(b.name));
  for (const path of Object.keys(manifest.hashes)) {
    const destination = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
    if (destination) await writeNew(join(work, destination), await readFile(join(inputs, path)));
  }
  const inventory = { schemaVersion: 1, initialEntries, files: await fileTree(work),
    fixtureFiles: Object.keys(manifest.hashes).filter(path => path.startsWith("fixture/")).map(path => path.slice(8)).sort(),
    phase: "Fixture and unchanged skill copied; engine not scaffolded yet. Installed skill engine files under .agents are not an existing root-level site." };
  if (beforeScaffold) await beforeScaffold(inventory);
  const result = await scaffold(work, { source: join(inputs, "skill/engine") });
  if (result.conflicts.length) throw new Error(`Fixture conflicts with scaffold: ${result.conflicts.join(", ")}`);
  return { ...result, inventory };
}

/** Read only allowlisted source trees. Binary bytes remain bytes; generated trees are never walked. */
export async function inspectWorkspace(work, policy = DEFAULT_SNAPSHOT) {
  const entries = {}, excluded = [], unexpected = [];
  let bytes = 0;
  const allowed = path => policy.files.includes(path) || policy.roots.some(root => path === root || path.startsWith(`${root}/`));
  const ancestor = path => policy.roots.some(root => root.startsWith(`${path}/`)) || policy.files.some(file => file.startsWith(`${path}/`));
  async function visit(prefix = "") {
    for (const entry of (await readdir(join(work, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (EXCLUDED.has(entry.name) || entry.name.endsWith(".tsbuildinfo")) { excluded.push(path); continue; }
      if (!allowed(path) && !ancestor(path)) { unexpected.push({ path, type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : "file" }); continue; }
      if (entry.isDirectory()) { await visit(path); continue; }
      if (Object.keys(entries).length >= policy.maxFiles) throw new Error(`Snapshot file bound exceeded: ${policy.maxFiles}`);
      if (entry.isSymbolicLink()) { entries[path] = { type: "symlink", target: await readlink(join(work, path)) }; continue; }
      if (!entry.isFile()) { entries[path] = { type: "special" }; continue; }
      const size = (await lstat(join(work, path))).size;
      if (size > policy.maxFileBytes || bytes + size > policy.maxBytes) throw new Error(`Snapshot byte bound exceeded: ${path}`);
      const content = await regularBytes(work, path);
      bytes += content.length;
      if (content.length > policy.maxFileBytes || bytes > policy.maxBytes) throw new Error(`Snapshot byte bound exceeded: ${path}`);
      entries[path] = { type: "file", hash: hash(content), size: content.length, bytes: content };
    }
  }
  await visit();
  return { entries, excluded, unexpected, totalBytes: bytes };
}

export async function captureBuildWorkspace(work, out, policy, before = {}) {
  const inspected = await inspectWorkspace(work, policy);
  const manifest = { schemaVersion: 1, files: {}, excluded: inspected.excluded, unexpected: inspected.unexpected, totalBytes: inspected.totalBytes, changes: [] };
  for (const [path, entry] of Object.entries(inspected.entries)) {
    const { bytes, ...record } = entry;
    manifest.files[path] = record;
    if (bytes) await writeNew(join(out, "files", path), bytes);
  }
  for (const path of [...new Set([...Object.keys(before), ...Object.keys(manifest.files)])].sort()) {
    if (json(before[path]) === json(manifest.files[path])) continue;
    manifest.changes.push({ path, change: !before[path] ? "added" : !manifest.files[path] ? "deleted" : "modified", before: before[path] ?? null, after: manifest.files[path] ?? null });
  }
  await writeNew(join(out, "manifest.json"), json(manifest));
  return manifest;
}

/** CLI -c values are TOML, including inline tables whose key/value delimiter is '='. */
export function tomlValue(value, ancestors = new Set()) {
  if (typeof value === "string") {
    if (!value.isWellFormed()) throw new Error("TOML strings must contain valid Unicode scalar values");
    return JSON.stringify(value);
  }
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number" && Number.isFinite(value)) return Object.is(value, -0) ? "-0.0" : String(value);
  if (value === null || typeof value !== "object") throw new Error("Unsupported TOML value: expected string, finite number, boolean, array or plain object");
  if (ancestors.has(value)) throw new Error("Circular TOML value");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) return `[${Array.from(value, item => tomlValue(item, ancestors)).join(",")}]`;
    if (![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error("TOML tables must be plain objects");
    return `{${Object.entries(value).map(([key, item]) => `${tomlValue(key)}=${tomlValue(item, ancestors)}`).join(",")}}`;
  } finally { ancestors.delete(value); }
}

export function buildCodexArgs({ config = {}, profile, permissionProfile, removeConfig = [], ...options } = {}) {
  const args = codexArgs(options);
  // The shipped engine's project instructions are deliberately part of the product under test.
  args.splice(args.indexOf("--ignore-user-config"), 0, "-c", "project_doc_max_bytes=32768");
  // codexArgs supplies a later zero value, so remove it rather than relying on precedence.
  const index = args.indexOf("project_doc_max_bytes=0");
  args.splice(index - 1, 2);
  for (const key of removeConfig) {
    if (typeof key !== "string" || !/^[a-zA-Z0-9_.-]+$/.test(key)) throw new Error(`Invalid removed Codex config key: ${key}`);
    const existing = args.findIndex(arg => arg.startsWith(`${key}=`));
    if (existing >= 0) args.splice(existing - 1, 2);
  }
  for (const [key, value] of Object.entries(config)) {
    if (!/^[a-zA-Z0-9_.-]+$/.test(key)) throw new Error(`Invalid Codex config key: ${key}`);
    const existing = args.findIndex(arg => arg.startsWith(`${key}=`));
    if (existing >= 0) args.splice(existing - 1, 2);
    args.splice(args.indexOf("--ignore-user-config"), 0, "-c", `${key}=${tomlValue(value)}`);
  }
  if (profile) args.splice(args.indexOf("--ignore-user-config"), 0, "--profile", profile);
  // -P belongs to `codex sandbox`, not exec/resume. Both actor forms use
  // the same top-level selector documented for permission profiles.
  if (permissionProfile) {
    if (typeof permissionProfile !== "string" || !permissionProfile.trim()) throw new Error("Invalid permission profile name");
    if (args.some(arg => arg.startsWith("sandbox_mode=") || arg.startsWith("sandbox_workspace_write."))) throw new Error("Permission profiles require removing legacy sandbox settings");
    const existing = args.findIndex(arg => arg.startsWith("default_permissions="));
    if (existing >= 0) args.splice(existing - 1, 2);
    args.splice(args.indexOf("--ignore-user-config"), 0, "-c", `default_permissions=${tomlValue(permissionProfile)}`);
  }
  return args;
}

export function planTurn({ turn, source, history, gate }) {
  positive(turn, "turn");
  if (turn > source.bounds.maxTurns) throw new Error("Turn limit reached");
  if (history.length !== turn - 1) throw new Error("Turns must be contiguous; existing turns are never overwritten");
  if (history.some(item => !item.complete)) throw new Error("Failed turn is preserved; choose a new repetition for an explicit retry");
  if (history.some(item => !Number.isSafeInteger(item.durationMs) || item.durationMs < 0 || !item.usage || ["input_tokens", "output_tokens"].some(key => !Number.isSafeInteger(item.usage[key]) || item.usage[key] < 0))) throw new Error("Previous turn lacks reliable duration or usage for the remaining budget");
  const elapsedMs = history.reduce((sum, item) => sum + item.durationMs, 0);
  const tokens = history.reduce((sum, item) => sum + (item.usage?.input_tokens ?? 0) + (item.usage?.output_tokens ?? 0), 0);
  if (elapsedMs >= source.bounds.maxWallMs) throw new Error("Cumulative actor wall budget exhausted");
  if (tokens >= source.bounds.maxTokens) throw new Error("Cumulative actor token ceiling reached");
  if (turn > 1) {
    const previous = history.at(-1);
    if (!previous.sessionId) throw new Error("Previous turn lacks a resumable session");
    if (!gate || gate.afterTurn !== turn - 1 || gate.advance !== true || gate.previousTurnDigest !== previous.digest || typeof gate.observation !== "string" || !gate.observation.trim()) throw new Error("Coordinator gate must identify and approve the observed previous turn");
  }
  return { sessionId: history.at(-1)?.sessionId ?? null, timeoutMs: Math.min(source.bounds.turnTimeoutMs, source.bounds.maxWallMs - elapsedMs), elapsedMs, tokens };
}

/** One process, one paid turn. Terminate the entire process group on timeout. */
export function invokeBuildCodex({ cwd, prompt, streamPath, stderrPath, timeoutMs, spawnProcess = spawn, signalHost = process, terminateGraceMs = 2000, ...options }) {
  positive(timeoutMs, "timeoutMs");
  positive(terminateGraceMs, "terminateGraceMs");
  return new Promise(resolve => {
    const started = Date.now(), args = buildCodexArgs(options);
    const log = createWriteStream(streamPath, { flags: "wx" }), errlog = createWriteStream(stderrPath, { flags: "wx" });
    const child = spawnProcess("codex", args, { cwd, stdio: ["pipe", "pipe", "pipe"], detached: process.platform !== "win32" });
    let stdout = "", stderr = "", timedOut = false, interruptedBy = null, stopping = false, logError = null, forceTimer;
    const kill = signal => { try { if (process.platform === "win32") child.kill(signal); else process.kill(-child.pid, signal); } catch {} };
    const stop = () => {
      if (stopping) { kill("SIGKILL"); return; }
      stopping = true;
      kill("SIGTERM");
      forceTimer = setTimeout(() => kill("SIGKILL"), terminateGraceMs);
    };
    const interrupt = signal => { interruptedBy ??= signal; stop(); };
    const onInterrupt = () => interrupt("SIGINT"), onTerminate = () => interrupt("SIGTERM");
    signalHost.on("SIGINT", onInterrupt);
    signalHost.on("SIGTERM", onTerminate);
    for (const stream of [log, errlog]) stream.on("error", error => { logError ??= String(error); stop(); });
    const timer = setTimeout(() => { timedOut = true; stop(); }, timeoutMs);
    child.stdout.on("data", chunk => { stdout += chunk; log.write(chunk); });
    child.stderr.on("data", chunk => { stderr += chunk; errlog.write(chunk); });
    let spawnError = null;
    child.on("error", error => { spawnError = String(error); });
    child.on("close", async code => {
      clearTimeout(timer); clearTimeout(forceTimer);
      // A terminated parent can close its streams while a descendant still ignores SIGTERM.
      if (stopping) kill("SIGKILL");
      signalHost.removeListener("SIGINT", onInterrupt);
      signalHost.removeListener("SIGTERM", onTerminate);
      await Promise.all([log, errlog].map(stream => stream.destroyed ? Promise.resolve() : new Promise(done => stream.end(done))));
      resolve({ stdout, stderr, code: timedOut || interruptedBy || spawnError || logError ? -1 : code, durationMs: Date.now() - started, args, timedOut, interruptedBy, spawnError, logError });
    });
    child.stdin.on("error", () => {});
    child.stdin.end(prompt);
  });
}

export async function readTurnHistory(out) {
  const turns = (await readdir(join(out, "turns")).catch(error => { if (error.code === "ENOENT") return []; throw error; })).sort();
  const history = [];
  for (const [index, name] of turns.entries()) {
    if (name !== String(index + 1).padStart(2, "0")) throw new Error("Unexpected or noncontiguous saved turn directory");
    const location = join(out, "turns", name);
    const raw = await regularBytes(location, "result.json").catch(error => { throw new Error(`Incomplete turn is preserved: ${name}: ${error.message}`); });
    const result = JSON.parse(raw);
    for (const [path, digest] of Object.entries(result.artifacts ?? {})) if (hash(await regularBytes(location, path)) !== digest) throw new Error(`Saved turn artifact changed: ${name}/${path}`);
    if (!result.artifacts?.["stream.jsonl"] || !result.artifacts?.["reply.md"] || !result.artifacts?.["process.json"]) throw new Error(`Turn lacks preserved artifacts: ${name}`);
    history.push({ ...result, digest: hash(raw) });
  }
  return history;
}

export async function executeBuildTurn({ out, work, inputs, source, capabilities, turn, gate, invoke = invokeBuildCodex }) {
  await verifyInputs(inputs);
  const history = await readTurnHistory(out);
  const limits = planTurn({ turn, source, history, gate });
  const location = join(out, "turns", String(turn).padStart(2, "0"));
  await mkdir(join(out, "turns"), { recursive: true });
  await mkdir(location);
  const prompt = await regularBytes(inputs, `prompts/turn${turn}.md`);
  await writeNew(join(location, "prompt.md"), prompt);
  if (gate) await writeNew(join(location, "gate.json"), json(gate));
  await writeNew(join(location, "started.json"), json({ turn, started: new Date().toISOString(), ...limits, inputDigest: (await verifyInputs(inputs)).digest }));
  const result = { turn, complete: false, durationMs: 0, sessionId: limits.sessionId, usage: null, artifacts: {},
    completionMeaning: "The actor turn completed. This is not a passed build, reached stop or author approval.",
    usageAggregation: "Raw turn.completed usage is preserved. The between-turn ceiling conservatively sums reported input_tokens plus output_tokens across turns; resumed counters may overlap. No dollar estimate or hard in-flight token cap is inferred." };
  try {
    await captureBuildWorkspace(work, join(location, "before"), source.snapshot);
    const process = await invoke({ cwd: work, prompt: prompt.toString("utf8"), streamPath: join(location, "stream.jsonl"), stderrPath: join(location, "stderr.log"), timeoutMs: limits.timeoutMs, model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId: limits.sessionId });
    await writeNew(join(location, "process.json"), json({ ...process, stdout: undefined, stderr: undefined }));
    const summary = summariseCodex(process.stdout, process.code);
    await writeNew(join(location, "reply.md"), summary.reply + "\n");
    Object.assign(result, { complete: !summary.failed && Boolean(summary.sessionId ?? limits.sessionId), sessionId: summary.sessionId ?? limits.sessionId, usage: summary.usage, durationMs: process.durationMs, commands: summary.commands, errors: summary.error, timedOut: process.timedOut ?? false, interruptedBy: process.interruptedBy ?? null });
  } catch (error) { result.error = String(error); }
  try {
    const beforePath = turn === 1 ? join(out, "setup/snapshot/manifest.json") : join(out, "turns", String(turn - 1).padStart(2, "0"), "snapshot/manifest.json");
    const before = JSON.parse(await readFile(beforePath, "utf8"));
    result.snapshot = await captureBuildWorkspace(work, join(location, "snapshot"), source.snapshot, before.files);
    await verifyInputs(inputs);
  } catch (error) { result.complete = false; result.captureError = String(error); }
  for (const path of await fileTree(location, "", false)) result.artifacts[path] = hash(await regularBytes(location, path));
  await writeNew(join(location, "result.json"), json(result));
  return { ...result, location };
}
