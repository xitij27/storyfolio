// Deterministic transport fakes only. No subprocess, real signal or model call.
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { writeFileSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PassThrough } from "node:stream";
import test from "node:test";
import { planningArgs } from "./contracts.mjs";
import { invokePlanning } from "./process.mjs";

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "storyfolio-planning-transport-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const child = Object.assign(new EventEmitter(), { pid: 424242, stdin: new PassThrough(), stdout: new PassThrough(), stderr: new PassThrough() });
  const signalHost = new EventEmitter(), signals = [], timers = new Map(), spawns = [];
  let now = 0, sequence = 0, received = "", unreferenced = false;
  child.unref = () => { unreferenced = true; };
  child.stdin.on("data", bytes => { received += bytes; });
  const runtime = {
    spawnProcess: (...args) => { spawns.push(args); return child; }, signalHost,
    sendGroupSignal: (pid, signal) => signals.push({ pid, signal }),
    now: () => now,
    setTimer: (callback, ms) => { const id = ++sequence; timers.set(id, { callback, due: now + ms }); return id; },
    clearTimer: id => timers.delete(id),
  };
  const options = { cwd: directory, executable: "/fictional/codex", prompt: "original prompt", timeoutMs: 100,
    streamPath: join(directory, "stream.jsonl"), stderrPath: join(directory, "stderr.log"), lifecyclePath: join(directory, "lifecycle.jsonl"), model: "gpt-6.1-sol" };
  const advance = ms => {
    now += ms;
    for (;;) {
      const next = [...timers].filter(([, row]) => row.due <= now).sort((a, b) => a[1].due - b[1].due)[0];
      if (!next) break;
      timers.delete(next[0]); next[1].callback();
    }
  };
  const events = async () => (await readFile(options.lifecyclePath, "utf8")).trim().split("\n").map(JSON.parse);
  return { directory, child, signalHost, signals, timers, spawns, runtime, options, advance, events, received: () => received, unreferenced: () => unreferenced };
}

test("transport preserves exact planning argv, prompt and raw logs with observed successful close", async t => {
  const f = await fixture(t), pending = invokePlanning(f.options, f.runtime);
  assert.deepEqual(f.spawns[0], [f.options.executable, planningArgs({ model: f.options.model }), { cwd: f.directory, stdio: ["pipe", "pipe", "pipe"], detached: true }]);
  assert.equal(f.received(), f.options.prompt);
  f.child.stdout.write("raw-stream\n"); f.child.stderr.write("raw-warning\n");
  assert.ok((await f.events()).some(row => row.type === "spawn-created"));
  f.child.emit("close", 0, null);
  const result = await pending;
  assert.equal(result.code, 0); assert.equal(result.closureObserved, true); assert.equal(result.forcedRecordClosure, false);
  assert.equal(result.stdout, await readFile(f.options.streamPath, "utf8"));
  assert.equal(result.stderr, await readFile(f.options.stderrPath, "utf8"));
  assert.deepEqual(result.events, await f.events());
  assert.equal(f.timers.size, 0); assert.equal(f.signalHost.listenerCount("SIGTERM"), 0);
});

test("external signals are streamed immediately and never become a deadline or successful zero exit", async t => {
  const f = await fixture(t), pending = invokePlanning(f.options, f.runtime);
  f.signalHost.emit("SIGTERM"); f.signalHost.emit("SIGINT");
  assert.deepEqual(f.signals, [{ pid: 424242, signal: "SIGTERM" }]);
  assert.deepEqual((await f.events()).filter(row => row.type === "external-signal").map(row => [row.signal, row.sender]), [["SIGTERM", "unknown"], ["SIGINT", "unknown"]]);
  f.child.emit("close", 0, null);
  const result = await pending;
  assert.equal(result.code, -1); assert.equal(result.timedOut, false); assert.equal(result.interruptedBy, "SIGTERM");
  assert.equal(result.closureObserved, true); assert.equal(f.signalHost.listenerCount("SIGINT"), 0);
});

test("UTF-8 split across pipe chunks remains byte-equivalent to each retained raw log", async t => {
  const f = await fixture(t), pending = invokePlanning(f.options, f.runtime);
  const bytes = Buffer.from('{"text":"café 🚀"}\n'), first = bytes.indexOf(Buffer.from("é")) + 1, second = bytes.indexOf(Buffer.from("🚀")) + 2;
  for (const chunk of [bytes.subarray(0, first), bytes.subarray(first, second), bytes.subarray(second)]) {
    f.child.stdout.write(chunk); f.child.stderr.write(chunk);
  }
  f.child.emit("close", 0, null);
  const result = await pending;
  assert.equal(result.code, 0); assert.equal(result.stdout, bytes.toString("utf8")); assert.equal(result.stderr, bytes.toString("utf8"));
  assert.deepEqual(Buffer.from(result.stdout), await readFile(f.options.streamPath));
  assert.deepEqual(Buffer.from(result.stderr), await readFile(f.options.stderrPath));
  assert.equal(JSON.parse(result.stdout).text, "café 🚀");
});

test("deadline and one shutdown grace bound record settlement even when close never arrives", async t => {
  const f = await fixture(t), pending = invokePlanning(f.options, f.runtime);
  f.advance(100);
  assert.deepEqual(f.signals, [{ pid: 424242, signal: "SIGTERM" }]);
  f.advance(5000);
  const result = await pending;
  assert.equal(result.code, -1); assert.equal(result.timedOut, true); assert.equal(result.interruptedBy, null);
  assert.equal(result.forcedRecordClosure, true); assert.equal(result.closureObserved, false);
  assert.equal(result.durationMs, 5100); assert.equal(f.timers.size, 0);
  assert.equal(f.unreferenced(), true);
  assert.deepEqual(f.signals, [{ pid: 424242, signal: "SIGTERM" }, { pid: 424242, signal: "SIGKILL" }]);
  assert.equal((await f.events()).at(-1).type, "forced-record-closure");
  // A late child event cannot append to closed descriptors or change the result.
  const bytes = await readFile(f.options.lifecyclePath, "utf8");
  f.child.emit("close", 0, null);
  assert.equal(await readFile(f.options.lifecyclePath, "utf8"), bytes);
});

test("output write failure settles on close without waiting for an asynchronous log callback", async t => {
  const f = await fixture(t);
  const pending = invokePlanning(f.options, { ...f.runtime, writeBytes: (fd, bytes) => { if (String(bytes) === "failing-write") throw new Error("simulated log failure"); writeFileSync(fd, bytes); } });
  f.child.stdout.write("failing-write"); f.child.emit("close", 0, null);
  const result = await pending;
  assert.equal(result.code, -1); assert.match(result.logError, /simulated log failure/);
  assert.equal(result.stdout, "failing-write"); assert.equal(result.closureObserved, true);
  assert.ok((await f.events()).some(row => row.type === "log-error"));
  assert.equal(f.timers.size, 0);
});

test("synchronous spawn failure and asynchronous ENOENT remain failures with retained records", async t => {
  const f = await fixture(t);
  const result = await invokePlanning(f.options, { ...f.runtime, spawnProcess: () => { throw new Error("spawn rejected"); } });
  assert.equal(result.code, -1); assert.match(result.spawnError, /spawn rejected/); assert.equal(result.closureObserved, false);
  assert.equal(f.timers.size, 0); assert.ok((await f.events()).some(row => row.type === "spawn-error"));
  const second = await fixture(t); delete second.child.pid;
  const pending = invokePlanning(second.options, second.runtime);
  second.child.emit("error", new Error("ENOENT"));
  assert.match((await pending).spawnError, /ENOENT/); assert.equal(second.timers.size, 0);
});

test("existing raw evidence prevents any spawn and is never overwritten", async t => {
  const f = await fixture(t); await writeFile(f.options.streamPath, "retained original", { flag: "wx" });
  await assert.rejects(invokePlanning(f.options, f.runtime), { code: "EEXIST" });
  assert.equal(f.spawns.length, 0); assert.equal(await readFile(f.options.streamPath, "utf8"), "retained original");
});
