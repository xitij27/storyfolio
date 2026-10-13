# Ada Mensah — local spine and appearance review

From this folder, run `npm run dev`, then open:

- http://127.0.0.1:3000/?look=warm — Warm bench
- http://127.0.0.1:3000/?look=dark — Instrument dark
- http://127.0.0.1:3000/?look=lab — Clean lab

Use the appearance buttons to change the look without losing your scroll position. Current main story is the approved opening, observation and ending spine. The remaining seven beats follow the user's look choice; opening/closing words are provisional until the later wording review.

Supporting pages are working:

- /projects/mosslink — complete project facts, explanatory local drawings and evidence limits
- /cv — readable/printable corrected CV
- /downloads/ada-mensah-cv.html — standalone offline-readable/printable HTML download
- Any missing address — useful 404 with ordinary navigation

Original explanatory fixture SVG, local raster share preview and site icon are present. metadataBase is a loopback preview origin, with no public canonical URL. No publishing or external crawler verification. No mail sent; ada@example.com is the public example contact. No PDF generated.

Development binds to loopback. scripts/local-only.mjs blocks remote development fetches before I/O; .env.local disables telemetry and registry lockfile patching. System fonts and local assets only. Original concept sketches remain at /sketch/fixture, /sketch/enclosure and /sketch/probe.

For this environment's browser checks:

```bash
NODE_OPTIONS='--import ./scripts/local-only.mjs' NEXT_IGNORE_INCORRECT_LOCKFILE=1 PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu npm run check
```

The production matrix builds, starts/checks/stops its own local server. scripts/review-spine.mjs adds bidirectional transition captures, supporting-route/download/print/metadata checks against a production build. It also starts/checks/stops its own server. Story records are in ../docs/story/.
