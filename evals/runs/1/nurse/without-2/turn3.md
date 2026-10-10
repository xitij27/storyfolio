# Aoife Brennan — portfolio site, full plan

One continuous scroll, no traditional multi-page nav. A colour-banded trend line in the Early Warning Score style runs the length of the page as a persistent spine — steady green at rest, climbing through amber to a brief red at the one moment that earns it, narrowing and calming as the two case studies resolve, settling back to steady by the end. That line, plus two small modelled objects (a fanned stack of handover sheets, a wristband under a scanner beam), are the entire "3D" vocabulary — restrained on purpose, each one tied to a real thing she charts or holds, not decoration.

---

## 1. Opening

**Shows:** Her name. Title line — "CNM1, Cardiac Step-Down · Nursing Informatics Link Nurse." One voice line: *"Eleven years a nurse. The person who asks why the system makes the safe thing the slow thing."* A scroll cue.

**3D/motion:** The EWS line enters low, green, idling gently with a soft depth/glow (bloom + slight parallax on mouse-move, desktop only) — the "3D" here is a depth-aware canvas, not spinning geometry.

**Clickable:** Nothing yet — intentionally quiet. Her name doubles as a "home" anchor for the rest of the site.

**Look:** Dark charcoal register. Serif for the voice line, mono for the title.

## 2. The why

**Shows:** One short paragraph — pending her sign-off — telling the systemic insight without any identifying detail: *"A medication very nearly reached the wrong patient, because the scanner lived at the far end of the ward, not beside where the drugs were kept."* Followed by one or two lines on how that became her reason for getting into informatics.

**3D/motion:** The EWS line rises through amber to one brief red peak exactly as the key sentence scrolls into view, then recovers toward amber as the text resolves — mirroring a real EWS: caught early, treated, stabilises. Scroll-linked, not autoplay.

**Clickable:** Nothing.

**Look:** Still dark. Serif body, generous whitespace, text given room to carry weight.

## 3. The role

**Shows:** "CNM1, Cardiac Step-Down, 28 beds." Six years running a shift. "Nursing Informatics Link Nurse, one day a week." Hospital named in plain text — no logo. A small 28-cell grid motif (dots, not a floorplan) with one cell marked, standing in for "in charge of a shift."

**3D/motion:** First light-register transition of the page (night → day). The bed grid gently tilts into slight perspective as it scrolls into view, then flattens as it centres — a small, cheap 3D beat distinct from the spine.

**Clickable:** Hospital name can optionally link out to the hospital's site — her call.

**Look:** Warm paper background begins here. Mono for the numbers (28 / 6 / 1 day).

## 4. Case study — the ISBAR handover sheet

**Shows:** "Redesigning the handover sheet." Structured as a Plan–Do–Study–Act cycle: *Plan* — led a team of five, chose ISBAR (Identify–Situation–Background–Assessment–Recommendation, glossed in one line, not taught from scratch); *Do* — the redesign, shown as old vs. new **blank templates** side by side (stacked on mobile); *Study* — feedback; *Act* — rollout to six wards.

**3D/motion:** A fanned stack of blank sheets expands from one sheet to six as the user scrolls through "Act." The EWS spine visually forks into six thin lines at the same moment, then recombines.

**Clickable:** The two sheet images open in a lightbox for close reading, each captioned "blank template."

**Look:** Paper register continues. Mono letters (I–S–B–A–R) as five small labelled tabs.

## 5. Case study — barcode scanning, 71% → 94%

**Shows:** "Why nurses skip the scan." Same PDSA structure: the 40-hour observation and 22 interviews; the three workarounds as three short cards (wristbands that won't scan after a shower, scanners kept away from the medication room, printed barcode sheets); then, stated plainly, *"Pharmacy, IT, the night staff, and I made these changes together"* — scanners moved to the medication-room door, wristband stock changed, printed sheets stopped; then the outcome.

**3D/motion:** The 71→94 figure draws in as a chart in the monitor-teal accent as you scroll, labelled "9 months." Beside it, the one other modelled object — a simple wristband with a scanner beam sweeping across it in sync with the chart filling. The EWS band visibly narrows as the percentage climbs, standing for a safer, less variable process.

**Clickable:** A button to the conference poster/abstract — "Read the full study, Irish Nursing Informatics Conference 2025."

**Look:** Teal reserved only for this section's chart, so it reads as the one data-forward moment against the site's restraint elsewhere.

## 6. Dashboards & research

**Shows:** A short line framing the audit cycle as her ongoing habit, not a one-off. Two stylised dashboard mockups — falls audit, pressure ulcer audit — with clearly illustrative, generic numbers, never real patient data. SQL (basic) and Power BI mentioned here as the tools behind them, not as a separate skills list.

**3D/motion:** The dashboard panels get a light glass/tilt reflection on mouse-move (CSS transform, not full WebGL — cheaper, screen-like). EWS spine stays as a calm thin strip in the background.

**Clickable:** Nothing load-bearing.

**Look:** A slightly cooler grey-paper panel — a deliberate "control room" interlude between the two big case studies and the more personal section that follows.

## 7. Teaching & education

**Shows:** "Preceptor to 14 newly qualified nurses," with one or two human sentences, not just the number. MSc Health Informatics, part-time, 2024–2026, in progress, Liffey University. BSc General Nursing, 2011–2015. One direct line naming the throughline: bridging bedside and informatics.

**3D/motion:** Back to the dark register — the bookend begins. The EWS line, narrowing since section 5, settles fully into the same steady rhythm it had at the very start. No new object here; this section is deliberately the quiet one.

**Clickable:** Nothing.

**Look:** Dark. Serif for the human lines, mono for the dated/institutional ones, styled like a transcript.

## 8. Close

**Shows:** A plain availability statement — *"Looking to move into clinical informatics full time from 2026 — hospital systems, or the companies that build them."* CV download. Email and LinkedIn.

**3D/motion:** The EWS line comes fully to rest — no further animation. A deliberately calm, unflashy ending.

**Clickable:** CV PDF download, LinkedIn link, email link (raw `mailto:` vs. a lightweight contact form is an open choice — see below). These, plus the poster link and the two lightboxes, are the only load-bearing clicks on the whole site.

**Look:** Dark, same register as the hero — the full bookend.

---

## Persistent elements, every section

- Her name, fixed, doubles as a "scroll to top" anchor.
- A slim progress rail on the right edge (desktop) — one dot per section, doubling as the annotation markers on the EWS line itself. Clicking a dot jumps to that section.
- A small persistent "CV" tag in the corner throughout, independent of the final CTA — some visitors will want the document immediately, not the story first.

## On a phone

- Same section order, same dark/light alternation, single column.
- The EWS spine renders as a slim 2D/SVG strip driven by scroll position instead of a depth canvas — same colour language, far lighter.
- Both modelled objects (fanned sheets, wristband+beam) become short looping pre-baked animations or flat CSS equivalents rather than live 3D.
- Dashboard tilt/reflection is dropped entirely on touch — panels sit flat.
- The progress rail collapses to a thin top progress bar, non-interactive.
- Lightboxes become full-screen, swipe-to-dismiss.
- Tap targets ≥44px; nothing depends on hover.

## Without the 3D (reduced motion / no WebGL, any device)

- Detects `prefers-reduced-motion` and WebGL support. Either triggers a swap: the spine becomes a static illustration, already shown at each section's resting colour (green / amber-red / green), instead of trying to fake the animation.
- Both modelled objects become static labelled illustrations in the same place, same captions.
- The 71→94 chart appears already fully drawn, no scroll-triggered fill.
- Dashboard tilt simply doesn't run.
- Section colour changes (dark/light) still happen — that's storytelling, not motion, so it stays.
- No content, label, or link is ever gated behind the animation layer — HTML/CSS carries everything; canvas/WebGL is strictly an enhancement on top. This is also what renders if JavaScript fails outright.

## Colour and type, final

- **Ink** (dark bg) — deep warm charcoal, not pure black.
- **Paper** (light bg) — warm off-white, not sterile white.
- **EWS green / amber / red** — muted clinical tones, not neon; red used only in section 2.
- **Monitor teal** — reserved entirely for the 71→94 chart in section 5.
- Serif for every narrative passage; grotesk mono for every number, stat, date, and label (28, 6, 71%, 94%, 40 hours, 22 interviews, I-S-B-A-R); clean grotesk sans for nav/buttons/captions only.

## Everything else the site needs

**From her, before build starts:**
- Sign-off on the exact "why" paragraph above.
- Exact hospital name text to use, confirmed no logo involved.
- The two blank handover-sheet templates as actual files (not the whiteboard photo).
- Source CV content, so the downloadable PDF matches the site rather than being invented.
- Confirmation of what to link for the poster — the abstract text alone, or a full poster file/image.
- A decision: raw `mailto:` email (simplest, but scrapable) vs. a lightweight contact form.
- Whether she wants a photo of herself anywhere — current plan has none at all; confirm that's intentional.

**Production, not yet started:**
- Performance budget — WebGL layer lazy-loaded, fast first paint, tested on an ordinary office/hospital connection, not just home broadband.
- Accessibility — correct heading order, alt text on both modelled graphics and the chart, AA contrast in both registers, full keyboard navigation, the complete no-motion fallback above.
- SEO/sharing — Person schema, descriptive title/meta description, a static Open Graph image (designed, not a live render).
- Domain, hosting (static host is sufficient — no database, no CMS).
- Favicon.
- Optional, privacy-respecting analytics if she wants visibility into who's visiting.

I've added the finalized specifics (the two 3D objects, the progress-rail/nav mechanics, exact colour roles, reduced-motion approach) to the saved plan memory so nothing here needs re-deciding later.

That's the full plan, section by section, still nothing built. The open items list at the end (sign-off on the "why" line, hospital name text, actual sheet templates, CV content, poster link choice, email vs. form, photo or none) is what I need from you before starting — let me know those and I'll move to building.
