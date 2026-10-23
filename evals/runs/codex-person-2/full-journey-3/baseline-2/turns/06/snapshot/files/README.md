# Dawit Bekele — The live path

A local portfolio told as one scroll-driven 3D story. Selected appearance: Night operations. Sixteen beats introduce Dawit's background, study, work history, practice and six selected work items. Each work item opens a detailed local page.

## Run locally

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. Stop with Ctrl+C. Dependencies are already installed in this workspace; on a fresh copy use `npm ci` in `site/` first. No images, fonts or model assets need downloading.

## Selected wording

The finished story uses the approved A opening, **Keep a way back.**, and A closing, **Let’s talk about your migration.**, verbatim with their surrounding text. `/wording` archives the alternatives; query parameters cannot change the selected wording. The decision is recorded in [docs/story/wording.md](docs/story/wording.md).

## Other pages

- `/work/data-centre-exit`, `/work/orders-database`, `/work/runbook`, `/work/on-call`, `/work/ferry`, `/work/boring-migrations`
- `/cv`: view and download controls, with the printable HTML embedded
- `/dawit-bekele-cv.html`: self-contained printable/downloadable CV
- An unknown address: useful missing-page page

The story keeps its complete HTML and original local SVG diagrams when JavaScript or WebGL is unavailable. Reduced motion uses settled poses. Chapter navigation and project links work without animation. Contact is a link to the intentionally public example address; no email is sent by the site.

## Scope

Everything stays local. No publishing, deployment, hosting purchase, legal setup, external assets, extra skills, analytics, chat, blog, translations, contact forms, testimonials, photographs or remote slides. The share image and icon are original local assets. Metadata uses localhost until a future publication decision.

Facts, approvals, selected concept/look, storyboard, wording alternatives, decisions and verification evidence are recorded under `docs/story/` and mirrored under `site/docs/story/`. The implementation is in `site/`; validation captures and reports are under `site/checks/`. The engine's general content contract remains documented in `site/README.md`.

Dawit's actual final review remains pending, including scrolling the finished site on a phone. Implementation and automated checks do not substitute for that review. See [the handover](docs/story/handover.md) for final evidence and limitations.
