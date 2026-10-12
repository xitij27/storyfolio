import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";

export default function Home() {
  return <main><a id="story-skip" className="story-skip" href="#chapter-scope">{copy.skipLabel}</a><Experience>
    <header className="identity"><span>ADA MENSAH</span><span>FIRMWARE / MOSSLINK</span></header>
    <div className="preview-label">LOOK STUDY · OPENING / BENCH / ANSWER</div>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map(beat => {
        const words = copy.beats[beat.id];
        return <Beat key={beat.id} story={story} id={beat.id} fallback={<BenchDiagram />}>
          <Kicker number={chapter.number}>{chapter.name}</Kicker>
          <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
          <Body>{words.body}</Body>
          <Note>{words.note}</Note>
          {index === 1 && <ol className="bench-path" aria-label="The illustrative check path"><li>Command</li><li>Board response</li><li>Fixture access</li><li>Observation</li></ol>}
          {index === 2 && <div className="evidence-limit"><p><strong>Two years, projected.</strong> Measured sleep and transmit current, with an assumed reporting interval, support this projection.</p><p><strong>72 hours, observed.</strong> A separate continuous bench run. It does not validate two years of endurance or establish field conditions.</p></div>}
          <p className="model-note">Illustrative apparatus · not an actual Mosslink device, wiring plan or measurement.</p>
          {index === 2 ? <a className="back-link" href="#chapter-question">{copy.backLabel} <span aria-hidden>↗</span></a> : index === 0 ? <p className="scroll-cue">SCROLL TO INSPECT <span aria-hidden>↓</span></p> : null}
        </Beat>;
      })}
    </Chapter>)}
  </Experience></main>;
}

function BenchDiagram() {
  return <figure className="bench-diagram">
    <svg viewBox="0 0 480 235" role="img" aria-label="Illustrative bench relationship: Ada’s firmware sends a command to the physical board; Ada’s fixture provides access for bench observation. The board circuitry is a colleague’s work.">
      <rect x="12" y="12" width="456" height="210" rx="8" fill="none" stroke="currentColor" />
      <text x="28" y="40">BRING-UP FIXTURE / ADA</text>
      <path d="M120 103H179M301 103H355M239 130V174H355" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="70" width="92" height="66" rx="3" fill="none" stroke="currentColor" /><text x="38" y="94">COMMAND</text><text x="38" y="117">Firmware</text>
      <rect x="179" y="65" width="122" height="75" rx="3" fill="none" stroke="currentColor" /><text x="190" y="92">BOARD</text><text x="190" y="113">Colleague’s</text><text x="190" y="131">circuitry</text>
      <rect x="355" y="70" width="96" height="66" rx="3" fill="none" stroke="currentColor" /><text x="364" y="95">RESPONSE</text><text x="364" y="118">Observe</text>
      <text x="28" y="195">Access for a physical bench check</text>
    </svg>
    <figcaption>Teaching model. Geometry and connections are illustrative.</figcaption>
  </figure>;
}
