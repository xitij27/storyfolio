import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import { wording, fixedWords } from '../content/wording.ts';
import { chromium } from 'playwright-core';
const require=createRequire(import.meta.url),origin='http://127.0.0.1:3000',out='checks/finish-details';
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3000'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const assert=(v,m)=>{if(!v)throw Error(m);};
let browser;
try{
 let ready=false;for(let i=0;i<80;i++){try{if((await fetch(origin)).ok){ready=true;break;}}catch{/* Startup. */}await new Promise(r=>setTimeout(r,250));}assert(ready,'Local server did not start');
 await mkdir(out,{recursive:true});browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const page=await context.newPage();const errors=[],external=[];page.on('pageerror',e=>errors.push(e.message));context.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))external.push(r.url());});
 const projectPaths=['data-centre-exit','orders-database','runbook','on-call','ferry','boring-migrations'];
 for(const slug of projectPaths){const response=await page.goto(origin+'/work/'+slug);assert(response.ok(),slug+' status');assert(await page.locator('h1').count()===1,slug+' heading');assert(await page.locator('figure img').count()===1,slug+' diagram');assert(await page.locator('meta[property="og:description"]').count()===1,slug+' metadata');await page.screenshot({path:`${out}/work-${slug}.png`,fullPage:true});}
 await page.goto(origin+'/wording');assert(await page.locator('.wording-pair article').count()===6,'Six complete wording beats required');
 for(const id of ['a','b','c'])await page.locator('#'+id).screenshot({path:`${out}/wording-${id}.png`});
 for(const id of ['a','b','c']){await page.goto(origin+'/?words='+id);const heading=await page.locator('h1').innerText();assert(heading==='Keep a way back.','Approved wording stays fixed for query '+id);}
 await page.goto(origin+'/');assert(await page.locator('[data-beat]').count()===16,'Sixteen beats');
 assert(await page.locator('.project-index a').count()===6,'Six overview work links');
 const opening=await page.locator('#opening').textContent(),closing=await page.locator('#contact').textContent();
 for(const value of Object.values(wording.a.opening))assert(opening.includes(value),'Approved opening: '+value);
 for(const value of Object.values(wording.a.closing))assert(closing.includes(value),'Approved closing: '+value);
 for(const key of ['openingKicker','proofNumber','proof','audience','openingScene'])assert(opening.includes(fixedWords[key]),'Fixed opening '+key);
 for(const key of ['closingKicker','email','speaking','talk','cvView','cvDownload','closingScene'])assert(closing.includes(fixedWords[key]),'Fixed closing '+key);
 for(const asset of ['/icon.svg','/share-preview.png'])assert((await fetch(origin+asset)).ok,'Local asset '+asset);
 assert(await page.locator('meta[property="og:image"]').getAttribute('content')==='http://localhost:3000/share-preview.png','Local share preview metadata');
 await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement?.tagName==='A'),'Keyboard starts on a link');

 const copy=await page.locator('#work').innerText();assert(copy.includes('Order API availability over those 26 months: 99.98%'),'Availability scope');assert(copy.includes('team of nine'),'On-call attribution');assert(copy.includes('A former colleague created ferry'),'ferry authorship');
 await page.locator('#database').evaluate(el=>scrollTo(0,el.offsetTop));await page.waitForTimeout(900);
 await page.getByRole('button',{name:/^3\s*Compare$/}).click();assert(await page.getByRole('button',{name:/^3\s*Compare$/}).getAttribute('aria-pressed')==='true','Stage control');
 for(const [direction,pixels] of [['forward',300],['backward',-300]]){await page.evaluate(y=>scrollBy(0,y),pixels);await page.waitForTimeout(900);await page.screenshot({path:`${out}/transition-${direction}.png`});}
 await page.getByRole('button',{name:'Follow scroll'}).click();
 await page.locator('#contact').evaluate(el=>el.scrollIntoView());await page.waitForTimeout(900);await page.setViewportSize({width:1280,height:720});await page.waitForTimeout(600);assert(await page.locator('canvas').isVisible(),'Scene after resize');await page.screenshot({path:`${out}/contact-after-resize.png`});
 const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download HTML CV'}).click();const download=await downloadPromise;await download.saveAs(`${out}/downloaded-cv.html`);assert(await readFile(`${out}/downloaded-cv.html`,'utf8')===await readFile('public/dawit-bekele-cv.html','utf8'),'Download matches local CV');
 await page.goto(origin+'/cv');assert(await page.locator('iframe').count()===1,'CV preview');
 assert((await page.goto(origin+'/missing-page')).status()===404,'404 status');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(origin+'/');assert(await np.locator('[data-beat]').count()===16,'No-JS full story');await np.locator('.mobile-nav summary').click();assert(await np.locator('.mobile-nav').getAttribute('open')!==null,'No-JS navigation');await np.screenshot({path:`${out}/no-js-navigation.png`});
 await np.goto(origin+'/dawit-bekele-cv.html');await np.emulateMedia({media:'print'});await np.pdf({path:`${out}/cv-print.pdf`,format:'A4'});
 assert(errors.length===0,errors.join('\n'));assert(external.length===0,'Unexpected external requests: '+external.join(', '));await writeFile(`${out}/report.json`,JSON.stringify({passed:true,projects:6,wordingBeats:6,fixedWordingQueries:3,storyBeats:16,errors,externalRequests:external,approvedWordsVerbatim:true,localAssets:true,cvDownloaded:true,noJSNavigation:true,contactResize:true},null,2));console.log('Full chapter details passed: six project pages, six wording beats, approved wording with three query values, scoped copy, controls/transitions, resize, CV, 404 and no-JS mobile navigation.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
