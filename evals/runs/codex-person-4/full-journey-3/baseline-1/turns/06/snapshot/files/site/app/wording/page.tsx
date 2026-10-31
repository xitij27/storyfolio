import Link from "next/link";
import type { Metadata } from "next";
import { person } from "@/content/person";
import { wording } from "@/content/wording";
export const metadata: Metadata = { title: "Wording review — Dawit Bekele", robots: { index: false, follow: false } };
export default function WordingReview() {
  return <main className="wording-review">
    <Link href="/">← Back to the story</Link>
    <p className="review-kicker">Dawit Bekele · wording review</p>
    <h1>The selected opening and close.</h1>
    <p>Version 1 is selected for both the opening and close. These complete beats preserve the surrounding fixed text; the other versions remain here for comparison.</p>
    <div className="wording-grid">{Object.entries(wording).map(([id, words]) => <section className="wording-option" key={id}>
      <h2>Version {id}{id === "1" ? " · selected" : ""}</h2>
      <p><Link href={`/preview?words=${id}`}>Scroll this version →</Link></p>
      <h3>Opening</h3>
      <p className="review-fixed">Dawit Bekele · Work · Contact · CV · Read text</p>
      <div className="review-scene"><p>Hello, I’m</p><strong>{person.name}</strong><p>{person.role}</p><p>{person.line}</p><small>Rotterdam, now</small></div>
      <div className="review-caption"><span>01 · Hello</span><p>{words.hello}</p><p className="review-proof">310 services · 14 waves · 26 months.<br />Order API availability: 99.98% over those 26 months.</p></div>
      <h3>Close</h3>
      <p className="review-fixed">Dawit Bekele · Work · Contact · CV · Read text</p>
      <div className="review-scene"><p>Get in touch</p><strong>Write to Dawit</strong><p>{person.contact.email}</p><p>{person.seeking}.</p></div>
      <div className="review-caption"><span>07 · Get in touch</span><p>{words.contact}</p><div className="review-controls"><a href={`mailto:${person.contact.email}`}>Email Dawit</a><Link href="/cv">Printable CV</Link></div></div>
    </section>)}</div>
  </main>;
}
