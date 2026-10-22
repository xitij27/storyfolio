import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { lstat, mkdir, readFile, readdir, readlink } from "node:fs/promises";
import { join } from "node:path";
import { scaffold } from "../../skills/storyfolio/scripts/scaffold.mjs";
import { codexArgs, summariseCodex } from "./codex.mjs";
import { hash, json, safeId, safePath, verifyInputs, writeNew } from "./review.mjs";
import { SOURCE_EXCLUDED_DIRECTORIES, sourceEntryExcluded, sourcePathExcluded } from "./source-scope.mjs";

export { hash, json, safeId, safePath, verifyInputs, writeNew };
export const IMPLEMENTATION_FILES = ["evals/codex-build-run.mjs", "evals/lib/build.mjs", "evals/lib/source-scope.mjs", "evals/lib/codex.mjs", "evals/lib/events.mjs", "evals/lib/files.mjs", "evals/lib/review.mjs", "skills/storyfolio/scripts/scaffold.mjs"];
export const EXCLUDED = new Set(SOURCE_EXCLUDED_DIRECTORIES);
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
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (excludeGenerated && await sourceEntryExcluded(root, path, entry)) continue;
    if (entry.isDirectory()) result.push(...await fileTree(root, path, excludeGenerated));
    else if (entry.isFile()) result.push(path);
    else throw new Error(`Unsupported source input: ${path}`);
  }
  return result;
}

export function validateCase(source) {
  if (![1, 2, 3].includes(source.schemaVersion)) throw new Error("Expected build case schemaVersion 1, 2 or 3");
  if (source.judgeTransport !== undefined && !["inline", "paged-v1"].includes(source.judgeTransport)) throw new Error("judgeTransport must be inline or paged-v1");
  const diagnostic = source.schemaVersion === 2, journey = source.schemaVersion === 3;
  if (source.taskKind !== (diagnostic ? "prototype-depth" : journey ? "full-journey" : undefined)) throw new Error("taskKind must match its schema: legacy absent, 2 prototype-depth, 3 full-journey");
  safeId(source.id);
  for (const key of ["workspaceRoot", "expectations", "rubric", "protocol"]) safePath(source[key]);
  if (!Array.isArray(source.files) || !source.files.length || new Set(source.files).size !== source.files.length) throw new Error("Case needs a nonempty unique fixture file allowlist");
  source.files.forEach(path => { safePath(path); if (sourcePathExcluded(path)) throw new Error(`Generated fixture path is not allowed: ${path}`); });
  if (journey && source.files.some(path => !path.startsWith("material/") && !path.startsWith("public/assets/"))) throw new Error("full-journey fixtures contain only declared material/ and public/assets/ files, not a seeded site or approval history");
  if (!Array.isArray(source.prompts) || !source.prompts.length) throw new Error("Case needs fixed prompt paths");
  source.prompts.forEach(safePath);
  const setupMode = source.setupMode === undefined ? "scaffold" : source.setupMode;
  if (journey ? setupMode !== "unscaffolded" : !["scaffold", "existing-site"].includes(setupMode)) throw new Error("setupMode must be scaffold or existing-site for schemas 1/2, explicitly unscaffolded for full-journey");
  const requestedStops = diagnostic ? undefined : !journey && source.requestedStops === undefined ? [4, 5, 6].slice(0, source.prompts.length) : source.requestedStops;
  if (diagnostic) {
    if (Object.hasOwn(source, "requestedStops")) throw new Error("prototype-depth does not request journey stops");
    if (source.prompts.length !== 1 || source.bounds?.maxTurns !== 1) throw new Error("prototype-depth requires exactly one fixed prompt and one allowed turn");
  } else if (journey) {
    if (!Array.isArray(requestedStops) || requestedStops.length !== 6 || requestedStops.some((stop, index) => stop !== index + 1)) throw new Error("full-journey requires explicit requestedStops: [1, 2, 3, 4, 5, 6]");
    if (source.prompts.length !== 6 || new Set(source.prompts).size !== 6 || source.bounds?.maxTurns !== 6) throw new Error("full-journey requires six distinct fixed prompts and maxTurns: 6");
  } else if (!Array.isArray(requestedStops) || requestedStops.length !== source.prompts.length || requestedStops.some((stop, index) => ![4, 5, 6].includes(stop) || (index > 0 && stop <= requestedStops[index - 1]))) throw new Error("requestedStops must match the prompts as an ordered unique subset of 4, 5 and 6");
  const refusalTurns = source.refusalTurns === undefined && !journey ? diagnostic ? [1] : [2, 3].filter(turn => turn <= source.prompts.length) : source.refusalTurns;
  if (!Array.isArray(refusalTurns) || refusalTurns.some((turn, index) => !Number.isSafeInteger(turn) || turn < 1 || turn > source.prompts.length || (index > 0 && turn <= refusalTurns[index - 1]))) throw new Error("refusalTurns must be ordered unique turn numbers within the prompt list");
  if (diagnostic && (refusalTurns.length !== 1 || refusalTurns[0] !== 1)) throw new Error("prototype-depth requires the fixed opening refusalTurns: [1]");
  for (const key of ["maxTurns", "turnTimeoutMs", "maxWallMs", "maxTokens"]) positive(source.bounds?.[key], key);
  if (source.bounds.maxUncachedTokens !== undefined) positive(source.bounds.maxUncachedTokens, "maxUncachedTokens");
  if (source.bounds.maxTurns > source.prompts.length) throw new Error("Every allowed turn needs a fixed prompt");
  if (source.bounds.turnTimeoutMs > source.bounds.maxWallMs) throw new Error("Per-turn timeout exceeds total wall budget");
  const snapshot = { ...DEFAULT_SNAPSHOT, ...source.snapshot };
  for (const key of ["roots", "files"]) {
    if (!Array.isArray(snapshot[key]) || new Set(snapshot[key]).size !== snapshot[key].length) throw new Error(`Invalid snapshot ${key}`);
    snapshot[key].forEach(path => { safePath(path); if (path.split("/").some(part => EXCLUDED.has(part))) throw new Error(`Excluded snapshot path: ${path}`); });
  }
  for (const key of ["maxFiles", "maxBytes", "maxFileBytes"]) positive(snapshot[key], key);
  if (journey) {
    const underRoot = path => snapshot.roots.some(root => path === root || path.startsWith(`${root}/`));
    if (!underRoot(".agents/skills/storyfolio") || source.files.some(path => !underRoot(path) && !snapshot.files.includes(path))) throw new Error("full-journey snapshot must cover every fixture file and the complete installed skill tree");
  }
  return { ...source, setupMode, ...(diagnostic ? {} : { requestedStops }), refusalTurns, snapshot };
}

/** Versioned task identity never relabels a diagnostic or an early stop as stop 4. */
export function buildTaskIdentity(source, turn) {
  if (source.taskKind === "prototype-depth") return { taskKind: source.taskKind };
  return { ...(source.taskKind === "full-journey" ? { taskKind: source.taskKind } : {}), ...(turn === undefined ? { requestedStops: source.requestedStops } : { requestedStop: source.requestedStops[turn - 1] }) };
}

export async function inspectBuildInputs({ root, casePath, capabilities, implementationFiles = IMPLEMENTATION_FILES }) {
  const raw = await regularBytes(root, casePath);
  const source = validateCase(JSON.parse(raw));
  const files = { "case.json": raw, "capabilities.json": Buffer.from(json(capabilities)) };
  for (const [key, path] of Object.entries({ "expectations.json": source.expectations, "rubric.md": source.rubric, "protocol.md": source.protocol })) files[key] = await regularBytes(root, path);
  for (const [index, path] of source.prompts.entries()) files[`prompts/turn${index + 1}.md`] = await regularBytes(root, path);
  for (const path of source.files) files[`fixture/${path}`] = await regularBytes(root, `${source.workspaceRoot}/${path}`);
  for (const path of await fileTree(join(root, "skills/storyfolio"))) files[`skill/${path}`] = await regularBytes(root, `skills/storyfolio/${path}`);
  const implementation = new Set([...implementationFiles, ...(source.implementationFiles ?? [])]);
  // Current coordinator checker/judge entry points import this helper even
  // for legacy expectations. Freeze transitive code for new cohorts without
  // rewriting historical fixture declarations or retained cohort inputs.
  if (["evals/check-build.mjs", "evals/lib/build-check.mjs", "evals/codex-build-judge.mjs"].some(path => implementation.has(path))) implementation.add("evals/lib/build-capture.mjs");
  if (implementation.has("evals/codex-build-judge.mjs")) {
    implementation.add("evals/lib/judge-transport.mjs");
    implementation.add("evals/judge-evidence-server.mjs");
  }
  for (const path of implementation) files[`implementation/${safePath(path)}`] = await regularBytes(root, path);
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
  const source = validateCase(JSON.parse(await regularBytes(inputs, "case.json")));
  const initialEntries = (await readdir(work, { withFileTypes: true }).catch(error => { if (error.code === "ENOENT") return []; throw error; }))
    .map(entry => ({ name: entry.name, type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : "file" })).sort((a, b) => a.name.localeCompare(b.name));
  if (source.setupMode === "unscaffolded" && ((await exists(work))?.isSymbolicLink() || initialEntries.length)) throw new Error("Unscaffolded setup requires a fresh empty nonsymlink workspace; existing entries are preserved");
  for (const path of Object.keys(manifest.hashes)) {
    const destination = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? `.agents/skills/storyfolio/${path.slice(6)}` : null;
    if (destination) await writeNew(join(work, destination), await readFile(join(inputs, path)));
  }
  const inventory = { schemaVersion: 1, setupMode: source.setupMode, initialEntries, files: await fileTree(work),
    fixtureFiles: Object.keys(manifest.hashes).filter(path => path.startsWith("fixture/")).map(path => path.slice(8)).sort(),
    phase: source.setupMode === "unscaffolded"
      ? "Declared material, supplied assets and unchanged skill copied only. No root application or approval history is seeded; actor preflight and scaffolding have not occurred."
      : source.setupMode === "existing-site"
      ? "Existing site fixture and unchanged skill copied; engine scaffolding is explicitly skipped."
      : "Fixture and unchanged skill copied; engine not scaffolded yet. Installed skill engine files under .agents are not an existing root-level site." };
  if (beforeScaffold) await beforeScaffold(inventory);
  if (source.setupMode !== "scaffold") return { setupMode: source.setupMode, scaffolded: false, copied: [], conflicts: [], inventory };
  const result = await scaffold(work, { source: join(inputs, "skill/engine") });
  if (result.conflicts.length) throw new Error(`Fixture conflicts with scaffold: ${result.conflicts.join(", ")}`);
  return { ...result, setupMode: source.setupMode, scaffolded: true, inventory };
}

function initialJourneyHashes(manifest) {
  return Object.fromEntries(Object.entries(manifest.hashes).flatMap(([path, digest]) =>
    path.startsWith("fixture/") ? [[path.slice(8), digest]] : path.startsWith("skill/") ? [[`.agents/skills/storyfolio/${path.slice(6)}`, digest]] : []));
}

function assertInitialJourneySnapshot(snapshot, manifest) {
  const expected = initialJourneyHashes(manifest);
  if (snapshot.schemaVersion !== 1 || !snapshot.files || json(Object.keys(snapshot.files).sort()) !== json(Object.keys(expected).sort()) || !Array.isArray(snapshot.excluded) || snapshot.excluded.length || !Array.isArray(snapshot.unexpected) || snapshot.unexpected.length) throw new Error("Unscaffolded snapshot must contain exactly frozen material, assets and skill, with no excluded or unexpected inputs");
  for (const [path, digest] of Object.entries(expected)) if (snapshot.files[path]?.type !== "file" || snapshot.files[path].hash !== digest) throw new Error(`Unscaffolded snapshot differs from frozen input: ${path}`);
}

/** Legacy probe semantics are unchanged. Only schema 3 claims environment readiness, not actor preflight. */
export async function verifyBuildSetupProbe({ source, manifest, setup, work }) {
  source = validateCase(source);
  const probe = JSON.parse(await regularBytes(setup, "probe.json"));
  if (probe.schemaVersion !== 1 || probe.passed !== true || probe.inputDigest !== manifest.digest || probe.capabilitySha256 !== manifest.hashes["capabilities.json"] || probe.work !== work || !Array.isArray(probe.evidence) || !probe.evidence.length) throw new Error("A passing saved capability probe for these exact inputs and workspace is required before paid execution");
  const journey = source.schemaVersion === 3;
  if (journey && (probe.scope !== "unscaffolded-environment" || probe.actorPreflight !== false || probe.modelCalls !== 0)) throw new Error("full-journey requires an unscaffolded-environment probe with actorPreflight: false and modelCalls: 0");
  if (journey && (!probe.evidenceHashes || Array.isArray(probe.evidenceHashes) || probe.evidence.length < 2 || new Set(probe.evidence).size !== probe.evidence.length || json(Object.keys(probe.evidenceHashes).sort()) !== json([...probe.evidence].sort()) || !probe.evidence.includes("snapshot/manifest.json"))) throw new Error("full-journey requires an exact hashed environment evidence inventory including snapshot/manifest.json");
  for (const path of probe.evidence) {
    const bytes = await regularBytes(setup, path);
    if (journey && (probe.evidenceHashes[path]?.sha256 !== hash(bytes) || probe.evidenceHashes[path]?.bytes !== bytes.length)) throw new Error(`Setup evidence changed: ${path}`);
  }
  if (journey) {
    const snapshot = JSON.parse(await regularBytes(setup, "snapshot/manifest.json"));
    assertInitialJourneySnapshot(snapshot, manifest);
    for (const [path, record] of Object.entries(snapshot.files)) {
      const bytes = await regularBytes(join(setup, "snapshot/files"), path);
      if (hash(bytes) !== record.hash || bytes.length !== record.size) throw new Error(`Unscaffolded snapshot copy changed: ${path}`);
    }
  }
  return probe;
}

/** Schema-3 gates bind live source. Unknown payloads are not copied; existing Git classification still reads bounded markers. */
async function verifyJourneySource(work, snapshot, { initial = false } = {}) {
  if (!(await lstat(work)).isDirectory()) throw new Error("full-journey workspace must be a nonsymlink directory");
  if (snapshot.schemaVersion !== 1 || !snapshot.files || Array.isArray(snapshot.files)) throw new Error("full-journey requires a saved source snapshot");
  const paths = Object.keys(snapshot.files).sort();
  for (const path of paths) {
    safePath(path);
    const record = snapshot.files[path];
    if (record?.type !== "file" || !/^[a-f0-9]{64}$/.test(record.hash) || !Number.isSafeInteger(record.size) || record.size < 0) throw new Error(`full-journey source binding requires regular hashed files: ${path}`);
  }
  // The initial root has never run an actor or scaffold. Later source uses
  // the existing generated-tree policy, with no broader Git exclusions.
  if (json((await fileTree(work, "", !initial)).sort()) !== json(paths)) throw new Error("Full-journey source inventory differs from approved snapshot; no turn was launched");
  for (const path of paths) {
    const bytes = await regularBytes(work, path), record = snapshot.files[path];
    if (hash(bytes) !== record.hash || bytes.length !== record.size) throw new Error(`Full-journey source changed after the approved snapshot: ${path}`);
  }
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
      if (await sourceEntryExcluded(work, path, entry)) { excluded.push(path); continue; }
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
  source = validateCase(source);
  positive(turn, "turn");
  if (turn > source.bounds.maxTurns) throw new Error("Turn limit reached");
  if (history.length !== turn - 1) throw new Error("Turns must be contiguous; existing turns are never overwritten");
  if (history.some(item => !item.complete)) throw new Error("Failed turn is preserved; choose a new repetition for an explicit retry");
  if (source.schemaVersion === 3 && history.some((item, index) => item.taskKind !== "full-journey" || item.requestedStop !== source.requestedStops[index] || item.sessionId !== history[0].sessionId)) throw new Error("full-journey history must preserve each actual requested stop in one conversation");
  const requireCached = source.bounds.maxUncachedTokens !== undefined;
  let elapsedMs = 0, inputTokens = 0, outputTokens = 0, cachedInputTokens = 0;
  const add = (sum, value) => {
    const total = sum + value;
    if (!Number.isSafeInteger(total)) throw new Error("Aggregate duration or usage exceeds reliable safe integer accounting");
    return total;
  };
  for (const item of history) {
    if (!Number.isSafeInteger(item.durationMs) || item.durationMs < 0 || !item.usage || ["input_tokens", "output_tokens"].some(key => !Number.isSafeInteger(item.usage[key]) || item.usage[key] < 0)) throw new Error("Previous turn lacks reliable duration or usage for the remaining budget");
    const cached = item.usage.cached_input_tokens;
    if ((requireCached || cached !== undefined) && (!Number.isSafeInteger(cached) || cached < 0 || cached > item.usage.input_tokens)) throw new Error("Previous turn lacks reliable cached-input accounting: require a nonnegative safe integer no greater than input_tokens");
    elapsedMs = add(elapsedMs, item.durationMs);
    inputTokens = add(inputTokens, item.usage.input_tokens);
    outputTokens = add(outputTokens, item.usage.output_tokens);
    cachedInputTokens = cachedInputTokens === null || cached === undefined ? null : add(cachedInputTokens, cached);
  }
  const tokens = add(inputTokens, outputTokens);
  const uncachedTokens = cachedInputTokens === null ? null : add(inputTokens - cachedInputTokens, outputTokens);
  if (elapsedMs >= source.bounds.maxWallMs) throw new Error("Cumulative actor wall budget exhausted");
  if (tokens >= source.bounds.maxTokens) throw new Error("Cumulative actor token ceiling reached");
  if (requireCached && uncachedTokens >= source.bounds.maxUncachedTokens) throw new Error("Cumulative actor uncached-input-plus-output ceiling reached");
  if (turn > 1) {
    const previous = history.at(-1);
    if (!previous.sessionId) throw new Error("Previous turn lacks a resumable session");
    if (!gate || gate.afterTurn !== turn - 1 || gate.advance !== true || gate.previousTurnDigest !== previous.digest || typeof gate.observation !== "string" || !gate.observation.trim()) throw new Error("Coordinator gate must identify and approve the observed previous turn");
  }
  return { sessionId: history.at(-1)?.sessionId ?? null, ...buildTaskIdentity(source, turn), timeoutMs: Math.min(source.bounds.turnTimeoutMs, source.bounds.maxWallMs - elapsedMs), elapsedMs, tokens, inputTokens, outputTokens, cachedInputTokens, uncachedTokens };
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

export async function executeBuildTurn({ out, work, inputs, source, capabilities, turn, gate, liftReportedCap = false, invoke = invokeBuildCodex }) {
  const manifest = await verifyInputs(inputs);
  const frozenSource = validateCase(JSON.parse(await regularBytes(inputs, "case.json")));
  if (json(validateCase(source)) !== json(frozenSource)) throw new Error("Actor case differs from frozen inputs");
  source = frozenSource;
  // An author decision may remove only the reported-token ceiling; time and uncached ceilings stay.
  if (liftReportedCap) source = { ...source, bounds: { ...source.bounds, maxTokens: Number.MAX_SAFE_INTEGER } };
  const history = await readTurnHistory(out);
  const limits = planTurn({ turn, source, history, gate });
  if (source.schemaVersion === 3) {
    const path = turn === 1 ? "setup/snapshot/manifest.json" : `turns/${String(turn - 1).padStart(2, "0")}/snapshot/manifest.json`;
    const snapshot = JSON.parse(await regularBytes(out, path));
    if (turn === 1) assertInitialJourneySnapshot(snapshot, manifest);
    else if (json(snapshot) !== json(history.at(-1).snapshot)) throw new Error("Previous source snapshot differs from the saved actor result");
    await verifyJourneySource(work, snapshot, { initial: turn === 1 });
  }
  const location = join(out, "turns", String(turn).padStart(2, "0"));
  await mkdir(join(out, "turns"), { recursive: true });
  await mkdir(location);
  const prompt = await regularBytes(inputs, `prompts/turn${turn}.md`);
  await writeNew(join(location, "prompt.md"), prompt);
  if (gate) await writeNew(join(location, "gate.json"), json(gate));
  await writeNew(join(location, "started.json"), json({ turn, started: new Date().toISOString(), ...limits, inputDigest: (await verifyInputs(inputs)).digest }));
  const result = { turn, ...buildTaskIdentity(source, turn), complete: false, durationMs: 0, sessionId: limits.sessionId, usage: null, artifacts: {},
    completionMeaning: "The actor turn completed. This is not a passed build, reached stop or author approval.",
    usageAggregation: "Raw turn.completed usage is preserved. Between turns, reported input_tokens plus output_tokens are summed across actor turns. If configured, maxUncachedTokens separately bounds input_tokens minus cached_input_tokens plus output_tokens; cached input must be a nonnegative safe integer no greater than input. Resumed counters may overlap. No dollar estimate or hard in-flight token cap is inferred." };
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
