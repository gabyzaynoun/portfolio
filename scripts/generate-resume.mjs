#!/usr/bin/env node
/**
 * Generates Gaby Zaynoun's resume as a single-page, ATS-friendly DOCX.
 *
 * Why DOCX and not PDF: most ATS systems parse DOCX more reliably; recruiters
 * convert to PDF themselves if needed. Single column, system-default Arial
 * (universally available), no fancy multi-column layouts that ATS scrambles.
 *
 * Source-of-truth principle: every claim here mirrors what's on the portfolio
 * (lib/content.ts + lib/ai-context.ts) — same role title, same metrics, same
 * honest cloud breakdown. No overclaiming.
 *
 * Run: npm run generate-resume
 * Output: public/Gaby-Zaynoun-Resume.docx (replaces previous version)
 */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  AlignmentType,
  LevelFormat,
  HeadingLevel,
  BorderStyle,
  TabStopType,
  TabStopPosition,
} from "docx";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/Gaby-Zaynoun-Resume.docx");

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const ACCENT = "B0461E"; // muted warm orange to match portfolio accent
const FG = "111111";
const MUTED = "555555";
const RULE = "DDDDDD";

const p = (children, opts = {}) =>
  new Paragraph({ children, spacing: { after: 60, ...opts.spacing }, ...opts });

const text = (str, opts = {}) =>
  new TextRun({ text: str, font: "Arial", color: FG, ...opts });

const bullet = (str) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 40 },
    children: [text(str)],
  });

const sectionRule = () =>
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 1 } },
    spacing: { before: 0, after: 120 },
    children: [text("")],
  });

const sectionHeading = (label) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 180, after: 60 },
    children: [
      new TextRun({
        text: label.toUpperCase(),
        font: "Arial",
        bold: true,
        size: 22, // 11pt
        color: ACCENT,
        characterSpacing: 40,
      }),
    ],
  });

const roleHeader = (title, org, location, dates) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: 100, after: 20 },
    children: [
      text(`${title} | `, { bold: true }),
      text(`${org}, ${location}`, { bold: true }),
      text("\t"),
      text(dates, { color: MUTED, italics: true }),
    ],
  });

const projectHeader = (name, stack) =>
  new Paragraph({
    spacing: { before: 80, after: 20 },
    children: [
      text(`${name} — `, { bold: true }),
      text(stack, { color: MUTED }),
    ],
  });

const link = (label, url) =>
  new ExternalHyperlink({
    children: [new TextRun({ text: label, font: "Arial", color: ACCENT, underline: {} })],
    link: url,
  });

const skillRow = (label, items) =>
  new Paragraph({
    spacing: { after: 40 },
    children: [text(`${label}: `, { bold: true }), text(items)],
  });

/* ─── Document ──────────────────────────────────────────────────────────── */

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 /* 10pt */ } } },
    paragraphStyles: [
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { font: "Arial", size: 22, bold: true, color: ACCENT },
        paragraph: { spacing: { before: 180, after: 60 }, outlineLevel: 1 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 220 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 }, // US Letter
          margin: { top: 720, right: 1080, bottom: 720, left: 1080 }, // narrow margins, single-page
        },
      },
      children: [
        /* ─── Header ─── */
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Gaby Zaynoun",
              font: "Arial",
              bold: true,
              size: 36, // 18pt
              color: FG,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: "AI Solutions Engineer",
              font: "Arial",
              size: 24, // 12pt
              color: ACCENT,
              characterSpacing: 20,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 60 },
          children: [
            text("Sydney, Australia  ·  ", { color: MUTED }),
            link("gabyzaynoun6@gmail.com", "mailto:gabyzaynoun6@gmail.com"),
            text("  ·  ", { color: MUTED }),
            link("LinkedIn", "https://www.linkedin.com/in/gaby-zaynoun-a453631bb/"),
            text("  ·  ", { color: MUTED }),
            link("GitHub", "https://github.com/gabyzaynoun"),
            text("  ·  ", { color: MUTED }),
            link("gabyzportfolio.vercel.app", "https://gabyzportfolio.vercel.app"),
          ],
        }),

        /* ─── Summary ─── */
        sectionHeading("Profile"),
        sectionRule(),
        p([
          text(
            "Software engineer with 4+ years across C#/.NET desktop applications, full-stack web development, and AI integration. Currently in a technical presales role at Westcon-Comstor covering networking and cybersecurity vendor portfolios. Outside of work I design and ship my own products — web apps, SaaS tools, agentic AI applications, a mobile game, a marketplace, a book — using Next.js, React, Supabase, Stripe, and the OpenAI/Claude APIs. I learn by building things and putting them in front of real users.",
          ),
        ]),

        /* ─── Experience ─── */
        sectionHeading("Experience"),
        sectionRule(),
        roleHeader(
          "Presales Specialist",
          "Westcon-Comstor",
          "Sydney",
          "Nov 2025 – Present",
        ),
        bullet(
          "Technical point of contact for channel partners and resellers across networking and cybersecurity vendor portfolios at one of APAC's largest IT distributors.",
        ),
        bullet(
          "Scope and propose solutions based on customer environment assessments and infrastructure requirements.",
        ),
        bullet(
          "Prepare technical quotations and work with account managers to align deal scope with commercial targets.",
        ),
        bullet(
          "Break down vendor technologies for non-technical buyers in a way that connects to their actual business problems.",
        ),
        bullet(
          "Handle multiple partner engagements at once in a distribution environment with tight SLAs.",
        ),

        roleHeader(
          "Software Engineer",
          "Stoneglass Industries",
          "Sydney",
          "Feb 2022 – Aug 2025",
        ),
        bullet(
          "Built and maintained C#/.NET CAD/CAM desktop applications used daily across dental manufacturing production lines.",
        ),
        bullet(
          "Wrote and debugged WPF tools for production workflows over three years.",
        ),
        bullet(
          "Automated CNC milling and 3D print job assignment — cut manual processing time by ~60%.",
        ),
        bullet(
          "Built a TensorFlow 3D dental alignment model that beat the ICP baseline by ~25%.",
        ),
        bullet(
          "Set up CI/CD pipelines through Azure DevOps for the engineering team.",
        ),

        /* ─── Selected Projects ─── */
        sectionHeading("Selected Projects"),
        sectionRule(),

        projectHeader(
          "VAISS Compliance Auditor",
          "Next.js, TypeScript, Anthropic Claude API, multi-agent orchestration, Vercel",
        ),
        bullet(
          "Agentic AI application that audits any AI system against Australia's Voluntary AI Safety Standard and its 10 guardrails in under 60 seconds.",
        ),
        bullet(
          "Multi-agent pipeline: risk classifier, guardrail scorer, and three parallel generators producing an AI inventory entry, board memo, and 90-day remediation plan. Streams results in real time.",
        ),
        bullet(
          "Conservative scoring calibration so the tool under-claims rather than over-claims — built as an assessment aid for governance leads, with a disclaimer in-product.",
        ),
        bullet(
          "Currently porting to AWS as a hands-on cloud learning project. Live at vaiss-auditor.vercel.app.",
        ),

        projectHeader(
          "CalcSolve",
          "Next.js, Supabase, Stripe, Claude API",
        ),
        bullet(
          "Production SaaS calculus solver with step-by-step explanations, AI tutor, gamified skill trees, and Stripe billing across free and Pro tiers. Live at calcsolve.app.",
        ),

        projectHeader(
          "AI Dental Assistant",
          "React, Vite, Firebase, OpenAI API",
        ),
        bullet(
          "Full-stack AI assistant for the dental vertical with multi-session chat memory, response orchestration, and PDF export. Built directly on the three years of CAD/CAM domain experience from Stoneglass. Live at ai-dental-assistant.vercel.app.",
        ),

        projectHeader(
          "Tileverse",
          "Next.js, Supabase, Stripe",
        ),
        bullet(
          "Multi-sided marketplace where users purchase, own, and customise unique coordinates on a shared 1,000,000-tile grid. Built solo end-to-end with payments, anti-abuse, and ongoing customisation flow. Live at tileverses.com.",
        ),

        projectHeader(
          "TradieSpark",
          "WordPress, Claude Code, SEO",
        ),
        bullet(
          "Productised web agency for Australian tradespeople — fixed-scope, fixed-price websites. Built and operated solo: brand, site, pricing, onboarding, outbound sales. Live at tradiespark.com.au.",
        ),

        projectHeader(
          "Also shipped",
          "FindByType (Next.js quiz platform with affiliate monetisation), Q-Lex (sci-fi cyberpunk novel with 150 AI-generated illustrations, published on Amazon Kindle), Blast Ring (Unity mobile game, Google Play Store)",
        ),

        /* ─── Technical Skills ─── */
        sectionHeading("Technical Skills"),
        sectionRule(),
        skillRow("Languages", "C#, Python, JavaScript, TypeScript"),
        skillRow("Frameworks", ".NET, WPF, React, Next.js, TailwindCSS, Node.js"),
        skillRow(
          "AI / ML",
          "Anthropic Claude API, OpenAI API, Claude Code, TensorFlow, prompt engineering, RAG fundamentals, agentic system design (multi-agent orchestration, tool use, streaming interfaces)",
        ),
        skillRow(
          "Cloud & DevOps",
          "Azure (hands-on, DevOps CI/CD), Vercel (production), Firebase, Supabase. AWS & GCP — academic, with the VAISS AWS deployment in flight as a hands-on learning project. CI/CD via Azure DevOps and GitHub Actions. Docker basics.",
        ),
        skillRow("Databases", "PostgreSQL (Supabase), MySQL, Firestore"),
        skillRow(
          "Payments & commerce",
          "Stripe integration, Amazon Associates, affiliate systems",
        ),
        skillRow(
          "Web & CMS",
          "WordPress, SEO, Google Search Console, domain management",
        ),
        skillRow(
          "Other",
          "REST APIs, system design, technical presales & solution scoping, AI governance (Australia's Voluntary AI Safety Standard), stakeholder communication",
        ),

        /* ─── Education ─── */
        sectionHeading("Education"),
        sectionRule(),
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 40 },
          children: [
            text("Master of Engineering", { bold: true }),
            text(" | Torrens University, Australia"),
            text("\t"),
            text("2020 – 2021", { color: MUTED, italics: true }),
          ],
        }),
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 40 },
          children: [
            text("Master of Computer Science", { bold: true }),
            text(" | Lebanese International University"),
            text("\t"),
            text("2019 – 2020", { color: MUTED, italics: true }),
          ],
        }),
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 40 },
          children: [
            text("BSc in Engineering", { bold: true }),
            text(" | Lebanese International University"),
            text("\t"),
            text("2016 – 2019", { color: MUTED, italics: true }),
          ],
        }),

        /* ─── Certifications & Learning ─── */
        sectionHeading("Certifications & Continued Learning"),
        sectionRule(),
        bullet(
          "Anthropic Academy — AI Fluency · Building with the Claude API (certified)",
        ),
        bullet(
          "AWS AI Practitioner & Solutions Architect Associate — actively studying",
        ),

        /* ─── Languages ─── */
        sectionHeading("Languages"),
        sectionRule(),
        p([text("English (fluent) · Arabic (fluent)")]),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
await writeFile(OUT, buffer);
console.log(`Wrote ${OUT} — ${(buffer.length / 1024).toFixed(1)}KB`);
