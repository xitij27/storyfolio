import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['--require','./scripts/local-only.cjs','node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','3100'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:'inherit'});
for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:3100');break;}catch{await new Promise(r=>setTimeout(r,300));}}
import { chromium } from 'playwright-core';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader'],env:{...process.env,LD_LIBRARY_PATH:'/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
const results=[];
for(const [name,width,height] of [['desktop',1440,1000],['phone',390,844]]){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const kind of (process.argv.length>2?process.argv.slice(2):['fixture','dial','rack'])){
  await page.goto(`http://127.0.0.1:3100/sketch/${kind}`);await page.waitForSelector('.story[data-scene="on"]');await page.waitForTimeout(2000);
  for(const [i,beat] of ['setup.start','middle.show','close.end'].entries()){
   await page.locator(`[data-beat="${beat}"]`).evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+window.scrollY+innerHeight*.18));await page.waitForTimeout(450);
   await page.screenshot({path:`checks/concepts/${kind}-${name}-${i}.png`});
  }
  results.push({kind,name,scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors:[...errors]});
 }
 await page.close();
}
await browser.close();server.kill('SIGTERM');await writeFile(`checks/concepts/report${process.argv.length>2?'-'+process.argv.slice(2).join('-'):''}.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
