import Link from "next/link";
import type { Metadata } from "next";
import { cv } from "@/content/cv";
import { PrintButton } from "@/content/print-button";
export const metadata:Metadata={title:"Dawit Bekele — CV",description:"Dawit Bekele’s printable HTML CV. Migration work, runbook ownership and ferry maintenance."};
export default function CV(){return <main className="utility-page"><nav className="utility-nav" aria-label="CV navigation"><Link prefetch={false} href="/">← Story</Link><Link prefetch={false} href="/#projects">Migration</Link><a href={`mailto:${cv.email}`}>Contact ↗</a></nav><article className="utility-main"><p className="utility-eyebrow">CURRICULUM VITAE</p><h1>{cv.name}</h1><p>{cv.focus}</p><p><a href={`mailto:${cv.email}`}>{cv.email}</a></p><div className="utility-links"><PrintButton/><a href="/dawit-bekele-cv.html" download>Download HTML CV ↓</a></div><noscript><p className="cv-screen-only">Use your browser’s Print command to print this CV.</p><style>{".print-button{display:none}"}</style></noscript>{cv.sections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}</article></main>;}
