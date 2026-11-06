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

## Waiting on the author

A push to `origin`, a release tag, and whether to list the plugin anywhere.
