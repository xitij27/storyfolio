# Spine look review — awaiting Dawit's choice

Approved concept: The open runbook. Storyboard approved on 22 October 2026.

The homepage now runs four approved beats: opening, library outage origin, migration illustration and complete-book/contact ending. These form the runnable spine, not the finished 15-beat page. Working opening/closing wording remains provisional until the later whole-beat choice.

## Compare locally

In site/: `NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1` after the checked production build, or use npm run dev for source changes.

- Paper / daylight: http://127.0.0.1:3000/?look=light
- Desk / lamplight: http://127.0.0.1:3000/?look=dark

The toolbar switches looks without resetting the scroll, URL fragment or unrelated query parameters. Try the opening, scroll through the table removal and migration model, use Forward/Return, and reach the closed book/contact ending. CV and migration detail links are working. Pause 3D offers locally drawn static illustrations.

| Look | Ground and text | Material treatment |
|---|---|---|
| Paper / daylight | Warm linen, charcoal-green text, dark rust annotation accent | Rust bookcloth, ivory paper, broad daylight and soft matte shadows |
| Desk / lamplight | Dark desk, warm ivory text, copper annotations | Dark cloth, cream paper, controlled warm light and matte shadows |

Recommendation: Paper / daylight. The rust binding and paper folds remain easier to distinguish, particularly on a phone. Desk / lamplight is a complete alternative with the same geometry, content and interactions; choosing it does not remove any features.

## Decision

Pending. User has approved the concept and storyboard but has not picked a look. Do not infer a look choice from storyboard approval, and do not request additional skills or facts. Record the actual choice here and in handover.md before building remaining chapters.

The skill's building.md requires: “Let the person scroll those looks, ask which they choose, and stop for their answer before building the remaining chapters.” This is a design checkpoint, not a publishing approval. Publishing remains outside this task.
