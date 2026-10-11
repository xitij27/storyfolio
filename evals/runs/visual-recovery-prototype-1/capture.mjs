#!/usr/bin/env node
/**
 * Bounded browser evidence for the manually authored visual recovery prototype.
 * Run from any directory:
 *   node evals/runs/visual-recovery-prototype-1/capture.mjs --only=desktop,phone --url=http://127.0.0.1:3012/
 * Omit --only for all seven conditions. --out chooses a NEW directory inside
 * this study. This script does not start a server or invoke a model.
 *
 * Functional assertions do not constitute visual approval. Continuous desktop
 * movement is sampled during requestAnimationFrame scrolling, in both
 * directions, with frame times and actual positions recorded. The 14 JPEGs
 * are a bounded frame series, not a smooth video or a performance benchmark.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { beatRestSamples, expectedRequestReason } from "../../../prototypes/fixture-study/scripts/check-lib.mjs";

const study = dirname(fileURLToPath(import.meta.url));
const repository = resolve(study, "../../..");
const source = join(repository, "prototypes/fixture-study");
const options = Object.fromEntries(process.argv.slice(2).map(arg => {
  const [name, ...value] = arg.replace(/^--/, "").split("=");
  return [name, value.length ? value.join("=") : true];
}));
const url = new URL(String(options.url ?? "http://127.0.0.1:3012/"));
if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error("Capture URL must be a loopback address");
url.searchParams.set("look", "bench");
const output = resolve(study, String(options.out ?? `evidence/${new Date().toISOString().replace(/[:.]/g, "-")}`));
if (!output.startsWith(`${study}${sep}`)) throw new Error("--out must stay inside this study");
await mkdir(dirname(output), { recursive: true });
await mkdir(output); // An existing evidence directory must never be overwritten.
const settleMs = Number(options.wait ?? 2600);
if (!(settleMs >= 500 && settleMs <= 15000)) throw new Error("--wait must be 500 to 15000 milliseconds");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const json = (file, value) => writeFile(join(output, file), `${JSON.stringify(value, null, 2)}\n`);
const ids = ["opening.assembly", "middle.relationship", "close.evidence"];
const matrix = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, scene: "on", controls: true, movement: true },
  { name: "phone", viewport: { width: 390, height: 844 }, scene: "on", touch: true, controls: true },
  { name: "short", viewport: { width: 1280, height: 720 }, scene: "on" },
  { name: "reduced", viewport: { width: 1440, height: 900 }, scene: "on", reduced: true },
  { name: "no-webgl", viewport: { width: 1440, height: 900 }, scene: "off", noWebgl: true },
  { name: "no-js", viewport: { width: 1440, height: 900 }, scene: "off", noJs: true },
  { name: "context-loss", viewport: { width: 1440, height: 900 }, scene: "off", loseContext: true },
];
const requested = options.only ? String(options.only).split(",") : matrix.map(entry => entry.name);
if (requested.some(name => !matrix.some(entry => entry.name === name))) throw new Error(`Unknown --only value: ${requested.join(",")}`);
const cases = matrix.filter(entry => requested.includes(entry.name));

async function sourceManifest() {
  const files = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (["node_modules", ".next", "checks", ".git"].includes(entry.name) || entry.name.endsWith(".tsbuildinfo")) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) {
        const bytes = await readFile(path);
        files.push({ path: relative(source, path), bytes: bytes.length, sha256: hash(bytes) });
      } else throw new Error(`Unexpected source entry: ${path}`);
    }
  }
  await visit(source);
  files.sort((a, b) => a.path.localeCompare(b.path));
  return { root: relative(repository, source), exclusions: ["node_modules", ".next", "checks", ".git", "*.tsbuildinfo"], files, digest: hash(JSON.stringify(files)) };
}

const sourceBefore = await sourceManifest();
await json("source-before.json", sourceBefore);
const { chromium } = createRequire(import.meta.url)(join(source, "node_modules/playwright-core"));
const launchArgs = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
const manifest = {
  startedAtUtc: new Date().toISOString(), url: url.href, node: process.version,
  command: [process.execPath, ...process.argv.slice(1)], sourceDigest: sourceBefore.digest,
  captureScriptSha256: hash(await readFile(fileURLToPath(import.meta.url))),
  modelInvocations: 0, scope: cases.length === matrix.length ? "all seven conditions" : "selected conditions",
  conditions: cases, launchArgs, deviceScaleFactor: 1, settleMs,
  limitations: ["Software WebGL in desktop Chromium, including touch emulation; no physical phone or GPU measurement.", "Functional assertions and scene pixel changes do not establish visual quality or author approval.", "Movement evidence is a sampled continuous-scroll frame series, not a video or frame-rate measurement."],
  results: [], problems: [], complete: false,
};
await json("manifest.json", manifest);

async function geometry(page) {
  return page.evaluate(() => {
    const root = document.querySelector(".story");
    const origin = root.getBoundingClientRect().top;
    return { origin: scrollY + origin, viewport: innerHeight, boxes: [...root.querySelectorAll("[data-beat]")].map(block => {
      const rect = block.getBoundingClientRect();
      return { id: block.getAttribute("data-beat"), top: rect.top - origin, height: rect.height };
    }) };
  });
}

async function measurements(page) {
  return page.evaluate(() => {
    const visible = node => node.checkVisibility() && node.getBoundingClientRect().width > 0 && node.getBoundingClientRect().height > 0;
    const rect = node => {
      const box = node.getBoundingClientRect();
      return { x: box.x, y: box.y, width: box.width, height: box.height, bottom: box.bottom, right: box.right };
    };
    const allIds = [...document.querySelectorAll("[id]")].map(node => node.id);
    const headers = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(node => ({ level: Number(node.tagName.slice(1)), id: node.id, text: node.textContent.trim() }));
    const links = [...document.querySelectorAll("a[href]")].map(node => {
      const href = node.getAttribute("href");
      return { text: node.textContent.trim(), href, visible: visible(node), targetExists: href.startsWith("#") ? !!document.getElementById(decodeURIComponent(href.slice(1))) : null };
    });
    return {
      time: performance.now(), scrollY, viewport: { width: innerWidth, height: innerHeight },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scene: document.querySelector(".story")?.getAttribute("data-scene"), look: document.querySelector(".story")?.getAttribute("data-look"),
      canvases: document.querySelectorAll("canvas").length, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      coarsePointer: matchMedia("(pointer: coarse)").matches, headings: headers, lang: document.documentElement.lang,
      duplicateIds: [...new Set(allIds.filter((id, i) => allIds.indexOf(id) !== i))],
      beatIds: [...document.querySelectorAll("[data-beat]")].map(node => node.getAttribute("data-beat")),
      activeRail: document.querySelector(".story-rail [aria-current]")?.textContent ?? null,
      fallbacks: [...document.querySelectorAll(".story-fallback")].map(node => ({ visible: visible(node), rect: rect(node), svg: !!node.querySelector('svg[role="img"][aria-label]') })),
      controls: [...document.querySelectorAll(".inspection-buttons button")].map(node => ({ text: node.textContent.trim(), pressed: node.getAttribute("aria-pressed"), visible: visible(node), rect: rect(node) })),
      description: document.querySelector(".inspection-description")?.textContent,
      descriptionLive: document.querySelector(".inspection-description")?.getAttribute("aria-live"),
      links, bodyText: document.body.innerText.replace(/\s+/g, " ").trim(),
      labelledSections: [...document.querySelectorAll("section[aria-labelledby]")].map(node => ({ id: node.id, targetExists: !!document.getElementById(node.getAttribute("aria-labelledby")) })),
    };
  });
}

async function runCase(browser, entry) {
  const directory = join(output, entry.name);
  await mkdir(directory);
  const report = { name: entry.name, condition: entry, startedAtUtc: new Date().toISOString(), problems: [], warnings: [], errors: [], requests: [], blockedExternal: [], captures: [], beats: [], controls: [], motion: [] };
  const problem = text => { if (!report.problems.includes(text)) report.problems.push(text); };
  const context = await browser.newContext({ viewport: entry.viewport, deviceScaleFactor: 1, reducedMotion: entry.reduced ? "reduce" : "no-preference", javaScriptEnabled: !entry.noJs, hasTouch: !!entry.touch, isMobile: !!entry.touch, serviceWorkers: "block" });
  await context.route("**/*", async route => {
    const address = new URL(route.request().url());
    if (address.origin === url.origin || ["data:", "blob:"].includes(address.protocol)) await route.continue();
    else { report.blockedExternal.push({ url: address.href, resourceType: route.request().resourceType() }); await route.abort("blockedbyclient"); }
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  page.on("pageerror", error => { report.errors.push({ type: "pageerror", message: String(error) }); problem(`page error: ${error.message}`); });
  page.on("console", message => {
    const record = { type: message.type(), text: message.text(), location: message.location() };
    if (message.type() === "warning") report.warnings.push(record);
    else if (message.type() === "error") { report.errors.push(record); if (!message.text().startsWith("Failed to load resource")) problem(`console error: ${message.text()}`); }
  });
  page.on("response", response => {
    if (response.status() >= 400) { report.requests.push({ url: response.url(), status: response.status() }); problem(`HTTP ${response.status()}: ${response.url()}`); }
  });
  page.on("requestfailed", request => {
    const record = { url: request.url(), resourceType: request.resourceType(), failure: request.failure()?.errorText ?? "unknown" };
    const expected = report.blockedExternal.some(item => item.url === record.url) ? "External request intentionally blocked" : expectedRequestReason(record, { noJavaScript: !!entry.noJs, pageUrl: url.href });
    report.requests.push({ ...record, expected });
    if (!expected) problem(`Request failed: ${record.url} (${record.failure})`);
  });
  async function capture(name, metadata = {}, screenshotOptions = {}) {
    const extension = screenshotOptions.type === "jpeg" ? "jpg" : "png";
    const file = `${name}.${extension}`;
    const buffer = await page.screenshot({ path: join(directory, file), timeout: 90000, ...screenshotOptions });
    const record = { file: `${entry.name}/${file}`, bytes: buffer.length, sha256: hash(buffer), ...metadata };
    report.captures.push(record);
    return record;
  }
  async function scrollToBeat(index) {
    const measured = await geometry(page);
    let top;
    let method;
    if ((await page.locator(".story").getAttribute("data-scene")) === "on") {
      top = measured.origin + beatRestSamples(measured.boxes, measured.viewport, ["end"])[index][0].top;
      method = "beatRestSamples: end of rest";
    } else {
      top = measured.origin + measured.boxes[index].top;
      method = "static fallback: block top";
    }
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), top);
    await page.waitForTimeout(settleMs);
    return { requestedScroll: top, actualScroll: await page.evaluate(() => scrollY), method, geometry: measured };
  }
  try {
    const response = await page.goto(url.href, { waitUntil: "networkidle", timeout: 60000 });
    report.documentStatus = response?.status();
    if (entry.name === "desktop" || entry.noJs) {
      const html = await response.text();
      await writeFile(join(directory, "server.html"), html);
      report.serverHtml = { file: `${entry.name}/server.html`, sha256: hash(html), bytes: Buffer.byteLength(html) };
    }
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(settleMs);
    if (entry.scene === "on" || entry.loseContext) await page.waitForSelector('.story[data-scene="on"] canvas', { timeout: 30000 });
    if (entry.loseContext) {
      report.contextLoss = await page.evaluate(() => {
        const canvas = document.querySelector("canvas");
        const gl = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
        const extension = gl?.getExtension("WEBGL_lose_context");
        if (!extension) return { supported: false };
        extension.loseContext();
        return { supported: true };
      });
      await page.waitForTimeout(settleMs);
      if (!report.contextLoss.supported) problem("Context-loss extension unavailable; recovery was not exercised");
    }
    report.initial = await measurements(page);
    await capture("initial", { viewport: entry.viewport, scene: report.initial.scene, scrollY: report.initial.scrollY });
    const initial = report.initial;
    if (report.documentStatus !== 200) problem(`Document status ${report.documentStatus}`);
    if (initial.scene !== entry.scene) problem(`Expected scene ${entry.scene}, received ${initial.scene}`);
    if (initial.look !== "bench") problem(`Expected bench look, received ${initial.look}`);
    if (initial.headings.filter(heading => heading.level === 1).length !== 1) problem("Expected exactly one h1");
    if (initial.headings.some((heading, index, list) => index > 0 && heading.level > list[index - 1].level + 1)) problem("Heading hierarchy skips a level");
    if (initial.headings[0]?.id !== "opening-title" || !["middle-title", "close-title"].every(id => initial.headings.some(heading => heading.id === id && heading.level === 2))) problem("Missing expected opening h1 or middle/closing h2");
    if (JSON.stringify(initial.beatIds) !== JSON.stringify(ids)) problem("Rendered beats differ from the fixed three-beat contract");
    if (!initial.lang) problem("Document has no language");
    if (initial.duplicateIds.length) problem(`Duplicate IDs: ${initial.duplicateIds.join(", ")}`);
    if (initial.labelledSections.length !== 3 || initial.labelledSections.some(section => !section.targetExists)) problem("Expected three sections with valid heading references");
    if (initial.links.some(link => !link.text || link.href === "#" || link.targetExists === false)) problem("Empty link or broken same-page link target");
    if (initial.links.some(link => !link.href.startsWith("#"))) problem("Unexpected external or non-anchor portfolio link; this fictional study only declares local evidence");
    const factChecks = [
      ["Firmware explanation", /Firmware is code that controls a physical device\./i],
      ["Opening question", /connect a firmware decision to something you can actually observe/i],
      ["Colleague's hardware ownership", /A colleague designed the PCB and analogue front end\./i],
      ["Observed run", /The longest run was 72 hours\./i],
      ["Projection and assumption", /Two years is a projection from bench current readings and an assumed reporting cycle\./i],
      ["Assembly and test scope", /Forty engineering samples were assembled\. Six were tested on the bench\. None went to customers\./i],
      ["Qualification caveat", /One preliminary emissions check passed\. Full qualification is unfinished\./i],
      ["Illustrative caveat", /Illustrative bench model: shapes and connections are explanatory, not a photograph, circuit diagram, wiring plan or measured signal\./i],
    ];
    report.factChecks = factChecks.map(([name, pattern]) => ({ name, passed: pattern.test(initial.bodyText) }));
    for (const fact of report.factChecks) if (!fact.passed) problem(`Required HTML fact missing: ${fact.name}`);
    for (let index = 0; index < ids.length; index++) {
      const sample = await scrollToBeat(index);
      const facts = await measurements(page);
      if (facts.overflowX) problem(`Horizontal document overflow at ${ids[index]}`);
      for (const control of facts.controls.filter(control => control.visible && control.rect.bottom > 0 && control.rect.y < entry.viewport.height)) {
        if (control.rect.x < -1 || control.rect.right > entry.viewport.width + 1) problem(`Control overflows horizontally at ${ids[index]}: ${control.text}`);
      }
      if (entry.scene === "off" && !facts.fallbacks.every(fallback => fallback.visible && fallback.svg)) problem("Every fallback requires a visible, labelled authored SVG");
      if (entry.noJs && (facts.canvases !== 0 || facts.controls.some(control => control.visible))) problem("No-JavaScript mode retained a canvas or inoperative inspection control");
      const shot = await capture(ids[index], { beat: ids[index], sample, viewport: facts.viewport, scrollY: facts.scrollY, scene: facts.scene });
      report.beats.push({ id: ids[index], sample, facts, screenshot: shot.file });
      if (entry.reduced) {
        const canvas = page.locator(".story-scene canvas");
        const first = await canvas.screenshot();
        await page.waitForTimeout(650);
        const second = await canvas.screenshot();
        const comparison = { beat: ids[index], intervalMs: 650, firstSha256: hash(first), secondSha256: hash(second), identical: first.equals(second) };
        report.motion.push(comparison);
        if (!comparison.identical) problem(`Reduced-motion canvas changed while stationary at ${ids[index]}`);
      }
    }
    if (entry.controls) {
      await scrollToBeat(1);
      const descriptions = [/Ada wrote the firmware/, /A colleague designed the PCB/, /Ada built the bring-up fixture/, /does not simulate a measured signal/];
      for (let index = 0; index < 4; index++) {
        const buttons = page.locator(".inspection-buttons button");
        await buttons.nth(index).click();
        await page.mouse.move(3, 3);
        await page.waitForTimeout(settleMs);
        const facts = await measurements(page);
        const canvasBuffer = await page.locator(".story-scene canvas").screenshot();
        const screenshot = await capture(`control-${index + 1}`, { selected: index, sceneSha256: hash(canvasBuffer) });
        const record = { selected: index, pressed: facts.controls.map(control => control.pressed), description: facts.description, live: facts.descriptionLive, sceneSha256: hash(canvasBuffer), scrollY: facts.scrollY, controls: facts.controls, screenshot: screenshot.file };
        report.controls.push(record);
        if (JSON.stringify(record.pressed) !== JSON.stringify([0, 1, 2, 3].map(value => value === index ? "true" : "false"))) problem(`Incorrect aria-pressed state for control ${index + 1}`);
        if (!descriptions[index].test(record.description ?? "") || record.live !== "polite") problem(`Incorrect accessible description for control ${index + 1}`);
        if (facts.controls.some(control => control.rect.width < 24 || control.rect.height < 24)) problem("An inspection control is smaller than 24 CSS pixels");
      }
      report.controlSceneComparison = { distinct: new Set(report.controls.map(control => control.sceneSha256)).size, expected: 4, interpretation: "Different pixels establish scene response only; inspect the images to judge whether each highlight explains the selected step." };
      if (report.controlSceneComparison.distinct !== 4) problem("Four inspection selections did not produce four different scene screenshots");
      await page.locator(".inspection-buttons button").first().focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      report.keyboard = await page.evaluate(() => {
        const active = document.activeElement;
        const style = getComputedStyle(active);
        return { text: active.textContent, pressed: active.getAttribute("aria-pressed"), outline: style.outlineStyle, outlineWidth: style.outlineWidth, expectedButton: active === document.querySelectorAll(".inspection-buttons button")[1] };
      });
      if (!report.keyboard.expectedButton || report.keyboard.pressed !== "true" || report.keyboard.outline === "none" || parseFloat(report.keyboard.outlineWidth) === 0) problem("Keyboard Tab/Enter did not activate the second control with a visible focus outline");
      await page.locator(".inspection-buttons button").first().click();
      await page.mouse.move(3, 3);
    }
    if (entry.movement) {
      const measured = await geometry(page);
      const restIntervals = beatRestSamples(measured.boxes, measured.viewport, ["start", "end"]).map(samples => samples.map(sample => measured.origin + sample.top));
      const rests = restIntervals.map(interval => interval[1]);
      const transitions = rests.slice(0, -1).map((from, index) => ({ from, to: restIntervals[index + 1][0] }));
      const between = (index, amount) => transitions[index].from + (transitions[index].to - transitions[index].from) * amount;
      const forwardTargets = [rests[0], between(0, 1 / 3), between(0, 2 / 3), rests[1], between(1, 1 / 3), between(1, 2 / 3), rests[2]];
      report.continuous = [];
      for (const direction of ["forward", "reverse"]) {
        const from = direction === "forward" ? rests[0] : rests[2];
        const to = direction === "forward" ? rests[2] : rests[0];
        await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), from);
        await page.waitForTimeout(settleMs);
        await page.evaluate(({ from, to }) => {
          const state = window.__recoveryScroll = { from, to, durationMs: 18000, started: performance.now(), done: false, frames: 0 };
          const tick = now => {
            const progress = Math.min(1, (now - state.started) / state.durationMs);
            window.scrollTo({ top: from + (to - from) * progress, behavior: "instant" });
            state.frames++;
            if (progress < 1) requestAnimationFrame(tick);
            else { state.done = true; state.finished = now; }
          };
          requestAnimationFrame(tick);
        }, { from, to });
        const targets = direction === "forward" ? forwardTargets : [...forwardTargets].reverse();
        const movement = { direction, from, to, requestedDurationMs: 18000, transitions, targetPositions: targets, frames: [] };
        for (let index = 0; index < targets.length; index++) {
          await page.waitForFunction(({ top, forward }) => window.__recoveryScroll.done || (forward ? scrollY >= top - 1 : scrollY <= top + 1), { top: targets[index], forward: direction === "forward" }, { timeout: 25000, polling: "raf" });
          const state = await page.evaluate(() => ({ ...window.__recoveryScroll, capturedAt: performance.now(), scrollY }));
          const frame = await capture(`movement-${direction}-${String(index + 1).padStart(2, "0")}`, { direction, targetScroll: targets[index], state }, { type: "jpeg", quality: 72 });
          const afterCapture = await page.evaluate(() => ({ at: performance.now(), scrollY }));
          movement.frames.push({ file: frame.file, targetScroll: targets[index], ...state, afterCapture });
        }
        await page.waitForFunction(() => window.__recoveryScroll.done, null, { timeout: 25000 });
        movement.final = await page.evaluate(() => ({ ...window.__recoveryScroll, scrollY }));
        const positions = movement.frames.map(frame => frame.scrollY);
        if (positions.some((top, index) => index > 0 && (direction === "forward" ? top < positions[index - 1] : top > positions[index - 1]))) problem(`${direction} movement samples were not monotonic`);
        if (new Set(positions).size < 4) problem(`${direction} movement captured fewer than four different positions`);
        movement.transitionSamples = transitions.map((transition, index) => ({
          betweenBeats: [ids[index], ids[index + 1]],
          files: movement.frames.filter(frame => [frame.scrollY, frame.afterCapture.scrollY].every(top => top > transition.from && top < transition.to)).map(frame => frame.file),
        }));
        if (movement.transitionSamples.some(sample => sample.files.length === 0)) problem(`${direction} movement lacks a frame whose capture starts and finishes inside each transition`);
        report.continuous.push(movement);
      }
    }
    report.final = await measurements(page);
    report.complete = true;
  } catch (error) {
    report.failure = error.stack;
    problem(error.message);
    await capture("failure").catch(() => {});
  } finally {
    await context.close();
    report.finishedAtUtc = new Date().toISOString();
    await json(`${entry.name}/report.json`, report);
    await writeFile(join(directory, "browser.log"), [...report.errors, ...report.warnings, ...report.requests].map(item => JSON.stringify(item)).join("\n") + "\n");
  }
  return { name: entry.name, report: `${entry.name}/report.json`, completed: !!report.complete, problems: report.problems, captures: report.captures.length, blockedExternal: report.blockedExternal.length };
}

let browser;
try {
  browser = await chromium.launch({ headless: true, args: launchArgs });
  manifest.browser = browser.version();
  for (const entry of cases) {
    console.log(`Capturing ${entry.name}`);
    let caseBrowser = browser;
    try {
      if (entry.noWebgl) caseBrowser = await chromium.launch({ headless: true, args: ["--disable-3d-apis"] });
      const result = await runCase(caseBrowser, entry);
      manifest.results.push(result);
      console.log(`${entry.name}: ${result.problems.length ? `${result.problems.length} problem(s)` : "functional assertions passed"}; ${result.captures} captures`);
      await json("manifest.json", manifest);
    } finally { if (caseBrowser !== browser) await caseBrowser.close(); }
  }
  manifest.complete = true;
} catch (error) {
  manifest.error = error.stack;
  manifest.problems.push(error.message);
} finally {
  if (browser) await browser.close();
  const sourceAfter = await sourceManifest();
  await json("source-after.json", sourceAfter);
  manifest.sourceUnchanged = sourceBefore.digest === sourceAfter.digest;
  if (!manifest.sourceUnchanged) manifest.problems.push("Prototype source changed during capture; this invocation does not establish a single-source result");
  manifest.finishedAtUtc = new Date().toISOString();
  manifest.functionalPass = manifest.complete && !manifest.problems.length && manifest.results.every(result => result.completed && !result.problems.length);
  manifest.visualApproval = "Not determined by this script; human review and the author's assessment remain required";
  await json("manifest.json", manifest);
  console.log(JSON.stringify({ output: relative(repository, output), complete: manifest.complete, functionalPass: manifest.functionalPass, sourceUnchanged: manifest.sourceUnchanged, results: manifest.results }, null, 2));
  if (!manifest.functionalPass) process.exitCode = 1;
}
