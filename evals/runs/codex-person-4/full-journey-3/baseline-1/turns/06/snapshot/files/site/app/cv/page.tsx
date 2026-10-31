import type { Metadata } from "next";
import Link from "next/link";
import { cvBody, cvStyles } from "@/content/cv";
import { PrintButton } from "@/components/cv/print-button";
export const metadata: Metadata = { title: "Dawit Bekele — CV", description: "Dawit Bekele: migration experience, reliability work, education and speaking." };
export default function CvPage() {
  return <>
    <style>{cvStyles}</style>
    <nav className="cv-actions" aria-label="CV actions"><Link href="/">Back to the story</Link><PrintButton /><a href="/downloads/dawit-bekele-cv.html" download="dawit-bekele-cv.html">Download HTML CV</a></nav>
    <main className="cv-document" dangerouslySetInnerHTML={{ __html: cvBody() }} />
  </>;
}
