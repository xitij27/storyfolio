# Whole-beat wording comparison

Prospective coordinator-only protocol, 12 October 2026. No candidate has
been prepared or launched by this work. This study asks whether the new
wording instruction supplies three complete opening versions and three
complete closing versions, pauses for a choice, and preserves the selected
wording through the next fixed turn. No paid judge is needed: these are
direct text, source and sequence observations.

Use the unchanged `embedded-completion-1` fixture, existing-site setup and
its two unchanged actor prompts. Do not add these criteria, baseline answers,
expected gate shape or an example response to the actor's workspace, prompt,
neutral setup record or conversation. Audit actual coordinator-material
access; configuration isolation is not a filesystem read jail.

## Historical baseline, not a rewritten score

[baseline-evidence.json](baseline-evidence.json) retains exact O1/O2/C1/C2
strings, recommendations, source locations, result hashes, usage, 26 source
artifact hashes and all 97 fixture file hashes. It confirms 503,374 fixture
bytes, the case, both prompts, expectations and rubric still match the
historical frozen input byte for byte.

The baseline final presentation is
`evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/01/reply.md`,
lines 26-33. Its source `docs/story/copy-choices.md`, lines 14-38, contains
the same two short alternatives per placement and describes other sentences
that follow or precede them. Thus the product-design count and full-beat
requirements were not met. The actor did recommend, invite edits and stop
for the actual fixed reply. The subsequent choice was adopted.

The original rubric requested meaningful alternatives, not three complete
versions. Its score is not revised. The product requirement comes from
`docs/superpowers/specs/2026-10-10-portfolio-skill-design.md`, lines 138-140,
and was already identified in the original remaining-stages audit. This
prospective manual comparison uses that full requirement for both records.

This is a **fixture/prompt-matched comparison**, not a single-line causal
experiment. The coordinator protocol page has historical additions: current
6,218 bytes versus frozen 4,807 bytes. The equality collection initially
stopped on this mismatch; the qualified evidence record preserves it.
The supplied current skill also includes intervening instructions and the
later shared-controls change to `engine/components/story/story.tsx`.
The actual copied existing-site fixture is unchanged. Freeze and inventory
every candidate difference, including harness and capability differences,
before launching; do not claim only one skill line changed across these
historical cohorts.

## Manual criteria fixed before candidate output

For each criterion record pass, fail, or unobserved with exact paths,
line ranges or raw event IDs. Do not collapse incomplete execution into a
pass or automatically call an environmental failure an instruction defect.

| ID | Passing observation | Historical baseline |
|---|---|---|
| W1, count | Exactly three proposed wording versions for the opening and three for the closing. One recommendation is among each three, not a fourth version. Paired opening/closing sets are acceptable if each placement still has three complete versions. | Fail: O1/O2 and C1/C2 only. |
| W2, whole beat | Each version shows the complete reader-facing beat text: its heading/question where present, proposed wording, retained factual body, notes and relevant local labels/captions. The reader need not reconstruct it from a short replacement plus a reference to shared surrounding sentences. Global navigation and unrelated chapters need not be repeated. | Fail: short surrounding sentences only. |
| W3, real alternatives | Versions differ meaningfully in phrasing or emphasis within the approved facts, not only IDs, punctuation or a palette label. A recommendation and an invitation to supply personal wording are clear. No arbitrary style or word-count threshold is added. | Recommendation and custom edits present; two meaningful short variants observed, without satisfying W1/W2. |
| W4, fact/contract preservation | Every version preserves its applicable approved fixed wording and qualifiers. The candidate's whole site retains all seven beats, fixed headings, eleven core sentences and source-supported claims. No variant invents a result, role, measurement, customer, certification or actual firmware topology. Confirmed fixed sentences are not rewritten merely to make options differ. | Existing source reviews found the fixed contract preserved. No new whole-beat versions existed to assess. |
| W5, genuine decision gate | The completed first-turn handoff actually presents the options, identifies first recommendations for each placement, asks for the choice and stops before the finishing pass. Any provisional use is labelled, not represented as author approval. A future promise to write options, commentary-only question followed by more work, or claimed implicit consent is insufficient. | Pass under the original narrower copy gate. |
| W6, exact adoption | Only after the actual fixed second prompt, the selected first recommendations are recorded and used word for word in the final relevant source/render path. Retained fixed text remains intact, with no later editorial paraphrase of the selected version. Source comparison distinguishes markup/whitespace formatting from changed words or punctuation. | Selected O1/C1 adopted; `content/copy.ts` identical across turns. |
| W7, honest scope | The handover preserves actual decisions, errors, tests and limitations, and does not turn simulated choice into real-person phone approval or publishing authority. Source evidence, actor runtime claims and independent verification remain separate. | Original final delivery left physical-phone and actual final review pending. |

W1 and W2 are the targeted instruction comparison. W3-W7 protect the
existing choice/factuality behavior from a superficially compliant count.
Record the two placement results separately. A source document alone is
not enough if the completed handoff does not actually present or clearly
link the complete choices for the person. Conversely, the agent need not
repeat a fully linked choice document verbatim in the final message.

`reply.md` aggregates intermediate agent messages. Read the complete stream
and identify the terminal message before `turn.completed`, rather than
mistaking commentary for the handoff. The reviewed current
`finalCodexMessage` helper can extract a successful terminal message, but
its use must not rewrite raw history or manufacture a missing final.

## Advancement and stopping rule

Before considering turn 2, root independently reviews the turn-1 source,
artifact integrity, complete choices, lifecycle and budget. All W1-W5 must
be established; the frozen finish prompt must have unambiguous first
recommendations to select. Save an exact selection map and the complete
proposed beat text/hashes outside the actor workspace before advancement.
The map derives from this actor's real output. It must not impose O1/C1
labels or the historical wording on the candidate.

If first-turn choices are missing, incomplete, ambiguous, unsupported or
the process times out, record the failure and do not use the second turn
as corrective coaching. No extra prompt, retry, judge or continuation is
authorized by this protocol. If the successful gate and budgets permit,
the existing second prompt selects the first recommendations and requests
finishing; it does not simulate a final phone review. Turn 2 tests W6/W7,
not repair of a failed W1-W5 presentation.

The approved actor bounds remain the case's two turns, 900,000 ms per turn,
1,500,000 ms cumulatively, and the two between-turn usage thresholds.
[operations.md](operations.md) records exact guard fields and launch syntax.
Root must separately record the renewed authorization and candidate cohort.
Historical protocol text does not grant fresh calls. This narrow wording
comparison does not consume or imply a paid-judge allowance.

## Scope of a successful result

A positive result supports complete wording options, actual choice sequencing
and source adoption for this fictional supplied site. It does not repair the
old rejected sheet-site design, establish the non-sheet full-site target,
prove a fresh ordinary-entry gate, certify physical-phone behavior, or close
Stage 3. Any independent browser acceptance is separately authorized and
reported; none is necessary merely to count/read the complete text options.
