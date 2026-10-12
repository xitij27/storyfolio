# Independent schema-3 source review

Read-only review on 12 October 2026 by the fixture preparer, before any
full-journey actor. No tests, browser, build, setup or model calls were run
by this reviewer. Root's separately saved test execution is not attributed
to this review.

No concrete legacy compatibility or seven-file fixture blocker was found.
The reviewer read all of `evals/lib/build.mjs` and `evals/codex-build-run.mjs`,
the new leading `build.test.mjs` tests through incomplete-turn preservation,
and the unchanged shared source-exclusion implementation.

- Schema 3 requires the actual full-journey identity, explicit unscaffolded
  setup, all six distinct prompts/stops and explicit refusal turns. Initial
  files are confined to declared material/assets, plus the installed skill.
- Initial source must equal frozen fixture/skill bytes; later source must
  equal the previous preserved snapshot. These checks precede turn-directory
  creation and invocation. Failed, missing-usage or wrong-session histories
  do not gain automatic continuation.
- The environment-only probe binds its exact evidence and initial snapshot
  without asserting actor preflight or rejecting legitimate later actor work.
- Existing schemas retain their preparation, identity, probe and gate
  semantics. No broader Git exclusion is introduced.
- Prospective tests cover these branches, six synthetic turns, source drift,
  missing evidence, non-bare Git metadata and interrupted-turn preservation.
  Source review is not a claim those tests were executed here.

Limits: generic probe hash checks do not establish the semantic truth of
capability evidence; the coordinator-owned proof must do that. Likewise,
an observation string does not prove a real user-choice gate. Source policy
continues to exclude known generated trees after actor work, not arbitrary
unknown source. Root still owns complete input freeze, actual environment
proof, semantic handoff review and runtime validation.

Reviewed source identities:

| File | SHA-256 |
|---|---|
| `evals/lib/build.mjs` | `d78cce4c3914127da41154e7368f689ed1828cd0efa4a6b0959d6890d5edc731` |
| `evals/lib/build.test.mjs` | `adfc835f8092357fcade188a23f3c12e8b94c7c0e25bc509421cc499021f5094` |
| `evals/codex-build-run.mjs` | `322dd3571b3f5396d48e07b340d11162900585cf5885f54f68e7271365cca5a6` |
