import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdir,readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import { beatRestSamples } from './check-lib.mjs';
import { works } from '../content/work.ts';
import { wording } from '../content/wording.ts';
const mode=process.argv[2]??'functional',out=`checks/chapters-${mode}`;await mkdir(out,{recursive:true});
const portServer=createServer();await new Promise(r=>portServer.listen(0,'127.0.0.1',r));const port=portServer.address().port;await new Promise(r=>portServer.close(r));
const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
let browser;const report={mode,checks:[],errors:[],external:[],shots:[]};
try{
 for(let n=0;n<80;n++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
 browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:mode==='functional'?'reduce':'no-preference',acceptDownloads:true});const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))report.external.push(r.url());});
 const shot=async name=>{const file=`${out}/${name}.png`;await page.screenshot({path:file});report.shots.push(file);};
 await page.goto(base+'/',{waitUntil:'networkidle'});await page.waitForTimeout(1300);
 const geometry=await page.locator('[data-beat]').evaluateAll(es=>es.map(e=>({id:e.dataset.beat,top:e.offsetTop,height:e.offsetHeight})));
 assert.equal(geometry.length,15);assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('.story').getAttribute('data-look'),'light');
 if(mode.startsWith('transitions')){
  const ends=beatRestSamples(geometry,900,['end']);const positions=ends.slice(0,-1).map((samples,i)=>({i,y:samples[0].top+198}));
  const directions=mode==='transitions-back-early'?['back']:['forward','back'];
  const selected=mode==='transitions-back-early'?positions.filter(pos=>pos.i<10):positions;
  for(const direction of directions)for(const pos of direction==='forward'?selected:[...selected].reverse()){await page.evaluate(y=>window.scrollTo(0,y),pos.y);await page.waitForTimeout(850);await shot(`transition-${String(pos.i).padStart(2,'0')}-${direction}`);}
  report.checks.push(mode==='transitions-back-early'?'Remaining ten reverse transitions captured in the selected look':'Every inter-beat transition captured in both directions in the selected look');
  for(const index of (mode==='transitions-back-early'?[]:[0,9,14])){await page.goto(base+'/?look=dark',{waitUntil:'networkidle'});const samples=beatRestSamples(geometry,900,['end']);await page.evaluate(y=>window.scrollTo(0,y),samples[index][0].top);await page.waitForTimeout(1200);await shot(`dark-spot-${index}`);}
  if(mode!=='transitions-back-early')report.checks.push('Optional dark look opening/migration/ending captured');
 }else{
  for(const work of works)assert.equal(await page.locator(`a[href="/work/${work.slug}"]`).count(),1);
  assert.equal(await page.locator('.career-line p').innerText(),'Card payment systems.');report.checks.push('All 15 beats, five work links, selected default look and exact Lumen line');
  const index=geometry.findIndex(b=>b.id==='projects.migration');const samples=beatRestSamples(geometry,900,['mid']);await page.evaluate(y=>window.scrollTo(0,y),samples[index][0].top);await page.waitForTimeout(1800);
  await page.getByRole('button',{name:'Forward →',exact:true}).click();await page.waitForTimeout(400);const f=await page.locator('canvas').screenshot();await page.getByRole('button',{name:'← Return',exact:true}).click();await page.waitForTimeout(400);const r=await page.locator('canvas').screenshot();const hash=b=>createHash('sha256').update(b).digest('hex');assert.notEqual(hash(f),hash(r));await writeFile(`${out}/model-forward.png`,f);await writeFile(`${out}/model-return.png`,r);report.checks.push('3D model controls visibly work with reduced motion');
  for(const sampleIndex of [0,2,3,5,6,7,8,10,11,12,13,14]){await page.evaluate(y=>window.scrollTo(0,y),samples[sampleIndex][0].top);await page.waitForTimeout(800);const a=await page.locator('canvas').screenshot();await page.waitForTimeout(250);const b=await page.locator('canvas').screenshot();assert.equal(hash(a),hash(b),`${geometry[sampleIndex].id} must stay still`);}
  report.checks.push('All new scene types stay still at rest under reduced motion');
  await page.getByRole('button',{name:'Pause 3D',exact:true}).click();assert.equal(await page.locator('.story').getAttribute('data-scene'),'off');assert(await page.locator('.story-fallback img').first().isVisible());report.checks.push('Pause retains static scene equivalents');
  for(const work of works){const response=await page.goto(base+'/work/'+work.slug,{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('h1').innerText(),work.title);assert(await page.locator(`a[href="/#${work.beat.replaceAll('.','-')}"]`).first().isVisible());assert(await page.locator('figure img').first().evaluate(img=>img.complete&&img.naturalWidth>0));await shot(`work-${work.slug}`);}
  report.checks.push('All five standalone work pages return 200, render their images and link back to the correct beat');
  await page.getByRole('link',{name:'← Back to the work',exact:true}).click();await page.waitForTimeout(1400);assert.equal(new URL(page.url()).hash,'#projects-talk');assert(await page.locator('#projects-talk').isVisible());report.checks.push('Back from a work page navigates to its live story beat');
  await page.goto(base+'/work/migration',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Forward →'}).click();assert((await page.locator('figure img').getAttribute('src')).includes('forward'));await page.getByRole('button',{name:'← Return'}).click();assert((await page.locator('figure img').getAttribute('src')).includes('return'));report.checks.push('Detail-page migration miniature works');
  await page.goto(base+'/work/database-upgrade',{waitUntil:'networkidle'});await page.locator('.database-cutaway summary').click();assert(await page.locator('.database-cutaway figure').isVisible());await shot('database-enlarged');report.checks.push('Database detail expands its cutaway illustration without invented specifications');
  for(const [id,version] of Object.entries(wording)){await page.goto(base+'/?words='+id,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').innerText(),version.opening.title);assert.equal(await page.locator('#contact-title').innerText(),version.closing.title);assert((await page.locator('#contact').innerText()).includes(version.closing.body));}report.checks.push('All three full-page wording previews use the exact draft headings and paragraphs');
  await page.goto(base+'/review/wording',{waitUntil:'networkidle'});assert.equal(await page.locator('.word-card').count(),3);await page.screenshot({path:`${out}/wording-desktop.png`,fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:`${out}/wording-phone.png`,fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);report.checks.push('Complete wording comparison renders on desktop and phone without overflow');
  await page.goto(base+'/',{waitUntil:'networkidle'});await page.locator('.chapter-menu summary').click();assert.equal(await page.locator('.chapter-menu nav a').count(),7);await page.locator('.chapter-menu a[href="#study"]').click();assert.equal(new URL(page.url()).hash,'#study');assert.equal(await page.locator('.chapter-menu').getAttribute('open'),null);report.checks.push('Mobile chapter disclosure has all seven anchors and closes after navigation');
  await page.goto(base+'/cv',{waitUntil:'networkidle'});const downloading=page.waitForEvent('download');await page.getByRole('link',{name:'Download HTML CV ↓'}).click();const download=await downloading;await download.saveAs(`${out}/cv.html`);const html=await readFile(`${out}/cv.html`,'utf8');assert(html.includes('team of nine'));assert(html.includes('99.98% over 26 months'));assert(!/<script|https?:\/\//i.test(html));await page.emulateMedia({media:'print'});await page.screenshot({path:`${out}/cv-print.png`,fullPage:true});await page.emulateMedia({media:'screen'});report.checks.push('CV still downloads as standalone HTML and has a print layout');
  const missing=await page.goto(base+'/work/not-a-project',{waitUntil:'networkidle'});assert.equal(missing.status(),404);assert(await page.getByRole('link',{name:'Home',exact:true}).isVisible());report.checks.push('Unknown work route returns useful real 404');
  await page.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await page.locator('meta[property="og:image:width"]').getAttribute('content'),'1200');assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'),'summary_large_image');assert((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
  for(const path of ['/share-preview.png','/icon.svg','/icon-32.png','/apple-touch-icon.png','/favicon.ico'])assert.equal((await context.request.get(base+path)).status(),200);
  const image=await readFile('public/share-preview.png');assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);report.checks.push('Local share image, social metadata and all icon formats work; noindex remains');
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await noJS.newPage();await fallback.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await fallback.locator('[data-beat]').count(),15);assert.equal(await fallback.locator('.story-fallback img').count(),15);assert.equal(await fallback.locator('canvas').count(),0);for(const work of works)assert(await fallback.locator(`a[href="/work/${work.slug}"]`).isVisible());await fallback.screenshot({path:`${out}/no-js-phone.png`,fullPage:true});await fallback.goto(base+"/work/migration",{waitUntil:"networkidle"});assert(await fallback.locator("figure img").isVisible());assert.equal(await fallback.locator(".detail-model-controls").isVisible(),false);await noJS.close();report.checks.push('No-JavaScript phone retains all 15 beats, 15 static illustrations and five work links; work detail retains its static image without inert controls');
 }
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.external,[]);await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser?.close();server.kill('SIGTERM');}
