Here's the full script, saved to `docs/story/storyboard.md`. In full:

## The idea
Question the whole page answers: **What does it take to make the safe thing the fast thing?** — your own words, turned forward. The object is a **PDSA wheel** — Plan, Do, Study, Act — the cycle you already named as something you work from, and, not by coincidence, the exact shape your poster study already took. A sticky header (name, both titles, a jump-rail, a contact link) runs the whole page, so anyone who never scrolls still gets the essentials.

## Scrolling top to bottom

**Open.** A complete wheel sits at rest, unlit, one quarter-turn from closing — like a cycle poster pinned to a noticeboard. Under it: "71% to 94% in nine months." As you scroll, it begins its first slow turn, and the caption says why she started asking: *"the night a medicine nearly reached the wrong patient, because the nearest scanner was at the other end of the ward"* — no bed, no initial, no drug.

**Who.** The hub lights up with her name, both titles, and "eleven years a nurse, six of them in charge of a shift."

**Plan.** The first wedge fills: a timeline (2011 BSc → 2015 Coronary Care → 2019 CNM1 → 2024 MSc, in progress), then four small tool icons for what she reads a ward by — ISBAR, the early warning chart, the care plan, the audit cycle itself.

**Do.** The second wedge fills, opening three panels: a wristband that won't scan after a shower, a scanner kept too far from the medication room, a printed sheet kept in a pocket. Caption: 40 hours of observation, 22 interviews, "none of them was laziness."

**Study.** The third wedge fills around a single number climbing from 71 to 94, under a thin rising trace line. Caption: what actually changed — scanners moved, wristbands changed, sheets stopped.

**Act.** The fourth wedge fills: six marks for the six wards now using her handover redesign, a tally for 14 nurses precepted, and two dashboards named (not shown — no screenshot exists yet).

**Close.** The wheel completes its turn and settles whole, except the Plan wedge is left a little open — her next move. Caption states the answer plainly and that she's looking to do this full time from 2026, with a contact link.

## What moves, what's clickable
The wheel turns a quarter-turn per chapter, wedges filling with real figures as you go. You can hover a title for what it means, click a tool icon or a workaround panel to open it, hover the 71→94 number to see how it was measured, click a ward mark to confirm it's one of six. The rail jumps to any chapter; one link skips straight to Close.

## Without the 3D
- **Phone:** the wheel becomes four stacked cards (Plan/Do/Study/Act) filling in as you scroll to them; hover becomes tap; the header collapses to a thin bar with a menu icon.
- **Reduced motion:** no turning, no counting up — each beat just appears in its settled state.
- **No WebGL:** the wheel is drawn flat in CSS/SVG, same labels, same numbers, same click targets.
- **No JavaScript:** a plain HTML page, chapters stacked in order, same text and figures, nothing lost — the scene is decoration over a page that stands on its own.

## Look and type
Three directions, all from the wheel's own material — you pick once it's built:
- **Ward noticeboard** — matte off-white, charcoal ink, one early-warning red kept only for the proof numbers.
- **Night shift** — near-black navy, warm off-white ink, a monitor-trace teal for the active wedge.
- **Day shift** — kraft tan, ballpoint blue ink, a muted clinical green saved for "94."

Two typefaces: a plain humanist sans for running text, and a condensed, institutional-looking sans — like what's printed on a hospital form — used only for what's printed on the wheel itself.

## Everything else, and who decides
- **Build:** one continuous scroll with a rail; the three real projects folded into Do/Act; a 404 page (the wheel stuck mid-turn); a share-image and site icon.
- **Never:** a page per project, a blog, a chat — nothing in your material calls for them.
- **Later, if it comes:** a quote from a colleague or manager, once they've said yes to being quoted.
- **I need your answer on:** a downloadable CV (do you want one, do you have a file?), English only or Irish as well, what the site's icon should look like, and whether you want analytics — which would mean a short privacy notice.

Full detail, including every beat and every decision I made without asking (with how to undo each), is in `docs/story/storyboard.md`, `decided-for-you.md`, `concepts.md`, and `facts.md`. Building isn't part of this version — once you say yes to this script (or tell me what to change), that's the end of the plan.
