# Prospective batching accounting review

Source-only advice before reviewing the new implementation. No test,
browser, build, model, helper invocation or source repair was performed.
This is not a completed implementation review or launch authorization.

Read the existing recovered `run-unit.mjs`, `prepare-source.mjs`, binding
and application-root helpers, complete gate worker, and unchanged
`stage-3-candidate-verification-1/bounded-process.mjs`.

## Smallest reliable seams

- Keep a new exclusive replacement binding and output. Reconstruct the
  same complete 182-file recovery once into a fresh workspace, install
  offline in canonical `site/`, and preserve the interrupted `concepts-1`
  tree. Reuse the original source, package, lock, dependency and environment
  validators. Setup itself must be bounded and charged, not an unmetered
  prelude to twelve nominally bounded captures.
- Keep all original targets and validation. The worker's only selection
  seam should select one exact original alternative index, retaining its
  original index in report names, and run both original desktop and phone
  viewports. Preserve production build, identity, activation, control,
  error, source and artifact checks. A batch's completion describes its
  two expected cases, never full target coverage or semantic acceptance.
- Use one exclusive started record and one terminal result for setup and
  each batch. Require complete prior operation history before another
  invocation. Missing, failed, externally interrupted, retried, ambiguous
  or log-error operations must not disappear from budget accounting or
  be treated as zero elapsed time. The approved replacement is one
  execution, not twelve independently reset allowances.
- Charge each operation's full actual execution interval once, including
  reconstruction/install for setup and build/server/browser/shutdown for
  each batch. Declare whether validation/final record overhead is included;
  the conservative interpretation includes it. Exclude human review gaps
  only if the protocol expressly defines cumulative execution rather than
  one wall-clock deadline. Do not sum nested child times as additional
  operations or clamp an actual overrun down to its allowed value.
- Compute each child's total allowance from both constraints:
  `min(90000, 900000 - priorChargedMs - currentOperationOverheadMs)`.
  Reserve the 5000 ms shutdown grace inside that allowance. Do not start
  with 5000 ms or less available, and re-evaluate immediately before spawn.
  Twelve maximum-sized batches would exceed the total, so the cumulative
  check must actually stop later work when insufficient budget remains.
- The frozen bounded helper targets its owned PID and waits for child
  close. It does not guarantee pipe settlement after a detached descendant
  escapes or prove descendant exit. Preserve the helper's identity and
  limitation. An observed overrun, absent terminal result or surviving
  owned process blocks further execution; do not label it a satisfied
  hard cap just because the configured timers sum to the cap.
- Aggregate only the exact union of twelve distinct original selections:
  24 alternative/viewport cases and, for complete eight-image cases, 192
  originals. Reapply the original target, report, artifact and control
  criteria globally. In particular, report `complete:true` does not waive
  problems or missing control images. Source equality and new production
  builds remain per-batch observations, not a final whole-site build proof.

The implementation author and verifier author received these points.
Concrete record schemas, command identities, budget persistence and
complete coverage still require review once the new source is stable.

## First concrete source checkpoint

Read the complete new loader, setup worker, operation runner, budget helper
and eight pure budget test groups, the complete worker diff against the
preserved original, and the initial `assertBatchCoverage` implementation.
No test or helper was executed. The worker diff is limited to imports,
the required batch selection, its manifest fields and the selected loop;
the original observation and interaction criteria remain unchanged.

The pure budget arithmetic rejects incomplete or failed history, missing
normal-closure flags, missing durations, binding changes, noncontiguous
operations, retries and observed overruns. It derives each new allowance
from the entire preceding prefix. Setup invokes the original fresh-copy
helper and one offline install within its bounded child, while install,
build and server still use `site/` and source comparisons cover the whole
workspace. Exclusive operation directories block a second attempt using
the same ID. Original helpers remain additive-bound rather than edited.

The first integration charges the bounded child's actual lifetime, not
the parent runner's preceding binding checks and subsequent evidence
validation. This distinction was flagged to root. The saved approval
history defines total supervised verification execution, so that scope
can remain internally consistent if disclosed explicitly. It must not be
called a whole-invocation wall-clock cap. Human gaps and coordinator
validation overhead require separate qualification, not silent inclusion
in the charged result.

Two final integration checks were sent to the verifier author: correlate
the recorded duration and normal close with the hashed raw lifecycle, and
independently check required source/artifact evidence rather than assuming
the supplied closure evidence map is exhaustive. The initial runner's old
coverage call is pending replacement by the shared new batch assertion.
The completed verifier, integration changes, final hashes and root-run
tests remain pending at this checkpoint.

## Final source disposition

Root chose the more conservative accounting scope after that checkpoint:
all thirteen actual outer recorder lifetimes count, including coordinator
preflight, child execution and closure validation inside each invocation.
Read the complete final loader, runner, verifier and README, plus both
eight-group pure test files. No concrete source-review blocker remains.

Each prior operation now requires a separately retained `supervision.json`
binding its actual normal outer result and observed terminal tool record.
The original supervisor validator and raw hashes are reused. Exact native
executable, argv, cwd, environment, recorder hash and outer-child to inner
coordinator PID identity are checked. Recorded inner timestamps must lie
inside the corresponding normal outer interval. The actual child duration
must not exceed the outer duration; the outer duration must not exceed its
operation allocation. All outer lifetimes count toward the 900000 ms total,
and the full next allocation must fit before another operation can start.
Unknown, failed, missing or over-budget closure still halts execution.

The final verifier also correlates the normal inner lifecycle with its
command, PIDs, timing and limits; requires the exact closure evidence path
set; rehashes the actual batch artifacts; and recomputes original report
criteria. Exact global coverage remains twelve selections, twenty-four
reports and 192 individually reviewed originals. The old interrupted
capture's artifacts and recorder logs are independently preserved. Its
failure is not repaired by the new union. Whole-workspace identity and
canonical `site/` execution remain distinct.

| Reviewed file in `batched-measurement/` | SHA-256 |
| --- | --- |
| `binding-lib.mjs` | `015c46aa9250011951702afca37580cb7cc1ae55ec131c15a7efa109f24c8f7b` |
| `budget.mjs` | `ef3ca36caf783078c42e54426636e829b9184ddfbdb60a4e59f45e3d429d0c6c` |
| `budget.test.mjs` | `a9769dc4a5d3a8d6b60c0e0821f11d114f1c5dd0f5d6261ecdeccbce319714b8` |
| `setup-worker.mjs` | `ec474cf1eb5e7f41079280864a70ec696c8a24da84bd1a215ed98d93bb71bd9c` |
| `run-operation.mjs` | `f0d9d886b443fcf3951c5ccf296cd85efb3cf2a6faa5568cacda57ff422b2988` |
| `gate-worker.mjs` | `5f8572f3dc80d8371d760ad3d2b3a242c29e675a9a137d9137c9f299ad11f68a` |
| `verify.mjs` | `375a081f93f85be010aa82c25fc5b79964d1c13d2113d06abdbb4138e89e6a38` |
| `batch.test.mjs` | `1794ceee6c8e0c3ba33486ecd118b475e81a681508d12425a2c2ec30f941744b` |
| `README.md` | `d208615fa769d8a8239ecb8eb9cfa00957bb4f3947aea296bc5a289f9dca4c96` |

These checks make an actual overrun or incomplete record fail closed.
They do not give the inherited outer recorder a new work-deadline timer
or prove all detached descendants exited. Root must preserve an actual
overrun or process-survival finding and stop; no reviewer claims the prior
external-signal cause is fixed. Inter-invocation manual review and final
read-only audit remain outside execution time, explicitly not a promise
of fifteen minutes of total calendar time.

This source disposition does not run tests, bind the final replacement,
launch setup/capture or grant a semantic/actor continuation gate. Root's
final stable-byte tests, concrete record preflight and separate launch
disposition remain required. The reviewer made no helper or frozen edits.
