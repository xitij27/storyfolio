import type { Metadata } from "next";
import Link from "next/link";

import { CHAPTERS, PIECES } from "@/catalogue";
import { PieceCard } from "@/components/gallery/piece-card";
import { SiteFoot, SiteNav } from "@/components/gallery/site-nav";
import { asset } from "@/content/sample";

export const metadata: Metadata = {
  title: "Pieces",
  description: "Sections and effects from the author's own portfolio, by the chapter of a site they tell, each with the files to copy.",
};

const textLink = "rounded-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink";

const FROM: Record<(typeof PIECES)[number]["from"], string> = {
  "V2 sections": "From the author's V2 portfolio",
  "V3 paper": "From the author's V3 portfolio",
  "Lab scenes": "From the author's Lab sketches",
  "Project figures": "From the author's project figures",
  "Written here": "Written here",
};

/** Where a piece comes from, in words, and the outside idea it was written from. */
function source(p: (typeof PIECES)[number]): string {
  const from = FROM[p.from];
  const ideas = p.originals?.map((o) => o.provider).join(" and ");
  return ideas ? `${from}, from an idea in ${ideas}` : from;
}

export default function Pieces() {
  return (
    <div className="gallery min-h-svh">
      <div className="mx-auto max-w-[1360px] px-page">
        <SiteNav current="pieces" />
        <main>
          <header className="pt-14 pb-6 sm:pt-20">
            <h1 className="max-w-[18ch] font-display text-5xl leading-[1.04] font-semibold text-balance sm:text-6xl">Pieces from earlier portfolios</h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-snug text-soft">
              Sections and effects from the author&apos;s portfolio: open one, then copy its files.
            </p>
            <p className="mt-6 text-[15px] text-quiet">
              <Link href="/template/" className={textLink}>See a whole page made of them</Link>. The person on every page is made up.
            </p>
          </header>

          {CHAPTERS.map((chapter) => (
            <section key={chapter.id} aria-labelledby={chapter.id} className="mt-28">
              <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
                <h2 id={chapter.id} className="font-display text-[2.75rem] leading-[1.08] font-semibold">{chapter.name}</h2>
                <p className="text-soft">{chapter.says}</p>
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]">
                {PIECES.filter((p) => p.chapter === chapter.id).map((p) => (
                  <li key={p.id} className="min-w-0">
                    <PieceCard
                      href={`/p/${p.id}/`}
                      name={p.name}
                      fits={p.fits}
                      source={`${source(p)}${p.scroll ? ". Scroll through it" : ""}`}
                      video={asset(`/pieces/${p.id}.webm`)}
                      poster={asset(`/pieces/${p.id}.jpg`)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
        <SiteFoot />
      </div>
    </div>
  );
}
