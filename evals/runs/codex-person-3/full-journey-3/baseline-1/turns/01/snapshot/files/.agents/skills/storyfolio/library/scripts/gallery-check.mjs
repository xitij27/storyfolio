#!/usr/bin/env node
/*
  Checks the transitions gallery of a running build, local or live, at a
  desktop and a phone size: the index and each whole example open with no
  page error and no failed request, nothing scrolls sideways, a piece's
  picture opens its example at that chapter, and switching person changes
  the words and places and keeps the chapter.

    PLAYWRIGHT_CORE=<path to a playwright-core install> \
      node scripts/gallery-check.mjs --url=https://xitij27.github.io/storyfolio [--out=dir]

  CHROMIUM names a Chromium to start instead of playwright-core's own.
  Screenshots of each page go in --out (default checks/gallery), with report.json.
*/
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, ...v]) => [k, v.join("=") || true]));
if (!args.url) { console.error("--url is required; see the comment at the top of scripts/gallery-check.mjs"); process.exit(2); }
const base = String(args.url).replace(/\/$/, "");
const out = path.resolve(String(args.out ?? "checks/gallery"));
mkdirSync(out, { recursive: true });

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE || "playwright-core");
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const pages = [
  ["index", "/transitions/"],
  ["whole-sheet", "/transitions/whole/sheet/"],
  ["whole-map", "/transitions/whole/map/?p=amara"],
  ["whole-book", "/transitions/whole/book/"],
  ["piece", "/transitions/whole/book/?c=made"],
];
const report = { base, sizes: [], problems: [] };
const problems = report.problems;

for (const [w, h] of [[1440, 900], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const where = () => `${w}x${h} ${page.url()}`;
  page.on("pageerror", (e) => problems.push(`${where()} page error: ${e.message}`));
  // Next.js prefetches the pages links lead to; moving on cancels them (ERR_ABORTED), which is not a failure.
  page.on("requestfailed", (r) => { const e = r.failure()?.errorText ?? ""; if (!e.includes("ERR_ABORTED")) problems.push(`${where()} request failed: ${r.url()} ${e}`); });
  page.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("/favicon.ico")) problems.push(`${where()} HTTP ${r.status()}: ${r.url()}`); });
  const size = { size: `${w}x${h}`, pages: [] };
  for (const [name, route] of pages) {
    await page.goto(base + route, { waitUntil: "load" });
    if (name !== "index") {
      await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error, null, { timeout: 60000 }).catch(() => problems.push(`${where()} never ready`));
      const error = await page.evaluate(() => window.__stitch?.error ?? null);
      if (error) problems.push(`${where()} story failed: ${error}`);
      await page.evaluate(() => window.scrollTo({ top: window.__stitch.top() + 2.2 * window.__stitch.unit(), behavior: "instant" }));
      await page.waitForTimeout(600);
    } else {
      await page.waitForTimeout(800);
    }
    const sideways = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (sideways > 1) problems.push(`${where()} scrolls sideways by ${sideways}px`);
    await page.screenshot({ path: path.join(out, `${w}x${h}-${name}.png`) });
    size.pages.push({ name, route, sideways });
  }

  // The index has no mixer, and a piece's picture opens its example at that chapter.
  await page.goto(`${base}/transitions/`, { waitUntil: "load" });
  if (await page.locator('a[href*="/transitions/mix"]').count()) problems.push(`${where()} the index still links to a mixer`);
  const piece = page.locator('a[href*="/transitions/whole/map/?c=worked"]');
  if (!(await piece.count())) {
    problems.push(`${where()} the index has no link to the map's "worked" piece`);
    report.sizes.push(size);
    await context.close();
    continue;
  } else {
    await piece.first().click();
    await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 });
    await page.waitForTimeout(600);
    const at = await page.evaluate(() => { const st = window.__stitch.state(); return st && window.__stitch.keys[st.from]; });
    if (at !== "worked") problems.push(`${where()} the map's "worked" piece opened at ${at}`);
  }

  // Switching person changes the words, and the story stays at its chapter.
  const before = await page.evaluate(() => ({ text: document.querySelector(".stitch .text")?.textContent ?? "", c: new URLSearchParams(location.search).get("c") }));
  await page.getByRole("button", { name: "Amara" }).click();
  await page.waitForFunction((t) => (document.querySelector(".stitch .text")?.textContent ?? "") !== t, before.text, { timeout: 10000 })
    .catch(() => problems.push(`${where()} switching person did not change the words`));
  await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 });
  await page.waitForTimeout(600);
  const after = await page.evaluate(() => ({ text: document.querySelector(".stitch .text")?.textContent ?? "", c: new URLSearchParams(location.search).get("c"),
    at: (() => { const st = window.__stitch.state(); return st && window.__stitch.keys[st.from]; })() }));
  if (!after.text.includes("Amara Okafor")) problems.push(`${where()} the words are not Amara's after the switch`);
  if (after.at !== "worked") problems.push(`${where()} after switching person the story is at ${after.at}, not worked`);
  report.sizes.push(size);
  await context.close();
}
await browser.close();
writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
for (const p of problems) console.error(p);
console.log(`${report.sizes.length} sizes, ${problems.length} problems: ${out}`);
process.exit(problems.length ? 1 : 0);
