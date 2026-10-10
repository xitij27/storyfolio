Here's the full plan — **The Job Card**. The object is eight job cards, one per piece of real work (the co-op, buying the bike, the inventory, stripping the paint, truing the wheel, the bottom bracket, the hand-crank charger, the pedal box bracket). The same eight cards carry the whole page, rearranging chapter to chapter.

## The page, top to bottom

**1. Complaint — the opening.** The eight cards stand fanned shut, like tickets on a spike at a service counter. Her name and the question sit on the top card: *"Mina Park. Second-year, Mechanical Engineering, Hallam Institute of Technology, Sheffield. Looking for a placement, summer 2026. — How do you know what's actually wrong?"* One screen. Touch: scroll to begin, or jump anywhere via a side rail.

**2. What I find — who she is, how she works.** The fan loosens into a row; each card tilts open a crack to show one real diagnosis line ("a cracked flange on the hub, hiding under the grease," "a seized cup, and the thing I should have checked first"). Caption: SolidWorks, MATLAB, some Python, a lathe and a mill, Saturdays at the co-op since 2023 — a job starts with what's actually wrong. Touch: tap a card to read its line in full.

**3. Parts — the work laid out.** The row spreads into a loose wall. Cards flip to their photo face: the flat-tyre bike as bought, the garage-floor inventory, the stripped frame, the trued hub, the bottom-bracket cup, the charger's gear train and housing, the pedal box bracket in CAD, and a text-only card for the co-op. Touch: click a card to open it larger; arrow keys move along the wall.

**4. What I did — the work shown working.** Same wall, cards flip to an action line each: redesigned, rebuilt, trued, stripped, freed-cleaned-greased, sorted, fixed-what-came-in.

**5. Test ride — what came of it, stated plainly.** Cards flip to outcome. The bracket reads "18% lighter — in CAD and simulation. Not yet machined. Due November 2026," marked open, not ticked. The charger reads "It worked. Badly: four minutes of cranking for one percent of charge." The co-op card stays open with no closing date. Nothing here is softened or inflated.

**6. Closed out — the close.** All eight cards restack into one pile, in order, like a finished day's tickets. The top card carries her email, a CV download, and a link out to Slow Miles. Caption answers the opening question: *you check, and you don't call it fixed until you've tested it.*

**Thirty-second visitor:** screen one alone gives her name, her field, the question, and eight visible cards as proof at a glance. A rail jumps to any chapter; a "Closed out ↓" link skips straight to contact.

## Without the 3D

- **Phone:** same six chapters, same captions. The wall becomes one card at a time, swiped through; flips are taps, not hovers. Nothing here ever needed true 3D/WebGL — the cards are flat shapes moved with CSS — so there's no heavier fallback to drop.
- **Reduced motion:** every beat shows its settled end-state directly; nothing moves on its own, a tap still flips a card.
- **No WebGL:** no change — doesn't apply.
- **No JavaScript:** a plain page top to bottom, each chapter an ordinary section, cards as a static grid of image-and-text, rail as a list of anchor links, close as plain text with a mailto link.

## Look and type

Three candidate looks, built as real samples once this is approved and chosen by scrolling, not from swatches alone:
1. **Service counter** — kraft/off-white ground, charcoal ink, worn safety-orange accent, manila ticket surface with a punched hole.
2. **Workshop steel** — brushed steel-grey ground, graphite ink, safety-yellow or grease-amber accent, stamped zinc-tag surface.
3. **Night ride** — near-black ground, warm off-white ink, reflective-amber accent, faintly glowing card edges.

Type: a plain humanist sans (Inter / IBM Plex Sans family) for all running text; a monospace/typewriter face (IBM Plex Mono or similar) for everything printed on the cards themselves, since a real job card is typed or hand-filled, not typeset.

## Everything else the site needs

| | Build / later / never | Decided by |
|---|---|---|
| Way round the page (rail + skip-to-close) | Build | Me |
| A page per project | Later, once the bracket's machined (Nov 2026) | Me — worth confirming nearer the time |
| Every project listed | Build, all eight, nothing hidden | Me |
| Contact + CV | Build | You — but **I need from you:** a CV file to link, or should the page stand in for one? |
| Testimonials | Never | You — none exist, none invented |
| Languages | Never, English only | Me |
| Shared-link preview + favicon | Build | Me to build — but **I need from you:** which photo/card should show in a shared link's preview |
| 404 page | Build, small, same look | Me |
| A blog | Never here — link out to Slow Miles instead of rebuilding it | Me — confirm you're fine linking out |
| Chat | Never | Me |
| Legal notice | Never for now | Me |

Everything marked "Me" is a judgement call, listed in full with reasons in `docs/story/decided-for-you.md` — any of it can be changed, just say which row.

That's the whole script. Say yes and I'll treat the plan as settled (building itself is still a separate step, not part of this), or tell me what to change — including the two things only you can answer: the CV file, and the image for the shared-link preview.
