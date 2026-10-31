import Link from "next/link";
import type { CSSProperties } from "react";
import { StitchedStory } from "@/stitch/react";
import { LOOKS, uiColours, type LookId } from "@/stitch/look";
import type { ChapterKey } from "@/stitch/chapters";
import type { Mix } from "@/stitch/mix";
import { person } from "@/content/person";
import { mix as acceptedMix } from "@/content/mix";
import { site } from "@/content/site";
import { LookSwitcher } from "./look-switcher";

export function Portfolio({ look = site.look, mix = acceptedMix, preview = false, query = "", textOnly = false, words = site.words }: {
  look?: LookId; mix?: Mix; preview?: boolean; query?: string; textOnly?: boolean; words?: Partial<Record<ChapterKey,string>>;
}) {
  const palette = LOOKS[look], ui = uiColours(palette);
  const style = { "--portfolio-bg": palette.bg, "--portfolio-ink": ui.text, "--portfolio-soft": ui.soft,
    "--portfolio-glass": ui.glass, "--portfolio-line": ui.line, "--portfolio-accent": palette.amber } as CSSProperties;
  const params = new URLSearchParams(query);
  params.set("look", look);
  if (textOnly) params.delete("view"); else params.set("view", "text");
  return <main className={`portfolio${preview ? " is-preview" : ""}${textOnly ? " is-text" : ""}`} data-look={look} style={style}>
    <a className="skip-link" href="#hello" data-chapter-link="hello">Skip to story</a>
    <header className="portfolio-header">
      <Link prefetch={false} className="brand" href="/">Dawit Bekele<span>Staff Platform Engineer</span></Link>
      <nav aria-label="Main navigation">
        <a href="#made" data-chapter-link="made">Work</a>
        <Link prefetch={false} href="/cv">CV</Link>
        <Link prefetch={false} href={`/preview?${params}`} scroll={true}>{textOnly ? "3D story" : "Text view"}</Link>
        <a href="#contact" data-chapter-link="contact">Contact</a>
        <a className="email-link" href="mailto:dawit@example.com">Email Dawit ↗</a>
      </nav>
    </header>
    {preview && <LookSwitcher look={look} query={query} />}
    <aside className="portfolio-proof" aria-label="Migration programme result"><small>Kestrel Freight · programme result</small><b>310 services · 14 waves · 26 months</b><span>99.98% Order API availability over those 26 months</span></aside>
    <div className="illustration-label">Illustrations · no internal documents</div>
    <StitchedStory person={person} mix={mix} look={look} words={words} cv={site.cv} textOnly={textOnly} />
  </main>;
}
