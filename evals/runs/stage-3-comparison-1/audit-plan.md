# Prospective comparison audit checklist

12 October 2026. The author approved the bounded fresh baseline, then a
candidate only if needed, with at most one judge per arm. The root
coordinator owns all paid launches and the candidate decision. This
checklist makes no model call, prepares no actor, and changes no source or
historical result. Use the root's current authorization record with the
[comparison protocol](../../builds/bench-depth-2/protocol.md); that protocol's
pre-approval wording records when it was prepared, not a fresh denial.

The expected baseline is `codex-bench-depth-baseline-2/bench-depth-2/baseline-1`.
Audit a candidate separately under `codex-bench-depth-candidate-1`; never
replace or resume either arm. Deadlines are 15 minutes per actor and 10 per
judge, not hard token or dollar caps.

## Before assessing the actor

- Record cohort input digest, code revision, frozen fixture/skill/engine,
  dependency lock, helper, capabilities, checker, expectations and protocol
  hashes. Verify the nine fixture inputs and explicit environment facts.
  Freeze identity must include `evals/lib/source-scope.mjs`.
- Distinguish setup inventory, actual before-turn snapshot and after-turn
  snapshot. Verify every saved file and artifact hash, including binary
  assets; compute changes against the actual before-turn snapshot.
- Wait for settled process/result evidence. Read the complete raw stream,
  stderr, process record and final result together. Record completion,
  timeout/interruption, terminal event, duration and usage. A partial stream,
  recovered setup command or complete model turn alone is not the verdict.

## Skill use, provenance and ambient access

- Review every saved started/completed tool command, inline program,
  subprocess invocation and printed result, not only search hits or the
  final reply. Cite event ID, raw line, exact path and observed bytes for
  each material finding. Record omitted/image telemetry limits.
- Establish whether and when the actor read `.agents/skills/storyfolio/SKILL.md`
  and relevant routed references. Check the extent of printed reads; a
  filename, description, truncated prefix or claimed read is not proof of
  complete reading. For a candidate, verify its changed instruction was
  actually encountered before the behavior being compared.
- Check exposure to `docs/story/evaluation-environment.md`, the supplied
  enabled/disabled-skill facts and the optional-install refusal. Do not
  equate inherited coordinator capability checks with actor preflight or
  invent a before-stop-1/recommendation-then-refusal opportunity.
- Trace `scripts/review-sheets.mjs` use, modifications, dependencies and
  screenshot inputs to supplied/current-site files. Any external helper,
  repository, other run, accepted prototype, recovery design, rubric or
  screenshot read gets its own provenance finding. Mere filename listing
  is exposure, not proof that contents were read.
- Apply the [prior actor audit's](../codex-bench-depth-baseline-1/actor-audit.md)
  calibrated distinction: undeclared neutral tooling compromises a strict
  fixture-only claim but does not itself prove copied visual solutions.
  An actual held-out solution read invalidates an independent-build claim.
  The supplied helper and source exclusions are not a filesystem read jail;
  absent events do not prove all subprocess/image reads were impossible.
- Verify fixed facts, ownership, illustrative limits and observed/projected
  distinctions in final source and rendered evidence. Separate factual
  accuracy, technical operation, visual explanation and author approval.
- Inventory actor-referenced ignored capture sets. Preserve them separately
  with original bytes, hashes and command provenance using a retained
  no-overwrite, no-symlink archival method. Do not import unrelated generated
  trees or present actor-owned checks as independent acceptance.

## Source equality and independent measurement

- Verify final actor snapshot, coordinator `sourceBefore` and `sourceAfter`
  have the same full file-key set, byte sizes and SHA-256 hashes under the
  frozen shared boundary. Verify inventory digests, exclusion lists and
  per-mode source digests; measurement must leave source unchanged.
- Inspect unexpected/excluded roots rather than dropping them to get a
  match. Recognize custom hidden bare Git metadata only through the frozen
  bounded whole-tree/marker helper. Unknown runtime files, malformed stores
  or symlinks cannot earn that exception. Empty unknown directories produce
  warnings but no file records. Standard generated exclusions and Git
  classification do not establish safe contents or inaccessible files.
- Keep failures intact. Do not normalize the old 202/390 mismatch into new
  acceptance, waive extra files, patch actor code after its turn or substitute
  a subset comparison for strict equality.
- Verify coordinator expectations/checker hashes and complete artifacts for
  all seven conditions. Focus-only pointer evidence is not-applicable, not a
  pointer pass; real keyboard focus, target response and original images
  remain necessary. Ordinary controls receive no inherited waiver.

## Judge preflight and post-result checks

- After root selects the independent acceptance manifest, use the existing
  `codex-build-judge.mjs --run <full-run-path> --acceptance <relative-manifest>
  --dry` path only. Save its exit status and identity/size/page output. It is
  read-only and makes no call. Do not omit a rejected acceptance attachment
  merely to obtain a successful preflight or invoke `runBuildJudge` here.
- Require frozen input/current implementation equality, complete saved
  source/artifact sets, authentic stream-derived summaries, strict source
  equality and valid criterion eligibility. Validate complete paged evidence,
  hashes, logical-prompt reconstruction and bounds without trimming source.
  A preflight failure is reported to root before any judge decision.
- Root alone may spend the one judge allowance. Afterward verify the raw
  process/stream, complete page-delivery ledger, exact terminal final message,
  schema and evidence citations using the frozen validation helpers. Keep
  commentary and failed results intact. Page delivery is not comprehension;
  the text judge receives no original pixels and grants no visual approval.
- Report technical verdict, text judgement, source-bound original-image
  review and author approval separately. Include actual token counters and
  available cost data without inventing a dollar amount. No automatic retry,
  continued actor turn or selective rejudgement follows any failure.

## Comparison decision

Root reviews the baseline before selecting either draft. If the relevant
visual question passes, omit redundant instructions and the candidate run.
Otherwise require a specific observed miss and an exact reviewed skill-only
diff. Compare fixed inputs/measurement/environment across arms, with any
other difference disclosed as a confound. Preserve both actual outcomes.
This approved-storyboard diagnostic cannot establish natural build entry,
early choice gates, planning-only regression, complete-site quality or
Stage 3 completion.
