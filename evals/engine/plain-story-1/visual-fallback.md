# Interaction and fallback review, matrix 1

Reviewed on 11 October 2026. The units reviewer opened all 12 screenshots
in `look-switch`, `keyboard-overlay` and `failed-extra` with `view_image`
and read their reports. Their individual verdicts appear below. No new
visual blocker was found in those images.

The additional 13 fallback screenshots were inspected by the root
reviewer. Their observations are attributed separately below; the units
reviewer read their reports but did not independently open those images.
These are frozen matrix 1 artifacts, not evidence of later corrections.

## Look switch: inspected by the units reviewer

[Report](matrix-1/look-switch/report.json): no problems or warnings. The
light to dark to light cycle preserves scroll position `2700`, beat
`close.whole`, the unrelated `story-check-preserve=yes` query parameter
and the `#story-check-preserve` fragment. These state checks come from
the report, while appearance is checked in the images.

| Exact screenshot | Visual verdict |
| --- | --- |
| [look-switch/00-opening.gather.png](matrix-1/look-switch/00-opening.gather.png) | Pass. Light stack fits beside the readable opening heading, body and note. Look switch and rail are visible. |
| [look-switch/01-middle.fan.png](matrix-1/look-switch/01-middle.fan.png) | Pass. Fan and accent line fit beside the complete caption. Pale card edges have subtle contrast, while numbers and caption remain visible. |
| [look-switch/02-close.whole.png](matrix-1/look-switch/02-close.whole.png) | Pass. Closing stack, caption and Gather again text link remain fully visible in light mode. |
| [look-switch/look-changed.png](matrix-1/look-switch/look-changed.png) | Pass. Dark ground, card, text and selected switch state update together; closing text and link remain in the same reading position. |
| [look-switch/look-back.png](matrix-1/look-switch/look-back.png) | Pass. Light mode returns with the same closing content visible and the Light option selected. No blank surface is visible after switching back. |

## Keyboard overlay: inspected by the units reviewer

[Report](matrix-1/keyboard-overlay/report.json): no problems or warnings.
The test reaches the piece overlay by keyboard. It is a visible anchor
with `tabIndex: 0`, `href: #opening` and a solid computed `2px` outline.
The screenshot confirms a prominent amber focus frame around the tilted
card. It does not by itself establish destination activation.

| Exact screenshot | Visual verdict |
| --- | --- |
| [keyboard-overlay/00-opening.gather.png](matrix-1/keyboard-overlay/00-opening.gather.png) | Pass. Opening stack and complete caption fit without collision. |
| [keyboard-overlay/01-middle.fan.png](matrix-1/keyboard-overlay/01-middle.fan.png) | Pass. Fan, line and full middle caption are visible. |
| [keyboard-overlay/02-close.whole.png](matrix-1/keyboard-overlay/02-close.whole.png) | Pass. Closing caption and its text link remain visible beside the stack before the focus capture. |
| [keyboard-overlay/keyboard.png](matrix-1/keyboard-overlay/keyboard.png) | Pass. Strong amber focus outline follows the projected card and is easy to see. Caption and separate Gather again text link remain unobstructed. |

## Failed optional extra: inspected by the units reviewer

[Report](matrix-1/failed-extra/report.json): no unexpected problems or
warnings. Two requests for the intentionally blocked optional chunk have
`expected: true`, and the corresponding `ChunkLoadError` is recorded as
expected. The scene stays on with one canvas, all three beats and no
horizontal overflow. This verifies the declared failure case, not every
possible asynchronous exception.

| Exact screenshot | Visual verdict |
| --- | --- |
| [failed-extra/00-opening.gather.png](matrix-1/failed-extra/00-opening.gather.png) | Pass. Opening stack and all opening text remain visible. |
| [failed-extra/01-middle.fan.png](matrix-1/failed-extra/01-middle.fan.png) | Pass for the injected failure. The optional line is absent, while the fan and complete caption remain readable and the scene is usable. |
| [failed-extra/02-close.whole.png](matrix-1/failed-extra/02-close.whole.png) | Pass. Later content still renders: closing stack, caption and Gather again text link are visible. |

## Fallbacks: root reviewer's observations

The root reviewer reports readable compact fallback layouts with SVGs
fitting their containers, an appearance switch hidden when JavaScript is
disabled, and all story text preserved after context loss. The opening
SVG naturally continues below the first screen; scrolling reveals it.
This is normal document flow rather than horizontal clipping or lost
content. The per-shot records below reproduce that review's conclusions;
they are not a second independent image inspection.

| Exact screenshot | Root reviewer's visual verdict |
| --- | --- |
| [light-no-webgl/00-opening.gather.png](matrix-1/light-no-webgl/00-opening.gather.png) | Pass. Readable light fallback; opening illustration continues below the fold and is available by scrolling. |
| [light-no-webgl/01-middle.fan.png](matrix-1/light-no-webgl/01-middle.fan.png) | Pass. Compact light fallback text and illustration fit. |
| [light-no-webgl/02-close.whole.png](matrix-1/light-no-webgl/02-close.whole.png) | Pass. Closing fallback remains readable with its content preserved. |
| [dark-no-webgl/00-opening.gather.png](matrix-1/dark-no-webgl/00-opening.gather.png) | Pass. Readable dark fallback; the opening illustration continues naturally below the fold. |
| [dark-no-webgl/01-middle.fan.png](matrix-1/dark-no-webgl/01-middle.fan.png) | Pass. Compact dark fallback text and illustration fit. |
| [dark-no-webgl/02-close.whole.png](matrix-1/dark-no-webgl/02-close.whole.png) | Pass. Closing fallback remains readable with its content preserved. |
| [no-js/00-opening.gather.png](matrix-1/no-js/00-opening.gather.png) | Visual pass. Opening text is readable, appearance controls are hidden, and the illustration continues below the fold. |
| [no-js/01-middle.fan.png](matrix-1/no-js/01-middle.fan.png) | Visual pass. Middle text and SVG remain available without JavaScript. |
| [no-js/02-close.whole.png](matrix-1/no-js/02-close.whole.png) | Visual pass. Closing text and link remain available without JavaScript. |
| [context-loss/00-opening.gather.png](matrix-1/context-loss/00-opening.gather.png) | Pass. Opening content is readable in the captured sequence. |
| [context-loss/01-middle.fan.png](matrix-1/context-loss/01-middle.fan.png) | Pass. Middle content is readable in the captured sequence. |
| [context-loss/02-close.whole.png](matrix-1/context-loss/02-close.whole.png) | Pass. Closing content is readable before the loss capture. |
| [context-loss/context-lost.png](matrix-1/context-loss/context-lost.png) | Pass. Loss switches the scene to a compact fallback, preserves text and keeps the illustration within the available width. |

The units reviewer separately verified these report results:

- [Light no-WebGL report](matrix-1/light-no-webgl/report.json) and
  [dark no-WebGL report](matrix-1/dark-no-webgl/report.json): scene off,
  zero canvases, no horizontal overflow and no problems.
- [Context-loss report](matrix-1/context-loss/report.json): loss support
  detected, final scene off, zero canvases, no overflow and no problems.
  The renderer's `WEBGL_lose_context extension not supported` warning is
  retained in the report rather than removed from the evidence.
- [No-JavaScript report](matrix-1/no-js/report.json): scene off, zero
  canvases and no overflow. Its sole automated problem is the deliberately
  CSP-blocked `/_next/static/chunks/09lgyggnhjlha.js` request. Matrix 1
  therefore retains an automated failure even though the root's visual
  check passes. A narrow classifier correction is pending to recognize
  this intentional no-JavaScript fixture event without suppressing
  unrelated request failures; this file does not rewrite the original
  result as a pass.

No implementation, scaffold or other documentation was changed during
this review.
