# Decisions made without asking

- Keep all work local; no deployment or external asset/font fetches. Reason: explicit user instruction. Change only on user instruction.
- Store sourced facts and continuation notes in docs/story. Reason: preserve decisions across sessions. Change file organization if requested.
- Do not install optional helper skills. Only storyfolio is advertised/enabled and the local .agents/skills directory contains only storyfolio. The supplied external catalog documents remote helpers, not installed capabilities. No missing helper is necessary at this factual stage; reconsider only if an actual later implementation gap arises.
- Leave absent photo, colleague circuit diagram and employer test artifacts out. Reason: they are unavailable and permissions unresolved. Change only when a suitable artifact and authorization exist.
- Use available Node and cached browser for initial probes. Reason: offline local setup is available. No dependency installation or engine scaffold before factual/concept decisions.

- Apply user omission rule: omit every unconfirmed claim rather than ask repeated factual questions. Do not use employer/title/dates. Reason: explicit corrections. Change only on new confirmation.
- No added skills: user expressly declined them. Use available tools and engine.
- Build executable sketches in a separate local site/ folder to avoid installed-skill overlap and preserve the material and original drawings. Final product can continue there.

- Use the same provisional neutral look for all three concepts. Reason: compare story/object before choosing the final look; system fonts and local geometry only. Final looks come after storyboard approval.
- Corrected printable downloadable HTML CV created now from confirmed facts. Reason: explicit user instruction and useful across all concepts. View/download public/cv.html; contact is mailto only, no send/delivery test.
- Added npm run concepts to serve the production sketches on 127.0.0.1:3000, with local build if absent. Reason: repeatable local preview. A separate .next-concepts build directory avoids an isolated development-server lock; no remote access or deployment.
- Full acceptance script is for the eventual chosen story's content contract. At this concept stage the root is a chooser and sketches have independent bundles, so production browser probes cover each sketch separately rather than claim final-site acceptance.
