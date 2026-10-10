## The site, start to finish

### 0. Persistent elements (present throughout, not a "section")

A thin stage marker in the margin on project pages only — a line of RIBA stages 0–7, with the stages covered by her own involvement lit, others dimmed. No numbers overlaid on photos, just a quiet technical strip that updates as you scroll through a project. On non-project pages (thesis, teaching, CV, close) it's absent — it would be noise there.

No sticky nav bar, no logo. A single small "index" mark, bottom corner, that expands the work list on tap/click — the only wayfinding chrome the site has.

---

### 1. Opening

**Content**: full-bleed photograph (Calder Court, after — once cleared; cabin frame against the sky as the launch default since it needs no permission), name, "Architect, Glasgow."
**3D/motion**: none. A static, confident image. Slow, barely-there zoom (parallax of 1, not a flashy push). A single down-arrow cue that fades on first scroll.
**Clickable**: the down-arrow only; scrolling past it is the real action.
**Look**: full colour photograph, name set small and low-contrast against the image — the photo is the hero, not the typography.
**Phone/no-3D**: identical — this section has nothing to degrade.

---

### 2. The thesis

**Content**: "I work on buildings that already exist." — her line, set large, alone, on a plain ground.
**3D/motion**: a very slow, almost imperceptible drift on a timber-grain or limewash-render texture behind the type — the kind of movement you only notice if you look for it. No parallax layers, no camera movement.
**Clickable**: nothing. This is the one section with zero interaction — a deliberate pause.
**Look**: limewash white ground, warm grey type, texture at ~5% opacity.
**Phone/no-3D**: texture becomes a static image; type unchanged.

---

### 3. Work index

**Content**: a plain list — Calder Court (2025), Kirk Street (2023), A School That Grows (2024, shortlisted), Cabin at Kashuby (2021–22). Year and one line each, nothing else.
**3D/motion**: none in the type. On hover/focus, a thumbnail image crossfades in behind the list, swapping per item — the only "movement" here is a 2D crossfade.
**Clickable**: each item is a link that jumps to its project section. This is the site's real navigation.
**Look**: monospace for the years (drawing-annotation feel), grotesk for titles, generous whitespace.
**Phone/no-3D**: hover becomes tap — tap once to preview the thumbnail, tap again (or tap a "view" affordance) to jump in, so a single tap doesn't accidentally navigate away.

---

### 4. Calder Court

**Content**: stage marker shows 4–6 lit, 7 marked "in use — monitoring from winter 2026." Opens on a location plan, then moves through sections and the detail, drawing-set order. Stat line: 96 flats, 1960s deck-access block, 68% less heating demand (modelled). Credit line: concept, a partner at Field & Rowe; project architect, technical design to handover, Marta Kowalczyk. Photography (Tom Reid, for Field & Rowe) included only once cleared — until then, this page runs entirely on drawings and diagrams, which is enough to carry it.

**3D/motion — the signature moment**: the wall build-up detail. Default build is **Plan B**: a schematic redrawn in the site's own line-weight and labelling (explicitly captioned "redrawn from the practice drawing, for clarity" so there's no ambiguity about whose drawing it is), with its layers — existing block, new insulation, render, winter-garden glazing — separating into exploded axonometric as you scroll in, and closing back into a single wall section as you scroll past. If and when the real 1:5 detail is cleared, it swaps in as **Plan A** with no change to the surrounding page.
The heating-demand figure is shown as a small animated chart (built from real numbers, not a dropped-in image) with a "modelled" line style distinct from how a future "measured" line will look once winter 2026 monitoring exists.

**Clickable**: the exploded detail can be scrubbed by scroll, but also dragged/tapped directly to hold on a layer and read its label. The stage marker is inert (display only). If photos exist, a filmstrip of the 14 is swipeable/scrollable independently of the page scroll.

**Look**: cool, institutional — slate grey, limewash white, the one warm amber accent reserved for "after" states (the warm side of the heating diagram, the completed wall).

**Phone/no-3D**: the exploded axonometric becomes a stepped layer-stack that reveals top-to-bottom as you scroll (same four layers, same labels, no 3D rotation/depth, just a vertical reveal) — same story, a fraction of the cost. `prefers-reduced-motion` gets the same stepped version, no scroll-scrubbing, with a plain "next layer" tap instead of scroll-tied movement.

---

### 5. Kirk Street

**Content**: stage marker (whatever stages applied — likely similar 4–6; confirm with her later). Church hall to six flats. Section through the hall. Drawing-led, same photo-clearance caveat as Calder Court. A small handwritten-feeling fragment of a snag list, used once here as a texture detail, not a section of its own.

**3D/motion**: the section drawing draws itself in — a line-by-line reveal tied to scroll, not exploded or three-dimensional. This project is deliberately the quiet beat after Calder Court's set-piece.

**Clickable**: the drawing can be scrubbed back and forth across its own reveal by scroll or by a small scrub handle.

**Look**: same palette as Calder Court, slightly subdued — no amber accent here, since there's no "modelled vs measured" story to tell.

**Phone/no-3D**: the line-reveal becomes a simple opacity fade-in of the finished drawing; `prefers-reduced-motion` shows it static immediately.

---

### 6. A School That Grows

**Content**: competition, shortlisted 2024, team of four. Her contribution — structure and sections — marked clearly on the relevant boards. Framed explicitly as unbuilt/competition work.

**3D/motion**: the six A1 boards as a horizontal flip-through nested inside the vertical scroll — scrolling down moves you through the boards left to right, a sideways page-turn.

**Clickable**: tap/click a board to hold it full-screen and read it properly; arrows or swipe to move between boards once held.

**Look**: more diagrammatic, cooler and flatter than the built projects — no photography, so the palette leans toward the drawing-paper white and ink tones of the boards themselves.

**Phone/no-3D**: the nested horizontal scroll becomes a plain swipeable carousel, one board per screen, no coupling to vertical scroll position.

---

### 7. Cabin at Kashuby

**Content**: fully hers — no clearance needed anywhere in this section. 28m², timber frame, built with her father, 2021–2022. The joinery detail paired with the line about her father's workshop and the book of Swiss timber joints she's had since nineteen. A loose scatter from the ~200 photographs. The hand sketch dissolving into its CAD redraw. The build timelapse.

**3D/motion**: the timelapse is scrubbed by scroll position — you build the cabin by scrolling, frame-accurate, rather than watching it autoplay. The hand-sketch-to-CAD moment is a morph/dissolve between the two drawings, tied to a short scroll range. The photo scatter uses different scroll speeds per photo (a handful drifting slightly faster or slower than the page) to feel like loose prints on a table, not a grid.

**Clickable**: any scattered photo enlarges on tap/click; the timelapse can be scrubbed directly by dragging it, independent of page scroll, for anyone who wants to replay a moment.

**Look**: the one real tonal shift in the site — warmer, slightly darker ground (unbleached timber, not limewash white), to mark this as personal rather than practice work.

**Phone/no-3D**: the timelapse becomes a muted autoplay loop with a tap-to-scrub handle; the photo scatter collapses to a simple staggered grid with no differential drift; the sketch-to-CAD becomes a tap-to-toggle between the two drawings instead of a scroll-tied morph. `prefers-reduced-motion` always gets the tap-to-toggle version, phone or not.

---

### 8. Teaching

**Content**: Clyde School of Architecture, Year 2 studio, since 2022. Given that schools are one of the two audiences this site exists for, this gets real substance: what the studio brief actually asks of Year 2s, and a short statement of approach. Draft line, for her to edit or replace: *"Second-years get a real brief and a real constraint, not a blank site. I ask them to find what's already there before they draw what's next."* (consistent with her own practice, but it's my draft, not her words — flag for her to confirm or rewrite.)

**3D/motion**: none. Deliberately plain — a credentials section, not a spectacle.

**Clickable**: nothing beyond standard text.

**Look**: returns to the limewash/slate palette, closer to Calder Court than to the cabin — this is professional-facing.

**Phone/no-3D**: no change; nothing to degrade.

---

### 9. Practice history / CV

**Content**: a plain typographic timeline — Brandt Lindgren, Gdansk (2017–19); Field & Rowe, Architect (2020–25) then Associate (2025–present); ARB registered 2023; MArch, Clyde School (2019–21, part-time); BSc, Gdansk Polytechnic (2013–17).

**3D/motion**: none.

**Clickable**: nothing.

**Look**: monospace dates, grotesk titles — reads like a CV, because it is one.

**Phone/no-3D**: unchanged.

---

### 10. Close

**Content**: the opening thesis line, repeated, as a bookend. Two short, separate prompts rather than one generic line: *"An old house, or a small plot."* and *"A school, needing a guest critic."* — each sitting above a plain email link. No form.

**3D/motion**: none.

**Clickable**: the email link (mailto). Nothing else.

**Look**: plain, quiet, same ground as the thesis section — ending exactly where the site began.

**Phone/no-3D**: unchanged.

---

## Everything else the site needs

**Assets to gather or confirm**
- Final word from the practice and from Tom Reid on using his photographs (Calder Court, Kirk Street) — until granted, those pages stay drawing-led.
- Final word from the practice on showing the real 1:5 wall-build-up detail (vs. the redrawn schematic the site launches with).
- The underlying numbers behind the heating-demand diagram, so it's a real chart, not a dropped-in image — and the actual monitoring data once it exists, this winter.
- The cabin timelapse video file, a usable selection from the ~200 photographs, the hand sketch and its CAD counterpart, and the section through Kirk Street hall.
- The six competition boards at a resolution that holds up full-screen, with her specific contribution (structure, sections) marked on them.
- Her sign-off on the draft teaching statement above, or her own replacement line.
- Confirmation of how to credit the partner on Calder Court (named, or "a partner at Field & Rowe") and how the team of four should be named on the school competition.

**Technical/production**
- A colophon/credits line somewhere findable (not hidden in a footer nobody scrolls to) crediting Tom Reid and Field & Rowe once their material is cleared.
- Responsive image sizing and lazy-loading throughout — real photography and a timelapse video are heavy; the site needs a performance budget, not just effects that work on a fast laptop.
- `prefers-reduced-motion` support across every motion moment described above, not as an afterthought — each section already has its reduced-motion behaviour specified.
- Meta/SEO: name, "architect," "Glasgow," "retrofit" need to be genuinely findable — this site has to work as a search result for someone with an old house, not just as a design piece.
- Alt text and captions throughout, written with the same precision as the attribution lines (who did what, modelled vs. measured) since the honesty is part of the credibility.
- A simple way to add a project later without rebuilding the drawing-set/RIBA-stage structure from scratch — it should be a pattern she (or whoever maintains it) can repeat.

Once you've confirmed the few open items above (teaching line, partner credit wording, photo/drawing clearance status), I'm ready to start building.
