import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
        404
      </p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mb-8 max-w-md text-[var(--color-fg-muted)]">
        But everything Gaby&rsquo;s shipped is one click away.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        Take me home
      </Link>
    </main>
  );
}
