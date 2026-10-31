/*
  Every piece in the library: which chapter of a Storyfolio site it serves,
  what it shows, where it came from and which files to copy. The index page
  and each piece's page are made from this list.
*/

export const CHAPTERS = [
  { id: "hello", name: "Hello", says: "Who this is, in the first screen." },
  { id: "where-from", name: "Where from", says: "The places a life has passed through." },
  { id: "studied", name: "Studied", says: "What they learned, shown working." },
  { id: "worked", name: "Worked", says: "The roles, and the systems built in them." },
  { id: "good-at", name: "Good at", says: "Skills a visitor can check." },
  { id: "made", name: "Made", says: "The work itself, opened up." },
  { id: "others-say", name: "Others say", says: "Words from people who worked with them." },
  { id: "contact", name: "Contact", says: "How to reach them." },
  { id: "throughout", name: "Throughout", says: "Pieces that hold the whole page together." },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

/** An outside component whose idea a piece takes. Its code is not here: the person installs it. */
export type Original = { provider: "React Bits" | "Aceternity UI"; name: string; url: string; install: string };

export type Piece = {
  id: string;
  name: string;
  chapter: ChapterId;
  /** What it shows and how a site could use it. */
  fits: string;
  /** Where it came from: the author's portfolio, or written here from an outside idea. */
  from: "V2 sections" | "V3 paper" | "Lab scenes" | "Project figures" | "Written here";
  originals?: Original[];
  /** Files to copy into a site, from the library folder. */
  files: string[];
  /** A pinned section scrolled through, rather than a block on the page. */
  scroll?: boolean;
};

const aceternity = (name: string, slug: string, page = slug): Original => ({
  provider: "Aceternity UI",
  name,
  url: `https://ui.aceternity.com/components/${page}`,
  install: `npx shadcn@latest add https://ui.aceternity.com/registry/${slug}.json`,
});
const reactBits = (name: string, slug: string, page: string): Original => ({
  provider: "React Bits",
  name,
  url: `https://reactbits.dev/${page}`,
  install: `npx shadcn@latest add https://reactbits.dev/r/${slug}-TS-TW.json`,
});

export const PIECES: Piece[] = [
  {
    id: "hero",
    name: "Hero with stars",
    chapter: "hello",
    fits: "A name, a role that changes every few seconds and the way in, over a slowly turning field of stars.",
    from: "V2 sections",
    files: ["components/sections/hero.tsx", "components/pieces/starfield.tsx", "components/pieces/rotating-text.tsx"],
  },
  {
    id: "rotating-text",
    name: "Rotating word",
    chapter: "hello",
    fits: "One word of a sentence that cycles through the person's roles or interests.",
    from: "Written here",
    originals: [reactBits("Rotating Text", "RotatingText", "text-animations/rotating-text"), aceternity("Container Text Flip", "container-text-flip")],
    files: ["components/pieces/rotating-text.tsx"],
  },
  {
    id: "starfield",
    name: "Starfield",
    chapter: "hello",
    fits: "A quiet, twinkling background for an opening screen. Tinted to any hue.",
    from: "Written here",
    originals: [reactBits("Galaxy", "Galaxy", "backgrounds/galaxy")],
    files: ["components/pieces/starfield.tsx"],
  },
  {
    id: "pixel-portrait",
    name: "Pixel portrait",
    chapter: "hello",
    fits: "The person's photograph as a grid of dots that part round the pointer.",
    from: "Written here",
    originals: [aceternity("Pixelated Canvas", "pixelated-canvas")],
    files: ["components/pieces/pixel-portrait.tsx"],
  },
  {
    id: "typed-terminal",
    name: "Typed terminal",
    chapter: "hello",
    fits: "An introduction typed as commands and their answers, for someone who lives in a shell.",
    from: "Written here",
    originals: [aceternity("Terminal", "terminal")],
    files: ["components/pieces/typed-terminal.tsx"],
  },
  {
    id: "about",
    name: "About with a globe",
    chapter: "where-from",
    fits: "An introduction beside a globe that draws the person's journey city to city.",
    from: "V2 sections",
    files: ["components/sections/about.tsx", "components/pieces/dot-globe.tsx", "components/pieces/pixel-portrait.tsx", "lib/globe.ts", "content/land.ts"],
  },
  {
    id: "dot-globe",
    name: "Dot globe",
    chapter: "where-from",
    fits: "The world as dots of land, with arcs from each place lived in to the next.",
    from: "Written here",
    originals: [aceternity("GitHub Globe", "globe", "github-globe")],
    files: ["components/pieces/dot-globe.tsx", "lib/globe.ts", "content/land.ts"],
  },
  {
    id: "route",
    name: "Route on a globe",
    chapter: "where-from",
    fits: "The globe turns to each place as the page scrolls, with what happened there in the caption.",
    from: "Lab scenes",
    files: ["components/lab/route-scene.tsx", "components/lab/scroll-stage.tsx", "components/pieces/dot-globe.tsx", "lib/globe.ts", "content/land.ts"],
    scroll: true,
  },
  {
    id: "spectrogram",
    name: "Live research exhibit",
    chapter: "studied",
    fits: "A thesis shown working: sound as a terrain, a detector marking speech, a noise slider to break it.",
    from: "Lab scenes",
    files: ["components/lab/spectrogram-scene.tsx", "components/lab/scroll-stage.tsx"],
    scroll: true,
  },
  {
    id: "data-points",
    name: "Data that sorts itself",
    chapter: "studied",
    fits: "Scattered points lift off the page and gather into clusters as the reader scrolls.",
    from: "V3 paper",
    files: ["components/paper/exhibits.tsx", "lib/points.ts", "lib/rand.ts", "components/lab/scroll-stage.tsx"],
    scroll: true,
  },
  {
    id: "network",
    name: "Network with skips",
    chapter: "studied",
    fits: "An encoder-decoder drawn as sheets, a signal passing through and its skip connections arcing over.",
    from: "V3 paper",
    files: ["components/paper/exhibits.tsx", "components/lab/scroll-stage.tsx"],
    scroll: true,
  },
  {
    id: "experience",
    name: "Experience timeline",
    chapter: "worked",
    fits: "Roles down a spine that draws itself as it is read, the older ones folded away.",
    from: "V2 sections",
    files: ["components/sections/experience.tsx", "components/sections/experience-timeline.tsx", "lib/periods.ts"],
  },
  {
    id: "layers",
    name: "Layers",
    chapter: "worked",
    fits: "Nine sheets that drift, line up as a network, stack as a system, then fan out as the projects.",
    from: "Lab scenes",
    files: ["components/lab/layers-scene.tsx", "components/lab/scroll-stage.tsx"],
    scroll: true,
  },
  {
    id: "stack",
    name: "System stack",
    chapter: "worked",
    fits: "The tiers of a system someone built, with requests travelling down through them and back.",
    from: "V3 paper",
    files: ["components/paper/exhibits.tsx", "components/lab/scroll-stage.tsx"],
    scroll: true,
  },
  {
    id: "skills",
    name: "Skills with evidence",
    chapter: "good-at",
    fits: "Each skill counts the roles and projects it shows up in; picking one shows where.",
    from: "V2 sections",
    files: ["components/sections/skills.tsx", "components/sections/skill-groups.tsx", "lib/evidence.ts", "lib/periods.ts"],
  },
  {
    id: "projects",
    name: "Project grid",
    chapter: "made",
    fits: "Projects to filter and search, each opening into a window with live figures and links.",
    from: "V2 sections",
    files: ["components/sections/projects.tsx", "components/sections/project-card.tsx", "components/pieces/expanding-cards.tsx", "components/pieces/gooey-search.tsx", "components/figures/"],
  },
  {
    id: "expanding-cards",
    name: "Expanding cards",
    chapter: "made",
    fits: "Cards that open into a window with pictures, what the work is, its tools and its links.",
    from: "Written here",
    originals: [aceternity("Expandable Card", "expandable-card-demo-grid", "expandable-card")],
    files: ["components/pieces/expanding-cards.tsx"],
  },
  {
    id: "gooey-search",
    name: "Gooey search",
    chapter: "made",
    fits: "A round search button that melts open into a field.",
    from: "Written here",
    originals: [aceternity("Gooey Input", "gooey-input")],
    files: ["components/pieces/gooey-search.tsx"],
  },
  {
    id: "figures",
    name: "Project figures",
    chapter: "made",
    fits: "How a project works, drawn live: a cipher's difference spreading, a maze solved, a before and after.",
    from: "Project figures",
    files: ["components/figures/project-figures.tsx", "components/figures/canvas2d.ts", "lib/maze.ts"],
  },
  {
    id: "project-window",
    name: "Project window from the text",
    chapter: "made",
    fits: "A project named in a sentence opens its window, so the story never sends the reader away.",
    from: "V3 paper",
    files: ["components/paper/project-window.tsx", "components/pieces/expanding-cards.tsx", "components/sections/project-card.tsx"],
  },
  {
    id: "testimonials",
    name: "Testimonial strip",
    chapter: "others-say",
    fits: "Quotes passing slowly sideways, with a pause button and a still version for reduced motion.",
    from: "V2 sections",
    files: ["components/sections/testimonials.tsx"],
  },
  {
    id: "contact",
    name: "Contact card",
    chapter: "contact",
    fits: "Email as a button and as an address to copy, with the person's other links below.",
    from: "V2 sections",
    files: ["components/sections/contact.tsx"],
  },
  {
    id: "ripple-grid",
    name: "Ripple grid",
    chapter: "contact",
    fits: "A faint grid behind a closing section that ripples out from wherever it is clicked.",
    from: "Written here",
    originals: [aceternity("Background Ripple Effect", "background-ripple-effect")],
    files: ["components/pieces/ripple-grid.tsx"],
  },
  {
    id: "chapter-rail",
    name: "Chapter rail",
    chapter: "throughout",
    fits: "Chapter numbers down the edge: where the reader is, and a way to jump.",
    from: "V3 paper",
    files: ["components/paper/chapter-rail.tsx"],
  },
  {
    id: "look-switch",
    name: "Look switch",
    chapter: "throughout",
    fits: "Lets the person compare looks on the real page, kept in the address so a link can name one.",
    from: "V3 paper",
    files: ["components/paper/look-switch.tsx"],
  },
  {
    id: "slider",
    name: "Caption slider",
    chapter: "throughout",
    fits: "A labelled control inside a caption, so the reader can change what the scene shows.",
    from: "V3 paper",
    files: ["components/paper/slider.tsx"],
  },
];

export const piece = (id: string) => PIECES.find((p) => p.id === id);
