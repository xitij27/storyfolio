import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";

export default function Home() {
  return <main><a className="story-skip" href="#close">{copy.skipLabel}</a><Experience>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map((beat) => {
        const words = copy.beats[beat.id];
        return <Beat key={beat.id} story={story} id={beat.id} fallback={index === 1 ?
          // A local SVG is already sized; no image optimizer or network is needed.
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/plain/fan.svg" width="640" height="300" alt={copy.pictureAlt} /> : undefined}>
          <Kicker number={chapter.number}>{chapter.name}</Kicker>
          <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
          <Body>{words.body}</Body>
          <Note>{words.note}</Note>
          {index === 2 && <a href="#opening">{copy.backLabel}</a>}
        </Beat>;
      })}
    </Chapter>)}
  </Experience></main>;
}
