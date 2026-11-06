// Verify the printable page and downloaded file carry exactly the same CV.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from '../site/node_modules/playwright-core/index.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = `${root}checks/cv`;
await mkdir(out, { recursive: true });
const origin = 'http://127.0.0.1:3013';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3013'], { cwd: `${root}site`, stdio: 'ignore' });
const report = { sizes: [], downloads: {}, words: {} };
let browser;
try {
  for(let i=0;i<90;i++){try{if((await fetch(origin)).ok)break;}catch{}await new Promise(resolve=>setTimeout(resolve,200));}
  browser = await chromium.launch({ executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell', args:['--no-sandbox'] });
  const response = await fetch(`${origin}/cv/download`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-disposition'), /attachment; filename="Dawit-Bekele-CV.html"/);
  const html = await response.text();
  assert(!/<script|<link|<img|@import|url\(/i.test(html), 'Downloaded CV must need no external resources');
  await writeFile(`${out}/Dawit-Bekele-CV.html`, html);
  report.downloads = { status:200, attachment:true, standalone:true };
  for (const viewport of [{width:1000,height:900},{width:390,height:844}]) {
    const page = await browser.newPage({ viewport, javaScriptEnabled:false });
    await page.goto(`${origin}/cv`);
    await page.getByRole('heading',{name:'Dawit Bekele',exact:true}).waitFor();
    const documentText = await page.locator('.cv-document').innerText();
    assert(documentText.includes('99.98% over the 26 months'));
    assert(documentText.includes('former colleague created ferry'));
    assert(documentText.includes('we reduced pages'));
    assert(!/zero downtime|1\.2k|30,000|8,000/.test(documentText));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false,'CV horizontal overflow');
    const download = await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download HTML CV',exact:true}).click()]).then(([download])=>download);
    assert.equal(download.suggestedFilename(),'Dawit-Bekele-CV.html');
    await page.screenshot({path:`${out}/cv-${viewport.width}.png`,fullPage:true});
    await page.setContent(html);
    const standaloneText = await page.locator('.cv-document').innerText();
    assert.equal(standaloneText.replace(/\s+/g,' ').trim(),documentText.replace(/\s+/g,' ').trim(),'Page and download content differ');
    await page.screenshot({path:`${out}/download-${viewport.width}.png`,fullPage:true});
    if(viewport.width===1000){
      await page.emulateMedia({media:'print'});
      assert.equal(await page.locator('.cv-toolbar').isVisible(),false);
      await page.screenshot({path:`${out}/print.png`,fullPage:true});
      const pdf=await page.pdf({path:`${out}/print-check.pdf`,preferCSSPageSize:true,printBackground:true});
      assert(pdf.subarray(0,5).toString()==='%PDF-');
      report.downloads.printPDF=true;
    }
    report.sizes.push(viewport.width);
    await page.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(`${origin}/review/words`);
  assert.equal(await page.locator('.wording-option').count(),6);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth),false,'Wording review horizontal overflow');
  await page.screenshot({path:`${out}/words-phone.png`,fullPage:true});
  report.words={completeBeats:6,phoneOverflow:false};
  await page.setViewportSize({width:1440,height:900});
  await page.screenshot({path:`${out}/words-desktop.png`,fullPage:true});
  console.log('Passed: CV/download same content, attachment, offline HTML, no-JS, phone, print and six wording beats.');
} finally {
  await browser?.close();
  server.kill();
  await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
}
