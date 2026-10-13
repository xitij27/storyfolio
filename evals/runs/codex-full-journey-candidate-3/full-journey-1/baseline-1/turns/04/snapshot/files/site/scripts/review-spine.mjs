import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {chromium} from 'playwright-core';
const out='checks/spine-review';mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3002'],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
let browser;
const results=[];const errors=[];
try{for(let i=0;i<80;i++){await new Promise(r=>setTimeout(r,250));try{await fetch('http://127.0.0.1:3002');break;}catch{}}
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://127.0.0.1:3002/?look=warm',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
 const points=await page.locator('[data-beat]').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {top:r.top+scrollY,height:r.height}}));
 const y=[...points.slice(0,2).flatMap(p=>[p.top+p.height-900*.7,p.top+p.height-900*.25])];
 for(const [i,position]of [...y,...y.toReversed()].entries()){await page.evaluate(y=>scrollTo(0,y),position);await page.waitForTimeout(650);await page.screenshot({path:`${out}/transition-${i}.png`});}
 for(const route of ['/projects/mosslink','/cv','/downloads/ada-mensah-cv.html','/missing-page']){
 const response=await page.goto(`http://127.0.0.1:3002${route}`,{waitUntil:'networkidle'});
 results.push({route,status:response.status(),h1:await page.locator('h1').innerText(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 await page.screenshot({path:`${out}/${route.replaceAll('/','-')}.png`,fullPage:true});
 if(route==='/cv'){const downloadPromise=page.waitForEvent('download');await page.locator('a[download]').click();const download=await downloadPromise;results.push({download:download.suggestedFilename(),failure:await download.failure()});await page.setViewportSize({width:816,height:1056});await page.emulateMedia({media:'print'});await page.screenshot({path:`${out}/cv-print.png`,fullPage:true});await page.emulateMedia({media:'screen'});await page.setViewportSize({width:1440,height:900});}
 }
 await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});
 results.push({sharePreview:await page.locator('meta[property="og:image"]').getAttribute('content'),icon:await page.locator('link[rel="icon"]').getAttribute('href'),publicCanonicalCount:await page.locator('link[rel="canonical"]').count()});
 for(const path of ['/share-preview.png','/icon.svg','/assets/fixture-explanation.svg']){const response=await page.request.get(`http://127.0.0.1:3002${path}`);results.push({asset:path,status:response.status()});}
 await page.setViewportSize({width:390,height:844});
 for(const route of ['/projects/mosslink','/cv','/missing-page']){await page.goto(`http://127.0.0.1:3002${route}`,{waitUntil:'networkidle'});results.push({phoneRoute:route,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});await page.screenshot({path:`${out}/phone${route.replaceAll('/','-')}.png`,fullPage:true});}
 results.push({errors});writeFileSync(`${out}/report.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
 if(errors.length||results.some(r=>r.overflow||r.failure))process.exitCode=1;
}finally{await browser?.close();server.kill('SIGTERM');}
