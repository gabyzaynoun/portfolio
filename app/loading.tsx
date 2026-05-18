export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
      <div
        aria-hidden="true"
        className="size-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]"
      />
      <span className="sr-only">Loading</span>
    </main>
  );
}
