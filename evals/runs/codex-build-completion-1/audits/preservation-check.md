# Final preservation check

11 October 2026. **Passed, with no missing files, extra files in the checked
immutable artifact trees, nonregular source entries or hash mismatches.**
The [machine-readable record](preservation-check.json) includes manifest
hashes, counts, source comparison and the limits of this audit.

| Evidence checked | Files verified |
| --- | ---: |
| Completion cohort frozen inputs | 208 |
| Original spine cohort frozen inputs | 126 |
| Turn 1 result artifact map | 382 |
| Turn 2 result artifact map | 390 |
| Setup source snapshot | 183 |
| Turn 1 before / after source snapshots | 185 / 189 |
| Turn 2 before / after source snapshots | 189 / 192 |
| Independent acceptance artifact map | 75 |
| Actor-generated evidence after turn 1 / turn 2 | 563 / 1113 |
| Supplemental script and Git bundle after each turn | 2 / 2 |
| Failed supplemental capture | 10 |
| Failed judge attempt result artifact map | 9 |

The completion input digest remains
`d0e14ef568c0d136796be8434b86ae65c884ced13102d8cb83950cef13a0f824`.
The original input digest remains
`f3c2d770753136495701ed7ba73952709116a825d2b70fdbec119aaf859d31ba`.
Turn results agree with their embedded source snapshots and with the
retention manifests' result hashes. Both acceptance source records match
the final actor source snapshot.

All nine artifacts of the existing failed judge attempt match its result
map, with no missing or additional files. Its prompt is byte-for-byte equal
to the saved approval proposal prompt. Both have SHA-256
`fda25f8c89713adccd38fd8dcc885908f5369fc0485ff76b1bdbbb8000ec0ae8`.
The incomplete result and raw failure evidence remain unchanged; this audit
started no replacement judge operation.

The running preview workspace still has exactly the same 192 allowlisted
source files and 1,021,762 source bytes as the saved final snapshot.
Generated `.next`, dependency, check, Git and TypeScript cache trees are
excluded from that comparison. The recorded unallowlisted `.aws`, `.codex`
and `.storyfolio-git` directories were not inspected as source.

Current `evals/lib/build-score.mjs` differs from its frozen counterpart.
This is the separately recorded post-run judge character-cap fix, not
historical-input drift. Its test file was not included in this cohort's
implementation allowlist. Current navigation and handover edits were not
treated as immutable run evidence.

The archived pre-results handover and `docs/handover.md` at preparation
commit `ce7a481` independently resolve to Git blob
`3838982350da43aa1d45b8d3c6e61c326b6d1bf6`.

This unpaid read-only check establishes consistency with the retained
manifests. It does not authenticate their origin, verify every installed
dependency, replay Git bundles, remove the failed capture's non-atomic
limitation or supply the missing behavioral judgment. No old evidence,
actor workspace or source was changed.
