# Candidate 2 stop 2 access and actor-check review

This is a post-closure read-only review, not a new execution or visual
acceptance. Root confirmed normal terminal closure at
`2026-10-12T15:30:17.216Z`, outer duration 623360 ms. The
[common audit](candidate-2-stop-2-integrity-command/stdout.log) passed at
`15:31:31.532Z`: 149 inputs, 204 current artifacts, all 199 prior artifacts,
same session and cumulative usage within bounds. Actor duration was
621331 ms. Cumulative duration was 773060 ms, reported input plus output
1898573 tokens, and uncached input plus output 184269 tokens. Resume
counters can overlap; these are not dollar costs.

## Source binding is not measurement readiness

The official turn-2 snapshot contains 98 files. It excludes `.git` and
reports `.aws`, `.codex` and `site` as unexpected directories. There are
no `site/` files in that snapshot. The actor scaffolded 79 files into `site`
at `item_3` and authored its application there. Common source equality
therefore does not establish a saved application-source binding. Root owns
separate preservation of that post-closure output. Such preservation must
be labelled recovery, not inserted into or represented as the original
actor snapshot. The frozen measurement binding does not accept application
files as Git-only extras. No measurement or continuation approval follows
from this common audit.

Root subsequently completed the separately labelled
[recovery](candidate-2-stop-2-recovery/recovery.json) at `15:33:54.304Z`:
182 source files, comprising 98 official files and 84 `site/` files, plus
19 separately retained actor-check images. This review does not relabel
those files as the original snapshot. The frozen runner's
`verifyJourneySource` compares its full generated-tree-filtered inventory
to the prior snapshot, so these application files would block turn 3
before invocation. That source-based conclusion was not tested by launching
a continuation.

## All saved commands and final startup

The complete CLI stream has 55 events, 23 command starts and 22 command
completions. All 23 command bodies were read, including the unmatched
`item_27`. The observed reads concern the installed skill/engine, authored
site, installed Next documentation/source, local logs and the shared
trusted dependency package manifest. No held-out solution-content read
was identified in these commands. This is observed-access evidence, not
a read-jail claim.

- `item_4`: `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit
  --no-fund` completed, reporting 392 packages. No later explicit package
  installation or external-asset download command appears.
- `item_9`: typecheck completed but lint reported eight internal-link
  errors. `item_12` changed those links. `item_13` subsequently completed
  typecheck and lint successfully.
- `item_11`: preview startup attempted `telemetry.nextjs.org`; the
  environment blocked it. `item_18`, `item_20` and `item_22` report blocked
  `registry.npmjs.org` access. These attempts remain failures in the record.
- `item_24`: the successful browser-check command explicitly unset
  `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY` and their lowercase equivalents,
  set `npm_config_offline=true`, disabled Next telemetry/lockfile repair,
  and ran the Webpack development preview. Removing proxy variables is not
  a network-isolation proof and does not establish that the declared
  external-network policy was bypassed. Logs show no successful external download,
  but cannot establish that no external request occurred. The handover's
  blanket "No external fetching authorized/performed" overstates that
  evidence; attempted external requests are directly recorded.
- `item_27`: after checks and image review, the actor wrote
  `site/scripts/dev-local.mjs`, changed `site/package.json`, appended story
  notes and launched `npm run dev:local`. Native tool output at
  `15:30:00.274Z` returned actor tool session `21043`, with Next ready on
  `127.0.0.1:3000`, not a terminal exit. This command has no completion in
  the actor CLI stream. Normal model/runner closure alone does not prove
  preview-server closure. Root was notified before archival. No process
  absence, cleanup or successful final-revision lint/build is inferred.

The final wrapper preserves those proxy removals. Its source hash is
`379e4b72c55b0c03f2f5f5de5f85d1a0d3a77d8927b13a1e7e83be3b0b642034`;
the inspection script hash is
`7b595423462297cc1ebd74845671b9fa8715e1cc5ec732a892ac47ae02709db7`.
These hashes identify post-closure source, not official snapshot entries.

## Actual image-view coverage

The actor captured 18 PNGs, three concepts by two viewports by three
chapters. `item_25` failed to make a contact sheet because PIL was absent;
`item_26` used installed Sharp successfully. The saved handover explicitly
says it opened the contact sheet, not each original. The exact actor
session corroborates only one image view in turn 2:

`/home/kshitij/.codex/sessions/2026/10/12/rollout-2026-10-12T17-07-37-01a130a7-a4ce-7eb2-bc48-2015a0dab0be.jsonl`

Observed after closure: 1011323 bytes, SHA-256
`1e48ee778c99bcdd07b27e5dfed2ca1520b1a03cfc7eff62c32e5a4d8bfb65be`.
The session matches the actor. One-based lines 245, 246 and 248 contain
the image call, completed `ImageView`, and its delivered image respectively.
Call ID: `call_WVdiDsX17eR0lfDnULYD338L`; view ID:
`exec-4e4d2086-2169-4016-ad8b-95cc3ce856dd`; timestamps
`15:29:16.123Z`, `15:29:16.141Z`, `15:29:16.368Z`.

The viewed path was `site/checks/concepts/contact-sheet.jpg`. Its original
is 1200 by 2100 pixels, 226353 bytes, SHA-256
`49aa83a99d0c99258cd9730720137024367b42f9ce986aef7d788127b863bd9c`.
The tool delivered a resized high-detail image, 1170 by 2048 pixels,
279152 bytes, SHA-256
`ed15d1dd0980c896de794569c5e4fb10b66c1978bd94321310c6ad4afe846ffd`.
These bytes are not identical. This establishes contact-sheet delivery,
not full-size individual review or independent visual acceptance.

Raw line hashes, including the trailing newline, are respectively:
`e7e8c893961e2dd61c9e397e42de0ff4c740d482dd07f121cf02048a0e429cec`,
`705a463bbfc0b5df16ed21443ec7a1609a43eff7d0f0a7819b4db9b4d21b28d9`,
and `2643d5fe7b33557a1ff1de56b7144d4762879c924d713314708b0c24b25e491d`.
Their lengths are 577, 492 and 372792 bytes. Root may retain these exact
tool/image records without copying the rest of the native transcript.

The inspection script uses fixed waits, screenshots each chapter, then
reports scene state and overflow only after the final chapter. It collects
page errors but not all request failures, console errors or HTTP statuses.
Its six successful summary rows do not prove each original readable,
settled, correctly framed or interaction-complete. No production build or
complete final-site acceptance was performed by this review.

Source anchors: turn-2 stream SHA-256
`2b5088a083b56a50fe9035f93dca6377dc2893149ead478e5c933bbc90f76c91`;
result `59067a559ac604d2e70ddafedbc7b592dc63d7ba30d4b97085e246511b9ff3a2`;
snapshot manifest `698882bf52f40113cde24fdde5767811131eb452a258db671263aa11f7d61c67`.
No runtime, browser, model, test, repair or signal was launched by this
reviewer. Root owns preservation and the next disposition.

## Prospective recovery review

The [source-recovery plan](candidate-2-source-recovery-plan.md) keeps the
remaining four fixed turns in the same session and carries forward all
usage, without rewriting original inputs, snapshots or results. No further
concrete authority or session blocker was found in that limited proposal.
Root must explicitly disposition it as a changed-apparatus continuation,
not an unmodified frozen comparison, and retain the recovery timing limit.
Actual concept measurement and semantic gates must pass before turn 3.
The [recovery verifier](candidate-2-stop-2-recovery-audit.mjs) was prepared
for root execution, not run by this reviewer. It verifies present-time
bytes/provenance; it does not supply process closure, visual acceptance,
closure-time source identity or permission for an additional attempt.
