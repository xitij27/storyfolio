#!/usr/bin/env node
// Coordinator-owned acceptance. Never run an actor's check script or use its
// story model as expected truth. See evals/builds/acceptance.md for scope and limits.
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, realpath, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { assessObservation, buildCases, fixedCommands, outsideWorkspace, requestFailureReason, validateExpectations } from "./lib/build-check.mjs";

const options = {};
for (const argument of process.argv.slice(2)) {
  const match = /^--(workspace|expectations|out|dependencies|browser-executable)=(.+)$/.exec(argument);
  if (!match || options[match[1]]) throw new Error(`Unknown, duplicate or empty option: ${argument}`);
  options[match[1]] = match[2];
}
if (!options.workspace || !options.expectations || !options.out) throw new Error("Required: --workspace=DIR --expectations=FILE --out=DIR");
const workspace = await realpath(resolve(options.workspace));
const expectationsPath = await realpath(resolve(options.expectations));
const implementation = await realpath(fileURLToPath(import.meta.url));
const helper = await realpath(fileURLToPath(new URL("./lib/build-check.mjs", import.meta.url)));
if (![expectationsPath, implementation, helper].every(path => outsideWorkspace(workspace, path))) throw new Error("Expectations and coordinator checker must be outside the actor workspace");
const output = resolve(options.out);
if (!outsideWorkspace(workspace, output)) throw new Error("Acceptance output must be outside the actor workspace");
await mkdir(output, { recursive: true });
if (!outsideWorkspace(workspace, await realpath(output))) throw new Error("Acceptance output resolves inside the actor workspace");
const expected = JSON.parse(await readFile(expectationsPath, "utf8"));
const invalid = validateExpectations(expected);
if (invalid.length) throw new Error(`Invalid frozen expectations: ${invalid.join("; ")}`);
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const dependencyRoot = await realpath(resolve(options.dependencies ?? workspace));
const dependencyRequire = createRequire(join(dependencyRoot, "package.json"));
const paths = {
  next: dependencyRequire.resolve("next/dist/bin/next"),
  typescript: dependencyRequire.resolve("typescript/lib/tsc.js"),
  eslint: join(dirname(dependencyRequire.resolve("eslint/package.json")), "bin/eslint.js"),
  typescriptConfig: join(output, "tsconfig.acceptance.json"),
  eslintConfig: join(output, "eslint.acceptance.mjs"),
};
const playwright = dependencyRequire.resolve("playwright-core");
const frozen = {};
for (const path of [implementation, helper, expectationsPath, paths.next, paths.typescript, paths.eslint, playwright]) frozen[path] = sha(await readFile(path));
const manifest = {
  schemaVersion: 1, fixture: expected.id, started: new Date().toISOString(), node: process.version,
  workspace, expectationsPath, dependencyRoot, frozen, expected, commands: [], results: [], files: [], complete: false,
  limits: [
    "Coordinator source and expectations must be frozen by the run harness before the actor starts. Outside-workspace paths alone are not a sandbox write barrier.",
    "Dependency entrypoint hashes are recorded, not full dependency integrity. The harness must audit dependency and lockfile mutation separately.",
    "Next build executes application configuration. Fixed typecheck and lint commands use coordinator-generated configuration independently of actor scripts.",
    "Headless Chromium viewport checks do not prove physical-phone performance, custom-object quality, truth of claims or external-link availability.",
    "Screenshots require human visual review. Text and scene markers alone cannot establish faithful formations or visually correct 3D.",
  ],
};
const save = () => writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
await writeFile(join(output, "expectations.json"), JSON.stringify(expected, null, 2) + "\n");
await writeFile(paths.typescriptConfig, JSON.stringify({
  compilerOptions: { target: "ES2017", lib: ["dom", "dom.iterable", "esnext"], allowJs: true, skipLibCheck: true, strict: true, noEmit: true, allowImportingTsExtensions: true, esModuleInterop: true, module: "esnext", moduleResolution: "bundler", resolveJsonModule: true, isolatedModules: true, jsx: "react-jsx", paths: { "@/*": [join(workspace, "*")] }, types: ["node", "react", "react-dom"], typeRoots: [join(dependencyRoot, "node_modules/@types")] },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "**/*.mts"].map(pattern => join(workspace, pattern)),
  exclude: [join(workspace, "node_modules"), join(workspace, ".next/dev")],
}, null, 2) + "\n");
await writeFile(paths.eslintConfig, `import vitals from ${JSON.stringify(pathToFileURL(dependencyRequire.resolve("eslint-config-next/core-web-vitals")).href)};\nimport typescript from ${JSON.stringify(pathToFileURL(dependencyRequire.resolve("eslint-config-next/typescript")).href)};\nexport default [...vitals, ...typescript, { ignores: [".next/**", "out/**", "checks/**", "next-env.d.ts"] }];\n`);
await save();
const children = new Set();
function stop(child, signal = "SIGTERM") {
  if (!child?.pid || child.exitCode !== null) return;
  try { if (process.platform === "win32") child.kill(signal); else process.kill(-child.pid, signal); }
  catch (error) { if (error.code !== "ESRCH") throw error; }
}
function launch(args, name, timeout = 180_000) {
  const log = createWriteStream(join(output, `${name}.log`));
  const child = spawn(process.execPath, args, { cwd: workspace, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, detached: process.platform !== "win32", stdio: ["ignore", "pipe", "pipe"] });
  children.add(child);
  const command = { name, executable: process.execPath, args, started: new Date().toISOString() };
  manifest.commands.push(command);
  child.stdout.on("data", data => log.write(data));
  child.stderr.on("data", data => log.write(data));
  child.on("error", error => { command.error = error.stack; log.write(error.stack + "\n"); });
  const timer = timeout ? setTimeout(() => { command.timedOut = true; stop(child); }, timeout) : null;
  const kill = timeout ? setTimeout(() => stop(child, "SIGKILL"), timeout + 5000) : null;
  const done = new Promise(ok => child.once("close", (code, signal) => {
    clearTimeout(timer); clearTimeout(kill); children.delete(child);
    Object.assign(command, { code, signal, finished: new Date().toISOString() });
    log.end(() => ok(command));
  }));
  return { child, done };
}
let interrupted = false;
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => { interrupted = true; for (const child of children) stop(child, signal); });
const delay = ms => new Promise(ok => setTimeout(ok, ms));
async function unusedPort() {
  const socket = createServer();
  await new Promise((ok, fail) => { socket.once("error", fail); socket.listen(0, "127.0.0.1", ok); });
  const port = socket.address().port;
  await new Promise((ok, fail) => socket.close(error => error ? fail(error) : ok()));
  return port;
}

// Runs in Chromium, without importing any actor browser/checking helper.
function observePage({ beat, position }) {
  const showing = node => {
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    return node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && Number(style.opacity) > 0.5 && rect.width > 0 && rect.height > 0;
  };
  const inView = node => { const r = node.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };
  const links = [...document.querySelectorAll("a[href]")].map(node => {
    const rect = node.getBoundingClientRect();
    const x = Math.max(0, Math.min(innerWidth - 1, rect.left + rect.width / 2));
    const y = Math.max(0, Math.min(innerHeight - 1, rect.top + rect.height / 2));
    const hit = document.elementFromPoint(x, y);
    return { text: node.getAttribute("aria-label") || node.textContent, href: node.getAttribute("href"), visible: showing(node), inView: inView(node), tabIndex: node.tabIndex, hitTarget: hit === node || node.contains(hit), focused: node === document.activeElement };
  });
  const text = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const element = node.parentElement;
    if (!element || element.closest("script,style,noscript") || !showing(element) || !inView(element)) continue;
    const range = document.createRange(); range.selectNodeContents(node);
    if ([...range.getClientRects()].some(rect => rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth)) text.push(node.textContent);
  }
  const block = [...document.querySelectorAll("[data-beat]")].find(node => node.getAttribute("data-beat") === beat);
  const headings = [...(block ?? document).querySelectorAll("h1,h2,h3,h4,h5,h6")].map(node => ({ text: node.textContent, visible: showing(node) && inView(node) }));
  return { beat, position, scroll: scrollY, scene: document.querySelector(".story")?.getAttribute("data-scene") ?? null, canvases: document.querySelectorAll("canvas").length, visibleCanvases: [...document.querySelectorAll("canvas")].filter(node => showing(node) && inView(node)).length, overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, headings, visibleText: text.join(" "), links };
}

async function browserCase(chromium, base, entry) {
  const directory = join(output, entry.id);
  await mkdir(directory, { recursive: true });
  const report = { entry, samples: [], keyboardLinks: [], requests: [], warnings: [], errors: [], stationary: [], screenshots: [] };
  const browser = await chromium.launch({ ...(options["browser-executable"] ? { executablePath: resolve(options["browser-executable"]) } : {}), args: entry.noWebGL ? ["--no-sandbox", "--disable-3d-apis"] : ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const context = await browser.newContext({ viewport: entry.viewport, reducedMotion: entry.reducedMotion ? "reduce" : "no-preference", javaScriptEnabled: !entry.noJavaScript, ...(entry.touch ? { hasTouch: true, isMobile: true } : {}) });
    const page = await context.newPage();
    const url = new URL(expected.route, base).href;
    await page.route("**/*", route => {
      if ([new URL(base).origin, "null"].includes(new URL(route.request().url()).origin)) return route.continue();
      report.errors.push(`unexpected external request: ${route.request().url()}`);
      return route.abort("blockedbyclient");
    });
    page.on("pageerror", error => report.errors.push(`page error: ${error.message}`));
    page.on("console", message => {
      if (message.type() === "warning") report.warnings.push(message.text());
      if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) report.errors.push(`console error: ${message.text()}`);
    });
    page.on("response", response => { if (response.status() >= 400) report.errors.push(`HTTP ${response.status()}: ${response.url()}`); });
    page.on("requestfailed", request => {
      const record = { url: request.url(), resourceType: request.resourceType(), failure: request.failure()?.errorText ?? "unknown" };
      record.expectedReason = requestFailureReason(record, entry, url);
      report.requests.push(record);
      if (!record.expectedReason) report.errors.push(`request failed: ${record.failure}: ${record.url}`);
    });
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    report.httpStatus = response.status();
    if (response.status() !== 200) report.errors.push(`page status ${response.status()}`);
    await writeFile(join(directory, "response.html"), await response.text());
    await page.waitForTimeout(2500);
    if (entry.loseContext) {
      report.contextLoss = await page.evaluate(() => {
        const canvas = document.querySelector("canvas");
        const context = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
        const extension = context?.getExtension("WEBGL_lose_context");
        if (!extension) return { supported: false };
        extension.loseContext(); return { supported: true };
      });
      await page.waitForTimeout(2500);
    }
    report.samples.push(await page.evaluate(observePage, { beat: null, position: "top" }));
    for (let attempt = 0; expected.links.some(link => link.keyboardOnly) && attempt < 16; attempt++) {
      await page.keyboard.press("Tab");
      const observation = await page.evaluate(observePage, { beat: null, position: "keyboard" });
      report.keyboardLinks.push(...observation.links.filter(link => link.focused));
    }
    for (const [index, beat] of expected.beats.entries()) {
      if (interrupted) throw new Error("Acceptance check interrupted");
      const geometry = await page.evaluate(id => {
        const node = [...document.querySelectorAll("[data-beat]")].find(node => node.getAttribute("data-beat") === id);
        if (!node) return null;
        const rect = node.getBoundingClientRect(); return { top: rect.top + scrollY, height: rect.height, viewport: innerHeight };
      }, beat.id);
      if (!geometry) continue;
      for (const position of ["start", "mid", "end"]) {
        const fraction = { start: 0, mid: 0.5, end: 1 }[position];
        const top = Math.max(0, geometry.top + Math.max(0, geometry.height - geometry.viewport) * fraction);
        await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), top);
        await page.waitForTimeout(entry.mode === "animated" ? 1800 : 150);
        report.samples.push(await page.evaluate(observePage, { beat: beat.id, position }));
        // Three samples inspect readable content; mid and end images retain
        // framing and arrival evidence without duplicating every static page.
        if (position === "mid" || (entry.mode === "animated" && position === "end")) {
          const filename = `${String(index).padStart(2, "0")}-${beat.id.replace(/[^\w.-]/g, "_")}-${position}.png`;
          await page.screenshot({ path: join(directory, filename), timeout: 90_000 });
          report.screenshots.push(filename);
        }
      }
      if (entry.reducedMotion && entry.mode === "animated") {
        const canvas = page.locator("canvas").first();
        const before = sha(await canvas.screenshot());
        await page.waitForTimeout(400);
        report.stationary.push({ beat: beat.id, before, after: sha(await canvas.screenshot()) });
      }
    }
    Object.assign(report, await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
      return { beatIds: [...document.querySelectorAll("[data-beat]")].map(node => node.getAttribute("data-beat")), h1: document.querySelectorAll("h1").length, lang: document.documentElement.lang, duplicateIds: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))], anchors: [...document.querySelectorAll("a[href]")].map(node => ({ text: node.textContent, href: node.getAttribute("href") })) };
    }));
    for (const link of expected.links.filter(link => link.href.startsWith("#"))) if (!await page.evaluate(id => Boolean(document.getElementById(id)), link.href.slice(1))) report.errors.push(`missing local fragment target: ${link.href}`);
    await writeFile(join(directory, "rendered.html"), await page.content());
  } catch (error) { report.errors.push(error.stack); }
  finally { await browser.close(); }
  report.problems = assessObservation(expected, entry, report);
  await writeFile(join(directory, "report.json"), JSON.stringify(report, null, 2) + "\n");
  return { id: entry.id, passed: report.problems.length === 0, problems: report.problems, report: `${entry.id}/report.json` };
}

let server;
try {
  for (const path of [...expected.assets, ...(expected.requiredFiles ?? [])]) {
    const absolute = resolve(workspace, path);
    const record = { path };
    try {
      const actual = await realpath(absolute);
      if (outsideWorkspace(workspace, actual) || !(await stat(actual)).isFile()) throw new Error("required file escapes workspace or is not a file");
      const bytes = await readFile(actual);
      if (!bytes.length) throw new Error("required file is empty");
      Object.assign(record, { exists: true, bytes: bytes.length, sha256: sha(bytes) });
    } catch (error) { Object.assign(record, { exists: false, error: error.message }); }
    manifest.files.push(record);
  }
  for (const command of fixedCommands(paths)) {
    if (interrupted) throw new Error("Acceptance check interrupted");
    console.log(`Acceptance: ${command.id}`);
    const result = await launch(command.args, command.id).done;
    await save();
    // Typecheck and lint are independent. A failed build prevents browser use.
    if (command.id === "build" && result.code !== 0) throw new Error("Production build failed; browser observations unavailable");
  }
  const port = await unusedPort();
  const base = `http://127.0.0.1:${port}/`;
  server = launch([paths.next, "start", "--hostname", "127.0.0.1", "--port", String(port)], "server", 0);
  const deadline = Date.now() + 45_000;
  let ready = false;
  while (Date.now() < deadline && server.child.exitCode === null && !interrupted) {
    try { if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; } }
    catch { /* local startup */ }
    await delay(250);
  }
  if (!ready) throw new Error("Local server did not become ready");
  for (const path of new Set([...expected.assets.filter(path => path.startsWith("public/")).map(path => `/${path.slice(7)}`), ...expected.links.filter(link => link.href.startsWith("/")).map(link => link.href)])) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(10_000) });
    manifest.files.push({ url: path, status: response.status(), exists: response.status() === 200, contentType: response.headers.get("content-type"), bytes: (await response.arrayBuffer()).byteLength });
  }
  const { chromium } = dependencyRequire("playwright-core");
  for (const entry of buildCases(expected)) {
    console.log(`Acceptance: browser ${entry.id}`);
    manifest.results.push(await browserCase(chromium, base, entry));
    await save();
  }
  manifest.complete = true;
} catch (error) { manifest.error = error.stack; }
finally {
  if (server) { stop(server.child); const timer = setTimeout(() => stop(server.child, "SIGKILL"), 5000); await server.done; clearTimeout(timer); }
  for (const child of children) stop(child);
  manifest.finished = new Date().toISOString();
  manifest.passed = manifest.complete && !manifest.error && !manifest.files.some(file => !file.exists) && !manifest.commands.some(command => command.name !== "server" && command.code !== 0) && manifest.results.every(result => result.passed);
  await save();
  console.log(`Acceptance ${manifest.passed ? "passed" : "failed"}: ${output}`);
  process.exitCode = manifest.passed ? 0 : 1;
}
