# Post-closure source retention

13 October 2026. All 189 authored source files, 965960 bytes, are now
retained in [source-recovery-1/files](source-recovery-1/files), including
the actual nested app, current handover, fact ledger and concept reasoning.
This solves repository retention, not the original capture failure.
The original failed result stays byte-identical and `complete: false`.

## Method and boundaries

The [one-shot archive helper](recover-source.mjs) verifies the exact
original result and all 149 frozen inputs, then uses the original source
exclusions plus exactly `site/.next-concepts`. This exact additional
directory is positively identified by saved configuration and launcher
hashes, the build ID and the generated server-file manifest. The latter
two markers are preserved separately under `diagnosis-markers`.
No `.next*` wildcard or arbitrary hidden-directory exclusion is added.

All remaining authored bytes are copied without altering the actor's
workspace. Original 400-file, 20-MiB total and 2-MiB per-file bounds remain;
source symlinks are rejected. The archive is exclusive, never overwritten.
Source is measured before and after copying, every saved file is rehashed,
and original inputs/results are reverified. The exact terminal message
is extracted from the native stream into a separately labelled file.

The source digest is
`a0c094b2658becfc1eadfc79948b6aead3f438e84927c415f2a2373a6c64d91f`.
Recovery closed normally at 06:47:31.767 UTC, code 0 after 1725 ms.
Retained command stdout SHA-256:
`b73ea7db32de8be72901195b6b8b8f5ad5ee5b6d9bbda5e4f79a8699b5a31722`.
No model, browser, build, install, retry, deletion or actor-source edit.

## What remains

This is an explicitly post-closure archive, not proof of the exact source
at original model closure. It is not yet a recovery measurement binding or
continuation runner amendment. The [read-only verifier](verify-source-archive.mjs)
checks archived bytes, original preservation and normal recovery closure.
It supplies no concept, visual, semantic or final author acceptance.

Next implement narrowly bound measurement and continuation amendments
using this archive, preserve original prompt/model/budget inputs, verify
the actual reconstructed copy and concrete targets, and run the independent
concept measurement before original fixed turn 3. The prepared adapter is
still unexecuted. Stage 3 remains open; no push or publication.

Initial verifier check `local-tests-6` stopped normally, code 1 before the
repository tests: equal file records were serialized in inventory key
order rather than the source manifest's key order. The verifier now
explicitly canonicalizes `path`, `bytes`, `sha256` for the digest. No
archive, actor source or original evidence byte changed. This local
apparatus check failure is retained, not a paid/browser retry.

Final `local-tests-7` closed normally at 06:50:55.969 UTC, code 0 after
13671 ms. Both helpers pass syntax checks. The read-only verifier confirms
all 189 archive files, normal source-recovery closure, the unchanged failed
original result and all 149 inputs. Skill/people checks and all 351
repository tests pass. Retained stdout SHA-256:
`2bb34f7a49f3933cd8cf85cf86d60f6c4cd31bafa3af4ca440587d5ac4eb0247`.

## Local commit organization

The author's request is handled as three local-main pieces: `d25ef6e`
preserves the actual turn/failure and diagnosis; `b7083fc` records unexecuted
measurement-adapter preparation; this recovery piece retains the full
authored source, reproducible verification and updated reading map/handover.
No commit rewrites historical evidence or claims Stage 3 is complete.
No remote push was made.
