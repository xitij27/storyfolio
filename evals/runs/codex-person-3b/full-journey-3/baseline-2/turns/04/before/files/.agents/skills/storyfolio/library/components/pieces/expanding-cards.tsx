"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

import { GithubIcon } from "@/components/ui/brand-icons";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type CardSlide = { type: "node"; node: ReactNode } | { type: "image"; src: string; alt?: string };
export type CardLink = { label: string; href: string; kind: "github" | "external" };
export type ExpandingCard = {
  id: string;
  title: string;
  description: string;
  /** Shown in the window, first to last. A card with none shows its title on its colour. */
  slides: CardSlide[];
  categoryLabel: string;
  /** Tailwind gradient stops, "from-indigo-500 to-violet-500". */
  accentClassName: string;
  highlights: string[];
  tags: string[];
  links: CardLink[];
  featured?: boolean;
};
export type CardLabels = { close: string; previous: string; next: string; featured: string };

/**
 * A grid of project cards; one opens into a window with its pictures, what
 * it is, what it was built with and where its code is. The idea of
 * Aceternity's Expandable Card, written here from scratch on the browser's
 * own modal dialog, which keeps focus inside and hands it back on close.
 */
export function ExpandingCards({ cards, labels }: { cards: ExpandingCard[]; labels: CardLabels }) {
  const [open, setOpen] = useState<ExpandingCard | null>(null);
  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const picture = card.slides.find((s) => s.type === "image");
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => setOpen(card)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-left shadow-sm transition-[transform,box-shadow] duration-200 ease-out-quint outline-none hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Cover card={card} picture={picture?.type === "image" ? picture.src : undefined} small />
                <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    {card.categoryLabel}
                    {card.featured ? <span className="rounded-full bg-brand/10 px-2 py-0.5 text-brand">{labels.featured}</span> : null}
                  </span>
                  <span className="mt-1.5 font-heading text-lg font-semibold">{card.title}</span>
                  <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">{card.description}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {card.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {open ? <CardWindow card={open} labels={labels} onClose={() => setOpen(null)} /> : null}
    </>
  );
}

function Cover({ card, picture, small }: { card: ExpandingCard; picture?: string; small?: boolean }) {
  return picture ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={picture} alt="" className={cn("w-full object-cover", small ? "aspect-[16/9]" : "h-full")} />
  ) : (
    <span className={cn("grid w-full place-items-center bg-gradient-to-br p-6 text-center font-heading font-bold text-white", card.accentClassName, small ? "aspect-[16/9] text-xl" : "h-full text-3xl")}>
      {card.title}
    </span>
  );
}

/** One card's window. Rendered while open; `onClose` runs when it is dismissed in any way. */
export function CardWindow({ card, labels, onClose }: { card: ExpandingCard; labels: CardLabels; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const slides = card.slides;
  const current = slides[slide];

  useEffect(() => {
    dialog.current?.showModal();
    // Keep the page behind from scrolling while the window is up.
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={`${card.id}-title`}
      onClose={onClose}
      // A click on the backdrop lands on the dialog itself, outside the panel.
      onClick={(event) => event.target === dialog.current && dialog.current?.close()}
      className="m-auto max-h-[92dvh] w-[min(42rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/55 backdrop:backdrop-blur-sm"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="relative max-h-[92dvh] overflow-y-auto rounded-2xl border border-border/60 bg-card shadow-2xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted">
          {current?.type === "node" ? current.node : <Cover card={card} picture={current?.type === "image" ? current.src : undefined} />}
          {slides.length > 1 ? (
            <>
              <button type="button" aria-label={labels.previous} onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} className="absolute top-1/2 left-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 shadow">
                <ChevronLeft className="size-4" />
              </button>
              <button type="button" aria-label={labels.next} onClick={() => setSlide((slide + 1) % slides.length)} className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-background/80 shadow">
                <ChevronRight className="size-4" />
              </button>
              <div aria-hidden className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                  <span key={i} className={cn("size-1.5 rounded-full", i === slide ? "bg-foreground" : "bg-foreground/30")} />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="p-6">
          <p className="text-xs font-medium text-muted-foreground">{card.categoryLabel}</p>
          <h2 id={`${card.id}-title`} className="mt-1 font-heading text-2xl font-bold">{card.title}</h2>
          <p className="mt-3 text-pretty text-muted-foreground">{card.description}</p>
          {card.highlights.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {card.highlights.map((h) => (
                <li key={h} className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs text-brand">{h}</li>
              ))}
            </ul>
          ) : null}
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <li key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</li>
            ))}
          </ul>
          {card.links.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {card.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted">
                  {link.kind === "github" ? <GithubIcon className="size-4" /> : <ExternalLink className="size-4" />}
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <button type="button" aria-label={labels.close} onClick={() => dialog.current?.close()} className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/85 shadow outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <X className="size-4" />
        </button>
      </motion.div>
    </dialog>
  );
}
