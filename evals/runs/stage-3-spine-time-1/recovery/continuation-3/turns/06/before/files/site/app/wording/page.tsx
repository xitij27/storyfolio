import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, ContactLinks, SiteFooter } from "@/components/site/navigation";
import { wordingContext, wordingVersions } from "@/content/wording";
export const metadata: Metadata = { title: "Opening and closing wording | Ada Mensah", description: "Local review of three complete opening beats and three complete closing beats. Wording selection is pending." };
export default function WordingReview() {
  return <><SiteHeader /><main className="article-page wording-page">
    <p className="eyebrow">LOCAL REVIEW / WORDING NOT SETTLED</p><h1>First words.<br />Last words.</h1>
    <p className="article-lead">Three complete versions of each beat. The story currently shows provisional A. No final wording choice has been recorded.</p>
    <p>I recommend <strong>A for both</strong>: it starts with your concrete contribution and closes on your stated lesson. You can mix an opening and closing, or supply your own wording.</p>
    <nav className="article-nav" aria-label="Wording versions">{wordingVersions.map(v => <a key={v.id} href={`#version-${v.id}`}>Version {v.id}{v.recommended ? " · recommended" : ""}</a>)}<Link href="/">Read the whole story ↗</Link></nav>
    <p className="article-note">Each version includes the fixed context and actions it would appear with. The fixture’s explanatory role labels stay unchanged. Main navigation remains Story, Mosslink, CV and Email; footer links remain Mosslink, Download CV and Email.</p>
    {wordingVersions.map(v => <section key={v.id} id={`version-${v.id}`} aria-labelledby={`version-${v.id}-title`} className="wording-version">
      <p className="eyebrow">VERSION {v.id}{v.recommended ? " / RECOMMENDED" : ""}</p><h2 id={`version-${v.id}-title`}>{v.name}</h2>
      <article className="wording-beat" aria-labelledby={`opening-${v.id}`}><p className="wording-label">COMPLETE OPENING {v.id}</p><p className="story-kicker">1 / Prepare</p><p className="person-label">{wordingContext.person}</p><h3 id={`opening-${v.id}`}>{v.opening.title}</h3><p>{v.opening.body}</p><p className="wording-question">{wordingContext.question}</p><div className="opening-links"><Link href="/#access">Inspect the fixture ↓</Link><Link href="/#record">Evidence & contact</Link><a href="/cv.html" download="Ada-Mensah-CV.html">Download HTML CV</a></div><p className="wording-note">{wordingContext.openingNote}</p></article>
      <article className="wording-beat" aria-labelledby={`closing-${v.id}`}><p className="wording-label">COMPLETE CLOSING {v.id}</p><p className="story-kicker">5 / Record</p><h3 id={`closing-${v.id}`}>{v.closing.title}</h3><p>{v.closing.body}</p><p className="wording-note">{wordingContext.closingNote}</p><ContactLinks /><Link className="text-link" href="/projects/mosslink">Read the Mosslink project</Link><Link className="return-link" href="/#prepare">Back to the start ↑</Link></article>
    </section>)}
  </main><SiteFooter /></>;
}
