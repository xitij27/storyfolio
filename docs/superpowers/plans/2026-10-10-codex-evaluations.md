# Codex evaluation migration

The author asked to stop using Claude Code and approved a separate Codex
comparison, with and without the skill. Preserve iteration 1 as historical
Claude evidence. Do not launch its runners. No skill wording changes are
part of this migration.

Use the installed Codex CLI, logged in through ChatGPT, and its configured
model, currently `gpt-6-astra` with medium reasoning. Keep that model and
effort fixed for both arms and the independent judge. Record the CLI version,
model, effort, commit, prompts, events, output files and token usage. Do not
invent dollar costs when the CLI does not report them.

Implement separate Codex entry points, sharing the existing fixtures,
judgement schema and report. Each conversation has a unique workspace outside
the repository and resumes its own thread for messages two and three.
Disable user configuration, rules, project instructions, plugins, apps,
memory and web search. Disable installed global skills explicitly; only the
with-skill workspace gets `.agents/skills/storyfolio`. Keep command execution
sandboxed, without network access, and disable shell tools for the judge.

First verify one real conversation and its judgement, including isolation
and artifact capture, before starting the rest. Keep successful trials as
part of `codex-1`, ten cases twice per arm. A failure stops the batch and
preserves its evidence. Resume completed cases without overwriting them.
Review disputed judgements against the conversations without silently
changing the rubric. Compare only the two Codex arms for this experiment.

Test event parsing, incomplete turns, process failures, configuration flags
and artifact boundaries. Run the existing local checks before committing.
Then run, judge, report, review representative conversations and record the
results in `evals/runs/codex-1/` and the handover.

Sources checked: installed `codex exec --help` (0.162.1),
[non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode),
[configuration](https://learn.chatgpt.com/docs/config-file/config-reference),
and [skills](https://learn.chatgpt.com/docs/build-skills). The official docs
guided JSONL events, resume, output schemas and per-skill disabling. No
additional downloaded skill is required for the current planning evaluation.
