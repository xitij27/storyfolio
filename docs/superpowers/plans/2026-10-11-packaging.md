# Stage 4: packaging the proven build workflow

Written on 11 October 2026 following the
[stage coherence review](2026-10-11-stage-review.md). The author asked for
all stages to be coherent and for omissions in current development to be
identified. This is an implementation plan, not a release or publication.

## Existing work and prerequisites

The public README, MIT license and package license declaration already
exist. The author reports that the GitHub repository is public. Retain
their history and improve these artifacts for the final supported scope;
do not describe them as unstarted work.

Packaging execution follows stage 3's complete-site proof: a fresh agent
has completed all six stops for a fictional person with a clearly
non-sheet object, checks pass, every beat has been visually reviewed, and
the author has actually scrolled and approved the result. Link the saved
proof and the author's recorded words. A simulated evaluation reply is
not this approval.

The stage 2 engine has the author's
[desktop and physical-phone approval](../../history/2026-10-11-engine-approval.md).
Stage 1's
remaining validation and author-review decisions must have recorded
dispositions before a final capability claim: completed, explicitly
deferred with the limitation disclosed, or still blocking that claim.
Do not silently equate building progress with closure of those decisions.
Existing-portfolio review and live privacy enforcement remain distinct
workstreams; packaging must not advertise them as completed capabilities.

No model evaluations, client/plugin installations, publishing or pushes
are made by writing this plan. The tasks below do not authorize a new
paid evaluation batch. Behavioral skill instructions still require a
saved failure and a corresponding rerun under `AGENTS.md`.

## Task 1. Freeze the release candidate and distributable inventory

Record the source commit, supported Node/browser setup, exact dependency
lock and successful proof artifacts. Verify that the working tree has no
unrelated changes before making a release snapshot. Preserve historical
evaluation evidence at its existing paths.

Define an explicit distribution allowlist. It includes:

- `README.md`, `LICENSE` and the supported plugin metadata;
- `skills/storyfolio/SKILL.md` and the references it names;
- `skills/storyfolio/scripts/`, including the scaffold;
- the engine's source, configuration, local instructions, README, tests,
  check scripts, plain assets and committed dependency lock.

Exclude dependency trees, build output, browser caches, test workspaces,
generated screenshots/reports, local credentials and unrelated author
portfolio material. The repository's research records remain committed;
they are not needed inside an installed skill package.

Use a deterministic archive or an equally reproducible snapshot procedure
with a file-and-hash manifest. A small packaging script is warranted only
if it prevents an observed packaging omission or makes the allowlist
repeatable. This is not an npm publication task. Record the actual
allowlist, archive checksum and creation command under
`evals/packaging/release-candidate-1/`.

## Task 2. Check licenses, origin and artifact boundaries

Check every distributed source and asset against the extraction provenance
and asset records. Preserve required third-party notices and font/model
terms. Keep the original portfolio credit in the README and engine
documentation. Ensure the license reaches both the installed skill and
the scaffolded site, for example with a license file included in the
engine template; a link to a sibling repository file is insufficient after
the template is copied elsewhere.

Review the actual allowlisted bytes for unintended personal information,
private portfolio copy/assets, fixture-private exports and machine-local
paths. Review the real-source evaluation artifacts already in the public
repository separately, recording what was checked and any unresolved
publication history. A report of public repository visibility does not
establish that an earlier artifact review happened.

If an issue is found, make the smallest appropriate correction and record
its scope. Preserve historical evidence; do not rewrite Git history or
silently erase evaluation records as a packaging step. The release cannot
claim that an unresolved artifact issue has been cleared.

## Task 3. Validate plugin metadata and installation routes

Verify current manifest fields and supported installation behavior against
official client documentation at implementation time, recording dates and
source URLs. Add or update `.claude-plugin/plugin.json` and any
required companion metadata. Do not invent a cross-client manifest or
promise support based solely on a directory being recognized.

Test each documented installation route in a disposable destination:
the Claude Code plugin route, supported skill-directory placement for
Claude Code and Codex, and the agent-neutral file-reading route. Validate
the complete installed directory, including engine and scripts, rather
than just discovering `SKILL.md`. Use a clean client configuration where
available and record client versions and what was actually observed.

Installation verification need not start a model conversation. Distinguish
package/schema validation, discovery or listing by a client, and an actual
model invocation. If a client is unavailable, document the route from
verified documentation and label it untested. Do not install optional
third-party skills into the person's normal environment; the skill's
recommendation policy remains "Recommend; person installs".

## Task 4. Prove the extracted package is self-contained

Create a clean directory from the release artifact, outside this checkout.
Run its scaffold from there into a second fresh directory. Keep a separate
case containing existing `docs/story/` notes and verify that they survive;
verify that an output-file conflict results in no writes.

In the fresh site, install using the shipped lockfile and the documented
browser setup. Run unit tests, type checks, lint, production build and the
full browser matrix. Inspect the resulting screenshots and exercise the
look links, keyboard overlay, fallbacks and local instructions. Record
commands, versions, exit codes, reports and visual verdicts in the
packaging evidence folder. Retain a source/hash comparison proving that
this run used the extracted package rather than files from this checkout.

Check that all documented relative paths work from the installed skill
and the scaffolded site. There must be no dependency on the author's V3
checkout, this repository's evaluation files, an absolute local Playwright
path, a global skill installation or an uncommitted asset. Confirm that
the copied site has no runtime dependency on the skill's install location.

## Task 5. Update public guidance to the proven scope

After stage 3's proof passes, replace planning-only README language with
the six-stop build workflow and its real approval points. Explain what
the user receives, prerequisites, installation/update/removal, browser
setup, scaffold conflict behavior, optional skill recommendations and how
to run the generated site's checks. Keep the existing installation routes
agent-neutral while identifying which clients were tested.

State the supported versions and who owns upgrades after scaffolding.
Describe the remaining limitations accurately: the tested form and
object range, what fallbacks guarantee, what real-phone checks still
require, and the separate status of portfolio review/privacy enforcement.
Give deployment guidance without deploying a person's site. Check the
`storyfolio` name against current public products and record any relevant
result; this is a current naming review, not a claim that the name has yet
to become public.

Synchronize the handover, documentation map, plan index and public README
with the final implemented scope. Preserve earlier statements verbatim
in history when shortening current guidance.

## Exit and release gates

Stage 4 is ready when the candidate is identified by commit and hash,
license/origin and artifact reviews are recorded, the allowlisted package
installs and scaffolds cleanly, its generated site passes the required
checks, and public guidance distinguishes tested support from documented
portability. Run `node evals/check-skill.mjs`,
`node evals/check-people.mjs` and `npm test` before committing on `main`.

Retain evidence and a compact release checklist in
`evals/packaging/release-candidate-1/findings.md`, including failures,
corrections, remaining limitations and links to the stage 3 approval.
Use a new evidence directory for a materially different candidate; do
not overwrite a failed candidate's results.

Commit the complete, reviewable local result. Publishing a release,
listing the plugin, pushing to `origin` or deploying any portfolio is a
separate action on the author's direction. Stage 4 can be locally complete
and ready for release while that publication decision remains with them.
