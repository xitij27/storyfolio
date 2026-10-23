"use client";

import { useRef } from "react";
import type { Group } from "three";
import { Figure } from "@/components/story/figure";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { Pen } from "@/components/story/pen";
import type { ExtraProps } from "@/components/story/types";
import { beatIndex, chapterPresence } from "@/lib/story/story";
import { dwellAt } from "@/lib/story/timeline";
import { SHEET, story } from "./story";
import * as figures from "./figures";

// Each chapter's sheet grows on the board as the reader arrives and shrinks as they leave.
function sheet(chapter: string, draw: (pen: Pen, value: number) => void) {
  const beat = beatIndex(story, `${chapter}.one`);
  return function Sheet({ frameRef, look }: ExtraProps) {
    const group = useRef<Group>(null);
    useExtraFrame(() => {
      group.current?.scale.setScalar(Math.max(0.001, chapterPresence(story, chapter, frameRef.current.beat)));
    });
    return <group ref={group} position={[0, 0, 0.05]}>
      <Figure look={look} draw={draw} progress={() => dwellAt(frameRef.current, beat)} width={SHEET[0]} height={SHEET[1]} />
    </group>;
  };
}

export const Where = sheet("where", figures.where);
export const When = sheet("when", figures.when);
export const Runbook = sheet("runbook", figures.runbook);
export const Database = sheet("database", figures.database);
export const Oncall = sheet("oncall", figures.oncall);
