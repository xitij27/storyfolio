// Curated from docs/story/facts.md: confirmed claims only, shared by page and download.
export const cv = {
  name: "Dawit Bekele",
  focus: "Migration planning · cutovers · reliability",
  location: "Rotterdam",
  email: "dawit@example.com",
  summary: "I plan migrations of running systems, working from the runbook, the cutover checklist and the rollback plan. My work includes Kestrel Freight’s data-centre exit, its orders database upgrade and the migration runbook used by 40 teams.",
  sections: [
    {
      title: "Experience",
      entries: [
        { title: "Kestrel Freight", meta: "Platform engineering and migration planning · Rotterdam · August 2020–present", paragraphs: [
          "Wrote the plan and sequenced the data-centre exit: 310 services, two data centres, 14 dependency-based waves and 26 months, across a programme of about 60 engineers. Both data centres closed on schedule. Measured Order API availability was 99.98% over the 26 months; two internal incidents each lasted under ten minutes.",
          "Led the 4 TB orders database upgrade from Postgres 11 to 15 with one database engineer. Used logical replication, ferry dual writes and hourly checksum comparisons for three weeks. Reads moved before writes, and the old cluster stayed warm for a month. No maintenance window was required.",
          "Wrote the first migration runbook and still own it; 40 teams use it. Its six stages are preflight, shadow, dual write, cutover, soak and decommission, with an exit check before each next stage.",
          "On the nine-person on-call team in 2021–2022, we reduced pages from 85 to 22 per week over about a year. About half the reduction came from deleting alerts nobody needed. We also replaced threshold alerts with SLO burn-rate alerts on the services that mattered.",
        ] },
        { title: "Lumen Pay", meta: "Site Reliability Engineer · Amsterdam · March 2016–July 2020", paragraphs: ["Card payment systems."] },
        { title: "Entoto Technical University Library", meta: "Library systems · Addis Ababa · 2013–2016", paragraphs: [
          "Ran the library’s systems. In 2014, I dropped a table in production; the catalogue was down for six hours. The restore came from the nightly dump, and a day of loans was re-entered from paper slips. I added binary-log point-in-time recovery after that incident and a replica in 2015. This experience is why I care about rollbacks.",
        ] },
      ],
    },
    {
      title: "Open source",
      entries: [{ title: "ferry", meta: "Maintainer since 2022 · Go command-line tool", paragraphs: [
        "A former colleague created ferry in 2019. I maintain it and wrote its cutover command: it checks replication lag and checksum parity, switches the write target and keeps the old target ready as a fallback for a set window.",
      ] }],
    },
    {
      title: "Speaking",
      entries: [{ title: "Boring Migrations", meta: "SRE North 2024 · 30 minutes", paragraphs: [
        "A talk on the runbook, rehearsed rollback and exit checks, opening with the 2014 library outage. The talk and slides are public.",
      ] }],
    },
    {
      title: "Education",
      entries: [{ title: "BSc in Electrical Engineering", meta: "Entoto Technical University · Addis Ababa · 2009–2013", paragraphs: [
        "Final-year project: a microcontroller data logger sampling the campus substation’s feeder load every second to an SD card. It taught me that data you cannot lose needs a second copy.",
      ] }],
    },
    {
      title: "Practice and reading",
      entries: [{ title: "Runbook, cutover checklist, rollback plan", meta: "", paragraphs: [
        "Migration methods include dependency mapping, rehearsed rollback, shadow reads, dual writes, weighted routing, SLO checks and soak periods. Formative reading: the Google SRE book and Release It! by Michael Nygard.",
      ] }],
    },
  ],
};

export const cvStyles = `
.cv-page { min-height:100svh; background:#e7e3da; color:#1c222a; padding:32px 20px 72px; font:16px/1.6 system-ui,sans-serif; }
.cv-toolbar { max-width:860px; margin:0 auto 24px; display:flex; flex-wrap:wrap; gap:12px 24px; align-items:baseline; }
.cv-toolbar a { text-underline-offset:4px; }
.cv-toolbar p { flex-basis:100%; margin:0; font-size:14px; color:#56616b; }
.cv-document { max-width:860px; margin:auto; background:#fbf8f2; padding:clamp(24px,6vw,72px); border-top:5px solid #c9741f; }
.cv-document h1 { font:500 clamp(32px,5vw,48px)/1.1 Georgia,serif; margin:0 0 12px; }
.cv-document .cv-focus { margin:0 0 8px; font-weight:600; }
.cv-document .cv-contact { margin:0 0 24px; overflow-wrap:anywhere; }
.cv-document h2 { font:600 25px/1.2 Georgia,serif; margin:36px 0 20px; padding-top:16px; border-top:1px solid #cfc6b4; }
.cv-document h3 { font-size:17px; line-height:1.4; margin:24px 0 4px; }
.cv-document .cv-meta { font-size:14px; color:#56616b; margin:0 0 12px; }
.cv-document p { margin:0 0 14px; }
.cv-page a:focus-visible { outline:3px solid #80500b; outline-offset:5px; }
@page { size:A4; margin:17mm; }
@media print {
 html,body,.cv-page { margin:0; padding:0; background:white; color:#111; }
 .cv-toolbar { display:none; }
 .cv-document { max-width:none; padding:0; border:0; background:white; font-size:10pt; line-height:1.45; }
 .cv-document h1 { font-size:26pt; }
 .cv-document h2 { font-size:15pt; margin-top:20px; padding-top:10px; }
 .cv-document h3 { font-size:11pt; }
 .cv-document .cv-meta { font-size:9pt; color:#333; }
 .cv-document h1,.cv-document h2,.cv-document h3,.cv-meta { break-after:avoid; }
 .cv-document p { orphans:3; widows:3; }
 .cv-document a { color:inherit; text-decoration:none; }
}
`;
