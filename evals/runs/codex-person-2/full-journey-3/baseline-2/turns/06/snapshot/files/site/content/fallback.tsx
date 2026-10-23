import type { ReactNode } from "react";
import type { DiagramKind } from "./projects";
const descriptions:Record<DiagramKind,string>={
 library:"Missing catalogue records and a restore route from the nightly dump.",database:"Dual writes to old and new databases, checksum comparison and a retained fallback path.",complete:"A complete source, comparison and target system with the return route retained.",places:"Schematic route from Addis Ababa to Amsterdam and Rotterdam; original illustration, not a travel itinerary.",logger:"A feeder-load input sends samples through a logger to an SD card; illustration of function, not exact hardware.",replica:"Library catalogue storage, recovery and a replica; original illustration.",waves:"Fourteen illustrative wave routes connect two source sites to a destination. Objects do not represent service counts.",practice:"Illustrative dependency routes meet a cutover check, with a separate return path.",runbook:"Six checked stages: preflight, shadow, dual write, cutover, soak, decommission.",oncall:"Unneeded alert routes are removed while actionable routes remain. Team pages fell from 85 to 22 weekly over about a year.",ferry:"A checked write-target switch with the old target kept as a fallback.",talk:"Catalogue recovery and the checked migration process, the subjects of Boring Migrations.",
};
export function Diagram({kind}:{kind:DiagramKind}):ReactNode{
 // eslint-disable-next-line @next/next/no-img-element
 return <figure><img src={`/diagrams/${kind}.svg`} width="720" height="400" alt={`Illustration: ${descriptions[kind]}`}/><figcaption>Illustration · {descriptions[kind]}</figcaption></figure>;
}
