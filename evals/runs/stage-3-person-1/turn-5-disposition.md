# Turn 5: chapters built, wording offered; gate for turn 6 written

Turn 5 closed normally (1,555 s, about 413,000 uncached tokens). The agent
reports all 15 beats built in Paper/daylight, five expandable work pages,
the printable and downloadable CV, share preview, icon and 404, and offers
three complete openings and closings (in the workspace's
`docs/story/wording.md`), recommending A for both.
Root read the reply; the author then paused the work, and it was taken up
in another session on 22 October (evening), below.

## Root's view of the chapters

The workspace and its `site/checks/` screenshots are on the machine the
run was made on, not on the one this review was made on (see
[README.md](README.md)). Root rebuilt the site from the saved turn-5
snapshot (`evals/runs/codex-person-1/full-journey-2/baseline-1/turns/05/snapshot/files`):
`npm ci` from its lockfile, `next build` (passes, 15 static pages), then
[review-capture.mjs](review-capture.mjs) at 1440 by 900, scene on, every
beat at the middle of its rest, once as shown and once with every HTML
element hidden. Node 24.14.0 and Chrome for Testing 151 (Playwright cache
revision 1234) with SwiftShader, not the pinned tools. No page errors and no
outside requests. Phone, reduced motion and the other modes were not looked
at here; they belong to the final check after turn 6.

Evidence: [scenes with captions hidden](evidence/turn-5-scenes-captions-hidden.png)
(the right half of each frame, in beat order, five to a row) and
[the beats as shown](evidence/turn-5-beats-captioned.png).

With the captions hidden, each beat shows on the open runbook:

| Beat | What the scene shows |
|---|---|
| hello.intro | The book opening, a library card catalogue standing on it |
| hello.origin | The catalogue, and a small table grid drawn in outline on the left page |
| places.route | Three raised leaves, each with a flag and a row of small blocks; a marker on the middle one |
| study.degree | A stand holding a leaf with lines and a round seal; the catalogue small behind it |
| career.library-lumen | The open book, blank |
| career.kestrel | Three documents: lines, a checklist, a marked-up leaf |
| practice.documents | The same three documents as the beat before |
| practice.oncall | A checklist and a bell with two small tags |
| practice.reading | Two closed volumes, rust and green, on a stand |
| projects.migration | Two gateways joined by a track with blocks on it, an arrow across the page |
| projects.database | Two database cylinders, one cut away |
| projects.runbook | A small rust book and a checklist |
| projects.ferry | A terminal screen with a prompt, and a lever |
| projects.talk | A lectern with a note leaf and a bent stand, which may be a microphone |
| contact.close | The book closed, an envelope and a CV leaf on it |

Captions sit in the left column, clear of the scene, at every beat.

**Weak points**, for the final check and the author's review:
- `career.kestrel` and `practice.documents` show the same three documents,
  one after the other. Without the captions, Kestrel Freight has no
  picture of its own.
- `career.library-lumen` is a blank book. The storyboard chose this
  (Lumen Pay may only have its one line), but the beat shows nothing.
- The dropped table at `hello.origin` is a small outline on the page; at
  rest it does not read as dropped.
- The camera, the book's place and its angle are the same at every beat.
  Only what stands on the pages changes.
- The shadow keeps the open book's shape when the book is closed at the end.

None of these is a stop rule: the protocol stops a run only at the gates
after turns 2 and 3. The [gate for turn 6](gates/after-5.json) is written:
send the unchanged fixed turn 6 reply.
