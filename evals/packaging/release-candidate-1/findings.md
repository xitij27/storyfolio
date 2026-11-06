# Release candidate 1: findings and checklist

The exit gate of the [packaging plan](../../../docs/superpowers/plans/2026-10-11-packaging.md).
State on 6 November 2026.

## Checklist

| Gate | State | Record |
|---|---|---|
| Candidate identified by commit and hash | `a8d88bb6`, archive sha256 `9e6f00bc...808d`, 136 files each hashed | [freeze.md](freeze.md) |
| Licence and origin of the shipped bytes | Reviewed; licence added at the skill's root | [licence-origin.md](licence-origin.md) |
| Artifact review of the public repository | The closing review, and the author's decision to keep evaluation records public and remove the real portfolio from `main` | [closing-review.md](closing-review.md), [decision](../../../docs/history/2026-11-06-release-review-decisions.md) |
| Plugin metadata validates | `claude plugin validate`, plugin and marketplace | [install-routes.md](install-routes.md) |
| Installs: plugin (local, GitHub `--sparse`), `.claude/skills/`, `.agents/skills/` | Listed by Claude Code 2.1.314 and Codex 0.162.1; no model called | [install-routes.md](install-routes.md) |
| The extracted package scaffolds cleanly | Fresh, notes kept, conflict writes nothing | [clean-install.md](clean-install.md) |
| The scaffolded site passes its checks | `npm test` 187, typecheck, lint, `npm run check`, `check:plain` 15 of 15, on Node 22.18.0 and Next.js 16.4.5 | [clean-install.md](clean-install.md#second-run-after-the-nextjs-upgrade) |
| Public guidance separates tested from documented | README, Task 5 | [public-guidance.md](public-guidance.md) |
| Stage 3 approval | The author approved person test 6's site, "okay this looks fine" | [record](../../../docs/history/2026-11-06-person-test-5-review.md#the-authors-review-stage-3-closes) |
| `check-skill`, `check-people`, `npm test` | ok, 17 people, 422 of 422 | each commit |

## Failures and corrections

1. Next.js 16.3.8 had a critical advisory; moved to 16.4.5 on the author's
   word, and the clean install was made again.
2. The plugin carried no licence at its root; `skills/storyfolio/LICENSE`
   added.
3. The README's clone fetched 1.6 GB; it now clones only `skills/`.
4. Machine problems met, now explained in the README: a Node without
   TypeScript support, and Chromium's missing Linux libraries.

## Remaining limits

- One model ran the person tests, and planning has been tested on one
  made-up person since stop 2 changed (deferred, [decision](../../../docs/history/2026-11-06-closers-decision.md)).
- No model was given the skill through any install route; discovery only.
- The route for other agents, a GitHub add without `--sparse`, a first
  Chromium download and Node 24 for the site were not tried.
- A real phone's smoothness needs a real phone.
- Existing-portfolio review and privacy enforcement are not built.
- A later release must raise the plugin's `version`.

## Released

On the author's word, 6 November 2026: the work pushed (by the author;
`origin/main` at `3e83a4a7`), tag `v0.1.0` on `a8d88bb6`, and a public
GitHub release, https://github.com/xitij27/storyfolio/releases/tag/v0.1.0,
published 22:54:49 UTC with [these notes](release-notes.md),
`storyfolio-0.1.0.tar` and `storyfolio-0.1.0-files.sha256` attached. The
downloaded archive hashes to `9e6f00bc...808d` and its file list equals
[manifest-sha256.txt](manifest-sha256.txt). The archive's top folder is
`storyfolio-rc1/`, kept so the frozen hash holds.

Not decided: listing the plugin anywhere.

## Listings looked at (7 November)

- **Agensi** (https://www.agensi.io/sell), proposed by the author: does not
  fit. Its docs (`/docs/how-agents-load-skills`, `/docs/packaging`, read
  7 November) say a bundled script "runs exactly as shipped" from a
  temporary file, so it "can't read other files in your package", and
  every load tells the agent not to "save the skill into project or skill
  folders". The scaffold reads `../engine/` and copies it into the person's
  project, so neither would work. Also: a 30% fee, "repackaged free
  skills" may be rejected, and buyers get fewer rights than MIT gives. The
  size fits (136 files against 200 text files and 6 million characters).
- **Anthropic's plugin directory**: in-app submission forms, paid Claude
  plan, reviewed ([submit](https://www.claude.com/docs/plugins/submit)).
  The plugin installs the whole folder, as tested. Not yet checked
  against its requirements.
- **Open skill directories** that take a GitHub URL (Agent Skills Finder,
  skills.sh, skillsdirectory.com): third-party, not checked.
