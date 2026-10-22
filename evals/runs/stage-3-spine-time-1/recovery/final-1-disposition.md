# Whole-site check of turn 6: verdict

22 October 2026, root (Claude Code). The units and their audits are in the
[interim record](final-1-interim.md); notes from the screenshot review are
in [final-1-review-notes.md](final-1-review-notes.md). This is the
independent check. The author's own desktop and phone review is still to
come and is what closes Stage 3.

## Evidence

- Nine units, each closed normally with source unchanged and evidence
  bound. Build: typegen, typecheck, lint and production build pass, every
  required file present. Seven browser modes pass with no case problems.
  Extra pages: all eight pass; the unit fails only the frozen cache rule,
  accepted on root's diagnosis by the [author's decision](../../../../docs/history/2026-10-21-final-check-cache-and-review-decisions.md).
- [Verifier](final-1-verify-command/stdout.log): integrity verified,
  complete coverage, all 677 originals reviewed. `technicalPassed: false`
  comes only from the accepted auxiliary cache rule and the frozen
  12-to-22 beat count, which reports 10 under the author's ten-beat
  exception. Supplemental audits pass for all nine units.
- [Image record](final-1-images.json): 535 originals viewed whole and 142
  byte-identical to one viewed whole, the concept-review precedent. The
  tallest full-page captures were shown downscaled by the viewing tool;
  the wording-archive phone capture was too small to read, so its text was
  checked against the saved page HTML (all six versions and the A + A
  record present).

## Against the criteria

| Area | Result |
|---|---|
| Approved story, look and words | Pass: ten beats in storyboard order, Aluminium, Opening A and Closing A word for word |
| Whole account without 3D | Pass: no WebGL, no JavaScript and context loss each give the complete narrative with the labelled teaching drawings |
| Honesty and limits | Pass: drawings marked illustrative; colleague's work, projection against run, samples and the preliminary emissions check stated in the story, project page and CV; radio observation left open; employer and dates omitted; email is a link; no publishing or compliance claim |
| Project page, CV, 404, preview, icon | Pass |
| Controls | Pass: every link activates by pointer and keyboard with visible focus; skip link appears only on focus |
| Backdrop (object explains the work) | Pass: command, fixture and observation groups; Observe pulled out and left open; Estimate and Run held apart |
| Depth | Pass: solid segments with bases, contacts and posts |
| Swap (recognisable through the story) | Pass: the same seven segments in every beat and mode |
| Detail and hierarchy | **Fail**: words on the pieces are unreadable except the four largest (Measure, Radio awake, Two-year, 72 hours); the chapter rail sits over the geometry on desktop and covers pieces on short screens; faint pale bands show behind the caption column whenever the scene is on |
| Spatial | Pass with weaknesses: relationships read at most beats, but `record.scope` barely changes pose and Observe overlaps Run at `access.relationship` |
| Phone and still | Pass: fixture above caption at every phone beat with no overlap; reduced motion cuts between settled poses and stays still |

## Verdict

Technically, factually and in workflow the site passes. Visually it fails
one of the six criteria (Detail and hierarchy) and is weak on Spatial at
two beats. These are the concerns carried since the concept stage; the
agent's own handover acknowledges small labels and leaves the full words
to HTML, and nothing in the skill told it to resolve them.

Candidate skill findings from this run, for after the author's review:

1. Words on the pieces must be legible at the size shown, or left off
   the pieces and carried by the caption alone.
2. Page chrome (rail, bars) must not sit over the object at any beat or
   viewport.
3. Supporting pages were built before the look choice at stop 4 (from
   the [stop-4 disposition](looks-1-disposition.md)).

The site is ready for the author's own desktop and phone review, with
these findings stated in advance. Whether they need a skill fix and a
fresh matched run before Stage 3 closes is the author's decision.
