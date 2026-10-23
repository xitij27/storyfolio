import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { CutoverControl } from "@/content/cutover-control";
import { Diagram } from "@/content/fallback";
import { OpeningWords, ClosingWords } from "@/content/bookends";
import { beatCopy, type BeatCopy } from "@/content/beat-copy";
import Link from "next/link";

export default function Home(){
 return <main id="main"><a href="#contact" className="story-skip">Skip to contact</a><Experience>
 <header className="site-header" data-story-top><a className="wordmark" href="#opening" aria-label="Dawit Bekele, back to introduction">DB<span> / Dawit Bekele</span></a><details className="mobile-nav"><summary>Chapters</summary><nav aria-label="Story chapters">{story.chapters.map(c=><a key={c.id} href={`#${c.id}`}>{c.name}</a>)}</nav></details><nav aria-label="Main navigation"><a href="#places">Background</a><a href="#practice">Practice</a><a href="#work">Work</a><a href="#contact">Contact</a><Link href="/cv">CV ↗</Link></nav></header>
 {story.chapters.map(chapter=><Chapter key={chapter.id} id={chapter.id}>{chapter.beats.map((beat,i)=>{
  if(beat.id==="opening.hello")return <Beat key={beat.id} story={story} id={beat.id} fallback={<Diagram kind="library"/>}><OpeningWords version="a"/></Beat>;
  if(beat.id==="contact.complete")return <Beat key={beat.id} story={story} id={beat.id} fallback={<Diagram kind="complete"/>}><ClosingWords version="a"/></Beat>;
  const words=beatCopy[beat.id as keyof typeof beatCopy] as BeatCopy;
  return <Beat key={beat.id} story={story} id={beat.id} anchor={words.anchor} fallback={beat.id==="career.lumen"?undefined:<Diagram kind={words.diagram}/>}>
   <Kicker number={chapter.number}>{words.kicker}</Kicker><Title as={i===0?"h2":"h3"} id={i===0?`${chapter.id}-title`:`${beat.id}-title`}>{words.title}</Title><Body>{words.body}</Body>
   {beat.id==="work.database"&&<CutoverControl/>}
   {words.note&&<Note>{words.note}</Note>}
   {words.project&&<Link className="text-link" href={`/work/${words.project}`}>Read the approach ↗</Link>}
   {beat.id==="study.logger"&&<Link className="text-link" href="/cv">Education and CV ↗</Link>}
   {beat.id==="work.waves"&&<nav className="project-index" aria-label="Selected work"><a href="#waves">Data-centre exit</a><a href="#database">Database</a><a href="#runbook">Runbook</a><a href="#oncall">On-call</a><a href="#ferry">ferry</a><a href="#talk">Talk</a></nav>}
   <p className="scene-key"><span>Illustration</span>{words.scene}</p>
  </Beat>;
 })}</Chapter>)}
 <footer className="site-footer"><span>Dawit Bekele / Rotterdam</span><a href="#opening">Back to the start ↑</a><a href="mailto:dawit@example.com">Get in touch ↗</a></footer>
 </Experience></main>;
}
