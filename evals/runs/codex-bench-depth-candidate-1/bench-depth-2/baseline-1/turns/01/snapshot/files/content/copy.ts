export const copy = {
  lang: "en",
  metadata: { title: "Ada Mensah — From code to a bench check", description: "A fictional five-beat prototype explaining firmware, scheduling and bring-up work on Mosslink." },
  railLabel: "Story chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  beats: {
    question: {
      title: "How do you check a line of code?",
      body: "Ada Mensah works with embedded firmware: code that controls a physical device. For Mosslink, an environmental sensor, she wrote the firmware, scheduled power states and built the bring-up fixture.",
      detail: "Bring-up means checking a new board’s basic operation. Follow the connection from a firmware decision to something observable on the bench.",
      note: "Fictional prototype · Illustrative apparatus throughout. This is not an actual Mosslink device, circuit or measurement.",
    },
    scheduling: {
      title: "Give the activities an order.",
      body: "Sleep → Measure → Transmit → repeat. This teaching loop shows how different activities can be organized across a repeated cycle. Scheduling gives a bench check an order of behavior to inspect.",
      detail: "The loop on the board is illustrative, not recovered Mosslink firmware. Its arrows show sequence, not elapsed time or measured current; no durations or actual firmware topology are supplied.",
      note: "Ada’s contribution: power-state scheduling. The three-state illustration explains the idea, not its implementation.",
    },
    bench: {
      title: "Code meets a physical response.",
      body: "A firmware command reaches the board. The board responds; fixture access lets that behavior be checked through a bench observation. The fixture provides access to the board—it does not replace its circuitry.",
      detail: "Ada wrote the firmware, scheduled power states and built the fixture. A colleague designed the PCB (printed circuit board) and analogue front end, the circuitry handling sensor signals.",
      note: "Connections explain relationships, not actual wiring. No public debugging incident, diagnosis or fix is supplied.",
    },
    evidence: {
      title: "A projection is not a long run.",
      body: "Measured sleep and transmit current, combined with an assumed reporting interval, support a two-year projection. Separately, the longest continuous bench run was 72 hours observed.",
      detail: "The two paths stay separate: 72 hours does not validate two years of endurance. Neither establishes field conditions or customer deployment. No exact currents, interval, capacity, original trace or run notebook is supplied.",
      note: "State tables, timing diagrams, current traces and bench checklists are working documents. The instrument labels here explain the evidence; they are not recovered records.",
    },
    scope: {
      title: "A code decision. A check you can observe.",
      body: "Ada’s firmware and scheduling work connects to a physical check through the fixture she built. That is the contribution this apparatus explains—with the projection and observed run kept within their limits.",
      detail: "Forty engineering samples were assembled; six were bench-tested; none went to customers. One preliminary emissions check passed. Full qualification is unfinished.",
      note: "This supports a bounded account of firmware and bring-up work, not whole-product ownership, field endurance or certification. Ada and Mosslink are fictional evaluation subjects.",
    },
  },
};
