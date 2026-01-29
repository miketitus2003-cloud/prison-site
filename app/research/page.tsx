import { Container, Surface, Kicker, H1, H2, P, Bullets, Divider } from "@/components/ui";
import { SITE } from "@/components/siteData";
import SlideGallery from "@/components/SlideGallery";

export default function ResearchPage() {
  const R = SITE.research;

  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Research</Kicker>
        <H1>Prison education and recidivism</H1>
        <div className="mt-4 max-w-3xl">
          <P>{R.oneLine}</P>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Surface>
              <H2>Why this matters</H2>
              <Bullets items={R.whyBullets} />
            </Surface>

            <Surface>
              <H2>Research question</H2>
              <div className="mt-3 max-w-3xl">
                <P>{R.question}</P>
              </div>

              <Divider />
              <div className="mt-4 text-xs text-white/55">
                Note: this is a simulated dataset modeled on national patterns. It illustrates direction of effects, not causal estimates.
              </div>
            </Surface>
          </div>

          <Surface>
            <H2>Method</H2>
            <Bullets items={R.methodBullets} />
          </Surface>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Surface>
            <H2>Key results</H2>
            <Bullets items={R.resultsBullets} />
          </Surface>

          <Surface>
            <H2>Implications</H2>
            <Bullets items={R.implicationsBullets} />
          </Surface>

          <Surface>
            <H2>Next steps</H2>
            <Bullets items={R.nextStepsBullets} />
          </Surface>
        </div>

        <div className="mt-6">
          <SlideGallery slides={SITE.slides} />
        </div>
      </div>
    </Container>
  );
}
