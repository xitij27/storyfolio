# Independent capture preparation

11 October 2026. This is no-model measurement preparation, not an actor
baseline, a skill improvement, or a visual acceptance result.

## Implemented contract

`evals/lib/build-check.mjs` retains schema-1 fixed-heading and wording
semantics. Schema 2 explicitly names `prototype-depth`, freezes the ordered
question, scheduling, bench, evidence and scope IDs, and checks one opening
level-1 heading followed by four level-2 headings. Text may be newly authored.
Semantic factual requirements remain separate judge/reviewer evidence.

The new coordinator helper `evals/lib/build-capture.mjs` is frozen alongside
the checker. The schema-2 collector includes desktop 1440 by 900, phone 390 by
844, short 1280 by 720, reduced motion, no WebGL, no JavaScript and actual
WebGL context loss. It preserves all five rests and all four travel intervals
in both directions on desktop, phone and short screens. Motion uses actual
requestAnimationFrame scrolling, three image samples per interval, full
recorded scroll trajectories and positions before and after each screenshot.
This is sampled movement, not a frame-rate or every-frame guarantee.

Every reduced-motion rest requires a timed, unchanged image pair. Context
loss requires an actual extension invocation and all five fallback captures.
Images retain hashes and original files. Source manifests before and after
measurement expose source mutation; generated Next files and explicit
dependency/build/cache directories have documented exclusions. The judge
also compares diagnostic source hashes with the final saved actor snapshot.

Control inventory uses structural selectors, accessible names, declared
targets and beat identity, not the accepted prototype's four controls or
global selector indices. A reused index cannot silently discard a control
mounted in a later beat. Trials must cover the complete unique inventory,
with pointer and actual Tab navigation followed by keyboard activation.
The inventory covers visible enabled native controls, buttons, tabs, sliders
and local anchors encountered in the five resting states. It is not an
exhaustive exploration of menus or controls revealed only by deeper
interaction sequences. Such interaction state-space coverage remains a
review limitation, not an implied automated pass.
Each trial starts from a fresh document with its browser condition reapplied.
A declared selected peer can establish a non-idempotent tab/radio baseline.
Local fragment links are included. Non-fragment link availability is retained
as unobserved under loopback-only measurement, not silently followed.

Control response checks intrinsic state and declared DOM targets. Whole-image
differences alone do not establish response: hover, focus or unrelated
animation can produce them. A declared canvas target remains explicitly
unobserved pending visual review, even when its button state changes. Missing
targets and unchanged non-canvas declared targets are not accepted. Controls
without machine-observable effects can need manual disposition; a technical
measurement problem is not automatically an actor defect. No screenshot
quality or physical-phone acceptance is inferred by the helper.

## Deterministic verification

The focused command, using the existing Node 22 installation, is:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/.bin/node --test evals/lib/build-check.test.mjs evals/lib/build-capture.test.mjs
```

The final focused run passed all 30 tests, no failures or skips. It ran
outside the sandbox because sandboxed Node subprocess results did not expose
the individual test cases. Coverage includes existing schema-1 strictness,
schema-2 malformed input, structural headings, missing/reordered beats,
absent/reversed motion, rest-image completeness, five reduced-motion pairs,
five post-loss captures, wrong control targets, pointer/keyboard omissions,
canvas-response uncertainty and same-index dynamic control identities.

`node --check` passed for the checker, capture helper and smoke harness.

## Actual-browser calibration

`capture-fixture.html` is a tiny local synthetic page, not portfolio source.
`capture-smoke.mjs` invokes the actual new capture/control helpers using the
existing Chromium and Playwright installation. It uses a loopback-only server,
never invokes a model, never installs dependencies and refuses to overwrite
an output directory. Bad variants deliberately omit a beat, point a control
at the wrong existing target, do nothing after activation, move in reduced
motion, or omit a beat after actual context loss.

`capture-smoke-1` retains all seven known-good mode passes and all five
detected negative variants, including 24 forward/reverse intervals. Its
original images, reports and original source hashes are preserved. The helper
and fixture were refined while that run was in flight, after module loading;
it is a preliminary implementation check, not final source-bound proof.
Do not present its old source hashes as the final implementation's hashes.

`capture-smoke-2` completed after the final control fixes. It copies complete
fixture/helper/harness source originals into its `source/` directory before
collection. All seven known-good modes passed and all five explicit bad
variants were detected. The run retains 214 original images, 12 reports,
24 travel intervals, 36 pointer/keyboard control trials and 10 stillness
pairs, including the deliberately moving negative condition. Both a generic
DOM-response button and a local fragment link are exercised. All five rests
are present in each successful mode, including actual context-loss fallback.

The read-only command below verified every report hash, every original image
hash and byte count, all four saved source originals, and their equality to
the live fixture/helper/harness sources:

```sh
node evals/runs/build-workflow-preparation-1/verify-capture.mjs
```

It returned `verified: true`. The final smoke manifest SHA-256 is
`d03d8ff9e93563c692cf178ce7606ff8715f4e4950aed7520de8c5a235b64bb7`.
There were zero model invocations. `git diff --check` also passed after the
final helper edits. No source, screenshot or report in a historical study,
accepted prototype or shipped skill/engine was edited.

This smoke tests actual browser helpers, not an end-to-end production Next
build. Report-object unit tests cover the complete assessment contract;
production acceptance of an actor remains unavailable until that separate
run and its environment, engine and transport gates are approved.
