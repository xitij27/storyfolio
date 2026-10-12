const fs = require('fs/promises');
const path = require('path');
const sharp = require(process.cwd()+'/node_modules/sharp');
(async()=> {
 const root=process.argv[2]; const out=path.join(root,'visual-sheets'); await fs.mkdir(out,{recursive:true});
 const dirs=(await fs.readdir(root,{withFileTypes:true})).filter(d=>d.isDirectory()&&d.name!=='visual-sheets').map(d=>d.name).sort();
 let index=[];
 for(const dir of dirs){
  const files=(await fs.readdir(path.join(root,dir))).filter(f=>f.endsWith('.png')).sort();
  for(let offset=0;offset<files.length;offset+=6){
   const batch=files.slice(offset,offset+6); const tiles=[]; const width=660,height=500;
   for(let i=0;i<batch.length;i++){
    const input=await sharp(path.join(root,dir,batch[i])).resize(width,height-30,{fit:'contain',background:'#dadada'}).png().toBuffer();
    tiles.push({input,top:Math.floor(i/3)*height+30,left:(i%3)*width});
    const label=Buffer.from(`<svg width="660" height="30"><rect width="660" height="30" fill="white"/><text x="12" y="21" font-family="monospace" font-size="15">${dir}/${batch[i]}</text></svg>`);
    tiles.push({input:label,top:Math.floor(i/3)*height,left:(i%3)*width});
   }
   const name=`${dir}-${String(offset/6).padStart(2,'0')}.png`; const target=path.join(out,name);
   await sharp({create:{width:width*3,height:height*Math.ceil(batch.length/3),channels:3,background:'#dadada'}}).composite(tiles).png().toFile(target);
   index.push({sheet:target,sources:batch.map(f=>path.join(root,dir,f))});
  }
 }
 await fs.writeFile(path.join(out,'index.json'),JSON.stringify(index,null,2));console.log(index.map(s=>s.sheet).join('\n'));
})();
