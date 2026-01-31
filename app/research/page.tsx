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
  Badge,
  Callout,
} from "@/components/ui";
import { SITE } from "@/components/siteData";
import SlideGallery from "@/components/SlideGallery";
import ModelCard from "@/components/ModelCard";

export default function ResearchPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Research</Badge>
          <Badge tone="neutral">Slides</Badge>
          <Badge tone="neutral">Model notes</Badge>
        </div>

        <H1>{SITE.research.title}</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This page presents the model as directional evidence, not causation. The goal is clarity, honesty about limits, and easy verification through sources.
          </P>
        </div>

        <div className="mt-6">
          <Callout title="Key takeaway" tone="accent">
            Employment after release is associated with a lower likelihood of reoffending in this run. Offense type also matters. This is not a causal claim.
          </Callout>
        </div>

        {/* Slides */}
        <div className="mt-8">
          <SlideGallery
            slides={SITE.research.slides}
            title="Slide walkthrough"
            subtitle="Scroll through the deck. Each panel is widescreen so the full slide stays readable."
          />
        </div>

        {/* Results snapshot */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-5">
            <div className="text-xs uppercase tracking-widest text-black/50">Result</div>
            <div className="mt-2 text-lg font-semibold text-black">Employment</div>
            <div className="mt-1 text-sm text-black/70">
              Associated with lower reoffending in this run.
            </div>
          </div>
          <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-5">
            <div className="text-xs uppercase tracking-widest text-black/50">Result</div>
            <div className="mt-2 text-lg font-semibold text-black">Offense type</div>
            <div className="mt-1 text-sm text-black/70">
              Violent offense type aligned with higher return likelihood.
            </div>
          </div>
          <div className="rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-5">
            <div className="text-xs uppercase tracking-widest text-black/50">Result</div>
            <div className="mt-2 text-lg font-semibold text-black">Time served</div>
            <div className="mt-1 text-sm text-black/70">
              Not statistically significant in this run.
            </div>
          </div>
        </div>

        {/* Model accountability */}
        <div className="mt-8">
          <ModelCard
            n={2500}
            posRate="Recidivism positive class shown in demo output"
            features={[
              "Employed after release (proxy)",
              "Offense type (violent vs drug)",
              "Time served (years)",
            ]}
            evaluation={[
              "Demo focuses on interpretability and reporting discipline",
              "If expanded: add train test split and calibration checks",
            ]}
            metrics={[
              { label: "Focus", value: "Interpretability" },
              { label: "Claim type", value: "Association" },
            ]}
            notes={[
              "Do not claim employment causes lower recidivism",
              "Proxy is measurable but not program completion",
              "Real validation requires administrative program participation records",
            ]}
          />
        </div>

        {/* Main cards */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <H2>Method</H2>
              <Bullets items={SITE.research.methodBullets} />
              <Divider />
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={SITE.links.analysisRepo} external variant="primary">
                  Open analysis repo
                </ButtonLink>
                <ButtonLink href="/stats" variant="secondary">
                  Stats Lab
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
              <H2>Reproduce</H2>
              <P>
                The code repository contains the model setup and supporting materials.
              </P>
              <Divider />
              <P className="text-sm">
                Recommended steps:
              </P>
              <ul className="mt-3 text-sm text-black/70 space-y-1">
                <li>• Clone the repo</li>
                <li>• Install dependencies</li>
                <li>• Run the analysis script or notebook</li>
                <li>• Confirm the figures match the site visuals</li>
              </ul>
              <div className="mt-4">
                <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                  View reproduce steps in repo
                </ButtonLink>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Callout title="Causality note" tone="warn">
            This work reports relationships. Stronger versions would add administrative education participation records and richer controls.
          </Callout>
        </div>
      </div>
    </Container>
  );
}
