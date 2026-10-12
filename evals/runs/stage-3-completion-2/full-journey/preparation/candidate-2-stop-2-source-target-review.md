# Candidate 2, stop-2 source targets and binding blocker

Read-only source review after normal turn-2 closure on 12 October 2026.
No browser, install, build, tests, model, cleanup or source change was
performed. No independent visual pass or next-turn gate is issued.

The [draft targets](candidate-2-stop-2-targets-draft.json) retain three
actual advertised concepts: `/sketch/fixture`, `/sketch/states` and
`/sketch/lead`. The actual registry and parameterized route expose those
three keys. Each authored bundle has `opening.object`, `middle.observe`
and `close.answer`; shared IDs across separate routes are intentional.
The fixture, selector and lead use distinct source-defined geometry and
formations, with explicit teaching/illustration limits. Source differences
do not by themselves prove visual distinctness or explanatory success.

The terminal handoff and saved concepts document recommend A, the fixture,
and genuinely ask for a choice. No selection has been supplied. The root
index has three fully named chooser links. Every sketch also has a shared
concept-navigation bar with different shorter labels. The provisional
appearance group exposes Light and Dark; Dark is default, Light uses
`?look=light`, and explicit `?look=dark` aliases the default. Selecting Dark
removes its query parameter. These are not additional concepts or an
approved later look decision.

The draft therefore retains 12 observations: three advertised primary
concepts using the index chooser, three concept-nav aliases and six
provisional appearance aliases. Only the primary three count toward the
concept requirement. Each alias has its actual source control and a
different valid starting route/state, not a forced state or idempotent
passing click. The index, return links, chapter links, email links and
diagnostic `?fps` behavior are separately inventoried. Return/navigation
discovery is not a claim of independent control testing. The shared nav
trials do not pretend to cover every ordered concept-to-concept pair.
Root permitted these observations only within the unchanged single
15-minute concept bound; no capture has launched.

## Actual source-policy blocker

The official [turn-2 snapshot](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/02/snapshot/manifest.json)
contains 98 files and no `site/` application file. It lists `site` as an
unexpected directory alongside `.aws` and `.codex`. The source is not
missing from disk: the actor chose a permitted nested scaffold destination,
but the frozen runner's default snapshot root allowlist omitted it.

Root's separate [post-closure recovery](candidate-2-stop-2-recovery/recovery.json)
retains 182 source files, including all 98 official files plus 84 `site/`
application files, and reports unchanged source during copying. Its digest
is `70a581fce400ea0edb47d5b95bf5a290614d1b5edbcf121952dd04357a733a10`.
This reviewer directly checked all 15 cited application-source hashes
against that archive; they match the source bytes read after closure.
The recovery is not the official actor snapshot and does not retroactively
establish full source identity at the exact actor-closure instant.

There are three distinct blockers under the unchanged code:

1. Frozen measurement `loadBinding` matches discovery source hashes against
   the official snapshot and permits only positively identified metadata
   extras. These 84 application files cannot be called metadata or silently
   added to the old result.
2. Frozen measurement reconstruction/install/build assumes an application
   at the whole workspace root. The actual package is `site/package.json`.
   A child-cwd adapter alone cannot fix the first blocker.
3. Frozen runner `verifyJourneySource` compares the complete current
   generated-excluded `fileTree` against the previous official snapshot
   before a later turn. The 182-file source cannot equal the 98-file
   snapshot. The existing run is not resumable under that guard, even if a
   separate browser measurement later succeeds.

The relevant `evals/lib/build.mjs` current and frozen bytes both hash to
`d78cce4c3914127da41154e7368f689ed1828cd0efa4a6b0959d6890d5edc731`.
`DEFAULT_SNAPSHOT` supplies the root allowlist; `verifyJourneySource`
enforces exact equality and is called before `executeBuildTurn` launches
the actor. No code or historical record was altered for this diagnosis.

The prior [minimal adapter proposal](candidate-2-stop-2-measurement-preparation.md)
is consequently insufficient on its own. Any later recovery-binding or
runner change needs an explicit separate disposition, preserving the old
snapshot, result, freeze and failures. Do not assert that a measurement-only
adapter restores original conversation eligibility or implies authority
for another paid attempt. No final targets or adapter are approved here.

The draft deliberately leaves its executable `sourceDigest` null while
recording the real recovery digest, manifest hashes and source paths in its
draft provenance. It is not a passing frozen target record. The actor's
positive concept work and normal completion remain evidence; these
coordinator source-policy limitations are not a no-output or skill failure.

## Identity references

- Actor result: `59067a559ac604d2e70ddafedbc7b592dc63d7ba30d4b97085e246511b9ff3a2`.
- Raw stream: `2b5088a083b56a50fe9035f93dca6377dc2893149ead478e5c933bbc90f76c91`.
- Official snapshot manifest: `698882bf52f40113cde24fdde5767811131eb452a258db671263aa11f7d61c67`.
- Recovery record: `96933e373121316876d9b07370a0887d5c715828f8a65bec95821cba41824049`.
- Recovery source manifest: `db72f877d970f41891ac60074d5ecedbe93e8388a54aeb42382d233d29cf9c24`.

The draft carries exact path/hash bindings for the route registry, page,
chooser, concept bundles, look implementation, package/lock, navigation,
styling and saved story records. Full-source recovery auditing and actor
runtime/image-claim review remain separate owned audits.
