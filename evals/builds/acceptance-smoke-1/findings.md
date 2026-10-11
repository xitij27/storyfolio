# Independent checker smoke, 11 October 2026

This is an engineering test of the coordinator-owned acceptance checker,
not an embedded build baseline, paid evaluation, new skill instruction or
author review. The fixed plain-story [expectations](expectations.json)
deliberately differ from embedded-1: the existing plain engine animates on
mobile and retains a stationary 3D scene for reduced motion.

The source is the 79-file engine at `skills/storyfolio/engine`, captured by
[source hashes](source-hashes.json), scaffolded to
`/tmp/storyfolio-acceptance-smoke-20261011`. The existing user preview and
the separate root capability-probe workspace were left unchanged. Installed
dependencies came from `/tmp/storyfolio-engine-acceptance-20261011`; no new
installation or paid conversation was needed for this checker smoke.

## Initial commands and failed preparation

The workspace was created with:

```sh
node skills/storyfolio/scripts/scaffold.mjs /tmp/storyfolio-acceptance-smoke-20261011
```

All three attempts used this environment and command, changing only the
output suffix:

```sh
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH \
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu \
PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
node evals/check-build.mjs \
  --workspace=/tmp/storyfolio-acceptance-smoke-20261011 \
  --expectations=/home/kshitij/projects/storyfolio/evals/builds/acceptance-smoke-1/expectations.json \
  --out=/home/kshitij/projects/storyfolio/evals/builds/acceptance-smoke-1/attempt-1
```

1. [Attempt 1](attempt-1/manifest.json): the coordinator's fixed type
   generation, typecheck and lint commands passed. Next rejected a
   `node_modules` symlink pointing outside the project root. The raw
   [build log](attempt-1/build.log) and Next panic log are retained. This
   was a diagnostic-workspace preparation error, not an actor failure.
2. [Attempt 2](attempt-2/manifest.json): the smoke-only dependency symlink
   was replaced by hardlinks with `cp -al` to avoid another dependency
   install and disk duplication. Type generation, typecheck and lint
   passed. Next's CSS-processing worker could not bind a local port under
   the current sandbox. [Build diagnostic](attempt-2/build.log).
3. [Attempt 3](attempt-3/manifest.json): the required escalation retry
   was submitted through the tool with the explanation that Next needed
   localhost build and preview ports. It still received `Operation not
   permitted` at the same local bind. The three fixed code checks passed;
   the build did not. [Build diagnostic](attempt-3/build.log).

Hardlinks are confined to this coordinator-owned smoke workspace. They are
not a suggested actor-workspace dependency arrangement: a mutable actor
must not share writable inodes with trusted coordinator dependencies.

At that checkpoint the root coordinator was testing the bounded localhost
capability profile, and further runtime attempts were held until it was
resolved. **Attempts 1 to 3 produced no browser cases or screenshots.**
Passing earlier engine browser checks does not count as running this new
coordinator implementation.

Each attempt preserves its checker source, helper source, input expectations,
generated TypeScript/ESLint configurations, commands, tool entrypoint hashes
and raw logs. Current source adds several independently tested checks after
those saved attempts: output-directory refusal, explicit canvas-observation
validation, conservative URL validation, effective ancestor-opacity checks,
word-by-word viewport observation and local-fetch redirect refusal.

[Thirteen deterministic tests](unit-tests.log) pass when invoked directly as
`node evals/lib/build-check.test.mjs`. They exercise missing/reordered beats,
hidden or inaccessible links, static mode, invisible words, fixed command
selection despite tampered actor scripts, malformed expectations and narrow
request-failure exceptions. `node --check evals/check-build.mjs` passes.
The current host's `node --test` invocation reports this file as one passing
subtest; the direct invocation retains all thirteen individual results.

## Resolved capability profile and final acceptance

The coordinator established a named sandbox permission profile that allows
localhost binding and proxy access only to localhost destinations, with
temporary-directory writes needed by Chromium. External destinations remain
blocked. The initial retry mistakenly inserted `linux` after `codex
sandbox`; that version of the CLI treated it as an executable and exited
101 before the checker ran. The [raw diagnostic](unsupported-linux-subcommand.log)
is retained. The working invocation, with a new output suffix for each run,
was:

```sh
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH \
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu \
PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
codex sandbox -P storyfolio-build \
  -C /tmp/storyfolio-acceptance-smoke-20261011 \
  -c features.network_proxy=true \
  -c 'permissions.storyfolio-build.filesystem={":root"="read",":workspace_roots"="write",":slash_tmp"="write",":tmpdir"="write"}' \
  -c 'permissions.storyfolio-build.network={enabled=true,mode="limited",allow_local_binding=true,domains={"localhost"="allow","127.0.0.1"="allow","[::1]"="allow"}}' \
  -- node /home/kshitij/projects/storyfolio/evals/check-build.mjs \
  --workspace=/tmp/storyfolio-acceptance-smoke-20261011 \
  --expectations=/home/kshitij/projects/storyfolio/evals/builds/acceptance-smoke-1/expectations.json \
  --out=/tmp/storyfolio-acceptance-smoke-output-7
```

The tool invocation was escalated to launch that tested sandbox profile.
The profile did not grant write access to this repository. After each
process ended, its complete evidence directory was copied into this
repository; installed dependencies and `.next` were excluded.

| Attempt | Result and disposition |
|---|---|
| [4](attempt-4/manifest.json) | Typegen, typecheck, lint and production build passed; server started. The checker then incorrectly called Node fetch's `status` property as a function. Saved the failure and fixed that accessor. |
| [5](attempt-5/manifest.json) | All six browser cases completed; five passed. JavaScript-disabled Chromium reported its intentional preload rejection as `csp`, rather than `net::ERR_BLOCKED_BY_CSP`. The exception now accepts exactly either spelling only for a script at the same-origin Next chunk path in the deliberate no-JavaScript case. Review also found that block-top sampling duplicated the arrival for one-screen beats; the next checker version used its own frozen 0.4-viewport travel contract and added a geometry regression test. |
| [6](attempt-6/manifest.json) | All six cases passed with the corrected sampler and CSP exception. This source did not yet include the judge's requested final artifact-hash map. It is intermediate engineering evidence. |
| [7](attempt-7/manifest.json) | Final source passed typegen, typecheck, lint, production build and all six browser cases. Captured 27 images and hashed 53 output artifacts after server cleanup. The current checker and helper still match the source hashes recorded at launch. |

During the engineering attempts 5 and 6, the following coordinator source
revision was prepared while the previous checker process was running. No
engine or actor source was edited, and each process used its already-loaded
checker and helper. The exact source loaded by each attempt is retained in
its `checker-source/` directory and identified by the launch manifest.
Those earlier attempts are not represented as testing the later edits.
**Attempt 7 was launched only after the final checker source was complete;
neither checker nor helper was edited during or after that run.**

Final run: `2026-10-11T01:25:11.864Z` to
`2026-10-11T01:27:06.429Z`. The checker SHA256 is
`f504422d01c04a91bc36c8d5d091c67be2c87e11cd7acd4007d5446cc692b81f`;
the helper is
`632c46e976834f264737b651eb87efe3b41a67542656d00324c8345c2f840572`.
[Final verification](final-verification.json) confirms the six passes,
27 images, all 53 artifact hashes after copying, and unchanged source.
All seven saved checker-source snapshots match their own launch hashes.
The three stationary reduced-motion canvas hash pairs match.

The [desktop and fallback review](visual-desktop-and-fallback.md) covers
fifteen images individually. The [mobile review](visual-mobile.md) covers
six, and the [reduced-motion review](visual-reduced-motion.md) covers the
remaining six. All 27 final images were individually reviewed. Earlier
attempts' screenshots are retained as diagnostic
evidence and are not claimed to have received the final set's visual review.

This verifies the local checker path on the known plain engine. It does
not constitute an embedded build success, an evaluation conversation,
physical-phone performance evidence or a new skill instruction. The
harness separately binds acceptance to the actual actor source snapshot;
a workspace path alone is not a source-revision identifier.

See [acceptance scope and limits](../acceptance.md) for the exact assertions
and the visual/semantic checks that remain separate.
