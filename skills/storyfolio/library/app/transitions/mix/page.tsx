import type { Metadata } from "next";
import { Suspense } from "react";

import { Mixer } from "@/components/transitions/mixer";

export const metadata: Metadata = {
  title: "Mix your own · Transitions",
  description: "Choose the sheet, the map or the book for each chapter, see it moving, and copy the line that says the mix.",
};

export default function MixPage() {
  return <Suspense><Mixer /></Suspense>;
}
