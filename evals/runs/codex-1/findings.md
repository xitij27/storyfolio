# Codex comparison

Started on 10 October 2026 at the author's request. Uses Codex CLI 0.162.1,
`gpt-6-astra`, medium reasoning, for both planning and independent judging.
The current skill is compared with no skill. This does not isolate the
effect of the five changes from the earlier Claude test.

## Harness trial

The first case is `chef/without-1`, a real baseline conversation kept for
the comparison. Its first-turn session record was inspected: the workspace
is outside this repository, and its input contains no skills catalog or
repository AGENTS.md. It received the fixture's first message unchanged,
read the two material files and returned a plan. Its JSONL events include
command execution, assistant messages and a thread ID. The runner resumed
that ID for message two.

The local checks pass: skill form, ten whole people and the test suite,
including three new tests for Codex events and isolation flags. A follow-up
change writes event streams as they arrive, so interruption does not lose
the partial turn. The trial began before that logging change.

No scores or conclusions about the skill yet. Complete the trial, check
judging and the with-skill catalog, then run the remaining conversations.
