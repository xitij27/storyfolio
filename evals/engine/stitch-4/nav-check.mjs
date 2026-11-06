import { createRequire } from "node:module";
const require = createRequire("/var/tmp/stitch-4-site/package.json");
const { chromium } = require("playwright-core");
const base = "http://127.0.0.1:3150";
const browser = await chromium.launch({ args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const out = {};
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport: vp, reducedMotion: "reduce" });
  const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  await page.goto(`${base}/`); await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 });
  const near = () => page.evaluate(() => document.querySelector(".stitch .band .cap.on h2")?.textContent);
  await page.click(".topbar >> text=Work"); await page.waitForTimeout(1500);
  const afterWork = await near(), hash = await page.evaluate(() => location.hash);
  await page.click(".band .cap.on .links button >> nth=0");
  const open = await page.evaluate(() => document.querySelector("dialog.modal")?.open);
  await page.screenshot({ path: `/var/tmp/stitch-4-shots/dialog-${name}.png` });
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  const closed = await page.evaluate(() => !document.querySelector("dialog.modal"));
  const focus = await page.evaluate(() => document.activeElement?.textContent);
  await page.goBack(); await page.waitForTimeout(1500);
  const afterBack = await near();
  const p2 = await browser.newPage({ viewport: vp, reducedMotion: "reduce" });
  await p2.goto(`${base}/#contact`); await p2.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 }); await p2.waitForTimeout(800);
  const deep = await p2.evaluate(() => document.querySelector(".stitch .band .cap.on h2")?.textContent);
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  out[name] = { afterWork, hash, open, closed, focus, afterBack, deep, sidewaysScroll: scroll, errs };
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
