# Look and movement review — stop 4

Storyboard accepted by user on 2026-11-06: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Sheet world remains accepted across all seven chapters.

## Running comparison

Local /review lists all nine combinations; each link opens the person's entire story at /preview?look=<look>&move=<move>. No external gallery/asset request needed. Preview page and comparison page titles identify Dawit and are marked noindex. Core stitch/ and the page around the actual story remain unchanged.

Looks:

- Night: charcoal ground, warm paper, dark ink on paper and amber accent. Current provisional appearance.
- Daylight: warm grey ground, pale paper, dark ink and orange accent.
- Blueprint: navy ground, cool paper, blue-black ink and amber accent.

Movements:

- Slide: sheet's shapes blend with smaller camera travel.
- Fold: sheet folds into a packet, turns and opens into next shape.
- Swing: camera sweeps around sheet; current provisional movement.

Recommendation: Blueprint + Slide, because cool paper/navy suits the technical working documents and Slide has less camera travel than Swing. This is a recommendation, not a selected default. The initial front page remains night/swing until user chooses.

User decision: pending. Ask for one look and one movement in conversation; merely opening a link is not a choice. No building beyond this stop's previews until actual response recorded, per references/building.md. Current prototype details remain draft; CV, share image/icon, useful 404 and final wording will follow look choice.

## Checks

Production build, lint, typecheck, 187 tests and base site check have passed. Detailed preview inspection in progress; record final results in handover. Images and report from look-review.mjs go under checks/looks at workspace root, separately from engine site check under site/checks/site.

Final preview checks: typecheck, lint and all 187 tests pass. Base site check passes with 0 problems, report site/checks/site/2026-11-06T20-01-20-317Z/report.json (built before a subsequent navigation-only Link fix; final build and targeted visual checks include that fix). Final production build includes /review. Targeted review: all seven holds in each of three looks at 1440×900, 390×844 and 1024×600; 18 forward/backward transition samples across the three moves. Total 81 story shots plus three full comparison-page screenshots. Browser reported no page errors or external requests in the monitored look passes. All story contact sheets and desktop comparison page inspected; existing long scene labels and small text still need final refinement. These are not final acceptance or real-phone performance checks.

## User choice — accepted 2026-11-06

User: “Choose the look and the way the sheet moves that you recommended from the working alternatives you just showed.”

This selects the recorded recommendation: **Blueprint + Slide**. Apply to content/site.ts. User requests rest built, important wording shown before settlement, no additional skills, keep local.
