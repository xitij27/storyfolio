import type { Metadata } from "next";

import { GalleryPage } from "@/components/gallery/gallery-page";

// The gallery's first address, kept: the skill (references/concept.md, engine/README.md) and the repository's About link here.
export const metadata: Metadata = {
  title: "Gallery",
  description: "A made-up person's portfolio told on a sheet of paper, a map or a pop-up book, and every chapter of each.",
};

export default function Transitions() {
  return <GalleryPage />;
}
