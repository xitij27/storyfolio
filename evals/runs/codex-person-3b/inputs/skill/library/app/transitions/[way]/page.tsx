import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Study } from "@/components/transitions/study";
import { WAYS } from "@/components/transitions/ways";

export const dynamicParams = false;
export const generateStaticParams = () => WAYS.map((w) => ({ way: w.id }));

export async function generateMetadata({ params }: { params: Promise<{ way: string }> }): Promise<Metadata> {
  const { way: id } = await params;
  const way = WAYS.find((w) => w.id === id);
  return { title: way ? `${way.name} · Transitions` : "Transitions", description: way?.watch };
}

export default async function WayPage({ params }: { params: Promise<{ way: string }> }) {
  const { way: id } = await params;
  const way = WAYS.find((w) => w.id === id);
  if (!way) notFound();

  return (
    <>
      <header className="mx-auto max-w-6xl px-page pt-10 pb-8">
        <Link href="/transitions/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Transitions
        </Link>
        <nav aria-label="Ways" className="mt-6 flex flex-wrap gap-1">
          {WAYS.map((w, i) => (
            <Link
              key={w.id}
              href={`/transitions/${w.id}/`}
              aria-current={w.id === way.id ? "page" : undefined}
              className="rounded-full border border-border/60 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground aria-[current=page]:border-transparent aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground"
            >
              {i + 1}. {w.name}
            </Link>
          ))}
        </nav>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{way.name}</h1>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{way.watch}</p>
        <p className="mt-4 text-sm text-muted-foreground">Scroll down through it, then back up.</p>
      </header>
      <main>
        <Study way={way.id} />
      </main>
    </>
  );
}
