import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/lib/env";
import { SYSTEM_PROMPT } from "@/lib/ai-context";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 12;
const MAX_MSG_CHARS = 2000;
const MAX_OUTPUT_TOKENS = 600;
// Everything below must finish inside vercel.json's maxDuration (60s) with
// room to spare, so a stall becomes a readable message rather than a 504.
const HARD_CAP_MS = 20_000; // whole request
const STALL_MS = 8_000; // no token for this long => treat as stalled
const MODEL = "claude-haiku-4-5";

type IncomingMessage = { role: "user" | "assistant"; content: string };

// Lazy singleton — never init at module scope (build-safe pattern)
let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
      // The SDK applies `timeout` PER ATTEMPT, so the real ceiling is
      // timeout x (maxRetries + 1). Keep that product well under this route's
      // 60s maxDuration or the function gets hard-killed before any handler
      // code can run, and the caller sees a bare 504 instead of a message.
      timeout: HARD_CAP_MS,
      maxRetries: 0,
    });
  }
  return _client;
}

function emit(
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  obj: unknown,
) {
  controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
}

export async function POST(req: Request) {
  // Rate limit
  const key = getClientKey(req);
  const limit = checkRateLimit(key);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded. Try again later or use the Contact section.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(limit.retryAfter ?? 3600),
        },
      },
    );
  }

  // Parse + validate body
  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages array required" }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json(
      { error: `Too many messages (max ${MAX_MESSAGES})` },
      { status: 400 },
    );
  }
  for (const m of messages) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.length === 0 ||
      m.content.length > MAX_MSG_CHARS
    ) {
      return Response.json({ error: "Invalid message shape" }, { status: 400 });
    }
  }

  // Stream Claude response back as NDJSON
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Own the abort rather than trusting upstream to return. Two guards: a
      // hard cap on the whole request, and a stall detector for a stream that
      // goes quiet mid-answer (the SDK timeout covers neither once bytes have
      // started flowing). Declared out here so catch/finally can see them.
      const ac = new AbortController();
      let stalled = false;
      let stallTimer: ReturnType<typeof setTimeout> | undefined;
      const hardCap = setTimeout(() => ac.abort(), HARD_CAP_MS);
      const beat = () => {
        if (stallTimer) clearTimeout(stallTimer);
        stallTimer = setTimeout(() => {
          stalled = true;
          ac.abort();
        }, STALL_MS);
      };
      beat();

      try {
        const client = getClient();

        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }, { signal: ac.signal });

        claudeStream.on("text", (delta) => {
          if (delta) {
            beat();
            emit(controller, encoder, { type: "delta", text: delta });
          }
        });

        await claudeStream.finalMessage();
        emit(controller, encoder, { type: "done" });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error from AI service";
        const timedOut =
          stalled || (err instanceof Error && err.name === "AbortError");
        emit(controller, encoder, {
          type: "error",
          message: timedOut
            ? "That took longer than usual and I stopped waiting — please ask again. If it keeps happening, the Contact section has Gaby's email."
            : "Sorry, the assistant hit an error. Please reach out via the Contact section.",
        });
        console.error("Chat route error:", timedOut ? `timeout/stall: ${message}` : message);
      } finally {
        clearTimeout(hardCap);
        if (stallTimer) clearTimeout(stallTimer);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
