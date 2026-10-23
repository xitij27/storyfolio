# Local concept preview

From the site folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000 for all three concepts. Individual sketches:

- http://127.0.0.1:3000/sketch/paths — The live path (recommended)
- http://127.0.0.1:3000/sketch/bench — The cutover bench
- http://127.0.0.1:3000/sketch/logs — The recovery line

Stop with Ctrl+C. Nothing is published. No remote images, fonts or other assets are used. These are concept sketches; choose a concept before the full storyboard and portfolio implementation.

Persistent facts and decisions are under docs/story; root-level docs/story is the main conversation record and mirrored here. Browser captures are under checks/concepts. Build, types, lint and unit tests are available through the package scripts. scripts/check-concepts.mjs expects the local production server to be running in the same environment and uses the available cached headless Chromium.
