# Acceptance smoke test, reduced-motion visual review

Reviewed on 11 October 2026. All six PNGs in the final attempt's
`attempt-7/reduced-motion/` directory were opened individually with the
image viewer. These images show the unchanged plain engine story at
1440 by 900 with reduced motion requested and the 3D scene enabled.

The [browser report](attempt-7/reduced-motion/report.json) records one
visible canvas, no horizontal overflow and no failed requests, warnings, errors
or problems. It also records identical before/after canvas hashes for
each of the three beats over the checker's 400-millisecond stationary
interval. Those checks support stillness at the measured positions;
the images alone do not establish the behavior between scroll samples.

| Screenshot | Observation and verdict |
|---|---|
| [Opening, middle](attempt-7/reduced-motion/00-opening.gather-mid.png) | The opening already shows the gathered stack rather than an intermediate scattered pose. The complete heading, explanation and supporting note remain readable. The front card's word and number are legible, with faint stack depth against the light background. Controls and rail remain separate from the caption. No blocking visual issue. |
| [Opening, end](attempt-7/reduced-motion/00-opening.gather-end.png) | The same gathered pose and full opening caption remain visible. The object stays within the viewport, and there is no caption or control collision. Pale stack edges remain subtle. No new blocking visual issue. |
| [Middle, middle](attempt-7/reduced-motion/01-middle.fan-mid.png) | The full current caption is readable beside the fan and extra rust-colored line. Outgoing opening text remains at the top, with its heading partly above the viewport. It does not overlap the middle caption. Fan overlap hides portions of interior card words, as in the unchanged engine. No blocking visual issue. |
| [Middle, end](attempt-7/reduced-motion/01-middle.fan-end.png) | The outgoing opening text has scrolled out of view. The full middle caption, fan, extra line, rail and appearance control remain visible. The decorative overlapping words are still incomplete; the HTML explanation supplies the meaning. No new blocking visual issue. |
| [Close, middle](attempt-7/reduced-motion/02-close.whole-mid.png) | The scene shows the closed stack and the complete closing caption, including the "Gather again" text link. Outgoing middle text remains at the top with its heading partly outside the viewport, separate from the closing copy. No object clipping or caption collision appears. |
| [Close, end](attempt-7/reduced-motion/02-close.whole-end.png) | Only the complete closing caption remains on the left. The link, stack, rail and appearance control are visible. The pale stack still reads mainly as the front face. No new blocking visual issue. |

Outgoing text at the middle and closing midpoint is consistent with the
engine's reduced-motion treatment: caption fading is disabled, so earlier
content leaves through ordinary document scrolling. The current captions
are complete in all six reviewed frames. The inherited fan overlap and
subtle stack edges remain documented limitations, not new failures in
this acceptance smoke test.

No code change is requested from these images. The screenshots and three
stationary samples do not establish all transitions, every scroll
position, dark appearance, mobile reduced-motion behavior, physical-device
performance or user comfort. Existing Stage 2 evidence and author approval
remain separate from this final acceptance-checker smoke test.
