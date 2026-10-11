import assert from "node:assert/strict";
import test from "node:test";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BUILD_CRITERIA, BUILD_JUDGEMENT_SCHEMA, PROTOTYPE_DEPTH_CRITERIA, PROTOTYPE_DEPTH_JUDGEMENT_SCHEMA, MAX_JUDGE_PROMPT_BYTES, MAX_JUDGE_PROMPT_CHARACTERS, assembleBuildJudgePrompt, buildCriterionEligibility, buildScoreCounts, renderBuildJudgePrompt, validateBuildJudgement } from "./build-score.mjs";
import { captureBuildWorkspace, executeBuildTurn, hash, json, populateBuildWorkspace, prepareBuildInputs, readTurnHistory, writeNew } from "./build.mjs";
import { invokeBuildJudge, JUDGE_IMPLEMENTATION_FILES, prepareBuildJudge, runBuildJudge } from "../codex-build-judge.mjs";
import { captureSource } from "./build-capture.mjs";
import { createPagedEvidence, pageResponse, verifyPagedEvidence } from "./judge-transport.mjs";

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const unobserved = (taskKind) => ({ schemaVersion: taskKind === "prototype-depth" ? 2 : 1, criteria: Object.fromEntries((taskKind === "prototype-depth" ? PROTOTYPE_DEPTH_CRITERIA : BUILD_CRITERIA).map(([id]) => [id, { status: "unobserved", reason: "The relevant observation is not available.", evidence: [] }])), summary: "One bounded partial run, with limitations.", unblinding: ["Baseline-only case."] });
const cite = (path = "run/turns/01/reply.md", excerpt = "No build is available.") => ({ path, excerpt, explanation: "The actor explicitly stopped without a build." });

test("build judgement requires every criterion, valid status and real artifact excerpts", () => {
  const value = unobserved(), context = { turnCount: 1, evidence: { "run/turns/01/reply.md": "No build is available.\nMore context." } };
  value.criteria.spine_scope = { status: "fail", reason: "The authorized spine was not built.", evidence: [cite()] };
  assert.deepEqual(validateBuildJudgement(value, context), []);
  assert.deepEqual(buildScoreCounts(value), { pass: 0, fail: 1, unobserved: BUILD_CRITERIA.length - 1 });
  assert.deepEqual(BUILD_JUDGEMENT_SCHEMA.properties.criteria.required, BUILD_CRITERIA.map(([id]) => id));
  for (const mutate of [
    copy => delete copy.criteria.factuality,
    copy => { copy.criteria.spine_scope.status = "mostly"; },
    copy => { copy.criteria.spine_scope.evidence = []; },
    copy => { copy.criteria.spine_scope.evidence[0].path = "invented.md"; },
    copy => { copy.criteria.spine_scope.evidence[0].excerpt = "It all works."; },
    copy => { copy.automaticPassed = true; },
  ]) { const copy = structuredClone(value); mutate(copy); assert.ok(validateBuildJudgement(copy, context).length); }
});

test("unvisited stops and unavailable source verification cannot silently pass or fail", () => {
  const context = { turnCount: 1, evidence: { "run/turns/01/reply.md": "No build is available." } };
  for (const id of ["chapters", "copy_approval", "finish_checks", "no_skill_install_after_refusal", "continue_without_skills", "recommendation_source", "install_command_verified"]) {
    for (const status of ["pass", "fail"]) {
      const value = unobserved();
      value.criteria[id] = { status, reason: "A claim beyond the observed opportunity.", evidence: [cite()] };
      assert.ok(validateBuildJudgement(value, context).length, `${id} ${status}`);
    }
  }
  assert.deepEqual(validateBuildJudgement(unobserved(), context), []);
});

test("continuation eligibility follows attempted stops and actual refusal turns, not ordinal", () => {
  const evidence = { "run/turns/01/reply.md": "No build is available." };
  const context = { turnCount: 1, requestedStops: [5], refusalTurns: [1], evidence };
  for (const id of ["chapters", "copy_approval", "no_skill_install_after_refusal"]) {
    const value = unobserved();
    value.criteria[id] = { status: "fail", reason: "The observed requirement was missed.", evidence: [cite()] };
    assert.deepEqual(validateBuildJudgement(value, context), [], id);
  }
  for (const id of ["spine_scope", "look_choice", "finish_checks", "no_skill_install_before_refusal", "preflight_node", "preflight_git", "preflight_site", "preflight_skills", "preflight_browser"]) {
    for (const status of ["pass", "fail"]) {
      const value = unobserved();
      value.criteria[id] = { status, reason: "Claimed outside the observed opportunity.", evidence: [cite()] };
      assert.ok(validateBuildJudgement(value, context).length, `${id} ${status}`);
    }
  }
  const finish = unobserved();
  finish.criteria.finish_checks = { status: "fail", reason: "Finish was attempted without a build.", evidence: [cite()] };
  assert.deepEqual(validateBuildJudgement(finish, { ...context, turnCount: 2, requestedStops: [5, 6], refusalTurns: [1, 2] }), []);
  const noRefusal = buildCriterionEligibility({ turnCount: 2, requestedStops: [5, 6], refusalTurns: [] });
  assert.equal(noRefusal.no_skill_install_before_refusal, true);
  assert.equal(noRefusal.no_skill_install_after_refusal, false);
  assert.equal(noRefusal.continue_without_skills, false);
  for (const mapping of [
    { requestedStops: [5, 6] }, { requestedStops: [3] }, { turnCount: 2, requestedStops: [5, 5] },
    { turnCount: 2, requestedStops: [6, 5] }, { refusalTurns: [2] }, { refusalTurns: [1, 1] },
  ]) assert.ok(validateBuildJudgement(unobserved(), { ...context, ...mapping }).length);
});

test("prototype eligibility separates implementation and build-start checks from journey gates", () => {
  const context = { taskKind: "prototype-depth", turnCount: 1, refusalTurns: [1], evidence: { "run/turns/01/reply.md": "No build is available." } };
  assert.deepEqual(PROTOTYPE_DEPTH_JUDGEMENT_SCHEMA.properties.criteria.required, PROTOTYPE_DEPTH_CRITERIA.map(([id]) => id));
  assert.equal(PROTOTYPE_DEPTH_JUDGEMENT_SCHEMA.properties.schemaVersion.const, 2);
  for (const id of ["prototype_brief", "storyboard", "preflight_node", "preflight_git", "preflight_site", "preflight_skills", "preflight_browser", "no_skill_install_after_refusal"]) {
    const value = unobserved("prototype-depth");
    value.criteria[id] = { status: "fail", reason: "A requirement in the attempted diagnostic was missed.", evidence: [cite()] };
    assert.deepEqual(validateBuildJudgement(value, context), [], id);
    assert.deepEqual(buildScoreCounts(value), { pass: 0, fail: 1, unobserved: 24 });
  }
  for (const id of ["spine_scope", "look_choice", "chapters", "copy_approval", "finish_checks", "no_skill_install_before_refusal", "continue_without_skills", "recommendation_source", "install_command_verified"]) {
    for (const status of ["pass", "fail"]) {
      const value = unobserved("prototype-depth");
      value.criteria[id] = { status, reason: "Claimed outside the diagnostic opportunity.", evidence: [cite()] };
      assert.ok(validateBuildJudgement(value, context).length, `${id} ${status}`);
    }
  }
  for (const update of [{ taskKind: "spine" }, { turnCount: 2 }, { requestedStops: [4] }, { requestedStops: [] }, { refusalTurns: [] }, { refusalTurns: null }]) {
    assert.ok(validateBuildJudgement(unobserved("prototype-depth"), { ...context, ...update }).length);
  }
  assert.ok(validateBuildJudgement(unobserved(), context).length);
  assert.ok(validateBuildJudgement(unobserved("prototype-depth"), { ...context, taskKind: undefined }).length);
});

test("judge prompt assembly preserves all supplied text and rejects byte overflow without truncation", () => {
  const template = "Rubric {{rubric}}\nData {{evidence}}", packet = { text: "évidence\ncomplete commands", nested: { quote: "{{rubric}}" } };
  const prompt = renderBuildJudgePrompt(template, "Version one", packet);
  assert.ok(prompt.includes("complete commands"));
  assert.ok(prompt.includes('"{{rubric}}"'));
  assert.throws(() => renderBuildJudgePrompt(template, "Version one", packet, Buffer.byteLength(prompt) - 1), /nothing truncated/);
  assert.throws(() => renderBuildJudgePrompt("{{rubric}} {{rubric}} {{evidence}}", "a", packet), /exactly one/);
});

test("judge prompt accepts the exact character boundary and rejects one more ASCII character", () => {
  const template = "{{rubric}}{{evidence}}", packet = {};
  const rubric = "a".repeat(MAX_JUDGE_PROMPT_CHARACTERS - 2); // JSON for {} adds two.
  const prompt = renderBuildJudgePrompt(template, rubric, packet);
  assert.equal(prompt, rubric + "{}");
  assert.equal(prompt.length, MAX_JUDGE_PROMPT_CHARACTERS);
  assert.ok(Buffer.byteLength(prompt + "a") < MAX_JUDGE_PROMPT_BYTES);
  assert.throws(() => renderBuildJudgePrompt(template, rubric + "a", packet), /character bound exceeded: 1048577 UTF-16 code units > 1048576; no model call made and nothing truncated/);
});

test("judge prompt byte boundary remains independent of its character boundary", () => {
  const template = "{{rubric}}{{evidence}}", rubric = "漢".repeat((MAX_JUDGE_PROMPT_BYTES - 2) / 3);
  const prompt = renderBuildJudgePrompt(template, rubric, {});
  assert.equal(Buffer.byteLength(prompt), MAX_JUDGE_PROMPT_BYTES);
  assert.ok(prompt.length + 1 < MAX_JUDGE_PROMPT_CHARACTERS);
  assert.throws(() => renderBuildJudgePrompt(template, rubric + "a", {}), /byte bound exceeded: 2097153 > 2097152/);
  assert.equal(renderBuildJudgePrompt(template, rubric + "a", {}, MAX_JUDGE_PROMPT_BYTES + 1), rubric + "a{}");
});

test("judge prompt character guard cannot be bypassed by a raised byte allowance", () => {
  const rubric = "a".repeat(MAX_JUDGE_PROMPT_CHARACTERS - 1);
  for (const byteLimit of [MAX_JUDGE_PROMPT_BYTES * 2, Number.MAX_SAFE_INTEGER]) {
    assert.throws(() => renderBuildJudgePrompt("{{rubric}}{{evidence}}", rubric, {}, byteLimit), /character bound exceeded/);
  }
});

test("judge prompt explicitly uses conservative UTF-16 units for astral characters", () => {
  const rubric = "😀".repeat((MAX_JUDGE_PROMPT_CHARACTERS - 2) / 2);
  const prompt = renderBuildJudgePrompt("{{rubric}}{{evidence}}", rubric, {});
  assert.equal(prompt.length, MAX_JUDGE_PROMPT_CHARACTERS);
  assert.equal([...prompt].length, (MAX_JUDGE_PROMPT_CHARACTERS - 2) / 2 + 2);
  assert.ok(Buffer.byteLength(prompt + "a") <= MAX_JUDGE_PROMPT_BYTES);
  assert.throws(() => renderBuildJudgePrompt("{{rubric}}{{evidence}}", rubric + "a", {}), /character bound exceeded.*UTF-16 code units/);
});

async function fixture(t, { failedActor = false, continuation = false, prototype = false, turns = 1, paged = false, large = false } = {}) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-build-judge-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const run = "evals/runs/judge-test/fixture/baseline-1", out = join(root, run), work = join(root, "work");
  const implementationFiles = [...JUDGE_IMPLEMENTATION_FILES, "evals/check-build.mjs", "evals/lib/build-check.mjs"];
  for (const path of implementationFiles) await writeNew(join(root, path), await readFile(join(sourceRoot, path)));
  const source = { schemaVersion: 1, id: "fixture", workspaceRoot: "fixtures/workspace", files: ["docs/story/facts.md"], expectations: "fixtures/expectations.json", rubric: "evals/prompts/build-criteria.md", protocol: "fixtures/protocol.md", prompts: ["fixtures/turn1.md", "fixtures/turn2.md", "fixtures/turn3.md"], implementationFiles,
    bounds: { maxTurns: 3, turnTimeoutMs: 900000, maxWallMs: 2400000, maxTokens: 1500000 } };
  if (paged) source.judgeTransport = "paged-v1";
  if (continuation) {
    Object.assign(source, { setupMode: "existing-site", requestedStops: [5, 6], refusalTurns: [1, 2], prompts: ["fixtures/turn1.md", "fixtures/turn2.md"] });
    source.bounds.maxTurns = 2;
    source.files.push("package.json", "package-lock.json", "app/page.tsx", "content/seed.ts");
  }
  if (prototype) {
    Object.assign(source, { schemaVersion: 2, taskKind: "prototype-depth", prompts: ["fixtures/turn1.md"], refusalTurns: [1], rubric: "fixtures/prototype-rubric.md" });
    source.bounds.maxTurns = 1;
    implementationFiles.push(source.rubric);
    implementationFiles.splice(implementationFiles.indexOf("evals/prompts/build-criteria.md"), 1);
  }
  const values = {
    "fixtures/case.json": json(source), "fixtures/workspace/docs/story/facts.md": "Fictional fact input, provided in full.", "fixtures/expectations.json": '{"id":"fixture","schemaVersion":1}',
    "fixtures/protocol.md": "One bounded baseline.", "fixtures/turn1.md": "Build the spine and ask for a look.", "fixtures/turn2.md": "Choose the first look, no optional skill installation.", "fixtures/turn3.md": "Choose the first wording and finish.",
    "skills/storyfolio/SKILL.md": "Planning-only original instruction.", "skills/storyfolio/engine/package.json": '{"name":"fixture-engine"}', "skills/storyfolio/engine/package-lock.json": '{"lockfileVersion":3}',
    "skills/storyfolio/engine/content/unchanged.ts": "UNCHANGED_ENGINE_BODY_SHOULD_NOT_BE_IN_PROMPT", "skills/storyfolio/engine/app/page.tsx": "Original starter page",
  };
  if (continuation) Object.assign(values, {
    "fixtures/workspace/package.json": '{"name":"existing-site"}', "fixtures/workspace/package-lock.json": '{"lockfileVersion":3}',
    "fixtures/workspace/app/page.tsx": "INHERITED_SPINE_SOURCE", "fixtures/workspace/content/seed.ts": "UNCHANGED_SEED_BODY_MUST_BE_IN_PROMPT",
    "fixtures/turn1.md": "Continue the existing spine at stop 5 with Bench paper. I decline optional skill installation.",
    "fixtures/turn2.md": "Use the first recommended wording and finish at stop 6. I decline optional skill installation.",
  });
  if (prototype) Object.assign(values, { "fixtures/prototype-rubric.md": "Prototype diagnostic criteria, version 1. Not any journey stop.", "fixtures/turn1.md": "Build one prototype appearance, no optional skills.", "fixtures/expectations.json": '{"id":"fixture","schemaVersion":2,"taskKind":"prototype-depth"}' });
  if (large) values["fixtures/workspace/docs/story/facts.md"] += "x".repeat(1100000);
  for (const [path, bytes] of Object.entries(values)) await writeNew(join(root, path), bytes);
  const capabilities = { model: "gpt-6.1-sol", disabledSkills: [], config: {} };
  const prepared = await prepareBuildInputs({ root, runs: join(root, "evals/runs"), casePath: "fixtures/case.json", cohort: "judge-test", capabilities, implementationFiles });
  await populateBuildWorkspace(prepared.inputs, work, { beforeScaffold: inventory => writeNew(join(out, "setup/pre-scaffold-inventory.json"), json(inventory)) });
  await captureBuildWorkspace(work, join(out, "setup/snapshot"), prepared.source.snapshot);
  await writeNew(join(out, "setup/result.json"), '{"complete":true}\n');
  await writeNew(join(out, "meta.json"), json({ runner: "codex-build", caseId: "fixture", cohort: "judge-test", rep: 1, inputDigest: prepared.manifest.digest, inputs: prepared.inputs, work, ...(prototype ? { taskKind: "prototype-depth" } : {}) }));
  let invocation = 0;
  const invoke = async params => {
    invocation++;
    const failed = failedActor && invocation === turns;
    const events = [
      { type: "thread.started", thread_id: "actor-session" },
      { type: "item.started", item: { type: "command_execution", command: "node --version" } },
      { type: "item.completed", item: { type: "command_execution", command: "node --version", aggregated_output: "v22.22.1", exit_code: 0 } },
      { type: "item.completed", item: { type: "agent_message", text: "No build is available." } },
      ...(failed ? [{ type: "turn.failed", error: { message: "Interrupted actor" } }] : [{ type: "turn.completed", usage: { input_tokens: 20, output_tokens: 10 } }]),
    ];
    const stdout = events.map(event => JSON.stringify(event)).join("\n") + "\n";
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "");
    await writeFile(join(work, "app/page.tsx"), `CHANGED_ACTOR_SOURCE: incomplete attempt ${invocation}`);
    if (invocation === 1) await writeNew(join(work, "public/shape.bin"), Buffer.from([0, 255, 129]));
    return { stdout, stderr: "", code: failed ? 1 : 0, durationMs: 23, args: ["fixed"], timedOut: false };
  };
  for (let turn = 1; turn <= turns; turn++) {
    const history = await readTurnHistory(out);
    const gate = turn > 1 ? { afterTurn: turn - 1, advance: true, previousTurnDigest: history.at(-1).digest, observation: "The synthetic fixture authorizes the next fixed test prompt." } : undefined;
    await executeBuildTurn({ out, work, inputs: prepared.inputs, source: prepared.source, capabilities, turn, invoke, gate });
  }
  return { root, run, out, work, prepared };
}

test("saved build judging binds hashes and includes full fixture, commands and changed text only", async t => {
  const testCase = await fixture(t), packet = await prepareBuildJudge(testCase);
  assert.equal(packet.packet.turnCount, 1);
  assert.deepEqual(packet.packet.requestedStops, [4]);
  assert.equal(packet.packet.criterionEligibility.spine_scope, true);
  assert.equal(packet.packet.criterionEligibility.chapters, false);
  assert.ok(packet.prompt.includes("Fictional fact input, provided in full."));
  assert.ok(packet.prompt.includes("node --version"));
  assert.ok(packet.prompt.includes("item.started"));
  assert.ok(packet.prompt.includes("CHANGED_ACTOR_SOURCE"));
  assert.ok(!packet.prompt.includes("UNCHANGED_ENGINE_BODY_SHOULD_NOT_BE_IN_PROMPT"));
  assert.ok(packet.packet.omitted.some(item => item.path.endsWith("public/shape.bin")));
  assert.equal(packet.packet.automaticAcceptance.supplied, false);
  await assert.rejects(prepareBuildJudge({ ...testCase, maxPromptBytes: 100 }), /nothing truncated/);
  await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
  await writeFile(join(testCase.out, "turns/01/reply.md"), "Tampered reply");
  await assert.rejects(prepareBuildJudge(testCase), /artifact changed/);
});

test("fresh continuation packets preserve inherited source and map two attempted stops, including failure", async t => {
  const testCase = await fixture(t, { continuation: true, turns: 2, failedActor: true }), prepared = await prepareBuildJudge(testCase);
  assert.deepEqual(prepared.packet.requestedStops, [5, 6]);
  assert.deepEqual(prepared.packet.refusalTurns, [1, 2]);
  assert.deepEqual(prepared.packet.turns.map(turn => [turn.requestedStop, turn.fixedSkillRefusal, turn.complete]), [[5, true, true], [6, true, false]]);
  for (const id of ["chapters", "copy_approval", "finish_checks", "no_skill_install_after_refusal"]) assert.equal(prepared.packet.criterionEligibility[id], true, id);
  for (const id of ["spine_scope", "look_choice", "preflight_site", "no_skill_install_before_refusal"]) assert.equal(prepared.packet.criterionEligibility[id], false, id);
  assert.equal(prepared.packet.initialSource.setupMode, "existing-site");
  assert.equal(prepared.evidence["inputs/fixture/content/seed.ts"], "UNCHANGED_SEED_BODY_MUST_BE_IN_PROMPT");
  assert.equal(prepared.evidence["inputs/fixture/app/page.tsx"], "INHERITED_SPINE_SOURCE");
  assert.ok(prepared.packet.initialSource.paths.includes("inputs/fixture/content/seed.ts"));
  assert.ok(prepared.promptBytes < 2 * 1024 * 1024);
  assert.equal(prepared.packet.turns.some(turn => turn.changes.some(change => change.path === "content/seed.ts")), false);
  assert.ok(!prepared.prompt.includes("UNCHANGED_ENGINE_BODY_SHOULD_NOT_BE_IN_PROMPT"));
  let calls = 0;
  const result = await runBuildJudge(prepared, { invoke: async options => {
    calls++;
    const judgement = unobserved();
    judgement.criteria.finish_checks = { status: "fail", reason: "The attempted finishing turn stopped without a build.", evidence: [cite("run/turns/02/reply.md")] };
    const stdout = [{ type: "thread.started", thread_id: "fresh-judge" }, { type: "item.completed", item: { type: "agent_message", text: JSON.stringify(judgement) } }, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 5 } }].map(JSON.stringify).join("\n") + "\n";
    await writeNew(options.streamPath, stdout); await writeNew(options.stderrPath, "");
    return { stdout, stderr: "", code: 0, durationMs: 5, args: [] };
  } });
  assert.equal(calls, 1);
  assert.equal(result.complete, true);
  assert.equal(result.counts.fail, 1);
});

test("a completed continuation turn does not make an unrequested finish observable and mapping drift is rejected", async t => {
  const testCase = await fixture(t, { continuation: true }), prepared = await prepareBuildJudge(testCase);
  assert.equal(prepared.packet.turns[0].complete, true);
  assert.deepEqual(prepared.packet.requestedStops, [5]);
  assert.equal(prepared.packet.criterionEligibility.finish_checks, false);
  const path = join(testCase.out, "turns/01/result.json"), result = JSON.parse(await readFile(path));
  result.requestedStop = 4;
  await writeFile(path, json(result));
  await assert.rejects(prepareBuildJudge(testCase), /result requested stop differs/);
});

test("failed actor turns remain judgeable without claiming later stops were visited", async t => {
  const testCase = await fixture(t, { failedActor: true }), packet = await prepareBuildJudge(testCase);
  assert.equal(packet.packet.turns[0].complete, false);
  assert.equal(packet.packet.turns[0].requestedStop, 4);
  assert.equal(packet.packet.turnCount, 1);
  assert.ok(packet.prompt.includes("Interrupted actor"));
});

test("a failed prototype attempt has a complete judgeable packet without claiming any journey gate", async t => {
  const testCase = await fixture(t, { prototype: true, failedActor: true }), prepared = await prepareBuildJudge(testCase);
  assert.equal(prepared.packet.schemaVersion, 2);
  assert.equal(prepared.packet.taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(prepared.packet, "requestedStops"), false);
  assert.deepEqual(prepared.packet.refusalTurns, [1]);
  assert.equal(prepared.packet.turns[0].complete, false);
  assert.equal(prepared.packet.turns[0].taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(prepared.packet.turns[0], "requestedStop"), false);
  assert.equal(prepared.packet.criterionEligibility.prototype_brief, true);
  assert.equal(prepared.packet.criterionEligibility.preflight_site, true);
  assert.equal(prepared.packet.criterionEligibility.look_choice, false);
  assert.equal(prepared.packet.criterionEligibility.continue_without_skills, false);
  assert.match(prepared.packet.observationScope, /not before-stop-1 timing/);
  assert.ok(prepared.prompt.includes("Prototype diagnostic criteria, version 1"));
  assert.ok(prepared.prompt.includes("Interrupted actor"));
  assert.ok(prepared.prompt.includes("CHANGED_ACTOR_SOURCE"));
  let calls = 0;
  const invoke = async options => {
    calls++;
    assert.deepEqual(JSON.parse(await readFile(options.schema)), PROTOTYPE_DEPTH_JUDGEMENT_SCHEMA);
    const value = unobserved("prototype-depth");
    value.criteria.prototype_brief = { status: "fail", reason: "The attempted prototype remains incomplete.", evidence: [cite()] };
    const stdout = [{ type: "thread.started", thread_id: "fresh-judge" }, { type: "item.completed", item: { type: "agent_message", text: JSON.stringify(value) } }, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 5 } }].map(JSON.stringify).join("\n") + "\n";
    await writeNew(options.streamPath, stdout); await writeNew(options.stderrPath, "");
    return { stdout, stderr: "", code: 0, durationMs: 5, args: [] };
  };
  const result = await runBuildJudge(prepared, { invoke });
  assert.equal(result.complete, true);
  assert.deepEqual(result.counts, { pass: 0, fail: 1, unobserved: 24 });
  await assert.rejects(runBuildJudge(prepared, { invoke }), { code: "EEXIST" });
  assert.equal(calls, 1);
});

test("prototype judging rejects frozen task identity drift in run, result and started records", async t => {
  for (const kind of ["meta", "result", "started"]) {
    const testCase = await fixture(t, { prototype: true });
    const path = kind === "meta" ? "meta.json" : `turns/01/${kind}.json`;
    const record = JSON.parse(await readFile(join(testCase.out, path)));
    delete record.taskKind;
    record[kind === "meta" ? "requestedStops" : "requestedStop"] = kind === "meta" ? [4] : 4;
    await writeFile(join(testCase.out, path), json(record));
    if (kind === "started") {
      const resultPath = join(testCase.out, "turns/01/result.json"), result = JSON.parse(await readFile(resultPath));
      result.artifacts["started.json"] = hash(json(record));
      await writeFile(resultPath, json(result));
    }
    await assert.rejects(prepareBuildJudge(testCase), /task identity differs/);
    await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
  }
});

test("prototype judging blocks missing source evidence even when capture failure is disclosed", async t => {
  const testCase = await fixture(t, { prototype: true, failedActor: true });
  const path = join(testCase.out, "turns/01/result.json"), result = JSON.parse(await readFile(path));
  delete result.snapshot;
  result.captureError = "Synthetic source capture failure";
  await writeFile(path, json(result));
  await assert.rejects(prepareBuildJudge(testCase), /Missing after-turn source blocks prototype-depth judging/);
  await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
});

test("current judge implementation drift prevents a call against frozen actor inputs", async t => {
  const testCase = await fixture(t);
  await writeFile(join(testCase.root, "evals/lib/build-score.mjs"), "changed judge");
  await assert.rejects(prepareBuildJudge(testCase), /Current implementation differs/);
});

test("acceptance reports stay separate and their frozen implementation and artifacts are verified", async t => {
  const testCase = await fixture(t), path = "acceptance/manifest.json", expected = JSON.parse(await readFile(join(testCase.prepared.inputs, "expectations.json")));
  const report = '{"passed":false,"problems":["Missing beat"]}\n';
  await writeNew(join(testCase.out, "acceptance/desktop/report.json"), report);
  const manifest = { schemaVersion: 1, fixture: "fixture", workspace: testCase.work, expected, frozen: {
    "checker": testCase.prepared.manifest.hashes["implementation/evals/check-build.mjs"], "helper": testCase.prepared.manifest.hashes["implementation/evals/lib/build-check.mjs"], "capture": testCase.prepared.manifest.hashes["implementation/evals/lib/build-capture.mjs"], "expected": testCase.prepared.manifest.hashes["expectations.json"],
  }, complete: true, passed: false, artifacts: { "desktop/report.json": hash(report) }, results: [{ id: "desktop", passed: false, report: "desktop/report.json" }] };
  await writeNew(join(testCase.out, path), json(manifest));
  const packet = await prepareBuildJudge({ ...testCase, acceptance: path });
  assert.equal(packet.packet.automaticAcceptance.passed, false);
  assert.ok(packet.prompt.includes("Missing beat"));
  await writeFile(join(testCase.out, "acceptance/desktop/report.json"), "tampered");
  await assert.rejects(prepareBuildJudge({ ...testCase, acceptance: path }), /Acceptance artifact changed/);
});

test("prototype acceptance must bind the independent capture helper as well as the checker", async t => {
  const testCase = await fixture(t, { prototype: true });
  const expected = JSON.parse(await readFile(join(testCase.prepared.inputs, "expectations.json")));
  const source = await captureSource(testCase.work);
  const report = json({ passed: false, problems: ["Missing motion"], sourceDigest: source.digest });
  await writeNew(join(testCase.out, "acceptance/desktop/report.json"), report);
  const commandLog = "Synthetic failed build output: TYPE_ERROR complete diagnostic.\n";
  await writeNew(join(testCase.out, "acceptance/build.log"), commandLog);
  await writeNew(join(testCase.out, "acceptance/desktop/rendered.html"), "<h1>Complete saved HTML evidence</h1>");
  const manifest = { schemaVersion: 1, taskKind: "prototype-depth", fixture: "fixture", workspace: testCase.work, expected, sourceBefore: source, sourceAfter: source, sourceUnchanged: true, frozen: {
    checker: testCase.prepared.manifest.hashes["implementation/evals/check-build.mjs"],
    library: testCase.prepared.manifest.hashes["implementation/evals/lib/build-check.mjs"],
    capture: testCase.prepared.manifest.hashes["implementation/evals/lib/build-capture.mjs"],
    expectations: testCase.prepared.manifest.hashes["expectations.json"],
  }, artifacts: { "desktop/report.json": hash(report), "build.log": hash(commandLog), "desktop/rendered.html": hash("<h1>Complete saved HTML evidence</h1>") }, results: [{ report: "desktop/report.json", passed: false }], complete: true, passed: false };
  const acceptance = "acceptance/manifest.json";
  await writeNew(join(testCase.out, acceptance), json(manifest));
  const prepared = await prepareBuildJudge({ ...testCase, acceptance });
  assert.equal(prepared.packet.automaticAcceptance.passed, false);
  assert.ok(prepared.prompt.includes("Missing motion"));
  assert.equal(prepared.evidence["run/acceptance/build.log"], commandLog);
  assert.equal(prepared.evidence["run/acceptance/desktop/rendered.html"], "<h1>Complete saved HTML evidence</h1>");
  for (const mutate of [
    copy => { delete copy.sourceBefore; },
    copy => { delete copy.sourceAfter; },
    copy => { copy.sourceUnchanged = false; },
    copy => { copy.sourceBefore.digest = "0".repeat(64); },
    copy => { copy.sourceAfter.exclusions.push("app"); },
    copy => {
      const file = copy.sourceBefore.files.find(file => file.path === "app/page.tsx");
      file.sha256 = "1".repeat(64);
      copy.sourceBefore.digest = hash(JSON.stringify(copy.sourceBefore.files));
      copy.sourceAfter = structuredClone(copy.sourceBefore);
    },
    copy => {
      copy.sourceBefore.files = copy.sourceBefore.files.filter(file => file.path !== "app/page.tsx");
      copy.sourceBefore.digest = hash(JSON.stringify(copy.sourceBefore.files));
      copy.sourceAfter = structuredClone(copy.sourceBefore);
    },
  ]) {
    const changed = structuredClone(manifest); mutate(changed);
    await writeFile(join(testCase.out, acceptance), json(changed));
    await assert.rejects(prepareBuildJudge({ ...testCase, acceptance }), /Acceptance source/);
  }
  const omittedLog = structuredClone(manifest);
  delete omittedLog.artifacts["build.log"];
  await writeFile(join(testCase.out, acceptance), json(omittedLog));
  await assert.rejects(prepareBuildJudge({ ...testCase, acceptance }), /Acceptance artifact file set changed or is incomplete/);
  const wrongMode = json({ passed: false, problems: ["Missing motion"], sourceDigest: "0".repeat(64) });
  await writeFile(join(testCase.out, "acceptance/desktop/report.json"), wrongMode);
  await writeFile(join(testCase.out, acceptance), json({ ...manifest, artifacts: { ...manifest.artifacts, "desktop/report.json": hash(wrongMode) } }));
  await assert.rejects(prepareBuildJudge({ ...testCase, acceptance }), /Acceptance source digest differs in mode report/);
  await writeFile(join(testCase.out, "acceptance/desktop/report.json"), report);
  delete manifest.frozen.capture;
  await writeFile(join(testCase.out, acceptance), json(manifest));
  await assert.rejects(prepareBuildJudge({ ...testCase, acceptance }), /Acceptance checker differs.*build-capture/);
});

test("one mocked judge call preserves every result and refuses all retries", async t => {
  const testCase = await fixture(t), prepared = await prepareBuildJudge(testCase);
  let calls = 0;
  const invoke = async options => {
    calls++;
    assert.equal(options.timeoutMs, 600000);
    assert.equal(options.sessionId, undefined);
    const value = unobserved();
    value.criteria.spine_scope = { status: "fail", reason: "No spine was built.", evidence: [cite()] };
    const events = [{ type: "thread.started", thread_id: "fresh-judge" }, { type: "item.completed", item: { type: "agent_message", text: JSON.stringify(value) } }, { type: "turn.completed", usage: { input_tokens: 200, output_tokens: 70 } }];
    const stdout = events.map(event => JSON.stringify(event)).join("\n") + "\n";
    await writeNew(options.streamPath, stdout); await writeNew(options.stderrPath, "");
    return { stdout, stderr: "", code: 0, durationMs: 123, args: ["fixed"] };
  };
  const result = await runBuildJudge(prepared, { invoke });
  assert.equal(result.complete, true);
  assert.equal(result.counts.fail, 1);
  assert.equal(result.usage.input_tokens, 200);
  assert.equal(calls, 1);
  assert.ok(result.artifacts["stream.jsonl"]);
  assert.ok(result.artifacts["prompt.md"]);
  assert.ok(result.artifacts["judgement.json"]);
  assert.equal(result.artifacts["result.json"], undefined);
  await assert.rejects(runBuildJudge(prepared, { invoke }), { code: "EEXIST" });
  assert.equal(calls, 1);
});

test("invalid judge JSON is preserved as a failed attempt without retry", async t => {
  const testCase = await fixture(t), prepared = await prepareBuildJudge(testCase);
  const invoke = async options => {
    const stdout = [{ type: "thread.started", thread_id: "invalid-judge" }, { type: "item.completed", item: { type: "agent_message", text: '{"not":"the score schema"}' } }, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 5 } }].map(JSON.stringify).join("\n") + "\n";
    await writeNew(options.streamPath, stdout); await writeNew(options.stderrPath, "diagnostic");
    return { stdout, stderr: "diagnostic", code: 0, durationMs: 5, args: [] };
  };
  const result = await runBuildJudge(prepared, { invoke });
  assert.equal(result.complete, false);
  assert.match(result.error, /Invalid judgement/);
  assert.equal(result.usage.output_tokens, 5);
  assert.ok(result.artifacts["error.json"]);
  assert.equal(result.artifacts["judgement.json"], undefined);
});

test("evidence drift after dry preparation stops before a judge directory or model call", async t => {
  const testCase = await fixture(t), prepared = await prepareBuildJudge(testCase);
  await writeFile(join(testCase.out, "turns/01/snapshot/files/app/page.tsx"), "Later mutation");
  let calls = 0;
  await assert.rejects(runBuildJudge(prepared, { invoke: async () => { calls++; } }), /evidence changed after preparation/);
  assert.equal(calls, 0);
  await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
});

test("judge invocation uses the shared isolated helper with no model override, shell or resume", async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-judge-invoke-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  let captured;
  const spawnProcess = (command, args, options) => {
    captured = { command, args, options };
    const child = new EventEmitter(); child.stdout = new EventEmitter(); child.stderr = new EventEmitter();
    child.stdin = { on() {}, end() { queueMicrotask(() => { child.stdout.emit("data", Buffer.from("raw output\n")); child.stderr.emit("data", Buffer.from("diagnostic\n")); child.emit("close", 0); }); } };
    return child;
  };
  const result = await invokeBuildJudge({ cwd: root, prompt: "A local test, no paid call.", schema: join(root, "schema.json"), streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"), disabled: ["/disabled/SKILL.md"], spawnProcess });
  assert.equal(captured.command, "codex");
  for (const setting of ["gpt-6-astra", 'model_reasoning_effort="medium"', 'sandbox_mode="read-only"', "features.shell_tool=false", "features.unified_exec=false", "features.plugins=false", "project_doc_max_bytes=0", "--ignore-user-config"]) assert.ok(captured.args.includes(setting), setting);
  assert.ok(!captured.args.includes("resume"));
  assert.equal(result.stdout, "raw output\n");
  assert.equal(await readFile(join(root, "stderr.log"), "utf8"), "diagnostic\n");
});

test("judge deadline forcibly terminates a local process that ignores SIGTERM", { skip: process.platform === "win32" }, async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-judge-deadline-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  let child;
  const result = await invokeBuildJudge({ cwd: root, prompt: "Local process test only", streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"), timeoutMs: 600, terminateGraceMs: 80,
    spawnProcess: (_command, _args, options) => {
      child = spawn(process.execPath, ["-e", "process.on('SIGTERM',()=>{});process.stdout.write('local process ready\\n');setInterval(()=>{},1000)"], options);
      return child;
    } });
  assert.equal(result.timedOut, true);
  assert.equal(result.code, -1);
  assert.ok(result.durationMs < 2000);
  assert.throws(() => process.kill(child.pid, 0), { code: "ESRCH" });
  assert.equal(await readFile(join(root, "stream.jsonl"), "utf8"), result.stdout);
});

test("full prompt assembly preserves literal placeholder text without recursively replacing evidence", () => {
  const rubric = "Literal {{evidence}} and {{rubric}}", packet = { text: "literal {{rubric}}" };
  assert.equal(assembleBuildJudgePrompt("{{rubric}}\n{{evidence}}", rubric, packet), rubric + "\n" + JSON.stringify(packet, null, 2));
});

test("a frozen paged case preserves a complete prompt too large for inline, including selected stream hashes", async t => {
  const testCase = await fixture(t, { prototype: true, paged: true, large: true });
  const prepared = await prepareBuildJudge(testCase);
  assert.equal(prepared.transport, "paged-v1");
  assert.ok(prepared.fullPrompt.length > MAX_JUDGE_PROMPT_CHARACTERS);
  assert.ok(prepared.prompt.length < 4096);
  assert.equal(verifyPagedEvidence(prepared.bundle).prompt, prepared.fullPrompt);
  for (const document of prepared.packet.documents) {
    const entry = prepared.bundle.documents.find(item => item.path === document.path);
    assert.equal(entry.sha256, document.sha256);
    assert.equal(entry.selectedTextSha256, hash(document.text));
    assert.equal(entry.selectedTextBytes, Buffer.byteLength(document.text));
  }
  const stream = prepared.bundle.documents.find(item => item.path.endsWith("stream.jsonl"));
  assert.notEqual(stream.sha256, stream.selectedTextSha256);
  await assert.rejects(prepareBuildJudge({ ...testCase, maxPromptBytes: 100 }), /frozen transport bounds/);
  await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
});

function deliveredLedger(bundle, pages = bundle.pages) {
  return pages.map(page => JSON.stringify({ bundleDigest: bundle.digest, pageId: page.id, pageSha256: page.sha256, responseSha256: hash(JSON.stringify(pageResponse(bundle, page.id))) })).join("\n") + "\n";
}

async function fakePagedJudge(options, { omitLast = false, badCitation = false } = {}) {
  assert.ok(options.evidenceServer);
  const bundle = JSON.parse(await readFile(options.evidenceServer.bundle, "utf8"));
  await writeNew(options.evidenceServer.ledger, deliveredLedger(bundle, omitLast ? bundle.pages.slice(0, -1) : bundle.pages));
  const value = unobserved("prototype-depth");
  value.criteria.documentation = { status: "fail", reason: "The actor stopped.", evidence: [cite(undefined, badCitation ? "Unsupported invented excerpt" : undefined)] };
  const stdout = [{ type: "thread.started", thread_id: "fresh-paged-judge" }, { type: "item.completed", item: { type: "agent_message", text: JSON.stringify(value) } }, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 5 } }].map(JSON.stringify).join("\n") + "\n";
  await writeNew(options.streamPath, stdout); await writeNew(options.stderrPath, "");
  return { stdout, stderr: "", code: 0, durationMs: 5, args: [] };
}

test("paged invocation accepts only full delivery, preserves evidence and never retries", async t => {
  const testCase = await fixture(t, { prototype: true, paged: true }), prepared = await prepareBuildJudge(testCase);
  let calls = 0;
  const invoke = async options => { calls++; assert.equal(options.timeoutMs, 600000); return fakePagedJudge(options); };
  const result = await runBuildJudge(prepared, { invoke });
  assert.equal(result.complete, true);
  assert.equal(result.delivery.count, prepared.bundle.pages.length);
  assert.equal(result.counts.fail, 1);
  for (const path of ["evidence-bundle.json", "page-delivery.jsonl", "delivery.json", "full-prompt.md", "judgement.json"]) assert.ok(result.artifacts[path], path);
  assert.equal(await readFile(join(testCase.out, "judge/full-prompt.md"), "utf8"), prepared.fullPrompt);
  await assert.rejects(runBuildJudge(prepared, { invoke }), { code: "EEXIST" });
  assert.equal(calls, 1);
});

test("a partial paged delivery cannot become a score even if final JSON is valid", async t => {
  const testCase = await fixture(t, { prototype: true, paged: true }), prepared = await prepareBuildJudge(testCase);
  const result = await runBuildJudge(prepared, { invoke: options => fakePagedJudge(options, { omitLast: true }) });
  assert.equal(result.complete, false);
  assert.match(result.error, /receipt|coverage|delivery|page/i);
  assert.equal(result.artifacts["judgement.json"], undefined);
  assert.ok(result.artifacts["reply.md"]);
});

test("complete paged delivery does not weaken original citation validation", async t => {
  const testCase = await fixture(t, { prototype: true, paged: true }), prepared = await prepareBuildJudge(testCase);
  const result = await runBuildJudge(prepared, { invoke: options => fakePagedJudge(options, { badCitation: true }) });
  assert.equal(result.complete, false);
  assert.match(result.error, /excerpt not present/);
});

test("paged bundle or transport drift is rejected before spending a judge attempt", async t => {
  const testCase = await fixture(t, { prototype: true, paged: true }), prepared = await prepareBuildJudge(testCase);
  let calls = 0;
  const invoke = async () => { calls++; };
  await assert.rejects(runBuildJudge({ ...prepared, transport: "inline" }, { invoke }), /transport differs/);
  const corrupted = structuredClone(prepared);
  corrupted.bundle.pages[0].text += "corruption";
  await assert.rejects(runBuildJudge(corrupted, { invoke }));
  await assert.rejects(runBuildJudge({ ...prepared, fullPrompt: prepared.fullPrompt + "mutation" }, { invoke }), /paged evidence changed/);
  assert.equal(calls, 0);
  await assert.rejects(readFile(join(testCase.out, "judge/started.json")), { code: "ENOENT" });
});

test("paged CLI configuration enables only the bounded accessor and preserves judge isolation", async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-paged-invoke-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  let captured;
  const spawnProcess = (command, args, options) => {
    captured = { command, args, options };
    const child = new EventEmitter(); child.stdout = new EventEmitter(); child.stderr = new EventEmitter();
    child.stdin = { on() {}, end() { queueMicrotask(() => child.emit("close", 0)); } };
    return child;
  };
  await invokeBuildJudge({ cwd: root, prompt: "Bootstrap", streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"),
    evidenceServer: { script: join(root, "server.mjs"), bundle: join(root, "bundle.json"), ledger: join(root, "ledger.jsonl") }, spawnProcess });
  const config = captured.args.find(value => value.startsWith("mcp_servers="));
  assert.match(config, /^mcp_servers=\{storyfolio_evidence=/);
  for (const value of ['enabled_tools=["read_page"]', "required=true", "output_token_limit=65536", process.execPath]) assert.ok(config.includes(value));
  for (const setting of ["features.shell_tool=false", "features.unified_exec=false", "features.plugins=false", "features.apps=false", 'web_search="disabled"', 'sandbox_mode="read-only"', "--ignore-user-config", "--ignore-rules", "tool_output_token_limit=65536"]) assert.ok(captured.args.includes(setting), setting);
  assert.ok(!captured.args.includes("resume"));
  assert.equal(captured.args.at(-1), "-");
});

test("judge timeout terminates the actual evidence accessor descendant", { skip: process.platform !== "linux" }, async t => {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-judge-accessor-deadline-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const bundle = join(root, "bundle.json"), ledger = join(root, "ledger.jsonl");
  await writeNew(bundle, JSON.stringify(createPagedEvidence("Complete local packet")));
  const childProgram = `
    const { spawn } = require("node:child_process");
    const accessor = spawn(process.execPath, ${JSON.stringify([join(sourceRoot, "evals/judge-evidence-server.mjs"), "--bundle", bundle, "--ledger", ledger])}, {stdio:["pipe","pipe","pipe"]});
    accessor.stdin.write(JSON.stringify({jsonrpc:"2.0",id:1,method:"initialize",params:{protocolVersion:"2025-03-26",capabilities:{},clientInfo:{name:"deadline-test",version:"1"}}})+"\\n");
    accessor.stdout.once("data", () => process.stdout.write(String(accessor.pid)+"\\n"));
    accessor.on("exit", () => {});
    process.on("SIGTERM",()=>{});
    setInterval(()=>{},1000);
  `;
  const result = await invokeBuildJudge({ cwd: root, prompt: "Local process only", streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"), timeoutMs: 2000, terminateGraceMs: 500,
    spawnProcess: (_command, _args, options) => spawn(process.execPath, ["-e", childProgram], options) });
  assert.equal(result.timedOut, true);
  assert.equal(result.code, -1);
  assert.ok(result.durationMs < 5000);
  const descendant = Number(result.stdout.trim());
  assert.ok(Number.isSafeInteger(descendant) && descendant > 1, "Accessor completed its real handshake before timeout");
  await readFile(ledger); // Actual server startup, not just a fake process.
  let state = null;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { state = (await readFile(`/proc/${descendant}/stat`, "utf8")).match(/^\d+ \(.*\) (\w)/)?.[1]; }
    catch (error) { if (error.code !== "ENOENT") throw error; state = "gone"; }
    if (["gone", "Z"].includes(state)) break;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  assert.ok(["gone", "Z"].includes(state), `Accessor must not remain running: ${state}`);
  t.diagnostic(`Accessor final state: ${state}; a zombie is terminated and waiting for host reaping.`);
});
