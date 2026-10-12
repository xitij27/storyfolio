# Independent prelaunch readiness audit

12 October 2026. Scope: the newly authorized single verification capture of
the unchanged saved candidate, with a 15-minute cap and no new build agent,
judge or retry. Root records authorization and controls launch. This audit
does not launch a runtime or make an acceptance claim.

The [retained read-only script](readiness-source-audit.mjs) passed at
`2026-10-12T00:28:02.151Z`; [its result](readiness-source-audit.json) records:

- All 124 frozen candidate inputs verify, digest
  `a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353`.
- All 86 current shipped skill files, including 79 engine files, equal
  the frozen candidate. Main skill hash remains
  `cea93b6a009a405d4bd0497e5a8e1bdae53901259a9a7739e334008a0274cee2`.
- All 367 actor artifact hashes and all 184 saved/live source files match.
  Source digest remains
  `830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7`.
  Actor and frozen checker inventory scopes agree exactly.
- The old interrupted capture manifest remains
  `b21f8baa6e9568c71e7d0cde2957c4e2405eff4018c09594de76f2fa23296572`.
  All 134 old artifacts and 12 frozen checker/dependency entry points
  verify; its incomplete/failed verdict and original terminal records
  are unchanged. Its before/after source equals the current workspace.
- The external workspace is a readable/writable nonsymlink directory.
  Metadata-only checks find `.aws`, `.codex` and `.git` still empty, without
  credential-content reads. The frozen Node executable is accessible.
- A same-user `/proc` cwd/comm-only observation found no process with a cwd
  in the candidate workspace. Old wrapper/checker PIDs 4145954 and 4145966
  are absent. Two unrelated cwd reads were denied and are recorded. This
  instantaneous limited observation does not prove every process absent.
  No command lines, environment contents or signals were read or changed.

The application still includes the five actor-local core adaptations in
its original final partial snapshot. "Unchanged" means no post-turn source
edit, not an unmodified copied engine. The actor remains timed out with
unknown usage. The old capture's external interruption is a separate fact.
Neither historical result is retried in place or upgraded by this readiness
check. Dependency entry-point identity is not a new full dependency audit.

Only new study evidence was written. No test suite, build, browser, package
installation, process cleanup, model call or existing-output rewrite ran.
Wrapper review is a separate gate and will be recorded here before root's
launch decision; this source result alone does not approve that wrapper.

Command executed from the repository root:

```bash
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/runs/stage-3-candidate-verification-1/readiness-source-audit.mjs --save
```

## Wrapper review before launch

Read-only review of `run-verification.mjs`, `bindings.mjs`,
`bounded-process.mjs`, their five saved lifecycle tests and the final
`verify-verification.mjs` finds no source/environment/preservation blocker.
The wrapper invokes the same frozen `evals/check-build.mjs`, expectations,
native Node and trusted dependency argument. A separate read-only
`loadBindings()` call compared the complete recorded environment object
with the interrupted capture's `command.json` and found exact equality.
It also checked that both the new acceptance output and single-attempt
marker were absent. This did not invoke the wrapper or checker.

The checker writes only the new study's acceptance directory. The exclusive
single-attempt marker and new-file writes prevent reusing this attempt;
historical 134-artifact verification runs before and after. Current source
is required to equal all 184 saved actor files before launch and is compared
again afterward. All 124 frozen inputs are verified. The saved successful
five-test lifecycle result belongs to the acceptance agent; this auditor
read it and did not rerun tests.

The timer sends SIGTERM to the owned checker PID at 900,000 ms and records
the deadline. Up to 5,000 ms of orderly shutdown grace follows, then SIGKILL
of that same owned PID if still alive. This is a 900-second work deadline,
not a strict 900-second total wall-duration guarantee. The frozen checker
normally handles TERM by stopping its own child groups and preserving its
manifest. If it becomes unresponsive, owned-PID escalation alone does not
prove all detached descendants are gone. Any such outcome requires a
separate, evidenced post-run process check, not blind cleanup or a claimed
successful bounded capture. `runner-notes.md` explicitly retains these
limits. No frozen handler or measurement logic was altered for this audit.

The terminal verifier binds helper hashes, exact invocation/environment,
one lifecycle spawn and close, before/after/current source and old evidence;
it separates integrity-only checks from full available-original review.
Root must still confirm its execution-tool session has closed before a
terminal outcome is claimed. Unknown external signals remain unknown.
No successful capture, cleanup guarantee or complete actor delivery is
inferred from the prospective tests.

Reviewed runner identities:

- `run-verification.mjs`:
  `fc528682b5d158b96f9ca6c1d6ca9c7d295bef445ee2adf0e0184b9088709f05`.
- `bindings.mjs`:
  `2a66ebddd0c0349191688ab4eeb17f3081b333be6399c75f9149cbc9883b6e32`.
- `bounded-process.mjs`:
  `c6e4a0c7267e034b6d5c7a5f61dff0fc55e179da24dfa59208d1ec743fd9d1e7`.
- `bounded-process.test.mjs`:
  `e734b4e0978c94767369d6bd16c2ffaa9305778b2e1d455b89a79c97b60caf10`.

The read-only filesystem capacity check reported 995,906,097,152 available
bytes on the shared filesystem, not a storage blocker at inspection time.
Final launch authority remains with root under the new recorded approval.

## Final deadline revision, ready for root launch

Root required the shutdown allowance to fit inside the authorized fifteen
minutes. The earlier 900,000-plus-5,000 prospective version above was never
launched. This final review supersedes its timing and helper identities,
without rewriting that preparation history.

The final `CAPTURE_BOUNDS` is 895,000 ms of work plus 5,000 ms of shutdown,
targeting 900,000 ms total child lifetime. SIGTERM starts shutdown at the
work deadline; the grace calculation uses the remaining absolute envelope,
so delayed timer scheduling does not intentionally add a fresh five seconds
past the target. OS/event-loop/signal/reaping jitter remains recorded rather
than hidden by a strict elapsed-time claim. The owned-PID and descendant
limitations above remain, as does the need for root-confirmed tool closure.

The runner and final verifier use the revised constants. The saved
[six-case lifecycle tests](wrapper-tests-revised.json) pass, including an
exact production-envelope assertion. The auditor read their final code and
results without rerunning them. [Final wrapper readiness](wrapper-readiness-revised.json)
also retains exact source and historical-evidence checks. Binding/environment,
fresh output, single-attempt preservation and frozen measurement are unchanged.

Final identities independently hashed during this review:

- `run-verification.mjs`:
  `a5769f96cf76a2034b2c7009674c986dce5e26223a3a5f4fcd9a70dc84e88a64`.
- `bindings.mjs`, unchanged:
  `2a66ebddd0c0349191688ab4eeb17f3081b333be6399c75f9149cbc9883b6e32`.
- `bounded-process.mjs`:
  `dab797cde4ee8d272e253aea78a0867d13cd4a3990bbf977e225976749101bcb`.
- `bounded-process.test.mjs`:
  `63fe01cbb43df441d1740dac58e38567da9e21d1a77406f61e7b0f395a810202`.
- `verify-verification.mjs`:
  `db9bd883668a466fa4ddf978ef5552386f62d9b4c265c96d4668f686f8353176`.

No blocking readiness finding remains for root's one authorized launch.
This is not a launch, successful capture, renewed actor or judge allowance,
or completed Stage 3 result. No additional probe or runtime was started by
this auditor.
