# Calibration 2 interruption and partial integrity audit

The desktop calibration is incomplete. The execution tool closed with outer
exit 143 and empty output, without a recorder result, worker result, durable
worker lifecycle, or completed mode report. This is not a normal capture
closure, a proved checker timeout, a technical pass, or a Stage 3 result.
No retry, browser, build, model, or test was launched by this audit.

## Timing and retained process evidence

- [The launch](desktop-tool-launch.json), session 51796, records
  `2026-10-12T05:02:21.769Z`. The initial worker manifest records
  `05:02:21.907Z`. The saved command declares 475,000 ms work plus
  5,000 ms shutdown grace.
- Root reported observing terminal status at approximately `05:08:56Z`,
  before the declared work bound. [The raw terminal tool record](desktop-tool-poll-4.json)
  has exit 143 and empty output but no timestamp or child signal field.
  The reported observation is not an invented exact process-death time.
- [The first metadata scan](interruption-proc-01.json) at
  `05:12:44.592Z` inspected 78 same-UID processes and 2,055 readable
  descriptor links. It found one exact workspace cwd tie, PID 258380.
  The process was sleeping, UID 1000, PPID 2044554, PGID and session 258380,
  start tick 91563927, command name `next-server (v1`. Its cwd was exactly
  `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-5yt94U`.
  No scoped descriptor tie or observed descendant was found.
- Root explicitly authorized cleanup of that one reverified PID only.
  [The retained operation](stop-owned-server.mjs) checked UID, start tick,
  group, session and exact cwd twice, then sent one PID-only SIGTERM at
  `05:13:42.399Z`. [The result](stop-owned-server-result.json) records
  ENOENT at `05:13:42.500Z`, after 100.680 ms. No group or parent signal,
  SIGKILL, or zombie observation occurred. This authorized later cleanup
  is separate from the earlier unexplained interruption.
- [The post-cleanup scan](interruption-proc-02.json) at
  `05:14:08.433Z` inspected 77 same-UID processes and 2,025 readable
  descriptor links, with no scoped ties. Root was informed before starting
  subsequent diagnostics. Both scans retain EACCES limitations for PIDs
  372 and 374. Detached or reparented processes with a different cwd and
  no matching readable descriptor can escape this limited check. It is
  not a universal claim that every descendant exited.

The scans used metadata only, not environment, arbitrary argv, credential
contents or descriptor contents. Their complete tool responses and the
cleanup tool response are retained beside these records.

## What the launch implementation can and cannot explain

The exact 23 launch implementation files are retained under
[implementation/](implementation/) and hash-verified against
[preparation.json](preparation.json). These observations concern those
bytes, not subsequent prospective edits:

- The historical [record-command.mjs](implementation/evals/runs/stage-3-comparison-1/record-command.mjs)
  records the command and redirects output, but has no signal handlers or
  saved child PID. It writes `result.json` only after child close/error.
  The separately developed signal-aware process-supervision recorder was
  not the outer recorder for this calibration.
- [calibrate.mjs lines 26-28](implementation/evals/runs/stage-3-completion-2/full-journey-measurement/calibrate.mjs:26)
  keeps lifecycle callbacks in an in-memory array and writes lifecycle,
  stdout, stderr and result only after `runBounded` resolves. Missing
  durable lifecycle therefore cannot establish that no signal arrived.
- The preserved [bounded helper](implementation/evals/runs/stage-3-candidate-verification-1/bounded-process.mjs:28)
  has external-signal and deadline handlers, but the caller did not persist
  callbacks immediately. No surviving record identifies which handler, if
  either, ran during this interruption.
- [final-worker.mjs lines 105-129](implementation/evals/runs/stage-3-completion-2/full-journey-measurement/final-worker.mjs:105)
  starts the Next process detached, and ordinarily signals its owned
  process group during shutdown. The observed Next PID's independent group
  and session are consistent with this design. They do not identify who
  ended the upstream process or prove how its orderly shutdown was lost.

Outer status 143 is consistent with SIGTERM-related shell termination,
but the raw record does not identify a sender, signal recipient or cause.
Do not infer a shared cause from earlier interrupted actors/captures, or
claim this was the worker's own deadline. The missing close evidence and
surviving server are real lifecycle/observability gaps. Prospective durable
logging can improve evidence, not retroactively establish the cause.

## Partial artifact and source verification

The separate read-only [partial verifier, version 3](partial-integrity-v3.mjs)
ran at `05:19:13.922Z` to `05:19:14.632Z` after cleanup. Its
[full result](partial-integrity-result.json) and
[exact tool response](partial-integrity-tool.json) retain inventories and
hashes. It did not run the prepared completed-case `desktop-integrity.mjs`.

- All 86 current source files equal the preparation and initial worker
  snapshot, digest
  `1c499ad1346aa437d5701993b7b71f1b60cc35670e9afe0b7c76d48a1c18a060`.
- All 173 currently inventoried build files equal the pre-launch build
  inventory, digest
  `35f65c100277899a70aa4b0be1a0921914bbc21c6f9227f93031e3b2149dc671`.
  The preserved narrow cache comparison still matches preparation's
  original 167-file build versus the six existing cache-promotion files.
  This is a post-interruption independent observation, not a recovered
  worker `buildAfter` or source-after field.
- All 23 archived launch files, five preparation references, and the
  recorded immutable target/dependency hashes verify. Current prospective
  implementation drift is listed explicitly in the result. Root confirmed
  it requested these edits after the `05:13:42` cleanup notification; the
  edits are not workspace source/build changes or changes to archived
  launch bytes. Exact per-file edit times are not inferred from this audit.
- The original successful build's eight artifact hashes and calibration
  1's 109 artifact hashes still verify. Its failed desktop manifest remains
  byte-identical, SHA-256
  `283b8153e10f6b4de2d09c5bbd12338b773ebf0226dfbe80f70aab90c6f7bb54`.
  Its failed outcome is not rescored.
- Calibration 2 retains 81 files inside `desktop/artifacts`, counting its
  initial manifest, or 80 other retained files. There are exactly 75
  original images: 15 story and 60 control images across 16 control keys.
  There are no travel originals. All paths, sizes and hashes exactly match
  root's [75-image original-detail review](desktop-originals-review.json).
  The earlier 58-image partial review also remains byte-bound. This audit
  verifies root's reviewed file set; it did not independently view pixels.
- The focus-only control has a legitimate `pointer-unfocused` original
  plus two keyboard originals. Board control key `b8440473c2b2918b` has
  no keyboard-after original; source-link key `e96fd7cd390c706b` has no
  keyboard originals. Image filename availability does not establish
  control geometry, applicability, successful activation or target response.
  Those technical records were not completed.
- The artifact inventory, source and build were stable across the audit's
  repeated reads. The initial manifest is SHA-256
  `42cad7e8d2824285b90a719861348817da83108d2c356743ca9f9a86ecbf517e`.
  It still says `complete:false`, with empty results and no artifact hash
  map, source-after, build-after, passed or finished fields. The absent
  terminal files remain absent. No synthetic runner result was added.

The first audit attempt stopped at changed current `policy.json`, and its
[failure](partial-integrity-attempt-1-tool.json) is retained with the
[original verifier](partial-integrity.mjs). The second version correctly
verified archived code rather than current prospective code, but stopped
on this auditor's overly narrow filename expression for the legitimate
`pointer-unfocused` image. Its [source](partial-integrity-v2.mjs) and
[failure](partial-integrity-attempt-2-tool.json) are also retained. Version
3 only corrects that inventory taxonomy; it does not relax a capture gate.

Root's visual observations are separate from this integrity audit: the
retained long-fragment destination was readable and middle pointer trials
showed actual target changes, but several keyboard originals showed the
power-beat area rather than the middle controls. These limited reviewed
images are not a complete technical or visual acceptance result. Stage 3
remains incomplete.
