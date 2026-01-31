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
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>Research</Kicker>
        <H1>{SITE.research.title}</H1>
        <div className="mt-4 max-w-3xl">
  <P>
    This page walks through the research narrative in slide form first, then summarizes the method and findings below.
  </P>
</div>
        {/* Cinematic, widescreen scroll walkthrough (single source of truth) */}
        <div className="mt-8">
          <SlideGallery
            slides={SITE.research.slides}
            title="Slide walkthrough"
            subtitle="A scroll-first walkthrough of the deck highlights—full widescreen panels, one-by-one."
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
                The model results are presented as{" "}
                <span className="font-medium">directional evidence</span>. Stronger
                versions of this work would use administrative program participation
                data and additional controls.
              </P>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
