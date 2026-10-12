#!/usr/bin/env node
// Root-only entry point. No preparation, retry, model switch or automatic advancement.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, realpath } from "node:fs/promises";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { buildCodexArgs, hash, inspectBuildInputs, json, regularBytes, safePath, validateCase, verifyBuildSetupProbe } from "../../../../lib/build.mjs";
import { disabledSkills, EFFORT, MODEL } from "../../../../lib/codex.mjs";
import { loadAmendment } from "../measurement/amendment-lib.mjs";
import { executeContinuation, planContinuation } from "./execution-core.mjs";

export const RUNNER_FILES = ["cli.mjs", "execution-core.mjs", "execution-core.test.mjs", "README.md"].map(name => `evals/runs/stage-3-completion-2/full-journey-recovery/runner/${name}`);
const directory = dirname(fileURLToPath(import.meta.url)), root = resolve(directory, "../../../../..");
const { values: args } = parseArgs({ options: {
  amendment: { type: "string" }, "amendment-sha256": { type: "string" }, gate: { type: "string" }, "gate-sha256": { type: "string" },
  turn: { type: "string" }, dry: { type: "boolean", default: false },
} });
assert.ok(["3", "4", "5", "6"].includes(args.turn), "Select exactly one remaining turn 3..6");
for (const key of ["amendment", "gate"]) { safePath(args[key]); assert.ok(args[key].startsWith("evals/runs/stage-3-completion-2/full-journey-recovery/")); }
for (const key of ["amendment-sha256", "gate-sha256"]) assert.match(args[key] ?? "", /^[a-f0-9]{64}$/);
assert.equal(await realpath(root), root);
const amendmentBytes = await regularBytes(root, args.amendment), gateBytes = await regularBytes(root, args.gate);
assert.equal(hash(amendmentBytes), args["amendment-sha256"]); assert.equal(hash(gateBytes), args["gate-sha256"]);
const gate = JSON.parse(gateBytes);
assert.equal(gate.reviewedByRoot, true);
assert.ok(Array.isArray(gate.evidence) && gate.evidence.length > 0, "A real observed gate needs source-bound evidence");
assert.equal(new Set(gate.evidence.map(row => row.path)).size, gate.evidence.length);
for (const row of gate.evidence) { safePath(row.path); assert.ok(row.path.startsWith("evals/runs/")); assert.equal(hash(await regularBytes(root, row.path)), row.sha256); }

async function checkedBinding() {
  // Later actor source legitimately differs from the recovery. Core verifies the
  // immediately preceding full snapshot; the original/recovery archives stay fixed.
  const binding = await loadAmendment(join(root, args.amendment), { liveOriginal: false });
  assert.equal(binding.root, root); assert.equal(binding.amendmentSha256, args["amendment-sha256"]);
  assert.equal(binding.meta.cohort, "codex-full-journey-candidate-2");
  assert.equal(binding.record.original.sessionId, "01a130a7-a4ce-7eb2-bc48-2015a0dab0be");
  assert.equal(binding.frozen.digest, "01b8086923dcb9f03102c84bcec346e29037b469fb4c760334f17a5057185566");
  assert.equal(Object.keys(binding.frozen.hashes).length, 149);
  binding.caseSource = validateCase(JSON.parse(await regularBytes(binding.meta.inputs, "case.json")));
  const caps = binding.capabilities;
  assert.equal(caps.model, MODEL); assert.equal(caps.reasoningEffort, EFFORT);
  assert.equal(process.execPath, caps.node.executable); assert.equal(process.version, caps.node.version);
  assert.deepEqual(Object.fromEntries(Object.keys(caps.environment).map(key => [key, process.env[key] ?? null])), caps.environment);
  assert.equal(process.env.TMPDIR, "/var/tmp/storyfolio-entry-runtime-20261012");
  assert.equal(process.env.NEXT_TELEMETRY_DISABLED ?? null, null);
  const disabled = await disabledSkills(); assert.deepEqual(disabled, caps.disabledSkills);
  let cli;
  for (const path of (process.env.PATH ?? "").split(delimiter)) { try { cli = await realpath(join(path, "codex")); break; } catch {} }
  assert.equal(cli, caps.cliExecutable); assert.equal(hash(await readFile(cli)), caps.cliSha256);
  assert.equal(execFileSync(cli, ["--version"], { encoding: "utf8", timeout: 30000 }).trim(), caps.cliVersion);
  assert.deepEqual(buildCodexArgs({ model: caps.model, disabled, config: caps.config, profile: caps.profile, permissionProfile: caps.permissionProfile, removeConfig: caps.removeConfig }), caps.argv);
  assert.equal((await inspectBuildInputs({ root, casePath: binding.frozen.casePath, capabilities: caps })).digest, binding.frozen.digest, "Current original inputs differ from the old freeze");
  await verifyBuildSetupProbe({ source: binding.caseSource, manifest: binding.frozen, setup: join(binding.run, "setup"), work: binding.meta.work });
  const helpers = binding.record.helperHashes.runner;
  assert.ok(helpers && Object.keys(helpers).length >= RUNNER_FILES.length);
  for (const path of RUNNER_FILES) assert.match(helpers[path] ?? "", /^[a-f0-9]{64}$/, `Runner not frozen: ${path}`);
  // Every imported original helper remains byte-equal to its old freeze. New
  // common-validator imports are separately checked by loadAmendment.
  for (const [path, digest] of Object.entries(binding.frozen.hashes).filter(([path]) => path.startsWith("implementation/"))) {
    const sourcePath = path.slice("implementation/".length);
    assert.equal(hash(await regularBytes(root, sourcePath)), digest, `Original helper changed: ${sourcePath}`);
  }
  for (const [path, digest] of Object.entries(helpers)) { safePath(path); assert.equal(hash(await regularBytes(root, path)), digest, `Amended helper changed: ${path}`); }
  assert.equal(hash(await regularBytes(root, args.gate)), args["gate-sha256"]);
  for (const row of gate.evidence) assert.equal(hash(await regularBytes(root, row.path)), row.sha256);
  return binding;
}

const binding = await checkedBinding();
if (args.dry) {
  const planned = await planContinuation(binding, Number(args.turn), gate, hash(gateBytes));
  console.log(json({ mode: "dry", turn: Number(args.turn), modelCalls: 0, writes: false, inputDigest: binding.frozen.digest, amendmentSha256: binding.amendmentSha256, gateSha256: hash(gateBytes), limits: planned.limits, sourceDigest: planned.expectedSource.digest, sessionId: binding.record.original.sessionId }));
} else {
  const result = await executeContinuation({ binding, turn: Number(args.turn), gate, gateBytes, revalidate: checkedBinding });
  console.log(json({ complete: result.complete, turn: result.turn, taskKind: result.taskKind, requestedStop: result.requestedStop, sessionId: result.sessionId, durationMs: result.durationMs, usage: result.usage, inputDigest: result.inputDigest, amendmentSha256: result.amendmentSha256, result: join(result.location, "result.json"), error: result.error ?? result.captureError ?? null }));
  process.exitCode = result.complete ? 0 : 1;
}
