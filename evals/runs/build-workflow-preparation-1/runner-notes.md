# Diagnostic runner and judge preparation

11 October 2026. Local implementation under the author's approval of
no-model preparation. No paid actor or judge was called, no reserved
baseline cohort was prepared, and no skill or engine instruction changed.

## Contract

Build-case schema 1 retains its ordered `requestedStops` subset of 4, 5
and 6, fixed prompts, refusal mapping and continuation gates. Schema 2 is
explicitly `taskKind: "prototype-depth"`: exactly one fixed prompt, one
allowed turn, no `requestedStops`, and the fixed opening refusal `[1]`.
The runner saves that identity in the run metadata and started/result
records. Execution verifies its case against the frozen case before any
invocation; judging rejects substituted or missing diagnostic identities.

The diagnostic judgement uses schema 2: the original 24 criterion IDs plus
`prototype_brief`. Its five build-start preflight criteria are eligible,
but do not establish before-stop-1 timing. The five journey-gate criteria,
pre-refusal installation branch and recommendation-then-refusal
continuation stay unobserved. Source/installation verification stays
unobserved without a source packet. `storyboard` means preserving approved
meanings, not crediting the actor with their discovery or approval.

The separate diagnostic rubric is frozen and hash-bound instead of
requiring the row-card rubric. The generic judge template explains both
task mappings. Diagnostic acceptance must also bind the independently
frozen `evals/lib/build-capture.mjs`; the acceptance envelope remains
schema 1. No screenshot pixels are sent to the behavioral text judge.

A failed or timed-out actor attempt remains judgeable when its saved
evidence is complete. Missing post-turn source blocks diagnostic judging
even when a capture error is disclosed. Existing non-overwrite, no-retry,
one-process actor and judge deadline behavior remains intact. Token
ceilings are still between-turn checks, not in-flight budgets.

## Verification

Command, with the repository's existing Node 22.22.1 installation:

```sh
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH node --test evals/lib/build.test.mjs evals/lib/build-score.test.mjs
```

The initial sandbox run passed the judge file but failed the runner file.
A direct runner invocation exposed two existing subprocess tests: the
process-group timeout received empty stdout before JSON parsing, and the
parent-interruption test never received its expected child-output trigger.
All 20 other runner tests passed. No code was changed to bypass these
checks. An explicitly escalated run then passed all 45 tests. After adding
the diagnostic acceptance-helper binding test, the next escalated focused
run passed **46 tests, zero failures, zero skips**, in 5.647 seconds.

Coverage includes schema rejection, absent synthetic journey stops,
frozen input/task drift, a single failed attempt without advancement or
overwrite, legacy continuations, diagnostic eligibility and schema,
complete partial-attempt judging, missing-source rejection, separate
rubric binding, capture-helper binding, and mocked judge no-retry behavior.
Mock invocations do not call a model; CLI capability checks use `--help`.

Existing transport boundary tests also pass: exactly 2 MiB UTF-8 and
1,048,576 UTF-16 code units are accepted, their independent plus-one cases
are rejected, raising the byte allowance does not bypass the character
guard, and astral characters count conservatively as two UTF-16 units.
Nothing is truncated. These synthetic limits are separate from the root
coordinator's representative historical packet probe.

The runner support is not launch readiness. The separately reproduced
engine and complete-evidence transport questions must be resolved before
freezing the eventual baseline and obtaining paid-run authorization.

## Integration review and final verification

The fixture reviewer identified three additional integration gaps. All
three are repaired before freeze:

- The current checker imports the capture helper for legacy expectations
  too. New input inspection now automatically freezes that transitive
  helper when a checker or judge entry point is included. Current judging
  requires its hash for both kinds of new cohort. Historical cases and
  retained frozen implementations were not rewritten.
- Diagnostic acceptance now binds both complete source inventories and
  digests, their exact declared exclusions, and each mode's source digest
  to the final saved actor snapshot. Missing maps, mismatched source,
  missing source files, changed exclusions or a measurement on different
  source block judging. The shared capture helper exports its exclusion
  contract without changing which files it excludes. Source outside the
  runner's saved snapshot also fails closed, rather than being inferred
  from paths. Snapshot policy must cover any such file before a future run.
- Every diagnostic textual acceptance artifact is included, including
  failed command logs and saved rendered HTML. Binary files retain hashes,
  not pixels. The exact acceptance artifact file set is verified; a
  listed report cannot silently omit an existing failed-command log.
  Delivery remains subject to both unchanged transport limits.

The final focused command above passes **47 tests, zero failures, zero
skips**, in 6.587 seconds after these repairs. New negative assertions
cover missing/different source maps, invalid source digests, changed
exclusions, omitted logs, mismatched mode source and missing capture-helper
identity. `git diff --check` passes. These local/mocked tests make no model
calls and no claim that a full future diagnostic packet will fit.

Read-only fixture audit checked its case, expectations, criteria, protocol,
seven actor inputs, source hashes and verification script against the plan
and the original corrected fact sheet/lab notes. No remaining factual or
holdout-boundary defect was found: ownership, projection versus observation,
sample/customer/qualification limits and omitted incident are preserved;
beat IDs are stable without accepted headings or exact copy; source paths
to the prior implementation remain evaluator-only. The source manifest
binds four originals and the two illustrative SVGs are unchanged copies.
`node evals/builds/bench-depth-1/verify-fixture.mjs` passes. This is a fixture
audit, not acceptance of a new actor result or a physical-phone check.

Historical transport probes concern their historical selection of evidence.
Their older fitting packet does not establish that schema 2's fuller
acceptance text fits. The known oversized historical packet remains an
obstruction, and new complete-packet transport still needs its own approved
disposition before final baseline preparation.
