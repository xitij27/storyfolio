# Final-check build-folder decision, 21 October 2026

After turn 6 ([disposition](../../evals/runs/stage-3-spine-time-1/recovery/turn-6-disposition.md)),
root (Claude Code) asked one question and recorded the answer as given
through the question tool. The author's preceding message was, verbatim:

> okay what next

Question: "The final check builds the agent's site and compares its
source before and after. The agent made `.next-concepts` the default
build folder, which the original source comparison counts as source, so
every unit would fail on the build's own output. How should the final
check handle it?"

Answer: **"Exact exclusion (Recommended)"**. The option read: "Final-check
source capture skips exactly site/.next-concepts, the same rule turns 5
and 6 used. The agent's site is built exactly as it ships. Needs small
copies of the final-check launcher and verifier; disclosed as a
measurement variance."

This applies to the independent whole-site check of
`codex-full-journey-timing-1` only. No `.next*` wildcard or other
exclusion is added, the agent's source and build configuration are not
changed, and every other check of the final worker stays as frozen.

The answer approves no site and authorizes no push.

## Correction and revised answer

Root then found that `.next` is assumed by more than source capture: the
final worker's build inventory and cross-unit build comparison read
`.next`, its typecheck includes `.next/types`, and its lint ignores only
`.next/**`. The first option had understated the work as "small copies".
Root asked again: "Correction to my earlier option: '.next' is assumed by
the final check's source capture, build-identity comparison, typecheck
and lint, not just capture. Which do you want now?"

Answer: **"Build into .next (Recommended)"**. The option read: "Set the
agent's own STORYFOLIO_DIST_DIR=.next for the check only. One added
environment value in the turn-6 binding; every frozen check runs
unchanged. The site's source is untouched; only the build output's
folder name differs from the agent's default."

This replaces the first answer. The agent's `site/next.config.ts` reads
`STORYFOLIO_DIST_DIR` and its own scripts set it, so the check uses the
agent's own switch. No source, exclusion or frozen check changes.
