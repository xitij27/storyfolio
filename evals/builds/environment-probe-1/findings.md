# Build environment probe, 11 October 2026

No model conversation was started. This verifies the environment for the
first Stage 3 baseline, using the unchanged, already accepted plain-story
engine in a new scaffold. It does not score an actor or establish a new
portfolio result.

## Outcome

`probe-3/probe.json` passes. Local HTTP returns the probe's expected body;
an external request to `https://example.com/` is rejected by the network
proxy with HTTP 403; a production build exits zero; and the engine's
selected light-wide browser case passes, producing nine screenshots.
The [visual review](visual-review.md) records their inspection. This is one
wide capability check, not a new full browser matrix or phone measurement.

The successful profile enables local binding and permits only loopback
destinations through the limited proxy. It keeps application source read
access and writes to the workspace and temporary directories. Temporary
directories are writable, so a separate coordinator dependency tree there
is not protected by a filesystem barrier. Repository/global-skill reads
also remain possible and must be audited in actual actor commands.

## Preparation and commands

The fresh scaffold was created with:

```bash
node skills/storyfolio/scripts/scaffold.mjs /tmp/storyfolio-build-capability-20261011
```

In that scaffold, using the standard Node 22.22.1:

```bash
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH npm ci --offline --cache=/tmp/storyfolio-npm-cache
```

Installation added 392 packages and exited zero. The cached installation's
audit summary is not a fresh network advisory review. The known engine
dependency limitations remain in its original findings.

The successful complete probe used:

```bash
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH \
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu \
PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
codex sandbox -P storyfolio-build \
  -C /tmp/storyfolio-build-capability-20261011 \
  -c 'features.network_proxy=true' \
  -c 'permissions.storyfolio-build.filesystem={":root"="read",":workspace_roots"="write",":slash_tmp"="write",":tmpdir"="write"}' \
  -c 'permissions.storyfolio-build.network={enabled=true,mode="limited",allow_local_binding=true,domains={"localhost"="allow","127.0.0.1"="allow","[::1]"="allow"}}' \
  -- /tmp/storyfolio-node-check-20261011/node_modules/.bin/node \
  /home/kshitij/projects/storyfolio/evals/probe-build-environment.mjs \
  --workspace=/tmp/storyfolio-build-capability-20261011 \
  --out=/tmp/storyfolio-build-capability-20261011/probe-3
```

The outer session sandbox could not launch the nested sandbox correctly,
so the actual nested-profile probes used approved outer execution
escalation. The command inside still used the explicit restricted profile.
The saved final script and capability JSON accompany these results, and
`engine-source-hashes.json` identifies the unchanged scaffold source.

## Failed probes and resulting corrections

1. `codex-cli 0.162.1` rejected the legacy `codex sandbox -C ...` invocation
   without `-P`; its help documents the named-profile requirement with
   `-C`. Running from the selected directory without `-C` let the legacy
   network-disabled policy be tested.
2. The outer sandbox initially rejected the nested sandbox's app-server
   socket setup. The same command with approved outer escalation reached
   the real offline policy and failed `listen` on `127.0.0.1` with `EPERM`.
   That policy cannot support the required local server.
3. A limited proxy with loopback allow rules and `allow_local_binding=false`
   allowed binding, but local HTTP failed. `probe-1` preserves the failed
   full-probe report. An explicit diagnostic recorded a malformed TLS
   response for fetch and HTTP 502 for direct local HTTP.
4. With `allow_local_binding=true`, local HTTP returned 200 and the expected
   body. The external HTTPS probe showed an explicit proxy 403. `probe-2`
   then built successfully, but Chromium failed to create
   `/tmp/playwright-artifacts-*` with `EROFS`.
5. Adding the explicit `:slash_tmp` write rule allowed Chromium to launch.
   `probe-3` passed build and browser checks. It retains the final script,
   commands, logs, report and screenshots. Earlier attempts have their
   reports and logs; the final probe script includes more detailed error
   reporting than the first attempt.

The environment investigation also found that JSON object syntax is not
valid TOML for Codex `-c` inline maps. The build runner now serializes its
profile maps as TOML and has a regression test using the actual capability
configuration. A no-model `/bin/true` sandbox invocation constructed from
the runner's exact `-c` and `-P` arguments passed. These are harness and
environment fixes, not evidence requiring skill instructions.

Before installing a separate actor workspace, `/tmp` had only 636 MB free.
With approval, only `node_modules` and `.next` were removed from the obsolete
`/tmp/storyfolio-engine-final-20261011` verification directory. Its source
files, committed evidence and the active preview in
`/tmp/storyfolio-engine-acceptance-20261011` were preserved; free space
returned to about 1.4 GB.

A later [pre-freeze audit](../preparation-checks/findings.md) found that
`exec` and `exec resume` need the `default_permissions` configuration key,
whereas this sandbox probe accepts `-P`. The runner was corrected before
any paid call; a separate no-model default-selector proof passed. The
original sandbox-probe command and results above remain unchanged.
