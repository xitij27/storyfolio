import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1'],{env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','inherit','inherit']});
try{let ready=false;for(let i=0;i<60;i++){try{const r=await fetch('http://127.0.0.1:3000');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,500));}if(!ready)throw Error('No preview server');await import('./check-concepts.mjs');}finally{server.kill('SIGTERM');}
