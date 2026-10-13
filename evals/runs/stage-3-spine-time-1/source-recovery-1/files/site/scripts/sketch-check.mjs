import {spawn} from 'node:child_process';
import {chromium} from 'playwright-core';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3000'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1',STORYFOLIO_DIST_DIR:'.next-concepts'}});
server.stdout.on('data',()=>{});server.stderr.on('data',c=>process.stderr.write(c));
process.on('exit',()=>server.kill());
for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:3000')).ok)break;}catch{}await new Promise(r=>setTimeout(r,300));}
const out='checks/concepts'; await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',args:['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'],env:{...process.env,LD_LIBRARY_PATH:'/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
const results=process.argv.includes("--fallbacks")?JSON.parse(await readFile(`${out}/report.json`,"utf8")):[];
for(const [size,viewport] of (process.argv.includes('--fallbacks')?[]:[['desktop',{width:1440,height:960}],['phone',{width:390,height:844}]])){
 const context=await browser.newContext({viewport,deviceScaleFactor:1});
 for(const kind of ['fixture','sensor','loom']){
  const page=await context.newPage(); const errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:3000')&&!r.url().startsWith('data:'))external.push(r.url())});
  const response=await page.goto(`http://127.0.0.1:3000/sketch/${kind}`);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1200);
  for(const [i,beat] of ['opening.object','middle.observe','close.evidence'].entries()){
   const scroll=await page.locator(`[data-beat="${beat}"]`).evaluate(el=>{const r=el.getBoundingClientRect();return r.top+window.scrollY+(i=>i===0?0:window.innerHeight*.2)(el.dataset.beat.startsWith('opening')?0:1)});
   await page.evaluate(y=>window.scrollTo(0,y),scroll);await page.waitForTimeout(800);await page.screenshot({path:`${out}/${kind}-${size}-${i}.png`});
  }
  results.push({kind,size,status:response.status(),scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors,external});await page.close();
 }
 await context.close();
}
for(const mode of ['no-js','no-webgl','reduced-motion']){
 const context=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
 if(mode==='no-webgl')await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'||type==='webgl2'?null:original.call(this,type,...args)};});
 for(const kind of ['fixture','sensor','loom']){
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:3000/sketch/${kind}`);await page.waitForTimeout(700);
  const text=await page.locator('main').innerText();
  results.push({kind,mode,scene:await page.locator('.story').getAttribute('data-scene'),hasName:text.includes('Ada Mensah'),hasEvidence:text.includes('72'),hasContact:text.includes('ada@example.com'),headings:await page.locator('h1').count(),errors});
  await page.screenshot({path:`${out}/${kind}-${mode}.png`,fullPage:mode!=='reduced-motion'});await page.close();
 }
 await context.close();
}
const cvContext=await browser.newContext({acceptDownloads:true});const cvPage=await cvContext.newPage();await cvPage.goto('http://127.0.0.1:3000/sketch/fixture');const downloadPromise=cvPage.waitForEvent('download');await cvPage.locator('a[download]').click();const download=await downloadPromise;await download.saveAs(`${out}/downloaded-cv.html`);results.push({cvDownload:download.suggestedFilename()});await cvPage.goto('http://127.0.0.1:3000/cv.html');await cvPage.emulateMedia({media:'print'});await cvPage.screenshot({path:`${out}/cv-print.png`,fullPage:true});await cvContext.close();
await browser.close(); server.kill(); await writeFile(`${out}/report.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
