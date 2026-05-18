import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gaby Zaynoun — AI Solutions Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #12121a 60%, #1a1a25 100%)",
          color: "#f5f5f7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            color: "#8a8aa0",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#ff7849",
              marginRight: 14,
            }}
          />
          AI Solutions Engineer · Sydney
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Gaby
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#ff7849",
            }}
          >
            Zaynoun
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "#b8b8c8",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            I design and ship agentic AI systems &mdash; and help enterprises understand
            what AI can actually do for them.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
