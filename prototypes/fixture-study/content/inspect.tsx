"use client";
import { useControl, useControls } from "@/components/story/controls";

const steps = [
  { label: "Command", text: "Ada wrote the firmware and scheduled its power states. State tables and timing diagrams are part of her working documents; this is not a reproduction of that firmware." },
  { label: "Board", text: "A command reaches hardware designed by a colleague: the PCB and analogue front end. The generic board shows its place in the process, not the actual circuitry." },
  { label: "Fixture", text: "Ada built the bring-up fixture. It makes a board response available to bench instruments. Bench checklists are among the documents she uses for this work." },
  { label: "Observe", text: "Bench current readings help distinguish measured behavior from an endurance estimate. No actual trace or current values are supplied; this model does not simulate a measured signal." },
];
export function Inspect() {
  const controls = useControls();
  const selected = useControl("inspect") ?? 0;
  return <div className="inspection story-control">
    <div className="inspection-buttons" role="group" aria-label="Explore the observation relationship">
      {steps.map((step, i) => <button key={step.label} aria-pressed={selected === i} onClick={() => controls.set("inspect", i)}><span className="step-number">0{i + 1}</span>{step.label}</button>)}
    </div>
    <p className="inspection-description" aria-live="polite">{steps[selected]?.text}</p>
  </div>;
}
