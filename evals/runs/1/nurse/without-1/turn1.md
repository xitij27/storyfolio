I'll start by looking through your material folder to understand your background and work before planning anything.

Here's the full picture after reading through the material. This isn't a generic portfolio story — it's **Aoife Brennan**: Clinical Informatics Lead and CNM1 on a 28-bed cardiac step-down ward in Dublin, eleven years a nurse, who got into informatics because a system made the unsafe thing the fast thing. That tension is the whole site.

## The idea

The site is built around her own line: *"I am the person who asks why the system makes the safe thing the slow thing."* That's the headline, the thesis, and the emotional arc. Not a generic "nurse who codes" portfolio — a near-miss that turned into a redesign that turned into a measurable result (71%→94% scanning compliance), told the way she'd tell it on a ward handover: short, factual, no drama for drama's sake.

The scroll itself mimics a **shift** — dark and quiet at the top (3am, the near-miss), building toward daylight and resolution at the bottom (the fix, the numbers, who she is now).

## Scroll, top to bottom

**1. Open — the ward at night**
Near-black background, one glowing line (a heartbeat/ECG trace) drawn as you scroll. Her name, two roles (Clinical Informatics Lead · CNM1), the opening quote. Minimal, quiet, no stock-photo nurse imagery.

**2. The night with Mr D.**
The near-miss that started it — told in text, not illustrated literally (respecting that this is a real clinical event). A single visual: the scanner trolley, far from the bed, with distance visualized as the thing that almost cost someone. This is the "why."

**3. The whiteboard**
The actual texture of the job — her photo of the board from the nine-admissions night, used as a real artifact, not decoration. Grain, handwriting-style accent for a pull-quote. This section answers "what does the job actually look like" with her own evidence, not stock stats.

**4. The question she asked**
Her observational study, presented as a mini case study: 40 hours observed, 22 nurses interviewed, 29% of doses given without a scan, and the three workarounds she found — each one minutes saved, none of it laziness. This is a real data moment, so stats get a proper animated chart, not decoration-chart.

**5. The fix**
Three scroll beats, one per change she actually made: scanners moved beside the med room, wristband stock changed, printed barcode sheets stopped. If you can get me the before/after handover sheet images, this is where a scroll-driven before/after comparison belongs — a genuine "aha," not a gimmick.

**6. The result**
71%→94% in nine months, counted up on scroll. Alongside it, the other outcomes: handover sheet redesign now used on 6 wards, preceptor to 14 newly qualified nurses, dashboards for falls/pressure ulcer audits. Numbers she earned, so they're allowed to move.

**7. Now**
Who she is today: Clinical Informatics Lead (one day a week, on top of CNM1), part-time MSc Health Informatics, the real toolkit — ISBAR, medication safety, audit, basic SQL, Power BI. Framed as tools she uses, not a skill-badge wall.

**8. Close**
Returns to the opening line, full circle. Contact, CV/poster download, LinkedIn. Built for the two audiences likely to land here: conference organizers and hospital/health-informatics collaborators or recruiters.

## Colour and type

- **Palette**: deep navy/charcoal for night sections, a warm paper-amber for the handover/whiteboard sections (like the sheet itself), a muted clinical green reserved for the vitals line, and a single desaturated coral used *only* once, at the near-miss — restraint is the point, never alarmist hospital-red.
- **Type**: a warm serif (e.g. Fraunces or Source Serif) for headlines — editorial, human, trustworthy; a clinical monospace (e.g. IBM Plex Mono) for every number and stat — evokes medication labels and barcodes; a clean sans (Inter/Public Sans) for body text. A handwriting-style accent font used sparingly, only for her own quotes.

## Motion and "3D," used sparingly

One recurring element, not a demo reel of effects: a vitals/ECG line that runs the length of the page as a spine, calm most of the time, spiking once at the near-miss. One restrained 3D hero object (a wristband or scanner, not a generic sphere/particle field) that the camera moves around across a couple of sections. Numbers count up on scroll because they're hers to earn. Everything else is editorial scroll-reveal, not spectacle.

## Phone

3D/WebGL pieces degrade to lightweight CSS/SVG equivalents below a certain width or on low-power devices — no heavy scroll-jacking on mobile. Single column, stats stack vertically, the before/after comparison becomes swipeable instead of scroll-tied. `prefers-reduced-motion` is respected throughout, plus a manual toggle, since this may well be viewed on a hospital-issued or shared device.

## What else it needs before building

1. **Privacy check, not optional**: "Mr D. in bed 14" is a real clinical incident. Even anonymised, I'd want her to confirm this is cleared for public use (hospital comms/governance), or we generalise it further so no one could possibly identify the patient or date.
2. **Assets I don't have yet**: the actual whiteboard photo, before/after handover sheet images, a headshot if she wants one, and a CV/poster PDF to link.
3. Accessibility: WCAG AA contrast, alt text for the whiteboard photo, full keyboard nav.
4. A lightweight way to go deeper on the poster study for anyone (conference reviewers especially) who wants the full method/findings, without bloating the main scroll.
5. Static hosting is the right call — no backend needed (Vercel/Netlify), fast, cheap, easy for her to hand off or update later.

Let me know if this direction feels right, and flag anything in section 2 you want changed before I touch any code — and send over the whiteboard photo and handover sheets when you're ready.
