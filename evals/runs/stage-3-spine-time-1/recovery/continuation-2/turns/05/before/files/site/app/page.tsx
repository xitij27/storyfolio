import Link from "next/link";
import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { SiteHeader, SiteFooter, ContactLinks } from "@/components/site/navigation";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";

export default function Home() {
  return <main className="firmware-site">
    <a className="story-skip" href="#record">Skip to evidence and contact</a>
    <SiteHeader />
    <div className="look-study"><span>LOCAL LOOK COMPARISON</span><span>Opening · Access · Record</span><Link href="/concepts">Concept archive <span aria-hidden="true">↗</span></Link></div>
    <Experience>
      {story.chapters.map((chapter, chapterIndex) => <Chapter key={chapter.id} id={chapter.id}>
        {chapter.beats.map((beat, beatIndex) => {
          const words = copy.beats[beat.id];
          return <Beat key={beat.id} story={story} id={beat.id} fallback={beat.id === "access.relationship" ?
            // eslint-disable-next-line @next/next/no-img-element
            <figure><img src="/assets/bring-up-fixture.svg" width="720" height="500" alt="Teaching schematic linking firmware command, a generic board, fixture access and bench observation. No actual wiring or test result." /><figcaption>Explanatory schematic · supplied local drawing, not original wiring or a photograph.</figcaption></figure> : undefined}>
            <Kicker number={chapter.number}>{chapter.name}</Kicker>
            {beat.id === "prepare.assemble" && <p className="person-label">Ada Mensah / Embedded firmware</p>}
            <Title as={chapterIndex === 0 && beatIndex === 0 ? "h1" : "h2"} id={beatIndex === 0 ? `${chapter.id}-title` : `${beat.id}-title`}>{words.title}</Title>
            <Body>{words.body}</Body>
            {beat.id === "prepare.assemble" && <><p className="story-question">How does a firmware decision become something you can check?</p><div className="opening-links"><a href="#access">Inspect the fixture <span aria-hidden="true">↓</span></a><a href="#record">Evidence & contact</a><a href="/cv.html" download="Ada-Mensah-CV.html">Download HTML CV</a></div></>}
            {beat.id === "prepare.responsibility" && <div className="responsibility-key"><span>My work <strong>Firmware · states · fixture</strong></span><span>Colleague’s work <strong>PCB · analogue front end</strong></span></div>}
            {beat.id === "access.relationship" && <><p className="relationship-key"><span>Command</span><span aria-hidden="true">→</span><span>Fixture access</span><span aria-hidden="true">→</span><span>Observation</span></p><a className="text-link" href="/assets/bring-up-fixture.svg">Open teaching schematic <span aria-hidden="true">↗</span></a></>}
            {beat.id === "access.mosslink" && <Link className="project-link" href="/projects/mosslink">Mosslink / project detail <span aria-hidden="true">↗</span></Link>}
            {beat.id === "record.battery" && <dl className="evidence-pair"><div><dt>Projection</dt><dd>Two years</dd></div><div><dt>Longest run</dt><dd>72 hours</dd></div></dl>}
            <Note>{words.note}</Note>
            {beat.id === "record.close" && <><ContactLinks /><Link className="text-link" href="/projects/mosslink">Read the Mosslink project</Link><a className="return-link" href="#prepare">Back to the start ↑</a></>}
          </Beat>;
        })}
      </Chapter>)}
    </Experience>
    <SiteFooter />
  </main>;
}
