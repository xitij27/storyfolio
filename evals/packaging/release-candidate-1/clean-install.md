# Clean install, release candidate 1

Stage 4, Task 4 of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md):
the packaged skill, unpacked outside this checkout, scaffolds a site that
installs, tests, builds and passes its browser checks. Made 6 November 2026
on the WSL machine. No model was started.

## The package

Task 1's frozen release does not exist yet, so the package was the committed
skill folder at `31e7781347e3e4e3cb24dae8046fc92b3059f686`, the files a
plugin install copies:

```bash
git archive --format=tar --prefix=storyfolio/ HEAD:skills/storyfolio > storyfolio.tar
```

- `storyfolio.tar` sha256 `b813253aca1718a6aa59c40da0657bb9cf7b55396a36e731252448a0a3e6cace`
- Unpacked into a scratch folder under `/tmp`, outside the checkout:
  132 files, 2.0 MB. Their sha256 list ([package-sha256.txt](clean-install/package-sha256.txt))
  is identical to the list of the tracked files under `skills/storyfolio/`.
- The scaffolded site's files hash identically to the package's `engine/`
  (121 files), so the run used the unpacked package, not this checkout.

## Scaffold

All run as `node <unpacked>/storyfolio/scripts/scaffold.mjs <folder>`.

| Case | Result |
|---|---|
| Fresh folder `site` | Exit 0, "Copied 121 engine files" |
| Folder holding `docs/story/brief.md` | Exit 0, 121 files copied; the note is unchanged |
| Folder holding its own `package.json` and `docs/story/a.md` | Exit 1, "Nothing written", names `package.json`; every path and hash in the folder unchanged |

## The site's checks

Node: the official `node@22.18.0` (the engine's declared minimum), from
`npm i --no-save node@22.18.0` in a scratch folder, `bin` first on `PATH`.
Chromium: playwright-core 1.64.0's headless shell 1248, with
`LD_LIBRARY_PATH` set to the unpacked libraries (see below).

| Command | Exit | Result | Log |
|---|---|---|---|
| `npm ci` | 0 | 392 packages in 15 s; npm reports 10 vulnerabilities (below) | [npm-ci.log](clean-install/logs/npm-ci.log) |
| `npm run browsers` | 0 | Chromium already in `~/.cache/ms-playwright`, nothing downloaded | [browsers.log](clean-install/logs/browsers.log) |
| `npm test` | 0 | 187 of 187 | [test.log](clean-install/logs/test.log) |
| `npm run typecheck` | 0 | | [typecheck.log](clean-install/logs/typecheck.log) |
| `npm run lint` | 0 | | [lint.log](clean-install/logs/lint.log) |
| `npm run check` | 0 | Production build (Next.js 16.3.8); 15 shots each at desktop, phone and phone with words; no-JS and no-WebGL loads; 0 problems, 84 s | [check.log](clean-install/logs/check.log), [report](clean-install/site-check-report.json) |
| `npm run check:plain` | 0 | 15 of 15: light and dark at wide, short, phone, reduced motion and no WebGL; no JS; context loss; look switch; keyboard overlay; failed extra. 296 s | [check-plain.log](clean-install/logs/check-plain.log), [manifest](clean-install/plain-check-manifest.json) |

Every relative Markdown link in the package and in the site's `README.md`
and `AGENTS.md` resolves. The only absolute path in the package is the
made-up `/home/me/...` example for the optional `PLAYWRIGHT_CORE` override
in `engine/scripts/shoot.mjs`. Nothing in the site names the skill's folder,
so it does not depend on where the skill is installed.

## What the pictures show

Contact sheets: [desktop](clean-install/sheets/desktop.jpg),
[phone](clean-install/sheets/phone.jpg),
[phone with words](clean-install/sheets/phonewords.jpg),
[plain story](clean-install/sheets/plain.jpg).

- The site (the supplied made-up Noa Lindqvist, sheet world): every chapter's
  hold and move draws at both sizes: the CV, the globe with its two places,
  the certificate, the timeline, the skills folds, the six project cards, the
  quotes and the contact sheet. No blank or cut picture. On the phone with
  words, the top bar and each chapter's band of words sit under the 3D, not
  over it, and the projects show as buttons.
- The plain story: the three placeholder chapters draw in both looks; the
  keyboard shot shows a focus ring on the scene's link; the look switch shows
  light then dark; no WebGL and a lost context show the "No picture" stand-in
  with the words still readable.

## Findings

1. **This machine's Node cannot run the tests.** Under the system
   `/usr/bin/node` (Ubuntu's 22.22.1, built without TypeScript support,
   `process.features.typescript` false) `npm test` fails 23 of 27 files with
   `ERR_UNKNOWN_FILE_EXTENSION ".ts"` ([log](clean-install/logs/test-system-node-22.22.1.log)).
   This is already recorded in the handover. The engine README's "Node 22.18
   or later with native TypeScript support" covers it, but a person on a
   distribution's Node meets an error that does not name the cause. For
   Task 5's README: say how to check (`node -p process.features.typescript`).
2. **Chromium needs system libraries the machine lacks.** Before
   `LD_LIBRARY_PATH` was set, both checks failed at once with
   `libnspr4.so: cannot open shared object file`. The handover's workaround
   (libraries unpacked in `/var/tmp/chromium-libs`, no sudo) fixed it. On a
   machine with sudo, `npx playwright-core install-deps chromium` is the
   usual route; not tried here. For Task 5's README.
3. **The pinned Next.js has a critical advisory.** `npm audit --omit=dev`:
   `next` 16.0.0 to 16.4.0, GHSA-2464-fhr4-w9xw (remote code execution in the
   image optimisation API when SVG is used), GHSA-673q-mjm6-r5xr (remote code
   execution in `use cache` returning typed arrays), GHSA-p3m5-59mp-jv5r
   (denial of service with server actions). Fixed in 16.4.5. The engine uses
   none of `next/image`, `use cache` or server actions, and its
   `next.config.ts` is empty. Whether `next start` still exposes the
   default image endpoint was not checked. The other advisories
   (minimatch, zod) are in development dependencies. Moving to 16.4.5 changes
   the shipped lockfile and needs this run made again: the author's call.
4. **Not covered.** Chromium was already cached, so a first download was not
   tested. Only Node 22.18.0 ran the checks (not 24). The site's dev server
   and a person's own content were not tried; the checks use the supplied
   made-up person.
