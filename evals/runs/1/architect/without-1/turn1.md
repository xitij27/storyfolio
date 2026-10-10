I'll read through all the material first to understand who you are and what story the site needs to tell.

Read through the CV, LinkedIn, and image inventory. Here's the plan — no build yet.

## The idea

Marta's own words are the thesis: *"I work on buildings that already exist... the most useful thing an architect can do is make an old building worth keeping."* That's not a tagline, it's the whole site. Everything — the retrofit work, the church-hall conversion, even the cabin built by hand with her father — is one person's answer to that idea, at different scales: a 96-flat block, a church hall, a 28m² timber shed.

So the site isn't "architect portfolio, now with 3D." The 3D moment should come *from* her actual drawings — specifically the 1:5 wall build-up detail at Calder Court. An exploded axonometric of a real retrofit wall (existing masonry, new insulation, new render, winter garden glazing) assembling in space as you scroll is a WOW moment that's bespoke to her, not decoration bolted onto a template. That's the one big set-piece. Everything else stays quieter so that moment lands.

Rhythm matters more than density: loud moment → quiet → loud moment → quiet. Alternating spectacle with stillness is what makes it feel considered rather than demo-reel.

## The scroll, top to bottom

**1. Opening**
Full-bleed photo (Calder Court after, or the cabin frame against the sky). Name, "Architect, Glasgow." A single scroll cue. No logo lockup, no animated intro screen — just the work, immediately.

**2. The thesis**
A still, text-led beat. Her "I work on buildings that already exist" statement set large, with a very slow, subtle drift on a timber-grain or render-texture background. This is the only thing that needs to be read before anything else — it's the frame for everything after.

**3. Work index**
A simple list, not a grid of cards: Calder Court, Kirk Street, A School That Grows, Cabin at Kashuby — each with year and one line. Hovering/tapping swaps a thumbnail in the background. This is the spine people scroll back to.

**4. Calder Court — the flagship**
- Before/after photo pair, scroll-controlled wipe (not a drag slider — tied to scroll position so it feels inevitable, not gimmicky).
- Big stat line: 96 flats, 1960s deck-access block, 68% less heating demand.
- **The set-piece**: the 1:5 wall section exploding into its layers — existing block, insulation, render, winter garden — as you scroll through it, then reassembling. This is the one moment that justifies "3D."
- Heating-demand diagram rebuilt as a simple animated before/after chart rather than a static image.
- A filmstrip of the 14 photographs.
- Credit: "Photographs: Tom Reid, for Field & Rowe" — visible, not buried.

**5. Kirk Street**
Deliberately quieter. The church hall section drawing draws itself in as a line animation on scroll. One photo pair. No exploded axonometric here — this project doesn't need it, and giving it the same treatment as Calder Court would flatten the pacing.

**6. A School That Grows**
Competition work, unbuilt — treated as diagrams, not photography. The six A1 boards as a horizontal flip-through nested inside the vertical scroll. Framed clearly as "shortlisted, 2024" so it doesn't read as a built project.

**7. Cabin at Kashuby — the personal heart**
A tonal shift: warmer, slower, more handmade-feeling. This is hers, built with her father.
- The timelapse of the frame going up, scrubbed by scroll position rather than autoplaying — you build the cabin by scrolling.
- A hand sketch dissolving into its CAD equivalent — hers both ways, drawn by hand then redrawn in CAD.
- A loose, diaristic scatter of photos from the ~200 (not a rigid grid — different scroll speeds per photo, like laying prints out on a table), with a one-line caption: 28m², timber frame, built with her father, 2021–2022.

**8. Teaching**
Short and plain. Clyde School of Architecture, Year 2 studio, since 2022. No animation needed — it's a credential, not a spectacle, and the site needs a few moments like this to breathe.

**9. Practice history / CV**
A simple typographic timeline: Brandt Lindgren (Gdansk, 2017–19) → Field & Rowe, Architect → Associate (2020–present) → ARB registered 2023 → MArch, Clyde School → BSc, Gdansk Polytechnic. No cards, no icons — just a confident list, like a CV she'd actually hand someone.

**10. Close**
Returns to the opening line — "the most useful thing an architect can do is make an old building worth keeping" — as a bookend. Email contact only. No contact form; this isn't a sales page.

## Colour and type

**Colour**: built from the materials she actually works in, not an invented brand palette — limewash white, timber oak, slate/stone grey, and one warm accent pulled from the heating-demand diagram (cold blue → warm amber for before/after) used sparingly so it means something when it appears. Dark backgrounds reserved for the cabin section to mark its tonal shift from the professional work.

**Type**: a restrained grotesk/neutral sans for everything (reads like a planning document, not a startup landing page), paired with a technical monospace for captions, dimensions, and credits — echoing annotation text on a drawing. No display/script fonts; the restraint is the point.

## On a phone

- The exploded wall-section animation is replaced by a simpler layer-stack reveal (same story, far less GPU cost) — mobile shouldn't try to do a cut-down version of the desktop effect, it should do its own version of the same idea.
- Scroll-scrubbed timelapse becomes a muted autoplay loop with tap-to-scrub.
- Horizontal board flip-through becomes a swipeable carousel.
- Hover-triggered thumbnails in the work index become tap-triggered.
- `prefers-reduced-motion` gets a real fallback everywhere, not just on mobile — crossfades instead of scroll-scrubbing, no exploded geometry, same content and order.

## What else it needs before building

- **Actual files.** Right now I have descriptions, not assets — the 14 Calder Court photos, the 8 Kirk Street photos, the wall detail drawing, the heating diagram (ideally the underlying numbers so it can be a real chart, not an image), the ~200 cabin photos, the timelapse video, the hand/CAD drawings, and the six competition boards. The plan above depends on specific real assets (the wall section, the timelapse) carrying the "wow" — I'll need them, or at least a usable subset, before I can build those moments.
- **Photo credit terms** — confirm how Tom Reid wants to be credited (per-photo vs. one colophon line) before this goes live, since it's someone else's work being published.
- **Scope decision**: this reads as both a career site (ARB, CV, teaching) and a personal/craft piece (the cabin). Worth confirming that's intentional before I weight the design toward "practice" vs. "personal maker" — right now the plan treats them as equally load-bearing, bookended by the same thesis.

Let me know if you want to adjust the balance of any section, and send over what assets you have — then I'll move to building.
