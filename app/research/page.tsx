import {
  Container,
  Card,
  Kicker,
  H1,
  H2,
  P,
  Bullets,
  Divider,
  ButtonLink,
} from "@/components/ui";
import { SITE } from "@/components/siteData";
import SlideGallery from "@/components/SlideGallery";

export default function ResearchPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=2200&q=70"
          alt="Insights background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/88" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/88 to-[#f7f8fb]" />
      </div>

      <Container>
        <div className="pt-12 sm:pt-16 pb-12">
          <Kicker>Insights</Kicker>
          <H1>{SITE.research.title}</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              This page explains the question, method, findings, and limits in a format designed for skimming.
              Language is standardized to association, not causation.
            </P>
          </div>

          <div className="mt-8 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <Card className="bg-white/90">
                <H2>Results snapshot</H2>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Direction</div>
                    <div className="mt-2 text-sm font-semibold text-black">Employment ↘ reoffending</div>
                    <div className="mt-1 text-sm text-black/70">Directional association</div>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Top driver</div>
                    <div className="mt-2 text-sm font-semibold text-black">Offense type mattered</div>
                    <div className="mt-1 text-sm text-black/70">Directional association</div>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4">
                    <div className="text-xs uppercase tracking-widest text-black/50">Do not conclude</div>
                    <div className="mt-2 text-sm font-semibold text-black">No causality</div>
                    <div className="mt-1 text-sm text-black/70">Transparent limits</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/90">
                <H2>Method</H2>
                <Bullets items={SITE.research.methodBullets} />
                <Divider />
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                    Open analysis repo
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="ghost">
                    Dashboard
                  </ButtonLink>
                </div>
              </Card>

              <Card className="bg-white/90">
                <H2>Findings</H2>
                <Bullets items={SITE.research.resultsBullets} />
              </Card>

              <Card className="bg-white/90">
                <H2>Slide walkthrough</H2>
                <P className="mt-2">
                  Scroll through the deck as a narrative. Each panel is widescreen and designed to stay readable.
                </P>
                <div className="mt-6">
                  <SlideGallery
                    slides={SITE.research.slides}
                    title="Slide walkthrough"
                    subtitle="A scroll-first walkthrough of the deck highlights, one-by-one."
                  />
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-white/90">
                <H2>Model card</H2>
                <div className="mt-3 space-y-3 text-sm text-black/70">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/50">Goal</div>
                    <div className="mt-1">{SITE.research.modelCard.goal}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/50">Data</div>
                    <div className="mt-1">{SITE.research.modelCard.data}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-black/50">Evaluation</div>
                    <div className="mt-1">{SITE.research.modelCard.evaluation}</div>
                  </div>
                </div>

                <Divider />

                <div className="text-xs uppercase tracking-widest text-black/50">Do not conclude</div>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  {SITE.research.modelCard.doNotConclude.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/45" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="bg-white/90">
                <H2>Limits</H2>
                <Bullets items={SITE.research.limitationsBullets} />
              </Card>

              <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 ring-1 ring-black/10 p-6">
                <div className="text-sm font-semibold text-black">Interpretation rule</div>
                <div className="mt-2 text-sm text-black/70">
                  This work is presented as directional evidence. Better versions would use administrative program participation
                  data and richer controls.
                </div>
              </div>

              <div className="text-xs text-black/45">
                Background photo credit is listed on Sources.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
