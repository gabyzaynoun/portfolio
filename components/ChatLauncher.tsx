"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AskAIButton } from "./AskAIButton";

// Lazy-load the chat panel so the Anthropic SDK + streaming code don't
// land in the first-paint bundle. Only fetched when the panel is opened.
const ChatPanel = dynamic(
  () => import("./ChatPanel").then((m) => ({ default: m.ChatPanel })),
  { ssr: false },
);

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState<string | undefined>();

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent).detail as { question?: string } | undefined;
      setInitialQuestion(detail?.question);
      setOpen(true);
    }
    function handleKey(e: KeyboardEvent) {
      // Cmd/Ctrl+K from anywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setInitialQuestion(undefined);
        setOpen(true);
      }
    }
    window.addEventListener("chat:open", handleOpen);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("chat:open", handleOpen);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <AskAIButton variant="floating" />
      {open && (
        <ChatPanel
          onClose={() => setOpen(false)}
          initialQuestion={initialQuestion}
        />
      )}
    </>
  );
}
