import type { Metadata } from "next";
import { person } from "@/content/person";

export const metadata: Metadata = { title: `${person.name}, CV` };

const years = (from: number, to: number | null) => `${Math.floor(from)} to ${to == null ? "now" : Math.floor(to)}`;

// A printable CV from the confirmed facts only. Print it, or save it as a PDF from the browser.
export default function CV() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px", fontFamily: "Georgia, serif", color: "#13202c", background: "#fff", lineHeight: 1.5 }}>
      <h1 style={{ marginBottom: 0 }}>{person.name}</h1>
      <p style={{ marginTop: 4 }}>{person.role}. {person.line} {person.contact.email}</p>
      <h2>Work</h2>
      {person.work.slice().reverse().map((w) => (
        <section key={w.org}><h3 style={{ marginBottom: 0 }}>{w.role}, {w.org}, {w.place}</h3><p style={{ marginTop: 2 }}>{years(w.from, w.to)}. {w.did}.</p></section>
      ))}
      <h2>Projects</h2>
      <ul>{person.projects.map((p) => <li key={p.title}><b>{p.title}</b> ({p.year}). {p.line}</li>)}</ul>
      <h2>Education</h2>
      {person.study.map((s) => <p key={s.degree}>{s.degree} in {s.field}, {s.place}, {s.from} to {s.to}. {s.note}.</p>)}
      <h2>Skills</h2>
      <ul>{person.skills.map((g) => <li key={g.group}><b>{g.group}</b>: {g.items.join(", ")}</li>)}</ul>
      <p><a href="/">Back to the site</a></p>
    </main>
  );
}
