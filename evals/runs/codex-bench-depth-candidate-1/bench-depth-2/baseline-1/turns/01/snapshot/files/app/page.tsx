import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
export default function Home() {
 return <main><a id="story-skip" className="story-skip" href="#chapter-scope">Skip to the answer</a><Experience>
 {story.chapters.map((chapter,index) => <Chapter key={chapter.id} id={chapter.id}>
 {chapter.beats.map(beat => {const w=copy.beats[beat.id]; return <Beat key={beat.id} story={story} id={beat.id}>
 <Kicker number={chapter.number}>{chapter.name}</Kicker>
 <Title id={`${chapter.id}-title`} as={index===0 ? "h1":"h2"}>{w.title}</Title>
 <Body>{w.body}</Body><p className="story-detail">{w.detail}</p><Note>{w.note}</Note>
 </Beat>;})}</Chapter>)}
 </Experience></main>;
}
