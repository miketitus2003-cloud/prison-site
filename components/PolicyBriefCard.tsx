// components/PolicyBriefCard.tsx
import { ButtonLink, Badge } from "@/components/ui";

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
    <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-semibold text-black">{title}</div>
        <Badge tone="neutral">Policy brief</Badge>
      </div>

      <div className="mt-3 text-sm text-black/70 leading-relaxed">{oneLine}</div>

      <div className="mt-4 grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-widest text-black/50">Strong points</div>
          <ul className="mt-2 text-sm text-black/70 space-y-2">
            {bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          <div className="mt-4 rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
            <div className="text-xs uppercase tracking-widest text-black/50">Bottom line</div>
            <div className="mt-1 text-sm text-black/80">{bottomLine}</div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-widest text-black/50">Decision memo</div>
          <div className="mt-2 space-y-3">
            <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
              <div className="text-sm font-semibold text-black">Owner</div>
              <div className="text-sm text-black/70 mt-1">{owner}</div>
            </div>
            <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
              <div className="text-sm font-semibold text-black">Cost</div>
              <div className="text-sm text-black/70 mt-1">{cost}</div>
            </div>
            <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
              <div className="text-sm font-semibold text-black">Timeline</div>
              <div className="text-sm text-black/70 mt-1">{timeline}</div>
            </div>

            <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
              <div className="text-sm font-semibold text-black">Risks</div>
              <ul className="text-sm text-black/70 mt-1 space-y-1">
                {risks.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
              <div className="text-sm font-semibold text-black">Measure success</div>
              <ul className="text-sm text-black/70 mt-1 space-y-1">
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
