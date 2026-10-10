No memory yet — I'll create it. These corrections matter beyond this conversation since they override the resume/LinkedIn files for any future build work.

This changes the shape of the site for the better — it's more honest and more distinctive. Here's the revised plan.

## The idea, sharpened

Not a job-search portfolio. You're going independent next year, and this site has one job: get found by a company mid-dread about a migration, and by conference organizers, and make them write to you. Everything should serve that — including leading with the one story that explains *why* you're the right call for a scared migration: the table you dropped in 2014.

## The scroll, revised

1. **Hero / origin** — Opens the way your talk opens: 2014, Entoto library, a dropped table, your first production outage. Dark, almost nothing on screen — a single line, maybe a terminal cursor. Then: *"That's why I care about rollbacks."* Only after that does the present-day line land — *"I move systems that are not allowed to stop."* Earned, not asserted.

2. **The migration** — 310 services, two data centers, nodes migrating to the cloud as you scroll. Headline number is now **99.98% availability, measured on the order API, over 26 months** — not "zero downtime," and the copy says what it measures. No mention of the two incidents on-site (see assumption below).

3. **The toolkit** — reframed around what you actually work from: the runbook, the cutover checklist, the rollback plan. Pipeline stages (preflight → shadow → dual write → cutover → soak → decommission) for the Postgres 4TB/11→15 upgrade, same single switch-flip moment at "cutover." A quiet footnote: postmortems only get written when something's gone wrong — rare, by design. All diagrams here are illustrative recreations, not your real internal architecture, since those aren't public.

4. **On-call, together** — the chart now says "we," not "I": a team of nine, pages per week 85→22 over about a year, half of it just deleting alerts nobody needed. Collaborative, systems-thinking, not solo-hero copy.

5. **ferry** — correctly credited: built by a former colleague, maintained by you since 2022, cutover command is yours. Terminal demo types out *that* command specifically, since it's the part that's actually yours.

6. **The talk** — "Boring Migrations," SRE North 2024, public slides + video embedded. Lands as a callback — the scroll opened with the same story the talk opens with.

7. **Experience, as a changelog** — Kestrel Freight (full), Lumen Pay (title/dates/one line only, nothing more — hard boundary), Entoto Technical University Library (where it started), BSc Electrical Engineering.

8. **Influences** — a small aside, not a page: the Google SRE book, *Release It!* by Michael Nygard.

9. **Contact / footer** — rewritten around your actual goal. Two visible paths, not one generic form: *"If you're about to run a migration you're dreading, write to me"* and a speaking/booking line for organizers, pointing at the talk. Status-page motif ("all systems operational," real email) closes it.

Palette, type, and mobile plan from before stand — the hero's new tone (quiet, almost bare) just means that opening screen should be the most restrained moment in the whole site, with everything after it allowed to build confidence.

## Assumptions I made — tell me if any are wrong

- **Not displaying the two sub-10-minute incidents** on the site itself — just removing "zero downtime" and using 99.98% precisely. If you'd rather the incidents be part of the honesty-as-credibility angle, I can work them in.
- **ferry's original author stays anonymous** ("a former colleague") until you give me a name/handle to credit properly.
- **Lumen Pay gets zero visual treatment** — plain text line only, no diagram, no icon tied to it.
- All Kestrel migration/dual-write visuals are **built as generic schematics**, deliberately not resembling anything that could read as real internal architecture.
- The books are a **small credibility touch** (e.g. a two-line aside), not a reading-list section.

Still need from you: real email and GitHub handle (placeholders in the material), and the ferry author's name if you want them credited by name. Let me know on the assumptions and those two items, and whether the plan otherwise holds before we move to building.
