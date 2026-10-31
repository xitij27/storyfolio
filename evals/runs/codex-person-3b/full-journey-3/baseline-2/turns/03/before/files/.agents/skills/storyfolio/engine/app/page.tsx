import { StitchedStory } from "@/stitch/react";
import { person } from "@/content/person";
import { mix } from "@/content/mix";
import { site } from "@/content/site";

// The person's site: their story stitched from the worlds in content/mix.ts,
// in the look, words and CV of content/site.ts.
export default function Home() {
  return <main><StitchedStory person={person} mix={mix} look={site.look} words={site.words} cv={site.cv} /></main>;
}
