# Prospective mode timing and keyboard reset review

12 October 2026. Source-only review by the acceptance subagent. No tests,
browser, build, model, installer, process signal or cleanup was launched.
No policy, helper, prototype or preserved calibration file was changed.
Root owns the terminal/process audit and original-image review.

## The current attempt remains incomplete

The [saved launch](desktop-command/command.json) began at
05:02:21.769Z. Root reported terminal observation at about 05:08:56Z;
the [terminal tool return](desktop-tool-poll-4.json) records outer exit
143, without output. The recorded inner work deadline is 475000 ms plus
5000 ms shutdown grace, unchanged for this attempt. The roughly 395-second
observed duration is before that deadline. No terminal mode report or
normal worker/outer result was available for this review. This is not a
completed calibration or a basis for retroactively extending its deadline.

## Fixed-loop timing conflicts with full-journey scope

Let B be actual beats and C be the unique inventoried controls. For the
three animated travel modes, the source-defined scheduled waits are
approximately:

`7.2 B + 12.6 (B - 1) + 12.4 C` seconds.

The components are directly traceable to the frozen helpers:

- The final worker waits 1800 ms at start, mid, end and rest: 7.2 seconds
  per beat.
- Shared `captureTravel` observes a 6000 ms actual trajectory after a
  300 ms wait for each adjacent interval in both directions: 12.6 seconds
  per adjacent pair.
- Each ordinary control gets pointer and keyboard trials. Each trial has
  1800 ms reset, 1800 ms observed-scroll and 1800 ms scroll-into-view waits,
  plus at least 400 ms settlement before and after activation: 6.2 seconds
  per method, or 12.4 seconds per control.

The expression is an approximate scheduled-wait floor, not a worst-case
wall-time guarantee. A focus-only pointer trial does not activate, while
selected-peer preparation adds work. Navigation, network idle, scene
readiness, all screenshots, source/build hashing, real Tab navigation,
DOM observations and slow settlement add time. Screenshot calls alone
have a 90-second failure timeout. Controls are inventoried rather than
artificially capped, so no finite bound guarantees completion of arbitrary
authored output.

At 22 beats and 22 controls this scheduled work is about 695.8 seconds.
At 22 beats and 33 controls, extending the manual prototype's C = B + 11
relationship only as an illustrative scenario, it is about 832.2 seconds.
Thus 480 seconds conflicts with ordinary upper-range scope even before
browser overhead; 900 seconds is also a weak upper-range budget.

The first manual calibration, five beats and 16 controls, completed in
about 442 seconds with 102 originals. Its older fixed waits account for
about 272 seconds, leaving about 170 seconds of combined browser, image,
DOM, navigation and other overhead. A 22-beat, 33-control mode would emit
about 323 originals under the same structure. Scaling that observed
overhead by original count gives a rough total near 1370 seconds with the
new waits. This is a planning estimate, not an established performance
model or a guarantee about another page or machine.

Prospective recommendation, before any paid case freeze: 1500 seconds
total for each desktop, phone and short-height mode, with 1495 seconds
work and 5 seconds grace; 900 seconds total for each reduced-motion,
no-WebGL, no-JavaScript and context-loss mode, with 895 seconds work and
5 seconds grace. The latter modes do not record travel. Reduced motion
still includes beat waits and still pairs; context loss adds a reapplication
wait for every control reset. With the unchanged 5-minute build and
5-minute auxiliary units, this is a finite 145-minute final-unit envelope,
not paid time or a promise that every allowed source will finish.

This recommendation is not approved policy here. Any adoption needs an
explicit prospective record, matching implementation/tests and a new
freeze. Timeout remains incomplete, no beat/control may be omitted, and
no automatic retry is allowed. Larger caps do not identify or fix the
unknown interruption source. A split capture could bound individual
processes more tightly, but would require a new phase/aggregate contract;
it is not silently substituted for the declared seven-mode design.

## Keyboard baseline remains a concern, not a diagnosed site failure

Root reported viewing the new Back-to-question keyboard-before original:
its target appeared outside the viewport, although pointer-before showed
the lower source notes and target. Keyboard-after reportedly returned to
the opening. This reviewer did not independently view those originals.
Because the mode report was not saved, the before target's exact geometry,
focus, hit-test and settlement records are unavailable. The concern cannot
be promoted to a confirmed runtime geometry finding or a prototype defect.

Source confirms that the helper's artificial traversal reset calls
`document.body.focus()` without `preventScroll`, then sends sequential
Tab events rapidly. Actual prototype CSS requests smooth document scroll.
The final-Tab settlement observes where movement ends; it cannot establish
that the earlier body-focus scroll did not interfere with native traversal.

The smallest prospective correction is to use
`document.body.focus({ preventScroll: true })` only for that artificial
reset, keeping all actual sequential Tab events, their native scroll,
target focus/visibility/hit tests and final settlement. This does not
directly focus the target, force a destination or modify prototype CSS.
It is a candidate measurement repair, not proof of the cause or efficacy.
Any subsequent evidence must still fail an offscreen/unreachable target.

Waiting at least 400 ms after every Tab would add approximately
`0.4 * sum(tabPresses)` seconds before slower movements are considered.
That broader change needs separate evidence and a budget review; it is
not recommended merely to make the current images pass. No such change
or extra capture is implemented or authorized by this document.
