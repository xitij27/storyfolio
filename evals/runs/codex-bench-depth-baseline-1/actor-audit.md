# Completed actor audit

11 October 2026. This coordinator audit reads the complete retained actor
stream and source snapshots. It launches no model and changes no actor output.

## Completion and integrity

The actor completed its single permitted turn in 766,005 ms. Its saved
`result.json` says `complete: true`; `process.json` records exit 0 without a
timeout; `item_66` supplies the final reply and the stream ends in
`turn.completed`. Completion is not visual acceptance or a passed journey.
The blocked registry command at `item_6` was followed by successful offline
installation at `item_10`, implementation and tests. The earlier incomplete
assessment was made against a partial stream and is superseded.

All paths below are relative to
`bench-depth-1/baseline-1/turns/01/` unless stated otherwise. The audit checked
all 384 `result.artifacts` hashes against retained bytes without a mismatch.
The completed `stream.jsonl` SHA-256 is
`233a97910bc8e51a1d8d765676f33faf75f3012f89984c03e7cf1e0bfab527c4`.

The actual before/after manifests contain 174 and 202 files respectively,
with 42 differences. The 44 entries in `result.snapshot.changes` compare an
earlier setup baseline instead. Bundled skill/engine files, runtime
`components/` and `lib/`, fixed facts, confirmations, storyboard, environment
record and both supplied SVGs have unchanged before/after hashes.

## Access and contamination

All 59 completed shell commands and eight actor messages were inspected,
including batched commands, globs, inline scripts and printed output.

| Event and completed stream line | Observed access | Interpretation |
|---|---|---|
| `item_9`, 20 | `ls /tmp` prints filenames, including earlier runs and helpers | Filename exposure, not a read of their contents |
| `item_24`, 49 | Browser-library inventory, `checks/setup-capability/probe.json`, relevant environment values | Supplied environment/capability information; inherited coordinator evidence |
| `item_27`, 54 | `cat /tmp/storyfolio-contact-sheets.mjs \| head -65` prints the helper | Confirmed undeclared external tooling input |
| `item_32`, 63 | Creates `scripts/review-sheets.mjs` | A close adaptation of the printed helper |

The external helper imports Playwright from
`/tmp/storyfolio-evals/build-embedded-completion-1-HA9i68/node_modules/playwright-core/index.mjs`.
Its printed body builds contact sheets from supplied screenshot directories.
It contains no accepted apparatus, site copy, geometry, poses, screenshots,
rubric, score or recovery specification. Reading the import statement is not
evidence that the actor opened that earlier site's implementation.

This is a real cross-run tooling exposure and prevents a strict fixture-only,
uncontaminated reproduction claim. It does not establish copying of the
held-out visual solution, nor automatically meet the protocol's narrower
held-out-solution-read invalidation condition. No saved shell command reads
the accepted implementation, recovery specifications, rubric or earlier
actor site contents. Subprocess and image-read telemetry are incomplete, so
the audit cannot prove such reads were impossible.

Snapshot `unexpected` directory flags `.aws`, `.codex` and
`.prototype-history` are not evidence of credential reads. Events `item_60`
through `item_65` document the protected `.git` failure and alternative local
history commit. No remote push appears in saved commands.

## Factual and observational limits

No unsupported biographical or measurement assertion was found in the final
`snapshot/files/content/copy.ts`: lines 9 to 11 define firmware/bring-up and
delimit the illustration; 15 to 17 delimit the teaching loop; 21 to 23 preserve
colleague ownership; 27 to 29 separate projection and observation; 33 to 35
resolve the question and preserve sample and qualification limits.
`snapshot/files/app/page.tsx` renders these claims and limits in ordinary HTML.
This is a source review, not a visual-quality score.

The actor says it inspected screenshots. The raw CLI stream contains command
and message events but no image/view events. Contact-sheet creation and
descriptions are retained; neither independently proves visual review quality.
Missing image telemetry is also not proof that images were never viewed.

The [actor-check archive](actor-checks/manifest.json) separately retains the
six actor capture trees, with original images, generated contact sheets,
reports and failures. These are actor-owned diagnostics copied after the
turn, not coordinator acceptance. Its [archival script](archive-actor-checks.mjs)
rejects symlinks and existing destinations and records the command events
associated with each tree. The inherited `setup-capability` tree is excluded.
