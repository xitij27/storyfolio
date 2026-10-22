# Review the local runbook spine

Storyboard approved by Dawit on 22 October 2026. This stage implements the opening/library origin, the interactive migration middle, and the closing runbook/contact scene in both material looks. The rest of the approved chapters follow the look choice; final opening/closing wording is still a separate checkpoint.

From site/ run:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

If changing source, build first with `NEXT_TELEMETRY_DISABLED=1 npm run build`, or use `NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1`. Run only one server on the selected port.

- Paper / daylight: http://127.0.0.1:3000/?look=light
- Desk / lamplight: http://127.0.0.1:3000/?look=dark
- Printable CV: http://127.0.0.1:3000/cv
- Self-contained download: http://127.0.0.1:3000/dawit-bekele-cv.html
- Migration detail: http://127.0.0.1:3000/work/migration
- Original concept gallery: http://127.0.0.1:3000/concepts

The look switch preserves scroll, URL fragment and unrelated query parameters. Scroll opens the book, removes the illustrated whole table, moves the migration model and closes the book. Forward / Return / Follow scroll are HTML buttons. Pause 3D switches to locally drawn static equivalents. Reduced motion uses discrete states and explicit controls. Without JavaScript or WebGL, the HTML story, static illustrations, project detail and CV remain accessible. No actual employer diagram, document or command is reproduced.

The CV download is a standalone HTML document with embedded styles and no JavaScript/assets. Its content comes from content/cv.ts. Regenerate after editing those facts with `node scripts/generate-cv.mjs`. Own static drawings regenerate with `python3 scripts/generate-illustrations.py`. Print via the CV page button or browser Print command.

All work is local, no deployment or public domain is configured, and metadata remains noindex. The example email is an authorized mailto link; the site sends nothing. No external fonts, visual assets, analytics, embeds or additional skills are used.

Story notes live in ../docs/story/. Current stage and checks are recorded in handover.md. Do not reuse the superseded resume claims.


## Spine check evidence

Typecheck, lint and 129 engine tests pass. All 14 browser-matrix cases have passing reports across the main run and a separate fresh run of dark-reduced, with responsive layouts, reduced-motion stillness, no WebGL/JS, context loss, look switching and failed lazy chapters covered. The tool interrupted the full run, so this is not labelled a single uninterrupted full acceptance run; see checks/spine-review-summary.json. Final full-site acceptance waits for the remaining chapters.

Eight additional functional checks pass in checks/spine-functional/report.json, including actual model changes, pause/enable, HTML CV download/print, useful HTTP 404 and no-JS phone access. The browser made no external requests. Screenshots and visual review sheets are under checks/. Software rendering does not measure real-phone frame rate.
