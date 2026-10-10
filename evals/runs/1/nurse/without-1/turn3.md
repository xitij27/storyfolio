## Concept, in one line

A clinical shift, told in audit-cycle order (Plan → Do → Study → Act), proving the same thing twice: once as a story, once as a method — ending on the fact that she's looking for this work full time from 2026.

---

## Section by section

### 1. Open

**Shows:** Name, real title — CNM1 · Nursing Informatics Link Nurse — and "St Brendan's University Hospital" as plain text. Her line: *"I'm the person who asks why the system makes the safe thing the slow thing."* A status line: *Open to clinical informatics roles — hospitals and health-tech — from 2026.*

**3D:** The one recurring hero object — a hospital ID wristband, modelled plainly, no branding, no text on it — sits centred, lit low, rotating a few degrees on its own. It doesn't react to scroll yet; it's just present, like something left on a desk.

**Click:** A single down-arrow / "scroll" affordance. Nothing else — no nav yet, so the opening line lands without competition.

**Look:** Near-black navy, almost no light except on the wristband and the type. Serif headline, mono for the title line, generous empty space — this is the quietest the site will ever be.

---

### 2. Why

**Shows:** The abstracted motivation line only — *"Eleven years in, one near-miss was enough — not because it was rare, but because it was preventable."* Nothing else on screen. No names, no numbers, no scene.

**3D:** The ECG spine (a thin glowing line running down the centre of the page, present from here to the end) starts flat and calm, then draws one sharp, single spike exactly as this line finishes entering view — the only spike in the whole site. The wristband from section 1 has by now drifted off-screen, replaced by the spine as the page's new through-line.

**Click:** Nothing clickable. This section is deliberately the shortest, a single beat, so it can't be mistaken for an anecdote inviting more scrolling-in.

**Look:** Still dark, but the spike's glow is the first colour accent in the whole piece — the single desaturated coral, used here and nowhere else.

---

### 3. Plan — the question she asked

**Shows:** Her observational study, labelled quietly as "Plan" (first word of the audit cycle, introduced here and reused in section 4). Forty hours, two shifts (day and night), 22 nurses interviewed, 29% of doses given without a scan. Then the three workarounds, named plainly: wristbands that wouldn't scan after a shower, scanners kept on a trolley away from the medication room, barcodes copied onto a printed sheet kept in a pocket. Each one captioned with its real cost: one to four minutes saved.

**3D:** The ECG spine, now calm again, grows three short branching ticks off itself as each workaround scrolls into view — a simple generative/procedural touch rather than a literal model, so it reads as "data," not as medical illustration.

**Click:** Each workaround card is expandable in place (accordion, not a new page) to show the one-line "cost" caption — closed by default, so the page reads cleanly on first pass and rewards a second look.

**Look:** Transition from navy toward a warm charcoal, first appearance of the clinical-mono typeface for the 29% and the three time ranges — this is the first section where a number gets real visual weight.

---

### 4. Do — the fix

**Shows:** Two parallel fixes, both labelled "Do":
- The scanning fix — three short beats, credited precisely: scanners moved beside the medication room door (her specific action), wristband stock changed, printed sheets stopped (ward-wide decisions made with pharmacy and IT). Copy is explicit that this was a ward effort — pharmacy, IT, night staff, and her.
- The handover sheet redesign — credited to a group of five she led, built around ISBAR. Five short beats, one per letter: Identify, Situation, Background, Assessment, Recommendation, each with a one-line gloss of what actually changed on the form.

**3D:** The empty handover sheet (her real artifact) appears as a flat object that the page treats almost like a physical sheet of paper — it slides in from the side and lies flat, filling with the five ISBAR labels one at a time as each beat scrolls past, old sheet fading under new sheet as the "before" becomes "after." No wristband/scanner literal 3D here — the sheet is the hero object of this section.

**Click:** A toggle at the top of this section — "old sheet / new sheet" — lets a visitor flip between the two states on demand, independent of scroll, for anyone who wants to compare without scrolling back up. Each ISBAR beat label is also independently clickable to jump straight to it (useful for a hiring manager skimming on a second visit).

**Look:** Paper-amber background enters here for the first time — warm, like the sheet itself — breaking from the navy/charcoal that's dominated so far. This is the midpoint of the site and it should feel like daylight starting to arrive.

---

### 5. Study / Act — the result

**Shows:** Labelled "Study, Act" to close the cycle opened in section 3. The headline number — 71% to 94% in nine months — counts up live as it scrolls into view, explicitly captioned as the ward's result with her part named underneath it: the forty hours, the three workarounds found, the scanners moved. Below it, three smaller stat tiles, also counting up: handover sheet now used on 6 wards, 14 newly qualified nurses precepted, dashboards built for falls and pressure-ulcer audits.

**3D:** The ECG spine, calm throughout, visibly steadies and brightens (a gentle widening/steady glow, not a spike) as the 71→94 number finishes counting — the visual payoff for everything since section 2's single spike.

**Click:** The three smaller stat tiles are clickable to expand one extra line of context each (e.g. what the falls/pressure-ulcer dashboards actually track) — closed by default again, same pattern as section 3, so the page stays scannable.

**Look:** Brightest point of the whole site tonally — still restrained, but this is "morning," not stock-photo bright: a pale, warm neutral background, dark text, the mono typeface carrying all five numbers.

---

### 6. Now

**Shows:** Her actual daily toolkit, four items, no generic skill badges: the ISBAR handover, the early warning score chart, the care plan, the audit cycle — one sentence each on how she actually uses it. Role stated plainly (CNM1; Nursing Informatics Link Nurse, one day a week), MSc Health Informatics in progress, and the applied skills underneath: basic SQL, Power BI, audit.

**3D:** The spine ends here — it visibly terminates at a small fixed marker next to "Now," making the point that the story has caught up to the present. No new 3D object introduced.

**Click:** Nothing elaborate — this section is reference material, laid out as a clean static grid, built to be read, not played with.

**Look:** Settles into the calmest, most neutral palette on the page — this section is meant to feel like a CV, not a stage.

---

### 7. Close

**Shows:** The hiring line restated plainly: open to clinical informatics roles, hospitals and health-tech, from 2026. CV download. LinkedIn link. Contact email. Closes by repeating the opening line, so the page ends where it began.

**3D:** None. Deliberately flat and quiet — the pitch should be the last thing read, not competing with a visual.

**Click:** CV download (PDF), LinkedIn (opens in new tab), email (mailto). Three targets, no more.

**Look:** Returns to the near-black of section 1, visually bookending the site.

---

## Navigation and persistent UI

- A thin progress indicator runs alongside the spine the whole way down (a subtle shift-clock metaphor — not literal clock numerals, just a quiet sense of "how far through" without labelling it 12am–6am literally, since that framing doesn't actually fit a redesign-and-audit story).
- A fixed, small "reduce motion" toggle, always visible, independent of OS settings — given the likely audience (hospital devices, shared machines, slow networks), this should be a visible choice, not just an accessibility setting buried in a menu.
- No traditional top nav bar — this is a single scroll read, not a multi-page site. A minimal jump-menu (dot or label list for sections 1–7) appears only once a visitor has scrolled past the opener, for anyone who wants to skip straight to "Now" or "Close."

---

## Design system

- **Colour**: navy/charcoal (open, why, close) → charcoal-to-amber (plan, do) → pale warm neutral (study/act, now). One desaturated coral, used exactly once, in section 2. No clinical red anywhere else — deliberate, since this is a safety story, not an alarm.
- **Type**: serif headline (Fraunces or Source Serif) for every section title and the quotes; clinical monospace (IBM Plex Mono) for every number, stat, and label (29%, 71→94, I-S-B-A-R); clean sans (Inter or Public Sans) for all body copy. A handwriting-style accent, used only for her two direct quotes (open and close), nowhere else.
- **Grid**: generous single-column reading width throughout (not a multi-column dashboard look) — this is closer to long-form journalism than a SaaS landing page.

---

## Phone, and without 3D

- Below a width/performance threshold, the wristband (section 1) and the ISBAR sheet (section 4) render as pre-made static or lightly-animated SVG/CSS instead of 3D — same visual beats, no WebGL.
- The ECG spine becomes a simpler animated SVG line, still present, still spiking once and steadying once, just lighter.
- The old/new handover sheet toggle becomes a swipe or tap, not a scroll-tied reveal.
- Single column throughout, stat tiles stack vertically, accordions behave identically to desktop.
- `prefers-reduced-motion` is honoured automatically; the manual toggle mentioned above overrides everything regardless of device or OS setting, and when it's on, every section becomes the static phone/no-3D version even on desktop.
- Everything that is clickable on desktop stays clickable on phone — nothing is scroll-only or hover-only anywhere on the site.

---

## Everything else the site needs

**Content still needed from you**
1. The two handover sheets (old and new), blank, as image or PDF.
2. Confirmation "St Brendan's University Hospital" is the name to publish (vs. a stand-in).
3. A CV/resume PDF to link in the close section.
4. The contact email and LinkedIn URL you want public.
5. Sign-off that the abstracted near-miss line in section 2 reads as safe to you — it's the one line in the whole site carrying any risk, so it's worth a second look once it's written exactly as above.

**Technical / production**
6. Static hosting (Vercel or Netlify) — no backend needed anywhere on this site.
7. Performance budget: the 3D assets (wristband, sheet) lazy-load and have a static image fallback if WebGL fails or is unsupported, not just on phones.
8. WCAG AA contrast throughout, alt text for every image, full keyboard navigation, visible focus states — especially since hiring managers may use assistive tech or screen readers.
9. SEO/meta: her name, CNM1 / Nursing Informatics Link Nurse, hospital, Dublin, and "clinical informatics" as the page title and description, so this actually surfaces for the people she wants finding it.
10. No analytics beyond something minimal and privacy-respecting (e.g. Plausible) — nothing that sets third-party tracking cookies, given the audience includes hospital compliance-minded hiring managers.
11. A print stylesheet or export-to-PDF consideration for the "Now" section specifically — some hiring managers will want to print or save a plain CV-style view.

Say go when you're ready and I'll start on the build.
