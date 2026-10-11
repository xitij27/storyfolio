"use client";
import type { ReactNode } from "react";
import { Story } from "@/components/story/story";
import { bundle } from "./index";
export function Experience({ children }: { children: ReactNode }) {
  return <Story bundle={bundle}><div className="scene-clearance" data-story-top aria-hidden="true"/>{children}</Story>;
}
