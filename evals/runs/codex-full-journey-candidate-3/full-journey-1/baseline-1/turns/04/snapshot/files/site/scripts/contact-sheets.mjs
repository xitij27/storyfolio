import sharp from 'sharp';
import {readdirSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
const root=process.argv[2];if(!root)throw new Error('Pass screenshot output directory');
const target=join(root,'visual-review');mkdirSync(target,{recursive:true});
for(const entry of readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()&&x.name!=='visual-review')){
 const dir=join(root,entry.name);const files=readdirSync(dir).filter(x=>x.endsWith('.png')).sort();if(!files.length)continue;
 for(let start=0;start<files.length;start+=9){const group=files.slice(start,start+9);const composite=[];
 for(const[fileIndex,file]of group.entries()){const input=await sharp(join(dir,file)).resize({width:580,height:420,fit:'inside'}).png().toBuffer();const x=(fileIndex%3)*600,y=Math.floor(fileIndex/3)*450;composite.push({input,left:x,top:y+25});const label=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="580" height="22"><text x="5" y="16" font-size="12" font-family="sans-serif">${entry.name}/${file}</text></svg>`);composite.push({input:label,left:x,top:y});}
 await sharp({create:{width:1800,height:Math.ceil(group.length/3)*450,channels:3,background:'#ffffff'}}).composite(composite).png().toFile(join(target,`${entry.name}-${start/9}.png`));
 }
}
