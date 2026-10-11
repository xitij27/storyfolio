# Matrix 3 light-look visual review

Reviewed all 15 PNGs below individually on 11 October 2026, together with
the three case reports. These fresh captures follow the default card body
material depth-offset correction and use the source identified in
[matrix-3/source-hashes.json](matrix-3/source-hashes.json). They supersede
the light-look visual observations from the interrupted matrix 2 for this
captured implementation. Matrix 2 remains historical evidence.

The reviewed light cases pass visual inspection. Object framing, HTML
readability, arrival caption opacity, visible controls and active desktop
rail labels are consistent at the sampled positions. The middle chapter's
line is present and disappears in the closing chapter. The phone card
faces and labels show no visible surface breakup in these captures.

| Capture | Verdict and observation |
|---|---|
| [Wide opening start](matrix-3/light-wide/00-opening.gather-start.png) | Pass. The scattered formation is fully inside the viewport, with readable opening copy, look switch and Gather rail. Card overlap conceals some words, while the full word list is in HTML. |
| [Wide opening middle](matrix-3/light-wide/00-opening.gather-mid.png) | Pass. The gathering formation remains fully framed. The visible Open, Whole and Gather labels render cleanly; the full caption remains readable. |
| [Wide opening end](matrix-3/light-wide/00-opening.gather-end.png) | Pass. The gathered stack fits beside the full caption, with Gather legible on its face and the correct active rail. Pale edges make stack depth subtle. |
| [Wide middle start](matrix-3/light-wide/01-middle.fan-start.png) | Pass. The arrived fan and line are framed; Open is active. Heading and main copy are opaque and readable. The explanatory note continues below the viewport at arrival and is fully revealed at the later samples. |
| [Wide middle middle](matrix-3/light-wide/01-middle.fan-mid.png) | Pass. The full caption and note fit beside the fan and line. Partly obscured face words are caused by the overlapping formation, with no visible surface breakup. |
| [Wide middle end](matrix-3/light-wide/01-middle.fan-end.png) | Pass. The fan, line, complete caption and controls remain visible in the static middle formation. |
| [Wide close start](matrix-3/light-wide/02-close.whole-start.png) | Pass. The stack fits, Whole is active and the middle line is absent. Closing heading and main copy are opaque and readable; later samples reveal the rest of the note and link. |
| [Wide close middle](matrix-3/light-wide/02-close.whole-mid.png) | Pass. The full closing copy, note and ordinary Gather again link are visible beside the stack. |
| [Wide close end](matrix-3/light-wide/02-close.whole-end.png) | Pass. The final stack, full caption/link and visible controls remain framed and readable. |
| [Short opening](matrix-3/light-short/00-opening.gather.png) | Pass. The stack, full opening caption and note fit at 720-pixel height. No visible control or caption overlap. |
| [Short middle](matrix-3/light-short/01-middle.fan.png) | Pass. Fan and line fit beside the full caption and note, with Open active. Face-word overlap remains a minor presentation limitation. |
| [Short close](matrix-3/light-short/02-close.whole.png) | Pass. Stack, full closing copy and ordinary text link fit at the shorter height, with Whole active. |
| [Phone opening](matrix-3/light-phone/00-opening.gather.png) | Pass. The front card, Gather label and number render cleanly above the complete readable caption and note. The switch is unobstructed. Stack edges remain very pale. |
| [Phone middle](matrix-3/light-phone/01-middle.fan.png) | Pass with a nonblocking presentation limitation. The fan and line fit above the complete readable caption. Small overlapping words are difficult to read, but their content is available in the opening HTML note. No visible face-surface breakup appears. |
| [Phone close](matrix-3/light-phone/02-close.whole.png) | Pass. The front card, number and Gather label render cleanly above the full closing caption, note and link. The switch remains visible and no content overlaps it. |

The [wide report](matrix-3/light-wide/report.json),
[short report](matrix-3/light-short/report.json) and
[phone report](matrix-3/light-phone/report.json) each record the expected
three beat IDs, one h1, the light look, scene on and one canvas, with no
request failures, warnings, reported problems, duplicate IDs or horizontal
overflow. Requested and actual scroll positions match in every sample.
Wide sampling covers start, middle and end at 1440 by 900; short and phone
cover each beat's end at 1280 by 720 and 390 by 844 respectively. The wide
and short reports record no large shaders compiled after their initial
scene samples.

Two optional presentation improvements remain for this schematic test
story: stronger card-edge contrast would better communicate stack depth,
and less overlap or larger words would make the fan's individual labels
easier to read, especially on a phone. They do not prevent reading the
HTML narrative or using its visible controls in these captures.

This review establishes the visual result only for the light cases and
sampled positions above. Static screenshots cannot establish all movement
between samples, sustained rendering performance, keyboard behavior,
fallback behavior or the complete matrix result. Those have separate
evidence. This review is also separate from the author's required Stage 2
approval.
