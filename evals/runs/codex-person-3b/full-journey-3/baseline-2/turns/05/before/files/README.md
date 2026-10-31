# Dawit Bekele — local portfolio

The working Next.js site is in `site/`. No deployment is configured.

```bash
cd site
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. Dependencies have been installed from the local npm cache. Do not download assets or add skills.

The concept is accepted: sheet/map/sheet/book/sheet/sheet/(no testimonials)/sheet. The storyboard in `docs/story/storyboard.md` is approved. Whole-site Night, Daylight and Blueprint looks are ready at `/preview?look=night`, `/preview?look=daylight` and `/preview?look=blueprint`; the actual look choice is pending. Next come detail pages/CV, wording choice and final review. Requirements and confirmed facts are in `docs/story/facts.md`; the current direction is in `docs/story/concepts.md`; continuation notes are in `docs/story/handover.md`.

Checks, from `site/`: `npm test`, `npm run typecheck`, `npm run lint`, `npm run check`. Browser reports and screenshots are written under `site/checks/site/`.

Appearance-specific browser checks, after a production build: `cd site` and `node scripts/looks-check.mjs`. This checks all three complete looks on desktop and phone, short-screen book joins in both directions, named navigation, appearance switching and no-JavaScript preview access. Reports go under `site/checks/looks/`.
