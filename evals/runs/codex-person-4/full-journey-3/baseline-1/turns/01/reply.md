I’m using the storyfolio skill to review your material, shape the story with you, and build a local 3D site. I’ll first look at what’s available, then bring you the decisions that will most affect the direction.


Your notes give a clear account of the migrations, including your own contribution and the team’s work. A few claims need checking—especially “zero downtime,” the availability figure, and the database version history—before they become public-facing words or diagrams. I’m recording those questions and checking the local build tools.


Dawit, your material describes migration planning, database cutovers, runbooks and reliability work, with useful detail about your contribution alongside others. It also distinguishes ferry’s original author from your later maintenance and cutover command.

I’ve recorded the sources in [facts.md](docs/story/facts.md). Before proposing the 3D story, I need to resolve these points—you can answer by number:

1. **Audience and action:** Who should this attract, and what should they do at the end—contact you, discuss a role, read your work, or something else?

2. **Disclosure:** What must stay out? May we name employers, describe the migration processes and retell the 2014 library incident? Are explanatory diagrams based on your notes acceptable?

3. **Migration claims:** Your resume says “zero downtime”; your notes say **99.98% Order API availability**. What wording is accurate? How was availability measured? Can we describe you as planning and sequencing the programme, with about 60 engineers delivering it?

4. **Database:** Was the upgrade Postgres **11 → 15 in 2022**? LinkedIn says “two major versions.” Was end-of-support the reason? What did you personally handle versus the database engineer, and does “no maintenance window” accurately describe the result?

5. **Numbers and attribution:** Were **85 → 22 pages/week** measured averages, over which periods, and what was your part in the nine-person effort? How does that rota relate to the six-person platform team? Are **40 runbook teams**, the library’s **30,000 records / 8,000 borrowers**, and ferry’s **1.2k stars** accurate, and as of when?

6. **Roles and daily work:** Are the listed titles and dates correct? What did you personally build or operate at Lumen Pay—tools, one concrete result, and one picture that would explain it to a colleague? What do you work with day to day now?

7. **Places and studies:** Where have you lived, with approximate years? For the degree project, what was your contribution, who else worked on it, and was it demonstrated or deployed?

8. **Pictures and learning:** Do the project pictures described in your notes accurately represent the work? What would explain your degree project visually? Beyond the library incident and data logger, what people, books or experiences shaped your approach?

9. **Links and assets:** Are the example email and GitHub URL placeholders? Which contact, repository and talk-video links should we use? If you want screenshots, photos or slides included, who owns them and may they be shown?

10. **Existing site:** Should this eventually replace the 2019 page, and is there anything from it you want retained?

I’m holding the concept until these answers because they determine what the story can truthfully show, following [storyfolio’s first-stop rule](.agents/skills/storyfolio/SKILL.md). Node, native TypeScript and Git checks passed; the local browser check stalled, so visual testing remains unresolved. Everything stays local.
