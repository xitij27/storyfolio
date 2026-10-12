import {spawn} from "node:child_process";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","dev","--webpack","--hostname","127.0.0.1","--port","3001"],{env:{...process.env,NEXT_TELEMETRY_DISABLED:"1",NEXT_IGNORE_INCORRECT_LOCKFILE:"1"},stdio:"inherit"});
await new Promise(resolve=>setTimeout(resolve,2500));
import { chromium } from 'playwright-core';
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader']});
const report=[];
try{for(const id of ['fixture','states','lead']){for(const [size,width,height] of [['desktop',1440,960],['phone',390,844]]){
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:3001/sketch/${id}`);await page.waitForTimeout(1800);
 for(const chapter of ['opening','middle','close']){await page.locator(`#${chapter}`).evaluate(el=>window.scrollTo(0,el.offsetTop+Math.max(0,el.offsetHeight-innerHeight)*.6));await page.waitForTimeout(450);await page.screenshot({path:`checks/concepts/${id}-${size}-${chapter}.png`});}
 report.push({id,size,scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors});await page.close();
}}}finally{await browser.close();server.kill();}console.log(JSON.stringify(report,null,2));
