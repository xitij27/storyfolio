export const extras = [
  { chapter: "hello", load: () => import("./extras/library") },
  { chapter: "projects", load: () => import("./extras/migration") },
  { chapter: "contact", load: () => import("./extras/invitation") },
];
