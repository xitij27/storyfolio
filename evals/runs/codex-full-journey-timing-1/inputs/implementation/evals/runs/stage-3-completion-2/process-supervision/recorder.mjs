// Prospective coordinator recorder. No retries and no claim to identify an external signal sender.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, openSync, readFileSync, writeFileSync, writeSync } from "node:fs";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const json = value => JSON.stringify(value, null, 2) + "\n";
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const ownPath = fileURLToPath(import.meta.url);

export async function recordCommand({ destination, cwd, executable, args = [], env = process.env,
  evidenceRoot = resolve("evals/runs"), shutdownGraceMs = 5000, signalHost = process, spawnProcess = spawn,
  onStart = () => {}, onSpawn = () => {} }) {
  assert(typeof destination === "string" && destination, "Supply a fresh evidence directory");
  assert(typeof executable === "string" && isAbsolute(executable), "Supply an absolute executable path");
  assert(Array.isArray(args) && args.every(arg => typeof arg === "string"), "Command arguments must be strings");
  assert(Number.isSafeInteger(shutdownGraceMs) && shutdownGraceMs > 0 && shutdownGraceMs <= 30000, "Shutdown grace must be 1 to 30000 ms");
  const root = await realpath(evidenceRoot), output = resolve(destination), actualCwd = await realpath(cwd);
  assert(output.startsWith(root + "/"), "Evidence must stay beneath the declared repository evidence root");
  assert.equal(await realpath(dirname(output)), dirname(output), "Evidence parent must not traverse symlinks");
  await mkdir(output); // Never reuse, overwrite or retry an attempt directory.
  const started = Date.now();
  const command = { schemaVersion: 1, started: new Date(started).toISOString(), cwd: actualCwd, executable, args,
    recorderPid: process.pid, recorderParentPid: process.ppid, shutdownGraceMs,
    environment: Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, env[key] ?? null])),
    recorderSha256: hash(await readFile(ownPath)),
    limitations: "One child invocation, no retry and no work deadline. The child runner owns its actor group and limits. Caught signals identify no sender. Uncatchable termination may still prevent a result; detached descendants require separate process evidence." };
  await writeFile(join(output, "command.json"), json(command), { flag: "wx" });
  const descriptors = [];
  let lifecycleFd, stdoutFd, stderrFd, child = null, interruptedBy = null, forwarded = false, childExited = false, childClosed = false, spawned = false, forceAttempted = false, childError = null, forceTimer;
  let sequence = 0;
  const event = (type, detail = {}) => writeSync(lifecycleFd, JSON.stringify({ sequence: ++sequence, at: new Date().toISOString(), elapsedMs: Date.now() - started, type, ...detail }) + "\n");
  const forward = () => {
    if (!interruptedBy || forwarded || !child?.pid || childExited || childClosed) return;
    forwarded = true;
    event("signal_forward_attempt", { signal: interruptedBy, childPid: child.pid, scope: "owned-runner-pid-only" });
    try { event("signal_forward_result", { signal: interruptedBy, childPid: child.pid, delivered: child.kill(interruptedBy) }); }
    catch (error) { event("signal_forward_error", { signal: interruptedBy, childPid: child.pid, error: String(error) }); }
    forceTimer = setTimeout(() => {
      if (childExited || childClosed) return;
      forceAttempted = true;
      event("shutdown_grace_expired", { shutdownGraceMs, childPid: child.pid });
      event("force_attempt", { signal: "SIGKILL", childPid: child.pid, scope: "owned-runner-pid-only" });
      try { event("force_result", { childPid: child.pid, delivered: child.kill("SIGKILL") }); }
      catch (error) { event("force_error", { childPid: child.pid, error: String(error) }); }
    }, shutdownGraceMs);
  };
  const receive = signal => {
    const first = interruptedBy === null;
    interruptedBy ??= signal;
    event("external_signal", { signal, first, childPid: child?.pid ?? null, sender: "unknown" });
    forward(); // Repeated external signals are recorded, not forwarded again.
  };
  const onInt = () => receive("SIGINT"), onTerm = () => receive("SIGTERM");
  try {
    lifecycleFd = openSync(join(output, "lifecycle.jsonl"), "wx"); descriptors.push(lifecycleFd);
    stdoutFd = openSync(join(output, "stdout.log"), "wx"); descriptors.push(stdoutFd);
    stderrFd = openSync(join(output, "stderr.log"), "wx"); descriptors.push(stderrFd);
    event("recorder_started", { recorderPid: process.pid, recorderParentPid: process.ppid });
    signalHost.on("SIGINT", onInt); signalHost.on("SIGTERM", onTerm);
    onStart(command);
    const status = await new Promise(done => {
      try { child = spawnProcess(executable, args, { cwd: actualCwd, env, stdio: ["ignore", stdoutFd, stderrFd] }); }
      catch (error) {
        childError = String(error); event("spawn_error", { error: childError });
        done({ code: null, signal: null }); return;
      }
      child.once("spawn", () => {
        spawned = true;
        event("child_spawned", { childPid: child.pid });
        onSpawn({ childPid: child.pid, recorderPid: process.pid });
        forward();
      });
      child.on("error", error => { childError ??= String(error); event(spawned ? "child_error" : "spawn_error", { childPid: child.pid ?? null, error: String(error) }); });
      child.once("exit", (code, signal) => { childExited = true; clearTimeout(forceTimer); event("child_exit", { childPid: child.pid ?? null, code, signal }); });
      child.once("close", (code, signal) => {
        childClosed = true; clearTimeout(forceTimer);
        event("child_close", { childPid: child.pid ?? null, code, signal });
        done({ code, signal });
      });
      forward();
    });
    const result = { schemaVersion: 1, ...status, finished: new Date().toISOString(), durationMs: Date.now() - started,
      recorderPid: process.pid, recorderParentPid: process.ppid, childPid: child?.pid ?? null, childSpawned: spawned, childExited, childClosed,
      interruptedBy, signalSender: interruptedBy ? "unknown" : null, signalForwarded: forwarded, shutdownGraceMs, forceAttempted, childError,
      complete: spawned && childClosed && status.code === 0 && interruptedBy === null && childError === null,
      status: interruptedBy ? "externally-interrupted" : !spawned ? "spawn-failed" : status.code === 0 && childError === null ? "child-exited-successfully" : "child-exited-unsuccessfully",
      timeoutAttribution: "This recorder has no work deadline. A child timeout is established only by that child's retained result, not inferred from external signals or exit code.",
      // Finalization is synchronous: no newly delivered JS signal handler
      // can append lifecycle bytes between their hash and this result write.
      rawArtifacts: Object.fromEntries(["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"].map(path => [path, hash(readFileSync(join(output, path)))])) };
    writeFileSync(join(output, "result.json"), json(result), { flag: "wx" });
    return { output, ...result };
  } finally {
    clearTimeout(forceTimer);
    signalHost.removeListener("SIGINT", onInt); signalHost.removeListener("SIGTERM", onTerm);
    for (const descriptor of descriptors.reverse()) closeSync(descriptor);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === ownPath) {
  const [destination, cwd, executable, ...args] = process.argv.slice(2);
  const result = await recordCommand({ destination, cwd, executable, args,
    onStart: command => console.log(JSON.stringify({ started: command.started, recorderPid: command.recorderPid, output: resolve(destination), executable, args })),
    onSpawn: record => console.log(JSON.stringify(record)) });
  console.log(JSON.stringify(result));
  process.exitCode = result.complete ? 0 : 1;
}
