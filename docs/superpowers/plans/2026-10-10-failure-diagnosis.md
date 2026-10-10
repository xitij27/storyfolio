# Diagnose the current skill's failed evaluations

The author asked: "okay so can you test and see why some of the tests failed
with the skill? check documentation". Investigate `codex-sol-1`, the completed
current-skill comparison. This is a diagnosis, not a new skill revision.

1. Read the handover, evaluation instructions, skill, rubric and saved
   evidence for all eight failing skill runs. Check the local harness and
   fixtures. Distinguish failed checks from failed quality criteria.
2. Check whether the agents read the relevant instructions. Trace factual
   claims from material to fact sheet to final storyboard. Separate actual
   omissions from the judge's interpretation of a mixed reply.
3. Repeat only four judgements to probe the documented creative boundary:
   `analyst/with-1`, `analyst-overstate/with-2`, `nurse/with-2`, and the passing
   comparator `student-terse/with-2`. Use Astra medium and the unchanged
   rubric on identical inputs. Preserve original judgements. Save copied
   inputs, hashes and new judgements under `evals/runs/codex-sol-1-diagnosis/`.
   These are repeated judgements, not new portfolio conversations or a new
   estimate of the skill's pass rate.
4. Record which failures are well supported, which vary, and the smallest
   useful next experiments. Update the handover and correct documentation
   discrepancies found during this review. Do not change the skill or rubric
   on the strength of an ambiguous score.
5. Run required local checks, commit the evidence and documentation on main,
   and report the causes and limitations to the author.

No website build, full-batch repetition or additional skill installation is
needed to answer this question.

## Outcome

Completed the evidence review and all four repeat judgements. The original
40 scores recompute to 12/20 skill passes and 0/20 baselines. All eight
failing agents read the relevant skill instructions successfully. The most
concrete misses are unsupported short labels and profile summaries surviving
after their uncertainty is recorded, plus an unexplained nursing title.

Identical-prompt repeats change criterion scores on two of four selected
conversations, but no overall pass/fail status. The two repeated backdrop
failures persist; one closing-answer failure flips to pass. Findings,
provenance hashes, raw judgements, read-command evidence and a local verifier
are saved in `evals/runs/codex-sol-1-diagnosis/`. Original judgements remain
intact. No skill or rubric change and no fresh portfolio conversation.

Corrected the report-only count in the evaluation README, documented the
mixed asking/asserting score and answer boundary, and replaced obsolete
startup instructions in the handover. Required local checks pass.
