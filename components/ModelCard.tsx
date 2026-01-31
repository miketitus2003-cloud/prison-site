// components/ModelCard.tsx
import { Badge } from "@/components/ui";

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
    <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-black">Model card</div>
        <Badge tone="accent">Association only</Badge>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
          <div className="text-xs uppercase tracking-widest text-black/50">Dataset</div>
          <div className="mt-2 text-sm text-black/80">
            N = <span className="font-semibold">{n.toLocaleString()}</span>
          </div>
          <div className="mt-1 text-sm text-black/70">
            Class balance: <span className="font-semibold">{posRate}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
          <div className="text-xs uppercase tracking-widest text-black/50">Metrics</div>
          <div className="mt-2 space-y-1">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-black/70">{m.label}</span>
                <span className="font-semibold text-black">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
          <div className="text-xs uppercase tracking-widest text-black/50">Features</div>
          <ul className="mt-2 text-sm text-black/70 space-y-1">
            {features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
          <div className="text-xs uppercase tracking-widest text-black/50">Evaluation</div>
          <ul className="mt-2 text-sm text-black/70 space-y-1">
            {evaluation.map((e) => (
              <li key={e}>• {e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 text-sm text-black/70 leading-relaxed">
        <div className="text-xs uppercase tracking-widest text-black/50">Do not conclude</div>
        <ul className="mt-2 space-y-1">
          {notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
