// Command-only neutral environment proof. No model, install, build or app writes.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { lstat, mkdir, readFile, readdir, readlink, realpath, writeFile } from "node:fs/promises";
import { basename, delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { inspect, parseArgs } from "node:util";

export const PROOF = Object.freeze({
  cohorts: ["codex-full-journey-baseline-1", "codex-full-journey-baseline-2", "codex-full-journey-candidate-1"],
  temporaryRoot: "/var/tmp/storyfolio-entry-runtime-20261012",
  dependencies: "/tmp/storyfolio-build-capability-20261011",
  playwrightSha256: "a58fb2cec4293e7dcf73c58a179898a4f3986666451a19da4e731fa3af63265b",
  timeoutMs: 120000, graceMs: 5000, commandMs: 30000, requestMs: 5000, browserMs: 30000,
  width: 1440, height: 900,
});
// Prospective launcher identity, inspected after the preserved baseline-1
// PATH failure. Unknown releases, executable entries or aliases fail closed.
export const LAUNCHER = Object.freeze({
  metadata: { layoutVersion: 1, version: "0.162.1", target: "x86_64-unknown-linux-musl", variant: "codex", entrypoint: "bin/codex", resourcesDir: "codex-resources", pathDir: "codex-path" },
  metadataSha256: "f05ebff6db98bd613dd5654461985090c6416b41ad67902243d83a53b305ac05", metadataBytes: 205,
  pathFiles: [{ name: "rg", type: "file", bytes: 5408904, sha256: "e62198eb19b136b88c330af83647b5a962cb99b6b1f066758568f12de1974849" }],
  aliases: ["apply_patch", "applypatch", "codex-execve-wrapper", "codex-linux-sandbox"],
});
export const sha = bytes => createHash("sha256").update(bytes).digest("hex");
export const json = value => JSON.stringify(value, null, 2) + "\n";
export const selectedEnvironment = environment => Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, environment[key] ?? null]));
export const expectedOuterEnvironment = capabilities => ({ ...capabilities.environment, TMPDIR: PROOF.temporaryRoot, NEXT_TELEMETRY_DISABLED: null });
export function sandboxPathLayout(capabilities, environment) {
  assert.deepEqual(environment.expectedOuter, expectedOuterEnvironment(capabilities));
  assert.deepEqual(Object.keys(environment.sandbox).sort(), Object.keys(environment.expectedOuter).sort());
  for (const key of Object.keys(environment.expectedOuter).filter(key => key !== "PATH")) assert.equal(environment.sandbox[key], environment.expectedOuter[key], key);
  const expected = environment.expectedOuter.PATH, actual = environment.sandbox.PATH;
  assert.equal(typeof expected, "string"); assert.ok(expected.length); assert.equal(typeof actual, "string");
  const expectedParts = expected.split(delimiter), actualParts = actual.split(delimiter);
  assert.equal(actualParts.length, expectedParts.length + 2, "Exactly two identified launcher prefixes are required");
  assert.deepEqual(actualParts.slice(2), expectedParts, "The complete outer PATH suffix must remain exact");
  const releaseRoot = dirname(dirname(capabilities.cliExecutable)), codexRoot = resolve(releaseRoot, "../../../..");
  const releaseName = LAUNCHER.metadata.version + "-" + LAUNCHER.metadata.target;
  assert.equal(releaseRoot, join(codexRoot, "packages/standalone/releases", releaseName));
  assert.equal(capabilities.cliExecutable, join(releaseRoot, LAUNCHER.metadata.entrypoint));
  assert.equal(capabilities.cliVersion, "codex-cli " + LAUNCHER.metadata.version);
  assert.match(capabilities.cliSha256, /^[a-f0-9]{64}$/);
  const arg0Root = join(codexRoot, "tmp/arg0"), arg0Directory = actualParts[0], pathDirectory = join(releaseRoot, LAUNCHER.metadata.pathDir);
  assert.equal(dirname(arg0Directory), arg0Root); assert.match(basename(arg0Directory), /^codex-arg0[A-Za-z0-9]{6}$/);
  assert.equal(actualParts[1], pathDirectory, "Package PATH prefix must come from this frozen CLI release");
  return { releaseRoot, arg0Root, arg0Directory, pathDirectory, metadataPath: join(releaseRoot, "codex-package.json") };
}
export function assertSandboxEnvironment(environment, capabilities) {
  const layout = sandboxPathLayout(capabilities, environment), evidence = environment.launcher;
  assert.deepEqual(evidence.layout, layout);
  assert.deepEqual(evidence.metadata, { path: layout.metadataPath, realpath: layout.metadataPath, type: "file", bytes: LAUNCHER.metadataBytes, sha256: LAUNCHER.metadataSha256, value: LAUNCHER.metadata });
  assert.equal(evidence.cli.path, capabilities.cliExecutable); assert.equal(evidence.cli.realpath, capabilities.cliExecutable);
  assert.equal(evidence.cli.type, "file"); assert.equal(evidence.cli.sha256, capabilities.cliSha256); assert.ok(Number.isSafeInteger(evidence.cli.bytes) && evidence.cli.bytes > 0);
  assert.deepEqual(evidence.directories, [layout.releaseRoot, layout.arg0Root, layout.arg0Directory, layout.pathDirectory].map(path => ({ path, realpath: path, type: "directory" })));
  assert.deepEqual(evidence.pathEntries, LAUNCHER.pathFiles);
  assert.deepEqual(evidence.arg0Entries, [{ name: ".lock", type: "file", bytes: 0, sha256: sha("") }, ...LAUNCHER.aliases.map(name => ({ name, type: "symlink", target: capabilities.cliExecutable, realpath: capabilities.cliExecutable }))]);
}
async function observeLauncherEnvironment(capabilities, environment) {
  const layout = sandboxPathLayout(capabilities, environment);
  const regular = async path => {
    const stat = await lstat(path); assert.ok(stat.isFile() && !stat.isSymbolicLink(), "Expected regular launcher file: " + path);
    const canonical = await realpath(path); assert.equal(canonical, path);
    const bytes = await readFile(path); return { path, realpath: canonical, type: "file", bytes: bytes.length, sha256: sha(bytes) };
  };
  const metadata = await regular(layout.metadataPath); metadata.value = JSON.parse(await readFile(layout.metadataPath, "utf8"));
  const cli = await regular(capabilities.cliExecutable), directories = [];
  for (const path of [layout.releaseRoot, layout.arg0Root, layout.arg0Directory, layout.pathDirectory]) {
    const stat = await lstat(path); assert.ok(stat.isDirectory() && !stat.isSymbolicLink(), "Expected real launcher directory: " + path);
    directories.push({ path, realpath: await realpath(path), type: "directory" });
  }
  assert.deepEqual((await readdir(layout.pathDirectory)).sort(), LAUNCHER.pathFiles.map(file => file.name));
  const pathEntries = [];
  for (const { name } of LAUNCHER.pathFiles) { const { path, realpath, ...file } = await regular(join(layout.pathDirectory, name)); pathEntries.push({ name, ...file }); }
  assert.deepEqual((await readdir(layout.arg0Directory)).sort(), [".lock", ...LAUNCHER.aliases]);
  const { path, realpath: lockRealpath, ...lock } = await regular(join(layout.arg0Directory, ".lock")), arg0Entries = [{ name: ".lock", ...lock }];
  for (const name of LAUNCHER.aliases) {
    const target = join(layout.arg0Directory, name); assert.ok((await lstat(target)).isSymbolicLink(), "Expected launcher alias: " + name);
    arg0Entries.push({ name, type: "symlink", target: await readlink(target), realpath: await realpath(target) });
  }
  return { layout, metadata, cli, directories, pathEntries, arg0Entries };
}
export function assertContract({ cohort, source, meta, manifest, capabilities }) {
  assert.ok(PROOF.cohorts.includes(cohort), "Unsupported full-journey cohort");
  assert.equal(source.id, "full-journey-1");
  assert.equal(source.schemaVersion, 3);
  assert.equal(source.taskKind, "full-journey");
  assert.equal(source.setupMode, "unscaffolded");
  assert.deepEqual(source.requestedStops, [1, 2, 3, 4, 5, 6]);
  assert.equal(source.files.length, 7);
  assert.equal(meta.cohort, cohort);
  assert.equal(meta.caseId, source.id);
  assert.equal(meta.taskKind, source.taskKind);
  assert.equal(meta.setupMode, source.setupMode);
  assert.equal(meta.inputDigest, manifest.digest);
  assert.ok(meta.work.startsWith(PROOF.temporaryRoot + "/storyfolio-evals/build-full-journey-1-"));
  assert.equal(capabilities.node.executable, "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node");
  assert.deepEqual(Object.keys(capabilities.environment).sort(), ["LANG", "LD_LIBRARY_PATH", "PATH", "PLAYWRIGHT_BROWSERS_PATH"]);
}
export function assertSource(observed, snapshot) {
  assert.deepEqual(observed.unexpected, []);
  assert.deepEqual(observed.excluded, []);
  assert.deepEqual(observed.entries, snapshot.files, "Initial actor source changed");
}
export function assertInitialSnapshot(snapshot, manifest) {
  const expected = Object.fromEntries(Object.entries(manifest.hashes).flatMap(([path, digest]) => path.startsWith("fixture/") ? [[path.slice(8), digest]] : path.startsWith("skill/") ? [[".agents/skills/storyfolio/" + path.slice(6), digest]] : []));
  assert.equal(snapshot.schemaVersion, 1);
  assert.deepEqual(snapshot.excluded, []); assert.deepEqual(snapshot.unexpected, []);
  assert.deepEqual(Object.keys(snapshot.files).sort(), Object.keys(expected).sort());
  for (const [path, digest] of Object.entries(expected)) {
    assert.equal(snapshot.files[path].type, "file");
    assert.equal(snapshot.files[path].hash, digest, "Initial snapshot does not match frozen input");
    assert.ok(Number.isSafeInteger(snapshot.files[path].size) && snapshot.files[path].size >= 0);
  }
}
export function assertMeasured(report, processResult, capabilities) {
  assert.equal(processResult.code, 0);
  assert.equal(processResult.signal, null);
  assert.equal(processResult.timedOut, false);
  assert.equal(processResult.externalSignal, null);
  assert.equal(processResult.spawnError, null);
  assert.equal(processResult.logError, null);
  assert.equal(processResult.modelCalls, 0);
  assert.equal(processResult.actorPreflight, false);
  assert.ok(Number.isSafeInteger(processResult.durationMs) && processResult.durationMs >= 0 && processResult.durationMs <= PROOF.timeoutMs + PROOF.graceMs, "Proof exceeded its process bound");
  assert.equal(report.schemaVersion, 1);
  assert.equal(report.scope, "unscaffolded-environment");
  assert.equal(report.actorPreflight, false);
  assert.equal(report.modelCalls, 0);
  assert.equal(report.passed, true);
  assert.equal(report.interruptedBy, null);
  assertSandboxEnvironment(report.environment, capabilities);
  assert.deepEqual(report.observations.map(row => row.name).sort(), ["browser", "external-request", "git", "local-http", "node", "npm", "resources"]);
  const row = name => report.observations.find(value => value.name === name);
  for (const name of ["node", "npm", "git", "resources", "local-http", "browser"]) assert.equal(row(name).passed, true, name);
  for (const name of ["npm", "git"]) {
    assert.equal(row(name).code, 0);
    assert.equal(row(name).signal, null);
    assert.equal(row(name).timedOut, false);
    assert.equal(row(name).error, null);
  }
  assert.equal(row("external-request").blocked, true);
  assert.match(row("external-request").cause, /Proxy response \(403\)/);
  assert.equal(row("browser").playwrightEntrypointSha256, PROOF.playwrightSha256);
  assert.equal(row("browser").image, "neutral.png");
  assert.deepEqual(row("browser").viewport, { width: PROOF.width, height: PROOF.height });
}
const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) await main();

async function main() {
  const { values } = parseArgs({ options: { out: { type: "string" }, capabilities: { type: "string" }, workspace: { type: "string" } } });
  assert.ok(values.out && values.capabilities && values.workspace);
  const out = resolve(values.out), workspace = resolve(values.workspace);
  assert.ok(out.startsWith(PROOF.temporaryRoot + "/storyfolio-environment-proof-"));
  assert.ok(!out.startsWith(workspace + "/") && out !== workspace);
  await mkdir(out);
  const capabilities = JSON.parse(await readFile(resolve(values.capabilities)));
  const report = { schemaVersion: 1, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0,
    started: new Date().toISOString(), workspace, out, passed: false, interruptedBy: null, observations: [],
    environment: { expectedOuter: expectedOuterEnvironment(capabilities), sandbox: selectedEnvironment(process.env), launcher: null },
    limits: ["Neutral local page only, not a built application or actor preflight.", "No installation, optional-skill activation, real phone review or site acceptance.", "Command-only sandbox inherits user configuration and is not a filesystem read jail."] };
  const reportPath = join(out, "probe.json");
  await writeFile(reportPath, json(report), { flag: "wx" });
  let browser, server, activeChild;
  const stop = signal => { report.interruptedBy ??= signal; activeChild?.kill("SIGTERM"); void browser?.close().catch(() => {}); server?.closeAllConnections(); };
  const handlers = new Map(["SIGINT", "SIGTERM"].map(signal => [signal, () => stop(signal)]));
  for (const [signal, handler] of handlers) process.on(signal, handler);
  const check = () => assert.equal(report.interruptedBy, null, "Environment proof was interrupted");
  const locate = async name => {
    for (const directory of (process.env.PATH ?? "").split(delimiter)) {
      try { const path = await realpath(join(directory, name)); if ((await lstat(path)).isFile()) return path; } catch {}
    }
    throw new Error("Missing executable: " + name);
  };
  const command = async name => {
    check();
    const executable = await locate(name), started = Date.now();
    const result = await new Promise(done => {
      const child = spawn(executable, ["--version"], { cwd: out, stdio: ["ignore", "pipe", "pipe"] });
      activeChild = child;
      let stdout = "", stderr = "", timedOut = false, error = null;
      const timer = setTimeout(() => { timedOut = true; child.kill("SIGKILL"); }, PROOF.commandMs);
      child.stdout.on("data", chunk => { stdout += chunk; });
      child.stderr.on("data", chunk => { stderr += chunk; });
      child.on("error", value => { error = String(value); });
      child.on("close", (code, signal) => { clearTimeout(timer); activeChild = null; done({ code, signal, stdout, stderr, timedOut, error }); });
    });
    await writeFile(join(out, name + ".log"), result.stdout + result.stderr, { flag: "wx" });
    const passed = result.code === 0 && !result.signal && !result.timedOut && !result.error && result.stdout.trim().length > 0;
    report.observations.push({ name, executable, args: ["--version"], ...result, durationMs: Date.now() - started, passed });
    assert.ok(passed, name + " version command failed");
  };
  try {
    assert.equal(process.execPath, capabilities.node.executable); assert.equal(process.version, capabilities.node.version);
    report.environment.launcher = await observeLauncherEnvironment(capabilities, report.environment);
    assertSandboxEnvironment(report.environment, capabilities);
    report.observations.push({ name: "node", executable: process.execPath, version: process.version, passed: true });
    await command("npm"); await command("git");
    const resources = {};
    for (const [name, path] of Object.entries({ npmCache: "/tmp/storyfolio-npm-cache", browserCache: capabilities.environment.PLAYWRIGHT_BROWSERS_PATH, browserLibraries: capabilities.environment.LD_LIBRARY_PATH, dependencies: PROOF.dependencies })) {
      assert.equal(typeof path, "string");
      const canonical = await realpath(path); assert.ok((await lstat(canonical)).isDirectory());
      resources[name] = { path, canonical, available: true };
    }
    report.observations.push({ name: "resources", resources, passed: true });
    check();
    const html = '<!doctype html><html lang="en"><meta charset="utf-8"><title>Local environment proof</title><style>body{margin:0;padding:80px;background:#eef2f4;color:#17252d;font:24px system-ui}main{max-width:900px}h1{font-size:52px}p{line-height:1.5}</style><main><h1>Local environment proof</h1><p>This neutral page confirms a local HTTP response and a browser opening. It is not a portfolio or a completed actor check.</p></main></html>';
    server = createServer((request, response) => { response.writeHead(200, { "content-type": "text/html; charset=utf-8" }); response.end(html); });
    let localTimer, url;
    await Promise.race([
      (async () => {
        await new Promise((yes, no) => { server.once("error", no); server.listen(0, "127.0.0.1", yes); });
        url = "http://127.0.0.1:" + server.address().port + "/";
        const response = await fetch(url, { signal: AbortSignal.timeout(PROOF.requestMs) });
        assert.equal(response.status, 200); assert.equal(await response.text(), html);
        report.observations.push({ name: "local-http", passed: true, url, status: response.status, contentSha256: sha(html) });
      })(),
      new Promise((_, reject) => { localTimer = setTimeout(() => reject(new Error("Loopback proof exceeded 5000 ms")), PROOF.requestMs); }),
    ]).finally(() => clearTimeout(localTimer));
    check();
    try {
      const external = await fetch("https://example.com/", { signal: AbortSignal.timeout(PROOF.requestMs) });
      report.observations.push({ name: "external-request", blocked: false, status: external.status, cause: "" });
      throw new Error("External request was not blocked");
    } catch (error) {
      if (error.message === "External request was not blocked") throw error;
      const cause = inspect(error, { depth: 6 }), blocked = cause.includes("Proxy response (403)");
      report.observations.push({ name: "external-request", blocked, error: String(error), cause });
      assert.ok(blocked, "External failure is not an explicit proxy 403");
    }
    const dependencyRequire = createRequire(join(PROOF.dependencies, "package.json"));
    const playwrightEntrypoint = await realpath(dependencyRequire.resolve("playwright-core"));
    const playwrightEntrypointSha256 = sha(await readFile(playwrightEntrypoint));
    assert.equal(playwrightEntrypointSha256, PROOF.playwrightSha256);
    const { chromium } = dependencyRequire("playwright-core");
    const browserExecutable = await realpath(chromium.executablePath());
    assert.ok(browserExecutable.startsWith((await realpath(capabilities.environment.PLAYWRIGHT_BROWSERS_PATH)) + "/"));
    let browserTimer;
    await Promise.race([
      (async () => {
        check(); browser = await chromium.launch({ timeout: PROOF.browserMs, args: ["--no-sandbox"] });
        const page = await browser.newPage({ viewport: { width: PROOF.width, height: PROOF.height } });
        const response = await page.goto(url, { waitUntil: "load", timeout: PROOF.requestMs });
        assert.equal(response.status(), 200);
        assert.equal(await page.title(), "Local environment proof");
        assert.equal(await page.locator("h1").innerText(), "Local environment proof");
        await page.screenshot({ path: join(out, "neutral.png"), timeout: PROOF.requestMs });
        const image = await readFile(join(out, "neutral.png"));
        report.observations.push({ name: "browser", passed: true, playwrightEntrypoint, playwrightEntrypointSha256,
          playwrightVersion: dependencyRequire("playwright-core/package.json").version, browserExecutable, browserVersion: browser.version(),
          viewport: { width: PROOF.width, height: PROOF.height }, image: "neutral.png", imageSha256: sha(image), imageBytes: image.length, url });
        await browser.close(); browser = null;
      })(),
      new Promise((_, reject) => { browserTimer = setTimeout(() => reject(new Error("Browser proof exceeded 30000 ms")), PROOF.browserMs); }),
    ]).finally(() => clearTimeout(browserTimer));
    check(); report.passed = true;
  } catch (error) { report.error = String(error); report.cause = inspect(error, { depth: 6 }); process.exitCode = 1; }
  finally {
    await browser?.close().catch(() => {});
    if (server) { server.closeAllConnections(); await new Promise(done => server.close(done)); }
    for (const [signal, handler] of handlers) process.removeListener(signal, handler);
    if (report.interruptedBy) { report.passed = false; process.exitCode = 1; }
    report.finished = new Date().toISOString(); await writeFile(reportPath, json(report)); console.log(json(report));
  }
}
