# Runtime review of the frozen Steve portfolio

Completed on 11 October 2026. These are coordinator observations of the
frozen source in `evals/reviews/steve-source/material/repo`, served locally
from an isolated copy. They are separate from the fixed source-only agent
review and its assessment. No model conversation or judgement was used for
these browser checks. No source change, deployment or factual verification
of Steve's personal claims was performed.

## Findings that the browser confirms

1. **The mobile stage controls hide their names.** At both 390 and 320 CSS
   pixels, only 01 through 06 are visually shown. The name spans measure
   1 by 1 pixels and have `clip-path: inset(50%)`; their text remains in the
   DOM. The current description starts with a stage name, so the chosen
   stage can be identified after selection, but the other numbered choices
   do not tell a sighted visitor what they will show. Consider retaining
   short names in a wrapping layout if direct exploration matters. This is
   a usability recommendation, not a screen-reader failure finding.
2. **Selecting a stage while it plays does not hold that stage.** Selecting
   Frames advanced to Features after 4,549 ms; selecting Review returned to
   Frames after 6,542 ms. These are wall-clock observations of two stages,
   with 50 ms polling, not a benchmark. Pausing and then choosing Features
   held its stage, clock and instrument transform unchanged for 7 seconds.
   Resume restarted movement and advanced to Segment. The controls work as
   implemented; a visitor wanting time to read must discover Pause before
   selecting a stage. Consider holding a manually selected stage, with Play
   available to continue, if reading is the main purpose.
3. **Pause is a small control.** Its rendered button is 32 by 32 CSS pixels
   at 1440, 800, 768 and 390 widths, and 28 by 28 at 320. It is operable in
   this pointer test. A larger touch target would make the reading control
   easier to use on a phone. These measurements alone do not establish an
   accessibility standard violation; no physical touch-device trial was
   performed.

Use `captures/figure-390-settled.png` and
`captures/figure-320-settled.png` for the mobile controls. The numbers,
dimensions, active stages and timing observations are saved in
`runtime-measurements.json`.

## Behavior worth preserving

| Check | Observed result |
|---|---|
| Production build | Vite 8.3.1 completed successfully; `build.log` has output and asset sizes |
| Widths 1440, 390, 320, 768 and 800 | Document width equalled viewport width in every initial measurement |
| Navigation boundary | At 768, the wordmark ended at x239.91, the first nav link began at x278.23, and the final link ended at x736 within the viewport; at 800 the final link ended at x768 |
| Mobile keyboard menu at 390 | Tab reached the skip link, wordmark and menu; Enter opened it; Tab reached Projects; Escape closed it and restored focus to Menu |
| Mobile destination focus | Reopening and activating Projects closed the menu, changed the hash to `#work`, and moved focus to the work section |
| Reduced motion at 390 | Initial segmentation still and clock stayed unchanged for 1.6 seconds; choosing Review changed the still, then held it another 1.6 seconds; Pause was hidden |
| JavaScript disabled at 390 | Navigation remained visibly expanded, the Projects anchor reached `#work`, and the figure retained its segmentation still and description; all six stage buttons were disabled |
| Browser errors | No page errors or failed requests were recorded during the main capture run |

The suspected navigation overflow was not reproduced with the loaded fonts
at 768 or 800. Do not report it as an observed defect. These checks do not
cover zoom, alternate fonts, other browsers or every intervening width.

The first screen is legible in the reviewed desktop and mobile captures.
The figure remains explicitly labelled illustrative. Its value as an
explanation and the lack of direct evidence of Steve's own implementation
remain editorial/source questions, not facts established by rendering it.

## Capture review and limits

The main script saved 14 images. Some `figure-<width>.png` images caught the
source's 200 ms opacity transition immediately after changing the stage:
outgoing and incoming description text briefly overlap. Those captures and
their original measurements are preserved. A separate follow-up waited
400 ms and saved five `figure-<width>-settled.png` images. All five measured
only the selected Segment detail as visible with opacity 1, with the other
five hidden at opacity 0. Visual inspection of the 320 settled image confirms
readable, non-overlapping text. The transient capture is not evidence of a
persistent text-layout defect. `settled-measurements.json` records that
follow-up and hashes its images.

Images inspected directly: desktop 1440 first screen, mobile 390 first
screen, 768 first screen, 320 figure before and after settling, mobile
keyboard menu, mobile JavaScript-off first screen and the reduced-motion
Review figure. Other captures support the saved geometry checks and are
available for inspection; they were not individually visually reviewed.

This is Chromium 156.0.8078.4 through Playwright 1.64.0 on Linux, at device
scale 1. Phone widths are desktop-browser viewport simulations, not physical
phones. No Safari, Firefox, screen reader, touch interaction, keyboard sweep
of the entire page, accessibility conformance audit, performance benchmark,
external link/PDF test, factual claim verification or deployed-site parity
check was performed. In JavaScript-off mode only the segmentation detail is
available in this figure; do not describe all six interactive explanations
as accessible in that mode.

## Isolation and reproducibility

The app source was copied from the frozen material into `runtime/app`.
Only the original site's `node_modules` directory was copied for its Vite
build. No original PDF was opened, and no source in the original site was
edited. `runtime-environment.json` records dependency versions and SHA-256
hashes confirming all 13 frozen source files match their runtime copies
after testing. The original source preservation check is maintained by the
coordinator separately.

Playwright, Chromium and three missing shared libraries were downloaded
only under gitignored `runtime/`. The shared library packages were extracted
locally with `dpkg-deb -x`, not installed as system packages. Their versions
are in `runtime-environment.json`. The small runtime dependency lock is
saved as `runtime-package-lock.json` outside the ignored directory.

The environment initially blocked package/browser downloads with DNS
errors, the preview port with `listen EPERM`, and Chromium startup with an
operation-not-permitted error. Missing NSPR/NSS/ALSA libraries were also
reported before local extraction. The required approved escalated retries
succeeded. `playwright-install.log`, `browser-install.log`,
`runtime-libraries.log`, `server.log` and `browser-capture.log` preserve
command output. The first npm registry failure was returned by the tool,
not redirected to a file: `EAI_AGAIN registry.npmjs.org`; npm also could not
write its default log directory. It preceded the successful saved install.

The app was built with `npm run build` and served with
`npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` from
`runtime/app`. From this observation directory the captures were run as:

```sh
LD_LIBRARY_PATH=./runtime/libraries/extracted/usr/lib/x86_64-linux-gnu PLAYWRIGHT_BROWSERS_PATH=./runtime/browsers node capture-runtime.mjs
LD_LIBRARY_PATH=./runtime/libraries/extracted/usr/lib/x86_64-linux-gnu PLAYWRIGHT_BROWSERS_PATH=./runtime/browsers node capture-settled.mjs
```

The capture scripts and measurements are saved here. The isolated preview
was stopped after verification. No original source fix was attempted, and
these observations do not alter the source-only agent test's evidence.
