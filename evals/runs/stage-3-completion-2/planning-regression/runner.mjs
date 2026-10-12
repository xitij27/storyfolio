#!/usr/bin/env node
// Fixed six-case study adapter. Each invocation performs at most one paid unit.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { lstat, mkdir, mkdtemp, readFile, readdir, realpath } from "node:fs/promises";
import { delimiter, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { codexArgs, disabledSkills, finalCodexMessage, summariseCodex } from "../../../lib/codex.mjs";
import { leaked } from "../../../lib/events.mjs";
import { JUDGEMENT_SCHEMA, criteria, failures, meetsBar } from "../../../lib/score.mjs";
import { captureBuildWorkspace, DEFAULT_SNAPSHOT, hash, inspectWorkspace, json, regularBytes, verifyInputs, writeNew } from "../../../lib/build.mjs";
import { sourcePathExcluded } from "../../../lib/source-scope.mjs";
import { ACTOR_MODEL, JUDGE_MODEL, EFFORT, BOUNDS, COHORT, PEOPLE, ORDER, accounting, judgeBrief, messages, nextUnit, remaining, validateJudgement } from "./contracts.mjs";
import { invokePlanning } from "./process.mjs";

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../.."), prefix = "evals/runs/stage-3-completion-2/planning-regression/";
const base = join(root, "evals/runs", COHORT), inputs = join(base, "inputs");
const runtimeRoot = "/var/tmp/storyfolio-entry-runtime-20261012", runtimeWork = join(runtimeRoot, "storyfolio-evals");
const { values: args } = parseArgs({ options: { dry: { type: "boolean", default: false }, prepare: { type: "boolean", default: false },
  person: { type: "string" }, rep: { type: "string" }, turn: { type: "string" }, judge: { type: "boolean", default: false } } });
assert.equal([args.dry, args.prepare, Boolean(args.turn), args.judge].filter(Boolean).length, 1, "Select exactly one dry, prepare, actor turn or judge unit");
const implementation = ["runner.mjs", "contracts.mjs", "process.mjs", "contracts.test.mjs", "process.test.mjs"].map(name => prefix + name).concat([
  "evals/lib/codex.mjs", "evals/lib/events.mjs", "evals/lib/files.mjs", "evals/lib/score.mjs", "evals/lib/build.mjs", "evals/lib/source-scope.mjs", "evals/lib/review.mjs", "skills/storyfolio/scripts/scaffold.mjs",
  "evals/runs/stage-3-completion-2/process-supervision/recorder.mjs",
]);
const sourceFiles = ["evals/codex-run.mjs", "evals/codex-judge.mjs", "evals/codex-run-all.mjs", "evals/prompts/turn1.md", "evals/prompts/turn2.md", "evals/prompts/turn3.md", "evals/prompts/judge.md", "evals/lib/score.mjs"];
const list = async (directory, prefix = "", excludeGenerated = false) => {
  const paths = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? prefix + "/" + entry.name : entry.name;
    if (excludeGenerated && sourcePathExcluded(path)) continue;
    assert.ok(!entry.isSymbolicLink(), "Unsupported symlink: " + path);
    if (entry.isDirectory()) paths.push(...await list(join(directory, entry.name), path, excludeGenerated));
    else { assert.ok(entry.isFile(), "Unsupported source: " + path); paths.push(path); }
  }
  return paths;
};
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const capabilities = async () => {
  assert.equal(process.execPath, "/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node");
  assert.equal(process.env.TMPDIR, runtimeRoot);
  let executable;
  for (const path of (process.env.PATH ?? "").split(delimiter)) { try { executable = await realpath(join(path, "codex")); break; } catch {} }
  assert.ok(executable);
  const disabled = await disabledSkills();
  return { schemaVersion: 1, actorModel: ACTOR_MODEL, judgeModel: JUDGE_MODEL, reasoningEffort: EFFORT,
    node: { executable: process.execPath, version: process.version }, cliExecutable: executable, cliVersion: execFileSync(executable, ["--version"], { encoding: "utf8" }).trim(), cliSha256: hash(await readFile(executable)),
    environment: Object.fromEntries(["PATH", "PLAYWRIGHT_BROWSERS_PATH", "LD_LIBRARY_PATH", "LANG", "TMPDIR", "NEXT_TELEMETRY_DISABLED"].map(key => [key, process.env[key] ?? null])),
    disabledSkills: disabled, actorArgs: codexArgs({ model: ACTOR_MODEL, disabled }), judgeArgs: codexArgs({ model: JUDGE_MODEL, judge: true, disabled }),
    limits: "Original planning configuration, no project instructions or build permissions. Configuration isolation is not a filesystem read jail; no hard in-flight cost cap." };
};
async function inspect(caps) {
  const files = {}, provenance = await readJson(root, "evals/runs/codex-closing-1/manifest.json");
  const paths = new Set(sourceFiles);
  for (const personId of PEOPLE) {
    const path = "evals/people/" + personId + "/person.json", person = await readJson(root, path);
    paths.add(path); paths.add("evals/people/" + person.truth + "/truth.md");
    for (const file of await list(join(root, "evals/people", person.material, "material"))) paths.add("evals/people/" + person.material + "/material/" + file);
  }
  for (const path of paths) {
    const bytes = await regularBytes(root, path);
    if (path.startsWith("evals/people/") || path.startsWith("evals/prompts/") || path === "evals/lib/score.mjs") assert.equal(hash(bytes), provenance.fixedInputs[path], "Original planning input changed: " + path);
    files["source/" + path] = bytes;
  }
  files["source/evals/runs/codex-closing-1/manifest.json"] = await regularBytes(root, "evals/runs/codex-closing-1/manifest.json");
  for (const name of ["protocol.md", "historical-usage.json", "historical-sources.json", "README.md"]) files["protocol/" + name] = await regularBytes(study, name);
  for (const row of JSON.parse(files["protocol/historical-sources.json"]).files) {
    const bytes = await regularBytes(root, row.path);
    assert.equal(bytes.length, row.bytes, "Historical source size changed: " + row.path);
    assert.equal(hash(bytes), row.sha256, "Historical source changed: " + row.path);
  }
  for (const path of implementation) files["implementation/" + path] = await regularBytes(root, path);
  for (const path of await list(join(root, "skills/storyfolio"), "", true)) files["skill/" + path] = await regularBytes(root, "skills/storyfolio/" + path);
  files["capabilities.json"] = Buffer.from(json(caps));
  files["definition.json"] = Buffer.from(json({ schemaVersion: 1, id: COHORT, people: PEOPLE, repetitions: [1, 2], arm: "with", bounds: BOUNDS, order: ORDER }));
  const template = name => files["source/evals/prompts/" + name + ".md"].toString("utf8");
  for (const id of PEOPLE) {
    const person = JSON.parse(files["source/evals/people/" + id + "/person.json"]);
    person.truthText = files["source/evals/people/" + person.truth + "/truth.md"].toString("utf8").trim();
    const said = messages(person, { turn1: template("turn1"), turn2: template("turn2"), turn3: template("turn3") });
    for (const rep of [1, 2]) {
      const historicalPath = "evals/runs/codex-closing-1/" + id + "/with-" + rep + "/meta.json";
      const historicalBytes = await regularBytes(root, historicalPath);
      files["historical/" + historicalPath] = historicalBytes;
      const historical = JSON.parse(historicalBytes);
      assert.deepEqual(said, historical.said, "Original synthesized messages changed");
    }
    said.forEach((text, index) => { files["messages/" + id + "/turn" + (index + 1) + ".md"] = Buffer.from(text); });
  }
  const hashes = Object.fromEntries(Object.keys(files).sort().map(path => [path, hash(files[path])]));
  return { files, hashes, digest: hash(json(hashes)) };
}
const caps = await capabilities(), prospective = await inspect(caps);
if (args.dry) { console.log(json({ cohort: COHORT, frozenFiles: Object.keys(prospective.hashes).length, digest: prospective.digest, bounds: BOUNDS, capabilities: caps, modelCalls: 0, writes: false })); process.exit(0); }
const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
const outFor = (person, rep) => join(base, person, "with-" + rep);
if (args.prepare) {
  const status = git("status", "--porcelain", "--", "skills/storyfolio", ...implementation, ...["protocol.md", "historical-usage.json", "historical-sources.json", "README.md"].map(name => prefix + name), ...sourceFiles, "evals/people/analyst", "evals/people/analyst-overstate", "evals/people/student");
  assert.equal(status, "", "Commit all selected skill/input/control changes before freeze");
  await mkdir(base); await mkdir(inputs);
  for (const [path, bytes] of Object.entries(prospective.files)) await writeNew(join(inputs, path), bytes);
  await writeNew(join(inputs, "manifest.json"), json({ schemaVersion: 1, digest: prospective.digest, hashes: prospective.hashes, recorded: { commit: git("rev-parse", "HEAD"), status }, caseId: COHORT }));
  await verifyInputs(inputs); await mkdir(runtimeWork, { recursive: true });
  for (const personId of PEOPLE) for (const rep of [1, 2]) {
    const out = outFor(personId, rep), work = await mkdtemp(join(runtimeWork, "planning-" + personId + "-" + rep + "-"));
    const person = JSON.parse(prospective.files["source/evals/people/" + personId + "/person.json"]), materialPrefix = "source/evals/people/" + person.material + "/material/";
    for (const [path, bytes] of Object.entries(prospective.files)) {
      const target = path.startsWith(materialPrefix) ? "material/" + path.slice(materialPrefix.length) : path.startsWith("skill/") ? ".agents/skills/storyfolio/" + path.slice(6) : null;
      if (target) await writeNew(join(work, target), bytes);
    }
    await writeNew(join(out, "setup.json"), json({ schemaVersion: 1, person: personId, rep, arm: "with", work, inputDigest: prospective.digest, commit: git("rev-parse", "HEAD"), actorModel: ACTOR_MODEL, judgeModel: JUDGE_MODEL, bounds: BOUNDS, modelCalls: 0 }));
    await mkdir(join(out, "units"));
    await captureBuildWorkspace(work, join(out, "initial"), DEFAULT_SNAPSHOT);
  }
  console.log(json({ prepared: true, cohort: COHORT, inputDigest: prospective.digest, conversations: 6, modelCalls: 0 })); process.exit(0);
}
assert.ok(PEOPLE.includes(args.person)); assert.ok(["1", "2"].includes(args.rep)); assert.ok(args.judge || ["1", "2", "3"].includes(args.turn));
const manifest = await verifyInputs(inputs); assert.equal(manifest.digest, prospective.digest, "Current inputs differ from frozen regression");
const unit = { person: args.person, rep: Number(args.rep), unit: args.judge ? "judge" : Number(args.turn) }; unit.id = unit.person + "-with-" + unit.rep + "-" + unit.unit;
const dirFor = row => join(outFor(row.person, row.rep), "units", String(row.unit));
const records = [];
for (const row of ORDER) {
  const dir = dirFor(row), exists = await lstat(dir).catch(error => { if (error.code === "ENOENT") return null; throw error; });
  if (!exists) break;
  const result = await readJson(dir, "result.json").catch(error => { throw new Error("Existing partial unit is preserved, no retry: " + row.id + ": " + error); });
  assert.equal(result.id, row.id);
  assert.equal(result.inputDigest, manifest.digest, "Historical unit uses different frozen inputs");
  for (const [path, digest] of Object.entries(result.artifacts)) assert.equal(hash(await regularBytes(outFor(row.person, row.rep), path)), digest, "Saved unit artifact changed");
  records.push(result);
}
nextUnit(records, unit);
const out = outFor(unit.person, unit.rep), setupBytes = await regularBytes(out, "setup.json"), setup = JSON.parse(setupBytes);
const initialBytes = await regularBytes(out, "initial/manifest.json");
const setupSha256 = hash(setupBytes), initialSnapshotSha256 = hash(initialBytes);
assert.equal(setup.inputDigest, manifest.digest); assert.equal(await realpath(setup.work), setup.work);
assert.equal(setup.person, unit.person); assert.equal(setup.rep, unit.rep); assert.equal(setup.arm, "with");
assert.equal(setup.actorModel, ACTOR_MODEL); assert.equal(setup.judgeModel, JUDGE_MODEL);
assert.ok(setup.work.startsWith(runtimeWork + "/planning-" + unit.person + "-" + unit.rep + "-"));
const history = records.filter(row => row.person === unit.person && row.rep === unit.rep && row.unit !== "judge");
assert.equal(history.length, args.judge ? 3 : unit.unit - 1);
assert.ok(history.every(row => row.sessionId === history[0].sessionId), "One conversation session required");
for (const row of history) {
  assert.equal(row.setupSha256, setupSha256, "Conversation setup record changed");
  assert.equal(row.initialSnapshotSha256, initialSnapshotSha256, "Initial source record changed");
}
const limits = remaining(history, { judge: args.judge });
const previous = history.length ? await readJson(out, "units/" + history.at(-1).unit + "/snapshot/manifest.json") : await readJson(out, "initial/manifest.json");
if (!history.length) {
  const suppliedPerson = await readJson(inputs, "source/evals/people/" + unit.person + "/person.json"), materialPrefix = "source/evals/people/" + suppliedPerson.material + "/material/", expected = {};
  for (const [path, digest] of Object.entries(manifest.hashes)) {
    const target = path.startsWith(materialPrefix) ? "material/" + path.slice(materialPrefix.length) : path.startsWith("skill/") ? ".agents/skills/storyfolio/" + path.slice(6) : null;
    if (target) expected[target] = { type: "file", hash: digest, size: (await regularBytes(inputs, path)).length };
  }
  assert.deepEqual(previous.files, expected, "Initial snapshot differs from frozen material and skill");
  assert.deepEqual(previous.excluded, []); assert.deepEqual(previous.unexpected, []);
}
const observed = await inspectWorkspace(setup.work, DEFAULT_SNAPSHOT);
for (const row of observed.unexpected) assert.ok(row.type === "directory" && (await readdir(join(setup.work, row.path))).length === 0, "Unrecognized nonempty source: " + row.path);
assert.deepEqual(Object.fromEntries(Object.entries(observed.entries).map(([path, { bytes, ...entry }]) => [path, entry])), previous.files, "Live source differs from prior snapshot");
if (history.length) assert.deepEqual(previous, history.at(-1).snapshot);
const person = await readJson(inputs, "source/evals/people/" + unit.person + "/person.json");
person.truthText = (await regularBytes(inputs, "source/evals/people/" + person.truth + "/truth.md")).toString("utf8").trim();
const said = await Promise.all([1, 2, 3].map(turn => regularBytes(inputs, "messages/" + unit.person + "/turn" + turn + ".md").then(bytes => bytes.toString("utf8"))));
let prompt, cwd = setup.work, schema;
const location = dirFor(unit); await mkdir(location, { recursive: false });
if (args.judge) {
  const meta = await readJson(out, "meta.json"); assert.equal(meta.complete, true);
  const prefix = "source/evals/people/" + person.material + "/material/";
  const material = await Promise.all(Object.keys(manifest.hashes).filter(path => path.startsWith(prefix)).sort().map(async path => ({ path: "material/" + path.slice(prefix.length), text: (await regularBytes(inputs, path)).toString("utf8") })));
  const replies = await Promise.all([1, 2, 3].map(turn => regularBytes(out, "turn" + turn + ".md").then(bytes => bytes.toString("utf8"))));
  const files = await Promise.all(meta.written.map(async path => ({ path, text: (await regularBytes(join(out, "files"), path)).toString("utf8") })));
  prompt = judgeBrief({ person, material, said, replies, files, template: (await regularBytes(inputs, "source/evals/prompts/judge.md")).toString("utf8") });
  cwd = await mkdtemp(join(runtimeWork, "planning-judge-")); schema = join(cwd, "schema.json");
  await writeNew(schema, json(JUDGEMENT_SCHEMA)); await writeNew(join(location, "schema.json"), json(JUDGEMENT_SCHEMA));
} else prompt = said[unit.unit - 1];
await writeNew(join(location, "prompt.md"), prompt);
await writeNew(join(location, "started.json"), json({ ...unit, started: new Date().toISOString(), inputDigest: manifest.digest, limits, cwd, model: args.judge ? JUDGE_MODEL : ACTOR_MODEL, sessionId: args.judge ? null : history.at(-1)?.sessionId ?? null }));
const result = { ...unit, complete: false, inputDigest: manifest.digest, setupSha256, initialSnapshotSha256, artifacts: {}, usage: null, sessionId: null, durationMs: 0 };
const artifacts = [];
try {
  const before = await captureBuildWorkspace(setup.work, join(location, "before"), DEFAULT_SNAPSHOT);
  assert.deepEqual(before.files, previous.files, "Source changed while preparing the paid unit");
  for (const row of before.unexpected) assert.ok(row.type === "directory" && (await readdir(join(setup.work, row.path))).length === 0, "Unexpected source before paid invocation");
  const processResult = await invokePlanning({ cwd, executable: caps.cliExecutable, prompt, streamPath: join(location, "stream.jsonl"), stderrPath: join(location, "stderr.log"), lifecyclePath: join(location, "lifecycle.jsonl"), timeoutMs: limits.timeoutMs,
    model: args.judge ? JUDGE_MODEL : ACTOR_MODEL, judge: args.judge, schema, disabled: caps.disabledSkills, sessionId: args.judge ? undefined : history.at(-1)?.sessionId });
  await writeNew(join(location, "process.json"), json({ ...processResult, stdout: undefined, stderr: undefined }));
  const summary = summariseCodex(processResult.stdout, processResult.code);
  Object.assign(result, { durationMs: processResult.durationMs, usage: summary.usage, sessionId: summary.sessionId ?? history.at(-1)?.sessionId ?? null, commands: summary.commands, failed: summary.failed, timedOut: processResult.timedOut, interruptedBy: processResult.interruptedBy });
  await writeNew(join(location, "reply.md"), summary.reply + "\n");
  const terminal = finalCodexMessage(processResult.stdout, processResult.code);
  await writeNew(join(location, "final.md"), terminal + "\n");
  assert.equal(summary.failed, false); assert.ok(result.sessionId);
  if (!args.judge && history.length) assert.equal(result.sessionId, history[0].sessionId);
  accounting([{ ...result, complete: true }]);
  assert.ok(processResult.durationMs <= limits.timeoutMs + BOUNDS.graceMs, "Paid unit exceeded work plus shutdown bound");
  const flatStream = args.judge ? "judge.jsonl" : "turn" + unit.unit + ".jsonl", flatReply = args.judge ? "judge-reply.md" : "turn" + unit.unit + ".md";
  await writeNew(join(out, flatStream), processResult.stdout); artifacts.push(flatStream);
  await writeNew(join(out, flatReply), summary.reply + "\n"); artifacts.push(flatReply);
  if (args.judge) {
    const judgement = validateJudgement(JSON.parse(terminal));
    assert.deepEqual(judgement.traps.map(row => row.id).sort(), person.traps.map(row => row.id).sort());
    const meta = await readJson(out, "meta.json"), evaluated = criteria(judgement, person, meta);
    await writeNew(join(out, "judge-prompt.md"), prompt); artifacts.push("judge-prompt.md");
    await writeNew(join(out, "judgement.json"), json({ judge: JUDGE_MODEL, runner: "codex", adapter: COHORT, reasoningEffort: EFFORT, costUsd: null, usage: summary.usage, judgement })); artifacts.push("judgement.json");
    result.score = { criteria: evaluated, meetsBar: meetsBar(evaluated), failures: failures(evaluated), limits: "Original v1 score; privacy heuristic still requires explicit raw-command review." };
  }
  result.complete = true;
} catch (error) { result.error = String(error); }
try {
  result.snapshot = await captureBuildWorkspace(setup.work, join(location, "snapshot"), DEFAULT_SNAPSHOT, previous.files);
  if (args.judge) assert.deepEqual(result.snapshot.files, previous.files, "Actor source changed during read-only judging");
  for (const row of result.snapshot.unexpected) assert.ok(row.type === "directory" && (await readdir(join(setup.work, row.path))).length === 0, "Unknown source preserved, no continuation");
  assert.ok(Object.values(result.snapshot.files).every(row => row.type === "file"), "Non-regular source is not resumable");
  await verifyInputs(inputs);
} catch (error) { result.complete = false; result.sourceError = String(error); }
if (!args.judge && (unit.unit === 3 || !result.complete)) {
  try {
    const turns = [...history, result], replies = [], commands = turns.flatMap(row => row.commands ?? []), written = [];
    for (const turn of turns) { const path = "units/" + turn.unit + "/reply.md"; try { replies.push((await regularBytes(out, path)).toString("utf8")); } catch {} }
    for (const [path, row] of Object.entries(result.snapshot?.files ?? {})) {
      if (row.type !== "file" || ["material/", ".agents/", ".git/", ".codex/"].some(prefix => path.startsWith(prefix))) continue;
      const bytes = await regularBytes(join(location, "snapshot/files"), path);
      await writeNew(join(out, "files", path), bytes); artifacts.push("files/" + path); written.push(path); replies.push(bytes.toString("utf8"));
    }
    const privateReadEvidence = commands.filter(c => person.privateFiles.some(file => c.command.includes(file.split("/").pop())) || (person.privateFiles.length > 0 && /(?:rg|grep|cat|python|node)\b/.test(c.command) && /material(?:\/\*|\s|['"]|$)/.test(c.command))).map(c => c.command);
    const meta = { runner: "codex", adapter: COHORT, cliVersion: caps.cliVersion, model: ACTOR_MODEL, reasoningEffort: EFFORT, person: unit.person, arm: "with", rep: unit.rep, iteration: COHORT,
      skill: { commit: manifest.recorded.commit, uncommitted: false }, harnessCommit: manifest.recorded.commit, inputDigest: manifest.digest, work: setup.work, disabledSkills: caps.disabledSkills,
      called: false, said, complete: unit.unit === 3 && turns.every(row => row.complete), turns: turns.map(row => ({ ...row, costUsd: null })), written, refused: [],
      skillUsed: commands.some(c => c.exitCode === 0 && /(?:cat|sed|head|tail|read|python|node|rg)\b/.test(c.command) && c.command.includes("storyfolio") && c.command.includes("SKILL.md")),
      privateReadEvidence, readPrivate: privateReadEvidence.length > 0, privateReadMeasurement: "Original conservative shell-command heuristic; preserve it and review commands manually.", leakedPrivate: leaked(replies, person.privateStrings),
      limits: "Planning-only regression, not build or author approval. Aggregate replies are preserved for the original judge packet; final messages are separately retained." };
    await writeNew(join(out, "meta.json"), json(meta)); artifacts.push("meta.json");
  } catch (error) { result.complete = false; result.exportError = String(error); }
}
for (const path of await list(location)) artifacts.push("units/" + unit.unit + "/" + path);
for (const path of artifacts) result.artifacts[path] = hash(await regularBytes(out, path));
await writeNew(join(location, "result.json"), json(result));
console.log(json({ id: unit.id, complete: result.complete, usage: result.usage, durationMs: result.durationMs, score: result.score ?? null, result: join(location, "result.json"), error: result.error ?? result.sourceError ?? result.exportError ?? null }));
process.exitCode = result.complete ? 0 : 1;
