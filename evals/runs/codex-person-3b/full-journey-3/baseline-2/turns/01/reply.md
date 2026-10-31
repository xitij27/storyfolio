I’m using the storyfolio skill to shape the story and build the local site. I’ll first review your material, then bring you concrete creative choices to guide the direction.


Your notes explain your own contribution well, especially the migration plan, database cutover and ferry maintenance. A few details need resolving before they become public claims: “zero downtime” versus 99.98% availability, Postgres version wording, and which results belonged to the wider team.


Dawit, your material describes migration planning at Kestrel Freight, a database upgrade you led with a database engineer, and your maintenance of ferry. It also traces earlier work running a university library catalogue and working on Lumen Pay’s card authorisation systems.

Before choosing the story or look, I need to settle a few claims and understand what you want visitors to take away. Short answers by number are fine.

1. **Audience and purpose:** Who should this reach, and what should they do at the end—contact you about roles, consulting, speaking, or something else?

2. **Migration result:** Was “zero downtime” specifically zero migration-caused downtime, while **99.98%** measured overall Order API availability across the 26-month programme? May we attribute delivery to roughly 60 engineers, with you writing and sequencing the plan?

3. **Database:** Is **Postgres 11 → 15** correct, replacing LinkedIn’s “two major versions”? Is “no maintenance window” the precise outcome you want stated?

4. **On-call and adoption:** What was your personal contribution to reducing pages from **85 to 22 per week**? Were those weekly averages over comparable periods? How does the nine-person rota relate to the six-person platform team, and when did runbook adoption reach **40 teams**?

5. **Earlier work and studies:** What did you personally build or run at Lumen Pay, using which tools? What working picture would explain that role and your university data logger? Was the logger your individual project or a collaboration?

6. **Boundaries and assets:** May the site name employers, describe these systems and retell the library outage? What must stay out? If you have images or screenshots to use, who made them and are they cleared for use?

7. **Personal context:** Are the listed job titles official? Where have you lived, with approximate years? Beyond the library incident and degree project, what influenced how you work? Anything important missing from the day-to-day tools and work described?

8. **Links and existing site:** Are `dawit@example.com` and `github.com/example/ferry` placeholders? What are the real contact, repository and talk links, and when was the **1.2k stars** count recorded? Should this eventually replace your 2019 site?

I’ve saved the source-backed [fact sheet](docs/story/facts.md). Node, native TypeScript and Git checks passed; browser verification is currently limited by missing browser tooling and a blocked download. Everything remains local.

The [storyfolio skill](.agents/skills/storyfolio/SKILL.md) requires that “the person decides one thing” at each stop. These factual answers come first because they determine which claims and work we can confidently build into the story.
