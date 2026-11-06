// Final selected-site checks: normal-motion seams, reduced-motion stillness and context-loss fallback.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from '../site/node_modules/playwright-core/index.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=`${root}checks/finish`;
await mkdir(out,{recursive:true});
const origin='http://127.0.0.1:3015';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3015'],{cwd:`${root}site`,stdio:'ignore'});
const report={seams:[],assets:[],reducedStill:false,contextLoss:false,errors:[]};
let browser;
try{
 let ready=false;
 for(let i=0;i<90;i++){try{if((await fetch(origin)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
 assert(ready,'Server unavailable');
 browser=await chromium.launch({executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(origin))report.errors.push(`Unexpected external request: ${r.url()}`);});
 await page.goto(origin);await page.waitForFunction(()=>window.__stitch?.ready);
 for(const [direction,indices] of [['forward',[0,1,2,3,4,5]],['backward',[5,4,3,2,1,0]]]){
  for(const index of indices){
   const at=index+0.7;
   await page.evaluate(at=>window.scrollTo({top:window.__stitch.top()+at*window.__stitch.unit(),behavior:'instant'}),at);
   await page.waitForFunction(at=>Math.abs(window.__stitch.state().s-at)<0.002,at,{timeout:20000});
   assert(await page.evaluate(()=>window.__stitch.sample())>0.005,'Blank transition');
   const file=`${direction}-${index+1}.png`;await page.screenshot({path:`${out}/${file}`});
   report.seams.push({direction,index,at,file});
  }
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.evaluate(()=>window.scrollTo({top:window.__stitch.top()+0.2*window.__stitch.unit(),behavior:'instant'}));
 await page.waitForTimeout(200);
 const first=await page.locator('canvas.gl').screenshot({path:`${out}/still-first.png`});
 await page.waitForTimeout(350);
 const second=await page.locator('canvas.gl').screenshot({path:`${out}/still-second.png`});
 assert(first.equals(second),'Reduced-motion scene moved while stationary');report.reducedStill=true;
 for(const selector of ['meta[property="og:image"]','meta[name="twitter:image"]','link[rel="icon"]']){
  const node=page.locator(selector).first();const value=await node.getAttribute(selector.startsWith('link')?'href':'content');
  const asset=new URL(value,origin);const response=await fetch(new URL(asset.pathname+asset.search,origin));assert(response.ok,'Metadata asset missing');report.assets.push({selector,status:response.status});
 }
 const lost=await page.evaluate(()=>{const c=document.querySelector('canvas.gl');const gl=c.getContext('webgl2')||c.getContext('webgl');const ext=gl?.getExtension('WEBGL_lose_context');if(!ext)return false;ext.loseContext();return true;});
 assert(lost,'Context-loss extension unavailable in this browser');
 await page.locator('.stitch[data-scene="off"]').waitFor();
 const text=await page.locator('.stitch .text').innerText();
 for(const title of ['Data-centre exit','Orders database','The runbook','On-call','ferry','Boring Migrations'])assert(text.includes(title),`Context-loss fallback omits ${title}`);
 assert(text.includes('I plan migrations of running software systems'));
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await page.screenshot({path:`${out}/context-loss.png`,fullPage:true});report.contextLoss=true;
 assert.equal(report.errors.length,0,report.errors.join('\n'));
 console.log('Passed: 12 normal-motion seam captures, reduced-motion stillness, metadata assets, context-loss HTML fallback, no external requests.');
}finally{await browser?.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));}
