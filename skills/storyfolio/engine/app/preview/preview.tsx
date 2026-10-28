"use client";
import { useSearchParams } from "next/navigation";
import { StitchedStory } from "@/stitch/react";
import { parseMix } from "@/stitch/mix";
import { SAMPLE_PEOPLE } from "@/stitch/people";
import { person } from "@/content/person";
import { mix } from "@/content/mix";

export function Preview() {
  const params = useSearchParams();
  const asked = params.get("person");
  const who = asked === "noa" || asked === "amara" ? SAMPLE_PEOPLE[asked] : person;
  const chosen = parseMix(params.get("mix") ?? "") ?? mix;
  return <StitchedStory person={who} mix={chosen} />;
}
