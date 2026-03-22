/* ─── Data ───────────────────────────────────────── */

const projects = [
  {
    title: "Tileverse",
    desc: "A digital tile coordinate marketplace — your own permanent spot on a shared 1,000,000-tile map for creators, freelancers, and businesses.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    liveUrl: "https://tileverses.com",
  },
  {
    title: "CalcSolve",
    desc: "An AI calculus solver SaaS with step-by-step solutions across derivatives, integrals, and more — plus gamified skill trees and an AI tutor.",
    stack: ["Next.js", "Supabase", "Stripe", "Claude API"],
    liveUrl: "https://calcsolve.app",
  },
  {
    title: "TradieSpark",
    desc: "Mobile-first local business website focused on conversion and clear service communication for Australian tradies.",
    stack: ["WordPress", "Claude Code"],
    liveUrl: "https://tradiespark.com.au",
    codeUrl: "https://github.com/gabyzaynoun/tradiespark-website",
  },
  {
    title: "Q-Lex",
    desc: "A sci-fi thriller novel with 150 AI-generated illustrations, publishing on Amazon KDP.",
    stack: ["AI Image Generation", "KDP"],
  },
  {
    title: "AI Dental Assistant",
    desc: "GenAI dental assistant with multi-session chat, summaries, tagging, PDF export, and cloud-backed history.",
    stack: ["React", "Firebase", "OpenAI API", "Vite"],
    liveUrl: "https://ai-dental-assistant.vercel.app",
    codeUrl: "https://github.com/gabyzaynoun/ai-dental-assistant",
  },
  {
    title: "Cloud Uncensored AI",
    desc: "AI chat product combining a React frontend with a Python FastAPI backend, deployed on Vercel.",
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
    title: "Quiz App",
    desc: "Interactive quiz platform built with Next.js and TypeScript.",
    stack: ["Next.js", "TypeScript", "React"],
    codeUrl: "https://github.com/gabyzaynoun/quiz-app",
  },
  {
    title: "BlastRing",
    desc: "Unity mobile game — wave-based ring shooter with boss fights, power-ups, combo tracking, achievements, and skin customization.",
    stack: ["Unity", "C#", "Mobile"],
    codeUrl: "https://github.com/gabyzaynoun/BlastRing",
  },
  {
    title: "Car Sales App",
    desc: "PHP and MySQL web app for selling cars, with customer management, inventory CRUD, and recent-listing workflows.",
    stack: ["PHP", "MySQL"],
    codeUrl: "https://github.com/gabyzaynoun/carproject",
  },
];

const skillGroups = [
  {
    title: "AI & LLM",
    items: ["Claude API & Claude Code", "Prompt Engineering", "LLM Integration", "AI Image Generation", "OpenAI API", "RAG Pipelines", "NLP"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS", "Responsive Design", "Vite"],
  },
  {
    title: "Backend",
    items: ["C#", "Java", "Python", "FastAPI", "Node.js", "PHP", "Supabase", "Firebase", "MySQL", "SQLite", "OOP", "REST APIs"],
  },
  {
    title: "Enterprise & Presales",
    items: ["Solution Architecture", "Technical Presales", "Product Scoping", "Client Communication", "Requirements Analysis", "Demo Delivery"],
  },
];

const timeline = [
  {
    date: "2020 — 2024",
    title: "BEng, Lebanese International University",
    desc: "Engineering foundation — systems thinking, maths, and structured problem-solving.",
  },
  {
    date: "2024 — 2025",
    title: "MSc Artificial Intelligence, Torrens University",
    desc: "Focused on machine learning, NLP, and applied AI for real-world product development.",
  },
  {
    date: "2022 — 2025",
    title: "Software Engineer (3 years)",
    desc: "Built and maintained C#/WPF applications, supported CAD/CAM workflows, and improved reliability of production engineering tooling.",
  },
  {
    date: "Nov 2025 — Present",
    title: "Presales Engineer, Westcon-Comstor",
    desc: "Technical presales — solution scoping, architecture alignment, and client-facing demo delivery for enterprise technology.",
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

function renderTimeline() {
  const el = document.getElementById("timeline");
  if (!el) return;

  el.innerHTML = timeline
    .map(
      (t) => `
      <div class="timeline-item">
        <p class="timeline-date">${t.date}</p>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-desc">${t.desc}</p>
      </div>
    `
    )
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
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = "a, button, .project-card, .role-tag";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add("cursor-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove("cursor-hover");
    }
  });

  // Hide cursor when it leaves the window
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "0.5";
  });
}

/* ─── Scroll Reveal ──────────────────────────────── */

function setupReveal() {
  const targets = document.querySelectorAll(
    ".reveal, .project-card, .skill-group, .timeline-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animations for sibling elements
          const siblings = entry.target.parentElement.querySelectorAll(
            ".project-card, .skill-group, .timeline-item"
          );
          const index = Array.from(siblings).indexOf(entry.target);
          const delay = index >= 0 ? index * 80 : 0;

          setTimeout(() => {
            entry.target.classList.add("in-view");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
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
  renderTimeline();
  renderRoles();
  renderYear();
  setupCursor();
  setupReveal();
  setupMobileMenu();
});
