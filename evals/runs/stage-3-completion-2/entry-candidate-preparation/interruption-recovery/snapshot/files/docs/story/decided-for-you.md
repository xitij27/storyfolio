# Implementation decisions — 12 October 2026

- Build the runnable spine first: question, bench, scope. Preserve original
  chapter numbers 1, 3, 5 to make the staged preview explicit. Scheduling and
  the full evidence chapter follow the user's look choice. Change in
  `content/story.ts` and `app/page.tsx`.
- Four physical components form one apparatus: a fixture chassis with contact
  pins, a raised board with illustrative components, a command instrument,
  and an observation instrument. These are explanatory geometry, not
  recovered Mosslink hardware or a wiring plan. The bench view separates
  the board and instruments from the same chassis so access can be inspected.
  Change in `content/apparatus.tsx` and `content/formations.ts`.
- Offer Workbench (warm mineral surfaces, green board) and Instrument
  (dark blue-green, pale green accent). Workbench is the provisional default,
  not an approved look. Both use system fonts and local procedural geometry.
  Change in `content/looks.ts`.
- Keep face labels fixed between chapters to avoid crossfaded overlapping
  words. Scene geometry changes, prose explains why. Labels identify
  Ada's fixture/firmware and the colleague's circuitry. Change in `faces.ts`.
- No invented measurement traces or numeric instrument readouts. The ending
  temporarily carries both evidence limits in HTML so the spine is complete
  without misleading the visitor before the dedicated evidence chapter exists.
- Supply a new local inline SVG fallback derived from the approved story
  relationship, not the supplied SVG layout. It is labeled teaching material.
  No external assets used. No ordinary scene controls or overlay links are
  needed; appearance, chapter navigation and the return link remain HTML.
