// Deterministic production-browser regression, not a model run or visual score.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const study = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(study, "../../..");
const variant = process.argv[2];
if (!["baseline", "patched"].includes(variant)) throw new Error("Use baseline or patched");
const runtime = path.join(study, "runtime", variant);
const evidence = path.join(study, variant);
const capture = process.argv[3] ?? "capture-1";
if (!/^[a-z0-9-]+$/.test(capture)) throw new Error("Invalid capture name");
const captureDirectory = path.join(evidence, capture);
if (existsSync(captureDirectory)) throw new Error(`Will not overwrite ${captureDirectory}`);
mkdirSync(captureDirectory);
const resultFile = path.join(captureDirectory, "browser.json");
writeFileSync(path.join(captureDirectory, "browser.mjs.original"), readFileSync(fileURLToPath(import.meta.url)));
const require = createRequire(path.join(runtime, "package.json"));
const { chromium } = require("playwright-core");
const port = variant === "baseline" ? 3041 : 3042;
const origin = `http://127.0.0.1:${port}`;
const sha256 = data => createHash("sha256").update(data).digest("hex");
const report = { schemaVersion: 1, variant, startedAt: new Date().toISOString(), node: process.version,
  playwright: require("playwright-core/package.json").version,
  sourceManifestSha256: sha256(readFileSync(path.join(evidence, "source-manifest.json"))),
  probeSha256: sha256(readFileSync(fileURLToPath(import.meta.url))),
  limitation: "Software Chromium integration of one tiny fixture. Not physical-phone approval, a general visual score, a paid actor, or a complete-site evaluation.",
  cases: [], artifacts: {} };
let serverLog = "";
const server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  cwd: runtime, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: ["ignore", "pipe", "pipe"],
});
for (const stream of [server.stdout, server.stderr]) stream.on("data", chunk => { serverLog += chunk; });
const configs = variant === "baseline"
  ? [{ name: "desktop", width: 1440, height: 900 }, { name: "phone", width: 390, height: 844, phone: true }]
  : [{ name: "desktop", width: 1440, height: 900 }, { name: "phone", width: 390, height: 844, phone: true },
    { name: "short", width: 1280, height: 720 }, { name: "reduced", width: 1440, height: 900, reduced: true },
    { name: "no-webgl", width: 1440, height: 900, noWebgl: true },
    { name: "no-js", width: 390, height: 844, noJs: true, phone: true },
    { name: "context-loss", width: 1440, height: 900, contextLoss: true }];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const snapshot = page => page.evaluate(() => Object.fromEntries(["alpha", "beta"].map(name => [name, {
  ...document.getElementById(`diagnostic-${name}`).dataset,
  scene: document.querySelector(`[data-probe="${name}"] .story`).dataset.scene,
  look: document.querySelector(`[data-probe="${name}"] .story`).dataset.look,
  canvases: document.querySelectorAll(`[data-probe="${name}"] canvas`).length,
}])));
async function screenshot(page, item, label) {
  const relative = `${variant}/${capture}/${item.name}/${label}.png`;
  const destination = path.join(study, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  await page.screenshot({ path: destination });
  report.artifacts[relative] = { sha256: sha256(readFileSync(destination)), scrollY: await page.evaluate(() => scrollY) };
  item.screenshots.push(relative);
}
async function waitValue(page, name, value, live) {
  await page.waitForFunction(({ name, value, live }) => {
    const data = document.getElementById(`diagnostic-${name}`).dataset;
    return data.htmlValue === String(value) && (!live || data.sceneValue === String(value) && data.extraValue === String(value));
  }, { name, value, live }, { timeout: 10000 });
}
function liveIdentity(state, name) {
  const value = state[name];
  assert.equal(value.scene, "on"); assert.equal(value.htmlSceneOff, "false");
  assert.equal(value.sceneOff, "false"); assert.equal(value.extraSceneOff, "false");
  assert.equal(value.sceneStore, value.htmlStore); assert.equal(value.extraStore, value.htmlStore);
  assert.equal(value.extraPropSame, "true"); assert.ok(Number(value.frames) > 0);
}
let browser;
try {
  for (let attempt = 0; ; attempt++) {
    try { if ((await fetch(origin)).ok) break; } catch { /* bounded local readiness retry */ }
    if (attempt >= 100) throw new Error(`Local production server did not become ready: ${serverLog}`);
    await pause(100);
  }
  for (const config of configs) {
    const item = { ...config, checks: [], snapshots: {}, screenshots: [], consoleErrors: [], pageErrors: [], externalRequests: [] };
    report.cases.push(item);
    browser = await chromium.launch({ headless: true, args: config.noWebgl ? ["--disable-3d-apis"] : ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
    report.browser = browser.version();
    const context = await browser.newContext({ viewport: { width: config.width, height: config.height },
      isMobile: !!config.phone, hasTouch: !!config.phone, deviceScaleFactor: 1,
      javaScriptEnabled: !config.noJs, reducedMotion: config.reduced ? "reduce" : "no-preference" });
    await context.route("**/*", route => {
      const url = route.request().url();
      if (new URL(url).origin === origin) return route.continue();
      item.externalRequests.push(url); return route.abort();
    });
    const page = await context.newPage();
    page.on("console", message => { if (message.type() === "error") item.consoleErrors.push(message.text()); });
    page.on("pageerror", error => item.pageErrors.push(error.message));
    page.setDefaultTimeout(10000);
    try {
      await page.goto(origin, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);
      item.snapshots.initial = await snapshot(page);
      const alpha = page.locator('[data-probe="alpha"]');
      const beta = page.locator('[data-probe="beta"]');
      const amber = alpha.getByRole("button", { name: "Set alpha amber" });
      const blue = alpha.getByRole("button", { name: "Set alpha blue" });
      if (config.noJs) {
        assert.equal(item.snapshots.initial.alpha.scene, "off");
        assert.equal(item.snapshots.initial.beta.scene, "off");
        assert.equal(await page.locator("canvas").count(), 0);
        assert.equal(await amber.isVisible(), false);
        assert.ok(await alpha.getByText(/alpha fallback:/).isVisible());
        assert.ok(await beta.getByText(/beta fallback:/).isVisible());
        item.checks.push("No JavaScript: both static stories and fallback explanations present, unusable controls hidden");
        await screenshot(page, item, "static-alpha");
        await beta.getByRole("heading", { name: "beta controls probe" }).scrollIntoViewIfNeeded();
        await screenshot(page, item, "static-beta");
      } else {
        const live = variant === "patched" && !config.noWebgl;
        if (live) {
          await waitValue(page, "alpha", null, true);
          item.snapshots.live = await snapshot(page);
          liveIdentity(item.snapshots.live, "alpha");
          assert.notEqual(item.snapshots.live.alpha.htmlStore, item.snapshots.live.beta.htmlStore);
          item.checks.push("Custom Piece and lazy extra share the HTML store and report sceneOff=false; sibling stores differ");
        } else {
          assert.equal(item.snapshots.initial.alpha.scene, "off");
          assert.equal(item.snapshots.initial.beta.scene, "off");
          assert.equal(await page.locator("canvas").count(), 0);
          assert.ok(await alpha.getByText(/alpha fallback:/).isVisible());
          if (variant === "baseline") {
            assert.ok([...item.consoleErrors, ...item.pageErrors].some(error => error.includes("Story controls must be inside a Story")));
            item.checks.push("Baseline failure reproduced: hook throws, WebGL boundary switches both stories to HTML fallback");
          } else item.checks.push("WebGL disabled: both stories use readable HTML fallback and sceneOff=true");
        }
        await amber.scrollIntoViewIfNeeded();
        if (config.phone) await amber.tap(); else await amber.click();
        await waitValue(page, "alpha", 1, live);
        item.snapshots.pointer = await snapshot(page);
        assert.equal(item.snapshots.pointer.beta.htmlValue, "null");
        if (live) assert.equal(item.snapshots.pointer.alpha.meshColor, "d88716");
        item.checks.push("Pointer selection updates HTML, live scene and lazy extra without changing sibling");
        await screenshot(page, item, "pointer-amber");
        await page.keyboard.press("Tab");
        assert.equal(await blue.evaluate(node => node === document.activeElement), true);
        await page.keyboard.press("Enter");
        await waitValue(page, "alpha", 2, live);
        item.snapshots.keyboard = await snapshot(page);
        if (live) assert.equal(item.snapshots.keyboard.alpha.meshColor, "206bc4");
        item.checks.push("Tab reaches the next HTML control and Enter changes selection");
        await screenshot(page, item, "keyboard-blue");
        if (live) {
          await amber.click(); await waitValue(page, "alpha", 1, true);
          await alpha.getByRole("button", { name: "Ask alpha scene" }).click();
          await waitValue(page, "alpha", 2, true);
          item.snapshots.sceneWriteBack = await snapshot(page);
          item.checks.push("Scene hook writes back to the same store, updating HTML and lazy extra");
          if (config.reduced) {
            await page.waitForTimeout(300);
            const before = (await snapshot(page)).alpha.worldMatrix;
            await page.mouse.move(5, 5); await page.waitForTimeout(650);
            const after = (await snapshot(page)).alpha.worldMatrix;
            assert.equal(before, after);
            item.snapshots.reducedStillness = { before, after };
            item.checks.push("Reduced motion: object world matrix unchanged across elapsed time and pointer movement");
          }
          await alpha.getByRole("group", { name: "alpha appearance" }).getByRole("button", { name: "Dark", exact: true }).click();
          await waitValue(page, "alpha", 2, true);
          await page.waitForTimeout(350);
          item.snapshots.lookChange = await snapshot(page);
          assert.equal(item.snapshots.lookChange.alpha.look, "dark");
          assert.equal(item.snapshots.lookChange.alpha.htmlStore, item.snapshots.live.alpha.htmlStore);
          liveIdentity(item.snapshots.lookChange, "alpha");
          item.checks.push("Look change preserves store identity and selection across remounted Piece");
        }
        const betaAmber = beta.getByRole("button", { name: "Set beta amber" });
        await betaAmber.scrollIntoViewIfNeeded(); await betaAmber.click();
        await waitValue(page, "beta", 1, live);
        item.snapshots.sibling = await snapshot(page);
        assert.equal(item.snapshots.sibling.alpha.htmlValue, "2");
        assert.notEqual(item.snapshots.sibling.alpha.htmlStore, item.snapshots.sibling.beta.htmlStore);
        if (live) liveIdentity(item.snapshots.sibling, "beta");
        item.checks.push("Second Story updates independently while first Story retains selection and store");
        await screenshot(page, item, "sibling-amber");
        if (config.contextLoss) {
          await amber.scrollIntoViewIfNeeded();
          item.contextLoss = await alpha.locator("canvas").evaluate(canvas => {
            const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
            const extension = gl?.getExtension("WEBGL_lose_context");
            if (!extension) return { supported: false };
            extension.loseContext(); return { supported: true, method: "WEBGL_lose_context.loseContext" };
          });
          assert.equal(item.contextLoss.supported, true);
          await page.waitForFunction(() => document.querySelector('[data-probe="alpha"] .story').dataset.scene === "off");
          await amber.click(); await waitValue(page, "alpha", 1, false);
          item.snapshots.contextLoss = await snapshot(page);
          assert.equal(item.snapshots.contextLoss.alpha.htmlSceneOff, "true");
          assert.equal(item.snapshots.contextLoss.alpha.htmlStore, item.snapshots.live.alpha.htmlStore);
          assert.equal(item.snapshots.contextLoss.alpha.canvases, 0);
          assert.equal(item.snapshots.contextLoss.beta.scene, "on");
          assert.equal(item.snapshots.contextLoss.beta.htmlValue, "1");
          assert.ok(await alpha.getByText(/alpha fallback:/).isVisible());
          await page.keyboard.press("Tab"); await page.keyboard.press("Enter");
          await waitValue(page, "alpha", 2, false);
          item.snapshots.postLossKeyboard = await snapshot(page);
          item.checks.push("Actual context loss removes only the failed scene; same HTML store, pointer and keyboard controls keep working with sceneOff=true");
          await screenshot(page, item, "context-loss-fallback");
        }
      }
      assert.deepEqual(item.externalRequests, []);
      if (variant === "patched") {
        assert.deepEqual(item.pageErrors, []);
        assert.ok(item.consoleErrors.every(error => config.noWebgl && /WebGL|context|renderer/i.test(error)), item.consoleErrors.join("\n"));
      }
      item.result = "pass";
    } catch (error) {
      item.result = "fail"; item.error = error.stack;
      item.snapshots.failure = await snapshot(page).catch(() => null);
      await screenshot(page, item, "failure").catch(() => {});
    } finally { await browser.close(); browser = null; }
    console.log(`${variant} ${item.name}: ${item.result}${item.error ? `\n${item.error}` : ""}`);
  }
} finally {
  await browser?.close();
  server.kill("SIGTERM");
  report.endedAt = new Date().toISOString();
  report.passed = report.cases.length === configs.length && report.cases.every(item => item.result === "pass");
  writeFileSync(path.join(captureDirectory, "server.log"), serverLog);
  writeFileSync(resultFile, `${JSON.stringify(report, null, 2)}\n`);
}
if (!report.passed) process.exitCode = 1;
