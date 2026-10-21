# Ada Mensah — local portfolio

Current stage: approved storyboard, with the opening, Access middle and Record ending built in two finishes. Seven settled beats / eight screens. Command and Observe chapters follow after the user chooses a look. Opening/closing wording is provisional until its later whole-beat review.

```bash
npm run local
```

Open http://127.0.0.1:3000/?look=light for Aluminium or http://127.0.0.1:3000/?look=dark for Anodized. The on-page switch keeps scroll position. Local only, bound to loopback. The launcher serves the existing production build or builds locally if absent.

- `/projects/mosslink`: contribution, explanations, observation and evidence limits.
- `/cv.html`: printable, downloadable HTML CV; no employer/dates, no PDF.
- `/concepts`: archived concept comparison, separate from main navigation.
- Unknown paths: useful missing-page response with recovery links.

Development: `npm run dev -- --hostname 127.0.0.1`. To refresh the production preview after source changes in this Bash environment: `STORYFOLIO_DIST_DIR=.next-concepts npm run build`. Do not install anything inside the storyfolio skill.

Dependencies are already local. If reinstalling here, `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund`. No extra skills or external assets are needed or authorized.

Use `npm test`, `npm run typecheck`, `npm run lint` and `npm run check` for validation. Cached browser checks here need `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache` and `LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`. Checks write local evidence under checks/. Production preview build is in .next-concepts; set STORYFOLIO_DIST_DIR=.next-concepts for checking it. No browser downloads required here.

Decision notes: docs/story/. SVG/art provenance: public/assets/README.md. Engine content and checks reference: ENGINE.md. Current checks cover this staged spine, not final full-story acceptance. No publishing, hosted origin, legal-compliance claim or mail delivery test.
