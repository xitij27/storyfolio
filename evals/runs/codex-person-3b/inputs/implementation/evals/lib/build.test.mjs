import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import test from "node:test";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildCodexArgs, buildTaskIdentity, captureBuildWorkspace, DEFAULT_SNAPSHOT, executeBuildTurn, hash, inspectBuildInputs, inspectWorkspace, invokeBuildCodex, json, planTurn, populateBuildWorkspace, prepareBuildInputs, readTurnHistory, tomlValue, validateCase, verifyBuildSetupProbe, verifyInputs, writeNew } from "./build.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-build-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = { schemaVersion: 1, id: "sample", workspaceRoot: "fixture/workspace", files: ["docs/story/storyboard.md", "public/person.bin"], expectations: "fixture/expectations.json", rubric: "rubric.md", protocol: "protocol.md", prompts: ["turn1.md", "turn2.md", "turn3.md"], bounds: { maxTurns: 3, turnTimeoutMs: 900000, maxWallMs: 2400000, maxTokens: 1500000 } };
  for (const [path, bytes] of Object.entries({
    "fixture/case.json": json(source), "fixture/workspace/docs/story/storyboard.md": "Approved story", "fixture/workspace/public/person.bin": Buffer.from([255, 0, 130]),
    "fixture/workspace/private.txt": "Not supplied", "fixture/expectations.json": "{}", "rubric.md": "Independent criteria", "protocol.md": "Frozen question", "turn1.md": "Build spine.", "turn2.md": "Build chapters.", "turn3.md": "Finish.",
    "skills/storyfolio/SKILL.md": "Unchanged planning skill", "skills/storyfolio/references/asking.md": "Ask first", "skills/storyfolio/engine/package-lock.json": '{"lockfileVersion":3}', "skills/storyfolio/engine/package.json": '{"name":"test-site"}', "skills/storyfolio/engine/content/story.ts": "export const story = []", "runner.mjs": "frozen runner",
  })) await writeNew(join(root, path), bytes);
  return { root, runs: join(root, "runs"), casePath: "fixture/case.json", cohort: "build-1", source, capabilities: { model: "test-model", disabledSkills: [], config: {} }, implementationFiles: ["runner.mjs"] };
}

async function journeyFixture(t) {
  const options = await fixture(t);
  const source = { ...options.source, schemaVersion: 3, taskKind: "full-journey", setupMode: "unscaffolded", requestedStops: [1, 2, 3, 4, 5, 6], refusalTurns: [2, 3, 4, 5, 6],
    files: ["material/person.md", "public/assets/diagram.bin"], prompts: Array.from({ length: 6 }, (_, index) => `turn${index + 1}.md`), bounds: { ...options.source.bounds, maxTurns: 6, maxWallMs: 5400000 } };
  await writeNew(join(options.root, "fixture/workspace/material/person.md"), "Unconfirmed fictional profile");
  await writeNew(join(options.root, "fixture/workspace/public/assets/diagram.bin"), Buffer.from([0, 255, 128]));
  for (let turn = 4; turn <= 6; turn++) await writeNew(join(options.root, `turn${turn}.md`), `Fixed input ${turn}.`);
  await writeFile(join(options.root, options.casePath), json(source));
  return { ...options, source };
}

async function preparedJourney(t) {
  const options = await journeyFixture(t), prepared = await prepareBuildInputs(options);
  const work = join(options.root, "work"), out = join(options.root, "out"), setup = join(out, "setup");
  const population = await populateBuildWorkspace(prepared.inputs, work);
  const snapshot = await captureBuildWorkspace(work, join(setup, "snapshot"), prepared.source.snapshot);
  return { ...options, prepared, work, out, setup, population, snapshot };
}

async function journeyProbe({ prepared, setup, work }) {
  await writeNew(join(setup, "environment.json"), json({ role: "coordinator-environment", actorPreflight: false, modelCalls: 0 }));
  const evidence = ["environment.json", "snapshot/manifest.json"], evidenceHashes = {};
  for (const path of evidence) { const bytes = await readFile(join(setup, path)); evidenceHashes[path] = { sha256: hash(bytes), bytes: bytes.length }; }
  const probe = { schemaVersion: 1, passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0, inputDigest: prepared.manifest.digest, capabilitySha256: prepared.manifest.hashes["capabilities.json"], work, evidence, evidenceHashes };
  await writeNew(join(setup, "probe.json"), json(probe));
  return probe;
}

test("full-journey has an explicit six-stop schema and cannot masquerade as a seeded build or diagnostic", async t => {
  const { source } = await journeyFixture(t), valid = validateCase(source);
  assert.deepEqual(buildTaskIdentity(valid), { taskKind: "full-journey", requestedStops: [1, 2, 3, 4, 5, 6] });
  assert.deepEqual(valid.refusalTurns, [2, 3, 4, 5, 6]);
  assert.deepEqual(validateCase({ ...source, refusalTurns: [] }).refusalTurns, []);
  for (const update of [
    { schemaVersion: 1 }, { schemaVersion: 2 }, { schemaVersion: 4 }, { taskKind: undefined }, { taskKind: "prototype-depth" },
    { setupMode: undefined }, { setupMode: "scaffold" }, { setupMode: "existing-site" },
    { requestedStops: undefined }, { requestedStops: [4, 5, 6] }, { requestedStops: [1, 2, 3, 4, 6, 5] }, { requestedStops: [1, 2, 3, 4, 5, 5] }, { requestedStops: [1, 2, 3, 4, 5, "6"] },
    { prompts: source.prompts.slice(0, 5) }, { prompts: [...source.prompts.slice(0, 5), source.prompts[0]] },
    { bounds: { ...source.bounds, maxTurns: 5 } }, { bounds: { ...source.bounds, maxTurns: 7 } }, { bounds: { ...source.bounds, maxTokens: 0 } },
    { refusalTurns: undefined }, { refusalTurns: [6, 5] }, { refusalTurns: [7] },
    { snapshot: { roots: ["material", "public"] } }, { snapshot: { roots: [".agents", "material"] } },
  ]) assert.throws(() => validateCase({ ...source, ...update }));
  for (const path of ["app/page.tsx", "package.json", "docs/story/confirmations.md", ".agents/extra/SKILL.md", "public/app.js", "material/node_modules/runtime.js"]) assert.throws(() => validateCase({ ...source, files: [path] }));
  const legacy = { ...source, schemaVersion: 1, taskKind: undefined, requestedStops: [4], prompts: [source.prompts[0]], bounds: { ...source.bounds, maxTurns: 1 } };
  assert.throws(() => validateCase(legacy), /setupMode/);
  assert.throws(() => validateCase({ ...legacy, schemaVersion: 2, taskKind: "prototype-depth" }), /setupMode/);
});

test("unscaffolded preparation copies only declared material/assets and installed skill into an empty root", async t => {
  const state = await preparedJourney(t), { population, work, snapshot, prepared } = state;
  assert.equal(population.setupMode, "unscaffolded");
  assert.equal(population.scaffolded, false);
  assert.deepEqual(population.copied, []);
  assert.deepEqual(population.inventory.initialEntries, []);
  assert.match(population.inventory.phase, /No root application or approval history/);
  assert.doesNotMatch(population.inventory.phase, /Existing site/);
  const expected = Object.keys(prepared.manifest.hashes).flatMap(path => path.startsWith("fixture/") ? [path.slice(8)] : path.startsWith("skill/") ? [`.agents/skills/storyfolio/${path.slice(6)}`] : []).sort();
  assert.deepEqual(Object.keys(snapshot.files).sort(), expected);
  assert.deepEqual(snapshot.unexpected, []);
  assert.deepEqual(snapshot.excluded, []);
  assert.deepEqual(await readFile(join(work, "public/assets/diagram.bin")), Buffer.from([0, 255, 128]));
  for (const path of ["package.json", "content/story.ts", "app/page.tsx", "docs/story/storyboard.md", "rubric.md", "expectations.json"]) await assert.rejects(readFile(join(work, path)), { code: "ENOENT" });
  assert.equal(await readFile(join(work, ".agents/skills/storyfolio/engine/package.json"), "utf8"), '{"name":"test-site"}');
  const occupied = join(state.root, "occupied");
  await writeNew(join(occupied, "package.json"), "Preserve existing source");
  await assert.rejects(populateBuildWorkspace(prepared.inputs, occupied), /fresh empty nonsymlink/);
  assert.equal(await readFile(join(occupied, "package.json"), "utf8"), "Preserve existing source");
  await assert.rejects(readFile(join(occupied, "material/person.md")), { code: "ENOENT" });
  const empty = join(state.root, "empty"), linked = join(state.root, "linked");
  await mkdir(empty); await symlink(empty, linked);
  await assert.rejects(populateBuildWorkspace(prepared.inputs, linked), /fresh empty nonsymlink/);
  await assert.rejects(readFile(join(empty, "material/person.md")), { code: "ENOENT" });
});

test("legacy setup probes keep their original identity and existing-evidence requirements", async t => {
  const options = await fixture(t), prepared = await prepareBuildInputs(options), setup = join(options.root, "setup"), work = join(options.root, "work");
  await writeNew(join(setup, "proof.log"), "Legacy proof");
  const probe = { schemaVersion: 1, passed: true, inputDigest: prepared.manifest.digest, capabilitySha256: prepared.manifest.hashes["capabilities.json"], work, evidence: ["proof.log"] };
  await writeNew(join(setup, "probe.json"), json(probe));
  const params = { source: prepared.source, manifest: prepared.manifest, setup, work };
  assert.deepEqual(await verifyBuildSetupProbe(params), probe);
  // Existing cohorts did not bind evidence hashes, claim an environment-only
  // scope or require a setup snapshot here. Do not retroactively impose those.
  await writeFile(join(setup, "proof.log"), "Still existing legacy evidence");
  assert.deepEqual(await verifyBuildSetupProbe(params), probe);
  const diagnostic = { ...options.source, schemaVersion: 2, taskKind: "prototype-depth", prompts: options.source.prompts.slice(0, 1), bounds: { ...options.source.bounds, maxTurns: 1 } };
  assert.deepEqual(await verifyBuildSetupProbe({ ...params, source: diagnostic }), probe);
  for (const update of [{ passed: false }, { inputDigest: "wrong" }, { capabilitySha256: "wrong" }, { work: "wrong" }, { evidence: [] }, { schemaVersion: 2 }]) {
    await writeFile(join(setup, "probe.json"), json({ ...probe, ...update }));
    await assert.rejects(verifyBuildSetupProbe(params), /passing saved capability probe/);
  }
  await writeFile(join(setup, "probe.json"), json({ ...probe, evidence: ["missing.log"] }));
  await assert.rejects(verifyBuildSetupProbe(params), { code: "ENOENT" });
});

test("full-journey readiness binds neutral evidence and initial source without pretending actor preflight occurred", async t => {
  const state = await preparedJourney(t), probe = await journeyProbe(state);
  const { setup, work, prepared } = state, params = { source: prepared.source, manifest: prepared.manifest, setup, work };
  assert.deepEqual(await verifyBuildSetupProbe(params), probe);
  for (const update of [{ scope: undefined }, { scope: "existing-site" }, { actorPreflight: true }, { actorPreflight: undefined }, { modelCalls: 1 }, { modelCalls: undefined }, { evidenceHashes: undefined }, { evidenceHashes: {} }, { evidence: [...probe.evidence, probe.evidence[0]] }, { evidence: ["environment.json"] }, { evidence: ["snapshot/manifest.json"], evidenceHashes: { "snapshot/manifest.json": probe.evidenceHashes["snapshot/manifest.json"] } }]) {
    await writeFile(join(setup, "probe.json"), json({ ...probe, ...update }));
    await assert.rejects(verifyBuildSetupProbe(params), /full-journey requires/);
  }
  await writeFile(join(setup, "probe.json"), json(probe));
  const environment = await readFile(join(setup, "environment.json"));
  await writeFile(join(setup, "environment.json"), "Unbound replacement");
  await assert.rejects(verifyBuildSetupProbe(params), /Setup evidence changed/);
  await writeFile(join(setup, "environment.json"), environment);
  const snapshotBytes = await readFile(join(setup, "snapshot/manifest.json"));
  const altered = JSON.parse(snapshotBytes); delete altered.files["material/person.md"];
  const changedBytes = Buffer.from(json(altered));
  await writeFile(join(setup, "snapshot/manifest.json"), changedBytes);
  await writeFile(join(setup, "probe.json"), json({ ...probe, evidenceHashes: { ...probe.evidenceHashes, "snapshot/manifest.json": { sha256: hash(changedBytes), bytes: changedBytes.length } } }));
  await assert.rejects(verifyBuildSetupProbe(params), /exactly frozen material/);
  await writeFile(join(setup, "snapshot/manifest.json"), snapshotBytes); await writeFile(join(setup, "probe.json"), json(probe));
  const copyPath = join(setup, "snapshot/files/material/person.md"), original = await readFile(copyPath);
  await writeFile(copyPath, "Changed saved copy");
  await assert.rejects(verifyBuildSetupProbe(params), /snapshot copy changed/);
  await writeFile(copyPath, original);
  // The same immutable environment record remains usable after legitimate
  // actor work; the per-turn source guard separately binds that later work.
  await writeNew(join(work, "app/page.tsx"), "Later actor source");
  assert.deepEqual(await verifyBuildSetupProbe(params), probe);
});

test("full-journey plans all six actual stops with explicit gates and one conversation", async t => {
  const { source } = await journeyFixture(t), history = [];
  for (let turn = 1; turn <= 6; turn++) {
    const gate = turn === 1 ? null : { afterTurn: turn - 1, advance: true, previousTurnDigest: history.at(-1).digest, observation: `Actual handoff ${turn - 1} observed.` };
    if (turn > 1) assert.throws(() => planTurn({ turn, source, history }), /Coordinator gate/);
    const plan = planTurn({ turn, source, history, gate });
    assert.equal(plan.taskKind, "full-journey"); assert.equal(plan.requestedStop, turn); assert.equal(plan.sessionId, turn === 1 ? null : "journey-thread");
    history.push({ complete: true, taskKind: "full-journey", requestedStop: turn, sessionId: "journey-thread", durationMs: 1000, usage: { input_tokens: 10, output_tokens: 5 }, digest: `turn-${turn}` });
  }
  assert.throws(() => planTurn({ turn: 7, source, history }), /Turn limit/);
  const first = history[0], gate = { afterTurn: 1, advance: true, previousTurnDigest: first.digest, observation: "Actual facts gate observed." };
  for (const update of [{ taskKind: "prototype-depth" }, { requestedStop: 4 }]) assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, ...update }], gate }), /each actual requested stop/);
  assert.throws(() => planTurn({ turn: 3, source, history: [first, { ...history[1], sessionId: "new-conversation" }], gate }), /one conversation/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, complete: false }], gate }), /Failed turn/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, usage: null }], gate }), /reliable duration or usage/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, durationMs: source.bounds.maxWallMs }], gate }), /wall budget/);
});

test("six synthetic full-journey turns preserve exact prompts, identities, snapshots and observed gates", async t => {
  const state = await preparedJourney(t), { work, out, prepared } = state;
  let calls = 0;
  const invoke = async params => {
    const turn = ++calls;
    assert.equal(params.sessionId, turn === 1 ? null : "journey-thread");
    assert.equal(params.prompt, await readFile(join(prepared.inputs, `prompts/turn${turn}.md`), "utf8"));
    const stdout = [
      { type: "thread.started", thread_id: "journey-thread" },
      { type: "item.completed", item: { type: "agent_message", text: `Actual handoff ${turn}` } },
      { type: "turn.completed", usage: { input_tokens: 20, cached_input_tokens: 10, output_tokens: 5 } },
    ].map(event => JSON.stringify(event)).join("\n") + "\n";
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "");
    await writeNew(join(work, `docs/story/turn${turn}.md`), `Synthetic actor source for stop ${turn}`);
    return { stdout, stderr: "", code: 0, durationMs: 50, args: [], timedOut: false };
  };
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: state.capabilities, invoke };
  for (let turn = 1; turn <= 6; turn++) {
    const history = await readTurnHistory(out), gate = turn === 1 ? null : { afterTurn: turn - 1, advance: true, previousTurnDigest: history.at(-1).digest, observation: `Reviewed actual handoff ${turn - 1}.` };
    if (turn > 1) await assert.rejects(executeBuildTurn({ ...run, turn }), /Coordinator gate/);
    const result = await executeBuildTurn({ ...run, turn, gate });
    assert.equal(result.complete, true); assert.equal(result.requestedStop, turn); assert.equal(result.taskKind, "full-journey");
    const started = JSON.parse(await readFile(join(result.location, "started.json")));
    assert.equal(started.taskKind, "full-journey"); assert.equal(started.requestedStop, turn);
    assert.equal(result.snapshot.files[`docs/story/turn${turn}.md`].type, "file");
    if (gate) assert.deepEqual(JSON.parse(await readFile(join(result.location, "gate.json"))), gate);
  }
  assert.equal(calls, 6);
  assert.equal((await readTurnHistory(out)).length, 6);
  await assert.rejects(executeBuildTurn({ ...run, turn: 6 }), /never overwritten/);
  await assert.rejects(executeBuildTurn({ ...run, turn: 7 }), /Turn limit/);
  assert.equal(calls, 6);
});

test("full-journey initial source rejects seeded, changed, generated or unrecorded bytes before invoking", async t => {
  const state = await preparedJourney(t), { work, out, prepared, snapshot } = state;
  let calls = 0;
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: state.capabilities, turn: 1, invoke: async () => { calls++; throw new Error("Must not invoke"); } };
  for (const path of ["app/page.tsx", "unknown-dir/runtime.js", "node_modules/preseeded/index.js"]) {
    await writeNew(join(work, path), "Not frozen initial source");
    await assert.rejects(executeBuildTurn(run), /source inventory differs/);
    await rm(join(work, path));
  }
  const person = join(work, "material/person.md"), original = await readFile(person);
  await writeFile(person, "Changed profile");
  await assert.rejects(executeBuildTurn(run), /source changed after/);
  await writeFile(person, original);
  await rm(person);
  await assert.rejects(executeBuildTurn(run), /source inventory differs/);
  await writeNew(person, original);
  await symlink(person, join(work, "material/link.md"));
  await assert.rejects(executeBuildTurn(run), /Unsupported source input/);
  await rm(join(work, "material/link.md"));
  const extra = { type: "file", hash: hash("Injected app"), size: 12 };
  await writeFile(join(out, "setup/snapshot/manifest.json"), json({ ...snapshot, files: { ...snapshot.files, "app/page.tsx": extra } }));
  await writeNew(join(work, "app/page.tsx"), "Injected app");
  await assert.rejects(executeBuildTurn(run), /exactly frozen material/);
  assert.equal(calls, 0);
  await assert.rejects(readFile(join(out, "turns/01/started.json")), { code: "ENOENT" });
});

test("full-journey continuation requires live source equality and does not relax non-bare Git metadata", async t => {
  const state = await preparedJourney(t), { work, out, prepared } = state;
  let calls = 0;
  const invoke = async params => {
    calls++;
    const stdout = [{ type: "thread.started", thread_id: "journey-thread" }, { type: "item.completed", item: { type: "agent_message", text: "Fact handoff" } }, { type: "turn.completed", usage: { input_tokens: 10, output_tokens: 5 } }].map(event => JSON.stringify(event)).join("\n") + "\n";
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "");
    await writeNew(join(work, `docs/story/actor-${calls}.md`), "Observed actor work");
    return { stdout, stderr: "", code: 0, durationMs: 50, args: [], timedOut: false };
  };
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: state.capabilities, invoke };
  assert.equal((await executeBuildTurn({ ...run, turn: 1 })).complete, true);
  const history = await readTurnHistory(out), gate = { afterTurn: 1, advance: true, previousTurnDigest: history[0].digest, observation: "Actual source and facts gate reviewed." }, next = { ...run, turn: 2, gate };
  const actorFile = join(work, "docs/story/actor-1.md"), original = await readFile(actorFile);
  await writeFile(actorFile, "Changed after gate review");
  await assert.rejects(executeBuildTurn(next), /source changed after/);
  await writeFile(actorFile, original);
  for (const path of ["app/new-runtime.ts", "unknown-dir/new-runtime.ts"]) {
    await writeNew(join(work, path), "Unrecorded code");
    await assert.rejects(executeBuildTurn(next), /source inventory differs/);
    await rm(join(work, path));
  }
  const git = join(work, ".git-local");
  await mkdir(join(git, "objects"), { recursive: true }); await mkdir(join(git, "refs"));
  await writeNew(join(git, "HEAD"), "ref: refs/heads/main\n");
  await writeNew(join(git, "config"), "[core]\n\tbare = false\n");
  await assert.rejects(executeBuildTurn(next), /source inventory differs/);
  await rm(git, { recursive: true });
  assert.equal(calls, 1);
  await assert.rejects(readFile(join(out, "turns/02/started.json")), { code: "ENOENT" });
  // Known generated trees retain the existing policy after actual actor work.
  await writeNew(join(work, "node_modules/generated/index.js"), "Generated dependency");
  await writeNew(join(work, ".next/generated.js"), "Generated build output");
  assert.equal((await executeBuildTurn(next)).complete, true);
  assert.equal(calls, 2);
});

test("incomplete full-journey turns remain preserved and cannot continue or retry", async t => {
  const state = await preparedJourney(t), { work, out, prepared } = state;
  let calls = 0;
  const invoke = async params => {
    calls++;
    const stdout = '{"type":"thread.started","thread_id":"partial-journey"}\n';
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "Timeout");
    await writeNew(join(work, "docs/story/partial.md"), "Incomplete actor work");
    return { stdout, stderr: "Timeout", code: -1, durationMs: 900000, args: [], timedOut: true };
  };
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: state.capabilities, invoke };
  const result = await executeBuildTurn({ ...run, turn: 1 });
  assert.equal(result.complete, false); assert.equal(result.timedOut, true); assert.equal(result.usage, null);
  assert.equal(result.requestedStop, 1); assert.equal(result.taskKind, "full-journey");
  assert.ok(result.snapshot.files["docs/story/partial.md"]);
  const history = await readTurnHistory(out);
  await assert.rejects(executeBuildTurn({ ...run, turn: 2, gate: { afterTurn: 1, advance: true, previousTurnDigest: history[0].digest, observation: "Cannot approve an incomplete turn." } }), /Failed turn/);
  await assert.rejects(executeBuildTurn({ ...run, turn: 1 }), /never overwritten/);
  assert.equal(calls, 1);
});

test("build inputs freeze fixture bytes, skill, engine lock, prompts, rubric, protocol and capabilities", async t => {
  const options = await fixture(t);
  await writeNew(join(options.root, "skills/storyfolio/engine/node_modules/ignored"), "large generated tree");
  const prepared = await prepareBuildInputs(options);
  assert.equal(prepared.manifest.digest, hash(json(prepared.manifest.hashes)));
  assert.equal(prepared.source.setupMode, "scaffold");
  assert.deepEqual(prepared.source.requestedStops, [4, 5, 6]);
  assert.deepEqual(prepared.source.refusalTurns, [2, 3]);
  assert.deepEqual(await prepareBuildInputs(options), prepared);
  assert.ok(prepared.manifest.hashes["skill/engine/package-lock.json"]);
  assert.ok(prepared.manifest.hashes["protocol.md"]);
  assert.ok(prepared.manifest.hashes["prompts/turn3.md"]);
  assert.equal(prepared.manifest.hashes["fixture/private.txt"], undefined);
  assert.equal(prepared.manifest.hashes["skill/engine/node_modules/ignored"], undefined);
  assert.deepEqual(await readFile(join(prepared.inputs, "fixture/public/person.bin")), Buffer.from([255, 0, 130]));
  const work = join(options.root, "work");
  let recordedInventory;
  const populated = await populateBuildWorkspace(prepared.inputs, work, { beforeScaffold: async inventory => {
    recordedInventory = inventory;
    await assert.rejects(readFile(join(work, "package.json")), { code: "ENOENT" });
  } });
  assert.deepEqual(recordedInventory.initialEntries, []);
  assert.deepEqual(recordedInventory.fixtureFiles, options.source.files);
  assert.ok(!recordedInventory.files.includes("package.json"));
  assert.ok(recordedInventory.files.includes(".agents/skills/storyfolio/engine/package.json"));
  assert.deepEqual(populated.inventory, recordedInventory);
  assert.equal(populated.scaffolded, true);
  assert.equal(await readFile(join(work, "content/story.ts"), "utf8"), "export const story = []");
  assert.equal(await readFile(join(work, ".agents/skills/storyfolio/SKILL.md"), "utf8"), "Unchanged planning skill");
  await assert.rejects(readFile(join(work, "expectations.json")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "rubric.md")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "private.txt")), { code: "ENOENT" });
});

test("declared existing-site preparation retains supplied source and lockfile bytes without scaffolding", async t => {
  const options = await fixture(t);
  const site = { "package.json": '{"name":"existing-site"}\n', "package-lock.json": Buffer.from('{\n  "name": "existing-lock", "lockfileVersion": 3\n}\n'), "content/story.ts": "export const story = ['approved spine'];\n" };
  for (const [path, bytes] of Object.entries(site)) await writeNew(join(options.root, "fixture/workspace", path), bytes);
  await writeNew(join(options.root, "skills/storyfolio/engine/engine-only.txt"), "would be scaffolded");
  const source = { ...options.source, setupMode: "existing-site", requestedStops: [5, 6], refusalTurns: [1, 2], prompts: options.source.prompts.slice(0, 2), files: [...options.source.files, ...Object.keys(site)], bounds: { ...options.source.bounds, maxTurns: 2, maxUncachedTokens: 350000 } };
  await writeFile(join(options.root, options.casePath), json(source));
  const prepared = await prepareBuildInputs(options), work = join(options.root, "work");
  let inventory;
  const result = await populateBuildWorkspace(prepared.inputs, work, { beforeScaffold: value => { inventory = value; } });
  assert.equal(result.setupMode, "existing-site");
  assert.equal(result.scaffolded, false);
  assert.deepEqual(result.copied, []);
  assert.deepEqual(result.conflicts, []);
  assert.equal(inventory.setupMode, "existing-site");
  assert.match(inventory.phase, /explicitly skipped/);
  for (const [path, bytes] of Object.entries(site)) assert.deepEqual(await readFile(join(work, path)), Buffer.from(bytes));
  assert.deepEqual(await readFile(join(work, "public/person.bin")), Buffer.from([255, 0, 130]));
  assert.equal(await readFile(join(work, ".agents/skills/storyfolio/SKILL.md"), "utf8"), "Unchanged planning skill");
  await assert.rejects(readFile(join(work, "engine-only.txt")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "next-env.d.ts")), { code: "ENOENT" });
  await assert.rejects(populateBuildWorkspace(prepared.inputs, work), /EEXIST/);
  for (const [path, bytes] of Object.entries(site)) assert.deepEqual(await readFile(join(work, path)), Buffer.from(bytes));
});

test("case validation binds prompt count, ordered stop and refusal lists, and optional uncached bounds", async t => {
  const { source } = await fixture(t);
  const shortened = { ...source, prompts: source.prompts.slice(0, 2), bounds: { ...source.bounds, maxTurns: 2 } };
  assert.deepEqual(validateCase(shortened).requestedStops, [4, 5]);
  assert.deepEqual(validateCase(shortened).refusalTurns, [2]);
  assert.deepEqual(validateCase({ ...shortened, requestedStops: [5, 6], refusalTurns: [1, 2] }).requestedStops, [5, 6]);
  assert.deepEqual(validateCase({ ...shortened, requestedStops: [4, 6], refusalTurns: [] }).refusalTurns, []);
  for (const setupMode of [null, "overwrite", false]) assert.throws(() => validateCase({ ...source, setupMode }), /setupMode/);
  for (const requestedStops of [null, [], [5], [6, 5], [5, 5], [3, 6], ["5", 6], [4, 5, 6]]) assert.throws(() => validateCase({ ...shortened, requestedStops }), /requestedStops/);
  for (const refusalTurns of [null, [0], [3], [1.5], [2, 1], [1, 1], ["1"]]) assert.throws(() => validateCase({ ...shortened, refusalTurns }), /refusalTurns/);
  for (const maxUncachedTokens of [null, 0, -1, 0.5, Infinity, Number.MAX_SAFE_INTEGER + 1]) assert.throws(() => validateCase({ ...source, bounds: { ...source.bounds, maxUncachedTokens } }), /maxUncachedTokens/);
});

test("prototype-depth is a versioned one-turn task, never an alias for a journey stop", async t => {
  const { source: legacy } = await fixture(t);
  const source = { ...legacy, schemaVersion: 2, taskKind: "prototype-depth", prompts: legacy.prompts.slice(0, 1), bounds: { ...legacy.bounds, maxTurns: 1 } };
  const validated = validateCase(source);
  assert.equal(validated.taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(validated, "requestedStops"), false);
  assert.deepEqual(validated.refusalTurns, [1]);
  const planned = planTurn({ source, turn: 1, history: [] });
  assert.equal(planned.taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(planned, "requestedStop"), false);
  assert.equal(planned.timeoutMs, 900000);
  for (const update of [
    { schemaVersion: 1 }, { schemaVersion: 3 }, { taskKind: "stop-4" }, { taskKind: undefined },
    { requestedStops: [4] }, { requestedStops: [] }, { requestedStops: undefined },
    { prompts: legacy.prompts }, { bounds: { ...source.bounds, maxTurns: 2 } },
    { refusalTurns: [] }, { refusalTurns: [2] }, { refusalTurns: null },
  ]) assert.throws(() => validateCase({ ...source, ...update }));
  assert.throws(() => planTurn({ source, turn: 2, history: [{ complete: true }] }), /Turn limit/);
  assert.throws(() => planTurn({ source, turn: 1, history: [{ complete: false }] }), /never overwritten/);
});

test("prototype task identity is frozen and failed single attempts cannot overwrite or advance", async t => {
  const options = await fixture(t);
  const source = { ...options.source, schemaVersion: 2, taskKind: "prototype-depth", prompts: options.source.prompts.slice(0, 1), bounds: { ...options.source.bounds, maxTurns: 1 } };
  await writeFile(join(options.root, options.casePath), json(source));
  const prepared = await prepareBuildInputs(options), work = join(options.root, "work"), out = join(options.root, "out");
  await populateBuildWorkspace(prepared.inputs, work);
  await captureBuildWorkspace(work, join(out, "setup/snapshot"), prepared.source.snapshot);
  let calls = 0;
  const invoke = async params => {
    calls++;
    const stdout = '{"type":"thread.started","thread_id":"partial"}\n';
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "timeout");
    return { stdout, stderr: "timeout", code: -1, durationMs: 900000, args: [], timedOut: true };
  };
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: options.capabilities, invoke };
  await assert.rejects(executeBuildTurn({ ...run, source: options.source, turn: 1 }), /case differs from frozen/);
  assert.equal(calls, 0);
  const result = await executeBuildTurn({ ...run, turn: 1 });
  assert.equal(result.taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(result, "requestedStop"), false);
  assert.equal(result.complete, false);
  assert.equal(result.timedOut, true);
  const started = JSON.parse(await readFile(join(out, "turns/01/started.json")));
  assert.equal(started.taskKind, "prototype-depth");
  assert.equal(Object.hasOwn(started, "requestedStop"), false);
  await assert.rejects(executeBuildTurn({ ...run, turn: 1 }), /never overwritten/);
  await assert.rejects(executeBuildTurn({ ...run, turn: 2 }), /Turn limit/);
  assert.equal(calls, 1);
  await writeFile(join(options.root, options.casePath), json(options.source));
  await assert.rejects(prepareBuildInputs(options), /Current inputs differ/);
});

test("current source or frozen input drift cannot silently reuse a build cohort", async t => {
  const options = await fixture(t);
  const prepared = await prepareBuildInputs(options);
  for (const path of ["fixture/workspace/public/person.bin", "skills/storyfolio/SKILL.md", "skills/storyfolio/engine/package-lock.json", "rubric.md", "protocol.md", "turn1.md", "runner.mjs"]) {
    const original = await readFile(join(options.root, path));
    await writeFile(join(options.root, path), "changed");
    await assert.rejects(prepareBuildInputs(options), /Current inputs differ/);
    await writeFile(join(options.root, path), original);
  }
  await assert.rejects(prepareBuildInputs({ ...options, capabilities: { ...options.capabilities, model: "different" } }), /Current inputs differ/);
  await writeNew(join(prepared.inputs, "unexpected.txt"), "drift");
  await assert.rejects(verifyInputs(prepared.inputs), /file set changed/);
});

test("fresh legacy cohorts automatically freeze the checker and judge transitive capture helper", async t => {
  const options = await fixture(t);
  await writeNew(join(options.root, "evals/lib/build-capture.mjs"), "coordinator capture helper");
  for (const path of ["evals/lib/judge-transport.mjs", "evals/judge-evidence-server.mjs"]) await writeNew(join(options.root, path), "frozen paged transport helper");
  for (const entry of ["evals/check-build.mjs", "evals/lib/build-check.mjs", "evals/codex-build-judge.mjs"]) {
    await writeNew(join(options.root, entry), "entry imports capture helper");
    const inspected = await inspectBuildInputs({ ...options, implementationFiles: [entry] });
    assert.equal(inspected.source.schemaVersion, 1);
    assert.equal(inspected.hashes["implementation/evals/lib/build-capture.mjs"], hash("coordinator capture helper"));
    if (entry === "evals/codex-build-judge.mjs") for (const path of ["evals/lib/judge-transport.mjs", "evals/judge-evidence-server.mjs"]) assert.equal(inspected.hashes[`implementation/${path}`], hash("frozen paged transport helper"));
  }
});

test("fixture allowlists reject traversal, duplicates and symlinks; setup conflicts are preserved", async t => {
  const options = await fixture(t);
  assert.throws(() => validateCase({ ...options.source, files: ["../secret"] }), /Unsafe/);
  assert.throws(() => validateCase({ ...options.source, files: ["a", "a"] }), /unique/);
  assert.throws(() => validateCase({ ...options.source, bounds: { ...options.source.bounds, maxTurns: 4 } }), /fixed prompt/);
  assert.throws(() => validateCase({ ...options.source, bounds: { ...options.source.bounds, maxTokens: Infinity } }), /positive/);
  for (const judgeTransport of [null, "auto", "path-only", 1]) assert.throws(() => validateCase({ ...options.source, judgeTransport }), /judgeTransport/);
  for (const judgeTransport of ["inline", "paged-v1"]) assert.equal(validateCase({ ...options.source, judgeTransport }).judgeTransport, judgeTransport);
  await symlink(join(options.root, "rubric.md"), join(options.root, "fixture/workspace/link.md"));
  await writeFile(join(options.root, options.casePath), json({ ...options.source, files: ["link.md"] }));
  await assert.rejects(inspectBuildInputs(options), /Symlink/);
  await writeFile(join(options.root, options.casePath), json(options.source));
  const { inputs } = await prepareBuildInputs(options);
  const work = join(options.root, "work");
  await writeNew(join(work, "package.json"), "existing project");
  await assert.rejects(populateBuildWorkspace(inputs, work), /conflicts with scaffold/);
  assert.equal(await readFile(join(work, "package.json"), "utf8"), "existing project");
});

test("snapshots preserve binary source, deletion and symlink records while excluding generated trees", async t => {
  const options = await fixture(t);
  const work = join(options.root, "work");
  await writeNew(join(work, "public/asset.bin"), Buffer.from([0, 255, 128]));
  await writeNew(join(work, "docs/story/note.md"), "before");
  await writeNew(join(work, "node_modules/deep/big.bin"), "excluded");
  await writeNew(join(work, "public/.next/generated.bin"), "excluded");
  await writeNew(join(work, ".git/config"), "excluded");
  await writeNew(join(work, "checks/shot.png"), "excluded");
  await writeNew(join(work, "unexpected-root.md"), "inventory only");
  await writeNew(join(work, "unknown-dir/private.bin"), "inventory only");
  const before = await captureBuildWorkspace(work, join(options.root, "before"), DEFAULT_SNAPSHOT);
  await rm(join(work, "docs/story/note.md"));
  await writeFile(join(work, "public/asset.bin"), Buffer.from([255, 5]));
  await symlink("/never/read/outside", join(work, "public/link"));
  const after = await captureBuildWorkspace(work, join(options.root, "after"), DEFAULT_SNAPSHOT, before.files);
  assert.deepEqual(after.changes.map(({ path, change }) => [path, change]), [["docs/story/note.md", "deleted"], ["public/asset.bin", "modified"], ["public/link", "added"]]);
  assert.equal(after.files["public/link"].target, "/never/read/outside");
  assert.deepEqual(await readFile(join(options.root, "after/files/public/asset.bin")), Buffer.from([255, 5]));
  assert.deepEqual(after.unexpected.map(item => item.path), ["unexpected-root.md", "unknown-dir"]);
  assert.deepEqual(after.excluded, [".git", "checks", "node_modules", "public/.next"]);
  await assert.rejects(readFile(join(options.root, "after/files/public/link")), { code: "ENOENT" });
});

test("snapshot bounds fail before oversized source is copied", async t => {
  const { root } = await fixture(t), work = join(root, "work");
  await writeNew(join(work, "public/a.bin"), Buffer.alloc(8));
  await writeNew(join(work, "public/b.bin"), Buffer.alloc(8));
  await assert.rejects(inspectWorkspace(work, { ...DEFAULT_SNAPSHOT, maxFiles: 1 }), /file bound/);
  await assert.rejects(inspectWorkspace(work, { ...DEFAULT_SNAPSHOT, maxFileBytes: 7 }), /byte bound/);
  await assert.rejects(inspectWorkspace(work, { ...DEFAULT_SNAPSHOT, maxBytes: 15 }), /byte bound/);
});

test("turn planning requires observed gates and enforces turn, wall and soft token bounds", async t => {
  const { source } = await fixture(t);
  const first = { complete: true, sessionId: "thread-1", durationMs: 890000, usage: { input_tokens: 800000, output_tokens: 100000 }, digest: "first" };
  const gate = { afterTurn: 1, advance: true, previousTurnDigest: "first", observation: "Spine and two looks shown; author can choose." };
  assert.equal(planTurn({ turn: 1, source, history: [] }).timeoutMs, 900000);
  assert.equal(planTurn({ turn: 1, source, history: [] }).requestedStop, 4);
  assert.equal(planTurn({ turn: 2, source, history: [first], gate }).sessionId, "thread-1");
  assert.equal(planTurn({ turn: 2, source, history: [first], gate }).uncachedTokens, null);
  assert.throws(() => planTurn({ turn: 2, source, history: [first] }), /Coordinator gate/);
  assert.throws(() => planTurn({ turn: 2, source, history: [first], gate: { ...gate, previousTurnDigest: "wrong" } }), /Coordinator gate/);
  assert.throws(() => planTurn({ turn: 1, source, history: [first] }), /contiguous/);
  assert.throws(() => planTurn({ turn: 4, source, history: [] }), /Turn limit/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, complete: false }], gate }), /Failed turn/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, durationMs: 2400000 }], gate }), /wall budget/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, usage: { input_tokens: 1500000, output_tokens: 0 } }], gate }), /token ceiling/);
  assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, usage: null }], gate }), /reliable duration or usage/);
  assert.equal(planTurn({ turn: 2, source, history: [{ ...first, durationMs: 2200000 }], gate }).timeoutMs, 200000);
});

test("uncached budget subtracts the cached subset and rejects the exact between-turn boundary", async t => {
  const { source: original } = await fixture(t);
  const source = { ...original, requestedStops: [4, 5, 6], bounds: { ...original.bounds, maxUncachedTokens: 100000 } };
  const first = { complete: true, sessionId: "thread", durationMs: 1000, usage: { input_tokens: 200000, cached_input_tokens: 150000, output_tokens: 20000 }, digest: "first" };
  const gate = { afterTurn: 1, advance: true, previousTurnDigest: "first", observation: "Copy gate observed." };
  const planned = planTurn({ turn: 2, source, history: [first], gate });
  assert.equal(planned.tokens, 220000);
  assert.equal(planned.cachedInputTokens, 150000);
  assert.equal(planned.uncachedTokens, 70000);
  assert.equal(planned.requestedStop, 5);
  const boundary = { ...first, usage: { ...first.usage, cached_input_tokens: 120000 } };
  assert.throws(() => planTurn({ turn: 2, source, history: [boundary], gate }), /uncached-input-plus-output ceiling/);
  assert.equal(planTurn({ turn: 2, source, history: [{ ...boundary, usage: { ...boundary.usage, cached_input_tokens: 120001 } }], gate }).uncachedTokens, 99999);
  assert.throws(() => planTurn({ turn: 2, source: { ...source, bounds: { ...source.bounds, maxTokens: 220000 } }, history: [first], gate }), /actor token ceiling/);
});

test("uncached and wall accounting aggregate every actor turn without double-counting output", async t => {
  const { source: original } = await fixture(t);
  const source = { ...original, bounds: { ...original.bounds, maxUncachedTokens: 140001 } };
  const first = { complete: true, sessionId: "thread", durationMs: 1000, usage: { input_tokens: 200000, cached_input_tokens: 150000, output_tokens: 20000 }, digest: "first" };
  const second = { ...first, durationMs: 2000, digest: "second" };
  const gate = { afterTurn: 2, advance: true, previousTurnDigest: "second", observation: "Second actual gate observed." };
  const planned = planTurn({ turn: 3, source, history: [first, second], gate });
  assert.equal(planned.elapsedMs, 3000);
  assert.equal(planned.inputTokens, 400000);
  assert.equal(planned.outputTokens, 40000);
  assert.equal(planned.cachedInputTokens, 300000);
  assert.equal(planned.tokens, 440000);
  assert.equal(planned.uncachedTokens, 140000);
  assert.throws(() => planTurn({ turn: 3, source: { ...source, bounds: { ...source.bounds, maxUncachedTokens: 140000 } }, history: [first, second], gate }), /uncached-input-plus-output ceiling/);
});

test("uncached bound fails closed on missing or unreliable cached accounting", async t => {
  const { source: original } = await fixture(t);
  const source = { ...original, bounds: { ...original.bounds, maxUncachedTokens: 350000 } };
  const first = { complete: true, sessionId: "thread", durationMs: 1000, usage: { input_tokens: 20, output_tokens: 10 }, digest: "first" };
  const gate = { afterTurn: 1, advance: true, previousTurnDigest: "first", observation: "Actual gate observed." };
  for (const cached_input_tokens of [undefined, null, -1, 21, 0.1, "10", Infinity, NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, usage: { ...first.usage, cached_input_tokens } }], gate }), /reliable cached-input accounting/);
  }
  for (const [field, value] of [["input_tokens", -1], ["input_tokens", 1.5], ["output_tokens", "10"], ["output_tokens", Infinity]]) {
    assert.throws(() => planTurn({ turn: 2, source, history: [{ ...first, usage: { ...first.usage, cached_input_tokens: 0, [field]: value } }], gate }), /reliable duration or usage/);
  }
  assert.equal(planTurn({ turn: 2, source, history: [{ ...first, usage: { ...first.usage, cached_input_tokens: 0 } }], gate }).uncachedTokens, 30);
  assert.throws(() => planTurn({ turn: 2, source: original, history: [{ ...first, usage: { ...first.usage, cached_input_tokens: 21 } }], gate }), /reliable cached-input accounting/);
});

test("aggregate accounting rejects safe individual counters whose sum is unsafe", async t => {
  const { source: original } = await fixture(t);
  const source = { ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER, maxUncachedTokens: Number.MAX_SAFE_INTEGER } };
  const first = { complete: true, sessionId: "thread", durationMs: 1000, usage: { input_tokens: Number.MAX_SAFE_INTEGER, cached_input_tokens: 0, output_tokens: 1 }, digest: "first" };
  const gate = { afterTurn: 1, advance: true, previousTurnDigest: "first", observation: "Actual gate observed." };
  assert.throws(() => planTurn({ turn: 2, source, history: [first], gate }), /reliable safe integer accounting/);
  const half = { ...first, usage: { input_tokens: Math.ceil(Number.MAX_SAFE_INTEGER / 2), cached_input_tokens: 0, output_tokens: 0 } };
  assert.throws(() => planTurn({ turn: 3, source, history: [half, half], gate: { ...gate, afterTurn: 2 } }), /reliable safe integer accounting/);
});

test("build arguments keep isolation and deliberately supply engine instructions with explicit capability overrides", () => {
  const args = buildCodexArgs({ sessionId: "thread", model: "fixed", disabled: ["/skill/SKILL.md"] });
  assert.ok(args.includes("project_doc_max_bytes=32768"));
  assert.ok(!args.includes("project_doc_max_bytes=0"));
  for (const arg of ["--ignore-user-config", "--ignore-rules", "features.plugins=false", "features.browser_use=false", "sandbox_workspace_write.network_access=false"]) assert.ok(args.includes(arg));
  assert.deepEqual(args.slice(-2), ["thread", "-"]);
  const replaced = buildCodexArgs({ removeConfig: ["sandbox_mode", "sandbox_workspace_write.network_access"], permissionProfile: "local-only", config: { "permissions.local-only.network.enabled": true } });
  assert.equal(replaced.filter(arg => arg.startsWith("sandbox_mode=")).length, 0);
  assert.ok(replaced.includes('default_permissions="local-only"'));
  assert.ok(!replaced.includes("-P"));
  assert.ok(replaced.includes("permissions.local-only.network.enabled=true"));
  assert.throws(() => buildCodexArgs({ permissionProfile: "local-only" }), /removing legacy sandbox settings/);
});

test("actual CLI parses frozen build capability arguments for fresh and resumed turns without a model call", async t => {
  const capabilities = JSON.parse(await readFile(new URL("../builds/local-capabilities.json", import.meta.url), "utf8"));
  for (const sessionId of [undefined, "00000000-0000-4000-8000-000000000000"]) {
    const args = [...buildCodexArgs({ ...capabilities, sessionId }), "--help"];
    assert.ok(args.includes('default_permissions="storyfolio-build"'));
    assert.ok(!args.includes("-P"));
    assert.ok(!args.some(arg => arg.startsWith("sandbox_mode=") || arg.startsWith("sandbox_workspace_write.")));
    const result = await new Promise(resolve => {
      const child = spawn("codex", args, { stdio: ["ignore", "pipe", "pipe"] });
      let stdout = "", stderr = "", error = null;
      const timer = setTimeout(() => child.kill("SIGKILL"), 10000);
      child.stdout.on("data", chunk => { stdout += chunk; });
      child.stderr.on("data", chunk => { stderr += chunk; });
      child.on("error", cause => { error = cause; });
      child.on("close", code => { clearTimeout(timer); resolve({ code, stdout, stderr, error }); });
    });
    if (result.error?.code === "ENOENT") { t.skip("Local Codex CLI is unavailable; no parse or model call attempted."); return; }
    assert.equal(result.code, 0, `${sessionId ? "resume" : "fresh"}: ${result.stderr}`);
    assert.match(result.stdout, sessionId ? /Usage: codex exec resume/ : /Usage: codex exec/);
  }
});

test("CLI config serialization emits restricted TOML tables and rejects unsupported values", () => {
  assert.equal(tomlValue({ enabled: true, domains: { "127.0.0.1": "allow" }, list: ["quote\"", 3.5, false] }), '{"enabled"=true,"domains"={"127.0.0.1"="allow"},"list"=["quote\\\"",3.5,false]}');
  assert.equal(tomlValue("line\n\\path\t"), '"line\\n\\\\path\\t"');
  assert.equal(tomlValue(-0), "-0.0");
  for (const value of [null, undefined, NaN, Infinity, -Infinity, new Date(), () => {}, 1n, [null], { key: null }, "\uD800", new Array(1)]) assert.throws(() => tomlValue(value));
  const cycle = {}; cycle.self = cycle;
  assert.throws(() => tomlValue(cycle), /Circular/);
});

test("the actual local capability profile becomes nested TOML CLI tables without legacy sandbox values", async () => {
  const profile = JSON.parse(await readFile(new URL("../builds/local-capabilities.json", import.meta.url), "utf8"));
  const args = buildCodexArgs(profile);
  const filesystem = args.find(value => value.startsWith("permissions.storyfolio-build.filesystem="));
  const network = args.find(value => value.startsWith("permissions.storyfolio-build.network="));
  assert.ok(filesystem.includes('\":root\"=\"read\"'));
  assert.ok(filesystem.includes('\":workspace_roots\"=\"write\"'));
  assert.ok(network.includes('\"domains\"={\"localhost\"=\"allow\",\"127.0.0.1\"=\"allow\",\"[::1]\"=\"allow\"}'));
  assert.ok(!args.some(value => value.startsWith("sandbox_mode=")));
  assert.ok(!args.some(value => value.startsWith("sandbox_workspace_write.network_access=")));
});

test("one invocation preserves raw streams and source, resumes only with a reviewed gate, and refuses overwrite", async t => {
  const options = await fixture(t), prepared = await prepareBuildInputs(options);
  const work = join(options.root, "work"), out = join(options.root, "out");
  await populateBuildWorkspace(prepared.inputs, work);
  await captureBuildWorkspace(work, join(out, "setup/snapshot"), prepared.source.snapshot);
  let calls = 0;
  const invoke = async params => {
    calls++;
    assert.equal(params.sessionId, calls === 1 ? null : "thread-1");
    const events = [{ type: "thread.started", thread_id: "thread-1" }, { type: "item.completed", item: { type: "agent_message", text: "Reached a gate" } }, { type: "turn.completed", usage: { input_tokens: 20, output_tokens: 10 } }];
    const stdout = events.map(event => JSON.stringify(event)).join("\n") + "\n";
    await writeNew(params.streamPath, stdout);
    await writeNew(params.stderrPath, "diagnostic\n");
    await writeNew(join(work, `docs/story/turn${calls}.md`), "new work");
    return { stdout, stderr: "diagnostic\n", code: 0, durationMs: 500, args: ["frozen"] };
  };
  const run = { out, work, inputs: prepared.inputs, source: prepared.source, capabilities: options.capabilities, invoke };
  const first = await executeBuildTurn({ ...run, turn: 1 });
  assert.equal(first.complete, true);
  assert.equal(first.requestedStop, 4);
  assert.equal(JSON.parse(await readFile(join(out, "turns/01/started.json"), "utf8")).requestedStop, 4);
  assert.equal(calls, 1);
  const history = await readTurnHistory(out);
  assert.equal(history[0].usage.input_tokens, 20);
  await assert.rejects(executeBuildTurn({ ...run, turn: 1 }), /contiguous/);
  await assert.rejects(executeBuildTurn({ ...run, turn: 2 }), /Coordinator gate/);
  assert.equal(calls, 1);
  await executeBuildTurn({ ...run, turn: 2, gate: { afterTurn: 1, advance: true, previousTurnDigest: history[0].digest, observation: "Actual gate verified." } });
  assert.equal(calls, 2);
  await writeFile(join(out, "turns/01/reply.md"), "tampered");
  await assert.rejects(readTurnHistory(out), /artifact changed/);
});

test("failed actor turns retain partial streams and source; incomplete turns cannot retry in place", async t => {
  const options = await fixture(t), prepared = await prepareBuildInputs(options);
  const work = join(options.root, "work"), out = join(options.root, "out");
  await populateBuildWorkspace(prepared.inputs, work);
  await captureBuildWorkspace(work, join(out, "setup/snapshot"), prepared.source.snapshot);
  const invoke = async params => {
    const stdout = '{"type":"thread.started","thread_id":"partial"}\n';
    await writeNew(params.streamPath, stdout); await writeNew(params.stderrPath, "timeout");
    await rm(join(work, "content/story.ts"));
    return { stdout, stderr: "timeout", code: -1, durationMs: 900000, args: [], timedOut: true };
  };
  const result = await executeBuildTurn({ out, work, inputs: prepared.inputs, source: prepared.source, capabilities: options.capabilities, turn: 1, invoke });
  assert.equal(result.complete, false);
  assert.equal(result.timedOut, true);
  assert.ok(result.snapshot.changes.some(change => change.path === "content/story.ts" && change.change === "deleted"));
  const history = await readTurnHistory(out);
  assert.throws(() => planTurn({ source: prepared.source, turn: 2, history }), /Failed turn/);
  const incomplete = join(options.root, "incomplete");
  await mkdir(join(incomplete, "turns/01"), { recursive: true });
  await assert.rejects(readTurnHistory(incomplete), /Incomplete turn is preserved/);
});

test("actor timeout kills its process group including a descendant that ignores SIGTERM", { skip: process.platform !== "linux" }, async t => {
  const { root } = await fixture(t);
  const signalHost = new EventEmitter();
  const childCode = "process.on('SIGTERM', () => {}); process.send('ready'); setInterval(() => {}, 1000);";
  const parentCode = `const {spawn}=require('node:child_process'); const child=spawn(process.execPath,['-e',${JSON.stringify(childCode)}],{stdio:['ignore','ignore','ignore','ipc']}); child.once('message',()=>process.stdout.write(JSON.stringify({pid:process.pid,descendant:child.pid})+'\\n')); setInterval(()=>{},1000);`;
  const result = await invokeBuildCodex({ cwd: root, prompt: "local test only", streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"), timeoutMs: 600, terminateGraceMs: 40, signalHost,
    spawnProcess: (_command, _args, options) => spawn(process.execPath, ["-e", parentCode], options) });
  assert.equal(result.timedOut, true);
  assert.equal(result.code, -1);
  const pids = JSON.parse(result.stdout);
  assert.throws(() => process.kill(pids.pid, 0), { code: "ESRCH" });
  // Sending SIGKILL does not synchronously change the descendant's /proc
  // state. Allow bounded scheduling time, while still rejecting any live child.
  const cleanupStarted = Date.now(), deadline = cleanupStarted + 1000;
  let descendantState;
  do {
    // A process can disappear after open but before read, yielding ESRCH
    // instead of ENOENT. Both mean gone, not a running descendant.
    const stat = await readFile(`/proc/${pids.descendant}/stat`, "utf8").catch(error => { if (["ENOENT", "ESRCH"].includes(error.code)) return null; throw error; });
    descendantState = stat?.split(") ")[1].split(" ")[0] ?? null;
    if (descendantState === null || descendantState === "Z") break;
    await new Promise(resolve => setTimeout(resolve, 10));
  } while (Date.now() < deadline);
  assert.ok(descendantState === null || descendantState === "Z", `descendant must be gone or awaiting reaping within 1 second, not running (last state: ${descendantState})`);
  t.diagnostic(`Descendant cleanup observed after ${Date.now() - cleanupStarted}ms; final state: ${descendantState ?? "gone"}`);
  assert.equal(signalHost.listenerCount("SIGINT"), 0);
  assert.equal(signalHost.listenerCount("SIGTERM"), 0);
  assert.equal(await readFile(join(root, "stream.jsonl"), "utf8"), result.stdout);
});

test("parent interruption terminates the actor and preserves partial output without retaining signal listeners", { skip: process.platform === "win32" }, async t => {
  const { root } = await fixture(t), signalHost = new EventEmitter();
  const result = await invokeBuildCodex({ cwd: root, prompt: "local test only", streamPath: join(root, "stream.jsonl"), stderrPath: join(root, "stderr.log"), timeoutMs: 5000, terminateGraceMs: 40, signalHost,
    spawnProcess: (_command, _args, options) => {
      const child = spawn(process.execPath, ["-e", "process.on('SIGTERM',()=>{});process.stdout.write('partial before interrupt\\n');setInterval(()=>{},1000)"], options);
      child.stdout.once("data", () => signalHost.emit("SIGTERM"));
      return child;
    } });
  assert.equal(result.interruptedBy, "SIGTERM");
  assert.equal(result.timedOut, false);
  assert.equal(result.code, -1);
  assert.equal(result.stdout, "partial before interrupt\n");
  assert.equal(signalHost.listenerCount("SIGINT"), 0);
  assert.equal(signalHost.listenerCount("SIGTERM"), 0);
});
