import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
export default function Home() {
  return <main><a className="story-skip" href="#chapter-scope">{copy.skipLabel}</a><Experience>
    <header className="bench-header"><span>ADA MENSAH</span><span>FIRMWARE / MOSSLINK</span><span>LOCAL PROTOTYPE · FICTIONAL</span></header>
    {story.chapters.map((chapter,index)=><Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map(beat=>{const words=copy.beats[beat.id]; return <Beat key={beat.id} story={story} id={beat.id} fallback={beat.id === "scheduling" || beat.id === "bench" ?
        // Supplied teaching assets, displayed without an external image service.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/assets/${beat.id === "scheduling" ? "power-states" : "bring-up-fixture"}.svg`} width="720" height="620" alt={beat.id === "scheduling" ? "Illustrative Sleep, Measure, Transmit loop; not actual firmware or measured timing." : "Illustrative relationship between command, board, fixture access and bench observation; not a wiring plan."}/> : undefined}>
        <Kicker number={chapter.number}>{chapter.name}</Kicker>
        <Title id={`${chapter.id}-title`} as={index===0 ? "h1":"h2"}>{words.title}</Title>
        <Body>{words.body}</Body><p className="bench-detail">{words.detail}</p>
        {beat.id === "evidence" && <div className="evidence-paths"><div><strong>2 years · projected</strong><span>Measured current + assumed interval</span></div><div><strong>72 hours · observed</strong><span>Separate continuous bench run</span></div></div>}
        <Note>{words.note}</Note>
        {beat.id === "scope" && <a className="bench-return" href="#chapter-question">{copy.backLabel} ↑</a>}
      </Beat>;})}
    </Chapter>)}
  </Experience></main>;
}
