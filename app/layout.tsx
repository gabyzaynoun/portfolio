import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabyzportfolio.vercel.app"),
  title: "Gaby Zaynoun — AI Solutions Engineer",
  description:
    "Gaby Zaynoun — AI Solutions Engineer, Sydney. I design and ship agentic AI systems, and I help enterprises understand what AI can actually do for them.",
  keywords: [
    "AI Solutions Engineer",
    "AI Presales",
    "AI Consultant",
    "Agentic AI",
    "Anthropic Claude",
    "Sydney",
    "Australia",
    "AI Engineer",
  ],
  authors: [{ name: "Gaby Zaynoun" }],
  openGraph: {
    title: "Gaby Zaynoun — AI Solutions Engineer",
    description:
      "I design and ship agentic AI systems. Sydney-based. Open to AI Solutions Engineer, presales, and consulting roles.",
    type: "website",
    locale: "en_AU",
    siteName: "Gaby Zaynoun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaby Zaynoun — AI Solutions Engineer",
    description: "I design and ship agentic AI systems. Sydney-based.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <div className="ambient-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
