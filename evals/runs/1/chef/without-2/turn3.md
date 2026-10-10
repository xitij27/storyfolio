# The Larder — full plan

## 1. The jar wall (hero)

**Visual**: Priya Nair's jar-wall photo, full-bleed, dim — credited to her, lower corner, small and permanent, not a hidden tooltip.

**3D**: this is the one place on the site with real WebGL — a single glass jar sits center-screen in front of the photo, lit with amber liquid and a slow trail of rising bubbles (fermentation's actual visual signature, not decoration for its own sake). It rotates gently on its own and responds a little to mouse/touch drag. As the visitor starts scrolling, the jar's lid tilts and lifts off, and the jar fades into the flat photo behind it — the only "object" on the whole site, used once, deliberately.

**Click**: nothing required to click — a small down-arrow or "scroll" cue only, so the first impression is the jar, not a UI element.

**Copy**: her name, "Head Chef, Saltmarsh" — no date here, no title card. The chef title's date (September 2022) is saved for later where it has context, not front-loaded like a resume header.

## 2. What she does (intro)

**Visual**: a blurred prep-table photo (her own phone shot) that sharpens into focus as the section's single line of text — *"Most of what I care about happens before service"* — finishes appearing.

**3D**: none. The focus-pull *is* the effect — a CSS filter transition tied to scroll position, not a 3D asset. Proof that "moves as you scroll" doesn't require geometry every time.

**Click**: nothing.

## 3. How the kitchen runs

**Visual**: the prep list and the ferment log, shown as what they actually are — a working document, not styled as inspirational typography. Fields: date a jar was started, the salt, the days it gets checked, when it's ready. Line of copy: the menu is the last thing written each week, not the first.

**3D**: a flat log page lifts slightly off the surface in a shallow CSS 3D tilt as it scrolls into view, like picking up a page to read it, then settles flat. No rotation, no gimmick — just enough depth to feel handled.

**Click**: visitors can tap/hover one or two real log entries to see the handwritten-style field values. This needs 3–4 real examples from Ines — not invented — since fabricated salt percentages would undercut exactly the thing this section is proving.

## 4. The larder

**Visual**: the 40+ ferments, vinegars, and garums, shown as a shelf of her own labelled phone photos.

**3D**: a CSS 3D perspective shelf — jars sit at a slight depth offset from each other (near jars larger/closer, far ones smaller/further), and vertical scroll drives horizontal movement along the shelf, so it reads as walking past it. This is 3D-feeling depth without a WebGL cost — only the hero jar carries that weight.

**Click**: tap or hover any jar to flip up its label and see the real ferment-log fields from section 3 — started date, salt %, check days, ready date. This is the section where the site's "wow" and its authenticity are the same thing.

**Copy note**: labels only show what's actually written on them — no supplier info, no pricing, ever.

## 5. Before and after

**Visual**: a split image — prep trim and scraps on one side, the finished dish on the other.

**3D**: none; a single scroll-scrubbed crossfade/wipe between the two images, controlled directly by scroll position (fast scroll = fast wipe, slow scroll = slow reveal). As the images finish crossing, the number appears: cut from 14kg to 5kg a week.

**Click**: nothing.

**Copy**: written as "we," not "I" — the whole kitchen's figure, prep and plate waste only, measured over one month in 2023. A short note that bones aren't counted, since they go to stock, so the number doesn't overclaim.

## 6. The koji room

**Visual**: one tight, dark photo. Deliberately the smallest section on the site.

**3D**: none at all — the contrast with the larder's movement is the point. A line of copy: "it's a cupboard."

**Click**: nothing.

## 7. People

**Visual**: apprentices and Sunday Pot, shown as hands, prep action, backs at work — not faces, by default, since staff faces need Ines's per-person sign-off first. Callum Reyes's line sits here as a quiet pull-quote, text only.

**3D**: a soft layered parallax (foreground hands move slightly faster than the background kitchen) — no 3D geometry, just depth-of-field motion.

**Click**: nothing required; if Ines later clears specific staff photos, this is where named portraits would slot in.

## 8. Brine, the zine

**Visual**: the four issues of Brine, shown via their covers and Ines's own photos of the physical zine.

**3D**: a CSS 3D page-curl as the visitor scrolls or drags — genuine paper-turn physics, since this is the one thing in the material that's actually print. Built to work fully on covers and physical-issue photos alone; if Olu clears his drawings later, interior spreads get added to the same flip without changing the mechanic.

**Click**: drag or scroll to turn pages; tap a page to pause and read it full-screen.

## 9. Where it comes from

**Visual**: her grandmother's ogiri pot, alone on screen — shortest, quietest section besides the koji room. A short line naming The Art of Fermentation and Wild Fermentation. Below that, a brief, honest aside: a ten-week unpaid stage in Fjaerland, Norway — washing jars, labelling, helping on two batches of garum. Framed as part of how she learned, next to her grandmother, not as a job credential.

**3D**: none. No motion at all here, actually — after eight sections of movement, stillness is the effect.

**Click**: nothing.

## 10. Visit

**Visual**: practical close. Three clear paths, nothing else: apply to the apprentice programme, press/writer contact, book a workshop (first Monday of the month). No "experience" timeline, no CV shape, no "hire me" — she isn't looking for a job, and the whole site has been built to never read as a resume.

**3D**: none.

**Click**: three buttons/links to the apprentice-application method, a contact method, and the workshop-booking method — all three still need to come from Ines; see the list below.

---

## The look

**Colour**: jar amber, deep olive, bone/cream, a charcoal (not pure black) for contrast, one sparing koji-green accent. Nothing neon, no decorative gradients.

**Type**: an editorial serif with some printed character for headings, in sympathy with Brine; a plain, warm sans for body text and UI so nothing reads as corporate; a hand-lettered face used only on the jar labels themselves, never in navigation or buttons.

---

## On a phone

Vertical scroll stays the one driver throughout. The hero's WebGL jar either renders as a lighter, pre-baked loop or drops straight to a static hero image with the lid-lift as a simple fade — phones and data plans shouldn't be made to pay for the desktop version's rotation. The larder's shelf becomes a swipeable horizontal gallery instead of a scroll-linked track. The before/after crossfade becomes a tap-to-toggle swap instead of a scrubbed wipe. The zine's page-curl becomes a straightforward swipe-to-next, keeping the paper feel without the drag physics. Parallax anywhere is capped at two layers. Images get real responsive sizing and lazy-loading — there are 60+ photos in the material, and the larder section alone could be heavy if that's not handled properly.

## Without the 3D

Anyone on `prefers-reduced-motion`, an older device, or a browser that can't run WebGL gets: the hero jar replaced by the static jar-wall photo with a simple fade-in (no rotation, no lid-lift); the larder's CSS-3D shelf replaced by a flat, still grid of the same jar photos, same tap-to-reveal labels; the before/after wipe replaced by an instant swap on tap; the zine's page-curl replaced by a plain next/previous page flip. Nothing on the site should be unreachable without motion — every interactive reveal (jar labels, log entries, zine pages) needs a non-animated equivalent, not just a slower animated one.

---

## Everything else the site needs

**Rights, open before launch:**
- Priya Nair credited wherever her photos appear; her/Saltmarsh's OK for portfolio use (versus restaurant-site use) still needs a direct confirmation from her or Callum.
- Olu's zine drawings are not yet cleared — the zine section is built to work without them, and gets upgraded only once he says yes.
- No staff faces anywhere until Ines names specific people and photos as cleared.
- No supplier pricing anywhere.

**Content still needed from Ines:**
- 3–4 real ferment-log examples (start date, salt %, check days, ready date) — not invented.
- How apprentices apply.
- How workshops get booked.
- A contact method to list (email/Instagram/etc.).

**Ongoing upkeep, not one-time build:**
- The menu changes weekly and workshops are monthly — these need an easy update path (even a single editable file), separate from the rest of the static site, or the site goes stale within weeks.

**Technical and accessibility baseline:**
- Real alt text on every photo that carries meaning (labels, the pot, the trim) — not filler.
- A performance budget that keeps the one WebGL asset light enough for an average phone.
- Local SEO basics — her name, Saltmarsh, Leeds — since food writers and apprentice applicants are likely to search rather than click through from a link.
- Hosting and a domain, if she doesn't have one already.

Say go when the open items above are settled, or tell me to start building around what we have and leave the gaps as placeholders.
