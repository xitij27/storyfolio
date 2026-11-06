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
import { openingVersions, closingVersions } from "@/content/wording";

export function Preview() {
  const params = useSearchParams();
  const asked = params.get("person");
  const who = asked === "noa" || asked === "amara" ? SAMPLE_PEOPLE[asked] : person;
  const chosen = parseMix(params.get("mix") ?? "") ?? mix;
  const look = parseLook(params.get("look")) ?? site.look;
  const move = parseMove(params.get("move")) ?? site.move;
  const opening = openingVersions.find(version => version.id === params.get("opening"));
  const closing = closingVersions.find(version => version.id === params.get("closing"));
  const words = who === person ? {
    ...site.words,
    ...(opening ? { hello: opening.text } : {}),
    ...(closing ? { contact: closing.text } : {}),
  } : undefined;
  return <StitchedStory person={who} mix={chosen} look={look} move={move} words={words} cv={site.cv} />;
}
