# Production browser capability probe, visual review

Reviewed on 11 October 2026. All nine PNGs in
`probe-3/browser/light-wide/` were opened individually with the image viewer.
They show the unchanged plain engine story at 1440 by 900, in its light
appearance, with the scene enabled. This is a local browser-capability
probe, not an actor's embedded-engineer build or a new physical-phone test.

The [browser report](probe-3/browser/light-wide/report.json) records one
canvas, three expected beats, no horizontal overflow, no duplicate IDs,
and no request failures, warnings or reported problems. The images confirm
that the scene, HTML captions, appearance control and chapter rail render.
The author already approved the Stage 2 engine on desktop and a physical
phone; this probe does not repeat or extend that approval.

| Screenshot | Observation and verdict |
|---|---|
| [Opening, start](probe-3/browser/light-wide/00-opening.gather-start.png) | The scattered cards and their shadows render on the right. The opening heading, explanation and supporting note are fully readable on the left; rail and appearance control are clear. Some card words are naturally hidden by overlapping cards. No new blocking defect. |
| [Opening, middle](probe-3/browser/light-wide/00-opening.gather-mid.png) | The cards have visibly moved toward the gathered arrangement and increased in apparent size. The caption remains readable and separate from the scene. The composition stays within the viewport. No new blocking defect. |
| [Opening, end](probe-3/browser/light-wide/00-opening.gather-end.png) | The gathering finishes with the large front card visible. Its word and number remain readable. Stack depth is subtle and the pale edges blend with the background, an inherited visual limitation rather than a new capability failure. |
| [Middle, start](probe-3/browser/light-wide/01-middle.fan-start.png) | The fan and the chapter's rust-colored extra line are visible, with the second rail item active. The heading and main explanation are readable. The last supporting-note line extends below the viewport at this exact chapter-arrival position. Subsequent captures show it fully. No new blocking defect. |
| [Middle, middle](probe-3/browser/light-wide/01-middle.fan-mid.png) | The heading, explanation and full supporting note are visible. The fan remains stable and the extra line is present. Overlapping cards obscure most of the interior card words; the HTML explanation supplies the meaning. This is the inherited fan limitation. |
| [Middle, end](probe-3/browser/light-wide/01-middle.fan-end.png) | The fan, extra line and complete HTML caption remain visible in the settled state. The same overlap limitation remains; no new blank scene, overflow or visual corruption appears. |
| [Close, start](probe-3/browser/light-wide/02-close.whole-start.png) | The cards return to the stack with the third rail item active. The closing heading and main paragraph are readable. The supporting note continues below the viewport and the text link is not yet in view at this exact arrival position. Both are visible after further scrolling. |
| [Close, middle](probe-3/browser/light-wide/02-close.whole-mid.png) | The full closing caption and the "Gather again" HTML link are visible. The front card is readable, with the same subtle stack depth. This image alone does not establish keyboard behavior or whether the transparent front-card link can be activated. |
| [Close, end](probe-3/browser/light-wide/02-close.whole-end.png) | The final caption, HTML link, rail and appearance control remain visible, and the scene is stable. No new blocking defect. |

The retained observations match the Stage 2 review: subtle pale stack
depth, overlapping fan words, and supporting copy below the fold at exact
chapter arrival. None prevents the demonstrated wide browser capture.
These nine still images do not establish dark appearance, phone layout,
reduced motion, fallback behavior, interaction or performance. Those remain
supported only by their separately recorded checks and author review.
