# Notes from a performance review

The order lookup benchmark says p95 200 ms before, 120 ms after. The slide
title says "40% lower latency". The resume has an older percentage.

The migration covered ingestion, retries, reconciliation and consumers.
The release note thanks six engineers. My diagrams use examples from an
internal request trace, which would make the problem much easier to explain.

parcelcheck is a public library. My profile puts it under "open source";
the repository credits another author. I can supply public patch links.

I tend to work from a design proposal, an event sequence and a failing test.
I do not have a personal website yet.
