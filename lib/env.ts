/**
 * Validates required server-side environment variables.
 * Throws at first use if a required key is missing, so a misconfigured
 * deployment fails loud rather than silent.
 *
 * NEVER import this from a client component.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in .env.local (local) or Vercel project settings (production).`,
    );
  }
  return value;
}

export const env = {
  get ANTHROPIC_API_KEY(): string {
    return required("ANTHROPIC_API_KEY");
  },
};
