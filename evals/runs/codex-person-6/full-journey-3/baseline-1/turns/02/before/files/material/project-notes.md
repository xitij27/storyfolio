(My own notes, written for whoever builds my site. October 2026.)

THE DATA-CENTRE EXIT, Kestrel Freight, Aug 2020 to Oct 2022
Problem: two data centres with leases ending in late 2022, 310 services,
and order intake and shipment tracking that must not stop: trucks are
dispatched from them around the clock.
Approach: I wrote the plan and sequenced it. Services were grouped by
dependency into 14 waves. Each service went through the runbook: a
dependency map and a rehearsed rollback in preflight, mirrored read
traffic in shadow, dual writes for anything with state, then traffic moved
by weighted routing at 1, 10, 50 and 100 per cent, watched against its SLO,
and two weeks of soak before the old instances were switched off.
Scale: 310 services, 14 waves, 26 months, about 60 engineers across teams.
Result: both data centres closed on schedule. Order API availability
through the programme: 99.98%.
What it looks like: a wave map of the services moving from the two sites
into one cluster; for each cutover, the old side's request rate falling as
the new side's rises, with the error rate flat beneath them.

THE ORDERS DATABASE, Kestrel Freight, 2022
Problem: Postgres 11 was going out of support; the orders database was
4 TB and is written to every second.
Approach: a new Postgres 15 cluster fed by logical replication; the order
service wrote to both through ferry; a checksum job compared both every
hour for three weeks; then reads moved, then writes, with the old cluster
kept warm as the way back for a month.
Result: done with no maintenance window. I led it with one database
engineer.
What it looks like: every write fanning out to two databases, the
checksums matching, then the old one going dark.

THE RUNBOOK, 2021 to now
Problem: every team migrated differently, and the failures were always in
the steps people skipped.
Approach: six stages, each with an exit check: preflight, shadow, dual
write, cutover, soak, decommission. A service cannot enter a stage until
the last one's check has passed.
Result: I wrote the first version and own it; 40 teams use it.
What it looks like: a service travelling along the six stages, stopping at
each gate until its check turns green.

ON-CALL, 2021 to 2022
Problem: the platform on-call rota was paged 85 times a week.
Approach: the nine of us on the rota went through every alert; we deleted
the ones nobody acted on, and replaced threshold alerts with SLO burn-rate
alerts on the services that mattered.
Result: 22 pages a week after about a year.
What it looks like: the weekly page count falling, step by step.

FERRY, maintainer since 2022
A Go command-line tool for dual-write cutovers. A former colleague wrote
it in 2019. I maintain it and wrote its cutover command, which checks
replication lag and checksum parity, switches the write target, and keeps
the old target ready as a fallback for a set window. 1.2k stars.
What it looks like: one command switching the write path, with the way
back still open.

BORING MIGRATIONS, SRE North 2024
Thirty minutes on why a good migration is uneventful: the runbook, the
rehearsed rollback, and the exit checks. I open with the table I dropped
at the library in 2014, a cleanup script run against production instead
of staging. The catalogue was down for six hours; the restore came from
the night's dump, and a day of loans was re-entered from paper slips.

THE LIBRARY, 2013 to 2016
The first production system I ran. After 2014 I added binary-log
point-in-time recovery and, in 2015, a replica, so that the next mistake
would cost minutes, not a day.

MY DEGREE
Electrical engineering. My final-year project logged the campus
substation's feeder load every second to an SD card; it taught me that
data you cannot lose needs a second copy before it needs anything else.
