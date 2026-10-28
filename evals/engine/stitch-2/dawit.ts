// Dawit Bekele, made up, as his confirmed facts stand after turn 2 of
// person test 2 (evals/builds/full-journey-3: workspace/material/ and
// prompts/turn2.md), written as a site's content/person.ts. Nothing here is
// beyond those files: 99.98 per cent with what it measures, "we" for the
// pages, ferry maintained not created, Lumen Pay's one line, no quotes.
import type { Person } from "@/stitch/person";

export const person: Person = {
  name: "Dawit Bekele",
  first: "Dawit",
  role: "Staff platform engineer",
  line: "Migrations, databases and reliability.",
  seeking: "Going independent next year: for companies about to make a migration they are afraid of, and for conference organisers",
  places: [
    { name: "Addis Ababa", lat: 9.03, lng: 38.74, what: "studied, ran the library's systems" },
    { name: "Amsterdam", lat: 52.37, lng: 4.9, what: "worked" },
    { name: "Rotterdam", lat: 51.92, lng: 4.48, what: "lives and works now" },
  ],
  study: [
    {
      degree: "Bachelor of Science",
      field: "Electrical Engineering",
      place: "Addis Ababa",
      from: 2009,
      to: 2013,
      note: "Final-year project: a data logger for the campus substation's feeder load",
    },
  ],
  work: [
    {
      org: "Entoto Technical University Library",
      role: "Systems administrator",
      place: "Addis Ababa",
      from: 2013,
      to: 2016,
      did: "Ran the library's catalogue system for about 30,000 records and 8,000 borrowers",
      uses: ["Perl", "MySQL", "Debian"],
    },
    {
      org: "Lumen Pay",
      role: "Site reliability engineer",
      place: "Amsterdam",
      from: 2016.2,
      to: 2020.5,
      did: "On the team that ran the card authorisation path",
      uses: [],
    },
    {
      org: "Kestrel Freight",
      role: "Staff platform engineer",
      place: "Rotterdam",
      from: 2020.6,
      to: null,
      did: "Leads migrations and on-call on a platform team of six",
      uses: ["Go", "Python", "Kubernetes", "Terraform", "Postgres", "Kafka"],
    },
  ],
  skills: [
    { group: "Languages", items: ["Go", "Python", "Bash"] },
    { group: "Platform", items: ["Kubernetes", "Terraform", "Helm"] },
    { group: "Data", items: ["Postgres", "Kafka"] },
    { group: "Reliability", items: ["Metrics", "Tracing", "SLO-based alerting"] },
  ],
  projects: [
    {
      title: "The data-centre exit",
      line: "310 services moved from two data centres to one cluster in 14 waves. Order API availability over the 26 months: 99.98 per cent.",
      tags: ["Kubernetes", "Terraform"],
      place: "Rotterdam",
      year: 2022,
      kind: "route",
      page: "/projects/data-centre-exit",
    },
    {
      title: "The orders database",
      line: "A 4 TB Postgres 11 database moved to Postgres 15 with no maintenance window.",
      tags: ["Postgres", "ferry"],
      place: "Rotterdam",
      year: 2022,
      kind: "chart",
      more: "A new Postgres 15 cluster was fed by logical replication, the order service wrote to both through ferry, and a checksum job compared them every hour for three weeks. Then reads moved, then writes, with the old cluster kept warm as the way back for a month. Dawit led it with one database engineer.",
    },
    {
      title: "The migration runbook",
      line: "Six stages, each with an exit check. Dawit wrote the first version and owns it; 40 teams use it.",
      tags: ["Runbooks"],
      place: "Rotterdam",
      year: 2021,
      kind: "list",
    },
    {
      title: "On-call",
      line: "The nine of us on the platform rota cut its pages from 85 a week to 22 in about a year.",
      tags: ["SLO alerting"],
      place: "Rotterdam",
      year: 2022,
      kind: "bars",
    },
    {
      title: "ferry",
      line: "A Go command-line tool for dual-write cutovers. Maintainer since 2022; wrote its cutover command.",
      tags: ["Go", "Open source"],
      place: "Rotterdam",
      year: 2022,
      kind: "list",
    },
    {
      title: "Boring Migrations",
      line: "A 30-minute talk at SRE North 2024 on why a good migration is uneventful.",
      tags: ["Talk"],
      place: "SRE North",
      year: 2024,
      kind: "list",
    },
  ],
  quotes: [],
  contact: { email: "dawit@example.com", links: ["ferry on GitHub", "CV"] },
};
