import { createServer } from 'node:http';
import { chromium } from '/tmp/storyfolio-build-capability-20261011/node_modules/playwright-core/index.mjs';
const server = createServer((req,res) => {res.setHeader('Content-Type','text/html'); res.end('<!doctype html><html lang="en"><title>Local setup check</title><body><h1>Local setup check</h1><p>Neutral browser test.</p></body></html>');});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
let browser;
try {
 browser = await chromium.launch({headless:true,args:['--no-sandbox']});
 const page=await browser.newPage();
 await page.goto(`http://127.0.0.1:${server.address().port}`);
 console.log(JSON.stringify({title:await page.title(),heading:await page.locator('h1').innerText(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
 await page.screenshot({path:'/tmp/storyfolio-neutral-check.png'});
} finally {await browser?.close();server.close();}
