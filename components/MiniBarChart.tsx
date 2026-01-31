// components/MiniBarChart.tsx
import React from "react";

type Point = { label: string; value: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MiniBarChart({
  points,
  height = 180,
}: {
  points: Point[];
  height?: number;
}) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div className="w-full">
      <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-5 gap-3 items-end" style={{ height }}>
          {points.map((p) => {
            const pct = clamp(p.value / max, 0, 1);
            return (
              <div key={p.label} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-2xl bg-black/5 overflow-hidden border border-black/10">
                  <div
                    className="w-full rounded-2xl"
                    style={{
                      height: Math.round((height - 40) * pct),
                      background:
                        "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(16,185,129,0.9))",
                    }}
                  />
                </div>
                <div className="text-[11px] text-black/65 text-center leading-tight">
                  {p.label}
                </div>
                <div className="text-xs font-semibold text-black/80">
                  {p.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
