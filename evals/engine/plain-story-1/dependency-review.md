# Engine dependency review, 11 October 2026

The V3 version pins need updating before the starter is distributed. The
first engine install reported eight affected packages, seven high and one
critical. These counts describe package nodes, not eight independently
demonstrated attack paths in this plain story.

This bounded review reads package metadata and the installation audit
response. It does not assess application reachability, run exploits or
claim a complete security scan.

## Evidence

The source is npm's successful advisory response in
`/tmp/storyfolio-npm-cache/_logs/2026-10-10T23_40_11_921Z-debug-0.log`,
record `2735`, and the first generated engine lockfile. The response's
25 advisory IDs, URLs, affected ranges and severities, the relevant lock
entries and SHA-256 hashes are preserved in
[dependency-baseline.json](dependency-baseline.json). This keeps the
substantive evidence in the repository even after the temporary cache goes.

| Package in the first lock | Advisory count | Highest severity | Needed version |
| --- | ---: | --- | --- |
| `next@16.2.10` | 17 | Critical | `16.3.8` addresses all listed Next.js ranges |
| `next/node_modules/postcss@8.4.31` | 4 | High | `8.5.23` or later |
| `sharp@0.34.5` | 3 | High | `0.35.5` or later |
| `braces@3.0.3`, development dependency | 1 | High | No patched release recorded |

`micromatch`, `fast-glob`, `@next/eslint-plugin-next` and
`eslint-config-next` inherit the braces report through their dependency
chain. The top-level `postcss@8.5.29` was already outside the reported
affected ranges. It does not replace Next's separate pinned copy.

The Next.js baseline includes three critical advisories: Windows-hosted
server execution (`GHSA-p293-qw3h-jr36`), image optimization with AVIF
(`GHSA-2xp9-vwfh-vxw4`), and `next/og` image generation
(`GHSA-vcvr-r3jv-pc5j`). Applicability depends on each feature and deployment.
For example, the maintainer describes the `next/og` problem as requiring
attacker-controlled SVG values in its Node implementation. This review
does not claim those conditions exist in the starter.
[Maintainer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j).

## Minimal recommended changes

1. Pin both `next` and `eslint-config-next` to `16.3.8`. The official
   release identifies the September security fixes, including the latest
   image-optimization SSRF and cache problems. No major-version migration
   or general dependency refresh is needed for these findings.
   [Next.js release](https://github.com/vercel/next.js/releases/tag/v16.3.8).
2. Regenerate the lockfile and verify that `sharp` resolves to at least
   `0.35.5`. Next `16.3.8` declares `sharp: ^0.35.4`, which admits the fixed
   version; inspect the resolved version rather than treating the range
   itself as proof. Its fixed upstream image library is described in the
   [sharp maintainer advisory](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w).
3. Confirm the new Next copy of PostCSS is `8.5.23`. Next `16.3.8` pins that
   version directly, so an override is unnecessary. The final listed
   PostCSS advisory marks it as patched.
   [PostCSS maintainer advisory](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp).
4. Keep the existing React and React DOM pins for this change. Next's
   published peer ranges accept `19.2.4`; the baseline audit response
   lists no React advisory. This is a compatibility observation, not a
   claim that every possible React issue has been excluded.
5. Remove unused `@react-three/drei`, as the runtime implementer reports
   no imports from it. The lock shows it brings `camera-controls@3.1.2`,
   whose npm engine requires `>=10.5.1`. The environment has npm `9.2.0`.
   Removing the unused parent is the smaller change than imposing a new
   package-manager minimum for an unused child. Keep the Node `>=22.18`
   requirement for native TypeScript tests; verify the regenerated tree
   has no other incompatible npm engine requirement.

Read-only npm metadata queries confirmed `next@16.3.8`,
`eslint-config-next@16.3.8` and `sharp@0.35.5` exist. They confirmed the
PostCSS pin, sharp range, matching ESLint plugin version and React peer
ranges. Sharp `0.35.5` requires Node `>=20.9.0`, compatible with the
starter's Node floor. Queries used `npm view <package>@<version>` with
`version`, `dependencies`, `optionalDependencies`, `peerDependencies` or
`engines` fields and `--json`. An offline query had no cached response;
the sandbox's DNS lookup failed, then the approved network query succeeded.
No dependency manifests were edited by this review.

## Remaining development-only finding

The new `@next/eslint-plugin-next@16.3.8` still uses `fast-glob@3.3.1`,
which reaches `braces@3.0.3` through `micromatch@4.0.8`.
[Official plugin manifest](https://raw.githubusercontent.com/vercel/next.js/v16.3.8/packages/eslint-plugin-next/package.json).

The braces issue concerns excessive nesting in attacker-controlled glob
patterns. The upstream report remains open and the advisory database
reports no patched release. Keep the remaining finding visible, identify
its development-only dependency path, and recheck when upstream ships a
fix. This review did not trace whether any current lint invocation accepts
untrusted patterns. Do not invent a fixed version or force an unrelated
override to silence the audit.
[Upstream report](https://github.com/micromatch/braces/issues/70),
[advisory status](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

## Verification still required after the change

Regenerate the lock in a scaffold, then run a fresh install, the engine's
type check, lint, tests, build and browser matrix. Save both complete and
`--omit=dev` audit reports. Expected improvement from the metadata is no
remaining listed production advisory, with the braces development chain
still reported. A clean production report must be observed, not inferred
from these recommendations. `npm audit fix --force` is not part of this
change.

## Observed outcome

The engine now pins Next and its lint configuration to `16.3.8` and omits
the unused drei dependency. The retained lock resolves the corrected
PostCSS and sharp versions. [Production audit](audit-production.json)
reports zero vulnerabilities. [Complete audit](audit-all.json) reports
five high-severity package nodes, all in the development-only braces
chain described above. These are npm audit results, not a whole-application
security assessment. The installation also warns that ESLint `9.39.4` is
no longer supported; its replacement needs a compatible lint migration.
No forced audit fix or unrelated override was applied. Final install and
runtime verification are recorded in [findings](findings.md).
