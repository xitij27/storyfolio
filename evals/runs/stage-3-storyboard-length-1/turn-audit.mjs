// Read-only candidate-3 integrity audit after actual normal recorder/tool closure.
// --turn 1..6 --command REPO_RELATIVE_RECORD_DIRECTORY --terminal REPO_RELATIVE_BARE_TOOL_JSON
import assert from "node:assert/strict";
import { lstat, readdir, realpath } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { buildCodexArgs, DEFAULT_SNAPSHOT, hash, inspectBuildInputs, inspectWorkspace, json, planTurn, readTurnHistory, safePath, validateCase, verifyBuildSetupProbe, verifyInputs } from "../../lib/build.mjs";
import { finalCodexMessage, summariseCodex } from "../../lib/codex.mjs";
import { captureSource } from "../../lib/build-capture.mjs";
import { assertSupervisor, inventory, regularBytes } from "../stage-3-completion-2/full-journey-measurement/binding-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const cohort = "codex-full-journey-candidate-3", casePath = "evals/runs/stage-3-storyboard-length-1/case.json";
const inputs = join(root, "evals/runs", cohort, "inputs"), run = join(root, "evals/runs", cohort, "full-journey-1/baseline-1");
const inputDigest = "68c2bfd15305eb9b9fcb8114dbe64dd511d9a227627c8865833aad281f95ebeb";
const readJson = async (base, path) => JSON.parse(await regularBytes(base, path));
const sourceRows = files => Object.fromEntries(files.map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }]));
const evidencePath = path => { safePath(path); assert.ok(path.startsWith("evals/runs/")); return path; };

function accessTriage(stream) {
  const events = stream.trim().split("\n").filter(Boolean).map(line => JSON.parse(line)), items = new Map();
  for (const [index, event] of events.entries()) {
    if (event.item?.type !== "command_execution") continue;
    const item = event.item, id = item.id ?? `line-${index + 1}`;
    assert.equal(typeof item.command, "string");
    const record = items.get(id) ?? { id, command: item.command, lines: [], events: [], exitCode: null };
    assert.equal(record.command, item.command); record.lines.push(index + 1); record.events.push(event.type);
    if (Object.hasOwn(item, "exit_code")) record.exitCode = item.exit_code;
    items.set(id, record);
  }
  const commands = [...items.values()].map(item => ({ ...item, flags: [
    ...(item.command.includes(root) ? ["explicit-coordinator-repository-path"] : []),
    ...(/(?:^|[\s/'"])(?:evals\/(?:runs|builds)|full-journey-measurement|full-journey-recovery|stage-3-completion-2|stage-3-storyboard-length-1)(?:[\s/'"]|$)/.test(item.command) ? ["held-out-evaluation-or-study-reference"] : []),
    ...(/\.\.\//.test(item.command) ? ["parent-traversal-needs-context"] : []),
  ] }));
  return { commands, flaggedCommands: commands.filter(item => item.flags.length), incompleteCommands: commands.filter(item => !item.events.includes("item.completed")),
    limitation: "Literal command-text triage, not syscall tracing or a read jail. Flags need manual review. No flags do not prove absence of indirect, script-mediated, native-tool or network access. Configuration isolation is not filesystem isolation." };
}

export async function auditTurn({ turn, commandPath, terminalPath }) {
  assert.ok(Number.isInteger(turn) && turn >= 1 && turn <= 6);
  evidencePath(commandPath); evidencePath(terminalPath);
  // Normal outer closure is a prerequisite, never synthesized from a partial actor result.
  const directory = join(root, commandPath), outerBytes = await regularBytes(directory, "result.json"), outer = JSON.parse(outerBytes);
  const toolBytes = await regularBytes(root, terminalPath), tool = JSON.parse(toolBytes), raw = {};
  for (const name of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) {
    raw[name] = await regularBytes(directory, name); assert.equal(hash(raw[name]), outer.rawArtifacts?.[name], name);
  }
  const command = JSON.parse(raw["command.json"]), lifecycle = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
  assert.equal(assertSupervisor(outer, tool, command, lifecycle), directory);
  const outerStart = Date.parse(command.started), outerEnd = Date.parse(outer.finished);
  assert.ok(Number.isFinite(outerStart) && Number.isFinite(outerEnd) && outerEnd >= outerStart);
  assert.ok(Number.isSafeInteger(outer.durationMs) && outer.durationMs >= outerEnd - outerStart);
  for (const [index, event] of lifecycle.entries()) {
    assert.ok(Date.parse(event.at) >= (index ? Date.parse(lifecycle[index - 1].at) : outerStart) && Date.parse(event.at) <= outerEnd);
    assert.ok(Number.isSafeInteger(event.elapsedMs) && event.elapsedMs >= (index ? lifecycle[index - 1].elapsedMs : 0) && event.elapsedMs <= outer.durationMs);
  }

  const manifest = await verifyInputs(inputs); assert.equal(manifest.digest, inputDigest);
  assert.equal(Object.keys(manifest.hashes).length, 149); assert.equal(manifest.casePath, casePath);
  assert.deepEqual((await inventory(inputs)).map(file => file.path).sort(), ["manifest.json", ...Object.keys(manifest.hashes)].sort(), "Unknown frozen input file");
  for (const [path, digest] of Object.entries(manifest.hashes).filter(([path]) => path.startsWith("implementation/"))) assert.equal(hash(await regularBytes(root, path.slice("implementation/".length))), digest, `Coordinator implementation changed: ${path}`);
  const meta = await readJson(run, "meta.json"), source = validateCase(await readJson(inputs, "case.json")), capabilities = await readJson(inputs, "capabilities.json");
  assert.equal(meta.cohort, cohort); assert.equal(meta.caseId, "full-journey-1"); assert.equal(meta.rep, 1);
  assert.equal(meta.inputDigest, inputDigest); assert.equal(meta.inputs, inputs); assert.equal(meta.taskKind, "full-journey");
  assert.equal(meta.model, capabilities.model); assert.equal(meta.reasoningEffort, capabilities.reasoningEffort);
  assert.equal(meta.setupMode, "unscaffolded"); assert.deepEqual(meta.requestedStops, [1, 2, 3, 4, 5, 6]);
  assert.equal(source.schemaVersion, 3); assert.deepEqual(source.snapshot, { ...DEFAULT_SNAPSHOT, roots: [...DEFAULT_SNAPSHOT.roots, "site"] });
  assert.equal(await realpath(meta.work), meta.work);
  assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
  assert.equal((await inspectBuildInputs({ root, casePath, capabilities })).digest, inputDigest);
  await verifyBuildSetupProbe({ source, manifest, setup: join(run, "setup"), work: meta.work });
  assert.equal(command.cwd, root); assert.equal(command.executable, capabilities.node.executable);
  assert.equal(command.recorderSha256, manifest.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
  assert.deepEqual(command.environment, { ...capabilities.environment, TMPDIR: "/var/tmp/storyfolio-entry-runtime-20261012", NEXT_TELEMETRY_DISABLED: null });
  assert.equal(command.args[0], "evals/codex-build-run.mjs");
  const pairs = command.args.slice(1); assert.equal(pairs.length % 2, 0);
  const flags = Object.fromEntries(Array.from({ length: pairs.length / 2 }, (_, index) => [pairs[index * 2], pairs[index * 2 + 1]]));
  assert.equal(Object.keys(flags).length, pairs.length / 2);
  assert.deepEqual(Object.keys(flags).sort(), ["--case", "--cohort", "--capabilities", "--turn", ...(turn > 1 ? ["--gate"] : []), ...(Object.hasOwn(flags, "--rep") ? ["--rep"] : [])].sort());
  assert.equal(flags["--case"], casePath); assert.equal(flags["--cohort"], cohort); assert.equal(flags["--capabilities"], "evals/builds/local-capabilities.json");
  assert.equal(flags["--turn"], String(turn)); assert.equal(flags["--rep"] ?? "1", "1");
  const requested = await readJson(root, flags["--capabilities"]);
  for (const [key, value] of Object.entries(requested)) assert.deepEqual(value, capabilities[key]);

  const history = await readTurnHistory(run); assert.equal(history.length, turn, "Unknown, incomplete or later turn blocks this audit");
  const initial = await readJson(run, "setup/snapshot/manifest.json");
  assert.deepEqual(sourceRows(await inventory(join(run, "setup/snapshot/files"))), initial.files);
  const rows = [], totals = { durationMs: 0, reportedTokens: 0, uncachedTokens: 0 };
  let previous = initial;
  for (const [index, actor] of history.entries()) {
    const n = index + 1, relative = `turns/${String(n).padStart(2, "0")}`, location = join(run, relative);
    assert.equal(actor.turn, n); assert.equal(actor.requestedStop, n); assert.equal(actor.taskKind, "full-journey");
    assert.equal(actor.complete, true); assert.equal(actor.timedOut, false); assert.equal(actor.interruptedBy, null);
    assert.ok(!actor.error && !actor.captureError); assert.deepEqual(actor.errors, []);
    assert.equal(actor.sessionId, history[0].sessionId); assert.ok(actor.sessionId);
    assert.deepEqual((await inventory(location)).map(file => file.path).sort(), [...Object.keys(actor.artifacts), "result.json"].sort());
    for (const name of ["stream.jsonl", "reply.md", "process.json", "started.json", "prompt.md", "before/manifest.json", "snapshot/manifest.json"]) assert.match(actor.artifacts[name] ?? "", /^[a-f0-9]{64}$/);
    assert.deepEqual(await regularBytes(location, "prompt.md"), await regularBytes(inputs, `prompts/turn${n}.md`));
    const inner = await readJson(location, "process.json"), started = await readJson(location, "started.json"), gate = n > 1 ? await readJson(location, "gate.json") : null;
    const limits = planTurn({ turn: n, source, history: history.slice(0, index), gate });
    assert.equal(started.turn, n); assert.equal(started.inputDigest, inputDigest);
    for (const [key, value] of Object.entries(limits)) assert.deepEqual(started[key], value);
    assert.equal(inner.code, 0); assert.equal(inner.timedOut, false);
    for (const key of ["interruptedBy", "spawnError", "logError"]) assert.equal(inner[key], null);
    assert.equal(inner.durationMs, actor.durationMs); assert.ok(actor.durationMs <= limits.timeoutMs);
    assert.deepEqual(inner.args, buildCodexArgs({ model: capabilities.model, disabled: capabilities.disabledSkills, config: capabilities.config, profile: capabilities.profile, permissionProfile: capabilities.permissionProfile, removeConfig: capabilities.removeConfig, sessionId: limits.sessionId }));
    const stream = (await regularBytes(location, "stream.jsonl")).toString(), summary = summariseCodex(stream, inner.code), final = finalCodexMessage(stream, inner.code);
    assert.equal(summary.failed, false); assert.equal(summary.sessionId, actor.sessionId); assert.deepEqual(summary.usage, actor.usage); assert.deepEqual(summary.commands, actor.commands);
    assert.equal((await regularBytes(location, "reply.md")).toString(), summary.reply + "\n");
    const before = await readJson(location, "before/manifest.json"), snapshot = await readJson(location, "snapshot/manifest.json");
    assert.deepEqual(snapshot, actor.snapshot); assert.deepEqual(before.files, previous.files);
    for (const [name, value] of [["before", before], ["snapshot", snapshot]]) assert.deepEqual(sourceRows(await inventory(join(location, name, "files"))), value.files);
    for (const [path, value] of Object.entries(initial.files)) assert.deepEqual(snapshot.files[path], value, `Initial supplied input changed: ${path}`);
    for (const value of [actor.durationMs, actor.usage?.input_tokens, actor.usage?.cached_input_tokens, actor.usage?.output_tokens]) assert.ok(Number.isSafeInteger(value) && value >= 0);
    assert.ok(actor.usage.cached_input_tokens <= actor.usage.input_tokens);
    totals.durationMs += actor.durationMs; totals.reportedTokens += actor.usage.input_tokens + actor.usage.output_tokens;
    totals.uncachedTokens += actor.usage.input_tokens - actor.usage.cached_input_tokens + actor.usage.output_tokens;
    rows.push({ turn: n, resultSha256: actor.digest, artifacts: Object.keys(actor.artifacts).length, snapshotFiles: Object.keys(snapshot.files).length, usage: actor.usage, durationMs: actor.durationMs });
    if (n === turn) {
      assert.ok(Date.parse(started.started) >= outerStart && Date.parse(started.started) <= outerEnd && actor.durationMs <= outer.durationMs);
      if (gate) {
        evidencePath(flags["--gate"]); const gateBytes = await regularBytes(root, flags["--gate"]);
        assert.deepEqual(JSON.parse(gateBytes), gate, "Invoked gate differs from the runner's saved gate");
        rows[index].invokedGate = { path: flags["--gate"], sha256: hash(gateBytes), savedSha256: actor.artifacts["gate.json"] };
      }
      rows[index].terminal = { text: final, sha256: hash(final) }; rows[index].accessTriage = accessTriage(stream);
    }
    previous = snapshot;
  }
  const actor = history.at(-1), printed = JSON.parse(raw["stdout.log"]);
  for (const key of ["complete", "turn", "taskKind", "requestedStop", "sessionId", "durationMs", "usage"]) assert.deepEqual(printed[key], actor[key]);
  assert.equal(printed.error, null); assert.equal(printed.result, join(run, "turns", String(turn).padStart(2, "0"), "result.json"));
  const observed = await inspectWorkspace(meta.work, source.snapshot), full = await captureSource(meta.work);
  assert.deepEqual(Object.fromEntries(Object.entries(observed.entries).map(([path, { bytes, ...value }]) => [path, value])), previous.files);
  assert.deepEqual(observed.excluded, previous.excluded); assert.deepEqual(observed.unexpected, previous.unexpected);
  assert.deepEqual(sourceRows(full.files), previous.files, "Complete live source includes omitted or changed snapshot files");
  for (const item of observed.unexpected) {
    safePath(item.path); assert.equal(item.type, "directory");
    const path = join(meta.work, item.path), stat = await lstat(path);
    assert.ok(stat.isDirectory() && !stat.isSymbolicLink()); assert.deepEqual(await readdir(path), [], `Unknown nonempty source: ${item.path}`);
  }
  assert.ok(Object.values(totals).every(Number.isSafeInteger));
  const boundsExceeded = totals.durationMs > source.bounds.maxWallMs || totals.reportedTokens > source.bounds.maxTokens || totals.uncachedTokens > source.bounds.maxUncachedTokens;
  return { schemaVersion: 1, integrityVerified: true, cohort, turn, inputDigest, frozenInputs: 149,
    normalOuterClosure: true, outerDurationMs: outer.durationMs, outerFinished: outer.finished,
    sourceFiles: full.files.length, sourceDigest: full.digest, fullLiveSourceEqualsSnapshot: true,
    applicationFilesUnderSite: full.files.filter(file => file.path.startsWith("site/")).length,
    exclusions: previous.excluded, emptyUnexpectedDirectories: observed.unexpected,
    history: rows, totals, bounds: source.bounds, boundsExceeded,
    hashes: { audit: hash(await regularBytes(root, "evals/runs/stage-3-storyboard-length-1/turn-audit.mjs")), terminalTool: hash(toolBytes), outerResult: hash(outerBytes), outerCommand: outer.rawArtifacts["command.json"], latestResult: actor.digest },
    manualAccessReviewRequired: true, behavioralGate: "Not assessed; no next turn, application eligibility or final acceptance is authorized.",
    limits: "Normal process/source/prompt/session/usage integrity only. Command flags are triage, not a read-jail proof. Prior outer process audits remain separately retained; this invocation binds the selected turn's outer supervisor. Resume token totals may overlap and are not dollar or in-flight spending guarantees. Source exclusions stay unchanged. No runtime, model, browser, test or subprocess was launched by this audit.", modelCalls: 0, writes: false };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    assert.equal(process.argv.length, 8, "Supply exactly --turn N --command PATH --terminal PATH");
    const { values } = parseArgs({ options: { turn: { type: "string" }, command: { type: "string" }, terminal: { type: "string" } } });
    assert.match(values.turn ?? "", /^[1-6]$/);
    const result = await auditTurn({ turn: Number(values.turn), commandPath: values.command, terminalPath: values.terminal });
    process.stdout.write(json(result)); process.exitCode = result.boundsExceeded ? 1 : 0;
  } catch (error) { process.stdout.write(json({ schemaVersion: 1, integrityVerified: false, error: String(error), modelCalls: 0, writes: false })); process.exitCode = 1; }
}
