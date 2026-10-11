# A deeper story for the fixture prototype

11 October 2026. The author's [clarification](../../history/2026-10-11-prototype-depth-feedback.md)
concerns story depth, not a request for a larger or more decorated object.
This revises the [first prototype](2026-10-11-fixture-prototype.md), whose
source and evidence remain preserved at commit `71ae3ea` and in its study.

## Narrative question

How does scheduling a physical device's work lead to something that can be
checked on the bench, and what can that evidence actually support?

Keep one continuous apparatus and five connected beats:

1. `opening.assembly`: introduce Ada's firmware, scheduling and fixture
   contribution and the question connecting code to the bench.
2. `power.cycle`: explain scheduling with a clearly labeled teaching loop,
   Sleep, Measure, Transmit. Connect the schedule to the battery estimate's
   assumed reporting interval without inventing timings or firmware logic.
3. `middle.relationship`: expose the command, board, fixture and observation
   relationship. Inspection supplies role, contribution and working-document
   context, not just a repeated module label.
4. `proof.boundaries`: keep two separate evidence paths. Measured sleep and
   transmit currents plus an assumed reporting interval support a two-year
   projection. A continuous bench run supports 72 hours observed. Never
   draw an extrapolation arrow from 72 hours to two years.
5. `close.evidence`: resolve the contribution and show the extent of the
   evidence: forty assembled, six bench-tested, no customer units, one
   preliminary emissions check passed and qualification unfinished.

The added scenes foreground command/board and observation respectively.
All four parts stay recognizable, and printing remains fixed during travel.
The middle's arrows retain positive-clearance checks. No new geometry,
external models, photos, decorative waveform or fabricated measurements
are needed. Added story detail should not crowd the phone's scene band.

## Source distinctions

The [corrected facts](../../../evals/builds/embedded-1/workspace/docs/story/facts.md)
govern ownership, counts, projection, duration and qualification. The
[fictional notes](../../../evals/people/embedded/material/lab-notes.md)
specifically name measured sleep and transmit current, an assumed reporting
interval, and state tables, timing diagrams and bench checklists. They do
not supply those original working documents or their numeric contents.
The [permitted state drawing](../../../evals/builds/embedded-1/workspace/public/assets/power-states.svg)
is teaching material, not Mosslink's recovered firmware state machine.

The radio-awake incident remains omitted under the existing confirmed
scope. The copy must not manufacture a debugging success, exact current,
reporting interval, battery capacity, forty-unit verification, deployment
or certification. Six is a subset of forty; the other thirty-four are not
described as failures. Sample counts are not outcomes on an invented timeline.

## Verification and handoff

Keep the original prototype study immutable. The new manual development
record is `evals/runs/visual-recovery-depth-1/`. Bind five-beat captures to
source hashes; exercise all four travel intervals in both directions, all
inspection controls, phone, short viewport, reduced motion and the three
fallback modes. Review actual original images and factual copy separately
from functional assertions. Run local checks before committing on main.

This remains a prototype revision for author review. It is not a new paid
actor/judge cohort, a skill instruction experiment, a full-site acceptance,
a real-phone performance claim, or authorization to push.
