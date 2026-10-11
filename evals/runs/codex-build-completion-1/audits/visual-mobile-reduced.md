# Mobile and reduced-motion visual review

11 October 2026. This reviewer individually opened all 14 original PNGs
listed below at their original dimensions using the image-viewing tool.
No contact sheet, resized substitute or inferred screenshot review was
used. SHA-256 values were then recomputed from the saved bytes and all
14 matched the independent acceptance manifest. No actor source, frozen
input, screenshot or acceptance report was changed.

The [acceptance manifest](../embedded-completion-1/baseline-1/acceptance/result/manifest.json)
records the production run from 2026-10-11T03:40:30.490Z to
2026-10-11T03:42:07.914Z, with all six browser cases passing. This
review covers only the seven mobile and seven reduced-motion images.
Both use the fixture's explicitly static HTML/diagram policy: mobile is
390 by 844; reduced motion is 1440 by 900. Their saved reports contain
all seven expected beat IDs and no automatic problems.

## Findings

No blocking clipping, horizontal content loss or text/diagram collision
was found in these 14 images. Main factual text remains readable, including
separate attribution, assembled/tested/customer counts, projected endurance,
the 72-hour limit and unfinished qualification. The supplied diagrams
identify themselves as explanatory. The closing contact and CV links are
visible in both closing images.

One minor fallback wording limitation remains: the State beat says
“These six narrative rows” while both static views show prose without
a row graphic. The phrase lacks a visible referent in that beat. This
observation is separate from the passing automatic checks; it does not
show a missing confirmed fact or an unusable page. Diagram footnotes are
small on mobile, although the important explanatory disclaimers are also
present in larger HTML text.

These are viewport captures at saved scroll positions. Cropped preceding
content, a clipped opening kicker, or a following section continuing below
the image is not evidence of CSS clipping. The opening CV focus outline
is visible in both conditions after the checker's keyboard pass. No
fixed overlay collision appears in these captured positions.

This review does not prove physical-phone scrolling, touch behavior,
contrast ratios, screen-reader behavior, all focus states, stationary
behavior over time, or absence of network scene chunks. The images show
static fallbacks, not the fidelity of the animated six-piece object. It
does not replace the separate desktop/failure-mode review or independent
behavioral judgment.

## Individual images

Paths below are relative to the saved acceptance result. Each observation
comes from opening that original image separately.

### mobile

- [mobile/00-scope.opening-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/00-scope.opening-mid.png), 390 by 844, 65776 bytes. SHA-256: `5ae972ca4b9657f1438076f9d302b45ae9e504014dfe4c8db6f80b5599b567e1`. Name, opening question, selected opening wording, firmware definition and Ada contribution fit without overlap. Email/CV and the complete fixture diagram are visible. The kicker at the top is cropped by this scroll sample; the CV focus rectangle is visible.

- [mobile/01-responsibilities.split-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/01-responsibilities.split-mid.png), 390 by 844, 60177 bytes. SHA-256: `b565ca9c81a7335c3e30becc542b338872d48cedebb0dc30898d9474ffb56ee6`. Ada contribution and the colleague PCB/analogue-front-end attribution remain distinct and readable. The following State beat also fits; only the following Transition heading continues past the bottom viewport edge.

- [mobile/02-state.table-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/02-state.table-mid.png), 390 by 844, 63327 bytes. SHA-256: `6a41949ce0d0e09e7418e2ac91ba1d8cbf878e7664159ee69ad4a32a720f206c`. State heading wraps cleanly; daily-document prose and the actual-firmware disclaimer are legible. No row graphic appears in this static beat despite the phrase “These six narrative rows”. Transition begins below in ordinary flow.

- [mobile/03-transition.diagram-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/03-transition.diagram-mid.png), 390 by 844, 50966 bytes. SHA-256: `e3a7d56a7bd58eb55ad66e408fe94209a4942b60284883581cfbd22ee68df171`. Teaching loop, Sleep/Measure/Transmit boxes, return arrow, explanatory qualifiers and schematic link all fit. Small SVG footnotes remain legible here, with the important disclaimer repeated in larger HTML.

- [mobile/04-observation.fixture-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/04-observation.fixture-mid.png), 390 by 844, 57445 bytes. SHA-256: `e770749c5b91d62e893c027e34666b76c0c1ed8494c4f4f27d5213ee5e27a27a`. Bring-up definition and Ada fixture contribution are readable. All four diagram boxes, arrows, explanatory/non-photograph label and link are visible without collision. The large two-line title fits the column.

- [mobile/05-observation.evidence-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/05-observation.evidence-mid.png), 390 by 844, 66676 bytes. SHA-256: `8e423683c4b18117a9a0a99f48ab683ad077d8586fedf47d652b7f7a5c4cba78`. Assembled/tested/customer counts, projected endurance, 72-hour run and unfinished qualification are clearly separated. The explicit 72-hour-versus-two-year warning is visible. The next Review beat continues below the viewport.

- [mobile/06-review.close-mid.png](../embedded-completion-1/baseline-1/acceptance/result/mobile/06-review.close-mid.png), 390 by 844, 61108 bytes. SHA-256: `0a800b098af2b4abbd81baac944323caa1829b9f8b27fbf7f4c7a48c5c3c3df6`. Closing answer, selected closing invitation, projection/run/qualification limits, Email/CV, Back to Scope and footer fit. A fragment of the preceding evidence note at the top is normal scroll context; no closing text is clipped.

### reduced-motion

- [reduced-motion/00-scope.opening-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/00-scope.opening-mid.png), 1440 by 900, 86616 bytes. SHA-256: `62dd974f16269b3ecbb4cfe49acbad2ef0cf15e17c27b440f11fb8c5249f0438`. Opening name/question, selected prose, firmware definition and contribution are readable in the static desktop column. Email/CV and the full fixture schematic are visible; its explanatory label repeats below. The schematic link lies below this particular frame, so this image alone does not establish its visibility.

- [reduced-motion/01-responsibilities.split-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/01-responsibilities.split-mid.png), 1440 by 900, 89547 bytes. SHA-256: `50cc9beb376f6908d60b125af9d411092faae354cded19b9b414ad44f1479bbf`. Attribution to Ada and her colleague is unambiguous and legible. Responsibilities, State and the start of Transition share the viewport in ordinary flow with clear separators, without collisions.

- [reduced-motion/02-state.table-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/02-state.table-mid.png), 1440 by 900, 84815 bytes. SHA-256: `ff66d59134e1d802a80b7d308c5e165c229cf9b61947285d68d22ab09738978d`. State prose and actual-firmware disclaimer fit. The row graphic is absent while “These six narrative rows” remains. The following Transition text and upper diagram are visible; the diagram continues below the viewport.

- [reduced-motion/03-transition.diagram-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/03-transition.diagram-mid.png), 1440 by 900, 68232 bytes. SHA-256: `1e828a3c33601c1e58c97a42f5a3a78ca213788c766fba438e6683ea5f257017`. The complete loop diagram, labels, return arrow, no-measurement/code qualifier, repeated HTML disclaimer and schematic link are readable. Nothing overlaps the title or caption.

- [reduced-motion/04-observation.fixture-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/04-observation.fixture-mid.png), 1440 by 900, 81033 bytes. SHA-256: `dcc0351ecc1c258d58576ac76a72994555071e84976717846305dd13ad132ca4`. Full Bring-up heading/definition, the described teaching relationships, four diagram boxes, explanatory labels and link fit. Diagram content does not imply actual circuit detail or a photograph.

- [reduced-motion/05-observation.evidence-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/05-observation.evidence-mid.png), 1440 by 900, 97906 bytes. SHA-256: `3a79cb5ceda6d260db6991471a837c619e4de9d72f2778541424053653c59875`. All sample counts and evidence limitations are readable, including the explicit warning that 72 hours does not validate two years. Review starts below with its supported answer and selected closing invitation; later Review text continues offscreen.

- [reduced-motion/06-review.close-mid.png](../embedded-completion-1/baseline-1/acceptance/result/reduced-motion/06-review.close-mid.png), 1440 by 900, 91998 bytes. SHA-256: `33122d0371ad0b39a2b7e2e6aae176725e381a2b02a5c0322b2660f138b00a11`. Review heading, answer, chosen invitation, repeated evidence limits and all closing links fit above the footer. The preceding evidence section is partly visible at the top because this sample is near the document end.
