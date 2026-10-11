// Supplemental local production diagnostics. Launch and browser share a process tree.
import { spawn } from 'node:child_process';
import { mkdir,writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { chromium } from 'playwright-core';
const probeServer=createServer();
await new Promise(ok=>probeServer.listen(0,'127.0.0.1',ok));
const port=probeServer.address().port;
await new Promise(ok=>probeServer.close(ok));
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:'ignore'});
const url=`http://127.0.0.1:${port}/`;
let browser;
try {
 for(let attempt=0;attempt<100;attempt++) {try{if((await fetch(url)).ok)break;}catch{} await new Promise(ok=>setTimeout(ok,100));}
 for(const [name,flags] of [
  ['ultra-short',['--size=1280x480','--expect-scene=on']],
  ['phone-reduced',['--size=390x844','--touch','--reduced-motion','--expect-scene=on','--assert-still=300']],
  ['phone-no-js',['--size=390x844','--touch','--no-js','--hidden=canvas']],
 ]) {
  const out=`checks/prototype-extra/${name}`;
  await mkdir(out,{recursive:true});
  const child=spawn(process.execPath,['scripts/shoot.mjs',`--url=${url}`,`--out=${out}`,`--report=${out}/report.json`,'--beats','--expect-beats=5','--expect-ids=question,scheduling,bench,evidence,scope',...flags],{stdio:'inherit'});
  const code=await new Promise(ok=>child.on('exit',ok));
  if(code!==0)throw new Error(`${name} failed (${code})`);
 }
 browser=await chromium.launch({args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(url,{waitUntil:'networkidle'});
 await page.keyboard.press('Tab');
 const focused=await page.locator(':focus').getAttribute('href');
 if(focused!=='#chapter-scope')throw new Error(`Skip focus: ${focused}`);
 await page.keyboard.press('Enter');
 await page.waitForTimeout(500);
 if(!page.url().endsWith('#chapter-scope'))throw new Error('Skip keyboard navigation failed');
 await page.locator('.bench-return').focus(); await page.keyboard.press('Enter');
 if(!page.url().endsWith('#chapter-question'))throw new Error('Return keyboard navigation failed');
 await page.locator('.story-rail a[href="#chapter-bench"]').focus(); await page.keyboard.press('Enter');
 if(!page.url().endsWith('#chapter-bench'))throw new Error('Rail keyboard navigation failed');
 await writeFile('checks/prototype-extra/keyboard.json',JSON.stringify({passed:true,checks:['Tab reaches skip','Enter activates skip','Enter activates return','Enter activates chapter rail'],physicalPhone:false},null,2)+'\n');
} finally {if(browser)await browser.close();server.kill('SIGTERM');}
