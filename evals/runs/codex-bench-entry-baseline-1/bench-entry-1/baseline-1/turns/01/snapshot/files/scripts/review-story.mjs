// Focused browser review: real controls and intermediate poses in both directions.
import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { beatRestSamples } from './check-lib.mjs';
const [url,out='checks/interaction-review']=process.argv.slice(2);
await mkdir(out,{recursive:true});
const browser=await chromium.launch({args:['--no-sandbox']});
const results=[];
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(url);await page.waitForSelector('.story[data-scene="on"] canvas');await page.waitForTimeout(1500);
  await page.keyboard.press('Tab');
  if(await page.locator('#story-skip').evaluate(n=>n!==document.activeElement))throw Error('Skip link not first keyboard target');
  await page.keyboard.press('Enter');await page.waitForTimeout(700);
  if(!page.url().endsWith('#chapter-scope'))throw Error('Skip target failed');
  results.push('Keyboard skip reaches the actual final chapter');
  await page.locator('.return-link').click();await page.waitForTimeout(700);
  if(!page.url().endsWith('#chapter-question'))throw Error('Return pointer route failed');
  const buttons=page.locator('.story-look-switch button');
  await buttons.nth(1).click();await page.waitForTimeout(500);
  if(await page.locator('.story').getAttribute('data-look')!=='dark')throw Error('Pointer appearance switch failed');
  await buttons.nth(0).focus();await page.keyboard.press('Enter');await page.waitForTimeout(500);
  if(await page.locator('.story').getAttribute('data-look')!=='light')throw Error('Keyboard appearance switch failed');
  results.push('Appearance switch responds to pointer and keyboard');
  const rail=page.locator('.story-rail a');
  await rail.nth(2).click();await page.waitForTimeout(500);
  if(!page.url().endsWith('#chapter-bench'))throw Error('Pointer rail failed');
  await rail.nth(1).focus();await page.keyboard.press('Enter');await page.waitForTimeout(500);
  if(!page.url().endsWith('#chapter-scheduling'))throw Error('Keyboard rail failed');
  results.push('Chapter navigation responds to pointer and keyboard');
  for(const [label,width,height] of [['wide',1440,900],['phone',390,844],['short-height',1280,500]]) {
    await page.setViewportSize({width,height});await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(500);
    const boxes=await page.locator('[data-beat]').evaluateAll(nodes=>nodes.map(n=>({top:n.getBoundingClientRect().top+scrollY,height:n.getBoundingClientRect().height})));
    const rests=beatRestSamples(boxes,height,['start','end']);
    const positions=[];
    for(let i=0;i<rests.length-1;i++) {
      const a=rests[i][1].top,b=rests[i+1][0].top;
      for(const fraction of [.25,.5,.75])positions.push({top:a+(b-a)*fraction,name:`${i}-${fraction}`});
    }
    for(const [direction,items] of [['forward',positions],['reverse',[...positions].reverse()]]) {
      for(const {top,name} of items) {
        await page.evaluate(y=>window.scrollTo(0,y),top);await page.waitForTimeout(450);
        await page.screenshot({path:`${out}/${label}-${direction}-${name}.png`});
      }
    }
    results.push(`${label}: captured 3 intermediate positions per transition in both scroll directions`);
  }
  await writeFile(`${out}/report.json`,JSON.stringify({passed:true,results,limitations:['Software viewports, not physical phone testing. Screenshots require visual inspection.']},null,2));
} finally {await browser.close();}
