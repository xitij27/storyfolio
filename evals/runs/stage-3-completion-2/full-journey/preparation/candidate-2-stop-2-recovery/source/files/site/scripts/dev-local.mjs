import { spawn } from 'node:child_process';
const env={...process.env,NEXT_TELEMETRY_DISABLED:'1',NEXT_IGNORE_INCORRECT_LOCKFILE:'1',npm_config_offline:'true'};
for(const key of ['HTTP_PROXY','HTTPS_PROXY','ALL_PROXY','http_proxy','https_proxy','all_proxy']) delete env[key];
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','3000'],{env,stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>child.kill(signal));
child.on('exit',code=>{process.exitCode=code??0;});
