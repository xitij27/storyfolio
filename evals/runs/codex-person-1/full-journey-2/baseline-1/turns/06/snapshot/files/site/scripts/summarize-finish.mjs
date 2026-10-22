// Consolidate actual completed reports; never promote partial captures to a pass.
import assert from 'node:assert/strict';
import { readdir,readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { story } from '../content/story.ts';
import { looks } from '../content/looks.ts';
import { checkMatrix,storyContract } from './check-lib.mjs';
const contract=storyContract(story,looks);
const matrix=checkMatrix(contract,JSON.parse(await readFile('content/checks.json','utf8')));
const origins=['finish-full','finish-fallbacks','finish-wide','finish-reduced-0','finish-reduced-1-retry','finish-reduced-2'];
const cases=[];
for(const entry of matrix){
 const evidence=[];const samples=new Set();const still=new Set();
 for(const origin of origins){
  let manifest;
  try{manifest=JSON.parse(await readFile(`checks/${origin}/manifest.json`,'utf8'));}catch{continue;}
  const result=manifest.results.find(r=>r.name===entry.name&&r.code===0&&r.problems.length===0);
  if(!result?.report)continue;
  assert(manifest.commands.some(command=>command.at(-1)==='build'),`${origin} must include a fresh production build`);
  const path=`checks/${origin}/${result.report}`;
  const report=JSON.parse(await readFile(path,'utf8'));
  assert.deepEqual(report.problems,[]);assert.deepEqual(report.beatIds,contract.ids);assert.equal(report.h1,1);
  for(const sample of report.samples)samples.add(`${sample.beat}/${sample.position}`);
  for(const sample of report.motion??[]){assert.equal(sample.before,sample.after);still.add(`${sample.beat}/${sample.position}`);}
  evidence.push(path);
 }
 const positionFlag=entry.flags.find(f=>f.startsWith('--positions='));
 const positions=positionFlag?positionFlag.split('=')[1].split(','):['end'];
 const expected=contract.ids.flatMap(id=>positions.map(position=>`${id}/${position}`));
 const missing=expected.filter(key=>!samples.has(key));
 const needsStill=entry.flags.some(f=>f.startsWith('--assert-still='));
 const missingStill=needsStill?expected.filter(key=>!still.has(key)):[];
 cases.push({name:entry.name,pass:evidence.length>0&&!missing.length&&!missingStill.length,samples:samples.size,expected_samples:expected.length,stationary_samples:still.size,missing,missing_stationary:missingStill,evidence});
}
const sourceFiles=[];
async function walk(directory){for(const item of await readdir(directory,{withFileTypes:true})){const path=`${directory}/${item.name}`;if(item.isDirectory())await walk(path);else if(item.isFile())sourceFiles.push(path);}}
for(const directory of ['app','components','content','lib','public'])await walk(directory);
for(const name of ['package.json','package-lock.json','next.config.ts','tsconfig.json','postcss.config.mjs']){try{await readFile(name);sourceFiles.push(name);}catch{}}
const pathOrder=(a,b)=>{const left=a.split('/'),right=b.split('/');for(let i=0;i<Math.min(left.length,right.length);i++){if(left[i]!==right[i])return left[i]<right[i]?-1:1;}return left.length-right.length;};
const hash=createHash('sha256');for(const file of sourceFiles.sort(pathOrder))hash.update(file+'\0').update(await readFile(file)).update('\0');
const currentHash=hash.digest('hex');const recorded=JSON.parse(await readFile('checks/finish-source.json','utf8'));
assert.equal(currentHash,recorded.application_source_hash,'Application source changed after finishing checks started');
let functional;try{functional=JSON.parse(await readFile('checks/finish-functional/report.json','utf8'));}catch{}
const summary={application_source_hash:currentHash,scope:'Complete matrix coverage assembled from completed fresh-build batches and explicitly bounded reduced-motion beat ranges; not one uninterrupted full run',single_full_run_complete:false,matrix_coverage_complete:cases.every(c=>c.pass),cases,passing_cases:cases.filter(c=>c.pass).length,total_cases:matrix.length,functional:{complete:!!functional,checks:functional?.checks??[],errors:functional?.errors??null,external_requests:functional?.external??null},actual_user_review:'PENDING — explicitly not established by wording approval or browser emulation',publishing:'Outside task; no publishing performed'};
await writeFile('checks/finish-summary.json',JSON.stringify(summary,null,2)+'\n');
console.log(`${summary.passing_cases}/${summary.total_cases} matrix cases covered; functional ${functional?.checks?.length??0} checks. Single uninterrupted full run: false. Actual user review: pending.`);
if(!summary.matrix_coverage_complete||!functional||functional.errors.length||functional.external.length)process.exitCode=1;
