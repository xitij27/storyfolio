import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
const contact = <div className="contact-links"><a href="mailto:ada@example.com">Email Ada <span aria-hidden="true">↗</span></a><a href="/ada-mensah-cv.html" download>Download CV <span className="file-type">HTML ↓</span></a></div>;
function Diagram({ fixture = false }: { fixture?: boolean }) {
  return <figure className="diagram-preview">
    {/* Supplied local drawings have intrinsic dimensions and need no optimizer. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={fixture ? "/assets/bring-up-fixture.svg" : "/assets/power-states.svg"} width="720" height="620" alt={fixture ? "Explanatory bring-up diagram linking firmware command, a generic board, the fixture and a bench observation. It contains no circuit detail." : "Explanatory diagram: Sleep leads to Measure, then Transmit, then back to Sleep. No durations or measured current values are shown."} />
    <figcaption>{fixture ? "Explanatory schematic, not a photograph or a circuit diagram." : "Explanatory schematic, not a measured trace or a firmware specification."}</figcaption>
    <a href={fixture ? "/assets/bring-up-fixture.svg" : "/assets/power-states.svg"}>{fixture ? "View fixture schematic" : "View power-state schematic"} <span aria-hidden="true">↗</span></a>
  </figure>;
}
export default function Home() {
  return <main id="content"><a className="story-skip" href="#scope">Skip to content</a><Experience>
    <header className="site-header"><a className="wordmark" href="#scope">AM<span> / STATE BY STATE</span></a><div className="header-contact">{contact}<a href="#review">Skip to contact</a></div></header>
    <nav className="spine-nav" aria-label="Spine chapters"><a href="#scope">01 Scope</a><a href="#transition">04 Transition</a><a href="#review">06 Review</a><span>Spine study · 3 of 7 beats</span></nav>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map(beat => { const words = copy.beats[beat.id]; return <Beat key={beat.id} story={story} id={beat.id}>
        <Kicker number={chapter.number}>{chapter.name}</Kicker>
        <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
        {index === 0 && <p className="opening-question">How does a firmware decision become a measurable signal?</p>}
        <Body>{words.body}</Body><Note>{words.note}</Note>
        {index === 0 && <><p className="project-label">Mosslink / Environmental sensor</p>{contact}<Diagram fixture /></>}
        {index === 1 && <Diagram />}
        {index === 2 && <><Note>The longest run was 72 hours.</Note><Note>One preliminary emissions check passed. Full qualification is unfinished.</Note>{contact}<a className="back-link" href="#scope">Back to Scope ↑</a></>}
      </Beat>; })}
    </Chapter>)}
    <footer className="site-footer">Ada Mensah · Firmware and the bench <span>Local spine review / Choose an appearance above</span></footer>
  </Experience></main>;
}
