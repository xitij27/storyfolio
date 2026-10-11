import { createRequire } from "node:module";
import { mkdir, writeFile, readFile, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const destination = join(root, "visuals");
await mkdir(destination, { recursive: true });
const { chromium } = createRequire(import.meta.url)("/home/kshitij/projects/storyfolio/node_modules/storyfolio-build-dependencies-20261011/node_modules/playwright-core");
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const records = [];
try {
  for (const [mode, viewport] of [["desktop", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, reducedMotion: "no-preference" });
    await context.route("**/*", route => ["127.0.0.1", "localhost"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    await page.goto("http://127.0.0.1:3011/", { waitUntil: "networkidle" });
    if (mode === "desktop") await page.waitForSelector('.story[data-scene="on"]', { timeout: 30000 });
    await page.waitForTimeout(2000);
    for (const beat of ["scope.opening", "state.table", "transition.diagram", "observation.fixture", "review.close"]) {
      const locator = page.locator(`[data-beat="${beat}"]`);
      await locator.evaluate(element => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top, behavior: "instant" }));
      await page.waitForTimeout(1800);
      const file = `${mode}-${beat}.png`;
      await page.screenshot({ path: join(destination, file) });
      const metrics = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, scrollY, canvasCount: document.querySelectorAll("canvas").length, scene: document.querySelector(".story")?.getAttribute("data-scene"), activeRail: document.querySelector(".story-rail [aria-current]")?.textContent, controls: [...document.querySelectorAll('input[type="range"],button')].map(element => ({ text: element.textContent, label: element.getAttribute("aria-label") })) }));
      const bytes = await readFile(join(destination, file));
      records.push({ mode, beat, file, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex"), metrics });
    }
    records.push({ mode, errors });
    await context.close();
  }
} finally { await browser.close(); }
const source = "/home/kshitij/projects/portfolio-website/public/assets/img/versions/v3.jpg";
await copyFile(source, join(destination, "reference-v3-repository-preview.jpg"));
const bytes = await readFile(source);
await writeFile(join(destination, "manifest.json"), JSON.stringify({ captured: new Date().toISOString(), modelCalls: 0, reference: { source, file: "reference-v3-repository-preview.jpg", sha256: createHash("sha256").update(bytes).digest("hex"), provenance: "Repository-supplied V3 screenshot, not a new runtime capture." }, demo: { url: "http://127.0.0.1:3011/", provenance: "Fresh software-WebGL Chromium captures. These are visual observations, not physical-device performance measurements.", records } }, null, 2) + "\n");
console.log(JSON.stringify({ screenshots: records.filter(record => record.file).length, destination }));
