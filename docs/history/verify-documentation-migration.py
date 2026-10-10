#!/usr/bin/env python3
"""Read-only preservation check for the 10 October 2026 documentation move.

Run with --full at migration completion to also check every original path.
Later code/fixture changes can legitimately fail --full; the default checks
the verbatim archives and historical extraction only. Starts no model calls.
"""
import hashlib
import json
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
manifest = json.loads((HERE / "2026-10-10-documentation-inventory.json").read_text())
full = "--full" in sys.argv[1:]
unknown = set(sys.argv[1:]) - {"--full"}
if unknown:
    raise SystemExit(f"Unknown options: {sorted(unknown)}")


def fingerprint(path):
    if path.is_symlink():
        target = os.readlink(path)
        return "symlink", hashlib.sha256(os.fsencode(target)).hexdigest()
    return "file", hashlib.sha256(path.read_bytes()).hexdigest()


errors = []
archives = 0
protected = 0
for name, record in manifest["files"].items():
    archive = record.get("archive")
    if not archive and not full:
        continue
    target = archive or name
    try:
        kind, digest = fingerprint(ROOT / target)
        if kind != record["type"] or digest != record["sha256"]:
            errors.append(f"Content or file type changed: {target}")
    except OSError as error:
        errors.append(f"Cannot read {target}: {error}")
    if archive:
        archives += 1
    else:
        protected += 1

for extraction in manifest["extractions"]:
    original = (ROOT / extraction["sourceArchive"]).read_bytes()
    selected = original[extraction["startByte"]:extraction["endByte"]]
    destination = (ROOT / extraction["destination"]).read_bytes()
    if destination != selected or hashlib.sha256(destination).hexdigest() != extraction["sha256"]:
        errors.append(f"Historical extraction changed: {extraction['destination']}")

if full:
    actual = set()
    for base, dirs, files in os.walk(ROOT / "evals/runs", followlinks=False):
        for name in dirs[:]:
            path = Path(base) / name
            if path.is_symlink():
                actual.add(path.relative_to(ROOT).as_posix())
                dirs.remove(name)
        actual.update((Path(base) / name).relative_to(ROOT).as_posix() for name in files)
    expected = set(manifest["runPaths"])
    for path in sorted(actual - expected):
        errors.append(f"New run artifact: {path}")
    for path in sorted(expected - actual):
        errors.append(f"Missing run artifact: {path}")

result = {
    "sourceCommit": manifest["sourceCommit"],
    "mode": "full migration check" if full else "verbatim archive check",
    "archives": archives,
    "extractions": len(manifest["extractions"]),
    "unchangedOriginalPathsChecked": protected,
    "runArtifactsChecked": len(manifest["runPaths"]) if full else 0,
    "errors": errors,
    "passed": not errors,
}
print(json.dumps(result, indent=2))
raise SystemExit(1 if errors else 0)
