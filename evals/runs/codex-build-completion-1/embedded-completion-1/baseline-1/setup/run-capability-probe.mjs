import { spawn } from "node:child_process";
import { readFile, writeFile, cp } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const setup=dirname(fileURLToPath(import.meta.url));
const meta=JSON.parse(await readFile(join(setup,"../meta.json"),"utf8"));
const capabilities=JSON.parse(await readFile(join(meta.inputs,"capabilities.json"),"utf8"));
const args=["sandbox"];
for(let i=0;i<capabilities.argv.length;i++) if(capabilities.argv[i]==="-c") args.push("-c",capabilities.argv[++i]);
const out=join(meta.work,"checks/setup-capability");
args.push("--",process.execPath,join(meta.inputs,"implementation/evals/probe-build-environment.mjs"),`--workspace=${meta.work}`,`--out=${out}`);
const record={modelCalls:0,started:new Date().toISOString(),executable:capabilities.cliExecutable,cwd:meta.work,args,
 limitations:"Standalone sandbox cannot ignore user configuration; uses exact frozen actor config and default selector. Actor exec separately ignores user configuration."};
await writeFile(join(setup,"capability-command.json"),JSON.stringify(record,null,2)+"\n",{flag:"wx"});
const result=await new Promise(resolve=>{const child=spawn(capabilities.cliExecutable,args,{cwd:meta.work,stdio:["ignore","pipe","pipe"]});let stdout="",stderr="";child.stdout.on("data",x=>stdout+=x);child.stderr.on("data",x=>stderr+=x);child.on("error",error=>resolve({error:String(error),code:null,stdout,stderr}));child.on("close",(code,signal)=>resolve({code,signal,stdout,stderr}));});
await writeFile(join(setup,"capability-process.json"),JSON.stringify({...result,finished:new Date().toISOString()},null,2)+"\n",{flag:"wx"});
await cp(out,join(setup,"capability"),{recursive:true,errorOnExist:true,force:false});
console.log(JSON.stringify({code:result.code,error:result.error??null,evidence:join(setup,"capability")},null,2));
process.exitCode=result.code===0?0:1;
