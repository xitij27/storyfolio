# Post-turn public-source discovery

Reviewer: `acceptance`. This is source/conversation evidence only. No new
browser, build, tests or paid call was launched. No workspace bytes, frozen
policy or implementation were edited.

## Integrity blocker

The frozen `captureSource` returns 198 files, digest
`92a06e202ec4267481e2a353ccbc85a92f316dec3f85fbf6bc467141a0ae33c9`.
The actor's final snapshot retains 180 files. Every retained file agrees
exactly with both its saved bytes and current workspace hash/size, with no
missing or changed retained source. However, 18 additional `.git-local`
metadata files are included by the frozen capture policy and absent from the
saved snapshot. Exact file-set equality fails. `.aws` and `.codex` are also
listed as unexpected directories by the actor snapshot, but contribute no
files to this captured inventory.

The actor result hash is
`d758c277d2af1700d5a3c62913501917bee457f4df9da3b13d32266f9de6a291`.
It records `complete:false`, `timedOut:true`, and 900071 ms. The complete
132-file frozen input set verifies. The repeatable read-only
[inventory script](source-discovery.mjs) and its
[saved result](source-discovery.json) retain exact file paths, hashes,
source/reply bindings and the mismatch. The script's successful execution
means inventory was obtained, not that its `strictSourceIdentity:false`
result passed acceptance.

The frozen launcher cannot pass its pre-browser source gate. No exclusion
was broadened, metadata removed, snapshot rewritten or alternate workspace
substituted. Root was informed immediately; [observed targets](observed-targets.json)
are retained as discovery, not launch authorization. The source is authored
application output and is not eligible for the protocol's no-implementation
skip. This integrity block is a different reason for no measurement.

## Exhaustive public looks and observed controls

`content/looks.ts` defines exactly Warm (`light`) and Night (`dark`), both
included in the runtime bundle. The default is Warm. `/` and `/?look=light`
refer to the same Warm look; `/?look=dark` selects Night. The existing
`Appearance` group renders one ordinary button for each declaration, with
`aria-pressed` and source labels Warm/Night. Query handling removes the
default look parameter and otherwise records the selected ID. Each observed
switch trial is defined from the other actual look's route, so no preparatory
selector is needed. All two choices are retained without visual filtering.

The application has only the main route and the inherited `/sketch/[id]`
route. The sketch registry is empty, so it provides no additional look.
The actor's textual third option, delegation of appearance, is not an
implemented third alternative. Stock SVG files are assets, not portfolio
look routes. The source defines no extra object controls or links: knobs are
decorative geometry, `content/links.ts` is empty, and the bundle has no
control configuration. Other public navigation comprises the inherited
skip anchor, five chapter rail anchors and the ending return anchor; these
are explicitly listed outside the narrow look-switch measurement scope.

The two definitions alter ground, ink, accent, surface, roughness and light
values. This establishes source variation only. Material visual difference,
readability and real pointer/keyboard operation remain unobserved without
independent original-pixel capture. Labels and tokens do not pass the gate.

## Meaning-to-beat mapping and handover

The existing engine emits the actor's actual `[data-beat]` values. Opening
`question.inspect` asks how to check a decision made in code. Middle
`bench.connect` connects command, board, fixture and observation, preserving
the split between Ada's work and the colleague's circuitry. Ending
`scope.answer` resolves that relationship while retaining sample, customer,
emissions and qualification boundaries.

The actor implemented all five approved meanings and did not nominate a
single stop-4 middle. Bench is selected for this source-only observation
because it directly links the question to the ending, and was one of the
three prospectively allowed middles. `scheduling.loop` and `evidence.paths`
are explicitly recorded as implemented but unsampled, not omitted as weak
pixels. No image review or quality ranking determined the selection.

All completed agent messages and the source handover/decision records were
read. The actor asked an early text-only appearance question (`item_3`) and
then proceeded with Warm (`item_12`) without an answer. The source handover
states that this is provisional, not claimed visual approval. The actor
continued across all five chapters and attempted full checks. Its final
completed commentary (`item_52`) acknowledges that overlapping rebuilds
invalidated earlier checks and announces a new sequential check. Those
actor-local claims are not independent acceptance results.

There is no completed final reply or final runnable-look choice handoff.
The saved `reply.md` contains completed commentary gathered before timeout,
not a successful terminal delivery. Ordinary entry into implementation is
observed; a finished real-look gate and honest complete handoff are not
established. This source-only result cannot certify visual quality or Stage 3.
