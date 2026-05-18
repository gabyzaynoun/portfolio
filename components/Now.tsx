import { NOW } from "@/lib/content";

export function Now() {
  return (
    <section
      id="now"
      aria-label="What I'm doing right now"
      className="mx-auto max-w-6xl px-6 py-10"
    >
      <div className="reveal flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
          <span
            className="relative inline-flex"
            aria-hidden="true"
          >
            <span className="absolute inset-0 size-2 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
            <span className="relative size-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          Now
        </span>
        <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{NOW}</p>
      </div>
    </section>
  );
}
