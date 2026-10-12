// Study-local final journey derivative. Original checker and schemas stay unchanged.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, readdir, realpath, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { artifactHashes, fixedCommands, outsideWorkspace, requestFailureReason, scrollSamples, verifyNextRuntime } from "../../../lib/build-check.mjs";
import { captureSource, captureTravel, diagnosticPlan, inventoryControls } from "../../../lib/build-capture.mjs";
import { exerciseSettledControl } from "./controls-lib.mjs";
import { compareBuildIdentity } from "./cache-identity.mjs";

import { validateTargets, assessMode, modeCases, buildInventory, observationProblems, imageName, reserveImage, observeWording, MODE_IDS } from "./measurement-lib.mjs";

const options = {};
for (const argument of process.argv.slice(2)) {
  const match = /^--(workspace|expectations|targets|out|dependencies|unit|build-proof)=(.+)$/.exec(argument);
  if (!match || options[match[1]]) throw new Error(`Unknown, duplicate or empty option: ${argument}`);
  options[match[1]] = match[2];
}
if (!options.workspace || !options.expectations || !options.out || !options.dependencies || !options.targets || !options.unit) throw new Error("Required: --workspace=DIR --expectations=FILE --out=DIR --dependencies=TRUSTED_DIR");
assert.ok(["build", "auxiliary", ...MODE_IDS].includes(options.unit), "Unknown final measurement unit");
const workspace = await realpath(resolve(options.workspace));
const targetsPath = await realpath(resolve(options.targets));
const expectationsPath = await realpath(resolve(options.expectations));
const implementation = await realpath(fileURLToPath(import.meta.url));
const helper = await realpath(fileURLToPath(new URL("../../../lib/build-check.mjs", import.meta.url)));
const captureHelper = await realpath(fileURLToPath(new URL("../../../lib/build-capture.mjs", import.meta.url)));
const sourceHelper = await realpath(fileURLToPath(new URL("../../../lib/source-scope.mjs", import.meta.url)));
if (![targetsPath, expectationsPath, implementation, helper, captureHelper, sourceHelper].every(path => outsideWorkspace(workspace, path))) throw new Error("Expectations and coordinator checker must be outside the actor workspace");
const output = resolve(options.out);
if (!outsideWorkspace(workspace, output)) throw new Error("Acceptance output must be outside the actor workspace");
await mkdir(dirname(output), { recursive: true });
// Never overwrite an earlier failed or passed measurement.
await mkdir(output);
if (!outsideWorkspace(workspace, await realpath(output))) throw new Error("Acceptance output resolves inside the actor workspace");
const policy = JSON.parse(await readFile(expectationsPath, "utf8")), expected = JSON.parse(await readFile(targetsPath, "utf8"));
const invalid = validateTargets(expected);
assert.equal(expected.stage, 6, "Final worker requires stop 6 targets");
if (invalid.length) throw new Error(`Invalid frozen expectations: ${invalid.join("; ")}`);
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const dependencyRoot = await realpath(resolve(options.dependencies));
if (!outsideWorkspace(workspace, dependencyRoot)) throw new Error("Trusted dependency root must be outside the actor workspace");
const dependencyRequire = createRequire(join(dependencyRoot, "package.json"));
const workspaceRequire = createRequire(join(workspace, "package.json"));
async function nextIdentity(requireFrom) {
  const entrypoint = await realpath(requireFrom.resolve("next/dist/bin/next"));
  const packageJson = await realpath(requireFrom.resolve("next/package.json"));
  const { name, version } = JSON.parse(await readFile(packageJson, "utf8"));
  return { name, version, entrypoint, packageJson, sha256: sha(await readFile(entrypoint)) };
}
const nextRuntime = verifyNextRuntime(workspace, await nextIdentity(workspaceRequire), await nextIdentity(dependencyRequire));
const paths = {
  // Next must share module identity with the app's generated server code.
  next: nextRuntime.entrypoint,
  typescript: dependencyRequire.resolve("typescript/lib/tsc.js"),
  eslint: join(dirname(dependencyRequire.resolve("eslint/package.json")), "bin/eslint.js"),
  typescriptConfig: join(output, "tsconfig.acceptance.json"),
  eslintConfig: join(output, "eslint.acceptance.mjs"),
};
const playwright = dependencyRequire.resolve("playwright-core");
const frozen = {};
for (const path of [implementation, helper, captureHelper, sourceHelper, targetsPath, fileURLToPath(new URL("./measurement-lib.mjs", import.meta.url)), fileURLToPath(new URL("./controls-lib.mjs", import.meta.url)), fileURLToPath(new URL("./cache-identity.mjs", import.meta.url)), expectationsPath, nextRuntime.local.entrypoint, nextRuntime.local.packageJson, nextRuntime.trusted.entrypoint, nextRuntime.trusted.packageJson, paths.typescript, paths.eslint, playwright]) frozen[path] = sha(await readFile(path));
const manifest = {
  schemaVersion: 1, measurement: "full-journey", stage: 6, unit: options.unit, started: new Date().toISOString(), node: process.version,
  workspace, expectationsPath, targetsPath, dependencyRoot, nextRuntime, frozen, expected, policy, observationProblems: observationProblems(expected, policy), commands: [], results: [], files: [], complete: false,
  limits: [
    "Coordinator rules/code are frozen before actor; identities are source-bound observations after a real gate. Outside-workspace paths alone are not a write barrier.",
    "Dependency entrypoint hashes are recorded, not full dependency integrity. The harness must audit dependency and lockfile mutation separately.",
    "Next build executes application configuration. Fixed typecheck and lint commands use coordinator-generated configuration independently of actor scripts.",
    "Headless Chromium viewport checks do not prove physical-phone performance, custom-object quality, truth of claims or external-link availability.",
    "Screenshots require human visual review. Text and scene markers alone cannot establish faithful formations or visually correct 3D.",
  ],
};
{
  manifest.stage = 6;
  manifest.sourceBefore = await captureSource(workspace);
  assert.equal(manifest.sourceBefore.digest, expected.sourceDigest);
  manifest.visualReview = "unobserved: original pixels and semantic scene/control targets require separate review";
  manifest.limits.push("Control state/image changes and motion positions measure observable response, not whether the intended 3D component responded correctly.");
}
const save = () => writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
async function evidenceFiles(prefix = "") {
  const files = [];
  for (const entry of await readdir(join(output, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await evidenceFiles(path));
    else if (entry.isFile()) files.push({ path, bytes: await readFile(join(output, path)) });
    else throw new Error(`Unexpected non-file evidence: ${path}`);
  }
  return files;
}
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
    let opacity = 1;
    for (let ancestor = node; ancestor && opacity > 0.5; ancestor = ancestor.parentElement) opacity *= Number(getComputedStyle(ancestor).opacity);
    return node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && opacity > 0.5 && rect.width > 0 && rect.height > 0;
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
    const words = [];
    for (const match of node.textContent.matchAll(/\S+/g)) {
      const range = document.createRange(); range.setStart(node, match.index); range.setEnd(node, match.index + match[0].length);
      if ([...range.getClientRects()].some(rect => rect.top >= 0 && rect.bottom <= innerHeight && rect.left >= 0 && rect.right <= innerWidth)) words.push(match[0]);
    }
    text.push(words.join(" "));
  }
  const block = [...document.querySelectorAll("[data-beat]")].find(node => node.getAttribute("data-beat") === beat);
  const headings = [...(block ?? document).querySelectorAll("h1,h2,h3,h4,h5,h6")].map(node => ({ text: node.textContent, level: Number(node.tagName.slice(1)), visible: showing(node) && inView(node) }));
  return { beat, position, scroll: scrollY, scene: document.querySelector(".story")?.getAttribute("data-scene") ?? null, canvases: document.querySelectorAll("canvas").length, visibleCanvases: [...document.querySelectorAll("canvas")].filter(node => showing(node) && inView(node)).length, overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, headings, visibleText: text.join(" "), links };
}

async function browserCase(chromium, base, entry) {
  const directory = join(output, entry.id);
  await mkdir(directory, { recursive: true });
  const report = { entry, samples: [], wording: [], keyboardLinks: [], requests: [], warnings: [], errors: [], stationary: [], screenshots: [] };
  Object.assign(report, { rests: [], motion: [], controls: [], controlInventoryComplete: false, rawControlCensus: [], sourceDigest: manifest.sourceBefore.digest });
  const controls = new Map(), imageFiles = new Set();
  const browser = await chromium.launch({ args: entry.noWebGL ? ["--no-sandbox", "--disable-3d-apis"] : ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const context = await browser.newContext({ viewport: entry.viewport, reducedMotion: entry.reducedMotion ? "reduce" : "no-preference", javaScriptEnabled: !entry.noJavaScript, serviceWorkers: "block", ...(entry.touch ? { hasTouch: true, isMobile: true } : {}) });
    const page = await context.newPage();
    const observe = async args => { report.wording.push(...await page.evaluate(observeWording, { ...args, versions: expected.selectedWording.versions, approvedBeats: expected.approvedBeats })); return page.evaluate(observePage, args); };
    const capture = async (name, screenshotOptions = {}) => {
      const file = reserveImage(imageFiles, imageName(name, screenshotOptions.type === "jpeg" ? "jpg" : "png"));
      const bytes = await page.screenshot({ path: join(directory, file), timeout: 90_000, ...screenshotOptions });
      report.screenshots.push(file);
      return { file, sha256: sha(bytes), bytes: bytes.length };
    };
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
    if (entry.mode === "animated" || entry.loseContext) await page.waitForFunction(() => document.querySelector(".story")?.getAttribute("data-scene") === "on" && document.querySelector("canvas") !== null, undefined, { timeout: 15_000 });
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
    report.samples.push(await observe({ beat: null, position: "top" }));
    for (let attempt = 0; expected.links.some(link => link.keyboardOnly) && attempt < 16; attempt++) {
      await page.keyboard.press("Tab");
      const observation = await observe({ beat: null, position: "keyboard" });
      report.keyboardLinks.push(...observation.links.filter(link => link.focused));
    }
    for (const [index, beat] of expected.beats.entries()) {
      if (interrupted) throw new Error("Acceptance check interrupted");
      const geometry = await page.evaluate(() => ({ viewport: innerHeight, maxScroll: document.documentElement.scrollHeight - innerHeight, boxes: [...document.querySelectorAll("[data-beat]")].map(node => {
        const rect = node.getBoundingClientRect(); return { id: node.getAttribute("data-beat"), top: rect.top + scrollY, height: rect.height };
      }) }));
      const positions = scrollSamples(geometry.boxes, geometry.viewport, entry.mode).find(sample => sample.id === beat.id);
      if (!positions) continue;
      for (const position of ["start", "mid", "end"]) {
        const top = Math.max(0, positions[position]);
        await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), top);
        await page.waitForTimeout(entry.mode === "animated" ? 1800 : 150);
        report.samples.push(await observe({ beat: beat.id, position }));
        // Three samples inspect readable content; mid and end images retain
        // framing and arrival evidence without duplicating every static page.
        if (position === "mid" || (entry.mode === "animated" && position === "end")) {
          const filename = reserveImage(imageFiles, `${String(index).padStart(2, "0")}-${beat.id.replace(/[^\w.-]/g, "_")}-${position}.png`);
          await page.screenshot({ path: join(directory, filename), timeout: 90_000 });
          report.screenshots.push(filename);
        }
      }
      {
        const plan = diagnosticPlan(expected.beats.map(beat => beat.id), geometry.boxes, geometry.viewport, geometry.maxScroll, entry.mode);
        report.geometry = geometry;
        const rest = plan.rests[index];
        const requestedScroll = entry.mode === "animated" ? rest.end : rest.start;
        await page.evaluate(top => scrollTo({ top, behavior: "instant" }), requestedScroll);
        await page.waitForTimeout(entry.mode === "animated" ? 1800 : 150);
        const observed = await observe({ beat: beat.id, position: "rest" });
        report.samples.push(observed);
        report.rests.push({ beat: beat.id, requestedScroll, actualScroll: observed.scroll, scene: observed.scene, afterContextLoss: !!entry.loseContext && !!report.contextLoss?.supported, ...await capture(`rest-${beat.id}`) });
        report.rawControlCensus.push({ beat: beat.id, scroll: observed.scroll, controls: await page.locator('button,[role=button],input:not([type=hidden]),select,textarea,[role=slider],[role=tab],summary,a[href]').evaluateAll(nodes => nodes.map(node => ({ tag: node.tagName.toLowerCase(), role: node.getAttribute("role"), name: node.getAttribute("aria-label") || node.textContent?.trim(), href: node.getAttribute("href"), visible: node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }), disabled: !!node.disabled || node.getAttribute("aria-disabled") === "true" }))) });
        for (const control of await inventoryControls(page, expected.focusOnlyControls)) if (!controls.has(control.key)) controls.set(control.key, { ...control, observedScroll: observed.scroll });
        if (entry.reducedMotion) {
          const started = Date.now();
          const before = await capture(`still-${beat.id}-before`);
          await page.waitForTimeout(400);
          const after = await capture(`still-${beat.id}-after`);
          report.stationary.push({ beat: beat.id, before: before.sha256, after: after.sha256, elapsedMs: Date.now() - started, files: [before.file, after.file] });
        }
      }
    }
    {
      report.controlInventory = [...controls.values()];
      report.controlInventoryComplete = true;
      report.nonFragmentLinks = await page.locator('a[href]:not([href^="#"])').evaluateAll(nodes => nodes.map(node => ({ href: node.getAttribute("href"), text: node.getAttribute("aria-label") || node.textContent, availability: "unobserved: not followed by the loopback-only diagnostic" })));
      const resetControls = async () => {
        await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
        await page.waitForTimeout(1800);
        if (entry.mode === "animated" || entry.loseContext) await page.waitForFunction(() => document.querySelector(".story")?.getAttribute("data-scene") === "on" && document.querySelector("canvas") !== null);
        if (entry.loseContext) {
          const supported = await page.evaluate(() => {
            const canvas = document.querySelector("canvas");
            const gl = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
            const extension = gl?.getExtension("WEBGL_lose_context");
            extension?.loseContext(); return !!extension;
          });
          if (!supported) throw new Error("Control trial could not reapply context loss");
          await page.waitForTimeout(1800);
        }
      };
      for (const control of controls.values()) report.controls.push(await exerciseSettledControl(page, control, capture, resetControls, expected.focusOnlyControls));
      if (["desktop", "mobile", "short"].includes(entry.id)) {
        const geometry = report.geometry;
        const plan = diagnosticPlan(expected.beats.map(beat => beat.id), geometry.boxes, geometry.viewport, geometry.maxScroll, entry.mode);
        for (const interval of plan.intervals) report.motion.push(await captureTravel(page, interval, capture));
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
  report.problems = assessMode(expected, entry, report);
  await writeFile(join(directory, "report.json"), JSON.stringify(report, null, 2) + "\n");
  return { id: entry.id, passed: report.problems.length === 0, problems: report.problems, report: `${entry.id}/report.json` };
}

async function auxiliaryCase(chromium, base) {
  const directory = join(output, "auxiliary"); await mkdir(directory);
  const report = { pages: [], problems: [], images: [], complete: false };
  const browser = await chromium.launch({ args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  try {
    for (const target of expected.auxiliaryPages) for (const [mode, viewport] of [["desktop", policy.viewports.desktop], ["phone", policy.viewports.phone]]) {
      const record = { target, mode, errors: [], requests: [], responses: [], original: null }; report.pages.push(record);
      const context = await browser.newContext({ viewport, serviceWorkers: "block", ...(mode === "phone" ? { hasTouch: true, isMobile: true } : {}) });
      const page = await context.newPage(); page.setDefaultTimeout(10000);
      await page.route("**/*", route => [new URL(base).origin, "null"].includes(new URL(route.request().url()).origin) ? route.continue() : (record.errors.push("Blocked external request " + route.request().url()), route.abort("blockedbyclient")));
      page.on("pageerror", error => record.errors.push(error.message));
      page.on("requestfailed", request => { const issue = { url: request.url(), resourceType: request.resourceType(), failure: request.failure()?.errorText ?? "unknown", navigation: request.isNavigationRequest() }; issue.expectedReason = requestFailureReason(issue, { id: "auxiliary" }, new URL(target.route, base).href); record.requests.push(issue); if (!issue.expectedReason) record.errors.push(`Request failed${issue.navigation ? " during navigation" : ""}: ${issue.failure}: ${issue.url}`); });
      page.on("response", response => { if (response.status() >= 400) { const issue = { url: response.url(), status: response.status(), expectedMissingPage: response.status() === target.status && target.status === 404 && response.url() === new URL(target.route, base).href }; record.responses.push(issue); if (!issue.expectedMissingPage) record.errors.push(`HTTP ${issue.status}: ${issue.url}`); } });
      try {
        if (target.kind === "download") {
          const response = await fetch(new URL(target.route, base), { signal: AbortSignal.timeout(10000), redirect: "manual" }), bytes = Buffer.from(await response.arrayBuffer());
          const file = String(report.pages.length).padStart(2, "0") + "-download.bin"; await writeFile(join(directory, file), bytes);
          Object.assign(record, { file, status: response.status, bytes: bytes.length, sha256: sha(bytes), contentType: response.headers.get("content-type"), disposition: response.headers.get("content-disposition"), visualStatus: "Download bytes recorded, not a rendered-page screenshot" });
        } else {
          const response = await page.goto(new URL(target.route, base).href, { waitUntil: "networkidle", timeout: 30000 }); record.status = response.status();
          await page.waitForTimeout(1000);
          record.observation = await page.evaluate(() => ({ title: document.title, text: document.body.innerText, lang: document.documentElement.lang, h1: document.querySelectorAll("h1").length, overflowX: document.documentElement.scrollWidth > innerWidth, links: [...document.querySelectorAll("a[href]")].map(node => ({ text: node.textContent, href: node.getAttribute("href") })), share: [...document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')].map(node => ({ name: node.getAttribute("property") || node.getAttribute("name"), content: node.content })), icons: [...document.querySelectorAll('link[rel*="icon"]')].map(node => node.getAttribute("href")) }));
          const file = String(report.pages.length).padStart(2, "0") + "-" + mode + ".png", bytes = await page.screenshot({ path: join(directory, file), fullPage: true, timeout: 30000 });
          record.original = { file, sha256: sha(bytes), bytes: bytes.length }; report.images.push(record.original);
          await writeFile(join(directory, String(report.pages.length).padStart(2, "0") + ".html"), await page.content());
          if (record.observation.overflowX || !record.observation.lang) record.errors.push("Auxiliary page overflow or missing language");
        }
        if (record.status !== target.status) record.errors.push("Unexpected HTTP status " + record.status);
      } catch (error) { record.errors.push(String(error)); }
      finally { await context.close(); }
      report.problems.push(...record.errors.map(error => target.id + "/" + mode + ": " + error));
    }
    report.complete = true;
  } finally { await browser.close(); await writeFile(join(directory, "report.json"), JSON.stringify(report, null, 2) + "\n"); }
  return { id: "auxiliary", passed: report.complete && report.problems.length === 0, problems: report.problems, report: "auxiliary/report.json" };
}

let server;
try {
  assert.equal(dependencyRoot, policy.trustedDependencies.root);
  assert.equal(nextRuntime.trusted.version, policy.trustedDependencies.nextVersion); assert.equal(nextRuntime.trusted.sha256, policy.trustedDependencies.nextCliSha256);
  assert.equal(sha(await readFile(playwright)), policy.trustedDependencies.playwrightEntrypointSha256);
  if (!nextRuntime.passed) throw new Error(`Next runtime verification failed: ${nextRuntime.problems.join("; ")}`);
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
  if (options.unit === "build") for (const command of fixedCommands(paths)) {
    if (interrupted) throw new Error("Acceptance check interrupted");
    console.log(`Acceptance: ${command.id}`);
    const result = await launch(command.args, command.id).done;
    await save();
    // Typecheck and lint are independent. A failed build prevents browser use.
    if (command.id === "build" && result.code !== 0) throw new Error("Production build failed; browser observations unavailable");
  }
  if (options.unit === "build") {
    manifest.buildIdentity = await buildInventory(workspace, policy);
    await writeFile(join(output, "build-identity.json"), JSON.stringify(manifest.buildIdentity, null, 2) + "\n");
  } else {
  assert.ok(options["build-proof"], "A completed same-source build proof is required");
  const proofPath = await realpath(resolve(options["build-proof"]));
  assert.ok(outsideWorkspace(workspace, proofPath));
  const proof = JSON.parse(await readFile(proofPath, "utf8"));
  assert.equal(proof.unit, "build"); assert.equal(proof.complete, true); assert.equal(proof.sourceUnchanged, true);
  assert.ok(proof.commands.some(command => command.name === "build" && command.code === 0));
  assert.deepEqual(proof.sourceBefore, manifest.sourceBefore); assert.deepEqual(proof.sourceAfter, manifest.sourceBefore);
  for (const [path, digest] of Object.entries(proof.artifacts)) { const file = await realpath(resolve(dirname(proofPath), path)); assert.ok(file.startsWith(dirname(proofPath) + "/")); assert.equal(sha(await readFile(file)), digest); }
  manifest.buildProof = { path: proofPath, sha256: sha(await readFile(proofPath)) };
  manifest.buildIdentity = await buildInventory(workspace, policy);
  manifest.buildProofComparison = await compareBuildIdentity(workspace, proof.buildIdentity, manifest.buildIdentity);
  assert.equal(manifest.buildProofComparison.immutableBuildUnchanged, true);
  const port = await unusedPort();
  const base = `http://127.0.0.1:${port}/`;
  server = launch([paths.next, "start", "--hostname", "127.0.0.1", "--port", String(port)], "server", 0);
  const deadline = Date.now() + 45_000;
  let ready = false;
  while (Date.now() < deadline && server.child.exitCode === null && !interrupted) {
    try { await fetch(base, { signal: AbortSignal.timeout(1000) }); ready = true; break; }
    catch { /* local startup */ }
    await delay(250);
  }
  if (!ready) throw new Error("Local server did not become ready");
  for (const path of new Set([...expected.assets.filter(path => path.startsWith("public/")).map(path => `/${path.slice(7)}`), ...expected.links.filter(link => link.href.startsWith("/")).map(link => link.href)])) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(10_000), redirect: "manual" });
    manifest.files.push({ url: path, status: response.status, exists: response.status === 200, contentType: response.headers.get("content-type"), bytes: (await response.arrayBuffer()).byteLength });
  }
  const { chromium } = dependencyRequire("playwright-core");
  for (const entry of modeCases(policy).filter(entry => entry.id === options.unit)) {
    if (interrupted) throw new Error("Acceptance check interrupted");
    console.log(`Acceptance: browser ${entry.id}`);
    manifest.results.push(await browserCase(chromium, base, entry));
    await save();
  }
  if (options.unit === "auxiliary") manifest.results.push(await auxiliaryCase(chromium, base));
  }
  manifest.complete = true;
} catch (error) { manifest.error = error.stack; }
finally {
  if (server) { stop(server.child); const timer = setTimeout(() => stop(server.child, "SIGKILL"), 5000); await server.done; clearTimeout(timer); }
  for (const child of children) stop(child);
  manifest.finished = new Date().toISOString();
  {
    try {
      manifest.sourceAfter = await captureSource(workspace);
      manifest.sourceUnchanged = manifest.sourceBefore.digest === manifest.sourceAfter.digest;
      if (!manifest.sourceUnchanged) manifest.error = `${manifest.error ?? ""}\nSource changed during coordinator measurement`;
    } catch (error) { manifest.error = `${manifest.error ?? ""}\nSource verification failed: ${error.stack}`; }
  }
  try { if (manifest.buildIdentity) {
    manifest.buildAfter = await buildInventory(workspace, policy);
    manifest.buildUnchanged = manifest.buildAfter.digest === manifest.buildIdentity.digest;
    manifest.buildComparison = await compareBuildIdentity(workspace, manifest.buildIdentity, manifest.buildAfter);
    manifest.immutableBuildUnchanged = manifest.buildComparison.immutableBuildUnchanged;
    assert.equal(manifest.immutableBuildUnchanged, true);
  } } catch (error) { manifest.immutableBuildUnchanged = false; manifest.error = `${manifest.error ?? ""}\nBuild identity validation failed: ${error.stack}`; }
  manifest.passed = manifest.complete && !manifest.error && !manifest.files.some(file => !file.exists) && !manifest.commands.some(command => command.name !== "server" && command.code !== 0) && manifest.results.every(result => result.passed);
  try { manifest.artifacts = artifactHashes(await evidenceFiles()); }
  catch (error) { manifest.passed = false; manifest.artifactError = error.stack; }
  await save();
  console.log(`Acceptance ${manifest.passed ? "passed" : "failed"}: ${output}`);
  process.exitCode = manifest.passed ? 0 : 1;
}
