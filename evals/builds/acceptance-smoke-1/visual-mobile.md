# Acceptance smoke test, mobile visual review

Reviewed on 11 October 2026. All six completed mobile PNGs from attempt 7
were opened individually with the image viewer. The reviewed files were
read from `/tmp/storyfolio-acceptance-smoke-output-7/mobile/` before the
coordinator copied them unchanged into `attempt-7/mobile/` here.

This is the plain engine story in a 390 by 844 touch-enabled browser
viewport. It is not the embedded-engineer build or a physical-phone
performance test. The [browser report](attempt-7/mobile/report.json)
records the scene enabled, one visible canvas, no horizontal overflow,
three expected beats and no reported requests, warnings, errors or problems.

The visible "Skip to the ending" control has keyboard focus because the
checker exercised focus before taking the screenshots. It remains clear
of the light/dark control. Its presence is an observation about the sampled
focus state, not evidence that an unfocused page always shows this control.

| Screenshot | Observation and verdict |
|---|---|
| [Opening, middle](attempt-7/mobile/00-opening.gather-mid.png) | The dispersed cards occupy the upper scene region without clipping the viewport. The heading, full main explanation and supporting note fit below them and remain readable. Card text is smaller and softer than the HTML copy, with some overlap between cards; the explanation supplies the full meaning. The focused skip link and appearance control do not collide. No blocking visual issue. |
| [Opening, end](attempt-7/mobile/00-opening.gather-end.png) | The formation has visibly gathered into a large front card. Its number and word are legible. Pale stacked edges are subtle against the background, as in the inherited engine design. The caption and both controls remain readable and fully within the viewport. No blocking visual issue. |
| [Middle, middle](attempt-7/mobile/01-middle.fan-mid.png) | The fan is recognizable, and the extra rust-colored line renders below it. Overlap hides most interior card words, while the complete heading, explanation and supporting note remain legible in HTML. Neither the fan nor caption is clipped. No new blocking visual issue. |
| [Middle, end](attempt-7/mobile/01-middle.fan-end.png) | The fan and extra line remain stable. The complete body and supporting copy fit within the viewport with space below. The inherited overlap and subtle pale card boundaries remain; controls are clear. No blocking visual issue. |
| [Close, middle](attempt-7/mobile/02-close.whole-mid.png) | The cards return to the stack, matching the closing explanation. The full heading, body, supporting note and "Gather again" text link are visible. The upper card and lower caption stay separate, and the controls do not obscure content. The pale stack still reads mainly as its front face. No blocking visual issue. |
| [Close, end](attempt-7/mobile/02-close.whole-end.png) | The closing scene and all closing text remain visible in the settled position. The text link is readable and the viewport has no apparent clipping or control collision. No new blocking visual issue. |

The images show readable mobile HTML content and recognizable changes
from dispersed cards to a fan and back to a stack. They retain the known
plain-engine limitations of overlapping card words and faint stack depth.
No source change is requested from these six images. Still images alone
do not prove touch interactions, link activation, motion quality, physical
device behavior or frame rate; those need their own recorded evidence.
