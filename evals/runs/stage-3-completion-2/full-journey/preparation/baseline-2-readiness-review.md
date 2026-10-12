# Baseline 2: independent readiness review

Ready within the existing unscaffolded-environment scope. This review found
no concrete prelaunch evidence blocker. It adds no gate and does not start
an actor. Root still owns required checks, commit and any paid launch.

Root executed the [read-only auditor](baseline-2-readiness-audit.mjs) only
after proof and finalizer closure. Its complete exclusive
[result](baseline-2-readiness-audit.json) is `verified:true`, observed from
06:17:20.513Z to 06:17:21.618Z on 12 October 2026. The
[terminal tool record](baseline-2-readiness-audit-tool-poll-1.json) confirms
exit 0. The initial tool display was limited to 1,000 tokens and is retained
as such; the complete result file is not truncated. Its SHA-256 is
`6c32a313576e4ad80e2153633623faa12ef1a39aadb0d70e7c3a8d089d086270`.
The auditor source still matches its recorded self-hash
`7bfc6bcf157d901eb37790c42b5b7b5f2b09f1ef6b5a1c5a8b845686e6d76222`.

The verified cohort is `codex-full-journey-baseline-2`, frozen digest
`899898fc055c96452a77c03ff9d815782367d2634b10bcbdd5ab322857d8ab82`.
All 149 input hashes match. Exactly 94 unscaffolded source files, seven
fixture files and 87 skill files, match the frozen inputs, saved snapshot,
before/after records and live workspace. No root app was seeded. The actor
workspace is
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-1-A1xJ9e`.
At the audit and this review, its run root contains only `meta.json` and
`setup`: no actor turn or actor result exists.

The actual sandbox proof closed normally at 06:15:28.483Z, code 0 after
1,497 ms, with no timeout, external signal, spawn error or log error. Its
outer recorder closed normally at 06:15:28.670Z. Node, npm, Git, required
resource paths, loopback HTTP and the neutral Chromium page passed; the
external request recorded explicit proxy 403 denial. The selected outer and
sandbox environments, narrowly validated launcher-prefix evidence, copied
and retained runtime bytes, raw logs and process records are bound in the
audit. The no-model dry command closed 0, followed by normal finalizer
closure at 06:17:00.765Z. All 18 final-attestation evidence hashes match.

Root's saved original-image record and visual review attest an individual
original-detail view of the new 1440-by-900 neutral PNG, 34,533 bytes,
SHA-256 `f4c4c37435a310fab9d09a38aedadfdab0ee71b0d840e5009606a0852a92afbd`.
This independent review checked that attestation and its image binding,
not a second visual inspection.

The [frozen-input comparison](baseline-2-input-comparison.json) and an
independent read of both manifests show exactly five changed files, all
under `implementation/evals/runs/stage-3-completion-2/full-journey/preparation/`:

- `README.md`
- `finalize-readiness.mjs`
- `probe-environment.mjs`
- `probe-environment.test.mjs`
- `run-environment-proof.mjs`

No input was added or removed. Capabilities, skill and engine, fixture,
prompts, rubric, measurement and shared runner remain byte-identical. The
five changes implement and document the reviewed launcher-PATH correction;
they do not revise actor instructions. The
[first failed setup](environment-failure-1/audit.md) remains separate and
unchanged, not rescored as passing.

This is actual neutral environment readiness only. It is not actor
preflight, successful dependency installation, an authored concept/site,
phone verification, optional-helper behavior, author acceptance or Stage 3
completion. Resource availability does not prove every offline dependency.
Configuration isolation is not a filesystem read jail. This review makes
no process-absence claim and ran no runtime, browser, model or tests.
