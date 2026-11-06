// Local visual review of the same complete story in each supplied look.
import { spawn } from 'node:child_process';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '../site/node_modules/playwright-core/index.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = `${root}checks/looks`;
await mkdir(output, { recursive: true });
const port = 3012;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: `${root}site`, stdio: 'ignore' });
const report = { images: [], reused: [], errors: [], utilities: {} };
async function capture(page, name) {
  if (process.argv.includes('--resume')) {
    try { await access(`${output}/${name}`); report.reused.push(name); return; } catch {}
  }
  await page.screenshot({ path: `${output}/${name}` });
}
let browser;
try {
  let ready = false;
  for (let i = 0; i < 90; i++) {
    try { if ((await fetch(origin)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) throw new Error('Local production server did not start');
  browser = await chromium.launch({ executablePath: '/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const size = viewport.width === 390 ? 'phone' : 'desktop';
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('request', request => { if (!request.url().startsWith(origin) && /^https?:/.test(request.url())) report.errors.push(`External request: ${request.url()}`); });
    for (const look of ['night', 'daylight', 'blueprint']) {
      await page.goto(`${origin}/preview?look=${look}&move=swing`);
      await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error);
      if (await page.evaluate(() => window.__stitch.error)) throw new Error('Story failed');
      const keys = await page.evaluate(() => window.__stitch.keys);
      for (let i = 0; i < keys.length; i++) {
        await page.evaluate(at => window.scrollTo({ top: window.__stitch.top() + at * window.__stitch.unit(), behavior: 'instant' }), i + 0.2);
        await page.waitForTimeout(200);
        const name = `${look}-${size}-${String(i + 1).padStart(2, '0')}-${keys[i]}.png`;
        await capture(page, name);
        report.images.push(name);
      }
      console.log(`Captured all seven chapters: ${look}, ${size}`);
    }
    if (size === 'desktop') {
      for (const move of ['swing', 'fold', 'slide']) {
        await page.goto(`${origin}/preview?look=night&move=${move}`);
        await page.waitForFunction(() => window.__stitch?.ready);
        for (const [direction, values] of [['forward', [0.45, 0.7, 0.95]], ['backward', [0.95, 0.7, 0.45]]]) {
          for (const at of values) {
            await page.evaluate(at => window.scrollTo({ top: window.__stitch.top() + at * window.__stitch.unit(), behavior: 'instant' }), at);
            await page.waitForTimeout(200);
            const name = `move-${move}-${direction}-${at}.png`;
            await capture(page, name);
            report.images.push(name);
          }
        }
      }
      await page.goto(origin);
      report.utilities.title = await page.title();
      for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]', 'link[rel="icon"]']) {
        const node = page.locator(selector).first();
        const url = await node.getAttribute(selector.startsWith('link') ? 'href' : 'content');
        // Metadata uses the user's local :3000 origin; this fixture uses a free :3012 server.
        const asset = new URL(url, origin);
        const response = await fetch(new URL(asset.pathname + asset.search, origin));
        if (!response.ok) throw new Error(`Missing metadata asset: ${url}`);
        report.utilities[selector] = { url, status: response.status, type: response.headers.get('content-type') };
      }
    }
    const response = await page.goto(`${origin}/a-page-that-does-not-exist`);
    if (response.status() !== 404) throw new Error('Missing page must answer 404');
    await page.getByRole('heading', { name: 'This page isn’t here.' }).waitFor();
    if (!(await page.title()).includes('Dawit Bekele')) throw new Error('Missing-page title omits name');
    for (const title of ['Back to the story', 'Work', 'Contact']) await page.getByRole('link', { name: title, exact: true }).waitFor();
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('404 overflows horizontally');
    await page.screenshot({ path: `${output}/404-${size}.png` });
    report.utilities[`404-${size}`] = { status: response.status(), title: await page.title() };
    await page.close();
  }
} finally {
  await browser?.close();
  server.kill();
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
}
if (report.errors.length) throw new Error(report.errors.join('\n'));
console.log(`Passed ${report.images.length} look/movement captures; share assets, icon and 404 verified.`);
