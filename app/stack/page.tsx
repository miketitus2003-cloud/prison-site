// app/stack/page.tsx
import { Container, Surface, Kicker, H1, H2, P, Bullets, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function BuildPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>Build</Kicker>
        <H1>How this site is built</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This is a Next.js site designed to be fast, readable, and easy to verify. It is a portfolio project that shows analysis plus communication.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Surface>
              <H2>Technical stack</H2>
              <Bullets
                items={[
                  "Next.js App Router (static pages)",
                  "TypeScript",
                  "Tailwind CSS styling",
                  "Charts built as lightweight components (no heavy chart library)",
                  "Deployed on Vercel",
                ]}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={SITE.links.analysisRepo} external variant="primary">
                  View analysis repo
                </ButtonLink>
                <ButtonLink href="/stats" variant="secondary">
                  Stats Lab
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </Surface>

            <Surface className="bg-gradient-to-br from-indigo-50 via-white to-sky-50">
              <H2>Quality signals</H2>
              <Bullets
                items={[
                  "Citations are centralized and link to primary sources",
                  "Research claims are phrased conservatively (directional evidence, not causation)",
                  "UI is responsive and works on mobile",
                  "Pages are short and scannable",
                ]}
              />
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
                  This site shows both: analysis framing, evidence handling, and communication in a format that is easy to review.
                </P>
              </div>
            </Surface>

            <Surface className="bg-neutral-900 text-white">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Build goal
              </div>
              <div className="mt-2 text-lg font-semibold text-white">
                Make evidence feel clean and undeniable.
              </div>
              <div className="mt-2 text-sm text-white/75 leading-relaxed">
                If a reviewer wants to verify a claim, they can do it in seconds.
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
