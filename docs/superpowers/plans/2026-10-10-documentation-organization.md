# Documentation organization, preserving the full record

Status: completed and verified.
The original proposal below is preserved in full in
[the source archive](../../history/2026-10-10-documentation-sources/organization-proposal.md).

On 10 October 2026 the author asked: "okay anything we can do to improve
the file organization and structure for documentation here without losing
any details and information?" This plan records the recommended structure
and how to verify preservation. This review changes only this plan and a
handover entry. No skill, evidence, historical document or file path is moved.

## What needs improving

At commit `21f66aa`, `docs/handover.md` is 966 lines and 8,825 words. It
contains the latest completed opening and closing evaluations, older
recommendations and instructions, the original author decisions, lessons,
historical Claude commands and a startup prompt that still points to the
earlier source-check and STEM results. Phrases such as "Latest", "Current"
and "What is next" recur across different historical moments. The old
statement that the current skill has not been tested is now historical.
Readers must reconstruct which instructions still apply. A concurrent
session added a portfolio-review entry during this audit; preserve that
entry too and snapshot the actual current file when migration begins.

`evals/README.md` mixes the current runbook, case coverage, completed study
results, optional v2 judging and historical Claude instructions. Commands
near its top target already completed cohorts. Eleven plans preceded this
proposal and share the same date without an index of status or successors.
The original stage 1 plan is 4,010 lines because it includes code and fixture
drafts; its detail is valuable as a historical source, not a new-session
entry point.

The evidence itself is already grouped by cohort. An independent read-only
review confirmed that moving it would disrupt path and hash dependencies.
The useful change is a navigable current layer with explicit history.

## Recommended structure

| Path | Purpose |
|---|---|
| `README.md` | Brief introduction and links to the documentation map and skill |
| `docs/README.md` | Reading order and where each kind of information belongs |
| `docs/handover.md` | Short authoritative current state, current author directions, decisions still open, and startup instructions |
| `docs/history/2026-10-10-handover.md` | Complete verbatim snapshot of the pre-migration handover |
| `docs/history/README.md` | Archive source commits, hashes, section mapping and historical status |
| `docs/superpowers/plans/README.md` | Plan status, outcome, successor and linked evaluation evidence |
| Existing plan and design paths | Full original protocols, design and outcomes, kept in place |
| `evals/README.md` | Current Codex operating instructions and scoring interpretation |
| `evals/studies.md` | Catalogue linking every cohort to its question, method, versions and results |
| `evals/history/claude-workflow.md` | Preserved historical workflow, clearly labelled as historical |
| Existing `evals/runs/` paths | Original findings, reports, conversations, judgements and verification artifacts |

Start the current handover with what the skill actually does today, the two
latest instruction changes, what the tests support and what remains open.
Keep current author decisions and a linked ledger of their exact historical
statements there. Update the routing sentence in `AGENTS.md` as part of a
migration to explicitly describe the linked historical archive. Preserve
the rule that every project detail stays committed inside this repository.

The study catalogue should distinguish conversation comparisons, focused
reruns, diagnostic rejudgements, offline reviews and deterministic shell
probes. Link to each study's findings, report, manifest and verifier where
they exist. Record model roles, cases/repetitions and skill/fixture versions
without inventing absent metadata or pooling unlike success rates. Index
partial or abandoned cohorts as well as completed ones.

Use one authoritative home for each kind of new detail: current status in
the handover, rationale in the design, protocols and outcomes in plans,
observations beside their runs. Navigation pages link to these sources.
Historical repetition remains intact; future updates need not copy whole
results into several pages. Use clickable relative links for navigation.

## Preservation and implementation order

1. Record the source commit and a tracked-file inventory of existing
   documentation and evaluation artifacts, including file type, exact
   paths and content hashes. Record symlink targets without following them.
2. Copy the full handover into the archive before editing its current form.
   Verify the archive is byte-identical to its source and record its hash.
   Preserve every original section, quote, caveat, command and decision.
   An abbreviated current page is not a replacement for that complete copy.
3. Add the documentation map, plan index and study catalogue. Confirm plan
   statuses against their outcome sections and successor work; unresolved
   author review is not silently labelled complete. Keep existing plan and
   design filenames. Index the long implementation plan instead of splitting
   its embedded code and fixtures.
4. Rewrite the current handover against verified present facts. Map old
   sections to archive headings; preserve or repair referenced anchors.
   Keep current author directions prominent and point to the full ledger.
5. Separate the Claude workflow by verbatim extraction with a recorded
   source range and hash. Retain any still-applicable scoring explanations
   in the current runbook. Label completed-cohort commands as reproduction
   examples; use a new iteration name for genuinely new work.
6. Prove all existing evidence paths and bytes are unchanged, compare all
   extracted historical prose against its original, and check navigation
   links. Run `node evals/check-skill.mjs`, `npm test` and whitespace checks
   before committing on main. No paid conversation or judgement is needed.

## Files that must remain intact

Do not rename cohorts, move fixtures, rewrite saved reports, or put new
navigation files inside frozen source-run directories. The v2 verifier in
`evals/lib/measurement-v2.mjs` checks exact tree membership as well as hashes;
even adding a README to a selected source directory changes that evidence.
Focused manifests pin repository-relative paths, and cohort-local scripts
depend on directory depth and relative imports.

A migration should compare an evidence inventory rather than regenerate
reports. Some existing offline verifiers write comparison and audit files.
Keep navigation outside `evals/runs/`, and preserve all pinned implementation
files. This organization work requires neither a new rubric nor a skill edit.

## Review outcome

Recommend this staged reorganization. Its main benefit is a clear answer to
"what is current, what was decided, and where is the evidence?" while the
complete historical record stays directly accessible. The proposed archive
and indexes are not yet created; no documentation has been shortened or
relocated during this review.

Review verification: `node evals/check-skill.mjs` passes (687 main words,
four references), `npm test` passes all 48 tests with the required
Git-subprocess escalation, and `git diff --check` passes. A concurrent
session committed the shared handover, including this review's entry, in
`a950bd4`; this proposal is committed separately without changing that
session's portfolio-review content.

## Implementation outcome

On 10 October 2026 the author accepted the proposal: "yes lets get it done".
The migration creates the documentation map, plan-status index, study
catalogue and a current Codex runbook. The current handover is 126 lines,
down from the captured 1,112-line version, with direct links to evidence
and the complete historical record. The larger captured version includes
the concurrent existing-portfolio review direction and its verification.

Every original handover section and author statement survives verbatim in
`docs/history/2026-10-10-handover.md`. The entire previous evaluation README
is also archived, in addition to the exact Claude-workflow extraction.
Original repository instructions, root README and this proposal were saved
before their navigation/status updates. Existing plans and specifications
keep their paths and contents; only this migration plan gains an outcome.

`AGENTS.md` now explicitly routes historical statements through the linked
archive while keeping current author directions in the handover. The root
README links the map, skill, plans, studies and history. The plan index
keeps Stage 1 closure and the existing-portfolio implementation visibly
unfinished. The catalogue distinguishes all fifteen cohort directories,
including the partial Astra study and empty local iteration 2 remnants;
it does not pool unlike results or present diagnostic ratings as new runs.

The current runbook uses new iteration placeholders and explicit case lists.
It retains v1 scoring interpretation, privacy-audit requirements and v2's
separate diagnostic status. Historical reproduction commands stay available
in their unchanged sources. Relative hyperlinks inside verbatim archives
retain their source text; the history index supplies rebased destinations
and a complete handover section map. No referenced old handover anchors
were found in maintained repository documents.

The capture records source commit `4c1007b`, index blob IDs and working-tree
hashes separately. At capture, the existing-portfolio plan/specification
were untracked and their handover entry uncommitted; their bytes were
included without taking ownership of that work. The other session committed
them independently at `8566b5e` during this migration. Its content is intact.

The [preservation inventory](../../history/2026-10-10-documentation-inventory.json)
contains 2,092 original paths, including 1,961 tracked run artifacts. The
read-only [checker](../../history/verify-documentation-migration.py) verifies
five byte-identical source archives, one exact extraction, unchanged
non-rewritten files and complete run-file membership. Symlink targets are
hashed without following them. No cohort verifier or report generator was
run, and no evaluation artifact, fixture, pinned implementation file or
skill instruction was changed. No model conversation or judgement was made.

The saved result is
[migration-verification.json](../../history/migration-verification.json).
The strict `--full` mode describes preservation across this migration;
later intentional code or fixture changes can legitimately fail it. The
default mode remains a read-only check of the archives and extraction.

## Completion checks

- Full preservation check passes: five exact archives, one literal
  extraction, 2,087 unchanged original paths and all 1,961 run artifacts.
  The evidence tree has no added, removed or renamed files.
- Local navigation review checks 253 relative links across nine current
  documents, including heading anchors, with no missing target. Verbatim
  archives retain their original link text and have the rebased link map.
- Independent review confirms that current author directions, the actual
  skill/evaluation distinction, unfinished work and publication requirements
  remain visible. Its one incorrect scoring-section link was corrected.
- `node evals/check-skill.mjs` passes at 687 main words and four references;
  `node evals/check-people.mjs` passes all seventeen cases; `npm test`
  passes all 48 tests with the required Git-subprocess escalation.
- Whitespace checks pass, and no existing executable mode is changed.
  All migration files are committed on main. No paid runs, push or
  publication form part of this work.
