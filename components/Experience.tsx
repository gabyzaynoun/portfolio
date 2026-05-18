import { EXPERIENCE } from "@/lib/content";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        Career
      </p>
      <h2 className="reveal mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
        Experience
      </h2>

      <div className="relative space-y-10 border-l border-[var(--color-border)] pl-8 md:pl-10">
        {EXPERIENCE.map((e, i) => (
          <div
            key={e.title + e.org}
            className="reveal relative"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              className="absolute -left-[37px] top-2 size-2 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]"
              aria-hidden="true"
            />
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
              {e.date}
            </p>
            <h3 className="text-lg font-semibold text-[var(--color-fg)]">
              {e.title} <span className="text-[var(--color-fg-muted)]">— {e.org}</span>
            </h3>
            <p className="mb-3 text-sm text-[var(--color-fg-subtle)]">{e.location}</p>
            <p className="mb-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
              {e.summary}
            </p>
            <ul className="space-y-2">
              {e.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]"
                >
                  <span
                    className="mt-2 inline-block size-1 shrink-0 rounded-full bg-[var(--color-fg-subtle)]"
                    aria-hidden="true"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
