# Stage 3 development checkpoint

12 October 2026, Europe/Berlin. UTC process records fall on 11 October.
Work follows the author's [direction to finish Stage 3 first](../../../docs/history/2026-10-12-stage-3-development.md)
and the [completion plan](../../../docs/superpowers/plans/2026-10-12-stage-3-completion.md).
This is completed local preparation for the next behavioral comparison,
not completion of Stage 3 or a demonstrated skill improvement.

## Implemented and verified

- The [control-modality repair](../control-modality-1/findings.md) accepts
  explicitly declared keyboard-focus-only skip links with actual Tab/Enter,
  target and original-image evidence. Seven valid browser conditions and
  one ordinary control pass; all 15 defective variants fail. The retained
  31 browser executions contain 112 individually reviewed originals. An
  intermediate hidden-target false pass is preserved beside its correction.
- The [source-scope repair](../source-inventory-1/findings.md) shares narrow
  generated-file and validated top-level bare-Git exclusions between actor
  and checker. The historical 202/390 mismatch still reproduces. Both new
  inventories match on 201 unchanged source files without weakening strict
  set equality. The helper is required in runner/checker/judge identities,
  with a regression rejecting a missing frozen helper hash.
- The new [bench-depth-2 fixture](../../builds/bench-depth-2/README.md) supplies
  nine files, including a neutral screenshot helper and explicit environment
  facts. Six inherited files are byte-identical, the handover is append-only,
  and the original prompt and rubric are unchanged. The sole focus-only
  navigation exception is specified equally for both prospective arms.
  Neither the accepted implementation nor old actor output is supplied.

The fixture makes the reviewed helper an explicit input instead of leaving
that tool exposure undeclared. It does not establish filesystem read
isolation. Every future actor still needs an access audit.

## Independent review and actual helper execution

The [review](review.md) found and checked corrections for a missing frozen
judge-rubric dependency, an input-root symlink gap, an overstated rubric
verification claim and ambiguous skip-link requirements. A real helper CLI
smoke then exposed a CommonJS import defect that the mocked rendering tests
had not caught. Its failed process and exact sources remain in
[helper-browser-smoke](helper-browser-smoke/result.json).

After correction and an actual child-CLI regression, the separately labelled
[second smoke](helper-browser-smoke-2/result.json) passed: 51 existing
originals were unchanged, five contact sheets were generated and all five
were opened at original resolution. Actual Chromium layout checks found no
image or caption overflow. This checks the helper, not portfolio quality;
contact sheets do not replace original-image review. The review found no
remaining blocker within its stated scope.

## Verification checkpoint

[verification-1/result.json](verification-1/result.json) records exact
commands, environment, complete stdout/stderr hashes, test-source hashes
and unchanged before/after implementation and fixture identities:

| Check | Result |
|---|---|
| `node evals/check-skill.mjs` | Pass, 687 body words and four references |
| `node evals/check-people.mjs` | Pass, 17 cases |
| `npm test` with native-TypeScript Node v22.22.1 | 342/342 pass, 31 suites, zero failures |
| New fixture verifier | Pass, exact nine files, inherited prompt/rubric and all judge dependencies |
| Source-inventory reproduction | Pass, historical mismatch retained and prospective 201-file agreement |
| Historical final-message judge audit | Pass without replacing the original failed result |
| Frozen-input and protected-path checks | Pass, old 121-file digest and protected source unchanged |
| `git diff --check` | Pass |

The final staged check additionally sees the newly added raw failure log.
It reports four trailing-whitespace lines, 12, 40, 85 and 180, solely in
`source-inventory-1/before-tests.log`. Those original test-output bytes are
preserved deliberately. The staged check excluding that exact raw artifact
passes; no source or authored-prose whitespace exception is taken.
The [final review](final-review.json) also confirms the tested source/input
hashes still match, the handover archive is verbatim, and 632 local Markdown
link destinations exist across 22 prose files with no em dashes.

The separate [modality verifier](../control-modality-1/verification.json)
also passes, including exact 112-original review coverage, current final
source identity, 23 applicable final assessment replays and rejection of
the saved hidden-target mutation. It performs no new browser/model run.

The actual runner's [read-only dry preparation](dry-preparation.json)
validates 124 prospective frozen inputs, digest
`b49209e3f49d223091a2d541a19bd50a7ec249457d852d1311a528c6962ffe54`.
It creates no cohort or actor workspace and makes no model call. This is
not final freeze or an exact future actor-workspace capability proof.
The dummy capability identity in the test checkpoint is deliberately not
the actual dry-preparation identity.

No shipped skill/engine, accepted manual prototype, old fixture or frozen
actor cohort changed. The original frozen digest remains
`57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e`.
The [preceding handover](../../../docs/history/2026-10-12-before-stage-3-development-handover.md)
preserves `784eb1e` byte for byte before current-state updates.
No evaluation actor/judge was invoked and no push was made.

## Product work still open

The [evidence audit](evidence-audit.md) drafts only two instructions tied to
saved implementation failures: make the scene itself explain the approved
relationship, and inspect changing text between beats in both directions.
Neither is applied. Conditional main-skill placement would preserve the
planning-only boundary and remain within the 800-word limit; it would not
establish ordinary build activation.

The proposed next test is one refreshed baseline, then one matched
candidate only for misses that persist, with at most one judge per arm.
Each build is bounded to 15 minutes and each judge to 10 minutes, without
retry or continuation. These are process deadlines, not a hard token or
dollar cap. The [paid question](../../../docs/history/2026-10-12-stage-3-development.md#separate-paid-comparison-question)
is unanswered. Do not start either model while it remains unanswered.

After the visual question, Stage 3 still needs supported build entry,
unvisited early-journey and real-choice coverage, planning regression and
the non-sheet six-stop complete-site proof with actual author desktop and
phone approval. The approved design calls for two or three looks, three
concept sketches and three complete wording versions. Engineering test
passes and the accepted manual prototype do not discharge these gates.
