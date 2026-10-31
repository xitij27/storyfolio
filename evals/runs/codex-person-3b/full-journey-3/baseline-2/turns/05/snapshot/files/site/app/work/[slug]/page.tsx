import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workSlugs, workFor } from "@/content/work";
import { PageShell } from "@/components/work/page-shell";
import { WorkDiagram } from "@/components/work/diagram";
import { FerryModel } from "@/components/work/ferry-model";
export const dynamicParams = false;
export function generateStaticParams(){return workSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const work=workFor((await params).slug);
  return {title:work?`${work.title} — Dawit Bekele`:"Work not found — Dawit Bekele",description:work?.line,
    openGraph:work?{title:`${work.title} — Dawit Bekele`,description:work.line}:undefined};
}
export default async function WorkPage({params}:{params:Promise<{slug:string}>}){
  const work=workFor((await params).slug);if(!work)notFound();
  const next=workSlugs[(workSlugs.indexOf(work.slug)+1)%workSlugs.length],nextWork=workFor(next)!;
  return <PageShell><article className="work-article"><div className="document-kicker">Work / {work.period}</div><h1>{work.title}</h1><p className="document-lead">{work.line}</p><p className="ownership">{work.role}</p>
    <div className="work-tags">{work.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    {work.sections.map(section=><section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    {work.slug==="ferry"?<FerryModel/>:<WorkDiagram slug={work.slug}/>}
    <nav className="document-next" aria-label="More work"><Link prefetch={false} href="/work">← All six work items</Link><Link prefetch={false} href={`/work/${next}`}>{nextWork.title} →</Link></nav>
  </article></PageShell>;
}
