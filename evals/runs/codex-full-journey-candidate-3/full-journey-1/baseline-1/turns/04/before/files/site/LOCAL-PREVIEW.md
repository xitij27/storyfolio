# Ada Mensah — local concept previews

This is the concept-selection stage, not the completed portfolio.

From this folder:

```bash
npm run dev
```

Open http://127.0.0.1:3000 for comparison, or:
- http://127.0.0.1:3000/sketch/fixture
- http://127.0.0.1:3000/sketch/enclosure
- http://127.0.0.1:3000/sketch/probe

Each sketch has opening, middle and ending poses driven by scroll, a mobile composition, ordinary email/ending links and a text fallback. All geometry is explanatory; it is not a reconstruction of real wiring or measured evidence. Both neutral engine appearances are available, pending a later final look decision.

Development binds to loopback, uses system fonts/local geometry and preloads scripts/local-only.mjs to reject remote development fetches. .env.local disables Next telemetry and registry lockfile patching. No mail was sent; the contact is an example address. Nothing is published.

Story records are in ../docs/story/. Concept selection and storyboard approval are next. The printable HTML CV, project route, share preview, icon, useful 404 and completed story will be built from the selected storyboard. No PDF or extra project is planned.

Focused browser verification in this environment:

```bash
NODE_OPTIONS='--import ./scripts/local-only.mjs' PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu node scripts/preview-concepts.mjs
```

This starts a temporary preview server, checks all three concepts at desktop/phone sizes, saves checks/concepts/report.json and screenshots, then stops that server. Use npm run dev for your own continuing review.
