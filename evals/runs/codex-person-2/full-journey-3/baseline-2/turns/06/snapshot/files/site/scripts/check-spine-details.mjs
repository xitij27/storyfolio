import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
const require=createRequire(import.meta.url);
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3000'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
try {
for(let i=0;i<80;i++){try{if((await fetch('http://127.0.0.1:3000')).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
const out='checks/spine-details';await mkdir(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:3000';
const assert=(ok,message)=>{if(!ok)throw Error(message);};
await page.goto(base+'/?look=dark');await page.waitForSelector('canvas');
await page.locator('#database').evaluate(el=>scrollTo(0,el.offsetTop+800));await page.waitForTimeout(1200);
const shots=[];
for(const [index,label] of ['Replicate','Dual write','Compare','Move reads','Move writes'].entries()){
 const button=page.getByRole('button',{name:new RegExp('^'+(index+1)+'\\s*'+label+'$')});
 await button.click();await page.waitForTimeout(200);
 assert(await button.getAttribute('aria-pressed')==='true',label+' is not selected');
 assert(await page.locator('.step-description').innerText(),label+' has no explanation');
 const shot=`${out}/cutover-stage-${index+1}.png`;await page.screenshot({path:shot});shots.push(shot);
}
await page.getByRole('button',{name:'Follow scroll'}).click();
assert(await page.locator('.cutover-steps [aria-pressed=true]').count()===0,'Scroll control not restored');
for(const [label,fraction] of [['forward',.5],['arrival',1],['backward',.5],['return',0]]){
 await page.locator('[data-beat="database.cutover"]').evaluate((el,f)=>scrollTo(0,el.offsetTop-innerHeight*.4+innerHeight*.4*f),fraction);
 await page.waitForTimeout(900);const shot=`${out}/transition-${label}.png`;await page.screenshot({path:shot});shots.push(shot);
}
const href=await page.getByRole('link',{name:'Talk about a migration'}).getAttribute('href');assert(href==='mailto:dawit@example.com','Wrong contact');
const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download HTML CV'}).click();const download=await downloadPromise;await download.saveAs(`${out}/downloaded-cv.html`);
const status=await page.goto(base+'/this-page-does-not-exist');assert(status.status()===404,'Missing page status');assert(await page.locator('h1').innerText()==='This address has no page.','Missing page content');
await page.goto(base+'/work/orders-database');assert(await page.locator('h1').innerText()==='The orders database.','Work page missing');
assert((await page.locator('main').innerText()).includes('one database engineer'),'Missing ownership');
await page.screenshot({path:`${out}/orders-detail.png`,fullPage:true});
for(const asset of ['/icon.svg','/share-preview.png','/diagrams/library.svg','/diagrams/database.svg']){const r=await context.request.get(base+asset);assert(r.ok(),asset+' missing');}
await page.goto(base+'/');assert(await page.locator('meta[property="og:image"]').count()===1,'Missing share metadata');
const cv=await browser.newContext({javaScriptEnabled:false,viewport:{width:860,height:1100}});const cp=await cv.newPage();await cp.goto(base+'/dawit-bekele-cv.html');assert(await cp.locator('h1').innerText()==='Dawit Bekele','CV heading');assert((await cp.locator('body').innerText()).includes('Order API availability over those 26 months'),'CV scope missing');await cp.emulateMedia({media:'print'});await cp.pdf({path:`${out}/cv-print-check.pdf`,format:'A4',printBackground:true});await cp.screenshot({path:`${out}/cv-print.png`,fullPage:true});
assert(errors.length===0,errors.join('\n'));await writeFile(`${out}/report.json`,JSON.stringify({passed:true,errors,stages:5,transitions:4,cvDownload:download.suggestedFilename(),missingPage:404,shots},null,2));await browser.close();console.log('Spine details: controls, bidirectional transitions, project page, CV download/print, 404, contact and local assets passed.');

} finally {server.kill('SIGTERM');}
