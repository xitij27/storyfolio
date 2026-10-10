This changes the site’s central promise: **you help companies make migrations they are afraid of, with a clear plan for what happens when things go wrong.** The portfolio should lead toward that consulting conversation, with a second path for conference organisers.

The visual concept still fits, but the flow should no longer suggest an uninterrupted migration. Its defining moment should be a controlled cutover with a visible way back.

**The revised concept: “A way forward. A way back.”**

Suggested opening copy:

> **Move the system. Keep a way back.**  
> I’m Dawit Bekele, a platform engineer working on migrations, cutovers, and reliability. I plan the move—and the rollback—before production changes.

Primary link: **Tell me about your migration**  
Secondary link: **Speaking**

Until your independent practice launches, the introduction should accurately describe your current position and the planned transition. Avoid implying that you already offer immediate consulting availability.

1. **Open with the situation your future client recognises**

   Pair the headline with a restrained 3D model showing an existing system, a destination, and two possible routes. The rollback route is visible from the start.

   Below it, name concrete concerns: moving live services, upgrading a large database, deciding whether a cutover is safe, and knowing when to reverse it. These should read as problems you can help assess; specific service packages can wait until your availability and offering are settled.

   The scene establishes your approach within seconds. Visitors can proceed straight to the evidence or contact you without navigating the animation.

2. **Show the evidence, including its limits**

   The flagship migration section should say:

   > At Kestrel Freight, I led the migration of 310 services out of two data centres over 26 months. The order API measured 99.98% availability over that period. There were two internal incidents during the migration, each lasting under ten minutes.

   Keep the availability figure and its scope together wherever it appears. Remove “zero downtime” throughout the proposed site.

   On scroll, service groups move between environments. The diagram explains the process; it should not pretend to replay the migration’s exact chronology or incidents.

   The database story can retain the confirmed facts—4 TB, Postgres, dual writes, no maintenance window—while omitting version numbers until the conflicting accounts are resolved.

3. **Make the working documents the heart of the site**

   Your approach section should centre on three things:

   | Document | What visitors should understand | Visual treatment |
   |---|---|---|
   | **Runbook** | The sequence, responsibilities, and checks that make the migration executable. You wrote its first version, still own it, and 40 teams use it. | The infrastructure model progresses through preflight, shadow, dual write, cutover, soak, and decommission. |
   | **Cutover checklist** | The evidence needed to proceed and the conditions that mean stop. | A short, readable editorial layout beside the cutover state. |
   | **Rollback plan** | How the team returns to a known state if the move fails. | The return route becomes prominent, and an illustrative reversal demonstrates the principle. |

   Use public examples from your talk and slides where available, or clearly labelled illustrative excerpts. Internal documents and diagrams stay private.

   A postmortem belongs in the account of an incident, when relevant. It should not appear as a routine migration deliverable.

4. **Explain why rollback matters to you**

   After visitors have seen your method, introduce the library story:

   > In 2014, at the university library, I caused my first production outage by dropping a table. That experience is why I care about rollback plans.

   Keep it brief and in your voice. Link to the talk for the fuller account, without adding recovery details or lessons you have not supplied.

   This gives the technical approach a personal foundation. It also provides a natural transition into **“Boring Migrations,” SRE North 2024**, with a dedicated speaking link and, once verified, the video and public slides.

5. **Describe the shared work precisely**

   The reliability section should use **“we”**:

   > Over about a year, our nine-person on-call team reduced pages from 85 to 22 per week. About half of that reduction came from deleting alerts nobody needed.

   A simple graphic can show the reduction. Supporting text should explain alert quality and team workload without attributing the entire outcome to you.

   The `ferry` entry should say:

   > Maintainer since 2022; author of the cutover command. Created by a former colleague.

   Show what the cutover command helps someone do once its behavior is verified. Link to the repository and credit its creator by name if you choose to provide it.

   Keep Lumen Pay to the LinkedIn-level description: **Site Reliability Engineer, on the team running card payment systems.** No case study, diagrams, or additional operational detail.

6. **Close with a useful invitation**

   Suggested contact copy:

   > **Planning a migration you’re worried about?**  
   > Tell me what is moving, what must keep working, and when you need to make the change.

   A direct email link is enough initially. Add a separate invitation for conference organisers, leading to a speaking page with the talk description, public recording and slides, and a short biography.

   The career history can remain compact. A small reading note can mention the **Google SRE book** and **Release It! by Michael Nygard**, ideally with a sentence from you about their influence. It does not need its own homepage section.

The warm ivory, charcoal, deep teal, and copper palette still suits this direction, as do Instrument Sans and IBM Plex Mono. Copper should mark decision points; explicit labels should distinguish routes and states. Keep the geometry quiet and the documents easy to read.

On phones, use stacked diagrams for the migration stages, including the rollback route, instead of a long pinned 3D sequence. Reduced-motion and WebGL fallback versions should carry the same complete story. Native scrolling, keyboard access, readable text before graphics load, and clear contact links remain essential.

My assumptions are that the launch will primarily support independent work next year; contact should go directly to you; and the existing site can be replaced without preserving its design or content structure. Public talk material is eligible source material, but I have not reviewed it here. I would verify it before deriving diagrams or excerpts. The email, repository address, talk links, exact availability, and Postgres versions still need confirmation before publication.

**This remains a plan; nothing has been built.**
