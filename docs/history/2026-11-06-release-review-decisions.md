# The closing review's three decisions, 6 November 2026

The [closing review](../../evals/packaging/release-candidate-1/closing-review.md)
left three findings for the author. Root asked each with a recommendation;
the author chose, verbatim:

> "evals/reviews/steve-source/ holds a real person's portfolio source and
> two photos (steve-nyami.jpg, steve-nyami-portrait.jpg), public on GitHub
> since 11 October, while the README says the people in tests are made up.
> What should happen?"="Remove it going forward (Recommended)"

> "The rest of the 11 October pre-publication checklist: 797 raw agent turn
> streams (.jsonl) and ~1,900 files with /home/kshitij/... paths, all under
> evals/ (none in the shipped skill). What should happen?"="Keep, record
> decision (Recommended)"

> "library/ (7.4 MB of the 9.7 MB skill: the gallery's pieces and videos)
> is not used when building a site; the skill points to the hosted gallery
> instead. Ship it in the package?"="Move it out of the package"

## 1. The real person's material, removed from `main`

The option offered: delete the folder from `main` and record why; it stays
in git history unless the author later asks for a history rewrite, which
needs a force push. Root removed every tracked copy of the source and
photographs, not only the case folder:

- `evals/reviews/steve-source/` (15 files: the portfolio's source, both
  photographs, the case and its context);
- `evals/runs/codex-steve-review-before-1/inputs/material/` (the run's frozen
  copy of the same, both photographs among them);
- `evals/runs/codex-steve-review-observations-1/captures/` (19 screenshots
  of the real site).

Kept: the written findings and reviews of both runs, and the plan. No
tracked file now has either photograph's bytes (checked by blob hash).
`evals/README.md` and the README say so. Still in git history and on
GitHub's earlier commits: removing it there is a history rewrite, not
asked for.

## 2. The evaluation records, kept public

The raw turn streams and the files with machine paths under `evals/` stay
as they are, as the test evidence. The closing review found no secrets in
them; none is in the shipped skill. This closes the 11 October
pre-publication checklist by the author's decision, not by a line-by-line
review of every stream.

## 3. `library/` leaves the package

Moved from `skills/storyfolio/library/` to `library/` at the repository
root, so that an install carries only what building a site uses: the
plugin install fell from 9.7 MB (343 files) to 2.0 MB (132 files). With it
moved the two contributor tools that keep its copy of `stitch/`:
`library/scripts/sync-stitch.mjs` and `library/scripts/stitch-copy.test.mjs`.
Changed to match: the Pages workflow (paths and copy step), the root
`npm test` globs, `evals/check-skill.mjs`, the library and engine READMEs,
the README and the documentation map. Historical records, plans and run
evidence keep the old path. Checked: 422 root tests, `check-skill`, the
library from a copy (`npm ci`, 54 tests, `BASE_PATH=/storyfolio npm run
build`), and the plugin validated and installed again.
