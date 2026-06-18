import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiRedux,
  SiNodedotjs,
  SiPython,
  SiGraphql,
  SiPostgresql,
  SiDocker,
  SiVite,
  SiGit,
  SiFigma,
} from "react-icons/si";

/* -------------------------------- Profile -------------------------------- */

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export const profile: Profile = {
  name: "Tony Kang",
  role: "Software Engineer & MSc CS",
  tagline:
    "I combine economics, AI and product thinking to build polished digital tools, experiments and interfaces.",
  location: "United Kingdom",
  email: "wen114teng@gmail.com",
  github: "https://github.com/Ynot1996",
  linkedin: "https://www.linkedin.com/in/tony-kang-a353271bb/",
};

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { label: "Years building", value: 3, suffix: "+" },
  { label: "Public repos", value: 18, suffix: "+" },
  { label: "Projects shipped", value: 12, suffix: "+" },
  { label: "Design systems", value: 5, suffix: "+" },
];

/* ------------------------------- Tech Stack ------------------------------ */

export interface Tech {
  name: string;
  icon: IconType;
  color: string;
}

export interface TechGroup {
  category: string;
  items: Tech[];
}

export const techGroups: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#0A0A0F" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Three.js", icon: SiThreedotjs, color: "#0A0A0F" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

/* -------------------------------- Projects ------------------------------- */

export type Category = "AI & Data" | "Software" | "Collaboration" | "Portfolio";

export const categories: Category[] = [
  "AI & Data",
  "Software",
  "Collaboration",
  "Portfolio",
];

export interface Project {
  title: string;
  category: Category;
  blurb: string;
  tags: string[];
  metric?: string;
  href: string;
  repo: string;
  award?: string;
}

export const projects: Project[] = [
  {
    title: "Personal Website",
    category: "Portfolio",
    blurb:
      "A clean personal portfolio built to showcase craft, projects, and career direction with a polished visual tone.",
    tags: ["Next.js", "Tailwind", "Design"],
    href: "https://ynot1996.github.io/personal-website/",
    repo: "https://github.com/Ynot1996/personal-website",
  },
  {
    title: "MyPocketSystem",
    category: "Software",
    blurb:
      "A full-stack mobile commerce system built with .NET MAUI and cloud tooling to support real-world finance workflows.",
    tags: ["C#", ".NET MAUI", "GCP"],
    href: "https://github.com/Ynot1996/MyPocketSystem",
    repo: "https://github.com/Ynot1996/MyPocketSystem",
  },
  {
    title: "Birmingham House Price Predictor",
    category: "AI & Data",
    blurb:
      "A machine learning model and visualization suite that explores local property trends through data-driven storytelling.",
    tags: ["Python", "ML", "Data"],
    href: "https://github.com/Ynot1996/Birmingham-House-Price-Predictor",
    repo: "https://github.com/Ynot1996/Birmingham-House-Price-Predictor",
  },
  {
    title: "AI Synthetic Sandbox",
    category: "AI & Data",
    blurb:
      "A creative sandbox for generative AI experiments and synthetic data workflows, built to discover product possibilities.",
    tags: ["Python", "AI", "NLP"],
    href: "https://github.com/Ynot1996/AI_Synthetic_Sandbox",
    repo: "https://github.com/Ynot1996/AI_Synthetic_Sandbox",
  },
  {
    title: "focusedgroup",
    category: "Collaboration",
    blurb:
      "A team-driven JavaScript project that balances interaction design and shared ownership for a polished group experience.",
    tags: ["JavaScript", "Team", "UX"],
    href: "https://github.com/Ynot1996/focusedgroup",
    repo: "https://github.com/Ynot1996/focusedgroup",
  },
  {
    title: "ISA Hackathon Project",
    category: "Collaboration",
    blurb:
      "A fast-paced hackathon build focused on financial planning and UX, shipped in a compact team sprint.",
    tags: ["JavaScript", "Hackathon", "Product"],
    href: "https://github.com/Ynot1996/hackathon_project_ISA",
    repo: "https://github.com/Ynot1996/hackathon_project_ISA",
  },
];

/* -------------------------------- Timeline ------------------------------- */

export interface Milestone {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "work" | "education" | "milestone";
}

export const timeline: Milestone[] = [
  {
    year: "2024",
    period: "2024 — Present",
    title: "MSc Computer Science (Conversion)",
    org: "University of Birmingham",
    description:
      "Studying AI, software engineering and product systems while applying economics thinking to design-led digital experiences.",
    kind: "education",
  },
  {
    year: "2023",
    period: "2023 — 2024",
    title: "Audit Innovation Engineer",
    org: "Deloitte",
    description:
      "Delivered data-driven tooling and automation for audit workflows, focusing on clarity, usability and team efficiency.",
    kind: "work",
  },
  {
    year: "2022",
    period: "2022 — 2023",
    title: "Analytics Developer",
    org: "Citibank · BEA",
    description:
      "Built banking dashboards, internal analytics and production tooling that connected finance data to product decisions.",
    kind: "work",
  },
  {
    year: "2021",
    period: "2018 — 2021",
    title: "B.A. Economics",
    org: "Economics background",
    description:
      "Built a foundation in data, behavior and systems thinking that now informs software and AI product work.",
    kind: "education",
  },
];
