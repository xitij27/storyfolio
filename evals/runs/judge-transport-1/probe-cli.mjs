// Configuration inspection only: never calls exec without --help or a model.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildJudgeArgs } from "../../codex-build-judge.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../..");
const evidenceServer = { script: resolve(root, "evals/judge-evidence-server.mjs"), bundle: resolve(directory, "not-created-bundle.json"), ledger: resolve(directory, "not-created-ledger.jsonl") };
const args = buildJudgeArgs({ evidenceServer });
const run = values => {
  const result = spawnSync("codex", values, { cwd: directory, encoding: "utf8", timeout: 10000 });
  if (result.error) throw result.error;
  assert.equal(result.status, 0, `Configuration-only Codex command failed (${result.status}); no model requested`);
  return result;
};
const help = run([...args, "--help"]);
assert.match(help.stdout, /Usage: codex exec/);
const table = args.find(value => value.startsWith("mcp_servers="));
// A previous table deliberately contains a bogus server. The final complete
// table must replace it, never leave an inherited extra capability enabled.
const config = run(["mcp", "list", "--json", "-c", 'mcp_servers={must_not_survive={command="never-launch-this-synthetic-command"}}', "-c", table]);
const servers = JSON.parse(config.stdout);
assert.ok(Array.isArray(servers));
assert.deepEqual(servers.map(server => server.name), ["storyfolio_evidence"], "Complete MCP table override must replace other servers");
const server = servers[0];
assert.equal(server.enabled, true);
assert.equal(server.transport.command, process.execPath);
assert.deepEqual(server.transport.args, [evidenceServer.script, "--bundle", evidenceServer.bundle, "--ledger", evidenceServer.ledger]);
const version = run(["--version"]).stdout.trim();
const locations = spawnSync("which", ["codex"], { encoding: "utf8" });
assert.equal(locations.status, 0);
const executable = realpathSync(locations.stdout.trim());
console.log(JSON.stringify({ schemaVersion: 1, kind: "no-model-cli-configuration-probe", version, executable,
  cliSha256: createHash("sha256").update(readFileSync(executable)).digest("hex"),
  helpAcceptedArguments: true, completeMcpTableReplacesEarlierTable: true,
  visibleServerCount: servers.length, expectedCommandAndArguments: true,
  configurations: { enabledTools: ["read_page"], required: true, outputTokenLimit: 65536 },
  modelCalls: 0, accessorStarted: false,
  limitations: "Exec --help checks argument syntax, not session startup. MCP list checks actual parsed local configuration and table replacement, not client handshake, tool-output history retention, model comprehension or performance. No model or accessor is invoked.",
}, null, 2));
