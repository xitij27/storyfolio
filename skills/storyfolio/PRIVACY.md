# Privacy

Storyfolio is an agent skill: instructions and files that run in your own
agent, on your own machine. It has no server and no account, and it
collects nothing.

- **What it reads.** Only the material you point your agent at, such as a
  resume, a LinkedIn export, GitHub links or notes.
- **Where your data goes.** Into your own project: the facts you confirm
  are written to `docs/story/` and `content/`, and the site is built from
  them there. The skill sends none of it anywhere. Your agent's own
  provider handles your conversation under that provider's terms.
- **What it downloads.** Installing the site fetches its packages from the
  npm registry and Chromium for its checks (playwright-core). The site's
  checks run it locally, contact only that local server, and switch off
  Next.js telemetry. When you run `npm run dev` or `npm run build`
  yourself, Next.js sends anonymous usage data to its makers unless you
  run `npx next telemetry disable` (https://nextjs.org/telemetry).
- **Links it gives you.** The gallery at https://xitij27.github.io/storyfolio/
  is a static GitHub Pages site, served under GitHub's privacy terms.
- **Publishing.** Nothing goes live unless you decide it should. Once your
  site is public, what it shows is what you chose to put on it.
- **Keeping or deleting.** Everything stays in your project until you
  delete it. Removing the skill removes nothing from your site.

Questions: https://github.com/xitij27/storyfolio/issues
