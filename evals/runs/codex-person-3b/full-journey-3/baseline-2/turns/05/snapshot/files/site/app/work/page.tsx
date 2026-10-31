import type { Metadata } from "next";
import Link from "next/link";
import { workSlugs,workFor } from "@/content/work";
import { PageShell } from "@/components/work/page-shell";
export const metadata:Metadata={title:"Work — Dawit Bekele",description:"Six pieces of work: migration planning, databases, the runbook, on-call, ferry and a conference talk."};
export default function WorkIndex(){return <PageShell><div className="document-kicker">Work index</div><h1>Six pieces of work</h1><div className="work-index">{workSlugs.map((slug,i)=>{const work=workFor(slug)!;return <article key={slug}><span className="document-kicker">0{i+1} / {work.period}</span><h2><Link prefetch={false} href={`/work/${slug}`}>{work.title} ↗</Link></h2><p>{work.line}</p><p className="ownership">{work.role}</p></article>;})}</div></PageShell>}
