/* The four ways the study joins the same two pictures, and what to watch in each. */

export const WAYS = [
  {
    id: "swap",
    name: "Today's swap",
    watch: "What the engine does now. The pipeline shrinks away while the map grows in at the same place: nothing in one becomes part of the other.",
  },
  {
    id: "line",
    name: "Line morph",
    watch: "The pipeline's line bends and stretches into the route across the map. The stores melt into its ends, and the map gathers round it.",
  },
  {
    id: "handoff",
    name: "Hand-off",
    watch: "The timetables store stays where it is and becomes Zurich. The rest clears, then the map and the route build outward from that point.",
  },
  {
    id: "dive",
    name: "Camera dive",
    watch: "The camera flies into the timetables store. Its lid holds the map, and the map grows until it is the whole picture.",
  },
] as const;

export type WayId = (typeof WAYS)[number]["id"];
