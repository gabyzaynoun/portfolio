import { ABOUT } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="reveal mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        About
      </p>
      <h2 className="reveal mb-8 text-3xl font-semibold tracking-tight md:text-4xl">
        Profile
      </h2>
      <p className="reveal max-w-3xl text-lg leading-relaxed text-[var(--color-fg-muted)] md:text-xl">
        {ABOUT}
      </p>
    </section>
  );
}
