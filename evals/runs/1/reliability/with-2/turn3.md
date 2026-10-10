Here's the full script, top to bottom. Saved in detail to `docs/story/storyboard.md` — summary below.

**The object:** 7 crates, each with a fixed identity for the whole page: the library (2014), Lumen Pay (closed, nothing to show), the 310-service migration, the Postgres upgrade, `ferry`, the runbook, and the SRE North talk. They never change identity, only arrangement.

**Top to bottom:**

1. **Opening** — name, the question ("How do you move something that is not allowed to stop?"), crates arriving dim and unarranged. One scroll in, a single light finds the library crate: 2014, the dropped table, why he cares about rollbacks.
2. **Preflight** (who / where from) — crates 1–3 line into a route: Addis Ababa → Amsterdam → Rotterdam, three jobs, three dates.
3. **Shadow** (how) — the Kestrel and Postgres crates step out and a second rail/bridge forms between them: old path dim, new path lit. This is where "boring on the day" and the runbook's six stage names get said.
4. **Dual Write** (what) — four crates turn to face the visitor as a wall: 310 services, the Postgres upgrade, ferry, the runbook. Click any one to open it and read the real case — ferry's opens onto a terminal screenshot and a GitHub link.
5. **Cutover** (what came of it) — the same four crates show one number each: 99.98%, 85→22/week, 40 teams. Click a number and the honest caveat appears next to it — the two sub-ten-minute incidents, "we" not "I" on the on-call number.
6. **Soak** (proof it held) — the talk crate opens: title, link to the video, link to the slides.
7. **Decommission** (the close) — all seven crates close and restack into one block. Mailto, a copy-email button, a link to your corrected CV. "I'm going independent next year — write to me."

A side rail jumps to any chapter, plus a "skip to contact" link — so someone with thirty seconds gets your name, what you do, one number, and how to reach you in two scrolls.

**Without the 3D:** same chapters, same order, same captions, nothing hidden. Phone: the wall becomes a tap-through stack, hover becomes tap. Reduced motion: no drifting or restacking, each beat just appears already settled. No WebGL: flat illustrations stand in for the crates. No JavaScript: one static page, six sections, still images, every link and the mailto already visible and crawlable.

**Look:** three directions to choose by scrolling once built — freight yard at dusk (near-black blue-grey, warm off-white, safety-yellow accent), cold warehouse daylight (pale concrete, near-black ink, international orange), or night-shift terminal green (true black, CRT green accent). One plain grotesk for all running text; a true stencil face for anything "printed" on a crate — never mixed into body text.

**Still needed before build:** a real photo of you; at least one real artifact (a `ferry` terminal screenshot, a clean non-internal diagram of the migration or the Postgres upgrade); the talk's thumbnail and links; your call on whether the Postgres crate sits silent in the numbers chapter or gets a number; and two open questions — does Dutch matter, and do you need a legal notice once you're independent.

Everything else the site needs — nav, per-project pages (later), CV/contact, no testimonials section, no blog, no chat, a 404 — is in the file, each marked build/later/never with who decided.

This isn't being built in this conversation. Tell me yes, or what to change, and that becomes the handover for whoever builds it next.
