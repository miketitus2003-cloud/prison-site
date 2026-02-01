// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const title = "Prison Policy Data Platform";
  const subtitle = "Dashboards, policy briefs, source-verified insights.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          padding: "64px",
          backgroundColor: "#06080f",
          color: "white",
          position: "relative",
          overflow: "hidden",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
        }}
      >
        {/* soft glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(500px 300px at 18% 22%, rgba(56,189,248,0.25), transparent 60%), radial-gradient(520px 340px at 78% 20%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(720px 520px at 86% 86%, rgba(168,85,247,0.22), transparent 60%)",
          }}
        />

        {/* top badge */}
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            width: "fit-content",
            fontSize: 22,
            color: "rgba(235,240,255,0.95)",
          }}
        >
          Dashboards · Policy briefs · Source-verified insights
        </div>

        {/* title */}
        <div style={{ position: "relative", marginTop: 78, fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>
          {title}
        </div>

        {/* subtitle */}
        <div style={{ position: "relative", marginTop: 16, fontSize: 30, color: "rgba(210,220,245,0.95)" }}>
          {subtitle}
        </div>

        {/* right cards */}
        <div
          style={{
            position: "absolute",
            right: 64,
            top: 210,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: 360,
          }}
        >
          {[
            ["BJS 2012 cohort", "5-year cumulative arrest: 70.8%"],
            ["BJS 2018 update", "Arrested within 9 years: 83%"],
            ["Verification", "Every chart links to its source"],
          ].map(([a, b]) => (
            <div
              key={a}
              style={{
                borderRadius: 24,
                padding: 18,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,245,255,0.98)" }}>{a}</div>
              <div style={{ marginTop: 10, fontSize: 18, color: "rgba(200,210,235,0.95)" }}>{b}</div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ position: "absolute", left: 64, bottom: 58, fontSize: 22, color: "rgba(190,200,225,0.95)" }}>
          Michael Parham · Next.js + TypeScript + Tailwind · vercel
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
