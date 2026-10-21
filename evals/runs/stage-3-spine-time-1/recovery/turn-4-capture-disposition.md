# Turn 4: native completion, failed evidence capture again

21 October 2026. Not a stop-4 pass. The original
[result](continuation/turns/04/result.json) stays `complete: false`, with
no snapshot. No retry, and the live actor workspace is untouched.

## What closed

The actor completed normally in the same session after 1053442 ms
(process code 0, no timeout, interruption or log error). The
[stream](continuation/turns/04/stream.jsonl) ends in a terminal agent
message and `turn.completed` whose usage equals the result's. The
[final reply](continuation/turns/04/final.md) offers two looks of the
opening, Access middle and Record ending (Aluminium, Anodized),
recommends Aluminium, reports the Mosslink page, HTML CV, icon, preview
and 404 as built, and waits for the look choice. These are actor
reports, not independent observation.

After closure the runner's capture stopped at:

```
Error: Snapshot byte bound exceeded: site/.next-concepts/cache/turbopack/v16.3.8-b0fad0d4/00000001.sst
```

The recorder closed normally with code 1 after 1058653 ms.

## Cause

The same as [turn 2](../turn-2-capture-disposition.md): the capture policy
excludes `.next` but not the actor's own build directory
`site/.next-concepts`. The one-shot [cache move](cache-relocation.json)
before turn 3 removed the directory once; the actor's next build
recreated it. Root missed that a building turn would bring it back, and
did not change the capture rule before launching turn 4. Turns 5 and 6
would fail the same way under the current runner.

## Budget after turn 4

Turn 4 used 442881 uncached tokens. Cumulative: 2327479 ms of 5400000
(51.2 minutes left) and 912200 of 1500000 uncached tokens (587800 left).
At turn 4's rate, turns 5 and 6 together would likely pass the uncached
ceiling. Projection, not observation.

## Next

Author decision on the recovery path and the budget; see the handover.
