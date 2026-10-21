# Ada Mensah — local portfolio

Current stage: all ten approved story beats are built in selected Aluminium. Opening/closing words are provisional until the user chooses from the six complete proposals on /wording. Full story: 11.5 screens, one persistent seven-segment 3D fixture.

```bash
npm run local
```

Open http://127.0.0.1:3000/ for the full story and http://127.0.0.1:3000/wording for the three whole openings and three whole closings. Recommendation A/A; no final choice inferred. Restart the local preview after a new production build. Loopback only. The launcher serves the existing build or builds if absent.

- `/projects/mosslink`: contribution, explanations, observation and evidence limits.
- `/cv.html`: printable, downloadable HTML CV; no employer/dates, no PDF.
- `/concepts`: archived concept comparison, separate from main navigation.
- Unknown paths: useful missing-page response with recovery links.

Development: `npm run dev -- --hostname 127.0.0.1`. To refresh the production preview after source changes in this Bash environment: `STORYFOLIO_DIST_DIR=.next-concepts npm run build`. Do not install anything inside the storyfolio skill.

Dependencies are already local. If reinstalling here, `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund`. No extra skills or external assets are needed or authorized.

Use `npm test`, `npm run typecheck`, `npm run lint` and `npm run check` for validation. Cached browser checks here need `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache` and `LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`. Checks write local evidence under checks/. Production preview build is in .next-concepts; set STORYFOLIO_DIST_DIR=.next-concepts for checking it. No browser downloads required here.

Decision notes: docs/story/. SVG/art provenance: public/assets/README.md. Engine content and checks reference: ENGINE.md. Current checks cover the completed chapters and wording proposals; final full-story acceptance follows wording selection. No publishing, hosted origin, legal-compliance claim or mail delivery test.
