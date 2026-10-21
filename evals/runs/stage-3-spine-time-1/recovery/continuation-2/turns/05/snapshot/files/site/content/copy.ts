import type { Metadata } from "next";
export const copy = {
  lang: "en", railLabel: "Bring-up checklist", lookLabel: "Choose a bench finish", fpsLabel: "Frames per second",
  metadata: {
    metadataBase: new URL("http://localhost:3000"),
    title: "Ada Mensah | Embedded firmware",
    description: "Mosslink firmware, power-state scheduling and a bring-up fixture. Connecting code to a physical observation.",
    openGraph: { title: "Ada Mensah | Embedded firmware", description: "Code, a bring-up fixture and the limits of an observation.", type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image" },
  } satisfies Metadata,
  beats: {
    "prepare.assemble": { title: "Code meets the bench.", body: "I’m Ada Mensah. I’m looking for embedded firmware roles involving physical devices. For Mosslink, an environmental sensor, I wrote the firmware, scheduled the power states and built the bring-up fixture.", note: "Firmware is the code that controls a physical device’s operation. Bring-up means checking a new board’s basic operation." },
    "prepare.responsibility": { title: "A clear boundary of work.", body: "My contribution was the firmware, power-state scheduling and bring-up fixture. My colleague designed the printed circuit board and analogue front end.", note: "The seven segments are explanatory geometry. They do not reconstruct Mosslink, its wiring or the actual fixture." },
    "command.states": { title: "Schedule the power states.", body: "I scheduled Mosslink’s power states. Sleep, Measure, Transmit is shown here as a teaching sequence, with no claimed durations or current values.", note: "The loop explains an idea. It is not recovered firmware or a record of Mosslink’s actual states or timing." },
    "command.documents": { title: "Three working documents.", body: "My working documents are a state table, a timing diagram and a current trace. My tools include C, oscilloscopes, logic analysers and board bring-up.", note: "The fixture separates planning, access and observation. The document labels name the tools of the work; they do not display original documents, firmware or measurements." },
    "access.relationship": { title: "A decision needs a physical observation.", body: "I built the bring-up fixture for Mosslink. Here, command, fixture access and observation are separated so you can inspect their relationship.", note: "This is a teaching model. Its contacts and their positions are not original wiring, probe locations or a test result." },
    "access.mosslink": { title: "Mosslink, at the bench.", body: "Mosslink is the environmental-sensor project shown here. I wrote its firmware, scheduled its power states and built its bring-up fixture.", note: "The project page sets out my contribution, the reported observation and the limits of the available evidence. The fixture photograph and actual current trace are unavailable." },
    "observe.open": { title: "The radio stayed awake.", body: "A current trace showed the radio staying awake after a failed transmission. No cause, fix, timing or later resolution is confirmed.", note: "No trace file is available to publish. The separated observation segment keeps the question open; it does not show a diagnosis or a successful retest." },
    "record.battery": { title: "An estimate. An observed run.", body: "The two-year battery figure is a projection from bench current readings and an assumed reporting cycle. The longest continuous run was 72 hours.", note: "No field endurance or weather testing supports a two-year claim. The projection and the run support different claims." },
    "record.scope": { title: "Keep the scope with the result.", body: "Forty engineering samples were assembled; six were tested on the bench. None went to customers. One preliminary emissions check passed; the full qualification programme is unfinished.", note: "These are project counts and outcomes. They do not claim that I personally assembled or tested every sample. This was not a field pilot or a product launch." },
    "record.close": { title: "The claim follows the observation.", body: "A firmware decision needs a physical observation. An estimate and an observed run support different claims. That is the lesson I want to bring to firmware work involving physical devices.", note: "A current trace showed the radio staying awake after a failed transmission. No cause, fix, timing or later resolution is confirmed. No trace file is available to publish." },
  },
};
