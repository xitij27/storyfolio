## The full plan

### Concept (one line)
The site reads like your own documentation habits — a job card for projects, a logbook for skills, an exploded view for how things are built — rather than a portfolio-agency performance of them.

---

### 1. Hero — first screen, no scroll required
**Shows:** Name, course, year, "Hallam Institute of Technology, Sheffield," and one line — "Looking for a summer 2026 placement in mechanical or product design." Below that, a quick-facts row in monospace: location, start availability, tools (SolidWorks, MATLAB, Python). CV download button and email sit here, visible without scrolling, and persist (small, unobtrusive) for the rest of the page.

**3D:** The pedal box bracket, assembled, rendered from your CAD, sitting to one side with a slow idle rotation — not scroll-linked. It's there to signal "this is a real part," not to perform.

**Clickable:** CV download, email/mailto link, and a minimal fixed side-nav (text labels: Projects / Co-op / Slow Miles / Skills / Contact) so a reviewer can jump straight to whatever they need instead of scrolling through everything.

---

### 2. Formula Student — chassis sub-team
**Shows:** "Hallam Racing, chassis sub-team — joined October 2025." Small caption: "Team placed 12th of 68 at FS-UK 2025, July 2025 — before I joined." Then the bracket project in job-card form:
- *Reported:* brief on pedal box mounting bracket, weight target
- *Found/designed:* your redesign approach
- *Result:* "18% lighter — CAD and simulation. Machining: November 2025." No test-ride field filled — it's marked pending, not resolved.

**3D:** The bracket from the hero continues into this section, unseating and exploding into its parts as you scroll, each part pausing briefly with a short callout label (material, function). It stops laid out flat — not reassembled — matching the "not yet built" status honestly.

**Clickable:** Each exploded part can be clicked to show/hide a one-line note (what it does, why that material); dragging rotates the view. None of this gates the text, which is readable regardless.

---

### 3. Hand-crank charger
**Shows:** "First-year design module, group of four — gear train and housing were mine." Job-card form:
- *Reported:* brief for the module
- *Built:* gear train + housing
- *Result:* "Worked — badly. Four minutes of cranking for 1% of charge." Stated flatly, framed as where you found the losses, not buried.

**3D:** Lighter than the bracket section — a simple animated gear train (2–3 gears meshing) rather than a full exploded model, scaled to the size of the actual project. Scroll moves the crank; the gears turn.

**Clickable:** Nothing essential — maybe a hover/tap on the gear train shows gear ratio, purely optional.

---

### 4. Second Gear Bike Co-op
**Shows:** "Saturday mechanic since 2023." Rather than inventing a specific example job, this section explains *the format itself* — a small visual of what a job card looks like (Reported / Found / Parts / Done / Test ride) as a window into how you work, not a fabricated customer story. No bike count, no testimonial.

**3D:** None needed here — this section is text and maybe one still image of a workshop/job card, kept deliberately quiet after two motion-heavy sections.

**Clickable:** Nothing required.

---

### 5. Slow Miles — the restoration
**Shows:** A photo-led timeline through the five real posts: the flat tyre, the garage-floor inventory, paint stripped, the cracked hub flange, the seized bottom bracket. Real photos carry this section.

**3D:** None — this is deliberately the one section that's just photography, since the material is strong enough on its own and it's a tonal break from the engineering sections.

**Clickable:** Each timeline entry links out to the actual post on Slow Miles.

---

### 6. Skills & tools
**Shows:** A plain, logbook-styled list — SolidWorks, MATLAB, Python, lathe and mill (workshop induction) — monospace, no skill-bar graphics.

**3D/Clickable:** None.

---

### 7. Contact / close
**Shows:** Restates the placement line, CV download, email. Short and final — no closing flourish needed given the persistent CV button already present throughout.

---

### Look

**Colour:** Pale grey-white background, like drawing paper, with near-black linework and text. A single blueprint-blue accent for active states, annotations, and links. A muted brass/rust accent used only in the Slow Miles section, for warmth and separation from the technical sections.

**Type:** A workmanlike grotesque sans for body text (e.g. Inter or IBM Plex Sans) paired with a monospace (e.g. IBM Plex Mono) for labels, job-card fields, dates, and figures — so numbers read like measurements, not marketing.

---

### On a phone
Single column, same order. The hero fits one viewport with CV/email visible with no scroll. The bracket exploded-view becomes a swapped sequence of pre-rendered still frames (not live WebGL) tied to scroll position — visually similar, far cheaper. Scroll distances per section are shorter, since mobile scrolling is faster. CV download persists as a small bottom bar rather than a floating corner element.

### Without the 3D
Every section must stand on its own in plain HTML with the 3D/motion layer treated as enhancement, not requirement — this covers reduced-motion preference, no-WebGL, low-power devices, and crawlers/SEO:
- The bracket exploded-view becomes three static labelled images (assembled → mid-explode → laid out flat) with the same callout text, no animation.
- The gear train becomes a single static diagram.
- Everything else (text, job cards, photos, links) is unaffected, since it was never 3D to begin with.
- Triggered automatically by `prefers-reduced-motion`, WebGL feature detection, or a data-saver signal — not an opt-in toggle the visitor has to find.

---

### Everything else the site needs

**From you:**
- Real email address and real Slow Miles URL (the CV draft has placeholder-looking ones)
- CAD export of the bracket (STEP or GLTF) or turntable renders/stills, for both the live 3D and the static fallback
- The garage-floor and bike photos, plus links to the five Slow Miles posts
- A CV/resume PDF for the download button
- Decision: photo of yourself, yes or no
- Sign-off on the "12th of 68, before I joined" wording

**Production/technical:**
- Hosting and domain
- Performance budget — the 3D assets need to stay small; lazy-load anything below the hero
- Accessibility pass — alt text on every photo, keyboard-reachable nav, contrast check on the blueprint-blue over the paper background
- Basic SEO — page title and description, since reviewers may search your name directly
- A simple favicon/mark, if you want one
- Optional, lightweight, privacy-respecting analytics — mainly to see whether CV downloads or email clicks actually happen, since that's the real goal of the site
- A plan for updating the bracket's "Result" field once it's machined and tested in November, so the site doesn't go stale on the one item that's explicitly marked pending

That's the whole plan, in order. Say go whenever you want building to start.
