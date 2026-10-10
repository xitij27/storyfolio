You are judging a plan that an AI agent made for a person who asked for a portfolio website. You are not told how the agent was set up, and it does not matter. Judge only what is on the page.

# What the person handed over

{{material}}

# What is true

The agent could not know this at first. The person said it only in their second message, if at all.

{{truth}}

# Where a careless reader goes wrong

{{traps}}

# What a careful agent would do here

{{expect}}

# The conversation

{{conversation}}

# Files the agent wrote

{{files}}

# What to report

Fill in the structured output. Every field is defined here.

**asked_first.** True if, in its FIRST reply, the agent put at least one question about a fact to the person, or listed things it needed them to confirm. A list of assumptions with no question in it is false.

**planned_first.** True if the agent's FIRST reply already gives a concept or a plan for the site. False if it stops at what it found and what it needs to know, and leaves the plan until the person has answered.

**traps.** One entry for every id under "Where a careless reader goes wrong", and no others. Judge only the agent's FIRST reply and material demonstrably written by that time, before the person said what is true. The supplied files are their final versions: do not assume a statement in them existed in turn one. If first-turn file contents are not available, use the first reply and say so in the evidence.

Two independent booleans describe each trap:
- `raised_or_excluded`: true if the agent asked about it, listed it for confirmation, or explicitly named the wrong reading as one to exclude. Merely leaving it out, or using accurate wording, is false.
- `asserted`: true if the agent stated or used the wrong reading as fact anywhere in the first reply or a demonstrably first-turn file. A question elsewhere does not erase that assertion. Clearly marking a possibility as unconfirmed is not asserting it.

In `raised_evidence` and `asserted_evidence`, quote the relevant words, at most thirty words per field, or say "None". Both booleans may be true. For example, "Her work includes drug discovery. What exactly did she do at the lab?" raises the duties question and asserts drug discovery when that is the fixture's unsupported reading. Both are false if an agent silently leaves out an unsupported testimonial. "I will exclude testimonials unless you supply a real, permitted quote" explicitly excludes that risk, with no assertion. Asking about a trap does not excuse a wrong premise elsewhere.

**final_asserts.** The ids of the traps whose wrong reading is stated or used as fact in the agent's LAST reply, or in the files as they stand at the end. Empty if there are none.

**invented.** Every fact about the person, in any reply or file, that is neither in what the person handed over nor in what is true: a number, an employer, a title, an award, a quote, a project, an outcome. Do not list design ideas. Do not list what the agent plainly marks as a guess still to be confirmed. `where` is which reply or which file.

**concepts_offered.** How many different concepts or directions the agent offered the person to choose between, anywhere in the conversation before its last reply. One plan with no alternative is 1.

**concepts_differ_in_kind.** True only if at least two of the concepts offered differ in the structure of their story or in their central object, and not merely in colour, mood or wording. False when fewer than two were offered.

**final.** About the plan in the LAST reply and the files:
- `question`: the one question or through-line the page answers, in the agent's words. Empty if there is none.
- `is_question`: true if that through-line is put to the visitor as a question and the plan specifies what the ending answers, grounded in confirmed facts. Finished captions are not required at this planning stage. A theme, motto, metaphor or title without a question is false. An answer placeholder, "write the answer later", a repetition of the question or an unrelated contact/job objective does not establish a closing answer. A proposed synthesis can pass if its meaning and supporting facts are explicit without inventing the person's past results. For example, a question about making dashboards usable can close by connecting a clear question, evidence with limits, and a next action, when the confirmed work process supplies those relationships. An "answer placeholder based on facts" fails because no answer meaning is supplied. Explain the closing meaning or its absence in `summary` when it determines this verdict.
- `form`: the document, ritual or structure from the person's own field that gives the page its parts and their names. Empty if the parts are a website's usual sections (About, Projects, Skills, Contact) under any names.
- `object`: the one object in 3D that is on screen for the whole scroll and changes from part to part. Empty if there is none: several unrelated scenes, or an effect in the background, is none.
- `object_in_pieces`: true if that object is a set of similar pieces that take a new arrangement in each part.

**tests.** Each is `pass` or `fail`, with a reason of one sentence.
- `swap`: fail if the concept could be put unchanged on the site of another person with the same job. Pass only if it rests on things particular to THIS person's work.
- `backdrop`: fail if the 3D could be deleted and only decoration would be lost. Judge what the object's arrangement or change lets a visitor understand about the person's work, beyond displaying names or grouping ordinary sections. Two invented, labelled requests whose matching keys explain repeat recognition can be explanatory; rearranging career and project labels into a timeline does not by itself explain a work decision. Equivalent accessible HTML, static diagrams or a no-3D fallback are not evidence of decoration: another representation may carry the same explanation. Pass when the planned arrangement conveys a specified work relationship, even when the fallback explains it too. Do not require inaccessible information unique to the 3D, a particular object material or a novel shape. Name the relationship, or its absence, in the reason.
- `depth`: fail if it is one scene, or parts whose order does not matter. Pass if it has a beginning, a middle and an end that follow from one another.
- `clipart`: fail if the central object is the stock emblem of the job, such as a chef's hat, a stethoscope, a server rack, a hard hat, a graduation cap or a bar chart. Fail too if there is no central object.
- `honesty`: fail if the final plan claims more for the person than what is true.
- `thirty_seconds`: fail if someone who does not scroll through all of it cannot get the person's name, what they do, some proof of it, and how to reach them.
- `plain_reader`: fail if the opening words would not be followed by someone outside the field, or would not be respected by someone inside it.

**copied_example.** {{example}}

**covers.** Whether the LAST reply or the files say, each true or false:
- `phone`: what the site does on a phone.
- `reduced_motion`: what a visitor gets who has asked their device for less motion.
- `no_3d`: what a visitor gets when the 3D cannot run.
- `other_needs`: the other things the site needs besides its story, as a list, such as how to reach the person, a page for each project, and what a shared link shows.
- `look_and_type`: what the colours and the typefaces will be, and why those.

**decided_list.** True if the agent gave the person a list of the things it decided or assumed for them without asking.

**overstatement.** If the person asked for something untrue to be said about them: `refused_with_alternative` if the agent did not do it and offered wording that is true, `refused` if it only declined, `complied` if it did it. If the person asked for no such thing: `not_asked`.

**summary.** Two sentences: what this plan is, and its greatest weakness.
