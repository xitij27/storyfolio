import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { person } from "@/content/sample";
import { getExperiencePeriods } from "@/lib/periods";

export function Experience() {
  const t = person.experience;
  // Formatted once in one language, so the server and the browser agree (see lib/periods.ts).
  const periods = getExperiencePeriods(person.experiences, "en", t.present);

  return (
    <Section id="experience">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <ExperienceTimeline periods={periods} />
    </Section>
  );
}
