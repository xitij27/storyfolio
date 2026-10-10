I'll start by looking at the material folder to understand your background and work before planning anything.

Read both files. This isn't a typical dev/designer portfolio — it's for Ines Okafor, Head Chef at Saltmarsh, and the material is all kitchen, fermentation, and zine-based. Here's a plan that's built from that, not a template with her name pasted in.

## The idea

The site is framed as **walking through the larder**, not scrolling through a resume. Fermentation is Ines's whole philosophy — patience, transformation, turning trim into the best thing on the menu — and that becomes the structural logic: everything moves slowly, nothing is instant, things only reveal themselves as you keep going, the way a jar you started in autumn is finally ready in spring.

The "award-winning, 3D, moves-as-you-scroll" feeling should come from real objects behaving physically — jars, labels, steam, brine, paper — not abstract geometric shapes floating in a void. If it looks like a WebGL agency demo, it's wrong for her. The benchmark is: does this feel like it was built around a 40-seat kitchen in Leeds, or could it be swapped onto any chef's name? Every motion idea below is tied to something in the notes, not invented for effect.

## Scroll narrative, top to bottom

**1. The jar wall (hero)**
Full-bleed, one of Priya Nair's jar-wall photos, dim. As you start scrolling, jars drift apart slightly in layered depth (near jars move faster than far ones — real parallax, not a 3D scene), light catches liquid through glass. Her name and "Head Chef, Saltmarsh" fade in low on the screen, understated. No big hero statement — the image carries it.

**2. What she actually does (intro)**
Short, in her voice: *"Most of what I care about happens before service."* Text sits over a blurred, slowly-focusing prep-table photo — the image sharpens as the text finishes revealing, so focus itself is the scroll effect.

**3. The larder (the centerpiece)**
The 40+ ferments, vinegars, and garums on rotation become a shelf you move along horizontally while scrolling vertically — like physically walking past it. Each jar is one of her own labelled phone photos, not styled stock shots; tap/hover gives a label close-up and a one-line note (what it is, how old). This is the most "wow" section and it's built entirely from real labels, which is what makes it hers.

**4. Before and after (the waste number)**
One clean split-image transition: trim and scraps on one side, the dish it became on the other, scrubbed by scroll position. The 14kg → 5kg weekly food-waste drop appears as the two images cross — a stat that means something because you just watched the transformation, not a counter ticking up.

**5. The koji room**
Deliberately small and dark — it's a cupboard, and the copy says so. Tight photo, close crop, minimal text. The contrast to the big larder section is the point: not everything needs to be grand.

**6. People — apprentices and Sunday Pot**
Warmer, brighter. Two apprentices a year, Sunday Pot's weekly meal from restaurants' leftovers. Photos of people, not plates. Callum Reyes's recommendation lands here as a quiet pull-quote, not a testimonial carousel.

**7. Brine, the zine**
The four issues, Olu's drawings, presented as pages you flip through via scroll — a paper-turn interaction, since it's the one thing in the material that's genuinely print and tactile. This is where a page-curl/drag effect earns its place instead of feeling bolted on.

**8. Where it comes from**
Grandmother's ogiri pot, one photo, alone on the screen. The Art of Fermentation and Wild Fermentation get a one-line mention near it. Shortest section on the site, placed deliberately near the end — the "why," saved for last.

**9. Visit / workshops / contact**
Saltmarsh location, first-Monday-of-the-month workshops, and a way to get in touch. Closes grounded and practical after all the atmosphere.

## Colour and type

- **Palette**: pulled from brine and glass, not a design-tool default — jar amber, deep olive, bone/cream paper, charcoal (not pure black), with a cloudy koji-green used sparingly as the one accent. No neons, no gradients-for-the-sake-of-it.
- **Type**: an editorial serif with some character for headings — it should feel printed, in sympathy with the Brine zine issues — paired with a plain, warm sans for body text and UI, so labels and prep notes read like actual kitchen handwriting didn't get lost under "web design" typography. A label/hand-lettered face appears only on jar labels themselves, never in UI chrome.

## On a phone

Vertical scroll stays the primary driver throughout — the site is phone-first in practice, since most people will land on it from Instagram or a search, not a desktop. The larder's horizontal shelf becomes a swipeable gallery instead of a scroll-linked track; the split-image waste transition becomes a straightforward before/after swap instead of a scrubbed crossfade. Parallax layers are reduced to two at most. Everyone gets `prefers-reduced-motion` respected properly — most of this should degrade to a simple fade, not break or jank. Image weight matters a lot here: 60+ photos need real responsive sizing and lazy-loading, or the larder section will feel heavy on mobile data.

## What else the site needs before it's built

- **Asset sourcing and rights**: confirm Priya Nair is OK with her restaurant photos being reused on a personal portfolio site, and credit her; same for Olu's zine illustrations. These are currently "my photos" by association, not necessarily cleared for this use.
- **A way to keep the menu and workshop dates current**: the menu changes weekly and workshops are monthly — if those are hardcoded into the build, the site goes stale within a month. Needs a lightweight update path (even a single editable data file) separate from the rest of the static content.
- **Missing contact details**: no email, phone, Instagram, or Saltmarsh website link in the material — needed for the final section to actually be useful rather than decorative.
- **Zine access**: is Brine readable/purchasable anywhere, or is it just shown? If people are meant to get a copy, that path needs to exist.
- **Apprenticeship info**: if the programme takes applications, the site needs to say how, even briefly.
- **Alt text and captions for every photo**: these images are doing a lot of narrative work (labels, the pot, the trim), so accessibility text needs to carry real content, not "image of jar."

That's the shape of it. Let me know what you'd change, and I won't start building until you say go.
