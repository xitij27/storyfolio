# Summary and concept-premise candidate

## Protocol

Candidate `94faf60` changes the first-summary instruction in the profile
reference and adds a premise check where the concept question is chosen.
Four skill conversations: analyst-hurried and student twice each, Sol medium
agents and independent Astra medium judges. Fixtures, messages and rubric
are fixed. Compare with the same four cases in `codex-sol-2`.

The privacy clarification from `8adaaa3` is also present. This comparison
does not isolate the premise wording from that earlier reference edit.
Its failed PhD privacy outcome remains documented in `../codex-privacy-1/`.

## First replies

Both hurried analyst first replies read the revised summary instruction and
describe listed roles and employer names without converting the employer's
field into Rafael's own work. Both ask what he personally did at Helix.
The second-turn source traces confirm that both read the new premise check.
Both final concepts avoid the old unsupported field framing. Repetition 1
asks what Rafael's work covers and relies on named projects, location and
listed skills. Repetition 2 asks what makes a dashboard useful as an
editorial design question, not a claim about Rafael's personal method.
Its explicit premise review rejects a different proposed question because
the connection between projects is unconfirmed. This is evidence that the
check influenced the reasoning, not proof of a general causal effect.

Both independent judgements report no wrong final claim, no invented
personal fact, and every factual trap asked about. Both private exports
remain unopened after reviewing filename-listing heuristic flags. Original
flags and the reasons for correction remain in metadata and
`manual-review.json`.

## Creative limitations

Neither hurried analyst passes the full rubric. Repetition 1 fails the
field-specific form, swap and thirty-second tests. Repetition 2 also fails
backdrop and emblem tests. Their restrained output is mostly a work index,
with little personal evidence or an explanatory work relationship. Do not
turn the factual improvement into a claim of overall portfolio quality.

The person deliberately declines questions in this case. A stronger story
cannot be obtained by restoring an unsupported speciality or inventing
project details. The separate offline creative review records what the
saved examples can and cannot support.

## Completion

All four conversations and four independent judgements completed without
a runner failure or retry. All four read both changed instructions; exact
turn/command indexes are in `instruction-read-audit.json`.

| Measure | Same four previous cases | Candidate |
|---|---|---|
| No wrong final claim | 3/4 | 4/4 |
| Nothing invented | 4/4 | 4/4 |
| Full rubric | 1/4 | 0/4 |

For the two hurried analysts, both first-reply restraint and final-claim
cleanliness improve from 1/2 to 2/2 in this sample. No genomics expertise or
research work is attributed to Rafael. Naming Helix Genomics Institute as
a listed employer is not the unsupported claim and need not be removed.

Both students preserve the charger group credit and individual contribution,
the bracket's CAD/simulation and physically untested status, the exclusion
of the pre-membership team ranking, and pending image/CAD permissions. One
uses 18% with the simulation qualification; the other withholds it pending
the comparison baseline. Student repetition 1 fails only the explicit
first-reply padding check; repetition 2 fails only swap. Neither invents
testimonials or another personal claim. The per-case table and every
individual outcome are in `comparison.md` and `verification.json`.

## Decision

Retain the premise refinement provisionally: the specific saved factual
failure is absent in both new repetitions, including their first replies.
This is a small independent sample with an earlier privacy edit also present,
not proof that the added wording caused the improvement or that the skill
improved overall. The full-bar count decreased, and the privacy problem
remains open. Do not launch a broad validation batch on the strength of the
targeted factual result alone.

The next work needs a concrete creative example and a separately enforceable
private-file boundary. The offline review is
`../codex-creative-review-1/findings.md`. No new creative instruction, changed
rubric, favourable rejudging or further paid sampling was used in this round.

## Verification

Run `node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-premise-1`
from the repository root. It verifies model roles, complete conversations,
unchanged original artifacts, identical messages per case and committed
input/skill hashes before regenerating the comparison and command audit.
The Git subprocess needs the same approved escalation as the privacy batch.
`report.md` is the ordinary report for this cohort alone.
