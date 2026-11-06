import type { Person } from "@/stitch/person";

export const person: Person = {
  name: "Dawit Bekele", first: "Dawit", role: "Platform engineer",
  line: "Migration plans, cutover checklists and a way back.",
  seeking: "Write to me about a migration you are planning, or a conference talk",
  places: [
    { name: "Addis Ababa", lat: 9.03, lng: 38.74, what: "2009–2016" },
    { name: "Amsterdam", lat: 52.37, lng: 4.90, what: "2016–2020" },
    { name: "Rotterdam", lat: 51.92, lng: 4.48, what: "since 2020" },
  ],
  study: [{ degree: "BSc", field: "Electrical Engineering", place: "Entoto Technical University", city: "Addis Ababa", from: 2009, to: 2013, note: "Feeder-load data logger: one sample each second to an SD card." }],
  work: [
    { org: "Entoto Technical University Library", role: "Systems Administrator", place: "Addis Ababa", from: 2013, to: 2016, did: "Ran the library's production system. After dropping a table in 2014, added point-in-time recovery and, in 2015, a replica.", uses: ["Binary-log recovery", "Replication"] },
    { org: "Lumen Pay", role: "Site Reliability Engineer", place: "Amsterdam", from: 2016 + 2/12, to: 2020 + 6/12, did: "Card payment systems.", uses: [] },
    { org: "Kestrel Freight", role: "Platform engineering", place: "Rotterdam", from: 2020 + 7/12, to: null, did: "Wrote the data-centre exit plan and sequenced 14 waves. Wrote the first version of the migration runbook and still own it; 40 teams use it.", uses: ["Migration planning", "Postgres", "Runbooks"] },
  ],
  skills: [
    { group: "Migration planning", items: ["Dependency maps", "14 waves", "Rollback plans"] },
    { group: "Cutovers", items: ["Dual writes", "Checksums", "Weighted routing"] },
    { group: "Runbook", items: ["Exit checks", "Soak", "Decommission"] },
    { group: "Reliability", items: ["SLO alerts", "Alert review", "Recovery"] },
  ],
  projects: [
    { title: "Data-centre exit", line: "310 services, 14 waves, 26 months. Order API availability: 99.98% over the programme.", tags: ["Kestrel Freight", "2020–2022", "Illustration"], place: "Rotterdam", year: 2022, kind: "list", more: "I wrote the plan and sequenced the move out of two data centres; about 60 engineers worked across teams. Dependency maps and rehearsed rollbacks came first. Shadow reads, dual writes and weighted routing preceded a two-week soak. Both sites closed on schedule. The measured 99.98% covers the Order API over 26 months; there were two internal incidents, each under ten minutes." },
    { title: "Orders database", line: "4 TB. Postgres 11 to 15, with no maintenance window.", tags: ["Kestrel Freight", "Dual writes", "Illustration"], place: "Rotterdam", year: 2022, kind: "list", more: "I led this with one database engineer. Logical replication fed the new cluster; the order service wrote to both through ferry. Hourly checksums ran for three weeks. Reads moved before writes, and the old cluster stayed warm for a month as the way back." },
    { title: "The runbook", line: "Six stages with exit checks. I wrote the first version, still own it, and 40 teams use it.", tags: ["Kestrel Freight", "Exit checks", "Illustration"], place: "Rotterdam", year: 2021, kind: "list", more: "Preflight, shadow, dual write, cutover, soak, decommission. Each stage has an exit check; a service cannot enter the next until the previous check passes. Teams had migrated differently and failures were in skipped steps." },
    { title: "On-call", line: "We took pages from 85 to 22 a week over about a year: a nine-person team's work.", tags: ["Kestrel Freight", "2021–2022", "Illustration"], place: "Rotterdam", year: 2022, kind: "list", more: "The nine of us reviewed every alert. Half the effort was deleting alerts nobody needed. We replaced threshold alerts with SLO burn-rate alerts on services that mattered." },
    { title: "ferry", line: "Maintainer since 2022. I wrote the cutover command; a former colleague created the tool.", tags: ["Go CLI", "Fallback", "Illustration"], place: "Rotterdam", year: 2022, kind: "list", more: "The cutover command checks replication lag and checksum parity, switches the write target and keeps the old target available for a set fallback window. I maintain ferry; I did not create it." },
    { title: "Boring Migrations", line: "SRE North 2024. Thirty minutes on runbooks, rehearsed rollbacks and exit checks.", tags: ["Talk", "2014 lesson", "Illustration"], place: "SRE North", year: 2024, kind: "list", more: "I open with the library table I dropped in 2014: a cleanup script ran against production instead of staging. The catalogue was down for six hours; restoration used the night's dump and a day of loans was re-entered from paper slips. It is why I care about rollbacks. Other influences include the Google SRE book and Release It! by Michael Nygard." },
  ],
  quotes: [], contact: { email: "dawit@example.com", links: [] },
};
