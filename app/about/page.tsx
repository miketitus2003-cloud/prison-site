// app/about/page.tsx
import {
  Container,
  Surface,
  Kicker,
  H1,
  H2,
  P,
  ButtonLink,
  Divider,
} from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=70"
          alt="About background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#06080f]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/90 to-[#f7f8fb]" />
      </div>

      <Container>
        <div className="pt-12 md:pt-16 pb-12">
          <Kicker>About</Kicker>
          <H1>About this platform</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              This is a public-facing version of my justice data work. It’s built
              to be skimmed fast and verified fast: dashboard for patterns,
              sources for citations, insights for method and limits.
            </P>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-7 space-y-6">
              <Surface className="bg-[#06080f]/75">
                <H2>The mission</H2>
                <div className="mt-3 space-y-3">
                  <P className="text-black">
                    <span className="font-semibold">One-line:</span>{" "}
                    {SITE.brand.mission}
                  </P>
                  <P>
                    The goal is to show that I can take messy public reporting,
                    extract the signal, explain the “so what,” and ship a
                    polished product with credibility rules.
                  </P>
                </div>

                <Divider />

                <H2>What’s included</H2>
                <div className="mt-3 space-y-3">
                  <P>
                    <span className="font-semibold text-black">Dashboard</span>{" "}
                    — BJS-derived visuals, filters, and small disclaimers that
                    keep interpretation honest.
                  </P>
                  <P>
                    <span className="font-semibold text-black">Insights</span>{" "}
                    — research framing, method, results snapshot, limitations,
                    and a model card.
                  </P>
                  <P>
                    <span className="font-semibold text-black">Policy briefs</span>{" "}
                    — decision memos: Owner, Cost, Timeline, Risks, Success
                    metrics.
                  </P>
                  <P>
                    <span className="font-semibold text-black">Sources</span>{" "}
                    — claim → source mapping with quality labels.
                  </P>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/stats" variant="primary">
                    Open Dashboard
                  </ButtonLink>
                  <ButtonLink href="/research" variant="secondary">
                    Open Insights
                  </ButtonLink>
                  <ButtonLink href="/sources" variant="ghost">
                    Open Sources
                  </ButtonLink>
                </div>
              </Surface>

              <Surface className="bg-gradient-to-br from-indigo-50 via-white to-sky-50">
                <H2>“Trust in 60 seconds” standard</H2>
                <div className="mt-3 space-y-3">
                  <P>
                    <span className="font-semibold text-black">10 seconds:</span>{" "}
                    you understand what this is and what I built.
                  </P>
                  <P>
                    <span className="font-semibold text-black">30 seconds:</span>{" "}
                    you can verify key claims via Sources + linked BJS docs.
                  </P>
                  <P>
                    <span className="font-semibold text-black">60 seconds:</span>{" "}
                    you trust the interpretation because the site enforces
                    “association, not causation,” and shows limits up front.
                  </P>
                </div>

                <Divider />

                <div className="text-xs uppercase tracking-widest text-black/50">
                  Verification rule
                </div>
                <P className="mt-2">
                  Every chart is descriptive and source-linked. No causal claims.
                  Claims are mapped to citations on the Sources page.
                </P>
              </Surface>

              <Surface className="bg-[#06080f]/75">
                <H2>Skills demonstrated (ATS-friendly)</H2>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {[
                    "Data storytelling (charts + narrative + so-what)",
                    "Policy analytics (levers + evaluation metrics)",
                    "Product thinking (UX, IA, credibility)",
                    "Shipping (Next.js, TypeScript, Tailwind, Vercel)",
                    "Evidence standards (claim → source mapping)",
                    "Clear communication (brief-style writing)",
                  ].map((x) => (
                    <div
                      key={x}
                      className="rounded-2xl bg-neutral-50 ring-1 ring-black/10 p-4"
                    >
                      <div className="text-sm text-black/80">{x}</div>
                    </div>
                  ))}
                </div>
              </Surface>
            </div>

            {/* Right column */}
            <div className="lg:col-span-5 space-y-6">
              <Surface className="bg-[#06080f]/75">
                <H2>Author</H2>
                <div className="mt-3 space-y-3">
                  <P>
                    {SITE.author}. This project is part of my portfolio: analysis,
                    communication, and public-facing delivery.
                  </P>
                  <P>
                    Primary data and citations live on the Sources page, and the
                    visuals are on the Dashboard.
                  </P>
                </div>

                <Divider />

                <div className="text-xs uppercase tracking-widest text-black/50">
                  Quick links
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="secondary">
                    Analysis repo
                  </ButtonLink>
                  <ButtonLink href="/policy" variant="ghost">
                    Policy briefs
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="ghost">
                    Dashboard
                  </ButtonLink>
                </div>
              </Surface>

              <Surface className="bg-[#06080f]/75">
                <H2>Notes for reviewers</H2>
                <div className="mt-3 space-y-3">
                  <P>
                    Recidivism is defined in plain English on Overview. The
                    Dashboard shows patterns; Insights explains method and limits;
                    Sources enables fast verification.
                  </P>
                  <P className="text-black/60 text-sm">
                    Background photo credit is listed on Sources.
                  </P>
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
