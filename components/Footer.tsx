export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-[var(--color-fg)]">
          This site &mdash; including its AI assistant &mdash;{" "}
          <span className="text-[var(--color-accent)]">was built and shipped by me</span>.
        </p>
        <p className="font-mono text-xs text-[var(--color-fg-subtle)]">
          &copy; {year} Gaby Zaynoun &middot; Built with Next.js &middot; Claude Haiku 4.5
        </p>
      </div>
    </footer>
  );
}
