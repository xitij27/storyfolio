# A concrete physics example before more creative instructions

On 10 October 2026 the author accepted the recommendations in the handover:
"yes, I like your recommendations. Let us implement them". One recommendation
was to supply an actual permitted work example before changing the creative
guidance. The saved physics plan could only rearrange document roles because
its material did not contain the procedure those documents described.

Evidence: `evals/runs/codex-creative-review-1/findings.md` and
`evals/runs/codex-stem-1/physicist/with-1/`. Those are preserved historical
results. The new case is a fictional input experiment, not the recovery of
a real research artifact or a correction to the old fixture.

## Fixed inputs

Create `evals/people/physicist-evidence/` as a separate case for the same
fictional Iris Voss. Copy her CV and research notes byte for byte. Keep the
four original traps, her career history, publication status, permissions and
ownership boundaries. Add a shareable text schematic and protocol extract
with one decision she can explain. Extend the new truth sheet to confirm it.
Leave `evals/people/physicist/` unchanged.

The added account is deliberately constructed fixture truth:

- Three timing paths are compared with a common laboratory reference.
  Earlier calibration records supply a different fixed correction for each
  path. A later, held-back check is summarised before and after applying them.
- The signed residuals and corrections are chosen to give a mean absolute
  residual of 2.0 ns before and 0.2 ns after correction. That supports the
  existing tenfold reference-calibration claim, not sensitivity or discovery.
- Iris chose, implemented and checked the correction procedure. A lab
  engineer supplied the reference distribution hardware. Iris did not design
  the whole detector or lead the science analysis.
- The schematic is a logical timing diagram, not detector geometry or a
  drawing of cable lengths. Its values are rounded summaries. Raw records,
  uncertainty estimates, transfer to scientific data, exact hardware and
  causes of the offsets are not supplied.
- The fictional lab permits this extract and schematic with the stated
  credit. Permission does not extend to restricted consortium data or
  unpublished internal plots. No real person, institution, product or
  experimental result is represented.

The case gives evidence, not a suggested site concept. It must not name the
preferred object, prescribe the story question, ban document surfaces or
reward material variety. Keep `exampleConcept` null. Freeze this case for any
later skill comparison so that input improvements are not mistaken for an
instruction effect.

## Evaluation question

Can the current creative guidance turn a concrete calibration decision into
meaningfully different concepts, with a spatial relationship that explains
the work? Inspect what a visitor compares or learns, not just object names
or whether equivalent accessible HTML exists. Keep factual restraint and
credit boundaries visible beside the creative result.

The original physics run remains useful qualitative context, but it is not
a matched baseline for this new evidence. Any concurrent opening or closing
skill clarification is another difference and must be recorded. Do not claim
a causal improvement from one unmatched run, or pool it into the old STEM
cohort. A later creative instruction would need a saved failure on this fixed
fixture first.

## Execution

1. Review the arithmetic, cross-file facts, schematic and permissions. Run
   `node evals/check-people.mjs`, `node evals/check-skill.mjs`, `npm test` and
   `git diff --check`, then commit inputs before a model conversation.
2. Coordinate two explicitly selected `physicist-evidence` skill conversations
   with the parent implementation batch, using the existing Codex harness
   and model roles. Do not start a separate paid batch while those inputs
   are being finalised. Record the skill and fixture hashes with its run.
3. Review the resulting concepts and judgement without replacing any old
   score. Record what the evidence enabled and what remains unestablished.
   The author's assessment of which concept is worth building remains open.

The harness discovers case folders automatically; no runner change is needed.
An unfiltered runner now selects seventeen cases for twelve fictional people.
Use an explicit `--people` list for every historical cohort.

## Input review and checks

The new case is ready for the coordinated evaluation. Its first two material
files are byte-identical to the original CV and research notes; Git reports
no changes under `evals/people/physicist/`. The new `person.json` retains the
same four traps and has no prescribed concept or private file.

A local arithmetic check parsed the three rows from the supplied extract and
confirmed `before - correction = after` for every path, then the 2.0 ns and
0.2 ns mean absolute values and their ratio of ten. The metric is explicitly
over path means, not over individual pulse residuals. The diagram does not
claim a physical cause, geometry or an uncertainty estimate.

`node evals/check-people.mjs` passed all seventeen cases;
`node evals/check-skill.mjs` passed (687 main words, four references);
`npm test` passed all four test-file subtests; `git diff --check` passed.
These checks validate the new input and existing local harness, not a
creative outcome. No paid conversation or judgement was started as part of
preparing this fixture. The parent implementation coordinates committing
these inputs, selecting the actual skill revision and recording results.
