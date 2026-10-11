# Source before stable printing

11 October 2026. These two files preserve the exact predecessor bytes for
the candidate captured in `evidence/final/`, where motion review found
ghosted lettering. They were reconstructed by reversing only the stable-print
edit, then verified against the existing
[source-before manifest](../evidence/final/source-before.json).

Both archived files map directly to the same relative paths under
`prototypes/fixture-study/`:

| Archived path | Bytes | SHA256 | Manifest match |
|---|---:|---|---|
| `content/faces.ts` | 6709 | `1913b4d7074605fd6e054042a63ac4debb363e5af7b6c4d7c5fcfa51ae0f3604` | Exact |
| `content/object-design.md` | 2979 | `874a9e5017e28e850dbe2be6aee430bd9ad726a14d2fe512b0a459f538811263` | Exact |

To reconstruct that candidate in a separate directory, use these archived
bytes for the two paths above and the separately preserved
[pre-correction connector](../source-before-clear-connectors/README.md)
for `content/extras/connections.tsx`. Use the current prototype source for
all other manifest paths. The verification script compares every file hash
and byte count in the prior manifest. The current prototype source was not
modified during this preservation.

This is a predecessor source archive, not a new run or an approved visual
result. Its differing face layouts remain evidence of the motion defect.
