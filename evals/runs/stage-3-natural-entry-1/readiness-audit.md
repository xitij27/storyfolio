# Natural-entry readiness audit

12 October 2026. Prospective setup review only. Root owns preparation,
installation, the command-only capability probe, original-image viewing,
every model/browser launch and terminal settlement. This auditor has not
run a model, build, browser, install, test suite or process-cleanup command.
No historical fixture, frozen run, accepted prototype, skill, engine or
general runner/checker was edited. Final launch readiness is not yet claimed.

## Existing runtime and isolation

Read-only file metadata/hash observations at `2026-10-12T01:51:41.958Z`:

| Resource | Observation |
|---|---|
| Native Node | `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node`, regular file, 124674920 bytes, SHA-256 `243fd8938011479f41b3de101842150fa990f33fbbb3f7aabd330857f2d79e1d`; retained version is v22.22.1, fresh runner inspection must confirm it. |
| Codex CLI | `/home/kshitij/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl/bin/codex`, regular file, 294415048 bytes, SHA-256 `628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1`, exactly matching both preceding frozen capability records. |
| Offline dependencies | `/tmp/storyfolio-npm-cache` exists as a directory. Its existence is not a successful fresh installation. |
| Browser resources | `/tmp/storyfolio-browser-cache` and `/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu` exist as directories. Fresh sandbox proof is still required. |
| Runtime storage | `/var/tmp` had 995773259776 available bytes. Root selected a fresh `/var/tmp/storyfolio-entry-runtime-20261012` rather than reusing either prior actor workspace. |

The complete four-key `environment` objects in baseline-2 and candidate-1
frozen `inputs/capabilities.json` independently compare equal. Root should
restore these exact `PATH`, `PLAYWRIGHT_BROWSERS_PATH`, `LD_LIBRARY_PATH`
and `LANG` values from the candidate record, not reconstruct PATH. Use the
native Node executable, set the new TMPDIR, and explicitly leave
`NEXT_TELEMETRY_DISABLED` unset during preparation, installation, wrapper
execution and the actor. The existing frozen probe forces `1` in its own
build/browser children. Installation provenance must retain the unset value
as JSON null; this study does not reuse the earlier qualified variance.

A separate read-only exact-tree/hash comparison at
`2026-10-12T02:00:22.595Z` confirms all 86 current shipped skill files,
including all 79 engine files, match candidate-1's frozen skill inventory.
There are no additional or missing skill files. The main skill hash remains
`cea93b6a009a405d4bd0497e5a8e1bdae53901259a9a7739e334008a0274cee2`.

The existing capabilities deliberately permit filesystem reads from root,
writes to the workspace and declared temporary roots, and network-proxied
loopback destinations. They remove the legacy sandbox keys before selecting
the named profile. Actor execution disables user configuration, ambient
rules, unrelated skills/plugins, web search, memories and other optional
features. Project instructions are deliberately enabled, and the unchanged
skill is copied to `.agents/skills/storyfolio/`. This is configuration
isolation, not a filesystem read jail. Do not claim held-out read isolation
from the fresh working directory. Later audit must inspect actual actor
commands and skill-read evidence.

The command-only `codex sandbox` capability probe still inherits user
configuration; actor `exec` separately ignores it. The raw external-request
error stack may reveal the frozen implementation repository path. Preserve
that generated proof, disclose it, and distinguish pathname exposure from
reading held-out solution contents. The neutral actor-facing setup facts
must not contain repository or held-out paths.

The OpenAI Docs skill was used for the configuration review. The current
[official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
says named permission profiles must not be combined with the legacy sandbox
settings, and documents project-instruction byte limits. Local frozen
arguments and fresh capability evidence, not this documentation, determine
what this installed CLI actually does. No model choice or configuration
change is proposed from the documentation.

## Reuse and exact commands

The existing runner supports schemaVersion 1, `requestedStops: [4]`,
`refusalTurns: []`, one prompt and one allowed turn. `executeBuildTurn`
sends the frozen prompt bytes directly. It does not inject an endpoint
override, a desired appearance count or stop-specific guidance.

Historical comparison helpers cannot run unchanged: their allowed cohort,
case, runtime prefix, schema, task kind and refusal assumptions are different.
Root authorized three new study-only files:

- [run-capability-probe.mjs](run-capability-probe.mjs), a narrowly identified
  derivative of the previous command-only probe.
- [check-ready.mjs](check-ready.mjs), a derivative with the new identity,
  exact ordinary prompt, dynamic fixture count, strict source/image proof,
  explicitly unset installation environment and frozen helper bindings.
- [finalize-setup.mjs](finalize-setup.mjs), no subprocesses; requires root's
  saved original-image review plus successful installation/probe and exact
  unchanged source before writing neutral facts and the bound setup gate.

All three must be in the new case's implementation freeze and in the setup
gate's coordinator-helper hash map. The helper bytes remain coordinator-only;
only declared fixture files and the unchanged skill go into actor input.
Both historical helper files remain unchanged.

The static-reviewed new helper hashes before root execution are:

| Helper | SHA-256 |
|---|---|
| `run-capability-probe.mjs` | `5cd33076fca5a87823041374fa46e9e3c8443c30d71edd09f5cf773a958935fc` |
| `check-ready.mjs` | `846195205850865ecdb7604f04051d2545c556c9cdf6e3a1d8a87080294804f5` |
| `finalize-setup.mjs` | `30d535d24029cf48c3e8733778f0c2fec769da0730192fe0556732b9bf00f0c1` |

Root independently read all three and agreed with the static approach.
Syntax checks and any execution remain root-owned. The auditor's source
review is not an independent execution test of helpers this auditor wrote.

Under the exact restored environment, root's no-model entry commands are:

```sh
node evals/codex-build-run.mjs --case evals/builds/bench-entry-1/case.json --cohort codex-bench-entry-baseline-1 --capabilities evals/builds/local-capabilities.json --dry
node evals/codex-build-run.mjs --case evals/builds/bench-entry-1/case.json --cohort codex-bench-entry-baseline-1 --capabilities evals/builds/local-capabilities.json --prepare
```

Read the freshly created `meta.json` for the new workspace. Within that
workspace, root records one `npm ci --offline --cache=/tmp/storyfolio-npm-cache`.
Save source-before-capability.json, then execute:

```sh
node evals/runs/stage-3-natural-entry-1/run-capability-probe.mjs
```

After terminal closure, save source-after-capability.json, individually
view all nine original PNGs, and save `setup/capability-visual-review.md`
and `setup/original-images.json`. Only then execute:

```sh
node evals/runs/stage-3-natural-entry-1/finalize-setup.mjs
node evals/runs/stage-3-natural-entry-1/check-ready.mjs
```

These are root-owned prospective commands, not claims that they ran.
The finalizer refuses existing facts/probe outputs. The readiness gate's
only subprocess is runner `--dry`, not an unpaid stand-in model turn.
It rejects spent actor workspaces. No test/build/browser overlap is
permitted during the eventual actor or independent capture.

## Remaining gates

Fixture and measurement review, committed input freeze, fresh preparation,
exact initial inventory, offline installation, original-image capability
review and final readiness output remain to be inspected. The ordinary
actor message must be exactly:

> Yes to the storyboard in docs/story/storyboard.md. Please build it.

Do not place expected look counts, desired behavior, an endpoint override,
previous actors' solutions/images or measurement outcomes in actor-visible
material. The approved one-turn baseline and one bounded independent
capture do not authorize a judge, retry, continuation or source correction.

## Independent fixture review

At `2026-10-12T02:07:47.907Z`, independent read-only inventory and hash
comparison confirms eleven actor fixture files, six byte-identical inherited
files, all sixteen preserved old fixture files and unchanged bodies for all
five approved story meanings. The new source manifest hash is
`1bcca437d420d27b614633598b452bb5bc7f9bb8537ff6f642d34ed5da5e74a7`.
The exact prompt hash is
`8d7b5dd49785a91943efef260d78a7f93f01a3d1ee5176611ea5d7d6ec7c5cc7`.
The then-current case hash is
`6dde159135b29aa361af470c5e501df8bdaaec43112ca564c128d45f9fb919cd`;
all twenty-two declared coordinator implementation paths exist, including
all three setup helpers. This is a pre-freeze observation, not the final
cohort digest.

Full actor-visible prose review found no expected appearance count, spine
instruction, stop number, endpoint exception, fabricated earlier concept
presentations or inherited one-appearance/no-choice restriction. The
handover, confirmations and new concept/decision records explicitly state
approved fictional starting facts, no chosen look and no implementation.
The corrected attribution and evidence limits remain intact. The inherited
skip-link contract and capability inventory are tooling facts, not an
expected visual answer. The unchanged skill's own engine instructions and
content remain product-under-test input, not coordinator additions.

The case uses the ordinary schemaVersion 1 path, only stop-4 metadata,
empty refusal turns and one prompt. Coordinator criteria permit any one of
the three approved middle meanings and two or three real looks. They are
not part of the actor fixture. No judge entrypoint is declared in the new
case's implementation list. Ordinary skill discovery/read and actual
behavior remain unobserved until the real saved turn; setup does not claim
that the actor read the skill.

## Measurement review, pending final dispositions

The coordinator-only measurement is source-bound to final actor files and
requires saved terminal-settlement evidence. Its worker uses fixed Next
commands, not actor check scripts, records all declared choices at desktop
and phone, and leaves semantic/material appearance judgment to original-image
and source review. Its `complete` flag means the schedule finished, not a
successful entry, runnable spine or look gate. Refusal, planning-only and
unchanged-starter branches are not automatic success. The unchanged bounded
process helper retains 895 seconds of work and five seconds of shutdown,
external signal identity as unknown, no retry and limited descendant claims.

Two prospective review points were sent to the measurement owner before
freeze: state-only choices sharing a route need actual alternate-state
initialization or an explicit unobserved return-switch limitation, and the
trusted dependency directory/entrypoint identities should be bound before
the actor runs. The existing Next identity helper checks name/version and
CLI bytes, not every transitive dependency. Their final disposition and
fresh setup evidence still precede a complete launch-readiness verdict.

### Prospective measurement points resolved

Final static review confirms both points are addressed before freeze. The
worker permits a source-observed alternate `prepareControl` before each
pointer/keyboard trial for state-only looks. Selected/idempotent results
are explicitly unobserved, not automatic failures or switch passes. The
protocol and validation additionally require an explicit no-authored-app
attestation for skipped measurement, so broken authored output is not a
reason to avoid its one build attempt. Native checkbox/radio/switch actions
use Space; ordinary button/link actions use Enter. Accessible-name matching
remains deliberately limited to aria-label or text and is disclosed.

The frozen expectations now pin trusted root
`/tmp/storyfolio-build-capability-20261011`, Next 16.3.8 CLI hash
`e4c6cfdeac3c9e4e260d2a622d6af9565c49d8017c3d55e8dade07ed58fbe9de`
and Playwright entrypoint hash
`a58fb2cec4293e7dcf73c58a179898a4f3986666451a19da4e731fa3af63265b`.
A separate read-only resolution/hash check at
`2026-10-12T02:10:39.297Z` matched all three. The package entrypoints resolve
under the repository's `node_modules/storyfolio-build-dependencies-20261011/`
tree through that coordinator dependency directory. Neither package was
evaluated or launched during this audit. The documented integrity scope
remains entrypoint/version binding, not an exhaustive transitive audit.

Reviewed measurement identities:

| File | SHA-256 |
|---|---|
| `measurement.mjs` | `103aed7d17370c6affbcebea2bb3f4b8ad4afb3e7de52e4399ca937922129b28` |
| `measurement-run.mjs` | `2c42f252d0260c9ab62198d7ecf560f7c7c5a3285115cb43dafcb268c30785f9` |
| `measurement-lib.mjs` | `963f90199fc9aa8c098ff4a8020ba700a570a32fc2fcbfaa1a1bea87cea8365e` |
| `measurement-expectations.json` | `0aff031990c21c9b546c757168557fed940f60d00e0f9851927fa7da08670d1c` |
| `measurement-protocol.md` | `1dea1b7a83244dc39e005276159156a51a095afc498c106434f928a4b0b80410` |

The measurement owner's twelve deterministic tests ended successfully at
`2026-10-12T02:09:08.682Z`, as retained in
[measurement-tests-1/result.json](measurement-tests-1/result.json). Root's
earlier helper syntax checks and fourteen then-current helper/lifecycle
tests passed at `02:00:53.736Z`. This auditor read those saved results,
not rerun the tests. No fixture or measurement blocker remains from static
review. Committed freeze and actual fresh workspace/setup proof remain
separate required gates before root's single actor launch.
