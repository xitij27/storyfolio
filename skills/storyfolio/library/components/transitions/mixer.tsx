"use client";
/* The mixer: a world for each chapter, and the one line that says the whole mix, to send to the agent building a site. */
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CHAPTERS } from "@/stitch/chapters";
import { WHOLE, WORLDS, formatMix, parseMix, type Mix, type WorldId } from "@/stitch/mix";
import { GalleryStory, useQuery } from "./gallery-bar";
import { SHORT, worldName } from "./pieces";

const DOT: Record<WorldId, string> = { sheet: "bg-[#f2ede2]", map: "bg-[#3fa796]", book: "bg-[#e9a23b]" };
const LABEL: Record<WorldId, string> = { sheet: "Sheet", map: "Map", book: "Book" };
const next = (w: WorldId): WorldId => WORLDS[(WORLDS.indexOf(w) + 1) % WORLDS.length];

export function Mixer() {
  const mix: Mix = parseMix(useSearchParams().get("m") ?? "") ?? WHOLE.sheet;
  const setQuery = useQuery();
  const line = formatMix(mix);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(line); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); }
  };
  return (
    <GalleryStory title="Mix your own" how="Choose a world for each chapter. Each button turns to the next world." mix={mix}>
      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:flex sm:flex-wrap" role="group" aria-label="A world for each chapter">
        {CHAPTERS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setQuery({ m: formatMix({ ...mix, [c.key]: next(mix[c.key]) }) })}
            aria-label={`${c.title}: ${worldName(mix[c.key])}. Change`}
            className="flex min-w-0 flex-col items-start rounded-lg border border-[#ece6d924] bg-[#ffffff08] px-2 py-1 text-left hover:border-[#e9a23b80]"
          >
            <span className="truncate text-[11px] text-[#9aa4ae]">{SHORT[c.key]}</span>
            <span className="flex items-center gap-1 text-[13px] font-semibold">
              <i className={`inline-block size-2 rounded-full ${DOT[mix[c.key]]}`} />
              {LABEL[mix[c.key]]}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
        <span>Your mix: <code className="rounded bg-[#ffffff12] px-1.5 py-0.5 text-[12px] break-all">{line}</code></span>
        <button type="button" onClick={copy} className="rounded-full bg-[#e9a23b] px-3 py-1 text-[12px] font-semibold text-[#11161c]">
          {copied ? "Copied" : "Copy"}
        </button>
        <span className="text-[12px] text-[#9aa4ae]">Send this line to the agent building your site, with anything you would change.</span>
      </div>
    </GalleryStory>
  );
}
