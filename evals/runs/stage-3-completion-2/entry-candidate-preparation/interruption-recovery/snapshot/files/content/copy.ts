export const copy = {
  lang: "en",
  metadata: { title: "Ada Mensah — Code meets matter", description: "An illustrative bench story about Ada Mensah’s firmware, power-state scheduling and bring-up fixture for Mosslink, an environmental sensor." },
  railLabel: "Story chapters", lookLabel: "Choose a visual look", fpsLabel: "Frames per second",
  skipLabel: "Skip to the answer", backLabel: "Return to the question",
  beats: {
    "question.apparatus": {
      title: "How do you check a decision made in code?",
      body: "I’m Ada Mensah. For Mosslink, an environmental sensor, I wrote the firmware, scheduled power states and built the bring-up fixture. Together, those connect a code decision to a physical check.",
      note: "Firmware is code that controls a physical device. Bring-up means checking a new board’s basic operation.",
    },
    "bench.inspect": {
      title: "Give the board a command. Look for its response.",
      body: "A firmware command controls the physical board. The bring-up fixture gives access to check the board’s response on the bench. It connects the code decision to an observation; it does not replace the board’s circuitry.",
      note: "My contribution: firmware, power-state scheduling and the fixture. A colleague designed the PCB (the circuit board) and analogue front end (the circuitry that handles sensor signals).",
    },
    "scope.answer": {
      title: "Code, made observable on the bench.",
      body: "My firmware and power-state scheduling decide what the device does; my fixture makes its physical response accessible for a bench check. That is the connection between the code and the observation.",
      note: "Six of forty assembled engineering samples were bench-tested. None went to customers. One preliminary emissions check passed; full qualification is unfinished.",
    },
  },
};
