// app/research/page.tsx
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
    <div className="bg-white">
      <Container>
        <div className="pt-12 sm:pt-16 pb-12">
          <Kicker>Research</Kicker>
          <H1>{SITE.research.title}</H1>

          <div className="mt-6">
            <SlideGallery
              slides={SITE.research.slides}
              title="Slide walkthrough"
              subtitle="Scroll through the deck highlights in a full widescreen format."
            />
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <Card>
                <H2>Method</H2>
                <Bullets items={SITE.research.methodBullets} />
                <Divider />
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                    Open analysis repo
                  </ButtonLink>
                  <ButtonLink href="/sources" variant="ghost">
                    Sources
                  </ButtonLink>
                </div>
              </Card>

              <Card>
                <H2>Findings</H2>
                <Bullets items={SITE.research.resultsBullets} />
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Card>
                <H2>Limits</H2>
                <Bullets items={SITE.research.limitationsBullets} />
              </Card>

              <Card>
                <H2>Interpretation</H2>
                <P>
                  The model results are presented as <span className="font-medium">directional evidence</span>.
                  Stronger versions would add administrative participation data and more controls.
                </P>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
