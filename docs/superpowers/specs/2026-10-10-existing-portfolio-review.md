# Evaluating an existing portfolio

Date: 10 October 2026.
Status: the author accepted the direction and asked for an implementation
plan. The details below are proposed. No review mode is implemented yet.

## Accepted direction

Give Storyfolio a separate entry path for evaluating an existing portfolio.
Give feedback before any redesign. Assess general portfolio usefulness
separately from suitability for Storyfolio's long-scroll, one-object 3D
format. Establish an observed failure before adding a skill instruction,
then repeat the affected test after the change.

The author supplied `https://xitij27.vercel.app` as an example. Its prior
HTML inspection is recorded in `docs/handover.md`. It is also the portfolio
from which the skill originated, so it is a practical walkthrough rather
than independent evidence of generalisation.

## Intended behavior

| Request | Deliverable |
|---|---|
| Evaluate an existing portfolio | A review grounded in inspected evidence |
| Plan a new Storyfolio portfolio | The existing facts, concepts and storyboard journey |
| Evaluate and then redesign | Review first, then follow the requested redesign scope and existing decision stops |

The existing creation path still stops at an approved storyboard. Adding
review does not implement the planned site-building stages.

For a review, establish the audience and desired visitor action from the
request or supplied material. Ask only when missing information materially
changes the advice; otherwise state a provisional assumption and continue.
Do not require a complete biographical interview before commenting on
observable problems. A public claim can be assessed for clarity and
support without declaring it independently verified.

The proposed review contains:

1. Scope: sources, date, audience, environments and states actually inspected.
2. Strengths: specific things to preserve and why they help the visitor.
3. Prioritised findings: location, evidence, visitor impact, recommended
   improvement and a way to verify the improvement.
4. Storyfolio suitability: whether its particular form would help explain
   the work, what it would cost in complexity, and what evidence is missing.
5. Limits and next checks: distinguish an observed defect, an interpretation,
   an unanswered factual question and behavior not tested.

Use priority groups such as fix first, improve next and optional. Do not
invent a numerical website score or require a fixed number of findings.
Keeping a useful conventional portfolio is an acceptable recommendation.
Absence of 3D, paper chapters or one opening question is not a general
portfolio defect. If the site already makes a narrative promise, assess
whether the supplied evidence shows it fulfilling that promise.

In a person's repository, keep the review in `docs/story/review.md` with
supporting evidence under `docs/story/review-evidence/` when there is evidence
to save, and update their handover. The chat response summarises the most
useful findings. Review alone does not authorise rewriting site files,
choosing replacement concepts or deploying changes.

## Evidence levels

| Available evidence | What it can establish | What it cannot establish alone |
|---|---|---|
| HTML, text, supplied facts | Wording, attribution discrepancies, document structure and static link-target mismatches | Actual visibility, interaction, animation or performance |
| Screenshots with recorded dimensions/state | Appearance in those captured states | Keyboard behavior, transitions or states not captured |
| Recorded browser actions and measurements | The specific observed behavior under the recorded conditions | All devices, all users or general accessibility compliance |
| Source code | Intended implementation and possible causes | That the deployed site uses or successfully executes it |

A URL is input to inspect, not proof that a browser was used. If only text
can be obtained, deliver a useful content review and name its limits. Do
not turn missing access or an untested state into a defect in the site.
For 3D sites, equivalent accessible text does not by itself make the 3D
decorative. Assess the relationship it explains from available evidence.

## Implementation boundary

These are design targets and judging criteria, not instructions ready to
copy into the skill. The implementation plan first observes the current
agent. Every added instruction must point to a saved failure that needs it.
If the agent already supplies a useful review, do not add a redundant
review checklist.

A demonstrated routing failure can justify a short branch before the
current three creation stops. Substantial review guidance, if needed,
belongs in `skills/storyfolio/references/reviewing-a-portfolio.md`, linked
from the main skill. Change the trigger-only description only if the
discovery experiment establishes a need. Retain the existing shared factual
rules and creation references unless a saved failure requires an edit.

The first milestone validates critique of frozen content. Live-site review
remains a separate milestone requiring actual browser evidence. Neither
milestone implies building, deployment, privacy enforcement or a general
security audit.

Implementation sequence and completion gates:
[the implementation plan](../plans/2026-10-10-existing-portfolio-review.md).
