// Supplemental local inspection: both scroll directions, short height and anchor access.
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { beatRestSamples } from './check-lib.mjs';
const out=process.argv[2] ?? 'checks/prototype-review';
await mkdir(out,{recursive:true});
const socket=createServer();await new Promise(ok=>socket.listen(0,'127.0.0.1',ok));const port=socket.address().port;await new Promise(ok=>socket.close(ok));
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'ignore'});
const browser=await chromium.launch({args:['--no-sandbox']});
const report={screenshots:[],errors:[],keyboard:[],limitations:'Viewport emulation, not physical device testing.'};
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 page.on('pageerror',e=>report.errors.push(e.message));
 const url=`http://127.0.0.1:${port}/`;
 for(let i=0;i<80;i++){try{if((await fetch(url)).ok)break;}catch{}await new Promise(ok=>setTimeout(ok,100));}
 await page.goto(url);await page.waitForTimeout(2200);
 await page.keyboard.press('Tab');
 report.keyboard.push(await page.locator('#story-skip').evaluate(el=>({id:el.id,focused:document.activeElement===el,text:el.textContent,href:el.getAttribute('href'),outline:getComputedStyle(el).outlineStyle,top:el.getBoundingClientRect().top})));
 await page.keyboard.press('Enter');await page.waitForTimeout(800);
 report.skipTarget=await page.evaluate(()=>({hash:location.hash,top:document.querySelector('#chapter-scope').getBoundingClientRect().top}));
 for(let i=0;i<5;i++){
 const link=page.locator('.story-rail a').nth(i);await link.click();
 report.keyboard.push({pointerChapter:i,hash:await page.evaluate(()=>location.hash)});
 await link.focus();await page.keyboard.press('Enter');
 report.keyboard.push({keyboardChapter:i,hash:await page.evaluate(()=>location.hash)});
 }
 const boxes=await page.locator('[data-beat]').evaluateAll(els=>els.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height})));
 const samples=beatRestSamples(boxes,900,['start','end']);
 const positions=[];
 for(let i=0;i<4;i++)for(const t of [0.5])positions.push({name:`${i}-${i+1}-${t}`,top:samples[i][1].top+(samples[i+1][0].top-samples[i][1].top)*t});
 for(const direction of ['forward','reverse']){
 const list=direction==='forward'?positions:[...positions].reverse();
 for(const pos of list){await page.evaluate(y=>scrollTo(0,y),pos.top);await page.waitForTimeout(800);const file=`${direction}-${pos.name}.png`;await page.screenshot({path:`${out}/${file}`});report.screenshots.push(file);}
 }
 await page.setViewportSize({width:1280,height:480});await page.waitForTimeout(500);
 const smallBoxes=await page.locator('[data-beat]').evaluateAll(els=>els.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height})));
 for(const [i,s] of beatRestSamples(smallBoxes,480,['end']).entries()){
 await page.evaluate(y=>scrollTo(0,y),s[0].top);await page.waitForTimeout(800);
 const file=`short-480-${i}.png`;await page.screenshot({path:`${out}/${file}`});report.screenshots.push(file);
 }
 report.scene=await page.locator('.story').getAttribute('data-scene');
 report.overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await page.waitForTimeout(1500);
 for(const [i,s] of beatRestSamples(await page.locator('[data-beat]').evaluateAll(els=>els.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height}))),844,['end']).entries()){
 await page.evaluate(y=>scrollTo(0,y),s[0].top);await page.waitForTimeout(600);const file=`reduced-phone-${i}.png`;await page.screenshot({path:`${out}/${file}`});report.screenshots.push(file);
 }
 await writeFile(`${out}/report.json`,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report));
 if(report.errors.length||report.overflow||report.scene!=='on'||!report.keyboard[0].focused||report.skipTarget.hash!=='#chapter-scope')process.exitCode=1;
} finally {await browser.close();server.kill();}
