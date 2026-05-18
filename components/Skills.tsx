import { SKILLS } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        Capabilities
      </p>
      <h2 className="reveal mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
        AI Skills &amp; Capabilities
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        {SKILLS.map((group, i) => (
          <div
            key={group.title}
            className="reveal group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] p-7 transition-colors hover:border-[var(--color-border-strong)]"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <h3 className="mb-5 text-lg font-semibold text-[var(--color-fg)]">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-muted)]"
                >
                  <span
                    className="mt-2 inline-block size-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
