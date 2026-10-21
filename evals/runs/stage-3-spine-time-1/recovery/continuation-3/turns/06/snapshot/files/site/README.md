# Ada Mensah — local portfolio

Selected: bring-up fixture concept, Aluminium look, Opening A and Closing A. Ten story beats span 11.5 screens with one persistent seven-segment 3D fixture. Actual final user review, including a real phone scroll, remains pending. Nothing published.

```bash
npm run local
```

Open http://127.0.0.1:3000/. The loopback-only launcher serves the existing production build or builds if absent. After changing source, stop the preview, run `npm run build`, then restart it.

- `/projects/mosslink`: contribution, explanations, observations and evidence limits.
- `/cv.html`: printable HTML CV, also downloadable as Ada-Mensah-CV.html.
- `/wording`, `/concepts`, `/sketch/fixture`, `/sketch/sensor`, `/sketch/loom`: local decision archives, outside the main navigation.
- Unknown paths return a useful 404 with recovery links.

Development: `npm run dev`. Production output: `.next-concepts`. Dependencies are already local. If reinstalling here, use `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund`. No extra skills or external assets are needed.

Validation: `npm test`, `npm run typecheck`, `npm run lint`, `npm run check`. Browser checks in this environment use `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache` and `LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`. No browser download is needed. See docs/story/FINAL-HANDOVER.md for acceptance evidence and limitations.

Edit content in content/, supporting pages in app/, and the printable CV in public/cv.html. SVG/art provenance is in public/assets/README.md. Engine reference: ENGINE.md. No publication, legal-compliance claim or mail delivery test.
