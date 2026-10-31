#!/usr/bin/env node
// Records person test 3's environment as setup evidence, after --prepare and
// before turn 1, and writes the probe the runner checks. No model call.
// Run with the run's environment (see protocol.md):
//   node evals/runs/stage-3-person-3/environment.mjs evals/runs/codex-person-3/full-journey-3/baseline-1
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
if (!out) throw new Error("Usage: environment.mjs <prepared baseline folder>");
const setup = join(out, "setup");
const meta = JSON.parse(readFileSync(join(out, "meta.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(meta.inputs, "manifest.json"), "utf8"));
const run = (cmd, ...args) => execFileSync(cmd, args, { encoding: "utf8" }).trim();
const env = (k) => process.env[k] ?? null;
const browsers = env("PLAYWRIGHT_BROWSERS_PATH"), libs = env("LD_LIBRARY_PATH"), cache = env("npm_config_cache");

const environment = {
  checked: new Date().toISOString(),
  modelCalls: 0,
  actorPreflight: false,
  node: { executable: process.execPath, version: process.version, typescript: process.features.typescript ?? null },
  npm: run("npm", "--version"),
  codex: run("codex", "--version"),
  git: run("git", "--version"),
  env: { PATH: env("PATH"), PLAYWRIGHT_BROWSERS_PATH: browsers, LD_LIBRARY_PATH: libs, LANG: env("LANG"), TMPDIR: env("TMPDIR"), npm_config_cache: cache },
  browsers: ["chromium-1248", "chromium_headless_shell-1248"].map((d) => ({ d, present: Boolean(browsers) && existsSync(join(browsers, d, "INSTALLATION_COMPLETE")) })),
  browserLibs: Boolean(libs) && ["libnspr4.so", "libnss3.so", "libasound.so.2"].every((f) => existsSync(join(libs, f))),
  npmCache: Boolean(cache) && existsSync(join(cache, "_cacache")),
  noRootApp: !existsSync(join(meta.work, "package.json")) && !existsSync(join(meta.work, "site")),
  skillCommit: run("git", "rev-parse", "HEAD"),
};
const failed = [
  !environment.node.typescript && "Node cannot strip TypeScript",
  !environment.browsers.every((b) => b.present) && "a browser is missing",
  !environment.browserLibs && "a browser library is missing",
  !environment.npmCache && "no npm cache",
  !environment.noRootApp && "the workspace already has an app",
].filter(Boolean);
if (failed.length) throw new Error(`Environment not ready: ${failed.join("; ")}`);

const bytes = Buffer.from(JSON.stringify(environment, null, 2) + "\n");
writeFileSync(join(setup, "environment.json"), bytes, { flag: "wx" });
const evidence = ["environment.json", "snapshot/manifest.json"];
const evidenceHashes = Object.fromEntries(evidence.map((p) => {
  const b = readFileSync(join(setup, p));
  return [p, { sha256: createHash("sha256").update(b).digest("hex"), bytes: b.length }];
}));
const probe = {
  schemaVersion: 1, passed: true, scope: "unscaffolded-environment", actorPreflight: false, modelCalls: 0,
  inputDigest: manifest.digest, capabilitySha256: manifest.hashes["capabilities.json"], work: meta.work, evidence, evidenceHashes,
};
writeFileSync(join(setup, "probe.json"), JSON.stringify(probe, null, 2) + "\n", { flag: "wx" });
console.log(`Environment recorded and probe written in ${setup}`);
