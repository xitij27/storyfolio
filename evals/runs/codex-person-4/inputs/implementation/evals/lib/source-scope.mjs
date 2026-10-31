// Shared prospective actor/checker source boundary. This is not a filesystem jail.
import { lstat, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const SOURCE_EXCLUDED_DIRECTORIES = Object.freeze([
  "node_modules", ".next", ".git", ".cache", ".npm", ".turbo",
  "checks", "test-results", "playwright-report", "browser-cache",
]);
export const SOURCE_EXCLUSIONS = Object.freeze([
  ...SOURCE_EXCLUDED_DIRECTORIES, "*.tsbuildinfo", "next-env.d.ts (Next-generated)",
  "verified top-level hidden bare Git metadata trees (bounded layout and marker validation)",
]);
export const sourcePathExcluded = path => path.split("/").some(part =>
  SOURCE_EXCLUDED_DIRECTORIES.includes(part) || part.endsWith(".tsbuildinfo") || part === "next-env.d.ts");

const markerLimit = 65536;
const entryLimit = 10000;
const depthLimit = 32;
const objectId = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const reference = /^refs\/(?:heads|tags|remotes)\/[A-Za-z0-9_-][A-Za-z0-9_./-]*$/;
const validReference = value => reference.test(value) && !value.includes("..") && !value.includes("//") && !value.endsWith("/") && !value.endsWith(".lock");
const validHead = value => objectId.test(value.trim()) || (value.startsWith("ref: ") && validReference(value.trim().slice(5)));
const hooks = new Set(["applypatch-msg", "commit-msg", "fsmonitor-watchman", "post-update", "pre-applypatch", "pre-commit", "pre-merge-commit", "pre-push", "pre-rebase", "pre-receive", "prepare-commit-msg", "push-to-checkout", "sendemail-validate", "update"]);
const rootFiles = new Set(["HEAD", "config", "description", "index", "COMMIT_EDITMSG", "packed-refs", "shallow", "FETCH_HEAD", "ORIG_HEAD"]);

function directoryAllowed(path) {
  return ["hooks", "info", "objects", "objects/info", "objects/pack", "refs", "logs", "logs/refs"].includes(path)
    || /^objects\/[0-9a-f]{2}$/.test(path)
    || /^(?:logs\/)?refs\/(?:heads|tags|remotes)(?:\/[A-Za-z0-9_-][A-Za-z0-9_.-]*)*$/.test(path);
}
function fileAllowed(path) {
  if (rootFiles.has(path)) return true;
  if (path.startsWith("hooks/")) return hooks.has(path.slice(6).replace(/\.sample$/, ""));
  if (["info/exclude", "info/refs", "objects/info/packs", "objects/info/commit-graph", "logs/HEAD"].includes(path)) return true;
  if (/^objects\/[0-9a-f]{2}\/(?:[0-9a-f]{38}|[0-9a-f]{62})$/.test(path)) return true;
  if (/^objects\/pack\/pack-(?:[0-9a-f]{40}|[0-9a-f]{64})\.(?:pack|idx|rev|bitmap|keep)$/.test(path)) return true;
  return validReference(path) || (path.startsWith("logs/") && validReference(path.slice(5)));
}
function bareConfig(text) {
  let section = "", bare;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith(";")) continue;
    const header = line.match(/^\[([^\]]+)\]$/);
    if (header) { section = header[1].toLowerCase(); continue; }
    const setting = line.match(/^([A-Za-z][A-Za-z0-9-]*)\s*=\s*(.*?)\s*$/);
    if (!setting) return false;
    if (section === "core" && setting[1].toLowerCase() === "bare") {
      if (bare !== undefined) return false;
      bare = /^(?:true|yes|on|1)$/i.test(setting[2]);
    }
  }
  return bare === true;
}

/** Reject doubtful candidates rather than declaring arbitrary hidden directories metadata. */
export async function isBareGitMetadata(root, path, entry) {
  if (path.includes("/") || !/^\.[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(path) || !entry.isDirectory() || entry.isSymbolicLink()) return false;
  const directory = join(root, path);
  const inspect = async relative => lstat(join(directory, relative)).catch(error => {
    if (["ENOENT", "ENOTDIR"].includes(error.code)) return null;
    throw error;
  });
  for (const marker of ["HEAD", "config"]) {
    const info = await inspect(marker);
    if (!info?.isFile() || info.isSymbolicLink() || info.size > markerLimit) return false;
  }
  for (const marker of ["objects", "refs"]) {
    const info = await inspect(marker);
    if (!info?.isDirectory() || info.isSymbolicLink()) return false;
  }
  if (!validHead(await readFile(join(directory, "HEAD"), "utf8")) || !bareConfig(await readFile(join(directory, "config"), "utf8"))) return false;
  let count = 0;
  async function inspectTree(prefix = "", depth = 0) {
    if (depth > depthLimit) return false;
    for (const child of await readdir(join(directory, prefix), { withFileTypes: true })) {
      if (++count > entryLimit || child.isSymbolicLink()) return false;
      const relative = prefix ? `${prefix}/${child.name}` : child.name;
      if (child.isDirectory()) {
        if (!directoryAllowed(relative) || !await inspectTree(relative, depth + 1)) return false;
      } else {
        if (!child.isFile() || !fileAllowed(relative)) return false;
        if (relative.startsWith("refs/")) {
          const info = await inspect(relative);
          if (!info?.isFile() || info.isSymbolicLink() || info.size > markerLimit || !validHead(await readFile(join(directory, relative), "utf8"))) return false;
        }
      }
    }
    return true;
  }
  return inspectTree();
}

export async function sourceEntryExcluded(root, path, entry) {
  return sourcePathExcluded(path) || await isBareGitMetadata(root, path, entry);
}
