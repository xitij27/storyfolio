# Matrix 3 fallback and interaction visual review

Reviewed all 25 PNGs below individually on 11 October 2026, together with
their seven case reports. The captures are 1440 by 900 and belong to the
source recorded in [matrix-3/source-hashes.json](matrix-3/source-hashes.json).
No blocking visual defect was found in these fallback and interaction
cases. This review replaces the corresponding interrupted matrix 2
observations for this captured source; that earlier run remains historical.

| Capture | Verdict and observation |
|---|---|
| [Light no-WebGL opening](matrix-3/light-no-webgl/00-opening.gather.png) | Pass. Opening and middle HTML text flow normally and remain readable. The illustration begins below the fold, and the look switch remains visible. |
| [Light no-WebGL middle](matrix-3/light-no-webgl/01-middle.fan.png) | Pass. Middle heading, complete copy and note appear above the full flat fan/line illustration. Closing content follows below. |
| [Light no-WebGL close](matrix-3/light-no-webgl/02-close.whole.png) | Pass. The illustration and complete closing caption, note and Gather again link are readable at the document bottom. |
| [Dark no-WebGL opening](matrix-3/dark-no-webgl/00-opening.gather.png) | Pass. Dark fallback text has clear contrast; opening and middle content flow normally, with the selected Dark control visible. |
| [Dark no-WebGL middle](matrix-3/dark-no-webgl/01-middle.fan.png) | Pass. Middle text, note and the full pale fan/line illustration remain readable against the dark background. |
| [Dark no-WebGL close](matrix-3/dark-no-webgl/02-close.whole.png) | Pass. The preceding illustration, full closing copy and ordinary link are visible, with no overlap or missing content apparent. |
| [No-JavaScript opening](matrix-3/no-js/00-opening.gather.png) | Pass. Opening and middle HTML remain readable in normal flow. No inactive JavaScript look control is presented. |
| [No-JavaScript middle](matrix-3/no-js/01-middle.fan.png) | Pass. Complete middle copy and the flat fan/line illustration remain available without JavaScript. The closing chapter follows below. |
| [No-JavaScript close](matrix-3/no-js/02-close.whole.png) | Pass. Full closing copy, note and Gather again link remain visible beneath the illustration. |
| [Context-loss opening, before loss](matrix-3/context-loss/00-opening.gather.png) | Pass. The live gathered stack, complete opening caption and Gather rail are readable and framed. |
| [Context-loss middle, before loss](matrix-3/context-loss/01-middle.fan.png) | Pass. Live fan and copper line fit beside the full caption, with Open active. Known face-word overlap remains visible. |
| [Context-loss close, before loss](matrix-3/context-loss/02-close.whole.png) | Pass. Closed stack and full closing copy/link fit, with Whole active and the middle line absent. |
| [After context loss](matrix-3/context-loss/context-lost.png) | Pass. The scene is replaced by normal-flow fallback content. The flat illustration and complete closing copy/link remain readable. |
| [Look-switch opening](matrix-3/look-switch/00-opening.gather.png) | Pass. Light opening stack, full caption and active Gather rail are visible. |
| [Look-switch middle](matrix-3/look-switch/01-middle.fan.png) | Pass. Light fan, line and full middle caption are visible, with Open active. |
| [Look-switch close, before change](matrix-3/look-switch/02-close.whole.png) | Pass. Light closed stack and full closing caption/link are visible, with Whole active. |
| [Look changed to dark](matrix-3/look-switch/look-changed.png) | Pass. Scene materials, page colors and selected Dark control agree. The closing caption/link remain in the same visible position. |
| [History back to light](matrix-3/look-switch/look-back.png) | Pass. Light materials, page colors and selected Light control are restored at the same closing caption. |
| [Keyboard opening](matrix-3/keyboard-overlay/00-opening.gather.png) | Pass. Opening stack and caption remain framed. No inactive card overlay is visibly drawn. |
| [Keyboard middle](matrix-3/keyboard-overlay/01-middle.fan.png) | Pass. Fan, line, caption and active Open rail are visible. No inactive card overlay is visibly drawn. |
| [Keyboard close, before focus](matrix-3/keyboard-overlay/02-close.whole.png) | Pass. Closing stack, full caption and ordinary text link remain readable before focus. |
| [Keyboard focus](matrix-3/keyboard-overlay/keyboard.png) | Pass. A prominent copper focus outline follows the front-card link, fully inside the viewport. It does not obscure the HTML caption or ordinary link. |
| [Failed extra, opening](matrix-3/failed-extra/00-opening.gather.png) | Pass. The gathered cards and opening copy remain visible while the later extra's chunk is blocked. |
| [Failed extra, middle](matrix-3/failed-extra/01-middle.fan.png) | Pass. The cards reach their fan formation and the full middle copy remains readable. The copper line is absent, as expected for the deliberately failed local extra. |
| [Failed extra, close](matrix-3/failed-extra/02-close.whole.png) | Pass. The main cards reach the closing stack and the full closing caption/link remain visible after the extra failure. |

The [light no-WebGL report](matrix-3/light-no-webgl/report.json),
[dark no-WebGL report](matrix-3/dark-no-webgl/report.json) and
[no-JavaScript report](matrix-3/no-js/report.json) record scene off and zero
canvases. Each retains the expected three beat IDs, one h1, no duplicate
IDs, no horizontal overflow and no reported problems. Their final requested
scroll of 720 is naturally clamped to 644, the bottom of the 1544-pixel
fallback document in this viewport. The complete closing copy/link is
visible there. Both no-WebGL reports have no request failures or warnings.
The no-JavaScript report has one expected same-origin Next.js script
preload rejection, identified as resource type `script`, failure `csp`,
with its narrow classification reason retained. It has no unexpected
request failures or warnings.

The [context-loss report](matrix-3/context-loss/report.json) records the
loss extension available at injection, followed by scene off and zero
canvases. It contains no request failures or reported problems, and the
after-loss capture independently shows the readable fallback. The report
retains the renderer warning `THREE.WebGLRenderer: WEBGL_lose_context
extension not supported.` That warning does not negate the observed
fallback, and this review makes no broader claim about extension support.
Its three beat samples precede loss; its final scene and canvas fields
describe the fallback state.

The [look-switch report](matrix-3/look-switch/report.json) records light
to dark to light while preserving `close.whole`, scroll 2700, the hash
`#story-check-preserve` and unrelated query `story-check-preserve=yes`.
The probe seeds a prior history entry before switching, consistent with
the product's replacement of the current look URL. The captures confirm
the visible look change and restoration. The report has one canvas, no
requests, warnings or reported problems. This covers the recorded switch
and history sequence, not every navigation sequence.

The [keyboard report](matrix-3/keyboard-overlay/report.json) records an
anchor reached by Tab, initially visible with `tabIndex: 0`, still visible
and in view after focus, pointing to `#opening`, with a solid 2-pixel CSS
outline. The projected outline is clear in the focus capture. The report
has one canvas and no requests, warnings or reported problems. This
establishes reachability and visible focus for the specified card link;
it does not by itself establish all keyboard navigation or destination
activation behavior.

The [failed-extra report](matrix-3/failed-extra/report.json) retains two
intentionally blocked requests for the same late JavaScript chunk, the
expected `ChunkLoadError` and the local extra boundary's warning. The
scene remains on with one canvas and no reported problems. The middle
capture shows that only the line is missing, and the main object changes
from the opening stack to the fan and back to the closing stack across
the captured scroll positions. The HTML remains readable throughout.
This directly supports isolation of a failed lazy module load. It does
not establish isolation for arbitrary third-party frame callbacks,
timers, events or asynchronous exceptions; the separately documented
guarded synchronous callback contract remains the applicable limit.

All seven reports retain the expected three beat IDs and one h1, with no
duplicate IDs or document horizontal overflow. These image and report
reviews cover the named cases and sampled states. They do not replace
the complete matrix result, sustained performance evidence or the
author's required Stage 2 approval.
