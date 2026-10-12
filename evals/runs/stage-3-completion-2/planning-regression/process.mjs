// Bounded process transport only. Preserves planning codexArgs; no retries.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { closeSync, openSync, writeFileSync } from "node:fs";
import { planningArgs, BOUNDS } from "./contracts.mjs";

/** Injectable transport primitives are used only by deterministic no-model tests. */
export async function invokePlanning({ cwd, executable, prompt, streamPath, stderrPath, lifecyclePath, timeoutMs, ...options }, {
  spawnProcess = spawn, signalHost = process, sendGroupSignal = (pid, signal) => process.kill(-pid, signal),
  setTimer = setTimeout, clearTimer = clearTimeout, now = Date.now, writeBytes = writeFileSync,
} = {}) {
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0 && timeoutMs <= BOUNDS.actorTurnMs);
  const args = planningArgs(options), started = now(), descriptors = [];
  let stdoutFd, stderrFd, lifecycleFd;
  try {
    for (const path of [streamPath, stderrPath, lifecyclePath]) descriptors.push(openSync(path, "wx"));
    [stdoutFd, stderrFd, lifecycleFd] = descriptors;
  } catch (error) { for (const fd of descriptors) closeSync(fd); throw error; }
  return await new Promise(resolve => {
    let child, timedOut = false, interruptedBy = null, spawnError = null, logError = null;
    const stdoutChunks = [], stderrChunks = [];
    let stopping = false, settled = false, escalation, deadline, closureObserved = false;
    const events = [];
    const event = (type, fields = {}) => {
      const row = { sequence: events.length + 1, type, elapsedMs: now() - started, at: new Date(now()).toISOString(), childPid: child?.pid ?? null, ...fields };
      events.push(row);
      try { writeBytes(lifecycleFd, JSON.stringify(row) + "\n"); }
      catch (error) { logError ??= String(error); }
    };
    const kill = signal => {
      if (child?.pid) try { sendGroupSignal(child.pid, signal); }
      catch (error) { if (error.code !== "ESRCH") event("signal-error", { signal, error: String(error) }); }
    };
    const handlers = new Map();
    const finish = (exitCode, signal, forced = false) => {
      if (settled) return;
      settled = true; clearTimer(deadline); clearTimer(escalation);
      if (stopping && !forced) kill("SIGKILL");
      for (const [name, handler] of handlers) signalHost.removeListener(name, handler);
      // Never wait for an asynchronous stream.end callback. The retained logs
      // use synchronous writes, so a late write failure cannot hang shutdown.
      if (forced) { child?.stdin?.destroy(); child?.stdout?.destroy(); child?.stderr?.destroy(); child?.unref?.(); }
      event(forced ? "forced-record-closure" : "closed", { exitCode, signal, closureObserved });
      for (const fd of descriptors) try { closeSync(fd); } catch (error) { logError ??= String(error); }
      resolve({ stdout: Buffer.concat(stdoutChunks).toString("utf8"), stderr: Buffer.concat(stderrChunks).toString("utf8"),
        code: timedOut || interruptedBy || spawnError || logError || forced ? -1 : exitCode, exitCode, signal,
        timedOut, interruptedBy, spawnError, logError, closureObserved, forcedRecordClosure: forced, durationMs: now() - started, args, executable,
        timeoutMs, graceMs: BOUNDS.graceMs, events,
        limits: "Signals target only the spawned process group. Forced record closure is a failure, not proof that detached or escaped descendants exited." });
    };
    const stop = (signal, reason) => {
      if (stopping || settled) return;
      stopping = true; event("stop-request", { signal, reason }); kill(signal);
      escalation = setTimer(() => {
        event("shutdown-escalation"); kill("SIGKILL");
        // Pipes inherited by an escaped descendant must not keep this record
        // promise open forever. Preserve missing close as an explicit failure.
        finish(null, null, true);
      }, Math.min(BOUNDS.graceMs, Math.max(0, started + timeoutMs + BOUNDS.graceMs - now())));
    };
    for (const signal of ["SIGTERM", "SIGINT"]) {
      const handler = () => { interruptedBy ??= signal; event("external-signal", { signal, sender: "unknown" }); stop(signal, "external signal"); };
      handlers.set(signal, handler); signalHost.on(signal, handler);
    }
    deadline = setTimer(() => { timedOut = true; event("deadline"); stop("SIGTERM", "paid-unit deadline"); }, timeoutMs);
    event("spawn-request", { executable, timeoutMs, graceMs: BOUNDS.graceMs });
    if (logError) { finish(null, null, true); return; }
    try { child = spawnProcess(executable, args, { cwd, stdio: ["pipe", "pipe", "pipe"], detached: true }); }
    catch (error) { spawnError = String(error); event("spawn-error", { error: spawnError }); finish(null, null); return; }
    event("spawn-created", { childPid: child.pid ?? null });
    const retain = (fd, channel, bytes) => {
      if (settled) return;
      (channel === "stdout" ? stdoutChunks : stderrChunks).push(Buffer.from(bytes));
      try { writeBytes(fd, bytes); }
      catch (error) { logError ??= String(error); event("log-error", { channel, error: logError }); stop("SIGTERM", "log error"); }
    };
    child.stdout.on("data", bytes => retain(stdoutFd, "stdout", bytes));
    child.stderr.on("data", bytes => retain(stderrFd, "stderr", bytes));
    child.stdin.on("error", () => {});
    child.on("error", error => {
      if (settled) return;
      spawnError = String(error); event("spawn-error", { error: spawnError });
      if (child.pid) stop("SIGTERM", "child error"); else finish(null, null);
    });
    child.on("close", (exitCode, signal) => {
      if (settled) return;
      closureObserved = true; finish(exitCode, signal);
    });
    if (logError) stop("SIGTERM", "lifecycle log error");
    child.stdin.end(prompt);
  });
}
