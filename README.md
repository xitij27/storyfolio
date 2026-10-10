# Storyfolio

Storyfolio is an Agent Skill for shaping a personal portfolio site from a
resume, LinkedIn profile, GitHub profile, existing site, or other profile
material. It guides an agent to plan one long-scrolling portfolio story built
around an object from the person's own work.

It is for people who want a portfolio that feels specific to their work,
rather than a generic template or a list of projects.

## What it does

Storyfolio takes the work through three approval points:

1. **Read:** the agent identifies facts to confirm, gaps, and questions before
   proposing a design.
2. **Concept:** the agent presents three distinct concepts and recommends one.
3. **Storyboard:** the agent writes the complete page script for approval.

It keeps the working record in the portfolio project's `docs/story/` folder,
so another session can continue from the files alone. The process also treats
claims about a person's work, metrics, collaborators, and media as facts to
verify, not copywriting to invent.

## Current scope

This release plans a portfolio through an approved storyboard. It does **not**
build the site, create 3D assets, publish a site, or install additional tools.
Those later stages are intentionally not part of the skill yet.

## Install

Storyfolio is currently in a private repository. You need access to clone it.
The skill has no npm dependencies or build step: install its directory in the
project where you want the agent to use it.

### Codex

Codex discovers repository-local skills in `.agents/skills/`. Clone this
repository, then copy the skill into the target portfolio project:

```bash
git clone https://github.com/xitij27/storyfolio.git
cd /path/to/your-portfolio-project
mkdir -p .agents/skills
cp -R /path/to/storyfolio/skills/storyfolio .agents/skills/storyfolio
```

The resulting layout should include both the manifest and its references:

```text
.agents/skills/storyfolio/
  SKILL.md
  references/
```

Start a new Codex conversation in the target project. Codex can select the
skill when the request matches it. To make the choice explicit, say: “Use the
Storyfolio skill to plan my portfolio from the material in this project.”

See OpenAI's [skills guide](https://developers.openai.com/api/docs/guides/tools-skills)
and its guide to [packaging skills as plugins](https://developers.openai.com/plugins/build/plugins)
for other Codex and ChatGPT distribution options.

### Other Agent Skills clients

The skill follows the open Agent Skills layout: a `SKILL.md` file with related
reference files. Copy `skills/storyfolio/` to the directory your client uses
for local skills, preserving the directory structure. Consult that client's
documentation for its discovery path and activation method.

## Use it well

Give the agent the profile material you want it to consider and tell it where
the material lives. This can include a resume, exported LinkedIn profile,
GitHub profile, writing, talks, project notes, and an existing portfolio.

The first response is deliberately a factual review and a short list of
questions. Answer those questions before asking for concepts. Then choose a
concept and approve or revise the storyboard. The agent records confirmed
facts, choices, and remaining work under `docs/story/` in the target project.

Only provide material you are allowed to share. Do not place private
correspondence, contact exports, participant records, or an employer's
confidential material in scope unless you have made an explicit decision to
do so. The skill asks before planning media, quotes, or work owned by someone
else.

## Example prompt

```text
Use the Storyfolio skill to plan a portfolio from my resume and the project
notes in this repository. Start with the factual review only.
```

## For contributors

The source skill is at [skills/storyfolio/SKILL.md](skills/storyfolio/SKILL.md).
Read [AGENTS.md](AGENTS.md) and [the current handover](docs/handover.md)
before changing it. Skill instructions are evidence-led: a new instruction
needs an evaluation run that demonstrated the need.

Run the local checks from the repository root:

```bash
node evals/check-skill.mjs
node evals/check-people.mjs
npm test
```

The [documentation map](docs/README.md), [evaluation runbook](evals/README.md),
and [study catalogue](evals/studies.md) describe the project records and test
evidence.

## License

Storyfolio is released under the [MIT License](LICENSE).
