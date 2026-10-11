# Matrix 2 fallback and interaction diagnostics

Reviewed all 19 PNGs from `dark-no-webgl`, `no-js`, `context-loss`,
`look-switch` and `keyboard-overlay` individually on 11 October 2026, plus
their JSON reports. All are 1440 by 900 captures. The lead reviewer
separately inspected the three `light-no-webgl` captures and reported all
three visually good; that assessment is attributed below rather than
presented as this reviewer's independent image inspection.

This is historical diagnostic evidence, not a completed acceptance run.
The lead runner reported npm exit 143; the [manifest](matrix-2/manifest.json)
contains 13 completed case results and `complete: false`. The keyboard
child subsequently wrote its complete report, but `failed-extra` never
started. The captured implementation is retained in
[matrix-2/source](matrix-2/source/). Later source changes and a complete
replacement matrix require their own evidence. These results do not
resolve the separately investigated phone rendering artifact.

| Capture | Observation |
|---|---|
| [Dark no-WebGL opening](matrix-2/dark-no-webgl/00-opening.gather.png) | Readable dark fallback. Opening copy and the next chapter flow vertically; the flat illustration begins below the fold. The look switch remains visible. |
| [Dark no-WebGL middle](matrix-2/dark-no-webgl/01-middle.fan.png) | Middle heading, copy, note and complete flat fan/line illustration are readable. The closing chapter begins below. No canvas or blank pinned stage is visible. |
| [Dark no-WebGL close](matrix-2/dark-no-webgl/02-close.whole.png) | The preceding illustration, full closing copy and Gather again link remain visible at the document bottom. No overlap or missing story content is apparent. |
| [No-JavaScript opening](matrix-2/no-js/00-opening.gather.png) | Readable light fallback with opening and middle HTML content. No inactive JavaScript look switch is presented. The illustration continues below the fold. |
| [No-JavaScript middle](matrix-2/no-js/01-middle.fan.png) | Middle caption and flat fan/line illustration are complete and readable. The closing chapter follows in normal document flow. |
| [No-JavaScript close](matrix-2/no-js/02-close.whole.png) | Complete closing caption, note and ordinary Gather again link are visible below the illustration. No missing story content is apparent. |
| [Context-loss opening, before loss](matrix-2/context-loss/00-opening.gather.png) | Live scene shows the gathered front card, complete opening copy and correct Gather rail. Framing matches the ordinary wide capture. |
| [Context-loss middle, before loss](matrix-2/context-loss/01-middle.fan.png) | Live fan and copper line appear beside readable middle copy, with Open active. Partially overlapped face words match the known schematic limitation. |
| [Context-loss close, before loss](matrix-2/context-loss/02-close.whole.png) | Closed stack and full closing copy/link are visible, with Whole active and the middle line absent. |
| [After context loss](matrix-2/context-loss/context-lost.png) | The live stage has given way to the normal light fallback. Flat fan/line illustration and full closing copy/link remain readable at the document bottom. |
| [Look-switch opening](matrix-2/look-switch/00-opening.gather.png) | Light opening scene and full caption are readable, with Gather active. |
| [Look-switch middle](matrix-2/look-switch/01-middle.fan.png) | Light fan and line fit beside the full caption, with Open active. |
| [Look-switch close, before change](matrix-2/look-switch/02-close.whole.png) | Light closed stack and full closing copy/link are visible, with Whole active. |
| [Look changed to dark](matrix-2/look-switch/look-changed.png) | Dark materials, background, text and selected control agree. The closing caption remains in the same visible position with its link readable. |
| [History back to light](matrix-2/look-switch/look-back.png) | Light materials, text and selected control are restored at the closing chapter. Caption/link remain in place and readable. |
| [Keyboard opening](matrix-2/keyboard-overlay/00-opening.gather.png) | Opening stack and full HTML copy fit; no inactive overlay is visibly drawn. |
| [Keyboard middle](matrix-2/keyboard-overlay/01-middle.fan.png) | Fan, line and full HTML copy fit, with Open active; no inactive overlay is visibly drawn. |
| [Keyboard close, before focus](matrix-2/keyboard-overlay/02-close.whole.png) | Closing stack, full caption and ordinary text link remain readable before keyboard focus. |
| [Keyboard focus](matrix-2/keyboard-overlay/keyboard.png) | A prominent copper outline follows the projected front-card link, fully within the viewport. The caption and ordinary text link remain unobstructed. |
| [Light no-WebGL opening](matrix-2/light-no-webgl/00-opening.gather.png) | Lead reviewer: visually good fallback. This reviewer checked the associated report, not this PNG. |
| [Light no-WebGL middle](matrix-2/light-no-webgl/01-middle.fan.png) | Lead reviewer: visually good fallback. This reviewer checked the associated report, not this PNG. |
| [Light no-WebGL close](matrix-2/light-no-webgl/02-close.whole.png) | Lead reviewer: visually good fallback. This reviewer checked the associated report, not this PNG. |

No new blocking visual defect was found in the 19 independently inspected
captures. That local observation does not convert the interrupted matrix
into acceptance evidence.

The [dark no-WebGL report](matrix-2/dark-no-webgl/report.json),
[light no-WebGL report](matrix-2/light-no-webgl/report.json) and
[no-JavaScript report](matrix-2/no-js/report.json) each record the expected
three beat IDs, one h1, scene off, zero canvases, no duplicate IDs and no
horizontal overflow or reported problems. Their final requested scroll
720 is clamped to 644, the natural bottom of a 1544-pixel document in a
900-pixel viewport; the closing copy/link are visible there. The
no-JavaScript report contains one narrowly classified expected same-origin
Next.js script preload CSP rejection, with resource type and reason
retained. It has no unexpected request failures. Both no-WebGL reports
have empty request and warning lists.

The [context-loss report](matrix-2/context-loss/report.json) records an
available loss extension at injection, followed by scene off and zero
canvases, with no request failures or reported problems. It retains the
renderer warning `THREE.WebGLRenderer: WEBGL_lose_context extension not
supported.` The post-loss image confirms the fallback was visible despite
that warning; this review does not infer support beyond this recorded
probe. Its three ordinary beat screenshots and scroll samples precede
the loss, while the final scene/count fields describe the fallback.

The [look-switch report](matrix-2/look-switch/report.json) records light
to dark to light, with `close.whole`, scroll 2700, the same hash and the
unrelated `story-check-preserve=yes` query value retained throughout. The
screenshots agree with the visible look change and return. The
[keyboard report](matrix-2/keyboard-overlay/report.json) records the
anchor reached by keyboard, visible and inside the viewport, `tabIndex: 0`,
destination `#opening` and a solid 2-pixel CSS outline. The projected
outline is visibly prominent in its capture. Both reports contain no
request failures, warnings, duplicate IDs, horizontal overflow or reported
problems. These probes establish the recorded state and focus behavior;
they do not establish every possible navigation sequence or author
approval.
