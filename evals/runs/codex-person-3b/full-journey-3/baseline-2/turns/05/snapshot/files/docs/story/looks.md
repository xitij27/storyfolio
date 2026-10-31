# Whole-site appearance review

Status: Blueprint chosen. User: ‘Choose the look you recommended from the working alternatives you just showed.’ The recommendation was Blueprint; that selection is now recorded and applied.

## Accepted basis
Dawit approved docs/story/storyboard.md in conversation: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Approval was recorded before this build. The seven-chapter mix remains `sheet,map,sheet,book,sheet,sheet,sheet,sheet` with the empty testimonial chapter omitted.

## Review links
Run `npm run dev --prefix site -- --hostname 127.0.0.1` from the workspace root, then scroll:

- http://127.0.0.1:3000/preview?look=night — charcoal ground, warm cream sheets, amber accent.
- http://127.0.0.1:3000/preview?look=daylight — warm grey ground, light sheets, ochre accent.
- http://127.0.0.1:3000/preview?look=blueprint — deep blue ground, cool pale sheets, amber accent.

All seven chapters use the same facts, accepted mix and ordinary navigation. The ready pop-up book retains its own paper/desk materials in each look. The appearance switcher preserves scroll position, other query values and the fragment. Each appearance is server rendered, so its text also exists without JavaScript. No sample-person query is offered.

Recommendation: Blueprint, for the technical material's cool paper and blue/amber palette. This is a recommendation only, not a selection on Dawit's behalf.

## What changed for the review
- Shared palette-aware header, identity, example mailto and navigation across home and all previews.
- Named chapter links instead of unlabelled phone dots; direct contact/work links and visible keyboard focus.
- An explicit text-view link; expanded server-rendered role/study/practice facts.
- Whole-document and whole-book framing on narrow screens, rather than cropping/panning across the text; long/miniature printed details are available as HTML. Book chapter also has a readable HTML caption.
- Programme proof appears only at the opening, with a surface behind it to prevent light text colliding with pale paper.
- Caption/CTA/rail regions separated; preview appearance controls use the same palette as the rest of the interface.
- Reduced-motion preference freezes idle scene time as well as removing eased scroll catch-up.

## Scope for this stop
This is the complete seven-chapter scroll in each appearance. Existing project detail windows are still provisional. Per building.md, the permanent work pages, operational diagrams, ferry model and CV are built after the actual look choice, followed by three whole-beat opening and closing wording options. No wording choice, final visual acceptance or publishing approval is implied.

No skills, packages, fonts, assets or browsers were installed/downloaded for this turn. Only existing project dependencies, existing engine geometry and cached Chromium were used. Publishing is excluded.

## Verification
Checks and visual reviews are complete, as recorded below. User choice is pending; do not advance to the next stop until it is received and recorded.

Fresh base-site production check passed: `site/checks/site/2026-10-31T03-01-26-640Z/report.json`, 39 pictures and zero automated problems; text fallbacks/links/404 passed and pictures inspected. 184 unit tests, typecheck and final lint passed. An earlier run caught aborted speculative Next Link prefetches; those prefetches were disabled and the successful run is fresh. Per-look screenshots and interaction results follow below when complete.

All three look matrices passed: `site/checks/looks/2026-10-31T03-03-50-827Z/report.json` — 78 chapter/move screenshots, plus 13 short-screen forward/reverse book-join shots and interaction checks. Switching preserved scroll 2394px exactly, `keep=local` and `#worked`; named Work/Contact navigation, separate contact CTA and no-JavaScript preview passed. All scene/move/short screenshots inspected via contact sheets. No final review or actual look choice received.

Visual inspection additionally caught comparison controls obscuring a map label on wide desktop; moved the controls into the wide header. Fresh production build plus 18 targeted opening/map/book/contact screenshots across palettes and widths passed; see `site/checks/looks/header-final/report.json`. Wide views inspected and clear. Short map still needed extra camera clearance beneath its header, so that viewport-specific framing correction is being rebuilt and checked separately; it does not affect the normal desktop or phone camera.

Final short-map correction passed after a fresh production build: `site/checks/looks/short-map-final/report.json`, three 1000×600 palette screenshots, no runtime problems. The medium-width comparison bar is right-aligned and the short wide map camera stands farther back; Amsterdam, Rotterdam and Addis Ababa are now visibly clear of controls/header. Inspected all three corrected views and the phone comparison views. Lint and production TypeScript/build passed. All review options are ready; user choice remains pending.

## User selection
“Choose the look you recommended from the working alternatives you just showed. Please build out the rest. Show me the important wording before you settle it.” This selects Blueprint and authorizes the remaining local build. Opening/closing wording still requires review; no additional skills or publishing.
