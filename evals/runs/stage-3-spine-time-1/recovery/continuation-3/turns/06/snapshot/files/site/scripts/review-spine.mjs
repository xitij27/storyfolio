import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright-core';
import {beatRestSamples} from './check-lib.mjs';
const mode=process.argv[2]??'pages';
const out=`checks/spine-review-${mode}`;await mkdir(out,{recursive:true});
const socket=createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));
const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,STORYFOLIO_DIST_DIR:'.next-concepts',NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const report={mode,problems:[],routes:[],shots:[],requests:[]};let browser;
const assert=(value,message)=>{if(!value)report.problems.push(message)};
try{
 for(let i=0;i<80;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,200));}
 browser=await chromium.launch({args:mode==='pages'?['--no-sandbox','--disable-3d-apis']:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
 const page=await context.newPage();page.on('pageerror',e=>report.problems.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:')){report.requests.push(r.url());report.problems.push(`Nonlocal request: ${r.url()}`)}});
 const shot=async name=>{const path=`${out}/${name}.png`;await page.screenshot({path,fullPage:mode==='pages'});report.shots.push(path)};
 if(mode==='phone'){
  await page.setViewportSize({width:390,height:844});await page.goto(base+'/?look=light');await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1000);await shot('first-screen-phone');
 }else if(mode==='pages'){
  for(const [route,status]of [['/projects/mosslink',200],['/cv.html',200],['/missing-page-check',404]]){
   const response=await page.goto(base+route);assert(response.status()===status,`${route}: expected ${status}, got ${response.status()}`);assert(await page.locator('h1').count()===1,`${route}: h1 count`);assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${route}: overflow`);const text=await page.locator('body').innerText();assert(!/Reedglass|2021|certified device|forty.unit pilot/i.test(text),`${route}: excluded claim`);report.routes.push({route,status:response.status()});await shot(route.split('/').pop());
  }
  await page.goto(base+'/projects/mosslink');const downloadPromise=page.waitForEvent('download');await page.locator('a[download]').first().click();const download=await downloadPromise;await download.saveAs(`${out}/Ada-Mensah-CV.html`);assert(download.suggestedFilename()==='Ada-Mensah-CV.html','CV filename');report.download=download.suggestedFilename();
  for(const path of ['/icon.svg','/icon.png','/opengraph-image.png']){const res=await context.request.get(base+path);assert(res.status()===200,`${path}: HTTP ${res.status()}`);report.routes.push({route:path,status:res.status()})}
  for(const route of ['/','/projects/mosslink']){await page.goto(base+route);const image=await page.locator('meta[property="og:image"]').getAttribute('content');assert(Boolean(image),'Missing preview');const alt=await page.locator('meta[property="og:image:alt"]').getAttribute('content');assert(alt?.includes('explanatory'),'Missing descriptive preview alt');const res=await context.request.get(base+new URL(image,base).pathname);assert(res.ok(),'Preview image not available');assert(await page.locator('link[rel="icon"]').count()>0,'Missing icon metadata')}
  await page.goto(base+'/projects/mosslink');await page.locator('.wordmark').focus();const focused=[];
  for(let i=0;i<5;i++){await page.keyboard.press('Tab');focused.push(await page.evaluate(()=>{const a=document.activeElement;return {text:a.textContent,outline:getComputedStyle(a).outlineStyle,width:parseFloat(getComputedStyle(a).outlineWidth)}}))}assert(focused.every(f=>f.outline!=='none'&&f.width>0),'Keyboard focus missing');report.focused=focused;
  await page.setViewportSize({width:390,height:844});await shot('project-phone');await page.goto(base+'/cv.html');await page.emulateMedia({media:'print'});await shot('cv-print');
 }else{
  await page.goto(`${base}/?look=${mode}`);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1200);await shot('first-screen');
  const geometry=await page.evaluate(()=>{const root=document.querySelector('.story'),rect=root.getBoundingClientRect();return{origin:scrollY+rect.top,viewport:innerHeight,boxes:[...root.querySelectorAll('[data-beat]')].map(b=>{const r=b.getBoundingClientRect();return{top:r.top-rect.top,height:r.height,id:b.dataset.beat}})}});
  const ends=beatRestSamples(geometry.boxes,geometry.viewport,['end']);const starts=beatRestSamples(geometry.boxes,geometry.viewport,['start']);
  const points=ends.slice(0,-1).map((e,i)=>geometry.origin+(e[0].top+starts[i+1][0].top)/2);
  for(const direction of ['forward','reverse']){
   const order=direction==='forward'?points.map((top,i)=>({top,i})):points.map((top,i)=>({top,i})).reverse();
   for(const {top,i} of order){await page.evaluate(y=>scrollTo(0,y),top);await page.waitForTimeout(650);await shot(`${direction}-${i}-${geometry.boxes[i].id}`)}
  }
  report.look=await page.locator('.story').getAttribute('data-look');assert(report.look===mode,'Wrong look');
 }
 await context.close();
} catch(e){report.problems.push(e.stack)}
finally{if(browser)await browser.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));if(report.problems.length)process.exitCode=1;
