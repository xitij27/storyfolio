// Local screenshot contact sheets for visual review; does not alter the site.
import { chromium } from 'playwright-core';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const run=resolve(process.argv[2]);
const browser=await chromium.launch({args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1600,height:1000}});
await mkdir(`${run}/visual-sheets`,{recursive:true});
for(const dir of await readdir(run,{withFileTypes:true})) {
 if(!dir.isDirectory() || dir.name==='visual-sheets')continue;
 const files=(await readdir(`${run}/${dir.name}`)).filter(f=>f.endsWith('.png')).sort();
 if(!files.length)continue;
 let html='<style>body{margin:0;background:#ddd;font:12px monospace}main{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px}figure{margin:0;background:white;padding:4px}img{width:100%;height:330px;object-fit:contain}figcaption{padding:5px}</style><main>';
 for(const file of files)html+=`<figure><img src="data:image/png;base64,${(await readFile(`${run}/${dir.name}/${file}`)).toString('base64')}"><figcaption>${dir.name}/${file}</figcaption></figure>`;
 await page.setContent(html+'</main>');
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 await page.screenshot({path:`${run}/visual-sheets/${dir.name}.png`,fullPage:true});
}
await browser.close();
