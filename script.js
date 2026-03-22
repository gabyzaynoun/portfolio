/* ─── Data ───────────────────────────────────────── */

const projects = [
  {
    title: "Tileverse",
    desc: "A digital marketplace where users purchase, own, and customise unique tile coordinates on a shared 1,000,000-tile grid. Full payment integration and anti-abuse system.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    liveUrl: "https://tileverses.com",
  },
  {
    title: "CalcSolve",
    desc: "SaaS calculus solver with step-by-step explanations, an AI tutor, gamified skill trees, and Stripe billing. Deployed on Vercel.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    liveUrl: "https://calcsolve.app",
  },
  {
    title: "TradieSpark",
    desc: "Service business building professional websites for Australian tradies. Brand, website, pricing, onboarding, and outbound sales — built from scratch.",
    stack: ["WordPress", "Claude Code", "SEO"],
    liveUrl: "https://tradiespark.com.au",
    codeUrl: "https://github.com/gabyzaynoun/tradiespark-website",
  },
  {
    title: "FindByType",
    desc: "Personality-based quiz platform with product recommendations, affiliate monetisation (Amazon Associates, Commission Factory), and an Android TWA wrapper.",
    stack: ["Next.js", "React", "Stripe", "Amazon Associates"],
  },
  {
    title: "Q-Lex",
    desc: "Sci-fi/tech thriller novel with 150 AI-generated illustrations. Prepared for launch on Amazon KDP and Gumroad with a 30-day launch plan.",
    stack: ["AI Image Generation", "Amazon KDP"],
  },
  {
    title: "AI Dental Assistant",
    desc: "Full-stack web app with multi-session chat memory, intelligent response orchestration, and PDF export. Auth and data via Firebase/Firestore.",
    stack: ["React", "Firebase", "OpenAI API", "Vite"],
    liveUrl: "https://ai-dental-assistant.vercel.app",
    codeUrl: "https://github.com/gabyzaynoun/ai-dental-assistant",
  },
  {
    title: "Cloud Uncensored AI",
    desc: "AI chat product pairing a React frontend with a Python FastAPI backend, deployed on Vercel.",
    stack: ["React", "FastAPI", "Python"],
    liveUrl: "https://cloud-uncensored-ai-app.vercel.app",
    codeUrl: "https://github.com/gabyzaynoun/cloud-uncensored-ai-app",
  },
  {
    title: "Doctor Roster System",
    desc: "Scheduling system for multi-center doctor rosters with constraints, role-based flows, and auto-build logic.",
    stack: ["React", "TypeScript", "FastAPI", "SQLite"],
    codeUrl: "https://github.com/gabyzaynoun/doctor-roster",
  },
  {
    title: "BlastRing",
    desc: "Mobile game published on Google Play Store — wave-based ring shooter with boss fights, power-ups, combo tracking, and skin customization.",
    stack: ["Unity", "C#", "Google Play"],
    codeUrl: "https://github.com/gabyzaynoun/BlastRing",
  },
  {
    title: "Car Sales App",
    desc: "PHP/MySQL web app for selling cars with customer management, inventory CRUD, and recent-listing workflows.",
    stack: ["PHP", "MySQL"],
    codeUrl: "https://github.com/gabyzaynoun/carproject",
  },
];

const skillGroups = [
  {
    title: "AI & ML",
    items: ["OpenAI API", "Anthropic Claude API", "Claude Code", "TensorFlow", "Prompt Engineering", "RAG Fundamentals", "AI Image Generation"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "HTML / CSS", "Vite"],
  },
  {
    title: "Backend & Data",
    items: ["C#", ".NET / WPF", "Python", "FastAPI", "Node.js", "PHP", "MySQL", "PostgreSQL", "Firebase", "Supabase", "Docker"],
  },
  {
    title: "Cloud & Enterprise",
    items: ["Azure DevOps", "Vercel", "CI/CD Pipelines", "REST APIs", "Stripe Integration", "Technical Presales", "Solution Architecture", "Stakeholder Communication"],
  },
];

const experience = [
  {
    date: "Nov 2025 — Present",
    title: "Presales Specialist — Westcon-Comstor, Sydney",
    desc: "Technical point of contact for channel partners across networking and cybersecurity vendor portfolios.",
    highlights: [
      "Scope and propose solutions based on customer environment assessments",
      "Prepare technical quotations aligned with commercial targets",
      "Break down vendor technologies for non-technical buyers",
      "Handle multiple partner engagements under tight SLAs",
    ],
  },
  {
    date: "Feb 2022 — Aug 2025",
    title: "Software Engineer — Stoneglass Industries, Sydney",
    desc: "Built and maintained C#/.NET CAD/CAM desktop applications used daily across dental manufacturing production lines.",
    highlights: [
      "Wrote and debugged WPF tools for production workflows over three years",
      "Automated CNC milling and 3D print job assignment — cut manual processing time by ~60%",
      "Built a TensorFlow model for 3D dental alignment that beat ICP by ~25%",
      "Set up CI/CD pipelines through Azure DevOps for the engineering team",
    ],
  },
];

const education = [
  {
    date: "2020 — 2021",
    title: "Master of Engineering — Torrens University, Australia",
    desc: "Advanced engineering studies with focus on applied AI and systems design.",
  },
  {
    date: "2019 — 2020",
    title: "Master of Computer Science — Lebanese International University",
    desc: "Graduate-level CS covering algorithms, machine learning, and software architecture.",
  },
  {
    date: "2016 — 2019",
    title: "BSc in Engineering — Lebanese International University",
    desc: "Engineering foundation — systems thinking, mathematics, and structured problem-solving.",
  },
];

const roles = [
  "AI Engineer / Generative AI Engineer",
  "LLM Application Developer",
  "Solutions Engineer / AI Solutions Engineer",
  "Developer Relations / Developer Advocate",
  "AI Implementation Consultant",
  "AI Automation Engineer",
  "Technical Account Manager (AI)",
  "Pre-Sales Engineer at AI-first companies",
];

/* ─── Render Functions ───────────────────────────── */

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = projects
    .map((p) => {
      const links = [];
      if (p.liveUrl) {
        links.push(
          `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="project-link project-link--orange">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live
          </a>`
        );
      }
      if (p.codeUrl) {
        links.push(
          `<a href="${p.codeUrl}" target="_blank" rel="noopener" class="project-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            GitHub
          </a>`
        );
      }
      if (!p.liveUrl && !p.codeUrl) {
        links.push(`<span class="project-tag">Coming soon</span>`);
      }

      return `
        <article class="project-card">
          <div class="project-card-header">
            <h3>${p.title}</h3>
            <span class="project-tag">${p.stack[0]}</span>
          </div>
          <p>${p.desc}</p>
          <div class="project-stack">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
          <div class="project-links">${links.join("")}</div>
        </article>
      `;
    })
    .join("");
}

function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  grid.innerHTML = skillGroups
    .map(
      (g) => `
      <div class="skill-group">
        <h3>${g.title}</h3>
        <ul>${g.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    `
    )
    .join("");
}

function renderTimeline(data, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = data
    .map((t) => {
      const highlightsHtml = t.highlights
        ? `<ul class="timeline-highlights">${t.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
        : "";
      return `
        <div class="timeline-item">
          <p class="timeline-date">${t.date}</p>
          <h3 class="timeline-title">${t.title}</h3>
          <p class="timeline-desc">${t.desc}</p>
          ${highlightsHtml}
        </div>
      `;
    })
    .join("");
}

function renderRoles() {
  const grid = document.getElementById("rolesGrid");
  if (!grid) return;
  grid.innerHTML = roles.map((r) => `<span class="role-tag">${r}</span>`).join("");
}

function renderYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── Custom Cursor ──────────────────────────────── */

function setupCursor() {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = "a, button, .project-card, .role-tag";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove("cursor-hover");
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "0.4";
  });
}

/* ─── Scroll Reveal ──────────────────────────────── */

function setupReveal() {
  const targets = document.querySelectorAll(
    ".reveal, .project-card, .skill-group, .timeline-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll(
            ".project-card, .skill-group, .timeline-item"
          );
          const index = Array.from(siblings).indexOf(entry.target);
          const delay = index >= 0 ? index * 70 : 0;

          setTimeout(() => {
            entry.target.classList.add("in-view");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
  );

  targets.forEach((t) => observer.observe(t));
}

/* ─── Mobile Menu ────────────────────────────────── */

function setupMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("open");
    });
  });
}

/* ─── Init ───────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  renderTimeline(experience, "experienceTimeline");
  renderTimeline(education, "educationTimeline");
  renderRoles();
  renderYear();
  setupCursor();
  setupReveal();
  setupMobileMenu();
});
