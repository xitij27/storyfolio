import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','3000'],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1',NEXT_IGNORE_INCORRECT_LOCKFILE:'1'}});
try{for(let i=0;i<80;i++){await new Promise(r=>setTimeout(r,250));try{await fetch('http://127.0.0.1:3000');break;}catch{}}
 const check=spawn(process.execPath,['scripts/check-concepts.mjs'],{stdio:'inherit'});const code=await new Promise(r=>check.on('exit',r));process.exitCode=code;
}finally{server.kill('SIGTERM');}
