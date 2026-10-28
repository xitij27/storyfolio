#!/usr/bin/env node
/*
  Photographs every world's piece for every chapter, for the transitions
  index: each chapter at the middle of its hold, for the sample person Noa,
  with the words and the bar hidden, at 960x600, as JPEG at quality 82.

    PLAYWRIGHT_CORE=<path to a playwright-core install> \
      node scripts/piece-shots.mjs --url http://127.0.0.1:3200/storyfolio [--out public/transitions/pieces]

  Point --url at a running build of this library (the static export served
  under its base path, or the dev server). The library does not depend on
  playwright-core itself; PLAYWRIGHT_CORE names one, such as the engine's.
  CHROMIUM names a Chromium to start instead of playwright-core's own.
*/
import { mkdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, ...v]) => [k, v.join("=") || true]));
if (!args.url) { console.error("--url is required; see the comment at the top of scripts/piece-shots.mjs"); process.exit(2); }
const out = path.resolve(String(args.out ?? "public/transitions/pieces"));
mkdirSync(out, { recursive: true });

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE || "playwright-core");
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const page = await (await browser.newContext({ viewport: { width: 960, height: 600 }, deviceScaleFactor: 1, reducedMotion: "reduce" })).newPage();
const problems = [];
page.on("pageerror", (e) => problems.push(e.message));

let saved = 0;
for (const world of ["sheet", "map", "book"]) {
  await page.goto(`${String(args.url).replace(/\/$/, "")}/transitions/whole/${world}/?p=noa`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error, null, { timeout: 60000 });
  await page.addStyleTag({ content: "header { display: none !important } .stitch .cap, .stitch .rail, .stitch .hint, .stitch .cta { display: none !important }" });
  const keys = await page.evaluate(() => window.__stitch.keys);
  for (let k = 0; k < keys.length; k++) {
    await page.evaluate((s) => window.scrollTo(0, window.__stitch.top() + s * window.__stitch.unit()), k + 0.2);
    await page.waitForTimeout(500);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await page.screenshot({ path: path.join(out, `${world}-${keys[k]}.jpg`), type: "jpeg", quality: 82 });
    saved++;
  }
}
await browser.close();
for (const p of problems) console.error(p);
console.log(`${saved} pieces saved to ${out}, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
