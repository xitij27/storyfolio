// Scrolls each transition to set points through its seam and saves what the reader sees.
import { chromium } from "playwright-core";

const [base, out, ...ways] = process.argv.slice(2);
const AT = [0, 0.32, 0.4, 0.46, 0.52, 0.58, 0.66, 1];
const width = Number(process.env.W ?? 960);
const height = Number(process.env.H ?? 600);
const browser = await chromium.launch({
  executablePath: "/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
for (const way of ways) {
  const page = await browser.newPage({ viewport: { width, height } });
  const problems = [];
  page.on("pageerror", (e) => problems.push(e.message));
  page.on("console", (m) => m.type() === "error" && problems.push(m.text()));
  await page.goto(`${base}transitions/${way}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const p of AT) {
    await page.evaluate((p) => {
      const section = [...document.querySelectorAll("section")].find((s) => s.style.height.includes("dvh"));
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + p * (section.offsetHeight - window.innerHeight), behavior: "instant" });
    }, p);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${out}/${way}-${width}-${String(Math.round(p * 100)).padStart(3, "0")}.png` });
  }
  console.log(`${problems.length ? "FAIL" : "ok  "} ${way}${problems.length ? "\n  " + problems.join("\n  ") : ""}`);
  await page.close();
}
await browser.close();
