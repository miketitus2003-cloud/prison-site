// app/about/page.tsx
import { Container, Card, Kicker, H1, H2, P, ButtonLink } from "@/components/ui";
import { SITE } from "@/components/siteData";

export default function AboutPage() {
  return (
    <Container>
      <div className="pt-12 sm:pt-16 pb-14">
        <Kicker>About</Kicker>
        <H1>About this project</H1>

        <div className="mt-4 max-w-3xl">
          <P className="text-[15px] sm:text-base">
            I built this as a polished, public facing version of my recidivism work.
            The point is clarity, structure, and sources people can verify quickly.
          </P>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-white ring-1 ring-black/10">
              <H2>What it is</H2>
              <div className="mt-3 space-y-3">
                <P className="text-black/70">
                  A research brief that highlights the question, method, and findings without burying the reader.
                </P>
                <P className="text-black/70">
                  A set of policy briefs connected to real debates around youth punishment and solitary confinement.
                </P>
              </div>

              <div className="mt-6 rounded-3xl p-5 bg-gradient-to-br from-indigo-50 via-white to-sky-50 ring-1 ring-black/10">
                <div className="text-xs uppercase tracking-widest text-black/50">
                  What I want a visitor to do
                </div>
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Read</div>
                    <div className="mt-1 text-sm text-black/70">
                      Understand the model and results.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Verify</div>
                    <div className="mt-1 text-sm text-black/70">
                      Check sources in one place.
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white ring-1 ring-black/10 p-4">
                    <div className="text-sm font-semibold text-black">Connect</div>
                    <div className="mt-1 text-sm text-black/70">
                      See the policy implications.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-white ring-1 ring-black/10">
              <H2>Author</H2>
              <div className="mt-3 space-y-3">
                <P className="text-black/70">
                  {SITE.author}. This site is part of my portfolio: data analysis, clear writing, and policy reasoning.
                </P>
                <P className="text-black/70">
                  Citations and primary links are centralized on the Sources page.
                </P>
              </div>

              {/* Fixed: no more empty button */}
              <div className="mt-6 flex flex-wrap gap-3">
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
            </Card>

            <Card className="bg-white ring-1 ring-black/10">
              <H2>Positioning</H2>
              <div className="mt-3 space-y-3">
                <P className="text-black/70">
                  This site is not advocating for crime. It focuses on preventable harm, broken processes,
                  and the people who get treated as disposable by the system.
                </P>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
