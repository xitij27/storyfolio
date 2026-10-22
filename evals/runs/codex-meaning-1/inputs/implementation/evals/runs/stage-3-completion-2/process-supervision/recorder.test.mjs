import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";
import { mkdir, mkdtemp, readFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { recordCommand } from "./recorder.mjs";

const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
async function fixture(t, repository = false) {
  const root = await mkdtemp(join(repository ? resolve("evals/runs") : tmpdir(), ".storyfolio-supervisor-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return { root, destination: join(root, "attempt"), cwd: root, executable: process.execPath, evidenceRoot: root, signalHost: new EventEmitter(), shutdownGraceMs: 100 };
}
async function waitForReady(path) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    try { if ((await readFile(path, "utf8")) === "ready") return; }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("Local test child did not become ready within 5 seconds");
}
async function evidence(result) {
  const saved = await readJson(join(result.output, "result.json"));
  assert.deepEqual(saved, Object.fromEntries(Object.entries(result).filter(([key]) => key !== "output")));
  for (const [path, digest] of Object.entries(saved.rawArtifacts)) assert.equal(sha(await readFile(join(result.output, path))), digest);
  const events = (await readFile(join(result.output, "lifecycle.jsonl"), "utf8")).trimEnd().split("\n").map(line => JSON.parse(line));
  assert.deepEqual(events.map(event => event.sequence), events.map((_, index) => index + 1));
  return events;
}

test("recorder preserves exact command, selected environment, stdout and terminal provenance", async t => {
  const options = await fixture(t), args = ["--input-type=module", "-e", "console.log(JSON.stringify({args:process.argv.slice(1),proof:process.env.TASK_SUPERVISOR_PROOF}));", "--", "two words", "quote\"", "$not-expanded"];
  const result = await recordCommand({ ...options, args, env: { ...process.env, TASK_SUPERVISOR_PROOF: "local no-model proof", NEXT_TELEMETRY_DISABLED: "1" } });
  assert.equal(result.complete, true); assert.equal(result.code, 0); assert.equal(result.status, "child-exited-successfully");
  assert.equal(result.interruptedBy, null); assert.equal(result.forceAttempted, false); assert.equal(result.childClosed, true);
  assert.deepEqual(JSON.parse(await readFile(join(result.output, "stdout.log"), "utf8")), { args: ["two words", "quote\"", "$not-expanded"], proof: "local no-model proof" });
  const command = await readJson(join(result.output, "command.json"));
  assert.deepEqual(command.args, args); assert.equal(command.environment.NEXT_TELEMETRY_DISABLED, "1");
  assert.equal(Object.hasOwn(command.environment, "TASK_SUPERVISOR_PROOF"), false);
  assert.equal(command.recorderPid, process.pid); assert.equal(command.recorderParentPid, process.ppid);
  const events = await evidence(result);
  assert.deepEqual(events.map(e => e.type), ["recorder_started", "child_spawned", "child_exit", "child_close"]);
  assert.equal(events[1].childPid, result.childPid);
  assert.equal(options.signalHost.listenerCount("SIGTERM"), 0);
});

test("nonzero exit and spawn failure preserve evidence without becoming timeout or successful completion", async t => {
  const options = await fixture(t);
  const nonzero = await recordCommand({ ...options, args: ["-e", "process.stderr.write('local failure\\n');process.exit(7)"] });
  assert.equal(nonzero.complete, false); assert.equal(nonzero.code, 7); assert.equal(nonzero.status, "child-exited-unsuccessfully");
  assert.equal(nonzero.interruptedBy, null); assert.equal(nonzero.signalForwarded, false);
  assert.equal(Object.hasOwn(nonzero, "timedOut"), false);
  await evidence(nonzero);
  const failed = await recordCommand({ ...options, destination: join(options.root, "spawn-failure"), executable: join(options.root, "missing-executable") });
  assert.equal(failed.complete, false); assert.equal(failed.childSpawned, false); assert.equal(failed.status, "spawn-failed");
  assert.match(failed.childError, /ENOENT/); assert.equal(failed.interruptedBy, null);
  assert.ok((await evidence(failed)).some(event => event.type === "spawn_error"));
});

test("attempt directories are exclusive and symlinked evidence parents are rejected before spawn", async t => {
  const options = await fixture(t);
  const result = await recordCommand({ ...options, args: ["-e", "process.stdout.write('original')"] });
  let calls = 0;
  await assert.rejects(recordCommand({ ...options, spawnProcess: () => { calls++; } }), { code: "EEXIST" });
  assert.equal(calls, 0); assert.equal(await readFile(join(result.output, "stdout.log"), "utf8"), "original");
  const target = join(options.root, "actual"); await mkdir(target); await symlink(target, join(options.root, "alias"));
  await assert.rejects(recordCommand({ ...options, destination: join(options.root, "alias/attempt"), spawnProcess: () => { calls++; } }), /must not traverse symlinks/);
  await assert.rejects(recordCommand({ ...options, destination: options.root }), /beneath/);
  assert.equal(calls, 0); await evidence(result);
});

test("first caught signal is forwarded once unchanged; repeats are logged and zero child exit remains interrupted", { skip: process.platform === "win32" }, async t => {
  const options = await fixture(t), ready = join(options.root, "ready");
  const code = `const fs=require('node:fs');process.on('SIGINT',()=>{process.stdout.write('received SIGINT\\n');setTimeout(()=>process.exit(0),80)});process.on('SIGTERM',()=>{process.stderr.write('unexpected repeated forwarding');process.exit(9)});fs.writeFileSync(${JSON.stringify(ready)},'ready');setTimeout(()=>process.exit(8),4000);`;
  const pending = recordCommand({ ...options, shutdownGraceMs: 1000, args: ["-e", code] });
  await waitForReady(ready);
  options.signalHost.emit("SIGINT"); options.signalHost.emit("SIGTERM");
  const result = await pending, events = await evidence(result);
  assert.equal(result.code, 0); assert.equal(result.complete, false); assert.equal(result.status, "externally-interrupted");
  assert.equal(result.interruptedBy, "SIGINT"); assert.equal(result.forceAttempted, false);
  assert.deepEqual(events.filter(e => e.type === "external_signal").map(e => [e.signal, e.first]), [["SIGINT", true], ["SIGTERM", false]]);
  assert.deepEqual(events.filter(e => e.type === "signal_forward_attempt").map(e => [e.signal, e.childPid, e.scope]), [["SIGINT", result.childPid, "owned-runner-pid-only"]]);
  assert.equal(await readFile(join(result.output, "stdout.log"), "utf8"), "received SIGINT\n");
  assert.equal(await readFile(join(result.output, "stderr.log"), "utf8"), "");
  assert.equal(options.signalHost.listenerCount("SIGINT"), 0); assert.equal(options.signalHost.listenerCount("SIGTERM"), 0);
});

test("uncooperative owned runner is forced only after the declared shutdown grace", { skip: process.platform === "win32" }, async t => {
  const options = await fixture(t), ready = join(options.root, "ready");
  const code = `process.on('SIGTERM',()=>{});require('node:fs').writeFileSync(${JSON.stringify(ready)},'ready');setTimeout(()=>process.exit(8),4000);`;
  const pending = recordCommand({ ...options, shutdownGraceMs: 60, args: ["-e", code] });
  await waitForReady(ready); options.signalHost.emit("SIGTERM");
  const result = await pending, events = await evidence(result);
  assert.equal(result.complete, false); assert.equal(result.forceAttempted, true); assert.equal(result.signal, "SIGKILL");
  assert.equal(result.interruptedBy, "SIGTERM"); assert.equal(result.childClosed, true);
  const forwarded = events.find(e => e.type === "signal_forward_attempt"), forced = events.find(e => e.type === "force_attempt");
  assert.ok(forced.elapsedMs - forwarded.elapsedMs >= 50);
  assert.equal(forced.childPid, result.childPid); assert.equal(forced.scope, "owned-runner-pid-only");
  assert.equal(events.filter(e => e.type === "force_attempt").length, 1);
  assert.throws(() => process.kill(result.childPid, 0), { code: "ESRCH" });
});

test("actual recorder process catches SIGTERM and retains its owned runner's orderly close", { skip: process.platform === "win32" }, async t => {
  const options = await fixture(t, true), ready = join(options.root, "ready"), recorder = fileURLToPath(new URL("recorder.mjs", import.meta.url));
  const code = `process.on('SIGTERM',()=>{process.stdout.write('orderly child shutdown\\n');process.exit(0)});require('node:fs').writeFileSync(${JSON.stringify(ready)},'ready');setTimeout(()=>process.exit(8),4000);`;
  const child = spawn(process.execPath, [recorder, options.destination, options.cwd, process.execPath, "-e", code], { cwd: resolve("."), stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "", closed = false;
  child.stdout.on("data", bytes => { stdout += bytes; }); child.stderr.on("data", bytes => { stderr += bytes; });
  const resultPromise = new Promise((resolve, reject) => { child.once("error", reject); child.once("close", (code, signal) => { closed = true; resolve({ code, signal }); }); });
  t.after(() => { if (!closed) child.kill("SIGKILL"); });
  await waitForReady(ready); assert.equal(child.kill("SIGTERM"), true);
  const status = await resultPromise;
  assert.deepEqual(status, { code: 1, signal: null }); assert.equal(stderr, "");
  const saved = await readJson(join(options.destination, "result.json"));
  assert.equal(saved.interruptedBy, "SIGTERM"); assert.equal(saved.code, 0); assert.equal(saved.complete, false); assert.equal(saved.forceAttempted, false);
  assert.equal(saved.recorderPid, child.pid); assert.equal(saved.recorderParentPid, process.pid);
  assert.ok(stdout.includes('"childPid"')); assert.equal(await readFile(join(options.destination, "stdout.log"), "utf8"), "orderly child shutdown\n");
  await evidence({ output: options.destination, ...saved });
});

test("invalid grace and relative executables fail before creating an attempt", async t => {
  const options = await fixture(t); let calls = 0;
  for (const shutdownGraceMs of [0, -1, 0.5, 30001, Infinity]) await assert.rejects(recordCommand({ ...options, shutdownGraceMs, spawnProcess: () => { calls++; } }), /Shutdown grace/);
  await assert.rejects(recordCommand({ ...options, executable: "node", spawnProcess: () => { calls++; } }), /absolute executable/);
  assert.equal(calls, 0);
  await assert.rejects(readFile(join(options.destination, "command.json")), { code: "ENOENT" });
});
