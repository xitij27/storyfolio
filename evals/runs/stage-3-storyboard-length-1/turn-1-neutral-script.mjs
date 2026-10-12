import { chromium } from '/tmp/storyfolio-engine-acceptance-20261011/node_modules/playwright-core/index.mjs';
import { createServer } from 'node:http';
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end('<!doctype html><html lang="en"><title>Local runtime check</title><body><h1>Local runtime check</h1><p>Browser ready.</p></body></html>');});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try { const page=await browser.newPage(); await page.goto(`http://127.0.0.1:${server.address().port}`); console.log(JSON.stringify({title:await page.title(),heading:await page.locator('h1').innerText(),body:await page.locator('body').innerText()})); await page.screenshot({path:'/tmp/storyfolio-neutral-check.png'}); } finally {await browser.close();server.close();}
