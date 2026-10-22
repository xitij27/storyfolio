import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { works,workAt } from "@/content/work";
import { Illustration } from "@/components/illustration";
import { DetailModel } from "@/content/detail-controls";
export function generateStaticParams(){return works.map(work=>({slug:work.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const work=workAt((await params).slug);return work?{title:`${work.label} — Dawit Bekele`,description:work.description,openGraph:{title:`${work.label} — Dawit Bekele`,description:work.description,images:["/share-preview.png"]}}:{title:"Work not found — Dawit Bekele"};}
export default async function Work({params}:{params:Promise<{slug:string}>}){
 const work=workAt((await params).slug);if(!work)notFound();
 return <main className="utility-page"><nav className="utility-nav" aria-label="Work navigation"><Link prefetch={false} href={`/#${work.beat.replaceAll(".","-")}`}>← Back to the work</Link><Link prefetch={false} href="/#contact">Contact</Link><Link prefetch={false} href="/cv">CV ↗</Link></nav><article className="utility-main"><p className="utility-eyebrow">DAWIT BEKELE / {work.label.toUpperCase()}</p><h1>{work.title}</h1>{work.paragraphs.map(p=><p key={p}>{p}</p>)}
 {work.slug==="migration"?<DetailModel/>:<Illustration name={work.illustration} alt={work.alt} caption={work.caption}/>}
 {work.slug==="database-upgrade"&&<details className="database-cutaway"><summary>Enlarge the cutaway illustration</summary><Illustration name="database-cutaway" alt="An enlarged unversioned database cylinder showing its internal illustrative layers." caption="Illustration · layers inside a generic database cylinder"/></details>}
 <div className="utility-links"><Link prefetch={false} href={`/#${work.beat.replaceAll(".","-")}`}>Return to the story ↗</Link><a href="mailto:dawit@example.com">{work.slug==="talk"?"Contact me about a conference ↗":"Get in touch ↗"}</a></div><nav className="related-work" aria-label="Other work">{works.filter(w=>w.slug!==work.slug).map(w=><Link prefetch={false} key={w.slug} href={`/work/${w.slug}`}>{w.label} ↗</Link>)}</nav></article></main>;
}
