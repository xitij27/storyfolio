import {chromium} from 'playwright-core';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try{for(const kind of ['fixture','enclosure','probe'])for(const [size,viewport] of [['desktop',{width:1440,height:900}],['phone',{width:390,height:844}]]){
 const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(`http://127.0.0.1:3000/sketch/${kind}`,{waitUntil:'networkidle'});await page.waitForTimeout(1800);
 for(const [i,id]of ['opening','middle','close'].entries()){
  const y=await page.locator(`#${id}`).evaluate((el)=>el.getBoundingClientRect().top+scrollY+innerHeight*.5);
  await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(900);
  await page.screenshot({path:`checks/concepts/${kind}-${size}-${i}.png`});
 }
 results.push({kind,size,errors,scene:await page.locator('.story').getAttribute('data-scene'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),heading:await page.locator('h1').innerText()});await page.close();
}writeFileSync('checks/concepts/report.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));}finally{await browser.close();}
