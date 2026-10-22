// Coordinator-only process evidence. Refuse existing output; never retry a command.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, open, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { hash, json, writeNew } from "../../lib/build.mjs";

const [destination, cwd, executable, ...args] = process.argv.slice(2);
assert(destination && cwd && executable, "Supply new evidence directory, cwd, executable and arguments");
const output = resolve(destination);
assert(output.startsWith(resolve("evals/runs") + "/"), "Evidence must stay under repository evals/runs");
await mkdir(output, { recursive: false });
const started = Date.now();
const command = { schemaVersion: 1, started: new Date(started).toISOString(), cwd: resolve(cwd), executable, args,
  environment: Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, process.env[key] ?? null])),
  wrapperSha256: hash(await readFile(new URL(import.meta.url))),
  note: "One command, no retry. Paid commands, when used, retain their own stricter actor/judge deadlines. This wrapper is not a spending cap." };
await writeNew(join(output, "command.json"), json(command));
const stdout = await open(join(output, "stdout.log"), "wx"), stderr = await open(join(output, "stderr.log"), "wx");
console.log(JSON.stringify({ started: command.started, output, executable, args }));
const result = await new Promise(done => {
  const child = spawn(executable, args, { cwd: command.cwd, env: process.env, stdio: ["ignore", stdout.fd, stderr.fd] });
  child.once("error", error => done({ code: null, signal: null, error: String(error) }));
  child.once("close", (code, signal) => done({ code, signal }));
});
await stdout.close(); await stderr.close();
const retained = { ...result, finished: new Date().toISOString(), durationMs: Date.now() - started,
  stdoutSha256: hash(await readFile(join(output, "stdout.log"))), stderrSha256: hash(await readFile(join(output, "stderr.log"))) };
await writeNew(join(output, "result.json"), json(retained));
console.log(JSON.stringify({ output, ...retained }));
process.exitCode = result.code === 0 ? 0 : 1;
