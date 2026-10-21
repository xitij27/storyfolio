import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright-core';
import {beatRestSamples} from './check-lib.mjs';
const mode=process.argv[2]??'chapters';const out=`checks/chapters-${mode}`;await mkdir(out,{recursive:true});
const socket=createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,STORYFOLIO_DIST_DIR:'.next-concepts',NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const report={mode,problems:[],shots:[],external:[]};const assert=(v,m)=>{if(!v)report.problems.push(m)};let browser;
try{
 for(let i=0;i<80;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
 browser=await chromium.launch({args:mode==='wording'?['--no-sandbox','--disable-3d-apis']:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference'});const page=await context.newPage();page.on('pageerror',e=>report.problems.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))report.external.push(r.url())});
 const shot=async name=>{const path=`${out}/${name}.png`;await page.screenshot({path});report.shots.push(path)};
 if(mode==='reduced'){
  await page.goto(base);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1400);
  const geometry=await page.evaluate(()=>{const root=document.querySelector('.story'),r=root.getBoundingClientRect();return{origin:scrollY+r.top,viewport:innerHeight,boxes:[...root.querySelectorAll('[data-beat]')].map(b=>{const x=b.getBoundingClientRect();return{id:b.dataset.beat,top:x.top-r.top,height:x.height}})}});
  report.stationary=[];
  for(const [i,sample]of beatRestSamples(geometry.boxes,geometry.viewport,['end']).entries()){
   await page.evaluate(top=>scrollTo(0,top),geometry.origin+sample[0].top);await page.waitForTimeout(650);
   const canvas=page.locator('canvas');const before=createHash('sha256').update(await canvas.screenshot()).digest('hex');await page.waitForTimeout(300);const after=createHash('sha256').update(await canvas.screenshot()).digest('hex');
   report.stationary.push({id:geometry.boxes[i].id,before,after});assert(before===after,`Stationary scene changed: ${geometry.boxes[i].id}`);await shot(geometry.boxes[i].id);
  }
 }else if(mode==='wording'){
  for(const size of [{width:1440,height:900},{width:390,height:844}]){
   await page.setViewportSize(size);const res=await page.goto(base+'/wording');assert(res.status()===200,'Wording page status');assert(await page.locator('.wording-beat').count()===6,'Expected six complete beats');assert(await page.locator('h1').count()===1,'One h1 required');assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),'Wording overflow');
   for(let i=0;i<6;i++){
    const beat=page.locator('.wording-beat').nth(i);const body=await beat.innerText();assert(body.includes(i%2===0?'Firmware is the code':'No cause, fix, timing or later resolution is confirmed.'),`Fixed note missing in version ${i}`);assert(await beat.locator('a[download]').count()===1,`CV action missing ${i}`);
    const path=`${out}/${size.width}-${i}.png`;await beat.screenshot({path});report.shots.push(path);
   }
  }
 }else{
  await page.goto(base);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1200);assert(await page.locator('[data-beat]').count()===10,'Expected ten beats');assert(await page.locator('.story').getAttribute('data-look')==='light','Selected Aluminium missing');assert(await page.locator('.story-look-switch').count()===0,'Look comparison should not remain');assert(await page.locator('.chapter-jumps a').count()===5,'Missing native chapter links');await shot('first-screen');
  const geometry=await page.evaluate(()=>{const root=document.querySelector('.story'),r=root.getBoundingClientRect();return{origin:scrollY+r.top,viewport:innerHeight,boxes:[...root.querySelectorAll('[data-beat]')].map(b=>{const x=b.getBoundingClientRect();return{id:b.dataset.beat,top:x.top-r.top,height:x.height}})}});
  const samples=beatRestSamples(geometry.boxes,geometry.viewport,['start','mid','end']);
  for(const id of ['command.states','command.documents','observe.open']){const i=geometry.boxes.findIndex(b=>b.id===id);for(const sample of samples[i]){await page.evaluate(top=>scrollTo(0,top),geometry.origin+sample.top);await page.waitForTimeout(750);await shot(`${id}-${sample.position}`)}}
  const ends=beatRestSamples(geometry.boxes,geometry.viewport,['end']);const starts=beatRestSamples(geometry.boxes,geometry.viewport,['start']);
  // Both directions into and out of each newly added chapter.
  const transitions=[1,3,5,6];for(const direction of ['forward','reverse'])for(const i of direction==='forward'?transitions:[...transitions].reverse()){await page.evaluate(top=>scrollTo(0,top),geometry.origin+(ends[i][0].top+starts[i+1][0].top)/2);await page.waitForTimeout(750);await shot(`${direction}-${i}`)}
 }
 assert(!report.external.length,'External requests observed');await context.close();
}catch(e){report.problems.push(e.stack)}finally{if(browser)await browser.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(report,null,2))}
console.log(JSON.stringify(report,null,2));if(report.problems.length)process.exitCode=1;
