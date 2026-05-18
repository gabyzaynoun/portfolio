/**
 * In-memory per-IP sliding-window rate limiter.
 *
 * Cosmetic defense — the real cost cap is `max_tokens` + `messages.length`
 * limit in the chat route, plus the Anthropic console spend cap.
 *
 * Not multi-instance safe (each serverless container has its own Map),
 * which is acceptable for portfolio-scale traffic.
 */

type Window = {
  timestamps: number[];
};

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 20;
const MAX_KEYS = 5000; // prevent unbounded growth

const buckets = new Map<string, Window>();

export function checkRateLimit(key: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();

  // Opportunistic GC — if Map grows too large, drop oldest entries
  if (buckets.size > MAX_KEYS) {
    const oldest = [...buckets.entries()]
      .sort(
        ([, a], [, b]) =>
          (a.timestamps[0] ?? 0) - (b.timestamps[0] ?? 0),
      )
      .slice(0, Math.floor(MAX_KEYS / 4));
    oldest.forEach(([k]) => buckets.delete(k));
  }

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_PER_WINDOW) {
    const oldest = bucket.timestamps[0];
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    buckets.set(key, bucket);
    return { ok: false, retryAfter };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { ok: true };
}

export function getClientKey(req: Request): string {
  // Prefer Vercel-injected client IP, fall back to X-Forwarded-For first hop
  const headers = req.headers;
  const direct = headers.get("x-real-ip") ?? headers.get("cf-connecting-ip");
  if (direct) return direct;
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "unknown";
}
