# Shared controls correction: local proof

11 October 2026. This is deterministic engineering verification, not a paid
agent run, a skill-instruction comparison or a complete-site evaluation.

## Question and result

Can a custom 3D Piece and a lazy scene extra use the same control store as
their Story's HTML controls, without losing fallback behavior or sharing
state with a different Story?

Yes in this bounded production fixture. With the engine from `39ceeb7`, both
desktop and phone reproduce `Story controls must be inside a Story` from a
real React Three Fiber consumer. The WebGL boundary removes the failed scene
and the HTML remains functional. Moving the existing `ControlsProvider` to
enclose the entire Story root makes the same fixture pass all seven browser
conditions. The store construction, scene props, scene-off condition and
fallback implementation are otherwise unchanged.

The [authorization](../../../docs/history/2026-10-11-shared-controls-approval.md)
is only for this engine correction. There was no paid actor/judge call,
dependency download, external asset, accepted-prototype change, prior-study
rewrite, judge-transport implementation or push.

## Matched source and fixture

[prepare.mjs](prepare.mjs) obtains every engine source file from `39ceeb7`.
For the patched variant, only `components/story/story.tsx` is replaced with
the authorized working-tree correction. Both receive exactly the same four
fixture files in [fixture](fixture/): two separate Story instances with one
simple box each, HTML buttons, direct `useControl`, `useControls` and
`useSceneOff` consumers, and a lazy extra. The fixture does not reuse the
accepted portfolio implementation or its appearance.

The fixture assigns an identity to each control store through a shared
WeakMap. HTML, Piece and extra record the identities they receive. The
Piece records its actual Three.js material color and world matrix from
`useFrame`. A scene-request button also asks the Piece to write a different
selection back through `useControls`. The extra compares the context store
against its supplied engine `controls` prop. These are test diagnostics,
not a new shipped API.

[Baseline source manifest](baseline/source-manifest.json) and
[patched source manifest](patched/source-manifest.json) bind all engine and
fixture bytes. Each variant also retains its original Story source. The
[browser verification](browser-verification.json) checks 82 source files per
runtime, the unchanged fixture, exact current patched Story, all 27 original
image hashes, both report hashes, original harness hashes and all six build,
typecheck and lint exits. The sole engine source difference is Story.

## Verification

Both variants pass production `next build --webpack`, explicit TypeScript
and ESLint checks. Complete logs are retained in [baseline](baseline/) and
[patched](patched/). The baseline build passing is expected: the defect
occurs only when the custom consumer mounts inside the browser Canvas.

| Browser condition | Result and evidence |
|---|---|
| Baseline desktop 1440 by 900 | Missing-context exception reproduced; both stories fall back; HTML pointer and keyboard controls still work. |
| Baseline phone 390 by 844 | Same failure reproduced through the actual Canvas, with touch interaction on the retained HTML. |
| Patched desktop 1440 by 900 | HTML, Piece and lazy extra share the same store; pointer, keyboard, scene write-back, look change and sibling isolation pass. |
| Patched phone 390 by 844 | Same checks pass, with a real browser tap for the initial selection and keyboard Tab/Enter for the second. |
| Patched short 1280 by 720 | Same shared-store checks pass. |
| Patched reduced motion | Same checks pass; the object's world matrix remains unchanged across elapsed time and pointer movement. |
| Patched no WebGL | Chromium starts with 3D APIs disabled; both readable HTML fallbacks and independent pointer/keyboard controls work. |
| Patched no JavaScript | Server-rendered HTML and both fallback explanations remain present; unusable controls are hidden. |
| Patched context loss | Actual `WEBGL_lose_context.loseContext()` removes only the affected Canvas. The HTML retains the same store and changes via pointer and keyboard; `useSceneOff` becomes true. The sibling scene remains live. |

[Baseline browser report](baseline/capture-1/browser.json) has two passed
reproduction cases, meaning the expected failure was observed. It is not a
baseline engine pass. [Patched browser report](patched/capture-1/browser.json)
has seven passing cases, no page errors, no console errors and no external
requests. Both captures completed on the first browser attempt. Each retains
the exact executed harness as `browser.mjs.original` and its server log.

The root's context-level before/after checks and repository checks are
recorded separately in [verification.json](verification.json). They do not
replace this production Canvas test.

## Image review and limits

An [independent reviewer](review.md) verified all 27 image hashes and opened
five original screenshots. The browser-fixture author additionally opened
the phone amber view and the context-loss fallback original. The viewed images show
the baseline's absent box, the patched amber/blue box beside or above the
HTML, readable fallback copy, and the independent sibling scene after loss.
This is a functional integration check, not acceptance of a portfolio's
visual design. The phone is emulated Chromium, not a physical-phone check.

Three measurement qualifications are preserved rather than altering the
original evidence:

- The report's generic pointer-check label mentions a live scene and lazy
  extra in baseline and no-WebGL cases. Those cases pass `live=false`, so
  their actual assertions concern HTML and sibling isolation only.
- After context loss, old Piece and extra diagnostic attributes remain as
  last-live values because those consumers have unmounted. The current
  `htmlSceneOff`, Story `data-scene` and Canvas count establish fallback;
  stale `sceneOff` or `extraSceneOff` fields do not describe a live consumer.
- The two no-JavaScript images are identical because the second heading was
  already visible and `scrollIntoViewIfNeeded` did not move. They show alpha
  completely and beta partly, not two separate full fallback visual checks.
  Both fallback explanations and absent controls were checked in the DOM.

No claim is made about nested Story layouts, every possible custom extra,
renderer performance, visual polish, unsupported browsers or failure paths
beyond this fixture. The known wide-face aspect issue and judge transport
blocker are outside this correction.

## Setup and reproduction

All dependencies were already installed under
`node_modules/storyfolio-build-dependencies-20261011/node_modules`. Verified
versions: Node 22.22.1, Next 16.3.8, React and React DOM 19.2.4, React Three
Fiber 9.6.1, Three.js 0.180.0, TypeScript 5.9.3, ESLint 9.39.4 and
Playwright Core 1.64.0. Browser version: Chromium 156.0.8078.4.

The first preparation calls hit the known sandbox `spawnSync git EPERM`
before writing runtime sources. Prematurely queued builds then reported
`spawn npm ENOENT` because their working directories did not yet exist.
These were setup failures, not engine build failures. Preparation reran with
approved escalation, then both actual production builds passed. Preparation
refuses an existing runtime; capture, check-log and verification scripts
refuse their existing output targets. Preparation does not separately guard
existing manifest files, so do not rerun it in this retained study, even in
a fresh checkout where the ignored runtime is absent.

Commands run from the repository root, using the native-TypeScript Node:

```sh
export PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache
export LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu
node evals/engine/shared-controls-1/prepare.mjs baseline
node evals/engine/shared-controls-1/prepare.mjs patched
node evals/engine/shared-controls-1/run-check.mjs baseline build
node evals/engine/shared-controls-1/run-check.mjs patched build
node evals/engine/shared-controls-1/run-check.mjs baseline typecheck
node evals/engine/shared-controls-1/run-check.mjs patched typecheck
node evals/engine/shared-controls-1/run-check.mjs baseline lint
node evals/engine/shared-controls-1/run-check.mjs patched lint
node evals/engine/shared-controls-1/browser.mjs baseline
node evals/engine/shared-controls-1/browser.mjs patched
node evals/engine/shared-controls-1/verify.mjs
```

Production servers bind only to `127.0.0.1`, on ports 3041 and 3042, and are
stopped by the browser harness. Browser requests outside that exact origin
are denied. The setup/build/browser calls needed approved local escalation;
this says nothing about a future actor sandbox's capabilities. Generated
runtime and build directories are ignored, while source snapshots,
manifests, logs, reports, original images and these findings are retained.
For a new reproduction, copy only the scripts and fixture into a newly named
directory under `evals/engine/`, without its old runtime or evidence files.
Use the matching engine revision for the patched input and retain the new
study separately. Do not remove or overwrite this evidence to rerun in place.
