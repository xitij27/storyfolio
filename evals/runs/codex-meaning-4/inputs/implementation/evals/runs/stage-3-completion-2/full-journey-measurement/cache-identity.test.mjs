// Pure fixtures and injected filesystem metadata only. No real runtime or files.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import test from "node:test";
import { compareBuildInventories, compareBuildIdentity } from "./cache-identity.mjs";

const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const makeInventory = bytes => {
  const files = Object.entries(bytes).sort(([a], [b]) => a.localeCompare(b)).map(([path, value]) => ({ path, bytes: value.length, sha256: hash(value) }));
  return { files, digest: hash(JSON.stringify(files)), exclusions: ["cache", "trace", "trace-build", "diagnostics", "dev"] };
};
function fixture() {
  const sourceRoute = "/page", base = "server/route-cache/APP_PAGE/" + hash(sourceRoute) + "/$/index", seedBase = "server/app/index";
  const seed = { headers: { "x-nextjs-prerender": "1" }, segmentPaths: ["/_tree", "/_full", "/__PAGE__"], routeCache: { key: base.slice(6), owner: { kind: "APP_PAGE", sourceRoute }, isFallback: false } };
  const beforeBytes = { BUILD_ID: Buffer.from("production-build"), "server/app/page.js": Buffer.from("compiled route"), [seedBase + ".meta"]: Buffer.from(JSON.stringify(seed, null, 2) + "\n") };
  const afterBytes = {};
  for (const suffix of [".html", ".rsc", ...seed.segmentPaths.map(segment => ".segments" + segment + ".segment.rsc")]) {
    beforeBytes[seedBase + suffix] = Buffer.from("immutable seed " + suffix);
    afterBytes[base + suffix] = Buffer.from(beforeBytes[seedBase + suffix]);
  }
  Object.assign(afterBytes, beforeBytes);
  afterBytes[base + ".meta"] = Buffer.from(JSON.stringify({ ...seed, routeCacheLastModified: 1791779672713 }));
  return { base, seedBase, seed, beforeBytes, afterBytes };
}
const compare = f => compareBuildInventories(makeInventory(f.beforeBytes), makeInventory(f.afterBytes), f.afterBytes);
test("six observed APP_PAGE seed promotions retain complete raw and secondary inventories", () => {
  const f = fixture(), result = compare(f);
  assert.equal(result.fullIdentityUnchanged, false); assert.equal(result.immutableBuildUnchanged, true);
  assert.equal(result.addedCacheFiles.length, 6); assert.equal(result.cacheInventory.length, 6); assert.equal(result.promotions.length, 1);
  assert.equal(result.promotions[0].payloads.length, 5); assert.equal(result.promotions[0].owner.sourceRoute, "/page");
  assert.equal(makeInventory(f.beforeBytes).files.length + 6, makeInventory(f.afterBytes).files.length);
});
test("exact original identity and exact preexisting validated cache identity remain valid", () => {
  const f = fixture(), original = makeInventory(f.beforeBytes), promoted = makeInventory(f.afterBytes);
  assert.equal(compareBuildInventories(original, original, {}).fullIdentityUnchanged, true);
  const result = compareBuildInventories(promoted, promoted, f.afterBytes);
  assert.equal(result.fullIdentityUnchanged, true); assert.equal(result.addedCacheFiles.length, 0); assert.equal(result.cacheInventory.length, 6);
});
test("changed HTML, RSC, segment or compiled byte and deleted original cannot pass", () => {
  for (const suffix of [".html", ".rsc", ".segments/_tree.segment.rsc"]) { const f = fixture(); f.afterBytes[f.base + suffix] = Buffer.from("changed payload"); assert.throws(() => compare(f), /payload/); }
  for (const path of ["BUILD_ID", "server/app/page.js", "server/app/index.html"]) {
    const f = fixture(); f.afterBytes[path] = Buffer.from("changed original"); assert.throws(() => compare(f), /Existing build file/);
    delete f.afterBytes[path]; assert.throws(() => compare(f));
  }
});
test("missing seed or partial cache publication remains a failure", () => {
  for (const suffix of [".html", ".meta", ".rsc", ".segments/__PAGE__.segment.rsc"]) {
    const f = fixture(); delete f.afterBytes[f.base + suffix]; assert.throws(() => compare(f));
  }
  const f = fixture(); delete f.beforeBytes[f.seedBase + ".html"]; delete f.afterBytes[f.seedBase + ".html"]; assert.throws(() => compare(f), /missing immutable payload seed/);
});
test("metadata only permits the exact numeric timestamp addition and canonical writer form", () => {
  const mutations = [value => { value.extra = true; }, value => { value.headers.injected = "changed"; }, value => { delete value.routeCacheLastModified; }, value => { value.routeCacheLastModified = "time"; }, value => { value.routeCacheLastModified = -1; }, value => { value.routeCacheLastModified = 1.5; }];
  for (const mutate of mutations) { const f = fixture(), value = JSON.parse(f.afterBytes[f.base + ".meta"]); mutate(value); f.afterBytes[f.base + ".meta"] = Buffer.from(JSON.stringify(value)); assert.throws(() => compare(f)); }
  const f = fixture(); f.afterBytes[f.base + ".meta"] = Buffer.from(f.afterBytes[f.base + ".meta"].toString() + "\n"); assert.throws(() => compare(f), /canonical/);
});
test("wrong owner, key, namespace, fallback, postponed and segment traversal fail closed", () => {
  const mutations = [seed => { seed.routeCache.owner.kind = "APP_ROUTE"; }, seed => { seed.routeCache.owner.sourceRoute = "/other/page"; }, seed => { seed.routeCache.key += "-other"; }, seed => { seed.routeCache.isFallback = true; }, seed => { seed.postponed = "dynamic"; }, seed => { seed.segmentPaths = ["/../escape"]; }, seed => { seed.segmentPaths = ["/_tree", "/_tree"]; }];
  for (const mutate of mutations) {
    const f = fixture(); mutate(f.seed); const bytes = Buffer.from(JSON.stringify(f.seed));
    f.beforeBytes[f.seedBase + ".meta"] = bytes; f.afterBytes[f.seedBase + ".meta"] = bytes;
    f.afterBytes[f.base + ".meta"] = Buffer.from(JSON.stringify({ ...f.seed, routeCacheLastModified: 1 })); assert.throws(() => compare(f));
  }
});
test("unknown/executable cache files, kinds and similarly named ordinary directories are not excluded", () => {
  for (const path of ["server/route-cache/extra.js", "server/route-cache/APP_ROUTE/value.body", "server/route-cache-ish/extra.html"]) { const f = fixture(); f.afterBytes[path] = Buffer.from("unknown"); assert.throws(() => compare(f)); }
  const f = fixture(); f.afterBytes[f.base + ".js"] = Buffer.from("executable"); assert.throws(() => compare(f), /Unknown, executable/);
});
test("preexisting cache payloads cannot change or disappear between modes", () => {
  const f = fixture(), before = makeInventory(f.afterBytes); f.afterBytes[f.base + ".html"] = Buffer.from("changed");
  assert.throws(() => compareBuildInventories(before, makeInventory(f.afterBytes), f.afterBytes), /Existing build file/);
  delete f.afterBytes[f.base + ".html"]; assert.throws(() => compareBuildInventories(before, makeInventory(f.afterBytes), f.afterBytes), /Existing build file/);
});
test("metadata evidence and full inventory hashes cannot be stale or invented", () => {
  const f = fixture(), before = makeInventory(f.beforeBytes), after = makeInventory(f.afterBytes);
  assert.throws(() => compareBuildInventories(before, after, {}), /Missing metadata bytes/);
  assert.throws(() => compareBuildInventories(before, after, { ...f.afterBytes, [f.base + ".meta"]: Buffer.from("{}") }), /Metadata size/);
  assert.throws(() => compareBuildInventories(before, { ...after, digest: "0".repeat(64) }, f.afterBytes), /digest/);
  assert.throws(() => compareBuildInventories(before, { ...after, exclusions: [...after.exclusions, "server"] }, f.afterBytes), /exclusions/);
  const malformed = structuredClone(after); malformed.files[0].type = "symlink"; malformed.digest = hash(JSON.stringify(malformed.files)); assert.throws(() => compareBuildInventories(before, malformed, f.afterBytes), /regular-file/);
});
function filesystem(f, overrides = {}) {
  const workspace = "/fictional/work", files = new Map(Object.entries(f.afterBytes).map(([path, bytes]) => [join(workspace, ".next", path), bytes]));
  const dirs = new Set([workspace, join(workspace, ".next")]);
  for (const path of files.keys()) for (let parent = dirname(path); parent.startsWith(workspace); parent = dirname(parent)) dirs.add(parent);
  const reads = [];
  return { workspace, reads, io: { realPath: async path => path,
    lstatPath: async path => { if (overrides[path]) return overrides[path]; assert.ok(files.has(path) || dirs.has(path)); return { isSymbolicLink: () => false, isFile: () => files.has(path), isDirectory: () => dirs.has(path) }; },
    readBytes: async path => { reads.push(path); assert.ok(files.has(path)); return files.get(path); } } };
}
test("read-only adapter checks every byte using injected metadata without real filesystem access", async () => {
  const f = fixture(), fs = filesystem(f), result = await compareBuildIdentity(fs.workspace, makeInventory(f.beforeBytes), makeInventory(f.afterBytes), fs.io);
  assert.equal(result.immutableBuildUnchanged, true); assert.equal(fs.reads.length, Object.keys(f.afterBytes).length);
});
test("symlink or non-regular payload and any symlink ancestor fail before reading that path", async () => {
  const f = fixture();
  for (const path of ["/fictional/work", "/fictional/work/.next", "/fictional/work/.next/server/route-cache", "/fictional/work/.next/" + f.base + ".html"]) {
    const fs = filesystem(f, { [path]: { isSymbolicLink: () => true, isFile: () => false, isDirectory: () => false } });
    await assert.rejects(compareBuildIdentity(fs.workspace, makeInventory(f.beforeBytes), makeInventory(f.afterBytes), fs.io), /symlink/);
    assert.ok(!fs.reads.includes(path));
  }
  const path = "/fictional/work/.next/" + f.base + ".rsc", fs = filesystem(f, { [path]: { isSymbolicLink: () => false, isFile: () => false, isDirectory: () => false } });
  await assert.rejects(compareBuildIdentity(fs.workspace, makeInventory(f.beforeBytes), makeInventory(f.afterBytes), fs.io), /Non-regular/);
});
test("adapter rejects current byte drift despite an apparently valid saved inventory", async () => {
  const f = fixture(), fs = filesystem(f), read = fs.io.readBytes;
  fs.io.readBytes = async path => path.endsWith("page.js") ? Buffer.from("mutated after inventory") : read(path);
  await assert.rejects(compareBuildIdentity(fs.workspace, makeInventory(f.beforeBytes), makeInventory(f.afterBytes), fs.io), /Current build/);
});
