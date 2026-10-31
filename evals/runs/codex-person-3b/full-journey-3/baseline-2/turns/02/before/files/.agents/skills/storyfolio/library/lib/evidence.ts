import type { Experience, Project, SkillGroup } from "@/content/sample";

/**
 * Where a skill is actually evidenced in the rest of the site's own content.
 *
 * The skills section uses this so each skill can be traced: it counts where it
 * shows up in a project's tech list or in a role's bullet points, worked out
 * from those sources at build time rather than from a self-assessment. A
 * skill with no evidence anywhere comes back with empty lists, and the
 * section marks it as untraced.
 */
export type Evidence = {
  /** Ids of projects whose tech list names this skill. */
  projectIds: string[];
  /** Ids of experience entries whose bullets mention this skill. */
  roleIds: string[];
};

/** Extra strings that count as a mention of the keyed skill. */
const ALIASES: Record<string, string[]> = {
  "Node.js": ["Node", "MERN"],
  React: ["MERN"],
  Express: ["MERN"],
  MongoDB: ["MERN"],
  "Tailwind CSS": ["Tailwind"],
  "HTML / CSS": ["HTML", "CSS"],
  "REST APIs": ["REST", "API", "APIs"],
  "Google Cloud": ["GCP"],
};

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Word-boundary match so "Java" never matches "JavaScript", while a trailing
 * "." still counts: "using Power BI." is a mention. Lookarounds exclude only
 * identifier characters, so the dot in "Node.js" is matched literally by the
 * needle itself rather than being treated as a boundary.
 */
function mentions(haystack: string, needles: string[]) {
  return needles.some((n) =>
    new RegExp(`(?<![\\w+#-])${escape(n)}(?![\\w+#-])`, "i").test(haystack),
  );
}

/** Evidence for every skill in `skillGroups`, keyed by skill name. */
export function getEvidence(
  skillGroups: SkillGroup[],
  projects: Project[],
  experiences: Experience[],
): Record<string, Evidence> {
  const out: Record<string, Evidence> = {};

  for (const group of skillGroups) {
    for (const skill of group.skills) {
      const needles = [skill, ...(ALIASES[skill] ?? [])];

      const projectIds = projects
        .filter((p) => p.tech.some((t) => mentions(t, needles)))
        .map((p) => p.id);

      const roleIds = experiences
        .filter((e) => {
          const text = e.bullets.join(" ");
          return text ? mentions(text, needles) : false;
        })
        .map((e) => e.id);

      out[skill] = { projectIds, roleIds };
    }
  }

  return out;
}
