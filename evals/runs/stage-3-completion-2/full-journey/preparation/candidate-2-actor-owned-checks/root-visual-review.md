# Actor neutral screenshot preservation and review

After turn 1 closed normally, root copied the final actor-authored neutral
check script and PNG exclusively into this separate directory. Exact
source/destination hashes, byte counts and modification times are in
`manifest.json`, with the actual copy command/tool result beside it.
This does not add bytes to the actor's snapshot or repair its output.
The pre-update script that failed an import was not retained by the raw
file-change event and has not been reconstructed as an original.

Root individually opened the copied 1280-by-720 PNG with `view_image` at
original detail on 12 October 2026. It shows a plain white page with a
black "Local setup check" heading and "Neutral browser test." paragraph,
with no visible clipping or error overlay. Script bytes correspond to
the final successful command's local HTTP page and DOM observations.

This root viewing is not evidence that the evaluated actor viewed it.
That separate claim is now corroborated by the exact native session's
view call, completed ImageView and returned image. See
`native-view-provenance.json` and the three raw events. The returned PNG
is byte-identical to this archived original. The CLI stream omitted the
viewing event; it is not evidence that no view occurred. This confirms
image delivery, not comprehension or visual acceptance.
No portfolio, phone, concept or site acceptance is established.
