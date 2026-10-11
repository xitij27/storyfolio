# Turn 1 command and process audit

Reviewed on 11 October 2026 after the actor turn completed. This review
read the final [raw stream](../embedded-1/baseline-1/turns/01/stream.jsonl)
and [turn result](../embedded-1/baseline-1/turns/01/result.json). The stream
contains 164 events and 75 completed command executions. No started command
was left without a completion event. This audit made no actor changes,
sent no process signals and called no model.

## Content access and optional skills

No observed command reads content from the Storyfolio development
repository, another evaluation run, or a disabled/global skill. No optional
skill installation is observed. This conclusion concerns the recorded
commands, not a syscall-level access audit or a filesystem isolation proof.

| Recorded activity | Disposition |
|---|---|
| `item_2`: reads the workspace's `.agents/skills/storyfolio/SKILL.md` | The intended unchanged skill under test. |
| `item_3` to `item_5` and subsequent engine reads | Supplied story records, starter instructions, source and contracts inside the actor workspace. |
| `item_11`: reads `docs/story/environment-setup.json` | Coordinator-supplied setup information. Its contents are not independent actor machine inspection. |
| `item_12`, `item_14`, `item_21`, `item_23`, `item_25`: searches or reads installed Next.js documentation | Project dependency documentation, consistent with the supplied engine instructions. These are not complementary skills. |
| `item_9`: `ls /tmp`; `item_11`: `ls /tmp/storyfolio-npm-cache` | Directory inventory only. Other temporary run names become visible, but no content from those runs is read in the logged commands. |
| `item_9`, `item_56`: ordinary Git status/history attempts | Both report that the workspace is not a Git repository. They do not reveal the development repository's history. |
| `item_57`: lists `.git`, `.aws`, `.codex` and the empty `.git` directory | Workspace placeholder inventory. No credential or global configuration file content is read. |
| `item_6`: `npm ci`; `item_8`: `npm ci --offline` | Project dependency installation, initially interrupted after a registry problem, then successfully completed offline. These are not optional skill installations. |
| `item_13`: `npm run browsers` with the supplied browser cache | Project browser setup. This is not an optional skill installation. |
| Later reads of `.next`, `checks/`, screenshots, local reports and generated scripts | The actor's own build and diagnostic material. |
| `item_63`, `item_75`, `item_84`: creates and commits through `.storyfolio-git` | Local history inside the actor workspace. User identity configuration is local to that repository. No remote write or global configuration change is observed. |

The actor continued without complementary skills. It did not name any
optional skill or installation source in the recorded replies. Whether
that is a relevant recommendation miss belongs to the independent rubric
judgement. No conclusion about successful use of installed complementary
skills follows from this run.

## Completion and budget

The actor ended at the requested appearance choice, offering Bench paper,
Instrument paper and Review sheet. It did not claim that the remaining
four beats or the final site had been approved. The final result records
802,071 milliseconds for this turn, with 4,603,905 reported input tokens
(4,470,144 cached input tokens) and 25,845 output tokens.

The frozen between-turn calculation is input plus output, including cached
input as reported: **4,629,750**, above the 1,500,000 ceiling. No second
actor turn may start under this protocol. The ceiling is checked between
turns, not enforced as an in-flight cap. The raw usage should be retained
without subtracting cached input to make a continuation appear eligible.

## Background processes

The outer tool sandbox has a private PID namespace; an empty process list
there would not establish host cleanup. A separate read-only host inventory
was therefore taken after turn completion at `2026-10-11T02:01:09.837111Z`.
It found **zero processes whose current working directory was the actor
workspace or a descendant**. The complete result is
[turn-1-host-processes.json](turn-1-host-processes.json).

The stream also records termination of the development server (`item_26`,
exit 143), and all checker commands have completion events. No observed
actor checker or server remained to interfere with the coordinator's
subsequent rebuild. A process that changed its working directory would
fall outside the host inventory's attribution rule; this is not a claim
that every host process was traced.

## Evidence retention

The actor made several interrupted diagnostic matrices before the final
`checks/2026-10-11T01-55-22-591Z/` run. Earlier `npm run check` calls ended
with exits 130 or 143; they remain incomplete diagnostics. `item_71`
records the final fresh build and all 18 checks passing after the actor
added optional batching to its editable checker. These actor-owned results
remain distinct from the coordinator's independent acceptance checks.

The coordinator retained the diagnostic directories, complete-resolution
PNGs, contact sheets and supplemental results, plus these files that the
source snapshot excludes:

- `/tmp/build-spine.py`, the initial source-writing script.
- `/tmp/spine-sheets.cjs`, the generated contact-sheet utility.
- `/tmp/spine-test.log`, the retained redirected test output.
- The actor's local Git history as `history.bundle`.

All 367 records initially listed in the
[retention manifest](../embedded-1/baseline-1/actor-evidence/turn-1/retention-manifest.json)
were checked against their saved SHA-256 values and byte sizes; all match.
The manifest's turn-result digest also matches the immutable result.
The three temporary files appear in that manifest. The existing
`history.bundle` initially had no entry there; that integrity-record
omission was reported to the coordinator for correction before finalizing.
No other omission was identified from the recorded command outputs.

No dependency or `.next` tree was copied by this audit. Those generated
trees are outside source retention, so the evidence does not establish
complete installed-dependency tamper detection. Full-resolution source
images are retained separately from contact sheets; the actor's claimed
visual review is not itself an independent screenshot verdict.
