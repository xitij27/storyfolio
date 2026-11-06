"use client";
/*
  Every world's picture for every chapter: chapters down, worlds across.
  On a phone one world shows at a time, chosen above the table; with no
  script all three show, one under another.
*/
import Link from "next/link";
import { useEffect, useState } from "react";

import { asset } from "@/content/sample";
import { PIECES, WORLDS, picture } from "@/components/transitions/pieces";
import type { WorldId } from "@/stitch/mix";
import { CHAPTERS } from "@/stitch/chapters";

export function ChapterTable() {
  const [show, setShow] = useState<WorldId | null>(null);
  useEffect(() => setShow("sheet"), []);

  return (
    <div className="ct" data-show={show ?? undefined}>
      {show ? (
        <div role="group" aria-label="World" className="ct-tabs mb-6 flex flex-wrap gap-2">
          {WORLDS.map((w) => (
            <button
              key={w.id}
              type="button"
              aria-pressed={show === w.id}
              onClick={() => setShow(w.id)}
              className="h-11 rounded-full border border-rule px-4 text-[15px] font-semibold whitespace-nowrap text-soft aria-pressed:border-transparent aria-pressed:bg-paper aria-pressed:text-on-signal"
            >
              {w.name}
            </button>
          ))}
        </div>
      ) : null}
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">Each world&apos;s picture for each chapter. Each opens that world&apos;s story at the chapter.</caption>
        <colgroup>
          <col className="ct-head-col" />
          {WORLDS.map((w) => <col key={w.id} data-world={w.id} />)}
        </colgroup>
        <thead>
          <tr>
            <td className="ct-corner" />
            {WORLDS.map((w) => (
              <th key={w.id} scope="col" data-world={w.id} className="pt-4 pb-4 pl-6 text-left font-display text-2xl font-semibold">
                {w.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CHAPTERS.map((c, i) => (
            <tr key={c.key} className="border-t border-rule">
              <th scope="row" className="py-6 pr-6 text-left align-top">
                <span className="block text-[15px] font-normal text-quiet tabular-nums">{i + 1}</span>
                <span className="mt-1 block font-display text-xl font-semibold">{c.title}</span>
              </th>
              {WORLDS.map((w) => (
                <td key={w.id} data-world={w.id} className="py-6 pl-6 align-top">
                  <Link href={`/transitions/whole/${w.id}/?c=${c.key}`} className="group block rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(picture(w.id, c.key))}
                      width={960}
                      height={600}
                      alt={`${w.name}, ${c.title}: ${PIECES[w.id][c.key]}`}
                      loading="lazy"
                      className="aspect-[8/5] w-full rounded-lg bg-raised object-cover"
                    />
                    <span className="mt-3 block text-[15px] text-soft group-hover:text-ink group-hover:underline group-hover:underline-offset-4">
                      <span className="ct-world font-semibold text-ink">{w.name}. </span>
                      {PIECES[w.id][c.key]}
                    </span>
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
