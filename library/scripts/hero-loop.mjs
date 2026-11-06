#!/usr/bin/env node
/*
  Records the front page's moving picture: the sample person Noa's sheet
  folding from hello through where from to studied, then back,
  so it loops without a cut. Writes public/gallery/sheet-fold.webm (VP9,
  30 frames a second) and its poster, sheet-fold.jpg (the hello hold).

    PLAYWRIGHT_CORE=<path to a playwright-core install> FFMPEG=<an ffmpeg with libvpx-vp9> \
      node scripts/hero-loop.mjs --url=http://127.0.0.1:3200/storyfolio [--out=public/gallery] [--move=fold] [--crf=40] [--frames=<file> [--reuse]]

  Point --url at a running build of this library. The page is shot under
  reduced motion, where the story shows the scroll exactly, so each frame
  is the move at that scroll. CHROMIUM names a Chromium to start instead
  of playwright-core's own. Playwright's own ffmpeg build has libvpx-vp9
  and reads only files, so the frames go through one file of JPEGs;
  --frames=<file> keeps it, and --reuse encodes a kept file again without
  shooting.
*/
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")).map(([k, ...v]) => [k, v.join("=") || true]));
if (!args.url) { console.error("--url is required; see the comment at the top of scripts/hero-loop.mjs"); process.exit(2); }
const out = path.resolve(String(args.out ?? "public/gallery"));
const move = String(args.move ?? "fold");
mkdirSync(out, { recursive: true });

const FPS = 30, HOLD = 0.8, TRAVEL = 2.0, FROM = 0, TO = 2; // chapters 0 to 2: hello, where from, studied (worked's timeline runs off an 8:5 frame)
const ease = (t) => t * t * (3 - 2 * t);
/** Scroll positions in chapter units, one a frame: a hold at each chapter, an eased travel to the next. */
const stops = [];
for (let k = FROM; k < TO; k++) {
  for (let f = 0; f < HOLD * FPS; f++) stops.push(k + 0.2);
  for (let f = 0; f < TRAVEL * FPS; f++) stops.push(k + 0.2 + ease(f / (TRAVEL * FPS)));
}
for (let f = 0; f < HOLD * FPS; f++) stops.push(TO + 0.2);

const framesFile = path.resolve(String(args.frames ?? path.join(os.tmpdir(), `hero-loop-${process.pid}.mjpeg`)));
const problems = [];
let frames = [];
if (args.reuse && existsSync(framesFile)) {
  // A kept file holds the forward frames, each JPEG starting with FF D8 and ending with FF D9.
  const all = readFileSync(framesFile);
  for (let at = 0; at < all.length;) {
    const end = all.indexOf(Buffer.from([0xff, 0xd9]), at) + 2;
    frames.push(all.subarray(at, end));
    at = end;
  }
} else {
  const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE || "playwright-core");
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
    args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, reducedMotion: "reduce" })).newPage();
  page.on("pageerror", (e) => problems.push(e.message));
  await page.goto(`${String(args.url).replace(/\/$/, "")}/transitions/whole/sheet/?p=noa&m=${move}`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error, null, { timeout: 60000 });
  await page.addStyleTag({ content: "header { display: none !important } .stitch .band, .stitch .rail { display: none !important }" });
  for (const s of stops) {
    await page.evaluate((at) => window.scrollTo({ top: window.__stitch.top() + at * window.__stitch.unit(), behavior: "instant" }), s);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    frames.push(await page.screenshot({ type: "jpeg", quality: 92 }));
  }
  await browser.close();
  writeFileSync(framesFile, Buffer.concat(frames));
}
writeFileSync(path.join(out, `sheet-${move}.jpg`), frames[0]);

// Forward, then back without repeating either end, so the last frame leads into the first.
const loopFile = `${framesFile}.loop`;
writeFileSync(loopFile, Buffer.concat([...frames, ...frames.slice(1, -1).reverse()]));
const count = frames.length * 2 - 2;
const ffmpeg = spawn(process.env.FFMPEG || "ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", loopFile,
  "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", String(args.crf ?? 40), "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-an",
  path.join(out, `sheet-${move}.webm`),
], { stdio: ["ignore", "inherit", "inherit"] });
const code = await new Promise((r) => ffmpeg.on("close", r));
rmSync(loopFile);
if (!args.frames) rmSync(framesFile);
for (const p of problems) console.error(p);
console.log(`${count} frames (${(count / FPS).toFixed(1)} s) to ${path.join(out, `sheet-${move}.webm`)}, ffmpeg ${code}, ${problems.length} problems`);
process.exit(problems.length || code ? 1 : 0);
