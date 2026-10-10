I'll start by reading through the material folder to understand your background and work before planning the site.

I read through all three files in `material/`. Here's who this site is for: **Marta Kowalczyk**, Associate at Field & Rowe Architects, Glasgow — retrofit, timber, housing. ARB registered. Her own words: *"I work on buildings that already exist... the most useful thing an architect can do is make an old building worth keeping."* She also builds things with her own hands (a timber cabin with her father) and teaches second-years one day a week.

That's the whole design brief, really. The "award-winning 3D scroll" instinct is right, but it has to be in service of someone whose entire practice is about *restraint* and *keeping what's there* — not someone who'd want shader particles and gratuitous spin. So the plan below ties every piece of motion to something she actually does: sections, layers, build-up, retrofit.

## The idea

**The site is a wall section.** Architects draw a cut through a building to show what it's really made of — brick, insulation, timber, render, air gap. That's the governing image. As you scroll down the page, you are scrolling *through* a section: from the outer skin of a building down to its frame, the way Calder Court's retrofit literally works (new insulation and render wrapped around a 1960s block). It's also the way the cabin was built — frame first, skin last, in reverse.

This gives the "things move as you scroll" instinct a *reason*: motion = construction, not decoration. No generic particle fields, no floating 3D text. The one genuinely 3D/interactive moment on the site is the real 1:5 wall build-up detail from Calder Court, built as an actual exploded axonometric you can scroll through layer by layer — because that's a real drawing of real work, not a demo.

## The scroll, top to bottom

1. **Hero** — Full-bleed. Her name, "Architect" under it, one line: *"I work on buildings that already exist."* Background: a slow, scroll-scrubbed crossfade between a Calder Court before/after pair — scrolling the mouse wheel literally retrofits the building in front of you. That's the thesis stated in motion before it's stated in words.

2. **Statement** — Large, quiet, editorial type on plain ground. Her About paragraph, lightly trimmed. No imagery. A breath after the hero.

3. **Calder Court (flagship)** — The centrepiece. Before/after photo pairs (Tom Reid's 14 shots) on a scroll-driven slider. Then the exploded axonometric of the 1:5 wall detail: render → insulation → existing block → winter garden, each layer sliding into place as you scroll, labelled like a drawing (leader lines, not captions). Then the heating-demand diagram, bars drawing themselves on scroll to land on "68% less."

4. **Kirk Street** — Lighter, faster section. Church hall → six flats. The 8 photos and the section drawing, presented as a simple before/after + "what changed" split. Deliberately less elaborate than Calder Court so it doesn't compete — this is a smaller job and should read as one.

5. **A School That Grows** — The one unbuilt project. No photos exist, so it's treated honestly as a competition entry: the six A1 boards, large and legible, swipeable/zoomable rather than forced into a 3D gimmick they weren't designed for.

6. **Cabin at Kashuby — the heart of the site.** Her own work, built with her father, ~200 photos, every drawing hers (hand then CAD), a time-lapse of the frame going up. This is where the scroll gets most physical: the time-lapse is scrubbed by scroll position (first post → last shingle, tied directly to how far down the page you are), and a hand-drawn sketch morphs into the CAD drawing beside it. This section should feel handmade and personal against the more "professional" polish of the practice work above it — different pacing, maybe a slightly warmer, closer crop of type, like a notebook.

7. **Teaching** — Short and plain. One paragraph, Year 2 studio, since 2022. A deliberate quiet moment, not a showcase — it's one day a week of her life, so it gets about that much of the page.

8. **Practice** — A compact timeline, not a CV dump: Gdansk Polytechnic → Brandt Lindgren → Clyde MArch → Field & Rowe (Architect → Associate) → ARB 2023. Set as a vertical line down the page (echoing the section-cut idea one more time), dates on one side, facts on the other.

9. **Contact / footer** — Name, Glasgow, ARB registration, a direct mailto, LinkedIn. No form — a letter-sized, plain close.

## Colour and type

- **Palette drawn from the work itself, not a trend:** warm off-white/paper ground (not stark white), near-black charcoal ink, one accent pulled from Calder Court's actual render/winter-garden colour — a muted ochre or brick-terracotta. That's it. No gradients, no neon, no glassmorphism. It should look like it could sit next to a site visit photo and not clash.
- **Type:** a confident grotesk/geometric sans for headings — something with the directness of lettering on a drawing sheet — paired with a plain humanist sans or quiet serif for body copy. A monospace or stencil-ish face used sparingly for labels, dimensions, and dates (leader-line annotations, scale notes), reinforcing "this is a drawing" without tipping into pastiche.

## Phone behaviour

- The vertical section-cut metaphor actually suits a phone screen better than desktop — it's already a tall, narrow cut.
- Heavy scroll-scrubbed effects (the before/after crossfade, the time-lapse scrub, the exploded axonometric) get lighter equivalents on small screens: swipe-through image sequences or a simple stepped reveal instead of continuous scroll-binding, to protect battery and scroll-jank.
- Large tap targets, swipeable galleries instead of hover states, and `prefers-reduced-motion` respected throughout — anyone with that OS setting gets straight crossfades/cuts, no parallax.

## What else the site needs before building

- **Image curation and prep**: selecting from ~200 cabin photos, compressing/resizing all photo sets, getting the competition boards and drawings scanned at usable resolution — this is the biggest pre-build task and should happen before any code.
- **The time-lapse footage** and the 1:5 wall detail drawing, in a form that can be scrubbed (frame sequence or sprite sheet, not just an embedded video).
- **Alt text** for every photo and drawing — doubles as accessibility and as a nice chance for her own words to describe the work.
- **A performance budget**: the exploded axonometric and scroll-scrub sequences need lazy-loading and poster-frame fallbacks so the site doesn't feel heavy on a first load.
- **Favicon/basic branding**, meta tags for link previews (so it looks right when shared), and a plain-text/print version of the CV section for anyone who just wants the facts.

I'd suggest we lock the Calder Court before/after hero and the exploded wall-detail idea first, since those are the riskiest/most technical pieces — once you're happy with the plan, I can start on structure and static content before touching any of the scroll-bound motion.
