// Root's captions-hidden check: each settled beat at 1440x900 with the caption text hidden.
const { chromium } = require(process.argv[2] + "/node_modules/playwright-core");
const beats = ["setup.scope", "command.documents", "command.states", "observe.bringup", "observe.radio", "record.samples", "record.endurance", "record.emissions", "handover.answer"];
(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".story-caption { visibility: hidden !important; }" });
  for (const [i, id] of beats.entries()) {
    await p.evaluate(id => { const el = document.getElementById(id); window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.55 - innerHeight / 2); }, id);
    await p.waitForTimeout(3000);
    await p.screenshot({ path: `${process.argv[3]}/${i + 1}-${id}.png` });
  }
  await b.close();
})();
