# Turn 3: the stop-3 gate passes under the ten-beat exception

21 October 2026, reviewed by root. Fixed turn 3 closed normally in the same
session (172874 ms, no timeout, interruption or log error), with a
complete source snapshot and 392 bound artifacts. Its
[result](continuation/turns/03/result.json) and
[storyboard](continuation/turns/03/snapshot/files/docs/story/storyboard.md)
are the evidence reviewed here. The only source changes are the five
`docs/story/` records and their mirror in `site/docs/story/`; the two
copies are identical. No application file changed.

## Workflow

- **Selection recorded first, as asked.** `concepts.md`,
  `decided-for-you.md` and `handover.md` record concept 1, the bring-up
  fixture, quote the user's delegation and give the reason: the object
  Ada built, with no absent or private artifact needed. It is the
  recommendation actually made at stop 2.
- **A real stop.** The reply asks for a yes or changes to the storyboard,
  including the shorter scope, and builds nothing ahead.
- **Refusal branch.** No skill recommendation was repeated; the actor
  continued with what is available. Unobserved as a refusal test, not
  failed.

## Against the skill's storyboard contract

| Requirement | Observation |
|---|---|
| Chapter table with all six columns | Pass: five chapters, Prepare, Command, Access, Observe, Record |
| Beat tables with all six columns, the same pieces throughout | Pass: the same seven solid segments in every beat |
| 12 to 22 beats, or an explicit shorter proposal | Ten beats, each at least one screen, proposed explicitly for approval. Accepted under the author's [ten-beat exception](../../../../docs/history/2026-10-13-stage-3-implementation-direction.md) for this fixture. The normal range stays unproved |
| Total stated and trimmed | Pass: 11.5 screens; the sum checks. No biography or second-project filler |
| No captions | Pass: working titles and fact lines only. Face markings are labels, not captions |
| Close's meaning decided, with supporting facts | Pass: a firmware decision needs a physical observation, and the observation's scope bounds the claim (F3 to F6, F8, F9). Contact follows the answer and is not the answer |
| Thirty seconds | Pass: name, goal, one proof and contact on the first screen; "firmware" and "bring-up" explained in ordinary words; chapter anchors and a skip link to Record |
| Without the scene | Pass: phone, reduced motion, no WebGL and no JavaScript rows, each saying what stands in for the pieces (supplied labelled schematics, a text ledger) |
| Looks and type | Pass: two looks from the fixture's metal, each with ground, ink, accent and surface; system sans for text, system monospace for markings |
| Every checklist row, with who decided | Pass: navigation and skip, Mosslink page and its listing, email and HTML CV, testimony never, English only, preview, icon, 404, blog never, chat never, form never, legal later. Extra rows (hosting, analytics, assets) are also marked |
| Decided-for-you list given with the ask | Pass |

## Facts

Every beat names its fact lines, and none goes beyond the
[fact sheet](continuation/turns/03/snapshot/files/docs/story/facts.md)
as corrected by the user. The four traps hold: two-year projection
against the 72-hour run (F4), forty engineering samples and six
bench-tested, none to customers (F5), one preliminary emissions check and
an unfinished programme (F6), and the colleague's PCB and analogue front
end (F3). The radio-awake observation stays open, with no cause, fix,
timing or trace (F8). The supplied SVGs are labelled teaching drawings.
Employer and dates stay out. No invented fact found.

## Carried forward, not accepted

- Mild repetition: `prepare.responsibility` and `access.mosslink` both
  group Firmware, States and Fixture as Ada's contribution, and
  `command.documents` shows only document names. Watch that these read
  as distinct settled states in the built spine.
- The meaning rests partly on words printed on the pieces. The concept
  stage's visual concerns stand: illegible or absent face words, the rail
  overlapping geometry. The storyboard keeps every label in HTML as well,
  which is the right fallback, but the built looks must make the faces
  readable.

## Gate decision

Stop 3 passes: a coherent ten-beat storyboard for the selected concept,
every checklist row disposed, presented for approval. Send the unchanged
fixed turn 4, "Yes to the storyboard", in the same session.

## Budget after turn 3

| | Used | Left for turns 4 to 6 |
|---|---|---|
| Actor time (90-minute cap) | 1274037 ms (21.2 min) | 4125963 ms (68.8 min) |
| Uncached tokens (1.5M cap) | 469319 | 1030681 |

Turn 3 used 261186 uncached tokens in under three minutes. Turns 4 to 6
build and check a real site and will run longer, so the uncached ceiling
may bind before time does. This is root's projection, not an observation.
Turn 4's own timeout is the 30-minute per-turn cap.
