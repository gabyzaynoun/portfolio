"use client";

/**
 * Small visible link rendered inside a <summary> element.
 * Stops click propagation so the parent <details> doesn't toggle
 * when the user clicks the link.
 */
export function ProjectSummaryLink({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)]"
      : "border border-[var(--color-border-strong)] text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${base} ${styles}`}
    >
      {label}
      <ExternalIcon />
    </a>
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
