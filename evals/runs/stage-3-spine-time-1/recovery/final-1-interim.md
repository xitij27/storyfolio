# Whole-site check of turn 6: interim record

21 October 2026. All nine units have run; the screenshot review and the
verdict are still to come. This is not a pass.

## How it was measured

[binding-6.json](binding-6.json) binds turn 6's closure-time snapshot
through the generalized [recovery loader](binding-lib.mjs), with the
agent's own `STORYFOLIO_DIST_DIR=.next` in the measurement environment as
the author [decided](../../../../docs/history/2026-10-21-final-check-build-folder-decision.md).
[targets-6.json](targets-6.json) lists the ten beats, Opening A and
Closing A as whole beats ([selection record](wording-selection-6.json)),
in-beat links, assets, records, eight extra pages and the focus-only skip
link. The [reconstruction](final-1/setup/reconstruction.json) and one
offline install closed normally.

## Units

| Unit | Worker result | Supplemental audit | Originals |
|---|---|---|---|
| build | pass: typegen, typecheck, lint, build; every required file present | pass | 0 |
| desktop | pass, no problems | pass | 139 |
| mobile | pass, no problems | pass | 119 |
| short | pass, no problems | pass | 139 |
| reduced-motion | pass, no problems | pass | 105 |
| no-webgl | pass, no problems | pass | 55 |
| no-javascript | pass, no problems | pass | 55 |
| context-loss | pass, no problems | pass | 55 |
| auxiliary | every page passes; unit fails the build-identity rule | fails on the unit's exit code 1 | 10 |

Every unit closed with its source unchanged, the originals preserved and
its evidence bound. The frozen policy also reports "final beat count 10,
normal scope 12 to 22", expected under the author's ten-beat exception.

## The auxiliary failure

All eight extra pages pass on desktop and phone with the expected status:
Mosslink, the CV as page and download, the 404, the share image, the
icon, and the wording and concept archives. The worker then failed:
"Unknown response-cache metadata layout:
server/route-cache/APP_ROUTE/.../icon.svg.meta". The frozen
[cache rule](../../stage-3-completion-2/full-journey-measurement/cache-identity.mjs)
accepts only runtime promotions of prerendered pages (`APP_PAGE`).
Serving the agent's `icon.svg` and `opengraph-image.png` route handlers
wrote four `APP_ROUTE` files.

Root's diagnosis, against the reconstruction's `.next`: no existing build
file changed or disappeared in any unit. Each `APP_ROUTE` entry's owner
and namespace match the build's own seed, its metadata equals the seed's
except for the added `routeCacheLastModified`, and its body is
byte-identical to the seed body. These are the same promotions the rule
accepts for pages, for route handlers it never covered. The author chose
to [accept the unit on this diagnosis](../../../../docs/history/2026-10-21-final-check-cache-and-review-decisions.md),
disclosed as a checker gap, with no re-run.

## Originals

677 in all: 70 settled beats, 110 mid and end of beat, 162 transition
frames, 305 control trials and 30 other. About 40 were viewed during the
run. The author chose that root view all 677 whole before the verdict.

Observations so far, carried into the verdict: the 3D story reads as an
argument across all ten beats on desktop, phone and short screens;
reduced motion cuts between settled poses; no WebGL, no JavaScript and
context loss fall back to complete HTML with the supplied teaching
drawings. Against that: small face words are mostly unreadable; the
chapter rail sits over the geometry on desktop and worse on short
screens; the scope beat barely changes formation; Observe and Run overlap
at Access; faint pale bands show behind the caption column whenever the
3D layer is on.
