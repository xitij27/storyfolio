// Application cwd is distinct from the complete recovered source workspace.
import assert from "node:assert/strict";
import { lstat, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import { hash, regularBytes, safePath } from "../../full-journey-measurement/binding-lib.mjs";

export function applicationPath(value) {
  assert.equal(typeof value, "string");
  if (value !== ".") safePath(value);
  assert.ok(value === "." || !value.includes("\\"));
  return value;
}
export function packagePaths(applicationRoot) {
  applicationPath(applicationRoot);
  return ["package.json", "package-lock.json"].map(name => applicationRoot === "." ? name : `${applicationRoot}/${name}`);
}
export async function resolveApplication(workspace, applicationRoot, source) {
  applicationPath(applicationRoot); assert.equal(await realpath(workspace), resolve(workspace));
  let application = workspace;
  if (applicationRoot !== ".") for (const part of applicationRoot.split("/")) {
    application = join(application, part); const stat = await lstat(application);
    assert.ok(stat.isDirectory() && !stat.isSymbolicLink(), "Application root must be a real contained directory");
  }
  assert.equal(await realpath(application), application);
  for (const path of packagePaths(applicationRoot)) {
    const entry = source.files.find(file => file.path === path);
    assert.ok(entry, `Package omitted from complete source: ${path}`);
    const bytes = await regularBytes(workspace, path);
    assert.equal(hash(bytes), entry.sha256, `Package source changed: ${path}`); assert.equal(bytes.length, entry.bytes);
  }
  return application;
}
export function assertInstall(command, application, contract) {
  assert.equal(command.cwd, application, "Install cwd differs from attested application root");
  assert.equal(command.executable, contract.executable); assert.deepEqual(command.args, contract.args); assert.deepEqual(command.environment, contract.environment);
}
