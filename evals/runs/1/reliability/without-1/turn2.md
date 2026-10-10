This changes the shape of the site for the better — especially the 2014 table-drop story. That's not a footnote, that's your cold open.

## The restructure

**New opening act, before anything else:** 2014, the library, you drop a table, first production outage. This is how your talk opens, so the site should open the same way — it's not a stunt, it's your actual origin story. Visual: one red node in the graph glitches and fails, quietly, no dramatics. Then the thesis line — "I move systems that are not allowed to stop" — now lands as something earned, not asserted. The whole site becomes a before/after arc on two levels at once: the person (breaks a table → owns rollbacks for a living) and the systems (red cluster → cyan cluster). Same visual language, now carrying more weight.

**Revised section-by-section, where the facts change the copy:**

- **Preflight (stats):** 99.98% is labeled honestly — order API availability, measured over the 26-month migration, two incidents, both under ten minutes, both internal. I'd state the incidents plainly rather than bury them. For the audience you named — a company afraid of its own migration — "here's exactly what went wrong and how small it was" builds more trust than a clean number with no texture.
- **Cutover (on-call):** rewritten in "we" — a nine-person team, pages dropping 85→22 over about a year, roughly half of that from deleting alerts nobody needed. That last detail stays in; it's a better signal of judgment than the raw number alone.
- **Runbook:** you wrote v1, still own it, 40 teams run on it now. Link out to the "Boring Migrations" talk and its slides (public) — the talk opening with the same table-drop story as the site is a nice, true piece of symmetry, worth saying out loud somewhere small.
- **ferry:** rewritten for accurate attribution — maintainer since 2022, didn't create it, wrote its cutover command. Original author gets credited, not erased.
- **Lumen Pay:** demoted from a section to a single line in a plain career list — card payment systems, 2016–2020, nothing shown beyond that. No visual, no case study.
- **Old site:** dropped entirely, no wink, no reference. You said nothing links to it — so the new site doesn't either.

**New small section — "What I work from":** the runbook, the cutover checklist, the rollback plan, as living documents rather than résumé bullets. I'd use your line close to verbatim: postmortems only happen when something's gone wrong — which is the point. This is a good, quiet place for the Google SRE book and *Release It!* too, if you want them visible — they'll signal the right things to the right readers without you having to say it.

## Who it's for, and what that changes

You're going independent next year and want this to reach two kinds of readers: a company about to run a migration it's afraid of, and conference organizers. That reframes the whole site's job — it's not a job-hunt portfolio, it's a trust instrument. Two consequences:

- The 3D/motion needs to stay in service of "calm and controlled," never "impressive for its own sake." If a visual choice reads as flashy rather than precise, it's wrong for this brief, even if it would score well on an awards site.
- The closing CTA should speak directly to that reader — something like "if your migration scares you, write to me" — rather than a generic contact form. I'll draft that copy when we build it.

## What I'm assuming — tell me if any of these are wrong

- "Next year" → I'll write the close as "available from 2027" unless you want a specific month.
- Stating the two <10-minute incidents openly in the stats section, rather than only on request — my judgment is this helps your specific audience more than it hurts you, but it's your call to soften or cut.
- Including the SRE book and *Release It!* in "What I work from" — easy to cut if you'd rather keep your reading list private.
- The runbook/checklist/rollback plan stay described, not published as downloadable templates, since I don't have redacted versions — flag if you'd want to eventually share sanitized ones, that'd be a strong credibility piece.

Confirm those four and I'll move to building — starting with the cold open and hero, since that's the section the rest of the site now depends on.
