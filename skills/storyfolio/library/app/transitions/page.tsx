import type { Metadata } from "next";
import Link from "next/link";

import { asset } from "@/content/sample";
import { PIECES, WORLDS, picture } from "@/components/transitions/pieces";
import { WAYS } from "@/components/transitions/ways";
import { CHAPTERS } from "@/stitch/chapters";

export const metadata: Metadata = {
  title: "Transitions",
  description: "Three worlds a portfolio can be told in, and every chapter of each.",
};

const card =
  "flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-[transform,border-color] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none";

export default function Transitions() {
  return (
    <main className="mx-auto max-w-6xl px-page pb-24">
      <header className="py-16 sm:py-24">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Library</Link>
        <p className="mt-8 font-mono text-sm text-brand">Transitions</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          How one chapter <span className="text-gradient">becomes</span> the next.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          A portfolio told in eight chapters, in three worlds: a sheet of paper, a map, a pop-up book. Every picture and
          word comes from the person&apos;s details, so any of them fits anyone with their own words and places. Watch
          each one whole, or open any chapter&apos;s piece. The agent building a site chooses pieces from all three to
          suit the person, and shows the mix moving; say what you would change. The two people are made up.
        </p>
      </header>

      <section aria-labelledby="whole" className="border-t border-border/60 py-12">
        <h2 id="whole" className="font-heading text-2xl font-bold">Whole examples</h2>
        <p className="mt-2 text-sm text-muted-foreground">One world through all eight chapters.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {WORLDS.map((w) => (
            <li key={w.id}>
              <Link href={`/transitions/whole/${w.id}/`} className={card}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(picture(w.id, "hello"))} width={960} height={600} alt="" loading="lazy" className="aspect-[8/5] w-full object-cover" />
                <span className="p-5">
                  <span className="block font-heading text-lg font-semibold">{w.name}</span>
                  <span className="mt-1.5 block text-sm text-pretty text-muted-foreground">{w.how} {w.joins}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pieces" className="border-t border-border/60 py-12">
        <h2 id="pieces" className="font-heading text-2xl font-bold">Chapter by chapter</h2>
        <p className="mt-2 text-sm text-muted-foreground">Each world&apos;s piece for each chapter. Open one to see it in its example, at that chapter.</p>
        {CHAPTERS.map((c, i) => (
          <div key={c.key} className="mt-10">
            <h3 className="font-heading text-lg font-semibold"><span className="mr-2 font-mono text-sm text-brand">{i + 1}</span>{c.title}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {WORLDS.map((w) => (
                <li key={w.id}>
                  <Link href={`/transitions/whole/${w.id}/?c=${c.key}`} className={card}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(picture(w.id, c.key))} width={960} height={600} alt={`${w.name}: ${PIECES[w.id][c.key]}`} loading="lazy" className="aspect-[8/5] w-full object-cover" />
                    <span className="px-4 py-3 text-sm">
                      <b className="font-semibold">{w.name}.</b> <span className="text-muted-foreground">{PIECES[w.id][c.key]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="ways" className="border-t border-border/60 py-12">
        <h2 id="ways" className="font-heading text-2xl font-bold">One seam, four ways</h2>
        <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
          The study that came first: the same two chapters, a data pipeline and where the person has lived, joined four ways.
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {WAYS.map((way, i) => (
            <li key={way.id}>
              <Link href={`/transitions/${way.id}/`} className={`${card} p-5`}>
                <span className="font-mono text-sm text-brand">{i + 1}</span>
                <span className="mt-1 font-heading text-lg font-semibold">{way.name}</span>
                {way.id === "swap" ? (
                  <span className="mt-2 w-fit rounded-full bg-destructive/15 px-2 py-0.5 text-xs text-destructive">What the engine did before. Not to use.</span>
                ) : null}
                <span className="mt-1.5 text-sm text-pretty text-muted-foreground">{way.watch}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
