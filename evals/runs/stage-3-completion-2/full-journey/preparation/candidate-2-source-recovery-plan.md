# Candidate 2, prospective source-recovery continuation

12 October 2026. Source-only proposal, not a launch approval or passing
gate. No model, browser, build, install, test, source repair or process
signal was executed for this review.

## Finding and scope

Turn 2 completed normally in the original session. The official snapshot
retains 98 files but omits the actor's permitted `site/` destination. The
[separate recovery](candidate-2-stop-2-recovery/recovery.json), observed at
15:33:54.304 UTC after outer closure at 15:30:17.216, retains those exact
98 files plus 84 application files. It proves unchanged source during its
copy, not complete application identity at the earlier closure instant.
The [access review](candidate-2-stop-2-access-review.md) and
[source-target review](candidate-2-stop-2-source-target-review.md) preserve
that distinction. The scoped process check subsequently found no process
whose cwd was exactly the workspace or `site/`; it is not host-wide proof.

Three apparatus constraints need one explicit amendment: the capture
allowlist omits `site/`, the measurement worker assumes a root application,
and the next-turn guard requires equality with the incomplete official
snapshot. `executeBuildTurn` also validates its case against frozen inputs
and its previous snapshot against the saved result. An ordinary coordinator
gate or changed cwd cannot bypass these constraints honestly.

## Smallest defensible recovery

1. Preserve the entire original cohort, inputs, turns, result, snapshot,
   artifacts, failed eligibility and recovery bytes unchanged. Save a
   separately labelled coordinator amendment, for example
   `candidate-2-source-recovery-1/`, binding the old input digest, both turn
   results and their artifacts, same session and original workspace, the
   recovery manifest, its timestamp/limit, and every new helper byte. Do not
   change the old case or describe the recovered 182 files as its snapshot.
2. Independently verify all recovered bytes, exact inclusion of the 98
   official files, and exactly the 84 declared additional `site/` files.
   Establish closure of the actual owned preview writer from its startup
   identity and scoped process evidence; model closure alone is insufficient.
   Compare the complete current generated-excluded tree with the recovery
   before any measurement or continuation. Keep the existing exclusions,
   file/byte limits and symlink rejection. Classify empty `.aws`/`.codex`
   separately; do not call application files metadata. Any unexplained
   drift blocks, rather than being restored from an archive or accepted.
3. Make a narrow study-local derivative of the measurement binding,
   reconstruction and cwd plumbing. Select the explicitly verified recovery
   archive, not a forged actor snapshot, as the restoration source. Restore
   all 182 files into a fresh measurement workspace. Bind `applicationRoot:
   "site"` to its package and lock hashes, canonical containment and absence
   of symlinks. Install/build/serve from that child directory; keep source
   before/after, dependency/output isolation and discovery paths relative to
   the whole workspace. Preserve targets, rubric, original-image review,
   control assertions, trusted tools, environment and single 15-minute
   concepts bound. New helper identities are supplementary, not old frozen
   identities. Keep later stage-4/stage-6 cwd handling consistent with this
   declared source layout, without changing their checks or schedule.
4. Only after actual concept measurement and semantic/choice review pass,
   permit a study-local continuation adapter. Reuse the original prompt,
   invocation, `planTurn` accounting and result/artifact semantics. Import
   the two immutable historical results by explicit path/hash, without
   modifying their snapshot fields. Turn 3 alone uses the recovery as its
   separately named pre-turn source checkpoint; its gate still identifies
   the actual turn-2 result digest and observed concept decision. Record
   this different source basis in started/result/provenance records.
5. For new turns only, add exactly `site` to the existing snapshot roots.
   Capture complete before/after source and deltas. Require the full
   generated-excluded inventory to match each saved snapshot, so another
   omitted root cannot silently become a complete capture. Turns 4 to 6
   use their immediate genuine predecessor snapshots, never the recovery
   again. Keep the original workspace and session, actor-visible skill,
   six prompts, capabilities and model unchanged. Store new outputs in the
   labelled continuation lineage with explicit links to original turns 1
   and 2. No automatic advance, repeat, extra prompt or reset budget.

Prefer a study-local runner derivative over a shared optional recovery hook.
Keep `evals/lib/build.mjs` and the old runner unchanged. The derivative's
only differing execution seams are historical-result lookup, the once-only
pre-turn checkpoint, capture policy and labelled output/provenance. Reuse
the hash-verified existing prompt/argv/invocation and `planTurn` functions.
Keep the original case for those bounds; store the additive capture policy
in the separate amendment, never pretend it passed old case-byte equality.
Bind original input digest and new amendment digest as distinct fields.
For measurement, derive only binding/restoration and application-cwd seams;
reuse unchanged observation/assessment functions and freeze all imports.

This is a changed-apparatus continuation of the same conversation, not an
unmodified frozen comparison. The frozen protocol already requires source
policy/measurement variance to be preserved and labelled. A prospective
root disposition must accept the recovery checkpoint's limited provenance
before implementing this route. It cannot retroactively pass original
source binding. If exact closure-time application identity is required for
the claimed result, this evidence cannot provide it; retain that limitation
instead of declaring it recovered. Any eventual whole-journey finding must
identify this amendment and independently pass every behavioral gate.

## Authority and remaining bounds

The [author's approval](../../../../../docs/history/2026-10-12-stage-3-capacity-retry-approval.md)
allows this same attempt up to six gated turns. Resuming the normally
completed session for its four remaining fixed turns is not another paid
attempt. No additional paid authorization appears necessary for that narrow
route, provided root explicitly records the apparatus amendment and no
retry, replacement actor, new prompt, model change or limit expansion is
introduced. A fresh restart or extra attempt requires new authorization;
the source repair does not supply it.

The existing audit reports 773060 ms cumulative actor time, 1898573
reported input-plus-output tokens and 184269 uncached-input-plus-output
tokens. Carry all of them forward. Limits stay 900000 ms per remaining
turn, 5400000 ms cumulative, 12000000 reported tokens and 1500000 uncached
plus output, checked between turns with their existing overlapping-counter
qualification. Four remaining turns cannot exceed 60 additional paid
minutes. No judge. No new paid call is needed to prepare or test this
coordinator correction. Human desktop/phone approval remains separate.

## Tests required before a continuation launch

- Reproduce the original 98-versus-182 rejection with an injected actor
  tripwire, not a model call. Prove no mutation of old inputs or artifacts.
- Recovery rejects changed official or additional bytes, missing/extra
  files, incorrect digest/session/workspace, symlinks, size-limit failures,
  and live drift. Equality means the complete source tree, not its subset.
- Nested measurement accepts the exact whole-tree plus `site/` mapping and
  rejects unsafe/escaped roots, wrong install cwd, changed package/lock,
  dropped or mutated siblings, incorrect helper identities and reused output.
  No semantic assertion or source exclusion changes; verify the root-app
  path still behaves identically with synthetic fixtures.
- Continuation fake-invocation tests preserve exact argv/prompt/session and
  old usage, reject invalid gates, missing usage, incomplete history,
  exhausted limits, duplicate/noncontiguous turns and a second recovery
  override. New snapshots include `site/`; unknown later source blocks.
- Independently review the derivative diff and bindings, run focused tests
  plus the required repository/skill checks, then commit the amendment
  before root's one new measurement. Browser success is not substituted for
  all-original semantic review or an observed next-turn gate.

The actor's contact-sheet-only inspection and overstated no-fetch wording
remain separate observed limitations. A packaging repair does not erase
them or predetermine whether the concepts meet the existing criteria.

## Exact identity anchors

Read-only hashes at this review:

| Record | SHA-256 |
| --- | --- |
| Original turn-2 result | `59067a559ac604d2e70ddafedbc7b592dc63d7ba30d4b97085e246511b9ff3a2` |
| Original turn-2 snapshot manifest | `698882bf52f40113cde24fdde5767811131eb452a258db671263aa11f7d61c67` |
| Recovery record | `96933e373121316876d9b07370a0887d5c715828f8a65bec95821cba41824049` |
| Recovery source manifest | `db72f877d970f41891ac60074d5ecedbe93e8388a54aeb42382d233d29cf9c24` |
| Frozen protocol | `ec5f429416f862f6023f75fda6b2d161e7f78078a3aeeffaf0eecf402d4d0401` |
| Current/original runner library | `d78cce4c3914127da41154e7368f689ed1828cd0efa4a6b0959d6890d5edc731` |

Recovered source digest:
`70a581fce400ea0edb47d5b95bf5a290614d1b5edbcf121952dd04357a733a10`.
