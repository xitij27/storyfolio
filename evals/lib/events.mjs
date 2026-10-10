/*
  Reads what one turn of `claude -p --output-format stream-json --verbose`
  printed, which is one JSON object to a line. Nothing here starts an agent
  or touches a file, so it is tested as it is.
*/
import { basename, isAbsolute, join, relative, resolve } from "node:path";

/** The events of a stream. Blank lines, and lines that are not JSON, are left out. */
export function parseStream(text) {
  const events = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      // Something the command printed that is not an event.
    }
  }
  return events;
}

/**
 * What a turn came to: everything the agent said to the person, each tool it
 * called and with what, and how the turn ended. A turn with no result event
 * was cut off, and counts as failed.
 */
export function summariseTurn(events) {
  const said = [];
  const tools = [];
  let result = null;
  for (const event of events) {
    if (event.type === "assistant") {
      for (const block of event.message?.content ?? []) {
        if (block.type === "text" && block.text.trim()) said.push(block.text.trim());
        if (block.type === "tool_use") tools.push({ name: block.name, input: block.input ?? {} });
      }
    }
    if (event.type === "result") result = event;
  }
  return {
    reply: said.join("\n\n"),
    tools,
    sessionId: result?.session_id ?? null,
    costUsd: result?.total_cost_usd ?? 0,
    durationMs: result?.duration_ms ?? 0,
    failed: result === null || result.is_error === true,
  };
}

/** Whether a turn called the skill of that name. */
export function usedSkill(turn, name) {
  return turn.tools.some((tool) => tool.name === "Skill" && tool.input.skill === name);
}

/**
 * The files these turns wrote or changed, each once, in the order they were
 * first written: the paths as the agent gave them. An agent does not always
 * write where it stands. One told to build nothing may keep its plan in a
 * scratch folder of its own.
 */
export function filesWritten(turns) {
  const paths = [];
  for (const turn of turns) {
    for (const tool of turn.tools) {
      if (tool.name !== "Write" && tool.name !== "Edit") continue;
      const path = String(tool.input.file_path ?? "");
      if (path && !paths.includes(path)) paths.push(path);
    }
  }
  return paths;
}

/**
 * The last words these turns gave the Write tool for each file, by the path
 * as the agent gave it. They are there whether or not the write was allowed:
 * with nobody to allow it, a write outside the agent's folder is refused,
 * and the words it meant to write are then nowhere else.
 */
export function lastWrites(turns) {
  const words = new Map();
  for (const turn of turns) {
    for (const tool of turn.tools) {
      if (tool.name !== "Write") continue;
      const path = String(tool.input.file_path ?? "");
      if (path) words.set(path, String(tool.input.content ?? ""));
    }
  }
  return words;
}

/**
 * Where a file the agent wrote is to be found, and the name it is kept under
 * among a run's results. A file in the agent's own folder, `work`, is kept
 * under its path there. One written anywhere else is kept under outside/ by
 * its name, with a number in front if that name is `taken`. What the agent
 * was given, its material and its skills, is not kept: null.
 */
export function keptAs(work, given, taken) {
  const from = isAbsolute(given) ? given : resolve(work, given);
  const inside = relative(work, from);
  if (inside === "" || inside.startsWith("material/") || inside.startsWith(".claude/")) return null;
  let kept = inside.startsWith("..") ? join("outside", basename(from)) : inside;
  for (let n = 2; taken.includes(kept); n++) kept = join("outside", `${n}-${basename(from)}`);
  return { from, kept };
}

/** The tools that read a file, and where each is told which. */
const READING = { Read: ["file_path"], Grep: ["path", "glob"] };

/**
 * Whether a tool that reads was pointed at one of these files. A file is
 * known by its name alone, since an agent may give a path in any form. A
 * file that is only written about, in a note or a reply, is not touched.
 */
export function touched(turns, files) {
  const names = files.map((file) => file.split("/").pop());
  return turns.some((turn) =>
    turn.tools.some((tool) =>
      (READING[tool.name] ?? []).some((field) =>
        names.some((name) => String(tool.input[field] ?? "").includes(name)),
      ),
    ),
  );
}

/** Whether any of these texts repeats one of these strings, in any case. */
export function leaked(texts, strings) {
  const lowered = texts.map((text) => text.toLowerCase());
  return strings.some((string) => lowered.some((text) => text.includes(string.toLowerCase())));
}
