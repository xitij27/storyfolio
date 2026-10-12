# Candidate 3 primary-concept originals, available batches 01 and 02

All 30 emitted PNG originals were individually opened with `view_image` at
`detail: original`, including duplicate pixel identities at distinct paths.
The [exact inventory](concept-image-review-01-02.json) records repository-relative
path, SHA-256, bytes, method and per-image notes. Independent `sha256sum` and
`stat` reads matched every saved report image record. Its `complete: true`
means coverage of those 30 available images only, not the nine-batch plan.
Batch 01 has 16 images. Batch 02 has 14, including both phone before images
but neither phone after image. Batches 03 through 09 never ran in this attempt.
No browser, test, model, retry, source edit or process cleanup was performed
for this review.

## Failed phone chooser observation

The failed [phone enclosure report](concepts-1/batches/02/artifacts/02-phone/report.json)
does not show an offscreen or disabled link. In both before images, the
enclosure choice is visible around the middle of the screen. Its arrow wraps
onto a second line. The
[keyboard-before original](concepts-1/batches/02/artifacts/02-phone/keyboard-before.png)
has a visible focus outline following both inline fragments. The saved
geometry is `x:52.796875, y:482.875, width:302.4375, height:63`, with
`inView:true`, `visible:true`, `disabled:false`, and `focused:true` for
keyboard. Only `hitTarget:false` causes the generic hidden/covered/out-of-view/
disabled assertion. Both formal trials record `activated:false`, so their
separately required before/after chooser responses are unobserved. The same
report's earlier `initialActivation` records an actual locator click from
`/` to `/sketch/enclosure` succeeding on phone. That is positive response
evidence, but it does not supply the missing formal pointer/keyboard trials.

A union-rectangle midpoint falling between wrapped inline fragments is a
plausible measurement explanation, not established by these screenshots
alone. The images do not prove the link is user-inaccessible, and the earlier
successful click does not replace the unattempted formal click/Enter
responses. Preserve the failed measurement and missing responses. Do not
convert it into either an actor accessibility failure or a passing gate
without separately authorized, source-grounded diagnosis.

## Available visual evidence

Fixture: desktop and phone show all three rests, readable body text and
qualifications, joined contact modules at opening/ending and six separated
modules in the middle. The index describes all three options and recommends
fixture. Both pointer and keyboard before/after pairs show actual navigation
from that index to the correct fixture. Keyboard focus is visible. No
material text clipping or text/object collision appears in these captures.
The phone index footer continues below the viewport; that alone is normal
document continuation, not proof of inaccessible text.

Enclosure: desktop and phone rests show a thick six-section
cylinder opening into a ring and rejoining, visually distinct from fixture.
The projection, unresolved incident and evidence-limit copy remains readable.
Desktop pointer and keyboard pairs reach the intended enclosure page with
visible prior focus. The initial phone chooser click succeeded; the formal
phone pointer/keyboard before/after responses remain unobserved as above.

Both objects have visible volume and distinct middle formations rather
than flat sheet collections. Their explanation is nevertheless limited:
fixture surface words are blurred and effectively unreadable on phone;
enclosure ring labels are generic CODE/STATE/BOARD/ACCESS/SIGNAL/CLAIM, not
the Sleep/Measure/Transmit sequence named in the caption. Separation and
reassembly alone do not clearly diagram the specific firmware/observation
or state relationships. Much of the meaning remains in readable HTML.
These are provisional sketches, not final passes for Backdrop, Depth, Swap,
Detail/hierarchy or Spatial. Phone text/composition is observed for these
two concepts only; reduced motion and failure-mode/still comprehension are
not covered here. Probe and all six appearance-switch batches are unobserved.

## Binding and disposition

These images belong to the genuine candidate-3 turn-2 source digest
`7104be428d5e26c867e8dbcc3f650a467931135346a54209ec8f3e137a45ceb9`
and actor result hash
`290c39f7aca8ae6e8254e78a6423292f4bf34af233ca2c94f34d09189615fbfe`.
Root reported unchanged source and normal process closure for both batches;
batch 02 exited 1 with the retained technical failure. This review does not
substitute for the overall integrity audit. The complete required concept
gate is not established, and no turn-3, final-site or actual author/physical-
phone approval follows from this image inventory.
