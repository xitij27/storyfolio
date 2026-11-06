# Closing review, item 17

A fresh whole-repository review before packaging, decided by the author on
6 November 2026 ([record](../../../docs/history/2026-11-06-closers-decision.md)).
One read-only reviewer that had not seen the work (a general-purpose
subagent of the root session), told to verify each finding against the code
and to edit, install, push and run nothing paid. It ran `npm test` (421
pass), `check-skill` and `check-people` (ok). It did not run a production
build or `npm run check` in a scaffolded site; that is Task 4.

## Findings and what was done

| # | Finding | Disposition |
|---|---|---|
| 1 | `scripts/scaffold.mjs` refused any destination that contained the engine, so with the skill installed as the README says (`<portfolio>/.claude/skills/` or `.agents/skills/`), `scaffold.mjs .` failed. Person test 6's agent met it and fell back to `site/` (`evals/runs/codex-person-6/full-journey-3/baseline-1/turns/02/stream.jsonl`) | **Fixed.** Only a destination inside the engine is refused. Regression test in `scripts/scaffold.test.mjs`, failing before the fix. A root that already has an engine path (such as `package.json`) still stops with the conflict list, as `engine/README.md` says |
| 2 | `engine/README.md` and `stitch-check --help` said the sheet's move defaults to `slide`; a new site's `content/site.ts` sets `swing`, and `/preview` falls back to it | **Fixed.** Both say the default is the site's `move`, and the README lists all three. Corrects words already there; adds no instruction |
| 3 | `evals/reviews/steve-source/material/repo/` holds a real person's portfolio source and two photographs, public since 11 October, while the README says the people in tests are made up. The 11 October publication note asked for this to be reviewed before a release | **Removed from `main`** on the author's word, with the runs' copies and screenshots ([decisions](../../../docs/history/2026-11-06-release-review-decisions.md)); still in git history |
| 4 | The rest of the 11 October pre-publication checklist was never made: 797 tracked raw `.jsonl` turn streams and 1,894 tracked files with `/home/kshitij/...` paths, all outside `skills/` | **Kept public** on the author's word ([decisions](../../../docs/history/2026-11-06-release-review-decisions.md)) |
| 5 | README status said stage 3 in progress | **Fixed** (badge, stage table, the status fold) |
| 6 | The handover's opening still said Stage 3 was open | **Fixed**; the old text kept verbatim in the decision record |
| 7 | `library/README.md` pointed at an engine README heading, "A stitched story", that does not exist | **Fixed**: "The person's site" |
| 8 | `scripts/sync-stitch.mjs` did nothing, silently, from a path with a space | **Fixed** as `scaffold.mjs` does it |
| 9 | "A world of your own" named `WORLDS` but not the `WorldId` type beside it | **Fixed** |
| 10 | 7.4 MB of the 9.1 MB skill is `library/`, which building a site does not use | **Moved out of the package** on the author's word ([decisions](../../../docs/history/2026-11-06-release-review-decisions.md)) |

Checked and found clean by the reviewer: every path and identifier the
skill and engine README name exists; stop numbers agree; relative links
resolve; no em dashes outside copied material; no secrets; no machine paths
in `skills/` but generic examples in `engine/scripts/shoot.mjs`; the
made-up people name no real employer; licences (MIT, OFL fonts beside
them, Natural Earth public domain; the pieces after React Bits and
Aceternity UI say they were written from scratch, checked by header, not
line by line).

After the fixes: 422 tests pass, `check-skill` ok.
