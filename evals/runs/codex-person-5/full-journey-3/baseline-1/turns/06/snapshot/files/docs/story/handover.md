# Dawit Bekele — local site handover

## Status

The local implementation is built with the user's exact selected opening A and closing A, whole-sheet world, Night look and Swing movement. All six requested work details, CV, download, navigation, sharing artwork/icon and 404 are implemented. Publishing is outside this task.

**The owner's actual final review remains pending.** The user explicitly said this handover is not confirmation that they have scrolled the finished site on a phone. No physical-phone performance or final owner acceptance is claimed. See final-review.md for that record.

## Run the checked build

From the workspace root:

```bash
cd site
npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. The production build and dependencies already exist. To edit with automatic recompilation, use `npm run dev -- --hostname 127.0.0.1` instead. To rebuild after an edit, run `npm run build` before starting production again. Stop the terminal process with Ctrl+C.

This binds to loopback only and does not publish the site. This tool environment does not preserve an accessible loopback server across separate sandbox commands, so start it in your own terminal; do not infer that a background preview server is still reachable. Physical-phone access will need a separate local review setup later.

## Delivered routes

| Route | What it does |
|---|---|
| `/` | Seven scroll chapters, one continuous 3D sheet, exact approved A/A wording, Work/Contact/CV navigation and chapter rail |
| `/#made` | Six requested work entries; native click/keyboard dialogs show contribution, method, attribution and result |
| `/#contact` | Approved example mailto link and CV link; no form or email sending |
| `/cv` | Responsive printable HTML CV with A4 print styles and browser Print/Save as PDF instruction |
| `/cv/download` | Self-contained `Dawit-Bekele-CV.html` attachment; same confirmed content as printable page; no JS, fonts, stylesheets or images to fetch |
| `/icon.svg` | Original folded-sheet icon |
| `/opengraph-image.png`, `/twitter-image.png` | Original 1200×630 share cards with alt text; metadata wired to local origin |
| Missing address | HTTP 404, named useful page, Home/Work/Contact/CV/email links |
| `/review/words` | Selected A/A shown with B/C comparison alternatives; unlinked from main navigation, noindex |
| `/preview` | Full-story look/movement/wording comparison, query-only; does not change selected defaults |

No testimonials, seventh project, blog, chat, translations, contact form, internal diagrams, photographs or slides. Engine demonstration routes remain available locally but are not part of the portfolio navigation.

## Confirmed choices and factual safeguards

- Audience: engineering leaders planning a migration and conference organisers. Do not claim independent practice has already begun.
- World: WHOLE.sheet. User reviewed the site/gallery, accepted the world and storyboard, and explicitly selected the recommended Night/Swing.
- Opening A and closing A were chosen by the user and copied verbatim to `site/content/site.ts`. Exact versions/approval are in wording.md.
- 99.98% is measured **Order API availability over 26 months**. Never zero downtime; two internal incidents each under ten minutes are preserved in detail/CV.
- The 85→22 pages/week result is the nine-person team's result over about a year; use “we”.
- ferry was created by a former colleague in 2019. Dawit maintains it since 2022 and wrote its cutover command. No unconfirmed stars or repository URL.
- Runbook: wrote first version, still owns it; 40 teams use it.
- Lumen Pay remains only the approved role/date/location and “Card payment systems.” line.
- All work drawings are labelled illustrations. No internal Kestrel assets reproduced. Library incident and technical methods are from the user's explicitly approved notes.
- Contact remains the approved example `dawit@example.com`; only mailto linkage was tested, not delivery. No mail sent.

## Where to edit

| File | Purpose |
|---|---|
| `site/content/person.ts` | Confirmed person, places, study, career, practice and exactly six work entries/details |
| `site/content/mix.ts` | Whole-sheet world |
| `site/content/site.ts` | Night/Swing, exact selected captions, English and CV route |
| `site/content/cv.ts` | Shared CV content and print CSS |
| `site/lib/cv.ts` | Escaped self-contained downloadable HTML renderer |
| `site/content/wording.ts` | Approved A/A and archived comparison alternatives |
| `site/app/layout.tsx` | Metadata; local-only localhost:3000 origin |
| `site/app/not-found.tsx` | Useful missing-page content |
| `site/app/icon.svg`, share PNG/alt files | Local artwork; regenerate cards with workspace `python3 scripts/draw-share.py` using installed system fonts |
| `docs/story/facts.md` | Source-backed claims, user answers and restrictions; consult before changing claims |

The copied app runs independently of the installed storyfolio skill. System fonts only. No skills, packages or visual assets were downloaded for this finishing turn.

## Local runtime correction

The final stationary check found that the starter froze eased scrolling under reduced motion but still advanced idle animation time. Corrected `site/stitch/stage.ts` with one guard: time is zero when `prefers-reduced-motion: reduce` matches. This freezes idle drift while keeping scroll-linked poses and normal Night/Swing unchanged. It is the only local stitch-library code difference; the installed skill was not modified. The regression check is `scripts/check-finish.mjs`.

## Engineering verification

Current production report after the correction: `site/checks/site/2026-11-06T19-00-03-523Z/report.json` — passed, 0 problems. It checks every chapter hold/move at 1440×900 and 390×844, phone captions, no-JS and no-WebGL complete HTML, CV link, named HTTP 404, resource/page errors and blank pictures.

- 186 unit tests: pass.
- Lint: pass. Type checking, including fresh production-build TypeScript checking: pass.
- `scripts/check-cv.mjs`: page/download content equality, real attachment without JS, standalone resource independence, desktop/phone bounds, print styles and PDF print pipeline: pass.
- `scripts/check-review.mjs`: selected A/A exact on live site; all comparison variants; 1440×600 and 375×500 bounds; all six dialogs by Enter, focus containment, Escape and focus return: latest result recorded below.
- `scripts/check-finish.mjs`: normal-motion transitions in both directions, stationary reduced motion, sharing/icon assets, no external requests, lost-WebGL-context fallback: latest result recorded below.
- Captures/reports: workspace `checks/cv/`, `checks/review/`, `checks/finish/`; main story reports under `site/checks/site/`. Screenshot review is the assistant's visual inspection, not the owner's actual review.

To repeat required checks from site/:

```bash
npm test
npm run typecheck
npm run lint
CHROMIUM=/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell npm run check
```

From the workspace root, supplemental checks use the existing production build and cached browser:

```bash
node scripts/check-cv.mjs
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/check-review.mjs
node scripts/check-finish.mjs
```

Node >=22.18 with native TypeScript is needed; checked here on v24.14.0. Dependencies are already installed from the local npm cache. Browser path is specific to this environment; do not download another browser or install skills to use this handover. `.git` is empty/read-only in the supplied workspace, so no commit was created or claimed.

## Remaining limitations and review

1. **Owner's actual finished-site/phone review is pending by instruction.** No real-device performance, touch feel or owner acceptance is inferred from automation. Chromium software rendering/emulated screens were checked; physical mobile Safari/Firefox were not tested.
2. The illustrations use the accepted gallery sheet components. They are not actual screenshots, measured traces or a miniature simulation of a migration. Exact methods/results are in readable HTML/dialogs/CV. Wide scenes pan on narrow screens; small printed scene detail is supplementary to the readable text.
3. The CV download is HTML. Browser printing/Save as PDF works; there is no separate product PDF-download route.
4. Share metadata uses localhost:3000 for this local build. Public origin, domain, hosting and legal details remain deferred to a future publishing decision, outside this task. No publicly fetchable share preview is claimed.
5. Real repository/video URLs and a non-example contact were not supplied/approved; none were guessed. No mail-delivery test was performed.

No further implementation or design decision is being requested as a condition of delivery. Keep this local build as handed over; when the owner later reviews the finished site, record their actual observations and any requested changes in final-review.md.

## Final finishing result

After the reduced-motion correction, the fresh production run above passed with 0 problems, the CV check passed, and both supplemental suites passed:

- `checks/review/report.json`: approved A/A exact on the live site, six preview alternatives, short-screen bounds and 12 keyboard-dialog checks — pass.
- `checks/finish/report.json`: 12 normal-motion seam captures in both directions; stationary reduced-motion canvas byte-identical across captures; all metadata/icon assets HTTP 200; context loss leaves complete selected HTML story; no external requests or page errors — pass.

Final current screenshots were visually inspected: all 39 production captures, short-screen selected opening/closing and dialogs, all 12 normal-motion transitions, and context-loss fallback. Final contact sheets are `checks/finish/final-desktop.jpg`, `final-phone.jpg`, `final-phone-words.jpg`, `final-motion.jpg`; complete fallback capture is `checks/finish/context-loss.png`. Production build is ready to run with the command above. The owner's actual final phone review and acceptance remain pending; no publication or additional skill installation occurred.
