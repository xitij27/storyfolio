import Link from "next/link";
import { StitchedStory } from "@/stitch/react";
import { person } from "@/content/person";
import { mix } from "@/content/mix";
import { site } from "@/content/site";

export default function Home() {
  return <main>
    <header className="concept-header"><Link href="/">Dawit Bekele<span>Staff Platform Engineer</span></Link><a href="mailto:dawit@example.com">Discuss a migration or talk ↗</a></header>
    <aside className="concept-proof">310 services · 14 waves · 26 months<br />99.98% Order API availability over the programme</aside>
    <div className="illustration-label">Illustrations · no internal documents</div>
    <StitchedStory person={person} mix={mix} look={site.look} words={site.words} cv={site.cv} />
  </main>;
}
