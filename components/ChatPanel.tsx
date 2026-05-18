"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GREETING, SUGGESTED_QUESTIONS } from "@/lib/ai-context";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

const CONTACT_FALLBACK =
  "I hit an error reaching the AI service. Please email gabyzaynoun6@gmail.com or check the Contact section.";

export function ChatPanel({
  onClose,
  initialQuestion,
}: {
  onClose: () => void;
  initialQuestion?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const autoSentRef = useRef(false);

  // Focus input on open, lock body scroll
  useEffect(() => {
    inputRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Auto-scroll on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Cancel any in-flight request on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  // Auto-send initialQuestion once on mount (e.g. when opened from a hero chip)
  useEffect(() => {
    if (initialQuestion && !autoSentRef.current) {
      autoSentRef.current = true;
      send(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setShowSuggestions(false);
      const userMsg: Message = { role: "user", content: trimmed };
      const assistantMsg: Message = { role: "assistant", content: "" };
      // Drop any leftover empty assistant placeholders from prior failed/aborted turns
      // before appending the new user message — the server rejects empty content.
      const cleanedHistory = messages.filter((m) => m.content.trim().length > 0);
      const next = [...cleanedHistory, userMsg];
      setMessages([...next, assistantMsg]);
      setInput("");
      setStreaming(true);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
          signal: ctrl.signal,
        });

        if (!res.ok) {
          const msg =
            res.status === 429
              ? "You've hit the rate limit (20 messages per hour). Try again later, or reach out via the Contact section."
              : CONTACT_FALLBACK;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: msg };
            return copy;
          });
          return;
        }

        if (!res.body) {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: CONTACT_FALLBACK };
            return copy;
          });
          return;
        }

        // NDJSON parser — split on newlines, each line is a JSON object
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep partial line for next chunk

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const event = JSON.parse(line) as
                | { type: "delta"; text: string }
                | { type: "done" }
                | { type: "error"; message: string };

              if (event.type === "delta") {
                accumulated += event.text;
                const snapshot = accumulated;
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: snapshot };
                  return copy;
                });
              } else if (event.type === "error") {
                accumulated = event.message || CONTACT_FALLBACK;
                setMessages((prev) => {
                  const copy = [...prev];
                  copy[copy.length - 1] = { role: "assistant", content: accumulated };
                  return copy;
                });
              }
            } catch {
              // Ignore unparseable lines (defensive)
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: CONTACT_FALLBACK };
          return copy;
        });
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI assistant"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-2xl sm:h-auto sm:max-h-[80vh] sm:rounded-2xl sm:border">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
              aria-hidden="true"
            >
              <SparkleIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--color-fg)]">
                Ask my AI
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                About Gaby&rsquo;s work
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-[var(--color-fg-subtle)] hover:bg-[var(--color-bg-elev-2)] hover:text-[var(--color-fg)] transition-colors"
          >
            <CloseIcon />
          </button>
        </header>

        {/* Scrollable message area */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <MessageBubble role="assistant" content={GREETING} />
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          {streaming && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="inline-flex max-w-[85%] gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm">
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-fg-subtle)] [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-fg-subtle)] [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-fg-subtle)]" />
              </div>
            </div>
          )}
          {showSuggestions && messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 border-t border-[var(--color-border)] p-3"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about Gaby's work, skills, or experience…"
            disabled={streaming}
            aria-label="Message"
            className="flex-1 resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label="Send"
            className="inline-flex shrink-0 items-center justify-center self-end rounded-lg bg-[var(--color-accent)] px-3.5 py-2.5 text-black hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[var(--color-accent)] text-black"
            : "bg-[var(--color-bg)] text-[var(--color-fg-muted)] border border-[var(--color-border)]"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
