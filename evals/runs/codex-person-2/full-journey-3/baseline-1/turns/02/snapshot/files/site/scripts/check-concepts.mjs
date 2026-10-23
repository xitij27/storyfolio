import {chromium} from 'playwright-core';
import {mkdir,writeFile} from 'node:fs/promises';
const output='checks/concepts';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',env:{...process.env,LD_LIBRARY_PATH:'/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu'},args:['--no-sandbox','--enable-unsafe-swiftshader']});
const results=[];
for(const [size,viewport] of Object.entries({desktop:{width:1440,height:1000},phone:{width:390,height:844}})){
const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
for(const concept of ['route','bench','runbook']){
 await page.goto(`http://127.0.0.1:3000/sketch/${concept}`);await page.waitForSelector('[data-scene="on"]');await page.waitForTimeout(2500);
 for(const [index,beat] of ['opening.one','middle.one','close.one'].entries()){
  await page.locator(`[data-beat="${beat}"]`).evaluate(e=>window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY+(e.clientHeight-window.innerHeight)*.5));await page.waitForTimeout(1500);
  if(index===1){await page.getByRole('button',{name:'Run cutover',exact:true}).click();await page.waitForTimeout(400);if(!await page.getByRole('button',{name:'Rehearse rollback',exact:true}).isVisible())throw Error('Cutover control failed');await page.getByRole('button',{name:'Rehearse rollback',exact:true}).click();await page.waitForTimeout(400);}
  await page.screenshot({path:`${output}/${concept}-${size}-${index}.png`});
  results.push({concept,size,beat,scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors:[...errors]});
 }
}
await context.close();}
await browser.close();await writeFile(`${output}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));if(results.some(r=>r.overflow||r.errors.length))process.exitCode=1;
