import {chromium} from 'playwright-core';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {wording,illustrationNote} from '../content/wording.ts';
const base='http://127.0.0.1:3212',out='../checks/finish';
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3212'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',b=>process.stdout.write(b));server.stderr.on('data',b=>process.stderr.write(b));
const report={errors:[],external:[],sizes:[],shots:[],wording:false,reducedStill:false,navigation:false,normalMotion:false,userReview:'Pending; no real-device user review recorded'};
let browser;
try {
 let ready=false;for(let i=0;i<100;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,300));}assert(ready);
 browser=await chromium.launch({executablePath:process.env.CHROMIUM??'/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox'],env:{...process.env,XDG_CONFIG_HOME:'/tmp/storyfolio-browser-config',XDG_CACHE_HOME:'/tmp/storyfolio-browser-cache'}});
 for(const size of [{width:1440,height:900},{width:390,height:844},{width:1024,height:600}]) {
 const page=await browser.newPage({viewport:size,reducedMotion:'reduce'});page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('**/*',r=>{const u=r.request().url();if(!u.startsWith(base)&&!u.startsWith('data:')&&!u.startsWith('blob:')){report.external.push(u);return r.abort();}return r.continue();});
 await page.goto(base);await page.waitForFunction(()=>window.__stitch?.ready&&document.querySelector('.stitch')?.dataset.scene==='on');
 assert.equal(await page.locator('.cap.on .words p').innerText(),`${wording.a.hello} ${illustrationNote}`);
 assert.equal(await page.locator('.stitch').evaluate(el=>getComputedStyle(el).getPropertyValue('--st-bg').trim()),'#0e2236');
 assert.equal(await page.evaluate(()=>window.__stitch.mix),'sheet,sheet,sheet,sheet,sheet,sheet,sheet,sheet');report.wording=true;
 const snap=async (point,name)=>{
 await page.evaluate(p=>scrollTo(0,window.__stitch.top()+p*window.__stitch.unit()),point);await page.waitForTimeout(160);
 assert(await page.evaluate(()=>window.__stitch.sample()>.02),'Blank scene at '+name);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow');
 const file=`${size.width}-${name}.png`;await page.screenshot({path:`${out}/${file}`});report.shots.push(file);
 };
 const keys=['hello','from','studied','worked','good','made','contact'];
 for(let i=0;i<keys.length;i++)await snap(i+.2,keys[i]);
 assert.equal(await page.locator('.cap.on .words p').innerText(),wording.a.contact);
 await snap(0,'reduced-still');const before=await page.locator('canvas.gl').screenshot();await page.waitForTimeout(500);const after=await page.locator('canvas.gl').screenshot();assert(before.equals(after),'Reduced-motion scene changed while stationary');report.reducedStill=true;
 for(const [direction,indices] of [['forward',[0,1,2,3,4,5]],['backward',[5,4,3,2,1,0]]])for(const i of indices)await snap(i+.7,`${direction}-${i}-.7`);
 if(size.width===1440)for(const [direction,indices] of [['forward',[0,1,2,3,4,5]],['backward',[5,4,3,2,1,0]]])for(const i of indices)for(const t of [.5,.9])await snap(i+t,`${direction}-${i}-${t}`);
 // Phone-wide scenes reveal different parts across the hold; inspect both ends too.
 if(size.width===390)for(const i of [2,3,4,5])for(const t of [.05,.35])await snap(i+t,`pan-${i}-${t}`);
 await page.goto(base);await page.waitForFunction(()=>window.__stitch?.ready);await page.getByRole('navigation',{name:'Main',exact:true}).getByRole('link',{name:'Work',exact:true}).click();await page.waitForTimeout(200);assert.equal(new URL(page.url()).hash,'#made');await page.goBack();await page.waitForTimeout(200);assert((await page.locator('.cap.on h2').innerText())==='Hello');await page.goForward();await page.waitForTimeout(200);assert.equal(new URL(page.url()).hash,'#made');assert((await page.locator('.cap.on h2').innerText())==="What I've made");report.navigation=true;
 report.sizes.push(size);await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});page.on('pageerror',e=>report.errors.push(e.message));await page.goto(base);await page.waitForFunction(()=>window.__stitch?.ready);await page.evaluate(()=>scrollTo(0,1.2*window.__stitch.unit()));await page.waitForFunction(()=>window.__stitch.state().s>1.15,{},{timeout:30000});await page.evaluate(()=>scrollTo(0,0));await page.waitForFunction(()=>window.__stitch.state().s<.02,{},{timeout:30000});report.normalMotion=true;await page.close();
 assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.external.length,0,JSON.stringify(report.external));console.log(JSON.stringify({shots:report.shots.length,sizes:report.sizes,wording:report.wording,reducedStill:report.reducedStill,navigation:report.navigation,normalMotion:report.normalMotion,errors:report.errors,external:report.external}));
}finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser?.close();server.kill('SIGTERM');}
