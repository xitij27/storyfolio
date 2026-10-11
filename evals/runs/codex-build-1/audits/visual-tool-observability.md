# Actor image-tool observability, 11 October 2026

The judge's inference from absent `view_image` events is invalid. The actor's
underlying session records image calls that `codex exec --json` omitted from
the saved stream. This is a coordinator audit of newly located evidence, not
a new judge run or an edit to the original judgment.

Only session `01a128a2-83ad-7130-84f5-b814bdf0d2e2` was inspected. The
[sanitized extract](visual-tool-observability.json) records the exact source
file and hash, call IDs, timestamps, source line numbers, image-only call
expressions, returned-image metadata and screenshot paths. It contains no
system instructions, other conversations, unrelated command text or encoded
image payloads.

There are 13 completed `custom_tool_call` records invoking `exec` with
`tools.view_image`, and their matching `custom_tool_call_output` records
contain 39 `input_image` blocks. All 39 decoded returned images match their
retained PNGs byte for byte. The saved actor `stream.jsonl` contains zero
occurrences of either `view_image` or `input_image`.

For the final matrix, `checks/2026-10-11T01-55-22-591Z`, the relevant session
records are:

| Call line | Result line | Returned images |
| --- | --- | --- |
| 402 | 413 | Nine matrix contact sheets: light wide, short, phone, reduced and no WebGL; dark wide, short, phone and reduced. |
| 423 | 432 | Six matrix contact sheets: dark no WebGL; review wide, short, phone, reduced and no WebGL. Also the review-wide opening-end original. |
| 443 | 449 | Three matrix contact sheets: no JavaScript, context loss and look switching. |
| 463 | 467 | The supplemental contact sheet. |

Every one of the 18 final matrix case directories has a corresponding
contact sheet returned to the actor. The preserved generation script places
all PNGs from each directory into batches of at most nine, with filename
labels and a 480 by 300 pixel image cell. Each of these 18 case directories
contains at most nine screenshots, so the returned sheets cover all 93
matrix originals. The extract lists each original and its hash and records
the preserved generator's hash. The earlier calls cover diagnostics and
representative original screenshots from preceding attempts.

This supports the actor's stated method, opening all matrix screenshots
through labelled contact sheets and some representative originals. It does
not establish that every original was inspected at full resolution, how
carefully the actor examined any image, or that its visual judgments were
correct. This audit did not regenerate the sheets or review all 93 originals
individually. The omitted image events are a harness observability limit;
their absence cannot support a claim that the actor failed to open images.

No actor turn, paid judgment, frozen input or raw judgment was changed.
