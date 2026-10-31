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

The site is a stitched story (`app/page.tsx`) read from
`content/person.ts`, `content/mix.ts` and `content/site.ts`. Write only
confirmed facts into them. `npm run check` builds it and checks it at
desktop and phone size, without JavaScript and without WebGL. The plain
story at `/plain-story` is the engine for a scene of the person's own.
