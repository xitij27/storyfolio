import type { Metadata } from "next";
import Link from "next/link";
import { cvBody, cvStyles } from "@/lib/cv";
import { PrintButton } from "./print-button";
export const metadata: Metadata = { title: "Dawit Bekele — CV" };
export default function CV() {
  return <main className="document-page">
    <style>{cvStyles}</style>
    <nav className="cv-actions document-nav" aria-label="CV actions"><Link href="/">Back to story</Link><PrintButton /><a href="/cv/download" download="dawit-bekele-cv.html">Download HTML CV</a></nav>
    <div className="cv" dangerouslySetInnerHTML={{__html:cvBody()}} />
  </main>;
}
