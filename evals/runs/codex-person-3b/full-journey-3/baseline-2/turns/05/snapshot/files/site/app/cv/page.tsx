import type { Metadata } from "next";
import { person } from "@/content/person";
import { cvIntro,cvSections } from "@/content/cv";
import { PageShell } from "@/components/work/page-shell";
import { PrintButton } from "@/components/work/print-button";
export const metadata:Metadata={title:"CV — Dawit Bekele",description:"Dawit Bekele: experience, selected work and education. Printable HTML CV."};
export default function CV(){return <PageShell><div className="cv-actions"><PrintButton/><a href="/cv/download" download="dawit-bekele-cv.html">Download HTML CV ↓</a></div><article className="cv"><h1>{person.name}</h1><p className="document-lead">{person.role} · Rotterdam</p><a href={`mailto:${person.contact.email}`}>{person.contact.email}</a><p>{cvIntro}</p>{cvSections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.items.map(item=><article key={item.heading}><h3>{item.heading}</h3>{item.meta&&<p className="cv-meta">{item.meta}</p>}<p>{item.text}</p></article>)}</section>)}</article></PageShell>}
