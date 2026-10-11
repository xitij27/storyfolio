# Dark look visual review, matrix 2

On 11 October 2026 the units reviewer opened all 15 images below with
`view_image`, after `dark-phone/report.json` was complete. The
[wide](matrix-2/dark-wide/report.json),
[short](matrix-2/dark-short/report.json) and
[phone](matrix-2/dark-phone/report.json) reports each have empty problem
and warning lists. This inspection found a remaining visible surface
artifact despite those automated passes.

## Result and comparison with matrix 1

The exact middle arrival now shows the extra line, highlights Open in the
rail and displays its heading and body at readable contrast. The exact
closing arrival similarly highlights Whole and has readable main text.
These screenshots confirm those improvements over
[matrix 1](visual-dark.md).

The phone fan's white picture face still shows small dark speckles and
dotted streaks, including near the number, beside the word Pieces and
towards the lower part of the face. The artifact remains visible in
[the new capture](matrix-2/dark-phone/01-middle.fan.png), after the
reported face-gap adjustment. The root reviewer was alerted immediately.
Its cause is not established by this image review, and it must not be
reported as fixed on the basis of matrix 2.

At the exact wide middle and closing arrival positions, the final note
line still meets or crosses the bottom edge. The closing text link is
below the captured viewport at that position. The corresponding middle
and end screenshots show the full notes and closing link. This remaining
boundary-position observation is distinct from matrix 1's almost
invisible captions and incorrect chapter highlight.

## Per-shot verdicts

| Exact screenshot | Verdict |
| --- | --- |
| [dark-wide/00-opening.gather-start.png](matrix-2/dark-wide/00-opening.gather-start.png) | Pass. Scattered cards stay in frame beside the complete readable opening caption. |
| [dark-wide/00-opening.gather-mid.png](matrix-2/dark-wide/00-opening.gather-mid.png) | Pass. Gathering cards remain within the viewport without covering the caption. |
| [dark-wide/00-opening.gather-end.png](matrix-2/dark-wide/00-opening.gather-end.png) | Pass. Gathered stack is framed beside the complete caption; look switch and rail remain clear. |
| [dark-wide/01-middle.fan-start.png](matrix-2/dark-wide/01-middle.fan-start.png) | Arrival fixes confirmed, with boundary note. Fan, line and correct Open rail are visible; heading and body are readable. The note's final line reaches beyond the bottom edge. |
| [dark-wide/01-middle.fan-mid.png](matrix-2/dark-wide/01-middle.fan-mid.png) | Pass. Fan, line and complete caption fit, with Open selected. |
| [dark-wide/01-middle.fan-end.png](matrix-2/dark-wide/01-middle.fan-end.png) | Pass. Full middle caption and formation remain visible. |
| [dark-wide/02-close.whole-start.png](matrix-2/dark-wide/02-close.whole-start.png) | Arrival contrast and rail fixes confirmed, with boundary note. Stack, heading and body are readable, and Whole is selected. The note reaches the bottom edge and the text link is below this captured viewport. |
| [dark-wide/02-close.whole-mid.png](matrix-2/dark-wide/02-close.whole-mid.png) | Pass. Stack, full closing note and Gather again text link are visible. |
| [dark-wide/02-close.whole-end.png](matrix-2/dark-wide/02-close.whole-end.png) | Pass. Complete closing content remains visible beside the stack. |
| [dark-short/00-opening.gather.png](matrix-2/dark-short/00-opening.gather.png) | Pass. Stack and complete opening caption fit the shorter viewport. |
| [dark-short/01-middle.fan.png](matrix-2/dark-short/01-middle.fan.png) | Pass. Fan and line clear the complete caption and remain inside the viewport. White picture face appears clean at this size. |
| [dark-short/02-close.whole.png](matrix-2/dark-short/02-close.whole.png) | Pass. Stack, closing note and text link fit with a bottom margin. |
| [dark-phone/00-opening.gather.png](matrix-2/dark-phone/00-opening.gather.png) | Pass. Stack fits between the look switch and readable caption; all opening text is visible. |
| [dark-phone/01-middle.fan.png](matrix-2/dark-phone/01-middle.fan.png) | Surface artifact remains. Fan, line and full caption fit, but the white picture face still contains dark speckles and dotted streaks. |
| [dark-phone/02-close.whole.png](matrix-2/dark-phone/02-close.whole.png) | Pass. Stack fits above the full closing caption and visible Gather again text link. |

This report changes no implementation or scaffold. It records the saved
matrix 2 images as they are and does not establish animation smoothness,
real-device performance or author approval.
