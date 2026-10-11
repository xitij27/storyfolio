# Final dark appearance review, matrix-3

All 15 screenshots below were individually opened with view_image after
the support-box polygon offset was applied and the ineffective face offset
was removed. The [wide](matrix-3/dark-wide/report.json),
[short](matrix-3/dark-short/report.json) and
[phone](matrix-3/dark-phone/report.json) browser reports contain no problems
or warnings.

The phone fan's white face is now clean. Its outer edges retain
antialiasing, and the line, caption and closing link remain readable.
The same blank-white pixel region used by the diagnostic contains 26 dark
pixels in matrix-2 and zero in matrix-3, with minimum red increasing from
185 to 241. These exact screenshots differ from the separate diagnostic
baseline, which had 12 dark pixels; the comparison does not substitute one
baseline for another. [Recorded comparison](phone-acceptance-pixels.json).
Reproduce it with `node evals/engine/plain-story-1/diagnose-phone-pixels.mjs --acceptance`.

The prior exact-arrival fixes also remain visible: the middle extra line
and correct chapter rail appear at the wide start sample, and primary
captions have normal contrast. At the exact wide starts of the middle and
closing beats, the secondary note still reaches below the viewport; the
closing text link appears after further scrolling. Both become fully
visible in the mid and end samples. This is the previously recorded fold
behavior, not missing or faded content. No new visual regression was found.

| Screenshot | Verdict |
| --- | --- |
| [dark-wide/00-opening.gather-start.png](matrix-3/dark-wide/00-opening.gather-start.png) | Scattered cards fit; opening caption and Gather rail are readable. |
| [dark-wide/00-opening.gather-mid.png](matrix-3/dark-wide/00-opening.gather-mid.png) | Gathering overlaps remain inside the frame; caption is unobstructed. |
| [dark-wide/00-opening.gather-end.png](matrix-3/dark-wide/00-opening.gather-end.png) | Settled stack and full opening copy fit. |
| [dark-wide/01-middle.fan-start.png](matrix-3/dark-wide/01-middle.fan-start.png) | Clean fan, extra line and Open rail present; primary caption readable; secondary note continues below fold. |
| [dark-wide/01-middle.fan-mid.png](matrix-3/dark-wide/01-middle.fan-mid.png) | Clean fan and line; full caption and note fit. |
| [dark-wide/01-middle.fan-end.png](matrix-3/dark-wide/01-middle.fan-end.png) | Same complete fan composition; no surface speckles. |
| [dark-wide/02-close.whole-start.png](matrix-3/dark-wide/02-close.whole-start.png) | Settled stack and Whole rail present; primary caption readable; secondary note and text link extend below fold. |
| [dark-wide/02-close.whole-mid.png](matrix-3/dark-wide/02-close.whole-mid.png) | Stack, full closing caption and Gather again link fit. |
| [dark-wide/02-close.whole-end.png](matrix-3/dark-wide/02-close.whole-end.png) | Same complete closing composition. |
| [dark-short/00-opening.gather.png](matrix-3/dark-short/00-opening.gather.png) | Stack and complete opening copy fit the shorter viewport. |
| [dark-short/01-middle.fan.png](matrix-3/dark-short/01-middle.fan.png) | Clean fan and extra line fit; full caption remains readable. |
| [dark-short/02-close.whole.png](matrix-3/dark-short/02-close.whole.png) | Closing stack, note and text link fit. |
| [dark-phone/00-opening.gather.png](matrix-3/dark-phone/00-opening.gather.png) | Stack sits above the caption; all opening copy fits. |
| [dark-phone/01-middle.fan.png](matrix-3/dark-phone/01-middle.fan.png) | Previous white-face speckles are absent; fan, extra line and full caption fit. |
| [dark-phone/02-close.whole.png](matrix-3/dark-phone/02-close.whole.png) | Stack, full closing copy and Gather again link remain readable. |

This is a review of the final dark screenshots and their browser reports.
It does not replace the author's real scrolling approval or establish
behavior on untested physical GPUs. The
[diagnostic record](phone-artifact-diagnosis.md) preserves the failure,
rejected hypotheses and controlled rasterization probes.
