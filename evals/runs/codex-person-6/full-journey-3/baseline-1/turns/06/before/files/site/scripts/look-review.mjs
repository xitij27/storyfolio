import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:3210';
const out='../checks/looks';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3210'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',b=>process.stdout.write(b));server.stderr.on('data',b=>process.stderr.write(b));
let browser;
const report={errors:[],external:[],shots:[],previews:[]};
await mkdir(out,{recursive:true});
try {
 let ready=false;
 for(let i=0;i<100;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{} await new Promise(r=>setTimeout(r,300));}
 assert(ready,'Local production server did not start');
 browser=await chromium.launch({executablePath:process.env.CHROMIUM??'/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox'],env:{...process.env,XDG_CONFIG_HOME:'/tmp/storyfolio-browser-config',XDG_CACHE_HOME:'/tmp/storyfolio-browser-cache'}});
 for(const size of [{width:1440,height:900},{width:390,height:844},{width:1024,height:600}]){
 const page=await browser.newPage({viewport:size,reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('**/*',route=>{const url=route.request().url();if(!url.startsWith(base)&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push(url);return route.abort();}return route.continue();});
 await page.goto(base+'/review');assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('a[href^="/preview?"]').count(),10);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Comparison page overflows');
 await page.screenshot({path:`${out}/${size.width}-comparison.png`,fullPage:true});
 const keys=['hello','from','studied','worked','good','made','contact'];
 for(const look of ['night','daylight','blueprint']){
 await page.goto(`${base}/preview?look=${look}&move=slide`);await page.waitForFunction(()=>document.querySelector('.stitch')?.dataset.scene==='on');
 for(let i=0;i<keys.length;i++){
 await page.evaluate(key=>{location.hash=key;},keys[i]);await page.waitForTimeout(160);
 const path=`${size.width}-${look}-${keys[i]}.png`;await page.screenshot({path:`${out}/${path}`});report.shots.push(path);
 }
 report.previews.push({size,look,scene:await page.locator('.stitch').getAttribute('data-scene')});
 }
 await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 for(const move of ['slide','fold','swing']){
 await page.goto(`${base}/preview?look=blueprint&move=${move}`);await page.waitForFunction(()=>document.querySelector('.stitch')?.dataset.scene==='on');
 for(const [direction,points] of [['forward',[.7,2.7,4.7]],['backward',[4.7,2.7,.7]]]){
 for(const point of points){await page.evaluate(p=>scrollTo(0,p*Math.max(innerHeight*1.9,1000)),point);await page.waitForTimeout(150);const path=`move-${move}-${direction}-${point}.png`;await page.screenshot({path:`${out}/${path}`});report.shots.push(path);}
 }
 }
 await page.close();
 assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.external.length,0,JSON.stringify(report.external));
 console.log(JSON.stringify({previews:report.previews.length,shots:report.shots.length,errors:report.errors,external:report.external}));
}finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser?.close();server.kill('SIGTERM');}
