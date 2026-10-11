# Stop-4 spine: desktop and mobile visual review

11 October 2026. All six desktop and three mobile images below were opened
individually from the completed local-dependency diagnostic. The files are
preserved in [local-deps-result](local-deps-result/manifest.json). This is
the actor's three-beat spine, not the complete seven-beat portfolio.

## What the images show

| Image | Individual observation |
|---|---|
| [Desktop opening, middle](local-deps-result/desktop/00-scope.opening-mid.png) | Ada's name, question, firmware definition, contribution, project label and contact/CV links are readable. Six labelled row cards form the main object at right. The small fixture schematic carries its explanatory label and an enlargement link. |
| [Desktop opening, end](local-deps-result/desktop/00-scope.opening-end.png) | The same opening content remains readable and within the viewport. Three appearance options fit at the top. The CV link has the visible outline left by the keyboard probe; it does not cover nearby copy. |
| [Desktop transition, middle](local-deps-result/desktop/01-transition.diagram-mid.png) | Rows form three separated pairs carrying Sleep, Measure and Transmit labels with textual arrows. The caption explains the teaching loop and preserves its non-measurement limit. A labelled schematic thumbnail and enlargement link are visible. This image does not show physical connector lines between all three row groups. |
| [Desktop transition, end](local-deps-result/desktop/01-transition.diagram-end.png) | Transition heading, loop explanation, disclaimer and schematic link remain complete. The appearance selector and chapter rail do not overlap the caption. Row labels are softer than the ordinary HTML text but discernible at this capture size. |
| [Desktop close, middle](local-deps-result/desktop/02-review.close-mid.png) | The six-row table reassembles beside the closing answer. Projection wording, 72-hour limit, preliminary emissions result and unfinished qualification are readable. Email, corrected HTML CV and Back to Scope links are visible. |
| [Desktop close, end](local-deps-result/desktop/02-review.close-end.png) | Closing copy and all three text actions remain visible, with Review active in the rail. The shallow pale object still reads chiefly through its ruled rows and labels, rather than strong depth. |
| [Mobile opening](local-deps-result/mobile/00-scope.opening-mid.png) | The narrow view shows readable name, question, firmware definition and contribution without a canvas. Email/CV links fit. The fixture schematic is substantially larger than its desktop thumbnail and includes both its own teaching label and the adjacent explanatory disclaimer. |
| [Mobile transition](local-deps-result/mobile/01-transition.diagram-mid.png) | The static teaching loop and its arrows fit within the viewport width. The heading, explanation, non-measurement disclaimer and enlargement link remain readable; the following section begins below. |
| [Mobile close](local-deps-result/mobile/02-review.close-mid.png) | Closing answer, all three evidence limits, email, HTML CV and Back to Scope fit in the narrow flow. The footer accurately identifies the three-beat review spine. The email focus outline is a retained keyboard-probe state. |

No blocking clipping, blank scene or caption/control collision appears in
these nine captures. Desktop uses a visible 3D scene; mobile presents
readable static HTML and the supplied drawings. Screenshots do not prove
physical-device performance, all looks, every transition, the remaining
chapters or external delivery to the reserved example email address.

## Raw checker failures and their interpretation

The [desktop report](local-deps-result/desktop/report.json) and
[mobile report](local-deps-result/mobile/report.json) each retain five
reported problems. They must not be relabelled as passing automatic checks.
Inspection separates two coordinator measurement issues from actor defects:

1. **Four strict link-name mismatches.** The actual observed names are
   `Email Ada ↗`, `Download CV HTML ↓`, `View power-state schematic ↗` and
   `View fixture schematic ↗`. Frozen expected names omit these visible
   decorative arrows and the useful file-format label. For each destination,
   the saved samples contain the correct href with `visible: true`,
   `inView: true`, `tabIndex: 0` and `hitTarget: true` at its relevant beat.
   The images independently show the links in those locations. The checker
   labels these "never usable" because of exact name equality, despite
   its own positive visibility/focusability/hit-test observations. These
   four raw failures therefore do not establish broken links.
2. **An unvisited beat's sentence in the partial expectations.** The omitted
   sentence is "Bring-up means checking a new board's basic operation."
   The [frozen storyboard](../../../inputs/fixture/docs/story/storyboard.md)
   assigns this definition to `observation.fixture`,
   outside this stop-4 spine. Its opening row calls for the firmware
   definition, which is visibly present. Absence here is not evidence that
   the agent failed the later Observation chapter. The definition remains
   required in the complete seven-beat acceptance.

The full local-dependency manifest completed all six cases with raw
`passed: false`; its automatic result remains unchanged. These observations
are a separate coordinator interpretation of the partial spine, not a
retroactive checker edit, a full-site pass or a change to frozen inputs.
