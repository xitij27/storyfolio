## The plan, in full

**Concept:** scrolling down the site mirrors fermentation — raw and discarded at the top, held and watched in the middle, becoming something at the bottom. The 3D isn't decoration; everywhere it appears, it's standing in for a real object from the kitchen (a jar, a cupboard door, a logbook, a zine).

---

### 1. Opening
**Content:** her name, "Head Chef, Saltmarsh," one line on fermentation and whole-vegetable cooking.
**3D:** a cluster of backlit glass jars, amber liquid with a slow idle sway, light refracting through them. Camera drifts gently with mouse/tilt.
**Click:** nothing required — a scroll cue (styled like a tape label) nudges you down; clicking it also advances.
**Phone / no-3D:** the jar cluster becomes a still, high-quality photo-real render with a slow CSS light shimmer instead of a live camera; no interaction lost, since there's nothing to click here anyway.

### 2. The philosophy
**Content:** her line about most of what she cares about happening before service — the trim, the whey, the stems, the bones.
**3D:** not 3D — a scroll-scrubbed image sequence (real trim transforming into a plated dish, frame tied to scroll position), with the text revealing word by word over it.
**Click:** nothing.
**Phone / no-3D:** same sequence, shorter (fewer frames), snapping between 4–5 states instead of scrubbing continuously; with reduced motion on, it's just a before/after pair of stills.

### 3. The jar wall — centerpiece
**Content:** the real larder, built from her own larder/label photos.
**3D:** full WebGL wall of individually placed jars; scrolling pans the camera sideways along the wall, like walking past it.
**Click:** tapping/clicking any jar opens a small card with its actual ferment log entry — start date, salt %, check schedule, ready date, what it's for. Closing the card returns you to the wall.
**Phone / no-3D:** the wall becomes a horizontally swipeable row of jars (same photos, same tap-to-open log card), no camera engine — same information, lighter render.

### 4. The koji room
**Content:** the cupboard everyone asks about.
**3D:** a cupboard door whose opening is tied to scroll progress — opens to reveal... a cupboard, one photo, one honest line.
**Click:** tapping the door also opens it directly, for anyone who doesn't scroll-linger.
**Phone / no-3D:** the "open" is a straightforward CSS transform rather than a 3D model — this one was always lightweight by design, so there's no real fallback needed, just a tap-to-open on touch.

### 5. The prep list & the ferment log
**Content:** what actually runs the kitchen day to day; the menu is written last, not first.
**3D:** none — a logbook/index-card treatment: a page turns or a card flips as you scroll, showing a couple of real log entries.
**Click:** next/previous arrows let you flip through a few example entries by hand, not just on scroll.
**Phone / no-3D:** identical — this section was never WebGL, it already works the same on every device.

### 6. The numbers
**Content:** 14kg → 5kg a week (whole kitchen, prep and plate waste, weighed over one month in 2023, bones excluded because they go to stock), supplier list 31 → 12, 40+ ferments on rotation, two apprentices a year since 2023. All "we."
**3D or motion:** a jar/vessel silhouette that visually empties as the 14→5 figure counts down while scrolling; other numbers count up in place.
**Click:** hovering/tapping the waste figure reveals the one-line methodology note, so the number is never shown without its caveat.
**Phone / no-3D:** the emptying jar becomes a simple animated fill-level bar; numbers still count on scroll, just via CSS/JS rather than a rendered object.

### 7. The dishes
**Content:** gallery from Priya Nair's restaurant photography, credited to her; note that the menu changes weekly.
**3D:** no WebGL — an editorial image grid with parallax (images drifting at slightly different scroll speeds) and a subtle tilt-on-hover for depth.
**Click:** tapping a dish opens it larger with a caption and, where you want it, what rescued ingredient it came from.
**Phone / no-3D:** parallax reduces to a simple fade-in; tilt-on-hover drops out entirely on touch (there's no hover), tap-to-enlarge stays.

### 8. Where it comes from
**Content:** the grandmother's ogiri pot and the two fermentation books, Leeds Kitchen College, Brassica, the Fjaerland stage (ten unpaid weeks — washing jars, labelling, helping on two batches of garum), Corn Exchange, Head Chef at Saltmarsh from September 2022.
**3D:** a hand-drawn-feeling route line (SVG) that draws itself as you scroll, connecting markers.
**Click:** tapping a marker opens a short caption — this is where Fjaerland gets its accurate, modest description rather than sounding like a research post.
**Phone / no-3D:** the line still draws (SVG is cheap everywhere); markers stack vertically instead of along a wide route.

### 9. Brine, the zine
**Content:** four issues.
**3D:** covers fan out like a hand of cards as the section comes into view.
**Click:** tapping a cover "opens" it with a page-turn animation into a couple of spreads with pull-quote text.
**Placeholder note:** until Olu agrees to use his drawings, covers show as plain type/colour blocks with pull-quotes only — built so his art can drop straight in later without rebuilding the section.
**Phone / no-3D:** the fan becomes a simple horizontal swipe between covers; page-turn becomes a plain cross-fade.

### 10. Teaching
**Content:** the apprentice programme, the first-Monday workshops, Callum's quote.
**Motion:** understated — his quote slides in like a handwritten note card; no heavy 3D here on purpose, this section is about people, not spectacle.
**Click:** a workshop date indicator; open item below on how booking should actually work.
**Phone / no-3D:** identical, nothing to degrade.

### 11. Sunday Pot
**Content:** the Sunday hot meal from restaurant surplus, co-founded 2021.
**Motion:** soft fade/parallax only — kept quiet deliberately, so the spectacle of the site doesn't crowd out a volunteering story.
**Click:** none unless you want a "get involved" prompt — flagging this as an open question below rather than inventing a donation link.
**Phone / no-3D:** identical.

### 12. Three doors, then credits
**Content:** apprenticeship applicants / food writers & press / workshop bookings, each a distinct, clearly labelled path — no "hire me" framing anywhere.
**Motion:** the three panels stagger in lightly as you reach them.
**Click:** each opens its contact path (open question below on mailto vs. a simple form).
**Footer:** credit to Priya Nair for restaurant photography, credit to Olu once cleared, your own photos marked as yours.
**Phone / no-3D:** three panels stack vertically; everything else identical.

---

## The look

- **Palette:** a dark, dim-dining-room ground (near-black/charcoal) so the amber of brine, jar glass, and the photography itself carry the light. Accent colour pulled sparingly from real ferments — turmeric amber, beet red, cabbage-brine green — used like ingredients, not a logo system. Exact values are worth tuning once we're looking at real photos against real type, so treat these as direction, not final hex.
- **Type:** an editorial serif with some character for headlines (menu/zine feeling), a plain highly legible sans for body text, and a handwritten/masking-tape label style reserved only for jar labels, log entries, and captions — so it reads as a kitchen convention, not a design flourish.

## Phone and without 3D, overall

- Nothing on the site depends on 3D to be understood — every WebGL moment (jar wall, hero jars) has a described, working non-3D equivalent above, so the information and story survive even with JavaScript partially failing.
- `prefers-reduced-motion` is respected globally: scroll-scrubbed sequences collapse to a handful of snapped states, parallax and camera moves turn off, counters still land on their final number without the animated count.
- WebGL loads only after a capability/performance check; low-power or unsupported devices get the static-image versions by default, not a stripped-down 3D attempt.
- Everything is single-column on phone, tap targets sized for touch, images served at phone-appropriate sizes.

## Everything else the site needs

- **Content clearances still open:** Olu's permission for his drawings; a face-check pass on all ~60 restaurant photos and your phone photos before any go in a gallery or on the jar wall; a scan for visible supplier prices in any photo background.
- **Still need from you:** how workshop bookings should actually work (email, a simple form, a calendar tool) and how apprenticeship applications should come in; whether Sunday Pot gets a "how to help" prompt or stays purely informational; whether you want separate contact addresses for press vs. apprentices vs. workshops, or one shared inbox.
- **Weekly content:** a lightweight way for you (or whoever) to swap in the week's dish photos without touching code, since the menu changes weekly.
- **Accessibility:** alt text for every photo and jar label, verified contrast on the dark palette, full keyboard access to the jar wall and zine interactions (not just touch/mouse).
- **Performance:** image optimisation/CDN for ~60+ photos, a hard budget on 3D asset size so the hero and jar wall stay fast on a mid-range phone, real-device testing before launch.
- **SEO/meta:** page title/description, a social preview image, structured data for the restaurant and for you as a person (useful for press searches).
- **Privacy:** if any form collects an email (workshop or apprentice enquiries), a short, plain privacy note on what happens to it.
- **Practical:** hosting, domain, favicon, and a credits line that's always visible, not buried.

Say go when you want this built — otherwise tell me which open questions above you want to settle first.
