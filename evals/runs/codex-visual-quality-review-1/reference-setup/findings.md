# Original V3 local-preview feasibility

11 October 2026. The offline setup is blocked by missing locked dependencies.
No reference server was started on port 3012, and the existing previews on
3010 and 3011 were left alone.

The original `/home/kshitij/projects/portfolio-website` remains clean at
`163b8ceb302b7b4e5beeff8f1161f4cdc7663b15`. Its root `AGENTS.md` was read first.
No private documentation, environment files, resume modules/assets or PDF
contents were read or copied. Only the public application/configuration
paths listed in [setup-manifest.json](setup-manifest.json) were read.

An ignored isolated bootstrap was created at
`node_modules/visual-reference-20261011` in Storyfolio. Its `package.json`
and `package-lock.json` are exact original bytes. Application source was
not copied after the dependency bootstrap failed. Partial package extraction
remains only inside this ignored copy.

The command used native Node 22.22.1 with npm 9.2.0:

```text
npm ci --offline --ignore-scripts --no-audit --no-fund
  --cache=/home/kshitij/.npm
  --logs-dir=<this reference-setup directory>/npm-logs
```

It exited 1 after 4.93 seconds: `ENOTCACHED` for `zwitch@2.0.4`. The cache
listing also showed Next 16.3.8 but not the required locked Next 16.2.10.
No package versions were substituted and no external installation was
attempted. The original lockfile remains unchanged.

Additional limits for any later live-preview attempt: the public layouts
use Google fonts, and the root layout imports a resume-named chat component
that was excluded from this task's content reads. The install also warned
that `camera-controls@3.1.2` requires npm at least 10.5.1. A complete,
faithful offline rendering has not been demonstrated.

The exact command, timing, stdout, stderr and npm debug log are retained
here with an [artifact hash map](artifacts.json). Use the original bundled
`public/assets/img/versions/v3.jpg` and permitted public source as the
visual-reference fallback. This attempt provides no live reference render
or new screenshot, changes no skill/engine code and makes no paid model call.
