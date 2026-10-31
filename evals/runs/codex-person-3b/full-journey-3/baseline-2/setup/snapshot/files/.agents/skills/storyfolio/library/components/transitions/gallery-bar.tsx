"use client";
/* A whole example in the gallery: a bar to go back, switch person and hide the words, over the story itself. */
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { StitchedStory } from "@/stitch/react";
import { SAMPLE_PEOPLE } from "@/stitch/people";
import type { Mix } from "@/stitch/mix";
import { CHAPTERS } from "@/stitch/chapters";

export type PersonKey = keyof typeof SAMPLE_PEOPLE;
const KEYS = Object.keys(SAMPLE_PEOPLE) as PersonKey[];

export function usePersonKey(): PersonKey {
  const p = useSearchParams().get("p");
  return KEYS.includes(p as PersonKey) ? (p as PersonKey) : "noa";
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

export function GalleryBar({ title, how, showWords, onWords }: {
  title: string; how: string; showWords: boolean; onWords: (show: boolean) => void;
}) {
  const person = usePersonKey();
  const setQuery = useQuery();
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-gradient-to-b from-[#0c1015] via-[#0c1015e6] to-transparent px-4 pt-3 pb-6 text-[#ece6d9] sm:px-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/transitions/" className="text-sm text-[#9aa4ae] hover:text-[#ece6d9]">← Transitions</Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <b className="font-serif text-lg leading-tight">{title}</b>
          <span className="hidden text-xs text-[#9aa4ae] sm:block">{how}</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Person">
          <span className="mr-0.5 text-xs text-[#9aa4ae]">Person</span>
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={k === person}
              onClick={() => setQuery({ p: k })}
              className="rounded-full border border-[#ece6d924] px-3 py-1 text-[13px] font-semibold aria-pressed:bg-[#ece6d9] aria-pressed:text-[#11161c]"
            >
              {SAMPLE_PEOPLE[k].first}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={!showWords}
            onClick={() => onWords(!showWords)}
            className="rounded-full border border-[#ece6d924] px-3 py-1 text-[13px] font-semibold"
          >
            {showWords ? "Hide words" : "Show words"}
          </button>
        </div>
      </div>
    </header>
  );
}

/** The bar and the story. `?c=<chapter>` opens it at that chapter, as each piece's picture on the index does. */
export function GalleryStory({ title, how, mix }: { title: string; how: string; mix: Mix }) {
  const person = usePersonKey();
  const asked = useSearchParams().get("c");
  const start = CHAPTERS.find((c) => c.key === asked)?.key;
  const [showWords, setShowWords] = useState(true);
  return (
    <>
      <GalleryBar title={title} how={how} showWords={showWords} onWords={setShowWords} />
      <StitchedStory person={SAMPLE_PEOPLE[person]} mix={mix} showWords={showWords} start={start} />
    </>
  );
}
