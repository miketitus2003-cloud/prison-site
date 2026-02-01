// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#06080f",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, rgba(56,189,248,0.95), rgba(168,85,247,0.85), rgba(34,197,94,0.85))",
            }}
          />
          <div style={{ fontSize: 22, opacity: 0.9, fontWeight: 700 }}>
            Prison Policy Data Platform
          </div>
        </div>

        <div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            Dashboards + policy briefs
            <br />
            from primary justice statistics
          </div>
          <div style={{ marginTop: 18, fontSize: 26, opacity: 0.75 }}>
            Source-verified insights • built by Michael Parham
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {["Dashboard", "Insights", "Policy briefs", "Claim → source mapping"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.06)",
                    fontSize: 18,
                    opacity: 0.9,
                  }}
                >
                  {t}
                </div>
              )
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.6 }}>
          <div style={{ fontSize: 18 }}>Association, not causation</div>
          <div style={{ fontSize: 18 }}>prison-site-omega.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
