I’m using the storyfolio skill to turn your material into a coherent 3D story and build it locally. I’ll first review what’s there, then guide you through the choices that shape the site.


Your notes explain the migration work in useful detail, including your role and what the systems look like. A few claims need reconciling—especially “zero downtime” versus 99.98% Order API availability, and the team’s on-call result. I’m recording those questions before proposing the story, so the site’s wording rests on facts you’ve confirmed.


I read all four material files. They describe your migration planning at Kestrel, database cutovers, runbook ownership, and earlier systems work. Your notes also distinguish your contributions from team results—something the site should preserve.

Before choosing a concept, I need to settle the facts below. Short answers by number are fine.

1. **Audience and contact:** Who should this attract, and what should visitors do at the end? Are `dawit@example.com` and `github.com/example/ferry` placeholders? Should this replace your 2019 site?

2. **Current profile:** Is Staff Platform Engineer your formal and preferred title? Are the listed employment and education dates correct? Where have you lived, with approximate years? What do you call your day-to-day work?

3. **Migration:** Your resume says “zero downtime”; your notes say **99.98% Order API availability across the programme**. What distinction should we make? Can we credit you with planning and sequencing, and the roughly 60 engineers with delivering the 310-service migration over 26 months?

4. **Database:** Should we say **Postgres 11 → 15**, rather than “two major versions”? Was 4 TB the size at migration, was there no maintenance window, and what did you personally implement alongside the database engineer?

5. **Runbook and on-call:** When were 40 teams using the runbook? Were 85 and 22 measured weekly averages over comparable periods? What was your part in the nine-person team’s alert review?

6. **Earlier work:** At Lumen Pay, what did you personally build or run, using which tools? May we tell the library’s 2014 incident, including the six-hour outage and recovery? Are its catalogue figures accurate, and when were nightly backups introduced?

7. **Open source, studies and learning:** Are you ferry’s sole maintainer or a co-maintainer, and when was its star count recorded? Was the degree project individual or collaborative, and did it operate on campus? Beyond the experiences in your notes, what shaped your approach? Please share the talk link if you want it included.

8. **What may appear:** May we name employers, use the confirmed figures, and create original diagrams explaining the systems? What must stay private? For Lumen, the library and your studies, what single working picture would explain each to a colleague? Your Kestrel and ferry notes already supply useful descriptions.

I’m holding the concept until these answers because attribution and permissions affect what the scenes can honestly show. This follows the [storyfolio skill](.agents/skills/storyfolio/SKILL.md): “You go on only when their answer is in the conversation and you have written it into the file.”

Everything remains local. Node and Git checks passed; browser verification is still unresolved because the available Chromium timed out opening a neutral local page.
