# Storyfolio

An agent skill that turns your profile into a portfolio site told as one
long scroll in 3D. Give your agent a resume, a LinkedIn export, GitHub
links or project notes. It reads them, checks every fact with you before
designing anything, then builds a one-page Next.js site in one of three
worlds (a sheet of paper, a map of your places, or a pop-up book), where
each chapter grows out of the last as you scroll.

Invoke it with `/storyfolio` in your portfolio project. It works in six
stops, each ending with your approval: the facts, the world, the
storyboard, the look, your own words, and a checked whole site.

## What it runs, writes and fetches

- **Reads** only the material you point it at. Your facts stay in your
  project: `docs/story/` holds the record of what was decided, and
  `content/` holds what the site shows. Nothing is sent anywhere by the
  skill.
- **Writes** a copy of its engine into your project with
  `node scripts/scaffold.mjs <folder>`, which refuses to overwrite any
  existing file. The copied site is yours and no longer depends on the
  skill.
- **Installs** the site's dependencies with `npm ci` from the site's own
  lockfile (Next.js, React, three.js), and Chromium for its checks with
  `npm run browsers` (playwright-core). Both download from their usual
  public sources.
- **Runs** the site locally (`npm run dev`) and its checks (`npm test`,
  `npm run check`), which build the site and open it in headless Chromium
  on your machine.
- **Links** to the public gallery of the three worlds,
  https://xitij27.github.io/storyfolio/, for you to look at.
- **Never publishes** your site: the agent asks before anything goes live.

The map's land comes from Natural Earth (public domain), bundled in
`engine/stitch/land.json`. The site needs Node.js 22.18 or later with
built-in TypeScript support.

Source, documentation and test records:
https://github.com/xitij27/storyfolio. MIT licensed (`LICENSE`).
