// app/about/page.tsx
import { Container, Surface, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>About</Kicker>
        <H1>About this project</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This is a public-facing version of my recidivism work. It is built like a brief that a recruiter can scan fast,
            with citations that a reviewer can verify fast.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <Surface>
              <H2>What this site includes</H2>
              <div className="mt-3 space-y-3">
                <P>
                  <span className="font-semibold text-black">Research</span> explains the question, method, results, and a slide walkthrough.
                </P>
                <P>
                  <span className="font-semibold text-black">Policy</span> is short on purpose. Claim, strongest points, bottom line.
                </P>
                <P>
                  <span className="font-semibold text-black">Stats Lab</span> turns BJS reporting into visuals you can understand in a minute.
                </P>
                <P>
                  <span className="font-semibold text-black">Sources</span> keeps the citations and official links in one place.
                </P>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/research" variant="primary">
                  Open research
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
              <H2>What I want reviewers to see</H2>
              <div className="mt-3 space-y-3">
                <P>
                  I can translate data into a clear story without hiding the limits.
                </P>
                <P>
                  I can build clean interfaces that make evidence easy to check.
                </P>
                <P>
                  I can communicate policy arguments without turning the site into a wall of text.
                </P>
              </div>
            </Surface>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Surface>
              <H2>Author</H2>
              <div className="mt-3 space-y-3">
                <P>
                  {SITE.author}. This project is part of my portfolio: analysis, communication, and visual presentation.
                </P>
                <P>
                  All citations and primary links are centralized in Sources and Stats Lab.
                </P>
              </div>

              <div className="mt-6 rounded-3xl bg-neutral-50 ring-1 ring-black/10 p-5">
                <div className="text-xs uppercase tracking-widest text-black/50">Quick links</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.links.analysisRepo} external variant="ghost">
                    Analysis repo
                  </ButtonLink>
                  <ButtonLink href="/policy" variant="ghost">
                    Policy briefs
                  </ButtonLink>
                  <ButtonLink href="/injustice" variant="ghost">
                    Topics
                  </ButtonLink>
                </div>
              </div>
            </Surface>
          </div>
        </div>
      </div>
    </Container>
  );
}
