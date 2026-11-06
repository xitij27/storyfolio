/*
  The gallery, which is the front page and is also served at /transitions/
  (the skill and the repository's About link there): the sheet moving on
  the first screen, the three whole sites, every chapter in every world,
  and how to make your own.
*/
import Link from "next/link";
import { preload } from "react-dom";

import { asset } from "@/content/sample";
import { ChapterTable } from "@/components/gallery/chapter-table";
import { HeroLoop } from "@/components/gallery/hero-loop";
import { REPO, SiteFoot, SiteNav } from "@/components/gallery/site-nav";
import { WORLDS, picture } from "@/components/transitions/pieces";
import { WAYS } from "@/components/transitions/ways";
import { MOVES } from "@/stitch/world";

const head = "font-display text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl";
const textLink = "rounded-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink";

export function GalleryPage() {
  // The study's first way is the engine's old swap, kept for comparison; the footer opens the second.
  const study = `/transitions/${WAYS[1].id}/`;
  // The hero's poster is the first thing painted, so it is fetched first.
  preload(asset("/gallery/sheet-fold.jpg"), { as: "image", fetchPriority: "high" });
  return (
    <div className="gallery min-h-svh">
      <div className="mx-auto max-w-[1360px] px-page">
        <SiteNav current="gallery" />

        <main>
          <section aria-labelledby="top" className="grid items-center gap-x-14 gap-y-10 pt-10 pb-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:py-8">
            <div className="lg:col-span-5">
              <h1 id="top" className="font-display text-5xl leading-[1.02] font-semibold text-balance sm:text-6xl xl:text-7xl">
                How one chapter becomes the next
              </h1>
              <p className="mt-6 max-w-[30ch] text-xl leading-snug text-soft">A portfolio told on paper, on a map, in a pop-up book.</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/transitions/whole/sheet/?m=fold"
                  className="inline-flex h-12 items-center rounded-full bg-signal px-6 text-base font-semibold whitespace-nowrap text-on-signal hover:bg-paper active:translate-y-px"
                >
                  Watch the sheet
                </Link>
                <a href={REPO} className={`${textLink} text-base font-semibold whitespace-nowrap`}>
                  Get the skill
                </a>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <HeroLoop
                src={asset("/gallery/sheet-fold.webm")}
                poster={asset("/gallery/sheet-fold.jpg")}
                label="A sheet of paper holding a made-up person's CV folds into a globe of the places she lived, then into her diploma, and back."
                caption="The sheet's fold: Noa's CV becomes a globe of the places she lived, then her diploma. Noa is made up."
              />
            </div>
          </section>

          <section aria-labelledby="whole" className="mt-28 lg:mt-0">
            <h2 id="whole" className={head}>Watch a whole site</h2>
            <p className="mt-4 max-w-[58ch] text-lg text-soft">One world tells all eight chapters. Each opens on Noa; switch to Amara at the top.</p>
            <ul className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1fr)]">
              {WORLDS.map((w) => (
                <li key={w.id} className="min-w-0">
                  <Link href={`/transitions/whole/${w.id}/`} className="group block rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(picture(w.id, w.id === "sheet" ? "from" : "hello"))}
                      width={960}
                      height={600}
                      alt=""
                      loading="lazy"
                      className="aspect-[8/5] w-full rounded-xl bg-raised object-cover"
                    />
                    <h3 className="mt-5 font-display text-2xl font-semibold group-hover:underline group-hover:underline-offset-4 sm:text-3xl">{w.name}</h3>
                    <p className="mt-2 max-w-[52ch] text-soft">{w.how}</p>
                  </Link>
                  {w.id === "sheet" ? (
                    <p className="mt-3 text-[15px] text-quiet">
                      Watch it{" "}
                      {MOVES.map((m, i) => (
                        <span key={m}>
                          <Link href={`/transitions/whole/sheet/?m=${m}`} className={textLink}>{m}</Link>
                          {i < MOVES.length - 2 ? ", " : i === MOVES.length - 2 ? " or " : "."}
                        </span>
                      ))}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="chapters" className="mt-36">
            <h2 id="chapters" className={head}>Chapter by chapter</h2>
            <p className="mt-4 max-w-[58ch] text-lg text-soft">Open a picture to watch that chapter move.</p>
            <div className="mt-10">
              <ChapterTable />
            </div>
          </section>

          <section aria-labelledby="yours" className="mt-36 flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-2xl bg-raised px-6 py-12 sm:px-12">
            <div className="min-w-0">
              <h2 id="yours" className={head}>Make your own</h2>
              <p className="mt-4 max-w-[52ch] text-lg text-soft">Give your agent the skill and your CV. It shows you your site in the world that suits you.</p>
            </div>
            <a
              href={`${REPO}#get-started`}
              className="inline-flex h-12 items-center rounded-full border border-rule px-6 text-base font-semibold whitespace-nowrap text-ink hover:border-ink active:translate-y-px"
            >
              How to start
            </a>
          </section>
        </main>

        <SiteFoot study={study} />
      </div>
    </div>
  );
}
