# Capacity rejection, new-attempt question

12 October 2026. The previously bounded matched candidate was rejected by
the model service before any agent reply or command. Raw message:

> Selected model is at capacity. Please try a different model.

This is not a skill behavior result. Its usage is absent, not zero cost.
No automatic retry, continuation or model substitution was made. After
the actual normal failure closure, root asked this optional next-step
authorization question using asynchronous user input:

> The matched test was rejected because the configured model is at capacity, before it produced any work. The current test plan allows no automatic retry. May I make one fresh attempt with the same model and original limits (up to six gated 15-minute turns, no judge or further retry)?

Options, verbatim:

- Approve one fresh same-model attempt
- Stop here and retry later

At this record's creation no answer has arrived. Do not infer approval from
the question, its preselected option or the original failed trial. Any
answer belongs in a separate verbatim historical record and prospective
launch decision; the failed candidate remains immutable.
