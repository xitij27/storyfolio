# Completion judge preparation, 11 October 2026

The current judge can assess a fresh stops-5-and-6 continuation without
mistaking conversation turn numbers for workflow stops. The frozen case's
`requestedStops` identifies attempted stops; `refusalTurns` identifies fixed
refusal prompts actually sent. A failed attempt can supply failure evidence,
and a completed model turn does not establish a successful stop or gate.

For the completion case, chapter and copy criteria become eligible during
its first turn, and finishing criteria during its second. Earlier spine,
look-choice and original build-start preflight criteria remain unobserved.
Because the first prompt refuses optional installation, there is no observed
pre-refusal branch. The after-refusal criterion can be assessed from actual
evidence. Continuing after a recommendation still requires an observed
recommendation, subsequent refusal and continued work; metadata alone does
not establish that opportunity.

The packet retains the full supplied fixture text, including unchanged
existing-site seed source, alongside changes made during the actor turns.
It labels inherited source separately so the judge does not credit supplied
work as new actor implementation. Other unchanged engine bodies outside the
fixture remain represented by hashes. The two-MiB prompt bound still rejects
oversized packets without truncation or a model call.

The rubric is version 2. Original cases without explicit metadata retain
the stops-4-through-6 and turn-2/turn-3 refusal defaults. Stored requested-stop
values must agree with the frozen case. The completed first cohort's frozen
version-1 rubric, implementation, inputs and raw judgments were not edited.

Validation: all 15 judge tests pass using Node 22.22.1 outside the outer
tool sandbox. The [saved TAP output](judge-tests.tap) includes the existing
12 cases and three new tests for continuation eligibility, a two-turn
existing-site packet with a failed finishing attempt and a mocked judge,
and refusal to infer a finish from a completed first turn or accept a
changed requested-stop record. The continuation integration verifies that
unchanged inherited source reaches the packet and remains separate from
actor changes. Existing source-integrity, retry-refusal and process-deadline
checks still pass. No actor or judge model call was made by these tests.

This preparation validates the harness path, not the completion of the
fictional site. Real browser and full-site outcomes await the authorized
continuation and independent checks.
