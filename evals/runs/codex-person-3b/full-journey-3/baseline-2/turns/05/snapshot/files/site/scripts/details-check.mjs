#!/usr/bin/env node
// Checks the delivered HTML pages, downloads, wording previews and the ferry model.
// Run after npm run build. No downloads or external services required.
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {createServer} from 'node:net';
import {mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {openingOptions,closingOptions} from '../content/wording.ts';
const root=fileURLToPath(new URL('..',import.meta.url)),require=createRequire(import.meta.url),{chromium}=require('playwright-core');
const out=join(root,`checks/details/${new Date().toISOString().replace(/[:.]/g,'-')}`);mkdirSync(out,{recursive:true});
const report={pages:[],wording:[],checks:[],problems:[]};
const socket=createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));const base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port',String(port)],{cwd:root,detached:true,stdio:'ignore',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});let browser;
const assert=(ok,message)=>{if(!ok)throw Error(message);};
try{
 for(let n=0;;n++){try{if((await fetch(base)).ok)break;}catch{}if(n>100)throw Error('Local server did not start');await new Promise(r=>setTimeout(r,150));}
 browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const slugs=['data-centre-exit','orders-database','runbook','on-call','ferry','boring-migrations'];
 for(const [width,height] of [[1440,900],[390,844]]){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>report.problems.push(e.message));
  page.on('request',request=>{if(!request.url().startsWith(base)&&!request.url().startsWith('data:'))report.problems.push(`External request: ${request.url()}`);});
  for(const route of ['/work',...slugs.map(slug=>`/work/${slug}`),'/cv','/wording']){
   const response=await page.goto(base+route);assert(response.status()===200,`${route} status ${response.status()}`);
   assert((await page.title()).includes('Dawit Bekele'),`${route}: title missing name`);
   assert(await page.locator('h1').count()===1,`${route}: expected one h1`);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route}: page overflows horizontally`);
   await page.screenshot({path:join(out,`${width}-${route.slice(1).replaceAll('/','-')}.png`),fullPage:true});
   report.pages.push({route,width,status:200});
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'}),page=await context.newPage();
 page.on('pageerror',e=>report.problems.push(e.message));
 await page.goto(base+'/work/ferry');
 for(const expected of ['Check lag and parity','Switch the write target','Keep the way back']){
  await page.getByRole('button',{name:'Next step',exact:true}).press('Enter');
  assert(await page.locator('.ferry-state h3').innerText()===expected,`Ferry step: expected ${expected}`);
 }
 assert(await page.getByRole('button',{name:'Next step',exact:true}).isDisabled(),'Ferry must stop at final state');
 await page.screenshot({path:join(out,'ferry-fallback.png'),fullPage:true});
 await page.getByRole('button',{name:'Back',exact:true}).click();assert(await page.locator('.ferry-state h3').innerText()==='Switch the write target','Ferry Back failed');
 await page.getByRole('button',{name:'Restart',exact:true}).click();assert(await page.locator('.ferry-state h3').innerText()==='Old target active','Ferry restart failed');report.checks.push('Ferry keyboard steps, boundary, back and restart');
 await page.goto(base+'/cv');await page.emulateMedia({media:'print'});assert(!await page.locator('.cv-actions').isVisible(),'Print actions visible in print');assert(!await page.locator('.document-header').isVisible(),'Header visible in print');await page.screenshot({path:join(out,'cv-print.png'),fullPage:true});await page.pdf({path:join(out,'cv-print.pdf'),format:'A4',printBackground:true});await page.emulateMedia({media:'screen'});
 const download=await fetch(base+'/cv/download'),html=await download.text();assert(download.status===200&&download.headers.get('content-disposition')?.includes('dawit-bekele-cv.html'),'CV attachment response missing');assert(!/<script|https?:\/\//i.test(html),'HTML CV is not self-contained');
 const offline=await browser.newContext({offline:true,viewport:{width:1000,height:800}}),offlinePage=await offline.newPage();await offlinePage.setContent(html);assert(await offlinePage.getByRole('heading',{name:'Dawit Bekele',exact:true}).count()===1,'Downloaded CV does not render offline');assert((await offlinePage.locator('body').innerText()).includes('99.98%'),'Downloaded CV missing availability');await offlinePage.screenshot({path:join(out,'cv-download-offline.png'),fullPage:true});await offline.close();report.checks.push('Print layout and self-contained offline HTML CV');
 for(const route of ['/plain-story','/sketch/example','/work/missing','/missing-address']){const response=await fetch(base+route),text=await response.text();assert(response.status===404,`${route}: missing page status ${response.status}`);assert(text.includes('This address')&&text.includes('Dawit Bekele'),`${route}: missing page not useful`);}report.checks.push('Useful 404 and removed demo routes');
 const home=await fetch(base),homeHtml=await home.text();assert(homeHtml.includes('og:image')&&homeHtml.includes('twitter:card'),'Share metadata missing');assert((await fetch(base+'/opengraph-image.png')).ok,'Share image failed');assert((await fetch(base+'/icon.svg')).ok,'Icon failed');report.checks.push('Share metadata, image and icon');
 await page.goto(base+'/wording');
 for(const options of [openingOptions,closingOptions])for(const option of Object.values(options))assert((await page.locator('main').innerText()).includes(option.words),'Wording review omits an option');
 for(const id of ['a','b','c'])for(const kind of ['opening','closing']){
  const chapter=kind==='opening'?'hello':'contact',text=(kind==='opening'?openingOptions:closingOptions)[id].words;
  await page.goto(`${base}/preview?look=blueprint&${kind}=${id}#${chapter}`);await page.waitForFunction(k=>window.__stitch?.ready&&document.querySelector('.stitch')?.dataset.chapter===k,chapter);
  assert(await page.locator('.cap>p').innerText()===text,`${kind} ${id}: preview changed wording`);
  await page.screenshot({path:join(out,`wording-${kind}-${id}.png`)});report.wording.push({kind,id,exact:true});
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/preview?look=blueprint&opening=a&closing=a#hello');await page.waitForFunction(()=>window.__stitch?.ready);await page.screenshot({path:join(out,'wording-a-phone-opening.png')});
 await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Contact',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.stitch').dataset.chapter==='contact');await page.screenshot({path:join(out,'wording-a-phone-closing.png')});
 await page.goto(base+'/#made');await page.waitForFunction(()=>window.__stitch?.ready&&document.querySelector('.stitch').dataset.chapter==='made');
 const ferry=page.getByRole('navigation',{name:'Work details'}).getByRole('link',{name:'ferry',exact:false});await ferry.focus();await page.keyboard.press('Enter');await page.waitForURL('**/work/ferry');report.checks.push('Keyboard work link opens permanent page');
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),plain=await noJS.newPage();
 for(const slug of slugs){const response=await plain.goto(base+`/work/${slug}`);assert(response.status()===200&&await plain.locator('h1').isVisible(),`${slug}: blank without JavaScript`);}
 await plain.goto(base+'/work/ferry');assert(await plain.locator('.ferry-model ol li').count()===4,'Static ferry sequence missing');await plain.screenshot({path:join(out,'ferry-no-javascript.png'),fullPage:true});report.checks.push('All six pages and ferry sequence without JavaScript');
} catch(error){report.problems.push(error.stack??String(error));}
finally{if(browser)await browser.close();server.kill('SIGTERM');writeFileSync(join(out,'report.json'),JSON.stringify(report,null,2));}
console.log(`${report.problems.length?'FAILED':'Passed'}: ${report.problems.length} problems. ${out}`);for(const problem of report.problems)console.error(problem);process.exitCode=report.problems.length?1:0;
