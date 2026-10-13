import sharp from 'sharp';
import {readFileSync} from 'node:fs';
const fixture=await sharp(readFileSync('public/assets/fixture-explanation.svg')).resize(650,415).png().toBuffer();
const text=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f2f0e9"/><g fill="#202932" font-family="sans-serif"><text x="60" y="170" font-size="68" font-weight="700">Ada Mensah</text><text x="60" y="235" font-size="34">Embedded firmware</text><text x="60" y="325" font-size="28">Mosslink</text><text x="60" y="370" font-size="26">Code to physical</text><text x="60" y="408" font-size="26">observation</text></g><text x="60" y="575" font-family="sans-serif" font-size="18" fill="#58636c">Conceptual fixture illustration</text></svg>`);
await sharp(text).composite([{input:fixture,left:520,top:145}]).png().toFile('public/share-preview.png');
