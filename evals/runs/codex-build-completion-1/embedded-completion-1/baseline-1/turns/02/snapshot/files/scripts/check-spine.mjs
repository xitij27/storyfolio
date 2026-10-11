// Seven-beat finish supplemental checks. Use a freshly built app after npm run check.
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
const core = (await readFile('docs/story/confirmations.md', 'utf8')).split('\n').filter(line => /^\d+\. /.test(line)).map(line => line.replace(/^\d+\. /, ''));
assert.equal(core.length, 11);
const chapterIds = ['scope', 'responsibilities', 'state', 'transition', 'observation', 'review'];
const beatIds = ['scope.opening', 'responsibilities.split', 'state.table', 'transition.diagram', 'observation.fixture', 'observation.evidence', 'review.close'];
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
  for (const mode of ['phone', 'reduced', 'desktop', 'no-js', 'no-webgl']) {
    const context = await browser.newContext({ viewport: mode==='phone' ? { width:390, height:844 } : { width:1440, height:900 }, javaScriptEnabled: mode !== 'no-js', reducedMotion: mode==='reduced' ? 'reduce' : 'no-preference' });
    if (mode === 'no-webgl') await context.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(kind, ...args) {
        if (/webgl/i.test(kind)) return null;
        return original.call(this, kind, ...args);
      };
    });
    const page = await context.newPage(); const requests=[];
    page.on('request', request => requests.push(request.url()));
    await page.goto(`${base}/`, { waitUntil:'networkidle' });
    await page.screenshot({ path:`${output}/${mode}-initial.png` });
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.title(), 'Ada Mensah — Firmware and the bench');
    for (const sentence of [
      'On Mosslink, an environmental sensor, my work spans firmware, power-state scheduling and the bring-up fixture.',
      'Read the firmware contribution alongside the bench evidence and its limits.',
    ]) assert.equal(await page.locator('p').filter({ hasText: sentence }).count(), 1, `selected copy: ${sentence}`);
    const keyboardTargets = new Set([
      '#scope', '#responsibilities', '#state', '#transition', '#observation', '#review',
      'mailto:ada@example.com', '/ada-mensah-cv.html', '/assets/power-states.svg', '/assets/bring-up-fixture.svg',
    ]);
    for (let tabs = 0; tabs < 48 && keyboardTargets.size; tabs++) {
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const element = document.activeElement;
        return { href: element?.getAttribute('href'), outline: element ? getComputedStyle(element).outlineStyle : 'none' };
      });
      if (tabs === 0) await page.screenshot({ path:`${output}/${mode}-keyboard-focus.png` });
      if (keyboardTargets.has(focus.href)) {
        assert.notEqual(focus.outline, 'none', `visible keyboard focus for ${focus.href}`);
        keyboardTargets.delete(focus.href);
      }
    }
    assert.deepEqual([...keyboardTargets], [], 'all chapter, diagram and contact links reachable by Tab');
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
    } else {
      assert.equal(canvas,0);
      if (mode !== 'no-webgl') assert.deepEqual(requestedScene,[]);
    }
    assert.deepEqual(await page.locator('[data-beat]').evaluateAll(nodes => nodes.map(node => node.dataset.beat)), beatIds);
    assert.deepEqual(await page.locator('.chapter-nav a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), chapterIds.map(id => '#'+id));
    for (const sentence of core) assert.ok(await page.getByText(sentence, { exact: true }).count(), `missing approved sentence: ${sentence}`);
    const headingIds = await page.locator('h1,h2,h3').evaluateAll(nodes => nodes.map(node => node.id));
    assert.equal(new Set(headingIds).size, 7);
    for (const chapter of chapterIds) {
      await page.goto(`${base}/#${chapter}`, { waitUntil:'networkidle' });
      await page.waitForTimeout(mode === 'desktop' ? 1500 : 100);
      if (mode === 'desktop') assert.equal(await page.locator('.story-rail a[aria-current]').getAttribute('href'), '#'+chapter);
    }
    await page.goto(`${base}/#observation.evidence`, { waitUntil:'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path:`${output}/${mode}-evidence.png` });
    assert.ok(await page.locator('[data-beat="observation.evidence"]').getByText(core[6], { exact: true }).isVisible());
    if (mode === 'desktop') assert.equal(await page.locator('.story-rail a[aria-current]').getAttribute('href'), '#observation');
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
