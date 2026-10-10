# Mina Park — Portfolio Site: Full Plan

## The idea

**Teardown.** The site behaves the way you actually work: strip something down to see how it holds together, then rebuild it better. You did that to the pedal box bracket; you're doing it to the 1984 frame on your garage floor. The motion and 3D on this site come only from things you really have — your bracket's CAD geometry, your own photos — not from decorative stock effects. Visual language throughout: technical drawing / workshop manual, not sci-fi. Blueprint grid, dimension callouts, exploded-view diagrams, grease-pencil annotations.

Governing rule for every section: nothing reads as more finished, more tested, or more senior than it is. The reader is someone screening placement applications with about two minutes, so the key facts must be gettable fast — the cinematic scroll is a layer you can opt into, not a gate.

---

## Page order, section by section

### 0. Persistent top bar
Your name, small. Four anchor links: **Projects / Workshop / Restoration / Contact**. Always present, even while scrolled down, so the two-minute reader can jump straight to anything without scrolling through the story. On click: smooth-scrolls to the section, no page reload.

### 1. Hero
Full-height. Left-aligned text block: "Mina Park — Second-year Mechanical Engineering, Hallam Institute of Technology. Looking for a summer 2026 placement in mechanical or product design." Below it, two buttons: **Download CV** (PDF) and **See the work** (scrolls to Projects).

3D: your actual pedal-box bracket model, rendered small and slow-rotating on a faint blueprint-grid background, parked to the right of the text. It does nothing clever yet — it's just establishing "this is a real part I made," before the explode sequence that comes with its own section. Clicking it does nothing (it's not a button); it's a visual anchor only, so there's no dead-end tap for a mobile user.

### 2. At-a-glance strip
A thin horizontal band, no scroll animation. Three plain columns: **Formula Student** (bracket, CAD + sim, 18% lighter, machining Nov 2025), **Charger** (gear train + housing, 4 min cranking per 1% charge), **Co-op** (Saturday mechanic since 2023). Each links down to its full section. This is the "two-minute" safety net — if someone reads nothing else, they get the real status of everything here, correctly qualified, before any animation.

### 3. Formula Student — the bracket
Scroll-triggered: as the section enters view, the bracket model scrubs apart into an exploded view, tied to scroll position (scroll down = parts separate, scroll up = they reassemble). Mounting points and a dimension line for the 18%-lighter figure label themselves as parts separate. A persistent on-model tag reads "CAD + simulation — not yet machined" throughout the sequence; it does not change or disappear once the bracket finishes exploding, so it can't be misread as "finished" by someone who stops scrolling partway.

Copy, in two clearly separate blocks so they're never conflated:
- **Team context:** Hallam Racing placed 12th of 68 at Formula Student UK, July 2025 — before you joined.
- **Your project:** joined the chassis sub-team October 2025; redesigned the pedal box mounting bracket; 18% lighter in CAD/simulation; machining scheduled November 2025.

Clickable: the model can be dragged to rotate manually (a hint arrow shows this once, then fades); a small "what changed" toggle swaps the dimension labels between "before" and "after" bracket geometry.

### 4. Hand-crank charger
Shorter section, deliberately smaller in scroll length than the bracket — it should feel like a smaller project because it was one. Scroll-triggered: the gear train rotates into view, housing fades in around it. Headline stat sits in large monospace type, not buried: **"4 minutes of cranking ≈ 1% charge."** Copy: first-year design module, group of four, your part was the gear train and housing, it worked badly and that's worth saying plainly.

Clickable: nothing beyond the anchor nav — this section is intentionally simple and doesn't need an interaction to prove the point.

### 5. Workshop / Second Gear Bike Co-op
Hard tone shift, visible immediately: photo texture and workshop light instead of clean CAD lines, signalling "hours logged," not "design project." Structured like your own job card, repeated for one or two real examples if you supply them: **reported** (what the customer said was wrong) → **found** → **parts** → **done** → **test ride**. No bike count anywhere. Role and duration stated plainly: Saturday mechanic, since 2023.

Clickable: if you provide more than one example, a simple "next card" tap/click cycles through them, styled like flipping to the next card in a box — no 3D here, this section is deliberately grounded in photos, not models.

### 6. Restoration — Slow Miles
The longest, slowest section — the emotional spine of the site, because it's your most real material and the one place depth genuinely helps rather than pads. A vertical photo-led scroll sequence, logbook-style, following your actual posts in order: the flat tyre and the decision to buy it anyway → the inventory on the garage floor → stripping the paint → the cracked hub flange under the grease → the seized bottom bracket. Each beat is a real photo plus a short caption pulled from your own writing, not rewritten into marketing copy.

3D here is minimal to none — this section runs on your photographs, which are stronger than a model would be for this content. If you want one 3D moment, the only candidate is a simple before/after slider on a single photo (paint stripped vs. not) — optional, easy to cut.

Clickable: a "read the full post" link out to Slow Miles on each beat, if the blog is live at a public URL (open item below).

### 7. Skills
Plain list, styled like a parts inventory rather than a skill cloud — a small table or tag row: SolidWorks, MATLAB, some Python, lathe and mill (workshop induction). No bars, no percentages, no invented proficiency levels.

### 8. Contact / looking for
Restates the placement ask in one line, your email, the CV download again, and — if you want it — a link out to Slow Miles. No testimonials section, deliberately absent rather than filled with anything invented.

### Footer
Name, year, nothing else needed for a personal site.

---

## Look

- **Base palette:** near-black graphite, off-white paper tone for body text — print engineering drawing, not dark "agency" void.
- **Accent 1:** blueprint cyan/navy, used only for CAD lines, dimension marks, and links — kept to the Projects sections.
- **Accent 2:** a warm brass/steel tone (stripped metal, bike patina), used only in the Restoration section, so that section visually separates itself from the colder engineering ones the moment you scroll into it.
- **Type:** a clean grotesk sans for body copy; a monospace for numbers, dates, and dimension-style callouts (the 18%, the 4-minutes-per-1%, dates). No display or script faces — nothing that reads as a landing-page template.

## On a phone

- Scroll-scrubbed animations (the bracket explode, the gear rotation) become tap-to-reveal instead — a single tap plays the explode/rebuild, since touch scrolling doesn't drive 3D well.
- The bracket's live 3D model is swapped for a short looping pre-rendered video or sprite sequence on mobile — same visual, far less GPU/battery cost.
- Single column; the restoration photos become a swipeable strip instead of a pinned scroll sequence.
- Top bar collapses to a simple menu icon with the same four anchors.

## Without the 3D (reduced motion / low-power / failure fallback)

- `prefers-reduced-motion` is honoured everywhere: every animated section renders in its end-state immediately — bracket already exploded with labels shown, gear already visible, before/after slider defaulting to "after." Nothing is lost, only the motion.
- If the 3D model fails to load at all (slow connection, older device), each 3D section has a static image fallback (an exploded-view render, a product photo of the charger) so the content never disappears, only the animation does.
- The at-a-glance strip (section 2) works identically with or without any motion — it's plain HTML, by design, since it's the safety net for the two-minute reader.

---

## Everything else the site needs

**From you:**
- The bracket's CAD/model file (ideally exported to glTF) or clean multi-angle renders, for both the desktop 3D and the mobile fallback video/sprite.
- Restoration photos: the inventory shot, the stripped paint, the hub flange, the bottom bracket — you said you have all of these.
- A CV PDF (cv.md has the content; needs to exist as a downloadable file).
- Confirmation: is Slow Miles live at a real URL to link out to, or should its content live only on this site?
- Contact preference: plain mailto, or a form.
- Optional: one or two real job cards from the co-op, anonymized if needed, for the Workshop section.

**Baseline build needs regardless:**
- Favicon, page title, meta description, a social preview image (the bracket render is the natural choice).
- Alt text on every photo.
- A performance budget so the 3D doesn't tank mobile load time — lazy-load the model and restoration photos below the fold.
- Basic analytics (optional, privacy-respecting) if you want to know whether anyone's actually reading it.
- Hosting choice (e.g. Vercel/Netlify) and a domain, or a subdomain if you don't want to buy one yet.

Plan's complete — say go and I'll start building, or flag anything you want changed first.
