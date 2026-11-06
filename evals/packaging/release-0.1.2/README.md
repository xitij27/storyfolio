# Release 0.1.2: a privacy policy

Made 7 November 2026. The portal's validation of the `plugin` branch
warned, as the author reported: "No privacy policy URL found. Add
privacyPolicyUrl to plugin.json, or a “Privacy” link to your README. This
is a warning, not a blocker." No model was started.

## What changed

| | |
|---|---|
| `skills/storyfolio/PRIVACY.md` | New: the skill collects nothing; what it reads, where data goes (the person's project), what installing downloads, Next.js telemetry outside the checks (on by default for `npm run dev` and `npm run build`; the checks turn it off), the gallery on GitHub Pages, keeping and deleting |
| `plugin.json` | `privacyPolicyUrl` (accepted by `claude plugin validate`), `version` 0.1.2 |
| Plugin README | A "Privacy" link, and the install line `claude plugin validate` advised (`/plugin install storyfolio --marketplace xitij27/storyfolio`) |
| Release commit | `60dd1e6f59145c2404658e4f4bca3e459e0da21e` |
| Archive | `storyfolio-0.1.2.tar`, 138 files, sha256 `1ea27beff6691546ec0c1b1b7c4f8857783e8cdc54e0c2b1c028699b2c3ca15f`, made twice with equal hashes; [manifest-sha256.txt](manifest-sha256.txt). Against 0.1.1: `plugin.json`, the plugin README and the new `PRIVACY.md` |
| `plugin` branch | `bbc7f993`, parent `ff5fa81e`, equal to the release's files |

Checks: `claude plugin validate` nothing to report, `check-skill` ok,
`npm test` 422 of 422. The engine is unchanged from 0.1.0.

## Publishing

The first attempt was refused by the session's permission check as a
public action without the author's word on 0.1.2. On their "yes publish":
`main` and `plugin` pushed (`plugin` at `bbc7f993` on GitHub), tag
`v0.1.2` on `60dd1e6f`, and the GitHub release
https://github.com/xitij27/storyfolio/releases/tag/v0.1.2. The privacy URL
answers 200, and the downloaded archive hashes to `1ea27bef...a15f`.
