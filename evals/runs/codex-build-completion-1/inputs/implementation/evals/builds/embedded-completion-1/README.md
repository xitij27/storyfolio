# Embedded completion fixture

This is the approved continuation case for stops 5 and 6, beginning from the
first build actor's saved three-beat spine. The new case is
`embedded-completion-1`; it is not a second baseline from an empty starter
and does not measure a skill change.

The author approved continuation after the first probe's cost review. The
[completion protocol](../../../docs/superpowers/plans/2026-10-11-build-completion-proposal.md)
holds the exact allowance and current approval status. Current repository
handover and history hold the author's wording. This fixture supplies no
simulated physical-phone approval or permission to publish.

## Starting source

[Source manifest](source-manifest.json) identifies every included and
excluded file by path, size and SHA-256. It binds the original
[turn-1 snapshot manifest](../../runs/codex-build-1/embedded-1/baseline-1/turns/01/snapshot/manifest.json)
and the source run. The 97 actor-workspace files total 503,374 bytes. Every
included byte comes from that immutable saved snapshot, not a later local
working directory. No implementation or inherited prose has been repaired.

The explicit allowlist in [case.json](case.json) includes site source,
tests, local browser scripts, project configuration, lockfile, instructions,
fictional material, all saved public assets and story documentation. Unused
plain-story assets and code are preserved. The source still implements only
Scope, Transition and Review with the first actor's face-aspect and static
loading adaptations.

The inherited handover, review and compact check-results retain their
original wording, including inaccurate or overbroad statements. They are
historical actor context, not new coordinator assertions. Their references
to old generated check directories and temporary environment paths are
not evidence that those files exist in the new workspace. The actor must
assess and update its actual site; fixture preparation does not repair it.

## Exclusions and fresh preparation

- The 86 files under `.agents/` are excluded as an installed skill copy.
  The runner separately supplies the explicitly frozen, unchanged skill.
- `next-env.d.ts` is a generated declaration and is excluded.
- `docs/story/environment-setup.json` describes the earlier coordinator
  environment and temporary paths. It is excluded; the coordinator provides
  a fresh setup record before the new actor starts.
- Installed dependencies, generated `.next/`, `checks/`, TypeScript build
  metadata and Git internals were not present in the snapshot's `files/`
  tree. Their historical omission and unexpected-directory metadata are
  copied into the source manifest, not into the new workspace.

Preparation must use `setupMode: "existing-site"` and preserve these supplied
bytes without running the starter scaffold over them. Dependencies, browser
capability, environment, generated output and Git state require new setup
evidence. No dependency installation or paid run is performed by this
fixture's verification script.

## Contract and bounded conversation

The [complete expectations](expectations.json) copy the original
[seven-beat contract](../embedded-1/expectations.json) with exactly one literal
replacement: its root `id` changes from `embedded-1` to
`embedded-completion-1`. The checker writes this ID into its result, and the
judge requires that result identity to match the current case. Every other
byte is preserved, including the seven beats, six chapters, factual
sentences, assets, links and static fallback modes. The source manifest
records both hashes and this identity-only derivation. The original
[fictional derivative record](../embedded-1/README.md)
continues to explain asset provenance and approved scope exceptions.

Use the existing [build rubric](../../prompts/build-criteria.md). The fixed
[first continuation prompt](../../prompts/build-completion-turn1.md) selects
Bench paper, authorizes continuing the current planning-only skill into
building, asks for the four remaining beats and stops for copy choice. The
[finish prompt](../../prompts/build-turn3.md) is available only after that
actual gate. `requestedStops` is `[5, 6]`; `refusalTurns` is `[1, 2]` because
both fixed replies decline optional skill installation.

The bounds are at most two actor turns, fifteen minutes per turn and
twenty-five actor minutes cumulatively. The before-next-turn thresholds
are 12,000,000 reported input-plus-output tokens and 350,000 uncached
input-plus-output tokens. These are not hard limits on an in-flight turn.
The separately bounded single judge and no-retry policy remain in the
protocol. This case does not add permission for other studies.

## Verification

Run `node evals/builds/embedded-completion-1/verify-fixture.mjs` from the
repository. It verifies the source manifest, complete include/exclude
partition, copied bytes, exact actor allowlist and unchanged expectations.
It neither changes files nor invokes a model. Preparation results belong in
`evals/builds/completion-preparation-1/`; a paid conversation, if launched
after all gates pass, belongs in its own new cohort under `evals/runs/`.
