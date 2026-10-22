import Link from "next/link";
import { Chapter,Beat,Kicker,Title,Body,Note } from "@/components/story/chapter";
import { Illustration } from "@/components/illustration";
import { Experience } from "@/content/experience";
import { MigrationControls } from "@/content/spine-controls";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
import { illustrations } from "@/content/illustrations";
import { works } from "@/content/work";
import { wording,wordingId,fixedOpening,fixedClosing } from "@/content/wording";
export default async function Home({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const words=wording[wordingId((await searchParams).words)];
 return <main><a className="story-skip" href="#contact">Skip to contact</a><Experience>
  {story.chapters.map(chapter=><Chapter key={chapter.id} id={chapter.id}>{chapter.beats.map((beat,i)=>{
   const text=copy.beats[beat.id],picture=illustrations[beat.id],work=works.find(w=>w.beat===beat.id);
   const intro=beat.id==="hello.intro",close=beat.id==="contact.close";
   const title=intro?words.opening.title:close?words.closing.title:text.title;
   const body=intro?words.opening.body:close?words.closing.body:text.body;
   return <Beat key={beat.id} story={story} id={beat.id} fallback={<Illustration name={picture.name} alt={picture.alt}/> }>
    {intro?<p className="story-kicker">{fixedOpening.kicker}</p>:<Kicker number={chapter.number}>{close?fixedClosing.kicker:chapter.id==="projects"?`SELECTED WORK / ${work?.label.toUpperCase()}`:chapter.name.toUpperCase()}</Kicker>}
    <Title as={intro?"h1":"h2"} id={i===0?`${chapter.id}-title`:`${beat.id.replaceAll(".","-")}-title`}>{title}</Title>
    {beat.id==="projects.migration"&&<p className="availability">99.98%</p>}
    {body&&<Body>{body}</Body>}
    {intro&&<><div className="runbook-proof"><strong>40 teams</strong><span>{fixedOpening.proof}</span></div><Note>{fixedOpening.plan}</Note><a className="text-link" href="#contact">{fixedOpening.contact}</a><details className="term-note"><summary>Cutover and rollback</summary><p>{fixedOpening.glossary}</p></details><Note sceneOnly>{fixedOpening.illustration}<br/>{fixedOpening.scroll}</Note></>}
    {beat.id==="career.library-lumen"&&<div className="career-line"><h3>Lumen Pay</h3><p>Card payment systems.</p></div>}
    {beat.id==="career.kestrel"&&<a className="text-link" href="#projects">Explore the work ↓</a>}
    {beat.id==="study.degree"&&<Link prefetch={false} className="text-link" href="/cv">Education and career in the CV ↗</Link>}
    {beat.id==="projects.migration"&&<><MigrationControls/><nav className="work-index" aria-label="Five pieces of work">{works.map(w=><a key={w.slug} href={`#${w.beat.replaceAll(".","-")}`}>{w.label}</a>)}</nav></>}
    {work&&<Link prefetch={false} className="text-link" href={`/work/${work.slug}`}>More about {work.slug==="talk"?"the talk":work.slug==="runbook"?"the runbook":work.slug==="migration"?"the migration":work.label.toLowerCase()} ↗</Link>}
    {close&&<><a className="contact-address" href={`mailto:${fixedClosing.email}`}>{fixedClosing.email} ↗</a><div className="cv-links"><Link prefetch={false} href="/cv">{fixedClosing.viewCV}</Link><a href="/dawit-bekele-cv.html" download>{fixedClosing.downloadCV}</a></div><Note>{fixedClosing.places}</Note><Note sceneOnly>{fixedClosing.illustration}</Note><a className="back-top" href="#hello">{fixedClosing.back}</a></>}
    {!intro&&!close&&<Note>{text.note}</Note>}
   </Beat>;
  })}</Chapter>)}
 </Experience></main>;
}
