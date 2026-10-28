import type { Person } from "@/stitch/person";
import { SAMPLE_PEOPLE } from "@/stitch/people";

// An edge case for the check only, made up: one place, no study, no quotes,
// one job inside one year, nine projects.
const noa = SAMPLE_PEOPLE.noa;
export const person: Person = {
  ...noa,
  name: "Ines Varga", first: "Ines",
  places: [{ name: "Gothenburg", lat: 57.71, lng: 11.97, what: "lives now" }],
  study: [],
  quotes: [],
  work: [{ org: "Harbourline", role: "Data engineer", place: "Gothenburg", from: 2026.1, to: null, did: "Builds the pipelines for a port", uses: ["Python", "SQL"] }],
  skills: noa.skills.slice(0, 2),
  projects: [...noa.projects, ...noa.projects.slice(0, 3).map((p, i) => ({ ...p, title: `${p.title} ${i + 2}`, place: "Gothenburg" }))],
};
