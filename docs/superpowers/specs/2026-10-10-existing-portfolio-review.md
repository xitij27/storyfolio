# Evaluating an existing portfolio

Date: 10 October 2026.
Status updated 11 October 2026: the direction is accepted; the broader
behavior below remains proposed. The subsequent
[Steve pilot](../plans/2026-10-11-steve-review-pilot.md) implements a minimal
source-review runner and real case. Its single natural run succeeded with
the unchanged skill. No dedicated skill review mode was added. Separate
coordinator browser observations are product evidence, not an evaluation
of browser-enabled agent review.

## Accepted direction

Give Storyfolio a separate entry path for evaluating an existing portfolio.
Give feedback before any redesign. Assess general portfolio usefulness
separately from suitability for Storyfolio's long-scroll, one-object 3D
format. Establish an observed failure before adding a skill instruction,
then repeat the affected test after the change.

The author supplied `https://xitij27.vercel.app` as an example. Its prior
HTML inspection is recorded in the archived handover linked from
`docs/handover.md`. It is also the portfolio
from which the skill originated, so it is a practical walkthrough rather
than independent evidence of generalisation.

The author then clarified that a GitHub repository link or local clone
should be accepted, and can support a better evaluation than the deployed
URL alone. Repository input is part of the first milestone, not a future
optional extension. This adds evidence sources to the same review path.

## Inputs and inspection depth

| Input | Review evidence available |
|---|---|
| Deployed website URL | Served content and visitor behavior where browsing tools can observe it |
| GitHub repository URL, optionally with a branch or commit | Accessible source at a resolved revision, relevant documentation and assets; a local preview when it can be run |
| Local repository path | Source and the current working tree, relevant documentation and assets; a local preview when it can be run |
| Repository plus deployed URL | Implementation evidence together with the actual visitor experience, with their versions distinguished |

Prefer the richer supplied evidence. Repository plus a running site gives
the most complete review; a deployed URL alone remains a supported input.
For a GitHub link, inspect or clone into a review workspace using available
access and record the resolved commit. For a local path, resolve the path,
read project guidance and inventory files before selecting relevant sources.
Start from active entry points, routes, content and components; inspect
styling, assets, motion/fallback logic, build scripts and tests where they
explain the visitor experience. Avoid reading unrelated private material or
credential files. A repository is not blanket permission to read every file.

Record the source revision and reviewed-file hashes. For a local checkout,
also record whether inspected content includes tracked edits or untracked
files; HEAD alone does not identify a dirty working tree. Tie source findings
to file/line locations and the active route/component that uses them.
Documentation and unused code are not proof of rendered behavior.

Run an existing app locally when supported by its documented setup and
available tooling. Keep generated files in a separate review workspace where
practical and preserve the supplied working tree. Record actual commands,
outcomes and the source snapshot used. Missing dependencies or credentials
limit runtime review; do not turn them into invented website defects.
Running the existing app for observation is distinct from implementing or
redesigning a portfolio.

If source and deployment cannot be matched, label findings by source: local
checkout, local preview or deployed URL. Neither an apparent fix in source
nor a passing local check proves the deployed version has it. Repository
content also does not independently verify personal claims or asset rights.

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

1. Scope: sources, date, audience, source revisions/working-tree scope,
   environments and states actually inspected.
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

The first milestone validates critique of frozen repository content and
source evidence. Runtime review remains a separate milestone requiring
actual browser evidence from a local preview or deployed site. Neither
milestone implements a new site, deploys changes, enforces privacy or
constitutes a general security audit.

Implementation sequence and completion gates:
[the implementation plan](../plans/2026-10-10-existing-portfolio-review.md).
