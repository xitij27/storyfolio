# Final light-look screenshot review

Reviewed every PNG listed below individually on 11 October 2026, together
with the three corresponding reports. These captures belong to `matrix-2`
of the plain engine story: wide 1440 by 900, short 1280 by 720 and phone
390 by 844. The wide captures cover the start, middle and end of each
beat's rest interval. Short and phone captures cover each beat's end.

No blocking visual defect was found in these 15 captures. The opening
formation now fits inside the wide viewport, resolving the historical
right-edge clipping recorded in [visual-diagnostics.md](visual-diagnostics.md).
The wide middle and closing arrival captions are opaque and readable,
their rail labels match the active chapter, and the middle chapter's line
is present. This independently agrees with the lead reviewer's arrival
check. At arrival, the bottom of the explanatory note is still below the
viewport; the complete note is visible at the later samples as ordinary
document scrolling reveals it.

| Capture | Verdict and observation |
|---|---|
| [Wide opening start](matrix-2/light-wide/00-opening.gather-start.png) | Pass. Scattered cards are fully framed on the right, with readable caption and look controls; Gather 1 is the active rail entry. Pale edges provide a weak depth cue. |
| [Wide opening middle](matrix-2/light-wide/00-opening.gather-mid.png) | Pass. Gathering cards remain inside the viewport, with no former right-edge clipping. Overlap hides parts of some printed words; the HTML story remains readable. |
| [Wide opening end](matrix-2/light-wide/00-opening.gather-end.png) | Pass. The gathered stack is fully visible beside the caption. Gather is legible; pale stack edges make the thickness subtle. |
| [Wide middle start](matrix-2/light-wide/01-middle.fan-start.png) | Pass. The arrived fan is framed, the copper line is visible below it and Open 2 is active. The opaque heading and main caption are readable; the note continues below the viewport at this arrival position. |
| [Wide middle middle](matrix-2/light-wide/01-middle.fan-mid.png) | Pass. The full caption and note are visible alongside the fan and line. Several face words are partly hidden by the fan's overlap. |
| [Wide middle end](matrix-2/light-wide/01-middle.fan-end.png) | Pass. The fan, line and complete caption remain visible; the static middle formation is consistent with the preceding sample. |
| [Wide close start](matrix-2/light-wide/02-close.whole-start.png) | Pass. The closed stack fits, Whole 3 is active and the middle line is absent. The opaque closing heading and main copy are readable; the later samples reveal the rest of the note and text link. |
| [Wide close middle](matrix-2/light-wide/02-close.whole-mid.png) | Pass. The complete closing copy and Gather again text link are visible. The pale stack reads mostly as its front card. |
| [Wide close end](matrix-2/light-wide/02-close.whole-end.png) | Pass. The final stack and closing copy/link remain fully visible, with correct rail and clear look controls. |
| [Short opening](matrix-2/light-short/00-opening.gather.png) | Pass. The stack, full opening copy and note fit at the shorter height. Caption, rail and switch are readable and unobstructed. |
| [Short middle](matrix-2/light-short/01-middle.fan.png) | Pass. The fan and line fit beside the full caption and note. The rightmost card is within the viewport; overlapping words remain a minor limitation. |
| [Short close](matrix-2/light-short/02-close.whole.png) | Pass. The stack, full closing copy and text link fit; Whole 3 is active and the middle line is absent. |
| [Phone opening](matrix-2/light-phone/00-opening.gather.png) | Pass. The object sits above the complete readable caption and note. The look switch remains clear. Thin pale edges make the gathered depth subtle. |
| [Phone middle](matrix-2/light-phone/01-middle.fan.png) | Pass with a nonblocking presentation limitation. The fan and line fit above the complete caption, but small overlapping face words are difficult to read. Their content is available in the opening HTML note. |
| [Phone close](matrix-2/light-phone/02-close.whole.png) | Pass. The closed stack, full closing caption, note and ordinary text link fit vertically without overlap. The look switch remains visible. |

The [wide report](matrix-2/light-wide/report.json),
[short report](matrix-2/light-short/report.json) and
[phone report](matrix-2/light-phone/report.json) each record the expected
three beat IDs, one h1, one canvas and the light look, with no request
failures, warnings, reported problems, duplicate IDs or document horizontal
overflow. Requested and actual scroll positions match in every sample.

Two presentation improvements remain optional for this schematic test
story: stronger contrast at the card edges would make stack depth clearer,
and less overlap or larger labels would make each fan word easier to read,
especially on a phone. The prose and navigation are readable in these
captures, so neither is a Stage 2 engine blocker. These screenshots do not
establish keyboard behavior, overlay hitboxes, motion timing, fallback
behavior or author approval; those require their separate evidence and
approval gate. This review covers the light captures only and does not
claim that the still-running full matrix has completed.
