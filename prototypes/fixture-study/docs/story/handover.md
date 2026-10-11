# Fixture study handover

11 October 2026. This directory is the authorized manual visual
recovery prototype. After the assistant identified that as the next task,
the author said: "yes lets proceed with it". The
[authorization record](../../../../docs/history/2026-10-11-visual-prototype-approval.md)
and [root specification](../../../../docs/superpowers/specs/2026-10-11-fixture-prototype.md)
govern the initial work. The author subsequently said the prototype looks
better but clarified, "The story needs more depth". The
[feedback record](../../../../docs/history/2026-10-11-prototype-depth-feedback.md)
and [five-beat revision](../../../../docs/superpowers/specs/2026-10-11-fixture-story-depth.md)
now govern the narrative. This is qualified feedback, not full acceptance
or confirmation of a physical-phone review. The [root handover](../../../../docs/handover.md) tracks
the wider skill project and the prior rejected build.

## Scope and design decisions

The same illustrative bring-up assembly appears in all five beats. It has
four persistent parts: a firmware command console, generic board, fixture
cradle and bench observation instrument. The opening assembles them, the
middle separates them to explain command → board → fixture → observation,
and the close brings them together with the observation instrument prominent.
Between them, the new scheduling beat foregrounds command and board; a
separate evidence beat foregrounds observation and explains the distinct
projection and measured-run paths. The physical geometry and four surface
paintings remain unchanged. Beat IDs for faces and arrows derive from the
story so the existing connected middle keeps its correct index.

Warm ivory and sage equipment, graphite recesses, bevels, clamps, screws,
encoder grips and brass contacts give each part physical identity. These
features are authored explanatory forms, not a reconstruction of Mosslink.
Connections explain a relationship, not electrical wiring. The
[object design record](../../content/object-design.md) contains geometry,
surface and integration details.

The HTML inspection buttons change the shared `inspect` control, supply a
role explanation and highlight the corresponding physical part. The local
Story controls provider wraps both HTML and scene so React Three Fiber can
carry that store into the custom Piece. This adaptation exists only in the
prototype. No shipped engine or skill files were changed.

## Copy and factual limits

"Between code and the bench" introduces a question about connecting firmware
decisions to observable behavior. "Low power is a schedule" explains the
scheduling role. "From a command to a check" develops the fixture relationship.
"Two numbers. Different evidence" explains the projection inputs separately
from the continuous run. "A connection. Not a leap." resolves the story
through Ada's contribution while keeping the limits visible. These are
coordinator-authored prototype choices, not wording approved by the author
or a new agent evaluation.

The [frozen facts](../../../../evals/builds/embedded-1/workspace/docs/story/facts.md)
support Ada's firmware, power-state scheduling and fixture work. PCB and
analogue-front-end design belong to a colleague. The
[permitted source drawing](../../../../evals/builds/embedded-1/workspace/public/assets/bring-up-fixture.svg)
supports the explanatory relationship without supplying actual circuitry.

The longest run was 72 hours. The two-year battery claim is a projection
using bench current readings and an assumed reporting cycle. They occupy
separate labeled regions on the final observation display and in HTML.
Forty engineering samples were assembled, six were bench tested and none
went to customers. One preliminary emissions check passed; full
qualification is unfinished. The design invents no trace, current value,
topology, production outcome or successful fix for the radio-awake incident.
The board's close label is "A response to inspect." The teaching cycle is
not the actual firmware, and the new evidence figures are not original
records. No public incident account is supplied, so the radio-awake note
remains omitted. A short literal lab-note excerpt appears in the footer.

## Setup, evidence and next gate

See the [README](../../README.md) for normal `npm ci` setup with Node 22.18
or later and the local port 3012 preview. This session's ignored dependency
symlink is a local reuse convenience, not a distributable dependency.

TypeScript and targeted ESLint passed during object implementation and
after the local controls-provider correction. Integrated captures, source
hashes, browser conditions and review belong under
[visual-recovery-depth-1](../../../../evals/runs/visual-recovery-depth-1/).
The first prototype's unchanged evidence remains under
[visual-recovery-prototype-1](../../../../evals/runs/visual-recovery-prototype-1/),
and its original source is preserved in commit `71ae3ea`.
Use those results for the final verification status; implementation checks
alone do not establish visual acceptance.

The study needs the author's actual visual assessment before expansion.
No new paid model evaluation was launched, no general skill improvement is
claimed, and this five-beat study does not complete Stage 3. The rejected
six-row build and its frozen evaluation outputs remain unchanged.
