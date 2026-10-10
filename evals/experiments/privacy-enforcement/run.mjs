#!/usr/bin/env node
// Opt-in filesystem experiment. It never invokes a model or edits user config.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, link, mkdir, readFile, realpath, stat, symlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const experiment = dirname(fileURLToPath(import.meta.url));
const root = resolve(experiment, "../../..");
const label = process.argv[2];
const mode = process.argv[3];
if (!label || !/^[a-z0-9-]+$/.test(label) || !["deny-private", "public-only"].includes(mode)) throw new Error("Usage: node evals/experiments/privacy-enforcement/run.mjs <new-result-label> [deny-private|public-only]");
const output = join(root, "evals/runs/codex-privacy-enforcement-1", label);
await mkdir(dirname(output), { recursive: true });
await mkdir(output); // Refuse to overwrite a previous experiment.
const workspace = join(output, "workspace");
const source = join(root, "evals/people/phd");
await cp(join(source, "material"), join(workspace, "material"), { recursive: true });
await symlink("material/participant-contacts.csv", join(workspace, "private-link.csv"));
await symlink("material/cv.md", join(workspace, "public-link.md"));
await symlink(join(source, "material/participant-contacts.csv"), join(workspace, "source-private-link.csv"));
await link(join(workspace, "material/participant-contacts.csv"), join(workspace, "private-hardlink.csv"));

const privatePath = join(workspace, "material/participant-contacts.csv");
const sourcePrivate = join(source, "material/participant-contacts.csv");
const person = JSON.parse(await readFile(join(source, "person.json"), "utf8"));
const digest = async path => createHash("sha256").update(await readFile(path)).digest("hex");
const before = { copied: await digest(privatePath), source: await digest(sourcePrivate) };
assert.equal(before.copied, before.source);
const lookup = spawnSync("which", ["codex"], { encoding: "utf8" });
assert.equal(lookup.status, 0, lookup.stderr);
const codex = await realpath(lookup.stdout.trim());
const runtime = dirname(codex);
const version = spawnSync(codex, ["--version"], { encoding: "utf8" });
assert.equal(version.status, 0, version.stderr);
const q = value => `'${value.replaceAll("'", "'\\''")}'`;
const quote = value => JSON.stringify(value); // TOML strings, never shell quoting.
const profile = {
  ":minimal": "read",
  [runtime]: "read",
  ...(mode === "deny-private" ? { [workspace]: "read" } : {
    [join(workspace, "material/cv.md")]: "read",
    [join(workspace, "material/research-and-teaching.md")]: "read",
    [join(workspace, "public-link.md")]: "read",
  }),
  [privatePath]: "deny",
};
const profileToml = Object.entries(profile).map(([path, access]) => `${quote(path)}=${quote(access)}`).join(",");
const common = ["sandbox", "-C", workspace, "-P", "storyfolio_private_probe",
  "-c", `permissions.storyfolio_private_probe.filesystem={${profileToml}}`,
  "-c", "permissions.storyfolio_private_probe.network.enabled=false"];
const probes = [
  { id: "startup", command: "printf 'STORYFOLIO_PROBE_STARTED\\n'", allow: true, contains: "STORYFOLIO_PROBE_STARTED" },
  { id: "public-read", command: "cat material/cv.md material/research-and-teaching.md", allow: true, contains: "The study is retrospective." },
  { id: "inventory", command: "ls material", allow: true, contains: "participant-contacts.csv" },
  { id: "private-head", command: "head -n 2 material/participant-contacts.csv" },
  { id: "batched-cat", command: "cat material/cv.md material/research-and-teaching.md material/participant-contacts.csv", contains: "The study is retrospective." },
  { id: "broad-cat", command: "cat material/*", contains: "The study is retrospective." },
  { id: "private-symlink", command: "cat private-link.csv", missingAllowed: mode === "public-only" },
  { id: "private-hardlink", command: "cat private-hardlink.csv", missingAllowed: mode === "public-only" },
  { id: "public-symlink", command: "cat public-link.md", allow: true, contains: "MIRA SOLANO" },
  { id: "absolute-private", command: `cat ${q(privatePath)}` },
  { id: "original-private-absolute", command: `cat ${q(sourcePrivate)}`, missingAllowed: true },
  { id: "original-private-symlink", command: "cat source-private-link.csv", missingAllowed: true },
];
const results = [];
for (const probe of probes) {
  const args = [...common, "--", "/bin/sh", "-c", probe.command];
  const run = spawnSync(codex, args, { cwd: workspace, encoding: "utf8", timeout: 20_000 });
  const combined = `${run.stdout ?? ""}\n${run.stderr ?? ""}`;
  const privateMarkerSeen = person.privateStrings.some(marker => combined.includes(marker));
  const controlSeen = !probe.contains || (run.stdout ?? "").includes(probe.contains);
  const denied = run.status !== 0 && (/Permission denied|Operation not permitted/.test(combined)
    || (probe.missingAllowed && /No such file or directory/.test(combined)));
  const passed = !run.error && !privateMarkerSeen && controlSeen && (probe.allow ? run.status === 0 : denied);
  results.push({ ...probe, args, exitCode: run.status, signal: run.signal, error: run.error?.message ?? null,
    stdout: run.stdout, stderr: run.stderr, privateMarkerSeen, controlSeen, passed });
  // An unhealthy sandbox cannot establish any read boundary. Stop and save.
  if (probe.id === "startup" && !passed) break;
}
const after = { copied: await digest(privatePath), source: await digest(sourcePrivate) };
const unchanged = before.copied === after.copied && before.source === after.source;
const present = (await stat(privatePath)).isFile() && (await stat(sourcePrivate)).isFile();
const result = { date: "2026-10-10", experiment: "codex-privacy-enforcement-1", modelCalls: 0,
  cliVersion: version.stdout.trim(), codex, runtime, workspace, mode, profile,
  runnerSha256: await digest(fileURLToPath(import.meta.url)), before, after,
  fixturePresentAfter: present, fixtureUnchanged: unchanged,
  expectedProbes: probes.length, completedProbes: results.length,
  passed: unchanged && present && results.length === probes.length && results.every(probe => probe.passed), results };
await writeFile(join(output, "result.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ result: join(output, "result.json"), passed: result.passed,
  completedProbes: results.length, expectedProbes: probes.length,
  failedProbes: results.filter(probe => !probe.passed).map(probe => probe.id) }, null, 2));
process.exitCode = result.passed ? 0 : 1;
