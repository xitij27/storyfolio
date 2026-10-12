# Desktop calibration closure and integrity audit

12 October 2026, independent read-only review. No model, browser, build,
test, signal or cleanup was launched by this reviewer. The failed desktop
capture and its original implementation are not rewritten or rescored.

## Normal closure, failed measurement

The bounded worker ran from 04:39:07.443Z to 04:46:29.869Z, 442,426 ms,
under a 475,000 ms work deadline plus 5,000 ms shutdown allowance. It
closed with code 1, no signal, no timeout, no external signal and no spawn
error. Its lifecycle is exactly spawn-request, spawned, exit and closed.
The outer recorder closed at 04:46:29.911Z after 442,555 ms, code 1. Root's
later tool observation in `desktop-tool-poll-14.json` agrees exactly with
the recorded result plus its output-directory field. Observation time is
not substituted for actual child finish time.

The preview server's saved code 143 at 04:46:29.654Z is inside the worker's
normal owned-server shutdown path. It is not evidence of an external
wrapper interruption. The manifest is `complete: true`, `passed: false`,
`sourceUnchanged: true`, `buildUnchanged: false`. Its retained failures are
the expected five-beat versus 12-to-22 full-site count, 23 control-response
problems and the generated-build identity mismatch discussed below. None
is erased by successful integrity verification or normal process closure.

At 04:49:47.165Z, a same-UID `/proc` metadata scan examined 77 processes and
2,026 readable fd links. No cwd/fd ties remained to the exact workspace
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-5yt94U`
or the study's `desktop/` and `desktop-command/` outputs. PID 372's cwd and
45 fd links, and PID 374's cwd and fd directory, returned EACCES. No argv,
environment or descriptor contents were opened. Wrapper PID 230580 and
worker PID 230591 were absent at the later 04:52:11.956Z verification.
This cannot exclude an escaped descendant with a different cwd and no
scoped descriptors. No broad absence claim is made. Root received the
no-ties observation before subsequent local tests.

## Source, artifacts and coverage

The retained read-only [verifier](desktop-integrity.mjs) produced
[desktop-integrity.json](desktop-integrity.json) and its
[complete tool record](desktop-integrity-attempt3-tool.json) at
04:52:11.956Z. It verified all 109 manifest artifact hashes, the outer raw
log hashes, exact worker logs and terminal results, all original
implementation hashes, target/snapshot bindings and coverage assertions.
All 86 live source files match the original calibration inventory, build
source, desktop before/after source and wrapper before/after source, digest
`1c499ad1346aa437d5701993b7b71f1b60cc35670e9afe0b7c76d48a1c18a060`.

The 102 distinct original images are exactly 10 mid/end, five rest, 24
travel and 63 control images. Eight directed transitions have three frames
each. All 16 inventoried controls retain pointer and keyboard trials, 32
total. One declared focus-only pointer trial is not applicable and retains
its unfocused original, while the other 31 trials retain before/after
originals. There are 21 page samples, four whole-wording observations and
five raw control censuses. No request errors, console errors or warnings
are recorded. These counts establish retained coverage, not successful
control response or visual quality. This reviewer did not inspect images;
root owns original-pixel review and the separate smooth-scroll sampling
diagnosis. The observed 23 control problems remain unchanged.

The verifier initially failed before an evidence assertion because its
relative imports were one parent too deep (tool chunk `aaa2a7`). A second
attempt incorrectly supplied target expectations rather than the retained
policy to the build-inventory helper; its full failure is preserved in
[attempt 2](desktop-integrity-attempt2-tool.json). Both were corrected only
in this new audit script. The third attempt passed. No capture was rerun,
original evidence changed or assertion relaxed. The script deliberately
checks the original implementation hashes and will reject later changed
implementation bytes instead of silently auditing through a new policy.

## Exact generated-build delta

The original immutable-build inventory contains 167 files. Desktop's
after-inventory, independently matched to the current `.next` tree,
contains 173. There are zero removed files and zero changed common files.
The six additions are all under:

`server/route-cache/APP_PAGE/c6377dd9ce6a1c2cd100eb4344e843eb4639b9ed26f84643f77680e9eb454c4b/$/`

They are `index.html`, `index.meta`, `index.rsc`, and
`index.segments/{__PAGE__,_full,_tree}.segment.rsc`. Exact paths, sizes and
hashes are retained in the JSON audit. The five non-meta payloads are
byte-identical to their corresponding `server/app/` build seeds.
`index.meta` is identical after removing the sole added numeric field
`routeCacheLastModified: 1791779672713`. Its seed names owner kind
`APP_PAGE`, source route `/page` and the exact generated key. SHA-256 of
`/page` equals the namespace above. No compiled route, JavaScript bundle,
build seed or existing asset changed.

The installed Next package reports version 16.3.8. Its lock entry records
the npm registry tarball and integrity value; both are retained in the
JSON audit. The inspected package manifest and three implementation files
are byte-identical to the trusted dependency copies. This verifies these
specific installed bytes, not a fresh registry fetch or a new complete
dependency-package audit.

Installed implementation evidence, relative to `node_modules/next/`:

- `dist/server/lib/route-cache-key.js`, lines 36 and 61-74: names the
  `route-cache` directory and forms a key from route kind, SHA-256 of the
  source route and normalized pathname. Hash
  `9887ca766b6bf1a85567c963a76e8cc7f682f66347079f1c00893d9c623d9dc8`.
- `dist/server/lib/incremental-cache/file-system-cache.js`, lines 125-147
  and 317-381: verifies the owning seed metadata, promotes a missing
  namespaced cache entry, copies RSC and segment seed payloads, adds the
  last-modified field and publishes the primary HTML last. Lines 490-494
  place these scoped responses outside compiled route and static-build
  files. Hash
  `f720f694b11d5d5e70deeee4d69ac26fd06122d3a293c03739df04cc832abcca`.
- `dist/lib/constants.js` binds the suffix definitions used by that code,
  hash `5d425d1024fdab2df5f8478a213fc1a42033f306ba73ce555fcdca59055a6639`.

The exact seed equality and installed implementation support a generated
response-cache promotion explanation. HTML/RSC are response payloads that
can affect rendering, not meaningless files. Therefore a broad directory
ignore would be unjustified even though these six additions are not new
compiled application code.

## Prospective correction only

A narrow future measurement rule could separate validated APP_PAGE seed
promotions from immutable compiled-build equality. It should retain every
cache path, size and hash as a separate observed inventory, validate the
namespace/owner/key against a preexisting immutable seed, require identical
payload bytes and allow only the documented numeric metadata addition.
Unknown kinds, layouts, executable files, symlinks, missing seed ownership
or changed response payloads should remain failures. Keep compiled
`server/app`, chunks, manifests and all other existing immutable files
strict. Do not add a blanket `server/route-cache` exclusion.

Deterministic tests should cover these six observed valid promotions and
reject changed HTML/RSC/segments, extra or altered metadata fields, wrong
owner/hash/key, missing seeds, symlinks, unknown cache kinds, `.js` or other
unexpected files anywhere inside the candidate cache, similarly named
ordinary directories, and changed compiled source outside it. Test the
retained secondary cache inventory too. This is a proposal only; this
reviewer made no measurement implementation or policy edit. Root preserved
all 19 original implementation files and hashes at 04:50:28.361Z in
`implementation-original/` before any prospective changes.

The original desktop result remains a complete failed calibration. A
prospective narrower rule does not retroactively produce a pass, remove
control failures, establish full-site coverage or complete Stage 3.
