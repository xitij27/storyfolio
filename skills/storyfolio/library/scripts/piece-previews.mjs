#!/usr/bin/env node
/*
  Records every piece working, for the cards on the pieces index: a few
  seconds of each piece's demo, played or scrolled or clicked as a reader
  would, written as public/pieces/<id>.webm (VP9) and a still poster,
  public/pieces/<id>.jpg.

    PLAYWRIGHT_CORE=<path to a playwright-core install> FFMPEG=<an ffmpeg with libvpx-vp9> \
      node scripts/piece-previews.mjs --url=http://127.0.0.1:3200/storyfolio [--out=public/pieces] [--only=hero,skills] [--keep=<folder>]

  Point --url at a running build of this library. The piece runs in real
  time while Chrome's screencast sends a picture each time the screen
  changes; the pictures are then laid out at 24 a second by when they were
  shown, so each recording plays at the speed a reader sees (a 3D piece in
  a software renderer gets fewer distinct frames, never a faster one).
  Playwright's own ffmpeg build has libvpx-vp9 and reads only files, so
  the frames go through one file of JPEGs in the system's temporary folder.
  CHROMIUM names a Chromium to start instead of playwright-core's own.
*/
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, ...v]) => [k, v.join("=") || true]));
if (!args.url) { console.error("--url is required; see the comment at the top of scripts/piece-previews.mjs"); process.exit(2); }
const base = String(args.url).replace(/\/$/, "");
const out = path.resolve(String(args.out ?? "public/pieces"));
mkdirSync(out, { recursive: true });

const W = 1200, H = 750, FPS = 24, STEP = 1000 / FPS;

/** Clicks the first element matching a role and name inside the demo, without waiting for it to sit still. */
const press = (role, name) => async (page) => page.locator("#demo").getByRole(role, { name }).first().click({ force: true, timeout: 3000 }).catch(() => {});
const key = (k) => async (page) => page.keyboard.press(k);
/** Clicks the demo at a fraction of the screen. */
const tap = (fx, fy) => async (page) => page.mouse.click(W * fx, H * fy);

/*
  What each piece does while it is recorded: `seconds` long, `scroll` to
  move through a pinned section, `at` for actions at a frame, `pointer` to
  sweep the pointer over an element, `early` to start recording as soon as
  that element exists (for a piece that plays once), and `poster` the frame
  kept as the still.
*/
const PLAN = {
  hero: { seconds: 4, poster: 60 },
  "rotating-text": { seconds: 4, poster: 30 },
  starfield: { seconds: 4, poster: 40 },
  "pixel-portrait": { seconds: 4, pointer: "#demo canvas", poster: 50 },
  "typed-terminal": { seconds: 5, early: "#demo pre", poster: 119 },
  about: { seconds: 4, poster: 48 },
  "dot-globe": { seconds: 4, poster: 48 },
  route: { seconds: 5, scroll: true, poster: 70 },
  spectrogram: { seconds: 5, scroll: true, poster: 60 },
  "data-points": { seconds: 5, scroll: true, poster: 80 },
  network: { seconds: 5, scroll: true, poster: 70 },
  experience: { seconds: 4, at: { 16: press("button", /Show more/), 66: press("button", /Show less/) }, poster: 40 },
  layers: { seconds: 5, scroll: true, poster: 80 },
  stack: { seconds: 5, scroll: true, poster: 80 },
  skills: { seconds: 4, at: { 18: press("button", /Python/), 60: press("button", /React/) }, poster: 40 },
  projects: { seconds: 4, at: { 20: press("button", /Data Science/), 62: press("button", /^All/) }, poster: 10 },
  "expanding-cards": { seconds: 4, at: { 14: press("button", /Maze-solving robot/), 76: key("Escape") }, poster: 50 },
  "gooey-search": { seconds: 4, at: { 12: press("button", /search/i), 30: key("r"), 36: key("o"), 42: key("b") }, poster: 70 },
  figures: { seconds: 4, poster: 48 },
  "project-window": { seconds: 4, at: { 14: press("button", /maze-solving robot/i), 76: key("Escape") }, poster: 50 },
  testimonials: { seconds: 4, poster: 48 },
  contact: { seconds: 4, at: { 20: press("button", /Copy email/) }, poster: 10 },
  "ripple-grid": { seconds: 4, at: { 10: tap(0.32, 0.4), 52: tap(0.7, 0.62) }, poster: 24 },
  "chapter-rail": { seconds: 5, scroll: true, poster: 60 },
  "look-switch": { seconds: 4, at: { 18: press("link", /Paper/), 60: press("link", /Blueprint/) }, poster: 40 },
  slider: { seconds: 4, at: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [16 + i * 4, async (page) => {
    await page.locator("#demo input[type=range]").first().focus().catch(() => {});
    await page.keyboard.press("ArrowRight");
  }])), poster: 60 },
};

const only = args.only ? String(args.only).split(",") : Object.keys(PLAN);
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE || "playwright-core");
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const problems = [];

for (const id of only) {
  const plan = PLAN[id];
  if (!plan) { problems.push(`${id}: no plan`); continue; }
  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  // The contact piece copies its address; without the permission it falls back to opening mail.
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: new URL(base).origin });
  const page = await context.newPage();
  page.on("pageerror", (e) => problems.push(`${id}: ${e.message}`));
  await page.goto(`${base}/p/${id}/`, { waitUntil: "load" });
  // Hide what follows the demo, so a short demo stands on the page's ground alone.
  // Room below the demo, so even a short one can be scrolled to the top of the screen.
  await page.addStyleTag({ content: "#demo ~ * { visibility: hidden !important } #demo { border: 0 !important } html { scroll-behavior: auto !important } body { padding-bottom: 100vh }" });
  // A piece that plays once (the terminal types) is caught from the start; the rest load and settle first.
  if (plan.early) await page.locator(plan.early).first().waitFor({ state: "attached", timeout: 15000 }).catch(() => {});
  else await page.waitForTimeout(1800);
  // Measured only now: until the demo has loaded, the page is too short to scroll to it.
  const top = await page.evaluate(() => document.getElementById("demo").getBoundingClientRect().top + scrollY);
  const range = await page.evaluate(() => Math.max(0, document.getElementById("demo").offsetHeight - innerHeight));
  await page.evaluate((y) => scrollTo(0, y), top);
  if (!plan.early) await page.waitForTimeout(400);
  const box = plan.pointer ? await page.locator(plan.pointer).first().boundingBox().catch(() => null) : null;

  const cdp = await context.newCDPSession(page);
  const shots = [];
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    shots.push({ at: metadata.timestamp * 1000, jpeg: Buffer.from(data, "base64") });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  // Pictures at 800x500, the size a card shows them at on a sharp screen: the still is one of them.
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 80, maxWidth: 800, maxHeight: 500, everyNthFrame: 1 });
  const n = Math.round(plan.seconds * FPS);
  const t0 = Date.now(), done = new Set();
  for (let ms = 0; ms < n * STEP; ms = Date.now() - t0) {
    const f = Math.floor(ms / STEP), t = ms / (n * STEP);
    if (plan.scroll) await page.evaluate((y) => scrollTo(0, y), top + range * Math.min(1, t * 1.05));
    if (box) {
      const a = t * Math.PI * 2;
      await page.mouse.move(box.x + box.width * (0.5 + 0.38 * Math.cos(a)), box.y + box.height * (0.5 + 0.38 * Math.sin(a * 2)));
    }
    for (const [k, act] of Object.entries(plan.at ?? {})) {
      if (f >= Number(k) && !done.has(k)) { done.add(k); await act(page); }
    }
    await new Promise((r) => setTimeout(r, 15));
  }
  await cdp.send("Page.stopScreencast");
  if (!shots.length) { problems.push(`${id}: no frames`); await context.close(); continue; }
  // One frame every 1/24 s: the last picture shown by then.
  const start = Math.max(shots[0].at, t0 - 50);
  const frames = [];
  for (let k = 0, j = 0; k < n; k++) {
    while (j + 1 < shots.length && shots[j + 1].at <= start + k * STEP) j++;
    frames.push(shots[j].jpeg);
  }
  await context.close();
  writeFileSync(path.join(out, `${id}.jpg`), frames[Math.min(plan.poster ?? 0, frames.length - 1)]);
  if (args.keep) {
    // Every frame as a still, to look at: --keep=<folder>.
    mkdirSync(path.join(String(args.keep), id), { recursive: true });
    frames.forEach((b, i) => writeFileSync(path.join(String(args.keep), id, `${String(i).padStart(3, "0")}.jpg`), b));
  }

  const tmp = path.join(os.tmpdir(), `piece-${id}-${process.pid}.mjpeg`);
  writeFileSync(tmp, Buffer.concat(frames));
  const ffmpeg = spawn(process.env.FFMPEG || "ffmpeg", [
    "-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", tmp,
    "-vf", "scale=800:500", "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", String(args.crf ?? 42),
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "3", "-an", path.join(out, `${id}.webm`),
  ], { stdio: ["ignore", "inherit", "inherit"] });
  const code = await new Promise((r) => ffmpeg.on("close", r));
  rmSync(tmp);
  if (code) problems.push(`${id}: ffmpeg ${code}`);
  console.log(`${id}: ${frames.length} frames`);
}
await browser.close();
for (const p of problems) console.error(p);
console.log(`${only.length} pieces to ${out}, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
