// Pure metadata and injected clocks/sinks. No actual waiting, file or subprocess.
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import { DURATION_MS, HEARTBEAT_MS, parseOwnStat, runHeartbeat, validateTransport } from "./heartbeat.mjs";

const ownProcess = () => ({ pid: 42, ppid: 10, processGroupId: 9, sessionId: 9, ttyNr: 0, foregroundProcessGroupId: -1, startTimeTicks: 12345 });
function fixture(overrides = {}) {
  let clock = 0, nextId = 0, committed = null;
  const tasks = new Map(), journal = [], stdout = [], signalHost = new EventEmitter();
  const schedule = (callback, ms, repeat = false) => { const id = ++nextId; tasks.set(id, { callback, due: clock + ms, interval: repeat ? ms : null }); return id; };
  const options = { transport: "pipe", stdio: { stdinIsTTY: false, stdoutIsTTY: false, stderrIsTTY: false },
    ownProcess, signalHost, now: () => clock, wallNow: () => 1791777600000 + clock,
    append: row => journal.push(row), publish: row => stdout.push(row), commitResult: row => { committed = row; },
    every: (callback, ms) => schedule(callback, ms, true), cancelEvery: id => tasks.delete(id),
    later: (callback, ms) => schedule(callback, ms), cancelLater: id => tasks.delete(id), ...overrides };
  const advance = ms => {
    const target = clock + ms;
    for (;;) {
      const next = [...tasks].filter(([, row]) => row.due <= target).sort((a, b) => a[1].due - b[1].due || a[0] - b[0])[0];
      if (!next) break;
      const [id, row] = next; clock = row.due;
      if (row.interval === null) tasks.delete(id); else row.due += row.interval;
      row.callback();
    }
    clock = target;
  };
  return { options, tasks, journal, stdout, signalHost, advance, committed: () => committed };
}

test("proc parser keeps only own identity and handles parentheses in the process name", () => {
  const fields = ["S", "10", "9", "9", "0", "-1", ...Array(13).fill("0"), "12345"];
  assert.deepEqual(parseOwnStat("42 (node (neutral)) " + fields.join(" ")), ownProcess());
  for (const text of ["", "42 malformed", "0 (node) " + fields.join(" "), "42 (node) S 10", "42 (node) " + fields.map((value, i) => i === 2 ? "NaN" : value).join(" ")]) assert.throws(() => parseOwnStat(text));
});

test("pipe and PTY labels must match the actually observed stdout TTY state", () => {
  assert.equal(validateTransport("pipe", { stdoutIsTTY: false }), "pipe");
  assert.equal(validateTransport("pty", { stdoutIsTTY: true }), "pty");
  for (const [transport, stdoutIsTTY] of [["pipe", true], ["pty", false], ["other", false]]) assert.throws(() => validateTransport(transport, { stdoutIsTTY }));
});

test("natural completion cannot precede fixed 660 seconds and records exact 30-second heartbeats", async () => {
  const f = fixture(), pending = runHeartbeat(f.options);
  assert.equal(DURATION_MS, 660000); assert.equal(HEARTBEAT_MS, 30000);
  f.advance(659999); assert.equal(f.committed(), null);
  assert.deepEqual(f.journal.filter(row => row.type === "heartbeat").map(row => row.elapsedMs), Array.from({ length: 21 }, (_, i) => (i + 1) * 30000));
  f.advance(1); const result = await pending;
  assert.equal(result.complete, true); assert.equal(result.durationMs, 660000); assert.equal(result.interruptedBy, null);
  assert.equal(result.status, "completed-full-duration"); assert.equal(f.journal.at(-1).type, "duration-reached");
  assert.deepEqual(f.stdout, f.journal); assert.equal(f.tasks.size, 0);
  assert.equal(f.signalHost.listenerCount("SIGTERM"), 0); assert.equal(result.childProcesses, 0);
});

test("SIGTERM, SIGINT and PTY SIGHUP immediately journal incomplete closure with unknown sender", async () => {
  for (const signal of ["SIGTERM", "SIGINT", "SIGHUP"]) {
    const f = fixture(), pending = runHeartbeat(f.options); f.advance(390000); f.signalHost.emit(signal);
    assert.equal(f.journal.at(-1).type, "external-signal"); assert.equal(f.journal.at(-1).signal, signal); assert.equal(f.journal.at(-1).sender, "unknown");
    const result = await pending;
    assert.equal(result.complete, false); assert.equal(result.interruptedBy, signal); assert.equal(result.status, "externally-interrupted");
    assert.equal(result.durationMs, 390000); assert.equal(f.tasks.size, 0);
    f.advance(900000); assert.equal(f.committed(), result); assert.equal(result.complete, false);
  }
});

test("a failed journal, stdout sink or terminal record never becomes completion", async () => {
  for (const sink of ["append", "publish"]) {
    const f = fixture({ [sink]: () => { throw new Error("simulated " + sink); } });
    const result = await runHeartbeat(f.options);
    assert.equal(result.complete, false); assert.match(result.error, /simulated/); assert.equal(result.status, "diagnostic-error");
    assert.equal(f.tasks.size, 0); assert.equal(f.signalHost.listenerCount("SIGTERM"), 0);
  }
  const f = fixture({ commitResult: () => { throw new Error("record unavailable"); } }), pending = runHeartbeat(f.options);
  f.advance(660000); const result = await pending;
  assert.equal(result.complete, false); assert.equal(result.status, "recording-failed"); assert.match(result.recordingError, /record unavailable/);
});

test("failure after initial heartbeats closes immediately without silent continuation", async () => {
  const f = fixture(), publish = f.options.publish;
  f.options.publish = row => { if (row.type === "heartbeat") throw new Error("stdout closed"); publish(row); };
  const pending = runHeartbeat(f.options); f.advance(30000);
  const result = await pending;
  assert.equal(result.complete, false); assert.equal(result.durationMs, 30000); assert.match(result.error, /stdout closed/);
  assert.equal(f.tasks.size, 0); assert.equal(f.journal.at(-1).type, "incomplete");
});
