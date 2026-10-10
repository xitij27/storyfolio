Here's the full plan — also saved to `docs/story/storyboard.md`.

## The idea

The question the page answers: **"What makes a dashboard something people actually open?"** The object is eight tiles — one per real, confirmed thing you've done (Atlantico, DataTugas, Helix, FraudShield, Lisbon Rent Map, the hackathon, Meridian, AutoPilot). At rest they sit as a grey, unlit grid, like a dashboard that hasn't loaded. By the end they merge into one. The medium and the message are the same object, which is why it's yours and not a template.

## The scroll, top to bottom

**1. Title bar.** Your name, role, and tagline type in over a grid of 8 grey, unlit tiles. One tile — Meridian — resolves early to "200+ staff," so a visitor who never scrolls further still gets name, role, and one proof. The question types in beneath: "What makes a dashboard something people actually open?"

**2. Date range.** The tiles leave the grid and travel into a single row, left to right, ordered by start date: DataTugas '18 → Atlantico '20 → Helix '21 → FraudShield '22 → Lisbon Rent Map '23 → Hackathon '23 → Meridian '24 → AutoPilot '24. A thin ruler marks the years.

**3. Filters.** The row holds. Six chips appear beside it: SQL, Python, Tableau, Power BI, dbt, Statistics — your toolkit, shown as a whole rather than mapped to one tile each, since the material doesn't say which tool built which thing.

**4. Charts.** Each tile leaves the row and expands into its own real shape: Helix becomes a line falling from 5 hours to 2. Lisbon Rent Map becomes an outline of Lisbon's parishes. AutoPilot becomes six ticks, one per weekly run. FraudShield becomes a still notebook page over a scatter of transaction dots. DataTugas becomes twelve dots gathering into one cluster. The hackathon becomes a small bar chart. Atlantico becomes a narrowing funnel. Meridian becomes a field of counted figures. Tapping any tile opens a short panel with what it was, your part, and what came of it — written straight from what you told me, including the line that nothing further can be shown of Meridian's work.

**5. KPI tiles.** The wall tightens back into a grid; each tile flips to one oversized number: 200+, 60%, 3,000, 6, 12, 5 — each with its unit underneath, and the caption notes which are your own result versus a team's.

**6. Annotation.** The grid holds still. Only the Helix tile gains a small pinned note: Beatriz Lima's line about the sequencing core, with her name and title.

**7. Export.** All eight tiles travel inward and merge into one — your name, role, email, a CV link, the tagline again, and the question answered in one line: "A dashboard people actually open is one that answers a question they already had."

## What's clickable

A nav rail jumps to any chapter; one link skips straight to the close. Tiles are tap-to-expand in the Charts and KPI chapters. The Helix pin opens the full quote. The close has a CV download, an email link, and "back to top."

## Look and type

Three looks to scroll through and pick from, each named off a dashboard's own material:
1. **Night shift** — graphite ground, off-white ink, warm amber accent, dark glass tiles.
2. **Morning standup** — warm off-white ground, near-black ink, cobalt accent, light card tiles with hairline borders.
3. **Printout** — pale graph-paper ground, navy ink, red pen-mark accent, paper-white tiles with a dot grid.

Two typefaces: a humanist sans for running text, and a monospace with tabular figures for everything printed on a tile's face — years, KPIs, tool names.

## On a phone, and without the 3D

- **Phone:** tiles stack into one column instead of a grid or row; the timeline becomes a vertical list; tap replaces hover; chapters cut rather than fly between states.
- **Reduced motion:** no camera movement — each chapter just fades into its settled state.
- **No WebGL:** the same beats render as flat, static CSS/SVG layouts — same numbers, same text, same tap panels, just no 3D object.
- **No JavaScript:** one plain HTML page, everything in document order, CV as a direct download, contact as a plain `mailto:` link.

## Everything else the site needs

| | Status |
|---|---|
| Nav rail + skip-to-contact | Build |
| A page per project | Never — a tap panel on the tile instead |
| Every project listed | Build — all 8 |
| Contact + CV | Build — **but I need your real email and a CV file**; the resume's `rafael@example.com` reads like a placeholder |
| Beatriz's quote | Build — confirmed usable |
| Languages | English only, for now |
| Shared-link preview + favicon | Build later, wording checked with you nearer build |
| 404 page | Build — "no data for this view" |
| Blog / chat | Never |
| Legal notice | Later, only if you add analytics or a contact form — **do you want visitor analytics at all?** |

Two things I still need directly from you before anything is built: a real email address and a CV file, and whether you want the real Lisbon Rent Map URL linked (right now it's unlinked since `rentmap.example` looks like a placeholder).

Say yes to this and I'll mark it settled — building itself is a separate step from here, not part of this version.
