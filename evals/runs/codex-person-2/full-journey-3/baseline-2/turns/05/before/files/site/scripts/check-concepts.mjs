import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
const dir = 'checks/concepts';
await mkdir(dir,{recursive:true});
const browser = await chromium.launch({executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader'],env:{...process.env,LD_LIBRARY_PATH:'/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
const report=[];
for(const [size,width,height] of [['desktop',1440,960],['phone',390,844]]){
  for(const id of ['paths','bench','logs']){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:3000/sketch/${id}`); await page.waitForTimeout(2200);
    for(const [beat,fraction] of [['opening',0],['middle',.49],['ending',1]]){
      await page.evaluate(f=>scrollTo(0,f*(document.documentElement.scrollHeight-innerHeight)),fraction);
      await page.waitForTimeout(450);
      await page.screenshot({path:`${dir}/${id}-${size}-${beat}.png`});
    }
    await page.locator('summary').click();
    const opened=await page.locator('details').evaluate(el=>el.open);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    const canvas=await page.locator('canvas').count();
    report.push({id,size,errors,opened,overflow,canvas});
    await page.close();
  }
}
await browser.close(); await writeFile(`${dir}/report.json`,JSON.stringify(report,null,2));
console.log(report);
if(report.some(r=>r.errors.length||!r.opened||r.overflow||!r.canvas)) process.exitCode=1;
