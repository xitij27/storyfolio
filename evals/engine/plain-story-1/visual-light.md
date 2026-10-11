# Light look: visual inspection of matrix 1

Inspected on 11 October 2026. Every image below was opened with the image
viewer at its saved resolution. This covers the nine wide screenshots,
three short screenshots and three phone screenshots requested for this
review. No runtime source changed while the matrix ran.

The three matching reports have empty `problems`, one canvas, the three
expected beat ids, one h1 and no horizontal overflow. Wide and short also
report no late large shader. Those automated results are separate from the
visual observations below.

## Findings

- All settled captions are legible, fit their viewport, and stay clear of
  the cards. The phone scene fits above the caption. No card is cut by the
  viewport in these images, including the scattered opening at wide size.
- The fan's numbers identify seven cards. Most individual words are covered
  by neighboring cards, and the phone fan is too small for comfortable
  reading of its print. This is acceptable as a decorative engine fixture
  because the HTML supplies its meaning, but not a proof that substantive
  portfolio evidence printed on cards would remain readable.
- Light stock has faint edges against the light ground. The closed stack
  reads mostly as one flat face; only the phone image makes its thin edges
  readily visible. This is a visual refinement for author review, not an
  overflow or missing-content failure.
- The wide middle beat's start screenshot has no accent line under the
  fan, though it is present in the middle and end screenshots. The requested
  start is scroll 1260, the exact timeline arrival boundary. The source
  extra is visible only when `frame.from === 1 && frame.to === 1`; exponential
  easing can approach that boundary indefinitely from the prior transition.
  This is a concrete boundary issue to investigate after the matrix ends.
  Closing overlay activation uses a similar exact rest test. Static images
  do not establish whether that invisible link is active at arrival.
- Wide middle and closing start captions are partly below the viewport and
  faded, as specified by their entry animation. Their middle and end images
  show the complete, opaque text. The rail still labels the prior chapter
  at those entry samples and labels the current chapter at middle and end.

## Per-image record

Paths are relative to this file's folder.

| Screenshot | Visual verdict |
|---|---|
| [Wide opening start](matrix-1/light-wide/00-opening.gather-start.png) | Pass for framing and caption legibility. Scattered cards and their shadows are visible; every card remains within the viewport. The left scattered card's edge is faint. |
| [Wide opening middle](matrix-1/light-wide/00-opening.gather-mid.png) | Pass. Cards have moved toward one another and grown, visibly exercising within-beat motion; no edge or caption collision. |
| [Wide opening end](matrix-1/light-wide/00-opening.gather-end.png) | Pass. One gathered front face is contained to the right of the full caption. The stack's depth is visually subtle. |
| [Wide middle start](matrix-1/light-wide/01-middle.fan-start.png) | Review issue: fan is contained, but its accent line is absent at exact arrival. Caption entry is faded and partly below the viewport, with the prior rail item still active. |
| [Wide middle middle](matrix-1/light-wide/01-middle.fan-mid.png) | Pass. Seven numbered cards, accent line, full caption and current rail label are visible. Inner words are occluded by the fan. |
| [Wide middle end](matrix-1/light-wide/01-middle.fan-end.png) | Pass, matching the settled middle image. Accent line is present and stays clear of the caption. |
| [Wide closing start](matrix-1/light-wide/02-close.whole-start.png) | Framing passes. Closing caption is entering and partly below the viewport; current card is contained. Overlay readiness cannot be established from the image. |
| [Wide closing middle](matrix-1/light-wide/02-close.whole-mid.png) | Pass. Full closing title, supporting text and ordinary backlink are visible. Current rail label is Whole. |
| [Wide closing end](matrix-1/light-wide/02-close.whole-end.png) | Pass, matching the settled middle image. Card and text are clear of one another. |
| [Short opening](matrix-1/light-short/00-opening.gather.png) | Pass. Gathered card, title and all supporting lines fit the shorter viewport. |
| [Short middle](matrix-1/light-short/01-middle.fan.png) | Pass. Fan and line are contained to the right; full caption fits. Some floor shadow continues beyond the bottom, without clipping the object or text. |
| [Short closing](matrix-1/light-short/02-close.whole.png) | Pass. Card and full closing caption, including backlink, fit without collision. |
| [Phone opening](matrix-1/light-phone/00-opening.gather.png) | Pass. Card sits between look controls and caption; full title, body and note fit. Fine stack edges are visible on the right. |
| [Phone middle](matrix-1/light-phone/01-middle.fan.png) | Pass for framing and HTML readability. Fan and line fit above the caption. Individual printed words are too small and partly occluded to carry essential content by themselves. |
| [Phone closing](matrix-1/light-phone/02-close.whole.png) | Pass. Full card, closing title, body, note and ordinary backlink fit; no horizontal clipping is visible. |

Headless pictures cannot establish physical-phone frame rate, touch feel,
scroll comfort or author acceptance. Those remain a separate review.
