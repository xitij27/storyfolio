// Read-only post-closure audit. No launch, repair, retry, source write or gate decision.
import assert from "node:assert/strict";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadAmendment, root, hash, json, regularBytes, safePath } from "../measurement/amendment-lib.mjs";
import { readContinuationHistory, assertLiveSource } from "../runner/execution-core.mjs";
import { assertSupervisor } from "../../full-journey-measurement/binding-lib.mjs";
import { validateCase } from "../../../../lib/build.mjs";

const prefix = "evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2";
const amendmentSha256 = "17ec3ed49281be699d525513d075c46ebc37706bf020281ca528e23f4e4f8180";
const gateSha256 = "42e0ac90e8fc816a643ea3024c826f8b565a1acfe7010e2e7528079ce0480027";
const read = async path => regularBytes(root, path);
const readJson = async path => JSON.parse(await read(path));

export function inspectCommandAccess(stream, repositoryRoot) {
  const commands = new Map();
  const rows = stream.trim().split("\n").filter(Boolean).map(line => JSON.parse(line));
  for (const [index, row] of rows.entries()) {
    const item = row.item;
    if (item?.type !== "command_execution") continue;
    assert.equal(typeof item.command, "string");
    const id = item.id ?? `line-${index + 1}`;
    const entry = commands.get(id) ?? { id, command: item.command, streamLines: [], events: [], exitCode: null };
    assert.equal(entry.command, item.command, `Command text changed for ${id}`);
    entry.streamLines.push(index + 1); entry.events.push(row.type);
    if (Object.hasOwn(item, "exit_code")) entry.exitCode = item.exit_code;
    commands.set(id, entry);
  }
  const checks = [
    ["explicit-coordinator-repository-path", text => text.includes(repositoryRoot)],
    ["held-out-evaluation-or-study-reference", text => /(?:^|[\s/'"])(?:evals\/(?:runs|builds)|full-journey-measurement|full-journey-recovery|stage-3-completion-2)(?:[\s/'"]|$)/.test(text)],
    ["parent-traversal-needs-context", text => /\.\.\//.test(text)],
  ];
  const inventory = [...commands.values()].map(entry => ({ ...entry,
    flags: checks.filter(([, check]) => check(entry.command)).map(([label]) => label) }));
  return { commandCount: inventory.length, commands: inventory,
    flaggedCommands: inventory.filter(entry => entry.flags.length),
    incompleteCommands: inventory.filter(entry => !entry.events.includes("item.completed")),
    limitation: "Literal command-text triage only, not syscall tracing, path resolution, or a read jail. Flags require manual context review; no flags do not prove absence of indirect, script-mediated, native-tool or network access. Configuration isolation is not filesystem isolation." };
}

export async function auditTurn3() {
  // Reject missing/abnormal outer closure before inspecting a potentially live actor tree.
  const directory = `${prefix}/turn-3-command`, outer = await readJson(`${directory}/result.json`);
  const terminalBytes = await read(`${prefix}/terminal-turn3.json`), terminal = JSON.parse(terminalBytes);
  const raw = {};
  for (const name of ["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"]) {
    raw[name] = await read(`${directory}/${name}`);
    assert.equal(hash(raw[name]), outer.rawArtifacts?.[name], `Outer raw artifact changed: ${name}`);
  }
  const command = JSON.parse(raw["command.json"]);
  const lifecycle = raw["lifecycle.jsonl"].toString().trim().split("\n").map(line => JSON.parse(line));
  assert.equal(assertSupervisor(outer, terminal, command, lifecycle), join(root, directory));
  const outerStart = Date.parse(command.started), outerEnd = Date.parse(outer.finished);
  assert.ok(Number.isFinite(outerStart) && Number.isFinite(outerEnd) && outerEnd >= outerStart);
  assert.ok(Number.isSafeInteger(outer.durationMs) && outer.durationMs >= outerEnd - outerStart);
  let previousAt = outerStart, previousElapsed = 0;
  for (const event of lifecycle) {
    const at = Date.parse(event.at);
    assert.ok(Number.isFinite(at) && at >= previousAt && at <= outerEnd);
    assert.ok(Number.isSafeInteger(event.elapsedMs) && event.elapsedMs >= previousElapsed && event.elapsedMs <= outer.durationMs);
    previousAt = at; previousElapsed = event.elapsedMs;
  }

  const binding = await loadAmendment(join(root, prefix, "amendment.json"), { liveOriginal: false });
  assert.equal(binding.amendmentSha256, amendmentSha256);
  assert.equal(binding.frozen.digest, "01b8086923dcb9f03102c84bcec346e29037b469fb4c760334f17a5057185566");
  binding.caseSource = validateCase(JSON.parse(await regularBytes(binding.meta.inputs, "case.json")));
  const expectedEnvironment = { ...binding.capabilities.environment, TMPDIR: binding.runtime.TMPDIR, NEXT_TELEMETRY_DISABLED: null };
  assert.equal(command.cwd, root); assert.equal(command.executable, binding.capabilities.node.executable);
  assert.deepEqual(command.environment, expectedEnvironment);
  assert.equal(command.recorderSha256, binding.frozen.hashes["implementation/evals/runs/stage-3-completion-2/process-supervision/recorder.mjs"]);
  assert.deepEqual(command.args, ["evals/runs/stage-3-completion-2/full-journey-recovery/runner/cli.mjs",
    "--amendment", `${prefix}/amendment.json`, "--amendment-sha256", amendmentSha256,
    "--gate", `${prefix}/gate-after-2.json`, "--gate-sha256", gateSha256, "--turn", "3"]);

  const gateBytes = await read(`${prefix}/gate-after-2.json`), gate = JSON.parse(gateBytes);
  assert.equal(hash(gateBytes), gateSha256); assert.equal(gate.reviewedByRoot, true);
  assert.equal(gate.afterTurn, 2); assert.equal(gate.advance, true);
  assert.ok(Array.isArray(gate.evidence) && gate.evidence.length > 0);
  assert.equal(new Set(gate.evidence.map(row => row.path)).size, gate.evidence.length);
  for (const entry of gate.evidence) {
    safePath(entry.path); assert.ok(entry.path.startsWith("evals/runs/"));
    assert.equal(hash(await read(entry.path)), entry.sha256, `Gate evidence changed: ${entry.path}`);
  }

  const history = await readContinuationHistory(binding);
  assert.equal(history.length, 3, "Audit exactly the first completed continuation, before any later turn");
  assert.deepEqual(history.map(item => item.turn), [1, 2, 3]);
  const actor = history[2], location = `${binding.record.continuation.output}/turns/03`;
  assert.equal(binding.record.continuation.output, `${prefix}/continuation`);
  const source = await readJson(`${location}/snapshot/source.json`);
  assert.ok(source.files.some(file => file.path.startsWith("site/")), "The full application must be retained");
  await assertLiveSource(binding.meta.work, source);
  assert.deepEqual(await read(`${location}/gate.json`), gateBytes);
  const started = await readJson(`${location}/started.json`), inner = await readJson(`${location}/process.json`);
  assert.equal(inner.code, 0); assert.ok(inner.signal == null);
  assert.ok(actor.durationMs <= started.timeoutMs && actor.durationMs <= outer.durationMs);
  assert.ok(Date.parse(started.started) >= outerStart && Date.parse(started.started) <= outerEnd);
  const summary = JSON.parse(raw["stdout.log"]);
  for (const key of ["complete", "turn", "taskKind", "requestedStop", "sessionId", "durationMs", "usage", "inputDigest", "amendmentSha256"]) assert.deepEqual(summary[key], actor[key]);
  assert.equal(summary.result, join(root, location, "result.json")); assert.equal(summary.error, null);

  const totals = { durationMs: 0, reportedTokens: 0, uncachedTokens: 0 };
  for (const item of history) {
    for (const key of ["input_tokens", "cached_input_tokens", "output_tokens"]) assert.ok(Number.isSafeInteger(item.usage?.[key]) && item.usage[key] >= 0);
    assert.ok(item.usage.cached_input_tokens <= item.usage.input_tokens);
    assert.ok(Number.isSafeInteger(item.durationMs) && item.durationMs >= 0);
    totals.durationMs += item.durationMs;
    totals.reportedTokens += item.usage.input_tokens + item.usage.output_tokens;
    totals.uncachedTokens += item.usage.input_tokens - item.usage.cached_input_tokens + item.usage.output_tokens;
  }
  const bounds = binding.caseSource.bounds;
  const boundsExceeded = totals.durationMs > bounds.maxWallMs || totals.reportedTokens > bounds.maxTokens || totals.uncachedTokens > bounds.maxUncachedTokens;
  const stream = await read(`${location}/stream.jsonl`), access = inspectCommandAccess(stream.toString(), root);
  return { schemaVersion: 1, integrityVerified: true, normalActorClosure: true,
    originalInputs: Object.keys(binding.frozen.hashes).length,
    originalArtifacts: binding.officialActors.reduce((sum, item) => sum + Object.keys(item.artifacts).length, 0),
    continuationTurn: 3, continuationArtifacts: Object.keys(actor.artifacts).length,
    snapshotFiles: source.files.length, applicationFiles: source.files.filter(file => file.path.startsWith("site/")).length,
    sourceDigest: source.digest, liveSourceMatchesFullSnapshot: true,
    sourceBasis: actor.sourceBasis, originalClosureIdentityLimitation: binding.record.sourceBasis,
    sessionId: actor.sessionId, inputDigest: actor.inputDigest, amendmentSha256, gateSha256,
    actorResultSha256: actor.digest, streamSha256: hash(stream), terminalSha256: hash(terminalBytes),
    outerResultSha256: hash(await read(`${directory}/result.json`)), outerDurationMs: outer.durationMs,
    usage: actor.usage, historyTotals: totals, bounds, boundsExceeded,
    accountingLimit: "Original plus continuation accounting is not reset. Resumed reported counters may overlap; these totals do not imply a dollar estimate or hard in-flight token cap.",
    accessAudit: access, manualAccessReviewRequired: true,
    behavioralGate: "Unobserved by this integrity audit; actual storyboard and handoff still need independent review. No next turn is authorized.",
    auditSha256: hash(await read(`${prefix}/turn-3-audit.mjs`)), modelCalls: 0, writes: false };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const result = await auditTurn3(); process.stdout.write(json(result)); process.exitCode = result.boundsExceeded ? 1 : 0; }
  catch (error) { process.stdout.write(json({ schemaVersion: 1, integrityVerified: false, error: String(error), modelCalls: 0, writes: false })); process.exitCode = 1; }
}
