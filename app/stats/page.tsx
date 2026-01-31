// app/stats/page.tsx
import Link from "next/link";
import { Container, Kicker, H1, P, Surface, ButtonLink } from "@/components/ui";
import MiniBarChart from "@/components/MiniBarChart";
import { FACTS } from "@/data/facts";

function SourcePill({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold bg-black/5 hover:bg-black/10 border border-black/10 text-black/70 transition"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
      {label}
    </a>
  );
}

function StatCard({
  label,
  value,
  context,
  sourceLabel,
  sourceHref,
}: {
  label: string;
  value: string;
  context: string;
  sourceLabel: string;
  sourceHref: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
      <div className="text-xs uppercase tracking-widest text-black/50">
        {label}
      </div>
      <div className="mt-2 text-3xl md:text-4xl font-semibold text-black/90">
        {value}
      </div>
      <div className="mt-3 text-sm text-black/65 leading-relaxed">
        {context}
      </div>
      <div className="mt-4">
        <SourcePill label={sourceLabel} href={sourceHref} />
      </div>
    </div>
  );
}

export default function StatsPage() {
  const chart = FACTS.demoCharts.recidivismConcept;

  return (
    <div className="relative">
      {/* Background art */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-28 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.55), rgba(16,185,129,0.20), transparent 60%)" }}
        />
        <div className="absolute -bottom-28 -left-28 h-[560px] w-[560px] rounded-full blur-3xl opacity-35"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.45), rgba(59,130,246,0.15), transparent 60%)" }}
        />
        <div className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <Container>
        <div className="pt-12 md:pt-16 pb-12 relative">
          <Kicker>Stats Lab</Kicker>
          <H1>Numbers you can verify</H1>

          <div className="mt-4 max-w-3xl">
            <P className="text-black/70">
              This page centralizes core metrics and links. Every stat includes a source so readers can verify context.
            </P>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/research" variant="primary">
              Research brief
            </ButtonLink>
            <ButtonLink href="/policy" variant="secondary">
              Policy briefs
            </ButtonLink>
            <ButtonLink href="/sources" variant="ghost">
              Sources
            </ButtonLink>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                <div className="text-sm font-semibold text-black/85">
                  {chart.title}
                </div>
                <div className="mt-2 text-sm text-black/60 leading-relaxed">
                  {chart.subtitle}
                </div>

                <div className="mt-5">
                  <MiniBarChart points={chart.points} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="text-xs text-black/55">
                    Source framing
                  </div>
                  <SourcePill label={chart.sourceLabel} href={chart.sourceHref} />
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                <div className="text-sm font-semibold text-black/85">
                  Why this exists
                </div>
                <div className="mt-3 text-sm text-black/65 leading-relaxed">
                  {FACTS.disclaimers.intent}
                </div>
                <div className="mt-3 text-sm text-black/65 leading-relaxed">
                  {FACTS.disclaimers.caution}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid gap-6">
              {FACTS.quickStats.map((s) => (
                <StatCard
                  key={s.id}
                  label={s.label}
                  value={s.value}
                  context={s.context}
                  sourceLabel={s.sourceLabel}
                  sourceHref={s.sourceHref}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
            <div className="text-sm font-semibold text-black/85">
              Want more stats
            </div>
            <div className="mt-2 text-sm text-black/65 leading-relaxed max-w-3xl">
              Next upgrade is replacing the concept chart with real outputs and adding breakdowns by offense type, time served, and employment status.
              The AI assistant can pull from this page because the values are stored in one place.
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/injustice"
                className="rounded-2xl px-4 py-2.5 text-sm font-semibold bg-black text-white hover:opacity-90 transition"
              >
                Explore injustice topics
              </Link>
              <Link
                href="/stack"
                className="rounded-2xl px-4 py-2.5 text-sm font-semibold bg-black/5 border border-black/10 text-black/80 hover:bg-black/10 transition"
              >
                How this site was built
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
