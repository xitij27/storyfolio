import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { CAPTURE_BOUNDS, runBounded } from "./bounded-process.mjs";

const base = { executable: process.execPath, cwd: process.cwd(), env: process.env, timeoutMs: 2000, graceMs: 150 };
test("production work and cleanup share the authorized fifteen-minute envelope", () => {
  assert.deepEqual(CAPTURE_BOUNDS, { timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 });
  assert.equal(CAPTURE_BOUNDS.timeoutMs + CAPTURE_BOUNDS.graceMs, CAPTURE_BOUNDS.totalCapMs);
});
test("normal exit cancels deadline and captures output", async () => {
  const events = [], signals = new EventEmitter();
  const result = await runBounded({ ...base, signalSource: signals, args: ["-e", "console.log('bounded-test');process.exitCode=3"], onEvent: event => events.push(event) });
  assert.equal(result.code, 3); assert.equal(result.timedOut, false); assert.match(result.stdout, /bounded-test/);
  assert.equal(events.filter(event => event.type === "spawned").length, 1); assert.equal(signals.listenerCount("SIGTERM"), 0);
  assert.ok(!events.some(event => event.type === "deadline"));
});
test("actual child deadline sends TERM and preserves orderly close", async () => {
  const events = [];
  const result = await runBounded({ ...base, timeoutMs: 250, args: ["-e", "process.on('SIGTERM',()=>{console.log('orderly');process.exit(0)});setInterval(()=>{},1000)"], onEvent: event => events.push(event) });
  assert.equal(result.timedOut, true); assert.equal(result.code, 0); assert.match(result.stdout, /orderly/);
  assert.equal(events.filter(event => event.type === "deadline").length, 1); assert.ok(result.durationMs >= 250 && result.durationMs < 2000);
});
test("unresponsive child is killed after bounded grace without retry", async () => {
  const events = [];
  const result = await runBounded({ ...base, timeoutMs: 250, args: ["-e", "process.on('SIGTERM',()=>{});setInterval(()=>{},1000)"], onEvent: event => events.push(event) });
  assert.equal(result.timedOut, true); assert.equal(result.signal, "SIGKILL");
  assert.equal(events.filter(event => event.type === "spawn-request").length, 1);
  assert.equal(events.filter(event => event.type === "shutdown-escalation").length, 1);
  const scheduled = events.find(event => event.type === "spawn-request");
  assert.equal(Date.parse(scheduled.hardEscalationAt) - Date.parse(scheduled.deadline), base.graceMs);
  assert.ok(result.durationMs < 1500, "Small timer fixture must remain bounded including scheduling jitter");
});
test("external signal is recorded as unknown and forwarded, not a deadline", async () => {
  const events = [], signals = new EventEmitter();
  const result = await runBounded({ ...base, signalSource: signals, args: ["-e", "setInterval(()=>{},1000)"], onEvent: event => { events.push(event); if (event.type === "spawned") signals.emit("SIGTERM"); } });
  assert.equal(result.externalSignal, "SIGTERM"); assert.equal(result.timedOut, false); assert.equal(result.signal, "SIGTERM");
  assert.equal(events.find(event => event.type === "external-signal").sender, "unknown");
});
test("spawn failure closes once and does not retry", async () => {
  const events = [];
  const result = await runBounded({ ...base, executable: "/does-not-exist-storyfolio-verification-test", args: [], onEvent: event => events.push(event) });
  assert.match(result.spawnError, /ENOENT/); assert.equal(result.timedOut, false);
  assert.equal(events.filter(event => event.type === "spawn-request").length, 1);
});
