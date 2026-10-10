# Three concepts for Leena Varma

Status: awaiting concept choice. Planning only; no site implementation.

## Common basis and constraints

Audience: engineering managers considering Leena for senior backend roles. End action: email. Each opening provides her name, backend focus, confirmed personal work (idempotency key design and replay verifier), and an email action without requiring a full scroll. Exact email remains to be confirmed.

Trade forms considered: design proposal, event sequence, regression test, API specification, architecture decision record, migration checklist, replay benchmark report. The first three are confirmed daily artifacts; each concept uses one of those as its organizing form.

Every concept keeps one simple 3D object of six related pieces present throughout. Pieces carry readable evidence and rearrange to explain the chapter. Full text remains available outside the 3D canvas. No internal traces, diagrams, screenshots or source dumps. All fictional request examples carry a visible “Illustrative — invented requests” label. Examples explain a general idea, not undocumented behavior of Harrowfin's implementation.

No testimonial, award, usage count, invented learning history or customer outcome. Dates/titles awaiting explicit confirmation may be left out of the script. The benchmark appears with its scope every time: reported p95 200 ms → 120 ms, 40% lower latency, one-endpoint replay benchmark, not production traffic. Personal ownership of optimization is not established.

## 1. The second request — recommended

**Question:** What should happen when the same request arrives twice?

**Form:** An event sequence, told in six chapters:

1. Participants — opening/who: Leena, the question, her two confirmed migration contributions and email action.
2. First request — how: a newly invented request enters the sequence; explain the general purpose of an idempotency key.
3. Repeat request — what: the invented request returns; show the shared key visually. Alongside the example, identify Leena's key-design contribution within the six-engineer migration. Do not specify an undocumented system response.
4. Verification — how/what: identify the replay verifier as hers, then introduce parcelcheck's two merged patches and regression test as separate work, without implying they test duplicate requests.
5. Observations — outcomes: show the reported replay benchmark with its exact scope and ownership limitation. Its test is distinct from the illustrative request sequence and from any unconfirmed verifier assertions.
6. End state — close: answer conceptually, “Recognise the repeat, define the expected behaviour, and test it.” This is proposed editorial framing, not a quote or a claim that a particular implementation passes a particular test. End with her confirmed contributions and email.

**Object:** Six thin event cards, a physical rendering of her daily event-sequence artifact. At rest they form an ordered, readable strip; their faces alternate the illustrative sequence and clearly separate evidence panels.

**Three transformations:** First request spreads cards into a time-ordered strip. Repeat request folds two invented request cards alongside one another so their identical keys can be compared. Verification aligns contribution and evidence cards beside the sequence, with parcelcheck explicitly separated. At the close the six cards return to one ordered strip.

**Opening:** Cards assemble from the three artifact names she supplied: design proposal, event sequence, regression test. This is an introduction to current practice, not a chronological claim about how she learned.

**Close:** The sequence comes together; the visitor can distinguish the illustrative explanation from what Leena designed and wrote, and can email her.

**What it stands on:** `facts.md`: user-confirmed concern about duplicate requests; daily event sequences; idempotency key design; replay verifier; six-engineer attribution; parcelcheck contributor scope; scoped replay benchmark; illustrative-example permission; audience/CTA.

**Needs from Leena:** Concept choice now. Before final evidence copy: public patch/test links, a public-safe description of design decisions and verifier checks, and exact email. No employer assets needed.

**Why it is hers:** The repeated request is the concern she named, and the evidence is tied to the key design and verifier she personally contributed, rather than to ownership of an entire migration.

## 2. The decision leaves

**Question:** How do you decide what a repeated request should do?

**Form:** A design proposal in six chapters:

1. Summary — opening/who: Leena, question, confirmed scope and email.
2. Problem — how: explain the duplicate-request concern with an invented example, without asserting historical failures at Harrowfin.
3. Constraints — how: make expected behavior and attribution explicit; separate the illustrative example from actual employer work.
4. Proposed design — what: her idempotency key design, with a public-safe explanation when supplied. Present the example as illustration, not the original proposal.
5. Validation — what/outcomes: her replay verifier; separate parcelcheck evidence; the reported benchmark with its limits, without claiming the verifier produced that measurement.
6. Conclusion — close: proposed answer, “Make the decision explicit, then make it testable”; email.

**Object:** Six rigid proposal leaves, built as simple rectangular sheets. At rest they form one short document, with each chapter on a face. These are new portfolio illustrations, not reproductions of internal proposals.

**Three transformations:** Problem opens two leaves into a side-by-side invented duplicate request. Proposed design fans the leaves into the question, decision and explanation, with personal and team scope visible. Validation lays the leaves into an evidence matrix, separating verifier authorship, parcelcheck patches and replay benchmark. Close stacks them back into one proposal.

**Opening:** The leaves gather under the names of her daily artifacts, ending with a proposal cover carrying her name and the question.

**Close:** The proposal becomes whole, with her decisions and tests in view beside email.

**What it stands on:** `facts.md`: design proposals as daily artifacts; duplicate-request concern; personal key-design and verifier scope; parcelcheck contributions; benchmark limits; illustrative-only employer explanation; audience/CTA.

**Needs from Leena:** Concept choice; then public-safe decision details, verifier checks, patch/test links and email. No invented alternatives, rejected designs or historical rationale will be added.

**Why it is hers:** It organizes her confirmed design contribution around the decision an engineering manager wants to inspect, keeping the six-engineer migration's ownership explicit.

## 3. The regression case

**Question:** How do you check what happens when a request arrives twice?

**Form:** A regression test specification in six chapters:

1. Purpose — opening/who: Leena, the question, confirmed contributions and email.
2. Fixture — how: establish a clearly invented request and key, with no internal payload or trace.
3. Actions — how/what: show first arrival followed by repeat arrival in a new illustrative example.
4. Assertions — what: distinguish an illustrative expected behavior from actual verifier assertions, which await a public-safe description. Show parcelcheck's regression test as a separate contribution; do not claim its subject is idempotency.
5. Evidence — outcomes: public patches when supplied, replay verifier authorship, and scoped benchmark as distinct evidence items; no fabricated passing result or runtime demo.
6. Review — close: proposed answer, “State the expected behaviour and make the check repeatable”; email.

**Object:** Six test-case panels, physical counterparts of a test specification's fixture, actions, assertions and evidence. At rest they form one folded test sheet; no terminal, server rack or decorative network field.

**Three transformations:** Fixture unfolds panels to reveal the invented input. Actions bends the same panels into two ordered arrivals with a repeated key. Assertions aligns action panels beside explicit illustrative expectations and separates actual evidence into its own panels. Close folds all six into the complete test case.

**Opening:** Test panels unfold from the words “design proposal / event sequence / regression test,” grounded in Leena's current daily artifacts.

**Close:** The full case is visible with labels distinguishing illustration, reported evidence and personal contribution; email sits alongside it.

**What it stands on:** `facts.md`: daily regression tests; duplicate-request concern; replay verifier authorship; parcelcheck regression test and patch count; illustrative-example permission; scoped benchmark; audience/CTA.

**Needs from Leena:** Concept choice; then public-safe verifier checks, parcelcheck links/test details and email. No actual test code or employer artifacts required for the concept.

**Why it is hers:** It puts her verifier and regression-test work at the center while keeping the duplicate-request illustration separate from the unprovided details of her actual tests.

## Recommendation and review

Choose **1, The second request**. The repeated arrival gives the scroll an understandable cause and consequence. The same cards can show order, repetition, ownership and evidence, making 3D part of the explanation. The proposal concept emphasizes written reasoning; the regression concept emphasizes verification but depends more on test details still to be supplied.

Reviewed all three for personal specificity, meaningful 3D, coherent beginning/middle/end, an artifact rather than a trade emblem, factual restraint and a useful first screen. None depends on unpublished employer assets. Proposed close wording remains subject to storyboard approval.

**Selected concept:** 1, The second request. User explicitly chose the recommendation: “Go with the one you recommend, and give me the whole plan. Still no building.” The recommendation's rationale is the readable repeated-arrival sequence and direct connection to her confirmed key-design and verifier contributions. Storyboard approval remains pending.
