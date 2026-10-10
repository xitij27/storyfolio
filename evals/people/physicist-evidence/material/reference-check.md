# A permitted extract from my timing calibration work

Iris Voss, Northmere Institute for Measurement

I want to show one decision from my calibration protocol, rather than just
the list of papers. This lab-approved extract and its schematic can be
reproduced or redrawn for my portfolio with this credit: "Timing calibration
extract and schematic: Iris Voss, Northmere Institute for Measurement".
It is a simplified account of the reference-source check, not consortium
science data. The CV's phrase "detector precision" is too broad for it.

## What the check compares

We send reference pulses through three timing paths and record when each
path reports them. Each pulse has a reference time. A path's residual is
its reported time minus that reference time. A positive residual means it
reports late; a negative one means it reports early. Here time is measured
in nanoseconds, abbreviated ns.

This schematic shows the logical comparison. Line lengths are not cable
lengths, and positions are not detector geometry. Each path is compared
with the same reference for that pulse.

```text
                        +--> path A --> reported time A --+
reference source -------+--> path B --> reported time B --+--> records
                        +--> path C --> reported time C --+
         |
         +--------------> reference time for each pulse ----> records

records for a path --> subtract reference time --> raw residual
raw residual -------> subtract that path's saved correction --> remaining residual
```

## The decision and procedure

The paths did not share one offset: A and C reported late while B reported
early. Moving every path by the same amount would leave their differences
unchanged. I chose one fixed correction per path, rather than one common
correction, and checked it on pulses that had not set those corrections.
That choice does not identify the physical cause of each offset.

1. Use the first group of reference pulses to measure the mean signed
   residual for each path. Save those three means as the corrections.
2. Freeze those values before examining a second group of reference pulses.
3. For every record in that held-back group, subtract the appropriate saved
   correction from the raw residual. A negative correction is subtracted
   too, so path B's time moves later.
4. Compare the before and after mean residual for each path in that second
   group. Keep the reference source and the scope of the comparison stated.

The summary below is rounded. The saved corrections come from the first
group; both check columns refer to the same second group.

| Path | Saved correction from first group | Mean residual in held-back check, before correction | Mean residual in held-back check, after correction |
|---|---:|---:|---:|
| A | +1.8 ns | +2.0 ns | +0.2 ns |
| B | -0.9 ns | -1.0 ns | -0.1 ns |
| C | +2.7 ns | +3.0 ns | +0.3 ns |

For this summary, the comparison measure is the mean absolute value of
the three path means. Each path has equal weight:

```text
before: (2.0 + 1.0 + 3.0) / 3 = 2.0 ns
after:  (0.2 + 0.1 + 0.3) / 3 = 0.2 ns
ratio:  2.0 / 0.2 = 10
```

This is the tenfold reduction I can show. The three remaining residuals
are not zero. This table does not provide the variation between individual
pulses, an uncertainty estimate or a measurement of scientific sensitivity.
It does not establish a new physical effect, performance on scientific data
or that a fixed correction will work after conditions change.

## My part and what is shareable

I chose the per-path correction procedure, implemented the correction table
and its application, and performed the held-back reference check. A lab
engineer supplied the reference distribution hardware. I did not design
the whole detector, and this work does not make me the leader of the
consortium's science analysis.

The lab has approved this simplified schematic, procedure and numerical
summary for public use with the credit above. The raw records and unpublished
internal plots remain restricted and are not supplied here. No photograph,
exact hardware drawing, raw sample count or quantified uncertainty budget
is included. A public preprint and the separate 2024 consortium publication
still need their correct status and authorship when linked.
