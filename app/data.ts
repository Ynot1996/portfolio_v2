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
  SiDocker,
  SiGooglecloud,
  SiGithubactions,
  SiGit,
  SiPostgresql,
  SiMysql,
  SiPandas,
  SiScikitlearn,
  SiLangchain,
  SiPytest,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import {
  TbDatabase,
  TbServer,
  TbCode,
  TbApi,
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
  /** Public CV in /public — web copy without the phone number. */
  cv: string;
}

export const profile: Profile = {
  name: "Tony (Wen-Teng) Kang",
  shortName: "Tony Kang",
  role: "Software Engineer · MSc Computer Science (Distinction)",
  tagline: "Engineering clarity from data.",
  intro:
    "I build full-stack products, AI/ML tools and fintech systems — pairing a finance and economics background with hands-on engineering. MSc Computer Science (Distinction), University of Birmingham. Now looking for graduate and junior software engineering roles in the UK.",
  location: "London, United Kingdom",
  status: "Open to work · Right to work in the UK",
  email: "wen114teng@gmail.com",
  github: "https://github.com/Ynot1996",
  linkedin: "https://www.linkedin.com/in/tony-kang-uk",
  cv: "/Tony-Kang-CV.pdf",
};

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

// `stats` is defined after the `projects` array so the project count can be
// derived rather than hand-maintained — see the export below.

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
      { name: "Entity Framework Core", icon: SiDotnet, color: "#512BD4" },
      { name: "RESTful API", icon: TbApi, color: ACCENT },
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
    category: "Data, AI & Testing",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MSSQL", icon: TbServer, color: ACCENT },
      { name: "pandas", icon: SiPandas, color: "#E70488" },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "LangGraph", icon: SiLangchain, color: ACCENT },
      { name: "pytest", icon: SiPytest, color: "#0A9EDC" },
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
export interface ResultFigure {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** A project can belong to several types (e.g. an AI hackathon team build). */
  categories: Category[];
  period: string;
  /** Most-recent month as YYYYMM — used to sort projects newest → oldest. */
  dateValue: number;
  /** Highlighted as a recommended pick (shows a star on the card). */
  featured?: boolean;
  role: string;
  oneLiner: string;
  tags: string[];
  metric?: string;
  award?: string;
  image: string;
  /** How the screenshot fits its frame. Default "cover" (fill + crop);
   *  "contain" shows the whole image letterboxed; "fill" stretches to fill
   *  the frame with no crop (slight distortion) for wide/tall banners. */
  imageFit?: "cover" | "contain" | "fill";
  /** Optional object-position for the detail-page hero background. */
  heroPosition?: string;
  repo?: string;
  /** Shown instead of the repo button when the code isn't public. */
  repoNote?: string;
  live?: string;
  story: {
    background: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
  /** Figures explaining how the system works, shown before the results. */
  howItWorks?: ResultFigure[];
  /** A project shows its result figures, its architecture diagram, or both. */
  results?: ResultFigure[];
  architecture?: Architecture;
  /** Internal note: flags story details inferred beyond the CV — Tony to refine. */
  note?: string;
}

const allProjects: Project[] = [
  /* ----------------------------- AI & Data ----------------------------- */
  {
    slug: "multi-agent-code-repair",
    title: "When Does Root-Cause Analysis Pay Off?",
    categories: ["AI & Data", "Team & Course"],
    period: "Jun – Sep 2026",
    dateValue: 202609,
    featured: true,
    role: "MSc Dissertation · University of Birmingham",
    oneLiner:
      "A controlled study of feedback strategies in multi-agent LLM code repair — does diagnosing a bug before fixing it beat simply trying again? 6,810 task-runs say: not yet.",
    tags: ["Python", "LangGraph", "LLM evaluation", "Statistics", "pytest"],
    metric: "Feedback ~2× repair rate · 6,810 runs",
    image: "/images/projects/rca/repair-rate.png",
    repoNote: "Private repository",
    story: {
      background:
        "Multi-agent code-repair systems increasingly diagnose a root cause before repairing a program, on the assumption that finding the cause produces a better fix. Few studies compare that with simply spending the same call budget on more independent attempts. My MSc dissertation measured it.",
      challenge:
        "Isolate the feedback step in an otherwise fixed generate–execute–repair loop and price each piece of diagnostic machinery fairly — same pipeline, same model, same call budget, and no hidden-test content ever reaching a prompt.",
      approach:
        "I designed a five-rung ladder — best-of-k resampling, raw execution feedback, free-form self-diagnosis, a fixed root-cause schema and an isolated Analyzer agent — built as LangGraph state machines over shared nodes, with offline tests asserting that no hidden-suite output or Coder history leaks where it shouldn't. Runs crossed HumanEval+ and LiveCodeBench with Llama 3.3 70B and 3.1 8B, three repetitions per cell: 6,810 task-runs. I spotted 27 of 63 LiveCodeBench tasks returning the same terminal error in every cell and traced 16 of them to the benchmark scorer itself; I quarantined 945 runs, rebuilt the scorer and validated it with an oracle probe and a deliberately corrupted control. Implementation was AI-assisted to my specifications: I recorded seven episodes where assistant output had to be corrected or rejected, and had every reported statistic re-derived from the raw runs before submission.",
      outcome:
        "Execution feedback nearly doubled the repair rate (0.264 → 0.514) and gave the 70B model +4.1 pp solve rate over call-matched resampling. Nothing above it — free-form reflection, a root-cause schema or an isolated Analyzer — added a reliable gain, and resampling was the cheapest per problem solved in every cell, by 1.8–4.2×. The practical rule: before adding a diagnosis step, check that the feedback can name the failure and that the diagnosis beats the class prior.",
    },
    howItWorks: [
      {
        src: "/images/projects/rca/pipeline.png",
        alt: "Pipeline diagram: the Coder generates a program, the Executor runs it; a hidden suite scores pass or fail and is never shown to the model, while a visible channel of worked examples feeds a diagnosis step, after which the Coder repairs and the loop repeats until pass or budget exhausted",
        caption:
          "The repair loop, held fixed throughout. The Coder generates a program and a deterministic Executor runs it. A hidden suite decides pass or fail but never reaches a prompt; feedback comes only from a separate visible channel. The diagnosis step is the one thing that changes between conditions.",
        width: 1692,
        height: 984,
      },
      {
        src: "/images/projects/rca/ladder.png",
        alt: "The condition ladder: C0 samples and executes; C1 generates, executes and repairs; C2 and C3 add a diagnose step in the Coder's own thread; C4 adds an isolated Analyzer before repair",
        caption:
          "The five conditions. Each rung adds one component — execution feedback, a diagnosis turn, a fixed schema, then an isolated Analyzer agent — so each step up prices one design decision.",
        width: 1925,
        height: 1025,
      },
    ],
    results: [
      {
        src: "/images/projects/rca/repair-rate.png",
        alt: "Bar chart of repair rate by condition: C0 resampling 0.264, C1 raw feedback 0.514, C2 free-form 0.500, C3 schema 0.556, C4 isolated Analyzer 0.403",
        caption:
          "Repair rate on 72 shared failing starts (HumanEval+, 70B). Execution feedback nearly doubles it; the isolated Analyzer (C4) falls back.",
        width: 1116,
        height: 612,
      },
      {
        src: "/images/projects/rca/solve-rate.png",
        alt: "Four bar charts of solve rate by condition for HumanEval+ and LiveCodeBench with the 70B and 8B models",
        caption:
          "Solve rate in all four cells. Every repair strategy beats resampling for the 70B model and falls below it for the 8B.",
        width: 2200,
        height: 1600,
      },
      {
        src: "/images/projects/rca/cost-accuracy.png",
        alt: "Four scatter plots of solve rate against thousand tokens per task, with C0 resampling marked by grey lines",
        caption:
          "Solve rate against tokens spent per task. No strategy lands in the upper-left quadrant: none beats resampling on both accuracy and cost.",
        width: 2200,
        height: 1600,
      },
    ],
  },
  {
    slug: "regulens",
    title: "ReguLens",
    categories: ["AI & Data", "Hackathon", "Team & Course"],
    period: "Jun 2026",
    dateValue: 202606,
    featured: true,
    role: "Team · UKFIN+ Hackathon",
    oneLiner:
      "A compliance early-warning platform that helps regulators like the FCA analyse consumer complaints and flag emerging harm early.",
    tags: ["Python", "FastAPI", "React", "NLP", "LLM"],
    metric: "130,000+ complaints · recognised by the judges",
    image: "/images/projects/regulens.png",
    repo: "https://github.com/Ynot1996/ukfin-london",
    live: "https://ukfin-london.vercel.app",
    story: {
      background:
        "Regulators like the FCA receive huge volumes of consumer complaints, but spotting systemic harm across them is slow and largely manual.",
      challenge:
        "Read the entire complaints corpus, group recurring problems, and decide what a supervision team should act on first.",
      approach:
        "ReguLens runs an LLM-driven pipeline over 130,000+ complaint records to cluster recurring harm, then ranks each cluster by severity and volume. A FastAPI service exposes live metrics and an escalation queue to a React dashboard, so supervisors see the highest-priority issues first.",
      outcome:
        "A supervision tool that turns a raw complaints firehose into a ranked, actionable early-warning list.",
    },
    architecture: {
      summary:
        "Complaints flow through an NLP/LLM pipeline that clusters and ranks harm, surfaced to supervisors via a React dashboard.",
      layers: [
        { title: "Client", nodes: [{ label: "React Dashboard", sub: "ranked harm views" }] },
        { title: "API", nodes: [{ label: "FastAPI", sub: "live metrics · escalation queue" }] },
        {
          title: "Analysis Pipeline",
          nodes: [
            { label: "Ingestion", sub: "130,000+ complaints" },
            { label: "NLP / LLM Clustering" },
            { label: "Severity Ranking" },
          ],
        },
        {
          title: "Data",
          nodes: [{ label: "Complaints Store" }, { label: "Clusters / Scores" }],
        },
      ],
    },
  },
  {
    slug: "house-price-predictor",
    title: "Birmingham House Price Predictor",
    categories: ["AI & Data"],
    period: "Jan 2026",
    dateValue: 202601,
    role: "Personal project",
    oneLiner:
      "A machine-learning model that forecasts UK house prices from 913,320 HM Land Registry records.",
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
  /* ----------------------------- Hackathon ----------------------------- */
  {
    slug: "eduinvest",
    title: "EduInvest",
    categories: ["Hackathon", "Team & Course"],
    period: "Mar 2026",
    dateValue: 202603,
    role: "Team · FrontierTechX Hackathon",
    award: "🏆 1st Prize · FrontierTechX",
    oneLiner:
      "A decentralised Income Share Agreement platform on Solana with trustless escrow and immutable repayment terms.",
    tags: ["Solana", "Smart Contracts", "Web3", "React", "FinTech"],
    metric: "🏆 1st Prize",
    image: "/images/projects/eduinvest.jpeg",
    imageFit: "contain",
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
  {
    slug: "life200",
    title: "Life200",
    categories: ["AI & Data", "Full-stack & Side"],
    period: "Oct 2026 – now",
    dateValue: 202610,
    role: "Solo build · in progress",
    oneLiner:
      "A job-search co-pilot: one master profile of everything you've done, a JD-tailored CV and answers for each role, pre-filled application forms — and you review and press submit.",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Celery", "Playwright", "Next.js"],
    metric: "Fact guard: the LLM may reword, never invent",
    image: "/images/projects/life200.png",
    repo: "https://github.com/Ynot1996/life200",
    story: {
      background:
        "Applying for jobs means rewriting the same CV dozens of times, re-typing the same answers into every form, and losing track of where each application stands.",
      challenge:
        "Automate the repetitive parts without letting an LLM invent experience or submit on your behalf — and without breaching job sites' terms by creating accounts or scraping LinkedIn.",
      approach:
        "Life200 keeps one master profile and lets the LLM only select, reorder and reword facts from it; every tailored CV passes a deterministic fact guard before you see it. The plan runs in demoable phases: CV ingestion with structured LLM output, job discovery across Adzuna, Reed, Greenhouse, Lever and Ashby with a UK visa-sponsor filter, embedding-based matching and tailoring, a Next.js review workspace, Playwright pre-filling that stops before submit, and application tracking.",
      outcome:
        "Phase 0 is complete: repository, tooling, CI on every push, a health API, the master-profile schema and the fact guard — on a strict-typed Python stack (uv, ruff, mypy, pytest). Next: uploading past CVs into the master profile.",
    },
    architecture: {
      summary:
        "Planned architecture: a FastAPI service and Celery workers around one Postgres + pgvector store, with a Next.js workspace for review.",
      layers: [
        { title: "Client", nodes: [{ label: "Next.js Review Workspace", sub: "side-by-side CV diff · approve" }] },
        { title: "API", nodes: [{ label: "FastAPI", sub: "Pydantic v2 · typed routes" }] },
        {
          title: "Services",
          nodes: [
            { label: "Fact Guard", sub: "deterministic check" },
            { label: "Match + Tailor", sub: "LLM · embeddings" },
            { label: "Job Discovery", sub: "board connectors" },
          ],
        },
        {
          title: "Workers",
          nodes: [
            { label: "Celery + Redis", sub: "scheduled search · LLM calls" },
            { label: "Playwright", sub: "pre-fill, stop before submit" },
          ],
        },
        { title: "Data", nodes: [{ label: "PostgreSQL 16", sub: "+ pgvector" }] },
      ],
    },
  },

  /* -------------------------- Full-stack & Side ------------------------ */
  {
    slug: "votive",
    title: "Votive",
    categories: ["Full-stack & Side"],
    period: "Oct 2026 – now",
    dateValue: 202610,
    role: "Solo build · in progress",
    oneLiner:
      "Walk into a church in your browser and light a candle — five 3D churches with real capacity, a live queue at the door, and candles that burn down in real time.",
    tags: ["TypeScript", "React", "Three.js", "WebSocket", "SQLite", "Stripe"],
    metric: "5 churches · live queue · real-time candles",
    image: "/images/projects/votive.png",
    repoNote: "Private repository",
    story: {
      background:
        "A quiet ritual, rebuilt for the browser: choose one of five churches — from Notre-Dame de Paris at real scale to a Romanesque village chapel and a modern concrete chapel — walk in, and light a candle.",
      challenge:
        "Make a shared space feel real online. Every church has a limited number of places, visitors queue at the door when it's full, and candles burn down in real time and can't be relit — while keeping sign-in and payments trustworthy.",
      approach:
        "A Node/TypeScript server holds each church's capacity and a first-come-first-served queue over WebSockets: walking out through the door hands your place to the next person, and an unused admission lapses after 90 seconds. Each church is its own Three.js world — building, collision, lighting, light shafts and sound — behind a shared interface, and all audio is synthesised with the Web Audio API. Sign-in verifies Google and Apple ID tokens with hashed sessions in an HttpOnly cookie; Stripe Checkout prices come from the server, and fulfilment is idempotent with a webhook as backup.",
      outcome:
        "A working desktop build with free tealights and paid votive and pillar candles. Next: mobile touch controls and iOS/Android apps.",
    },
    architecture: {
      summary:
        "A Three.js client talks to one Node server over WebSockets and REST; the server owns capacity, queues, sessions and payments.",
      layers: [
        {
          title: "Client",
          nodes: [
            { label: "React + Three.js", sub: "5 churches · first-person" },
            { label: "Web Audio", sub: "synthesised sound" },
          ],
        },
        { title: "Transport", nodes: [{ label: "WebSocket", sub: "rooms · queue" }, { label: "REST /api" }] },
        {
          title: "Server · Node",
          nodes: [
            { label: "Rooms & Queue", sub: "capacity · 90 s hold" },
            { label: "Auth", sub: "Google / Apple ID tokens" },
            { label: "Payments", sub: "Stripe · idempotent" },
          ],
        },
        { title: "Data", nodes: [{ label: "SQLite", sub: "node:sqlite" }] },
      ],
    },
  },
  {
    slug: "mypocket",
    title: "MyPocket",
    categories: ["Full-stack & Side"],
    period: "Mar – Sep 2025",
    dateValue: 202509,
    role: "Solo build · 900-hour programme",
    oneLiner:
      "A complete personal-finance system — transactions, budgets and savings goals — with one .NET API serving both web and mobile (MAUI).",
    tags: ["C#", ".NET MAUI", "ASP.NET Core", "Docker", "GCP"],
    metric: "Solo build · web + mobile from one API",
    image: "/images/projects/mypocket.png",
    imageFit: "fill",
    heroPosition: "center 22%",
    repo: "https://github.com/Ynot1996/MyPocketSystem",
    live: "https://mypocket-web-app.azurewebsites.net",
    story: {
      background:
        "Built as the capstone of an intensive 900-hour full-stack bootcamp run by Taiwan's Ministry of Labor, I wanted a real product rather than a toy CRUD app.",
      challenge:
        "Serve web and mobile from a single backend, keep accounting data clean, and secure multi-tier access — all production-deployable.",
      approach:
        "Working single-handedly from the data model and UML design onwards, I built an ASP.NET Core REST API consumed by both a web client and a .NET MAUI mobile app, covering transactions, budgets and savings goals. Access is role-based across Standard, Subscription and Admin tiers with BCrypt-hashed credentials, plus an admin panel for user and subscription management.",
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
        { title: "API", nodes: [{ label: "ASP.NET Core", sub: "RESTful · RBAC" }] },
        {
          title: "Services",
          nodes: [
            { label: "Accounting", sub: "transactions · budgets · goals" },
            { label: "Auth / Tiers", sub: "BCrypt" },
            { label: "Admin Panel", sub: "users · subscriptions" },
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
    categories: ["Team & Course"],
    period: "Jan – Apr 2026",
    dateValue: 202604,
    role: "Led architecture · team of 5",
    oneLiner:
      "A Python CS-learning platform built by a 5-person Agile team, with a security-first design.",
    tags: ["Python", "Flask", "UML", "Agile", "Security"],
    metric: "5-person Agile · 2 sprints",
    image: "/images/projects/flashlearn.png",
    repo: "https://github.com/Ynot1996/BUS-Group-Project",
    story: {
      background:
        "A University of Birmingham team project to build a platform that helps people learn computer-science fundamentals.",
      challenge:
        "Coordinate five people across two high-intensity sprints while keeping the architecture coherent and the platform secure.",
      approach:
        "I led the system-architecture phase, producing three UML diagram types (Use Case, Class, Sequence) to map 5+ complex user interactions and backend workflows, and hardened the platform with salted password hashing and Flask session management to neutralise rainbow-table attacks. I also ran the team's Git/GitHub and Trello workflow across both sprints.",
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
  },
  {
    slug: "focusedgroup",
    title: "focusedgroup",
    categories: ["AI & Data", "Team & Course"],
    period: "Feb – May 2023",
    dateValue: 202305,
    role: "Team project · ITRI",
    oneLiner:
      "A financial platform with real-time stock data and LSTM-powered price forecasting, built as part of the ITRI AI & Big Data programme.",
    tags: ["JavaScript", "Python", "LSTM", "FinTech"],
    image: "/images/projects/focusedgroup.png",
    repo: "https://github.com/Ynot1996/focusedgroup",
    live: "https://focusedgroup.onrender.com",
    story: {
      background:
        "As the capstone of the ITRI AI & Big Data programme, our team set out to build a real financial platform — not just a demo — with live market data and a machine-learning forecasting layer.",
      challenge:
        "Combining a reliable financial data feed, an LSTM time-series model, and a usable web interface into one cohesive team product on a short timeline.",
      approach:
        "We scraped market data with Python (Requests / BeautifulSoup) and trained an LSTM model for price forecasting. A JavaScript front-end surfaces the predictions alongside real-time stock information in a clean, shared interface built collaboratively via Git.",
      outcome:
        "A shipped financial platform with working stock prediction — and my first experience integrating ML output into a deployed web product.",
    },
    architecture: {
      summary: "A Python ML pipeline feeds predictions into a JavaScript financial dashboard.",
      layers: [
        { title: "Client", nodes: [{ label: "JS Financial Dashboard", sub: "real-time data + charts" }] },
        {
          title: "ML Pipeline",
          nodes: [
            { label: "Web Crawler", sub: "Requests + BeautifulSoup" },
            { label: "LSTM Model", sub: "time-series forecast" },
          ],
        },
        { title: "Data", nodes: [{ label: "Price Dataset" }, { label: "Prediction Output" }] },
      ],
    },
  },
  {
    slug: "ooxx",
    title: "OOXX — Tic-Tac-Toe",
    categories: ["Full-stack & Side"],
    period: "Mar 2025",
    dateValue: 202503,
    role: "Personal side project",
    oneLiner:
      "A browser Tic-Tac-Toe game drilling front-end fundamentals — state, win detection, clean CSS.",
    tags: ["JavaScript", "CSS", "DOM", "Game"],
    image: "/images/projects/ooxx.png",
    imageFit: "contain",
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

// newest → oldest, so the grid always leads with the most recent work
export const projects: Project[] = [...allProjects].sort(
  (a, b) => b.dateValue - a.dateValue
);

// Honest, verifiable numbers. The project count is derived from `projects`
// so it never drifts out of sync when projects are added or removed.
export const stats: Stat[] = [
  { label: "Featured projects", value: projects.length, suffix: "" },
  { label: "1st-prize hackathon", value: 1, suffix: "" },
  { label: "Bootcamp hours", value: 1250, suffix: "+" },
  { label: "Public repositories", value: 20, suffix: "+" },
];

/* -------------------------------- Timeline ------------------------------- */

export type MilestoneKind =
  | "education"
  | "work"
  | "project"
  | "award"
  | "milestone";

export type Phase = "Finance & economics" | "Foundation" | "Birmingham" | "London";

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

// Oldest → newest (rendered left → right). Four phases: the pre-transition
// finance & economics career, the pivot into software, the MSc in
// Birmingham, then the move to London.
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
    org: "Citibank · Wealth Management",
    description:
      "Data-driven analysis of client portfolios to identify market opportunities and refine investment strategy, contributing 3–5% account growth per quarter.",
    kind: "work",
    phase: "Finance & economics",
  },
  {
    year: "2021",
    period: "Sep 2021 – May 2022",
    title: "Audit Innovation Staff",
    org: "Deloitte · Skills Development Hub",
    description:
      "Built VBA automation for a system migration across 50+ client entities, eliminating repeated manual reconciliation.",
    kind: "work",
    phase: "Finance & economics",
  },
  {
    year: "2022",
    period: "Sep 2022 – Feb 2023",
    title: "Assistant Relationship Manager",
    org: "Bank of East Asia · Corporate Lending",
    description:
      "Rebuilt internal risk reporting for a USD 120M corporate lending portfolio into a visual workflow, cutting preparation time by around 20%.",
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
      "A 350-hour program in IT fundamentals, front/back-end and applied AI. Capstone: a financial platform with LSTM stock forecasting (focusedgroup) deployed as a team.",
    kind: "education",
    phase: "Foundation",
    slug: "focusedgroup",
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
      "Capstone of an intensive 900-hour programme: a personal finance system built single-handedly, with one ASP.NET Core API serving web and .NET MAUI clients and RBAC across three tiers.",
    kind: "project",
    phase: "Foundation",
    slug: "mypocket",
  },
  {
    year: "2026",
    period: "Jan 2026",
    title: "Birmingham House Price Predictor",
    org: "Personal project",
    description:
      "Random Forest on 913,320 HM Land Registry records; feature engineering took R² from negative to 0.46.",
    kind: "project",
    phase: "Birmingham",
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
    phase: "Birmingham",
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
    phase: "Birmingham",
    slug: "eduinvest",
  },
  {
    year: "2026",
    period: "Jun 2026",
    title: "ReguLens",
    org: "UKFIN+ Hackathon",
    description:
      "A compliance early-warning platform for regulators like the FCA — an LLM-driven pipeline over 130,000+ complaints, surfaced via React + FastAPI.",
    kind: "project",
    phase: "Birmingham",
    slug: "regulens",
  },
  {
    year: "2026",
    period: "Jun – Sep 2026",
    title: "MSc Dissertation",
    org: "Root-cause analysis in LLM code repair",
    description:
      "A controlled study of feedback strategies in multi-agent LLM code repair across 6,810 task-runs.",
    kind: "project",
    phase: "Birmingham",
    slug: "multi-agent-code-repair",
  },

  /* ----------------------- Phase 4 — a new chapter ---------------------- */
  {
    year: "2026",
    period: "Sep 2026",
    title: "Moved to London",
    org: "A new chapter",
    description:
      "Relocated to London after the MSc to start the next stage of my engineering career.",
    kind: "milestone",
    phase: "London",
  },
  {
    year: "2026",
    period: "Oct 2026 – now",
    title: "Life200",
    org: "In progress",
    description: "A job-search co-pilot: one master profile, JD-tailored CVs that pass a fact guard, pre-filled applications.",
    kind: "project",
    phase: "London",
    slug: "life200",
  },
  {
    year: "2026",
    period: "Oct 2026 – now",
    title: "Votive",
    org: "In progress",
    description: "Light a candle in a 3D church in your browser — live capacity, queues and real-time candles.",
    kind: "project",
    phase: "London",
    slug: "votive",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
