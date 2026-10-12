// Synthetic filesystem/fake-invocation checks only. Never calls a model or browser.
import assert from "node:assert/strict";
import test from "node:test";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildCodexArgs, captureBuildWorkspace, DEFAULT_SNAPSHOT, executeBuildTurn, hash, json, readTurnHistory, validateCase, verifyInputs, writeNew } from "../../../../lib/build.mjs";
import { captureSource } from "../../../../lib/build-capture.mjs";
import { CAPTURE_POLICY, executeContinuation, filePaths, invocationOptions, planContinuation, readContinuationHistory } from "./execution-core.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "journey-recovery-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const inputs = join(root, "inputs"), run = join(root, "original"), work = join(root, "work");
  const rawCase = { schemaVersion: 3, taskKind: "full-journey", id: "full-journey-1", setupMode: "unscaffolded", requestedStops: [1, 2, 3, 4, 5, 6], refusalTurns: [2, 3, 4, 5, 6],
    workspaceRoot: "fixture", files: ["material/profile.md"], expectations: "policy.json", rubric: "rubric.md", protocol: "protocol.md", prompts: [1, 2, 3, 4, 5, 6].map(n => `prompts/turn${n}.md`),
    bounds: { maxTurns: 6, turnTimeoutMs: 900000, maxWallMs: 5400000, maxTokens: 12000000, maxUncachedTokens: 1500000 } };
  const caps = { model: "gpt-6.1-sol", disabledSkills: ["fake-other-skill"], config: {}, removeConfig: [] };
  const inputFiles = { "case.json": json(rawCase), "capabilities.json": json(caps) };
  for (let turn = 1; turn <= 6; turn++) inputFiles[`prompts/turn${turn}.md`] = `Unchanged fixed prompt ${turn}.\n`;
  for (const [path, bytes] of Object.entries(inputFiles)) await writeNew(join(inputs, path), bytes);
  const hashes = Object.fromEntries(Object.keys(inputFiles).sort().map(path => [path, hash(inputFiles[path])]));
  await writeNew(join(inputs, "manifest.json"), json({ schemaVersion: 1, hashes, digest: hash(json(hashes)) }));
  for (const [path, bytes] of Object.entries({ "material/profile.md": "Fictional material", ".agents/skills/storyfolio/SKILL.md": "Frozen skill", "docs/story/facts.md": "Actual facts", "site/package.json": "{}", "site/package-lock.json": "{}", "site/app/page.tsx": "Original actor concept" })) await writeNew(join(work, path), bytes);
  for (const path of [".aws", ".codex"]) await mkdir(join(work, path));
  const sessionId = "synthetic-same-session";
  for (let turn = 1; turn <= 2; turn++) {
    const location = join(run, "turns", String(turn).padStart(2, "0"));
    const snapshot = await captureBuildWorkspace(work, join(location, "snapshot"), DEFAULT_SNAPSHOT);
    await writeNew(join(location, "stream.jsonl"), "Synthetic immutable historical stream\n");
    await writeNew(join(location, "reply.md"), "Synthetic immutable historical reply\n");
    await writeNew(join(location, "process.json"), json({ code: 0 }));
    const artifacts = {};
    for (const path of await filePaths(location)) artifacts[path] = hash(await readFile(join(location, path)));
    await writeNew(join(location, "result.json"), json({ turn, requestedStop: turn, taskKind: "full-journey", complete: true, sessionId, durationMs: 100 * turn,
      usage: { input_tokens: 100 * turn, cached_input_tokens: 40 * turn, output_tokens: 10 * turn }, snapshot, artifacts }));
  }
  const history = await readTurnHistory(run), source = await captureSource(work), frozen = await verifyInputs(inputs);
  const binding = { root, run, meta: { inputs, work }, frozen, caseSource: validateCase(rawCase), capabilities: caps, amendmentSha256: hash("Synthetic fixed amendment"), source,
    record: { original: { sessionId, turns: history.map(item => ({ turn: item.turn, result: { sha256: item.digest } })) }, recovery: { sourceManifest: { path: "recovery/source.json", sha256: hash(json(source)) } },
      continuation: { allowedTurns: [3, 4, 5, 6], recoveryAfterTurn: 2, snapshotPolicy: structuredClone(CAPTURE_POLICY), output: "continuation" } } };
  const calls = [];
  const invoke = async params => {
    calls.push(params);
    const turn = calls.length + 2;
    assert.equal(params.sessionId, sessionId);
    assert.equal(params.prompt, inputFiles[`prompts/turn${turn}.md`]);
    const stdout = [{ type: "thread.started", thread_id: sessionId }, { type: "turn.started" },
      { type: "item.completed", item: { type: "agent_message", text: `Genuine synthetic handoff ${turn}` } },
      { type: "turn.completed", usage: { input_tokens: 20, cached_input_tokens: 10, output_tokens: 5 } }].map(row => JSON.stringify(row)).join("\n") + "\n";
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "");
    await writeNew(join(work, `site/app/turn${turn}.tsx`), `Synthetic actor source ${turn}`);
    return { stdout, stderr: "", code: 0, durationMs: 50, args: buildCodexArgs(invocationOptions(caps, sessionId)), timedOut: false, interruptedBy: null, spawnError: null, logError: null };
  };
  async function gateFor(turn) {
    const currentHistory = await readContinuationHistory(binding);
    const currentSource = turn === 3 ? source : JSON.parse(await readFile(join(root, "continuation/turns", String(turn - 1).padStart(2, "0"), "snapshot/source.json")));
    return { afterTurn: turn - 1, advance: true, previousTurnDigest: currentHistory.at(-1).digest, observation: "Synthetic actual gate reviewed.", amendmentSha256: binding.amendmentSha256, sourceDigest: currentSource.digest };
  }
  return { binding, invoke, calls, gateFor, root, inputs, work, run, rawCase };
}

async function originalIdentities(run) {
  return Object.fromEntries(await Promise.all((await filePaths(run)).map(async path => [path, hash(await readFile(join(run, path)))])));
}

test("original runner rejects the actual omitted-root shape without invoking or editing history", async t => {
  const state = await fixture(t), { binding } = state; let calls = 0;
  const gate = await state.gateFor(3), before = await originalIdentities(state.run);
  await assert.rejects(executeBuildTurn({ out: state.run, work: state.work, inputs: state.inputs, source: binding.caseSource, capabilities: binding.capabilities, turn: 3, gate,
    invoke: async () => { calls++; throw new Error("Must not invoke"); } }), /source inventory differs/);
  assert.equal(calls, 0); assert.deepEqual(await originalIdentities(state.run), before);
});

test("four amended turns use exact prompts/session and cumulative budgets without duplicating history", async t => {
  const state = await fixture(t), { binding } = state, originals = await originalIdentities(state.run);
  for (let turn = 3; turn <= 6; turn++) {
    const gate = await state.gateFor(turn);
    const planned = await planContinuation(binding, turn, gate, hash(json(gate)));
    assert.equal(planned.limits.elapsedMs, 300 + (turn - 3) * 50);
    assert.equal(planned.limits.tokens, 330 + (turn - 3) * 25);
    assert.equal(planned.limits.uncachedTokens, 210 + (turn - 3) * 15);
    const result = await executeContinuation({ binding, turn, gate, invoke: state.invoke });
    assert.equal(result.complete, true, result.error ?? result.captureError);
    assert.ok(result.snapshot.files["site/app/page.tsx"]);
    assert.ok(result.snapshot.files[`site/app/turn${turn}.tsx`]);
    assert.equal(result.sourceBasis.kind, turn === 3 ? "post-closure-recovery" : "previous-amended-snapshot");
    assert.equal(result.previousTurnDigest, planned.history.at(-1).digest);
  }
  assert.equal(state.calls.length, 4);
  assert.equal((await readContinuationHistory(binding)).length, 6);
  assert.deepEqual(await originalIdentities(state.run), originals);
  const outputPaths = await filePaths(join(state.root, "continuation"));
  assert.ok(outputPaths.every(path => /^turns\/0[3-6]\//.test(path)));
  await assert.rejects(executeContinuation({ binding, turn: 6, gate: await state.gateFor(6), invoke: state.invoke }), /contiguous/);
  await assert.rejects(executeContinuation({ binding, turn: 7, gate: {}, invoke: state.invoke }), /Only remaining turns/);
  assert.equal(state.calls.length, 4);
});

test("input, recovery digest, live bytes and gates fail before a fake invocation", async t => {
  for (const kind of ["input", "recovery", "live", "missing-gate", "amendment", "source-gate", "session", "policy"]) await t.test(kind, async t => {
    const state = await fixture(t), { binding } = state; let gate = await state.gateFor(3);
    if (kind === "input") await writeFile(join(state.inputs, "prompts/turn3.md"), "Changed prompt");
    if (kind === "recovery") binding.source.files[0].sha256 = hash("Changed recovery record");
    if (kind === "live") await writeFile(join(state.work, "site/app/page.tsx"), "Changed after recovery");
    if (kind === "missing-gate") gate = null;
    if (kind === "amendment") gate.amendmentSha256 = hash("Another amendment");
    if (kind === "source-gate") gate.sourceDigest = hash("Another checkpoint");
    if (kind === "session") binding.record.original.sessionId = "Other session";
    if (kind === "policy") binding.record.continuation.snapshotPolicy.roots.push("unknown");
    await assert.rejects(executeContinuation({ binding, turn: 3, gate, invoke: state.invoke }));
    assert.equal(state.calls.length, 0);
  });
});

test("unknown payloads and source symlinks cannot enter the expanded snapshot", async t => {
  for (const kind of ["unknown", "symlink", "missing", "oversize"]) await t.test(kind, async t => {
    const state = await fixture(t), gate = await state.gateFor(3);
    if (kind === "unknown") await writeNew(join(state.work, "other-app/page.tsx"), "Not authorized by site expansion");
    if (kind === "symlink") await symlink(join(state.work, "site/app/page.tsx"), join(state.work, "site/app/link.tsx"));
    if (kind === "missing") await rm(join(state.work, "material/profile.md"));
    if (kind === "oversize") await writeNew(join(state.work, "site/large.bin"), Buffer.alloc(CAPTURE_POLICY.maxFileBytes + 1));
    await assert.rejects(executeContinuation({ binding: state.binding, turn: 3, gate, invoke: state.invoke }));
    assert.equal(state.calls.length, 0);
  });
});

test("original artifact tampering and incomplete or over-budget history cannot be bypassed", async t => {
  for (const kind of ["artifact", "incomplete", "missing-usage", "cached", "time", "tokens", "uncached"]) await t.test(kind, async t => {
    const state = await fixture(t), { binding } = state, gate = await state.gateFor(3);
    const path = join(state.run, "turns/02/result.json"), result = JSON.parse(await readFile(path));
    if (kind === "artifact") await writeFile(join(state.run, "turns/02/reply.md"), "Changed old artifact");
    else {
      if (kind === "incomplete") result.complete = false;
      if (kind === "missing-usage") result.usage = null;
      if (kind === "cached") result.usage.cached_input_tokens = result.usage.input_tokens + 1;
      if (kind === "time") result.durationMs = binding.caseSource.bounds.maxWallMs;
      if (kind === "tokens") { result.usage.input_tokens = binding.caseSource.bounds.maxTokens; result.usage.cached_input_tokens = result.usage.input_tokens; }
      if (kind === "uncached") { result.usage.input_tokens = binding.caseSource.bounds.maxUncachedTokens; result.usage.cached_input_tokens = 0; }
      const bytes = json(result); await writeFile(path, bytes);
      // Synthetic binding is deliberately updated to exercise the deeper
      // history gate; real loadAmendment would reject changed original bytes.
      binding.record.original.turns[1].result.sha256 = hash(bytes); gate.previousTurnDigest = hash(bytes);
    }
    await assert.rejects(executeContinuation({ binding, turn: 3, gate, invoke: state.invoke }));
    assert.equal(state.calls.length, 0);
  });
});

test("after turn3 the previous genuine snapshot is required, not recovery or current drift", async t => {
  for (const kind of ["live", "before", "snapshot", "recovery-gate", "partial-output"]) await t.test(kind, async t => {
    const state = await fixture(t), { binding } = state;
    assert.equal((await executeContinuation({ binding, turn: 3, gate: await state.gateFor(3), invoke: state.invoke })).complete, true);
    const gate = await state.gateFor(4), turn = join(state.root, "continuation/turns/03");
    if (kind === "live") await writeFile(join(state.work, "site/app/page.tsx"), "Unrecorded later drift");
    if (kind === "before") await writeFile(join(turn, "before/source.json"), json(binding.source));
    if (kind === "snapshot") await writeFile(join(turn, "snapshot/files/site/app/page.tsx"), "Changed saved source");
    if (kind === "recovery-gate") gate.sourceDigest = binding.source.digest;
    if (kind === "partial-output") await mkdir(join(state.root, "continuation/turns/04"));
    // For before tampering change a byte even though the legitimate turn3
    // before record naturally equals the recovered source.
    if (kind === "before") await writeFile(join(turn, "before/source.json"), json({ ...binding.source, digest: hash("Changed before") }));
    await assert.rejects(executeContinuation({ binding, turn: 4, gate, invoke: state.invoke }));
    assert.equal(state.calls.length, 1);
  });
});

test("a failed invocation or missing usage stays failed and cannot be retried", async t => {
  for (const kind of ["throw", "missing-usage", "changed-session", "unknown-after"]) await t.test(kind, async t => {
    const state = await fixture(t), gate = await state.gateFor(3); let calls = 0;
    const invoke = async options => {
      calls++;
      if (kind === "throw") throw new Error("Synthetic invocation failure");
      const result = await state.invoke(options);
      if (kind === "missing-usage" || kind === "changed-session") {
        const events = result.stdout.trim().split("\n").map(line => JSON.parse(line));
        if (kind === "missing-usage") delete events.at(-1).usage;
        else events[0].thread_id = "Different synthetic session";
        result.stdout = events.map(row => JSON.stringify(row)).join("\n") + "\n";
        await writeFile(options.streamPath, result.stdout);
      }
      if (kind === "unknown-after") await writeNew(join(state.work, "other-app/unknown.ts"), "Actor unknown root remains unexported");
      return result;
    };
    const result = await executeContinuation({ binding: state.binding, turn: 3, gate, invoke });
    assert.equal(result.complete, false);
    await assert.rejects(executeContinuation({ binding: state.binding, turn: 3, gate, invoke }));
    assert.equal(calls, 1);
  });
});

test("last-moment binding revalidation failure prevents invocation and is preserved", async t => {
  const state = await fixture(t); let checks = 0;
  const result = await executeContinuation({ binding: state.binding, turn: 3, gate: await state.gateFor(3), invoke: state.invoke,
    revalidate: async () => { if (++checks >= 2) throw new Error("Supplementary helper changed"); } });
  assert.equal(result.complete, false); assert.equal(state.calls.length, 0);
  await assert.rejects(executeContinuation({ binding: state.binding, turn: 3, gate: {}, invoke: state.invoke }));
});
