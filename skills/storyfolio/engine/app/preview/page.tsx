import type { Metadata } from "next";
import { Suspense } from "react";
import { Preview } from "./preview";

export const metadata: Metadata = { title: "Preview" };

// The person's story stitched from the worlds in content/mix.ts. ?mix= tries
// another mix, ?look= another look and ?person=noa or amara a sample person,
// without editing.
export default function PreviewPage() {
  return <Suspense><Preview /></Suspense>;
}
