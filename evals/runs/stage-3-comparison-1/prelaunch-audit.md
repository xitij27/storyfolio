# Independent prelaunch material audit

12 October 2026, local date. Read-only audit at source HEAD
`855b42073f9596c3aa21266f803d0e9c7b40ffde`; verification below completed
at `2026-10-11T22:46:55.201Z`. No actor, judge, browser or runtime was
launched, no workspace file changed, and no file was added under the run
root. The coordinator capability probe was running independently.

## Result

The 124 frozen input files and their exact file set verify against digest
`40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`.
All frozen implementation files match current source; all 86 skill files
match the unchanged shipped skill. The pre-scaffold inventory is exactly
95 files: nine fixture files plus those 86 skill files. Scaffolding adds
79 engine files, giving 174 expected files with no collisions. Every live
and saved source file matches its frozen origin in bytes and SHA-256.

A separate recursive workspace traversal, not the source exclusion helper,
finds no unexpected source files or symlinks outside the three known
generated top-level directories. The only extra regular file is generated
`next-env.d.ts`. No accepted prototype, previous actor implementation,
recovery design, rubric or reference screenshots were copied into the
source-bound workspace. The run root contains only `meta.json` and `setup`.
The final actor-facing `docs/story/environment-setup.json` did not yet exist
at this observation; root's final readiness check must account for it and
any later setup change before launch.

## Exposure and limits

The excluded `.next`, `node_modules` and `checks` trees were not exhaustively
content-audited. The retained install record shows one successful
`npm ci --offline --cache=/tmp/storyfolio-npm-cache`, exit 0, with the engine
lockfile unchanged. The visible checks tree contains only
`checks/setup-capability/`, including the starter's three-beat `light-wide`
reports and nine generated images. Its manifest names `opening.gather`,
`middle.fan` and `close.whole`, not the held-out five-beat implementation.
This audit did not evaluate those image pixels or duplicate the acceptance
agent's capability verification.

The actor-readable `checks/setup-capability/probe.json` includes a blocked
network error stack with this coordinator source location:

`/home/kshitij/projects/storyfolio/evals/runs/codex-bench-depth-baseline-2/inputs/implementation/evals/probe-build-environment.mjs:43:22`

This exposes the repository/cohort path, not held-out implementation bytes.
It was reported to root before launch, without modifying or sanitizing the
probe. Root accepted this as a disclosed limitation of the protocol's chosen
configuration-isolation boundary, not held-out solution contents. Both arms
must use the same setup method and actual reads remain audited. This does
not relax the separate requirement that the concise actor-facing factual
`docs/story/environment-setup.json` contain no held-out path. That factual
record and this generated raw error stack are different evidence.
A clean copied source set must not be described as inaccessible held-out
files or an arm-blinded run. Actual actor reads still require the
[planned access audit](audit-plan.md).
The configured sandbox and neutral helper are not a filesystem read jail.
This bounded material check is not the final readiness gate or launch
permission.

Observed inherited probe hashes:

```jsonl
{"path":"checks/setup-capability/probe.json","bytes":2667,"sha256":"0287332ab1d3b3b64f4069f3a4fd45bd23e08585067b75397717662154839f66"}
{"path":"checks/setup-capability/browser/manifest.json","bytes":2208,"sha256":"e0bc3d5441fe9cee389824b06e026fd99b5c03b571b49d7c6173197aa57c67d1"}
```

## Retained verification command

Run from the repository root. It performs reads and assertions only; a
later actor turn or new setup file can legitimately make it fail because
this is a prelaunch material check, not a post-turn validator.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import {readFile,readdir,lstat,realpath} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {verifyInputs,hash} from './evals/lib/build.mjs';
const base='evals/runs/codex-bench-depth-baseline-2', run=base+'/bench-depth-2/baseline-1';
const read=async path=>JSON.parse(await readFile(path,'utf8'));
const meta=await read(run+'/meta.json'), frozen=await verifyInputs(base+'/inputs');
assert.equal(frozen.digest,'40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a');
assert.equal(meta.inputDigest,frozen.digest); assert.equal(meta.inputs,resolve(base+'/inputs'));
assert.equal(await realpath(meta.work),meta.work); assert.ok(meta.work.startsWith('/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-'));
async function list(root,prefix='',skip=new Set()) { const out=[]; for(const e of await readdir(join(root,prefix),{withFileTypes:true})){ const path=prefix?prefix+'/'+e.name:e.name; if(skip.has(path)) continue; assert.ok(!e.isSymbolicLink(),'symlink: '+path); if(e.isDirectory()) out.push(...await list(root,path,skip)); else {assert.ok(e.isFile(),path);out.push(path);} } return out.sort(); }
const inputFiles=await list(base+'/inputs'); assert.deepEqual(inputFiles,Object.keys(frozen.hashes).concat('manifest.json').sort()); assert.equal(Object.keys(frozen.hashes).length,124);
const expected={}, initial={}, counts={fixture:0,skill:0,scaffold:0};
for(const [path,digest] of Object.entries(frozen.hashes)){ const bytes=await readFile(base+'/inputs/'+path), value={type:'file',hash:digest,size:bytes.length};
  if(path.startsWith('fixture/')) {const key=path.slice(8); expected[key]=value;initial[key]=value;counts.fixture++;}
  if(path.startsWith('skill/')) {const key='.agents/skills/storyfolio/'+path.slice(6);expected[key]=value;initial[key]=value;counts.skill++;}
  if(path.startsWith('skill/engine/')) {const key=path.slice(13);assert.ok(!expected[key],'collision: '+key);expected[key]=value;counts.scaffold++;}
  if(path.startsWith('skill/')) assert.equal(hash(await readFile('skills/storyfolio/'+path.slice(6))),digest,path);
  if(path.startsWith('implementation/')) assert.equal(hash(await readFile(path.slice(15))),digest,path);
}
const pre=await read(run+'/setup/pre-scaffold-inventory.json'), snapshot=await read(run+'/setup/snapshot/manifest.json');
assert.deepEqual(pre.initialEntries,[]); assert.deepEqual([...pre.files].sort(),Object.keys(initial).sort());assert.equal(pre.files.length,95);
assert.deepEqual(snapshot.files,expected);assert.deepEqual(snapshot.unexpected,[]);assert.deepEqual(snapshot.excluded,[]);
assert.deepEqual(await list(run+'/setup/snapshot/files'),Object.keys(expected).sort());
for(const [path,value]of Object.entries(expected)){const saved=await readFile(run+'/setup/snapshot/files/'+path),live=await readFile(join(meta.work,path));assert.equal(hash(saved),value.hash,path);assert.equal(saved.length,value.size,path);assert.deepEqual(live,saved,path);}
const excludedTop=['node_modules','.next','checks'];
const current=await list(meta.work,'',new Set(excludedTop)); const extras=current.filter(path=>!expected[path]);
const allowedExtras=['next-env.d.ts','tsconfig.tsbuildinfo','docs/story/environment-setup.json'];assert.ok(extras.every(path=>allowedExtras.includes(path)),JSON.stringify(extras));
const extraHashes={};for(const path of extras)extraHashes[path]=hash(await readFile(join(meta.work,path)));
const artifactPaths=['meta.json','setup/pre-scaffold-inventory.json','setup/snapshot/manifest.json','setup/result.json'];const evidence={};for(const path of artifactPaths)evidence[path]=hash(await readFile(run+'/'+path));
const top=await readdir(meta.work,{withFileTypes:true}); const exclusions=top.filter(e=>excludedTop.includes(e.name)).map(e=>({path:e.name,type:e.isDirectory()?'directory':e.isSymbolicLink()?'symlink':'file'}));assert.ok(exclusions.every(e=>e.type==='directory'));
const runEntries=await readdir(run);assert.deepEqual(runEntries.sort(),['meta.json','setup']);
console.log(JSON.stringify({date:new Date().toISOString(),frozenInputs:124,inputDigest:frozen.digest,counts,preScaffoldFiles:pre.files.length,scaffoldedFiles:Object.keys(expected).length,workspace:meta.work,allExpectedHashesMatch:true,extraFiles:extraHashes,excludedTop:exclusions,runEntries,evidence,sourceHelperSha256:frozen.hashes['implementation/evals/lib/source-scope.mjs'],limitations:'Generated dependency/build/check trees not exhaustively audited; concurrent coordinator capability probe in progress; no filesystem read barrier proven.'},null,2));
NODE
```

Exit status: 0. Complete result:

```json
{
  "date": "2026-10-11T22:46:55.201Z",
  "frozenInputs": 124,
  "inputDigest": "40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a",
  "counts": {
    "fixture": 9,
    "skill": 86,
    "scaffold": 79
  },
  "preScaffoldFiles": 95,
  "scaffoldedFiles": 174,
  "workspace": "/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-tpXd60",
  "allExpectedHashesMatch": true,
  "extraFiles": {
    "next-env.d.ts": "1862ac4bbbc5192d4bf562161df66ea547ed3e67173100656ab606ae9797db2b"
  },
  "excludedTop": [
    {
      "path": ".next",
      "type": "directory"
    },
    {
      "path": "checks",
      "type": "directory"
    },
    {
      "path": "node_modules",
      "type": "directory"
    }
  ],
  "runEntries": [
    "meta.json",
    "setup"
  ],
  "evidence": {
    "meta.json": "648aeaa92760aa84cef61ba0438c5f80744177f8e9e1bf04fc11cf4cc2976e46",
    "setup/pre-scaffold-inventory.json": "adf06ce8fdc519085f9ee353f0afab18ae1e9466fe436cea0861397d2b14d5c9",
    "setup/snapshot/manifest.json": "ff12cfcac621a691a664a8f1616251990ebf742727e08b009f397f0873a58583",
    "setup/result.json": "cc30c70f6bac9c9451cc698bbb6e54474274d3fa658d87def5f7c0a1218df9cd"
  },
  "sourceHelperSha256": "63bcdb119b0fd546aa5a27144204eb6deea89167d8b81121dffde8a22865c71b",
  "limitations": "Generated dependency/build/check trees not exhaustively audited; concurrent coordinator capability probe in progress; no filesystem read barrier proven."
}
```
