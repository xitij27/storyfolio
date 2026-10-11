export const copy = {
  lang: "en",
  metadata: {
    title: "Ada Mensah — Firmware and the bench",
    description: "Firmware, power-state scheduling and the bring-up fixture: Ada Mensah's contribution to Mosslink, with the evidence limits visible.",
    openGraph: { title: "Ada Mensah — Firmware and the bench", description: "How does a firmware decision become a measurable signal?", images: ["/assets/share-card.svg"] },
  },
  railLabel: "Chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  beats: {
    "scope.opening": { title: "Ada Mensah", body: "Firmware is code that controls a physical device.", note: "I wrote the firmware, scheduled the power states and built the bring-up fixture." },
    "transition.diagram": { title: "Reading transitions", body: "Sleep → Measure → Transmit → Sleep. This teaching loop explains a transition between states.", note: "Explanatory schematic, not a measured trace or a firmware specification." },
    "review.close": { title: "Code beside evidence", body: "I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
  },
};
