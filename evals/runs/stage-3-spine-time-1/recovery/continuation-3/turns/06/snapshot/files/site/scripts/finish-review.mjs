import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright-core';
const out='checks/finish-pages';await mkdir(out,{recursive:true});
const listener=createServer();await new Promise(r=>listener.listen(0,'127.0.0.1',r));const port=listener.address().port;await new Promise(r=>listener.close(r));const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,STORYFOLIO_DIST_DIR:'.next-concepts',NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const report={scope:'Final local pages, actions, metadata and keyboard checks; actual user review pending',problems:[],routes:[],shots:[],external:[]};let browser;
const assert=(v,m)=>{if(!v)report.problems.push(m)};
try{
 for(let i=0;i<80;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
 browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const page=await context.newPage();page.on('pageerror',e=>report.problems.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))report.external.push(r.url())});
 const shot=async(name,fullPage=false)=>{const path=`${out}/${name}.png`;await page.screenshot({path,fullPage});report.shots.push(path)};
 for(const[route,status]of[['/',200],['/projects/mosslink',200],['/cv.html',200],['/wording',200],['/not-a-page',404]]){
  const res=await page.goto(base+route);assert(res.status()===status,`${route}: HTTP ${res.status()}`);assert(await page.locator('h1').count()===1,`${route}: h1 count`);assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${route}: overflow`);const body=await page.locator('body').innerText();assert(!/Reedglass|2021|LOCAL WORDING REVIEW|wording not settled|provisional A/i.test(body),`${route}: excluded/stale text`);report.routes.push({path:route,status:res.status()});
  if(route==='/'){assert(await page.locator('[data-beat]').count()===10,'Ten beats required');assert(await page.locator('.chapter-jumps a').count()===5,'Five chapter links required');assert((await page.locator('h1').innerText())==='Code meets the bench.','Approved opening heading changed');assert((await page.locator('[data-beat="record.close"] .story-title').innerText())==='The claim follows the observation.','Approved closing heading changed')}
  if(route==='/wording')assert(body.includes('A + A SELECTED'),'Wording archive not marked selected');
  if(route!=='/')await shot(route.split('/').pop()||'home',true);
 }
 for(const route of ['/','/projects/mosslink']){await page.goto(base+route);const image=await page.locator('meta[property="og:image"]').getAttribute('content');assert(!!image,`${route}: missing share image`);const alt=await page.locator('meta[property="og:image:alt"]').getAttribute('content');assert(alt?.includes('explanatory'),`${route}: preview alt`);assert((await context.request.get(base+new URL(image,base).pathname)).ok(),'Share image unavailable');assert(await page.locator('link[rel="icon"]').count()>0,'Icon metadata missing')}
 for(const route of ['/icon.svg','/icon.png','/opengraph-image.png','/assets/power-states.svg','/assets/bring-up-fixture.svg','/assets/power-states-label.svg']){const response=await context.request.get(base+route);assert(response.ok(),`${route}: unavailable`);report.routes.push({path:route,status:response.status()})}
 await page.goto(base+'/projects/mosslink');const pending=page.waitForEvent('download');await page.locator('a[download]').first().click();const download=await pending;await download.saveAs(`${out}/Ada-Mensah-CV.html`);assert(download.suggestedFilename()==='Ada-Mensah-CV.html','CV filename');report.download=download.suggestedFilename();
 await page.goto(base);await page.keyboard.press('Tab');assert(await page.locator('.story-skip').evaluate(a=>a===document.activeElement),'Skip link not first keyboard action');await page.keyboard.press('Enter');await page.waitForTimeout(300);assert(new URL(page.url()).hash==='#record','Skip link did not reach Record');
 await page.locator('.wordmark').focus();report.keyboard=[];for(let i=0;i<4;i++){await page.keyboard.press('Tab');const f=await page.evaluate(()=>{const a=document.activeElement,s=getComputedStyle(a);return{text:a.textContent,outline:s.outlineStyle,width:parseFloat(s.outlineWidth)}});report.keyboard.push(f);assert(f.outline!=='none'&&f.width>0,'Focus outline missing')}
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1100);await shot('home-phone');assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),'Phone home overflow');
 await page.goto(base+'/projects/mosslink');await shot('mosslink-phone',true);assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),'Project phone overflow');
 await page.goto(base+'/cv.html');await page.emulateMedia({media:'print'});await shot('cv-print',true);await page.emulateMedia({media:'screen'});
 assert(!report.external.length,'Unexpected nonlocal request');await context.close();
}catch(e){report.problems.push(e.stack)}finally{if(browser)await browser.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(report,null,2))}
console.log(JSON.stringify(report,null,2));if(report.problems.length)process.exitCode=1;
