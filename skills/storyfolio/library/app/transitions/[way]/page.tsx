import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNav } from "@/components/gallery/site-nav";
import { Study } from "@/components/transitions/study";
import { WAYS } from "@/components/transitions/ways";

export const dynamicParams = false;
export const generateStaticParams = () => WAYS.map((w) => ({ way: w.id }));

export async function generateMetadata({ params }: { params: Promise<{ way: string }> }): Promise<Metadata> {
  const { way: id } = await params;
  const way = WAYS.find((w) => w.id === id);
  return { title: way ? `${way.name}, the first study` : "The first study", description: way?.watch };
}

export default async function WayPage({ params }: { params: Promise<{ way: string }> }) {
  const { way: id } = await params;
  const way = WAYS.find((w) => w.id === id);
  if (!way) notFound();

  return (
    <>
      <div className="gallery">
      <header className="mx-auto max-w-[1360px] px-page pb-10">
        <SiteNav />
        <p className="mt-8 max-w-[60ch] text-[15px] text-quiet">
          The first study, before the three worlds: the same two chapters, a data pipeline and where the person has lived, joined four ways.
        </p>
        <nav aria-label="Ways" className="mt-4 flex flex-wrap gap-2">
          {WAYS.map((w, i) => (
            <Link
              key={w.id}
              href={`/transitions/${w.id}/`}
              aria-current={w.id === way.id ? "page" : undefined}
              className="inline-flex h-11 items-center rounded-full border border-rule px-4 text-[15px] text-soft hover:text-ink aria-[current=page]:border-transparent aria-[current=page]:bg-paper aria-[current=page]:text-on-signal"
            >
              {i + 1}. {w.name}
            </Link>
          ))}
        </nav>
        <h1 className="mt-8 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">{way.name}</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-pretty text-soft">{way.watch}</p>
        <p className="mt-4 text-[15px] text-quiet">Scroll down through it, then back up.</p>
      </header>
      </div>
      <main>
        <Study way={way.id} />
      </main>
    </>
  );
}
