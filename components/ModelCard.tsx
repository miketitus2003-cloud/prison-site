// components/ModelCard.tsx

export default function ModelCard({
  n,
  posRate,
  features,
  evaluation,
  metrics,
  notes,
}: {
  n: number;
  posRate: string;
  features: string[];
  evaluation: string[];
  metrics: Array<{ label: string; value: string }>;
  notes: string[];
}) {
  return (
    <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 shadow-[0_16px_70px_rgba(0,0,0,0.55)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">Model card</div>
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30">
          Association only
        </span>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/50">Dataset</div>
          <div className="mt-2 text-sm text-white/80">
            N = <span className="font-semibold text-white">{n.toLocaleString()}</span>
          </div>
          <div className="mt-1 text-sm text-white/70">
            Class balance: <span className="font-semibold text-white">{posRate}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/50">Metrics</div>
          <div className="mt-2 space-y-1">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/70">{m.label}</span>
                <span className="font-semibold text-white">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/50">Features</div>
          <ul className="mt-2 text-sm text-white/70 space-y-1">
            {features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
          <div className="text-xs uppercase tracking-widest text-white/50">Evaluation</div>
          <ul className="mt-2 text-sm text-white/70 space-y-1">
            {evaluation.map((e) => (
              <li key={e}>• {e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 text-sm text-white/70 leading-relaxed">
        <div className="text-xs uppercase tracking-widest text-white/50">Do not conclude</div>
        <ul className="mt-2 space-y-1">
          {notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
