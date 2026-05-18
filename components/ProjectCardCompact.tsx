import type { Project } from "@/lib/content";

export function ProjectCardCompact({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  return (
    <div
      className="reveal rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <h4 className="font-medium text-[var(--color-fg)]">{project.title}</h4>
        <div className="flex gap-2 text-[var(--color-fg-subtle)]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — live demo`}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <SmallExternalIcon />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — source code`}
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              <SmallGitHubIcon />
            </a>
          )}
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {project.oneLiner}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-subtle)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SmallExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function SmallGitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.9 18.6.5 12 .5z" />
    </svg>
  );
}
