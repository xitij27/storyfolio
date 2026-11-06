import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CHAPTERS, PIECES, piece } from "@/catalogue";
import { Demo } from "@/components/demo";
import { SiteNav } from "@/components/gallery/site-nav";

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
      <div className="gallery">
      <header className="mx-auto max-w-[1360px] px-page pb-10">
        <SiteNav current="pieces" />
        <nav aria-label="Breadcrumb" className="mt-8 text-[15px] text-quiet">
          <Link href="/pieces/" className="rounded-sm underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink">Pieces</Link>
          <span aria-hidden="true"> / </span>
          <span>{chapter?.name}</span>
        </nav>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">{p.name}</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-pretty text-soft">{p.fits}</p>
        <dl className="mt-8 grid gap-6 text-[15px] sm:grid-cols-2">
          {/* min-w-0: a grid column will not shrink below the install command's width otherwise. */}
          <div className="min-w-0">
            <dt className="font-semibold">Where it comes from</dt>
            <dd className="mt-1 text-soft">
              {p.originals
                ? "Written here from the idea of the original below; the original's code is not copied. To use the original, install it into your own site."
                : `The author's portfolio: ${p.from}.`}
              {p.originals?.map((o) => (
                <span key={o.name} className="mt-2 block">
                  <a href={o.url} className="rounded-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                    {o.provider}: {o.name}
                  </a>
                  <code className="mt-2 block overflow-x-auto rounded-md bg-raised px-3 py-2 font-mono text-[13px] whitespace-nowrap text-ink">{o.install}</code>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Files to copy</dt>
            <dd className="mt-1">
              <ul className="space-y-1 font-mono text-[13px] text-soft">
                {p.files.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {p.scroll ? <p className="mt-8 text-[15px] text-quiet">This piece is a pinned section: scroll down through it.</p> : null}
      </header>
      </div>
      <main className="border-t border-border/60">
        <Demo id={p.id} />
      </main>
    </>
  );
}
