// components/StatsCharts.tsx
import React from "react";

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function fmtPct(n: number) {
  return `${n.toFixed(1)}%`;
}

export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="text-xs uppercase tracking-widest text-black/50">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-black">{value}</div>
      {note ? <div className="mt-2 text-sm text-black/70">{note}</div> : null}
    </div>
  );
}

export function LineChart({
  data,
  height = 180,
}: {
  data: Array<{ x: string; y: number }>;
  height?: number;
}) {
  const w = 760;
  const h = height;
  const pad = 24;

  const ys = data.map((d) => d.y);
  const yMin = 0;
  const yMax = Math.max(80, Math.ceil(Math.max(...ys) / 5) * 5);

  const xStep = (w - pad * 2) / Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = pad + i * xStep;
    const y = pad + (h - pad * 2) * (1 - (d.y - yMin) / (yMax - yMin));
    return { x, y, d };
  });

  const dPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const yTicks = [0, 20, 40, 60, 80].filter((t) => t <= yMax);

  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-semibold text-black">Cumulative arrest over time</div>
        <div className="text-xs text-black/60">Any arrest, any offense</div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full">
        {/* grid */}
        {yTicks.map((t) => {
          const y = pad + (h - pad * 2) * (1 - (t - yMin) / (yMax - yMin));
          return (
            <g key={t}>
              <line x1={pad} x2={w - pad} y1={y} y2={y} stroke="rgba(0,0,0,0.08)" />
              <text x={6} y={y + 4} fontSize="10" fill="rgba(0,0,0,0.55)">
                {t}%
              </text>
            </g>
          );
        })}

        {/* line */}
        <path d={dPath} fill="none" stroke="rgb(17,24,39)" strokeWidth="3" />
        {/* points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="rgb(17,24,39)" strokeWidth="3" />
            <text
              x={p.x}
              y={h - 6}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(0,0,0,0.55)"
            >
              {p.d.x}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 grid sm:grid-cols-5 gap-3">
        {data.map((d) => (
          <div key={d.x} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-3">
            <div className="text-[11px] uppercase tracking-widest text-black/50">{d.x}</div>
            <div className="mt-1 text-base font-semibold text-black">{fmtPct(d.y)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  title,
  subtitle,
  data,
  mode = "pct",
}: {
  title: string;
  subtitle?: string;
  data: Array<{ label: string; value: number }>;
  mode?: "pct" | "countshare";
}) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-black">{title}</div>
          {subtitle ? <div className="text-xs text-black/60 mt-1">{subtitle}</div> : null}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label}>
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-sm text-black">{d.label}</div>
                <div className="text-sm font-semibold text-black">
                  {mode === "pct" ? fmtPct(d.value) : d.value.toLocaleString()}
                </div>
              </div>
              <div className="mt-2 h-3 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-neutral-900"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DonutChart({
  title,
  subtitle,
  data,
}: {
  title: string;
  subtitle?: string;
  data: Array<{ label: string; pct: number }>;
}) {
  const size = 220;
  const r = 78;
  const c = Math.PI * 2 * r;

  let acc = 0;

  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="text-sm font-semibold text-black">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-black/60">{subtitle}</div> : null}

      <div className="mt-4 grid md:grid-cols-[260px_1fr] gap-4 items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
            {data.map((d, i) => {
              const seg = (d.pct / 100) * c;
              const dash = `${seg} ${c - seg}`;
              const off = -acc;
              acc += seg;

              // small style variety without hardcoding “colors everywhere”
              const stroke =
                i === 0
                  ? "rgb(17,24,39)"
                  : i === 1
                  ? "rgba(17,24,39,0.75)"
                  : i === 2
                  ? "rgba(17,24,39,0.55)"
                  : "rgba(17,24,39,0.35)";

              return (
                <circle
                  key={d.label}
                  r={r}
                  cx={0}
                  cy={0}
                  fill="transparent"
                  stroke={stroke}
                  strokeWidth={18}
                  strokeDasharray={dash}
                  strokeDashoffset={off}
                  strokeLinecap="butt"
                />
              );
            })}
            <circle r={r - 22} cx={0} cy={0} fill="white" />
          </g>

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="rgba(0,0,0,0.55)"
          >
            distribution
          </text>
        </svg>

        <div className="space-y-2">
          {data.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-3">
              <div className="text-sm text-black">{d.label}</div>
              <div className="text-sm font-semibold text-black">{fmtPct(d.pct)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
