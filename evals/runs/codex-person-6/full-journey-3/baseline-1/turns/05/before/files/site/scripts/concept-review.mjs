import { chromium } from 'playwright-core';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3100'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',b=>process.stdout.write(b));server.stderr.on('data',b=>process.stderr.write(b));
let browser;
try {
 for(let i=0;i<100;i++){try{const r=await fetch('http://127.0.0.1:3100');if(r.ok)break;}catch{}await new Promise(r=>setTimeout(r,300));}
 browser=await chromium.launch({executablePath:'/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox'],env:{...process.env,XDG_CONFIG_HOME:'/tmp/storyfolio-browser-config',XDG_CACHE_HOME:'/tmp/storyfolio-browser-cache'}});
 await mkdir('../checks/concept',{recursive:true});
 for(const size of [{width:1440,height:900},{width:390,height:844}]){
 const page=await browser.newPage({viewport:size,reducedMotion:'reduce'}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3100');await page.waitForFunction(()=>document.querySelector('.stitch')?.dataset.scene==='on',{timeout:30000});
 for(const key of ['hello','from','studied','worked','good','made','contact']){await page.goto(`http://127.0.0.1:3100/#${key}`);await page.waitForTimeout(1200);await page.screenshot({path:`../checks/concept/${size.width}-${key}.png`});}
 console.log(JSON.stringify({size,errors,title:await page.title(),scene:await page.locator('.stitch').getAttribute('data-scene')}));await page.close();
 }
}finally{await browser?.close();server.kill('SIGTERM');}
