// app/about/page.tsx
import { Container, Surface, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-12 md:pt-16 pb-12">
        <Kicker>About</Kicker>
        <H1>About</H1>

        <div className="mt-4 max-w-3xl">
          <P>
            This site is the public-facing version of my work on prison education, reentry, and recidivism.
            It’s built to read like a research brief: clear question, clear approach, and clear takeaways.
          </P>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Surface>
            <H2>Project focus</H2>
            <div className="mt-3 space-y-3">
              <P>
                My main question is how strongly reentry supports relate to recidivism. Because many public datasets
                don’t track education participation cleanly, I use post-release employment as a measurable proxy and
                treat the results as directional evidence not a causal claim.
              </P>
              <P>
                The policy briefs connect the research to real world debates around youth sentencing and solitary
                confinement, focusing on the strongest points and practical implications.
              </P>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/research" variant="primary">
                Read the research
              </ButtonLink>
              <ButtonLink href="/policy" variant="ghost">
                Policy briefs
              </ButtonLink>
            </div>
          </Surface>

          <Surface>
            <H2>Author</H2>
            <div className="mt-3 space-y-3">
              <P>
                {SITE.author}. This project is part of my portfolio—combining analysis, communication, and policy
                reasoning in a format that’s easy to verify and easy to read.
              </P>
              <P>
                All citations and primary links are kept on the Sources page.
              </P>

              <div className="mt-6">
                <ButtonLink href="/sources" variant="secondary">
                  Sources & references
                </ButtonLink>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </Container>
  );
}
