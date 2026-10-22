// Root's captions-hidden check of the finished site: every settled beat at 1440x900 with the page text hidden, then one contact sheet.
const { chromium } = require(process.argv[2] + "/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  const beats = await p.$$eval("[data-beat]", els => els.map(e => e.getAttribute("data-beat")));
  await p.addStyleTag({ content: "main *:not(canvas) { color: transparent !important; border-color: transparent !important; background: transparent !important; } header, nav, .story-caption { visibility: hidden !important; }" });
  for (const [i, id] of beats.entries()) {
    await p.evaluate(id => { const el = document.querySelector(`[data-beat="${id}"]`); const r = el.getBoundingClientRect(); window.scrollTo(0, scrollY + r.top + r.height * 0.55 - innerHeight / 2); }, id);
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${process.argv[3]}/${String(i + 1).padStart(2, "0")}-${id}.png` });
  }
  await b.close();
})();
