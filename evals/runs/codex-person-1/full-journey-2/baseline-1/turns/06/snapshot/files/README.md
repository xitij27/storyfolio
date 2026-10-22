# Dawit Bekele — local portfolio

The approved **Open runbook** story is implemented in **Paper/daylight**, using the selected A opening and A closing verbatim. One scroll, 15 beats, seven chapters, five work pages. All assets and fonts are local; publishing is outside this task.

## Run locally

Requires Node 22.18 or later. Dependencies are already installed in this workspace and the production build is in site/.next.

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000/. Stop with Ctrl+C. If the build is missing or you edit application source, rebuild with `NEXT_TELEMETRY_DISABLED=1 npm run build` before starting. No global skill installation is needed.

- [Local review and maintenance instructions](site/LOCAL-REVIEW.md)
- [Current handover, checks and limitations](docs/story/handover.md)
- [Consolidated check evidence](docs/story/checks.json)
- [Actual final review — pending](docs/story/final-review.md)
- [Selected wording and comparison history](docs/story/wording.md)
- [Confirmed facts and exclusions](docs/story/facts.md)
- [Approved storyboard](docs/story/storyboard.md)
- [Self-contained downloadable HTML CV](site/public/dawit-bekele-cv.html)

Actual final user review, including scrolling the finished site on a phone, remains pending by explicit instruction. Browser emulation is technical evidence only. Nothing has been published or sent.
