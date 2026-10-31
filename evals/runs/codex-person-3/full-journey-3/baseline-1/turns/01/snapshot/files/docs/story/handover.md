# Handover

## Current stop
Stop 1: profile read; confirmation questions awaiting user. Do not propose a concept until answers are recorded beside corresponding facts in facts.md. User wants planning and a working local scroll-driven 3D site, with guided decisions. Publishing is solely their decision.

## Read
All four material files: resume.md, linkedin.md, project-notes.md, old-site.md. Inventory contained no private correspondence or participant exports. Read skill SKILL.md, reading-a-profile.md and engine/README.md. No other skill is advertised in this session; local SKILL.md inventory also shows only storyfolio. No additional skill recommendation needed.

## Setup checks actually run
- Node v24.14.0 meets engine's 22.18+ requirement. Executed .local-checks/native.ts with a typed const directly using node; output 7. Also tested node:module stripTypeScriptTypes successfully.
- Git 2.53.0 executable works. No claim that current .git is writable or a usable repository.
- No browser connector advertised. /tmp/chromium is available. Attempted opening file:// local neutral HTML with headless Chromium, DOM dump and screenshot; no output image or DOM produced. Retried with single-process/no-zygote and timeout; timed out after 25 seconds. stderr reports NETLINK socket restriction. Actual visual browser inspection is not yet verified; resolve during build and do not claim it passed.
- Setup fixture: .local-checks/neutral.html; no site scaffold or dependencies installed yet.

## Records
facts.md captures attributed facts, unresolved contradictions, gaps and questions. decided-for-you.md records local-only and address-verification choices. No design, storyboard or copy accepted yet.

## Next
Record user answers; keep any skipped question unresolved. Read concept.md and diagrams.md, then scaffold person's local engine and show a running concept for stop 2 using only confirmed facts. Continue staged decisions per skill.
