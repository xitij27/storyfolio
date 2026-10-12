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
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await page.waitForTimeout(2000);
 const boxes=await page.locator('[data-beat]').evaluateAll(els=>els.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.getBoundingClientRect().height})));
 const poses=beatRestSamples(boxes,900,['start','mid','end'])[1];
 for(const pos of poses){
 await page.evaluate(y=>scrollTo(0,y),pos.top);await page.waitForTimeout(1000);
 report.screenshots.push(await page.evaluate(()=>({scroll:scrollY,canvas:document.querySelector('canvas').getBoundingClientRect().toJSON(),scene:document.querySelector('.story-scene').getBoundingClientRect().toJSON(),style:getComputedStyle(document.querySelector('canvas')).cssText})));
 await page.screenshot({path:`${out}/schedule-${pos.position}.png`});
 const canvas=page.locator('canvas');await canvas.screenshot({path:`${out}/canvas-${pos.position}.png`});
 report.screenshots.push({afterCanvas:await page.evaluate(()=>scrollY)});
 }
 report.scene=await page.locator('.story').getAttribute('data-scene');
 await writeFile(`${out}/report.json`,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report));
 if(report.errors.length||report.overflow||report.scene!=='on')process.exitCode=1;
} finally {await browser.close();server.kill();}
