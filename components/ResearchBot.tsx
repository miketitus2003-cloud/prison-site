// components/ResearchBot.tsx
"use client";

import { useEffect, useState } from "react";

export default function ResearchBot() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // quick proof it mounted
    console.log("ResearchBot mounted ✅");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 99999,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          borderRadius: 9999,
          padding: "12px 14px",
          border: "1px solid rgba(0,0,0,0.12)",
          background: "#111827",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          cursor: "pointer",
          fontWeight: 700,
        }}
        aria-label="Open research assistant"
      >
        Ask AI
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            width: 340,
            marginTop: 10,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "white",
            color: "#111827",
            boxShadow: "0 18px 50px rgba(0,0,0,0.20)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: 12,
              background: "#F3F4F6",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ fontWeight: 800 }}>Research assistant</div>
            <button
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: "18px",
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div style={{ padding: 12, fontSize: 14, lineHeight: 1.5 }}>
            <div style={{ marginBottom: 10 }}>
              ✅ If you see this panel, the bot is mounted correctly.
            </div>
            <div style={{ opacity: 0.8 }}>
              Next step: we hook this up to a real AI endpoint (Option 2).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
