"use client";
/* A whole example in the gallery: a bar to go back, switch person, choose the sheet's move and hide the words, over the story itself. */
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { StitchedStory } from "@/stitch/react";
import { SAMPLE_PEOPLE } from "@/stitch/people";
import type { Mix } from "@/stitch/mix";
import { CHAPTERS } from "@/stitch/chapters";
import { MOVES, parseMove, type Move } from "@/stitch/world";

export type PersonKey = keyof typeof SAMPLE_PEOPLE;
const KEYS = Object.keys(SAMPLE_PEOPLE) as PersonKey[];
/** A new site starts with the swing (the engine's content/site.ts), so the gallery does too. */
const FIRST_MOVE: Move = "swing";

export function usePersonKey(): PersonKey {
  const p = useSearchParams().get("p");
  return KEYS.includes(p as PersonKey) ? (p as PersonKey) : "noa";
}

export function useMove(): Move {
  return parseMove(useSearchParams().get("m")) ?? FIRST_MOVE;
}

/** Replaces some of the page's query, keeping the rest and the scroll. */
export function useQuery() {
  const router = useRouter(), path = usePathname(), params = useSearchParams();
  return (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) next.set(k, v);
    router.replace(`${path}?${next}`, { scroll: false });
  };
}

const pill =
  "h-8 rounded-full border border-bar-line px-2.5 text-[13px] font-semibold whitespace-nowrap text-bar-ink hover:border-bar-ink aria-pressed:border-transparent aria-pressed:bg-bar-ink aria-pressed:text-bar-on-ink sm:h-9 sm:px-3 sm:text-[14px]";

/** A labelled row of pills; on a phone the label is for screen readers only, to keep the bar to two rows. */
function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={label}>
      <span className="sr-only text-[14px] text-bar-muted sm:not-sr-only sm:mr-1">{label}</span>
      {children}
    </div>
  );
}

export function GalleryBar({ title, moves, showWords, onWords }: {
  title: string; moves: boolean; showWords: boolean; onWords: (show: boolean) => void;
}) {
  const person = usePersonKey();
  const move = useMove();
  const setQuery = useQuery();
  return (
    <header className="gallery-bar fixed inset-x-0 top-0 z-20 px-3 pt-3 pb-8 sm:px-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
        <Link href="/" className="rounded-sm text-[14px] text-bar-muted underline decoration-bar-line underline-offset-4 hover:text-bar-ink">Gallery</Link>
        <b className="min-w-0 flex-1 font-display text-lg leading-tight font-semibold">{title}</b>
        <button type="button" aria-pressed={!showWords} onClick={() => onWords(!showWords)} className={`${pill} sm:order-last`}>
          {showWords ? "Hide words" : "Show words"}
        </button>
        <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 sm:w-auto sm:gap-x-5">
          <Group label="Person">
            {KEYS.map((k) => (
              <button key={k} type="button" aria-pressed={k === person} onClick={() => setQuery({ p: k })} className={pill}>
                {SAMPLE_PEOPLE[k].first}
              </button>
            ))}
          </Group>
          {moves ? (
            <Group label="Move">
              {MOVES.map((m) => (
                <button key={m} type="button" aria-pressed={m === move} onClick={() => setQuery({ m })} className={`${pill} capitalize`}>
                  {m}
                </button>
              ))}
            </Group>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/** The bar and the story. `?c=<chapter>` opens it at that chapter, as each piece's picture on the index does; `?m=` picks the sheet's move. */
export function GalleryStory({ title, mix }: { title: string; mix: Mix }) {
  const person = usePersonKey();
  const move = useMove();
  const asked = useSearchParams().get("c");
  const start = CHAPTERS.find((c) => c.key === asked)?.key;
  const [showWords, setShowWords] = useState(true);
  const moves = Object.values(mix).includes("sheet");
  return (
    <>
      <GalleryBar title={title} moves={moves} showWords={showWords} onWords={setShowWords} />
      <StitchedStory person={SAMPLE_PEOPLE[person]} mix={mix} showWords={showWords} start={start} move={moves ? move : undefined} topbar={false} />
    </>
  );
}
