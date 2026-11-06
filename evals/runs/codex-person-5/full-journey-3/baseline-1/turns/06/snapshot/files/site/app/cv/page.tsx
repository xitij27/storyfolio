import type { Metadata } from "next";
import Link from "next/link";
import { cv, cvStyles } from "@/content/cv";

export const metadata: Metadata = {
  title: `${cv.name} · CV`,
  description: "Printable CV: migration planning, cutovers, reliability, open-source maintenance and speaking.",
};

export default function CVPage() {
  return (
    <main className="cv-page">
      <style>{cvStyles}</style>
      <nav className="cv-toolbar" aria-label="CV navigation">
        <Link href="/">Back to the story</Link>
        <a href="/cv/download" download="Dawit-Bekele-CV.html">Download HTML CV</a>
        <a href={`mailto:${cv.email}`}>Email Dawit</a>
        <p>Use your browser’s Print command to print this CV or save it as a PDF.</p>
      </nav>
      <article className="cv-document">
        <header>
          <h1>{cv.name}</h1>
          <p className="cv-focus">{cv.focus}</p>
          <p className="cv-contact">{cv.location} · <a href={`mailto:${cv.email}`}>{cv.email}</a></p>
          <p>{cv.summary}</p>
        </header>
        {cv.sections.map(section => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.entries.map(entry => (
              <div key={entry.title}>
                <h3>{entry.title}</h3>
                {entry.meta && <p className="cv-meta">{entry.meta}</p>}
                {entry.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
