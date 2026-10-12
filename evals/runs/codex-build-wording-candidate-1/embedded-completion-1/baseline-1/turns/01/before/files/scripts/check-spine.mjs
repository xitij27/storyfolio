// Stop-4 supplemental checks. Use a freshly built app after npm run check.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const output = process.argv[2] ?? 'checks/spine-supplemental';
await mkdir(output, { recursive: true });
const socket = createServer();
await new Promise(ok => socket.listen(0, '127.0.0.1', ok));
const port = socket.address().port;
await new Promise(ok => socket.close(ok));
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, stdio: 'ignore' });
const base = `http://127.0.0.1:${port}`;
let browser;
const results = [];
try {
  for (let i=0; i<100; i++) {
    try { if ((await fetch(base)).ok) break; } catch {}
    await new Promise(ok => setTimeout(ok, 100));
  }
  const sceneChunks = [];
  for (const file of await readdir('.next/static/chunks')) {
    if (file.endsWith('.js') && /story-face-v1|WebGLRenderer/.test(await readFile(`.next/static/chunks/${file}`, 'utf8'))) sceneChunks.push(file);
  }
  assert.ok(sceneChunks.length, 'identify actual scene chunk');
  browser = await chromium.launch({ args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const mode of ['phone', 'reduced', 'desktop']) {
    const context = await browser.newContext({ viewport: mode==='phone' ? { width:390, height:844 } : { width:1440, height:900 }, reducedMotion: mode==='reduced' ? 'reduce' : 'no-preference' });
    const page = await context.newPage(); const requests=[];
    page.on('request', request => requests.push(request.url()));
    await page.goto(`${base}/`, { waitUntil:'networkidle' });
    await page.screenshot({ path:`${output}/${mode}-initial.png` });
    await page.goto(`${base}/#transition`, { waitUntil:'networkidle' }); await page.waitForTimeout(2500);
    const canvas = await page.locator('canvas').count();
    const requestedScene = requests.filter(url => sceneChunks.some(chunk => url.endsWith('/'+chunk)));
    if (mode==='desktop') {
      assert.equal(canvas,1); assert.ok(requestedScene.length);
      assert.equal(await page.locator('.story-rail a[aria-current]').getAttribute('href'), '#transition');
      await page.screenshot({ path:`${output}/desktop-deep-transition.png` });
      await page.locator('.story-rail a[href="#review"]').click(); await page.waitForTimeout(2500);
      assert.equal(await page.locator('.story-rail a[aria-current]').getAttribute('href'),'#review');
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement?.tagName === 'A' || document.activeElement?.tagName === 'BUTTON'));
    } else { assert.equal(canvas,0); assert.deepEqual(requestedScene,[]); }
    assert.equal(await page.locator('h1').count(),1);
    for (const path of ['/assets/power-states.svg','/assets/bring-up-fixture.svg','/assets/share-card.svg','/icon.svg','/ada-mensah-cv.html']) assert.equal((await context.request.get(base+path)).status(),200);
    assert.equal(await page.locator('a[download]').count(),3);
    assert.equal(await page.locator('a[href="mailto:ada@example.com"]').count(),3);
    assert.equal((await context.request.get(`${base}/missing-address`)).status(),404);
    await page.goto(`${base}/missing-address`); assert.equal(await page.getByRole('link',{name:'Home',exact:true}).getAttribute('href'),'/');
    assert.equal(await page.getByRole('link',{name:'Email Ada',exact:true}).getAttribute('href'),'mailto:ada@example.com');
    results.push({mode,canvas,requestedScene,passed:true}); await context.close();
  }
  await writeFile(`${output}/report.json`, JSON.stringify({ sceneChunks, results, limits:'Automated Chromium checks; no real phone, mail delivery, publication or social-platform validation.' },null,2)+'\n');
  console.log(JSON.stringify(results));
} finally { await browser?.close(); server.kill('SIGTERM'); }
