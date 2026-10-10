I'll start by looking through your material folder to understand who you are and what work you want to showcase.

Read both files — this is Ines Okafor, Head Chef at Saltmarsh in Leeds, built around fermentation and whole-vegetable cooking. That's a strong, specific identity to build on, so here's a plan that grows out of her work rather than a generic "award site" template.

## The idea

The site is built around **transformation over time** — the same thing that defines her cooking. Trim becomes larder, scraps become the best dish on the menu, a grandmother's unmeasured instinct becomes a 40-seat restaurant's whole philosophy. Scrolling down the page *is* that process: you move from raw and discarded, through the jar wall and the waiting, to what it becomes on the plate and in the community.

This also solves the "doesn't feel like a demo" problem directly: the 3D/motion isn't decorative, it's drawn from real things in her kitchen — jars, labels, a cupboard door, condensation, a prep list. The jar wall becomes the site's signature interactive moment, not a generic floating-shapes hero.

## The scroll, top to bottom

1. **Opening** — A wall of jars rendered in soft 3D, backlit, like the real one at Saltmarsh. Her name, role, and one line: fermentation, whole-vegetable cooking, apprentices. A small prompt to scroll, styled like a kitchen label, not an arrow icon.

2. **The philosophy** — Short, spoken-sounding text (hers, not copywriter voice): most of what she cares about happens before service — the trim, the whey, the stems, the bones. As you scroll, an image sequence scrubs through a trim-to-dish transformation. This sets the rule for the whole site: nothing here is decorative, everything was going to be thrown away first.

3. **The jar wall (centerpiece)** — The 3D moment. Camera glides along a wall built from her own larder photos — real jars, real labels. Tap or hover on one and it tells you what's in it and why. This is where "40+ ferments on rotation" lives, shown rather than stated.

4. **The koji room** — A short, funny, disarming beat, because people always ask about it: a cupboard door opens on scroll to reveal... a cupboard. One photo, one honest paragraph. This is the moment that makes the site feel like *her* and not a studio.

5. **The numbers** — 14kg of food waste down to 5kg a week, supplier list from 31 to 12, two apprentices a year since 2023. Shown as a scale or jar emptying as you scroll, not a dashboard — the point is restraint, not a KPI wall.

6. **The dishes** — An editorial gallery from the ~60 restaurant photos (credited to Priya Nair), a menu that changes every week. Large, slow, confident — the one section that's allowed to just be beautiful.

7. **Where it comes from** — A timeline from the grandmother's ogiri pot and the two fermentation books, through Leeds Kitchen College, Brassica, the Fjaerland Fermentation Lab in Norway, Corn Exchange, to Saltmarsh. Drawn like a route, not a corporate resume list.

8. **Brine, the zine** — The four issues (Olu's drawings) presented as something you leaf through — a stacked, fanned interaction rather than a flat image grid.

9. **Teaching** — The apprentice programme and the first-Monday workshops. Callum Reyes' recommendation sits here as a quiet, earned quote, not a testimonials carousel.

10. **Sunday Pot** — The volunteering work, closing the "nothing wasted" idea at a community scale before anything transactional.

11. **Visit / get in touch** — Saltmarsh details, workshop signup, press/contact, credits for Priya Nair and Olu.

A thin, persistent nav appears after the hero with jump links to these beats, since it's a long single scroll.

## Colour and type

- **Palette**: dark, warm ground (charcoal/near-black, like a dim dining room) so amber brines, jar glass, and photography carry the light. Accent tones pulled from real ferments — turmeric amber, beet red, cabbage-brine green — used sparingly, as if they were ingredients, not a brand system.
- **Type**: an editorial serif with some weight and character for headlines (menu/zine feeling, not a tech sans), a plain, highly legible sans for body copy, and a handwritten or masking-tape label style used only for jar labels, captions, and small callouts — tying back to her actual kitchen labelling.

## On a phone

- The 3D jar wall simplifies to a swipeable, still-interactive carousel rather than a WebGL camera move — same content, lighter engine.
- Scroll-triggered sequences (trim-to-dish, timeline) shorten and snap between fewer states rather than scrubbing continuously.
- Respect reduced-motion settings everywhere; nothing depends on motion to understand the content.
- Large tap targets, single-column everything, images served at phone-appropriate sizes.

## What else it needs

- **Photo and credit handling**: ~60 restaurant photos (Priya Nair), phone photos of the larder, four zine scans (Olu), and the grandmother's pot photo — all need optimisation/CDN delivery and visible, correct credit.
- **A way to update dishes weekly** without touching code, since the menu changes every week — even something lightweight.
- **Accessibility**: alt text for every jar/label image, real contrast on dark backgrounds, motion-reduced fallback paths.
- **SEO/meta**: Leeds location, restaurant name, social preview image — people will search "Saltmarsh" and "Brine zine."
- **Workshop signup**: first-Monday workshops imply some form of contact or booking, even just an email capture — needs a privacy note if it stores emails.
- **Hosting/domain**, favicon, and a simple press/credits footer.

Let me know what you'd change — especially the jar-wall interaction and the numbers section, since those are the two places doing the most "stand out" work — and I'll hold off on building until you say go.
