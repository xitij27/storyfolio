# Fixture study handover

11 October 2026. This directory is the authorized manual three-beat visual
recovery prototype. After the assistant identified that as the next task,
the author said: "yes lets proceed with it". The
[authorization record](../../../../docs/history/2026-10-11-visual-prototype-approval.md)
and [root specification](../../../../docs/superpowers/specs/2026-10-11-fixture-prototype.md)
govern the work. The [root handover](../../../../docs/handover.md) tracks
the wider skill project and the prior rejected build.

## Scope and design decisions

The same illustrative bring-up assembly appears in all three beats. It has
four persistent parts: a firmware command console, generic board, fixture
cradle and bench observation instrument. The opening assembles them, the
middle separates them to explain command → board → fixture → observation,
and the close brings them together with the observation instrument prominent.

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
decisions to observable behavior. "Make the response observable" develops
the supported fixture relationship. "A connection. Not a leap." resolves it
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
The board's close label is "A response to inspect."

## Setup, evidence and next gate

See the [README](../../README.md) for normal `npm ci` setup with Node 22.18
or later and the local port 3012 preview. This session's ignored dependency
symlink is a local reuse convenience, not a distributable dependency.

TypeScript and targeted ESLint passed during object implementation and
after the local controls-provider correction. Integrated captures, source
hashes, browser conditions and review belong under
[visual-recovery-prototype-1](../../../../evals/runs/visual-recovery-prototype-1/).
Use those results for the final verification status; implementation checks
alone do not establish visual acceptance.

The study needs the author's actual visual assessment before expansion.
No new paid model evaluation was launched, no general skill improvement is
claimed, and this three-beat study does not complete Stage 3. The rejected
six-row build and its frozen evaluation outputs remain unchanged.
