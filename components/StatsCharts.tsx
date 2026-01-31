// components/StatsCharts.tsx
import React from "react";

function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}

function fmtPct(n: number) {
  return `${Number.isFinite(n) ? n.toFixed(1) : "0.0"}%`;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
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
      <div className="text-xs uppercase tracking-widest text-black/50">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-black">{value}</div>
      {note ? <div className="mt-2 text-sm text-black/70">{note}</div> : null}
    </div>
  );
}

export function LineChart({
  data,
  height = 220,
}: {
  data: Array<{ x: string; y: number }>;
  height?: number;
}) {
  // Keep viewBox approach, but tighten spacing + add axis labels.
  const w = 820;
  const h = height;

  // Padding: left increased for y-axis labels
  const padL = 44;
  const padR = 18;
  const padT = 18;
  const padB = 34;

  const ys = data.map((d) => d.y);
  const yMin = 0;
  const yMax = Math.max(80, Math.ceil(Math.max(...ys, 0) / 5) * 5);

  const xStep = (w - padL - padR) / Math.max(1, data.length - 1);

  const points = data.map((d, i) => {
    const x = padL + i * xStep;
    const y = padT + (h - padT - padB) * (1 - (d.y - yMin) / (yMax - yMin));
    return { x, y, d };
  });

  const dPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  // ticks: adapt to yMax
  const yTicksBase = [0, 20, 40, 60, 80, 100];
  const yTicks = yTicksBase.filter((t) => t <= yMax);

  return (
    <div
      className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]"
      role="img"
      aria-label="Line chart showing cumulative arrest over time"
    >
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-semibold text-black">
          Cumulative arrest over time
        </div>
        <div className="text-xs text-black/60">Any arrest, any offense</div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full">
        {/* y-axis label */}
        <text
          x="12"
          y="14"
          fontSize="10"
          fill="rgba(0,0,0,0.55)"
        >
          cumulative arrest (%)
        </text>

        {/* grid + y tick labels */}
        {yTicks.map((t) => {
          const y = padT + (h - padT - padB) * (1 - (t - yMin) / (yMax - yMin));
          return (
            <g key={t}>
              <line
                x1={padL}
                x2={w - padR}
                y1={y}
                y2={y}
                stroke="rgba(0,0,0,0.08)"
              />
              <text
                x={padL - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="rgba(0,0,0,0.55)"
              >
                {t}%
              </text>
            </g>
          );
        })}

        {/* line */}
        <path d={dPath} fill="none" stroke="rgb(17,24,39)" strokeWidth="3" />

        {/* points + x labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="white"
              stroke="rgb(17,24,39)"
              strokeWidth="3"
            />
            <text
              x={p.x}
              y={h - 10}
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
          <div
            key={d.x}
            className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-3"
          >
            <div className="text-[11px] uppercase tracking-widest text-black/50">
              {d.x}
            </div>
            <div className="mt-1 text-base font-semibold text-black">
              {fmtPct(d.y)}
            </div>
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
  const max = Math.max(...data.map((d) => d.value), 0);

  return (
    <div
      className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]"
      role="img"
      aria-label={`${title} bar chart`}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-black">{title}</div>
          {subtitle ? (
            <div className="text-xs text-black/60 mt-1">{subtitle}</div>
          ) : null}
        </div>

        {/* scale cue */}
        <div className="text-[11px] text-black/55">
          {mode === "pct" ? `scale 0–${fmtPct(max)}` : `scale 0–${max.toLocaleString()}`}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((d) => {
          const pct = max > 0 ? clamp((d.value / max) * 100, 0, 100) : 0;

          return (
            <div key={d.label}>
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-sm text-black">{d.label}</div>
                <div className="text-sm font-semibold text-black">
                  {mode === "pct" ? fmtPct(d.value) : d.value.toLocaleString()}
                </div>
              </div>

              <div className="mt-2 relative h-3 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-neutral-900"
                  style={{ width: `${pct}%` }}
                />
                {/* tiny baseline markers */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  <span className="h-1.5 w-[1px] bg-black/15" />
                  <span className="h-1.5 w-[1px] bg-black/15" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[11px] text-black/50 leading-relaxed">
        {mode === "pct"
          ? "Values shown as percent."
          : "Values shown as counts/shares (see subtitle for definition)."}
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

  // stable “palette” (monochrome) + legend swatches
  const strokeFor = (i: number) =>
    i === 0
      ? "rgb(17,24,39)"
      : i === 1
      ? "rgba(17,24,39,0.75)"
      : i === 2
      ? "rgba(17,24,39,0.55)"
      : "rgba(17,24,39,0.35)";

  return (
    <div
      className="rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]"
      role="img"
      aria-label={`${title} donut chart`}
    >
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

              return (
                <circle
                  key={d.label}
                  r={r}
                  cx={0}
                  cy={0}
                  fill="transparent"
                  stroke={strokeFor(i)}
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
            fontSize="11"
            fill="rgba(0,0,0,0.55)"
          >
            share (%)
          </text>
        </svg>

        <div className="space-y-2">
          {data.map((d, i) => (
            <div
              key={d.label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-sm ring-1 ring-black/10"
                  style={{ background: strokeFor(i) }}
                />
                <div className="text-sm text-black truncate">{d.label}</div>
              </div>
              <div className="text-sm font-semibold text-black">{fmtPct(d.pct)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-[11px] text-black/50 leading-relaxed">
        Percent distribution by category. Use Sources / Stats Lab for verification.
      </div>
    </div>
  );
}
