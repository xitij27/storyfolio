# Facts from supplied material

Status: first answers received; confirmed facts below supersede conflicting source wording. No website has been built. Unanswered items remain unresolved and cannot support additional claims.

## Identity and work

- Name: Leena Varma. Source: `material/resume.md`, opening line.
- Listed role: backend software engineer, Harrowfin Dispatch, 2022 to present. Source: `material/resume.md`. Confirm official title and dates; personal scope remains unresolved.
  - User answer: six engineers delivered the migration; Leena designed recognition of repeat requests through idempotency keys and wrote the replay verifier. She was not architect of the whole migration. Titles/dates and production status not explicitly answered. Personal scope is now established for these two contributions only.
- Contact supplied: leena@example.com. Source: `material/resume.md`. Public display preference unresolved.
  - User answer: call to action is email. Exact public address remains unconfirmed.
- Desired roles: backend or distributed systems roles where correctness matters. Source: `material/resume.md`, final line. Audience and desired visitor action unresolved.
  - User answer: seeking a senior backend role; audience is an engineering manager who should see exactly which decisions and tests were hers. CTA: email.
- Previous role: software engineer, Brindle Quay Tools, 2019–2022. Source: `material/resume.md`. Confirm title/dates and ask what Leena personally did and what can be shown.

## Projects and results

- Resume describes Leena as event migration lead and says order processing moved to an event-driven service. Source: `material/resume.md`. Lead's responsibilities, collaborators, production status and personal contribution unresolved.
  - User answer: six engineers delivered the migration. Her contributions were the idempotency key design and replay verifier; she did not architect the whole migration. Do not use the original lead wording to imply ownership of all components.
- Migration covered ingestion, retries, reconciliation and consumers; release note thanks six engineers. Source: `material/project-notes.md`. This does not establish that Leena personally implemented each area. Team and personal attribution unresolved.
- Resume says order lookup API was made “60% faster.” Source: `material/resume.md`. Disputed; do not use as page copy.
  - User answer: 60% is wrong. Use 40% reduction in p95 latency, 200 ms → 120 ms, in a replay benchmark for one endpoint. p95 is the time within which 95% of requests in that test finished. Not measured production traffic; no customer outcome figure exists. Never say 40% faster or infer a customer outcome.
- Notes report benchmark p95 latency of 200 ms before and 120 ms after, and a slide titled “40% lower latency”; resume percentage is described as older. Source: `material/project-notes.md`. Arithmetic gives 40% reduction, but authoritative claim, benchmark conditions/time, measurement basis and personal/team attribution require confirmation.
  - User answer establishes the replay benchmark and correct reduction as above. Detailed conditions, measurement period and Leena's personal contribution to this performance result remain unanswered. Present only as reported benchmark evidence, without attributing optimization ownership to her.
- Work samples listed: replay verifier, idempotency design, request trace diagrams. Source: `material/resume.md`. Purpose, authorship, deployment/use, collaborators and showing rights unresolved for each. Material does not explicitly link each sample to the migration.
  - User answer connects her idempotency key design and replay verifier to the migration. Public source/screenshots unavailable. Exact verifier assertions, design behavior and deployment details remain unanswered; do not invent them.
- Diagrams use examples from an internal request trace. Source: `material/project-notes.md`. Employer permission and sensitive content unresolved; no trace content supplied. Do not plan to display these examples before clarification.
  - User answer: Harrowfin traces and diagrams cannot be published. A newly drawn example using invented requests may be used if labelled illustrative. No public screenshot or source dump is available. Plan only new illustrative examples, never reconstructed internal data or claimed implementation specifics.
- parcelcheck contributor, 2024 to present. Source: `material/resume.md`.
- parcelcheck is a public library; profile lists it under open source; repository credits another author; public patch links can be supplied. Source: `material/project-notes.md`. This supports contributor wording, not creator wording. Exact contribution, dates, collaborators, patch links and usable evidence unresolved.
  - User answer: two merged patches and a regression test; not creator and not maintainer. Public patches may be linked. Links, patch details and explicit date confirmation remain outstanding; do not claim what the patches fixed.

## Working habits and assets

- Works from a design proposal, an event sequence and a failing test. Source: `material/project-notes.md`. Ask about actual daily use and any other named documents or rituals.
  - User answer: daily artifacts are design proposals, event sequences and regression tests; she cares about what happens when a request arrives twice. This is a confirmed opening anchor, not an invented learning history.
- No personal website yet. Source: `material/project-notes.md`. No existing site transition needed.
  - User answer: no old site, testimonial, award or extra usage figure to add. Omit these roles rather than fill them.
- Only two Markdown files were supplied. No actual work samples, images, quotes, patch URLs or repository URL were supplied. Source: inspected `material/` directory.
- Learning influences, books, people and formative failures: not supplied.

## Gaps

- Personal contribution and outcomes for both employers and each work sample.
- Evidence usable publicly: patch links, project descriptions, authorized or independently recreated visuals.
- Benchmark context and attribution.
- Intended audience, visitor action, public contact preference and exclusions.
- Learning influences and fuller daily practice.

## Disagreements

- API result: resume's “60% faster” versus notes' p95 200 → 120 ms and “40% lower latency.” Do not choose the public claim without an answer.
  - Resolved by user: 40% lower p95 latency in the replay benchmark, with the limits above. Original resume claim is superseded.
- parcelcheck creator credit is held by another author; contributor credit is consistent with the resume. No direct contradiction, but ownership must not be inflated.

## To confirm

These items do not block concept selection; omit dependent claims until answered.

1. Explicit title/date confirmation and Brindle Quay personal work. Migration production status and collaborators' individual scope.
2. Benchmark period/conditions beyond one-endpoint replay and personal versus team attribution for optimization.
3. Exact design behavior and replay verifier assertions; no internal assets permitted. Any further public description must be supplied or approved by Leena.
4. Public parcelcheck patch/test links and details; explicit contribution date confirmation.
5. Exact public email address.
6. Learning influences, if desired; no invented origin story.

## User answers

Answers recorded beside the relevant facts above from the user's second message. Unanswered items remain unconfirmed. Audience, CTA type, daily artifacts, contribution limits, benchmark wording and asset restrictions are answered.
