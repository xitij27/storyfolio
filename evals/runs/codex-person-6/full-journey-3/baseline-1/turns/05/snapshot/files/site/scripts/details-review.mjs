import {chromium} from 'playwright-core';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:3211',out='../checks/details';
await mkdir(out,{recursive:true});
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3211'],{stdio:['ignore','pipe','pipe']});
server.stdout.on('data',b=>process.stdout.write(b));server.stderr.on('data',b=>process.stderr.write(b));
let browser;const report={errors:[],external:[],dialogs:[],variants:[],cv:false,download:false,print:false,missing:false,metadata:false};
try {
 let ready=false;for(let i=0;i<100;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,300));}assert(ready);
 browser=await chromium.launch({executablePath:'/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell',headless:true,args:['--no-sandbox'],env:{...process.env,XDG_CONFIG_HOME:'/tmp/storyfolio-browser-config',XDG_CACHE_HOME:'/tmp/storyfolio-browser-cache'}});
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 context.on('page',p=>p.on('pageerror',e=>report.errors.push(e.message)));
 await context.route('**/*',r=>{const url=r.request().url();if(!url.startsWith(base)&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push(url);return r.abort();}return r.continue();});
 const page=await context.newPage();await page.goto(base+'/cv');
 const cvText=await page.locator('.cv').innerText();assert(cvText.includes('99.98%'));assert(cvText.includes('26-month')||cvText.includes('26 months'));assert(cvText.includes('Card payment systems.'));assert(cvText.includes('former colleague'));report.cv=true;
 const response=await context.request.get(base+'/cv/download');assert.equal(response.status(),200);assert.match(response.headers()['content-disposition'],/attachment.*dawit-bekele-cv.html/);const html=await response.text();assert(!html.includes('<script'));assert(!html.includes('http'));await writeFile(`${out}/download.html`,html);
 const offline=await context.newPage();await offline.setContent(html);assert.equal(await offline.locator('.cv').innerText(),cvText);await offline.close();report.download=true;
 await page.evaluate(()=>{window.print=()=>{document.body.dataset.printCalled='yes';};});await page.getByRole('button',{name:'Print CV'}).click();assert.equal(await page.locator('body').getAttribute('data-print-called'),'yes');
 await page.screenshot({path:`${out}/cv-desktop.png`,fullPage:true});await page.emulateMedia({media:'print'});assert.equal(await page.locator('.cv-actions').isVisible(),false);await page.screenshot({path:`${out}/cv-print.png`,fullPage:true});await page.pdf({path:`${out}/cv-print.pdf`,preferCSSPageSize:true});report.print=true;await page.emulateMedia({media:'screen'});
 for(const size of [{width:1440,height:900},{width:390,height:844}]){
 await page.setViewportSize(size);await page.goto(base+'/cv');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/cv-${size.width}.png`,fullPage:true});
 const missing=await page.goto(base+'/missing-review-address');assert.equal(missing.status(),404);for(const text of ['Home','Work','Contact','CV'])assert(await page.getByRole('link',{name:text,exact:true}).count());await page.screenshot({path:`${out}/404-${size.width}.png`});report.missing=true;
 await page.goto(base+'/wording');assert.equal(await page.locator('section').count(),3);assert.equal(await page.locator('a[href^="/preview?"]').count(),6);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`${out}/wording-${size.width}.png`,fullPage:true});
 for(const variant of ['a','b','c']){
 await page.goto(`${base}/preview?wording=${variant}#hello`);await page.waitForFunction(()=>document.querySelector('.stitch')?.dataset.scene==='on');await page.waitForTimeout(150);assert((await page.locator('.cap.on .words').innerText()).includes('Dawit Bekele'));await page.screenshot({path:`${out}/${size.width}-${variant}-hello.png`});
 await page.evaluate(()=>{location.hash='contact';});await page.waitForTimeout(150);assert((await page.locator('.cap.on .words').innerText()).includes('2027'));await page.screenshot({path:`${out}/${size.width}-${variant}-contact.png`});report.variants.push({size,variant});
 }
 await page.goto(base+'/#made');await page.waitForFunction(()=>document.querySelector('.stitch')?.dataset.scene==='on');await page.waitForTimeout(150);
 const buttons=page.locator('.cap.on .links button');assert.equal(await buttons.count(),6);
 for(let i=0;i<6;i++){const button=buttons.nth(i),name=await button.innerText();await button.focus();await page.keyboard.press('Enter');assert(await page.locator('dialog').isVisible());assert((await page.locator('dialog').innerText()).includes(name));if(i===0||i===5)await page.screenshot({path:`${out}/dialog-${size.width}-${i}.png`});await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').count(),0);assert(await button.evaluate(el=>el===document.activeElement));report.dialogs.push({size,name});}
 }
 await page.goto(base);const og=await page.locator('meta[property="og:image"]').getAttribute('content');assert(og.endsWith('/share.png'));assert.equal((await context.request.get(base+'/share.png')).status(),200);const icon=await page.locator('link[rel="icon"]').first().getAttribute('href');assert.equal((await context.request.get(new URL(icon,base).href)).status(),200);report.metadata=true;
 assert.equal(report.errors.length,0,JSON.stringify(report.errors));assert.equal(report.external.length,0,JSON.stringify(report.external));console.log(JSON.stringify(report));
}finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser?.close();server.kill('SIGTERM');}
