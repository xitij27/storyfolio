import { Chapter, Beat } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { Inspect } from "@/content/inspect";
import { Diagram } from "@/content/diagram";
import { PowerCycle, EvidencePaths, SampleScope, PowerCycleDiagram, EvidencePathsDiagram } from "@/content/story-depth";

export default function Home() {
  return <main>
    <a className="story-skip" href="#proof">Skip to the evidence</a>
    <header className="site-header"><a className="identity" href="#opening"><span className="identity-mark" aria-hidden="true">am</span><span>Ada Mensah<span className="identity-role">Embedded firmware</span></span></a><nav aria-label="Quick links"><a href="#power">Explore the work <span aria-hidden="true">↗</span></a><a href="#proof">Evidence <span aria-hidden="true">↗</span></a></nav></header>
    <div className="study-label">Mosslink / a fictional portfolio study</div>
    <Experience>
      <Chapter id="opening"><Beat story={story} id="opening.assembly" fallback={<Diagram mode="assembly"/>}>
        <p className="eyebrow"><span>01 / THE QUESTION</span><span className="small-rule"/></p>
        <h1 id="opening-title">Between code<br/>and <em>the bench.</em></h1>
        <p className="lead">How do you connect a firmware decision to something you can actually observe?</p>
        <p className="body-copy">I wrote the firmware, scheduled the power states and built the bring-up fixture for Mosslink, an environmental sensor.</p>
        <div className="opening-foot"><span>Firmware is code that controls a physical device.</span><a className="scroll-prompt" href="#power"><span aria-hidden="true">↓</span> Follow the work</a></div>
      </Beat></Chapter>
      <Chapter id="power"><Beat story={story} id="power.cycle" fallback={<PowerCycleDiagram/>}>
        <p className="eyebrow"><span>02 / THE SCHEDULE</span><span className="small-rule"/></p>
        <h2 id="power-title">Low power is<br/><em>a schedule.</em></h2>
        <p className="lead">I scheduled the firmware&apos;s power states. This teaching loop separates a device&apos;s work into three states.</p>
        <PowerCycle/>
        <p className="body-copy depth-context">My working documents include state tables, timing diagrams and bench checklists: ways to describe the work to check.</p>
      </Beat></Chapter>
      <Chapter id="middle"><Beat story={story} id="middle.relationship" fallback={<Diagram mode="relationship"/>}>
        <p className="eyebrow"><span>03 / THE BENCH</span><span className="small-rule"/></p>
        <h2 id="middle-title">From a command<br/><em>to a check.</em></h2>
        <p className="lead">Bring-up means checking a new board&apos;s basic operation. My fixture makes its response available to bench instruments.</p>
        <Inspect/>
        <p className="body-copy middle-definition">I wrote the firmware and built the fixture. A colleague designed the PCB and analogue front end.</p>
        <p className="micro">Command → board → fixture → observation.<br/>An explanatory relationship, not electrical wiring.</p>
      </Beat></Chapter>
      <Chapter id="proof"><Beat story={story} id="proof.boundaries" fallback={<EvidencePathsDiagram/>}>
        <p className="eyebrow"><span>04 / THE EVIDENCE</span><span className="small-rule"/></p>
        <h2 id="proof-title">Two numbers.<br/><em>Different evidence.</em></h2>
        <EvidencePaths/>
        <p className="micro">An estimate is not two years of observed operation.</p>
      </Beat></Chapter>
      <Chapter id="close"><Beat story={story} id="close.evidence" fallback={<Diagram mode="evidence"/>}>
        <p className="eyebrow"><span>05 / THE SCOPE</span><span className="small-rule"/></p>
        <h2 id="close-title">A connection.<br/><em>Not a leap.</em></h2>
        <p className="lead">I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.</p>
        <SampleScope/>
        <p className="body-copy depth-qualification">One preliminary emissions check passed. Full qualification is unfinished.</p>
        <a className="text-link" href="#scope">Read the source and limits <span aria-hidden="true">↘</span></a>
      </Beat></Chapter>
    </Experience>
    <footer id="scope" className="scope-footer">
      <div><p className="eyebrow">FROM THE SUPPLIED NOTES</p><h2>The source behind<br/>the story.</h2><blockquote className="depth-quote">“Battery spreadsheet uses measured sleep and transmit current with an assumed reporting interval.”</blockquote><p className="body-copy">From the fictional Mosslink lab notes. The spreadsheet, current values and reporting interval are not supplied.</p><a className="text-link" href="#opening">Back to the question ↑</a></div>
      <div className="scope-facts"><p>The longest run was 72 hours. Two years is a projection from bench current readings and an assumed reporting cycle.</p><p>Forty engineering samples were assembled. Six were tested on the bench. None went to customers.</p><p>One preliminary emissions check passed. Full qualification is unfinished.</p><p>Ada wrote the firmware, scheduled the power states and built the bring-up fixture. A colleague designed the PCB and analogue front end.</p></div>
      <p className="scope-note">Ada and Mosslink are fictional. Illustrative bench model: shapes and connections are explanatory, not a photograph, circuit diagram, wiring plan or measured signal.</p>
    </footer>
    <div className="model-note"><span className="model-dot"/>Illustrative bench model<span className="model-note-detail"> / shapes and connections are explanatory</span></div>
  </main>;
}
