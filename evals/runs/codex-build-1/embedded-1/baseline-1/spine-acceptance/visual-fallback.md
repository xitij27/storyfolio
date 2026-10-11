# Visual review of the three fallback conditions

11 October 2026. A coordinator reviewer opened all nine original PNGs below
individually at their supplied dimensions. No source, screenshot, report or
expectation file was changed; no browser or model conversation was started.

All nine inspected captures present readable HTML and supplied schematics.
There is no visible blank scene, overlapping content, horizontal clipping or
broken image in these samples. This is a visual finding for the three-beat
spine only. It does not turn the preserved failed automatic reports into
passes or approve the complete seven-beat portfolio.

| Condition and original capture | Visual observation |
|---|---|
| No WebGL, 1440 by 900: [Scope](local-deps-result/no-webgl/00-scope.opening-mid.png) | Name, opening question, firmware explanation, contribution, contact/CV and the full fixture schematic are readable. The diagram's explanatory limit is visible. The small Scope label sits above this scrolled crop; there is no overlap within the visible content. |
| No WebGL, 1440 by 900: [Transition](local-deps-result/no-webgl/01-transition.diagram-mid.png) | Full heading and teaching-loop text fit. Sleep, Measure, Transmit and the return arrow are clear. The statement that no durations, current values or actual code are shown is visible, as are the explanatory caveat and schematic link. |
| No WebGL, 1440 by 900: [Review](local-deps-result/no-webgl/02-review.close-mid.png) | Closing heading and evidence statement fit below the previous section. Projection, 72-hour run and unfinished qualification limits remain readable. Contact/CV and back-to-Scope links are visible; the Email Ada focus outline is clear. Footer is unobstructed. |
| No JavaScript, 390 by 844: [Scope](local-deps-result/no-javascript/00-scope.opening-mid.png) | Single-column heading, explanation, contribution, links and complete fixture diagram fit horizontally. Diagram labels are smaller than body copy but readable in this capture. The explanatory caption and expansion link remain visible. |
| No JavaScript, 390 by 844: [Transition](local-deps-result/no-javascript/01-transition.diagram-mid.png) | Heading and explanatory text wrap cleanly. Full loop diagram, return arrow, limitations and expansion link fit within the narrow column. No canvas-sized empty area appears. |
| No JavaScript, 390 by 844: [Review](local-deps-result/no-javascript/02-review.close-mid.png) | Closing heading, answer and all three evidence limitations wrap without clipping. Contact/CV, back-to-Scope link and two-line footer remain separated and readable. The preceding diagram's tail at the top is normal document flow at this scroll position. |
| Context loss, 1440 by 900: [Scope](local-deps-result/context-loss/00-scope.opening-mid.png) | The saved fallback shows the same readable opening, contribution, contact/CV and complete fixture diagram as the no-WebGL condition. No residual canvas covers them. The chapter label is above the scrolled crop. |
| Context loss, 1440 by 900: [Transition](local-deps-result/context-loss/01-transition.diagram-mid.png) | Heading, teaching text, full static loop and explanatory limits remain visible after the reported context loss. No broken scene overlay or layout gap appears. |
| Context loss, 1440 by 900: [Review](local-deps-result/context-loss/02-review.close-mid.png) | Closing text, evidence limits, contact/CV and footer remain legible. The Email Ada focus outline is visible. No apparent overlap or loss of the closing content follows the reported scene failure. |

## Automatic observations stay separate

The preserved [no-WebGL report](local-deps-result/no-webgl/report.json),
[no-JavaScript report](local-deps-result/no-javascript/report.json) and
[context-loss report](local-deps-result/context-loss/report.json) each list
the same five failures: one required bring-up definition and four expected
link labels. Their recorded link text includes visible suffixes such as
`Email Ada ↗`, `Download CV HTML ↓` and `View fixture schematic ↗`, while the
expected labels omit those suffixes. The screenshots visibly contain these
links. The reports also retain actual destinations, focusability and sampled
hit-target observations. A label comparison failure should therefore not be
described as a visually absent contact or schematic link.

The coordinator identified that the partial expectations incorrectly kept a
definition assigned to the unvisited Observation chapter. These captures do
not contain that exact sentence and do not establish the later chapter's
implementation. This review neither edits that expectation nor silently
waives a full-site requirement. Any corrected diagnostic belongs in a new
result directory with its own explicit scope.

## Limits

The samples cover Scope, Transition and Review at one stored scroll position
per condition, with no WebGL and context loss on desktop and no JavaScript
on the narrow viewport. They do not show the top-of-page header, all scroll
positions, every appearance, all keyboard routes, animation, physical phone
behavior or the actual opening of the mail/CV links. Static screenshots do
not independently prove how WebGL was disabled or lost; that setup belongs
to the linked reports. Four storyboard beats and later approval gates remain
outside this partial spine review.
