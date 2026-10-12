#!/usr/bin/env node
// Neutral single-process longevity diagnostic. No model, browser, network or child.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { closeSync, fsyncSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

export const DURATION_MS = 660000;
export const HEARTBEAT_MS = 30000;
const ownPath = fileURLToPath(import.meta.url);
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";

export function parseOwnStat(text) {
  const open = text.indexOf("("), close = text.lastIndexOf(")");
  assert.ok(open > 0 && close > open, "Malformed /proc/self/stat");
  const pid = Number(text.slice(0, open).trim()), fields = text.slice(close + 1).trim().split(/\s+/);
  assert.ok(Number.isSafeInteger(pid) && pid > 0 && fields.length >= 20 && /^[A-Za-z]$/.test(fields[0]));
  const integer = (index, name) => { const value = Number(fields[index]); assert.ok(Number.isSafeInteger(value), "Invalid proc " + name); return value; };
  const result = { pid, ppid: integer(1, "ppid"), processGroupId: integer(2, "pgrp"), sessionId: integer(3, "session"),
    ttyNr: integer(4, "tty"), foregroundProcessGroupId: integer(5, "tpgid"), startTimeTicks: integer(19, "starttime") };
  assert.ok(result.ppid >= 0 && result.processGroupId > 0 && result.sessionId > 0 && result.startTimeTicks >= 0);
  return result;
}

export function validateTransport(transport, stdio) {
  assert.ok(["pipe", "pty"].includes(transport), "Transport must be pipe or pty");
  assert.equal(stdio.stdoutIsTTY, transport === "pty", "Declared transport differs from actual stdout TTY state");
  return transport;
}

/** Tests inject clocks/timers and sinks; production duration is never configurable. */
export function runHeartbeat({ transport, stdio, append, publish, commitResult, ownProcess,
  signalHost = process, now = () => Number(process.hrtime.bigint()) / 1e6,
  wallNow = Date.now, every = setInterval, cancelEvery = clearInterval, later = setTimeout, cancelLater = clearTimeout }) {
  validateTransport(transport, stdio);
  const started = now(), startedAt = new Date(wallNow()).toISOString();
  return new Promise(resolveResult => {
    let finished = false, interval, deadline, sequence = 0, heartbeats = 0;
    const handlers = new Map();
    const elapsed = () => Math.max(0, Math.floor(now() - started));
    const emit = (type, detail = {}) => {
      const row = { sequence: ++sequence, type, elapsedMs: elapsed(), at: new Date(wallNow()).toISOString(), ...ownProcess(), ...detail };
      try { append(row); } catch (error) { throw new Error("journal write failed: " + error); }
      try { publish(row); } catch (error) { throw new Error("stdout write failed: " + error); }
    };
    const finish = (reason, signal = null, failure = null) => {
      if (finished) return;
      finished = true; cancelEvery(interval); cancelLater(deadline);
      let error = failure ? String(failure) : null;
      try { emit(signal ? "external-signal" : reason === "duration" ? "duration-reached" : "incomplete", { reason, signal, sender: signal ? "unknown" : null, error }); }
      catch (caught) { error ??= String(caught); }
      const result = { schemaVersion: 1, transport, stdio, started: startedAt, finished: new Date(wallNow()).toISOString(),
        durationMs: elapsed(), requestedDurationMs: DURATION_MS, heartbeatIntervalMs: HEARTBEAT_MS, heartbeats,
        complete: reason === "duration" && elapsed() >= DURATION_MS && error === null,
        status: signal ? "externally-interrupted" : error ? "diagnostic-error" : reason === "duration" ? "completed-full-duration" : "incomplete",
        interruptedBy: signal, signalSender: signal ? "unknown" : null, error,
        modelCalls: 0, browserCalls: 0, networkCalls: 0, childProcesses: 0,
        limits: "One neutral process under this observed transport. Timer jitter is recorded. Caught signals identify no sender; uncatchable termination or storage failure may leave no result. This cannot prove future workload safety." };
      try { commitResult(result); }
      catch (caught) { result.complete = false; result.status = "recording-failed"; result.recordingError = String(caught); }
      for (const [name, handler] of handlers) signalHost.removeListener(name, handler);
      resolveResult(result);
    };
    for (const signal of ["SIGTERM", "SIGINT", "SIGHUP"]) {
      const handler = () => finish("signal", signal);
      handlers.set(signal, handler); signalHost.on(signal, handler);
    }
    const completeWhenDue = () => {
      const remaining = DURATION_MS - (now() - started);
      if (remaining > 0) { deadline = later(completeWhenDue, Math.ceil(remaining)); return; }
      finish("duration");
    };
    try {
      emit("started", { transport, durationMs: DURATION_MS, heartbeatMs: HEARTBEAT_MS });
      interval = every(() => {
        if (finished) return;
        try { heartbeats++; emit("heartbeat", { heartbeat: heartbeats }); }
        catch (error) { finish("io-error", null, error); }
      }, HEARTBEAT_MS);
      deadline = later(completeWhenDue, Math.max(0, Math.ceil(DURATION_MS - (now() - started))));
    } catch (error) { finish("io-error", null, error); }
  });
}

async function main() {
  const { values } = parseArgs({ options: { transport: { type: "string" }, output: { type: "string" } } });
  assert.ok(values.output, "Supply a new output directory");
  const stdio = { stdinIsTTY: Boolean(process.stdin.isTTY), stdoutIsTTY: Boolean(process.stdout.isTTY), stderrIsTTY: Boolean(process.stderr.isTTY) };
  validateTransport(values.transport, stdio);
  const study = realpathSync(dirname(ownPath)), output = resolve(values.output);
  assert.equal(realpathSync(dirname(output)), study, "Output parent must be this canonical diagnostic study directory");
  assert.equal(output, join(study, values.transport + "-1"), "Use the declared fresh pipe-1 or pty-1 directory");
  mkdirSync(output); // Exclusive. Never overwrite, archive or retry an attempt.
  const processMetadata = () => parseOwnStat(readFileSync("/proc/self/stat", "utf8"));
  const command = { schemaVersion: 1, recorded: new Date().toISOString(), transport: values.transport, stdio,
    executable: process.execPath, nodeVersion: process.version, args: process.argv.slice(1), cwd: process.cwd(),
    durationMs: DURATION_MS, heartbeatMs: HEARTBEAT_MS, process: processMetadata(), procSource: "/proc/self/stat",
    helperSha256: sha(readFileSync(ownPath)),
    note: "Direct single Node process. No shell child, detach, retry, model, browser or network. Labels are checked against actual stdout TTY state." };
  writeFileSync(join(output, "command.json"), json(command), { flag: "wx" });
  const journal = openSync(join(output, "journal.jsonl"), "wx");
  let result;
  try {
    result = await runHeartbeat({ transport: values.transport, stdio, ownProcess: processMetadata,
      append: row => { writeFileSync(journal, JSON.stringify(row) + "\n"); fsyncSync(journal); },
      publish: row => writeFileSync(1, JSON.stringify(row) + "\n"),
      commitResult: value => {
        const retained = { ...value, rawArtifacts: Object.fromEntries(["command.json", "journal.jsonl"].map(path => [path, sha(readFileSync(join(output, path)))])) };
        writeFileSync(join(output, "result.json"), json(retained), { flag: "wx" });
      } });
  } finally { closeSync(journal); }
  process.exitCode = result.complete ? 0 : 1;
}

if (process.argv[1] && resolve(process.argv[1]) === ownPath) {
  main().catch(error => { try { writeFileSync(2, String(error) + "\n"); } finally { process.exitCode = 1; } });
}
