import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-12">
        <Kicker>About</Kicker>
        <H1>About this project</H1>

        <div className="mt-5 max-w-3xl">
          <P className="text-base sm:text-lg">
            I built this as a polished, public-facing version of my recidivism work focused on clarity,
            structure, and verifiable sourcing.
          </P>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Card>
            <H2>What it is</H2>
            <div className="mt-3 space-y-3">
              <P>
                A research brief that highlights the question, method, and findings without burying the reader.
              </P>
              <P>
                A set of policy briefs connected to real debates around youth punishment and solitary confinement.
              </P>
            </div>
          </Card>

          <Card>
            <H2>Author</H2>
            <div className="mt-3 space-y-3">
              <P>
                {SITE.author}. This site is part of my portfolio: data analysis + clear writing + policy reasoning.
              </P>
              <P>
                All citations and primary links are centralized on the Sources page.
              </P>

              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/research" variant="primary">
                  Research
                </ButtonLink>
                <ButtonLink href="/policy" variant="secondary">
                  Policy
                </ButtonLink>
                <ButtonLink href="/sources" variant="ghost">
                  Sources
                </ButtonLink>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
