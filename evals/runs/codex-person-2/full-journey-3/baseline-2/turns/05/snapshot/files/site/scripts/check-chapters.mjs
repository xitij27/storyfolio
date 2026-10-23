import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir,writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
const require=createRequire(import.meta.url),origin='http://127.0.0.1:3000',out='checks/chapters-details';
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3000'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const assert=(v,m)=>{if(!v)throw Error(m);};
let browser;
try{
 let ready=false;for(let i=0;i<80;i++){try{if((await fetch(origin)).ok){ready=true;break;}}catch{/* Startup. */}await new Promise(r=>setTimeout(r,250));}assert(ready,'Local server did not start');
 await mkdir(out,{recursive:true});browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const projectPaths=['data-centre-exit','orders-database','runbook','on-call','ferry','boring-migrations'];
 for(const slug of projectPaths){const response=await page.goto(origin+'/work/'+slug);assert(response.ok(),slug+' status');assert(await page.locator('h1').count()===1,slug+' heading');assert(await page.locator('figure img').count()===1,slug+' diagram');assert(await page.locator('meta[property="og:description"]').count()===1,slug+' metadata');await page.screenshot({path:`${out}/work-${slug}.png`,fullPage:true});}
 await page.goto(origin+'/wording');assert(await page.locator('.wording-pair article').count()===6,'Six complete wording beats required');
 for(const id of ['a','b','c'])await page.locator('#'+id).screenshot({path:`${out}/wording-${id}.png`});
 for(const id of ['a','b','c']){await page.goto(origin+'/?words='+id);const heading=await page.locator('h1').innerText();const expected={a:'Keep a way back.',b:'Plan the move. Keep the return route.',c:'Migrations, with a way back.'};assert(heading===expected[id],'Wording preview '+id);}
 await page.goto(origin+'/');assert(await page.locator('[data-beat]').count()===16,'Sixteen beats');
 assert(await page.locator('.project-index a').count()===6,'Six overview work links');
 const copy=await page.locator('#work').innerText();assert(copy.includes('Order API availability over those 26 months: 99.98%'),'Availability scope');assert(copy.includes('team of nine'),'On-call attribution');assert(copy.includes('A former colleague created ferry'),'ferry authorship');
 await page.locator('#database').evaluate(el=>scrollTo(0,el.offsetTop));await page.waitForTimeout(900);
 await page.getByRole('button',{name:/^3\s*Compare$/}).click();assert(await page.getByRole('button',{name:/^3\s*Compare$/}).getAttribute('aria-pressed')==='true','Stage control');
 for(const [direction,pixels] of [['forward',300],['backward',-300]]){await page.evaluate(y=>scrollBy(0,y),pixels);await page.waitForTimeout(900);await page.screenshot({path:`${out}/transition-${direction}.png`});}
 await page.getByRole('button',{name:'Follow scroll'}).click();
 await page.locator('#contact').evaluate(el=>el.scrollIntoView());await page.waitForTimeout(900);await page.setViewportSize({width:1280,height:720});await page.waitForTimeout(600);assert(await page.locator('canvas').isVisible(),'Scene after resize');await page.screenshot({path:`${out}/contact-after-resize.png`});
 const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download HTML CV'}).click();const download=await downloadPromise;await download.saveAs(`${out}/downloaded-cv.html`);
 await page.goto(origin+'/cv');assert(await page.locator('iframe').count()===1,'CV preview');
 assert((await page.goto(origin+'/missing-page')).status()===404,'404 status');
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(origin+'/');assert(await np.locator('[data-beat]').count()===16,'No-JS full story');await np.locator('.mobile-nav summary').click();assert(await np.locator('.mobile-nav').getAttribute('open')!==null,'No-JS navigation');await np.screenshot({path:`${out}/no-js-navigation.png`});
 await np.goto(origin+'/dawit-bekele-cv.html');await np.emulateMedia({media:'print'});await np.pdf({path:`${out}/cv-print.pdf`,format:'A4'});
 assert(errors.length===0,errors.join('\n'));await writeFile(`${out}/report.json`,JSON.stringify({passed:true,projects:6,wordingBeats:6,previewVersions:3,storyBeats:16,errors,cvDownloaded:true,noJSNavigation:true,contactResize:true},null,2));console.log('Full chapter details passed: six project pages, six wording beats, three previews, scoped copy, controls/transitions, resize, CV, 404 and no-JS mobile navigation.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
