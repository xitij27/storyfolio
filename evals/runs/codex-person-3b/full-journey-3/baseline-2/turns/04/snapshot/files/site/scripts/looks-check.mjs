#!/usr/bin/env node
// Run after npm run build. Checks each complete appearance, both scroll
// directions through the book joins, appearance switching and text access.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const out = resolve(root, `checks/looks/${new Date().toISOString().replace(/[:.]/g, "-")}`);
mkdirSync(out, {recursive:true});
const report = { runs:[], interactions:[], problems:[] };
const socket = createServer();
await new Promise(r=>socket.listen(0,"127.0.0.1",r));
const port = socket.address().port;
await new Promise(r=>socket.close(r));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath,[require.resolve("next/dist/bin/next"),"start","--hostname","127.0.0.1","--port",String(port)],{cwd:root,detached:true,stdio:"ignore",env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
const args = ["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"];
let browser;
try {
  for(let n=0;;n++) {
    try { if((await fetch(base)).ok) break; } catch { /* starting */ }
    if(n>100) throw new Error("Local production server did not start");
    await new Promise(r=>setTimeout(r,150));
  }
  for(const look of ["night","daylight","blueprint"]) {
    for(const size of ["1440x900","390x844"]) {
      console.log(`Whole story: ${look}, ${size}`);
      const result = await new Promise(done=>{
        const child = spawn(process.execPath,[join(root,"scripts/stitch-check.mjs"),`--url=${base}`,`--look=${look}`,`--size=${size}`,"--words",`--out=${join(out,`${look}-${size}`)}`],{cwd:root,stdio:["ignore","pipe","pipe"]});
        let log="";child.stdout.on("data",c=>log+=c);child.stderr.on("data",c=>log+=c);
        child.on("close",code=>done({look,size,code,log}));
      });
      report.runs.push(result);
      if(result.code!==0) report.problems.push(`${look}/${size}: ${result.log}`);
    }
  }
  browser=await chromium.launch({args});
  const context=await browser.newContext({viewport:{width:1000,height:600},reducedMotion:"reduce"});
  const page=await context.newPage();
  page.on("pageerror",e=>report.problems.push(e.message));
  await page.goto(`${base}/preview?look=night&keep=local#worked`);
  await page.waitForFunction(()=>window.__stitch?.ready);
  for(const at of [2.1,2.5,2.9,3.2,3.5,3.9,4.1,3.9,3.5,3.2,2.9,2.5,2.1]) {
    await page.evaluate(s=>window.scrollTo({top:window.__stitch.top()+s*window.__stitch.unit(),behavior:"instant"}),at);
    await page.waitForTimeout(180);
    await page.screenshot({path:join(out,`short-${report.interactions.length}-${at}.png`)});
    report.interactions.push({reverseBookJoin:at});
  }
  const before=await page.evaluate(()=>scrollY);
  await page.getByRole("navigation",{name:"Compare appearances"}).getByRole("link",{name:"Daylight",exact:true}).click();
  await page.waitForURL("**/preview?*look=daylight*");
  await page.waitForFunction(()=>document.querySelector('[data-look="daylight"]') && window.__stitch?.ready);
  const after=await page.evaluate(()=>({y:scrollY,search:location.search,hash:location.hash}));
  if(Math.abs(before-after.y)>4 || !after.search.includes("keep=local") || after.hash!=="#worked") report.problems.push(`Appearance switch lost position/query/fragment: ${JSON.stringify({before,after})}`);
  report.interactions.push({appearanceSwitch:{before,after}});
  await page.getByRole("navigation",{name:"Main navigation"}).getByRole("link",{name:"Work",exact:true}).click();
  await page.waitForFunction(()=>window.__stitch.state().from===5);
  await page.getByRole("navigation",{name:"Main navigation"}).getByRole("link",{name:"Contact",exact:true}).click();
  await page.waitForFunction(()=>window.__stitch.state().from===6);
  const overlap=await page.evaluate(()=>{
    const a=document.querySelector('.stitch .cap').getBoundingClientRect();const b=document.querySelector('.stitch .cta').getBoundingClientRect();
    return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  });
  if(overlap)report.problems.push("Contact caption overlaps its CTA on a short screen");
  report.interactions.push({namedNavigation:true,contactOverlap:overlap});
  await page.getByRole("link",{name:"Text view",exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('.stitch[data-scene="off"]'));
  if(!await page.locator('.stitch .text').isVisible())report.problems.push("Text view is not visible");
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const plain=await noJS.newPage();
  await plain.goto(`${base}/preview?look=daylight`);
  if(!await plain.locator('.stitch .text').isVisible())report.problems.push("Preview is blank without JavaScript");
  await plain.screenshot({path:join(out,"preview-no-javascript.png"),fullPage:true});
  await plain.getByRole("navigation",{name:"Main navigation"}).getByRole("link",{name:"Work",exact:true}).click();
  if(!new URL(plain.url()).hash.includes("made"))report.problems.push("No-JavaScript work anchor failed");
  report.interactions.push({previewNoJavaScript:true});
} catch(error) { report.problems.push(error.stack??String(error)); }
finally {if(browser)await browser.close();server.kill("SIGTERM");writeFileSync(join(out,"report.json"),JSON.stringify(report,null,2));}
console.log(`${report.problems.length ? "FAILED" : "Passed"}: ${report.problems.length} problems. ${out}`);
for(const problem of report.problems)console.error(problem);
process.exitCode=report.problems.length?1:0;
