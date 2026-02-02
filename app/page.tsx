// app/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";
import { EDUCATION_EVIDENCE } from "@/components/educationData";

export default function OverviewPage() {
  return (
    <div className="relative">
      {/* Background photo (dark-first) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1520975958225-1a29f33a0bda?auto=format&fit=crop&w=2200&q=70"
          alt="Background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay only (REMOVE white gradient) */}
        <div className="absolute inset-0 bg-[#06080f]/82" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-sky-500/10 to-transparent" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <Kicker>{SITE.brand.subtitle}</Kicker>
              <H1>{SITE.brand.title}</H1>

              <div className="mt-4 max-w-2xl">
                <P className="text-[15px] sm:text-base">{SITE.overview.lead}</P>
              </div>

              <div className="mt-6 rounded-3xl bg-white/6 ring-1 ring-white/10 p-5 shadow-[0_16px_70px_rgba(0,0,0,0.55)]">
                <div className="text-xs uppercase tracking-widest text-white/55">
                  One-line mission
                </div>
                <div className="mt-2 text-base font-semibold text-white">
                  {SITE.brand.mission}
                </div>

                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {SITE.overview.proofBullets.map((b) => (
                    <div
                      key={b}
                      className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4"
                    >
                      <div className="text-sm text-white/80">{b}</div>
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

                <div className="mt-4 text-xs text-white/55">
                  Standard used here: descriptive summaries with source links. Directional associations only. No causal claims.
                </div>
              </div>

              {/* Recidivism definition + why it matters */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Card>
                  <H2>{SITE.glossary.recidivism.term}</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.plain}</P>
                </Card>

                <Card>
                  <H2>Why it matters</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.whyItMatters}</P>
                </Card>
              </div>

              {/* NEW: Education evidence */}
              <div className="mt-6">
                <Card className="bg-gradient-to-br from-indigo-500/10 via-white/5 to-sky-500/10">
                  <H2>Education is a measurable reentry lever</H2>
                  <P className="mt-2">
                    Here are a few high-signal stats that show (1) the education gap in correctional populations
                    and (2) why education access is a credible policy focus when your goal is safer communities and
                    better reentry outcomes.
                  </P>

                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {EDUCATION_EVIDENCE.highlights.slice(0, 4).map((h) => (
                      <div key={h.label} className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4">
                        <div className="text-xs uppercase tracking-widest text-white/55">{h.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-white">{h.value}</div>
                        <div className="mt-2 text-sm text-white/70">{h.note}</div>
                        <a
                          className="mt-3 inline-block text-xs text-white/60 hover:text-white underline underline-offset-4"
                          href={h.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source: {h.sourceLabel}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                    <div className="text-sm font-semibold text-white">Interpretation rule</div>
                    <div className="mt-2 text-sm text-white/70">
                      {EDUCATION_EVIDENCE.plainLanguageTakeaway}
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-white/55 list-disc pl-5">
                      {EDUCATION_EVIDENCE.disclaimers.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </Card>

                <div className="mt-3 text-xs text-white/50">
                  Background photo credit is listed on Sources.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card>
                <H2>What to click</H2>
                <div className="mt-4 space-y-3">
                  {SITE.overview.guidedPath.map((x) => (
                    <a
                      key={x.href}
                      href={x.href}
                      className="block rounded-2xl bg-white/6 ring-1 ring-white/10 p-4 hover:bg-white/10 transition"
                    >
                      <div className="text-sm font-semibold text-white">{x.label}</div>
                      <div className="mt-1 text-sm text-white/65">
                        Fast path for skimming. Built for a 30–60 second reviewer.
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-5">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                    View code repo
                  </ButtonLink>
                </div>
              </Card>

              <div className="mt-4 rounded-3xl bg-white/6 ring-1 ring-white/10 p-6">
                <div className="text-sm font-semibold text-white">Positioning</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  This platform is about safer communities and better outcomes: transparent measurement,
                  evidence-first summaries, and practical policy choices that support rehabilitation and reentry.
                </div>
              </div>

              {/* NEW: high-signal stat card */}
              <div className="mt-4 rounded-3xl bg-white/6 ring-1 ring-white/10 p-6">
                <div className="text-sm font-semibold text-white">Education & rearrest signal</div>
                <div className="mt-2 text-sm text-white/70">
                  In federal data summarized by the US Sentencing Commission, rearrest rates differ sharply by education:
                  people without high school completion show much higher rearrest than those with a college degree.
                </div>
                <a
                  className="mt-3 inline-block text-xs text-white/60 hover:text-white underline underline-offset-4"
                  href="https://www.ussc.gov/sites/default/files/pdf/research-and-publications/research-publications/2016/recidivism_overview.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source: USSC (2016) Recidivism Overview
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
