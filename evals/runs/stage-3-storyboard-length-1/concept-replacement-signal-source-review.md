# Replacement operation 02: independent signal-path review

Source-only review after terminal closure. No browser, model, test, kill,
cleanup or helper edit was performed. The initial sender of SIGTERM remains
unknown. The reviewed source and retained sequence do not demonstrate a
self-inflicted signal to the recorder or a process-group escape.

## Observed sequence

- Recorder PID 883466 started at 21:15:27.632 UTC and spawned coordinator
  883477. The coordinator spawned worker 883650 at 21:15:29.295.
- The worker's Next build child 883661 completed normally. Its detached
  preview child 883870 closed with code 143 at 21:16:22.141 during normal
  worker cleanup. That server outcome is not the later recorder signal.
- Worker 883650 exited and closed normally, code 0, at 21:16:22.435.
  Its record has `timedOut:false`, `externalSignal:null`, `signal:null`
  and `logError:null`. Its deadline was 21:16:54.291, not yet reached.
- At 21:16:23.969, about 1.534 seconds after worker closure, the recorder
  logged its first incoming SIGTERM. It then explicitly forwarded SIGTERM
  to coordinator 883477. That child exited/closed by SIGTERM at
  21:16:23.975. The recorder's result is incomplete. Thus the original
  incoming sender is unknown; the recorded forwarder to the coordinator is
  the recorder itself. This does not establish whether the original signal
  also independently targeted the coordinator.

The retained `closure.closed` value, 21:16:22.438, is assigned when the
closure object is constructed, before asynchronous source/artifact checks
and the final write. It is not proof that all coordinator finalization had
finished at that instant. The complete closure file and printed JSON were
retained, but neither supersedes the failed outer terminal condition.

## Source paths checked

The recorder has no work deadline. Its only sends are positive-PID forwards
to its own child after receiving SIGTERM/SIGINT, and a later positive-PID
SIGKILL if that child fails to stop. This attempt records a received signal
and successful forward, not force escalation.

`runBounded` sends only to its owned worker PID. Its close handler clears
deadline/escalation timers and removes its signal listeners. The actual
worker lifecycle contains only spawn, exit and close, with no deadline,
external-signal or stop request. `run-operation` can signal that same owned
worker on logging failure, but its exit/close callbacks clear the owned PID
and kill timer; its finalizer also clears them. No logging failure is saved.

The gate worker starts its Next children with `detached:true` and sends
negative-child-PID signals only to those intended child process groups.
Its stop guard requires a still-running child; closed children are removed
from its set. No reviewed call targets PID/group zero, the recorder PID or
an ancestor PID. The worker itself had already closed before the recorder's
incoming signal. Historical actual process-group IDs and signal-sender
metadata were not captured, so source intent is not a universal group or
descendant-containment proof.

A read-only exact-PID check,
`ps -p 883466,883477,883650,883661,883870 -o pid,ppid,pgid,sid,stat,args`,
returned only the header, exit 1, after this failure. An earlier read-only
command/workspace-filtered process listing matched only the inspection
command itself. These observations are limited current absence evidence,
not historical group IDs or proof that every possible descendant exited.

## Bound evidence

Paths below are under this study unless otherwise specified. SHA-256:

| File | SHA-256 |
| --- | --- |
| `commands-2/operation-02/lifecycle.jsonl` | `26e6f4f8a42443c54bddf24624dc16349325492ce15d3b7f02bab33ace38e6df` |
| `commands-2/operation-02/result.json` | `611547081a0e87a6cf22d4a9f391ffff426139ea948cce83210208c99506cc41` |
| `control-2/operations/02/lifecycle.jsonl` | `15df81dfaab828d3440bc7669e569a538d4a0ad36e9c6158608583287716b7e9` |
| `control-2/operations/02/process.json` | `f3d987271a21be55bfbd123541dd20a5fdde68b64a38dc8e5b36e9b978077d71` |
| `measurement-2/run-operation.mjs` | `fc0a3e7e3cccf8dd397fa3f7482d555e7258d2511ce92ea8c77805c2aecc1eb3` |
| `measurement-2/gate-worker.mjs` | `8a736f7f91c525d7b88ddc062f7b4241c8b179bbebfd40251a01a683d11d8660` |
| `../stage-3-candidate-verification-1/bounded-process.mjs` | `dab797cde4ee8d272e253aea78a0867d13cd4a3990bbf977e225976749101bcb` |
| `../stage-3-completion-2/process-supervision/recorder.mjs` | `fc92e1a3f4d4eaecbee0a952e0ea3dba4f7ec28487840698cb8aa83d9e262802` |

No sender, platform action or cleanup defect is inferred from timing alone.
No retry, remaining batch or actor advance follows from this review.
