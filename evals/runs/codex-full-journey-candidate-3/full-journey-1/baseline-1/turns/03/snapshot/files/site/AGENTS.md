# Working on this site

Read `docs/story/handover.md` first, if it exists. Keep it current with the
person's words, decisions, implementation and check results. Keep all
lasting context in this repository and commit it with the work.

This starter uses Next.js 16. Before using an unfamiliar API, read the
relevant guide in `node_modules/next/dist/docs/` if provided by the installed
package, otherwise consult the official Next.js documentation for that
version. Do not assume older examples apply.

Install dependencies with `npm ci`, install Chromium with `npm run browsers`,
then run `npm test`, `npm run typecheck`, `npm run lint` and `npm run check`.
The last command builds and checks a production server. Open its screenshots
before calling a visual change done. Read `README.md` for the content
contract and where the results are written.

The plain story is a test of the engine. Replace it from the person's
approved storyboard and confirmed facts. Keep the text complete without
the scene, and test reduced motion, no WebGL and no JavaScript.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
