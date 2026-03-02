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
  Bullets,
} from "@/components/ui";
import { SITE } from "@/components/siteData";
import PageFade from "@/components/PageFade";

export default function AboutPage() {
  return (
    <PageFade>
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=70"
            alt="About background"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#06080f]/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/8 via-transparent to-[#06080f]" />
        </div>

        <Container>
          <div className="pt-12 md:pt-16 pb-12">
            <Kicker>About</Kicker>
            <H1>About this platform</H1>

            {/* TL;DR */}
            <div className="mt-5 rounded-3xl bg-white/6 ring-1 ring-white/10 p-5 max-w-3xl">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2">TL;DR</div>
              <P>
                A public-facing data platform built to turn raw justice statistics into fast,
                verifiable insights — dashboards, brief-style research notes, and decision-memo policy briefs,
                all grounded in primary government sources.
              </P>
            </div>

            <div className="mt-10 grid lg:grid-cols-12 gap-6">
              {/* Left column */}
              <div className="lg:col-span-7 space-y-6">

                {/* Project description */}
                <Surface>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Project description</div>
                  <H2>What this is</H2>
                  <div className="mt-3 space-y-3">
                    <P>
                      This platform visualizes and explains recidivism data from the Bureau of Justice
                      Statistics. The goal is to make complex government reporting readable in under a minute
                      — for researchers, policy reviewers, and anyone interested in what the evidence says.
                    </P>
                    <P>
                      <span className="font-semibold text-white">Research scope:</span> Recidivism patterns
                      from a 34-state prisoner release cohort (2012), with comparisons to a 9-year follow-up
                      study (2018). Secondary analysis covers education attainment gaps and correctional
                      programming access.
                    </P>
                    <P>
                      <span className="font-semibold text-white">Methodology:</span> All charts are
                      descriptive summaries of published government data. No original data collection was
                      performed. Claims are phrased as directional associations — not causal estimates.
                    </P>
                  </div>

                  <Divider />

                  <H2>What&apos;s included</H2>
                  <div className="mt-3 space-y-3">
                    <P>
                      <span className="font-semibold text-white">Dashboard</span>{" "}
                      — BJS-derived charts with time-series and breakdown views. Downloadable CSV.
                    </P>
                    <P>
                      <span className="font-semibold text-white">Insights</span>{" "}
                      — Research framing, method, results snapshot, limitations, and model card.
                    </P>
                    <P>
                      <span className="font-semibold text-white">Policy briefs</span>{" "}
                      — Decision memos: Owner, Cost, Timeline, Risks, and Success metrics.
                    </P>
                    <P>
                      <span className="font-semibold text-white">Sources</span>{" "}
                      — Claim-to-source mapping with quality labels (primary vs secondary).
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

                {/* Trust standard */}
                <Surface className="bg-gradient-to-br from-indigo-500/15 via-white/5 to-sky-500/15">
                  <H2>&quot;Trust in 60 seconds&quot; standard</H2>
                  <div className="mt-3 space-y-3">
                    <P>
                      <span className="font-semibold text-white">10 seconds:</span>{" "}
                      you understand what this is and what I built.
                    </P>
                    <P>
                      <span className="font-semibold text-white">30 seconds:</span>{" "}
                      you can verify key claims via Sources + linked BJS docs.
                    </P>
                    <P>
                      <span className="font-semibold text-white">60 seconds:</span>{" "}
                      you trust the interpretation because the site enforces
                      &quot;association, not causation,&quot; and shows limits up front.
                    </P>
                  </div>

                  <Divider />

                  <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Verification rule</div>
                  <P>
                    Every chart is descriptive and source-linked. No causal claims.
                    Claims are mapped to citations on the Sources page.
                  </P>
                </Surface>

                {/* Skills */}
                <Surface>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Portfolio signals</div>
                  <H2>Skills demonstrated</H2>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {[
                      "Data storytelling (charts + narrative + so-what)",
                      "Policy analytics (levers + evaluation metrics)",
                      "Product thinking (UX, IA, credibility design)",
                      "Shipping (Next.js, TypeScript, Tailwind, Vercel)",
                      "Evidence standards (claim → source mapping)",
                      "Clear communication (brief-style writing)",
                    ].map((x) => (
                      <div
                        key={x}
                        className="rounded-2xl bg-white/6 ring-1 ring-white/10 p-4"
                      >
                        <div className="text-sm text-white/80">{x}</div>
                      </div>
                    ))}
                  </div>
                </Surface>
              </div>

              {/* Right column */}
              <div className="lg:col-span-5 space-y-6">

                {/* Author + repo */}
                <Surface>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Author</div>
                  <H2>{SITE.author}</H2>
                  <div className="mt-3 space-y-3">
                    <P>
                      This project is part of my portfolio: analysis, communication, and
                      public-facing delivery. The goal is to show I can take messy public data,
                      extract signal, and ship something credible.
                    </P>
                    <P>
                      Primary data and citations live on the Sources page. Visuals are on the Dashboard.
                      Code is open-source on GitHub.
                    </P>
                  </div>

                  <Divider />

                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Links</div>
                  <div className="flex flex-wrap gap-3">
                    <ButtonLink href={SITE.links.analysisRepo} external variant="primary">
                      GitHub: Analysis repo ↗
                    </ButtonLink>
                    <ButtonLink href="/stack" variant="secondary">
                      Tech stack
                    </ButtonLink>
                    <ButtonLink href="/policy" variant="ghost">
                      Policy briefs
                    </ButtonLink>
                  </div>
                </Surface>

                {/* Data sources summary */}
                <Surface>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Data sources</div>
                  <H2>Primary data</H2>
                  <Bullets
                    items={[
                      "Bureau of Justice Statistics (BJS) — 2012 34-state cohort",
                      "BJS (2018) — 9-year follow-up update",
                      "US Sentencing Commission (USSC) — recidivism overview",
                      "RAND Corporation — correctional education meta-analysis",
                    ]}
                  />
                  <Divider />
                  <div className="text-xs text-white/45 leading-relaxed">
                    All data is from publicly available government publications.
                    No proprietary data was used. See the Sources page for full citation details.
                  </div>
                </Surface>

                {/* Disclaimer */}
                <Surface>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Disclaimer</div>
                  <H2>Notes for reviewers</H2>
                  <div className="mt-3 space-y-3">
                    <P>
                      This is a portfolio project — not a peer-reviewed publication. Statistics are drawn
                      from published government reports. All claims are descriptive; none are causal.
                    </P>
                    <P>
                      Recidivism is defined in plain English on Overview. Measurement differences
                      (rearrest vs reconviction vs reincarceration) are labeled near each chart.
                    </P>
                    <P className="text-white/50 text-sm">
                      Background photo credit is listed on Sources.
                    </P>
                  </div>
                </Surface>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </PageFade>
  );
}
