/**
 * Single source of truth for portfolio content.
 * Edit values here — components consume the typed exports.
 */

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string; // longer copy, shown when expanded (Tier 1 only)
  stack: string[];
  tags: string[];
  metric?: string; // short headline-style metric for featured cards
  liveUrl?: string;
  codeUrl?: string;
};

export const NOW =
  "Right now: shipping the VAISS Compliance Auditor, prepping AWS AI Practitioner + Solutions Architect Associate, and watching how Australian enterprise AI governance evolves under VAISS.";

export const SUGGESTED_HERO_QUESTIONS = [
  "What has he built with agentic AI?",
  "Tell me about VAISS",
  "Is he open to roles?",
] as const;

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceEntry = {
  date: string;
  title: string;
  org: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  date: string;
  title: string;
  org: string;
  detail?: string;
};

export const SITE = {
  name: "Gaby Zaynoun",
  title: "AI Solutions Engineer",
  location: "Sydney, Australia",
  email: "gabyzaynoun6@gmail.com",
  linkedin: "https://www.linkedin.com/in/gaby-zaynoun-a453631bb/",
  github: "https://github.com/gabyzaynoun",
} as const;

export const HERO = {
  name: "Gaby Zaynoun",
  title: "AI Solutions Engineer",
  subhead:
    "I design and ship agentic AI systems, and I help enterprises understand what AI can actually do for them.",
  supporting:
    "Sydney, Australia · Software engineering background, Master of Software Engineering (AI Advanced) · Open to AI Solutions Engineer, AI presales, and AI consulting roles",
} as const;

export const ABOUT =
  "I'm an AI Solutions Engineer based in Sydney. My background is in software engineering — I hold a Master of Software Engineering with an AI Advanced specialisation — and I currently work in technical presales at one of APAC's largest IT distributors. I build agentic AI systems end-to-end, and I help enterprises cut through the noise to understand what AI can practically do for them. I'm bilingual in English and Arabic.";

/* ─── Skills ─────────────────────────────────────────────────────────────── */

export const SKILLS: SkillGroup[] = [
  {
    title: "Building with AI",
    items: [
      "Agentic system design — multi-agent orchestration, tool use, planning",
      "LLM application development — Anthropic Claude API, prompt engineering, structured output",
      "RAG & knowledge-grounded systems",
      "Streaming AI interfaces — real-time generation, SSE",
      "AI evaluation & calibration",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Full-stack development — Next.js, TypeScript, React",
      "Backend & APIs — Node.js, serverless, Supabase",
      "Cloud deployment — Vercel, AWS (Bedrock)",
      "Database design — PostgreSQL / Supabase",
    ],
  },
  {
    title: "AI for Enterprise",
    items: [
      "Technical presales & solution scoping",
      "AI governance & compliance — Australian Voluntary AI Safety Standard",
      "Translating AI capability into business value",
      "Customer-facing technical communication",
    ],
  },
];

/* ─── Projects ───────────────────────────────────────────────────────────── */

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "vaiss-auditor",
    title: "VAISS Compliance Auditor",
    oneLiner:
      "An agentic AI system that audits any AI system against Australia's Voluntary AI Safety Standard in under 60 seconds.",
    description:
      "The VAISS Compliance Auditor takes a plain-English description of an AI system and produces a board-ready compliance assessment against Australia's Voluntary AI Safety Standard and its 10 guardrails. " +
      "Built as a multi-agent pipeline: a risk classifier determines the system's risk tier, a guardrail scorer assesses all 10 guardrails with calibrated green/amber/red ratings, and three generators run in parallel to produce an AI inventory entry, a board memo, and a prioritised 90-day remediation plan. Results stream to the interface in real time. " +
      "The problem is concrete: every Australian enterprise running AI now faces 'are we VAISS-aligned?' from their board, and the current options are a $150k+ consulting engagement or a blank Word document. This tool produces a structured first-pass artefact in seconds — an assessment aid that gives a governance lead a starting position to react to, edit, and defend.",
    stack: [
      "Next.js",
      "TypeScript",
      "Anthropic Claude API",
      "Multi-agent orchestration",
      "Streaming SSE",
      "Vercel",
    ],
    tags: ["Agentic AI", "LLM Orchestration", "AI Governance", "Full-Stack"],
    metric: "60s audit · 5-stage agent pipeline · 10 guardrails · ~3¢ per run",
    liveUrl: "https://vaiss-auditor.vercel.app",
    codeUrl: "https://github.com/gabyzaynoun/vaiss-auditor",
  },
  {
    slug: "calcsolve",
    title: "CalcSolve",
    oneLiner:
      "AI calculus solver SaaS with step-by-step explanations, an AI tutor, gamified skill trees, and Stripe billing.",
    description:
      "CalcSolve is a production SaaS that solves calculus problems end-to-end and teaches the steps. The AI engine breaks each problem into named techniques (substitution, integration by parts, partial fractions, etc.) and walks the student through each step in natural language. Gamified skill trees give students a progression model, and Stripe handles tiered subscriptions. The challenge wasn't 'solve calculus' — LLMs can do that. It was wrapping the model in a UI that turns a one-shot answer into a teaching loop, with prompt structures that keep the explanations consistent and pedagogically sound.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    tags: ["AI/LLM", "SaaS", "EdTech"],
    metric: "Production SaaS · Step-by-step solver · Stripe billing live",
    liveUrl: "https://calcsolve.app",
  },
  {
    slug: "ai-dental-assistant",
    title: "AI Dental Assistant",
    oneLiner:
      "Full-stack AI assistant for dental practitioners — multi-session chat memory, response orchestration, PDF export.",
    description:
      "An AI assistant built specifically for the dental vertical I shipped production software in at Stoneglass Industries. Multi-session chat memory with intelligent response orchestration, structured PDF export for clinical workflows, and Firebase/Firestore auth + data. The domain expertise from three years building CAD/CAM tools for dental manufacturing — including a TensorFlow 3D alignment model — informed every product decision. This is what 'AI for a vertical' looks like when the developer actually understands the vertical.",
    stack: ["React", "Vite", "Firebase", "OpenAI API"],
    tags: ["AI/LLM", "Vertical AI", "Full-Stack"],
    metric: "Domain-grounded AI · Built on 3 years shipping for dental manufacturing",
    liveUrl: "https://ai-dental-assistant.vercel.app",
    codeUrl: "https://github.com/gabyzaynoun/ai-dental-assistant",
  },
  {
    slug: "tileverse",
    title: "Tileverse",
    oneLiner:
      "A multi-sided marketplace where users purchase, own, and customise unique coordinates on a shared 1,000,000-tile grid.",
    description:
      "Tileverse is a production marketplace I built solo end-to-end: Next.js frontend, Supabase for data + auth, Stripe for payments, and an anti-abuse system to prevent automated grid claims. The hard problems were the economic and trust ones — pricing curves for scarce digital assets, abuse-resistance without killing user experience, and a payments flow that handles both upfront purchases and ongoing customisation.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    tags: ["Full-Stack", "Marketplace", "SaaS"],
    metric: "1,000,000-tile grid · Built solo · Stripe + anti-abuse system in production",
    liveUrl: "https://tileverses.com",
  },
  {
    slug: "tradiespark",
    title: "TradieSpark",
    oneLiner:
      "Productised web agency platform building professional websites for Australian tradespeople.",
    description:
      "TradieSpark is a productised service business: brand, website, pricing, onboarding, and outbound sales — built and operated solo. Tradies need web presence but can't afford or evaluate a custom agency engagement. The product is a fixed-scope, fixed-price website with predictable delivery, sold and delivered with AI-assisted development. It's as much about scoping and pricing as code.",
    stack: ["WordPress", "Claude Code", "SEO"],
    tags: ["Full-Stack", "Productised Service"],
    metric: "Fixed-scope, fixed-price · Brand + site + sales operated solo",
    liveUrl: "https://tradiespark.com.au",
    codeUrl: "https://github.com/gabyzaynoun/tradiespark-website",
  },
];

export const MORE_PROJECTS: Project[] = [
  {
    slug: "findbytype",
    title: "FindByType",
    oneLiner:
      "Personality-based quiz platform with product recommendations and affiliate monetisation.",
    description: "",
    stack: ["Next.js", "React", "Stripe", "Amazon Associates"],
    tags: ["Full-Stack", "Product"],
  },
  {
    slug: "q-lex",
    title: "Q-Lex",
    oneLiner:
      "Completed sci-fi thriller novel with 150 AI-generated illustrations. Prepped for Amazon KDP + Gumroad launch.",
    description: "",
    stack: ["AI Image Generation", "Amazon KDP"],
    tags: ["Creative", "AI-Assisted"],
  },
  {
    slug: "blast-ring",
    title: "Blast Ring",
    oneLiner:
      "Mobile game on Google Play — wave-based ring shooter with boss fights, power-ups, and skins.",
    description: "",
    stack: ["Unity", "C#", "Google Play"],
    tags: ["Mobile", "Game Dev"],
    codeUrl: "https://github.com/gabyzaynoun/BlastRing",
  },
  {
    slug: "doctor-roster",
    title: "Doctor Roster System",
    oneLiner:
      "Scheduling system for multi-centre doctor rosters with constraints and auto-build logic.",
    description: "",
    stack: ["React", "TypeScript", "FastAPI", "SQLite"],
    tags: ["Full-Stack", "Scheduling"],
    codeUrl: "https://github.com/gabyzaynoun/doctor-roster",
  },
  {
    slug: "car-sales",
    title: "Car Sales App",
    oneLiner:
      "PHP/MySQL web app for selling cars — customer management, inventory CRUD, listing workflows.",
    description: "",
    stack: ["PHP", "MySQL"],
    tags: ["Full-Stack"],
    codeUrl: "https://github.com/gabyzaynoun/carproject",
  },
];

/* ─── Experience ─────────────────────────────────────────────────────────── */

export const EXPERIENCE: ExperienceEntry[] = [
  {
    date: "Nov 2025 — Present",
    title: "Presales Specialist",
    org: "Westcon-Comstor",
    location: "Sydney",
    summary:
      "Technical presales at one of APAC's largest IT distributors — solution scoping across major vendor portfolios, with an AWS focus.",
    highlights: [
      "Scope and propose solutions based on customer environment assessments",
      "Prepare technical quotations aligned with commercial targets",
      "Translate vendor technology into business value for non-technical buyers",
      "Manage multiple partner engagements under tight SLAs",
    ],
  },
  {
    date: "Feb 2022 — Aug 2025",
    title: "Software Engineer",
    org: "Stoneglass Industries",
    location: "Sydney",
    summary:
      "Built and maintained C#/.NET CAD/CAM desktop tooling used daily across dental manufacturing production lines.",
    highlights: [
      "Wrote and debugged WPF tools for production workflows over three years",
      "Automated CNC milling and 3D print job assignment — cut manual processing time by ~60%",
      "Built a TensorFlow 3D dental alignment model that beat ICP by ~25%",
      "Set up CI/CD pipelines through Azure DevOps for the engineering team",
    ],
  },
];

/* ─── Education & Credentials ────────────────────────────────────────────── */

export const EDUCATION: EducationEntry[] = [
  {
    date: "2020 — 2021",
    title: "Master of Software Engineering (AI Advanced)",
    org: "Torrens University Australia",
    detail: "Specialisation in applied AI and systems design.",
  },
  {
    date: "2016 — 2019",
    title: "Bachelor of Computer Engineering",
    org: "Lebanese International University",
    detail: "Systems thinking, mathematics, and structured problem-solving.",
  },
  {
    date: "Certified",
    title: "Anthropic Academy",
    org: "Anthropic",
    detail: "AI Fluency · Building with the Claude API",
  },
  {
    date: "In Progress",
    title: "AWS Certification Track",
    org: "Amazon Web Services",
    detail: "AI Practitioner · Solutions Architect Associate",
  },
];
