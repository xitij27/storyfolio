Decisions made on the open items, plus the full consolidated plan:

**On the open questions, going with:**
- **Co-op/logbook entries:** ship without fabricated case studies. The job-card format (reported fault → what I found → parts → what I did → test ride) is reserved in the structure so you can drop in real entries later; for now the co-op line stays plain and unquantified ("Saturday mechanic, Second Gear Bike Co-op, 2023–present") rather than guessing a number.
- **CAD/photos:** build with clearly-placeholder treatment now — an abstract, unlabeled low-poly mechanical shape for the hero 3D motif (not presented as "the bracket"), and marked placeholder image blocks in the Slow Miles section. Swap-in-ready, nothing presented as a real photo or real model until you hand off the actual files.
- **Timing:** November 2026 confirmed for machining, given today's date.

**Tech stack**
- Vite + React + TypeScript + Tailwind
- react-three-fiber + drei for the one restrained 3D motif
- Framer Motion for scroll reveals, with `prefers-reduced-motion` respected throughout
- All copy and image/model paths live in one content file, so you can edit text or swap in real photos/CAD without touching component code
- Deploy to Vercel (simple, free, swap later if you'd rather)

**Page plan**

1. **Hero** — name, "2nd-year BEng Mechanical Engineering, Hallam Institute of Technology, Sheffield," "Looking for a summer 2026 placement in mechanical or product design," email. Visible with zero scrolling. Subtle abstract 3D motif in the background, gentle motion only.

2. **Skills strip** — SolidWorks, MATLAB, some Python, lathe & mill (workshop induction). Plain tags, no proficiency bars.

3. **Projects**
   - *Pedal box bracket, Hallam Racing* — chassis sub-team, Oct 2025–present. "18% lighter — in CAD and simulation; machining scheduled November 2026." Team context in muted small print, separated from her bullet: "Hallam Racing placed 12th of 68 at FS UK 2025, before I joined in October 2025." Placeholder CAD-screenshot styling until real screenshots are supplied.
   - *Hand-crank phone charger* — first-year design module, 2025, group of four, her part: gear train + housing. States the real result plainly: ~4 minutes of cranking per 1% charge. Small, functional stat callout, not a decorative chart.

4. **Workshop** — lathe/mill note, with structure reserved for future logbook entries (ships empty of fabricated ones).

5. **Work** — Second Gear Bike Co-op, Saturday mechanic, 2023–present, plain wording, job-card-format structure reserved for real entries later.

6. **Slow Miles** — placed after the professional content (reviewer has two minutes; this is supporting evidence, not the pitch). Scroll-driven walk through the five real posts (inventory, paint stripping, wheel truing, bottom bracket, latest), placeholder image blocks standing in for garage-floor photos, link out to the actual blog.

7. **Contact/footer** — email, Slow Miles link.

**Integrity commitments carried through:** no testimonials, no invented figures, no claim beyond what's in the CV/message, placeholders never presented as real photos or models.

Ready to build whenever you give the word.
