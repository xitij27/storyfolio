# Prospective baseline launch-sequence review

12 October 2026. Source-only review while calibration 3 desktop was live.
Root owns its closure/disposition, every subsequent launch and the commit.
This review ran no tests, models, browser, build, install, preparation or
freeze. Only this note is written. It establishes command compatibility,
not actual environment readiness, actor preflight or permission to skip a
remaining gate.

## Reviewed current inputs

Read the current [preparation README](README.md),
[launch controls](launch-controls.md),
[case](../../../../builds/full-journey-1/case.json), three preparation
helpers, [stop-review checklist](stop-review-checklist.md),
[runner](../../../../codex-build-run.mjs) and its
[build library](../../../../lib/build.mjs),
[measurement binding](../../full-journey-measurement/binding-lib.mjs),
[measurement README](../../full-journey-measurement/README.md), and the
[durable recorder](../../process-supervision/recorder.mjs) and its README.
The existing [local-tests-6 command](local-tests-6/command.json) supplies
the reviewed environment provenance; those tests were not executed by this
review. The historical [case review](case-review.md) remains an earlier
byte checkpoint, not a current helper count or deadline declaration.

The current case is schema 3, `full-journey`, `unscaffolded`, with seven
declared material/asset files, six fixed prompts and requested stops 1
through 6. Its six actor turns are each bounded to 900000 ms, with
5400000 ms cumulative actor time and the declared between-turn token
ceilings. No actor or site is supplied by the neutral environment proof.

Static path/import inspection found all 23 measurement paths covered:
15 `implementationPaths` plus eight `transitivePaths`. The case explicitly
includes the controls/cache derivatives and tests, durable actor recorder,
historical short-command recorder, shared build/capture helpers and bounded
process helper. Runner defaults cover source-scope, review and files, plus
the runner's other imports. There was no missing repository-owned runtime
import in this inspected set. This is not a newly executed freeze/hash
verification; actual preparation must retain the current complete manifest.

## Exact root sequence after calibration disposition

Use the native executable
`/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` and the
recorded environment, including the exact PATH, browser cache/library
locations and LANG. Set TMPDIR to
`/var/tmp/storyfolio-entry-runtime-20261012` and explicitly unset
`NEXT_TELEMETRY_DISABLED`. Compare the newly observed complete capabilities
before freeze; do not silently substitute the current shell's environment.

1. After source readiness and the preparation commit, retain one initial
   no-model dry inspection. Arguments after native Node are exactly:

   ```text
   evals/codex-build-run.mjs --case evals/builds/full-journey-1/case.json --cohort codex-full-journey-baseline-1 --capabilities evals/builds/local-capabilities.json --dry
   ```

2. Prepare the fresh cohort with the same arguments, replacing `--dry`
   with `--prepare`. Retain the command and terminal tool result. Derive
   workspace and input identity from the new `meta.json`, never from an old
   runtime path. Do not install or scaffold a root app before actor preflight.
3. Record the single environment-proof invocation, with these arguments
   after native Node:

   ```text
   evals/runs/stage-3-completion-2/full-journey/preparation/run-environment-proof.mjs --cohort codex-full-journey-baseline-1
   ```

   Wait for complete closure. Preserve failures without retry. The worker
   runs outside actor source and uses the exact frozen sandbox settings.
4. Root opens the new `setup/environment-proof/capability/neutral.png` at
   original detail. Save `setup/environment-visual-review.md` and the exact
   one-image `setup/original-images.json` attestation required by the README.
5. Retain a fresh copy of the exact dry command from step 1 under the new
   run's `setup/readiness-dry/`, using
   `evals/runs/stage-3-comparison-1/record-command.mjs`. This specific recorder
   requirement is explained below.
6. Record the finalizer with these arguments after native Node:

   ```text
   evals/runs/stage-3-completion-2/full-journey/preparation/finalize-readiness.mjs --cohort codex-full-journey-baseline-1
   ```

   Independently inspect all proof/source/artifact records and commit actual
   readiness before a paid turn. The finalizer creates the exclusive
   `setup/probe.json`; a prior dry result is not a readiness substitute.
7. Launch the same runner arguments through the durable recorder, replacing
   `--dry` with `--turn 1`. Invoke native Node directly, not through an extra
   synchronous child wrapper. Retain the full terminal tool JSON and all
   recorder files. Later turns require an actual source-bound observed gate
   and repository-relative `--gate` path, not automatic advancement.

Keep wrapper-command evidence beneath `setup/` or the study preparation
directory. Before the actor starts, both proof helpers require the run's
top-level entries to be exactly `meta.json` and `setup`; an extra command
directory beside them would fail this guard. Each recorder destination
must be fresh and its parent must already exist. No overwrite or retry is
part of this sequence.

## Recorder compatibility and concrete caveats

- **Readiness-dry must use the historical short-command recorder.**
  [finalize-readiness.mjs](finalize-readiness.mjs) requires
  `result.json.stdoutSha256` and `stderrSha256`. The durable recorder stores
  stream hashes in `rawArtifacts` instead. Replacing the recorder for this
  one short command would fail validation. Preserve the existing contract;
  this review proposes no fallback or helper change.
- **Measured actor turns must use the durable recorder.**
  [binding-lib.mjs](../../full-journey-measurement/binding-lib.mjs) requires
  its clean completion fields, command and raw-artifact hashes, exact
  lifecycle sequence and final outer-tool JSON. The current recorder's
  successful result satisfies that prospective shape. The old recorder is
  not accepted for these actor-turn bindings. Repository-relative runner,
  case, capability and gate arguments must be retained exactly.
- The preparation README's `FROZEN_CASE_PATH` denotes the manifest's
  `casePath`, namely `evals/builds/full-journey-1/case.json`, not the cohort's
  copied `inputs/case.json`. The finalizer checks that exact argument.
- README wording about creating the case and unexecuted preparation is an
  earlier prospective checkpoint. The case now exists and local check
  records exist, but the fresh cohort, environment proof and actual
  readiness are still separate required operations. The earlier case
  review's helper count and eight-minute mode caps are historical; current
  policy and launch controls govern the prospective freeze.
- The neutral-proof wrapper's internal lifecycle remains buffered until
  child closure. Using the durable outer recorder improves outer evidence
  preservation but does not make those inner events durable or identify
  any historical interruption sender. Failure or missing closure remains
  non-ready, not a reason to manufacture evidence.

Disposition: no new source-level blocker in the inspected launch sequence,
provided the recorder exception and exact paths above are respected.
Calibration closure/disposition, committed frozen identities, successful
neutral proof, original-image review and strict readiness remain unmet by
this source-only note. No Stage 3 completion or actual author approval is
inferred.
