# Start finishing Stage 3

12 October 2026. After the stage-level status clarification, the author said:

> alright then let us proceed with making this skill complete. Let us start with finishing stage 3 first

This authorizes implementation toward Stage 3 completion, not another
status-only review. The governing evidence rule, matched reruns, actual
visual/phone approval and separate publication permission remain in force.
The assistant is using the skill-creator guidance to keep candidate
instructions specific to observed failures, with the repository's stricter
evidence rules taking precedence.

## Work begun

The [completion work record](../superpowers/plans/2026-10-12-stage-3-completion.md)
keeps the product milestone explicit: a supported complete build workflow,
not just repaired evaluation tools. The first local changes implement the
already observed skip-link measurement and source-inventory corrections.
Old frozen actor/checker inputs, reports and failed results remain intact.

The [candidate evidence audit](../../evals/runs/stage-3-integration-1/evidence-audit.md)
supports two narrow visual-review paragraphs. Neither is in the shipped
skill. The ordinary build endpoint remains untested because earlier runs
explicitly overrode the planning-only boundary. The existing design's look
requirement is **two or three looks**, not obligatorily three; earlier
summaries that say three must not create a new requirement. Three complete
wording versions and three concept sketches are separate requirements.

A new [comparison fixture](../../evals/builds/bench-depth-2/README.md) retains
the approved facts, story and assets while supplying neutral screenshot
tooling, enabled-skill facts and explicit skip navigation. This is a new
baseline boundary, not a retroactive clean-room claim about the previous
actor. It still does not enforce filesystem read isolation.

## Separate paid-comparison question

The assistant asked during implementation:

> Your rules require paid agent runs before and after a skill change. May I run one fresh five-beat baseline and one matched improvement test, each with at most one judge? Limits: 15 minutes per build, 10 minutes per judge, no retries. These are time limits, not a hard token-cost cap.

At this record's creation the question is unanswered. No paid run is
authorized by the new fixture or by interpreting full local access as
spending approval. Continue safe local work while awaiting the answer.
The exact case and stopping conditions are in its
[protocol](../../evals/builds/bench-depth-2/protocol.md). Even if approved,
this envelope does not include natural-entry, full-journey or planning
regression conversations. Their questions and limits remain separate.

The filesystem check found only 38 MB available in `/tmp`, while `/var/tmp`
is on the main filesystem with ample free space. New runtime scratch work
must use a task-specific `/var/tmp` directory; all durable decisions, source
and evidence remain in this repository. Nothing was deleted to make space.

## Verified local checkpoint

The [development findings](../../evals/runs/stage-3-integration-1/findings.md)
record the implemented measurement repairs, new fixture, independent review,
actual helper browser smoke and all 342 passing repository tests. The
control study's seven valid conditions pass and all 15 faulty variants
fail, with 112 original images reviewed. Source inventories agree on 201
unchanged files prospectively while preserving the historical mismatch.

The real helper test first found a CommonJS loading defect, preserved its
failure, then passed separately after correction and a new regression.
All 51 input images remain unchanged; five resulting sheets were inspected.
The runner's dry preparation validates 124 prospective inputs but creates
no actual cohort or actor workspace. No final freeze or capability proof
for that future workspace is claimed.

The shipped skill, engine, accepted prototype and frozen old cohort remain
unchanged. The two visual candidates remain drafts. The paid question is
still unanswered at this checkpoint, and no model evaluation or push was
made. The [previous handover](2026-10-12-before-stage-3-development-handover.md)
preserves `784eb1e` verbatim. Stage 3 remains active and incomplete.

Subsequently, the author answered **"Approve this bounded comparison"**.
The [separate approval record](2026-10-12-stage-3-comparison-approval.md)
supersedes the unanswered state above without enlarging the two-arm limits.
