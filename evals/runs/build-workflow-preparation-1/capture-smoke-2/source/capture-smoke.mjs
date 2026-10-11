#!/usr/bin/env node
// No model. Actual browser calibration of coordinator capture helpers against
// a tiny local known-good fixture and explicit bad variants. Never a portfolio
// visual-quality judgement or a substitute for a production Next acceptance.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assessDiagnosticCapture, assessControl, captureTravel, diagnosticPlan, digest, exerciseControl, inventoryControls } from "../../lib/build-capture.mjs";
import { buildCases } from "../../lib/build-check.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const output = resolve(directory, process.argv[2] ?? "capture-smoke-1");
if (dirname(output) !== directory) throw new Error("Output must be a fresh child of this preparation study");
await mkdir(output);
const fixture = await readFile(join(directory, "capture-fixture.html"));
const require = createRequire(resolve(directory, "../../../package.json"));
const { chromium } = require("./node_modules/storyfolio-build-dependencies-20261011/node_modules/playwright-core");
const ids = ["question", "scheduling", "bench", "evidence", "scope"];
const expected = {
  schemaVersion: 2, taskKind: "prototype-depth", id: "tiny-capture", route: "/",
  beats: ids.map((id, index) => ({ id, headingLevel: index ? 2 : 1 })), requiredText: [], links: [], assets: [],
  modes: { desktop: "animated", mobile: "animated", short: "animated", reducedMotion: "animated", noWebGL: "static", noJavaScript: "static" },
  viewports: { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 }, short: { width: 1280, height: 720 } },
};
const manifest = { schemaVersion: 1, modelInvocations: 0, fixtureSha256: digest(fixture), started: new Date().toISOString(), source: {}, reports: [], complete: false, scope: "actual browser helper smoke, not full Next acceptance or visual quality" };
await mkdir(join(output, "source"));
for (const path of ["capture-smoke.mjs", "capture-fixture.html", "../../lib/build-capture.mjs", "../../lib/build-check.mjs"]) {
  const bytes = await readFile(resolve(directory, path));
  manifest.source[path] = digest(bytes);
  await writeFile(join(output, "source", path.split("/").at(-1)), bytes);
}
const server = createServer((request, response) => { response.writeHead(200, { "content-type": "text/html" }); response.end(fixture); });
await new Promise(ok => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}/`;

async function run(entry, variant = "good") {
  const name = `${entry.id}-${variant}`;
  await mkdir(join(output, name));
  const browser = await chromium.launch({ args: entry.noWebGL ? ["--no-sandbox", "--disable-3d-apis"] : ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const report = { entry, variant, rests: [], stationary: [], motion: [], controls: [], controlInventoryComplete: false, images: [], errors: [] };
  try {
    const context = await browser.newContext({ viewport: entry.viewport, javaScriptEnabled: !entry.noJavaScript, reducedMotion: entry.reducedMotion ? "reduce" : "no-preference", hasTouch: !!entry.touch, isMobile: !!entry.touch, serviceWorkers: "block" });
    const page = await context.newPage();
    await page.route("**/*", route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const capture = async (label, options = {}) => {
      const file = `${label}.${options.type === "jpeg" ? "jpg" : "png"}`;
      const bytes = await page.screenshot({ path: join(output, name, file), ...options });
      const image = { file, sha256: digest(bytes), bytes: bytes.length }; report.images.push(image); return image;
    };
    const reset = async () => {
      await page.goto(`${base}?case=${variant}`);
      if (entry.mode === "animated" || entry.loseContext) await page.waitForSelector('.story[data-scene="on"]');
      if (entry.loseContext) {
        report.contextLoss = await page.evaluate(() => {
          const extension = document.querySelector("canvas").getContext("webgl")?.getExtension("WEBGL_lose_context");
          extension?.loseContext(); return { supported: !!extension };
        });
        await page.waitForSelector('.story[data-scene="off"]');
      }
    };
    await reset();
    const geometry = await page.evaluate(() => ({ viewport: innerHeight, maxScroll: document.documentElement.scrollHeight - innerHeight, boxes: [...document.querySelectorAll("[data-beat]")].map(node => { const box = node.getBoundingClientRect(); return { id: node.dataset.beat, top: box.top + scrollY, height: box.height }; }) }));
    report.geometry = geometry;
    const plan = diagnosticPlan(ids, geometry.boxes, geometry.viewport, geometry.maxScroll, entry.mode);
    for (const rest of plan.rests) {
      const requestedScroll = entry.mode === "animated" ? rest.end : rest.start;
      await page.evaluate(top => scrollTo({ top, behavior: "instant" }), requestedScroll);
      await page.waitForTimeout(100);
      report.rests.push({ beat: rest.beat, requestedScroll, actualScroll: await page.evaluate(() => scrollY), scene: await page.locator(".story").getAttribute("data-scene"), afterContextLoss: !!entry.loseContext, ...await capture(`rest-${rest.beat}`) });
      if (entry.reducedMotion) {
        const started = Date.now(); const before = await capture(`still-${rest.beat}-before`);
        await page.waitForTimeout(400); const after = await capture(`still-${rest.beat}-after`);
        report.stationary.push({ beat: rest.beat, before: before.sha256, after: after.sha256, elapsedMs: Date.now() - started });
      }
    }
    const controls = await inventoryControls(page);
    report.controlInventory = controls;
    report.controlInventoryComplete = true;
    for (const control of controls) report.controls.push(await exerciseControl(page, control, capture, reset));
    if (variant === "good" && ["desktop", "mobile", "short"].includes(entry.id)) for (const interval of plan.intervals) report.motion.push(await captureTravel(page, interval, capture));
    report.problems = assessDiagnosticCapture(expected, entry, report);
  } catch (error) { report.errors.push(error.stack); report.problems = [error.message]; }
  finally { await browser.close(); }
  await writeFile(join(output, name, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  manifest.reports.push({ name, problems: report.problems, reportSha256: digest(await readFile(join(output, name, "report.json"))) });
  console.log(`${name}: ${report.problems.length ? report.problems.join("; ") : "passed"}`);
  if (variant === "good") assert.deepEqual(report.problems, [], name);
  else if (variant === "missing" || variant === "loss-missing") assert.match(report.problems.join(), /IDs\/order/, name);
  else if (variant === "moving") assert.match(report.problems.join(), /changed reduced-motion/, name);
  else if (variant === "wrong-target") assert.match(report.controls.flatMap(assessControl).join(), /targets did not respond/, name);
  else if (variant === "noop") assert.match(report.controls.flatMap(assessControl).join(), /no observable control response/, name);
}

try {
  for (const entry of buildCases(expected)) await run(entry);
  const staticEntry = { id: "control-negative", viewport: expected.viewports.desktop, mode: "animated" };
  for (const variant of ["wrong-target", "noop", "missing"]) await run(staticEntry, variant);
  await run(buildCases(expected).find(entry => entry.reducedMotion), "moving");
  await run(buildCases(expected).find(entry => entry.loseContext), "loss-missing");
  manifest.complete = true;
} catch (error) { manifest.error = error.stack; process.exitCode = 1; }
finally {
  manifest.finished = new Date().toISOString();
  await writeFile(join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await new Promise(ok => server.close(ok));
}
