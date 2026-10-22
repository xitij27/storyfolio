import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3000'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe']});
server.stdout.on('data',d=>process.stdout.write(d));
server.stderr.on('data',d=>process.stderr.write(d));
process.on('exit',()=>server.kill());
for(let i=0;i<60;i++){try{await fetch('http://127.0.0.1:3000');break;}catch{await new Promise(r=>setTimeout(r,500));}}
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('checks/concepts',{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--enable-unsafe-swiftshader'],env:{...process.env,LD_LIBRARY_PATH:'/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
const results=[];
for(const [size,viewport] of Object.entries({desktop:{width:1440,height:1000},phone:{width:390,height:844}})){
 const page=await browser.newPage({viewport});
 let errors=[]; page.on('pageerror',e=>errors.push(e.message));
 for(const kind of ['fixture','samples','terminal']){
  errors=[];
  await page.goto(`http://127.0.0.1:3000/sketch/${kind}`,{waitUntil:'networkidle'});
  await page.waitForSelector('[data-scene="on"]',{timeout:30000});
  await page.waitForTimeout(1200);
  for(const chapter of ['opening','middle','close']){
   const top=await page.locator(`#${chapter}`).evaluate(el=>el.offsetTop);
   await page.evaluate(y=>scrollTo(0,y+innerHeight*.15),top);
   await page.waitForTimeout(800);
   await page.screenshot({path:`checks/concepts/${kind}-${size}-${chapter}.png`});
   results.push({kind,size,chapter,scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors:[...errors]});
  }
 }
 await page.close();
}
await writeFile('checks/concepts/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
await browser.close();

server.kill();
