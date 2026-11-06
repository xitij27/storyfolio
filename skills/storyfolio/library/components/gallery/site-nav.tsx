/* The gallery's own nav: the wordmark and three text links, edge to edge. */
import Link from "next/link";

export const REPO = "https://github.com/xitij27/storyfolio";

export function SiteNav({ current }: { current?: "gallery" | "pieces" }) {
  const link = "rounded-sm text-soft hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:underline-offset-8";
  return (
    <nav aria-label="Site" className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6">
      <Link href="/" className="rounded-sm font-display text-2xl font-semibold text-ink">
        Storyfolio
      </Link>
      <ul className="flex gap-x-6 text-[15px]">
        <li><Link href="/" aria-current={current === "gallery" ? "page" : undefined} className={link}>Gallery</Link></li>
        <li><Link href="/pieces/" aria-current={current === "pieces" ? "page" : undefined} className={link}>Pieces</Link></li>
        <li><a href={REPO} className={link}>GitHub</a></li>
      </ul>
    </nav>
  );
}

/** One band: the made-up note and where else to go. */
export function SiteFoot({ study }: { study?: string }) {
  const link = "rounded-sm underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink";
  return (
    <footer className="mt-40 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-t border-rule py-10 text-[15px] text-quiet">
      <p>The people on this site are made up.</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        <li><Link href="/pieces/" className={link}>Pieces</Link></li>
        {study ? <li><Link href={study} className={link}>The first study</Link></li> : null}
        <li><a href={`${REPO}/blob/main/LICENSE`} className={link}>MIT licence</a></li>
        <li><a href={REPO} className={link}>Source on GitHub</a></li>
      </ul>
    </footer>
  );
}
