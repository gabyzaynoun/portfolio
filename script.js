const portfolioData = {
  name: "Gaby Zaynoun",
  role: "Software Engineer / Solution Architect",
  headline: "Building AI products people actually use.",
  tagline:
    "Software engineer focused on AI-assisted product engineering, practical architecture, and fast execution from idea to shipped experience.",
  location: "Russell Lea, Sydney, NSW, Australia",
  email: "gabyzaynoun6@gmail.com",
  openTo: "Software engineering and AI product engineering roles",
  portrait: {
    primary: "assets/gaby-zaynoun.jpg",
    fallback: "assets/profile-placeholder.svg"
  },
  about:
    "I started in hands-on software engineering, building and maintaining tools in production environments, then expanded into a client-facing technical role. That mix made me stronger at translating business needs into working systems. My focus now is simple: ship useful products, keep architecture clean, and use AI where it creates real leverage.",
  focus: [
    "AI-first web products with clear user value",
    "Full-stack execution with pragmatic architecture",
    "Fast iteration without compromising maintainability"
  ],
  stats: [
    { value: "9+", label: "Shipped Projects" },
    { value: "4", label: "Years Building Software" },
    { value: "Now", label: "AI Product Focus" }
  ],
  skills: [
    "AI-Assisted Development",
    "Claude / Codex / Grok Workflows",
    "C#",
    "Java",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "FastAPI",
    "MySQL",
    "Firebase",
    "Supabase",
    "Product Architecture"
  ],
  story: [
    {
      title: "2022-2025 | Software Engineering Foundation",
      detail:
        "Built and maintained C# and WPF applications, supported CAD/CAM workflows, and improved reliability of day-to-day engineering tooling in production."
    },
    {
      title: "2025 | AI and Web Product Delivery",
      detail:
        "Shipped multiple web and AI-driven products while improving delivery speed through modern frontend and backend tooling."
    },
    {
      title: "Since November 2025 | Client-Facing Technical Work",
      detail:
        "Strengthened requirements framing, solution communication, and architecture alignment through technical presales collaboration."
    }
  ],
  links: {
    github: "https://github.com/gabyzaynoun",
    linkedin: "https://www.linkedin.com/in/gaby-zaynoun-a453631bb/"
  },
  projects: [
    {
      title: "CalcSolve",
      summary:
        "Built for calculus students: step-by-step solving across derivatives, integrals, and more, with an AI tutor plus gamified skill trees, streaks, and achievements.",
      category: "AI",
      stack: ["AI Tutor", "Web App", "EdTech"],
      liveUrl: "https://www.calcsolve.app/",
      featured: true
    },
    {
      title: "Tileverse",
      summary:
        "Built for creators, freelancers, and businesses who need one permanent place to be found online: your own forever coordinate on a shared 1,000,000-tile map.",
      category: "Web",
      stack: ["Interactive UI", "Web App", "Product MVP"],
      liveUrl: "https://tileverse-eight.vercel.app/"
    },
    {
      title: "AI Dental Assistant",
      summary:
        "GenAI dental assistant with multi-session chat, summaries, tagging, PDF export, and cloud-backed history.",
      category: "AI",
      stack: ["React", "Vite", "Firebase", "OpenAI API"],
      codeUrl: "https://github.com/gabyzaynoun/ai-dental-assistant",
      liveUrl: "https://ai-dental-assistant.vercel.app"
    },
    {
      title: "Cloud Uncensored AI App",
      summary:
        "AI chat product combining a React frontend with a Python FastAPI backend and deployment on Vercel.",
      category: "AI",
      stack: ["React", "FastAPI", "Python", "Vercel"],
      codeUrl: "https://github.com/gabyzaynoun/cloud-uncensored-ai-app",
      liveUrl: "https://cloud-uncensored-ai-app.vercel.app"
    },
    {
      title: "Doctor Roster Scheduling System",
      summary:
        "Scheduling system for multi-center doctor rosters with constraints, role-based flows, and auto-build logic. Public deployment is currently paused.",
      category: "Full-Stack",
      stack: ["React", "TypeScript", "FastAPI", "SQLite"],
      codeUrl: "https://github.com/gabyzaynoun/doctor-roster"
    },
    {
      title: "Quiz App",
      summary:
        "Interactive quiz platform built with Next.js and TypeScript and deployed on Vercel.",
      category: "Web",
      stack: ["Next.js", "TypeScript", "React", "Vercel"],
      codeUrl: "https://github.com/gabyzaynoun/quiz-app",
      liveUrl: "https://quiz-app.vercel.app"
    },
    {
      title: "TradieSpark Website",
      summary:
        "Mobile-first local business website concept focused on conversion and clear service communication.",
      category: "Web",
      stack: ["HTML", "CSS", "JavaScript"],
      codeUrl: "https://github.com/gabyzaynoun/tradiespark-website"
    },
    {
      title: "Car Project",
      summary:
        "PHP and MySQL web app for selling cars, with customer management, inventory CRUD, and recent-listing workflows.",
      category: "Full-Stack",
      stack: ["PHP", "MySQL", "CRUD", "Web App"],
      codeUrl: "https://github.com/gabyzaynoun/carproject"
    },
    {
      title: "BlastRing",
      summary:
        "Unity mobile game where players control a ring that blasts enemies across wave-based levels, with boss fights, power-ups (Double Ring, Mega Blast, Rapid Fire, Shield, Time Slow), combo tracking, achievements, skin customization, and ad integration.",
      category: "Game",
      stack: ["Unity", "C#", "Mobile Game", "Ad Integration"],
      codeUrl: "https://github.com/gabyzaynoun/BlastRing"
    }
  ]
};
const links = {
  github: portfolioData.links.github,
  linkedin: portfolioData.links.linkedin,
  email: `mailto:${portfolioData.email}`
};

const bindText = [
  ["brand-name", portfolioData.name],
  ["hero-headline", portfolioData.headline],
  ["hero-tagline", portfolioData.tagline],
  ["open-to-text", portfolioData.openTo],
  ["location-text", portfolioData.location],
  ["about-text", portfolioData.about],
  ["footer-name", portfolioData.name],
  ["portrait-name", portfolioData.name],
  ["portrait-role", portfolioData.role]
];

bindText.forEach(([id, value]) => {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
});

document.title = `${portfolioData.name} | Portfolio`;

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const emailLinkNode = document.getElementById("email-link");
if (emailLinkNode) {
  emailLinkNode.textContent = portfolioData.email;
}

document.querySelectorAll("[data-link]").forEach((linkNode) => {
  const key = linkNode.dataset.link;
  const href = links[key];

  if (!href) {
    return;
  }

  linkNode.href = href;

  if (key === "email") {
    linkNode.removeAttribute("target");
    linkNode.removeAttribute("rel");
  } else {
    linkNode.target = "_blank";
    linkNode.rel = "noreferrer";
  }
});

function setupPortrait() {
  const portraitNode = document.getElementById("portrait-image");
  if (!portraitNode) {
    return;
  }

  const probe = new Image();
  probe.onload = () => {
    portraitNode.src = portfolioData.portrait.primary;
  };
  probe.onerror = () => {
    portraitNode.src = portfolioData.portrait.fallback;
  };
  probe.src = portfolioData.portrait.primary;
}

function renderList(id, items, itemMapper) {
  const root = document.getElementById(id);
  if (!root) {
    return;
  }

  root.innerHTML = items.map(itemMapper).join("");
}

renderList(
  "hero-stats",
  portfolioData.stats,
  (item) => `<li><strong>${item.value}</strong><span>${item.label}</span></li>`
);

renderList(
  "focus-list",
  portfolioData.focus,
  (item) => `<li>${item}</li>`
);

renderList(
  "skills-list",
  portfolioData.skills,
  (item) => `<li>${item}</li>`
);

renderList(
  "story-list",
  portfolioData.story,
  (item) => `<li><strong>${item.title}</strong><p>${item.detail}</p></li>`
);

function getAccessState(project) {
  if (project.liveUrl && project.codeUrl) {
    return "Live + Code";
  }

  if (project.liveUrl) {
    return "Live";
  }

  if (project.codeUrl) {
    return "Code Available";
  }

  return "Private";
}

function actionLinks(project, asButtons = false) {
  const linksMarkup = [];

  if (project.liveUrl) {
    linksMarkup.push(
      asButtons
        ? `<a class="button secondary" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>`
        : `<a class="project-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live</a>`
    );
  }

  if (project.codeUrl) {
    linksMarkup.push(
      asButtons
        ? `<a class="button ghost" href="${project.codeUrl}" target="_blank" rel="noreferrer">View Code</a>`
        : `<a class="project-link" href="${project.codeUrl}" target="_blank" rel="noreferrer">Code</a>`
    );
  }

  if (linksMarkup.length === 0) {
    linksMarkup.push(`<span class="project-link muted">Private Project</span>`);
  }

  return linksMarkup.join("");
}

function renderSpotlight() {
  const spotlightNode = document.getElementById("spotlight-card");
  if (!spotlightNode) {
    return;
  }

  const featured =
    portfolioData.projects.find((project) => project.featured) || portfolioData.projects[0];

  spotlightNode.innerHTML = `
    <div>
      <p class="card-label">Featured Project</p>
      <h3 class="spotlight-title">${featured.title}</h3>
      <p class="spotlight-text">${featured.summary}</p>
      <div class="spotlight-stack">${featured.stack
        .map((stackItem) => `<span>${stackItem}</span>`)
        .join("")}</div>
      <div class="spotlight-actions">${actionLinks(featured, true)}</div>
    </div>
    <div class="spotlight-meta">
      <div class="meta-chip">
        <p>Category</p>
        <strong>${featured.category}</strong>
      </div>
      <div class="meta-chip">
        <p>Access</p>
        <strong>${getAccessState(featured)}</strong>
      </div>
      <div class="meta-chip">
        <p>Primary Stack</p>
        <strong>${featured.stack.slice(0, 2).join(" + ")}</strong>
      </div>
    </div>
  `;
}

const filtersRoot = document.getElementById("project-filters");
const projectGrid = document.getElementById("project-grid");
const categories = ["All", ...new Set(portfolioData.projects.map((project) => project.category))];
let activeCategory = "All";

function projectCardMarkup(project, index) {
  const stackMarkup = project.stack.map((item) => `<span>${item}</span>`).join("");

  return `
    <article class="project-card" style="animation-delay: ${Math.min(index * 60, 320)}ms">
      <div class="project-meta">
        <span class="project-category">${project.category}</span>
        <div class="project-actions">${actionLinks(project)}</div>
      </div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="stack">${stackMarkup}</div>
    </article>
  `;
}

function renderProjects() {
  if (!projectGrid) {
    return;
  }

  const visibleProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((project) => project.category === activeCategory);

  projectGrid.innerHTML = visibleProjects.map(projectCardMarkup).join("");
}

function renderFilters() {
  if (!filtersRoot) {
    return;
  }

  filtersRoot.innerHTML = categories
    .map(
      (category) => `
      <button
        type="button"
        class="filter-btn ${category === activeCategory ? "active" : ""}"
        data-category="${category}"
      >
        ${category}
      </button>
    `
    )
    .join("");

  filtersRoot.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProjects();
    });
  });
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  nodes.forEach((node) => observer.observe(node));
}

setupPortrait();
renderSpotlight();
renderFilters();
renderProjects();
setupReveal();
