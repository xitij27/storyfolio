import type { Metadata } from "next";

export const metadata: Metadata = { title: "The data-centre exit, Dawit Bekele" };

// Written from Dawit's project notes, which he confirmed as accurate.
export default function DataCentreExit() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px", fontFamily: "Georgia, serif", color: "#13202c", lineHeight: 1.55 }}>
      <p><a href="/">Dawit Bekele</a></p>
      <h1>The data-centre exit</h1>
      <p>Kestrel Freight, August 2020 to October 2022.</p>
      <h2>The problem</h2>
      <p>Two data centres with leases ending in late 2022, 310 services, and order intake and shipment tracking that must not stop: trucks are dispatched from them around the clock.</p>
      <h2>How</h2>
      <p>Dawit wrote the plan and sequenced it. Services were grouped by dependency into 14 waves. Each went through the runbook: a dependency map and a rehearsed rollback in preflight, mirrored read traffic in shadow, dual writes for anything with state, then traffic moved by weighted routing at 1, 10, 50 and 100 per cent, watched against its SLO, and two weeks of soak before the old instances were switched off.</p>
      <h2>What came of it</h2>
      <p>310 services, 14 waves, 26 months, about 60 engineers across teams. Both data centres closed on schedule. Order API availability through the programme: 99.98 per cent.</p>
    </main>
  );
}
