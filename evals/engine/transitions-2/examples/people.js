// Two made-up people. Nobody here is real: not the people, the employers,
// the projects or the people quoted. Every example reads only this data, so
// switching person changes the words and places and nothing else.

export const PEOPLE = {
  noa: {
    name: "Noa Lindqvist",
    first: "Noa",
    role: "Research engineer",
    line: "I turn messy transit data into forecasts people plan their day around.",
    seeking: "Open to research engineering roles",
    places: [
      { name: "Gothenburg", lat: 57.71, lng: 11.97, what: "grew up" },
      { name: "Delft", lat: 52.01, lng: 4.36, what: "studied" },
      { name: "Zurich", lat: 47.38, lng: 8.54, what: "worked" },
      { name: "Montreal", lat: 45.5, lng: -73.57, what: "lives now" },
    ],
    study: [
      { degree: "Bachelor of Science", field: "Computer Science", place: "Delft", from: 2017, to: 2020,
        note: "Thesis: guessing how full a tram is from ticket taps" },
    ],
    work: [
      { org: "Tidewater Data", role: "Data analyst intern", place: "Delft", from: 2020, to: 2020.6,
        did: "Cleaned shipping records for a monthly report", uses: ["SQL", "Python"] },
      { org: "Larkspur Robotics", role: "Software engineer", place: "Zurich", from: 2021.4, to: 2023.6,
        did: "Built the fleet dashboard operators open every morning", uses: ["React", "TypeScript", "Three.js", "Docker"] },
      { org: "Fernhill Transit Lab", role: "Research engineer", place: "Zurich", from: 2023.7, to: null,
        did: "Forecasts how late each regional train will be", uses: ["PyTorch", "PostgreSQL", "dbt"] },
    ],
    skills: [
      { group: "Data and AI", items: ["Python", "PyTorch", "SQL", "dbt"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Docker"] },
      { group: "Frontend", items: ["React", "TypeScript", "Three.js"] },
      { group: "Cloud", items: ["AWS", "Kubernetes"] },
    ],
    projects: [
      { title: "Train delay forecaster", line: "How late each regional train will be, an hour ahead.", tags: ["PyTorch", "PostgreSQL"], place: "Zurich", year: 2024, kind: "chart" },
      { title: "Photo colouriser", line: "A network that guesses the colours of old photographs.", tags: ["PyTorch"], place: "Zurich", year: 2022, kind: "photo" },
      { title: "Maze-solving robot", line: "Maps a maze as it drives, then takes the shortest way out.", tags: ["C++", "Python"], place: "Delft", year: 2019, kind: "maze" },
      { title: "Bike route planner", line: "Routes that avoid steep hills, on a map of the city.", tags: ["TypeScript"], place: "Zurich", year: 2022, kind: "route" },
      { title: "Log anomaly finder", line: "Flags unusual logins and says why each one stood out.", tags: ["Python", "Docker"], place: "Montreal", year: 2025, kind: "bars" },
      { title: "Shared shopping list", line: "A list a household edits together, even offline.", tags: ["React", "Node.js"], place: "Montreal", year: 2025, kind: "list" },
    ],
    quotes: [
      { text: "Noa found the bug in our timetable data that two of us had missed for a month, then wrote the check that keeps it out.", who: "Elin Brask", from: "Lead, Fernhill Transit Lab", place: "Zurich" },
      { text: "The dashboard Noa built is still the first thing our operators open in the morning.", who: "Tomás Ferreira", from: "CTO, Larkspur Robotics", place: "Zurich" },
      { text: "Asks the question nobody else thought to ask, and then answers it with a chart.", who: "Hana Kovač", from: "Teaching assistant, Delft", place: "Delft" },
    ],
    contact: { email: "noa@example.com", links: ["GitHub", "LinkedIn", "CV (PDF)"] },
  },

  amara: {
    name: "Amara Okafor",
    first: "Amara",
    role: "Product designer",
    line: "I design health apps that people can use on their worst day.",
    seeking: "Looking for a lead design role in health",
    places: [
      { name: "Enugu", lat: 6.46, lng: 7.55, what: "grew up" },
      { name: "Manchester", lat: 53.48, lng: -2.24, what: "studied" },
      { name: "Lisbon", lat: 38.72, lng: -9.14, what: "worked" },
      { name: "Berlin", lat: 52.52, lng: 13.4, what: "lives now" },
    ],
    study: [
      { degree: "Master of Arts", field: "Interaction Design", place: "Manchester", from: 2015, to: 2017,
        note: "Project: a pill reminder for people with poor eyesight" },
    ],
    work: [
      { org: "Brightmoor Studio", role: "Junior designer", place: "Manchester", from: 2017, to: 2019.5,
        did: "Designed booking flows for twelve clinics", uses: ["Figma", "User interviews"] },
      { org: "Pellucid Health", role: "Product designer", place: "Lisbon", from: 2019.6, to: 2023.2,
        did: "Led the redesign of a symptom checker", uses: ["Prototyping", "Usability tests", "Design systems"] },
      { org: "Tallow and Finch", role: "Senior designer", place: "Berlin", from: 2023.3, to: null,
        did: "Runs design for a pharmacy app", uses: ["Design systems", "UX writing"] },
    ],
    skills: [
      { group: "Research", items: ["User interviews", "Usability tests", "Diary studies"] },
      { group: "Design", items: ["Figma", "Prototyping", "Design systems"] },
      { group: "Words", items: ["UX writing", "Plain language"] },
      { group: "Code", items: ["HTML and CSS", "React basics"] },
    ],
    projects: [
      { title: "Symptom checker", line: "Fewer questions, and a clear next step at the end.", tags: ["Research", "Figma"], place: "Lisbon", year: 2022, kind: "list" },
      { title: "Clinic booking", line: "Booking in three taps instead of eleven.", tags: ["Figma"], place: "Manchester", year: 2018, kind: "bars" },
      { title: "Pill reminder", line: "Large type and sound for people with poor eyesight.", tags: ["Prototyping"], place: "Manchester", year: 2017, kind: "chart" },
      { title: "Pharmacy app", line: "Repeat prescriptions without a phone call.", tags: ["Design systems"], place: "Berlin", year: 2024, kind: "route" },
      { title: "Station wayfinding", line: "Signs a tired traveller can follow at night.", tags: ["Research"], place: "Lisbon", year: 2021, kind: "maze" },
      { title: "Plain words kit", line: "A guide to writing health screens plainly.", tags: ["UX writing"], place: "Berlin", year: 2025, kind: "photo" },
    ],
    quotes: [
      { text: "Amara sat with our nurses for a week before drawing a single screen. It showed in every screen.", who: "Dr Ines Moura", from: "Clinical lead, Pellucid Health", place: "Lisbon" },
      { text: "Our booking drop-off halved after Amara's redesign, and nobody asked for training.", who: "Sam Whitlow", from: "Director, Brightmoor Studio", place: "Manchester" },
      { text: "The calmest person in a crisis I have worked with, and the clearest writer.", who: "Jonas Retter", from: "Product lead, Tallow and Finch", place: "Berlin" },
    ],
    contact: { email: "amara@example.com", links: ["Dribbble", "LinkedIn", "CV (PDF)"] },
  },
};

export const CHAPTERS = [
  { key: "hello", title: "Hello" },
  { key: "from", title: "Where from" },
  { key: "studied", title: "What I studied" },
  { key: "worked", title: "Where I've worked" },
  { key: "good", title: "What I'm good at" },
  { key: "made", title: "What I've made" },
  { key: "say", title: "What others say" },
  { key: "contact", title: "Get in touch" },
];

/** The short words under each chapter, from the person's data. */
export function captions(p) {
  const s = p.study[0];
  return [
    `${p.role}. ${p.line}`,
    p.places.map((x) => `${x.name} (${x.what})`).join(", then "),
    `${s.degree} in ${s.field}, ${s.place}, ${s.from} to ${s.to}.`,
    p.work.map((w) => `${w.org}, ${yearText(w)}`).join(". ") + ".",
    p.skills.map((g) => g.group).join(", ") + ".",
    `${p.projects.length} projects. Click one to open it.`,
    `From ${p.quotes.map((q) => q.who).join(", ")}.`,
    `${p.contact.email}. ${p.seeking}.`,
  ];
}

export const yearText = (w) => {
  const a = Math.floor(w.from), b = w.to ? Math.floor(w.to) : "now";
  return a === b ? String(a) : `${a} to ${b}`;
};
