# Independent engine code review, 11 October 2026

This review inspected the stage 2 engine implementation against the
approved design and controlling stage review. It changed no implementation,
started no model evaluation and ran no browser or test. Findings below
describe the inspected source, before any subsequent correction; the
coordinator's final findings record their disposition and verification.

The reviewer previously implemented the scaffold and check scripts. This
pass concentrates on engine/runtime code written by other agents and does
not claim an independent audit of the reviewer's own tooling.

## Inspected areas

- Story validation, chapter/beat rendering and the server-rendered text.
- Scroll measurement, easing, within-beat poses and reduced-motion cuts.
- Scene mounting, lazy extras, React boundaries and context-loss handling.
- Piece placement, face generation/material updates and overlay projection.
- Control subscriptions, visible links, chapter rail and fallback CSS.
- Quality reduction, offscreen/hidden-tab pausing and look changes.
- The sketch registry, dynamic route and unknown-key handling.

The static structure supports lazy loading near the selected chapter,
separate React boundaries for extras, server-rendered fallback text, hidden
off-beat overlays, and one-way quality reduction. These observations do not
replace runtime evidence. Two significant correctness gaps remain in the
reviewed snapshot.

## 1. Multiple beats in a chapter duplicate heading IDs and can add h1s

In [the template page](../../../skills/storyfolio/engine/app/page.tsx),
lines 8 to 16 map every beat to `${chapter.id}-title`, and select `h1`
whenever the chapter's index is zero. Adding a second beat to any chapter
duplicates that heading ID; adding one to the opening also produces a
second `h1`. `Chapter` refers to the duplicated ID through `aria-labelledby`.

This is a normal supported story shape. The plain fixture's one-beat
chapters conceal the problem, and the pure story validator correctly allows
multiple beats. Fix the mapping so a chapter has one actual labeling
heading, all later beat headings have unique IDs, and only the first page
heading is `h1`. Verify the generated markup with at least two opening
beats and two beats in a later chapter. Do not reject valid multi-beat
stories merely to retain the three-beat fixture.

## 2. A frame callback exception escapes an extra's React boundary

[Scene](../../../skills/storyfolio/engine/components/story/scene.tsx),
lines 53 to 54, wraps extra components in a `WebGLBoundary` and `Suspense`.
The [plain extra](../../../skills/storyfolio/engine/content/extras/middle-line.tsx)
registers a raw React Three Fiber `useFrame` callback.

In the installed React Three Fiber 9.6.1 production source,
`events-583399dd.cjs.prod.js`, `update` invokes each frame subscriber
directly at lines 7883 to 7884, then renders the scene. Neither that
subscriber loop nor its caller wraps a subscriber exception. These
callbacks execute outside React rendering, so the extra's React error
boundary does not contain an exception from them. A persistently failing
callback aborts that frame before rendering, while the outer Story still
reports its scene as on. The core scene can therefore freeze along with
the extra instead of retaining its functioning scene or text fallback.

The blocked-chunk probe demonstrates load-failure isolation, which is a
different failure path. Provide a supported scoped frame hook/callback
guard that disables the failed extra and keeps the remaining scene running,
use it in the supplied extra, and exercise a throwing callback. If that
work is deferred, narrow the published isolation claim to the failure
classes actually handled. Arbitrary asynchronous callbacks must not be
implicitly described as covered by a React error boundary.

This second finding follows the source call path; this review did not
inject a browser failure. A correction still needs runtime evidence.

## Snapshot and limits

SHA-256 values at review:

| File under `skills/storyfolio/engine/` | SHA-256 |
|---|---|
| `app/page.tsx` | `28834f5fb28b2f296df3c60168a73eec1883729391e0d80a72d64a057dee956e` |
| `components/story/scene.tsx` | `54f7e830bb3572b2f2dce2634e104473f62486ee9fe09f5f68bbc6419f3cff6f` |
| `components/story/webgl-boundary.tsx` | `e7b1ed45a4127bfb10af9dd22de7bcc893dc4177b562dbedbd4b93f86c4af43a` |
| `content/extras/middle-line.tsx` | `c204f2ed39e182f40ad326f4f940411d135dcfc678fae6ff519db67f80404a6d` |

The sketch registry is empty, so reading its correct routing structure
does not establish an actual registered sketch's runtime behavior. The
review also does not establish physical-phone frame rate, custom non-card
shape framing, arbitrary large captions, or all browser/device behavior.
These limits are separate from the two actionable source findings above.

## Source corrections inspected after the findings

The updated template maps `chapter.beats` with a beat index. Its first
beat retains the unique chapter heading ID used by `aria-labelledby`;
later beats use their own beat ID for the heading. Only chapter zero's
first beat is an `h1`. This addresses finding 1 in source while preserving
support for multiple beats per chapter.

The scene now wraps each extra in `ExtraBoundary` from
`components/story/extra-frame.tsx`. The exported `useExtraFrame` obtains
that extra's failure handler and registers a `guardExtraCallback` wrapper
with React Three Fiber. The wrapper catches a synchronous callback
exception, disables that callback immediately, and tells its own boundary
to unmount the extra. Other extras have independent boundaries. The
supplied middle-line extra now uses this hook.

The engine README explicitly scopes the guarantee to supported synchronous
frame callbacks plus React rendering and lazy-import failures. Raw
third-party `useFrame` callbacks, timers, event handlers and rejected
asynchronous work are expressly outside that guard and require their own
handling. This addresses the source path and overbroad claim in finding 2.

This follow-up is a source inspection only. The coordinator is preparing a
derived multi-beat fixture and an intentional guarded frame exception;
their runtime outcome is not established by this review. Retain the
initial findings and hashes above as the record of what prompted the fixes.

## Runtime follow-up

The derived four-beat fixture passed its production wide and no-JavaScript
checks with one `h1`, unique IDs and the complete expected beat sequence.
An intentional exception in the sample's guarded frame callback produced
the expected warning while the core scene continued to the closing stack.
All 16 captures were inspected. [Fault probe review](visual-fault-probe.md)
and [final findings](findings.md) retain the source and reports. This verifies
the supported synchronous callback contract, not arbitrary external callbacks.
