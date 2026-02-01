import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function OverviewPage() {
  return (
    <div className="relative">
      {/* Background photo */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1520975958225-1a29f33a0bda?auto=format&fit=crop&w=2200&q=70"
          alt="Background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-[#f7f8fb]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <Kicker>{SITE.brand.subtitle}</Kicker>
              <H1>{SITE.brand.title}</H1>

              <div className="mt-4 max-w-2xl">
                <P className="text-[15px] sm:text-base">
                  {SITE.overview.lead}
                </P>
              </div>

              <div className="mt-6 rounded-3xl bg-white ring-1 ring-black/10 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
                <div className="text-xs uppercase tracking-widest text-black/50">
                  One-line mission
                </div>
                <div className="mt-2 text-base font-semibold text-black">
                  {SITE.brand.mission}
                </div>

                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {SITE.overview.proofBullets.map((b) => (
                    <div key={b} className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                      <div className="text-sm text-black/80">{b}</div>
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

                <div className="mt-4 text-xs text-black/55">
                  Standard used here: descriptive summaries with source links. Directional associations only. No causal claims.
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Card className="bg-white/90">
                  <H2>{SITE.glossary.recidivism.term}</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.plain}</P>
                </Card>

                <Card className="bg-white/90">
                  <H2>Why it matters</H2>
                  <P className="mt-2">{SITE.glossary.recidivism.whyItMatters}</P>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="bg-white/90">
                <H2>What to click</H2>
                <div className="mt-4 space-y-3">
                  {SITE.overview.guidedPath.map((x) => (
                    <a
                      key={x.href}
                      href={x.href}
                      className="block rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4 hover:bg-white transition"
                    >
                      <div className="text-sm font-semibold text-black">{x.label}</div>
                      <div className="mt-1 text-sm text-black/65">
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

              <div className="mt-4 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 ring-1 ring-black/10 p-6">
                <div className="text-sm font-semibold text-black">Positioning</div>
                <div className="mt-2 text-sm text-black/70 leading-relaxed">
                  This site is not advocating for crime. It focuses on documented injustice, transparent measurement, and practical policy choices that reduce harm and improve reentry outcomes.
                </div>
              </div>

              <div className="mt-4 text-xs text-black/45">
                Background photo credit is listed on Sources.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
