// Coordinator process lifecycle only. This helper performs no retry.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

export const CAPTURE_BOUNDS = Object.freeze({ timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 });

export async function runBounded({ executable, args, cwd, env, timeoutMs, graceMs = 5000, onEvent = () => {}, onStdout = () => {}, onStderr = () => {}, signalSource = process }) {
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0);
  assert.ok(Number.isSafeInteger(graceMs) && graceMs > 0);
  const started = Date.now();
  return await new Promise(resolve => {
    const child = spawn(executable, args, { cwd, env, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "", stderr = "", timedOut = false, externalSignal = null, stopping = false, escalation = null, spawnError = null;
    const event = (type, fields = {}) => onEvent({ at: new Date().toISOString(), elapsedMs: Date.now() - started, type, wrapperPid: process.pid, childPid: child.pid ?? null, ...fields });
    const stop = (signal, reason) => {
      if (stopping) { event("additional-stop-request", { signal, reason }); return; }
      stopping = true;
      event("stop-request", { signal, reason, action: "signal owned checker PID; checker owns orderly child shutdown" });
      if (child.pid && child.exitCode === null && child.signalCode === null) child.kill(signal);
      const remainingGrace = Math.min(graceMs, Math.max(0, started + timeoutMs + graceMs - Date.now()));
      escalation = setTimeout(() => {
        if (child.pid && child.exitCode === null && child.signalCode === null) {
          event("shutdown-escalation", { signal: "SIGKILL", reason, action: "kill owned checker PID only" });
          child.kill("SIGKILL");
        }
      }, remainingGrace);
    };
    const handlers = new Map(["SIGTERM", "SIGINT"].map(signal => [signal, () => {
      externalSignal ??= signal;
      event("external-signal", { signal, sender: "unknown" });
      stop(signal, "external signal");
    }]));
    for (const [signal, handler] of handlers) signalSource.on(signal, handler);
    const deadline = setTimeout(() => { timedOut = true; event("deadline", { timeoutMs }); stop("SIGTERM", "checker deadline"); }, timeoutMs);
    event("spawn-request", { executable, args, timeoutMs, graceMs, totalCapMs: timeoutMs + graceMs, deadline: new Date(started + timeoutMs).toISOString(), hardEscalationAt: new Date(started + timeoutMs + graceMs).toISOString() });
    child.once("spawn", () => event("spawned"));
    child.stdout.on("data", bytes => { stdout += bytes; onStdout(bytes); });
    child.stderr.on("data", bytes => { stderr += bytes; onStderr(bytes); });
    child.once("error", error => { spawnError = String(error); event("spawn-error", { error: spawnError }); });
    child.once("exit", (code, signal) => event("exit", { code, signal }));
    child.once("close", (code, signal) => {
      clearTimeout(deadline); clearTimeout(escalation);
      for (const [name, handler] of handlers) signalSource.removeListener(name, handler);
      event("closed", { code, signal, timedOut, externalSignal });
      resolve({ code, signal, timedOut, externalSignal, spawnError, wrapperPid: process.pid, childPid: child.pid ?? null, started: new Date(started).toISOString(), finished: new Date().toISOString(), durationMs: Date.now() - started, timeoutMs, graceMs, totalCapMs: timeoutMs + graceMs, stdout, stderr });
    });
  });
}
