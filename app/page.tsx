// app/page.tsx
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

        {/* Darken image for readability */}
        <div className="absolute inset-0 bg-[#06080f]/80" />

        {/* Subtle top glow (keeps it “premium”, still black) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 420px at 18% 0%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(850px 360px at 85% 0%, rgba(56,189,248,0.18), transparent 60%)",
          }}
        />

        {/* Fade to solid black at bottom so sections feel grounded */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06080f]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-14">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="text-white/70">
                <Kicker>{SITE.brand.subtitle}</Kicker>
              </div>

              {/* If your H1 component is still black, wrap it in a white text container */}
              <div className="text-white">
                <H1>{SITE.brand.title}</H1>
              </div>

              <div className="mt-4 max-w-2xl">
                <P className="text-[15px] sm:text-base text-white/75">
                  {SITE.overview.lead}
                </P>
              </div>

              {/* Mission / proof / CTAs */}
              <div className="mt-6 rounded-3xl bg-white/6 ring-1 ring-white/12 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur">
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
                      className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4"
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

              {/* Recidivism definition */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Card className="bg-white/6 ring-white/12 text-white">
                  <div className="text-white">
                    <H2>{SITE.glossary.recidivism.term}</H2>
                  </div>
                  <P className="mt-2 text-white/75">{SITE.glossary.recidivism.plain}</P>
                </Card>

                <Card className="bg-white/6 ring-white/12 text-white">
                  <div className="text-white">
                    <H2>Why it matters</H2>
                  </div>
                  <P className="mt-2 text-white/75">{SITE.glossary.recidivism.whyItMatters}</P>
                </Card>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-5">
              <Card className="bg-white/6 ring-white/12 text-white">
                <div className="text-white">
                  <H2>What to click</H2>
                </div>

                <div className="mt-4 space-y-3">
                  {SITE.overview.guidedPath.map((x) => (
                    <a
                      key={x.href}
                      href={x.href}
                      className="block rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 hover:bg-white/8 transition"
                    >
                      <div className="text-sm font-semibold text-white">
                        {x.label}
                      </div>
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

              <div className="mt-4 rounded-3xl bg-white/6 ring-1 ring-white/12 p-6 backdrop-blur">
                <div className="text-sm font-semibold text-white">Positioning</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  This site is not advocating for crime. It focuses on documented injustice, transparent measurement, and practical policy choices that reduce harm and improve reentry outcomes.
                </div>
              </div>

              <div className="mt-4 text-xs text-white/45">
                Background photo credit is listed on Sources.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
