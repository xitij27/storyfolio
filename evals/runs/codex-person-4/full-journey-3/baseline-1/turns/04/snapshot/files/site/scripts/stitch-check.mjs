#!/usr/bin/env node
/*
  Checks a stitched story on the locally running site. It opens
  a page with a story (/preview by default, with a mix, person and look if
  given), stops at the middle of every chapter's hold and at two points of
  every move, saves a screenshot of each, and
  fails on a page error, a failed request or a blank picture.

    node scripts/stitch-check.mjs --url http://127.0.0.1:3000 \
      --mix sheet,map,book,book,sheet,sheet,map,map [--person noa] [--look daylight] \
      [--size 1440x900] [--out checks/stitch] [--points] [--words]

  Options
    --url=URL       the site's address (required)
    --path=PATH     the page to open, default /preview; / is the person's site
    --mix=TEXT      eight world ids in chapter order; default the page's own
    --person=KEY    a sample person, noa or amara; default the site's own
    --look=ID       a look, night, daylight or blueprint; default the page's own
    --size=WxH      viewport, default 1440x900
    --out=DIR       where report.json and the PNGs go, default checks/stitch
    --points        also shoot the first move between two worlds at raw
                    0.1, 0.5, 0.9 and 1.0, to see the dive end where the
                    next world begins
    --at=LIST       also shoot at these points, in chapters from the top
                    (2.2 is the middle of the third chapter's hold)
    --words         keep the words on screen; by default they are hidden,
                    so a shot shows only the picture
    --wait=MS       settle time after each scroll, default 500

  Shots are taken with reduced motion, so the story stands exactly where
  the page is scrolled. A shot is blank when fewer than 0.5 per cent of
  sampled pixels of the 3D differ clearly from its corner pixel. A failed
  draw is near 0; the map's dim ground does not count, so a phone's view of
  places far apart can be under 1 per cent and still drawn.

  Chromium comes from playwright-core (npm run browsers). CHROMIUM names
  another Chromium to start instead.
*/
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const options = Object.fromEntries(process.argv.slice(2).map((arg, i, all) => {
  const m = /^--([^=]+)(?:=(.*))?$/.exec(arg);
  if (!m) return [];
  if (m[2] !== undefined) return [m[1], m[2]];
  const next = all[i + 1];
  return [m[1], next && !next.startsWith("--") ? next : true];
}).filter((x) => x.length));

function usage(message) {
  console.error(`${message}\nSee the comment at the top of scripts/stitch-check.mjs.`);
  process.exit(2);
}
if (!options.url) usage("--url is required.");
const [width, height] = String(options.size ?? "1440x900").split("x").map(Number);
if (![width, height].every((n) => Number.isFinite(n) && n > 0)) usage("--size must be positive WxH");
const out = path.resolve(String(options.out ?? "checks/stitch"));
mkdirSync(out, { recursive: true });
const settle = Number(options.wait ?? 500);

const { chromium } = createRequire(import.meta.url)("playwright-core");
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
const page = await context.newPage();
const problems = [];
page.on("pageerror", (e) => problems.push(`page error: ${e.message}`));
// A failed resource is reported with its address by the response handler below;
// the console line for it (and for the browser's own favicon request) adds nothing.
page.on("console", (m) => { if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) problems.push(`console error: ${m.text()}`); });
page.on("requestfailed", (r) => problems.push(`request failed: ${r.url()} ${r.failure()?.errorText ?? ""}`));
page.on("response", (r) => { if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.url()}`); });

const query = new URLSearchParams();
if (options.mix && options.mix !== true) query.set("mix", String(options.mix));
if (options.person && options.person !== true) query.set("person", String(options.person));
if (options.look && options.look !== true) query.set("look", String(options.look));
const where = `/${String(options.path && options.path !== true ? options.path : "/preview").replace(/^\/+/, "")}`;
const address = `${String(options.url).replace(/\/$/, "")}${where}${query.size ? `?${query}` : ""}`;
const report = { address, size: `${width}x${height}`, shots: [], problems };

async function finish(code) {
  writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
  await browser.close();
  for (const p of problems) console.error(p);
  console.log(`${report.shots.length} shots, ${problems.length} problems: ${out}`);
  process.exit(code);
}

const response = await page.goto(address, { waitUntil: "load" });
if (!response || !response.ok()) { problems.push(`could not open ${address}: ${response?.status()}`); await finish(1); }
try {
  await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error, null, { timeout: 60000 });
} catch { problems.push("the story never said it was ready"); await finish(1); }
const error = await page.evaluate(() => window.__stitch.error ?? null);
if (error) { problems.push(`the story failed: ${error}`); await finish(1); }
if (!options.words) await page.evaluate(() => document.querySelector(".stitch")?.classList.add("nowords"));
const { keys, mix: shown } = await page.evaluate(() => ({ keys: window.__stitch.keys, mix: window.__stitch.mix }));

async function shoot(name, at) {
  await page.evaluate((s) => window.scrollTo({ top: window.__stitch.top() + s * window.__stitch.unit(), behavior: "instant" }), at);
  await page.waitForTimeout(settle);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const sample = await page.evaluate(() => window.__stitch.sample());
  const file = `${name}.png`;
  await page.screenshot({ path: path.join(out, file) });
  const state = await page.evaluate(() => window.__stitch.state());
  report.shots.push({ name, at, file, drawn: sample, state });
  if (sample < 0.005) problems.push(`${name} is blank (${(sample * 100).toFixed(2)} per cent drawn)`);
}

for (let k = 0; k < keys.length; k++) {
  const num = String(k + 1).padStart(2, "0");
  await shoot(`${num}-${keys[k]}-hold`, k + 0.2);
  if (k + 1 < keys.length) await shoot(`${num}-${keys[k]}-move`, k + 0.7);
}
if (options.points) {
  const mix = shown.split(",");
  const order = ["hello", "from", "studied", "worked", "good", "made", "say", "contact"];
  const k = keys.findIndex((key, i) => i + 1 < keys.length && mix[order.indexOf(key)] !== mix[order.indexOf(keys[i + 1])]);
  if (k < 0) problems.push("--points: this mix has no move between two worlds");
  else for (const raw of [0.1, 0.5, 0.9, 1.0]) await shoot(`dive-${keys[k]}-raw-${raw.toFixed(1)}`, k + 0.4 + 0.6 * raw - (raw === 1 ? 1e-4 : 0));
}
if (options.at && options.at !== true) {
  for (const at of String(options.at).split(",").map(Number).filter(Number.isFinite)) await shoot(`at-${at.toFixed(2)}`, at);
}
await finish(problems.length ? 1 : 0);
