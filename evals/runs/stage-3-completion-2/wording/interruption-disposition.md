# Interrupted wording comparison

The single authorized first turn launched at 04:12:14.279 UTC on 12 October
2026. The recorder received external SIGTERM at 04:18:44.796 and forwarded
it once to its owned runner. The runner closed with code 1 at 04:18:45.590.
The actor process records 389,161 ms, `complete:false`, `timedOut:false`,
`interruptedBy:SIGTERM` and null usage. This was not its 15-minute deadline.
The signal sender is unknown. Root sent no signal and did not run tests,
builds or browser work during this actor. Concurrent preparation was
source-only. More frequent polling and the recorder did not prevent this
interruption; they are not claimed as a fix.

Unlike the entry interruption, genuine runner process/result/snapshot
records exist. All 379 actor artifact hashes and all four recorder raw
hashes verify. The 186-file saved snapshot exactly matches the closed live
source, digest `f5650b2628b8b99338dd11ae073dd091665d71f9c6907f4bb32d5204e63f506a`.
The separate [preservation record](interruption-preservation/preservation.json)
retains source identity, the actor's temporary contact-sheet helper, and
all 380 workspace-check files without changing the actor source or result.
Of those files, 16 and nine PNGs belong to coordinator setup; 364 and 307
PNGs belong to the two unfinished actor check groups. These are archived
originals, not newly reviewed independent browser evidence.

The 60-event stream contains 28 started and 26 completed commands, with
the final matrix and supplemental checks unmatched. There is no
`turn.completed`, `turn.failed`, terminal choice handoff or reliable usage.
The [independent audit](interruption-audit.md) found no remaining scoped
owned process ties, with its exact `/proc` access limitations preserved.

## What the partial source does show

The actor read the candidate skill and `references/building.md` (items 1
and 2), retained seven beats and created `docs/story/copy-choices.md`.
That saved draft contains exactly three opening and three closing versions,
recommendations, fixed surrounding sentences and an invitation to choose
or supply wording. `content/copy.ts` labels the currently rendered A/A
copy provisional. This is positive source evidence for the targeted
instruction, not a completed W1-W5 presentation. Whole-beat completeness
and full factual/rendered correspondence were not exhaustively scored.

W5 was not reached: the last messages are progress updates followed by
more checks, not a finished decision gate. W6 and W7 are unobserved. The
fixed second prompt cannot be sent, both because W1-W5 have not all been
established and because completion/usage guards reject advancement.
No second turn, judge, retry, forged gate or new instruction follows from
this interrupted record. No Stage 3 acceptance is inferred.

## Next work

Preserve this arm as inconclusive and finish the separately planned fresh
full-journey preparation. Before another paid launch, complete local
preparation and commit it, then supervise that actor serially without
large parallel source-review work. This reduces competing coordinator work
but does not identify or claim to fix external termination. Any repeated
test would need a separately recorded finite purpose and disposition,
never replacement of this evidence or automatic retry-until-pass.
