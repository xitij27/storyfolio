import { WHOLE, type Mix } from "@/stitch/mix";

// The world that tells every chapter: the agent chooses it to suit the
// person, from the library's gallery. WHOLE.sheet, WHOLE.map or WHOLE.book;
// as one line "map,map,map,map,map,map,map,map" (parseMix and formatMix in
// stitch/mix.ts), which is also what /preview?mix= takes.
export const mix: Mix = WHOLE.sheet;
