# Historical documentation and preservation record

Start with [the current handover](../handover.md) and [documentation map](../README.md).
The files indexed here preserve historical wording, including instructions
and status statements that were later superseded. Their commands are not
the current execution instructions.

The [11 October publication and README record](2026-10-11-readme-and-publication.md)
preserves the author's public-status update, the earlier private-status
guidance and the illustrated README work.

## Capture and scope

Captured on 10 October 2026 from the working tree at commit
`4c1007b6607075e895c892931f72db00ef5d7b5c`. The handover included the other
session's uncommitted existing-portfolio review direction and final verification.
Two pre-existing untracked review documents were inventoried as well.
Their original paths and contents are preserved; they are not authored by
this migration. The inventory records index blob IDs separately from actual
working-tree content hashes, so the snapshot is not described as a clean checkout.

The author accepted the organization proposal with "yes lets get it done".
The migration changes navigation and current summaries, with all historical
details retained in these copies or at their original unchanged paths.

## Verbatim source copies

| Original path | Full preserved copy | SHA-256 |
|---|---|---|
| `AGENTS.md` | [Open original text](2026-10-10-documentation-sources/repository-instructions.md) | `984ab9c4bb6e5e44391acd9926dc4449354025f9d1e3384086baf39fd2966da9` |
| `README.md` | [Open original text](2026-10-10-documentation-sources/root-readme.md) | `6115a34ebb84fcf2b5fdfe561aabf6daef918ae93f22625a4e04e4865c9ee1e8` |
| `docs/handover.md` | [Open original text](2026-10-10-handover.md) | `7df62441fcf289309ecc934cf448e8b4dd3c4908070bd591c20d35341d23b552` |
| `docs/superpowers/plans/2026-10-10-documentation-organization.md` | [Open original text](2026-10-10-documentation-sources/organization-proposal.md) | `7f2a683915a467664fab68a5fac6dcbabc3dd592576281971f17a97002b55f16` |
| `evals/README.md` | [Open original text](2026-10-10-evals-readme.md) | `7a8a69dab1fd39ab6509c2c6b9f264f27f4138541f073e12e48d330e121ebcbc` |

The [historical Claude workflow](../../evals/history/claude-workflow.md) is
also a literal extraction of original evaluation README lines 185 to 292.
It includes the original historical heading and all subsequent sections,
including scoring notes. Current applicable scoring guidance is also in
[the current runbook](../../evals/README.md#read-v1-scores-with-the-evidence).
The byte offsets and extraction hash are in the inventory.

## Find a section of the old handover

Every original heading remains in the verbatim snapshot. This table maps
the old sections without rewriting their historical labels.

| Historical section | Archive location |
|---|---|
| Existing portfolio review: direction accepted, implementation planned | [Read section](2026-10-10-handover.md#existing-portfolio-review-direction-accepted-implementation-planned) |
| Documentation organization review | [Read section](2026-10-10-handover.md#documentation-organization-review) |
| Existing portfolio evaluation: capability review | [Read section](2026-10-10-handover.md#existing-portfolio-evaluation-capability-review) |
| Accepted improvements implemented and evaluated | [Read section](2026-10-10-handover.md#accepted-improvements-implemented-and-evaluated) |
| Recommendations after reviewing the completed results | [Read section](2026-10-10-handover.md#recommendations-after-reviewing-the-completed-results) |
| Completed ordered follow-up: privacy still fails, premise improves | [Read section](2026-10-10-handover.md#completed-ordered-follow-up-privacy-still-fails-premise-improves) |
| Completed comparison: broader technical and academic coverage | [Read section](2026-10-10-handover.md#completed-comparison-broader-technical-and-academic-coverage) |
| Completed targeted test: source checks for labels and summaries | [Read section](2026-10-10-handover.md#completed-targeted-test-source-checks-for-labels-and-summaries) |
| Latest follow-up: why eight skill runs failed | [Read section](2026-10-10-handover.md#latest-follow-up-why-eight-skill-runs-failed) |
| Latest result: completed Codex comparison | [Read section](2026-10-10-handover.md#latest-result-completed-codex-comparison) |
| Current direction: Codex only | [Read section](2026-10-10-handover.md#current-direction-codex-only) |
| What this is | [Read section](2026-10-10-handover.md#what-this-is) |
| Test status checked on 10 October 2026 | [Read section](2026-10-10-handover.md#test-status-checked-on-10-october-2026) |
| Where stage 1 stands | [Read section](2026-10-10-handover.md#where-stage-1-stands) |
| What the one test showed | [Read section](2026-10-10-handover.md#what-the-one-test-showed) |
| What is left to do, in order | [Read section](2026-10-10-handover.md#what-is-left-to-do-in-order) |
| A. The author has read the counts, and said to go on | [Read section](2026-10-10-handover.md#a-the-author-has-read-the-counts-and-said-to-go-on) |
| B. Task 8: closing what is left | [Read section](2026-10-10-handover.md#b-task-8-closing-what-is-left) |
| C. Task 9: the stronger model | [Read section](2026-10-10-handover.md#c-task-9-the-stronger-model) |
| D. Task 10: closing the stage | [Read section](2026-10-10-handover.md#d-task-10-closing-the-stage) |
| E. Stage 2: the engine | [Read section](2026-10-10-handover.md#e-stage-2-the-engine) |
| How a test is made | [Read section](2026-10-10-handover.md#how-a-test-is-made) |
| How the skill is changed | [Read section](2026-10-10-handover.md#how-the-skill-is-changed) |
| What the author has said | [Read section](2026-10-10-handover.md#what-the-author-has-said) |
| What was decided on the way | [Read section](2026-10-10-handover.md#what-was-decided-on-the-way) |
| Learned the hard way | [Read section](2026-10-10-handover.md#learned-the-hard-way) |
| To start a new session now | [Read section](2026-10-10-handover.md#to-start-a-new-session-now) |

## Links inside preserved copies

Verbatim copies retain their original relative link text. Those links were
written for the source location, so use the rebased destinations here when
reading an archive. Literal command paths also remain relative to the
repository root. No old text was rewritten merely to make a copy navigate.

| Source document and link label | Destination from this index |
|---|---|
| `docs/handover.md`: the documentation organization plan | [the documentation organization plan](../superpowers/plans/2026-10-10-documentation-organization.md) |
| `evals/README.md`: report | [report](../../evals/runs/codex-stem-1/report.md) |
| `evals/README.md`: reviewed findings and concepts | [reviewed findings and concepts](../../evals/runs/codex-stem-1/findings.md) |
| `evals/README.md`: Source checks | [Source checks](../../evals/runs/codex-sol-2/findings.md) |
| `evals/README.md`: Private-file boundary | [Private-file boundary](../../evals/runs/codex-privacy-1/findings.md) |
| `evals/README.md`: Summary and question premises | [Summary and question premises](../../evals/runs/codex-premise-1/findings.md) |
| `evals/README.md`: Creative review | [Creative review](../../evals/runs/codex-creative-review-1/findings.md) |
| `evals/README.md`: Opening clarity | [Opening clarity](../../evals/runs/codex-opening-1/findings.md) |
| `evals/README.md`: Closing meaning | [Closing meaning](../../evals/runs/codex-closing-1/findings.md) |
| `evals/README.md`: Concrete physics evidence | [Concrete physics evidence](../../evals/runs/codex-physics-evidence-1/findings.md) |
| `evals/README.md`: Privacy enforcement probes | [Privacy enforcement probes](../../evals/runs/codex-privacy-enforcement-1/findings.md) |
| `evals/README.md`: six-case calibration | [six-case calibration](../../evals/runs/codex-measurement-v2-1/findings.md) |

## Verify preservation

[The inventory](2026-10-10-documentation-inventory.json) records 2092 original
paths, their file types and SHA-256 hashes, including symlink targets rather
than the files they point to. All 1961 tracked run artifacts retain their
original paths and contents. The complete run-file set is checked too; empty
untracked directories are not evidence and are described in the study catalogue.

Run the read-only archive check from the repository root:

```bash
python3 docs/history/verify-documentation-migration.py
```

At migration completion, the stricter check also proves every original
non-rewritten path is unchanged and no run artifact has been added or removed:

```bash
python3 docs/history/verify-documentation-migration.py --full
```

That stricter check describes this migration only. Later intentional changes
to code or fixtures can legitimately fail it; do not rewrite the captured
inventory to make future changes pass. It starts no model calls and does not
regenerate evaluation reports. The saved completion result is
[migration-verification.json](migration-verification.json).

The full outcome and local validation are in
[the migration plan](../superpowers/plans/2026-10-10-documentation-organization.md#implementation-outcome).
Archives retain the contextual material described by the earlier publication
guidance. See the [current publication record](2026-10-11-readme-and-publication.md)
for the author's public-status update.

## 11 October engine checkpoint

[The pre-engine handover](2026-10-11-before-engine-handover.md) is a verbatim
copy from `965b3d0`, retained before updating stage status and prerequisites.
Its relative links still use the original `docs/handover.md` location as
their base, deliberately preserving the bytes. Use the current handover
and documentation map for clickable navigation.
The original stage 2 and 3 proposal stays at its existing path with a
precedence notice pointing to the new review.
