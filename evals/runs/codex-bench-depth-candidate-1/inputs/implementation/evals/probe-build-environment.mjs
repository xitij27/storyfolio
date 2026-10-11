#!/usr/bin/env node
// A non-model capability probe. Run inside the proposed actor sandbox.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdir, writeFile, open } from "node:fs/promises";
import { resolve, join } from "node:path";
import { parseArgs, inspect } from "node:util";

const { values } = parseArgs({ options: { workspace: { type: "string" }, out: { type: "string" } } });
if (!values.workspace || !values.out) throw new Error("Supply --workspace and --out");
const workspace = resolve(values.workspace), out = resolve(values.out);
await mkdir(out, { recursive: true });
const reportPath = join(out, "probe.json");
const report = { schemaVersion: 1, modelCalls: 0, started: new Date().toISOString(), workspace, node: process.version, observations: [], passed: false };
const initial = await open(reportPath, "wx");
await initial.close();
const save = () => writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
await save();
async function command(name, args) {
  const log = await open(join(out, `${name}.log`), "wx");
  const started = Date.now();
  const result = await new Promise(resolveResult => {
    const child = spawn(process.execPath, args, { cwd: workspace, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: ["ignore", log.fd, log.fd] });
    let timeout = false;
    const timer = setTimeout(() => { timeout = true; child.kill("SIGTERM"); }, 180000);
    child.on("error", error => { clearTimeout(timer); resolveResult({ error: String(error), code: null }); });
    child.on("close", (code, signal) => { clearTimeout(timer); resolveResult({ code, signal, timeout }); });
  });
  await log.close();
  report.observations.push({ name, executable: process.execPath, args, ...result, durationMs: Date.now() - started });
  await save();
  if (result.code !== 0 || result.timeout || result.error) throw new Error(`${name} failed; inspect ${name}.log`);
}
try {
  const server = createServer((request, response) => response.end("storyfolio-local-probe"));
  try {
    await new Promise((yes, no) => { server.once("error", no); server.listen(0, "127.0.0.1", yes); });
    const response = await fetch(`http://127.0.0.1:${server.address().port}/`, { signal: AbortSignal.timeout(5000) });
    if (await response.text() !== "storyfolio-local-probe") throw new Error("Local HTTP did not reach the probe server");
    report.observations.push({ name: "local-http", passed: true });
  } finally { await new Promise(done => server.close(done)); }
  try {
    const response = await fetch("https://example.com/", { signal: AbortSignal.timeout(5000) });
    report.observations.push({ name: "external-request", blocked: false, status: response.status });
    throw new Error("External request was not blocked");
  } catch (error) {
    if (error.message === "External request was not blocked") throw error;
    const cause = inspect(error, { depth: 6 });
    const blocked = cause.includes("Proxy response (403)");
    report.observations.push({ name: "external-request", blocked, error: String(error), cause });
    if (!blocked) throw new Error("External request failed without evidence of proxy denial");
  }
  await save();
  await command("build", ["node_modules/next/dist/bin/next", "build"]);
  await command("browser", ["scripts/check.mjs", "--skip-build", "--only=light-wide", `--out=${join(out, "browser")}`]);
  report.passed = true;
} catch (error) {
  report.error = String(error);
  report.cause = inspect(error, { depth: 6 });
  process.exitCode = 1;
} finally {
  report.finished = new Date().toISOString();
  await save();
  console.log(JSON.stringify(report, null, 2));
}
