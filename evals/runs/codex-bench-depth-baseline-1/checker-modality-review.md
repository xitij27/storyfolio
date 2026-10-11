# Review of the diagnostic control-modality failure

11 October 2026. Source review and prospective measurement proposal only.
No checker, expectation, actor source or frozen artifact was changed for
this review. No model call or browser process was launched. The first
coordinator capture was interrupted; its partial originals remain intact.
At this checkpoint the second capture has completed desktop, while the
remaining browser conditions are still running. Their eventual outcome
must be reported separately rather than inferred here.

## Observed desktop result

The frozen checker records a desktop failure in
[the second attempt's report](bench-depth-1/baseline-1/acceptance-2/desktop/report.json),
SHA-256 `57b4b186940145c51f9a91d26cdb9476a29c484ca67e4f5ea49046b2163883f1`.
Its four problem entries all concern pointer access to
`control-00d3d66c5d7ef7ac`, the "Skip to the answer" link to
`#chapter-scope`. Hover times out after 30 seconds because the element
remains outside the viewport. The missing activation, images and response
are consequences of that same failed hover, not three additional UI defects.

The keyboard trial for that same identity reaches it by sequential Tab,
records a hit-testable focused link, activates it and observes the existing
`chapter-scope` target responding. Original before/after image hashes are
`1264fd5e24c068ab7f980630f386beba4125779408a7f153526cc1ec7ae32b76`
and `dcb3771fb7a863fe3aae530096e34a224fea8169a8ec8f8c01620f5be2321c7e`.
The five chapter links and return link each have successful pointer and
keyboard trials. All five rests and all eight forward/reverse intervals
are present, each interval with three motion frames. The report contains
no page errors and no other assessment problem.

This does not silently convert the desktop result to a pass. The original
frozen measurement fails under its declared universal-pointer rule. The
source evidence below supports attributing that failure to the measurement
contract for a deliberately focus-only skip link. Visual acceptance and
the other browser conditions remain separate.

## Source evidence and identity

The following paths and hashes identify the reviewed bytes:

| Evidence | SHA-256 |
|---|---|
| `inputs/implementation/evals/lib/build-capture.mjs` | `de4e45bea11440c5cd8cb305c869495d82f17bbbe129f6b3274b3339caf2ed00` |
| `inputs/implementation/evals/lib/build-check.mjs` | `0fdbd6c6ed16899b238b08d7fe837648eabcfb9f374163d5d840284efc33bbd2` |
| `inputs/implementation/evals/check-build.mjs` | `cc39d4fd23f6cbeadc60470e99041ff19067942eafff7af25afcf7fa8512805f` |
| `inputs/expectations.json` | `5d0750ccd9c017bd09b1c019e019ed2da8a48f50fe17d0d791a64cf3d8cbdddd` |
| `bench-depth-1/baseline-1/turns/01/snapshot/files/app/page.tsx` | `04359cb56f2385738ab5a5f444cfa7327f71b225a551b8ff60e769dc10453439` |
| `inputs/skill/engine/components/story/story.css` and the corresponding actor snapshot file | `6757ae89fb89b2cdd57b0b1aa18031fb7f3f4d97858d71ae6e3545971b0e9a23` |

The shipped engine CSS has that same hash. Its lines 1 to 2 deliberately
place `.story-skip` at fixed `top: .75rem` with `translateY(-200%)`, then
reveal it using `.story-skip:focus-visible { transform: translateY(0) }`.
Actor `app/page.tsx` line 6 retains the inherited skip pattern and points
it to the ending. This behavior did not originate as an actor regression.

In the frozen `build-capture.mjs`:

- Lines 134 to 141 inventory controls using `checkVisibility` without
  recording viewport bounds or pointer hit testing. The translated skip
  link is included as visible even while above the viewport.
- Lines 146 to 180 require both methods and call pointer hover before
  obtaining the before-state or control screenshot. Scrolling cannot reveal
  a fixed element whose transform keeps it above the viewport.
- Lines 46 to 59 require a successful pointer and keyboard trial for every
  control. There is no modality-applicability distinction.

The pre-existing general link checks already represent intentional
keyboard-only links: frozen `build-check.mjs` lines 155 to 157 use
coordinator-owned `expected.links[].keyboardOnly` and require actual
focused, visible, in-view, hit-testable observations. The older embedded
fixture uses that declaration for its skip link. The diagnostic deliberately
has an empty `expected.links` list and discovers its own controls, but its
new inventory lost that modality distinction. This is a measurement gap,
not a reason to discard automatic inventory.

## Smallest proposed repair, not implemented

Retain the complete unique inventory and both method records. Add an
explicit applicability declaration supplied by the coordinator for a
reviewed skip/bypass link. Match a stable identity and destination, and
record why it is intentionally available only after keyboard focus. Do not
trust an actor-added `keyboardOnly` attribute, a class name, offscreen bounds
or a timeout as sufficient authority to waive pointer requirements.

For that declared control, require original observations of its unfocused
geometry, real sequential Tab reachability, focused visibility and hit
testing, screenshots, Enter activation and the actual existing target
response. Record its unfocused pointer route as **not applicable with
evidence**, never as a successful pointer trial or a silently omitted
control. All undeclared buttons and ordinary navigation links continue
to require successful pointer and keyboard checks. Missing evidence remains
a failure or an explicit unobserved result; it cannot supply an exemption.

A coordinator declaration would change future expectations. Freeze it
with the revised checker under a newly labelled measurement baseline.
Do not edit this cohort's frozen expectations, relabel the preserved failure
as a pass, or claim a skill improvement from a changed measurement contract.
A separately labelled remeasurement of unchanged saved actor source could
establish the corrected checker result, but would not be a matched skill
rerun or a replacement for this original report. No such remeasurement or
paid follow-up is performed by this proposal.

## Prospective regression cases

1. A declared focus-only skip remains in the full inventory, appears on
   actual Tab focus and activates the declared existing fragment target.
2. An undeclared offscreen ordinary button or navigation link still fails
   pointer reachability even if keyboard activation works.
3. A declared skip that remains hidden or occluded after focus fails.
4. A declared skip with `tabindex="-1"`, disabled state or blocked sequential
   navigation fails rather than receiving a modality exemption.
5. A missing or incorrect fragment target fails even if the URL changes.
6. A normally visible control covered by another element still fails its
   pointer hit test.
7. Forged applicability metadata, a mismatched declaration or a copied
   `.story-skip` class without coordinator authority cannot bypass checks.
8. Missing or duplicate control/trial records still fail inventory and
   method completeness.
9. Keyboard success without original screenshots, focused geometry or
   target-response evidence cannot justify the exception.
10. Desktop, phone, short, reduced-motion, no-WebGL, no-JavaScript and
    context-loss conditions preserve the same applicable evidence rules.

The correction should first be exercised against small positive and
negative browser fixtures. Source reading alone establishes the identified
contract conflict, not the correctness of an unimplemented replacement.
