// components/PolicyBriefCard.tsx
import { ButtonLink } from "@/components/ui";

export default function PolicyBriefCard({
  title,
  oneLine,
  bullets,
  bottomLine,
  owner,
  cost,
  timeline,
  risks,
  success,
}: {
  title: string;
  oneLine: string;
  bullets: string[];
  bottomLine: string;
  owner: string;
  cost: string;
  timeline: string;
  risks: string[];
  success: string[];
}) {
  return (
    <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 shadow-[0_16px_70px_rgba(0,0,0,0.55)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-semibold text-white">{title}</div>
        <span className="text-xs px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30">
          Policy brief
        </span>
      </div>

      <div className="mt-3 text-sm text-white/70 leading-relaxed">{oneLine}</div>

      <div className="mt-4 grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-widest text-white/50">Key points</div>
          <ul className="mt-2 text-sm text-white/70 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
            <div className="text-xs uppercase tracking-widest text-white/50">Bottom line</div>
            <div className="mt-1 text-sm text-white/80">{bottomLine}</div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-widest text-white/50">Decision memo</div>
          <div className="mt-2 space-y-3">
            <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
              <div className="text-sm font-semibold text-white">Owner</div>
              <div className="text-sm text-white/70 mt-1">{owner}</div>
            </div>
            <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
              <div className="text-sm font-semibold text-white">Cost</div>
              <div className="text-sm text-white/70 mt-1">{cost}</div>
            </div>
            <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
              <div className="text-sm font-semibold text-white">Timeline</div>
              <div className="text-sm text-white/70 mt-1">{timeline}</div>
            </div>

            <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
              <div className="text-sm font-semibold text-white">Risks</div>
              <ul className="text-sm text-white/70 mt-1 space-y-1">
                {risks.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
              <div className="text-sm font-semibold text-white">Measure success</div>
              <ul className="text-sm text-white/70 mt-1 space-y-1">
                {success.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>

            <ButtonLink href="/sources" variant="secondary">
              Sources used in this brief
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
