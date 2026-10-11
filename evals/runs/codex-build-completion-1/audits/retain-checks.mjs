#!/usr/bin/env node
// Coordinator utility, added after cohort freeze. Invoke only after the actor
// and its check/server processes have stopped, before starting the next turn.
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { lstat, mkdir, open, readFile, readdir, readlink, realpath, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const optionalStat = path => lstat(path).catch(error => { if (error.code === "ENOENT") return null; throw error; });
async function regularBytes(path) {
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
  try {
    if (!(await handle.stat()).isFile()) throw new Error(`Not a regular file: ${path}`);
    return await handle.readFile();
  } finally { await handle.close(); }
}

export async function retainChecks(runPath, turn) {
  if (!Number.isSafeInteger(turn) || turn < 1) throw new Error("Turn must be a positive safe integer");
  const run = await realpath(resolve(runPath));
  const metaBytes = await regularBytes(join(run, "meta.json")), meta = JSON.parse(metaBytes);
  const resultPath = `turns/${String(turn).padStart(2, "0")}/result.json`;
  // The runner writes result.json last. Refuse unfinished or stale turn capture.
  const resultBytes = await regularBytes(join(run, resultPath)), result = JSON.parse(resultBytes);
  if (result.turn !== turn) throw new Error("Saved result does not identify the requested turn");
  const turns = await readdir(join(run, "turns"));
  if (turns.some(name => /^\d+$/.test(name) && Number(name) > turn)) throw new Error("A later turn has begun; cannot attribute the current checks to this earlier turn");
  const work = await realpath(meta.work);
  const output = join(run, "actor-evidence", `turn-${turn}`);
  const rel = relative(work, output);
  if (rel === "" || (!rel.startsWith("../") && rel !== ".." && !isAbsolute(rel))) throw new Error("Retention output must be outside the actor workspace");
  await mkdir(dirname(output), { recursive: true });
  await mkdir(output); // Never replace a previous capture, including a failed one.
  const manifest = {
    schemaVersion: 1, recordedAt: new Date().toISOString(), scope: "Actor-generated checks retained after the identified turn; no coordinator acceptance inferred.",
    run, work, turn, requestedStop: result.requestedStop ?? null, actorTurnComplete: result.complete,
    turnResult: resultPath, turnResultSha256: sha256(resultBytes), metaSha256: sha256(metaBytes), inputDigest: meta.inputDigest,
    scriptSha256: sha256(await readFile(fileURLToPath(import.meta.url))),
    files: {}, unsupported: [], excluded: [], missingChecks: false, complete: false,
    limits: "Capture requires the coordinator to stop actor/background processes first. It is not an atomic workspace snapshot, proof of visual review or independent acceptance. Later captures include any older checks still present; per-file hashes identify duplicates. Temporary scripts and Git history require separate retention.",
  };
  async function visit(path) {
    const source = join(work, path), info = await lstat(source);
    if (info.isSymbolicLink()) { manifest.unsupported.push({ path, type: "symlink", target: await readlink(source) }); return; }
    if (info.isDirectory()) {
      for (const entry of (await readdir(source)).sort()) {
        const child = `${path}/${entry}`;
        if (["node_modules", ".next", ".git"].includes(entry)) { manifest.excluded.push({ path: child, reason: "Dependency, generated build or Git tree is outside checks retention." }); continue; }
        await visit(child);
      }
    } else if (info.isFile()) {
      const bytes = await regularBytes(source);
      const destination = join(output, path);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, bytes, { flag: "wx" });
      manifest.files[path] = { sha256: sha256(bytes), bytes: bytes.length };
    } else manifest.unsupported.push({ path, type: "non-regular" });
  }
  try {
    if (await optionalStat(join(work, "checks"))) await visit("checks");
    else manifest.missingChecks = true;
    if (sha256(await regularBytes(join(run, resultPath))) !== manifest.turnResultSha256) throw new Error("Turn result changed during retention");
    if ((await readdir(join(run, "turns"))).some(name => /^\d+$/.test(name) && Number(name) > turn)) throw new Error("A later turn began during retention");
    manifest.complete = manifest.unsupported.length === 0;
  } catch (error) { manifest.error = String(error); }
  manifest.fileCount = Object.keys(manifest.files).length;
  manifest.totalBytes = Object.values(manifest.files).reduce((sum, file) => sum + file.bytes, 0);
  await writeFile(join(output, "retention-manifest.json"), json(manifest), { flag: "wx" });
  return { output, manifest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({ options: { run: { type: "string" }, turn: { type: "string" }, help: { type: "boolean" } } });
  if (values.help) console.log("Usage: node retain-checks.mjs --run=/absolute/coordinator/run --turn=1\nRun only after the actor and background processes stop, before the next turn. Creates actor-evidence/turn-N; refuses overwrite. Unsupported entries are reported and return exit 1.");
  else {
    if (!values.run || !/^[1-9]\d*$/.test(values.turn ?? "")) throw new Error("Required: --run=DIR --turn=N");
    const { output, manifest } = await retainChecks(values.run, Number(values.turn));
    console.log(json({ output, complete: manifest.complete, files: manifest.fileCount, bytes: manifest.totalBytes, unsupported: manifest.unsupported, excluded: manifest.excluded, missingChecks: manifest.missingChecks, error: manifest.error ?? null }));
    process.exitCode = manifest.complete ? 0 : 1;
  }
}
