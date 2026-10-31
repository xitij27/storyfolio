import type { SiteChoices } from "@/stitch/site";
import { wording } from "@/content/wording";

// What the person chose for their site, besides their facts and the mix.
export const site: SiteChoices = {
  // Night selected on the user’s instruction to use the recommended look.
  look: "night",
  // Their own words for any chapter, chosen at stop 5, such as { hello: "...", contact: "..." }.
  // A chapter without them shows words written from content/person.ts.
  words: { ...wording["1"] },
  // Where their CV is, once it is built at stop 5, such as "/cv". No CV button shows until then.
  cv: "/cv",
  // The site's language, as an HTML lang code.
  lang: "en",
};
