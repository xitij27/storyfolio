# Audit of the existing judge's final message

11 October 2026. The original judge model turn completed, but the runner
did not save a valid judgement. Its raw result remains `complete: false`.
The failure is `JSON.parse(turn.reply)`: the summary concatenated two progress
messages with the final JSON. No judge retry or replacement evaluation was
made, and no file inside the original `judge/` directory was changed.

This separate coordinator derivative preserves the exact final message,
`item_26` at stream line 53, plus a newline in [final-message.json](final-message.json).
It is not a recovered runner success or an official rejudgement.

The [read-only verifier](verify.mjs) imports the frozen cohort's existing
validation helpers. It verifies every frozen input, 570 input-artifact
entries, all 13 raw judge-result artifact hashes, exact full-prompt
reconstruction, all 60 selected document bodies, frozen schema and criterion
eligibility, ordered page calls and complete delivery. It checks the final
message against `validateBuildJudgement` with the saved packet, including
whitespace-normalized exact excerpts. There are no validation errors.

The [retained result](validation.json) reports 14 pass, one fail and ten
unobserved criteria. Those are counts derived from the existing model's
message, not a new score. The failing criterion is `preflight_skills`.
The original invocation took 318,070 ms and reported 2,673,456 input tokens,
including 2,375,552 cached input, and 5,773 output tokens. No dollar charge
is supplied. All 23 pages were served, with 24 receipts because the judge
read page one again after reading pages one through 23 in order. This is
delivery evidence, not proof of comprehension or history retention.

Reproduce locally, without writes or model calls:

```sh
node evals/runs/codex-bench-depth-baseline-1/judge-audit/verify.mjs
```

Adding `--print-judgement` prints the exact existing final message after the
same checks. The derivative and result files were retained using a patch;
the verifier does not write or repair historical outputs.

## Interpretation and limits

The saved packet has `automaticAcceptance.supplied: false`. The judge saw
actor-owned checks, source and reports, but no independent coordinator
acceptance manifest or screenshot pixels. Later coordinator observations
are not part of this score. Source/technical passes do not establish visual
quality, physical-phone behavior or author approval. Schema/citation
validation also does not establish that every conclusion is correct.

The judge identifies the earlier-run contact-sheet helper read and says
that it prevents an uncontaminated reproduction claim. The coordinator
[actor audit](../actor-audit.md) agrees about external tooling exposure but
distinguishes it from an established held-out visual-solution read. Neither
record establishes that accepted geometry, copy, styling or screenshots
were supplied to the actor.

The frozen rubric explicitly requires an available/enabled-skill check,
including supplied disabled limits, and the saved actor commands/messages
record no such check. Reading the Storyfolio file is not an inventory. The
judge's missing-inventory failure is therefore defensible within that
criterion, despite the opening prohibition on optional installs. However,
the actor fixture and environment record do not themselves enumerate
disabled skills; the harness/process configuration visible to the judge
does. This creates an actor-input observability limit around checking the
specific disabled list. The result is an unperformed or undemonstrated
build-start check, not evidence of an unauthorized install, a needed tool
being missing, skill disobedience, or a before-stop-1 timing failure.

This diagnostic explicitly starts after approved planning and grants build
permission beyond the unchanged planning-only skill. This one criterion
does not by itself justify adding new skill instructions. A later workflow
change needs its scoped question and corresponding evidence.
