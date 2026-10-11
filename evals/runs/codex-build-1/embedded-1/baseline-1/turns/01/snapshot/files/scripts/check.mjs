#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { checkMatrix, storyContract } from "./check-lib.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const options = Object.fromEntries(process.argv.slice(2).map(arg => {
  const [key, ...rest] = arg.replace(/^--/, "").split("=");
  return [key, rest.length ? rest.join("=") : true];
}));
const output = resolve(root, String(options.out ?? `checks/${new Date().toISOString().replace(/[:.]/g, "-")}`));
await mkdir(output, { recursive: true });
const require = createRequire(import.meta.url);
const next = require.resolve("next/dist/bin/next");
const [{ story }, { looks }] = await Promise.all([
  import(pathToFileURL(join(root, "content/story.ts")).href),
  import(pathToFileURL(join(root, "content/looks.ts")).href),
]);
const contract = storyContract(story, looks);
const probes = await readFile(join(root, "content/checks.json"), "utf8").then(JSON.parse).catch(error => {
  if (error.code === "ENOENT") return {};
  throw error;
});
const matrix = checkMatrix(contract, probes).filter(entry => !options.only || String(options.only).split(",").includes(entry.name));
if (!matrix.length) throw new Error("--only selected no checks");
const manifest = { started: new Date().toISOString(), node: process.version, scope: options.only ? "selected cases" : "full matrix", contract, probes, matrix, commands: [], results: [], complete: false };
const save = () => writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
await save();
const children = new Set();
let cancelled = false;

function stop(child, signal = "SIGTERM") {
  if (!child?.pid || child.exitCode !== null) return;
  try {
    if (process.platform === "win32") child.kill(signal);
    else process.kill(-child.pid, signal);
  }
  catch (error) { if (error.code !== "ESRCH") throw error; }
}

function launch(args, logName) {
  const log = createWriteStream(join(output, logName));
  const child = spawn(process.execPath, args, {
    cwd: root, detached: process.platform !== "win32",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: ["ignore", "pipe", "pipe"],
  });
  children.add(child);
  manifest.commands.push([process.execPath, ...args]);
  child.stdout.on("data", chunk => log.write(chunk));
  child.stderr.on("data", chunk => log.write(chunk));
  const done = new Promise(resolveDone => {
    child.on("error", error => { log.write(`${error.stack}\n`); });
    child.on("close", (code, signal) => {
      children.delete(child);
      log.end(() => resolveDone({ code, signal }));
    });
  });
  return { child, done };
}

async function run(args, logName, timeout = 180_000) {
  const processRun = launch(args, logName);
  const timer = setTimeout(() => stop(processRun.child), timeout);
  const hardStop = setTimeout(() => stop(processRun.child, "SIGKILL"), timeout + 5000);
  try { return await processRun.done; }
  finally { clearTimeout(timer); clearTimeout(hardStop); }
}

async function freePort() {
  const server = createServer();
  await new Promise((ok, fail) => { server.once("error", fail); server.listen(0, "127.0.0.1", ok); });
  const port = server.address().port;
  await new Promise((ok, fail) => server.close(error => error ? fail(error) : ok()));
  return port;
}

async function waitForServer(url, child) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("Next.js server exited before readiness; read server.log");
    try { if ((await fetch(url, { signal: AbortSignal.timeout(1000) })).status === 200) return; }
    catch { /* The local server may still be starting. */ }
    await new Promise(ok => setTimeout(ok, 250));
  }
  throw new Error("Next.js did not return HTTP 200 within 45 seconds");
}

for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => {
  cancelled = true;
  for (const child of children) stop(child, signal);
  process.exitCode = 1;
});

let server;
try {
  if (!options["skip-build"]) {
    console.log("Building the production app");
    const result = await run([next, "build"], "build.log");
    if (result.code !== 0) throw new Error(`Production build failed (${result.code}); read build.log`);
  }
  const port = await freePort();
  const base = `http://127.0.0.1:${port}/`;
  server = launch([next, "start", "--hostname", "127.0.0.1", "--port", String(port)], "server.log");
  await waitForServer(base, server.child);
  const jobs = Math.max(1, Math.min(4, Math.floor(Number(options.jobs ?? 1)) || 1));
  for (let offset = 0; offset < matrix.length; offset += jobs) {
    const batch = await Promise.all(matrix.slice(offset, offset + jobs).map(async entry => {
    if (cancelled) throw new Error("Check run interrupted; remaining cases were not started");
    console.log(`Checking ${entry.name}`);
    const directory = join(output, entry.name);
    await mkdir(directory, { recursive: true });
    const reportPath = join(directory, "report.json");
    const args = [join(root, "scripts/shoot.mjs"), `--url=${base}?look=${encodeURIComponent(entry.look)}`, `--out=${directory}`, `--report=${reportPath}`, ...entry.flags];
    if (options.wait) args.push(`--wait=${options.wait}`);
    const result = await run(args, `${entry.name}.log`, 240_000);
    const report = await readFile(reportPath, "utf8").then(JSON.parse).catch(() => null);
    return { name: entry.name, ...result, report: report ? `${entry.name}/report.json` : null, problems: report?.problems ?? ["No browser report; read this case's log"] };
    }));
    manifest.results.push(...batch);
    await save();
  }
  manifest.complete = true;
  manifest.finished = new Date().toISOString();
  await save();
  const failed = manifest.results.filter(result => result.code !== 0 || result.problems.length);
  console.log(`${matrix.length - failed.length}/${matrix.length} checks passed. Evidence: ${output}`);
  if (failed.length) process.exitCode = 1;
} catch (error) {
  manifest.error = error.stack;
  await save();
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (server) {
    stop(server.child);
    const timer = setTimeout(() => stop(server.child, "SIGKILL"), 5000);
    await server.done;
    clearTimeout(timer);
  }
  for (const child of children) stop(child);
}
