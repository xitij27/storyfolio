# Prospective concept correction, source-only scope review

12 October 2026. Draft/review only, pending the completed baseline audits
and root's implementation decision. No skill, engine, actor source or
frozen input changed; no test, browser, build or model ran. I reread the
full skill-creator instructions and applied their narrow-change guidance.

## Supported change

The [turn-2 stream](../../../codex-full-journey-baseline-2/full-journey-1/baseline-1/turns/02/stream.jsonl)
contains four command executions: read concept guidance, read story facts,
rewrite confirmed facts, and write concepts/decisions/handover. The actual
terminal message offers three written alternatives and a recommendation,
then asks for a choice. The [saved concepts](../../../codex-full-journey-baseline-2/full-journey-1/baseline-1/turns/02/snapshot/files/docs/story/concepts.md)
remain descriptions; the handover honestly says no application exists.
There is no runnable-route or desktop/phone inspection evidence in those
commands. This supports adding the missing sketch work, not additional
factuality, concept-count, recommendation or stopping instructions.

The current concept reference explicitly ends, `In this version a concept
is shown in words.` Remove that incompatible statement. The existing
engine supports `/sketch/<id>` through `content/sketches/index.ts`; the
registry starts empty and unknown keys return 404. Thus route names alone
would not implement the concepts. Each registry entry must be an authored
component with its own bundle and HTML, as the engine README explains.
No new engine API or geometry recipe is necessary.

## Suggested concept-reference text

Keep the three written concepts and their existing reasoning/tests. Add
this conditional work before handing over the concept choice:

> When a build is requested, make each written concept a runnable rough
> sketch of three beats: its opening, one meaningful middle and ending.
> Follow the sketch route in `engine/README.md` to author and register each
> concept. Open and inspect all three at desktop and phone widths. Give
> their actual local addresses alongside the written concepts and your
> recommendation, so the person can choose by scrolling. These are concept
> sketches, not the full site. A planning-only request keeps the concepts
> in writing.

In the actual reference, link the existing engine README with relative
target `../engine/README.md`. The text does not mandate particular actor
IDs, apparatus shapes, piece arrangements, screenshot names, viewport
pixels or a full finish matrix at this early stop. It adds no extra choice
gate: the existing concept-selection rule already worked.

## Compatibility findings

1. The main opening currently says `Build after storyboard approval when
   building is requested.` Qualify this as building the **chosen site**
   after approval, so it does not prohibit the rough concept sketches.
   This is a necessary routing clarification, not permission to build the
   complete portfolio before facts or design choices.
2. Keep the two main-table edits concise. Stop 1 can say `Facts to confirm,
   questions, and brief build-setup notes. No design`. Stop 2 can say
   `Three concepts and a recommendation; runnable sketches for a build`.
   Retain both existing advance conditions. These small replacements plus
   the opening qualification leave room beneath the 800-word main-file
   limit; the actual checker must establish the final count after editing.
3. Put the demonstrated build-only preflight/helper text in the existing
   `reading-a-profile.md`, not the main file or a new reference. It is
   already opened at stop 1. In that reference's handoff item 4, allow only
   a brief setup-limit or optional-tooling note alongside fact questions,
   still no concept, outline or look. Otherwise `Nothing else` conflicts
   with the intended recommendation.
4. Narrow the earlier [preflight draft](preflight-draft.md): replace its
   `At each stop of the build` trigger with `Before this first factual
   handoff`. Only that timing has an observed relevant-recommendation miss.
   Do not add a later universal renewal instruction on this evidence.
   Keep source-supported purpose/source/install-route advice, person-only
   installation, optionality and continued work after refusal. Do not
   force a recommendation when none would materially help.

## Regression and overreach checks

The proposed conditional preserves written planning-only concepts and the
first factual stop. Node/native-TypeScript/Git/browser checks are actual
build setup, not an excuse to select a story before answers. The source
packet is not permission to install helpers, and a declined helper is not
a blocker to concept work. No new rule is justified for the already sound
fact handling, permission restraint or actual stopping behavior.

Desktop/phone inspection and real routes establish a reviewable attempt,
not automatic material-distinction or visual-quality passes. Independent
source-bound browser/original review remains required. A real setup limit
must remain reported, not converted to an invented route or successful
choice. The finite actor bound stays unchanged; this draft neither grants
extra turns nor permits retries if three sketches cannot be completed.

Disposition: the narrow correction is supported, with the main opening
qualification and first-stop wording compatibility fixes above. No other
concrete source-level blocker found. Root should wait for the baseline's
final audits, preserve its failures and apply only the resulting supported
candidate before a fresh matched journey. The original planning regression
must then demonstrate that these build-only changes do not widen planning
requests. No implemented or behavioral success is claimed here.
