// Checks the requested interactions and offline artefacts against a production build.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const out = resolve("checks/portfolio");
mkdirSync(out, { recursive: true });
const socket = createServer();
await new Promise(ok => socket.listen(0, "127.0.0.1", ok));
const port = socket.address().port;
await new Promise(ok => socket.close(ok));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "ignore" });
let browser;
const report = { assertions: [], errors: [], externalRequests: [] };
try {
  for (let i = 0; ; i++) {
    try { if ((await fetch(base)).ok) break; } catch { /* starting */ }
    if (i > 100) throw Error("Local production server did not start");
    await new Promise(ok => setTimeout(ok, 200));
  }
  browser = await chromium.launch({ ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}), args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce", acceptDownloads: true });
  const page = await context.newPage();
  page.on("pageerror", e => report.errors.push(e.message));
  page.on("request", request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(base)) report.externalRequests.push(request.url()); });
  const ready = async () => { await page.waitForFunction(() => window.__stitch?.ready); await page.waitForTimeout(300); };
  const at = async position => {
    await page.evaluate(value => scrollTo(0, window.__stitch.top() + value * window.__stitch.unit()), position);
    await page.waitForTimeout(450);
  };
  const shot = name => page.screenshot({ path: `${out}/${name}.png` });
  await page.goto(base); await ready();
  assert.equal(await page.evaluate(() => window.__stitch.mix), "map,map,map,map,map,map,map,map");
  await shot("desktop-opening");
  await page.locator('.topbar a[href="#made"]').click();
  await page.waitForFunction(() => window.__stitch.state().from === 5);
  assert.equal(await page.locator(".project-links button").count(), 6);
  const titles = ["Data-centre exit", "Orders database", "Migration runbook", "On-call", "ferry", "Boring Migrations"];
  for (const title of titles) {
    const button = page.locator(".project-links button").filter({ hasText: title });
    await button.focus(); await page.keyboard.press("Enter");
    const modal = page.getByRole("dialog", { name: title, exact: true });
    await modal.waitFor({ state: "visible" });
    assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute("data-close")), true);
    assert.ok((await modal.innerText()).includes("Illustration"));
    if (title === "Boring Migrations") assert.ok(!(await modal.locator(".eyebrow").innerText()).includes("Rotterdam"));
    await page.keyboard.press("Tab");
    assert.ok(await modal.evaluate(el => el.contains(document.activeElement)), "focus escaped modal");
    if (title === "Data-centre exit") await shot("desktop-detail");
    await page.keyboard.press("Escape");
    await modal.waitFor({ state: "detached" });
    assert.equal(await button.evaluate(el => el === document.activeElement), true);
  }
  report.assertions.push("All six project windows open by keyboard, trap focus, close with Escape and restore focus; talk has no invented venue");
  await page.locator('.topbar a[href="#contact"]').click();
  await page.waitForFunction(() => window.__stitch.state().from === 6);
  assert.equal(await page.locator('.cap a[href="mailto:dawit@example.com"]').count(), 1);
  await page.goBack();
  await page.waitForFunction(() => window.__stitch.state().from === 5);
  report.assertions.push("Ordinary chapter links, contact and browser back work");

  for (const [name, width, height] of [["phone",390,844],["small-phone",320,568],["short",1280,640]]) {
    await page.setViewportSize({width,height});
    for (const position of [0, 1.2, 2.2, 3, 3.2, 3.39, 4, 4.2, 4.39, 5, 5.2, 5.39, 6, 6.39]) {
      await at(position); await shot(`${name}-${position}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: horizontal overflow`);
      assert.ok(await page.locator(".cap").evaluate(el => el.getBoundingClientRect().bottom <= innerHeight + 1));
    }
    console.log(`${name}: holds checked`);
    // Trace seams backwards as well as forwards, with a visible live scene.
    for (const position of [5.85,5.7,4.85,4.7,3.85,3.7,2.85,2.7,1.85,1.7,0.85,0.7]) {
      await at(position); await shot(`${name}-reverse-${position}`);
    }
  }
  report.assertions.push("Phone, small phone and short-screen holds plus reverse transitions: no page overflow or caption clipping");
  for (const id of ["1", "2", "3"]) {
    await page.goto(`${base}/preview?words=${id}`); await ready();
    await at(0); await shot(`words-${id}-opening`);
    await at(6); await shot(`words-${id}-close`);
  }
  await page.goto(`${base}/preview?person=noa`); await ready();
  assert.equal(await page.locator("#story-text h1").innerText(), "Dawit Bekele");
  for (const route of ["/plain-story", "/sketch/example"]) assert.equal((await fetch(base + route)).status, 404);
  await page.goto(`${base}/wording`);
  assert.equal(await page.locator(".wording-option").count(), 3);
  await shot("wording-review");
  report.assertions.push("Three whole-beat wording previews and review page render");
  await page.goto(base);await ready();
  await page.setViewportSize({width:390,height:844});
  await at(5.2);
  await page.locator('.topbar a[href="#story-text"]').click();
  await page.locator('.stitch[data-scene="off"]').waitFor();
  assert.equal(await page.evaluate(() => scrollY), 0);
  assert.ok(await page.locator("#made").innerText().then(text => titles.every(title => text.includes(title))));
  await shot("read-text");
  report.assertions.push("Read text exposes complete content and starts at the top");

  await page.goto(`${base}/cv`);
  await page.evaluate(() => { window.print = () => { window.__printed = true; }; });
  await page.getByRole("button", {name:"Print / save as PDF"}).click();
  assert.equal(await page.evaluate(() => window.__printed), true);
  const downloading = page.waitForEvent("download");
  await page.getByRole("link", {name:"Download HTML CV"}).click();
  const download = await downloading;
  assert.equal(download.suggestedFilename(), "dawit-bekele-cv.html");
  await download.saveAs(`${out}/dawit-bekele-cv.html`);
  const response = await fetch(`${base}/downloads/dawit-bekele-cv.html`);
  assert.match(response.headers.get("content-disposition"), /attachment/);
  const html = await response.text();
  assert.ok(!/<script|https?:\/\/|<link[^>]+stylesheet/i.test(html));
  assert.ok(titles.every(title => html.includes(title)));
  await page.goto(`file://${out}/dawit-bekele-cv.html`);
  await shot("cv-offline");
  assert.ok((await page.locator("body").innerText()).includes("99.98%"));
  await page.emulateMedia({media:"print"});
  await page.pdf({path:`${out}/cv-print.pdf`,format:"A4",printBackground:true});
  await shot("cv-print");
  report.assertions.push("CV print action, real HTML attachment, complete offline CV with no external styles/scripts, print PDF captured");
  await page.emulateMedia({media:"screen"});
  const missing = await page.goto(`${base}/an-address-that-does-not-exist`);
  assert.equal(missing.status(), 404);
  assert.equal(await page.locator('.missing-page a[href="/cv"]').count(), 1);
  await shot("missing-page");
  await page.goto(base);await ready();
  assert.equal(await page.locator('meta[property="og:image"]').count(), 1);
  assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute("content"), "summary_large_image");
  for (const path of ["/opengraph-image.png", "/icon.svg"]) assert.equal((await fetch(base+path)).status, 200);
  report.assertions.push("True 404 with useful links; share image, Twitter card and SVG icon available locally");
  await page.evaluate(() => { const canvas = document.querySelector("canvas.gl"); const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl"); gl.getExtension("WEBGL_lose_context").loseContext(); });
  await page.locator('.stitch[data-scene="off"]').waitFor();
  assert.ok(await page.locator("#story-text").isVisible());
  report.assertions.push("Context loss exposes readable HTML");
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.externalRequests, []);
  console.log(`Passed ${report.assertions.length} interaction groups. Screenshots: ${out}`);
} finally {
  writeFileSync(`${out}/report.json`, JSON.stringify(report,null,2));
  await browser?.close();
  server.kill("SIGTERM");
}
