# Optional-helper primary-source review

Recorded 12 October 2026, with retrieval timestamps in UTC in
[source-records.json](source-records.json). This is coordinator evidence,
not a new Storyfolio instruction or an installation authorization.

All ten names in the [approved design](../../../../docs/superpowers/specs/2026-10-10-portfolio-skill-design.md#recommending-other-skills)
exist at the recorded revisions. No missing helper was replaced with a
guessed alternative. `web-animation-design` remains excluded because the
design does not establish its source.

## What was checked

The reviewer read each listed helper's actual `SKILL.md`, the relevant
repository installation documentation, and the published installer source
needed for path, name and target-agent selection. The machine-readable
record preserves repository commit IDs, commit dates, exact raw URLs,
HTTP statuses, byte lengths and SHA-256 digests. It also records the one
unsuccessful auxiliary code-path lookup instead of concealing it.

This establishes source availability and documentation/source-checked
syntax, not a successful installation, tested helper behavior, a security
audit, license clearance, or compatibility of every embedded API example.
No external skill was installed, enabled or run. No model, build, browser
or test was launched for this review.

## Installer evidence and qualifications

The [published package metadata](https://registry.npmjs.org/skills/1.7.2)
reports `skills` version `1.7.2`, Node `>=22.20.0`, and Git revision
`671e8c320810d36fed80fac5f1a2c1bf7e82d812`. This differs from the repository
main revision recorded in the source manifest. Installer conclusions use
the published revision, not an assumption that main equals the package.

The [published README](https://github.com/vercel-labs/skills/blob/671e8c320810d36fed80fac5f1a2c1bf7e82d812/README.md)
documents direct GitHub directory URLs, named skill selection and
`codex` / `claude-code` agent targets. The
[source parser](https://github.com/vercel-labs/skills/blob/671e8c320810d36fed80fac5f1a2c1bf7e82d812/src/source-parser.ts#L431)
separates the tree URL's revision and directory. The
[Git helper](https://github.com/vercel-labs/skills/blob/671e8c320810d36fed80fac5f1a2c1bf7e82d812/src/git.ts#L18)
supports a full commit SHA, and the
[skill discovery and selector](https://github.com/vercel-labs/skills/blob/671e8c320810d36fed80fac5f1a2c1bf7e82d812/src/skills.ts)
reads the pointed-to directory and matches its frontmatter name.
The [npm documentation](https://docs.npmjs.com/cli/v11/commands/npx/)
supports a versioned package argument and warns that an absent package
can be fetched into its cache.

Accordingly, each command in [catalog.json](catalog.json) is explicitly a
composition of documented syntax with a verified directory, commit and
frontmatter name, not a claim that the entire command appears verbatim
upstream. Both package version and source revision are pinned. Commands
retain interactive confirmation and project scope; no global or
confirmation-skipping flags are supplied. They install a skill directory,
not the entire accompanying plugin with its agents, hooks or commands.
The Node requirement belongs to this optional installer, not to the
Storyfolio engine or to all ways of loading a skill.

Important source details:

- `vercel-react-best-practices` is the actual frontmatter name in
  [`skills/react-best-practices/SKILL.md`](https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices/SKILL.md).
  The short folder-name example inside `find-skills` is not evidence that
  this installer accepts that different name. The catalog uses the
  verified frontmatter name.
- The [mblode README](https://github.com/mblode/agent-skills/blob/872bc83bdb6dd54a9ff456fbf1181beea6db7875/README.md)
  documents a broad global, multiple-agent, non-interactive install.
  The catalog instead derives narrowly selected, project-scoped commands
  from the published CLI interface. That is a recorded composition, not
  an undocumented claim about the repository's own example.
- The [Anthropic directory](https://github.com/anthropics/claude-plugins-official/blob/f359d43b406057f1a8cdbc4ea93b827642c162e6/README.md)
  documents Claude Code plugin installation; its frontend plugin and
  actual nested skill path both exist. The
  [Freshtechbro README](https://github.com/freshtechbro/claudedesignskills/blob/1da73febff0c3e1dfefc07f8a5ef8f7d1dfdb6cd/README.md)
  documents its Claude marketplace and individual plugin installation.
  Its [marketplace manifest](https://github.com/freshtechbro/claudedesignskills/blob/1da73febff0c3e1dfefc07f8a5ef8f7d1dfdb6cd/.claude-plugin/marketplace.json)
  binds all four listed helpers to the individual directories used here.
  Those plugin routes are distinct from the catalog's skill-only route.
- `ui-verification` requires a reachable application and browser
  automation. `blender-web-pipeline` concerns an actual Blender/model
  workflow. Their existence does not supply those tools or make either
  helper relevant to every task.
- `find-skills` includes advice to offer installation. Its full
  instructions are not supplied to the actor as part of this data
  catalog. The project's person-controlled-installation policy has not
  been replaced by an external skill's workflow.

## Agent compatibility

The current [official Codex skill documentation](https://learn.chatgpt.com/docs/build-skills)
documents project `.agents/skills` and user `.agents/skills` locations
and a separate built-in installer route. The OpenAI Docs skill was used to
check this official source rather than infer current Codex loading from a
third-party README alone.

The [official Claude Code documentation](https://code.claude.com/docs/en/skills)
documents project `.claude/skills`, personal `.claude/skills` and
plugin loading. Its [plugin documentation](https://code.claude.com/docs/en/discover-plugins)
separately confirms marketplace registration and named plugin installation.
The published installer [agent mapping](https://github.com/vercel-labs/skills/blob/671e8c320810d36fed80fac5f1a2c1bf7e82d812/src/agents.ts)
agrees with those project locations.

An agent without documented skill loading or file access is not made
capable by receiving this catalog. No general install/activation command
is promised for that case. Official web pages are dated live documents;
their retrieved HTML hashes are recorded, but no Git revision is claimed
for them.

## Prospective exposure, identical in both arms

Propose supplying only the same byte-identical `catalog.json` as declared
ordinary source data in both fresh full-journey workspaces, outside every
skill-loading directory. It can sit beside other factual environment/source
records, with the same neutral link in each arm. Freeze its bytes, path and
link before the first actor. Preserve the actual installed/enabled skill
inventory separately; this remote catalog does not replace it.

Do not supply this coordinator README, scoring criteria or external
instruction bodies as actor instructions. The catalog has no expected
recommendation count, stage mapping, preflight checklist or instruction to
recommend, inspect, install or refuse anything. Its presence nevertheless
makes candidate sources easier to notice, so any result is explicitly
conditional on supplied source data, not proof of unaided discovery.
Missing recommendations remain a question for the prospective baseline,
not a reason to add skill text now. No actor fixture or shipped skill was
changed by this review.
