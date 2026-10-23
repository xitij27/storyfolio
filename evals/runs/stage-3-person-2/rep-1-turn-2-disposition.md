# Repetition 1, turn 2: failed on model capacity

Turn 2 of `codex-person-2` repetition 1 ran 300 s and failed with the model
service's own error, recorded in the event stream: "Selected model is at
capacity. Please try a different model." (`turn.failed`). The process
exited with code 1, not by timeout; no final reply and no usage were
recorded. Codex also logged "failed to record rollout items: thread
01a1662f-574d-78a2-a48b-ddf9b7c92628 not found" at the moment of failure.
Before it, the agent had recorded the corrections, built three sketches (a
rollback route, a cutover test bench, a runbook unfolding through its
checks, each with a working database-cutover control) and passed type
checks, lint and 130 engine tests; the browser check was being rerun.

The runner retries nothing and keeps the failed turn, so this repetition
cannot continue. Under the author's "yes" to this test, root starts
repetition 2 of the same cohort with the same frozen inputs, from turn 1.
If capacity fails again, root stops and asks the author.
