// Root's review capture of the turn-5 site: every beat at mid-rest,
// with captions and with all HTML hidden (scene only).
// Usage: node capture.mjs <siteDir> <outDir> <width>x<height> [touch]
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const [site, out, size, touch] = process.argv.slice(2);
const [width, height] = size.split("x").map(Number);
const require = createRequire(join(site, "package.json"));
const { chromium } = require("playwright-core");
const { beatRestSamples } = await import(join(site, "scripts/check-lib.mjs"));
await mkdir(out, { recursive: true });

const probe = createServer();
await new Promise(r => probe.listen(0, "127.0.0.1", r));
const port = probe.address().port;
await new Promise(r => probe.close(r));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [join(site, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: site, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: "ignore" });
const report = { size, touch: !!touch, errors: [], external: [], beats: [] };
let browser;
try {
  for (let n = 0; n < 80; n++) { try { if ((await fetch(base)).ok) break; } catch {} await new Promise(r => setTimeout(r, 250)); }
  browser = await chromium.launch({
    executablePath: join(homedir(), ".cache/ms-playwright/chromium-1234/chrome-linux64/chrome"),
    args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const context = await browser.newContext({ viewport: { width, height }, hasTouch: !!touch, isMobile: !!touch, deviceScaleFactor: touch ? 2 : 1 });
  const page = await context.newPage();
  page.on("pageerror", e => report.errors.push(e.message));
  page.on("request", r => { if (!r.url().startsWith(base) && !r.url().startsWith("data:")) report.external.push(r.url()); });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  report.scene = await page.locator(".story").getAttribute("data-scene");
  const geometry = await page.locator("[data-beat]").evaluateAll(es => es.map(e => ({ id: e.dataset.beat, top: e.offsetTop, height: e.offsetHeight })));
  const samples = beatRestSamples(geometry, height, ["mid"]);
  const hide = "body *{visibility:hidden !important} .story-scene,.story-scene *{visibility:visible !important}";
  for (const [i, beat] of geometry.entries()) {
    const name = `${String(i + 1).padStart(2, "0")}-${beat.id}`;
    await page.evaluate(y => window.scrollTo(0, y), samples[i][0].top);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: join(out, `${name}.png`) });
    const tag = await page.addStyleTag({ content: hide });
    await page.waitForTimeout(150);
    await page.screenshot({ path: join(out, `${name}.scene.png`) });
    await tag.evaluate(node => node.remove());
    report.beats.push(name);
  }
  await writeFile(join(out, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
