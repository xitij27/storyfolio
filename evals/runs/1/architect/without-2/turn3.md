Here's the full plan, settled.

## The concept, restated

The site is a wall section. Architects cut through a building to show what it's really made of; scrolling down this site is scrolling through that cut — from outer skin to frame. Every piece of motion is tied to construction or retrofit logic, not decoration. The one true 3D moment (an orthographic exploded axonometric, not a spinning showpiece) is reserved for a wall build-up. To keep it free of permissions, the **hero's wall-section artwork is new, generic artwork made for the site** — evoking the idea, not reproducing a specific practice drawing. The real Calder Court detail, once cleared, lives inside the Calder Court section itself.

## The page, in order

**1. Hero**
Full-bleed. Name, "Associate, Field & Rowe Architects," one line: *"I work on buildings that already exist."*
*3D:* an original layered section graphic (render / insulation / frame / interior) scrubs open as you scroll the first screen — drawn fresh for the site, hers outright, no credit needed.
*Click:* a scroll-cue arrow jumps to the Statement. Nothing else — the hero should feel inevitable, not fiddly.

**2. Statement**
Plain ground, large editorial type, her About paragraph (trimmed). Lines fade in one at a time on scroll.
*3D:* none. A deliberate breath.
*Click:* nothing.

**3. Calder Court**
Framed honestly: concept by the partner; Marta as project architect, technical design through handover — detailing, wall build-up, site.
*3D:* the exploded axonometric of the wall build-up (render → insulation → existing 1960s block → winter garden), each layer sliding into position as you scroll, labelled with leader lines.
*Click:* tap a layer label to jump the view to that layer and read its caption; drag the before/after photo pairs to compare manually (not just auto-crossfade); tap the "modelled, 68%" note to expand one line — *monitoring begins winter 2026*.
*Gated content:* until Tom Reid and the practice confirm, photos and the real drawing sit behind a deliberate placeholder — drawn in the site's own line-work style, labelled plainly ("photograph pending — credit T. Reid / Field & Rowe"), so it reads as intentional, not broken.

**4. Kirk Street**
Lighter, faster, smaller in scale on the page to match the smaller job.
*3D:* none — a simple before/after slider and the section drawing.
*Click:* drag the slider; tap the section drawing to view full-screen.
*Gated* the same way as Calder Court, same placeholder treatment.

**5. A School That Grows**
Presented as what it is: a shortlisted competition entry by a team of four, Marta responsible for structure and sections — credited as such on the page (teammate names still needed from you).
*3D:* none — the six A1 boards as a horizontal filmstrip.
*Click:* swipe or click through the boards; tap one to zoom.

**6. Cabin at Kashuby — the heart of the site**
Entirely hers: design, drawings, photographs, build. No permission gate, so this is the most fully realised section.
*3D:* none strictly, but the richest motion — a scroll-scrubbed time-lapse (first post to last shingle) tied to scroll position, and a hand-sketch that morphs into its CAD counterpart beside it.
*Click:* an explicit scrub handle beneath the time-lapse (for anyone who wants to move faster or slower than scroll allows); thumbnails from a curated set open a lightbox; tap to toggle the sketch/CAD pair instead of relying on scroll alone. A quiet caption carries the influences — her father's workshop, the Swiss timber joints book she's had since nineteen.

**7. Teaching**
Short, plain — one paragraph, Year 2 studio, since 2022, one photograph. About as much space on the page as the role takes in her week.
*3D:* none. *Click:* nothing.

**8. How I Work** *(new section, written for the client, not for other architects)*
A short, demystifying stretch aimed squarely at someone with an old house or a small plot: RIBA stages 0–7, the drawing set in its real order (location, plans, sections, elevations, details, schedules), a closing line about the snag list — the unglamorous proof that someone follows a job to the end.
*3D:* none.
*Click:* tap a stage number (0–7) to expand a one-line description; tap a drawing-type icon to see what it's for.

**9. Practice**
A compact vertical timeline — Gdansk Polytechnic → Brandt Lindgren → Clyde MArch → Field & Rowe (Architect → Associate, Aug 2025) → ARB, 2023. One more echo of the section-cut line running down the page.
*Click:* nothing required; dates and facts sit side by side, readable at a glance.

**10. Contact / footer**
Addressed to the two people who should actually find this site: someone with an old house or a small plot, and a school that needs a guest critic. Direct, warm, specific — not a generic "get in touch" form. The future-own-practice ambition stays as undertone, carried by what the page already says, rather than stated outright, since she's currently an Associate at Field & Rowe and this shouldn't read as competing with that. A mailto link, LinkedIn, Glasgow, ARB registration, plain close.

## Look

- **Ground:** warm paper/off-white, not stark white — closer to limewash than printer paper.
- **Ink:** near-black charcoal, not pure black.
- **One accent:** a muted terracotta/ochre, pulled conceptually from render and winter-garden materials — used only for leader lines, the "modelled" note, link states. Nowhere else.
- **Headings:** a confident geometric/grotesk sans with the directness of lettering on a drawing sheet.
- **Body:** a plain humanist sans or quiet serif — built for reading, not performing.
- **Labels, dates, dimensions:** a monospace, used the way a dimension line is used on a drawing — sparingly, functionally.
- No gradients, no glassmorphism, nothing that would look wrong next to an actual site photo.

## Phone, and without 3D

- The vertical section-cut idea already suits a tall narrow screen.
- Every scroll-bound effect has a lighter twin: the hero's layered graphic becomes a stepped crossfade (3–4 frames) instead of continuous scrubbing; the Calder Court axonometric becomes a tap-through "next layer" stepper; the cabin time-lapse becomes swipe-through frames with the scrub handle doing double duty as a play control.
- Before/after sliders are touch-first by design, so they need no fallback — dragging is the native phone gesture.
- `prefers-reduced-motion` turns every scroll-bound animation into an instant cut or crossfade, site-wide — no parallax, nothing auto-playing.
- On devices without WebGL or with a weak GPU, the exploded axonometric degrades to the same pre-rendered layered artwork with the same tap-through stepper — identical end state, just not real-time.

## Everything else the site needs

**Permissions (before launch, not after):**
- Tom Reid's consent + credit, and the practice's consent, for Calder Court and Kirk Street photographs and drawings.
- Teammate names for A School That Grows, and confirmation of how the practice would like Calder Court and Kirk Street referred to publicly.

**Content still to supply or write:**
- Curated selection from the ~200 cabin photos; a compressed, scrub-ready version of the time-lapse; scans of the six competition boards at legible resolution.
- Final copy: the trimmed About paragraph, Calder Court and Kirk Street narrative text, the Teaching paragraph, one-liners for each RIBA stage and each drawing type, and the contact close.
- Alt text for every photograph and drawing.
- A public contact email to publish (not a placeholder) and a decision on domain.

**Design/engineering groundwork:**
- A consistent "pending" placeholder treatment for gated content, so the site launches looking deliberate rather than incomplete.
- A performance budget: lazy-loading, poster frames for heavy sequences, WebGL feature-detection with the pre-rendered fallback described above.
- Favicon and a small mark, meta tags and a social preview image (using cleared content only — likely the cabin or the original hero artwork, not anything gated).
- Accessibility pass: keyboard access for every slider/lightbox/stepper, contrast check on the palette, captions on the time-lapse.

Once permissions are in motion and you've supplied the content above, I'm ready to start building — say when.
