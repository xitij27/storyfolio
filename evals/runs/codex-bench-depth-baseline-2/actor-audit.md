# Completed baseline actor audit

12 October 2026. This is a read-only access, lifecycle, source and provenance
audit of `bench-depth-2/baseline-1`. It is not a visual acceptance, author
approval or judge verdict. No model, browser, build or actor command was
launched by this audit. Existing ignored captures were copied into this
cohort without overwrites. The actor workspace and historical cohorts were
not changed.

## Outcome and evidence

The actor completed and its process settled successfully. All 48 saved
shell commands, inline programs and printed outputs were reviewed, including
the final command and reply. No held-out implementation, prior-run helper,
old prototype source or prior screenshot content read was observed. This is
an observed-access conclusion, not a filesystem-isolation claim.

The entire final source inventory matches the frozen capture helper's
inventory, including file keys, sizes and hashes. No source exception was
introduced to obtain equality. The supplied skill, engine core, dependency
lock, factual records, coordinator setup record and neutral screenshot
helper remain unchanged. All 80 actor-recorded review source/copy pairs
match the archived original bytes and saved source copies.

Evidence:

- [Complete raw stream](bench-depth-2/baseline-1/turns/01/stream.jsonl),
  [process record](bench-depth-2/baseline-1/turns/01/process.json) and
  [result](bench-depth-2/baseline-1/turns/01/result.json).
- [Verification and full command index](actor-audit-verification.json),
  produced by [the retained verifier](verify-actor-audit.mjs). It records
  every completed command verbatim, its event ID and raw line, output byte
  length and output hash. The raw stream retains complete output bytes.
- [Archive manifest](actor-checks/manifest.json) and
  [no-model archival script](archive-actor-checks.mjs).
- [Prelaunch material audit](../stage-3-comparison-1/prelaunch-audit.md),
  [prospective audit checklist](../stage-3-comparison-1/audit-plan.md).

The stream hash is
`80e8bba144092ac653bb10b4dc2ade0f6573880132f3ec0e76c023d7ab2e013c`;
the result hash is
`4a17ae79418f4d40a1055635921bd201dfa4defafb220a79a394a4d7da129107`.
All 124 frozen inputs still verify with digest
`40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`.

## Settled lifecycle, not inferred success

Root confirmed runner session `72922` settled with exit 0 before this final
audit. The actor's saved process also has exit 0, no timeout, interruption,
spawn error or log error. Result `complete` is true, duration 645,672 ms,
with no capture error. `item_55`, raw line 106, is the final reply;
`turn.completed`, line 107, is terminal. The stream contains 107 event lines,
48 completed commands and eight agent messages. Started commands have
matching completed events. All 443 recorded artifact hashes and the exact
saved artifact set verify, including both source snapshots.

Reported usage is 2,964,531 input tokens, 2,824,064 cached input tokens,
19,515 output tokens and 4,895 reasoning-output tokens. Cache-write tokens
are zero. No dollar cost or hard in-flight token cap is inferred.

The actor initially hit a registry denial (`item_7`, line 17), a faces-file
parenthesis error in typecheck/lint/build (`item_14`, line 33; `item_16`, line
34; `item_17`, line 36), and two supplemental-script errors (`item_29`, line
56; `item_31`, line 61). These were not omitted or converted into passes.
Offline dependency installation succeeded in `item_11`, line 24; the syntax
repair and typecheck succeeded in `item_18`, line 39. Unit tests report
129/129 in `item_13`, line 31. The two complete actor-owned seven-case
production matrices finish in `item_21`, line 66, and `item_39`, line 98.
The final supplemental run succeeds in `item_43`, line 85. These results are
actor-owned diagnostics, not independent acceptance.

## Skill, supplied material and ambient access

`item_2`, line 7, prints the complete 4,087-byte supplied
`.agents/skills/storyfolio/SKILL.md`. Its output was compared byte-for-byte
to the actual before-turn copy. `item_3`, line 9, fully reads the supplied
handover. `item_4`, line 11, fully reads the starter README plus
`docs/story/{facts,confirmations,storyboard,assets,evaluation-environment}.md`;
the concatenated output also matches exactly. Local content/engine reads
follow in `item_5`, line 13, and `item_6`, line 15. No saved command reads a
routed skill reference. The top-level skill read is established, not a claim
that every reference was consulted.

The environment file explicitly names Storyfolio as the only enabled skill,
disables other discovered global skills/plugins, excludes optional-skill
installation and external assets, and supplies the neutral screenshot
utility. The actor read these facts before implementation. The fixed opening
request already refuses optional installations and starts after fictional
storyboard approval. A lack of a new optional-skill recommendation or
before-stop-1 inventory cannot establish a natural-entry timing failure in
this invocation. Conversely, coordinator setup is not actor preflight:
`item_10`, line 22, reads `docs/story/environment-setup.json`, which explicitly
says `actorPreflight: false`. Later installation, build and browser checks
are the actor's own observations. No disabled skill/plugin was invoked in
the saved stream. The initial ordinary dependency registry attempt is not
evidence of an optional-skill install or external-asset fetch.

Access caveats and exact observations:

- `item_10`, line 22, lists `/tmp` and
  `/var/tmp/storyfolio-comparison-runtime-20261012`. It exposes ambient
  filenames such as `/tmp/build-spine.py` and sibling
  `storyfolio-sheet-test-nhL9TE`, `storyfolio-sheet-cli-w4whC2` and
  `storyfolio-sheet-failure-JWI3uv`. No command reads their contents. This
  prevents an absolute no-ambient-exposure claim but does not establish a
  copied helper or design.
- `item_30`, line 58, inspects process names with
  `ps -ef | rg 'next|shoot|check.mjs'`. Its output includes the current
  sandbox's permission configuration, with root read access. The configured
  boundary is therefore not a read jail. It does not print a held-out visual
  implementation.
- `item_22`, line 44, tries `.git/config` and `.git/HEAD`. Both are absent in
  the placeholder. This is not an observed credential or repository-content
  read. Later `item_40`, line 78, creates local `.prototype-git`; `item_53`,
  line 103, commits the actor's own source and evidence as `0f66c67`.
  `item_54`, line 105, prints that commit. No push or remote publication
  command appears. This is actor-local history, not a repository commit.
- The prelaunch audit separately records the generated
  `checks/setup-capability/probe.json` error-stack path to
  `/home/kshitij/projects/storyfolio/evals/runs/codex-bench-depth-baseline-2/inputs/implementation/evals/probe-build-environment.mjs:43:22`.
  The generated raw probe was not sanitized or removed. No saved actor
  command reads it. A path in a generated setup error is not held-out solution
  contents, and its presence is not denied by this audit.

The supplied `scripts/review-sheets.mjs` is read locally in `item_22`, line
44, and `item_23`, line 46, then invoked only against current actor captures
in `item_32`, line 63; `item_35`, line 70; and `item_36`, line 71. Its frozen,
before and final hash is unchanged:
`083a43dcefef6c6dec5aa20c9b3748671346898bf6122b9a9503ddfd130dcb51`.
Its supplied provenance replaces the undeclared cross-run helper dependency
found in the earlier baseline. No equivalent cross-run helper read was
observed here.

## Final source equality and capture provenance

The actual before-turn snapshot contains 175 files and the final snapshot
260. Against that actual before snapshot, 85 files were added, 16 modified,
none deleted. The runner's `snapshot.changes` instead compares against its
174-file setup snapshot and labels `docs/story/environment-setup.json` added.
That record was coordinator-supplied before the actor and is unchanged;
it is not an actor-authored addition.

All `.agents/` skill files, `components/`, `lib/`, `package.json`,
`package-lock.json`, supplied SVGs and factual confirmations retain their
before-turn bytes. Runtime customization is confined to content, page and
global CSS; an actor-written `scripts/prototype-review.mjs` is separate from
the supplied checking code. Of the 85 additions, 81 are under
`docs/story/review/`: 80 copied evidence files and their provenance record.
The other four are apparatus code, concepts, decisions and the supplemental
script. All 80 provenance pairs were independently hash-checked against
their archived ignored originals and saved source copies.

The frozen `captureSource` and `inspectWorkspace` helpers both reproduce the
complete final source. Inventory digest:
`0fb5e82558d01bda9cf828bb073087138333219b0019d64566747cc08d6ff025`.
The frozen bounded whole-tree predicate accepts `.prototype-git` as bare
Git metadata; no custom hardcoded directory-name waiver was added.
`node_modules`, `.next`, `checks`, generated Next declarations/build info
and Git metadata stay under the pre-frozen exclusions. The two unexpected
roots `.aws` and `.codex` are non-symlink directories with exactly zero
entries, verified using only `lstat` and directory names. No credential
contents were opened. They produce warnings, not differing source files.

The archive contains 168 files, 17,446,188 bytes, across the seven explicitly
referenced trees in its manifest. The script first inventories, rejects
symlinks and unsupported entries, binds the settled stream/result hashes,
then uses exclusive creation and rechecks copied hashes. It excludes the
separately retained coordinator setup tree and unrelated generated source.
The earlier failed build and both successful matrices remain separate even
where bytes repeat. `prototype-review` was overwritten by the actor's own
rerun; only its latest remaining bytes can be archived. `review-extra`
retains a contact sheet of earlier supplementary images, not recoverable
earlier originals. This limitation is preserved in the manifest.

## Factual and evidence limits

The final `content/copy.ts` and `content/faces.ts` retain the distinction
between measured current plus an assumed interval supporting a two-year
projection, and an observed 72-hour bench run. Copy explicitly denies that
the shorter run validates two years. It attributes firmware, scheduling and
fixture work to Ada, PCB and analogue-front-end work to a colleague, states
40 assembled/six bench-tested/none to customers, and distinguishes one
preliminary emissions check from unfinished qualification. The apparatus,
three-state loop, labels and diagrams are visibly qualified in the source
copy as illustrative, with no invented currents, interval, capacity,
debugging incident, measurement trace or whole-product ownership asserted.
This source review found no new factual violation. It does not establish
that every rendered placement communicates those distinctions adequately.

The actor handover claims all 56 final matrix and six supplemental original
images were opened. The saved CLI stream contains command and message
events, but no image-open telemetry. Contact-sheet generation and file
inventory alone do not prove individual visual inspection; absent image
events also do not prove inspection was impossible. Treat this as an
unverified actor claim, not a demonstrated fabrication or independent image
review. The actor records short-height masthead/navigation and evidence-rail
overlaps, plus fallback header crowding, rather than claiming final polish.

The actor's supplemental script uses a real initial Tab for the skip link,
but `.focus()` followed by Enter for a rail link. Its rail result therefore
does not prove sequential keyboard reachability. Its skip assertion checks
focus/top position and URL fragment, not the stronger independent
visible-target response contract. It is preserved as actor evidence, not
substituted for coordinator controls acceptance.

No original-image acceptance or judge outcome is supplied by this audit.
Independent seven-mode capture, source-before/source-after equality,
control evidence, original-pixel review and any bounded text judgement must
be evaluated separately. No author approval, real-phone result, publication,
natural early-gate coverage or Stage 3 completion follows from this actor's
successful exit.

## Reproduction

The following local commands made no model or browser calls and exited 0:

```sh
node evals/runs/codex-bench-depth-baseline-2/archive-actor-checks.mjs --inventory
node evals/runs/codex-bench-depth-baseline-2/archive-actor-checks.mjs
node evals/runs/codex-bench-depth-baseline-2/verify-actor-audit.mjs --save
```

The archive creation and verification-output creation intentionally refuse
existing destinations. To recheck without changing evidence, omit `--save`
from the verifier. That recheck requires the original actor workspace to
remain present and source-identical; the committed saved snapshots and
archive remain durable evidence if the runtime is later retired.
