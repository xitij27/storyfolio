# Decisions made without asking

- Keep all work local; no deployment, publishing or external messages. Requested explicitly. Can change only on the user's instruction.
- Store sourced facts and outstanding decisions in docs/story so work can continue between sessions. No story/design chosen yet.
- Verify setup with a neutral page independent of portfolio content; no personal material used in the setup page. Checks are under checks/setup.

- Scaffolded the skill engine into `site/` because the scaffold prohibits placing a copy in an ancestor of its installed source. Change by moving the complete site folder; no installed skill dependency remains.
- Concept sketches use a shared client scene with original Three.js geometry and real HTML text/navigation/details. All sketches keep geometry mounted and scale it through the transitions. Scene colour is provisional until the later appearance choice.
- Omit unsupported resume-only catalogue/borrower counts, six-person platform team, unverified repository/video URLs and the star count. Retain confirmed project-notes detail. Can add a claim later only after confirmation.
- Omit end-of-support rationale and LinkedIn’s ambiguous database-version wording; use confirmed Postgres 11 → 15 and migration method.
- Production preview is the reliable local route here: Next dev checks the npm registry for version status, which this sandbox blocks. Production build and start do not need that request. Next telemetry is disabled when running checks.
- No full final-site acceptance claim at concept stop: the supplied engine’s generic beat matrix still belongs to its placeholder content contract. Run the full acceptance matrix after the approved story replaces that contract. Current checks target the three concept routes, plus unit tests, lint, types and production build.
