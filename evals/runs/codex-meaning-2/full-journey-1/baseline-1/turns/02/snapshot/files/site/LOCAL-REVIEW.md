# Local concept review

From this directory run `npm start -- --hostname 127.0.0.1` and open http://127.0.0.1:3000.
The production build already exists. After editing, run `npm run build` first.

- /sketch/fixture — bring-up fixture, recommended
- /sketch/samples — six bench-tested sample boards
- /sketch/terminal — projection versus observed-run terminal

These sketches have an opening, a middle and an ending, not the approved final page script or look. The final build will add the Mosslink project page, corrected downloadable printable HTML CV, share preview, icon and useful missing-page page. No publishing is configured.

Read ../docs/story/handover.md for the decision state and factual boundaries.

`node scripts/check-concepts.mjs` starts its own production server, checks the three sketches at desktop and phone sizes, saves screenshots/results in checks/concepts, then stops the server. It uses the locally supplied Chromium cache and library path. No downloads needed. It is a focused sketch check; it does not establish the full final acceptance matrix.
