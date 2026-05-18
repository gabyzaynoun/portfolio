"use client";

import { useCallback } from "react";

type Variant = "hero" | "nav" | "navMobile" | "floating";

export function AskAIButton({
  variant = "hero",
  question,
}: {
  variant?: Variant;
  question?: string;
}) {
  const open = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("chat:open", { detail: question ? { question } : undefined }),
    );
  }, [question]);

  if (variant === "nav") {
    return (
      <button
        onClick={open}
        type="button"
        className="hidden sm:inline-flex h-9 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        <SparkleIcon />
        Ask my AI
        <kbd className="ml-1 hidden md:inline-flex items-center rounded border border-black/20 bg-black/10 px-1.5 font-mono text-[10px] text-black/70">
          ⌘K
        </kbd>
      </button>
    );
  }

  if (variant === "navMobile") {
    return (
      <button
        onClick={open}
        type="button"
        aria-label="Open AI assistant"
        className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        <SparkleIcon />
      </button>
    );
  }

  if (variant === "floating") {
    return (
      <button
        onClick={open}
        type="button"
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-6 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-sm font-medium text-black shadow-2xl shadow-[var(--color-accent)]/30 hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--color-accent)]/40 transition-all"
      >
        <SparkleIcon />
        <span className="hidden sm:inline">Ask my AI</span>
      </button>
    );
  }

  return (
    <button
      onClick={open}
      type="button"
      className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-sm font-medium text-black hover:bg-[var(--color-accent-hover)] transition-colors"
    >
      <SparkleIcon />
      Ask my AI
    </button>
  );
}

export function AskAIChip({ question }: { question: string }) {
  const open = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("chat:open", { detail: { question } }),
    );
  }, [question]);

  return (
    <button
      onClick={open}
      type="button"
      className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
    >
      <span className="font-mono text-[var(--color-fg-subtle)] group-hover:text-[var(--color-accent)] transition-colors">
        ›
      </span>
      {question}
    </button>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}
