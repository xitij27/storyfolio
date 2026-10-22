# Decisions

- Keep all work local and omit deployment configuration: requested by user. Change only on explicit publishing instruction.
- Preserve supplied SVG sources; do not treat them as project evidence: asset notes distinguish explanatory drawings from actual artifacts. Any later adaptation will be recorded.
- No additional skill recommended at setup: storyfolio includes the engine and build/browser workflow needed here. Only storyfolio is locally installed and session-enabled. Catalog entries are remote source records, not installed skills.

- Scaffolded engine into `site/`, separate from installed skill. Installed only locked application dependencies from the supplied offline npm cache; no network asset download or skill installation. Change folder by moving the app with its lockfile.
- Reused cached Chromium rather than running a browser download. Browser runtime needs supplied library path; full acceptance remains for finished build.
- Used the same provisional system-font bench palette for all concepts so the choice is about the story/object. Look selection remains a later stop.
- Used generic original contact-module, sample-board and terminal geometry. These are explicitly explanatory, with no actual circuit layout or construction detail. Replace only with authorized actual artifacts if supplied.
- Copied supplied SVGs unchanged into site/public/assets. Source retained in public/assets; teaching illustration purpose, MIT terms and accessible descriptions preserved. No derivative changes made.
- Disabled Next telemetry in dev/build commands to respect local-only intent. An initial dev launch attempted Next's default telemetry endpoint and the environment blocked it; subsequent launches disable telemetry explicitly.
- Used a local production build for concept review, avoiding Next dev's remote version check. Run `npm start -- --hostname 127.0.0.1` inside site. No publishing involved.
- Enlarged 3D label typography and disabled canvas-texture mipmaps for the narrow physical label strips: square-texture mip selection blurred lettering when applied to a strip. Linear texture minification preserves horizontal detail. Change in site/components/story/faces.ts if a later object needs conventional mipmaps.
