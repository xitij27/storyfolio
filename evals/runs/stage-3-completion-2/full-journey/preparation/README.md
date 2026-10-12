# Unscaffolded environment proof, prospective controls

Source-only preparation, 12 October 2026. Root approved one neutral
environment proof per newly prepared full-journey arm. Allowed cohort
identities are `codex-full-journey-baseline-1` and
`codex-full-journey-candidate-1`. No full-journey case or cohort is created
by these helpers. Root owns execution and commits. No proof, test, model,
build, installation or browser was launched by this preparer.

The [independent runner review](runner-review.md) precedes these helpers.
The full-journey fixture stays nonlaunchable until the final measurement,
case, bounds, committed freeze and actual readiness are available.

## What the three helpers do

[probe-environment.mjs](probe-environment.mjs) runs as a command inside the
actual frozen sandbox configuration, with no model. It records native
Node/npm/Git identity and resource-directory availability, serves a fixed
neutral HTML page in memory over loopback, reads that page through HTTP,
opens it in existing Chromium and saves one original 1440-by-900 PNG.
A separate external request must show explicit proxy 403 denial, not just
a timeout or generic failure.

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

1. Finish and review the independent measurement before creating the schema-3
   case. Include all three helper paths in `implementationFiles`, plus the
   pure test file as prospective test evidence. Existing default runner
   implementation paths cover the helpers' build/review/source dependencies;
   retain the full actual transitive freeze. Do not modify older freezes.
2. After active actors/captures are closed, root runs native syntax checks
   and the six [pure guard tests](probe-environment.test.mjs), retaining
   command/output records, then the repository-required checks before commit.
   Tests use in-memory examples only; they are not environment success.
3. Supply the recorded native Node and the four exact environment values
   from the selected current capabilities. Set the same recorded TMPDIR and
   explicitly unset `NEXT_TELEMETRY_DISABLED`. Save the full capability
   comparison and input delta. Prepare a fresh cohort/workspace through the
   schema-3 runner; do not scaffold, install a root dependency tree or add
   an actor-visible facts file after the freeze.
4. Record the single wrapper invocation with the unchanged command recorder:
   `node .../preparation/run-environment-proof.mjs --cohort COHORT`.
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
