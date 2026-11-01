"use client";
import { useSearchParams } from "next/navigation";
import { StitchedStory } from "@/stitch/react";
import { parseMix } from "@/stitch/mix";
import { parseLook } from "@/stitch/look";
import { parseMove } from "@/stitch/world";
import { SAMPLE_PEOPLE } from "@/stitch/people";
import { person } from "@/content/person";
import { mix } from "@/content/mix";
import { site } from "@/content/site";

export function Preview() {
  const params = useSearchParams();
  const asked = params.get("person");
  const who = asked === "noa" || asked === "amara" ? SAMPLE_PEOPLE[asked] : person;
  const chosen = parseMix(params.get("mix") ?? "") ?? mix;
  const look = parseLook(params.get("look")) ?? site.look;
  const move = parseMove(params.get("move")) ?? undefined;
  return <StitchedStory person={who} mix={chosen} look={look} move={move} words={who === person ? site.words : undefined} cv={site.cv} />;
}
