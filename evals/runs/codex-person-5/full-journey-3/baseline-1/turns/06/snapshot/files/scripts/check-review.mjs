// Real-browser check of wording previews and short-screen/keyboard access.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from '../site/node_modules/playwright-core/index.mjs';
import { openingVersions, closingVersions } from '../site/content/wording.ts';
import { site } from '../site/content/site.ts';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = `${root}checks/review`;
await mkdir(out, { recursive: true });
const origin = 'http://127.0.0.1:3014';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3014'], { cwd:`${root}site`, stdio:'ignore' });
const report = { screenshots:[], keyboard:[], wording:[], errors:[] };
let browser;
try {
  let ready=false;
  for(let i=0;i<90;i++){try{if((await fetch(origin)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
  assert(ready,'Production server failed to start');
  browser=await chromium.launch({executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  for(const viewport of [{width:1440,height:600},{width:375,height:500}]) {
    const page=await browser.newPage({viewport,reducedMotion:'reduce'});
    page.on('pageerror',e=>report.errors.push(e.message));
    async function load(path) {
      await page.goto(`${origin}${path}`);
      await page.waitForFunction(()=>window.__stitch?.ready||window.__stitch?.error);
      assert.equal(await page.evaluate(()=>window.__stitch.error??null),null);
    }
    async function screenshot(name) {
      await page.waitForTimeout(200);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Horizontal overflow');
      const file=`${viewport.width}-${name}.png`;
      await page.screenshot({path:`${out}/${file}`});report.screenshots.push(file);
    }
    await load('/');
    assert.equal(site.words.hello,openingVersions[0].text,'Opening A must be applied verbatim');
    assert.equal(site.words.contact,closingVersions[0].text,'Closing A must be applied verbatim');
    assert.equal(await page.locator('.cap.on .words p').innerText(),site.words.hello,'Live opening differs from selected wording');
    await screenshot('selected-opening');
    await page.getByRole('link',{name:'Contact',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.cap.on h2')?.textContent==='Get in touch');
    assert.equal(await page.locator('.cap.on .words p').innerText(),site.words.contact,'Live closing differs from selected wording');
    await screenshot('selected-closing');
    await page.getByRole('link',{name:'Work',exact:true}).focus();
    await page.keyboard.press('Enter');
    const titles=['Data-centre exit','Orders database','The runbook','On-call','ferry','Boring Migrations'];
    for(const title of titles) {
      const button=page.getByRole('button',{name:title,exact:true});
      await button.focus();
      assert(await button.evaluate(el=>el===document.activeElement),`Could not focus ${title}`);
      await page.keyboard.press('Enter');
      const dialog=page.getByRole('dialog',{name:title,exact:true});await dialog.waitFor();
      assert(await dialog.evaluate(d=>d.contains(document.activeElement)),'Dialog does not receive focus');
      for(let i=0;i<3;i++){
        await page.keyboard.press('Tab');
        assert(await dialog.evaluate(d=>d.contains(document.activeElement)||document.activeElement===document.body),'Focus escaped to background');
      }
      const sheet=page.locator('.modal .sheet');
      assert(await sheet.evaluate(el=>el.clientWidth<=innerWidth&&el.clientHeight<=innerHeight),'Dialog exceeds screen');
      if(title==='Data-centre exit'){
        await screenshot('dialog-top');
        await sheet.evaluate(el=>el.scrollTop=el.scrollHeight);await screenshot('dialog-bottom');
      }
      await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
      assert(await button.evaluate(el=>el===document.activeElement),'Focus does not return to project button');
      // Let the native close event and React's unmount cleanup finish before reopening.
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      report.keyboard.push({width:viewport.width,title,enter:true,trap:true,escape:true,focusReturned:true});
    }
    await screenshot('work');
    for(let i=0;i<openingVersions.length;i++){
      const opening=openingVersions[i], closing=closingVersions[i];
      await load(`/preview?opening=${opening.id}&closing=${closing.id}`);
      assert.equal(await page.locator('.cap.on .words p').innerText(),opening.text);
      assert(await page.evaluate(()=>window.__stitch.sample())>0.005,'Opening blank');
      await screenshot(`opening-${opening.id}`);
      await page.getByRole('link',{name:'Contact',exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('.cap.on h2')?.textContent==='Get in touch');
      assert.equal(await page.locator('.cap.on .words p').innerText(),closing.text);
      const band=page.locator('.band');await band.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.equal(await page.getByRole('link',{name:'Email Dawit'}).getAttribute('href'),'mailto:dawit@example.com');
      await screenshot(`closing-${closing.id}`);
      report.wording.push({width:viewport.width,opening:opening.id,closing:closing.id,exact:true});
    }
    await load('/preview?opening=invalid&closing=invalid');
    assert.equal(await page.locator('.cap.on .words p').innerText(),site.words.hello,'Invalid query must preserve selected text');
    await page.close();
  }
  assert.equal(report.errors.length,0,report.errors.join('\n'));
  console.log('Passed: selected A/A verbatim on live site, six preview variants, short screens, 12 keyboard dialog checks.');
} finally {
  await browser?.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
}
