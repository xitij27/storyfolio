const { chromium } = await import("/var/tmp/p5-fixed-site/node_modules/playwright-core/index.mjs");
const b = await chromium.launch({ args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const page = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = []; page.on("pageerror", (e) => errs.push(e.message));
await page.goto("http://127.0.0.1:3171/#made"); await page.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 }); await page.waitForTimeout(800);
const names = await page.locator(".band .cap.on .links button").allInnerTexts();
for (const [i, n] of names.entries()) {
  await page.locator(".band .cap.on .links button").nth(i).click();
  for (const ms of [600, 1600, 3200]) { await page.waitForTimeout(ms === 600 ? 600 : ms - (ms === 1600 ? 600 : 1600)); await page.locator("dialog.modal .pic").screenshot({ path: `/var/tmp/p5-shots/play-${i}-${ms}.png` }); }
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
}
const still = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await still.goto("http://127.0.0.1:3171/#made"); await still.waitForFunction(() => window.__stitch?.ready, null, { timeout: 60000 }); await still.waitForTimeout(800);
await still.locator(".band .cap.on .links button").first().click(); await still.waitForTimeout(400);
const a = await still.locator("dialog.modal .pic").screenshot(); await still.waitForTimeout(1200); const c = await still.locator("dialog.modal .pic").screenshot();
console.log(JSON.stringify({ names, errs, reducedMotionStill: a.equals(c) }));
await b.close();
