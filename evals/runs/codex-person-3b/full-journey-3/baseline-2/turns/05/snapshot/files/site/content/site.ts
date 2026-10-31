import type { SiteChoices } from "@/stitch/site";

// What the person chose for their site, besides their facts and the mix.
export const site: SiteChoices = {
  // Blueprint: user explicitly selected the recommended working alternative.
  look: "blueprint",
  // Their own words for any chapter, chosen at stop 5, such as { hello: "...", contact: "..." }.
  // A chapter without them shows words written from content/person.ts.
  words: {},
  // Where their CV is, once it is built at stop 5, such as "/cv". No CV button shows until then.
  cv: "/cv",
  // The site's language, as an HTML lang code.
  lang: "en",
};
