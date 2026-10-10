I'll start by going through the material folder to understand who you are and what work you have to showcase.

I read through all three files. Here's what I'm working with: Mina Park, a second-year mechanical engineering student (Hallam Institute of Technology, Sheffield), looking for a **summer 2026 placement**. Real substance: a Formula Student chassis sub-team project (pedal box bracket, 18% lighter, team 12th/68 at FS-UK 2025), a first-year hand-crank charger project, a Saturday job at a bike co-op, workshop skills (lathe, mill, SolidWorks, MATLAB, some Python), and — importantly — a personal blog, *Slow Miles*, documenting a ground-up restoration of a 1984 steel road bike, with photos and CAD of the bracket already in hand. And she was explicit: **don't make this look like more than a second-year's work** — no one has written about her, no press, no testimonials.

That last point should drive the whole plan. The spectacle has to come from how honestly her actual process is shown, not from borrowed polish. Here's the plan.

---

## The idea

Mechanical engineers communicate through **exploded views, drawings, and inventories** — taking things apart to understand and show them. Mina already does this instinctively: she photographed every part of the bike on the garage floor and labelled it keep/fix/replace before touching a spanner. That's the concept: **the site reads like an exploded diagram of her own work** — things coming apart as you scroll, so you can see how they're built, then settling back into place. It's a real engineering convention, not a decorative gimmick, so the 3D earns its place instead of feeling bolted on.

No "award-winning studio" voice, no inflated metrics beyond the two real ones she has (18% lighter, 12th of 68). The tone throughout: plain, concrete, slightly understated — closer to a lab notebook than a pitch deck.

## Scroll walkthrough, top to bottom

**1. Hero**
Her name, course, and institution set small and plain — then one line: "Looking for a summer 2026 placement in mechanical or product design." A single real object — the pedal box bracket, rendered from her CAD — sits mid-screen in its *assembled* state. As you start to scroll, it's the trigger for everything below: the first bolt begins to unseat.

**2. Formula Student — the bracket**
The bracket continues exploding into its constituent parts as you scroll, each part pausing with a short label (material, process, the 18% figure) — like a technical drawing's callouts. End state: parts laid out flat, mirroring the inventory-photo instinct from the bike blog. Team result (12th/68) sits here as one plain line, not a headline.

**3. Hand-crank charger**
A smaller, quieter section — this was a first-year group project, so it's framed that way ("gear train and housing, built with three others"). Maybe a simple rotating gear-train diagram rather than a full exploded model, to keep visual weight proportional to the project's actual size.

**4. Work — Second Gear Bike Co-op**
A short, grounded section on the Saturday mechanic work. This is where "hundreds of bikes fixed" lives — stated plainly, no counter animation inflating it into something it isn't.

**5. Slow Miles — the restoration**
The emotional core of the site, and arguably the most "her" part. A horizontal or layered scroll through the five existing posts as a timeline: flat tyre → inventory on the garage floor → paint stripped → the hub flange crack → the seized bottom bracket. Real photos doing the work here, not 3D. This section should feel like flipping through a documented process, with direct links out to the actual posts on Slow Miles.

**6. Skills & tools**
SolidWorks, MATLAB, Python, lathe, mill — presented as a simple toolkit list, not a skill-bar graphic (those read as padding when the list is this short and honest).

**7. Close / contact**
CV download, email, and a line back to what she's looking for. Keep this understated — one clear call to action, not a contact form with five fields.

A thin progress indicator (e.g. a small line-drawing of the bracket that fills in as you scroll) could double as a scroll progress bar — functional, on-theme, not just decoration.

## Colour and type

Avoid the generic dark-gradient "creative agency" look. Lean into **technical drawing language**: off-white or pale grey-blue background (like cartridge/drawing paper), near-black linework, a single blueprint-blue accent for annotations and active states, and a muted brass/orange accent (sparingly) for the bike restoration section — a nod to old steel and patina without going twee.

Type: a workmanlike grotesque sans for body copy (something like Inter or IBM Plex Sans), paired with a monospace for labels, dimensions, and data points (project stats, dates) — echoing the look of annotated engineering drawings and giving the numbers a "measured" feel rather than a marketing one.

## On a phone

Full WebGL exploded-view animation is expensive and scroll-jank-prone on mobile. Plan:
- Same structure, but the 3D bracket becomes a **pre-rendered sequence of still frames** (or a much lighter model) swapped on scroll — visually similar, far cheaper.
- Sections stack vertically with shorter scroll-distances per beat, since mobile scrolling is faster and less precise than a trackpad.
- Respect `prefers-reduced-motion`: fall back to a static exploded diagram with no animation.
- Photos (Slow Miles section) become the primary content on mobile, since they're cheap and already strong — 3D is the thing that scales down, not photography.

## What else it needs before anything gets built

- **Real contact details and the real Slow Miles URL** — the CV has placeholder-looking ones (`mina@example.com`, `slowmiles.example`); need the actual ones before launch.
- **Export of the CAD model** (or at least clean renders/turntable shots) of the pedal box bracket for the exploded-view — SolidWorks file or a neutral export (STEP/OBJ/GLTF).
- **The garage-floor inventory photos and bike photos**, plus the five Slow Miles post links, for the restoration section.
- **A CV/resume PDF** to serve as the download.
- A decision on whether to show a photo of her — optional, not required for the concept to work.
- Lightweight analytics (optional) so she can see if recruiters are actually reaching the contact section, given the site's whole purpose is the placement search.

Let me know if this direction feels right, or if you'd rather shift the metaphor (e.g. lean harder into the bike restoration as the main thread with Formula Student as secondary) before we move to building anything.
