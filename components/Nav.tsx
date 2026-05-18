import Link from "next/link";
import { AskAIButton } from "./AskAIButton";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--color-border)]/50 bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="#hero"
          className="text-sm font-semibold tracking-tight text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
        >
          Gaby <span className="text-[var(--color-accent)]">Zaynoun</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-[var(--color-fg-muted)]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <AskAIButton variant="navMobile" />
          <AskAIButton variant="nav" />
        </div>
      </nav>
    </header>
  );
}
