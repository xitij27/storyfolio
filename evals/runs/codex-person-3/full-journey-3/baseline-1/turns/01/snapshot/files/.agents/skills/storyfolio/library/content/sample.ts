import type * as React from "react";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

/*
  A made-up person, so that every piece has something to show. Nobody here
  is real: not the person, the employers, the projects or the people quoted.
  A site built from this library replaces all of it with the person's own
  confirmed facts.
*/

export type Place = { name: string; lat: number; lng: number };
export type OrgType = "mnc" | "startup" | "research-lab";
export type Experience = {
  id: string;
  company: string;
  role: string;
  orgType: OrgType;
  location: string;
  /** Year and month, "2023-09". */
  start: string;
  end: string | null;
  logoInitials: string;
  logo?: string;
  bullets: string[];
};
export type ProjectCategory = "data-science" | "swe" | "cybersecurity";
export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  /** Screenshots. With none, a card shows the title in the category's colour. */
  images: string[];
  compare?: { before: string; after: string };
  highlights?: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
};
export type SkillGroup = { id: "frontend" | "backend" | "data" | "cloud"; name: string; skills: string[] };
export type Testimonial = { id: string; quote: string; name: string; title: string; initials: string; photo?: string };
export type Social = { id: string; label: string; href: string; icon: React.ComponentType<{ className?: string }> };

const PLACES = {
  gothenburg: { name: "Gothenburg", lat: 57.7089, lng: 11.9746 },
  delft: { name: "Delft", lat: 52.0116, lng: 4.3571 },
  zurich: { name: "Zurich", lat: 47.3769, lng: 8.5417 },
  montreal: { name: "Montreal", lat: 45.5019, lng: -73.5674 },
} satisfies Record<string, Place>;

const EMAIL = "you@example.com";
/** The site's base path, "/storyfolio" on GitHub Pages: plain image addresses need it. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const person = {
  name: "Noa Lindqvist",
  email: EMAIL,
  cvPath: "#",
  portrait: asset("/sample/portrait.svg"),
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/", icon: GithubIcon },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/", icon: LinkedinIcon },
    { id: "email", label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
  ] satisfies Social[],

  hero: {
    greeting: "Hello, I'm",
    roles: ["Research Engineer", "Data Engineer", "Map Enthusiast"],
    tagline: "I build the software that turns messy transit data into forecasts people plan their day around.",
    cta: "View my work",
    resume: "View CV",
    scroll: "Scroll to explore",
  },

  about: {
    eyebrow: "About me",
    title: "Introduction",
    portraitAlt: "A drawn portrait of Noa",
    body: "I grew up in Gothenburg, studied computer science in Delft and have worked in Zurich since. I like the part of a project where research meets engineering: finding out what the data can really say, then building something that keeps saying it reliably. I now live in Montreal.",
    years: 3,
    stats: { experience: "Experience", completed: "Completed", workedIn: "Worked in" },
  },
  places: PLACES,
  /** The order the person moved in; the globe draws an arc between each pair. */
  journey: [PLACES.gothenburg, PLACES.delft, PLACES.zurich, PLACES.montreal],

  skills: {
    eyebrow: "Toolbox",
    title: "Technologies I work with",
    subtitle: "Each one counts the roles and projects it shows up in.",
    hint: "Pick one to see where it shows up.",
    rolesHeading: "Roles",
    projectsHeading: "Projects",
  },
  skillGroups: [
    { id: "frontend", name: "Frontend", skills: ["React", "TypeScript", "Tailwind CSS", "Three.js"] },
    { id: "backend", name: "Backend", skills: ["Node.js", "PostgreSQL", "Docker", "C++"] },
    { id: "data", name: "Data & AI", skills: ["Python", "PyTorch", "SQL", "dbt"] },
    { id: "cloud", name: "Cloud & DevOps", skills: ["AWS", "Kubernetes"] },
  ] satisfies SkillGroup[],

  experience: {
    eyebrow: "Career",
    title: "Where I've worked",
    subtitle: "A research lab, a startup and an internship.",
    orgTypes: { mnc: "MNC", startup: "Startup", "research-lab": "Research Lab" } satisfies Record<OrgType, string>,
    showMore: "Show more",
    showLess: "Show less",
    present: "Present",
  },
  experiences: [
    {
      id: "fernhill",
      company: "Fernhill Transit Lab",
      role: "Research Engineer",
      orgType: "research-lab",
      location: "Zurich",
      start: "2023-09",
      end: null,
      logoInitials: "FT",
      bullets: [
        "Built a delay forecaster for regional trains in Python and PyTorch.",
        "Moved the lab's data pipeline onto PostgreSQL and dbt.",
      ],
    },
    {
      id: "larkspur",
      company: "Larkspur Robotics",
      role: "Software Engineer",
      orgType: "startup",
      location: "Zurich",
      start: "2021-06",
      end: "2023-08",
      logoInitials: "LR",
      bullets: [
        "Wrote the fleet dashboard in React and TypeScript, with a Three.js map of the warehouse.",
        "Ran the Node.js services in Docker on AWS.",
      ],
    },
    {
      id: "tidewater",
      company: "Tidewater Data",
      role: "Data Analyst Intern",
      orgType: "mnc",
      location: "Delft",
      start: "2020-02",
      end: "2020-08",
      logoInitials: "TD",
      bullets: ["Cleaned shipping records with SQL and Python for a monthly report."],
    },
  ] satisfies Experience[],

  projects: {
    eyebrow: "Portfolio",
    title: "Selected projects",
    subtitle: "Coursework, research and things built for fun.",
    all: "All",
    viewCode: "Code",
    viewLive: "Live",
    filterLabel: "Filter by category",
    searchPlaceholder: "Search projects",
    searchLabel: "Search projects",
    noResults: "No projects match your search.",
    featured: "Featured",
    showMore: "Show more",
    showLess: "Show less",
    close: "Close",
    previous: "Previous picture",
    next: "Next picture",
    categories: { "data-science": "Data Science & AI", swe: "Software Eng.", cybersecurity: "Cybersecurity" } satisfies Record<ProjectCategory, string>,
    figs: {
      feistel: "One-bit input difference across six rounds, schematic",
      feistelAlt: "A Feistel network showing a one-bit input difference spreading over six rounds.",
      maze: "Breadth-first exploration, then the shortest path",
      mazeAlt: "A maze being explored breadth first, then its shortest path drawn.",
      colourise: "Grayscale input beside the network's output",
      colouriseAlt: "A street scene in grayscale and in colour, split by a slider.",
      colouriseSlider: "Move the split between the two pictures",
      colouriseHint: "drag to compare",
    },
  },
  projectList: [
    {
      id: "maze-robot",
      title: "Maze-solving robot",
      category: "swe",
      description: "A small wheeled robot that maps a maze as it drives, then takes the shortest way out.",
      tech: ["C++", "Python"],
      images: [],
      highlights: ["Course project", "Team of three"],
      featured: true,
      github: "https://github.com/",
    },
    {
      id: "toy-cipher",
      title: "Toy block cipher",
      category: "cybersecurity",
      description: "A four-round Feistel cipher written to watch a differential attack recover its key.",
      tech: ["Python"],
      images: [],
      highlights: ["Course project"],
    },
    {
      id: "photo-colouriser",
      title: "Photo colouriser",
      category: "data-science",
      description: "A convolutional network that guesses the colours of old grayscale photographs.",
      tech: ["Python", "PyTorch"],
      images: [],
      compare: { before: asset("/sample/street-gray.svg"), after: asset("/sample/street.svg") },
      featured: true,
    },
    {
      id: "delay-forecast",
      title: "Train delay forecaster",
      category: "data-science",
      description: "Forecasts how late each regional train will be, an hour ahead, from timetables and weather.",
      tech: ["Python", "PyTorch", "PostgreSQL"],
      images: [],
      highlights: ["Research"],
    },
    {
      id: "shopping-list",
      title: "Shared shopping list",
      category: "swe",
      description: "A list a household edits together, that works offline and merges when it reconnects.",
      tech: ["React", "TypeScript", "Node.js"],
      images: [],
      demo: "https://example.com/",
    },
    {
      id: "log-watch",
      title: "Log anomaly finder",
      category: "cybersecurity",
      description: "Flags unusual login patterns in server logs and explains why each one stood out.",
      tech: ["Python", "Docker"],
      images: [],
    },
    {
      id: "route-planner",
      title: "Bike route planner",
      category: "swe",
      description: "Plans bike routes that avoid steep hills, drawn on a map of the city.",
      tech: ["TypeScript", "React"],
      images: [],
    },
  ] satisfies Project[],

  testimonials: {
    eyebrow: "Testimonials",
    title: "What people say",
    subtitle: "From people Noa has worked with.",
    pause: "Pause testimonials",
    play: "Play testimonials",
  },
  testimonialList: [
    { id: "a", quote: "Noa found the bug in our timetable data that two of us had missed for a month, and then wrote the check that keeps it out.", name: "Elin Brask", title: "Lead, Fernhill Transit Lab", initials: "EB" },
    { id: "b", quote: "The dashboard Noa built is still the first thing our operators open in the morning.", name: "Tomás Ferreira", title: "CTO, Larkspur Robotics", initials: "TF" },
    { id: "c", quote: "Asks the question nobody else thought to ask, and then answers it with a chart.", name: "Hana Kovač", title: "Teaching assistant, Delft", initials: "HK" },
  ] satisfies Testimonial[],

  contact: {
    eyebrow: "Contact",
    title: "Let's build something together",
    subtitle: "I'm open to research engineering roles and interesting data. The fastest way to reach me is email.",
    emailCta: "Email me",
    or: "or find me on",
    copyEmail: "Copy email address",
    copied: "Email address copied",
  },
};
