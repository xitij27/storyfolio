# Turn 2: native completion, failed evidence capture

13 October 2026. This is not a concept pass, recovered snapshot, or
permission to skip the independent concept gate. The original result stays
`complete: false`, with no snapshot. There has been no paid retry.

## What actually closed

The actor completed normally in session
`01a133cb-3949-7881-a279-b078b5f3baca`, process code 0, after 941074 ms.
The retained stream ends in a real terminal agent message followed by
`turn.completed`, with reliable usage. It recommends the personally built
bring-up fixture, offers three runnable sketches, asks for a real choice,
and waits before the storyboard. Its layout, fallback and CV checks are
actor reports, not independent acceptance.

After model closure, the recorder's source snapshot encountered:

```
Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst
```

The outer process closed normally with code 1 at 06:13:59.602 UTC after
943242 ms. No external interruption or model deadline occurred. Do not
call this an unexplained SIGTERM or an unfinished model turn.

The original result SHA-256 is
`7a7cbf72ccf7963cc665961a486af11b8c49b44f7ea755db217a6ec3f5ac63b6`.
All 105 retained artifacts and 149 frozen inputs verify. There is no
separate `final.md` in the original capture; the exact terminal message is
extracted read-only from its retained stream, not reconstructed from the
aggregated commentary.

## Cause and evidence

The original source policy excludes exact `.next`, not custom `.next-concepts`.
Live post-closure `site/next.config.ts` selects the build directory through
`STORYFOLIO_DIST_DIR`; `site/scripts/serve-concepts.mjs` explicitly sets it
to `.next-concepts`. The generated `required-server-files.json` confirms
that exact directory. The snapshot walker therefore treated a generated
Turbopack cache file as authored source and hit its byte bound.

The [read-only audit](capture-failure-audit.mjs) verifies native completion,
the immutable failed artifact result, normal unsuccessful outer closure,
all original hashes, and exact live configuration/build markers. Its
[retained output](capture-failure-audit-command/stdout.log) closed normally
at 06:40:44.770 UTC, code 0 after 439 ms. Output SHA-256:
`120c38df9d58a476fd37c61229bc7fe4d3f3048bee0115b6a6fc87f95637b8f5`.
The live marker hashes are diagnosis evidence, not a closure-time archive.

## Next bounded action

Preserve the failed result and all original frozen helpers. Prepare an
additive source-recovery amendment which positively identifies the exact
generated directory, archives the full remaining authored source with
file/byte bounds, and explicitly labels its post-closure evidence basis.
No broad hidden-directory or `.next*` exclusion is justified. Do not edit
the actor's app, skill, fixed prompts or original recorded result.

Bind and verify a reconstructed copy before the single independent
concept measurement. The currently prepared measurement adapter is not
launchable against this failed original result without recovery binding.
No browser pass, concept gate or turn-3 continuation exists yet.

If recovery and the concept gate pass, continue only original fixed turns
3 to 6 in this same session. Preserve the original 90-minute cumulative
and token ceilings: elapsed actor time across the two turns is 1101163 ms,
reported input plus output is 2071429 tokens, and uncached input plus
output is 208133 tokens. Do not reset counters or add a conversation.
No skill instruction is justified by this apparatus failure. Stage 3,
full final verification and actual author/device acceptance remain open.

## Commit checks

`local-tests-4` closed normally at 06:42:24.020 UTC, code 0 after 13142 ms.
The audit syntax, skill and fictional-people checks, and all 351 repository
tests pass. Stdout SHA-256:
`1185ed771bba5bf1b58dc94963476997f3962f6a22d3673baa9d2a7949b7ae2a`.
Raw actor streams and snapshots retain their exact original bytes,
including historical formatting. No skill or frozen input was modified.
