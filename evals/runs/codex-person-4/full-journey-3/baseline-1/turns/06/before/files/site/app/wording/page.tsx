import Link from "next/link";
import type { Metadata } from "next";
import { person } from "@/content/person";
import { wording } from "@/content/wording";
export const metadata: Metadata = { title: "Wording review — Dawit Bekele", robots: { index: false, follow: false } };
export default function WordingReview() {
  return <main className="wording-review">
    <Link href="/">← Back to the story</Link>
    <p className="review-kicker">Dawit Bekele · wording review</p>
    <h1>Choose the opening and the close.</h1>
    <p>Each version shows the whole beat, including the fixed text around it. I recommend version 1. You can mix an opening and a close, keep the current wording, or write your own.</p>
    <div className="wording-grid">{Object.entries(wording).map(([id, words]) => <section className="wording-option" key={id}>
      <h2>Version {id}{id === "1" ? " · recommended" : ""}</h2>
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
