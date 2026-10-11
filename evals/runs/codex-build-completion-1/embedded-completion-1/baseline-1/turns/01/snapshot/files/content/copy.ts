export const copy = {
  lang: "en",
  metadata: {
    title: "Ada Mensah — Firmware and the bench",
    description: "Firmware, power-state scheduling and the bring-up fixture: Ada Mensah's contribution to Mosslink, with the evidence limits visible.",
    openGraph: { title: "Ada Mensah — Firmware and the bench", description: "How does a firmware decision become a measurable signal?", images: ["/assets/share-card.svg"] },
  },
  railLabel: "Chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  opening: "On Mosslink, an environmental sensor, my work spans firmware, power-state scheduling and the bring-up fixture.",
  closing: "Read the firmware contribution alongside the bench evidence and its limits.",
  beats: {
    "scope.opening": { title: "Ada Mensah", body: "Firmware is code that controls a physical device.", note: "I wrote the firmware, scheduled the power states and built the bring-up fixture." },
    "responsibilities.split": { title: "Who made what", body: "I wrote the firmware, scheduled the power states and built the bring-up fixture.", note: "A colleague designed the PCB and analogue front end." },
    "state.table": { title: "Scheduling power states", body: "State tables, timing diagrams and current traces are daily working documents.", note: "Power-state scheduling was part of my contribution to Mosslink. These six narrative rows do not reproduce its firmware entries." },
    "observation.fixture": { title: "Checking basic operation", body: "Bring-up means checking a new board's basic operation.", note: "I built the bring-up fixture. The drawing below explains the relationships between a firmware command, a generic board, the fixture and a bench observation." },
    "observation.evidence": { title: "What the bench supports", body: "Forty engineering samples were assembled. Six were tested on the bench. None went to customers.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
    "transition.diagram": { title: "Reading transitions", body: "Sleep → Measure → Transmit → Sleep. This teaching loop explains a transition between states.", note: "Explanatory schematic, not a measured trace or a firmware specification." },
    "review.close": { title: "Code beside evidence", body: "I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
  },
};
