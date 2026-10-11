import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
export default function Home() {
 return <main><a id="story-skip" className="story-skip" href="#chapter-scope">{copy.skipLabel}</a><Experience>
   <header className="bench-masthead"><span>ADA MENSAH</span><span>CODE / BENCH</span><span>LOCAL PROTOTYPE · 01</span></header>
   {story.chapters.map((chapter,index) => <Chapter key={chapter.id} id={chapter.id}>{chapter.beats.map(beat => {
     const words = copy.beats[beat.id];
     const image = beat.id === "scheduling" ? "power-states" : beat.id === "bench" ? "bring-up-fixture" : null;
     return <Beat key={beat.id} id={beat.id} story={story} fallback={image ?
       // Supplied local teaching diagrams; their labels are preserved.
       // eslint-disable-next-line @next/next/no-img-element
       <img src={`/assets/${image}.svg`} width="720" height="620" alt={beat.id === "scheduling" ? "Illustrative Sleep, Measure, Transmit teaching loop, not actual firmware or measured timing." : "Illustrative relationship between firmware command, board, fixture access and bench observation, not a wiring plan."}/> : undefined}>
       <Kicker number={chapter.number}>{chapter.name}</Kicker>
       <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
       <Body>{words.body}</Body><Note>{words.note}</Note>
       <p className="apparatus-key">{words.detail}</p>
     </Beat>;
   })}</Chapter>)}
 </Experience></main>;
}
