"use client";
import type { ReactNode } from "react";
import { Story } from "@/components/story/story";
import { bundle } from "./index";
export function Experience({ children }: { children: ReactNode }) {
  return <Story bundle={bundle}>{children}</Story>;
}
