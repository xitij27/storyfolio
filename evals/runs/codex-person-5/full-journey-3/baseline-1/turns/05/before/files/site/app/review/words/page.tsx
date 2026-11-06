import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/content/person";
import { yearText } from "@/stitch/chapters";
import { openingVersions, closingVersions } from "@/content/wording";
import "./words.css";

export const metadata: Metadata = {
  title: `Wording review · ${person.name}`,
  robots: { index: false, follow: false },
};

function FixedHeader() {
  return <div className="wording-header"><strong>{person.name}</strong><span>Work · Contact · CV</span></div>;
}

function OpeningSheet() {
  const sections = [
    ["Places", [person.places.map(p => p.name).join(" > ")]],
    ["Education", person.study.map(s => `${s.degree}, ${s.field}. ${s.place}, ${s.from} to ${s.to}`)],
    ["Experience", person.work.map(w => `${w.role}, ${w.org}, ${w.place}. ${yearText(w)}`)],
    ["Skills", person.skills.map(s => `${s.group}: ${s.items.join(", ")}`)],
    ["Projects", [person.projects.map(p => p.title).join(", ")]],
    ["Contact", [person.contact.email]],
  ] as const;
  return <div className="wording-sheet">
    <h4>{person.name}</h4><p className="wording-role">{person.role}</p><p>{person.line}</p>
    <dl className="wording-sheet-facts">{sections.map(([title, rows]) => <div key={title}><dt>{title}</dt><dd>{rows.map(row => <p key={row}>{row}</p>)}</dd></div>)}</dl>
  </div>;
}

export default function WordingReview() {
  return (
    <main className="wording-review">
      <header className="wording-intro">
        <Link href="/">Back to the site</Link>
        <h1>Opening and closing words</h1>
        <p>Choose one opening and one closing. A + A is my recommendation: it explains the work, gives evidence and makes the next step clear. You can mix versions or supply your own words.</p>
        <p>Each version below includes the surrounding fixed text. The live site keeps its draft wording until you choose.</p>
        <nav aria-label="Review sections"><a href="#openings">Openings</a><a href="#closings">Closings</a><Link href="/cv">Read the CV</Link></nav>
      </header>
      <section id="openings" aria-labelledby="openings-title">
        <h2 id="openings-title">Three complete opening beats</h2>
        <div className="wording-grid">
          {openingVersions.map(version => (
            <article className="wording-option" key={version.id}>
              <h3>Opening {version.id}: {version.label}</h3>
              {version.recommended && <p className="wording-recommendation">Recommended</p>}
              <div className="wording-beat">
                <FixedHeader />
                <OpeningSheet />
                <div className="wording-caption"><span>01</span><h4>Hello</h4><p>{version.text}</p></div>
                <p className="wording-scroll">Scroll · Chapter navigation</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="closings" aria-labelledby="closings-title">
        <h2 id="closings-title">Three complete closing beats</h2>
        <div className="wording-grid">
          {closingVersions.map(version => (
            <article className="wording-option" key={version.id}>
              <h3>Closing {version.id}: {version.label}</h3>
              {version.recommended && <p className="wording-recommendation">Recommended</p>}
              <div className="wording-beat">
                <FixedHeader />
                <div className="wording-sheet">
                  <p className="wording-role">Get in touch</p>
                  <h4>Write to {person.first}</h4>
                  <p>{person.contact.email}</p>
                  <p>{person.seeking}.</p>
                  <p className="wording-sheet-note">This sheet is Dawit’s CV. It folded into every picture above.</p>
                </div>
                <div className="wording-caption"><span>07</span><h4>Get in touch</h4><p>{version.text}</p>
                  <div className="wording-actions"><a href={`mailto:${person.contact.email}`}>Email Dawit</a><Link href="/cv">CV</Link></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
