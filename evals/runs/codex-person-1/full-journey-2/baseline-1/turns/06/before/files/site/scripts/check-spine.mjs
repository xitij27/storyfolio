import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import { beatRestSamples } from './check-lib.mjs';
const out='checks/spine-functional';await mkdir(out,{recursive:true});
const portServer=createServer();await new Promise(r=>portServer.listen(0,'127.0.0.1',r));const port=portServer.address().port;await new Promise(r=>portServer.close(r));
const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
let browser;const report={checks:[],errors:[],external:[]};
try{
  for(let n=0;n<80;n++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
  browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',acceptDownloads:true});const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))report.external.push(r.url());});
  await page.goto(base+'/?look=dark',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
  const boxes=await page.locator('[data-beat]').evaluateAll(es=>es.map(e=>({top:e.offsetTop,height:e.offsetHeight})));
  const samples=beatRestSamples(boxes,900,['mid']);await page.evaluate(y=>window.scrollTo(0,y),samples[2][0].top);await page.waitForTimeout(1500);
  const hash=b=>createHash('sha256').update(b).digest('hex');
  await page.getByRole('button',{name:'Forward →',exact:true}).click();await page.waitForTimeout(350);
  const forward=await page.locator('canvas').screenshot();
  await page.getByRole('button',{name:'← Return',exact:true}).click();await page.waitForTimeout(350);
  const back=await page.locator('canvas').screenshot();assert.notEqual(hash(forward),hash(back),'The reduced-motion model must respond visually to controls.');
  await writeFile(`${out}/model-forward.png`,forward);await writeFile(`${out}/model-return.png`,back);report.checks.push('Model responds visually to forward/return buttons in reduced motion');
  await page.getByRole('button',{name:'Pause 3D',exact:true}).click();await page.waitForTimeout(150);
  assert.equal(await page.locator('.story').getAttribute('data-scene'),'off');assert.equal(await page.locator('canvas').count(),0);assert(await page.locator('.story-fallback img').first().isVisible());report.checks.push('Pause swaps 3D for static HTML illustrations');
  await page.getByRole('button',{name:'Enable 3D',exact:true}).click();await page.waitForTimeout(1500);assert.equal(await page.locator('canvas').count(),1);report.checks.push('3D can be enabled again');
  await page.emulateMedia({reducedMotion:'no-preference'});
  for (const look of ['light','dark']) {
    await page.goto(base+'/?look='+look,{waitUntil:'networkidle'});await page.waitForTimeout(1000);
    const transitionBoxes=await page.locator('[data-beat]').evaluateAll(es=>es.map(e=>({top:e.offsetTop,height:e.offsetHeight})));
    const ends=beatRestSamples(transitionBoxes,900,['end']);
    const positions=ends.slice(0,3).map((sample,i)=>({id:i,y:sample[0].top+180}));
    for (const direction of ['forward','back']) {
      const sequence=direction==='forward'?positions:[...positions].reverse();
      for(const pos of sequence) {await page.evaluate(y=>window.scrollTo(0,y),pos.y);await page.waitForTimeout(1600);await page.screenshot({path:`${out}/${look}-transition-${pos.id}-${direction}.png`});}
    }
  }
  report.checks.push('Captured all three inter-beat transitions in both scroll directions and both looks for visual review');
  await page.goto(base+'/cv',{waitUntil:'networkidle'});
  const downloading=page.waitForEvent('download');await page.getByRole('link',{name:'Download HTML CV ↓'}).click();const download=await downloading;assert.equal(download.suggestedFilename(),'dawit-bekele-cv.html');await download.saveAs(`${out}/downloaded-cv.html`);
  const cv=await readFile(`${out}/downloaded-cv.html`,'utf8');assert(cv.includes('team of nine'));assert(cv.includes('99.98% over 26 months'));assert(cv.includes('Created by a former colleague'));assert(!/<script|https?:\/\//i.test(cv));report.checks.push('HTML CV downloads with confirmed scoped facts, styles embedded, no scripts or external URLs');
  await page.emulateMedia({media:'print'});await page.screenshot({path:`${out}/cv-print.png`,fullPage:true});assert(!(await page.getByRole('navigation').isVisible()));await page.emulateMedia({media:'screen'});report.checks.push('Print layout hides navigation and controls');
  const response=await page.goto(base+'/missing-page-check',{waitUntil:'networkidle'});assert.equal(response.status(),404);assert(await page.getByRole('link',{name:'Home',exact:true}).isVisible());assert(await page.getByRole('link',{name:'CV',exact:true}).isVisible());report.checks.push('Unknown address returns real HTTP 404 with useful navigation');
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await noJS.newPage();await fallback.goto(base+'/',{waitUntil:'networkidle'});assert(await fallback.locator('h1').isVisible());assert(await fallback.locator('.story-fallback img').first().isVisible());assert(await fallback.getByRole('link',{name:'Download HTML CV ↓'}).isVisible());await fallback.screenshot({path:`${out}/no-js-phone.png`,fullPage:true});report.checks.push('Phone without JavaScript retains the story, illustrations and CV download');await noJS.close();
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.external,[]);
  await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser?.close();server.kill('SIGTERM');}
