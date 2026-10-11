# Continuation image-tool observability audit

11 October 2026. Supplemental coordinator audit of completed actor turns 1
and 2. No model run, behavioral rejudgment, actor change or frozen-result
edit was made for this audit.

The underlying actor session records **11 completed image-bearing `exec`
calls returning 53 image blocks**. Turn 1 returned 29 images in seven calls;
turn 2 returned 24 images in four calls. Both public `exec --json` streams
contain zero `view_image` and zero `input_image` literals. Absence from those
public streams is therefore not evidence that the actor received no images.

[The sanitized JSON](visual-tool-observability.json) records the exact
session UUID, source-file hash, call and output timestamps, session line
numbers, requested screenshot paths, output-image hashes and dimensions,
and corresponding retained PNG paths and hashes. Only this actor's session,
`01a128f7-ea73-7aa3-aa20-76942d0edf05`, was examined. Reasoning, system
instructions, unrelated outputs and the complete transcript were not copied.

| Turn | Call suffix | Returned images | Content |
| --- | --- | ---: | --- |
| 1 | `PJZPsCIX5D8QDLEHupCRE0hV` | 5 | Initial draft original screenshots |
| 1 | `6MWtjxtMyPfFa40swlVWIcsA` | 1 | Final draft short opening original |
| 1 | `DO95BiooCKr321HFeC7xXHX1` | 5 | Light matrix sheets |
| 1 | `SH2n40fSn6H0dwJn62aOIgAX` | 6 | Dark matrix and supplemental sheets |
| 1 | `KxjzRWd31n3W6pTN3JfwPyLx` | 8 | Review matrix, no-JavaScript, context-loss and look-switch sheets |
| 1 | `rDLBiJs30yUdu3SlusyIu9bj` | 3 | Desktop evidence and phone originals |
| 1 | `naxL16fipwCezmws1mPWcw2g` | 1 | Context-loss original |
| 2 | `vU5ttJg1qashYNrfOtpRkNRR` | 6 | Final light matrix and supplemental sheets |
| 2 | `r1tglhzfKrb6lhGUOKJs4MT2` | 5 | Final dark sheets, including an incomplete no-WebGL sheet |
| 2 | `TNtETrpj02BwonDVwYTQBBkF` | 6 | Completed dark no-WebGL sheet and review sheets |
| 2 | `rvKK1AS1WMw0XktGf5VKEqOm` | 7 | Final no-JavaScript, context-loss and look-switch sheets; four originals |

## Byte matching and partial sheets

Forty returned images match the requested retained PNG byte for byte.
Eleven tall sheets returned at 1544 by 1600 pixels, while the saved originals
are 1600 by 1658. This is consistent with the default image tool's resizing.
The request paths and dimensions connect them to the corresponding retained
sources, but this audit does not claim identical hashes or independently
prove the resampling algorithm. Both hashes are recorded.

Two returned images are earlier versions of subsequently completed sheets.
Their returned payloads were individually opened during this audit:

- `dark-no-webgl` initially contains three labelled screenshots. The actor
  subsequently reopened it and received the exact bytes of the retained
  completed seven-image sheet.
- `review-reduced` contains 19 labelled screenshots, including
  `06-review.close-start.png`. It lacks only `06-review.close-mid.png` and
  `06-review.close-end.png`. The final call subsequently opened those two
  original PNGs, and their returned bytes exactly match retention. The
  completed 21-image sheet itself was not reopened.

The 13 returned PNG payloads that differ from retained source bytes are
preserved unchanged in [visual-tool-returned-images](visual-tool-returned-images/).
They were decoded from existing `input_image` data URLs, not regenerated or
edited. This preserves exactly what the actor received without copying
private session text.

## Coverage and limits

For the turn-1 final draft, the actor requested all 18 matrix sheets and the
supplemental sheet. Their source directories contain 213 matrix PNGs and 11
supplemental PNGs. For turn 2, the corresponding figures are 213 and 16.
The final `review-reduced` partial sheet plus its two subsequent original
views cover all 21 screenshots in that case; the other incomplete sheet was
reread. The session thus supports delivery covering those matrix and
supplemental sets through labelled sheets and selected originals.

The saved sheet generator loads all available case PNGs in sorted order,
uses four columns with image boxes 235 pixels high, and captures the full
page. It can run while screenshots are still being produced, which explains
why a sheet request alone does not establish final coverage. The matched
results and the inspected partial sheets are necessary evidence here.

Image delivery does not prove attentive review, establish pixel quality or
show that every original was opened at full resolution. Contact sheets
reduce each screenshot substantially. These are automated Chromium
artifacts, not evidence of physical-phone testing or author approval of the
new completed portfolio. The separate coordinator acceptance visual review
assesses its own retained originals.
