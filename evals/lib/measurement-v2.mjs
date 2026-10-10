import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { JUDGE_MODEL, EFFORT } from "./codex.mjs";
import { ROOT, RUNS, readJson, walk } from "./files.mjs";
import { JUDGEMENT_SCHEMA, RUBRIC_VERSION, validateJudgement } from "./score-v2.mjs";

export const hash = value => createHash("sha256").update(value).digest("hex");
export const writeNew = (path, value) => writeFile(path, value, { flag: "wx" });
export const json = value => JSON.stringify(value, null, 2) + "\n";
const marker = "# What to report\n";
const toolFiles = [
  "evals/prompts/judge-v2.md", "evals/lib/score-v2.mjs", "evals/lib/measurement-v2.mjs",
  "evals/codex-judge-v2.mjs", "evals/report-v2.mjs", "evals/lib/codex.mjs", "evals/lib/score.mjs",
];

/** Only ENOENT means unfinished. Wrong-run or malformed results fail before calls. */
export async function readSavedJudgement(caseDir, id, person) {
  const saved = await readJson(join(caseDir, "judgement.json")).catch(error => {
    if (error.code !== "ENOENT") throw error;
    return undefined;
  });
  if (saved === undefined) return undefined;
  if (!saved || typeof saved !== "object" || Array.isArray(saved) || saved.source !== id ||
      saved.runner !== "codex" || saved.rubricVersion !== RUBRIC_VERSION ||
      saved.judge !== JUDGE_MODEL || saved.reasoningEffort !== EFFORT) {
    throw new Error(`${id}: mismatched or malformed saved judge envelope`);
  }
  validateJudgement(saved.judgement, person);
  return saved;
}

export function sourceIds(value) {
  const ids = value?.split(",") ?? [];
  if (!ids.length || ids.some(id => !/^[\w-]+\/[\w-]+\/(?:with|without)-[1-9]\d*$/.test(id))) {
    throw new Error("Supply --runs iteration/person/with-1,... with explicit saved run IDs");
  }
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate source run");
  return ids.sort();
}

export function cohortPath(output, sources, runsRoot = RUNS) {
  if (!output || !/^[\w-]+$/.test(output)) throw new Error("Supply a safe, new --output cohort name");
  if (sources.some(id => id.split("/")[0] === output)) throw new Error("Output must differ from every source cohort");
  return join(runsRoot, output);
}

/** Keep the original judge's exact evidence prefix, replacing only its rubric. */
export function versionedPrompt(original, template) {
  if (original.split(marker).length !== 2 || template.split(marker).length !== 2) {
    throw new Error("Expected one report section in the saved prompt and v2 template");
  }
  const example = original.match(/\*\*copied_example\.\*\* ([^\n]*)/);
  if (!example) throw new Error("Missing saved example instruction");
  return original.slice(0, original.indexOf(marker)) + marker + template.split(marker)[1].replace("{{example}}", () => example[1]);
}

async function treeHashes(dir) {
  return Object.fromEntries(await Promise.all((await walk(dir)).map(async path => [path, hash(await readFile(join(dir, path)))])));
}

async function implementationHashes() {
  return Object.fromEntries(await Promise.all(toolFiles.map(async path => [path, hash(await readFile(join(ROOT, path)))])));
}

async function reportHashes(ids, runsRoot) {
  const hashes = {};
  for (const iteration of [...new Set(ids.map(id => id.split("/")[0]))].sort()) {
    const path = `${iteration}/report.md`;
    const bytes = await readFile(join(runsRoot, path)).catch(error => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
    hashes[path] = bytes === null ? null : hash(bytes);
  }
  return hashes;
}

/** Score with the committed fixture used by the source run, never today's. */
export function recordedPerson(meta) {
  if (!/^[a-f0-9]{7,40}$/.test(meta.harnessCommit ?? "")) throw new Error("Missing or invalid source harnessCommit");
  if (!/^[\w-]+$/.test(meta.person ?? "")) throw new Error("Invalid source person ID");
  const path = `evals/people/${meta.person}/person.json`;
  const bytes = execFileSync("git", ["show", `${meta.harnessCommit}:${path}`], { cwd: ROOT, encoding: "utf8" });
  const person = JSON.parse(bytes);
  if (person.id !== meta.person || !/^[\w-]+$/.test(person.truth)) throw new Error("Invalid recorded fixture");
  const truthPath = `evals/people/${person.truth}/truth.md`;
  const truth = execFileSync("git", ["show", `${meta.harnessCommit}:${truthPath}`], { cwd: ROOT, encoding: "utf8" });
  return {
    person: { ...person, truthText: truth.trim() },
    fixture: { harnessCommit: meta.harnessCommit, hashes: { [path]: hash(bytes), [truthPath]: hash(truth) } },
  };
}

export async function inspectSources(ids, runsRoot = RUNS) {
  const template = await readFile(join(ROOT, "evals/prompts/judge-v2.md"), "utf8");
  const rows = [];
  for (const id of ids) {
    const dir = join(runsRoot, id);
    const meta = await readJson(join(dir, "meta.json"));
    const [iteration, personId, run] = id.split("/");
    if (!meta.complete || meta.runner !== "codex") throw new Error(`${id}: expected complete Codex conversation`);
    if (meta.person !== personId || meta.iteration !== iteration || `${meta.arm}-${meta.rep}` !== run) {
      throw new Error(`${id}: metadata does not match source ID`);
    }
    const original = await readJson(join(dir, "judgement.json"));
    const { person, fixture } = recordedPerson(meta);
    const prompt = versionedPrompt(await readFile(join(dir, "judge-prompt.md"), "utf8"), template);
    const hashes = await treeHashes(dir);
    rows.push({ id, meta, original, person, fixture, prompt, hashes });
  }
  return rows;
}

/** Snapshot input and original judgement once; no writes go to source runs. */
export async function prepareCohort(output, ids, runsRoot = RUNS) {
  const dir = cohortPath(output, ids, runsRoot);
  const existing = await readJson(join(dir, "manifest.json")).catch(error => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  if (existing) {
    if (existing.rubricVersion !== RUBRIC_VERSION || JSON.stringify(existing.sources) !== JSON.stringify(ids)) {
      throw new Error("Existing cohort has a different rubric or source selection");
    }
    await verifyCohort(dir, runsRoot);
    return existing;
  }
  const rows = await inspectSources(ids, runsRoot);
  // A pre-existing directory without a v2 manifest is not safe to reuse.
  await mkdir(dir);
  const manifest = {
    rubricVersion: RUBRIC_VERSION, model: JUDGE_MODEL, reasoningEffort: EFFORT,
    sources: ids, implementationHashes: await implementationHashes(),
    originalReportHashes: await reportHashes(ids, runsRoot),
    schemaSha256: hash(json(JUDGEMENT_SCHEMA)), cases: {},
  };
  await writeNew(join(dir, "schema.json"), json(JUDGEMENT_SCHEMA));
  for (const row of rows) {
    const caseDir = join(dir, "cases", row.id);
    await mkdir(caseDir, { recursive: true });
    const artifacts = {
      "source-meta.json": json(row.meta), "person.json": json(row.person),
      "original-judgement.json": json(row.original), "judge-prompt.md": row.prompt,
    };
    for (const [path, bytes] of Object.entries(artifacts)) await writeNew(join(caseDir, path), bytes);
    manifest.cases[row.id] = {
      fixture: row.fixture,
      sourceHashes: row.hashes,
      snapshotHashes: Object.fromEntries(Object.entries(artifacts).map(([path, bytes]) => [path, hash(bytes)])),
    };
  }
  await writeNew(join(dir, "manifest.json"), json(manifest));
  return manifest;
}

export async function verifyCohort(dir, runsRoot = RUNS) {
  const manifest = await readJson(join(dir, "manifest.json"));
  if (manifest.rubricVersion !== RUBRIC_VERSION || manifest.model !== JUDGE_MODEL || manifest.reasoningEffort !== EFFORT) {
    throw new Error("Unexpected rubric or judge configuration");
  }
  if (JSON.stringify(manifest.implementationHashes) !== JSON.stringify(await implementationHashes())) {
    throw new Error("V2 implementation changed after input preparation; use a new cohort");
  }
  if (hash(await readFile(join(dir, "schema.json"))) !== manifest.schemaSha256) throw new Error("V2 schema changed");
  if (JSON.stringify(await reportHashes(manifest.sources, runsRoot)) !== JSON.stringify(manifest.originalReportHashes)) {
    throw new Error("Original cohort reports changed");
  }
  for (const id of manifest.sources) {
    if (JSON.stringify(await treeHashes(join(runsRoot, id))) !== JSON.stringify(manifest.cases[id].sourceHashes)) {
      throw new Error(`${id}: original source files changed`);
    }
    for (const [path, expected] of Object.entries(manifest.cases[id].snapshotHashes)) {
      if (hash(await readFile(join(dir, "cases", id, path))) !== expected) throw new Error(`${id}: snapshot ${path} changed`);
    }
  }
  return manifest;
}
