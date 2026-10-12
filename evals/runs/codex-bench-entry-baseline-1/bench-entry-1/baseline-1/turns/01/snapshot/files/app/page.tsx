import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
export default function Home() {
  return <main><a id="story-skip" className="story-skip" href="#chapter-scope">Skip to the answer</a><Experience>
    <header className="identity"><span>Ada Mensah</span><span>Firmware / Mosslink</span></header>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map(beat => {
        const words = copy.beats[beat.id];
        const diagram = index === 1 ? "/assets/power-states.svg" : index === 2 ? "/assets/bring-up-fixture.svg" : null;
        return <Beat key={beat.id} story={story} id={beat.id} fallback={diagram ?
          // Local explanatory SVG, not a recovered implementation.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={diagram} width="720" height="620" alt={index === 1 ? "Illustrative Sleep, Measure, Transmit loop, returning to Sleep." : "Illustrative firmware command, board response, fixture access and bench observation relationship."} /> : undefined}>
          <Kicker number={chapter.number}>{chapter.name}</Kicker>
          <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
          <Body>{words.body}</Body><Note>{words.note}</Note>
          {index === 4 && <a className="return-link" href="#chapter-question">{copy.backLabel} ↑</a>}
        </Beat>;
      })}
    </Chapter>)}
    <footer className="colophon">Illustrative portfolio · fictional evaluation subject · local prototype</footer>
  </Experience></main>;
}
