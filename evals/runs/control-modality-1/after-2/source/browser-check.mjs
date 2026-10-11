// Local actual-browser regression only. No actor or model call.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { digest } from "../../lib/build-capture.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const label = process.argv[2];
if (!label || !/^[a-z0-9-]+$/.test(label)) throw new Error("Supply a fresh lowercase output label");
const output = join(directory, label);
await mkdir(output);
const baseline = process.argv.includes("--baseline");
const modulePath = baseline ? "evals/runs/codex-bench-depth-baseline-1/inputs/implementation/evals/lib/build-capture.mjs" : "evals/lib/build-capture.mjs";
const capture = await import(pathToFileURL(join(root, modulePath)));
const template = await readFile(join(directory, "fixture.html"), "utf8");
const source = {};
await mkdir(join(output, "source"));
for (const path of [modulePath, "evals/lib/source-scope.mjs", "evals/lib/build-check.mjs", "evals/check-build.mjs", "evals/runs/control-modality-1/fixture.html", "evals/runs/control-modality-1/browser-check.mjs"]) {
  const bytes = await readFile(join(root, path)); source[path] = digest(bytes);
  await writeFile(join(output, "source", path.split("/").at(-1)), bytes);
}
const require = createRequire(join(root, "package.json"));
const { chromium } = require("./node_modules/storyfolio-build-dependencies-20261011/node_modules/playwright-core");
const declaration = { selector: "#skip", name: "Skip to answer", href: "#answer", reason: "Coordinator-reviewed bypass link intentionally revealed by keyboard focus" };
const manifest = { schemaVersion: 1, label, baseline, modulePath, source, node: process.version, started: new Date().toISOString(), complete: false, modelCalls: 0, reports: [], environment: Object.fromEntries(["PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH"].map(key => [key, process.env[key] ?? null])), limits: "Focused browser-helper calibration only, not full prototype acceptance, performance or visual quality" };
const server = createServer((request, response) => {
  const variant = new URL(request.url, "http://localhost").searchParams.get("variant") ?? "good";
  const attributes = variant === "negative-tab" ? 'tabindex="-1"' : variant === "disabled" ? 'aria-disabled="true"' : variant === "forged-metadata" ? 'data-keyboard-only="true" data-applicability="not-applicable" class="story-skip"' : "";
  const href = variant === "wrong-destination" ? "#wrong" : "#answer";
  const markup = variant === "offscreen-button" ? '<button id="skip" aria-pressed="false" onclick="this.setAttribute(\'aria-pressed\',this.getAttribute(\'aria-pressed\')!==\'true\')">Skip to answer</button>' : `<a id="skip" href="${href}" ${attributes}>Skip to answer</a>`;
  let html = template.replace("VARIANT", variant).replace("SKIP_MARKUP", markup).replace("TARGET_ID", variant === "missing-target" ? "absent" : "answer");
  if (variant === "duplicate-target") html = html.replace('id="wrong"', 'id="answer"');
  response.writeHead(200, { "content-type": "text/html" }); response.end(html);
});
await new Promise(ok => server.listen(0, "127.0.0.1", ok));
const origin = `http://127.0.0.1:${server.address().port}`;
const desktop = { id: "desktop", viewport: { width: 1440, height: 900 } };
const conditions = [desktop, { id: "mobile", viewport: { width: 390, height: 844 }, touch: true }, { id: "short", viewport: { width: 1280, height: 720 } }, { ...desktop, id: "reduced-motion", reducedMotion: true }, { ...desktop, id: "no-webgl", noWebGL: true }, { id: "no-javascript", viewport: { width: 390, height: 844 }, noJavaScript: true }, { ...desktop, id: "context-loss", loseContext: true }];

async function run(entry, variant) {
  const name = `${entry.id}-${variant}`;
  const folder = join(output, name);
  await mkdir(folder);
  const authorized = !["undeclared", "offscreen-button", "forged-metadata", "covered-ordinary", "ordinary-visible"].includes(variant);
  const declarations = authorized ? [{ ...declaration, ...(variant === "mismatched-declaration" ? { name: "Another name" } : {}) }] : [];
  const report = { name, entry, variant, declarations, images: [], controls: [], errors: [], started: new Date().toISOString() };
  const browser = await chromium.launch({ args: entry.noWebGL ? ["--no-sandbox", "--disable-3d-apis"] : ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    manifest.chromium = browser.version();
    const context = await browser.newContext({ viewport: entry.viewport, javaScriptEnabled: !entry.noJavaScript, reducedMotion: entry.reducedMotion ? "reduce" : "no-preference", hasTouch: !!entry.touch, isMobile: !!entry.touch, serviceWorkers: "block" });
    const page = await context.newPage();
    // Short timeout only bounds intentionally bad local controls, not evidence
    // requirements or settlement waits in the production helper.
    page.setDefaultTimeout(500);
    await page.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const reset = async () => {
      await page.goto(`${origin}/?variant=${variant}`);
      if (entry.loseContext) {
        report.contextLoss = await page.evaluate(() => {
          const gl = document.querySelector("canvas").getContext("webgl");
          const extension = gl?.getExtension("WEBGL_lose_context");
          extension?.loseContext(); return { supported: !!extension };
        });
        assert.equal(report.contextLoss.supported, true);
        await page.waitForFunction(() => document.body.dataset.scene === "off");
      }
    };
    const screenshot = async name => {
      const file = `${name}.png`;
      const bytes = await page.screenshot({ path: join(folder, file) });
      const record = { file, bytes: bytes.length, sha256: digest(bytes) }; report.images.push(record); return record;
    };
    await reset();
    await writeFile(join(folder, "response.html"), await page.content());
    report.controlInventory = await capture.inventoryControls(page, declarations);
    assert.equal(report.controlInventory.length, 1, "the focus-only control must remain inventoried");
    await screenshot("entry");
    for (const control of report.controlInventory) report.controls.push(await capture.exerciseControl(page, control, screenshot, reset, declarations));
    report.problems = report.controls.flatMap(control => capture.assessControl(control, declarations));
    if (!baseline) for (const declared of declarations) if (report.controlInventory.filter(control => control.tag === "a" && control.selector === declared.selector && control.name.trim() === declared.name && control.href === declared.href).length !== 1) report.problems.push("declaration does not match inventory");
    report.scene = await page.locator("body").getAttribute("data-scene");
  } catch (error) { report.errors.push(error.stack); report.problems = [...(report.problems ?? []), error.message]; }
  finally { await browser.close(); }
  report.finished = new Date().toISOString();
  report.expectFailure = baseline || !["good", "ordinary-visible"].includes(variant);
  report.regressionPassed = report.errors.length === 0 && (report.expectFailure ? report.problems.length > 0 : report.problems.length === 0);
  await writeFile(join(folder, "report.json"), JSON.stringify(report, null, 2) + "\n");
  manifest.reports.push({ name, expectedFailure: report.expectFailure, regressionPassed: report.regressionPassed, problems: report.problems, sha256: digest(await readFile(join(folder, "report.json"))), images: report.images.length });
  await writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`${name}: regression ${report.regressionPassed ? "passed" : "FAILED"}, ${report.problems.length} assessment problems, ${report.images.length} originals`);
  assert.equal(report.regressionPassed, true, name);
}
try {
  if (baseline) await run(desktop, "good");
  else {
    for (const entry of conditions) await run(entry, "good");
    const variants = process.argv.includes("--target-followup") ? ["hidden-target", "offscreen-target", "duplicate-target"] : ["ordinary-visible", "undeclared", "offscreen-button", "hidden", "occluded", "negative-tab", "disabled", "blocked-tab", "missing-target", "wrong-destination", "covered-ordinary", "forged-metadata", "mismatched-declaration", "hidden-target", "offscreen-target", "duplicate-target"];
    for (const variant of variants) await run(desktop, variant);
  }
  manifest.complete = true;
} catch (error) { manifest.error = error.stack; process.exitCode = 1; }
finally {
  manifest.finished = new Date().toISOString();
  await writeFile(join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  await new Promise(ok => server.close(ok));
}
