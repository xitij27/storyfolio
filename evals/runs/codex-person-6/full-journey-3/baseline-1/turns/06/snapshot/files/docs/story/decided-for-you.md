# Decisions made without asking

- Keep all work local, as requested. No publishing, deployment or outbound messages. Change only on explicit user instruction.
- Record source claims and unresolved questions before designing; avoids inaccurate attribution. Corrections belong in facts.md beside their sources.
- Use available local tooling; no additional skill recommended. Storyfolio is the only advertised and locally listed skill. Browser tooling is an environment limit, not a reason to install another skill.

- Scaffold into site/ because root contains the installed engine and scaffold correctly forbids overlapping source/destination. Change by moving the finished standalone site later; docs stay at workspace root.
- Use existing local npm cache in offline mode. No external asset or skill downloads. Reproduce with npm ci --offline --cache /tmp/storyfolio-npm-cache from site/.
- Select whole-sheet world for concept review because actual working documents are central to Dawit's work. Other worlds remain selectable at the concept stop.
- Use list-style illustrative project thumbnails, avoiding generic charts that could suggest fabricated measurements. All illustrations explicitly labelled.
- Omit unconfirmed counts, URLs and official current grade. Use descriptive Platform engineer for opening.

## Storyboard decisions — 2026-11-06

- Seven supplied-sheet beats, nominally 13.3 screens, because there are seven supported chapter types and no testimonials. Change by revising storyboard; no invented content to lengthen it.
- Put the confirmed runbook ownership and 40-team usage in first-screen readable prose: a quick visitor needs proof without completing the scroll. Change the selected proof during wording review.
- Use six native project dialogs rather than separate project pages: fits the requested concise summaries/more-on-click and existing engine. Change to ordinary project pages if later requested.
- Make /cv printable and provide a standalone HTML download, generated from the same content to prevent drift. No PDF library or download service needed. Change format later if requested.
- Use system-ui and the sheet's Georgia/serif stack, retaining the supplied typography and avoiding remote fonts. Look and motion still require user's choice.
- Generate share image and folded-sheet icon locally, with confirmed name/work/proof; omit production domain until publication. Can change their design at look review.
- Make the 404 return status 404 with Home/Work/Contact/CV routes. Helps visitors recover without a search service. Link targets can change with navigation requirements.
- Keep current scene-world code unchanged. Plan to shorten long place labels and keep context in HTML; verify career legibility and transitions before finish. No new operational simulation implied by the sheet's generic illustrative checklists.
- Remove inferred talk venue city during detail work: Rotterdam is Dawit's work location, not an established SRE North venue. Use the event name instead. This corrects the concept prototype's location label without inventing another.

## Look review — 2026-11-06

- Added a separate local /review page to present all nine existing look/move combinations without overlays on the story. It uses the existing /preview route and confirmed person data. Remove app/review/ after design review if desired; it is not linked from the portfolio navigation.
- Preview/review metadata identifies Dawit and requests no indexing. No production domain is invented. The comparison uses plain CSS geometry and existing palette values, with no external assets.
- Recommended Blueprint + Slide for technical paper against navy and smaller camera travel. Did not change the selected look/move: waiting for the user's actual choice.

## Build-out after appearance choice

- Applied user-selected Blueprint + Slide; no new world or scene code. Preserved whole-sheet mix.
- CV page and attachment share escaped body markup generated from confirmed person data; download includes embedded CSS and no script/assets. Print rules hide controls and use A4 margins; ordinary browser printing remains usable without JS. Change layout in lib/cv.ts.
- Local share.png generated from system fonts and CSS sheet geometry using installed browser. OG/Twitter metadata and SVG icon use local assets. No production domain/canonical guessed; external social-service fetch test deferred to publishing.
- Added /wording with three complete opening/closing versions and preview links, recommending A for both. Opening/closing on / remain draft until user choice. Other chapter captions now carry full place history, basic cutover/rollback explanations and illustration labels.
- Shortened globe context labels to confirmed year ranges, retaining full history in caption, to reduce cropping without changing supplied stitch/ code.
- Corrected talk label to SRE North instead of unconfirmed venue city. Kept generic illustrative project diagrams; no invented real telemetry or screenshots.

- Kept illustration labels on scene captions and project tags while removing repeated scene/asset disclaimers from project paragraphs, so the same substantive text also reads naturally in the CV. Shared-credit and measured-scope wording remains intact.

## Finishing pass

- Applied user-selected version A opening and closing directly from the previously reviewed wording constants, with fixed illustration note. Kept review alternatives as an archived local noindex page and updated its status.
- A browser regression check found Back from #made to an empty homepage hash did not reset the sheet. Added a nonvisual ChapterEntry helper at the home-page boundary: bare story URLs become #hello using replaceState, preserving history and forward entries. This makes the opening an explicit navigation target without changing the supplied stitch/ world. Change/remove in components/chapter-entry.tsx; finish-review.mjs verifies Back/Forward.
- Keep the user's actual finished-site review, phone scrolling and real-device performance review pending, as explicitly requested. Automated phone-sized checks and agent screenshot inspection do not count as that review.
