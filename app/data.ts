import type { IconType } from "react-icons";
import {
  SiPython,
  SiSharp,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFlask,
  SiDotnet,
  SiFastapi,
  SiBootstrap,
  SiDocker,
  SiGooglecloud,
  SiGithubactions,
  SiGit,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  TbDatabase,
  TbServer,
  TbCode,
  TbApi,
  TbSitemap,
  TbRefresh,
} from "react-icons/tb";

/* -------------------------------- Profile -------------------------------- */

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  intro: string;
  location: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
}

export const profile: Profile = {
  name: "Tony (Wen-Teng) Kang",
  shortName: "Tony Kang",
  role: "Software Engineer · MSc Computer Science",
  tagline: "Engineering clarity from data.",
  intro:
    "I build full-stack products, AI/ML tools and fintech systems — pairing a finance and economics background with hands-on engineering. Currently reading MSc Computer Science at the University of Birmingham.",
  location: "Birmingham, United Kingdom",
  status: "Graduate Visa · right to work in the UK",
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

// Honest, verifiable numbers.
export const stats: Stat[] = [
  { label: "Featured projects", value: 8, suffix: "" },
  { label: "1st-prize hackathon", value: 1, suffix: "" },
  { label: "Bootcamp hours", value: 1250, suffix: "+" },
  { label: "Public repositories", value: 20, suffix: "+" },
];

/* ------------------------------- Tech Stack ------------------------------ */

export interface Tech {
  name: string;
  icon?: IconType;
  color?: string;
}

export interface TechGroup {
  category: string;
  items: Tech[];
}

const ACCENT = "#7C3AED";

export const techGroups: TechGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C#", icon: SiSharp, color: "#9B4F96" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "SQL", icon: TbDatabase, color: ACCENT },
      { name: "VBA", icon: TbCode, color: ACCENT },
    ],
  },
  {
    category: "Frameworks & APIs",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Flask", icon: SiFlask, color: "#7C3AED" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "ASP.NET Core", icon: SiDotnet, color: "#512BD4" },
      { name: ".NET MAUI", icon: SiDotnet, color: "#512BD4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "GCP Cloud Run", icon: SiGooglecloud, color: "#4285F4" },
      { name: "AWS EC2", icon: FaAws, color: "#FF9900" },
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Git", icon: SiGit, color: "#F05032" },
    ],
  },
  {
    category: "Data & Practices",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MSSQL", icon: TbServer, color: ACCENT },
      { name: "RESTful API", icon: TbApi, color: ACCENT },
      { name: "UML", icon: TbSitemap, color: ACCENT },
      { name: "Agile / Scrum", icon: TbRefresh, color: ACCENT },
    ],
  },
];

/* -------------------------------- Projects ------------------------------- */

export type Category =
  | "AI & Data"
  | "Hackathon"
  | "Full-stack & Side"
  | "Team & Course";

export const categories: Category[] = [
  "AI & Data",
  "Hackathon",
  "Full-stack & Side",
  "Team & Course",
];

export interface ArchNode {
  label: string;
  sub?: string;
}
export interface ArchLayer {
  title: string;
  nodes: ArchNode[];
}
export interface Architecture {
  summary?: string;
  layers: ArchLayer[];
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  period: string;
  role: string;
  oneLiner: string;
  tags: string[];
  metric?: string;
  award?: string;
  image: string;
  repo?: string;
  live?: string;
  story: {
    background: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
  architecture: Architecture;
  /** Internal note: flags story details inferred beyond the CV — Tony to refine. */
  note?: string;
}

export const projects: Project[] = [
  /* ----------------------------- AI & Data ----------------------------- */
  {
    slug: "regulens",
    title: "ReguLens",
    category: "AI & Data",
    period: "2026",
    role: "Solo build",
    oneLiner:
      "A RegTech compliance stress-tester that spins up 1,000 AI-driven virtual users and runs a 90-day behavioural simulation to surface compliance risk before it reaches production.",
    tags: ["Python", "FastAPI", "React", "LLM", "Simulation"],
    metric: "1,000 virtual users · 90-day simulation",
    image: "/images/projects/regulens.jpg",
    repo: "https://github.com/Ynot1996/AI_Synthetic_Sandbox",
    live: "https://ukfin-london.vercel.app",
    story: {
      background:
        "Financial products have to satisfy a web of compliance rules, but teams rarely have a realistic population of users to test against. I wanted a sandbox that generates synthetic — but believable — user behaviour to pressure-test compliance logic.",
      challenge:
        "Model a thousand distinct users with plausible, varied behaviour over time, then turn raw events into compliance signals — fast enough to iterate on.",
      approach:
        "A FastAPI backend orchestrates an agent population where each virtual user has a profile that drives actions across a simulated 90-day window. A React dashboard visualises where compliance stress emerges at the population level.",
      outcome:
        "An end-to-end stress-testing harness where compliance hotspots surface from population behaviour, rather than from hand-written test cases.",
    },
    architecture: {
      summary:
        "A simulation engine sits between a React control surface and an event store, generating and scoring synthetic user behaviour.",
      layers: [
        { title: "Client", nodes: [{ label: "React Dashboard", sub: "controls + risk views" }] },
        { title: "API", nodes: [{ label: "FastAPI", sub: "REST endpoints" }] },
        {
          title: "Simulation Engine",
          nodes: [
            { label: "Agent Population", sub: "1,000 virtual users" },
            { label: "Scheduler", sub: "90-day timeline" },
            { label: "Compliance Scoring" },
          ],
        },
        {
          title: "Data",
          nodes: [
            { label: "Event Store" },
            { label: "Metrics / Aggregates" },
          ],
        },
      ],
    },
    note:
      "Internal layout inferred from the repo description; confirm exact engine/data details.",
  },
  {
    slug: "house-price-predictor",
    title: "Birmingham House Price Predictor",
    category: "AI & Data",
    period: "Jan 2026",
    role: "Personal project",
    oneLiner:
      "A machine-learning model that forecasts 2025 UK property values from 913,320 HM Land Registry records — lifting R² from negative to 0.46 through careful feature engineering.",
    tags: ["Python", "scikit-learn", "Pandas", "Random Forest"],
    metric: "913,320 records · R² 0.46",
    image: "/images/projects/house-price.jpg",
    repo: "https://github.com/Ynot1996/Birmingham-House-Price-Predictor",
    story: {
      background:
        "UK house prices are noisy and intensely location-driven. I wanted to see how far a classic model could go on real HM Land Registry data for 2024, forecasting 2025 valuations.",
      challenge:
        "The first model had a negative R² — literally worse than predicting the average. The signal was being drowned by noisy features and temporal leakage.",
      approach:
        "I engineered an 'Area_Type_Avg' feature (average price by postcode area and property type via target encoding), removed the 'Month' variable to eliminate temporal bias, and tuned a Random Forest (e.g. max_depth=10) with Pandas and scikit-learn for feature selection.",
      outcome:
        "R² climbed from negative to 0.4624 with overfitting under control — a clean demonstration that thoughtful feature engineering beats raw model complexity.",
    },
    architecture: {
      summary:
        "A classic supervised-learning pipeline from raw registry data to an evaluated model.",
      layers: [
        { title: "Data Source", nodes: [{ label: "HM Land Registry", sub: "913,320 rows (2024)" }] },
        {
          title: "Preprocessing",
          nodes: [
            { label: "Cleaning" },
            { label: "Target Encoding", sub: "Area_Type_Avg" },
            { label: "Feature Selection", sub: "drop Month bias" },
          ],
        },
        {
          title: "Model",
          nodes: [
            { label: "Random Forest" },
            { label: "Hyperparameter Tuning", sub: "max_depth=10" },
          ],
        },
        { title: "Evaluation", nodes: [{ label: "R² = 0.4624" }, { label: "Validation" }] },
      ],
    },
  },
  {
    slug: "stock-price-prediction",
    title: "Stock Price Prediction (LSTM)",
    category: "AI & Data",
    period: "Feb – May 2023",
    role: "Team project · ITRI",
    oneLiner:
      "A time-series pipeline that scrapes market data and forecasts stock prices with an LSTM network, served through a web app on AWS.",
    tags: ["Python", "LSTM", "BeautifulSoup", "AWS"],
    metric: "LSTM time-series",
    image: "/images/projects/stock.jpg",
    repo: "https://github.com/Ynot1996/tony_stock",
    story: {
      background:
        "At the Industrial Technology Research Institute (ITRI) I joined a team exploring whether deep learning could forecast short-term stock movements.",
      challenge:
        "Getting clean, continuous market data and framing price history as a supervised time-series problem the model could actually learn from.",
      approach:
        "We used Python with Requests and BeautifulSoup to scrape price data, then trained an LSTM for time-series forecasting, iterating with teammates to refine the analysis.",
      outcome:
        "We deployed a web application on AWS to demonstrate predictions — my first end-to-end machine-learning and cloud project.",
    },
    architecture: {
      layers: [
        { title: "Ingestion", nodes: [{ label: "Web Crawler", sub: "Requests + BeautifulSoup" }] },
        { title: "Storage", nodes: [{ label: "Price Dataset" }] },
        {
          title: "Model",
          nodes: [
            { label: "LSTM", sub: "time-series forecast" },
            { label: "Training / Inference" },
          ],
        },
        { title: "Delivery", nodes: [{ label: "Web App", sub: "AWS EC2" }] },
      ],
    },
    note: "Repo link points to tony_stock; confirm the canonical repo for this project.",
  },

  /* ----------------------------- Hackathon ----------------------------- */
  {
    slug: "eduinvest",
    title: "EduInvest",
    category: "Hackathon",
    period: "Mar 2026",
    role: "Team · FrontierTechX Hackathon",
    award: "🏆 1st Prize · FrontierTechX",
    oneLiner:
      "A decentralised Income Share Agreement platform on Solana that uses smart contracts to automate fund escrow and enforce transparent, immutable repayment terms.",
    tags: ["Solana", "Smart Contracts", "Web3", "React", "FinTech"],
    metric: "🏆 1st Prize",
    image: "/images/projects/eduinvest.jpg",
    repo: "https://github.com/Ynot1996/hackathon_project_ISA",
    story: {
      background:
        "Income Share Agreements let students fund their education by pledging a share of future income — but trust and transparency are hard to guarantee. Our team asked what a blockchain could add.",
      challenge:
        "Within a hackathon timebox, design and ship a system where repayment terms can't be quietly changed and escrow is genuinely trustless.",
      approach:
        "We architected a decentralised ISA platform on the Solana blockchain. Smart contracts automate fund escrow and lock repayment terms immutably, giving global investors transparency end-to-end.",
      outcome:
        "Won 1st Prize at FrontierTechX — recognised for the clarity of the architecture and a real fintech use case.",
    },
    architecture: {
      summary:
        "A React dApp talks to on-chain Solana programs for escrow and repayment, with an off-chain layer for reads.",
      layers: [
        { title: "Client", nodes: [{ label: "React dApp" }, { label: "Wallet", sub: "Solana wallet adapter" }] },
        {
          title: "On-chain Programs",
          nodes: [
            { label: "Escrow Contract" },
            { label: "Repayment Terms", sub: "immutable" },
          ],
        },
        { title: "State", nodes: [{ label: "Solana Ledger", sub: "on-chain accounts" }] },
        { title: "Off-chain", nodes: [{ label: "Indexer / UI Data" }] },
      ],
    },
  },

  /* -------------------------- Full-stack & Side ------------------------ */
  {
    slug: "mypocket",
    title: "MyPocket",
    category: "Full-stack & Side",
    period: "Mar – Sep 2025",
    role: "Capstone · 900-hour bootcamp",
    oneLiner:
      "A cross-platform personal-finance system with a .NET backend and RESTful API driving both web and mobile (MAUI) clients, deployed to GCP with full CI/CD.",
    tags: ["C#", ".NET MAUI", "ASP.NET Core", "Docker", "GCP"],
    metric: "+30% data-entry efficiency",
    image: "/images/projects/mypocket.jpg",
    repo: "https://github.com/Ynot1996/MyPocketSystem",
    story: {
      background:
        "Built as the capstone of an intensive 900-hour full-stack bootcamp run by Taiwan's Ministry of Labor, I wanted a real product rather than a toy CRUD app.",
      challenge:
        "Serve web and mobile from a single backend, keep accounting data clean, and secure multi-tier access — all production-deployable.",
      approach:
        "I architected a .NET (C#) backend exposing a RESTful API consumed by both a web client and a .NET MAUI mobile app. I built an accounting module with 11 expense and 5 income categories (improving data-entry efficiency by 30%) and RBAC with JWT for Standard, Subscription and Admin tiers.",
      outcome:
        "Containerised with Docker and deployed via GCP Cloud Run with Google Cloud SQL and GitHub Actions — a fully automated deployment lifecycle.",
    },
    architecture: {
      summary:
        "One ASP.NET Core API serves a web and a MAUI client; a CI/CD pipeline ships containers to GCP.",
      layers: [
        {
          title: "Clients",
          nodes: [
            { label: "Web App" },
            { label: "Mobile App", sub: ".NET MAUI" },
          ],
        },
        { title: "API", nodes: [{ label: "ASP.NET Core", sub: "RESTful · JWT + RBAC" }] },
        {
          title: "Services",
          nodes: [
            { label: "Accounting", sub: "11 expense · 5 income" },
            { label: "Auth / Tiers" },
          ],
        },
        { title: "Data", nodes: [{ label: "Google Cloud SQL" }] },
        { title: "DevOps", nodes: [{ label: "Docker" }, { label: "GitHub Actions" }, { label: "GCP Cloud Run" }] },
      ],
    },
  },

  /* ---------------------------- Team & Course -------------------------- */
  {
    slug: "flashlearn",
    title: "FlashLearn",
    category: "Team & Course",
    period: "Jan – Apr 2026",
    role: "Team of 5 · University of Birmingham",
    oneLiner:
      "A Python-based CS learning platform built by a 5-person Agile team across two sprints, with a security-first design and full UML modelling.",
    tags: ["Python", "Flask", "UML", "Agile", "Security"],
    metric: "5-person Agile · 2 sprints",
    image: "/images/projects/flashlearn.jpg",
    // repo link to be confirmed — no public repo found under the account yet
    repo: "",
    story: {
      background:
        "A University of Birmingham team project to build a platform that helps people learn computer-science fundamentals.",
      challenge:
        "Coordinate five people across two high-intensity sprints while keeping the architecture coherent and the platform secure.",
      approach:
        "I led the system-architecture phase, producing three UML diagram types (Use Case, Class, Sequence) to map 5+ complex user interactions and backend workflows, and hardened the platform with salted password hashing and Flask session management to neutralise rainbow-table attacks.",
      outcome:
        "A working, security-conscious learning platform delivered on an Agile cadence.",
    },
    architecture: {
      layers: [
        { title: "Client", nodes: [{ label: "Browser UI" }] },
        { title: "Application", nodes: [{ label: "Flask App", sub: "routes + sessions" }] },
        {
          title: "Domain & Security",
          nodes: [
            { label: "Auth", sub: "salted hashing" },
            { label: "Learning Logic" },
          ],
        },
        { title: "Data", nodes: [{ label: "Database" }] },
      ],
    },
    note: "Public repo / demo link to confirm with Tony.",
  },
  {
    slug: "focusedgroup",
    title: "focusedgroup",
    category: "Team & Course",
    period: "Coursework",
    role: "Group project",
    oneLiner:
      "A collaborative JavaScript web project focused on interaction design and shared ownership across a small team.",
    tags: ["JavaScript", "HTML/CSS", "Teamwork", "Git"],
    image: "/images/projects/placeholder.jpg",
    repo: "https://github.com/Ynot1996/focusedgroup",
    story: {
      background:
        "An early group build to practise working as a team inside a shared codebase.",
      challenge:
        "Dividing work cleanly and keeping a consistent user experience across multiple contributors.",
      approach:
        "We collaborated on a JavaScript front-end, splitting features and integrating them into one coherent experience using a shared git workflow.",
      outcome:
        "A shipped group project and hands-on experience with collaborative version control.",
    },
    architecture: {
      layers: [
        { title: "Client", nodes: [{ label: "HTML / CSS UI" }] },
        { title: "Logic", nodes: [{ label: "JavaScript", sub: "feature modules" }] },
        { title: "Data", nodes: [{ label: "Static / Local State" }] },
      ],
    },
    note: "Limited public detail — refine story and dates.",
  },
  {
    slug: "ooxx",
    title: "OOXX — Tic-Tac-Toe",
    category: "Team & Course",
    period: "Mar 2025",
    role: "Course project",
    oneLiner:
      "A browser Tic-Tac-Toe game built to drill core front-end fundamentals: game state, win detection and clean CSS.",
    tags: ["JavaScript", "CSS", "DOM", "Game"],
    image: "/images/projects/placeholder.jpg",
    repo: "https://github.com/Ynot1996/ooxx",
    live: "https://ynot1996.github.io/ooxx/",
    story: {
      background:
        "A from-scratch Tic-Tac-Toe to drill the fundamentals — the DOM, state management and styling.",
      challenge:
        "Tracking game state and detecting wins and draws reliably across every board configuration.",
      approach:
        "I implemented the board and turn logic in vanilla JavaScript with a tidy, responsive CSS layout.",
      outcome: "A small but complete, fully playable game.",
    },
    architecture: {
      layers: [
        { title: "View", nodes: [{ label: "Board UI", sub: "CSS grid" }] },
        {
          title: "Logic",
          nodes: [
            { label: "Turn State" },
            { label: "Win / Draw Check" },
          ],
        },
        { title: "Render", nodes: [{ label: "DOM Update" }] },
      ],
    },
  },
];

/* -------------------------------- Timeline ------------------------------- */

export type MilestoneKind =
  | "education"
  | "work"
  | "project"
  | "award"
  | "milestone";

export type Phase = "Finance & economics" | "Foundation" | "United Kingdom";

export interface Milestone {
  year: string;
  period: string;
  title: string;
  org: string;
  description: string;
  kind: MilestoneKind;
  phase: Phase; // groups the rail into a pre-transition career vs the engineering journey
  slug?: string; // links to a project detail page when relevant
}

// Oldest → newest (rendered left → right). Two phases: the pre-transition
// finance & economics career, then the pivot into software engineering.
export const timeline: Milestone[] = [
  /* ------------------- Phase 1 — finance & economics ------------------- */
  {
    year: "2015",
    period: "Sep 2015 – Jun 2019",
    title: "B.A. Economics",
    org: "Fu Jen Catholic University, Taiwan",
    description:
      "Foundations in data, behaviour and systems thinking that still inform how I approach software and product problems.",
    kind: "education",
    phase: "Finance & economics",
  },
  {
    year: "2020",
    period: "Dec 2020 – May 2021",
    title: "Citigold Acquisition Officer",
    org: "Citi",
    description:
      "Data-driven performance analysis to spot market insights and optimise investment strategies, contributing to 3–5% account growth per quarter.",
    kind: "work",
    phase: "Finance & economics",
  },
  {
    year: "2021",
    period: "Sep 2021 – May 2022",
    title: "Audit Innovation Officer",
    org: "Deloitte",
    description:
      "Oversaw data migration for 50+ companies (EMS → Levvia) and optimised complex Excel workflows for 30+ clients, completing audit tasks 25% faster than peers.",
    kind: "work",
    phase: "Finance & economics",
  },
  {
    year: "2022",
    period: "Sep 2022 – Feb 2023",
    title: "Assistant Relationship Manager",
    org: "Bank of East Asia · Corporate Banking",
    description:
      "Managed datasets for 20+ listed companies (USD 120M portfolio), cutting processing time 20%, and fed financial data into Moody's risk models across 5 reports.",
    kind: "work",
    phase: "Finance & economics",
  },

  /* ------------------- Phase 2 — software engineering ------------------ */
  {
    year: "2023",
    period: "Feb – May 2023",
    title: "AI & Big Data Course",
    org: "Industrial Technology Research Institute (ITRI)",
    description:
      "A 350-hour program in IT fundamentals, front/back-end and applied AI. Capstone: a Stock Price Prediction model (LSTM + web scraping) deployed on AWS.",
    kind: "education",
    phase: "Foundation",
    slug: "stock-price-prediction",
  },
  {
    year: "2023",
    period: "Nov 2023",
    title: "Crash Course on Python",
    org: "Google · Coursera",
    description:
      "Formalised Python foundations as I committed to the move into software engineering.",
    kind: "milestone",
    phase: "Foundation",
  },
  {
    year: "2024",
    period: "Jun 2024 – Mar 2025",
    title: "Self-directed transition to software",
    org: "Career break · self-study",
    description:
      "Dedicated time to a self-driven career change — mastering modern web fundamentals daily and building my first personal website.",
    kind: "milestone",
    phase: "Foundation",
  },
  {
    year: "2025",
    period: "Mar – Sep 2025",
    title: "MyPocket — Full-stack Capstone",
    org: "900-hour Program · Ministry of Labor",
    description:
      "Capstone of an intensive 900-hour bootcamp: a cross-platform finance system (.NET + MAUI) with JWT/RBAC, shipped to GCP Cloud Run via Docker and GitHub Actions.",
    kind: "project",
    phase: "Foundation",
    slug: "mypocket",
  },
  {
    year: "2025",
    period: "Sep 2025 – Sep 2026",
    title: "MSc Computer Science",
    org: "University of Birmingham, UK",
    description:
      "Data Structures & Algorithms, OOP, Computer Systems, and AI & ML — converting strong fundamentals into formal CS.",
    kind: "education",
    phase: "United Kingdom",
  },
  {
    year: "2026",
    period: "Jan 2026",
    title: "Birmingham House Price Predictor",
    org: "Personal project",
    description:
      "Random Forest on 913,320 HM Land Registry records; feature engineering took R² from negative to 0.46.",
    kind: "project",
    phase: "United Kingdom",
    slug: "house-price-predictor",
  },
  {
    year: "2026",
    period: "Jan – Apr 2026",
    title: "FlashLearn",
    org: "University of Birmingham",
    description:
      "Led the architecture for a 5-person Agile CS learning platform, with UML modelling and a security-first build.",
    kind: "project",
    phase: "United Kingdom",
    slug: "flashlearn",
  },
  {
    year: "2026",
    period: "Mar 2026",
    title: "EduInvest — 1st Prize 🏆",
    org: "FrontierTechX Hackathon",
    description:
      "A decentralised ISA platform on Solana using smart contracts for trustless escrow and immutable repayment terms.",
    kind: "award",
    phase: "United Kingdom",
    slug: "eduinvest",
  },
  {
    year: "2026",
    period: "2026",
    title: "ReguLens",
    org: "Personal project",
    description:
      "A RegTech stress-tester simulating 1,000 AI virtual users over 90 days to surface compliance risk (React + FastAPI).",
    kind: "project",
    phase: "United Kingdom",
    slug: "regulens",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
