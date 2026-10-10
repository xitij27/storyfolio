import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { walk } from "./files.mjs";
import { parseStream } from "./events.mjs";

export const MODEL = "gpt-6.1-sol";
export const JUDGE_MODEL = "gpt-6-astra";
export const EFFORT = "medium";

export async function disabledSkills() {
  const roots = [join(homedir(), ".codex", "skills"), join(homedir(), ".agents", "skills"), "/etc/codex/skills"];
  const paths = [];
  for (const root of roots) {
    for (const file of await walk(root)) {
      if (file.endsWith("SKILL.md")) paths.push(join(root, file));
    }
  }
  // CLI versions have documented both file and folder forms. Disable both.
  return paths.flatMap(path => [path, dirname(path)]);
}

export function codexArgs({ model, sessionId, judge = false, schema, disabled = [] } = {}) {
  const config = {
    model_reasoning_effort: EFFORT,
    approval_policy: "never",
    sandbox_mode: judge ? "read-only" : "workspace-write",
    "sandbox_workspace_write.network_access": false,
    project_doc_max_bytes: 0,
    web_search: "disabled",
    "features.apps": false,
    "features.plugins": false,
    "features.remote_plugin": false,
    "features.memories": false,
    "features.multi_agent": false,
    "features.skill_search": false,
    "features.shell_snapshot": false,
    "features.hooks": false,
    "features.image_generation": false,
    "features.browser_use": false,
    "features.browser_use_external": false,
    "features.unbounded_connection_retries": false,
    ...(judge ? { "features.shell_tool": false, "features.unified_exec": false } : {}),
  };
  const args = ["exec", ...(sessionId ? ["resume"] : []), "--ignore-user-config", "--ignore-rules", "--skip-git-repo-check", "--json", "--model", model ?? (judge ? JUDGE_MODEL : MODEL)];
  for (const [key, value] of Object.entries(config)) args.push("-c", `${key}=${JSON.stringify(value)}`);
  if (disabled.length) args.push("-c", `skills.config=[${disabled.map(path => `{path=${JSON.stringify(path)},enabled=false}`).join(",")}]`);
  if (schema) args.push("--output-schema", schema);
  if (sessionId) args.push(sessionId);
  args.push("-");
  return args;
}

export function summariseCodex(stdout, code = 0) {
  const events = parseStream(stdout);
  const items = events.filter(e => e.type === "item.completed").map(e => e.item);
  const final = events.findLast(e => e.type === "turn.completed");
  return {
    reply: items.filter(i => i.type === "agent_message").map(i => i.text).join("\n\n"),
    sessionId: events.find(e => e.type === "thread.started")?.thread_id ?? null,
    commands: items.filter(i => i.type === "command_execution").map(i => ({ command: i.command, output: i.aggregated_output, exitCode: i.exit_code })),
    usage: final?.usage ?? null,
    failed: code !== 0 || !final || events.some(e => e.type === "turn.failed"),
    error: events.filter(e => e.type === "error" || e.type === "turn.failed"),
  };
}

export function invokeCodex({ cwd, prompt, streamPath, timeoutMs = 25 * 60 * 1000, ...options }) {
  return new Promise(resolve => {
    const started = Date.now();
    const args = codexArgs(options);
    const log = streamPath ? createWriteStream(streamPath) : null;
    const child = spawn("codex", args, { cwd, stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "", stderr = "", timedOut = false;
    const timer = setTimeout(() => { timedOut = true; child.kill("SIGTERM"); }, timeoutMs);
    child.stdout.on("data", chunk => { stdout += chunk; log?.write(chunk); });
    child.stderr.on("data", chunk => stderr += chunk);
    child.on("error", error => { clearTimeout(timer); log?.end(); resolve({ stdout, stderr: String(error), code: -1, durationMs: Date.now() - started, args }); });
    child.on("close", code => {
      clearTimeout(timer);
      const done = () => resolve({ stdout, stderr, code: timedOut ? -1 : code, durationMs: Date.now() - started, args });
      if (log) log.end(done); else done();
    });
    child.stdin.on("error", () => {});
    child.stdin.end(prompt);
  });
}
