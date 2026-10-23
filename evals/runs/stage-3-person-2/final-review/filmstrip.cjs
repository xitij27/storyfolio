// Root's transition check: 48 evenly spaced frames down the finished page at 1440x900, page text hidden, as one sheet.
const { chromium } = require(process.argv[2] + "/node_modules/playwright-core");
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: "main *:not(canvas) { color: transparent !important; border-color: transparent !important; background: transparent !important; } header, nav { visibility: hidden !important; }" });
  const max = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let i = 0; i < 48; i++) {
    await p.evaluate(y => scrollTo(0, y), Math.round(max * i / 47));
    await p.waitForTimeout(1800);
    await p.screenshot({ path: `${process.argv[3]}/frame-${String(i).padStart(2, "0")}.png` });
  }
  await b.close();
})();
