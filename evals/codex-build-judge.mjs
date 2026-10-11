#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { lstat, mkdir, readFile, readdir } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { codexArgs, disabledSkills, EFFORT, JUDGE_MODEL, summariseCodex } from "./lib/codex.mjs";
import { buildTaskIdentity, hash, json, readTurnHistory, regularBytes, safeId, safePath, validateCase, verifyInputs, writeNew } from "./lib/build.mjs";
import { buildJudgementSchema, buildCriterionEligibility, buildScoreCounts, renderBuildJudgePrompt, validateBuildJudgement } from "./lib/build-score.mjs";
import { SOURCE_EXCLUSIONS, sourcePathExcluded } from "./lib/build-capture.mjs";

export const JUDGE_TIMEOUT_MS = 600000;
export const JUDGE_IMPLEMENTATION_FILES = [
  "evals/codex-build-judge.mjs", "evals/lib/build-score.mjs", "evals/lib/build-capture.mjs",
  "evals/prompts/build-criteria.md", "evals/prompts/judge-build.md",
];
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const decode = bytes => { try { return new TextDecoder("utf-8", { fatal: true }).decode(bytes).includes("\0") ? null : new TextDecoder("utf-8", { fatal: true }).decode(bytes); } catch { return null; } };
const same = (left, right) => json(left) === json(right);

/** A report of different or incompletely saved source is not actor evidence. */
function verifyAcceptanceSource(report, finalSource) {
  if (report.taskKind !== "prototype-depth" || report.sourceUnchanged !== true || !finalSource) throw new Error("Acceptance source identity or unchanged-source evidence is missing");
  const entries = Object.entries(finalSource).filter(([path]) => !sourcePathExcluded(path));
  if (entries.some(([, entry]) => entry.type !== "file")) throw new Error("Acceptance source includes non-file saved source");
  const expected = Object.fromEntries(entries.map(([path, entry]) => [path, { bytes: entry.size, sha256: entry.hash }]));
  for (const key of ["sourceBefore", "sourceAfter"]) {
    const record = report[key];
    if (!record || !Array.isArray(record.files) || record.digest !== hash(JSON.stringify(record.files)) || !same(record.exclusions, SOURCE_EXCLUSIONS)) throw new Error(`Acceptance source record is missing, corrupt or changes exclusions: ${key}`);
    const actual = {};
    for (const file of record.files) {
      safePath(file.path);
      if (Object.hasOwn(actual, file.path) || sourcePathExcluded(file.path)) throw new Error(`Acceptance source has duplicate or excluded file: ${file.path}`);
      actual[file.path] = { bytes: file.bytes, sha256: file.sha256 };
    }
    if (!same(Object.keys(actual).sort(), Object.keys(expected).sort()) || Object.keys(expected).some(path => !same(actual[path], expected[path]))) throw new Error(`Acceptance source differs from the final saved actor snapshot: ${key}`);
  }
  if (report.sourceBefore.digest !== report.sourceAfter.digest) throw new Error("Acceptance source changed during measurement");
}

async function filePaths(directory, prefix = "") {
  const result = [];
  for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) result.push(...await filePaths(directory, name));
    else if (entry.isFile()) result.push(name);
    else throw new Error(`Non-file saved artifact: ${name}`);
  }
  return result;
}

function runIdentity(run) {
  safePath(run);
  const parts = run.split("/");
  if (parts.length !== 5 || parts[0] !== "evals" || parts[1] !== "runs" || !/^baseline-[1-9]\d*$/.test(parts[4])) throw new Error("--run must be evals/runs/<cohort>/<case>/baseline-<number>");
  safeId(parts[2]); safeId(parts[3]);
  return { cohort: parts[2], caseId: parts[3], rep: Number(parts[4].slice(9)), inputsRelative: `evals/runs/${parts[2]}/inputs` };
}

/** Reads and verifies only saved inputs/artifacts. Never invokes a model. */
export async function prepareBuildJudge({ root = ROOT, run, acceptance = null, maxPromptBytes } = {}) {
  const identity = runIdentity(run), out = join(root, run), inputs = join(root, identity.inputsRelative);
  const metaBytes = await regularBytes(root, `${run}/meta.json`), meta = JSON.parse(metaBytes);
  await regularBytes(root, `${identity.inputsRelative}/manifest.json`);
  const frozen = await verifyInputs(inputs);
  if (meta.runner !== "codex-build" || meta.caseId !== identity.caseId || meta.cohort !== identity.cohort || meta.rep !== identity.rep || meta.inputDigest !== frozen.digest || meta.inputs !== inputs) throw new Error("Saved build run identity or frozen-input digest differs");
  const source = validateCase(JSON.parse(await regularBytes(inputs, "case.json")));
  if (source.id !== identity.caseId) throw new Error("Case ID differs from run");
  const diagnostic = source.taskKind === "prototype-depth";
  if (meta.taskKind !== source.taskKind || (diagnostic && Object.hasOwn(meta, "requestedStops"))) throw new Error("Saved run task identity differs from frozen case");
  for (const path of JUDGE_IMPLEMENTATION_FILES.map(path => diagnostic && path === "evals/prompts/build-criteria.md" ? source.rubric : path)) if (!frozen.hashes[`implementation/${path}`]) throw new Error(`Judge implementation was not frozen before the actor: ${path}`);
  for (const [path, digest] of Object.entries(frozen.hashes)) {
    if (path.startsWith("implementation/") && hash(await regularBytes(root, path.slice(15))) !== digest) throw new Error(`Current implementation differs from frozen cohort: ${path}`);
  }
  const rubricPath = diagnostic ? source.rubric : "evals/prompts/build-criteria.md";
  if (frozen.hashes["rubric.md"] !== frozen.hashes[`implementation/${rubricPath}`]) throw new Error("Frozen judge rubric differs from case rubric");
  const setup = JSON.parse(await regularBytes(out, "setup/result.json"));
  if (!setup.complete) throw new Error("No actor judgement for a failed preparation");
  const history = await readTurnHistory(out);
  if (!history.length || history.length > Math.min(3, source.bounds.maxTurns)) throw new Error("A saved one-to-three-turn actor attempt is required");
  const requestedStops = diagnostic ? undefined : source.requestedStops.slice(0, history.length);
  const refusalTurns = source.refusalTurns.filter(turn => turn <= history.length);
  const criterionEligibility = buildCriterionEligibility({ turnCount: history.length, taskKind: source.taskKind, requestedStops, refusalTurns });
  const documents = [], evidence = {}, artifacts = {}, omitted = [];
  const add = (path, bytes, selection) => {
    const text = decode(bytes);
    artifacts[path] = { sha256: hash(bytes), bytes: bytes.length };
    if (text === null) { omitted.push({ path, ...artifacts[path], reason: "Binary content, no image pixels supplied" }); return; }
    evidence[path] = selection?.text ?? text;
    documents.push({ path, ...artifacts[path], ...(selection ? { selection: selection.description } : {}), text: evidence[path] });
  };
  const keep = async (base, path, prefix) => { const bytes = await regularBytes(base, path); add(`${prefix}/${path}`, bytes); return bytes; };
  const record = async (base, path, prefix) => { const bytes = await regularBytes(base, path); artifacts[`${prefix}/${path}`] = { sha256: hash(bytes), bytes: bytes.length }; return bytes; };
  add("run/meta.json", metaBytes);
  await keep(out, "setup/pre-scaffold-inventory.json", "run");
  for (const name of ["capabilities.json", "expectations.json", "protocol.md"]) await keep(inputs, name, "inputs");
  for (const path of Object.keys(frozen.hashes).filter(path => path.startsWith("fixture/")).sort()) await keep(inputs, path, "inputs");

  async function snapshot(prefix) {
    const bytes = await keep(out, `${prefix}/manifest.json`, "run"), manifest = JSON.parse(bytes);
    if (manifest.schemaVersion !== 1 || !manifest.files || !Array.isArray(manifest.changes)) throw new Error(`Invalid snapshot manifest: ${prefix}`);
    const expectedFiles = [];
    for (const [path, entry] of Object.entries(manifest.files)) {
      safePath(path);
      if (entry.type !== "file") continue;
      const bytes = await regularBytes(out, `${prefix}/files/${path}`);
      if (hash(bytes) !== entry.hash || bytes.length !== entry.size) throw new Error(`Source snapshot changed: ${prefix}/${path}`);
      artifacts[`run/${prefix}/files/${path}`] = { sha256: entry.hash, bytes: entry.size };
      expectedFiles.push(`files/${path}`);
    }
    const actualFiles = await filePaths(join(out, prefix));
    if (!same(actualFiles.sort(), ["manifest.json", ...expectedFiles].sort())) throw new Error(`Snapshot file set changed: ${prefix}`);
    return manifest;
  }
  await snapshot("setup/snapshot");
  const turns = [];
  for (const [index, result] of history.entries()) {
    const prefix = `turns/${String(index + 1).padStart(2, "0")}`;
    if (result.turn !== index + 1) throw new Error(`Saved turn ordinal differs: ${prefix}`);
    if (result.taskKind !== source.taskKind || (diagnostic && Object.hasOwn(result, "requestedStop"))) throw new Error(`Saved result task identity differs from frozen case: ${prefix}`);
    if (!diagnostic && result.requestedStop !== undefined && result.requestedStop !== requestedStops[index]) throw new Error(`Saved result requested stop differs from frozen case: ${prefix}`);
    const actual = (await filePaths(join(out, prefix))).filter(path => path !== "result.json").sort();
    if (!same(actual, Object.keys(result.artifacts ?? {}).sort())) throw new Error(`Saved turn file set changed: ${prefix}`);
    const prompt = await keep(out, `${prefix}/prompt.md`, "run");
    if (hash(prompt) !== frozen.hashes[`prompts/turn${index + 1}.md`]) throw new Error(`Actor prompt differs from frozen turn: ${prefix}`);
    const processBytes = await keep(out, `${prefix}/process.json`, "run"), process = JSON.parse(processBytes);
    const stream = await regularBytes(out, `${prefix}/stream.jsonl`), raw = decode(stream);
    if (raw === null) throw new Error(`Non-text actor stream: ${prefix}`);
    const summary = summariseCodex(raw, process.code);
    const reply = await keep(out, `${prefix}/reply.md`, "run");
    if (reply.toString("utf8") !== `${summary.reply}\n` || (result.complete && summary.failed) || (result.commands && !same(result.commands, summary.commands)) || (result.usage && !same(result.usage, summary.usage))) throw new Error(`Actor summary differs from preserved stream: ${prefix}`);
    let nonJsonLines = 0;
    const toolLines = raw.split("\n").filter(line => {
      if (!line.trim()) return false;
      try { const event = JSON.parse(line); return !["agent_message", "reasoning"].includes(event.item?.type); }
      catch { nonJsonLines++; return true; }
    });
    add(`run/${prefix}/stream.jsonl`, stream, { text: toolLines.join("\n"), description: "Tool/lifecycle/error events emitted in the saved exec JSONL and non-JSON lines, including started attempts; agent-message text is supplied in reply.md and reasoning items are omitted. The CLI stream can omit image-view calls and returned image blocks." });
    await keep(out, `${prefix}/stderr.log`, "run");
    await record(out, `${prefix}/result.json`, "run");
    const started = JSON.parse(await keep(out, `${prefix}/started.json`, "run"));
    if (started.turn !== index + 1 || started.inputDigest !== frozen.digest) throw new Error(`Started turn is bound to different inputs: ${prefix}`);
    if (started.taskKind !== source.taskKind || (diagnostic && Object.hasOwn(started, "requestedStop"))) throw new Error(`Started task identity differs from frozen case: ${prefix}`);
    if (!diagnostic && started.requestedStop !== undefined && started.requestedStop !== requestedStops[index]) throw new Error(`Started requested stop differs from frozen case: ${prefix}`);
    if (index > 0) {
      const gate = JSON.parse(await keep(out, `${prefix}/gate.json`, "run"));
      if (gate.afterTurn !== index || gate.advance !== true || gate.previousTurnDigest !== history[index - 1].digest) throw new Error(`Saved gate does not bind the prior turn: ${prefix}`);
    }
    const before = await snapshot(`${prefix}/before`);
    let after = null;
    if (result.snapshot) {
      after = await snapshot(`${prefix}/snapshot`);
      if (!same(after, result.snapshot)) throw new Error(`Result embeds a different source snapshot: ${prefix}`);
    } else if (diagnostic || !result.captureError) throw new Error(`Missing after-turn source${diagnostic ? " blocks prototype-depth judging" : " without a capture error"}: ${prefix}`);
    const changes = [];
    if (after) for (const path of [...new Set([...Object.keys(before.files), ...Object.keys(after.files)])].sort()) {
      if (same(before.files[path], after.files[path])) continue;
      const entry = after.files[path];
      changes.push({ path, change: !before.files[path] ? "added" : !entry ? "deleted" : "modified", before: before.files[path] ?? null, after: entry ?? null });
      if (entry?.type === "file") await keep(out, `${prefix}/snapshot/files/${path}`, "run");
      else omitted.push({ path: `run/${prefix}/snapshot/files/${path}`, reason: entry ? `Non-file source: ${entry.type}` : "Deleted source; no after content" });
    }
    turns.push({ turn: index + 1, ...buildTaskIdentity(source, index + 1), fixedSkillRefusal: refusalTurns.includes(index + 1), complete: result.complete, durationMs: result.durationMs, usage: result.usage, timedOut: result.timedOut ?? false, error: result.error ?? null, captureError: result.captureError ?? null, nonJsonLines, changes,
      note: "Source changes are relative to the actual before-turn snapshot. A complete model turn is not a completed task, stop or approval. Unchanged fixture source appears under inputs/fixture; unchanged engine bodies and screenshot pixels are omitted." });
  }

  let automaticAcceptance = { supplied: false, reason: "No independent acceptance manifest supplied; no automatic pass is inferred." };
  if (acceptance) {
    safePath(acceptance);
    const bytes = await keep(out, acceptance, "run"), report = JSON.parse(bytes), base = dirname(acceptance);
    const expected = JSON.parse(await regularBytes(inputs, "expectations.json"));
    if (report.schemaVersion !== 1 || report.fixture !== source.id || report.workspace !== meta.work || !same(report.expected, expected)) throw new Error("Acceptance report identity/expectations differ from this run");
    if (diagnostic) verifyAcceptanceSource(report, history.at(-1).snapshot?.files);
    if (!report.artifacts || !Object.keys(report.artifacts).length) throw new Error("Acceptance report needs preserved artifact hashes before judging");
    if (diagnostic && !same((await filePaths(join(out, base))).sort(), [basename(acceptance), ...Object.keys(report.artifacts)].sort())) throw new Error("Acceptance artifact file set changed or is incomplete");
    for (const [path, expectedHash] of Object.entries(report.artifacts)) {
      const bytes = await regularBytes(out, `${base}/${safePath(path)}`);
      if (hash(bytes) !== expectedHash) throw new Error(`Acceptance artifact changed: ${path}`);
      if (diagnostic || path.endsWith("report.json")) add(`run/${base}/${path}`, bytes);
      else artifacts[`run/${base}/${path}`] = { sha256: expectedHash, bytes: bytes.length };
    }
    for (const result of report.results ?? []) {
      if (!report.artifacts[safePath(result.report)]) throw new Error(`Acceptance result lacks preserved report: ${result.report}`);
      if (diagnostic && JSON.parse(evidence[`run/${base}/${result.report}`]).sourceDigest !== report.sourceBefore.digest) throw new Error(`Acceptance source digest differs in mode report: ${result.report}`);
    }
    for (const path of ["evals/check-build.mjs", "evals/lib/build-check.mjs", "evals/lib/build-capture.mjs"]) {
      const digest = frozen.hashes[`implementation/${path}`];
      if (!digest || !Object.values(report.frozen ?? {}).includes(digest)) throw new Error(`Acceptance checker differs from frozen implementation: ${path}`);
    }
    if (!Object.values(report.frozen ?? {}).includes(frozen.hashes["expectations.json"])) throw new Error("Acceptance expectation bytes differ from frozen input");
    const finalSource = history.at(-1).snapshot?.files;
    for (const file of report.files ?? []) {
      if (file.path && file.sha256 && finalSource?.[file.path]?.type === "file" && finalSource[file.path].hash !== file.sha256) throw new Error(`Acceptance observed a different saved source asset: ${file.path}`);
    }
    automaticAcceptance = { supplied: true, path: `run/${acceptance}`, complete: report.complete, passed: report.passed, error: report.error ?? null, results: report.results, note: "Recorded automatic results remain independent and are not overwritten by the judge. No screenshot pixels are included." };
  }
  const packet = { schemaVersion: diagnostic ? 2 : 1, question: diagnostic ? "One five-beat, one-appearance prototype-depth diagnostic from approved fictional meanings, not any journey stop or a pixel-quality judgement" : "Bounded build from approved fictional input at the explicitly requested stops; no scene redesign task", inputDigest: frozen.digest,
    turnCount: history.length, ...(diagnostic ? { taskKind: source.taskKind } : { requestedStops }), refusalTurns, criterionEligibility, sourcePacketAvailable: false, fullJourney: false,
    observationScope: diagnostic ? "This one-turn prototype diagnostic requests no journey stops. Build-start preflight can be observed, not before-stop-1 timing. Storyboard means preserving supplied meanings, not credit for discovering or approving them. Opening refusal does not test recommendation-then-refusal continuation. Failed or incomplete artifacts can supply behavioral evidence when the saved evidence is complete. False eligibility must be unobserved; true eligibility still needs actual evidence. Pixel quality and real author approval are not supplied." : "Requested stops identify observed attempts, not successful gates. Failed or incomplete attempts can provide evidence. Inherited earlier work and an externally selected look do not establish that this actor performed earlier stops. False criterionEligibility entries must be unobserved; true entries still require actual evidence and opportunity. Refusal metadata identifies fixed prompts, not proof of a relevant prior recommendation or successful continuation.",
    initialSource: { setupMode: source.setupMode ?? "scaffold", paths: Object.keys(frozen.hashes).filter(path => path.startsWith("fixture/")).map(path => `inputs/${path}`).sort(), note: "All supplied fixture text bodies, including existing-site seed source, appear in the packet. They are inherited input, not newly authored work. Unchanged engine bodies outside the fixture are represented by hashes only." },
    limitations: ["No third-party installation-source packet is supplied; source/command verification is unobserved.", "No screenshot pixels or real phone evidence is supplied.", "All fixture text and changed source bodies are included. Other unchanged source is represented by hashes. Inherited fixture source must not be credited as newly authored actor work.", "Tool events emitted by exec JSONL are included, but the CLI can omit image-view calls and returned image blocks. Their absence does not establish that screenshot review was skipped or a review claim was unsupported. Without supplemental proof, the visual-review observation is unobserved; do not infer pixel quality.", "Subprocess file reads may not be individually logged; configuration isolation is not a read jail.", "Baseline-only input is not arm-blinded. Report further unblinding cues."],
    turns, automaticAcceptance, omitted, documents };
  const template = (await regularBytes(inputs, "implementation/evals/prompts/judge-build.md")).toString("utf8");
  const rubric = (await regularBytes(inputs, "rubric.md")).toString("utf8");
  const prompt = renderBuildJudgePrompt(template, rubric, packet, maxPromptBytes);
  return { root, out, inputs, meta, frozen, prompt, packet, evidence, artifacts, identity, promptSha256: hash(prompt), promptBytes: Buffer.byteLength(prompt) };
}

/** Same isolated codexArgs helper, one fresh judge process, no retries. */
export function invokeBuildJudge({ cwd, prompt, schema, streamPath, stderrPath, disabled = [], executable = "codex", spawnProcess = spawn, timeoutMs = JUDGE_TIMEOUT_MS, terminateGraceMs = 2000 }) {
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > JUDGE_TIMEOUT_MS || !Number.isSafeInteger(terminateGraceMs) || terminateGraceMs < 0 || terminateGraceMs >= timeoutMs) throw new Error("Invalid judge deadline");
  const args = codexArgs({ judge: true, model: JUDGE_MODEL, schema, disabled });
  return new Promise(resolve => {
    const started = Date.now(), output = createWriteStream(streamPath, { flags: "wx" }), errors = createWriteStream(stderrPath, { flags: "wx" });
    const child = spawnProcess(executable, args, { cwd, detached: process.platform !== "win32", stdio: ["pipe", "pipe", "pipe"] });
    child.stdout.setEncoding?.("utf8"); child.stderr.setEncoding?.("utf8");
    let stdout = "", stderr = "", timedOut = false, interruptedBy = null, spawnError = null, interruptTimer;
    const kill = signal => { try { if (process.platform === "win32") child.kill(signal); else process.kill(-child.pid, signal); } catch {} };
    const interrupt = signal => {
      if (interruptedBy) { kill("SIGKILL"); return; }
      interruptedBy = signal; kill("SIGTERM");
      interruptTimer = setTimeout(() => kill("SIGKILL"), terminateGraceMs);
    };
    const onInterrupt = () => interrupt("SIGINT"), onTerminate = () => interrupt("SIGTERM");
    process.on("SIGINT", onInterrupt); process.on("SIGTERM", onTerminate);
    const terminateTimer = setTimeout(() => { timedOut = true; kill("SIGTERM"); }, timeoutMs - terminateGraceMs);
    const forceTimer = setTimeout(() => { timedOut = true; kill("SIGKILL"); }, timeoutMs);
    child.stdout.on("data", bytes => { stdout += bytes; output.write(bytes); });
    child.stderr.on("data", bytes => { stderr += bytes; errors.write(bytes); });
    child.on("error", error => { spawnError = String(error); });
    child.on("close", async code => {
      clearTimeout(terminateTimer); clearTimeout(forceTimer); clearTimeout(interruptTimer);
      if (timedOut || interruptedBy) kill("SIGKILL");
      process.removeListener("SIGINT", onInterrupt); process.removeListener("SIGTERM", onTerminate);
      await Promise.all([new Promise(done => output.end(done)), new Promise(done => errors.end(done))]);
      resolve({ stdout, stderr, code: timedOut || interruptedBy || spawnError ? -1 : code, durationMs: Date.now() - started, args, timedOut, interruptedBy, spawnError });
    });
    child.stdin.on("error", () => {}); child.stdin.end(prompt);
  });
}

export async function runBuildJudge(prepared, { invoke = invokeBuildJudge, disabled = [], cli = null } = {}) {
  const currentInputs = await verifyInputs(prepared.inputs);
  if (currentInputs.digest !== prepared.frozen.digest || hash(prepared.prompt) !== prepared.promptSha256) throw new Error("Judge inputs changed after preparation");
  for (const [path, entry] of Object.entries(prepared.artifacts)) {
    const [prefix, ...parts] = path.split("/");
    const base = prefix === "run" ? prepared.out : prefix === "inputs" ? prepared.inputs : null;
    if (!base || hash(await regularBytes(base, parts.join("/"))) !== entry.sha256) throw new Error(`Judge evidence changed after preparation: ${path}`);
  }
  for (const [path, digest] of Object.entries(currentInputs.hashes)) if (path.startsWith("implementation/") && hash(await regularBytes(prepared.root, path.slice(15))) !== digest) throw new Error(`Judge implementation changed after preparation: ${path}`);
  const directory = join(prepared.out, "judge");
  await mkdir(directory); // Atomic refusal of any existing attempt, including a failed one.
  await mkdir(join(directory, "workspace"));
  const inputManifest = { schemaVersion: 1, run: prepared.identity, inputDigest: prepared.frozen.digest, promptSha256: prepared.promptSha256, promptBytes: prepared.promptBytes, artifacts: prepared.artifacts,
    limits: prepared.packet.limitations, model: JUDGE_MODEL, reasoningEffort: EFFORT, timeoutMs: JUDGE_TIMEOUT_MS, cli, disabledSkills: disabled };
  await writeNew(join(directory, "input-manifest.json"), json(inputManifest));
  await writeNew(join(directory, "prompt.md"), prepared.prompt);
  await writeNew(join(directory, "schema.json"), json(buildJudgementSchema(prepared.packet.taskKind)));
  await writeNew(join(directory, "started.json"), json({ started: new Date().toISOString(), model: JUDGE_MODEL, reasoningEffort: EFFORT, timeoutMs: JUDGE_TIMEOUT_MS, freshSession: true }));
  const result = { schemaVersion: 1, complete: false, modelCalls: 1, model: JUDGE_MODEL, reasoningEffort: EFFORT, costUsd: null, usage: null, durationMs: null, counts: null };
  try {
    const response = await invoke({ cwd: join(directory, "workspace"), prompt: prepared.prompt, schema: join(directory, "schema.json"), streamPath: join(directory, "stream.jsonl"), stderrPath: join(directory, "stderr.log"), disabled, executable: cli?.executable ?? "codex", timeoutMs: JUDGE_TIMEOUT_MS });
    await writeNew(join(directory, "process.json"), json({ ...response, stdout: undefined, stderr: undefined }));
    const turn = summariseCodex(response.stdout, response.code);
    Object.assign(result, { usage: turn.usage, durationMs: response.durationMs, sessionId: turn.sessionId, timedOut: response.timedOut ?? false, interruptedBy: response.interruptedBy ?? null });
    await writeNew(join(directory, "reply.md"), turn.reply + "\n");
    if (turn.failed || !turn.sessionId) throw new Error(`Judge did not complete a fresh session: ${json(turn.error)}`);
    const judgement = JSON.parse(turn.reply);
    const problems = validateBuildJudgement(judgement, { turnCount: prepared.packet.turnCount, taskKind: prepared.packet.taskKind, requestedStops: prepared.packet.requestedStops, refusalTurns: prepared.packet.refusalTurns, evidence: prepared.evidence, sourcePacketAvailable: false });
    if (problems.length) throw new Error(`Invalid judgement: ${problems.join("; ")}`);
    await writeNew(join(directory, "judgement.json"), json({ schemaVersion: 1, judge: JUDGE_MODEL, reasoningEffort: EFFORT, usage: turn.usage, durationMs: response.durationMs, costUsd: null, inputDigest: prepared.frozen.digest, judgement }));
    result.complete = true; result.counts = buildScoreCounts(judgement);
  } catch (error) {
    result.error = String(error);
    await writeNew(join(directory, "error.json"), json({ error: String(error), retry: "No automatic retry; this attempt remains preserved." }));
  }
  result.artifacts = {};
  for (const path of await filePaths(directory)) result.artifacts[path] = hash(await regularBytes(directory, path));
  await writeNew(join(directory, "result.json"), json(result));
  return result;
}

async function main() {
  const { values: args } = parseArgs({ options: { run: { type: "string" }, acceptance: { type: "string" }, dry: { type: "boolean", default: false }, help: { type: "boolean", default: false } } });
  if (args.help) { console.log("Usage: node evals/codex-build-judge.mjs --run evals/runs/<cohort>/<case>/baseline-1 [--acceptance checks/manifest.json] [--dry]\nOne fresh gpt-6-astra medium judgement; ten-minute deadline. --dry verifies and assembles only, with no writes or model call. Existing judge attempts are never overwritten or retried."); return; }
  const prepared = await prepareBuildJudge({ run: args.run, acceptance: args.acceptance });
  const existing = await lstat(join(prepared.out, "judge")).catch(error => { if (error.code === "ENOENT") return null; throw error; });
  if (existing) throw new Error("A judge attempt already exists; no overwrite, retry or selective rejudging");
  if (args.dry) { console.log(json({ run: args.run, inputDigest: prepared.frozen.digest, promptSha256: prepared.promptSha256, promptBytes: prepared.promptBytes, turns: prepared.packet.turnCount, automaticAcceptanceSupplied: prepared.packet.automaticAcceptance.supplied, model: JUDGE_MODEL, reasoningEffort: EFFORT, writes: false, modelCalls: 0 })); return; }
  const capabilities = JSON.parse(await regularBytes(prepared.inputs, "capabilities.json"));
  if (!capabilities.cliExecutable || !capabilities.cliSha256 || hash(await readFile(capabilities.cliExecutable)) !== capabilities.cliSha256) throw new Error("Judge CLI binary differs from the frozen actor capability record");
  const disabled = await disabledSkills();
  const result = await runBuildJudge(prepared, { disabled, cli: { executable: capabilities.cliExecutable, sha256: capabilities.cliSha256, version: capabilities.cliVersion } });
  console.log(json({ run: args.run, result: join(prepared.out, "judge/result.json"), ...result, artifacts: undefined }));
  if (!result.complete) process.exitCode = 1;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
