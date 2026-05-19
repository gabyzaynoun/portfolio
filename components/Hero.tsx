import Image from "next/image";
import Link from "next/link";
import { HERO, ROLE_BADGES, SITE, SUGGESTED_HERO_QUESTIONS } from "@/lib/content";
import { AskAIButton, AskAIChip } from "./AskAIButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-32"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)]">
            <span
              className="inline-block size-1.5 rounded-full bg-[var(--color-accent)]"
              aria-hidden="true"
            />
            Open to AI Solutions Engineer roles · Sydney
          </div>
          <h1 className="reveal text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {HERO.name.split(" ")[0]}
            <br />
            <span className="text-[var(--color-accent)]">
              {HERO.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <div
            className="reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
            style={{ transitionDelay: "60ms" }}
          >
            {ROLE_BADGES.map((role, i) => (
              <span key={role} className="inline-flex items-center gap-3">
                <span className="font-mono text-sm text-[var(--color-fg-muted)] md:text-base">
                  {role}
                </span>
                {i < ROLE_BADGES.length - 1 && (
                  <span className="text-[var(--color-fg-subtle)]" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-fg)] md:text-xl"
            style={{ transitionDelay: "160ms" }}
          >
            {HERO.subhead}
          </p>
          <p
            className="reveal mt-3 max-w-xl text-sm italic text-[var(--color-fg-muted)]"
            style={{ transitionDelay: "200ms" }}
          >
            &ldquo;{HERO.kicker}&rdquo;
          </p>
          <p
            className="reveal mt-4 max-w-xl text-sm text-[var(--color-fg-subtle)]"
            style={{ transitionDelay: "240ms" }}
          >
            {HERO.supporting}
          </p>
          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3"
            style={{ transitionDelay: "320ms" }}
          >
            <AskAIButton variant="hero" />
            <Link
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)] px-5 text-sm text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              View Projects
              <ArrowDownIcon />
            </Link>
            <a
              href={SITE.resumeUrl}
              download
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elev)] px-5 text-sm text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <DownloadIcon />
              Download Resume
            </a>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center gap-2 px-3 text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              Get in touch
            </Link>
          </div>

          <div
            className="reveal mt-8 flex flex-wrap items-center gap-2"
            style={{ transitionDelay: "400ms" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
              Try asking
            </span>
            {SUGGESTED_HERO_QUESTIONS.map((q) => (
              <AskAIChip key={q} question={q} />
            ))}
            <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
              or
              <kbd className="inline-flex items-center rounded border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-1.5 py-0.5 text-[10px] text-[var(--color-fg-muted)] normal-case">
                ⌘K
              </kbd>
            </span>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "200ms" }}>
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[460px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]">
            <div
              className="absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-white/5"
              aria-hidden="true"
            />
            <Image
              src="/gaby-zaynoun.jpg"
              alt="Gaby Zaynoun"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 460px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
