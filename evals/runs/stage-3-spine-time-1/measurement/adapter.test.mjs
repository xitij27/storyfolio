// Static preparation checks, not a browser or actor-behavior pass.
import assert from "node:assert/strict";
import { readFile, realpath } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
const here = dirname(fileURLToPath(import.meta.url));
const names = ["gate-worker.mjs", "final-worker.mjs", "run-unit.mjs", "supplemental-verify.mjs"];
for (const name of names) test(`${name}: relative imports resolve without executing a worker`, async () => {
  const code = await readFile(resolve(here, name), "utf8");
  const imports = [...code.matchAll(/from\s+["'](\.[^"']+)["']/g)]; assert.ok(imports.length > 0);
  for (const [, path] of imports) assert.equal(await realpath(resolve(here, path)), resolve(here, path));
});
test("real fragment hit helper and complete-source capture remain present", async () => {
  const code = await readFile(resolve(here, names[0]), "utf8");
  assert.ok(code.includes("./hit-target-2.mjs"));
  assert.ok(code.includes("await captureSource(workspace)"));
  assert.ok(code.includes("await resolveApplication(workspace"));
  assert.ok(!code.includes("force: true"));
});
test("supplemental audit binds actual launcher and worker identity", async () => {
  const code = await readFile(resolve(here, names[3]), "utf8");
  for (const expression of ["assertSupervisor(outer, terminal, command, events)", "assert.deepEqual(saved.args, args)", "assert.equal(saved.workerSha256, adapter.helperHashes[worker])", "originalVerifierStillRequired: true"])
    assert.ok(code.includes(expression), expression);
});
