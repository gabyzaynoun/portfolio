import Image from "next/image";
import type { Project } from "@/lib/content";
import { ProjectSummaryLink } from "./ProjectSummaryLink";

export function ProjectCardFeatured({
  project,
  defaultOpen = false,
  delay = 0,
}: {
  project: Project;
  defaultOpen?: boolean;
  delay?: number;
}) {
  return (
    <details
      className="reveal group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] transition-colors open:border-[var(--color-border-strong)]"
      style={{ transitionDelay: `${delay}ms` }}
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex cursor-pointer list-none gap-5 p-5 [&::-webkit-details-marker]:hidden md:p-6">
        {project.image && (
          <div className="relative hidden h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elev-2)] sm:block md:h-32 md:w-52">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 0px, 200px"
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-[var(--color-fg)]">
              {project.title}
            </h3>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-[var(--color-fg-muted)]">
            {project.oneLiner}
          </p>
          {project.metric && (
            <p className="mt-3 font-mono text-xs text-[var(--color-accent)]">
              {project.metric}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center">
          {project.liveUrl && (
            <ProjectSummaryLink href={project.liveUrl} label="Live" variant="primary" />
          )}
          {project.codeUrl && (
            <ProjectSummaryLink href={project.codeUrl} label="Code" variant="secondary" />
          )}
          <ChevronIcon />
        </div>
      </summary>

      <div className="border-t border-[var(--color-border)] px-5 pt-6 pb-7 md:px-6">
        <p className="mb-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-[var(--color-bg-elev-2)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg-subtle)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </details>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 shrink-0 text-[var(--color-fg-subtle)] transition-transform group-open:rotate-180"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
