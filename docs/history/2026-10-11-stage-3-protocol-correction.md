# Stage 3 protocol correction, 11 October 2026

The author forwarded the message below after the engine checkpoint at
`24a12c4`. The working tree was clean when this correction began, so the
forwarded warning about uncommitted work no longer described the checkout.
The omission in the governing review was real.

## Author's message, verbatim

The escape characters below are preserved from the supplied message.

```text
Partly. The plan covers the rules but not the list, and one item is missing entirely. Codex's new governing document doesn't mention other skills at all.\
\
\*\*What my plan has:\*\*\
\- \*\*Context:\*\* your choice, "Recommend; person installs": named at each stop, the person installs, none required.\
\- \*\*Task 12:\*\* a row for writing \`other-skills.md\`. It sources the design's lines 498–523, which hold the list, and says to cover any agent, date the install commands and read third-party sources before listing them.\
\- \*\*Task 10:\*\* a judge criterion for build runs: "other skills are named with how to install them, and none is installed by the agent."\
\
\*\*What's missing:\*\*\
\- \*\*The list itself.\*\* The plan only cites the design lines and never names the ten skills. They're still safe in the design.\
\- \*\*The machine check before the first stop.\*\* The design (line 94) has the agent check Node, git, whether a site exists, which skills are installed, and whether it can open a browser. Neither plan mentions it.\
\- \*\*The governing document.\*\* Codex is already implementing, with uncommitted changes in the tree. It marked my plan as "historical" and now follows its own [stage review]\(docs/superpowers/plans/2026-10-11-stage-review\.md), which says nothing about other skills. It also says to write only references "supported by the saved failures". So \`other-skills.md\` only gets written if a baseline build run is set up to show the miss.\
\
I haven't edited anything. Codex has uncommitted work in the same files, so editing now could clobber it, and the gap exists only in this conversation for the moment. Here is a note you can paste to Codex now:\
\
Written for: Codex, implementing the stage 2/3 plans.\
\
\> Add to the stage 3 protocol in \`docs/superpowers/plans/2026-10-11-stage-review\.md\`:\
\>\
\> 1. \*\*Other skills are a stage 3 question.\*\* The starting list is in the design, lines 508–519: \`frontend-design\`, \`ui-design\`, \`react-three-fiber\`, \`threejs-webgl\`, \`web3d-integration-patterns\`, \`typography-audit\`, \`ui-verification\`, \`vercel-react-best-practices\`, \`blender-web-pipeline\`, \`find-skills\`. The author's rule (11 October, "Recommend; person installs"): at each stop, name a missing skill that would help, with what it is for, where it comes from and how to install it. The person installs. None is required.\
\> 2. \*\*The machine check before stop 1\*\* (design line 94: Node, git, an existing site, installed skills, whether a browser is available) is in neither plan. Make it a scored observation in the baseline build runs.\
\> 3. \*\*Baseline build runs also score:\*\* whether the agent names missing skills that would help, whether it installs any itself (a failure), and whether it carries on without them. Write \`other-skills.md\` only if the baseline shows the miss.\
\> 4. \*\*Before listing a third-party source\*\* (\`freshtechbro\`, \`mblode\`), read it. Date every install command, and cover agents with and without a skills folder.\
\> 5. \*\*Record a limit of the runs:\*\* the build runner ignores user config, so no other skills are installed during runs. The runs test whether the agent names what would help, not whether it uses what's installed.\
\
Or, once Codex has committed its current checkpoint, I can add this to the stage review myself. Which do you want?

This is from Claude
```

## Reviewed evidence and correction

- The [approved design](../superpowers/specs/2026-10-10-portfolio-skill-design.md)
  lines 94 to 96 require the machine and folder check before stop 1.
  Its optional-skill section, lines 498 to 523, retains all ten names,
  provenance, person-controlled installation and optional status.
- The [original plan](../superpowers/plans/2026-10-11-stage-2-engine-stage-3-build.md)
  retains the author's choice in Context, a recommendation/installation
  criterion in Task 10 and source-verification rules in Task 12. Its body
  is preserved. The current precedence notice now explicitly says that
  unchanged requirements remain binding.
- The [governing review](../superpowers/plans/2026-10-11-stage-review.md#machine-check-and-recommendations-for-other-skills)
  now lists the historical candidates and carries all five requested
  protocol corrections. This is a plan amendment, not a newly verified
  external recommendation. No third-party source was fetched, no install
  command supplied and no skill installed.
- A build baseline starting after storyboard approval cannot observe
  before-stop-1 timing or recommendations at stops 1 to 3. The amended
  protocol requires earlier-stage baseline coverage for those claims,
  sharing the concept-stage question where feasible, with the existing
  budget and approval gates still in force. A missed preflight at build
  startup does not prove behavior at an unvisited earlier stop.
- There is no implemented build runner yet. The existing
  [Codex helper](../../evals/lib/codex.mjs) ignores user configuration and
  explicitly disables discovered global skills and plugins. Skills may
  remain on disk, and these flags do not prevent shell reads. The future
  runner must verify and record that isolation; recommendations without
  complementary skills do not prove successful use of installed ones.
- A network-disabled actor cannot verify current installation commands
  online. The protocol calls for dated source evidence shared equally
  across arms, with its possible cueing recorded, or an explicit unobserved
  verification result. Guessed commands are not a successful check.
- `other-skills.md` and any machine-check instruction still require a
  saved baseline miss and matched rerun. If the actor already satisfies
  the design, leave the skill alone. The acceptance requirements remain
  even when no new instruction is justified.

The documentation map, history index and current handover link this record
and the amended protocol. The engine, shipped skill, historical run files
and evaluation code are unchanged. Stage 2 still awaits the author's
scrolling approval; no Stage 3 paid run, release or push is part of this
correction.

## Verification

- `node evals/check-skill.mjs`: passed, unchanged 687-word skill and four
  references.
- `node evals/check-people.mjs`: passed, seventeen fictional people.
- `PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH npm test`:
  the sandboxed attempt reported twenty passing test-file jobs and two
  failures, `evals/lib/measurement-v2.test.mjs` and
  `skills/storyfolio/scripts/scaffold.test.mjs`, without detailed child
  diagnostics. An approved rerun outside the sandbox passed all 189 tests,
  zero failures. No code changed between attempts. This uses the same
  standard Node 22.22.1 with native TypeScript support as the engine checks.
- Documentation checks confirm that the ten candidate names match the
  design, the original plan body remains unchanged, local Markdown links
  outside the verbatim message resolve, and the six changed files are
  documentation only. No em dashes or whitespace errors were added.
- Independent read-only review checked the source requirements, current
  runner code and distinction between late-stage and before-stop-1
  evidence. No evaluation conversation was started.
