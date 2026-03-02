// app/stack/page.tsx
import { Container, Surface, Kicker, H1, H2, P, Bullets, ButtonLink, Divider } from "@/components/ui";
import { SITE } from "@/components/siteData";
import PageFade from "@/components/PageFade";

export default function BuildPage() {
  return (
    <PageFade>
      <Container>
        <div className="pt-12 md:pt-16 pb-12">
          <Kicker>Build</Kicker>
          <H1>How this site is built</H1>

          <div className="mt-4 max-w-3xl">
            <P>
              This is a Next.js site designed to be fast, readable, and easy to verify. It is a portfolio project
              that shows analysis plus communication.
            </P>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <Surface>
                <H2>Technical stack</H2>
                <Bullets
                  items={[
                    "Next.js 16 App Router — static pages, fast builds",
                    "TypeScript — strict type safety throughout",
                    "Tailwind CSS v4 — utility-first styling",
                    "Framer Motion — minimal page transition animations",
                    "SVG-based charts — no heavy chart library dependency",
                    "Deployed on Vercel — CI/CD on every push",
                  ]}
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="primary">
                    View analysis repo
                  </ButtonLink>
                  <ButtonLink href="/stats" variant="secondary">
                    Dashboard
                  </ButtonLink>
                  <ButtonLink href="/sources" variant="ghost">
                    Sources
                  </ButtonLink>
                </div>
              </Surface>

              <Surface className="bg-gradient-to-br from-indigo-500/12 via-white/5 to-sky-500/12">
                <H2>Quality signals</H2>
                <Bullets
                  items={[
                    "Citations centralized — every claim links to a primary source",
                    "Conservative language — directional evidence, not causation",
                    "Responsive — tested on mobile and desktop",
                    "Pages are short and scannable — built for a 30–60 second reviewer",
                    "No secrets or API keys — fully static, no backend",
                  ]}
                />
              </Surface>

              <Surface>
                <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Project scope</div>
                <H2>What this demonstrates</H2>
                <div className="mt-3 space-y-3 text-sm text-white/70">
                  <div>
                    <span className="font-semibold text-white">Data storytelling</span> — turning raw BJS PDFs
                    into legible, labeled charts with interpretation rules.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Policy writing</span> — decision-memo format
                    with owner, cost, timeline, risks, and success metrics.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Product thinking</span> — information
                    architecture, credibility design, and a "trust in 60 seconds" standard.
                  </div>
                  <div>
                    <span className="font-semibold text-white">Engineering</span> — clean TypeScript,
                    no unnecessary dependencies, deployed and version-controlled.
                  </div>
                </div>
              </Surface>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Surface>
                <H2>Why this matters</H2>
                <div className="mt-3 space-y-3">
                  <P>
                    Employers want people who can do the work and explain the work.
                  </P>
                  <P>
                    This site shows both: analysis framing, evidence handling, and communication
                    in a format that is easy to review in under a minute.
                  </P>
                </div>
              </Surface>

              <div className="rounded-3xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/15 to-emerald-500/15 ring-1 ring-white/12 p-6">
                <div className="text-xs uppercase tracking-widest text-white/55 mb-2">Build goal</div>
                <div className="text-xl font-semibold text-white leading-snug">
                  Make evidence feel clean and undeniable.
                </div>
                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                  If a reviewer wants to verify a claim, they can do it in seconds via the Sources page
                  or the linked BJS documents.
                </div>
              </div>

              <Surface>
                <div className="text-xs uppercase tracking-widest text-white/50 mb-3">Methodology</div>
                <H2>Data handling</H2>
                <Bullets
                  items={[
                    "Primary sources preferred (BJS, USSC)",
                    "Secondary sources clearly labeled",
                    "All charts are descriptive summaries",
                    "Association language used throughout — no causal claims",
                    "Limitations stated upfront on the Insights page",
                  ]}
                />
                <Divider />
                <div className="text-xs text-white/45 leading-relaxed">
                  Data is extracted from publicly available government PDFs. Raw numbers are in
                  statsData.ts and cross-referenced against source tables.
                </div>
              </Surface>
            </div>
          </div>
        </div>
      </Container>
    </PageFade>
  );
}
