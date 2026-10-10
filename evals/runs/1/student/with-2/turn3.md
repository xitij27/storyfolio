Saved in full to `docs/story/storyboard.md`. Here's the whole plan.

## The idea

Concept A, the job card — built from the actual job card you fill out at the co-op (what's reported → what I find → parts → what I did → test ride). The question the page answers: **How do you find out what's actually wrong?** The object is eight real pieces from your own work — hub, wheel, bottom bracket, pedal, frame tube, headset, chain, and the Formula Student bracket — all real worked metal except the bracket, which renders as a thin CAD wireframe because it genuinely hasn't been machined yet.

## The chapters, top to bottom

| # | Chapter | Role | What happens | What you can touch |
|---|---|---|---|---|
| 1 | **Header** | Your name and the question | Rusted parts drift in and settle loosely | Scroll to begin; rail + "get in touch" visible already |
| 2 | **Customer says** | The problem as first reported | A wheel tags itself "flat," then all 8 parts fan into the garage-floor grid, tagged keep/fix/replace | Tap any piece for its real photo and label |
| 3 | **What I find** | How you actually diagnose | Paint strips off the frame on scroll; the hub splits open to show the cracked flange under the grease | Scrub the paint-strip; tap the hub |
| 4 | **Parts** | Tools, plus the other two projects | Tool marks appear on the pieces; the charger (gear + housing) enters and exits with its honest result; the bracket enters as a wireframe | Tap the charger or bracket for captions |
| 5 | **What I did** | The repair itself | The bottom bracket turns as if a wrench is on it | Tap for the post it's from |
| 6 | **Test ride** | Outcomes, stated plainly | Pieces assemble into a rolling bike; the bracket stays apart, still a wireframe | Just looking |
| 7 | **Close** | The answer, contact | Object at rest, whole — bracket shown solid as a stated projection of November, not a claim | Email, CV, link to Slow Miles, all live |

Full beat-by-beat detail — screens of scroll, exact captions, which real photo goes where — is in the storyboard file; nothing there goes beyond what you've told me. One gap I left open on purpose: I don't have your actual keep/fix/replace call for the pedal, headset or chain, so chapter 2 leaves those three untagged rather than guessing.

## Thirty seconds

First screen carries your name, course, and the question. A fixed top bar has a "get in touch" link from screen one, jumping straight to Close, and a rail that jumps to any chapter without scrolling through the rest. Someone who taps straight to "Parts" still gets one real proof — the bracket figure or the charger's honest number — without reading anything else.

## Without the 3D

| Where | What you get |
|---|---|
| Phone | Same 7 chapters, same order. Fewer pieces animate at once (4 at a time, not 8); the rail becomes a small expandable list; tap replaces hover. |
| Reduced motion | Every beat shows its settled end-state directly — no drifting, stripping, or turning. Same captions, same photos. |
| No WebGL | No 3D loads at all. In its place, same order: the real garage-floor photo, the stripped-frame photo, the cracked-hub photo, the bottom-bracket photo, the CAD screenshot. Reads as a plain photo-and-text page. |
| No JavaScript | Plain HTML. Seven sections top to bottom, rail becomes normal anchor links, email/CV/blog links all work. |

## Look and type

**Workshop** (my pick) — warm concrete grey ground, near-black ink, one accent — oxide-orange, used only for "fix" tags and the one contact link. Real pieces as brushed steel with oily highlights; the bracket alone in thin cyan wireframe, so built and not-yet-built are never confused.

Two others considered: a cream **paper job-card** look with ballpoint navy and a red-pen accent, and a **night workshop** look lit by one lamp. Workshop reads as an actual garage in daylight rather than a staged mood, so that's the one I'd build.

Type: one plain humanist sans for all reading text; a separate condensed, stamped/stencil face for anything printed on the pieces or tags — like a real parts label. Never mixed on one line.

## Everything else the site needs

| | Status | Decided by |
|---|---|---|
| Rail / skip-to-contact | Build | Me |
| A page per project | Never | Me — keeps it from reading as padded |
| Every project listed | Build (all 3) | Me |
| Contact + CV | Build | You asked directly |
| Testimonials | Never | You |
| Languages | English only | Me |
| Shared-link preview + icon | Build, later | Me |
| 404 page | Build, plain, no joke | Me |
| A blog | Never — links to existing Slow Miles | Me |
| A chat | Never | Me |
| Legal notice | Never (no form, just a mailto) | Me |

## Still open

1. Your real contact email.
2. Whether any photo shows the team car, branding, or anyone else.
3. Your actual keep/fix/replace call for the pedal, headset, chain.
4. Anything else you'd rather not have shown.

Say yes to this and I'll treat the storyboard as settled — building is a separate step from here, not something I start automatically.
