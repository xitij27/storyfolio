# Control-response settlement limitation

12 October 2026, source-only review during the one desktop calibration.
No helper/source change, test, browser call, process signal or cleanup was
performed. Root reported that several control after-images show travel and
`control-7c30f7cd27b3b32b-pointer-after.png` shows a blank neutral background.
This reviewer has not independently viewed that image or a completed mode
report at this checkpoint. It is not a prototype visual-failure finding.

## What the recorded trial can establish

`evals/lib/build-capture.mjs` lines 269 to 283 mark activation, wait exactly
400 ms, inspect DOM/scroll/target state once, then take the after screenshot.
For a fragment anchor, target response is recorded when the destination is
visible and intersects the viewport and either location or scroll changed.
It does not require the destination to be settled. There is no sequence of
scroll positions, scrollend event, stable-position duration, motion flag or
post-settlement observation in these trials.

The DOM `after` observation precedes the screenshot. A slow screenshot may
therefore show a later point of the same movement than its saved scroll/
target record. Screenshot completion is not a scroll-stability assertion.
The final journey worker invokes the unchanged generic control function
and adds no settlement phase. Each next trial resets the document, so it
does not retain a later settled observation of the preceding method.

Consequences are two-sided: a long valid smooth scroll may fail target
visibility at 400 ms, while a still-moving destination may already intersect
the viewport and receive an observed response. Neither proves the settled
destination's composition. The reported blank frame could be a transition,
but source inspection alone does not establish its actual cause. Current
raw records and any technical failure must remain unaltered.

## Narrow prospective remedy, not applied

Before judging a navigation response, independently sample actual scroll
position over a bounded stable interval after activation and before the
final DOM observation and original screenshot. Record the samples, elapsed
time, stable/timeout outcome and destination geometry. Do not infer settling
from a successful click, URL hash, image difference or one viewport hit.
Keep a timed-out or ongoing movement unobserved/failed instead of forcing
scroll or accepting the planned target as reached. Object animation and
semantic composition still require original-image review; stable scroll
alone is not a geometry or quality pass.

A change belongs in an explicitly revised prospective measurement baseline
after this calibration closes. It must preserve the current helper bytes,
current images/results and old shared checker, and must stay inside the
already declared per-unit bounds. It is not permission to repeat this
calibration, repair prototype source or weaken source/lifecycle gates.

## Closed-record follow-up and prospective derivative

The first desktop calibration closed normally at 04:46:29.911Z, exit 1.
Its saved report retains 23 control problems. This follow-up read the raw
report and actual prototype source, without launching a browser, build,
test, actor, judge or process cleanup. Root owns original-image review.

The four middle controls are buttons, not ARIA tabs. In
`prototypes/fixture-study/content/inspect.tsx` they share an explicitly
named `role="group"`, each has `aria-pressed`, and none has `aria-controls`.
The source starts Command selected. The original checker only recognizes
pressed-button peers with the same declared `aria-controls`, so neither
Command trial has peer preparation. Both record `pressed: "true"` before
and after. This is an unobserved return-selection response, not evidence
that Command is broken and not permission to count an unchanged click.

All four keyboard trials record scroll 3546 before and 710 after. Board,
Fixture and Observe do record their own `aria-pressed` change, but their
after originals cannot establish a settled in-place selection. The generic
checker focuses the body and immediately navigates with Tab, with no
settlement observation before the baseline original or activation. Actual
prototype CSS declares smooth document scrolling. These facts justify
observing settlement before activation as well as after it, but do not
establish the cause of every visual frame or excuse an inaccessible target.

The new, separate [controls-lib.mjs](../../full-journey-measurement/controls-lib.mjs)
is a prospective derivative of the unchanged shared `exerciseControl`.
It records actual two-axis scroll samples, allows at most 3000 ms per
settlement phase, requires at least 400 ms of observation and 150 ms stable
within 0.5 px, and inspects again after each original screenshot. It does
not force scroll, selected state or focus onto a requested target. Real
Tab and pointer activation remain. Ongoing motion, screenshot-time drift
and unchanged responses fail instead of receiving functional credit.

Selected controls may prepare an actual inactive peer only through a
declared native radio, tablist, pressed-button group or controlled-target
relationship. Preparation records the peer identity and actual click,
requires stable scroll, and must observe target deselection and peer
selection. A nonexclusive group that does not deselect the target fails;
unrelated siblings are not guessed. The target must then independently
respond to both modalities. There is no idempotence exemption.

[controls.test.mjs](../../full-journey-measurement/controls.test.mjs) contains
deterministic fake-clock and DOM-adapter tests, including no response,
unrelated/hidden/disabled peers and ineffective preparation. They have not
been run at this checkpoint. The new helper has not been integrated or
browser-calibrated. Parent approval is required before integration and
new runtime work; original source and all first-calibration bytes remain.

Source checkpoints:

- Original shared `build-capture.mjs`: `7472bf42a1bfc2a18c7b317e9c1b43274e431737a6ea82f9e66c927a4b39521e`.
- Prototype `content/inspect.tsx`: `3b77b6317c57f3c195fbc663db3021faaa45831facbeb9f4f1f30477fd4eb3e2`.
- First desktop report: `d7e7b67b8434ba159a576fcdcd78656f1c62281fc65d702a20035f4cb04ba242`.
- Prospective helper: `6687e8bf0fb31d10b84b6b96f9f1ca567a5bb9a30069a3641e84f731bd629f11`.
- Prospective tests: `2e18fc9b9a69ec9fdfb0c347c2ddf4bb7e4b6544e2bada0d0aed061a75e396c0`.

## Integration instructions, not execution approval

After preserving the first calibration implementation, replace only the
final worker's shared `exerciseControl` import/call with the study-local
`exerciseSettledControl`. Retain `assessControl` and all target, source,
whole-wording, lifecycle and coverage assertions. Add both new files to
`binding-lib.mjs` implementation paths and the case's implementation freeze
list, and add the helper to the worker's self-hash list. Document the
prospective measurement-baseline change. Run the new deterministic tests
alongside existing measurement tests only after root authorizes runtime
work. A separate bounded manual-prototype calibration would be needed to
establish actual browser behavior; these fake adapters cannot prove it.
