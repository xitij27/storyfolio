# Fourth local preparation checks

Root authorized these checks after runtime clearance at 05:14:08Z.
The acceptance subagent launched exactly one short-command record using
the native Node PATH and the same six recorded environment values as
`local-tests-3/command.json`. Telemetry was unset. No browser, application
build, installer, paid actor or judge was launched.

[Command](local-tests-4/command.json), [stdout](local-tests-4/stdout.log),
[stderr](local-tests-4/stderr.log) and [result](local-tests-4/result.json)
are retained unchanged. The complete
[tool launch](local-tests-4-tool-launch.json) records session 36016; the
[terminal poll](local-tests-4-tool-poll-1.json) closes it with exit 0.

Start: 2026-10-12T05:20:53.789Z. Finish: 05:21:08.088Z.
Total recorded duration: 14299 ms. All commands were joined by success
conditions, so the successful final result establishes every earlier
syntax/validator command also exited successfully.

- Three focused measurement suites: 55 passed, zero failed, 115.874459 ms
  in their TAP summary.
- Syntax checks: every current measurement-directory `.mjs` passed.
- Fixture preservation: passed, seven initial files and six fixed prompts.
  Its `launchable:false` is a preservation-only scope statement, not an
  actor or runtime readiness finding.
- Skill validator: 742 words, five references.
- People validator: 17 fictional people.
- Repository `npm test`: 351 passed, zero failed, 13357.857364 ms in its
  TAP summary.

Individual syntax/validator wall durations were not separately recorded.
Stderr is empty. Stdout SHA-256 is
`adfaddf78998ce14100ea356b1fab5e72720786434150d4f499a7d5f97d45e50`;
stderr SHA-256 is
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

Tested prospective source checkpoints:

| File | SHA-256 |
|---|---|
| controls-lib.mjs | `9fbadafef85a75acba473f596e47fe0cf60d08de3adc6a6066fbdcd29ea081dc` |
| controls.test.mjs | `20b179a9c37f22a2f9bef17443be7a79e9371fc482a4d1109fa33111ef28843c` |
| policy.json | `fb0564dcc2ca4319cc151679ddcb53295ced702148b91d36c537582397f93d54` |
| measurement-lib.mjs | `c74d4c57108858e62dae5ddd117c263fbcade52365f407ce7629bd82f7c140c5` |
| measurement.test.mjs | `cb2f415df1fd37f1a6cd623b9a175559d5684b9db7745fe6c7eeed36e00d3640` |
| calibrate.mjs | `db4ac02021af2c7692adcb7a739a26e1f32f32de53ade327e047a408a2ad206f` |
| run-unit.mjs | `6e06e52fd852955efdba5bc1302496dcd089a3df199dd85a3fda5ccdccc69142` |
| README.md | `c6d4d882ac9ad56eda8e4a50811969cf826a6f0f8804fa68767cce955e6c6088` |

The scoped source search found no production use of `boundsMs.mode` or
the old 480000 ms mode cap. The old value remains in a negative test that
rejects falling back to the old policy and in expressly historical text.
At this check, root-owned `preparation/launch-controls.md` still described
seven 8-minute modes and needs a prospective update before the case freeze.
Historical proposal/case-review checkpoints are not silently rewritten.

After these tests completed, independent source review identified a
remaining live-output tee concern: `process.stdout.write`/`stderr.write`
inside worker callbacks can receive an asynchronous outer-pipe error.
Synchronous raw files already retain each chunk, so those redundant tees
can be removed without losing raw evidence. This follow-up was reported
to root for a separate delta and verification, not hidden by these passes
and not attributed as the prior interruption's cause.
