import type { Metadata } from "next";
import Link from "next/link";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Template",
  description: "A whole portfolio page made from the library's sections, with a made-up person.",
};

/** The author's V2 portfolio, section by section, ready to fill with a person's own content/sample.ts. */
export default function Template() {
  return (
    <>
      <Link href="/" className="fixed top-3 left-3 z-50 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs backdrop-blur hover:bg-muted">
        ← Library
      </Link>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
