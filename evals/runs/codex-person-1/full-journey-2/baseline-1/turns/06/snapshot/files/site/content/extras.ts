export const extras = [
  { chapter: "hello", load: () => import("./extras/library") },
  { chapter: "places", load: () => import("./extras/places") },
  { chapter: "study", load: () => import("./extras/study") },
  { chapter: "career", load: () => import("./extras/career") },
  { chapter: "practice", load: () => import("./extras/practice") },
  { chapter: "projects", load: () => import("./extras/projects") },
  { chapter: "contact", load: () => import("./extras/invitation") },
];
