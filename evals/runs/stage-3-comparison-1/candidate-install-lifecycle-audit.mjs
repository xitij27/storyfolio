// Read-only install-lifecycle attribution. Never installs, launches packages or waives a gate.
import { access, readFile, readdir, realpath } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { hash, json } from "../../lib/build.mjs";
const cohort = "evals/runs/codex-bench-depth-candidate-1";
const meta = JSON.parse(await readFile(join(cohort, "bench-depth-2/baseline-1/meta.json")));
const capabilities = JSON.parse(await readFile(join(cohort, "inputs/capabilities.json")));
const lockBytes = await readFile(join(meta.work, "package-lock.json")), lock = JSON.parse(lockBytes);
const events = ["preinstall", "install", "postinstall", "prepublish", "preprepare", "prepare", "postprepare"];
const packages = [], absentOptionalPaths = [];
for (const [path, locked] of Object.entries(lock.packages)) {
  let bytes;
  try { bytes = await readFile(join(meta.work, path, "package.json")); }
  catch (error) { if (error.code !== "ENOENT" || !locked.optional) throw error; absentOptionalPaths.push(path); continue; }
  const value = JSON.parse(bytes), hooks = Object.fromEntries(events.filter(event => value.scripts?.[event]).map(event => [event, value.scripts[event]]));
  let bindingGyp = false;
  try { await access(join(meta.work, path, "binding.gyp")); bindingGyp = true; } catch (error) { if (error.code !== "ENOENT") throw error; }
  packages.push({ path: path || ".", name: value.name, version: value.version, packageJsonSha256: hash(bytes), hooks, lockHasInstallScript: locked.hasInstallScript ?? false, link: locked.link ?? false, bindingGyp, gypfile: value.gypfile ?? null });
}
let npmCommand;
for (const directory of capabilities.environment.PATH.split(":")) {
  const path = join(directory, "npm");
  try { await access(path, constants.X_OK); npmCommand = { path, realpath: await realpath(path) }; break; } catch {}
}
const relevantFiles = [
  "/usr/share/nodejs/npm/lib/commands/ci.js",
  "/usr/share/nodejs/@npmcli/arborist/lib/arborist/rebuild.js",
  join(meta.work, "node_modules/unrs-resolver/postinstall.js"),
  ...["index.js", "helpers.js", "constants.js", "target.js"].map(name => join(meta.work, "node_modules/napi-postinstall/lib", name)),
  join(meta.inputs, "implementation/evals/probe-build-environment.mjs"),
];
const sources = [];
for (const path of relevantFiles) {
  const bytes = await readFile(path), text = bytes.toString();
  sources.push({ path, bytes: bytes.length, sha256: hash(bytes), telemetryVariableLines: text.split("\n").flatMap((line,index)=>line.includes("NEXT_TELEMETRY_DISABLED")?[{line:index+1,text:line}]:[]),
    imports: [...text.matchAll(/require\(["']([^"']+)["']\)/g)].map(match=>match[1]) });
}
const npmLogPath = "/tmp/storyfolio-npm-cache/_logs/2026-10-11T23_24_07_749Z-debug-0.log";
const logBytes = await readFile(npmLogPath), lines = logBytes.toString().split("\n");
const logEvidence = { path: npmLogPath, sha256: hash(logBytes), bytes: logBytes.length,
  selectedLines: lines.flatMap((line,index)=>/ info run | info using | verbose cli | verbose exit | timing build:run:/.test(line)?[{line:index+1,text:line}]:[]) };
const installCommands = {};
for (const arm of ["codex-bench-depth-baseline-2", "codex-bench-depth-candidate-1"]) {
  const path = "evals/runs/"+arm+"/bench-depth-2/baseline-1/setup/dependency-install/command.json";
  const bytes = await readFile(path), value = JSON.parse(bytes);
  installCommands[arm] = { path, sha256: hash(bytes), executable: value.executable, args:value.args, environment:value.environment };
}
const entry = await readFile(join(meta.work,"node_modules/unrs-resolver/postinstall.js"),"utf8");
const napi = await readFile(join(meta.work,"node_modules/napi-postinstall/lib/index.js"),"utf8");
console.log(json({schemaVersion:1,readOnly:true,modelCalls:0,writes:false,launchDisposition:"held pending coordinator decision; this analysis cannot authorize a launch",
  inputDigest:meta.inputDigest,work:meta.work,lockSha256:hash(lockBytes),npmCommand,installCommands,
  packages,absentOptionalPaths,installedPackages:packages.length-1,
  executedLifecycleEvidence:logEvidence,sourceBindings:sources,
  retainedCode:{postinstall:entry,checkAndPreparePackage:napi.slice(napi.indexOf("async function checkAndPreparePackage"))},
  observations:[
    "Candidate npm log records exactly one lifecycle hook: unrs-resolver@1.12.2 postinstall node postinstall.js, exit0.",
    "The root project defines no preinstall/install/postinstall/prepublish/preprepare/prepare/postprepare hook.",
    "Declared installed dependency hooks are inventoried, not assumed executed; registry-package prepare/prepublish hooks differ from root hooks and linked-package preparation.",
    "unrs-resolver postinstall imports napi-postinstall, calls checkAndPreparePackage with its local package data and true version checking.",
    "The inspected hook path contains no NEXT_TELEMETRY_DISABLED lookup and no Next import; no Next execution is recorded during npm ci.",
    "The exact frozen capability probe explicitly sets NEXT_TELEMETRY_DISABLED to 1 for both production-build and browser child commands.",
    "Baseline installer recorded 1 and candidate installer null. Original records and successful checker readiness remain intact; exact all-variable install matching therefore fails."
  ],
  limits:["Read-only code/log attribution is not a historical network trace or proof of every process side effect.","Dependency byte identity is independently measured and linked separately.","No install or probe rerun, environment rewrite, paid call or silent waiver occurred."]}));
