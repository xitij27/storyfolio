import { person } from "./person";
export const workSlugs = ["data-centre-exit", "orders-database", "runbook", "on-call", "ferry", "boring-migrations"] as const;
export type WorkSlug = typeof workSlugs[number];
export const workDetails: Record<WorkSlug, { period: string; role: string; sections: { title: string; text: string }[] }> = {
  "data-centre-exit": { period: "August 2020 – October 2022", role: "Plan and sequencing; delivery across teams", sections: [
    { title: "The constraint", text: "Two data-centre leases were ending in late 2022. Order intake and shipment tracking supported trucks dispatched around the clock. There were 310 services to move." },
    { title: "My part", text: "I wrote the plan and sequenced the services into 14 waves by dependency. About 60 engineers across teams delivered the programme over 26 months." },
    { title: "The cutovers", text: "Preflight included a dependency map and a rehearsed rollback. We mirrored read traffic in shadow, used dual writes for services with state, and moved traffic by weighted routing at 1, 10, 50 and 100 per cent. Each cutover was watched against its SLO, followed by two weeks of soak before the old instances were switched off." },
    { title: "The result and its scope", text: "Both data centres closed on schedule. Measured Order API availability was 99.98% over the 26-month programme. There were two internal incidents, each under ten minutes." },
  ]},
  "orders-database": { period: "2022", role: "Led with one database engineer", sections: [
    { title: "The constraint", text: "Postgres 11 was going out of support. The orders database was 4 TB and was written to every second." },
    { title: "The approach", text: "A new Postgres 15 cluster was fed by logical replication. The order service wrote to both through ferry, and an hourly checksum job compared the databases for three weeks." },
    { title: "The way back", text: "Reads moved first, then writes. The old cluster stayed warm for a month as the way back. I led the upgrade with one database engineer; it was completed with no maintenance window." },
  ]},
  "runbook": { period: "2021 – present", role: "First author and current owner", sections: [
    { title: "The problem", text: "Teams migrated differently, and failures occurred in the steps people skipped." },
    { title: "The rule", text: "The runbook has six stages: preflight, shadow, dual write, cutover, soak and decommission. Each has an exit check. A service cannot enter the next stage until the previous check has passed." },
    { title: "Ownership", text: "I wrote the first version and still own it. Forty teams use the runbook." },
  ]},
  "on-call": { period: "2021 – 2022", role: "A result of the nine-person on-call team", sections: [
    { title: "The starting point", text: "The platform on-call rota was paged 85 times a week." },
    { title: "What we changed", text: "The nine of us reviewed every alert. About half the improvement came from deleting alerts nobody needed. We also replaced threshold alerts with SLO burn-rate alerts on the services that mattered." },
    { title: "The result", text: "After about a year, we were at 22 pages per week. This is our team's result. The illustration compares the two supplied weekly counts, about a year apart." },
  ]},
  "ferry": { period: "Maintainer since 2022", role: "Maintainer; author of the cutover command", sections: [
    { title: "Authorship", text: "A former colleague created ferry in 2019. It is a Go command-line tool for dual-write cutovers. I have maintained it since 2022." },
    { title: "The command I wrote", text: "The cutover command checks replication lag and checksum parity, switches the write target, and keeps the old target ready as a fallback for a set window." },
    { title: "Try the sequence", text: "Use the controls below to follow the checks, the switch and the fallback window." },
  ]},
  "boring-migrations": { period: "SRE North 2024 · 30 minutes", role: "Conference talk", sections: [
    { title: "Where I start", text: "In 2014, at the university library, I dropped a table. A cleanup script ran against production instead of staging. The catalogue was down for six hours. The restore came from the nightly dump, and a day of loans was re-entered from paper slips." },
    { title: "Why rollbacks matter to me", text: "That outage is why I care about rollbacks. After 2014 I added binary-log point-in-time recovery; in 2015 I added a replica." },
    { title: "The talk", text: "Boring Migrations is thirty minutes on the runbook, rehearsed rollback and exit checks: why a good migration is uneventful. I tell the 2014 story at the start." },
  ]},
};
export function workFor(slug: string) {
  const index = workSlugs.indexOf(slug as WorkSlug);
  if (index < 0) return null;
  return { ...person.projects[index], slug: workSlugs[index], ...workDetails[workSlugs[index]] };
}
