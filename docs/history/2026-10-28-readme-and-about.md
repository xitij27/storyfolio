# README and the repository's About, 28 October 2026

After the next steps were written down
([record](2026-10-28-what-is-left.md#next-steps-written-down)), the author
wrote, verbatim:

> update the readme and about sections for this repo

## The README

The README still described the skill before the transitions work: three
concepts at stop 2, one object carrying the story, planning that ends at
an approved storyboard, and a status of "two complete test journeys, the
author's review next". The [26 October record](2026-10-26-readme-status-and-badges.md)
had already listed "How it works", "What you leave with" and "four
reference files" as out of date. What changed:

- **A new picture,** [`docs/assets/storyfolio-site.jpg`](../assets/storyfolio-site.jpg):
  four chapters of the made-up sample person Noa Lindqvist's site, shot
  with `engine/scripts/stitch-check.mjs` at 1440x900 against the stitch-2
  copy (`/preview`, mix `sheet,map,book,map,sheet,sheet,book,sheet`, the
  night look, words hidden), 15 shots and 0 problems: hello on the sheet,
  where from on the map, what I studied in the book, what I've made on the
  sheet's wall. The map's "where I've worked" was left out because it
  shows the known collision (a cut label, one building behind another).
  The old concept illustration stays in `docs/assets/` for the record.
- **The opening** says what the skill makes now: a site, not a plan, one
  scroll in eight chapters, each a 3D picture.
- **Project status** as of 28 October: the three worlds and the mix, the
  looks, the person's words, the CV and project pages, `npm run check`,
  the dry run's map finding, and the next test.
- **How it works** has the six stops of `SKILL.md`, the ask-or-decide
  rule, and that a plan alone still stops at the storyboard.
- **"Eight chapters, three worlds"** replaces "A portfolio with a thread"
  (the research paper, tasting menu and incident review concepts), with
  each world's way of telling a chapter and moving to the next, in the
  gallery's own words.
- **Get started** asks for Node.js 22.18 and npm to build, names
  `engine/` and `scripts/` in the folder to copy, and says six reference
  files; the sample prompts ask for a site.
- **What you leave with** shows the site's `content/` files and `app/`
  beside `docs/story/`, and that the site no longer depends on the skill.

Badges, the install routes, the library, where it came from, contribute
and the licence are as they were.

## The About

Set with `gh repo edit` on 28 October. Before:

- Description: "A skill for coding agents: from a person's profile to a
  portfolio site that tells one story"
- Website: none
- Topics: none

After:

- Description: "An agent skill for Claude Code and Codex that turns your
  resume, LinkedIn or GitHub into a portfolio site: one scroll that
  introduces you in 3D, built only from facts you confirm."
- Website: https://xitij27.github.io/storyfolio/transitions/ (the gallery,
  where the three worlds run)
- Topics: 3d, agent-skills, claude-code, codex, nextjs, portfolio,
  portfolio-generator, portfolio-website, resume, scrollytelling, threejs,
  webgl

The About changed on GitHub at once. The README shows there only once
`main` is pushed, which waits for the author's word.
