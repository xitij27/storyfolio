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
    <nav className="spine-nav" aria-label="Chapters">{story.chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}>{String(chapter.number).padStart(2,"0")} {chapter.name}</a>)}</nav>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map((beat, beatNumber) => { const words = copy.beats[beat.id]; return <Beat key={beat.id} story={story} id={beat.id}>
        <Kicker number={chapter.number}>{chapter.name}</Kicker>
        <Title id={beatNumber === 0 ? `${chapter.id}-title` : `${beat.id}-title`} as={index === 0 ? "h1" : beatNumber === 0 ? "h2" : "h3"}>{words.title}</Title>
        {beat.id === "scope.opening" && <p className="opening-question">How does a firmware decision become a measurable signal?</p>}
        {"lead" in words && <p className="story-lead">{words.lead}</p>}
        <Body>{words.body}</Body><Note>{words.note}</Note>
        {beat.id === "scope.opening" && <><p className="project-label">Mosslink / Environmental sensor</p>{contact}<Diagram fixture /></>}
        {beat.id === "transition.diagram" && <Diagram />}
        {beat.id === "observation.fixture" && <Diagram fixture />}
        {beat.id === "observation.evidence" && <><Note>The longest run was 72 hours.</Note><Note>One preliminary emissions check passed. Full qualification is unfinished.</Note><p className="evidence-limit">The 72-hour run does not validate the two-year projection.</p></>}
        {beat.id === "review.close" && <><Note>The longest run was 72 hours.</Note><Note>One preliminary emissions check passed. Full qualification is unfinished.</Note>{contact}<a className="back-link" href="#scope">Back to Scope ↑</a></>}
      </Beat>; })}
    </Chapter>)}
    <footer className="site-footer">Ada Mensah · Firmware and the bench <span>Local chapter draft / Bench paper</span></footer>
  </Experience></main>;
}
