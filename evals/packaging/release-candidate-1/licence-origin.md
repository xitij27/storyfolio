# Licence and origin, release candidate 1

Stage 4, Task 2 of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md).
Made 6 November 2026 over the allowlisted bytes in [freeze.md](freeze.md),
not only file headers. No model was started.

## Licence

| Where | Result |
|---|---|
| Root `LICENSE` | MIT, "Copyright (c) 2026 Storyfolio contributors" |
| `skills/storyfolio/engine/LICENSE` | Identical to the root; the scaffold copies it, so every site has it ([clean install](clean-install.md)) |
| `skills/storyfolio/LICENSE` | **Missing; added** (`e1af3eb5`), identical to the root. A plugin install copies `skills/storyfolio/` only, so before this `SKILL.md`, `references/` and `scripts/` arrived without a licence |
| `skills/storyfolio/.claude-plugin/plugin.json` | `"license": "MIT"` |

After the addition: `node evals/check-skill.mjs` ok, `claude plugin validate
skills/storyfolio` passed, `npm test` 422 of 422.

## Origin of what ships

- **Code.** A search of the shipped files for copyright lines, "adapted
  from", "ported from", SPDX tags and links to code finds only Storyfolio's
  own MIT notices. The URLs in code are local test addresses
  (`127.0.0.1`, `localhost`, `example.com`, `x.org`) and the placeholder
  `https://...`. The engine's derivation from the author's own portfolio is
  recorded with hashes in [source-provenance.json](../../engine/plain-story-1/source-provenance.json)
  (V3 at `163b8ceb`, "Personal content and assets are not part of the
  engine").
- **`engine/stitch/land.json`** (1,014,188 bytes). Natural Earth 1:50m land
  and land boundary lines, public domain, from `nvkelso/natural-earth-vector`
  at `ca96624a`, packed by `evals/engine/drawing-kit-1/land.mjs`
  ([record](../../engine/drawing-kit-1/README.md#the-map-data)). The shipped
  file's sha256 `5b39a4eb...c3b7` equals the recorded output. Credited in
  `engine/README.md` and `components/story/land.ts`.
- **`.claude-plugin/icon.png`.** `docs/assets/storyfolio-mark.png`, a render
  of the engine's own CV sheet folded as in "good at"
  ([record](../../../docs/superpowers/plans/2026-11-06-site-and-readme-review.md)).
- **`engine/public/plain/face.svg`.** A 448 by 608 rectangle with "02" and
  "Its picture" in generic fonts; written for the engine.
- **Fonts.** None ship; the engine uses system fonts.
- **Credit for the originating portfolio.** `README.md:278`, "Storyfolio grew
  out of Kshitij's research-paper portfolio", linked; `engine/README.md:9`
  names V3 and its commit.

## Personal information and local paths

- Searches for the author's names, e-mail addresses, phone-number shapes and
  `/home/`, `/Users/`, `C:\` paths in the shipped files find: the author's
  name and GitHub address in `plugin.json` (attribution, as intended); the
  GitHub Pages and repository addresses; and the made-up example path
  `/home/me/...` in `engine/scripts/shoot.mjs`. E-mail addresses are all
  `example.com`.
- The sample people (`content/person.ts`'s Noa Lindqvist, and Noa and Amara
  in `/preview`) are made up, as the repository's rule requires. Their
  names, the people quoted (Elin Brask, Tomás Ferreira, Hana Kovač, Dr Ines
  Moura, Jonas Retter, Sam Whitlow) and the employers (Tidewater Data,
  Larkspur Robotics, Fernhill Transit Lab, Brightmoor Studio, Pellucid
  Health, Tallow and Finch) were read and are invented. The places are real
  cities, and Noa's school is the real Delft University of Technology,
  named as a school only. Whether a real person or company shares one of
  these names was not searched.

## Dependencies the site installs

Not shipped: `npm ci` fetches them from the lockfile. Read from the installed
packages of the second clean install. Every runtime package is MIT, ISC,
Apache-2.0, BSD or 0BSD, except two that come with Next.js:

- `@img/sharp-libvips-*` (LGPL-3.0-or-later): `sharp`'s image library, an
  optional Next.js dependency, loaded as a separate shared library.
- `caniuse-lite` (CC-BY-4.0): browser data used at build time.

Development tools add MPL-2.0 (4), BlueOak, Python-2.0 and CC0 packages.
None is copied into the package or the site's source.

## Not checked here

The public repository's evaluation records were reviewed by the closing
review and the author's decision to keep them public
([record](../../../docs/history/2026-11-06-release-review-decisions.md));
this task looked only at the shipped bytes. Git history still holds the
real portfolio's files removed from `main`, on the author's word.
