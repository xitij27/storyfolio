// Prospective study-only rule. Keeps full inventories; never a directory ignore.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";

const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const cachePrefix = "server/route-cache/";
const rule = "next-app-page-build-seed-promotion-v1";
const safePath = path => typeof path === "string" && path.length > 0 && !path.startsWith("/") && !/[\\\0]/.test(path) && path.split("/").every(part => part && part !== "." && part !== "..");
function inventory(value) {
  assert.deepEqual(Object.keys(value).sort(), ["digest", "exclusions", "files"]);
  assert.ok(Array.isArray(value.files) && Array.isArray(value.exclusions));
  assert.equal(value.digest, hash(JSON.stringify(value.files)), "Inventory digest differs from full file list");
  assert.ok(value.exclusions.every(item => typeof item === "string"));
  const files = new Map();
  for (const row of value.files) {
    assert.deepEqual(Object.keys(row).sort(), ["bytes", "path", "sha256"], "Only regular-file inventory records are accepted");
    assert.ok(safePath(row.path) && !files.has(row.path), "Unsafe or duplicate inventory path");
    assert.ok(Number.isSafeInteger(row.bytes) && row.bytes >= 0 && /^[a-f0-9]{64}$/.test(row.sha256));
    files.set(row.path, row);
  }
  assert.ok(files.has("BUILD_ID"), "Production BUILD_ID is required");
  return files;
}
function metadata(path, files, bytesByPath) {
  assert.ok(Object.hasOwn(bytesByPath, path), "Missing metadata bytes: " + path);
  const bytes = bytesByPath[path], record = files.get(path);
  assert.ok(Buffer.isBuffer(bytes) && record, "Metadata requires exact retained bytes and an inventory record");
  assert.equal(bytes.length, record.bytes, "Metadata size changed: " + path);
  assert.equal(hash(bytes), record.sha256, "Metadata hash changed: " + path);
  const value = JSON.parse(bytes.toString("utf8"));
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value;
}

/** Pure comparison of full build inventories plus hash-bound metadata bytes.
 * Existing files, including earlier cache entries, may not change or disappear.
 * Only complete non-fallback APP_PAGE promotions of existing build seeds pass.
 */
export function compareBuildInventories(before, after, metadataBytes = {}) {
  const previous = inventory(before), current = inventory(after);
  assert.deepEqual(after.exclusions, before.exclusions, "Build exclusions changed");
  for (const [path, row] of previous) assert.deepEqual(current.get(path), row, "Existing build file changed or disappeared: " + path);
  const added = after.files.filter(row => !previous.has(row.path));
  assert.ok(added.every(row => row.path.startsWith(cachePrefix)), "Unexpected added build file");
  assert.deepEqual(after.files.filter(row => previous.has(row.path)), before.files, "Existing inventory order changed");
  const cacheFiles = after.files.filter(row => row.path.startsWith(cachePrefix));
  const accounted = new Set(), promotions = [];
  for (const metaRow of cacheFiles.filter(row => row.path.endsWith(".meta"))) {
    const match = /^server\/route-cache\/APP_PAGE\/([a-f0-9]{64})\/\$\/(.+)\.meta$/.exec(metaRow.path);
    assert.ok(match && safePath(match[2]), "Unknown response-cache metadata layout: " + metaRow.path);
    const base = metaRow.path.slice(0, -5), seedBase = "server/app/" + match[2];
    assert.ok(previous.has(seedBase + ".meta"), "Cache needs an immutable preexisting build seed");
    const seed = metadata(seedBase + ".meta", current, metadataBytes);
    const promoted = metadata(metaRow.path, current, metadataBytes);
    assert.equal(seed.routeCache?.owner?.kind, "APP_PAGE", "Only APP_PAGE seed owners are supported");
    assert.ok(typeof seed.routeCache.owner.sourceRoute === "string" && seed.routeCache.owner.sourceRoute.startsWith("/") && !seed.routeCache.owner.sourceRoute.includes("\0"));
    assert.equal(hash(seed.routeCache.owner.sourceRoute), match[1], "Cache namespace does not match the seed owner");
    assert.equal(seed.routeCache.key, base.slice("server".length), "Seed does not own this exact cache key");
    assert.equal(seed.routeCache.isFallback, false, "Fallback promotion is outside this observed rule");
    assert.ok(seed.postponed == null, "Postponed/PPR promotion is outside this observed rule");
    assert.ok(!Object.hasOwn(seed, "routeCacheLastModified"), "Build seed must not already be a runtime cache entry");
    const { routeCacheLastModified, ...rest } = promoted;
    assert.ok(Number.isSafeInteger(routeCacheLastModified) && routeCacheLastModified >= 0, "Cache timestamp must be a nonnegative safe integer");
    assert.deepEqual(rest, seed, "Cache metadata differs by more than its timestamp");
    assert.equal(metadataBytes[metaRow.path].toString("utf8"), JSON.stringify(promoted), "Promoted metadata must be the canonical Next writer output");
    assert.ok(Array.isArray(seed.segmentPaths) && new Set(seed.segmentPaths).size === seed.segmentPaths.length, "Seed segment inventory must be explicit and unique");
    const suffixes = [".html", ".rsc", ...seed.segmentPaths.map(segment => {
      assert.ok(typeof segment === "string" && segment.startsWith("/") && safePath(segment.slice(1)), "Unsafe seed segment path");
      return ".segments" + segment + ".segment.rsc";
    })];
    const payloads = [];
    for (const suffix of suffixes) {
      const path = base + suffix, seedPath = seedBase + suffix, seedRow = previous.get(seedPath), row = current.get(path);
      assert.ok(seedRow && row, "Incomplete cache promotion or missing immutable payload seed: " + path);
      assert.equal(row.bytes, seedRow.bytes, "Promoted payload size changed: " + path);
      assert.equal(row.sha256, seedRow.sha256, "Promoted payload bytes differ from build seed: " + path);
      assert.ok(!accounted.has(path), "Overlapping cache groups"); accounted.add(path);
      payloads.push({ path, seedPath, bytes: row.bytes, sha256: row.sha256 });
    }
    assert.ok(!accounted.has(metaRow.path), "Overlapping cache metadata"); accounted.add(metaRow.path);
    promotions.push({ key: seed.routeCache.key, owner: seed.routeCache.owner, seedMetadata: current.get(seedBase + ".meta"), cacheMetadata: metaRow, routeCacheLastModified, payloads });
  }
  assert.deepEqual([...accounted].sort(), cacheFiles.map(row => row.path).sort(), "Unknown, executable or incomplete response-cache payload");
  const immutableBefore = before.files.filter(row => !row.path.startsWith(cachePrefix));
  const immutableAfter = after.files.filter(row => !row.path.startsWith(cachePrefix));
  assert.deepEqual(immutableAfter, immutableBefore, "Immutable compiled build changed");
  return { schemaVersion: 1, rule, fullIdentityUnchanged: before.digest === after.digest,
    immutableBuildUnchanged: true, beforeDigest: before.digest, afterDigest: after.digest,
    immutableDigest: hash(JSON.stringify(immutableBefore)), addedCacheFiles: added,
    cacheInventory: cacheFiles, promotions,
    limits: "Only complete immutable-seed APP_PAGE promotions are accepted. Existing cache entries cannot change or disappear. Full inventories remain authoritative; this is not a render, controls or visual pass." };
}

/** Read-only adapter. Rechecks every current byte and every path component;
 * injected filesystem primitives permit pure tests with no real file access.
 */
export async function compareBuildIdentity(workspace, before, after, {
  lstatPath = lstat, readBytes = readFile, realPath = realpath,
} = {}) {
  inventory(before); inventory(after);
  const root = resolve(workspace);
  assert.equal(await realPath(root), root, "Workspace must be canonical");
  const checkedDirectories = new Set(), metadataBytes = {};
  const directory = async path => {
    if (checkedDirectories.has(path)) return;
    const info = await lstatPath(path);
    assert.ok(!info.isSymbolicLink() && info.isDirectory(), "Non-directory or symlink build ancestor: " + path);
    checkedDirectories.add(path);
  };
  await directory(root); await directory(join(root, ".next"));
  for (const row of after.files) {
    const parts = row.path.split("/"); let path = join(root, ".next");
    for (const part of parts.slice(0, -1)) { path = join(path, part); await directory(path); }
    path = join(path, parts.at(-1));
    const info = await lstatPath(path);
    assert.ok(!info.isSymbolicLink() && info.isFile(), "Non-regular or symlink build file: " + row.path);
    const bytes = await readBytes(path);
    assert.equal(bytes.length, row.bytes, "Current build size differs from inventory: " + row.path);
    assert.equal(hash(bytes), row.sha256, "Current build bytes differ from inventory: " + row.path);
    if (row.path.endsWith(".meta")) metadataBytes[row.path] = bytes;
  }
  return compareBuildInventories(before, after, metadataBytes);
}
