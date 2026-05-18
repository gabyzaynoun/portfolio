"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-3xl font-semibold">Something went wrong</h1>
      <p className="mb-8 text-[var(--color-fg-muted)]">
        An unexpected error occurred. Try refreshing the page, or reach out via{" "}
        <a
          href="mailto:gabyzaynoun6@gmail.com"
          className="text-[var(--color-accent)] hover:underline"
        >
          gabyzaynoun6@gmail.com
        </a>
        .
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
