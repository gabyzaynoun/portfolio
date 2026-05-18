import { EDUCATION } from "@/lib/content";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        Academics &amp; Credentials
      </p>
      <h2 className="reveal mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
        Education
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {EDUCATION.map((e, i) => (
          <div
            key={e.title + e.org}
            className="reveal rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-6 transition-colors hover:border-[var(--color-border-strong)]"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
              {e.date}
            </p>
            <h3 className="text-base font-semibold text-[var(--color-fg)]">{e.title}</h3>
            <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{e.org}</p>
            {e.detail && (
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-subtle)]">
                {e.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
