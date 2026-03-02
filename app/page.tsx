// app/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";
import { EDUCATION_EVIDENCE } from "@/components/educationData";
import PageFade from "@/components/PageFade";

const GUIDED_DESCRIPTIONS: Record<string, string> = {
  "/stats": "Live charts built from BJS primary data. Filters for time-series and breakdowns.",
  "/research": "Question, method, findings, limits, and a model card — skimmable in 8 minutes.",
  "/policy": "Three decision memos with owner, cost, timeline, risks, and success metrics.",
};

export default function OverviewPage() {
  return (
    <PageFade>
    <div className="relative">
      {/* Background photo (dark-first) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1520975958225-1a29f33a0bda?auto=format&fit=crop&w=2200&q=70"
          alt="Background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-sky-500/8 to-transparent" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-20 pb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: hero + content */}
            <div className="lg:col-span-7">
              <Kicker>{SITE.brand.subtitle}</Kicker>
              <H1>{SITE.brand.title}</H1>

              <div className="mt-5 max-w-2xl">
                <P className="text-[15px] sm:text-base leading-relaxed">{SITE.overview.lead}</P>
              </div>

              {/* Mission card */}
              <div className="mt-7 rounded-3xl bg-white/6 ring-1 ring-white/10 p-5 shadow-[0_16px_70px_rgba(0,0,0,0.55)]">
                <div className="text-xs uppercase tracking-widest text-white/55">
                  Mission
                </div>
                <div className="mt-2 text-base font-semibold text-white leading-snug">
                  {SITE.brand.mission}
                </div>

                {/* Proof bullets as mini stat chips */}
                <div className="mt-5 grid sm:grid-cols-3 gap-3">
                  {SITE.overview.proofBullets.map((b) => (
                    <div
                      key={b}
                      className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4"
                    >
                      <div className="text-sm text-white/80 leading-snug">{b}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/stats" variant="primary">
                    Start with results
                  </ButtonLink>
                  <ButtonLink href="/research" variant="secondary">
                    Deep dive
                  </ButtonLink>
                  <ButtonLink href="/policy" variant="ghost">
                    Policy only
                  </ButtonLink>
                </div>

                <div className="mt-4 text-xs text-white/45 leading-relaxed">
                  Standard: descriptive summaries with source links. Directional associations only. No causal claims.
                </div>
              </div>

              {/* Recidivism definition + why it matters */}
              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                <Card>
                  <div className="text-xs uppercase tracking-widest text-white/55 mb-3">Definition</div>
                  <H2>{SITE.glossary.recidivism.term}</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.plain}</P>
                </Card>

                <Card>
                  <div className="text-xs uppercase tracking-widest text-white/55 mb-3">Significance</div>
                  <H2>Why it matters</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.whyItMatters}</P>
                </Card>
              </div>

              {/* Education evidence */}
              <div className="mt-5">
                <Card className="bg-gradient-to-br from-indigo-500/10 via-white/5 to-sky-500/10">
                  <div className="text-xs uppercase tracking-widest text-white/55 mb-1">Evidence spotlight</div>
                  <H2>Education is a measurable reentry lever</H2>
                  <P className="mt-2">
                    High-signal stats showing the education gap in correctional populations and why
                    education access is a credible policy focus for safer communities and better reentry outcomes.
                  </P>

                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {EDUCATION_EVIDENCE.highlights.slice(0, 4).map((h) => (
                      <div key={h.label} className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                        <div className="text-xs uppercase tracking-widest text-white/55">{h.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-white">{h.value}</div>
                        <div className="mt-2 text-sm text-white/70 leading-snug">{h.note}</div>
                        <a
                          className="mt-3 inline-block text-xs text-white/55 hover:text-white underline underline-offset-4 transition"
                          href={h.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {h.sourceLabel}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                    <div className="text-sm font-semibold text-white">Interpretation rule</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">
                      {EDUCATION_EVIDENCE.plainLanguageTakeaway}
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-white/50 list-disc pl-5">
                      {EDUCATION_EVIDENCE.disclaimers.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </Card>

                <div className="mt-3 text-xs text-white/40">
                  Background photo credit is listed on Sources.
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-5 space-y-4">
              {/* What to click — guided path */}
              <Card>
                <div className="text-xs uppercase tracking-widest text-white/55 mb-1">Guided path</div>
                <H2>What to click</H2>
                <div className="mt-4 space-y-3">
                  {SITE.overview.guidedPath.map((x) => (
                    <a
                      key={x.href}
                      href={x.href}
                      className="group block rounded-2xl bg-white/6 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-white">{x.label}</div>
                        <span className="text-white/40 group-hover:text-white/70 transition text-xs">→</span>
                      </div>
                      <div className="mt-1 text-sm text-white/60 leading-snug">
                        {GUIDED_DESCRIPTIONS[x.href] ?? ""}
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-5">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                    View analysis repo
                  </ButtonLink>
                </div>
              </Card>

              {/* Positioning */}
              <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-6">
                <div className="text-xs uppercase tracking-widest text-white/55 mb-2">Positioning</div>
                <div className="text-sm text-white/75 leading-relaxed">
                  This platform is about safer communities and better outcomes: transparent measurement,
                  evidence-first summaries, and practical policy choices that support rehabilitation and reentry.
                </div>
              </div>

              {/* Education & rearrest signal */}
              <div className="rounded-3xl bg-gradient-to-br from-indigo-500/10 via-white/4 to-sky-500/10 ring-1 ring-white/10 p-6">
                <div className="text-xs uppercase tracking-widest text-white/55 mb-2">Key signal</div>
                <div className="text-sm font-semibold text-white">Education &amp; rearrest</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  In federal data summarized by the US Sentencing Commission, rearrest rates differ sharply by education:
                  60.4% without high school completion vs 19.1% with a college degree.
                </div>
                <a
                  className="mt-3 inline-block text-xs text-white/55 hover:text-white underline underline-offset-4 transition"
                  href="https://www.ussc.gov/sites/default/files/pdf/research-and-publications/research-publications/2016/recidivism_overview.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  USSC (2016) Recidivism Overview →
                </a>
              </div>

              {/* Trust in 60 seconds teaser */}
              <div className="rounded-3xl bg-white/6 ring-1 ring-white/10 p-6">
                <div className="text-xs uppercase tracking-widest text-white/55 mb-2">Trust in 60 seconds</div>
                <div className="space-y-2 text-sm text-white/70">
                  <div><span className="text-white font-semibold">10s:</span> understand what I built</div>
                  <div><span className="text-white font-semibold">30s:</span> verify claims via Sources + BJS links</div>
                  <div><span className="text-white font-semibold">60s:</span> trust it — limits shown upfront, no causal claims</div>
                </div>
                <div className="mt-4">
                  <ButtonLink href="/about" variant="ghost">
                    About this platform
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
    </PageFade>
  );
}
