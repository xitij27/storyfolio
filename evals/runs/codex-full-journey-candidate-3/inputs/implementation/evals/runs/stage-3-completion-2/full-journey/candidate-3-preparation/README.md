# Candidate 3 unscaffolded environment preparation

Source-only derivative, 12 October 2026. The author explicitly approved
"Approve correction and one matched journey": one fresh same-model journey,
the same prompts and up to six gated 15-minute actor turns, existing browser
limits, no judge and no retry. Root preserves the exact approval, owns the
supported skill correction, all execution, actual readiness and commits.
These helpers accept only `codex-full-journey-candidate-3`. They neither
reopen candidate 2 nor waive its failed storyboard gate.

## Declared differences

The four code/test files mechanically derive from the matching files in
[the earlier preparation directory](../preparation/README.md). The worker's
cohort list becomes the single new identity. Its tests accept only that
identity and reject the earlier cohorts and an unauthorized candidate 4.
The two wrappers replace embedded worker/freeze identity paths with this
directory; import depth, runtime observations, exact environment guards,
source checks, deadlines and final attestation logic remain unchanged.
This README adapts the earlier procedure to the new authority and paths.

The [new case](../../../stage-3-storyboard-length-1/case.json) retains
`full-journey-1`, schema 3, unscaffolded setup, all seven fixture files,
all six prompts, refusal turns, criteria, protocol and finite bounds.
Its `implementationFiles` swaps only the five old preparation paths for
these five files. Its only other case change is
`snapshot: {roots: [...DEFAULT_SNAPSHOT.roots, "site"]}`. The default
single-file allowlist and 400-file, 20 MiB total, 2 MiB per-file limits are
inherited unchanged. No shared runner, capture exclusion or old helper is
edited. Root must save the complete old/new input delta, including its
separately authorized skill correction, not claim only skill bytes changed.

This is ordinary root-source plus explicitly nested `site/` coverage,
not arbitrary-name full-workspace capture. No scaffold or chosen destination
is supplied to the actor. After each closed turn, root must independently
compare the saved snapshot's complete path/hash/size set with live source
under the existing generated-tree policy. Unknown omitted source blocks
measurement and the next turn; it is not ignored, relabelled as generated
or repaired after capture. The unchanged runner independently enforces full
live/prior-snapshot equality before each subsequent turn. Measurement
application-cwd adaptation, if needed from actual output, is separate and
is not implemented or silently promised by this preparation.

## What the three helpers do

[probe-environment.mjs](probe-environment.mjs) runs as a command inside the
actual frozen sandbox configuration, with no model. It records native
Node/npm/Git identity and resource-directory availability, serves a fixed
neutral HTML page in memory over loopback, reads that page through HTTP,
opens it in existing Chromium and saves one original 1440-by-900 PNG.
A separate external request must show explicit proxy 403 denial, not just
a timeout or generic failure.

The preserved first proof exposed a launcher PATH transformation before
any version/browser observation. The [failure-backed correction](../preparation/environment-path-correction.md)
keeps the outer command environment exact and records the selected actual
sandbox environment separately. Exactly two prefixes are accepted: a
canonical Codex arg0 directory with only the four identified aliases to the
frozen CLI plus an empty lock file, and that CLI release's metadata-declared
`codex-path` directory containing only the pinned `rg` file. Package metadata,
CLI and rg identities, canonical paths, all entries/targets, the complete
outer PATH suffix and all five selected non-PATH values are checked. No PATH
rewriting, arbitrary prefix allowance or host-UID assumption is made.
The report retains the actual selected environment even when validation
fails. Metadata and rg hashes are saved in the report and final attestation.

Playwright is loaded from the trusted
`/tmp/storyfolio-build-capability-20261011` dependency tree. Its entrypoint
must match SHA-256
`a58fb2cec4293e7dcf73c58a179898a4f3986666451a19da4e731fa3af63265b`,
the existing measurement identity. Chromium must resolve under the frozen
browser cache. No app build, package install, skill activation or portfolio
content is needed. Resource existence does not prove that every cached
package can be installed offline.

[run-environment-proof.mjs](run-environment-proof.mjs) validates the current
committed/frozen inputs, exact capabilities, fresh seven-file unscaffolded
case and untouched fixture-plus-skill source. It allocates a unique
`storyfolio-environment-proof-*` directory under the recorded
`/var/tmp/storyfolio-entry-runtime-20261012`, outside actor work.
It invokes the frozen worker through `codex sandbox` with the actor's
exact frozen `-c` values. Both the allocated runtime output and its
coordinator setup copy remain retained. There is no cleanup or retry.

The owned sandbox process group has a 120000-ms work deadline and up to
5000 ms for shutdown, with external signals separately recorded. No global
process names are signalled. Version commands are bounded at 30000 ms,
loopback/external requests at 5000 ms and the complete browser observation
at 30000 ms. Final readiness rejects a process duration over 125000 ms.
Source copying and verification occur after process closure and do not
extend the sandbox's work allowance.

[finalize-readiness.mjs](finalize-readiness.mjs) has no subprocess or actor
write. It requires actual successful process and observation records,
identical runtime/copied evidence, unchanged source, an exact no-model dry
record, current helper freeze identity, and root's review of the new
original screenshot. Only then does it create exclusive `setup/probe.json`
with `scope:"unscaffolded-environment"`, `actorPreflight:false`,
`modelCalls:0`, and exact evidence hashes including the initial snapshot.
The runner separately checks this attestation before a paid turn.

## Root-only execution order

1. Review the new case and these mechanical preparation derivatives before
   freezing candidate 3. The case swaps the five preparation paths only;
   existing default runner paths and the unchanged measurement declarations
   retain the complete actual transitive freeze. Do not modify older inputs
   or treat a changed input digest as a byte-identical comparison.
2. After active actors/captures are closed, root runs native syntax checks
   and the twelve [pure guard tests](probe-environment.test.mjs), retaining
   command/output records, then the repository-required checks before commit.
   Tests use in-memory examples only; they are not environment success.
3. Supply the recorded native Node and the four exact environment values
   from the selected current capabilities. Set the same recorded TMPDIR and
   explicitly unset `NEXT_TELEMETRY_DISABLED`. Save the full capability
   comparison and input delta. Prepare a fresh cohort/workspace through the
   schema-3 runner; do not scaffold, install a root dependency tree or add
   an actor-visible facts file after the freeze.
4. Record the single wrapper invocation with the unchanged command recorder:
   `node .../candidate-3-preparation/run-environment-proof.mjs --cohort codex-full-journey-candidate-3`.
   This uses the recorded native Node, not host Node. The actual workspace
   comes from the fresh `meta.json`, never a guessed path. Wait for complete
   terminal closure before any subsequent checks. Failure stays preserved.
5. Root opens the new
   `setup/environment-proof/capability/neutral.png` with `view_image`
   at original detail. Save `setup/environment-visual-review.md` with the
   actual observation and limits. Save `setup/original-images.json` with
   `schemaVersion:1` and one `images` record containing setup-relative
   `path`, SHA-256, byte length and `viewMethod:"view_image original"`.
   The exact path is `environment-proof/capability/neutral.png`.
   A prior screenshot or contact sheet cannot stand in for this review.
6. Record a fresh no-model runner `--dry` at
   `setup/readiness-dry/` using
   `evals/runs/stage-3-comparison-1/record-command.mjs`.
   Arguments after the native Node executable must be exactly:
   `evals/codex-build-run.mjs --case FROZEN_CASE_PATH --cohort COHORT --capabilities evals/builds/local-capabilities.json --dry`.
   Run from the repository root with the same environment. The finalizer
   checks its command, terminal code, log hashes, digest and complete
   capabilities, not merely a saved positive label.
7. Record `finalize-readiness.mjs --cohort COHORT`. Review its output and
   all retained proof evidence. Root commits readiness before any paid
   turn. These scripts never start or resume an actor.

All setup evidence is outside actor work. The initial seven declared files
and installed skill must stay exact; no known generated-tree exclusion is
permitted before actor preflight. Supplied runtime/catalog material remains
frozen data, not evidence that the actor checked or recommended anything.

## Exact prospective root commands

Run only after root's review, local checks and preparation commit. Load
the four environment values verbatim from candidate 2's frozen
`inputs/capabilities.json`, use its native Node executable, keep
`TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012`, and explicitly unset
`NEXT_TELEMETRY_DISABLED`. The dry result must match the complete original
capabilities, not merely the capability request file. Stop and retain any
drift for disposition.

Arguments after native Node, from the repository root:

```text
evals/codex-build-run.mjs --case evals/runs/stage-3-storyboard-length-1/case.json --cohort codex-full-journey-candidate-3 --capabilities evals/builds/local-capabilities.json --dry
evals/codex-build-run.mjs --case evals/runs/stage-3-storyboard-length-1/case.json --cohort codex-full-journey-candidate-3 --capabilities evals/builds/local-capabilities.json --prepare
evals/runs/stage-3-completion-2/full-journey/candidate-3-preparation/run-environment-proof.mjs --cohort codex-full-journey-candidate-3
```

Retain each command/tool lifecycle separately, not as an automatic sequence.
Derive the actual workspace from the new `meta.json`; setup is
`evals/runs/codex-full-journey-candidate-3/full-journey-1/baseline-1/setup`.
The repetition directory `baseline-1` does not mean this is the baseline
treatment. Before the actor, the run's top level must contain only
`meta.json` and `setup`; keep command records inside setup or this study.

After normal proof closure, root views the one new original and saves the
attestation described above. Record the exact first dry command again at
`setup/readiness-dry/` using the unchanged short-command recorder
`evals/runs/stage-3-comparison-1/record-command.mjs`. The finalizer requires
its `stdoutSha256`/`stderrSha256` result schema, not the durable recorder's
`rawArtifacts` schema. Then record:

```text
evals/runs/stage-3-completion-2/full-journey/candidate-3-preparation/finalize-readiness.mjs --cohort codex-full-journey-candidate-3
```

Independently verify frozen inputs, proof and initial source, then commit
readiness before any paid turn. Root records the actual actor through the
unchanged durable `process-supervision/recorder.mjs`, with the same runner,
case/cohort/capability arguments and `--turn 1` in place of `--dry`.
Later fixed turns require a real observed gate and a full snapshot; nothing
here launches them. Do not install dependencies or build an app in the
unscaffolded workspace before actor preflight.

## Interpretation and retained limits

A passing neutral page proves only this command environment's observed
capabilities. It is not app existence, actor preflight, concept quality,
phone or final-site acceptance, an optional-skill recommendation, a completed
user choice, or actual author approval. The coordinator attests viewing;
software can only check that attestation and its image bytes.

Command-only sandbox execution inherits user configuration, unlike the
separately configured actor invocation. Exact actor `-c` values do not
make it a filesystem read jail. The raw external-request stack may expose
the frozen implementation path. Preserve it and audit actual actor access
independently.

Status: helpers and pure guard tests are written, not executed by this
preparer. Root must retain all actual results and stop on an evidence or
source mismatch. No automatic retry, fallback pass or Stage 3 completion
claim is implied.
