# Baseline 2 fallback and reduced-motion original review

12 October 2026. Reviewer: `acceptance`. Independent visual review, separate
from the text judge, the technical verdict and author approval.

The saved fallback explanations and two supplied diagrams are readable.
Reduced-motion images are stationary at each beat. The reduced-motion scene
retains the same explanatory and small-label limitations identified in the
[animated review](animated-visual-review.md), so technical success is not an
overall visual pass.

## Exact coverage and integrity

Every assigned generated original was individually opened using
`view_image` at original resolution, including repeated images with matching
hashes. No contact sheet substitution or deduplication was used.

| Mode | Viewport | Originals viewed |
|---|---|---:|
| Reduced motion | 1440 by 900 | 48 |
| No WebGL | 1440 by 900 | 13 |
| No JavaScript | 390 by 844 | 13 |
| Running context loss | 1440 by 900 | 13 |
| Total assigned | | 87 |

The [exact inventory](fallback-review/viewed-images.json) contains every
path, byte count and SHA-256. Reduced motion includes five rests, ten
numbered mid/end images, ten stationary before/after images and 23 control
images. Each of the other three modes includes five rests, five numbered
mid images and three skip-control images.

The [combined read-only verifier](verify-acceptance.mjs) and its
[retained result](verification.json) establish exact coverage of all
253 generated originals across both reviewers: desktop 62, mobile 42,
short 62, reduced motion 48 and 13 in each other mode. They also verify
all 282 acceptance artifact hashes, frozen input and checker hashes, all
seven replayed frozen assessments and every retained actor snapshot file.
No missing, additional or duplicate reviewed image paths are accepted.

Source before, after and current runtime capture is the same full
260-file set as the retained actor snapshot, digest
`0fb5e82558d01bda9cf828bb073087138333219b0019d64566747cc08d6ff025`.
Unlike the earlier baseline's metadata-scope mismatch, strict whole-set
identity succeeds for this cohort. The finished manifest SHA-256 is
`c8076eca259639a450f2cd6c01645f8a1b048b2ebeeecc407eea003981ac0d94`.

## Observed outcomes

### Reduced motion

All five large HTML explanations are readable. The opening identifies
Ada's firmware, power scheduling and fixture contribution; scheduling is
explicitly an illustrative loop with no actual durations or current values;
the bench copy separates her work from the colleague's PCB and analogue
front end; evidence distinguishes the projected two years from the
observed 72-hour run; the ending preserves sample, customer and incomplete
qualification limits. No original measurements or field deployment are
invented in this visible copy.

The apparatus remains recognizable. In
[the bench rest](../acceptance/reduced-motion/rest-bench.png), separating
the board from the gold contacts makes physical access visible. But the
firmware-command, board-response and observation relationship is mainly
explained by the HTML, while the display says BENCH and OBSERVATION. This
supports the animated review's specific explanatory limitation, not a
claim that all the geometry is decorative.

In [the evidence rest](../acceptance/reduced-motion/rest-evidence.png),
CURRENT and INTERVAL sit above 2 YEARS, separately from BENCH RUN and
72 h. This spatial grouping earns credit for distinguishing the two
support paths. The smaller qualifiers on faces remain difficult to read
even at this desktop size; the readable HTML carries the full distinction.
The other rests and all numbered mid/end originals preserve the relevant
text and apparatus.

Every stationary before/after pair is visually identical and has equal
saved hashes, for question, scheduling, bench, evidence and scope. Reported
sample intervals range from 817 to 1516 ms. This proves stability over the
captured intervals, not an unlimited absence of animation.

All five ordinary rail links visibly reach the corresponding explanation
with both pointer and keyboard. Focused-before originals show a visible
focus outline. The skip link is hidden unfocused, visible after actual Tab
focus, and reaches the ending after keyboard activation:
[focused before](../acceptance/reduced-motion/control-57ef510c22f051aa-keyboard-before.png)
and [after](../acceptance/reduced-motion/control-57ef510c22f051aa-keyboard-after.png).
Its predeclared unfocused pointer trial is not applicable, not a pointer
pass. Ordinary controls receive no such exemption.

### No WebGL, no JavaScript and running context loss

All three modes retain five readable explanations in normal document flow,
with no canvas. Their scheduling diagram shows Sleep, Measure and Transmit
with a returning loop. Their bench diagram shows firmware command,
generic board, bring-up fixture and bench observation, and states that it
is an explanatory schematic, not a photograph or circuit diagram.
Both diagrams remain readable in the narrow no-JavaScript capture.

Representative originals:
[no-WebGL scheduling](../acceptance/no-webgl/rest-scheduling.png),
[no-WebGL bench](../acceptance/no-webgl/rest-bench.png),
[no-JavaScript scheduling](../acceptance/no-javascript/rest-scheduling.png),
[no-JavaScript bench](../acceptance/no-javascript/rest-bench.png),
[context-loss evidence](../acceptance/context-loss/rest-evidence.png) and
[context-loss ending](../acceptance/context-loss/rest-scope.png).

The evidence and scope caveats remain intact. The fallback explanatory
copy still refers to the towers and left/right scene arrangement that are
not present in these modes, but the surrounding prose and supplied
diagrams preserve the substantive relationships. There is generous empty
desktop space and a tight opening eyebrow below the site header, without
preventing reading of the required heading or explanation. These are
secondary polish observations, not invented acceptance thresholds.

The skip link is the only inventoried interactive control in each of
these three static modes. It is visibly focused, and the after images
show the complete ending reached, including on the narrow no-JavaScript
viewport. Unfocused pointer trials remain not applicable. Removed
animated navigation is not being counted as passing controls.

The actual running-context-loss probe reports `supported: true`.
Every post-loss rest has `afterContextLoss: true` and `scene: off`;
the saved originals show the readable fallback, not a dead canvas.
This is an observed context-loss case, not merely a no-WebGL startup test.

## Scoped criterion matrix

| Original criterion | Result in this assigned review |
|---|---|
| Backdrop | Fail for the full reduced-motion bench relationship, with genuine fixture-access and separate evidence-grouping successes. Static fallback diagrams explain their stated relationships. |
| Depth | Pass in these captures. Five developed explanations preserve contribution, mechanism, evidence and limits. |
| Swap | Pass in reduced motion. Board, contacts, fixture and bench screen are specific to the work. |
| Detail and hierarchy | Fail for small reduced-motion face qualifiers. Large HTML and both fallback diagrams remain readable. Animated travel collisions are outside this subreview and covered separately. |
| Spatial quality | Reduced-motion relationships retain the bench gap and useful evidence grouping. Continuous animated movement is unobserved here. |
| Phone and still modes | Pass for these assigned still/failure conditions, including narrow no-JavaScript. This does not override the separate animated-phone detail failure. |

## Process and limits

The only independent acceptance attempt used the frozen checker and
expectations on the settled actor workspace, with the trusted dependency
root outside it and exact frozen native Node/browser environment.
`typegen`, typecheck, lint and production build succeeded, followed by
all seven browser modes. The process completed with exit 0, no signal and
empty stderr after 704682 ms. Raw command, full launch/poll returns,
stdout, stderr and source comparisons are retained beside this document;
the terminal return is [tool-poll-07.json](tool-poll-07.json), and the
process record is [process.json](process.json).

No actor source, frozen checker, expected criterion, generated original
or hashed acceptance file was edited. This review made no model calls.
It assesses only the saved viewport and time samples, not every frame,
every device, physical-phone performance, a real user's comprehension
or author approval. Entry-point dependency hashes are not a complete
dependency audit; that independent audit remains separate.
