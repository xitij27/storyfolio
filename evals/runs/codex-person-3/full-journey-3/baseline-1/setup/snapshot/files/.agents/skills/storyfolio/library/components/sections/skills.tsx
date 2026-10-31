import { Section, SectionHeading } from "@/components/sections/section-heading";
import { SkillGroups } from "@/components/sections/skill-groups";
import { person } from "@/content/sample";
import { getEvidence } from "@/lib/evidence";
import { getExperiencePeriods } from "@/lib/periods";

export function Skills() {
  const t = person.skills;
  const evidence = getEvidence(person.skillGroups, person.projectList, person.experiences);
  // Formatted once in one language, so the server and the browser agree (see lib/periods.ts).
  const periods = getExperiencePeriods(person.experiences, "en", person.experience.present);

  return (
    <Section id="skills" className="bg-muted/20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <SkillGroups evidence={evidence} periods={periods} />
    </Section>
  );
}
