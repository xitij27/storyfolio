# Plain engine implementation and verification, 11 October 2026

This is engineering evidence, not a paid agent evaluation or evidence that
new skill instructions improve an agent's work. The author's request and
the governing changes to the four-stage plan are in the
[stage review](../../../docs/superpowers/plans/2026-10-11-stage-review.md).
The skill and its four planning references remain unchanged.

## Scope

The engine was extracted from V3 at
`163b8ceb302b7b4e5beeff8f1161f4cdc7663b15`, read-only, and made independent
of its personal content and assets. [Provenance](source-provenance.json)
records consulted paths and hashes. The new fixture uses seven generic
cards, three beats, locally generated SVGs and system fonts. No person or
portfolio is represented by this fixture.

The implementation includes the pure story calculations and tests,
formation/camera fitting, within-beat movement, queued face loading,
appearance switching, caption and chapter components, shared controls,
optional custom pieces and lazy extras, keyboard-accessible overlay links,
HTML fallback, reduced motion, context-loss recovery, adaptive quality,
an optional frame meter and a sketch registry. The registry starts empty.
The scaffold preflights conflicts and keeps existing story notes. The
production checker starts and stops its own server and compares rendered
beat IDs against the content contract.

## Environment and reproducibility

The installed host Node reports 22.22.1 but lacks native TypeScript support.
Verification uses a standard Node 22.22.1 binary installed under
`/tmp/storyfolio-node-check-20261011/node_modules/.bin`. The isolated final
scaffold is `/tmp/storyfolio-engine-acceptance-20261011`. Its dependencies
come from the committed lockfile, not from a changed V3 checkout. npm is
9.2.0. Chromium is the browser installed for Playwright Core 1.64.0.
The temporary Node runtime was installed with `npm install node@22.22.1`
in that isolated runtime folder. The engine itself retains no dependency
on that location; it needs a normal Node distribution with native
TypeScript support.

Browser execution uses:

```bash
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu
PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache
```

Export these values before the commands below. On this host Chromium also
needed three OS packages. They were downloaded and extracted locally,
without a system installation; [library provenance](browser-libraries.json)
records the package names and hashes. This is environment setup, not a
dependency bundled into the engine. Builds and browsers required approved
execution outside the workspace sandbox because Next starts processes and
binds a local port. The repository's Git subprocess tests also required it.

The first final-scaffold offline install used the wrong, incomplete default
cache and failed with `ENOTCACHED`. Its network retry filled `/tmp` and
emitted `ENOSPC` extraction warnings despite exiting successfully. That
result was not accepted as a clean install. After preserving matrix 1's
source and removing two disposable verification folders, a fresh
`npm ci --offline --cache=/tmp/storyfolio-npm-cache` completed without
extraction errors in 12 seconds. All three logs are retained. Offline npm's
printed audit total is not current advisory evidence; the separately saved
network audit reports govern the dependency result.

## Failures found and corrected

- The first browser launch lacked OS libraries. `diagnostic-wide/` retains
  that setup failure; it is not a failed product assertion.
- The first rendered diagnostic found that camera bounds needed to include
  a layout's displacement from the origin. Symmetric bounds and modest
  plain-story padding now fit the test object. It also exposed an overflow
  check that counted deliberately hidden overlay links.
- Matrix 1 completed 14 of 15 checks. Its only automated failure was a
  deliberate no-JavaScript CSP rejection of a Next script preload. The
  checker now permits precisely that request type, origin, path and reason;
  regression checks retain failures for unrelated scripts, styles, images,
  HTTP errors and network errors.
- Visual review caught arrival behavior the automatic assertions missed:
  floating-point easing could leave a frame short of an exact beat,
  captions faded in late, and the chapter rail used a separate observer.
  The easing now snaps within a tiny threshold, caption entry finishes at
  scene arrival, and the rail follows the shared scene frame. A regression
  reproduces the exact-boundary error.
- A dark phone face showed small rendering artifacts. Increasing the
  face separation did not remove them, nor did a negative face depth bias.
  Live renderer and pixel probes isolated an MSAA interaction with the
  supporting boxes' thin sides. A small positive depth bias on the box
  material removes the speckles while preserving antialiasing. The
  ineffective face bias was removed. The
  [diagnosis](phone-artifact-diagnosis.md) retains measured evidence and
  explicitly retracts an initially mistaken visual interpretation of the
  shadow test. The renderer has 24-bit depth, not the hypothesised 16 bits.
- The independent [code review](code-review.md) found duplicate headings
  with multiple beats per chapter and an animation-error isolation gap.
  Those cases are checked separately from the default three-beat fixture.
- The scaffold treated `--help` as a destination. It now prints usage and
  rejects unknown flags without writes. The accidental folder was verified
  as an exact engine copy before removal. [Tooling record](tooling.md).

Matrix 1 and its complete bounded source snapshot are retained, together
with the original diagnostics. Matrix 2 was interrupted with process exit
143 after 13 completed manifest cases. Its detached keyboard case finished
afterward with a passing report; the failed-extra case never started.
Its manifest remains incomplete. The orphaned server on port 41533 was
identified and stopped specifically, without terminating unrelated
processes. The interruption's cause is unknown. Matrix 2's full source
snapshot is also preserved and matches its hash manifest.

These are earlier results, not acceptance
evidence for subsequent edits. Original per-shot reviews are in
[light](visual-light.md), [dark](visual-dark.md),
[reduced motion](visual-reduced.md) and [fallback/interaction](visual-fallback.md).
Matrix 2 reviews are [light](visual-final-light.md),
[dark](visual-final-dark.md), [reduced](visual-final-reduced.md) and
[fallback/interaction](visual-matrix-2-fallback.md). Historical diagnostic
images are covered by [the first visual review](visual-diagnostics.md),
the phone diagnosis and this record. The three
`diagnostic-face-offset/dark-phone/` images were inspected: opening and
closing fit and remain readable, but the middle face still had speckles.
That failed visual attempt was not accepted despite its automatic pass.

## Dependency outcome and limitations

The [dependency review](dependency-review.md) explains why inherited pins
were updated before verification. The current network audit reports no
production vulnerabilities and five affected development package nodes
in the unpatched braces lint dependency chain. ESLint 9.39.4 also emits an
unsupported-version warning. Neither is hidden by a forced override.
This is a bounded dependency review, not an application security scan.

This engine checkpoint cannot establish the quality of a complete
portfolio, support for every custom shape, isolation of two populated
sketches, browser compatibility beyond the tested Chromium, or physical
phone frame rate. The shipped skill still stops at a storyboard. Stage 3
needs an approved engine, a complete fictional fixture, a clearly non-sheet
object, a fixed build protocol and failure-backed instructions. Live privacy
enforcement and general existing-portfolio review remain separate open
work. The author must scroll the actual site before Stage 2 is complete.

## Final verification

The derivative [fault fixture](fault-fixture/source-hashes.json) adds a
second beat to the opening chapter and replaces the sample extra's frame
callback with an intentional synchronous throw. Only those four changed
source files are stored beside its complete hash manifest. The first
injection left unreachable sample code and failed TypeScript narrowing;
`typecheck-fault.log` preserves that fixture-construction error. Replacing
the callback body fixed the fixture; its type check, lint and units pass.

The [fault probe](fault-probe/manifest.json) passes both selected cases.
Both report four expected beat IDs, one `h1` and no duplicate IDs. The wide
report records the exact guarded-error warning, a live scene and one canvas
with no errors. All 16 images were reviewed: the fan remains after the
extra disappears, and the scene reaches the closing stack. The no-JavaScript
case retains the complete four-beat text and static diagram. See the
[per-image review](visual-fault-probe.md). `useExtraFrame` protects synchronous
callbacks registered through that API. Raw third-party frame subscriptions,
timers and asynchronous callbacks are outside that guarantee, as documented.

The final repository suite passes **189 tests**, including the existing
evaluation harness tests, engine calculations, boundary validation, guarded
extra callbacks, checker helpers and scaffold conflict/CLI cases.
`node evals/check-skill.mjs` passes with the unchanged 687-word skill and
four references; `node evals/check-people.mjs` passes for 17 people.
The final staged whitespace check passes with
`git -c core.whitespace=-blank-at-eof diff --cached --check`. The ordinary
staged check flags trailing blank lines in raw logs and three engine files;
those bytes are retained to preserve the exact checked sources and evidence.
No other whitespace problem remains. V3 is still clean at its original revision.
The pre-engine handover and original proposal body remain verbatim.
The [final consistency record](final-verification.json) also confirms all
79 scaffold source files match, current Markdown targets resolve, and no
em dashes were introduced. Verbatim archive links deliberately retain
their original `docs/` base, documented in the history index.

The acceptance scaffold also passes `npm run typecheck` and `npm run lint`.
The engine-only test log reports 14 passing test files under the sandbox's
runner; the full repository run outside it reports the individual 189-test
total. The final source manifest matches every retained engine file,
including the dependency lock. The relevant commands are:

```bash
node skills/storyfolio/scripts/scaffold.mjs /tmp/storyfolio-engine-acceptance-20261011
# In that scaffold, after exporting the environment above:
npm ci --offline --cache=/tmp/storyfolio-npm-cache
npm test
npm run typecheck
npm run lint
npm run check -- --out=/home/kshitij/projects/storyfolio/evals/engine/plain-story-1/matrix-3
# From this repository, with the standard Node on PATH:
node evals/check-skill.mjs
node evals/check-people.mjs
npm test
```

The offline cache is an environment convenience after a successful network
installation. A new machine uses ordinary `npm ci` and `npm run browsers`.
The final `check` performs its own fresh production build. It is not a
`--skip-build` or selected-case acceptance claim.

The final [matrix 3 manifest](matrix-3/manifest.json) records a fresh
production build and **15 of 15 passing browser cases**, completed from
00:37:12 to 00:42:58 UTC on 11 October. It has no failed assertions or
unexpected request errors. All **73 screenshots** were individually opened:
[15 light](visual-acceptance-light.md),
[15 dark](visual-acceptance-dark.md),
[18 reduced-motion](visual-acceptance-reduced.md) and
[25 fallback/interaction](visual-acceptance-fallback.md).

The stationary reduced-motion comparisons pass 18 of 18. Look switching
and Back preserve the checked position, unrelated query and fragment.
The overlay can be reached by keyboard with a visible focus outline.
An intentionally blocked lazy extra leaves the core canvas and complete
text usable. Actual WebGL context loss leaves the scene-off HTML fallback
with zero canvases. Its renderer emits a loss-extension warning during
teardown, retained in the report; the recorded loss probe itself reports
support and successful fallback. Expected chunk-load warnings are also
retained. Keyboard coverage establishes focus and reachability, not
activation of every possible custom link.

The final dark phone face is clean after the box-material bias, with the
failed face bias removed. The saved
[pixel comparison](phone-acceptance-pixels.json) changes 26 dark pixels in
the affected blank interior to zero. Remaining presentation observations
are modest: pale stack edges give a weak depth cue; fan labels overlap,
especially on a phone; and exact wide arrival samples can place secondary
notes below the fold until the caption settles. Primary captions remain
readable and the full notes and links appear on further scrolling. These
are recorded observations, not failures hidden by the automatic checks.

## Author scrolling review

At the implementation checkpoint this was **ready for review, not Stage 2
complete**. The existing
[Task 9 gate](../../../docs/superpowers/plans/2026-10-11-stage-2-engine-stage-3-build.md#task-9-prove-it-and-stop-for-the-author)
requires the author's actual desktop and phone scrolling approval before
Stage 3. No simulated reply or headless viewport supplies that approval.
The author's subsequent review is recorded below.

The verified production build is running at **http://localhost:3010/**,
or **http://localhost:3010/?fps** for the frame meter, bound to `0.0.0.0`.
It was started from `/tmp/storyfolio-engine-acceptance-20261011` with:

```bash
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH npm run start -- --hostname 0.0.0.0 --port 3010
```

This deliberately previews the tested production build rather than a new
development compilation. It is a local, temporary process and stops when
its host/session stops. A physical phone needs network access to this host;
physical-phone access and frame rate have not been measured. If the
temporary folder is gone, scaffold again, install, build and start using
the engine README. Record the author's words and any ensuing fix/rerun in
this repository. No release, deployment, push or paid evaluation
conversation has been made in this piece of work.

### Author approval, 11 October 2026

The author said, "also yes the local preview works fine". Asked, "Does
“works fine” mean you’ve reviewed the scrolling on both desktop and a
physical phone and approve the engine for Stage 3?", they answered:

> Yes, both checked; proceed

**Stage 2 is complete.** The author reported no defect or requested change.
This is desktop and physical-phone scrolling acceptance; no numerical
phone FPS result was supplied. Existing engine checks remain unchanged.
The [approval record](../../../docs/history/2026-10-11-engine-approval.md)
preserves the exact exchange and the scope of the next stage.
