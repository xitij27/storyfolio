const { chromium } = require(process.argv[2] + "/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:3010/", { waitUntil: "networkidle" });
  const max = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (const f of [0.2, 0.3, 0.42, 0.55]) {
    await p.evaluate(y => scrollTo(0, y), Math.round(max * f));
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `${process.argv[3]}/travel-${f}.png`, clip: { x: 600, y: 600, width: 840, height: 300 } });
  }
  await b.close();
})();
