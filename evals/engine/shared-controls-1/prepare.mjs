// Local fixture preparation only. No model, package download or external asset.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const study = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(study, "../../..");
const variant = process.argv[2];
if (!["baseline", "patched"].includes(variant)) throw new Error("Use baseline or patched");
const sourceRevision = "39ceeb7";
const engine = "skills/storyfolio/engine/";
const runtime = path.join(study, "runtime", variant);
if (existsSync(runtime)) throw new Error(`Will not overwrite ${runtime}`);
const sha256 = data => createHash("sha256").update(data).digest("hex");
const files = execFileSync("git", ["ls-tree", "-r", "--name-only", sourceRevision, engine], { cwd: root, encoding: "utf8" }).trim().split("\n");
const hashes = {};
for (const file of files) {
  const relative = file.slice(engine.length);
  const source = variant === "patched" && relative === "components/story/story.tsx"
    ? readFileSync(path.join(root, file))
    : execFileSync("git", ["show", `${sourceRevision}:${file}`], { cwd: root });
  const destination = path.join(runtime, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, source);
  hashes[relative] = sha256(source);
}
cpSync(path.join(study, "fixture"), runtime, { recursive: true });
const fixtureHashes = {};
function walk(directory, prefix = "") {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) walk(path.join(directory, entry.name), relative);
    else fixtureHashes[relative] = sha256(readFileSync(path.join(directory, entry.name)));
  }
}
walk(path.join(study, "fixture"));
const dependencies = path.join(root, "node_modules/storyfolio-build-dependencies-20261011/node_modules");
symlinkSync(dependencies, path.join(runtime, "node_modules"), "dir");
const evidence = path.join(study, variant);
mkdirSync(evidence, { recursive: true });
writeFileSync(path.join(evidence, "story.tsx.original"), readFileSync(path.join(runtime, "components/story/story.tsx")));
const manifest = { schemaVersion: 1, variant, preparedAt: new Date().toISOString(), sourceRevision,
  rule: "All engine bytes from 39ceeb7, except patched Story from the working tree. Identical custom fixture overlays each runtime.",
  dependencies, node: process.version, engineSha256: hashes, fixtureSha256: fixtureHashes };
writeFileSync(path.join(evidence, "source-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ variant, runtime, sourceRevision, storySha256: hashes["components/story/story.tsx"] }, null, 2));
