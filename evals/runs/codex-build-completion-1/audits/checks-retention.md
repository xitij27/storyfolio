# Retaining actor-generated checks

This coordinator utility was prepared after the cohort froze, while actor
turn 1 was running. It is separate from the frozen runner and checker.
Preparation and the four synthetic local tests did not read or change the
running actor's checks, source or dependencies. No model or build call was
made for this utility.

After the actor and any background check/server processes have stopped,
and before starting another turn, invoke from the repository root:

```sh
node evals/runs/codex-build-completion-1/audits/retain-checks.mjs \
  --run=evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1 \
  --turn=1
```

Use `--turn=2` after the second turn. The script requires the identified
turn's final `result.json` and refuses capture if a later turn directory
already exists. It creates `actor-evidence/turn-N` exclusively, refusing
to overwrite any earlier capture. Invoke it before adding supplementary
evidence under that directory.

Every regular file under the workspace's `checks/` tree is retained as
bytes, with SHA-256 and byte size in `retention-manifest.json`. The
manifest identifies the source workspace, turn, requested stop, result
hash, run metadata hash, input digest and retention script hash. Missing
checks are explicitly recorded. Symlinks and other unsupported entries
are listed rather than followed, and make retention incomplete with exit
status 1. Errors preserve the partial capture and manifest. Names
`node_modules`, `.next` and `.git` are excluded at any depth and reported.
Only the `checks/` source tree is walked.

Capture includes older check directories still present after a later
turn. This is a snapshot of available actor diagnostics at that stop,
not a claim that every retained file originated during that turn. Hashes
identify duplicate bytes. The completed result prevents ordinary capture
of an in-flight turn, but the coordinator must ensure background
processes have stopped: this is not an atomic filesystem snapshot.

The manifest covers checks only. Temporary scripts named in the command
audit and any Git history bundle need separate retention and their own
supplementary hash record. None of these actor-owned reports establishes
independent acceptance or proves a screenshot was visually inspected.
The [previous cohort's retention record](../../codex-build-1/embedded-1/baseline-1/actor-evidence/turn-1/retention-manifest.json)
provides the earlier SHA-256/byte-count format.

`retain-checks.test.mjs` passed all four tests with native Node 22.22.1:
binary bytes and result binding, overwrite refusal, unsupported symlinks,
generated-tree exclusions, unfinished/superseded-turn refusal, and absent
checks. [Test output](retain-checks-tests.log) is retained. CLI syntax and
the scoped whitespace check also passed. These tests use separate
synthetic temporary directories and make no model calls.
