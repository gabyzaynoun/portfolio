import type { Project } from "@/lib/content";

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
      <summary className="flex cursor-pointer list-none items-start gap-6 p-7 [&::-webkit-details-marker]:hidden">
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
        <ChevronIcon />
      </summary>

      <div className="border-t border-[var(--color-border)] px-7 pt-6 pb-7">
        <p className="mb-5 text-base leading-relaxed text-[var(--color-fg-muted)]">
          {project.description}
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-[var(--color-bg-elev-2)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg-subtle)]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.liveUrl && (
            <ProjectLink href={project.liveUrl} variant="primary">
              Live <ExternalIcon />
            </ProjectLink>
          )}
          {project.codeUrl && (
            <ProjectLink href={project.codeUrl}>
              GitHub <ExternalIcon />
            </ProjectLink>
          )}
        </div>
      </div>
    </details>
  );
}

function ProjectLink({
  href,
  children,
  variant = "secondary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)]"
      : "border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      {children}
    </a>
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
      className="mt-1 shrink-0 text-[var(--color-fg-subtle)] transition-transform group-open:rotate-180"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
