import { FEATURED_PROJECTS, MORE_PROJECTS } from "@/lib/content";
import { ProjectCardFeatured } from "./ProjectCardFeatured";
import { ProjectCardCompact } from "./ProjectCardCompact";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        Selected Work
      </p>
      <h2 className="reveal mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
        Projects
      </h2>

      <div className="space-y-5">
        {FEATURED_PROJECTS.map((p, i) => (
          <ProjectCardFeatured
            key={p.slug}
            project={p}
            defaultOpen={i === 0}
            delay={i * 60}
          />
        ))}
      </div>

      <div className="mt-20">
        <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-fg-subtle)]">
          More
        </p>
        <h3 className="reveal mb-8 text-xl font-medium text-[var(--color-fg-muted)]">
          Other projects worth a look
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {MORE_PROJECTS.map((p, i) => (
            <ProjectCardCompact key={p.slug} project={p} delay={i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
