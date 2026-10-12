// No-model, no-browser temporary source fixtures. Nothing touches evaluated work.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { applicationPath, resolveApplication, assertInstall } from "./app-root.mjs";
import { assertRecovery, assertArchive, assertCurrent, captureSource, hash } from "./amendment-lib.mjs";
import { writeNew } from "./binding-lib.mjs";
import { activateChoice } from "./choice-activation.mjs";

async function fixture(t, app = "site") {
  const directory = await mkdtemp(join(tmpdir(), "storyfolio-recovery-unit-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const application = app === "." ? directory : join(directory, app);
  await mkdir(application, { recursive: true }); await mkdir(join(directory, "docs"));
  await writeFile(join(application, "package.json"), '{"name":"fixture"}\n'); await writeFile(join(application, "package-lock.json"), '{"lockfileVersion":3}\n');
  await writeFile(join(directory, "docs/note.md"), "Preserved sibling\n");
  const source = await captureSource(directory);
  const official = { files: Object.fromEntries(source.files.filter(file => file.path.startsWith("docs/")).map(file => [file.path, { type: "file", hash: file.sha256, size: file.bytes }])), unexpected: [{ path: ".aws", type: "directory" }, { path: ".codex", type: "directory" }, { path: "site", type: "directory" }] };
  const identity = { actorResultSha256: "a".repeat(64), workspace: directory, applicationRoot: "site" };
  const recovery = { kind: "post-closure source recovery, not original actor snapshot", actorResultSha256: identity.actorResultSha256, originalWorkspace: directory,
    sourceDigest: source.digest, sourceFiles: source.files.length, officialSnapshotFiles: Object.keys(official.files).length, sourceUnchangedDuringCopy: true,
    observedAt: "2026-10-12T15:33:54.304Z", limits: "does not retroactively establish closure identity", additionalSource: source.files.filter(file => !Object.hasOwn(official.files, file.path)) };
  return { directory, application, source, official, identity, recovery };
}
test("complete recovery binds both official sibling and all additional application files", async t => {
  const f = await fixture(t); assert.equal(assertRecovery(f.source, f.recovery, f.official, f.identity).length, 2);
  await assertArchive(f.directory, f.source); await assertCurrent(f.directory, f.source);
  assert.equal(await resolveApplication(f.directory, "site", f.source), f.application);
});
test("root application still selects whole root while retaining sibling inventory", async t => {
  const f = await fixture(t, "."); assert.equal(await resolveApplication(f.directory, ".", f.source), f.directory); await assertCurrent(f.directory, f.source);
});
test("unsafe, escaped, absolute and empty application roots are rejected", () => {
  for (const path of ["", "../site", "/site", "site/../other", "site//child", "site\\child", "site/./child", ".git", "site\0child"]) assert.throws(() => applicationPath(path), path);
});
test("a symlinked application root is rejected", async t => {
  const f = await fixture(t); await symlink(f.application, join(f.directory, "alias"));
  await assert.rejects(resolveApplication(f.directory, "alias", f.source));
});
test("a symlinked package is rejected even when its bytes match", async t => {
  const f = await fixture(t); await rm(join(f.application, "package.json")); await symlink(join(f.application, "package-lock.json"), join(f.application, "package.json"));
  await assert.rejects(resolveApplication(f.directory, "site", f.source)); await assert.rejects(assertArchive(f.directory, f.source));
});
test("changed or missing package and lock bytes reject application selection", async t => {
  const f = await fixture(t); await writeFile(join(f.application, "package.json"), '{}\n'); await assert.rejects(resolveApplication(f.directory, "site", f.source));
  const g = await fixture(t); await rm(join(g.application, "package-lock.json")); await assert.rejects(resolveApplication(g.directory, "site", g.source));
});
test("changed, missing or unexplained source including siblings rejects current/archive equality", async t => {
  for (const action of [async f => writeFile(join(f.directory, "docs/note.md"), "changed\n"), async f => rm(join(f.application, "package.json")), async f => writeFile(join(f.directory, "extra.txt"), "unknown")]) {
    const f = await fixture(t); await action(f); await assert.rejects(assertCurrent(f.directory, f.source)); await assert.rejects(assertArchive(f.directory, f.source));
  }
});
test("declared empty unexpected directories cannot contain payloads", async t => {
  const f = await fixture(t); await mkdir(join(f.directory, ".aws")); await assertCurrent(f.directory, f.source, [".aws"]);
  await writeFile(join(f.directory, ".aws/payload"), "unknown"); await assert.rejects(assertCurrent(f.directory, f.source, [".aws"]));
});
test("changed official or extra inventory, digest, counts, provenance and policy reject recovery", async t => {
  const f = await fixture(t);
  const mutations = [
    g => { g.source.files[0].sha256 = "b".repeat(64); },
    g => { g.recovery.additionalSource.pop(); },
    g => { delete g.official.files["docs/note.md"]; },
    g => { g.recovery.sourceFiles++; }, g => { g.recovery.sourceUnchangedDuringCopy = false; },
    g => { g.recovery.originalWorkspace += "-other"; }, g => { g.recovery.actorResultSha256 = "b".repeat(64); },
    g => { g.source.exclusions = []; }, g => { g.official.unexpected.push({ path: "other", type: "directory" }); },
    g => { g.recovery.kind = "original actor snapshot"; },
  ];
  for (const mutate of mutations) { const g = structuredClone(f); mutate(g); assert.throws(() => assertRecovery(g.source, g.recovery, g.official, g.identity)); }
});
test("omitted non-site application source cannot be recategorized as recovered metadata", async t => {
  const f = await fixture(t), g = structuredClone(f); const file = { path: "other/app.ts", bytes: 1, sha256: "b".repeat(64) };
  g.source.files.push(file); g.source.digest = hash(JSON.stringify(g.source.files)); g.recovery.sourceDigest = g.source.digest; g.recovery.sourceFiles++; g.recovery.additionalSource.push(file);
  assert.throws(() => assertRecovery(g.source, g.recovery, g.official, g.identity), /declared omitted application tree/);
});
test("existing file, total byte and file count limits remain enforced", async t => {
  const f = await fixture(t);
  for (const policy of [{ maxFiles: 1, maxBytes: 1000, maxFileBytes: 1000 }, { maxFiles: 100, maxBytes: 1, maxFileBytes: 1000 }, { maxFiles: 100, maxBytes: 1000, maxFileBytes: 1 }]) assert.throws(() => assertRecovery(f.source, f.recovery, f.official, f.identity, policy));
});
test("install runs from application cwd, not whole workspace, with exact contract", () => {
  const contract = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { PATH: "native", NEXT_TELEMETRY_DISABLED: null } };
  const command = { ...contract, cwd: "/fixture/site" }; assertInstall(command, "/fixture/site", contract);
  assert.throws(() => assertInstall({ ...command, cwd: "/fixture" }, "/fixture/site", contract));
  assert.throws(() => assertInstall({ ...command, environment: { ...contract.environment, NEXT_TELEMETRY_DISABLED: "1" } }, "/fixture/site", contract));
});
test("evidence writes refuse an existing target, never overwrite or retry", async t => {
  const f = await fixture(t); const target = join(f.directory, "attempt.json"); await writeNew(target, "first\n"); await assert.rejects(writeNew(target, "replacement\n"), /EEXIST/);
});

function fakePage(routes, initial) {
  const events = [], state = { route: initial, look: "dark" };
  const page = {
    locator(selector) {
      events.push(["lookup", state.route, selector]);
      const node = routes[state.route]?.[selector];
      return {
        count: async () => node ? 1 : 0,
        evaluate: async fn => fn({ getAttribute: () => null, textContent: node?.name }),
        click: async () => { assert.ok(node); events.push(["click", state.route, selector]); if (node.route) state.route = node.route; if (node.look) state.look = node.look; },
      };
    },
    waitForTimeout: async ms => events.push(["wait", ms]),
    evaluate: async () => ({ ...state }),
  };
  return { page, events, go: async route => { events.push(["go", route]); state.route = route; }, observe: () => null };
}
test("cross-route initial activation finds chooser only on its declared source route", async () => {
  const f = fakePage({ "/": { "a.choice": { name: "Fixture", route: "/sketch/fixture" } }, "/sketch/fixture": {} }, "/sketch/fixture");
  // The original worker's destination-first lookup deterministically fails.
  assert.equal(await f.page.locator("a.choice").count(), 0);
  f.events.length = 0;
  const actual = await activateChoice({ ...f, control: { fromRoute: "/", selector: "a.choice", name: "Fixture" } });
  assert.equal(actual.observation.route, "/sketch/fixture");
  assert.deepEqual(f.events, [["go", "/"], ["lookup", "/", "a.choice"], ["click", "/", "a.choice"], ["wait", 1800]]);
});
test("same-route choices use only a declared real preparation and record both observations", async () => {
  const f = fakePage({ "/story": { ".light": { name: "Light", look: "light" }, ".dark": { name: "Dark", look: "dark" } } }, "/story");
  const actual = await activateChoice({ ...f, control: { fromRoute: "/story", selector: ".dark", name: "Dark", prepareControl: { selector: ".light", name: "Light" } } });
  assert.equal(actual.preparation.observation.look, "light"); assert.equal(actual.observation.look, "dark");
  assert.deepEqual(f.events.filter(event => event[0] === "click").map(event => event[2]), [".light", ".dark"]);
});
test("missing or renamed initial chooser is still an activation error, never waived", async () => {
  for (const control of [{ selector: ".missing", name: "Choice" }, { selector: ".choice", name: "Wrong name" }]) {
    const f = fakePage({ "/": { ".choice": { name: "Choice" } } }, "/destination");
    await assert.rejects(activateChoice({ ...f, control: { fromRoute: "/", ...control } }));
    assert.equal(f.events.some(event => event[0] === "click"), false);
  }
});
