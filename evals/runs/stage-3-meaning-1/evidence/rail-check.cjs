const { chromium } = require(process.argv[2] + "/node_modules/playwright-core");
const css = `.story-rail { right: auto !important; left: 1.25rem; top: 1rem !important; transform: none !important; }
.story-rail ol { display: flex; }
.story-rail a span:first-child { opacity: 1 !important; display: none; }
.story-rail a:hover span:first-child, .story-rail a:focus-visible span:first-child, .story-rail a[aria-current] span:first-child { display: inline; }`;
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  for (const [name, w, h] of [["wide", 1440, 900], ["short", 1280, 600]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
    await p.addStyleTag({ content: css });
    for (const frac of [0.25, 0.6]) {
      await p.evaluate(f => window.scrollTo(0, document.body.scrollHeight * f), frac);
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${process.argv[3]}/rail-${name}-${frac}.png` });
    }
  }
  await b.close();
})();
