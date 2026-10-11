# Guarded extra failure: visual inspection

Inspected on 11 October 2026. Every one of the sixteen PNGs in
`fault-probe/` was opened individually with the image viewer. This is a
selected two-case probe of a temporary four-beat derivative fixture, not
the plain story's full acceptance matrix. It adds a second opening beat and
deliberately throws inside the middle extra's `useExtraFrame` callback.
No implementation files changed during this review.

## Result

The opening still scatters, gathers and reaches its added second beat. When
the optional middle extra fails, the fan remains visible and the ordinary
caption remains readable. The scene then reaches the closing stack. The
missing middle accent line is expected in this fault fixture. Its absence
continues through the middle screenshots, while the core scene continues
into the closing beat.

The [wide report](fault-probe/light-wide/report.json) records the expected
warning beginning:

```text
A story extra stopped after a frame error: Error: Intentional extra frame failure for verification
```

It also records `scene: "on"`, one canvas, one h1, no duplicate IDs, no
horizontal overflow, no late large shaders, and an empty `problems` list.
The ordered beat IDs are `opening.gather`, `opening.repeat`, `middle.fan`
and `close.whole`.

The [no-JavaScript report](fault-probe/no-js/report.json) records the same
four ordered beat IDs, one h1 and no duplicate IDs. It has `scene: "off"`,
zero canvases, no horizontal overflow and no problems. Its only classified
request is the expected same-origin Next.js script preload blocked by the
JavaScript-disabled CSP. The screenshots show the added second heading in
normal document flow, the static fan picture and the closing backlink.

The [manifest](fault-probe/manifest.json) records both selected cases
passing. Together, the triggered warning, surviving canvas, visible fan
and later closing stack support containment of this synchronous guarded
callback failure. They do not establish containment of raw third-party
`useFrame` callbacks, asynchronous tasks, timers or event handlers outside
the documented guard. They make no physical-phone frame-rate claim.

## Per-image record

Paths are relative to this file's folder.

| Screenshot | Visual verdict |
|---|---|
| [Opening start](fault-probe/light-wide/00-opening.gather-start.png) | Pass. Scattered cards are contained and the full opening caption is readable before the fault. |
| [Opening middle](fault-probe/light-wide/00-opening.gather-mid.png) | Pass. Cards visibly gather without colliding with the caption. |
| [Opening end](fault-probe/light-wide/00-opening.gather-end.png) | Pass. Gathered stack and complete caption remain visible. |
| [Second opening start](fault-probe/light-wide/01-opening.repeat-start.png) | Pass. Added beat has its own readable title and supporting text. Rail correctly remains in the opening chapter; the stack is contained. |
| [Second opening middle](fault-probe/light-wide/01-opening.repeat-mid.png) | Pass. Complete second caption and its changed front face are visible. |
| [Second opening end](fault-probe/light-wide/01-opening.repeat-end.png) | Pass. Second beat holds the same contained stack and readable text. |
| [Middle start](fault-probe/light-wide/02-middle.fan-start.png) | Pass for fault containment. Fan remains after the extra's failure, without its accent line. The title is fully opaque at arrival and the rail labels Open. The last note line is still entering below the viewport. |
| [Middle middle](fault-probe/light-wide/02-middle.fan-mid.png) | Pass for fault containment. Fan and full caption remain readable while the failed line stays absent. |
| [Middle end](fault-probe/light-wide/02-middle.fan-end.png) | Pass for fault containment. Same surviving fan and full caption, with no scene-wide fallback or blank canvas. |
| [Closing start](fault-probe/light-wide/03-close.whole-start.png) | Pass. Core scene has advanced after the failure and formed the closing stack. Caption is opaque at arrival and the rail labels Whole. |
| [Closing middle](fault-probe/light-wide/03-close.whole-mid.png) | Pass. Full closing caption, note and ordinary backlink are visible beside the stack. |
| [Closing end](fault-probe/light-wide/03-close.whole-end.png) | Pass. Closing stack and complete text hold after the injected runtime fault. |
| [No JavaScript opening](fault-probe/no-js/00-opening.gather.png) | Pass. First and added second opening headings appear in ordinary document flow with readable supporting text. No scene or inert appearance controls are visible. |
| [No JavaScript second opening](fault-probe/no-js/01-opening.repeat.png) | Pass. Added second heading and its text are distinct and readable, followed by the middle chapter. |
| [No JavaScript middle](fault-probe/no-js/02-middle.fan.png) | Pass. Middle heading, explanation and complete static fan illustration are visible, with the closing heading below. |
| [No JavaScript closing](fault-probe/no-js/03-close.whole.png) | Pass. Static fan remains above the complete closing caption and ordinary backlink. |

The wide fan still covers parts of neighboring cards' words; ordinary HTML
supplies the meaning. The light stack has subtle depth and faint edges,
as recorded in earlier visual reviews. Neither observation undermines this
probe's specific callback-containment and multi-beat-heading checks.
