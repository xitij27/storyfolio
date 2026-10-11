# Source before connector clearance

11 October 2026. This directory preserves the exact predecessor
`content/extras/connections.tsx` from `prototypes/fixture-study/` before the
connector-clearance correction. Its SHA256 is
`25ea9a8d116b29abc806fa0afd4a9d756b33dec634087227c5ac4b5406b60e96`,
matching the recorded source manifest. The archive was made with `apply_patch`
before editing the current prototype, then checked with `sha256sum`.

Inspection of `evidence/stable-print/desktop/movement-forward-02.jpg` shows
a faint connector across the observation instrument's display. The previous
code trimmed endpoints and then used their absolute distance. When module
edges overlapped, that produced a reversed connector with a positive length.

The correction retains a signed gap: center distance minus both edge trims.
An individual shaft and head stay hidden until this gap exceeds the full
0.13-unit arrow-head length. The head fits inside the available gap, and the
shaft ends at its base. Middle arrows and selection-dependent opacity remain.
No shader, formation, surface or other source file changed.

TypeScript and targeted ESLint passed. A deterministic probe loaded the
actual formation definitions and checked all three rest poses. Opening gaps
were -0.011932, -1.159072 and -1.734244; all arrows were hidden. Middle gaps
were 0.914290, 0.782241 and 0.709163; all arrows retained positive shafts after
reserving their heads. Closing gaps were 0.116675, -1.016600 and -1.700803;
all arrows were hidden. The closing first pair specifically verifies the
head-clearance threshold for a small positive gap. Runtime movement review
still follows this deterministic check.

The rest of this predecessor is reconstructed from the stable-print source;
this archive replaces only its `content/extras/connections.tsx` path.
