# Gaby Zaynoun — Portfolio

Personal portfolio for Gaby Zaynoun, AI Solutions Engineer based in Sydney. Built with Next.js 15, TypeScript, and Tailwind CSS v4. Features an "Ask my AI" chat assistant powered by the Anthropic Claude API.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styles:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Font:** Geist (sans + mono) via the `geist` package
- **AI:** `@anthropic-ai/sdk` directly — single chat route, NDJSON streaming
- **Deploy:** Vercel

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY in .env.local
npm run dev
```

Visit http://localhost:3000.

## Required environment variables

- `ANTHROPIC_API_KEY` — server-side only. Used by `app/api/chat/route.ts` to call the Claude API. **Never exposed to the client.**

**Important: set a monthly spend cap in the Anthropic console** at https://console.anthropic.com/settings/limits. The chat is rate-limited per-IP and capped per-request, but the spend cap is the final defense against runaway cost.

## How the chat assistant works

- User opens the "Ask my AI" launcher (floating pill, bottom-right, or hero CTA).
- Modal opens with a greeting and 4 suggested-question chips.
- User types or clicks a chip → POST to `/api/chat` with conversation history.
- Server validates, rate-limits (20/hour per IP), builds a system prompt from `lib/ai-context.ts`, streams Claude Haiku 4.5 response back as NDJSON (one JSON object per line: `{type:"delta",text:"..."}` then `{type:"done"}`).
- Client parses NDJSON line-by-line, appends deltas to the in-progress assistant message.
- On API error or rate-limit hit, the panel shows a graceful fallback pointing to the contact section.

The assistant is grounded **strictly** in `lib/ai-context.ts` — it refuses questions outside that context.

## Editing content

- **All copy and project data:** `lib/content.ts` (typed)
- **AI assistant knowledge base:** `lib/ai-context.ts`
- **Visual tokens (colors, fonts):** `app/globals.css` `@theme` block

## Deploy

```bash
vercel link
vercel env add ANTHROPIC_API_KEY production
vercel --prod
```

Replaces the existing `gabyzportfolio.vercel.app` deployment.

## Legacy

The pre-rebuild static site is preserved under `_legacy/` (gitignored). Remove once the new site is live and stable.
