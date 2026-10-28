#!/usr/bin/env node
/*
  Checks the transitions gallery of a running build, local or live, at a
  desktop and a phone size: the index, each whole example and a shared mix
  link open with no page error and no failed request, nothing scrolls
  sideways, the mixer's copy button puts the mix line on the clipboard,
  and switching person changes the words and places and not the mix.

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
const MIX = "map,map,book,book,sheet,sheet,book,map";
const pages = [
  ["index", "/transitions/"],
  ["whole-sheet", "/transitions/whole/sheet/"],
  ["whole-map", "/transitions/whole/map/?p=amara"],
  ["whole-book", "/transitions/whole/book/"],
  ["mix", `/transitions/mix/?m=${MIX}&p=noa`],
];
const report = { base, sizes: [], problems: [] };
const problems = report.problems;

for (const [w, h] of [[1440, 900], [390, 844]]) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: new URL(base).origin });
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
      await page.evaluate(() => window.scrollTo(0, window.__stitch.top() + 2.2 * window.__stitch.unit()));
      await page.waitForTimeout(600);
    } else {
      await page.waitForTimeout(800);
    }
    const sideways = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (sideways > 1) problems.push(`${where()} scrolls sideways by ${sideways}px`);
    await page.screenshot({ path: path.join(out, `${w}x${h}-${name}.png`) });
    size.pages.push({ name, route, sideways });
  }

  // The mixer: the copy button puts the line on the clipboard.
  await page.goto(`${base}/transitions/mix/?m=${MIX}&p=noa`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 });
  await page.getByRole("button", { name: "Copy" }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  if (copied !== MIX) problems.push(`${where()} copy gave "${copied}", not "${MIX}"`);

  // A chapter button turns that chapter to the next world, and the line and the address follow.
  await page.getByRole("button", { name: /^Hello: One map/ }).click();
  await page.waitForFunction(() => location.search.includes("m=book%2Cmap") || location.search.includes("m=book,map"), null, { timeout: 10000 })
    .catch(() => problems.push(`${where()} the Hello button did not change the mix in the address: ${page.url()}`));

  // Switching person changes the words, not the mix.
  await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 });
  const before = await page.evaluate(() => ({ text: document.querySelector(".stitch .text")?.textContent ?? "", m: new URLSearchParams(location.search).get("m") }));
  await page.getByRole("button", { name: "Amara" }).click();
  await page.waitForFunction((t) => (document.querySelector(".stitch .text")?.textContent ?? "") !== t, before.text, { timeout: 10000 })
    .catch(() => problems.push(`${where()} switching person did not change the words`));
  const after = await page.evaluate(() => ({ text: document.querySelector(".stitch .text")?.textContent ?? "", m: new URLSearchParams(location.search).get("m") }));
  if (after.m !== before.m) problems.push(`${where()} switching person changed the mix from ${before.m} to ${after.m}`);
  if (!after.text.includes("Amara Okafor")) problems.push(`${where()} the words are not Amara's after the switch`);
  size.copied = copied;
  report.sizes.push(size);
  await context.close();
}
await browser.close();
writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
for (const p of problems) console.error(p);
console.log(`${report.sizes.length} sizes, ${problems.length} problems: ${out}`);
process.exit(problems.length ? 1 : 0);
