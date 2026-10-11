# Fixture preparation checks, 11 October 2026

This is fixture/protocol preparation, not a paid actor conversation,
website acceptance pass, skill improvement, or real user approval of this
derivative. No external assets, fonts or optional skills were fetched or
installed. Historical source material was not edited.

## Hash and contract check

Command: `node evals/builds/embedded-1/verify-fixture.mjs --refresh`.

The initial sandboxed invocation failed at Node's `spawnSync git` call
with `EPERM`, even though its attached output contained Git's file bytes.
No successful provenance result was inferred from that partial output.
The exact command was retried with the required execution escalation and
passed:

> Fixture verified: 19 unchanged historical files; 14 starting files; 7
> beats; 6 chapters; 11 checklist decisions; 5 local public assets. No
> application or paid run is verified by this check.

The comparison is against the fixed historical revision
`da3c20238d5dc840328753aa0ac4ff5abc53a740`. The new inventory and source
manifest contain SHA-256 and byte size for every listed file. The final
verification refresh includes the completed README and verifier source.

The check also verifies that original `cv.md` and `lab-notes.md` were
copied unchanged; the retained concepts body differs only in the documented
em-dash normalization; all approved core sentences appear in the fictional
confirmations; expected links have supplied public files or chapter
targets; and all five public files have provenance notes. It rejects
starting applications, generated directories, symlinks, active asset
scripts and externally loaded SVG/HTML resources. It does not treat the
coordinator's check as an actor's machine inspection.

## Authored asset structure

Python's standard-library XML parser successfully parsed all four SVGs.
Each has dimensions, a viewBox, a title and unique local IDs. Arrow-marker
references resolve locally, with no script, foreignObject or external
href. Results are saved in `asset-structure-check.json`.

The corrected HTML CV is semantic, English, UTF-8, printable, and contains
the narrower contribution, sample, endurance and preliminary-status
claims. It links only to the confirmed example email and the site's home.
Its copy explicitly identifies the fictional evaluation context. Static
source inspection is not proof of browser download behavior, navigation,
contrast, mobile legibility or the build's preservation of those facts.

Rendered asset/site review belongs to the future browser acceptance run.
SVG social-preview compatibility remains explicitly unverified; the build
must record that limit or document a local raster derivative and the
applicable review. The supplied illustrations establish no real-device
appearance, measured trace, state-machine topology or photographic evidence.
