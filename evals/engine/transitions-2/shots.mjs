// Serves the examples as the companion does (/ and /files/...), then scrolls
// one example to set points and saves what a reader sees.
// node shots.mjs <examplesDir> <landJson> <outDir> <example/person> [w] [h] [points...]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const [dir, landFile, out, which, W = "1440", H = "900", ...pts] = process.argv.slice(2);
const types = { ".js": "application/javascript", ".json": "application/json", ".html": "text/html" };
const server = http.createServer((req, res) => {
  const p = new URL(req.url, "http://x").pathname;
  let file = p === "/" ? path.join(dir, "index.html") : p.startsWith("/files/") ? path.join(dir, path.basename(p)) : null;
  if (p === "/files/land.json") file = landFile;
  if (!file || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "text/plain" });
  res.end(fs.readFileSync(file));
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const port = server.address().port;

const browser = await chromium.launch({
  executablePath: `${process.env.HOME}/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await browser.newContext({ viewport: { width: +W, height: +H }, reducedMotion: "reduce", deviceScaleFactor: 1 });
const page = await ctx.newPage();
const problems = [];
page.on("pageerror", (e) => problems.push(e.message));
page.on("console", (m) => m.type() === "error" && problems.push(m.text()));
await page.goto(`http://127.0.0.1:${port}/#${which}`, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("loading")?.hidden !== false, null, { timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1500);
const points = pts.length ? pts.map(Number) : [0, 0.25, 0.75, 1.25, 1.75, 2.25, 2.75, 3.25, 3.75, 4.25, 4.75, 5.25, 5.75, 6.25, 6.75, 7.25];
fs.mkdirSync(out, { recursive: true });
const tag = which.replace("/", "-");
for (const s of points) {
  await page.evaluate((s) => window.scrollTo(0, s * Math.max(window.innerHeight * 1.1, 600)), s);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}/${tag}-${W}-${String(Math.round(s * 100)).padStart(3, "0")}.png` });
}
console.log(problems.length ? "PROBLEMS\n  " + problems.join("\n  ") : "ok, no page errors");
await browser.close();
server.close();
