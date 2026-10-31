import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CHAPTERS, PIECES, piece } from "@/catalogue";
import { Demo } from "@/components/demo";

export const dynamicParams = false;
export const generateStaticParams = () => PIECES.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = piece((await params).id);
  return { title: p?.name, description: p?.fits };
}

export default async function PiecePage({ params }: { params: Promise<{ id: string }> }) {
  const p = piece((await params).id);
  if (!p) notFound();
  const chapter = CHAPTERS.find((c) => c.id === p.chapter);

  return (
    <>
      <header className="mx-auto max-w-6xl px-page pt-10 pb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← All pieces
        </Link>
        <p className="mt-6 font-mono text-sm text-brand">{chapter?.name}</p>
        <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight sm:text-4xl">{p.name}</h1>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{p.fits}</p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          {/* min-w-0: a grid column will not shrink below the install command's width otherwise. */}
          <div className="min-w-0">
            <dt className="font-medium">Where it comes from</dt>
            <dd className="mt-1 text-muted-foreground">
              {p.originals
                ? "Written here from the idea of the original below; the original's code is not copied. To use the original, install it into your own site."
                : `The author's portfolio: ${p.from}.`}
              {p.originals?.map((o) => (
                <span key={o.name} className="mt-2 block">
                  <a href={o.url} className="text-brand underline-offset-4 hover:underline">
                    {o.provider}: {o.name}
                  </a>
                  <code className="mt-1 block overflow-x-auto rounded-md bg-muted px-2 py-1 font-mono text-xs whitespace-nowrap">{o.install}</code>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Files to copy</dt>
            <dd className="mt-1">
              <ul className="space-y-0.5 font-mono text-xs text-muted-foreground">
                {p.files.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {p.scroll ? <p className="mt-6 text-sm text-muted-foreground">This piece is a pinned section: scroll down through it.</p> : null}
      </header>
      <main className="border-t border-border/60">
        <Demo id={p.id} />
      </main>
    </>
  );
}
