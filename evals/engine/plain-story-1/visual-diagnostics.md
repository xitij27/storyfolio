# Historical diagnostic screenshot review

Reviewed all nine PNGs in `diagnostic-wide-2/light-wide/` on 11 October
2026. These are historical 1440 by 900 light-look captures, not acceptance
evidence for the current source. Later camera, sampling and visibility
corrections must be assessed using their own recorded captures.

| Capture | Observation |
|---|---|
| [Opening start](diagnostic-wide-2/light-wide/00-opening.gather-start.png) | Caption, look switch and rail are readable. The scattered formation reaches beyond the right edge, clipping the rightmost card. The canvas clipping is a visible framing defect even though the page itself has no horizontal overflow. |
| [Opening middle](diagnostic-wide-2/light-wide/00-opening.gather-mid.png) | Gathering greatly enlarges the cards; the rightmost card remains clipped and several labels are obscured by overlaps. Caption text remains readable. This is the clearest oversized-camera/framing sample. |
| [Opening end](diagnostic-wide-2/light-wide/00-opening.gather-end.png) | The front of the gathered stack is fully inside the viewport and readable, but occupies much of the right side. No visible caption or control clipping. |
| [Middle start](diagnostic-wide-2/light-wide/01-middle.fan-start.png) | Seven numbered cards form a large fan with the extra line beneath. Several printed words are covered by overlapping cards. Caption and controls remain readable; the rightmost corner is close to the edge. |
| [Middle middle](diagnostic-wide-2/light-wide/01-middle.fan-mid.png) | Essentially the same visible fan, overlap and extra line as the start capture. No additional visible caption or control clipping. |
| [Middle end](diagnostic-wide-2/light-wide/01-middle.fan-end.png) | Essentially the same large fan and extra line. The repeated arrangement does not by itself prove distinct dwell positions were sampled. |
| [Close start](diagnostic-wide-2/light-wide/02-close.whole-start.png) | A large front card carries Gather, with the stack inside the viewport. Closing caption and its ordinary text link are readable; the middle chapter's extra line is absent. |
| [Close middle](diagnostic-wide-2/light-wide/02-close.whole-mid.png) | Essentially the same closed stack and readable caption/link. No visible clipping; a screenshot alone does not establish overlay hitbox or keyboard correctness. |
| [Close end](diagnostic-wide-2/light-wide/02-close.whole-end.png) | The closed arrangement remains fully visible with readable text. No additional visible fault beyond the oversized presentation already noted. |

The [historical report](diagnostic-wide-2/light-wide/report.json) records
six `.story-control` overflow problems, one at every opening and middle
capture, while reporting no document horizontal overflow. No offending
control is visibly drawn in those six images. The checker diagnosis found
that an overlay hidden with `visibility: hidden` retained its box and was
counted by the old opacity/width predicate. The later visibility check
addresses that false positive; the screenshots alone cannot establish a
hidden element's computed style. Visible control bounds remain a required
check.

The right-edge card clipping in the opening images is a separate, actual
rendering observation. It must not be dismissed merely because the six
reported control failures were false positives. The three middle and three
closing images are nearly identical; the later timeline-based sampling
correction is assessed separately from this historical visual review.
