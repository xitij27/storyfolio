// Additional local diagnostics for this five-beat prototype, not real-person approval.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { beatRestSamples } from './check-lib.mjs';
const out = 'checks/prototype-review';
await mkdir(out, { recursive: true });
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3100'], {stdio:'ignore'});
for (let i=0;i<80;i++) {
 try { if ((await fetch('http://127.0.0.1:3100')).ok) break; } catch {}
 await new Promise(resolve => setTimeout(resolve,250));
}
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const report = { problems: [], captures: [], keyboard: {}, content: [] };
const expected = ['question','scheduling','bench','evidence','scope'];
try {
 const page = await browser.newPage({viewport:{width:1280,height:480}});
 await page.goto('http://127.0.0.1:3100');
 await page.waitForSelector('canvas');
 await page.waitForTimeout(1500);
 await page.keyboard.press('Tab');
 report.keyboard.skip = await page.locator('#story-skip').evaluate(el => ({ focused: el === document.activeElement, text: el.textContent, href: el.getAttribute('href'), top: el.getBoundingClientRect().top }));
 if (!report.keyboard.skip.focused || report.keyboard.skip.top < 0) report.problems.push('Skip link not visibly keyboard-focused');
 await page.screenshot({path:`${out}/skip-focused.png`});
 await page.keyboard.press('Enter');
 if (new URL(page.url()).hash !== '#chapter-scope') report.problems.push('Skip link did not navigate to answer');
 await page.locator('.story-rail a[href="#chapter-question"]').click();
 report.keyboard.railPointer = new URL(page.url()).hash === '#chapter-question';
 await page.locator('.story-rail a[href="#chapter-bench"]').focus();
 await page.keyboard.press('Enter');
 report.keyboard.railKeyboard = new URL(page.url()).hash === '#chapter-bench';
 if (!report.keyboard.railPointer || !report.keyboard.railKeyboard) report.problems.push('Rail navigation failed');
 const boxes = await page.locator('[data-beat]').evaluateAll(els => els.map(el => ({top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height})));
 const samples = beatRestSamples(boxes,480);
 for(let i=0;i<samples.length;i++) {
  await page.evaluate(y => scrollTo(0,y),samples[i][0].top);
  await page.waitForTimeout(1200);
  const file = `${out}/short480-${expected[i]}.png`;
  await page.screenshot({path:file}); report.captures.push(file);
 }
 await page.close();
 for(const mode of ['no-js','no-webgl']) {
  const context = await browser.newContext({javaScriptEnabled:mode !== 'no-js'});
  if(mode === 'no-webgl') await context.addInitScript(() => { const original=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args) {return /webgl/.test(type) ? null : original.call(this,type,...args);}; });
  const p=await context.newPage(); await p.goto('http://127.0.0.1:3100');
  const observed=await p.locator('[data-beat]').evaluateAll(els => els.map(el=>({id:el.dataset.beat,text:el.textContent,headings:el.querySelectorAll('h1,h2').length})));
  if(observed.map(b=>b.id).join() !== expected.join() || observed.some(b=>b.headings !== 1)) report.problems.push(`${mode}: missing beat or heading`);
  const all = observed.map(b=>b.text).join(' ');
  for(const phrase of ['A colleague','assumed reporting interval','72 hours','does not validate','none went to customers','qualification is unfinished','illustrative']) if(!all.includes(phrase)) report.problems.push(`${mode}: missing ${phrase}`);
  report.content.push({mode,beats:observed.map(({id,headings})=>({id,headings})),h1:await p.locator('h1').count(),h2:await p.locator('h2').count()});
  await context.close();
 }
} finally { await browser.close(); server.kill(); }
await writeFile(`${out}/report.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.problems.length) process.exitCode=1;
