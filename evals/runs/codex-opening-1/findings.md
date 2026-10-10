# Opening clarity result

Candidate `749eee0` adds a plain-language first-screen meaning requirement
to the storyboard reference. Six Sol medium conversations and six independent
Astra medium judgements completed without a runner failure or retry. The
fixtures, prompts and v1 rubric were unchanged. All six read the new
instruction; exact command locations are in `instruction-read-audit.json`.

## Targeted result

All six pass plain-reader clarity. Both nurses expand their roles and
explain handover/ISBAR; both embedded engineers explain firmware as code
for a physical device, with explanations of power scheduling or bring-up.
The student plans explain their work through the charger and mounting
bracket, including CAD where needed. The meanings are specified before
final captions without inventing new personal claims.

| Case | Previous plain-reader passes | Candidate | Full bar, previous | Full bar, candidate |
|---|---|---|---|---|
| Nurse | 1/2 | 2/2 | 1/2 | 1/2 |
| Embedded | 0/1 | 2/2 | 0/1 | 2/2 |
| Student | 2/2 | 2/2 | 0/2 | 0/2 |

Concrete evidence is in each saved `files/docs/story/storyboard.md`:
the nurses' opening paragraphs and first-viewport plans, the embedded
engineers' first-screen sections, and the students' thirty-second sections.
Embedded repetition 1 also explicitly prevents generic definitions from
implying an unconfirmed device implementation.

All six have no invented personal fact and no wrong final trap claim.
Both student plans preserve group credit and their individual charger
contribution, the bracket's CAD/simulation and unbuilt/untested status,
and pending permission or asset dependencies. Repetition 1 uses the 18%
figure with its modelling qualification and keeps comparison questions
visible; repetition 2 withholds the percentage until its baseline is
resolved. No new factual regression was reported in this sample.

## Remaining failures

Full bar is 3/6. Nurse repetition 1 omits explicit first-turn clarification
of hospital-name/logo use. Student repetition 1 avoids padding but does
not explicitly raise or exclude that trap first. Those are discovery
misses, not reported final disclosures or invented testimonials.

Student repetition 2 fails swap and backdrop. Its job-card sequence remains
generic. The backdrop reason also cites equivalent adjacent content; as
already documented, accessibility equivalence alone does not establish a
failure. Preserve that original verdict and the distinction between this
creative question and the opening's actual clarity improvement. No
favourable rejudging was performed.

## Decision and limits

Retain the opening clarification. The two saved clarity failure types are
absent in both new repetitions each, and the actual text supports that
targeted result. This is a small independent sample, with unequal earlier
embedded repetitions and intervening factual refinements since the older
nurse/embedded cohorts. It does not isolate a causal effect of this line
or establish broad release quality. Full per-case criteria are in
`comparison.md`; do not pool the historical cohorts into a success rate.

`node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-opening-1`
passed after the required Git-subprocess escalation. It checks original
artifacts, full conversations, model roles, messages and committed input
hashes. `report.md` contains the original v1 ratings for this cohort.
