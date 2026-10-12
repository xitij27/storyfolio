# Independent review of the proposed storyboard-length addition

Disposition: **no concrete blocker; the sole proposed paragraph is
supported and appropriately narrow.** This is a source-only review, not
evidence that the correction has improved behavior.

Reviewed proposal:

> A full story normally has twelve to twenty-two meaningful beats. Add up their screen heights, state the total, and trim repetition. Do not pad the story or invent facts to reach the range. If the confirmed material needs a shorter story, put that scope change to the person instead of silently approving an exception.

The saved [candidate-2 turn-3 assessment](../stage-3-completion-2/full-journey-recovery/candidate-2/turn-3-semantic-review.md)
binds the actual miss: eight meaningful beats totaling nine screens, no
stated total, and no question about a shorter scope. The actor read the
storyboard reference in completed `item_1`, then presented this short plan
for approval in terminal `item_6`. Other planning requirements largely
passed; this finding does not justify rewriting them.

The [approved design](../../../docs/superpowers/specs/2026-10-10-portfolio-skill-design.md)
lines 318 to 322 already gives twelve to twenty-two beats and requires
adding, stating and trimming the screen total. The pre-change
[storyboard reference](../codex-full-journey-candidate-2/inputs/skill/references/storyboard.md),
preserved in candidate 2's frozen inputs, contains the per-beat screen
minimum but omits that whole-story requirement.
The proposal restores these two demonstrated omissions without introducing
new chapter counts, object counts, screen-height ceilings or content quotas.

The [concept reference](../../../skills/storyfolio/references/concept.md)
line 31, consistent with design lines 233 to 236, allows a shorter story
when a person has little to show and rejects padding. The proposal preserves
that intent: “normally” is not a universal hard minimum, and a supported
shorter story remains possible through an explicit scope decision. Its
last sentence adds that disclosure at the existing approval stop, not a
new compulsory workflow stage. In this matched fixture no shorter exception
is pre-approved; asking about one would leave that gate unresolved, not
automatically pass it or authorize changing the fixed next prompt.

“Full story” also keeps the normal range distinct from the three-beat
concept sketches and opening/middle/ending look previews. “Meaningful,”
trimming repetition and the no-invention sentence prevent treating a
numeric count as a substitute for supported story depth. The paragraph
does not require unavailable biography or a fabricated resolution merely
to reach twelve.

Recommended scope is exactly this addition in the storyboard reference.
Preserve the existing chapter guidance, factual rules and approval process;
leave the old failure and all frozen inputs unchanged. A fresh matched
journey is still required to observe the effect. No improvement, planning
regression pass, gate passage or Stage 3 completion is inferred here.

Read identities from the saved assessment: actor storyboard SHA-256
`c053e0448a248134dc32c936f81e31cdacb9eee46a62799cd5b71bb6f95db782`;
pre-change frozen/shipped reference SHA-256
`e3d7cdf941359b01863c8196a793ede1c1bb70522a934fbe9c4f5f3dd20c97d6`.
This reviewer read the reference, design, sparse-profile guidance and
retained failure assessment. Only this review was added. No skill edit,
runtime, test, browser or model invocation was performed.

## Applied-byte checkpoint

Root subsequently applied this sole paragraph to the shipped storyboard
reference, after the beat definition and before its table:

> A full story normally has twelve to twenty-two meaningful beats. Add up their screen heights, state the total, and trim repetition. Do not pad or invent facts to reach the range. If the confirmed material calls for a shorter story, propose that exception explicitly for the person's approval.

I reread the actual diff. Removing “the story” after “pad” does not change
scope; “calls for” retains the confirmed-material basis, and explicitly
proposing the exception for approval states the person's authority more
directly. The final wording preserves the initial review's reasoning and
limits. No concrete blocker was found. The diff contains only this
paragraph and its separating blank line; the original proposal above
remains a historical record, not a claim of exact applied text.

Applied reference SHA-256:
`6aff31e6dfe227957a28c8f92fbca15b5dcbf772a0e607482c6a6996be21cfc8`.
Only this review was updated by this reviewer. No skill edit, runtime,
test, browser or model invocation was performed for this checkpoint.
