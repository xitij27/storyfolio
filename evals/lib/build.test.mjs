import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import test from "node:test";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildCodexArgs, captureBuildWorkspace, DEFAULT_SNAPSHOT, executeBuildTurn, hash, inspectBuildInputs, inspectWorkspace, invokeBuildCodex, json, planTurn, populateBuildWorkspace, prepareBuildInputs, readTurnHistory, tomlValue, validateCase, verifyInputs, writeNew } from "./build.mjs";

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

test("build inputs freeze fixture bytes, skill, engine lock, prompts, rubric, protocol and capabilities", async t => {
  const options = await fixture(t);
  await writeNew(join(options.root, "skills/storyfolio/engine/node_modules/ignored"), "large generated tree");
  const prepared = await prepareBuildInputs(options);
  assert.equal(prepared.manifest.digest, hash(json(prepared.manifest.hashes)));
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
  assert.equal(await readFile(join(work, "content/story.ts"), "utf8"), "export const story = []");
  assert.equal(await readFile(join(work, ".agents/skills/storyfolio/SKILL.md"), "utf8"), "Unchanged planning skill");
  await assert.rejects(readFile(join(work, "expectations.json")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "rubric.md")), { code: "ENOENT" });
  await assert.rejects(readFile(join(work, "private.txt")), { code: "ENOENT" });
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

test("fixture allowlists reject traversal, duplicates and symlinks; setup conflicts are preserved", async t => {
  const options = await fixture(t);
  assert.throws(() => validateCase({ ...options.source, files: ["../secret"] }), /Unsafe/);
  assert.throws(() => validateCase({ ...options.source, files: ["a", "a"] }), /unique/);
  assert.throws(() => validateCase({ ...options.source, bounds: { ...options.source.bounds, maxTurns: 4 } }), /fixed prompt/);
  assert.throws(() => validateCase({ ...options.source, bounds: { ...options.source.bounds, maxTokens: Infinity } }), /positive/);
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
  assert.equal(planTurn({ turn: 2, source, history: [first], gate }).sessionId, "thread-1");
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
  const descendantState = await readFile(`/proc/${pids.descendant}/stat`, "utf8").catch(error => { if (error.code === "ENOENT") return null; throw error; });
  assert.ok(descendantState === null || descendantState.split(") ")[1].startsWith("Z "), "descendant must be gone or awaiting reaping, not running");
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
