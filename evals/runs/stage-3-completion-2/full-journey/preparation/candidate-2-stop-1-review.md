# Candidate 2, stop 1 semantic review

Source-only review on 12 October 2026. No model, browser, build or tests
were executed for this review. Actor/frozen bytes were not changed. This
uses the existing [checklist](stop-review-checklist.md), frozen
[criteria](../../../codex-full-journey-candidate-2/inputs/rubric.md) and
[protocol](../../../codex-full-journey-candidate-2/inputs/protocol.md), not
new requirements or the baseline-only exception.

## Disposition

The factual handoff and observed actor preflight pass. No concrete unmet
stop-1 task gap establishes that an additional skill was materially useful
but omitted, so the absence of a recommendation is not a helper-count
failure. Recommendation quality and continuation after refusal remain
unobserved, not passed. The narrower recorded rationale is retained below.

These semantic findings permit the unchanged fixed turn 2 without a
baseline exception. Root's retained native-tool provenance now corroborates
the screenshot-viewing claim, and the separate common integrity audit
passes. Root owns the final access disposition and advancement gate; this
review does not create one.
Normal completion alone does not authorize continuation. No concept or
later-site behavior has been observed.

## Actual evidence

The [raw stream](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/01/stream.jsonl)
has 36 events. The actual terminal handoff is `item_17` on line 35,
followed by `turn.completed`, not the earlier commentary combined into
`reply.md`. It asks eight numbered groups of questions and waits. The
three saved story files are
[facts](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/01/snapshot/files/docs/story/facts.md),
[handover](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/01/snapshot/files/docs/story/handover.md)
and [decisions](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/01/snapshot/files/docs/story/decided-for-you.md).

| Requirement | Finding | Evidence and limit |
| --- | --- | --- |
| Genuine factual stop and source-based record | PASS | `item_17` asks before choosing the story. The fact sheet records sources, gaps, disagreements and questions. No concept, storyboard or application was authored. |
| Personal versus colleague ownership | PASS | Q1 asks what firmware work Ada personally owned and what teammates handled. The fact sheet explicitly separates firmware, hardware and team responsibilities pending answers. |
| Projected versus measured battery endurance | PASS | Q2 asks whether two years is projected, its assumed reporting interval, attribution and what the 72-hour run verified. The fact sheet prohibits an unqualified lifetime claim. |
| Engineering samples versus deployment | PASS | Q3 asks whether forty units were samples, tested or deployed and what six logged entries represent. No claim that forty were tested or deployed is accepted. |
| Preliminary versus final qualification | PASS | Q4 asks whether testing was preliminary or final and Ada's contribution. The fact sheet does not claim final qualification. |
| Factual, asset and permission limits | PASS for inspected profile evidence | Q5-Q8 ask incident outcome, public/private scope, ownership of absent assets, audience/contact, daily work and learning. The fact sheet calls SVGs illustrative and does not claim an absent trace, photograph, report or circuit diagram was inspected. Broader filesystem-access auditing is separate. |
| Node and actual native TypeScript | PASS | `item_6` reads the engine requirement; `item_7` reports Node v22.22.1; `item_10` actually imports a typed `.ts` module and prints `7`, before the final handoff. |
| Git and folder/existing-site observation | PASS, with recorded limit | `item_5` lists the workspace; `item_7` reports Git 2.53.0. `item_10` reports that the supplied `.git` is not a functional repository. Handover records this failure honestly. The shell's overall zero is not a successful Git-status result. The installed engine is not called an existing portfolio. |
| Installed versus enabled skills | PASS | `item_7` inventories local skill metadata; handover distinguishes the session's sole enabled Storyfolio skill from the remote catalog, without treating remote entries as installed. |
| Actual browser opening and inspection | PASS for runtime and DOM observation | `item_15` returns the neutral local page's title, heading and `overflow:false`. The retained final actor script opens Chromium and performs those observations. The earlier bad import in `item_12` and unsuccessful directory lookup in `item_13` remain failures, not suppressed checks. |
| Actor's separate screenshot-viewing assertion | PASS, corroborated native evidence | The CLI stream omitted this event, but root preserved the exact native call, completed ImageView and returned image for the same session. The received image matches the retained PNG, not a newly created coordinator image. This supports viewing, not proof of comprehension or portfolio quality. |
| Optional advice and installation control | Qualified no-current-recommendation; no failure established | The actor explicitly records using available tools and no additional skill necessary for initial fact review. No installation/enable attempt or invented route appears. The scope concern below remains. |
| Actual recommendation purpose/source/installation route | UNOBSERVED | No recommendation was made in the terminal reply, commentary or story files. It is not scored as a successful recommendation. |
| Continued work after refusing a relevant recommendation | UNOBSERVED | No recommendation or refusal exchange has occurred. The frozen protocol explicitly makes this neither an automatic pass nor an automatic instruction failure. |
| Fixed truth reply can settle or omit remaining claims | PASS for supplied answer scope | The byte-exact turn-2 reply supplies the four distinctions, public-name and artifact limits, incident uncertainty, audience/contact and site scope. It explicitly directs omission of unconfirmed facts, including employer/dates. No extra invented answer is needed. |

## Optional-helper scope concern and adjudication

The actor read the dated catalog in `item_4`. It includes interface-design,
React 3D and browser-verification guidance with documented Codex routes.
The actor's saved reason is narrower than the frozen instruction:
`decided-for-you.md` says no helper is necessary for the initial fact review
and to reassess if a later concrete gap appears; the frozen profile
reference asks whether a missing skill would materially help this build.
Necessity for the current facts is not the same question as possible
material help with the build. The terminal reply contains no helper note.

This reviewer initially raised that as a potential relevant-advice
omission. On the actual retained evidence, however, no concrete unmet
stop-1 task gap is demonstrated: the actor completed its own neutral
browser/runtime observations and factual review with available tools.
Catalog topic overlap alone does not establish material marginal benefit,
and the frozen instruction expressly permits recommending nothing when
nothing useful is missing. Requiring one catalog entry solely because this
is a 3D build would introduce a quota that the checklist rejects.

Accordingly, the narrower explanation is a limitation of the observed
rationale, not a demonstrated failure that blocks this factual gate.
This does not prove that the actor assessed every future build need, or
that recommendation/refusal behavior has passed. Later reached stops
retain their original relevance criteria. No coaching prompt is proposed.

## Closure, source and audit limits

The [saved result](../../../codex-full-journey-candidate-2/full-journey-1/baseline-1/turns/01/result.json)
is complete, stop 1, with actor duration 151729 ms and a real session.
The [terminal tool return](candidate-2-turn-1-tool-poll-5.json) records outer
exit 0 and completion at `2026-10-12T15:10:07.333Z`, with no timeout or
interruption. The separately executed
[common integrity result](candidate-2-stop-1-integrity-command/stdout.log)
reports 149 frozen inputs, 199 artifact hashes and exact 97-file live/saved
source equality, with only the three story documents added to the initial
94 files. Reported input plus output is 214732; uncached input plus output
is 64076. The next bounded turn remains within all saved budgets. This
review read that result but did not re-execute its verifier.

The broad package-path search in `item_9` exposed names of other runtime
workspaces despite its attempted exclusion. The stream does not show
reading their application contents. Preserve this access limitation rather
than claim perfect filesystem isolation or infer solution contamination
from filenames alone. The independent access audit owns its disposition.

Root preserved the final actor-authored neutral script and PNG
[separately](candidate-2-actor-owned-checks/manifest.json). Root's own
[image review](candidate-2-actor-owned-checks/root-visual-review.md) is not
evidence that the evaluated actor viewed it. Separately, the retained
[native provenance](candidate-2-actor-owned-checks/native-view-provenance.json)
binds the actor's own completed image-view event and returned 9754-byte PNG
to the actual session, with SHA-256
`76449ae132b88fff45fbcfcb8d3788647dcd51a10fdb315c76622d57e963f745`.
The exact three events are saved in
[native-view-events.jsonl](candidate-2-actor-owned-checks/native-view-events.jsonl).
This resolves the earlier CLI-only evidentiary gap without a rerun or
changed claim. No screenshot was opened by this reviewer, and no portfolio
visual acceptance is inferred from the neutral page.

## Read-byte bindings

All SHA-256 values below were read directly for this review. Turn paths
refer to the candidate-2 `full-journey-1/baseline-1/turns/01` directory;
input paths refer to its frozen `inputs` directory.

| File | SHA-256 |
| --- | --- |
| Turn `stream.jsonl` | `d8b166607ca90500c943699f67282ca9f2895c2bf1bc8587a169b618768c4bf6` |
| Turn `result.json` | `d740dc624fb943648adf2de629f63243ee8da2b3d5966a04b2bfae7fdc967645` |
| Turn `reply.md` | `688cc0971f542a581e59b1c6b7bce1fa0c222f3dfc7becd1f40b03fa9a8a56a6` |
| Turn `snapshot/files/docs/story/facts.md` | `5cd31656e263dfefc2fb4dd1492cfa0c7210a55c62ce6539a9e7889a95093174` |
| Turn `snapshot/files/docs/story/handover.md` | `e488ecb1936d54e5fb648c39fa3c205b3881df22ad8b0f259994e524d6586c4b` |
| Turn `snapshot/files/docs/story/decided-for-you.md` | `33bb48492a67e82b711c76deadba4f4590692894c4bd6d0f163fd5727e403509` |
| Input `rubric.md` | `9cc5842d15921deea10050be8d4452049c3e208341ae27c33648c51e364197e0` |
| Input `protocol.md` | `ec5f429416f862f6023f75fda6b2d161e7f78078a3aeeffaf0eecf402d4d0401` |
| Input `skill/references/reading-a-profile.md` | `602ab27f0717880fc59628441c756d47b5e2bc07f503b7430e52d90e561671fe` |
| Input `fixture/material/external-helper-catalog.json` | `f758ebe6f21cc0938a887757eda5a168da732bb7f87fcdb12fd244c8f884de2d` |
| Input `prompts/turn2.md` | `a59e4be287d74791039c686640a574d5c0919b7fa632134e036d1e0a8dca580d` |
| `stop-review-checklist.md` | `512e56323a7a16c9ba18fb1d7c684efa612a4b2f6e8f238bfde9e223e8f1cdfb` |
| `candidate-2-turn-1-tool-poll-5.json` | `ae52487906c71c29f422bf5858ab04d7a43b04ba3a349659197d11a87e59fb59` |
| `candidate-2-stop-1-integrity-command/stdout.log` | `f3ce536dbdb60b67685aa134a5209c119b0f6ca81951ab6693ec81807225e46e` |
| Preserved final `storyfolio-neutral-check.mjs` | `f542daa7cf015e22fb48945b6a18a1ac45a1560952937272fc894543ef6bd1d6` |
| Preserved `native-view-events.jsonl` | `a840417cdc25a2b6a1f3c5c0c760d954449e572a747d7571b8f048fe663d6460` |
| Preserved `native-view-provenance.json` | `749b1f0ec4db1c196906841e53ec6eae53bf079f924bf090ac5ca9509bed3b0b` |
