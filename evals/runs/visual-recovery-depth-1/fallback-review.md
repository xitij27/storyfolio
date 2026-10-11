# Source and fallback review

11 October 2026. Reviewed the five-beat page source, inspection copy and
supplemental figures, then individually opened all eighteen saved fallback
images listed below after their mode reports completed. This reviewer
authored `content/story-depth.tsx`; this is an implementation review, not an
independent model evaluation. No source edits or paid runs were made during
this review.

## Source discipline

The reviewed [page](../../../prototypes/fixture-study/app/page.tsx),
[inspection copy](../../../prototypes/fixture-study/content/inspect.tsx) and
[supplemental figures](../../../prototypes/fixture-study/content/story-depth.tsx)
preserve the supported fictional facts. The
[frozen facts](../../builds/embedded-1/workspace/docs/story/facts.md) and
[lab notes](../../people/embedded/material/lab-notes.md) supply the bounds.

Ada wrote firmware, scheduled power states and built the fixture. The PCB
and analogue front end remain a colleague's work. State tables, timing
diagrams and bench checklists are named as working documents, but their
actual contents are not fabricated or displayed as recovered records.
The Sleep, Measure, Transmit sequence is visibly labeled as an explanatory
teaching loop and not Mosslink's actual firmware, in both HTML and SVG.
Its short descriptions explain the illustration, not a recovered state
machine, actual durations or measured power use.

The estimate path identifies supplied inputs: measured sleep/transmit
current and an assumed reporting interval. It supplies no current values,
interval, battery capacity or full calculation. Its two-year projection is
separate from the continuous bench run whose longest observed duration was
72 hours. Neither the HTML nor SVG draws an arrow from 72 hours to two years.
The footer quotation matches the supplied fictional lab note and explicitly
says that its spreadsheet and numeric inputs are not supplied.

Forty engineering samples, six bench-tested and none sent to customers are
correctly distinguished. The six highlighted cells are labeled as a subset,
not a pass/fail chart. A preliminary emissions check is distinguished from
unfinished full qualification. The radio-awake incident is omitted, and no
diagnosis, successful fix, field deployment or endurance result is invented.

## Visual result

At 1440 by 900, all five fallback beats retain meaningful diagrams and
readable supporting HTML. The added power-cycle arrows and return path are
legible. Both the teaching status and absence of actual timings/current
values are visible. The evidence diagram has two separate horizontal paths
with clear input and outcome labels. The final sample counts, forty-cell
illustration and unfinished-qualification statement fit without clipping.

No current beat's main copy overlaps its diagram. Each complete current
diagram is inside the viewport and its labels remain readable. Adjacent
beats enter the viewport in ordinary document flow. The fixed explanatory
strip at the bottom covers small fragments of the following beat in several
samples, as in the earlier prototype; the covered content is visible in
its own subsequent capture. This is a minor persistent occlusion, not a
missing explanation.

The HTML and SVG repeat the power and evidence explanations beside one
another. That is somewhat repetitive, but it retains clear meaning without
WebGL. In no-JavaScript mode the inspection controls are absent while the
underlying relationship, ownership, facts and diagrams remain readable.
No new factual or fallback-layout blocker was found.

All six `context-loss` images were captured **after** context loss, including
the initial image and all five named beats. Each corresponding capture entry
records `scene: off`; the images visibly contain the static alternatives.
This is full five-beat post-loss image coverage, not the narrower pre-loss
sequence from an earlier study. The report preserves the warning
`THREE.WebGLRenderer: WEBGL_lose_context extension not supported.` Its errors
and problems arrays are empty. No-WebGL and no-JavaScript reports also have
empty errors and problems arrays and no warnings.

## Exact images opened

All paths below are relative to `evidence/review/`. Each mode uses 1440 by
900. [The manifest](evidence/review/manifest.json) records the capture scope.

| Mode | Exact filenames opened |
|---|---|
| WebGL unavailable | `no-webgl/initial.png`, `no-webgl/opening.assembly.png`, `no-webgl/power.cycle.png`, `no-webgl/middle.relationship.png`, `no-webgl/proof.boundaries.png`, `no-webgl/close.evidence.png` |
| JavaScript disabled | `no-js/initial.png`, `no-js/opening.assembly.png`, `no-js/power.cycle.png`, `no-js/middle.relationship.png`, `no-js/proof.boundaries.png`, `no-js/close.evidence.png` |
| After context loss | `context-loss/initial.png`, `context-loss/opening.assembly.png`, `context-loss/power.cycle.png`, `context-loss/middle.relationship.png`, `context-loss/proof.boundaries.png`, `context-loss/close.evidence.png` |

Supporting reports: [no WebGL](evidence/review/no-webgl/report.json),
[no JavaScript](evidence/review/no-js/report.json), and
[context loss](evidence/review/context-loss/report.json).

This bounded review does not assess live 3D motion, phone layout, physical
device performance, context restoration, formal accessibility compliance
or the author's satisfaction with the deeper story. Those require their
own observations and should not be inferred from eighteen readable images.
