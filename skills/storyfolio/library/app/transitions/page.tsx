import type { Metadata } from "next";
import Link from "next/link";

import { WAYS } from "@/components/transitions/ways";

export const metadata: Metadata = {
  title: "Transitions",
  description: "One seam between two chapters, joined four ways: how one 3D picture can become the next.",
};

export default function Transitions() {
  return (
    <main className="mx-auto max-w-4xl px-page pb-24">
      <header className="py-16 sm:py-24">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Library
        </Link>
        <p className="mt-8 font-mono text-sm text-brand">Transitions study</p>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          One seam, <span className="text-gradient">four ways</span> across it.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          The same two chapters every time: a data pipeline, then where the person has lived. Only the way one becomes the
          other changes. Scroll each one through, slowly and back again, then compare. The person is made up.
        </p>
      </header>
      <ol className="grid gap-4 sm:grid-cols-2">
        {WAYS.map((way, i) => (
          <li key={way.id}>
            <Link
              href={`/transitions/${way.id}/`}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-[transform,border-color] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            >
              <span className="font-mono text-sm text-brand">{i + 1}</span>
              <span className="mt-1 font-heading text-lg font-semibold">{way.name}</span>
              <span className="mt-1.5 text-sm text-pretty text-muted-foreground">{way.watch}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
