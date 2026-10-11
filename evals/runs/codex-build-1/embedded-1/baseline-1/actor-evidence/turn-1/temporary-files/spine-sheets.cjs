const fs = require('fs'); const path = require('path'); const sharp=require(process.cwd()+'/node_modules/sharp');
(async()=>{const root=process.argv[2]; const target=path.join(root,'visual-review');fs.mkdirSync(target,{recursive:true});
for (const entry of fs.readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory() && x.name!=='visual-review')) {
 const dir=path.join(root,entry.name); const files=fs.readdirSync(dir).filter(f=>f.endsWith('.png'));
 for(let start=0;start<files.length;start+=9) {
 const batch=files.slice(start,start+9), composites=[];
 for(let n=0;n<batch.length;n++) {
 const w=480,h=300,x=(n%3)*w,y=Math.floor(n/3)*(h+24);
 composites.push({input:await sharp(path.join(dir,batch[n])).resize(w,h,{fit:'contain',background:'#d4d4d4'}).toBuffer(),left:x,top:y+24});
 composites.push({input:Buffer.from(`<svg width="480" height="24"><rect width="480" height="24" fill="white"/><text x="8" y="17" font-family="sans-serif" font-size="12">${entry.name} / ${batch[n]}</text></svg>`),left:x,top:y});
 }
 await sharp({create:{width:1440,height:Math.ceil(batch.length/3)*324,channels:3,background:'#ddd'}}).composite(composites).png().toFile(path.join(target,`${entry.name}-${start/9}.png`));
 }
}console.log(target)})()
