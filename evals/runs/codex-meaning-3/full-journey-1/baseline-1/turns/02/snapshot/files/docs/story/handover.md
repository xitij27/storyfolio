# Handover

Stage: stop 1, source review complete, awaiting factual answers. Do not choose concepts until answers are recorded in facts.md. User requests a working local portfolio, firmware roles, one scroll story and a tangible 3D object from work; no sheets or card collection. Publishing is their decision.

Read: material/cv.md, asset-notes.md, lab-notes.md, runtime-resources.json, external-helper-catalog.json; storyfolio skill, reading reference and engine README. No private correspondence/participant files appeared in listed material. Sources are sparse and contain three claim discrepancies, recorded in facts.md. No actual project photograph, trace or report supplied. Do not invent device geometry as an authentic depiction.

Setup checks performed 22 October 2026:
- `node --version`: v22.22.1; engine requires >=22.18. Native `.ts` file containing a number annotation executed and printed 42.
- `git --version`: 2.53.0. `git status --short`: directory is not a Git repository.
- Neutral page `.local-check/neutral.html` opened with cached Chromium headless shell 1248, local shared libraries and explicit workspace user-data path; dumped DOM matched title/heading and screenshot `.local-check/neutral.png` was opened and visually inspected, showing the neutral heading and paragraph.
- Full Chromium launch failed on profile/crashpad; headless shell succeeded with harmless unavailable DBus/udev warnings. Browser rendering of the actual site/WebGL has not been tested.
- `npm exec --offline --cache /tmp/storyfolio-npm-cache --package=playwright ...` failed ENOTCACHED. This does not prove pinned engine dependencies unavailable. Do not claim packages installed or site exists. No downloads attempted outside offline mode.
- Enabled advertised skills: storyfolio only. Local `.agents` skill listing also finds storyfolio only. External helper catalog describes remote sources observed 12 October 2026, not installed/enabled helpers. No added skill required yet; available engine covers proposed workflow. Network metadata says loopback only; no external availability claims made.

Next: obtain numbered factual answers, record each beside source and retain unanswered questions; then open references/concept.md for three runnable concepts. No concept, storyboard or site yet.

## Continuation: confirmed facts and concept sketches

Ada supplied extensive corrections. All recorded in facts.md under Confirmed answers. Employer/dates/title unconfirmed and excluded; corrected contributions: firmware, state scheduling, fixture; colleague owns PCB/analogue design. Battery projection vs 72-hour run, six of forty bench tested/no customers, preliminary emissions only, unresolved radio observation. Public example email allowed, no mail sending/delivery test. Own fixture photo permitted but absent; colleague diagram prohibited. Teaching SVGs permitted under explicit explanation labels. No extra skill installation. User requests local-only system fonts/no external assets, project page, downloadable printable HTML CV, navigation, preview, icon, useful 404, no invented material. Legal/hosting deferred.

Concept stop: `concepts.md` has three proposals, trade forms, premises and all six self-tests. Choice still pending. Recommendation: bring-up fixture. Next step is record selection, read storyboard reference, propose full page script for approval. Do not interpret “carry on” as selecting an unseen concept or approving its storyboard.

Implementation: supplied engine scaffolded to site/; `npm ci --offline --cache /tmp/storyfolio-npm-cache --prefix site` succeeded (392 packages). Three actual WebGL sketches registered at /sketch/fixture, /sketch/dial and /sketch/rack, comparison at /. Each has opening/middle/ending and custom solid geometry; no card meshes. One provisional appearance. Project page/CV/preview/icon/custom 404 still pending full build. Supplied SVGs copied unchanged, not yet used on sketch faces.

Checks: lint and typecheck passed before last geometry adjustments; rerun recorded below as appropriate. Browser script `site/scripts/check-concepts.mjs` owns local server on 3100, uses cached headless shell with SwiftShader, captures three rests for each concept at 1440x1000 and 390x844, reduced motion. First matrix: WebGL on all six cases; no JS page errors or horizontal overflow. All 18 screenshots viewed in desktop/phone contact sheets; found rack socket fill hidden by carrier face, corrected fill depth; aligned dial pairs in middle; disabled development indicator. Rerun underway. These are concept checks, not production acceptance or real-phone performance.

Local runtime detail: server processes launched in separate command contexts were not accessible by browser in another context; browser script spawns and stops its own server in same context. A framework telemetry request and later a registry version check were blocked by environment. Dev launcher now disables telemetry and uses scripts/local-only.cjs to reject external Node fetches; script applies same preload. Offline cache installation succeeded. Do not claim final site tested/deployed. User start instructions in site/LOCAL-README.md.

Final concept verification update: rerun full matrix passed all six desktop/phone cases with WebGL on, no JS page errors or horizontal overflow. Rack sockets now show six amber / forty total; dial sectors corrected to keep face markers attached. Focused dial rerun passed both sizes; refreshed overview sheets and visually inspected opening/middle/end across all three concepts at both sizes. Lint/typecheck passed. No production acceptance claimed. User can start the sketches with `cd site` then `npm run dev -- --hostname 127.0.0.1`; addresses use port 3000. Check runner's 3100 server is stopped at completion. Await concept selection.
