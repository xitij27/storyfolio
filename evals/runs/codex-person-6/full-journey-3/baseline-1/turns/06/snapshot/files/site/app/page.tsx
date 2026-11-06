import { StitchedStory } from "@/stitch/react";
import { ChapterEntry } from "@/components/chapter-entry";
import { person } from "@/content/person";
import { mix } from "@/content/mix";
import { site } from "@/content/site";
import { checkPerson } from "@/stitch/person";

// A person the worlds cannot draw, such as a study whose place is not on the map, stops the build with what to fix.
const problems = checkPerson(person);
if (problems.length) throw new Error(`content/person.ts: ${problems.join(" ")}`);

// The person's site: their story stitched from the worlds in content/mix.ts,
// in the look, words and CV of content/site.ts.
export default function Home() {
  return <main><ChapterEntry /><StitchedStory person={person} mix={mix} look={site.look} move={site.move} words={site.words} cv={site.cv} /></main>;
}
