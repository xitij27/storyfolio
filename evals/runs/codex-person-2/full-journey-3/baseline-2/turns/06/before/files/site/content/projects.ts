export const projects=[
 {slug:"data-centre-exit",anchor:"waves",title:"The data-centre exit.",period:"Kestrel Freight / August 2020–October 2022",summary:"310 services, two data centres, fourteen waves over 26 months. I wrote the plan and sequenced it; about 60 engineers delivered the programme.",diagram:"waves",sections:[
  {title:"The problem",paragraphs:["Two data-centre leases were ending in late 2022. Order intake and shipment tracking supported trucks dispatched around the clock."]},
  {title:"My part and the approach",paragraphs:["I wrote and sequenced the plan. Services were grouped by dependency into fourteen waves, with about 60 engineers across teams.","Each service followed preflight, shadow, dual write, cutover, soak and decommission. Preflight included a dependency map and a rehearsed rollback. Read traffic was mirrored; stateful services used dual writes. Weighted routing moved traffic at 1, 10, 50 and 100 per cent, watched against the service’s SLO. Two weeks of soak preceded switching off the old instances."]},
  {title:"The result",paragraphs:["Both data centres closed on schedule. Measured Order API availability over the 26 months was 99.98%.","There were two internal incidents during the migration, each under ten minutes."]},
 ]},
 {slug:"orders-database",anchor:"database",title:"The orders database.",period:"Kestrel Freight / 2022",summary:"A 4 TB Postgres 11 → 15 upgrade, led with one database engineer, with no maintenance window.",diagram:"database",sections:[
  {title:"The approach",paragraphs:["The orders database was written to every second. A new Postgres 15 cluster followed Postgres 11 through logical replication. The order service wrote to both through ferry.","An hourly checksum job compared both databases for three weeks. Then reads moved, then writes. The old cluster stayed warm for a month as the way back."]},
  {title:"My part",paragraphs:["I led the upgrade with one database engineer. I maintain ferry and wrote its cutover command; a former colleague created the tool."]},
 ]},
 {slug:"runbook",anchor:"runbook",title:"The migration runbook.",period:"Kestrel Freight / 2021–now",summary:"I wrote the first version and still own it. Forty teams use its six stages and exit checks.",diagram:"runbook",sections:[
  {title:"The problem",paragraphs:["Teams migrated differently, and failures occurred in steps people skipped."]},
  {title:"The approach",paragraphs:["Six stages, each with an exit check: preflight, shadow, dual write, cutover, soak, decommission. A service cannot enter a stage until the previous stage’s check has passed.","The data-centre exit used a dependency map and rehearsed rollback in preflight, mirrored reads in shadow, dual writes for stateful services, weighted routing during cutover, and two weeks of soak before switching off old instances."]},
  {title:"Ownership and use",paragraphs:["I wrote the first version and still own it. Forty teams use it. The diagram here is an original illustration of the process, not an internal runbook or screenshot."]},
 ]},
 {slug:"on-call",anchor:"oncall",title:"Fewer on-call pages.",period:"Kestrel Freight / 2021–2022",summary:"We reduced pages from 85 to 22 per week over about a year. This was the work of our nine-person on-call team.",diagram:"oncall",sections:[
  {title:"What we changed",paragraphs:["The nine of us on the rota went through every alert. We deleted the ones nobody acted on and replaced threshold alerts with SLO burn-rate alerts on the services that mattered."]},
  {title:"The result",paragraphs:["Pages fell from 85 to 22 per week over about a year. These are the confirmed before and after figures; the illustration does not invent a weekly history or show internal monitoring data."]},
 ]},
 {slug:"ferry",anchor:"ferry",title:"ferry.",period:"Open source / maintainer since 2022",summary:"A Go command-line tool for dual-write cutovers. A former colleague created it; I maintain it and wrote its cutover command.",diagram:"ferry",sections:[
  {title:"What the command does",paragraphs:["The cutover command checks replication lag and checksum parity, switches the write target, and keeps the old target available as a fallback for a set window."]},
  {title:"My part",paragraphs:["A former colleague wrote ferry in 2019. I have maintained it since 2022 and wrote its cutover command. The orders database upgrade used ferry for dual writes."]},
 ]},
 {slug:"boring-migrations",anchor:"talk",title:"Boring Migrations.",period:"SRE North / 2024 / 30 minutes",summary:"A talk about the runbook, rehearsed rollback and exit checks, opening with the table I dropped at the library in 2014.",diagram:"talk",sections:[
  {title:"The opening story",paragraphs:["In 2014, I ran a cleanup script against production instead of staging and dropped a library catalogue table. The catalogue was down for six hours. Recovery came from the night’s dump, and a day of loans was re-entered from paper slips.","It was my first production outage. It is why I care about rollbacks. Afterwards I added binary-log point-in-time recovery and, in 2015, a replica."]},
  {title:"The talk",paragraphs:["Boring Migrations covers the runbook, the rehearsed rollback and the exit checks. It was a thirty-minute talk at SRE North 2024."]},
  {title:"Speaking enquiries",paragraphs:["Write to dawit@example.com about a conference talk."]},
 ]},
] as const;
export type DiagramKind="library"|"database"|"complete"|"places"|"logger"|"replica"|"waves"|"practice"|"runbook"|"oncall"|"ferry"|"talk";
