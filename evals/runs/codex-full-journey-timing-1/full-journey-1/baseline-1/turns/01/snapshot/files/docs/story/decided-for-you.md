# Decisions made without asking

- Keep all work local; no deployment or external asset/font fetches. Reason: explicit user instruction. Change only on user instruction.
- Store sourced facts and continuation notes in docs/story. Reason: preserve decisions across sessions. Change file organization if requested.
- Do not install optional helper skills. Only storyfolio is advertised/enabled and the local .agents/skills directory contains only storyfolio. The supplied external catalog documents remote helpers, not installed capabilities. No missing helper is necessary at this factual stage; reconsider only if an actual later implementation gap arises.
- Leave absent photo, colleague circuit diagram and employer test artifacts out. Reason: they are unavailable and permissions unresolved. Change only when a suitable artifact and authorization exist.
- Use available Node and cached browser for initial probes. Reason: offline local setup is available. No dependency installation or engine scaffold before factual/concept decisions.
