**Visual direction: blueprint/technical-drawing aesthetic.** Reasoning: it's native to mechanical engineering (CAD, FEA, dimensioning), it reads as credible rather than decorative for a recruiter, and it lets me use clean line-art/wireframe treatments for the bracket and gear train *without* needing finished photos — which matters since real photos aren't loaded yet. A workshop/steel aesthetic would lean on photographic texture we don't have.

**Full plan**

**1. Audience & tone**
Primary reader: someone screening placement applications, ~2 minutes. Tone: precise, hedged where appropriate, no inflation. Every claim traces to the CV, blog, or your corrections — nothing invented.

**2. Visual language**
- Palette: off-white/paper background, dark ink-blue linework, one accent (orange or red, used sparingly — typical print-marking color on drawings).
- Typography: monospace or technical-grid-style headings (drawing title blocks), clean sans body text for readability.
- Motifs: dimension lines, section-view hatching, annotation callouts, grid paper texture — used as structure, not decoration.
- 3D piece: wireframe/line-render of a bracket-like form in the hero, rotating subtly on scroll — styled explicitly as a CAD/simulation view (not photoreal), which also keeps it honest: it looks like what it is, a simulated design, not a finished part.

**3. Site structure**

- **Hero** (above the fold, loads fast, no animation gating it): name, "2nd-year BEng Mechanical Engineering, Hallam, Sheffield," one-line placement goal, wireframe 3D bracket piece as background/side element.
- **Snapshot strip**: skills (SolidWorks, MATLAB, Python, lathe/mill), at-a-glance so the 2-minute reader doesn't need to scroll for basics.
- **Projects**
  - Formula Student: joined Hallam Racing Oct 2025, chassis sub-team. Pedal box bracket redesign — 18% lighter in CAD/FEA simulation, not yet manufactured, machining scheduled November. Team's 12th/68 at Formula Student UK 2025 noted as team context predating her join, clearly dated and attributed to the team.
  - Hand-crank charger: group of four, her scope = gear train + housing. Honest result stated: ~4 minutes of cranking for ~1% charge.
- **Work**: Second Gear Bike Co-op, Saturday mechanic since 2023 — described by the kind of work, no invented counts.
- **The restoration story** (scrollytelling section): the 5 Slow Miles posts in chronological order, parallax-layered photos as the reader scrolls — bought a broken bike → inventory on the garage floor → paint stripping → wheel truing → bottom bracket. Links out to the real blog for full posts.
- **Contact/footer**: email, blog link.

**4. Content gaps — decisions for v1**
- Photos: not yet supplied. Build with styled placeholders (blueprint-style line boxes, not fake stock photos) that are easy to swap once real bike/garage-floor photos are provided.
- Job-card/logbook case-study section: skipped for v1 since no real entries are available yet — can be added later if you pull specific ones.
- No testimonials anywhere, per your instruction.

**5. Tech stack**
React + Vite, `react-three-fiber`/Three.js for the single 3D hero piece, Framer Motion for scroll-linked reveals and the restoration parallax. Static output — runs locally first; I'll hold off on any deployment/hosting choice until you confirm you want it live somewhere.

**6. Guardrails**
`prefers-reduced-motion` respected (3D/parallax disabled, static layout shown instead), 3D scoped to one element so mobile/low-power devices stay fast, all copy reviewed against the facts above before anything ships.

Say go and I'll start building against this.
