I'll look for the material folder to understand who you are and what work needs to be featured before planning anything.

## The honest version of "award-winning"

Here's the tension worth naming up front: you asked for 3D, scroll-driven, stand-out — the Awwwards register — but your own material folder has a note from you saying don't make this look like more than a second-year. Those aren't actually in conflict. The flashy agency-template version of this genre borrows generic abstract blobs and fake case studies. The version that actually stands out *and* feels honest is one where the motion and 3D come directly from things you really have — a bracket you modeled, a bike you're stripping to bare metal — not from decoration bolted on top. That's the concept below.

## The concept: **Teardown**

The whole site behaves like your own process: strip something down to see how it works, then put it back together better. It's literally what you did to the pedal box bracket, and literally what you're doing to the 1984 frame on the garage floor. One idea, two real projects, no invented metaphor.

Visual language: technical drawing, not sci-fi. Blueprint grid lines, dimension callouts, exploded-view diagrams, grease-pencil annotations — the aesthetic of a workshop manual, not a spaceship.

## Scroll journey, top to bottom

**1. Hero**
Your name, course, one line ("Second-year mechanical engineering, Hallam. Looking for a summer 2026 placement."). Behind the text: your actual pedal-box bracket, rendered as a slow-rotating 3D/CAD model on a faint blueprint grid. No stock hero shot — this is the one piece of real geometry you own, so it does the work a flashy intro usually fakes.

**2. Scroll trigger: the bracket explodes**
As you scroll past the hero, the bracket model scrubs apart into an exploded view — mounting points, material callouts, the 18%-lighter number appearing as a dimension label. This is the Formula Student section: what the problem was, what you changed, the team's result (12th of 68) stated plainly, not oversold. One real project, treated with real weight.

**3. Hand-crank charger**
Smaller, said smaller. A simpler scroll moment — the gear train rotating as you scroll past, housing fading in around it. Framed honestly as a first-year group project: what the mechanism does, your part in it. No attempt to make it look bigger than it was.

**4. Second Gear Bike Co-op**
Tone shift on purpose: away from clean CAD lines into photo texture — grain, workshop light, hands on tools. This is "time served," not a design project, and it should feel different to that end. A short strip: what you fix, since when.

**5. Slow Miles — the restoration (the emotional spine of the site)**
This is where the long-form scroll-telling happens, because it's your most real material: the inventory laid out on the garage floor, the paint stripped back, the cracked hub flange discovered under the grease, the seized bottom bracket. Each blog post becomes a scroll beat with your actual photos — tyre to teardown to rebuild. This section should feel slower and more personal than the engineering sections; it's the proof you keep going at something for its own sake, which placement reviewers will read as character, not padding.

**6. Tools / skills**
Styled like the "inventory" post itself — a parts list, not a buzzword cloud: SolidWorks, MATLAB, some Python, lathe and mill (workshop induction). Said exactly as true as it is.

**7. Looking for / contact**
Direct: what placement you want, email, a CV download, a link out to Slow Miles if you want people to keep reading. No testimonials section — you were right to flag you don't have any, and a fake one would undercut everything else. If anyone from Hallam Racing or the co-op is willing to give you a line later, that's a real future addition, not something to fabricate now.

## Colour and type

- **Base:** graphite/charcoal, near-black, off-white paper tone for body copy — like a print engineering drawing, not a dark "agency" void.
- **Accent:** one blueprint cyan/navy for CAD-style lines, dimension marks, and links. One warm brass/steel tone (from stripped metal, bike patina) for the restoration section only — so that part reads visually distinct and personal against the colder engineering sections.
- **Type:** a clean grotesk sans for body copy (legible, unpretentious), paired with a monospace for labels, numbers, and annotations (the "18% lighter," dates, dimensions) — echoes drawing callouts without tipping into gimmick. No display/script fonts; nothing that reads as "startup landing page."

## How it holds up on a phone

- The exploded-view and gear animations go from scroll-scrubbed to tap-to-reveal — thumbs don't scroll-drive 3D well, so touch triggers the explosion/rebuild step instead.
- Heavy 3D (the bracket model) swaps for a lightweight pre-rendered sprite sequence or a short looping video on mobile — same visual, far less GPU load and battery drain.
- `prefers-reduced-motion` is respected everywhere: anyone with it set gets the static end-state of each animation (exploded view already apart, gear already visible) instead of the motion.
- Single column, generous tap targets, photos reflow to full width; the bike-restoration photo set becomes a swipeable strip rather than a scroll-pinned sequence.

## What else the site needs before this can be built

- **Assets you mentioned but I haven't seen:** the CAD file or exported model/renders of the bracket (ideally a glTF export, or at minimum clean renders from multiple angles), and the bike restoration photos (the inventory shot, the stripped paint, the hub flange, the bottom bracket).
- **A CV/resume PDF** to link for the placement CTA (your cv.md has the content, but a downloadable PDF is what recruiters expect).
- **Confirmation of what's clickable:** is Slow Miles live at a real URL, and do you want it linked out, or do you want its content folded into this site instead?
- **Contact preference:** plain mailto link, or a form?
- **Scope check:** given how much real material there is, I'd keep this a single long-scroll page rather than multiple pages — it matches "I don't have much yet" and avoids thin pages. You can always split into pages later as the Formula Student and bike projects grow.
- **The baseline web stuff:** favicon, page title/meta description, a social preview image (probably the bracket render), alt text on every photo, and a performance budget so the 3D doesn't tank load time on a phone.

Nothing's built yet — let me know what you think of the concept and the section order, and whether you can get me the bracket model/renders and the restoration photos, and I'll start.
