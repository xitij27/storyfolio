import {spawn} from 'node:child_process';
import {access} from 'node:fs/promises';
const env={...process.env,STORYFOLIO_DIST_DIR:'.next-concepts',NEXT_TELEMETRY_DISABLED:'1'};
const run=args=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,['node_modules/next/dist/bin/next',...args],{stdio:'inherit',env});process.once('SIGINT',()=>child.kill('SIGINT'));process.once('SIGTERM',()=>child.kill('SIGTERM'));child.on('error',reject);child.on('close',code=>resolve(code));});
try{await access('.next-concepts/BUILD_ID')}catch{const code=await run(['build']);if(code)process.exit(code);}
process.exitCode=await run(['start','--hostname','127.0.0.1','--port','3000']);
