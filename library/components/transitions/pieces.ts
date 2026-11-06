/* The three worlds of the transitions gallery, and the piece each one gives every chapter. */
import type { ChapterKey } from "@/stitch/chapters";
import type { WorldId } from "@/stitch/mix";

export const WORLDS: readonly { id: WorldId; name: string; how: string; joins: string }[] = [
  {
    id: "sheet",
    name: "One sheet",
    how: "The person's CV is one sheet of paper that bends into each chapter's picture.",
    joins: "Its chapters join by the sheet folding from one shape into the next.",
  },
  {
    id: "map",
    name: "One map",
    how: "Every chapter stands where it happened, on one map of the person's life.",
    joins: "Its chapters join by the camera flying from place to place.",
  },
  {
    id: "book",
    name: "Pop-up book",
    how: "Each chapter is a spread: the words on the left, a scene standing up on the right.",
    joins: "Its chapters join by turning the page, which folds one scene flat and raises the next.",
  },
];

/** What each world shows in each chapter. */
export const PIECES: Record<WorldId, Record<ChapterKey, string>> = {
  sheet: {
    hello: "The CV, as one page",
    from: "Wrapped into a globe, place to place",
    studied: "Unrolled into the diploma",
    worked: "Stretched into a timeline of jobs",
    good: "Folded into a leaflet of skills",
    made: "Split into a wall of projects",
    say: "Paired into quote cards",
    contact: "Folded back into the CV, to download",
  },
  map: {
    hello: "A sign where they live now",
    from: "The route between their places",
    studied: "The diploma rises at the school",
    worked: "A building for each job, as tall as the years",
    good: "Skills on the buildings that used them",
    made: "Projects where they were made",
    say: "Quotes where those people worked",
    contact: "Back home, the whole life in view",
  },
  book: {
    hello: "A cut-out of the person",
    from: "A map with a flag at each place",
    studied: "The school and the diploma",
    worked: "A building for each job",
    good: "Tabbed cards of skills",
    made: "Project cards to open",
    say: "Speech bubbles",
    contact: "An envelope with the email",
  },
};

export const picture = (world: WorldId, chapter: ChapterKey) => `/transitions/pieces/${world}-${chapter}.jpg`;
