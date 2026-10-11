# Prospective source inventory alignment

12 October 2026. Local, no-model implementation under the
[post-baseline attribution plan](../../../docs/superpowers/plans/2026-10-11-post-baseline-attribution.md).
This study changes measurement code only. No actor turn, browser capture,
paid judgement, accepted prototype, shipped skill or engine is changed.
The original frozen cohort and its failed acceptance attachment stay intact.

## Observed failure and reproduction

The frozen actor snapshot contains 202 files. The frozen coordinator source
capture contains 390. Its existing generated-file filter removes the
actor's `next-env.d.ts`, leaving 201 compared actor files. All 201 match;
the remaining 189 capture paths belong to the actor-created bare
`.prototype-history` Git store. That is not whole-source equality.

Run `node evals/runs/source-inventory-1/reproduce.mjs` to perform a read-only
comparison using both old frozen implementations and the prospective ones.
The script requires the retained original external workspace and verifies
the old actor snapshot, all old capture records and frozen input digest
before comparing new scopes. It does not write to that workspace or start
its runtime. [The saved result](reproduction.json) records all 189 paths,
evidence hashes, implementation hashes and both inventories' counts.

The old actor and checker exactly reproduce their saved 202/390 inventories.
The new implementations both retain 201 files, with matching bytes and
hashes. These are exactly the unchanged 201 application/source files from
the old comparison. The script still asserts that the historical actor
comparison and historical capture differ. This is not a repaired old
acceptance result, a new judgement or visual approval.

## Shared boundary, narrow exclusions

[`source-scope.mjs`](../../lib/source-scope.mjs) supplies the common
`sourceEntryExcluded(root, path, entry)` predicate to actor workspace
inspection, fixture-tree traversal and coordinator capture. Static
generated-path exclusions now agree, including the Next-generated
`next-env.d.ts`. The existing default source/snapshot equality contract
remains strict; no extra-file wildcard or comparator tolerance is added.

A custom hidden Git store is excluded only at the workspace top level,
after validating regular-file `HEAD` and `config` markers, `core.bare`,
`objects` and `refs` directories and every descendant's recognized metadata
layout. Reference files must contain supported Git reference values.
Traversal is bounded to 10,000 entries, 32 levels and 64 KiB marker/reference
reads. It rejects symlinks, nonregular entries and unrecognized paths.
The rule does not depend on the observed `.prototype-history` name.

An ordinary similarly named directory, malformed Git store or store with
an extra runtime file is not exempted. Actor inspection retains the
unexpected-root warning and capture retains all regular files, so their
source inventories fail equality when the unknown root contains files.
Empty unknown directories still produce the actor warning but cannot add
file records to a source inventory. A symlink is not followed and capture
fails rather than silently dropping it. Git-shaped content nested inside
`public/` remains captured application source.

This is a conservative Git metadata layout recognizer, not a Git object
integrity validator or a filesystem read jail. Standard Git hooks and
objects are classified as metadata; their contents are not audited for
executable behavior. Existing static generated-directory exclusions remain
exclusions, not a claim that arbitrary runtime code placed there is safe.
Unrecognized layouts can cause a false rejection rather than lost evidence.

The new helper is in the prospective frozen implementation inventory.
Checker and judge identity checks must require it for new inputs. Existing
frozen cohorts have their old implementation and must not gain this file
or be relabelled under the new source scope.

## Local tests

Before the shared implementation,
`node --test evals/lib/source-scope.test.mjs` failed the generated-exclusion
and custom-Git-metadata cases: 20 passed, 2 failed. The complete
[before output](before-tests.log) is retained. Synthetic object/ref strings
were normalized to valid Git identifier lengths before testing the
recognizer; this does not change either old implementation's missing
exclusion behavior. The real frozen comparison above independently
reproduces the failure without synthetic fixtures.

After implementation,
`node --test evals/lib/source-scope.test.mjs evals/lib/build.test.mjs`
passes 45/45, including nested tests. [The after output](after-tests.log)
is retained. The new cases cover shared generated exclusions, two custom
Git directory names, ordinary lookalike directories, added runtime code,
unknown files across metadata subtrees, invalid/missing markers, symlinks
and nested Git-shaped public assets. These are local unit/reproduction
results, not browser acceptance or a behavioral skill score.

## Next actor inputs: explicit choice remains open

The [actor audit](../codex-bench-depth-baseline-1/actor-audit.md) records
`item_27`, stream line 54, reading an undeclared contact-sheet helper from
`/tmp`. The current runner sets `workspace-write`, disables network and
several tools, and disables discovered skills. Those settings did not
prevent this observed read; source inventory alignment does not address it.

Two prospective options remain, neither implemented by this study:

1. Supply a newly reviewed neutral contact-sheet utility in a fresh fixture,
   identically in every comparison arm. Review its exact source, dependencies,
   provenance and license; remove ambient absolute imports. It may assemble
   supplied screenshot paths but must contain no accepted-site output,
   geometry, copy, reference images or benchmark answers. Freeze it as actor
   input and start a newly labelled baseline. This regularizes that tooling
   input but does not establish isolation from other host files.
2. Establish an actual operating-system read boundary around the actor and
   its children, with only the per-run workspace, reviewed toolchain and
   explicitly allowed caches available. Use private temporary directories;
   do not expose host `/tmp`, the repository, other run trees or global skill
   roots. Before a paid run, save no-model denial tests for direct, symlink
   and subprocess reads of held-out canaries, alongside build, browser and
   loopback capability tests. A prompt prohibition or write-only sandbox
   cannot substitute for that proof. No working isolation configuration has
   been demonstrated by this study.

Either choice changes actor inputs/environment and therefore needs a new
baseline identity. The next fixture should also state the actual available
and disabled skill facts if their inventory is scored. This study does not
modify actor prompts, add skill prose, authorize an installation, or settle
the untested before-stop-1 workflow. The root coordinator retains the
choice and any later paid-run decision.

Subsequent coordinator disposition: the separate
[Stage 3 integration](../stage-3-integration-1/findings.md) implements option 1
in `bench-depth-2`, with neutral helper source review, actual-browser smoke,
explicit environment facts and a newly labelled prospective baseline.
It does not establish option 2's filesystem read boundary. No paid actor
or judge was invoked; that question remains separately unanswered.
