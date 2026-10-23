import Link from "next/link";

import { CHAPTERS, PIECES } from "@/catalogue";

export default function Index() {
  return (
    <main className="mx-auto max-w-6xl px-page pb-24">
      <header className="py-20 sm:py-28">
        <p className="font-mono text-sm text-brand">Storyfolio library</p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          Pieces for a portfolio, <span className="text-gradient">running</span>, by the chapter they tell.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Open one to see it working, then copy its files. Some come from a real portfolio; others are written here from
          ideas in React Bits and Aceternity UI, and name the original so you can install that instead. The person on every
          page is made up.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/transitions/" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/85">
            Transitions study
          </Link>
          <Link href="/template/" className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium hover:bg-muted">
            See a whole page made of them
          </Link>
          <a href="https://github.com/xitij27/storyfolio/tree/main/skills/storyfolio/library" className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium hover:bg-muted">
            Source on GitHub
          </a>
        </div>
      </header>

      {CHAPTERS.map((chapter) => (
        <section key={chapter.id} aria-labelledby={chapter.id} className="border-t border-border/60 py-12">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id={chapter.id} className="font-heading text-2xl font-bold">{chapter.name}</h2>
            <p className="text-sm text-muted-foreground">{chapter.says}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PIECES.filter((p) => p.chapter === chapter.id).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/p/${p.id}/`}
                  className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-[transform,border-color] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                >
                  <span className="font-heading text-lg font-semibold">{p.name}</span>
                  <span className="mt-1.5 text-sm text-pretty text-muted-foreground">{p.fits}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-4 text-xs">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{p.from}</span>
                    {p.originals?.map((o) => (
                      <span key={o.name} className="rounded-full bg-brand/10 px-2 py-0.5 text-brand">
                        idea: {o.provider}
                      </span>
                    ))}
                    {p.scroll ? <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">scroll</span> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
